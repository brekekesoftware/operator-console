export default class FilesFile{
    constructor() {
    }

    load( options ){
        this._fileNames = null;

        const url = options["url"]; //require

        const successFunction = options["successFunction"];
        const failFunction = options["failFunction"];
        const errorFunction = options["errorFunction"];
        const timeoutMillisecond = options["timeoutMillisecond"];
        const timeoutFunction = options["timeoutFunction"];
        let method = options["method"];
        if( !method ){
            method = "GET";
        }
        const  xhr = new XMLHttpRequest();
        xhr.onload = (e) => {
            if (xhr.readyState === 4) {
                //xhr.status, xhr.responseText, xhr.statusText,
                if( xhr.status === 200 ){
                    if( successFunction ) {
                        const optionsSuccess = {xhrSuccess: xhr, caller:this};
                        this._onLoadSuccess(xhr);
                        successFunction(optionsSuccess);
                    }
                    else{
                        //console.log("The FilesFile was successfully loaded. xhr=", xhr );
                    }
                }
                else{
                    if( failFunction ) {
                        const optionsFail = {xhrFail: xhr, caller:this};
                        failFunction(optionsFail);
                    }
                    else{
                        console.error("File loading was not successful. xhr=", xhr );
                    }
                }
            }
        };
        xhr.onerror = (ev) => {
            if( errorFunction ){
                const optionsErr = {errorEventArguments:ev, caller:this,xhrError:xhr};
                errorFunction( optionsErr  );
            }
            else {
                console.error("An error occurred while loading the FilesFile.. ev=", ev, " options=", options  );
            }
        }
        if( Number.isInteger(timeoutMillisecond) ) {
            xhr.timeout = timeoutMillisecond;
        }
        xhr.ontimeout = (ev) => {
            if( timeoutFunction ){
                const optionsTimeout = {timeoutEventArguments:ev, caller:this };
                timeoutFunction( optionsTimeout  );
            }
            else {
                console.error("Loading the FilesFile timed out. ev=", ev, " options=", options  );
            }
        };
        xhr.open(method, url, true );
        xhr.send(null);
    }

    _onLoadSuccess(xhr) {
        const responseText = xhr.responseText;
        let fileLines;
        if( !responseText ) {
            fileLines = new Array();
        }
        else {
            fileLines = responseText.split('\n');
        }

        const fileNames = new Array();
        for( let i = 0; i < fileLines.length; i++ ){
            let line = fileLines[i];
            const length = line.length;
            if( length === 0 ){
                continue;
            }
            const lengthMinus1 = length - 1;
            if( line[lengthMinus1] === '\r'){
                line = line.substring(0,lengthMinus1);
            }

            //const isEmpty = line.trim().length === 0 ;
            const isEmpty = line.length === 0;
            //Ignore empty line
            if( !isEmpty ){
                fileNames.push( line );
            }
        }
        this._fileNames = fileNames;
    }

    getFileNames() {
        return this._fileNames;
    }
}