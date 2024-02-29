//!requre uccac.js
export default  class UccacWrapper{
    constructor( operatorConsoleAsParent ) {
        this._OperatorConsoleAsParent = operatorConsoleAsParent;
        this._Uccac = new Uccac();

        this._onUccacInitFailFunctionForCaller =  null;
        this._onUccacInitSuccessFunctionForCaller =  null;
        this._initialized = false;
        this._OnUccacDeinitFunctions = new Array();
        this._OnUccacInitSuccessFunctions = new Array();
    }

    addOnUccacDeinitFunction( func ){
        this._OnUccacDeinitFunctions.push( func );
    }

    removeOnUccacDeinitFunction( func ){
        const index = this._OnUccacDeinitFunctions.indexOf( func );
        if( index !== -1 ){
            this._OnUccacDeinitFunctions.splice( index, 1 );
        }
        return index;
    }

    addOnUccacInitSuccessFunction( func ){
        this._OnUccacInitSuccessFunctions.push( func );
    }

    removeOnUccacInitSuccessFunction( func ){
        const index = this._OnUccacInitSuccessFunctions.indexOf( func );
        if( index !== -1 ){
            this._OnUccacInitSuccessFunctions.splice( index, 1 );
        }
        return index;
    }

    getUcurl(){
        return this._Uccac.getUcurl();
    }

    _initUccacWrapper( uccacUcUrl, uccacOnInitSuccessFunction,  uccacOnInitFailFunction, uccacIsRelease = false  ){
        const this_ = this;
        const uccacOptions = {
            onInitFailFunction : function( eventArgs ){
                this_._onUccacInitFail( eventArgs )
            },
            onInitSuccessFunction :  function() {
                this_._onUccacInitSuccess();
            },
            isRelease : uccacIsRelease,  //!optional
            ucUrl : uccacUcUrl
        };
        this._onUccacInitFailFunctionForCaller =  uccacOnInitFailFunction;
        this._onUccacInitSuccessFunctionForCaller = uccacOnInitSuccessFunction;

        const bStarted = this._Uccac.init( uccacOptions );
        return bStarted;
    }

    deinitUccacWrapper(){
        const bDeinited = this._Uccac.deinit();
        this._onUccacInitFailFunctionForCaller =  null;
        this._onUccacInitSuccessFunctionForCaller = null;
        if( bDeinited === true ) {
            this._OperatorConsoleAsParent.onDeinitUccacWrapperByUccacWrapper(this);
            for( let i = 0; i < this._OnUccacDeinitFunctions.length; i++ ){
                const func = this._OnUccacDeinitFunctions[i];
                func( this );
            }
        }
        this._initialized = false;
        return bDeinited;
    }

    _onUccacInitFail(eventArgs ){
        if( this._onUccacInitFailFunctionForCaller ){
            this._onUccacInitFailFunctionForCaller( eventArgs );
        }
    }

    _onUccacInitSuccess(){
        this._initialized = true;
        this._OperatorConsoleAsParent.onInitUccacWrapperSuccessByUccacWrapper( this );
        for( let i = 0; i < this._OnUccacInitSuccessFunctions.length; i++ ){
            const func = this._OnUccacInitSuccessFunctions[i];
            func( this );
        }
        if( this._onUccacInitSuccessFunctionForCaller ){
            this._onUccacInitSuccessFunctionForCaller( );
        }
    }

    isInitialized(){
        return this._initialized;
    }

    onBeginSetSystemSettingsDataByOperatorConsoleAsParent( newData, systemSettingsData , onInitSuccessUccacFunction, onInitFailUccacFunction, isUCMinScript  = false  ) {
        let initAsync = false;
        const lastData = systemSettingsData.getData();
        const newUcUrl = newData.ucUrl;
        const lastUcUrl = lastData.ucUrl;
        const newUcChatAgentComponentEnabled = newData.ucChatAgentComponentEnabled;
        const lastUcChatAgentComponentEnabled = lastData.ucChatAgentComponentEnabled;

        const uccacState = this._Uccac.getState();
        if( newUcChatAgentComponentEnabled === true && uccacState !== UCCAC_UCCAC_STATES.init ){
            this._initUccacWrapper( newUcUrl, onInitSuccessUccacFunction, onInitFailUccacFunction, isUCMinScript  );
            initAsync = true;
        }

        if( initAsync !== true && newUcChatAgentComponentEnabled !== lastUcChatAgentComponentEnabled  ){
            if( newUcChatAgentComponentEnabled !== true ){
                this.deinitUccacWrapper();
            }
            else{
                this._initUccacWrapper( newUcUrl, onInitSuccessUccacFunction, onInitFailUccacFunction, isUCMinScript  );
                initAsync = true;
            }
        }

        if( initAsync !== true && newUcChatAgentComponentEnabled && newUcUrl && newUcUrl !== lastUcUrl ){
            //Reinit
            this.deinitUccacWrapper();
            this._initUccacWrapper( newUcUrl, onInitSuccessUccacFunction, onInitFailUccacFunction, isUCMinScript  );
            initAsync = true;
        }

        if( initAsync === false ){
            onInitSuccessUccacFunction();
        }

        return initAsync;
    }

    addUccacAc(){
        const uccacAc = this._Uccac.addUccacAc();
        return uccacAc;
    }

}