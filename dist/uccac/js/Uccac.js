//!require script ucchatwidget.js
class Uccac{
    constructor() {
        this._state = UCCAC_UCCAC_STATES.deinit;
        this._isUcagentwidgetJsLoading = false;
        this._isUccacUtilJsLoading = false;
        this._isUccacAcJsLoading = false;
        this._isUcagentwidgetCssLoading = false;

        this._onInitFailEventArgs = new Array();

        this._UccacAcs = {};
        this._uccacMaxNo = -1;

    }

    _getCurrentScriptDirpath(){
        const scripts= document.getElementsByTagName('script');
        for( let i = 0; i < scripts.length; i++ ) {
            const path = scripts[i].src.split('?')[0];
            if( path.endsWith("Uccac.js")){
                const dir = path.split('/').slice(0, -1).join('/')+'/';  // remove last filename part of path
                return dir;
            }
        }
        return null;
    }

    _loadUcagentwidgetJs( ){
        this._isUcagentwidgetJsLoading = true;
        const this_ = this;
        const ucagentwidgetScriptElement = this._loadScript(
            this._ucagentwidgetJsUrl,
            function(){
                this_._onLoadUcagentwidgetJs();
            },
            function(ev){
                this_._onErrorLoadUcagentwidgetJs(ev);
            }
        );
    }

    _loadUcagentwidgetCss(){
        this._isUcagentwidgetCssLoading = true;
        const this_ = this;
        const UcagentwidgetCssElement = this._loadCss(
            this._ucagentwidgetCssUrl,
            function(){
                this_._onLoadUcagentwidgetCss();
            },
            function(ev){
                this_._onErrorLoadUcagentwidgetCss(ev);
            }
        );
    }

    _loadUccacUtilJs( url ){
        this._isUccacUtilJsLoading = true;
        const this_ = this;
        const UccacUtilScriptElement = this._loadScript(
            url,
            function(){
                this_._onLoadUccacUtilJs();
            },
            function(ev){
                this_._onErrorLoadUccacUtilJs(ev);
            }
        );
    }

    _onLoadUccacUtilJs(){
        this._isUccacUtilJsLoading = false;
        this._checkLoadCssAndScripts();
    }

    _onErrorLoadUccacUtilJs(ev){
        this._isUccacUtilJsLoading = false;
        this._onErrorLoadCssOrJs(ev,UCCAC_UCCAC_UTIL_JS_PATH);
    }

    _loadScript( jsUrl, onloadFunction, onerrorFunction  ){
        const eScript = document.createElement("script");
        eScript.src = jsUrl;
        eScript.setAttribute("async", "" );
        //eScript.setAttribute("async", "");
        eScript.onload = onloadFunction;
        eScript.onerror = onerrorFunction;
        document.head.appendChild( eScript );
        return eScript;
    }

    _loadCss( cssUri, onloadFunction, onerrorFunction   ){
        const eLink = document.createElement("link");
        eLink.setAttribute("rel","stylesheet");
        eLink.setAttribute("href", cssUri );
        eLink.onload = onloadFunction;
        eLink.onerror = onerrorFunction;
        document.head.appendChild( eLink );
    }

    _onErrorLoadUcagentwidgetJs(ev){
        this._isUcagentwidgetJsLoading = false;
        this._onErrorLoadCssOrJs( ev, this._ucagentwidgetJsUrl  );
    }

    _onErrorLoadCssOrJs(ev, resourcePath  ){
        const arg ={
            errorCode : UCCAC_UCCAC_INIT_ERRORS.loadResourceFailed,
            errorResourcePath : resourcePath,
            errorEvent:ev
        }
        this._onInitFailEventArgs.push( arg );
        this._checkLoadCssAndScripts();
    }

    _onLoadUcagentwidgetJs(){
        this._isUcagentwidgetJsLoading = false;
        this._checkLoadCssAndScripts();
    }

    _loadUccacAcJs( url ){
        this._isUccacAcJsLoading = true;
        const this_ = this;
        const UccacAcScriptElement = this._loadScript(
            url,
            function(){
                this_._onLoadUccacAcJs();
            },
            function(ev){
                this_._onErrorLoadUccacAcJs(ev);
            }
        );
    }

    _onErrorLoadUcagentwidgetCss(ev){
        this._isUcagentwidgetCssLoading = false;
        this._onErrorLoadCssOrJs( ev, this._ucagentwidgetCssUrl );
    }

    _onLoadUcagentwidgetCss(){
        this._isUcagentwidgetCssLoading = false;
        this._checkLoadCssAndScripts();
    }

    _onErrorLoadUccacAcJs(ev){
        this._isUccacAcJsLoading = false;
        this._onErrorLoadCssOrJs( ev, UCCAC_UCCAC_AC_JS_PATH );
    }

    _onLoadUccacAcJs(){
        this._isUccacAcJsLoading = false;
        this._checkLoadCssAndScripts();
    }

    _checkLoadCssAndScripts(){
        const loaded = this._isUcagentwidgetCssLoading === false && this._isUccacUtilJsLoading === false && this._isUcagentwidgetJsLoading === false && this._isUccacAcJsLoading === false;
        if( loaded ){
            if( this._onInitFailEventArgs.length === 0 ){
                this._initScripts();
            }
            else{
                this._state = UCCAC_UCCAC_STATES.deinit;
                this._onInitFailFunctionForUser( this._onInitFailEventArgs );
            }
        }
    }

    _initScripts(){
        this._state = UCCAC_UCCAC_STATES.init;
        this._onInitSuccessFunctionForUser();
    }

