import FilesFile  from './FilesFile'

export default class FileInfosLoader {
    constructor( ) {
    }

    load( options ){
        this._fileInfos = null;
        let filesFileUrlOrPath = options["filesFileUrlOrPath"];;
        if( !filesFileUrlOrPath ) {
            filesFileUrlOrPath = options["filesFileUrl"]; //!deprecated. Possibility of containing relative paths
        }
        this._filesFileUrlOrPath = filesFileUrlOrPath;
        this._loadSuccessFunction = options["loadSuccessFunction"];   //require
        this._loadTimeoutFunction = options["loadTimeoutFunction"]; //require
        this._loadFailFunction = options["loadFailFunction"];   //!require
        this._loadErrorFunction = options["loadErrorFunction"]; //!require

        const timeoutMillisecond = options["timeoutMillisecond"];

        const filesFile = new FilesFile();
        const optionsFilesFile = {
            urlOrPath : this._filesFileUrlOrPath,//Possibility of containing relative paths
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

        let fileRootUrlOrPath = this._filesFileUrlOrPath;
        //!limitation  Supports file path url only.
        const questionIndex = fileRootUrlOrPath.lastIndexOf('?');
        if( questionIndex !== -1 ){
            fileRootUrlOrPath = fileRootUrlOrPath.substring( 0, questionIndex );
        }
        const slashIndex = fileRootUrlOrPath.lastIndexOf('/');
        if( slashIndex !== -1 ){
            fileRootUrlOrPath = fileRootUrlOrPath.substring(0,slashIndex);
        }
        let fileUrlOrPathPrefix;
        if( fileRootUrlOrPath.length !== 0 ){
            fileUrlOrPathPrefix = fileRootUrlOrPath + '/';
        }
        else{
            fileUrlOrPathPrefix = "";
        }
        const fileNames = filesFile.getFileNames();
        const fileInfos = new Array();
        for( let i = 0; i < fileNames.length; i++ ){
            const fileName = fileNames[i];
            const fileUrlOrPath = fileUrlOrPathPrefix + fileName;
            const fileInfo = {
                "url": fileUrlOrPath, //!deprecated
                "urlOrPath": fileUrlOrPath,
                "name": fileName
            };
            fileInfos.push( fileInfo );
        }
        this._fileRootUrlOrPath = fileRootUrlOrPath;
        this._fileInfos = fileInfos;
        const optionsSuccess = {caller:this};
        this._loadSuccessFunction( optionsSuccess );

    }

    getFileInfos(){
        return this._fileInfos;
    }

    getFileInfoByFilename( sFileName){
        if( !this._fileInfos || Array.isArray( this._fileInfos ) === false ){
            return null;
        }

        const foundFileInfo = this._fileInfos.find( (fileInfo) => fileInfo["name"] === sFileName );
        return foundFileInfo;
    }

    // getFileRootUrlOrPath(){
    //     return this._fileRootUrlOrPath;
    // }

}