import FilesFile  from './FilesFile'

export default class FileInfosLoader {
    constructor( ) {
    }

    load( options ){
        this._fileInfos = null;

        this._filesFileUrl = options["filesFileUrl"]; //require
        this._loadSuccessFunction = options["loadSuccessFunction"];   //require
        this._loadTimeoutFunction = options["loadTimeoutFunction"]; //require
        this._loadFailFunction = options["loadFailFunction"];   //!require
        this._loadErrorFunction = options["loadErrorFunction"]; //!require

        const timeoutMillisecond = options["timeoutMillisecond"];

        const filesFile = new FilesFile();
        const optionsFilesFile = {
            url : this._filesFileUrl,
            successFunction: (options) =>{
                this._onFilesFileLoadSuccess(options);
            },
            failFunction : (options) => {
                this._onFilesFileLoadFail(options)
            },
            errorFunction : (options) =>{
                this._onFilesFileLoadError(options);
            },
            timeoutMillisecond:timeoutMillisecond,
            timeoutFunction: ( options ) =>{
                this._onFilesFileLoadTimeout(options);
            },
            method:"GET"
        };
        filesFile.load( optionsFilesFile );
    }

    _onFilesFileLoadTimeout( options ){
        const timeoutEventArguments = options["timeoutEventArguments"];
        const filesFile = options["caller"];

        const optionsTimeout = {caller:this};
        this._loadTimeoutFunction( optionsTimeout );
    }

    _onFilesFileLoadFail( options ){
        const xhrFail = options["xhrFail"];
        const filesFile = options["caller"];
        const optionsFail = {xhrFail:xhrFail,caller:this,filesfile:filesFile};
        this._loadFailFunction( optionsFail );
    }

    _onFilesFileLoadError( options ){
        const errorEventArguments = options["errorEventArguments"];
        const filesFile = options["caller"];
        const xhrError = options["xhrError"];
        const optionsError = {xhrError:xhrError,caller:this,filesfile:filesFile,errorEventArguments:errorEventArguments};
        this._loadErrorFunction( optionsError );
    }

    _onFilesFileLoadSuccess( options ){
        const filesFile = options.caller;

        let fileRootUrl = this._filesFileUrl;
        //!limitation  Supports file path url only.
        const questionIndex = fileRootUrl.lastIndexOf('?');
        if( questionIndex !== -1 ){
            fileRootUrl = fileRootUrl.substring( 0, questionIndex );
        }
        const slashIndex = fileRootUrl.lastIndexOf('/');
        if( slashIndex !== -1 ){
            fileRootUrl = fileRootUrl.substring(0,slashIndex);
        }
        let fileUrlPrefix;
        if( fileRootUrl.length !== 0 ){
            fileUrlPrefix = fileRootUrl + '/';
        }
        else{
            fileUrlPrefix = "";
        }
        const fileNames = filesFile.getFileNames();
        const fileInfos = new Array();
        for( let i = 0; i < fileNames.length; i++ ){
            const fileName = fileNames[i];
            const fileUrl = fileUrlPrefix + fileName;
            const fileInfo = {"url": fileUrl, "name": fileName };
            fileInfos.push( fileInfo );
        }
        this._fileRootUrl = fileRootUrl;
        this._fileInfos = fileInfos;
        const optionsSuccess = {caller:this};
        this._loadSuccessFunction( optionsSuccess );

    }

    getFileInfos(){
        return this._fileInfos;
    }

    getFileRootUrl(){
        return this._fileRootUrl;
    }

}