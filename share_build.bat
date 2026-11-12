@echo off
rem share_build.bat [<ver>]  -- run after npm run build:prd. Zips dist with build-info.txt and uploads it to the temp share (30 days).
rem Uploads directly when BREKEKE_TEMP_TOKEN (personal temp-share token btmp_...) is set; otherwise prints the ZIP path and exits 2.
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0share_build.ps1" "%~1"
exit /b %errorlevel%
