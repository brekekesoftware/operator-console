if( CryptoJS === undefined ) {
    var CryptoJS = undefined;
}
class PalWrapper{
    constructor() {
        this._state = PalWrapper.PALWRAPPER_STATES.deinit;
        this._pbxHost = null;
        this._pbxPort = null;
        this._jsonrpcJsUrl = null;
        this._palJsUrl = null;
        this._onInitFailFunctionForUser = null;
        this._onInitSuccessFunctionForUser = null;
        this._loadedMd5JsElement = null;
        this._loadedJsonrpcJsElement = null;
        this._loadedPalJsElement = null;
    }

    getState(){
        return this._state;
    }

    getPbxHost(){
        return this._pbxHost;
    }

    getPbxPort(){
        return this._pbxPort;
    }

    initPalWrapper( options ){
        if( this._state !== PalWrapper.PALWRAPPER_STATES.deinit ){
            return false;
        }
        this._state = PalWrapper.PALWRAPPER_STATES.initing;

        this._onInitFailFunctionForUser = options["onInitFailFunction"];
        this._onInitSuccessFunctionForUser = options["onInitSuccessFunction"];
        this._pbxHost = options["pbxHost"];
        this._pbxPort = options["pbxPort"];

        let  pbxUrl = "https://" + this._pbxHost;
        if( this._pbxPort !== undefined ){
            pbxUrl += ":" + this._pbxPort;
        }
        pbxUrl += "/pbx";
        this._pbxUrl = pbxUrl;
        this._pbxUrlEndsWithSlash = pbxUrl + "/";


        this._pbxUrlEndsWithSlash = this._pbxUrl + "/";

        this._jsonrpcJsUrl = this._pbxUrlEndsWithSlash + "common/js/brekeke/net/jsonrpc.js";
        this._palJsUrl = this._pbxUrlEndsWithSlash + "common/js/brekeke/pbx/pal.js";

        if( options["secure_login_password"] !== false ){
            const md5jsUrl = this._pbxUrlEndsWithSlash + "/common/js/cryptojs/md5.js";
            const eMd5Js = document.head.querySelector('script[src="' + md5jsUrl + '"]');
            if( eMd5Js ){
                this._onLoadMd5Js();
            }
            else{
                this._loadMd5Js( md5jsUrl );
            }
        }
        else{
            if( CryptoJS === undefined ){
                CryptoJS = "dummy";
            }
            this._onLoadMd5Js();

        }
        return true;
    }

    _onLoadMd5Js(){
        const eJsonrpcJs = document.head.querySelector('script[src="' + this._jsonrpcJsUrl + '"]');
        if( eJsonrpcJs ) {
            this._onLoadJsonrpcJs();
        }
        else {
            this._loadJsonrpcJs();
        }
    }

    _onLoadJsonrpcJs(){
        const ePalJs = document.head.querySelector('script[src="' + this._palJsUrl + '"]');
        if( ePalJs ) {
            this._onLoadPalJs();
        }
        else {
            this._loadPalJs();
        }
    }

    _onLoadPalJs(){
        this._state = PalWrapper.PALWRAPPER_STATES.init;
        this._onInitSuccessFunctionForUser();
    }

    _loadPalJs(){
        this._isPalJsLoading = true;
        const this_ = this;
        const ePalJs = this._loadScript(
            this_._palJsUrl,
            function(){
                this_._loadedPalJsElement = ePalJs;
                this_._onLoadPalJs();
            },
            function(ev){
                this_._onErrorLoadJs(ev, this_._palJsUrl );
            }
        );
    }

    _loadJsonrpcJs(){
        const this_ = this;
        const eJsonrcpJs = this._loadScript(
            this_._jsonrpcJsUrl ,
            function(){
                this_._loadedJsonrpcJsElement = eJsonrcpJs;
                this_._onLoadJsonrpcJs();
            },
            function(ev){
                this_._onErrorLoadJs(ev, this_._jsonrpcJsUrl );
            }
        );
    }

    _onErrorLoadJs(ev, resourceUri  ){
        const arg ={
            errorCode : PalWrapper.PALWRAPPER_INIT_ERRORS.loadResourceFailed,
            errorResourceUri : resourceUri,
            errorEvent:ev
        }
        this._state = PalWrapper.PALWRAPPER_STATES.deinit;
        this._onInitFailFunctionForUser( arg );
        this._deinitMain();
    }

    _deinitMain(){
        this._pbxHost = null;
        this._pbxPort = null;
        this._pbxUrl = null;
        this._pbxUrlEndsWithSlash = null;
        this._jsonrpcJsUrl = null;
        this._palJsUrl = null;
        this._onInitFailFunctionForUser = null;
        this._onInitSuccessFunctionForUser = null;

        if( this._loadedPalJsElement ){
            this._loadedPalJsElement.remove();
            this._loadedPalJsElement = null;
        }

        if( this._loadedJsonrpcJsElement ){
            this._loadedJsonrpcJsElement.remove();
            this._loadedJsonrpcJsElement = null;
        }

        if( this._loadedMd5JsElement ){
            this._loadedMd5JsElement.remove();
            this._loadedMd5JsElement = null;
        }

        this._state = PalWrapper.PALWRAPPER_STATES.deinit;
    }

    deinitPalWrapper(){
        if( this._state !== PalWrapper.PALWRAPPER_STATES.init  ){
            return false;
        }

        this._deinitMain();

        return true;
    }

    getPal( options ){
        if( this._state !== PalWrapper.PALWRAPPER_STATES.init  ){
            return null;
        }

        const pal = this._getPal( options );
        return pal;
    }

    _getPal( options ){
        let wsUri = this._pbxUrlEndsWithSlash + "ws";
        const iProtocol = this._pbxUrlEndsWithSlash.indexOf("://");
        wsUri = wsUri.substring( iProtocol );
        if( this._pbxUrlEndsWithSlash.startsWith("https:") || this._pbxUrlEndsWithSlash.startsWith("HTTPS:")){
            wsUri = "wss" + wsUri;
        }
        else{
            wsUri = "ws" + wsUri;
        }
        //!example wss://127.0.0.1:8443/pbx/ws
        const pal =  Brekeke.pbx.getPal( wsUri, options  );
        return pal;
    }


    _loadMd5Js(  url ){
        const this_ = this;
        const eMd5Js = this._loadScript(
            url,
            function(){
                this_._loadedMd5JsElement = eMd5Js;
                this_._onLoadMd5Js();
            },
            function(ev){
                this_._onErrorLoadJs(ev, url );
            }
        );
    }



    _loadScript( jsUrl, onloadFunction, onerrorFunction  ){
        const eScript = document.createElement("script");
        eScript.src = jsUrl;
        eScript.setAttribute("async", "" );
        eScript.onload = onloadFunction;
        eScript.onerror = onerrorFunction;
        document.head.appendChild( eScript );
        return eScript;
    }

}
PalWrapper.PALWRAPPER_STATES ={
    deinit : 0,
//    deiniting : 1,
    initing : 2,
    init : 3,
}
PalWrapper.PALWRAPPER_INIT_ERRORS = {
    loadResourceFailed : 1
}
