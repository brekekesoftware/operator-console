import {reaction} from "mobx";
import debounce from "debounce";

export default  class BrekekeOperatorConsoleEx{
    constructor( operatorConsoleAsParent ) {
       this._OperatorConsoleAsParent = operatorConsoleAsParent;  //!security
        window.BrekekeOperatorConsoleEx = this;
    }

    static getStaticInstance(){
        return window.BrekekeOperatorConsoleEx;
    }

    setOnInsertCallEventListener( options ){
        const el = options["eventListener"];
        const bSet = this._OperatorConsoleAsParent.setOnInsertCallEventListener( el );
        return bSet;
    }

    removeOnInsertCallEventListener( options ){
        const el = options["eventListener"];
        const removedIndex = this._OperatorConsoleAsParent.removeOnInsertCallEventListener( el );
        return removedIndex;
    }

    setOnUpdateCallEventListener( options ){
        const el = options["eventListener"];
        const bSet = this._OperatorConsoleAsParent.setOnUpdateCallEventListener( el );
        return bSet;
    }

    removeOnUpdateCallEventListener( options ){
        const el = options["eventListener"];
        const removedIndex = this._OperatorConsoleAsParent.removeOnUpdateCallEventListener( el );
        return removedIndex;
    }

    // setOnChangeCallEventListener( options ){
    //     const el = options["eventListener"];
    //     const bSet = this._OperatorConsoleAsParent.setOnChangeCallEventListener( el );
    //     return bSet;
    // }
    //
    // removeOnChangeCallEventListener( options ){
    //     const el = options["eventListener"];
    //     const removedIndex = this._OperatorConsoleAsParent.removeOnChangeCallEventListener( el );
    //     return removedIndex;
    // }

    setOnRemoveCallEventListener( options ){
        const el = options["eventListener"];
        const bSet = this._OperatorConsoleAsParent.setOnRemoveCallEventListener( el );
        return bSet;
    }

    removeOnRemoveCallEventListener( options ){
        const el = options["eventListener"];
        const removedIndex = this._OperatorConsoleAsParent.removeOnRemoveCallEventListener( el );
        return removedIndex;
    }

    getCurrentCallId(){
        const callId = this._OperatorConsoleAsParent.getCurrentCallId();
        return callId;
    }

    setOnChangeCurrentCallIdEventListener( options ){
        const el = options["eventListener"];
        const bSet = this._OperatorConsoleAsParent.setOnChangeCurrentCallIdEventListener( el );
        return bSet;
    }

    removeOnChangeCurrentCallIdCallEventListener( options ){
        const el = options["eventListener"];
        const removedIndex = this._OperatorConsoleAsParent.removeOnChangeCurrentCallIdEventListener( el );
        return removedIndex;
    }

    setOnUnloadExtensionScriptEventListener( options ){
        const el = options["eventListener"];
        const bSet = this._OperatorConsoleAsParent.setOnUnloadExtensionScriptEventListener( el );
        return bSet;
    }

    removeOnUnloadExtensionScriptEventListener( options ){
        const el = options["eventListener"];
        const removedIndex = this._OperatorConsoleAsParent.removeOnUnloadExtensionScriptEventListener( el );
        return removedIndex;
    }

    setOnPalNotifyStatusEventListener( options ){
        const el = options["eventListener"];
        const bSet = this._OperatorConsoleAsParent.setOnPalNotifyStatusEventListener( el );
        return bSet;
    }

    removeOnPalNotifyStatusEventListener( options ){
        const el = options["eventListener"];
        const removedIndex = this._OperatorConsoleAsParent.removeOnPalNotifyStatusEventListener( el );
        return removedIndex;
    }

    getLoginUsername(){
        const loginUsername = this._OperatorConsoleAsParent.getLoginUsername();
        return loginUsername;
    }

    getLoginTenantname(){
        const loginTenantname = this._OperatorConsoleAsParent.getLoginTenantname();
        return loginTenantname;
    }

    getMobxReaction(){
        return reaction;
    }

    getReactDebounce(){
        return debounce;
    }

    getCallsById(){
        const callsById = this._OperatorConsoleAsParent.getCallsById();
        return callsById;
    }

}
