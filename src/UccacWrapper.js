//!requre uccac.js
export default  class UccacWrapper{
    constructor( operatorConsoleAsParent ) {
        this._OperatorConsoleAsParent = operatorConsoleAsParent;
        this._Uccac = new Uccac();

        this._onUccacInitFailFunctionForCaller =  null;
        this._onUccacInitSuccessFunctionForCaller =  null;
    }

    initUccacWrapper( options ){
        const this_ = this;
        const uccacOptions = {
            onInitFailFunction : function( eventArgs ){
                this_._onUccacInitFail( eventArgs )
            },
            onInitSuccessFunction :  function() {
                this_._onUccacInitSuccess();
            },
            isRelease : options["uccacIsRelease"],  //!optional
            urUrl : options["uccacUcUrl"]
        };
        this._onUccacInitFailFunctionForCaller =  options["uccacOnInitFailFunction"];
        this._onUccacInitSuccessFunctionForCaller = options["uccacOnInitSuccessFunction"];

        const bStarted = this._Uccac.init( uccacOptions );
        return bStarted;
    }

    deinitUccacWrapper(){
        const bDeinited = this._Uccac.deinit();
        this._onUccacInitFailFunctionForCaller =  null;
        this._onUccacInitSuccessFunctionForCaller = null;
        return bDeinited;
    }

    _onUccacInitFail(eventArgs ){
        if( this._onUccacInitFailFunctionForCaller ){
            this._onUccacInitFailFunctionForCaller( eventArgs );
        }
    }

    _onUccacInitSuccess(ev){
        if( this._onUccacInitSuccessFunctionForCaller ){
            this._onUccacInitSuccessFunctionForCaller( ev );
        }
    }


}