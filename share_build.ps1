# Called from share_build.bat. Zips dist/ (after npm run build:prd) with build-info.txt and uploads it to the temp share.
# The zip has dist's contents at its root with '/' separators (qcon_env_webclients rejects '\').
param( [string]$Ver = "" )
$ErrorActionPreference = "Stop"
Add-Type -AssemblyName System.IO.Compression, System.IO.Compression.FileSystem

$repo = $PSScriptRoot
$dist = Join-Path $repo "dist"
if( -not ( Test-Path ( Join-Path $dist "operator-console.js" ) ) ) { throw "Not built: $dist" }

if( $Ver.Length -eq 0 ) {
	$m = [regex]::Match( [System.IO.File]::ReadAllText( ( Join-Path $repo "src\index.jsx" ) ), 'const VERSION = "([0-9.]+)"' )
	if( -not $m.Success ) { throw "VERSION not found in src/index.jsx" }
	$Ver = $m.Groups[1].Value
}
$html = [System.IO.File]::ReadAllText( ( Join-Path $dist "operator-console.html" ) )
if( -not $html.Contains( "?v=$Ver" ) ) { Write-Host "WARN dist/operator-console.html has no ?v=$Ver" }

# dist/ is a build product (operator-console.html carries ?v= and is not committed), so it is left out of the dirty check.
$hash = ( git -C $repo rev-parse HEAD ).Trim()
$branch = ( git -C $repo rev-parse --abbrev-ref HEAD ).Trim()
$state = "clean"
if( ( git -C $repo status --porcelain --untracked-files=no -- . ":!dist" ) ) {
	$state = "dirty"
} elseif( -not ( git -C $repo branch -r --contains HEAD ) ) {
	$state = "unpushed"
}
$lines = @( "# product  commit(40)  branch  state" )
$lines += "{0,-16} {1}  {2}  {3}" -f "operator-console", $hash, $branch, $state
$lines += "built {0} win-{1}" -f ( Get-Date -Format "yyyy-MM-dd HH:mm" ), $env:USERNAME

$out = Join-Path $repo "build\share"
New-Item -ItemType Directory -Force -Path $out | Out-Null
$info = Join-Path $out "build-info.txt"
[System.IO.File]::WriteAllText( $info, ( $lines -join "`n" ) + "`n", ( New-Object System.Text.UTF8Encoding( $false ) ) )

$zip = Join-Path $out "operator-console$Ver.zip"
if( Test-Path $zip ) { Remove-Item $zip }
$z = [System.IO.Compression.ZipFile]::Open( $zip, "Create" )
try {
	Get-ChildItem $dist -Recurse -File | ForEach-Object {
		$rel = $_.FullName.Substring( $dist.Length + 1 ).Replace( '\', '/' )
		[void][System.IO.Compression.ZipFileExtensions]::CreateEntryFromFile( $z, $_.FullName, $rel )
	}
	[void][System.IO.Compression.ZipFileExtensions]::CreateEntryFromFile( $z, $info, "build-info.txt" )
} finally {
	$z.Dispose()
}
Get-Content $info

$token = $env:BREKEKE_TEMP_TOKEN
if( -not $token ) {
	# No personal temp-share token: the calling session uploads it through MCP temp_share_upload.
	Write-Host "BREKEKE_TEMP_TOKEN is not set. Upload this (30 days):"
	Write-Host "ZIP $zip"
	exit 2
}
$note = [uri]::EscapeDataString( "operator-console $Ver" )
$name = [uri]::EscapeDataString( ( Split-Path $zip -Leaf ) )
$res = & curl.exe -fsS -H "Authorization: Bearer $token" -T $zip "https://docs-internal.brekeke.com/api/temp?name=$name&days=30&note=$note"
if( $LASTEXITCODE -ne 0 ) { throw "Upload failed: $zip" }
$r = $res | ConvertFrom-Json
Write-Host "EXPIRES $( $r.expires )"
Write-Host "URL $( $r.url )"