    init( options ){
        if( this._state !== UCCAC_UCCAC_STATES.deinit ){
            return false;
        }

        this._state = UCCAC_UCCAC_STATES.initing;
        this._onInitFailEventArgs = new Array();
        const ucUrl = options["ucUrl"];
        const isRelease = options["isRelease"];
        let ucagentwidgetJsUrl = ucUrl;
        if( ucagentwidgetJsUrl[ ucagentwidgetJsUrl.length - 1 ] !='/' ){
            ucagentwidgetJsUrl += '/';
        }
        ucagentwidgetJsUrl += "js/brekeke/ucagentwidget/ucagentwidget"  + ( isRelease === true ? ".min" : "" ) + ".js";

        this._ucUrl = ucUrl;
        this._ucagentwidgetJsUrl = ucagentwidgetJsUrl;
        this._onInitFailFunctionForUser = options["onInitFailFunction"];
        this._onInitSuccessFunctionForUser = options["onInitSuccessFunction"];

        this._startLoadCss();
        this._startLoadScripts();

        return true;
    }

    getUcurl(){
        return this._ucUrl;
    }

    _startLoadCss(){
        let ucagentwidgetCssUrl = this._ucUrl;
        if( ucagentwidgetCssUrl[ ucagentwidgetCssUrl.length - 1 ] !='/' ){
            ucagentwidgetCssUrl += '/';
        }
        ucagentwidgetCssUrl += "css/ucagentwidget.css";
        this._ucagentwidgetCssUrl = ucagentwidgetCssUrl;
        //this._loadCss(ucagentwidgetCssUrl);

        const eUcagentwidgetCss = document.querySelector('script[src="' + this._ucagentwidgetCssUrl + '"]');
        if( eUcagentwidgetCss ) {
            this._onLoadUcagentwidgetCss();
        }
        else {
            this._loadUcagentwidgetCss();
        }

    }

    _startLoadScripts( ){
        const dir = this._getCurrentScriptDirpath();
        if( dir === null ){
            const arg ={
                errorCode : UCCAC_UCCAC_INIT_ERRORS.ScriptDirCouldNotBeParsed,
                //errorResourcePath : resourcePath,
                //errorEvent:ev
            }
            this._onInitFailEventArgs.push( arg );
            this._state = UCCAC_UCCAC_STATES.deinit;
            this._onInitFailFunctionForUser( this._onInitFailEventArgs );
            return;
        }

        const eUccacUtilJsSrc = dir +  UCCAC_UCCAC_UTIL_JS_FILENAME;
        const eUccacUtilJs = document.querySelector('script[src="' + eUccacUtilJsSrc + '"]');
        if( eUccacUtilJs ) {
            this._onLoadUccacUtilJs();
        }
        else {
            this._loadUccacUtilJs(eUccacUtilJsSrc);
        }

        const eUcagentwidgettJs = document.querySelector('script[src="' + this._ucagentwidgetJsUrl + '"]');
        if( eUcagentwidgettJs ) {
            this._onLoadUcagentwidgetJs();
        }
        else {
            this._loadUcagentwidgetJs();
        }

        const eUccacAcJsSrc = dir +  UCCAC_UCCAC_AC_JS_FILENAME;
        const eUccacAcJs = document.querySelector('script[src="' + eUccacAcJsSrc + '"]');
        if( eUccacAcJs ) {
            this._onLoadUccacAcJs();
        }
        else {
            this._loadUccacAcJs(eUccacAcJsSrc);
        }

    }

    addUccacAc(){
        if( this._state !== UCCAC_UCCAC_STATES.init ){
            return null;
        }

        this._uccacMaxNo++;
        const uccacAc = new UccacAc( this, this._uccacMaxNo );
        this._UccacAcs[ uccacAc.getUccacAcNo() ] = uccacAc;
        return uccacAc;
    }

    getUccacAc( uccacAcNo ){
        const uccacAc = this._UccacAcs[ uccacAcNo  ];
        return uccacAc;
    }

    deinitAndRemoveUccacAc( uccacAcNo ){
        const uccacAc = this.getUccacAc( uccacAcNo );
        if( !uccacAc ){
            return false;
        }
        uccacAc.deinit();
        delete this._UccacAcs[uccacAcNo];
        return true;
    }

    //deinit( options ) {
    deinit( ) {
        if( this._state !== UCCAC_UCCAC_STATES.init ){
            return false;
        }

        this._state = UCCAC_UCCAC_STATES.deiniting;

        // if( options ) {
        //     this._onDeinitFunctionForUser = options["onDeinitFunction"];
        // }
        // else{
        //     this._onDeinitFunctionForUser = null;
        // }

        const ents = Object.entries(this._UccacAcs);
        ents.forEach(([uccacAcNo, uccacAc], index) => {
            uccacAc.deinit();
        })

        //clear
        for (let uccacAcNo in this._UccacAcs ){
            delete this._UccacAcs[uccacAcNo];
        }
        //this._ucacMaxNo = -1;

        //removeLoadedScriptElements();
        this._ucUrl = null;
        this._ucagentwidgetJsUrl = null;
        this._onInitFailFunctionForUser = null;
        this._onInitSuccessFunctionForUser = null;
        //const func = this._onDeinitFunctionForUser();
        //this._onDeinitFunctionForUser = null;
        this._state = UCCAC_UCCAC_STATES.deinit;
        // if( func ){
        //     func();
        // }

        return true;

    }

    getState(){
        return this._state;
    }
}
const UCCAC_UCCAC_UTIL_JS_FILENAME = "UccacUtil.js";
const UCCAC_UCCAC_AC_JS_FILENAME = "UccacAc.js";
const UCCAC_UCCAC_STATES ={
    deinit : 0,
    deiniting : 1,
    initing : 2,
    init : 3
}
const UCCAC_UCCAC_INIT_ERRORS = {
    ScriptDirCouldNotBeParsed : 1,
    loadResourceFailed : 2
}