//import {reaction} from "mobx";
import debounce from "debounce";

export default  class BrekekeOperatorConsoleEx{
    constructor( operatorConsoleAsParent ) {
       this._OperatorConsoleAsParent = operatorConsoleAsParent;  //!security
        window.BrekekeOperatorConsoleEx = this;
    }

    static getStaticInstance(){
        return window.BrekekeOperatorConsoleEx;
    }

    setOnAddCallInfoEventListener( options ){
        const el = options["eventListener"];
        const bSet = this._OperatorConsoleAsParent.setOnAddCallInfoEventListener( el );
        return bSet;
    }

    removeOnAddCallInfoEventListener( options ){
        const el = options["eventListener"];
        const removedIndex = this._OperatorConsoleAsParent.removeOnAddCallInfoEventListener( el );
        return removedIndex;
    }

    setOnUpdateCallInfoEventListener( options ){
        const el = options["eventListener"];
        const bSet = this._OperatorConsoleAsParent.setOnUpdateCallInfoEventListener( el );
        return bSet;
    }

    removeOnUpdateCallInfoEventListener( options ){
        const el = options["eventListener"];
        const removedIndex = this._OperatorConsoleAsParent.removeOnUpdateCallInfoEventListener( el );
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

    setOnRemoveCallInfoEventListener( options ){
        const el = options["eventListener"];
        const bSet = this._OperatorConsoleAsParent.setOnRemoveCallInfoEventListener( el );
        return bSet;
    }

    removeOnRemoveCallInfoEventListener( options ){
        const el = options["eventListener"];
        const removedIndex = this._OperatorConsoleAsParent.removeOnRemoveCallInfoEventListener( el );
        return removedIndex;
    }

    // getCurrentCallId(){
    //     const callId = this._OperatorConsoleAsParent.getCurrentCallIdForWebphoneCallInfos();
    //     return callId;
    // }

    // setOnChangeCurrentCallIdEventListener( options ){
    //     const el = options["eventListener"];
    //     const bSet = this._OperatorConsoleAsParent.setOnChangeCurrentCallIdEventListener( el );
    //     return bSet;
    // }

    // removeOnChangeCurrentCallIdCallEventListener( options ){
    //     const el = options["eventListener"];
    //     const removedIndex = this._OperatorConsoleAsParent.removeOnChangeCurrentCallIdEventListener( el );
    //     return removedIndex;
    // }

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

    // setOnPalNotifyStatusEventListener( options ){
    //     const el = options["eventListener"];
    //     const bSet = this._OperatorConsoleAsParent.setOnPalNotifyStatusEventListener( el );
    //     return bSet;
    // }

    // removeOnPalNotifyStatusEventListener( options ){
    //     const el = options["eventListener"];
    //     const removedIndex = this._OperatorConsoleAsParent.removeOnPalNotifyStatusEventListener( el );
    //     return removedIndex;
    // }

    setOnHoldCallInfoEventListener( options ){
        const el = options["eventListener"];
        const bSet = this._OperatorConsoleAsParent.setOnHoldCallInfoEventListener( el );
        return bSet;
    }

    removeOnHoldCallInfoEventListener( options ){
        const el = options["eventListener"];
        const removedIndex = this._OperatorConsoleAsParent.removeOnHoldCallInfoEventListener( el );
        return removedIndex;
    }

    setOnUnholdCallInfoEventListener( options ){
        const el = options["eventListener"];
        const bSet = this._OperatorConsoleAsParent.setOnUnholdCallInfoEventListener( el );
        return bSet;
    }

    removeOnUnholdCallInfoEventListener( options ){
        const el = options["eventListener"];
        const removedIndex = this._OperatorConsoleAsParent.removeOnUnholdCallInfoEventListener( el );
        return removedIndex;
    }

    getLoginUsername(){
        const loginUsername = this._OperatorConsoleAsParent.getLoggedinUsername();
        return loginUsername;
    }

    getLoginTenantname(){
        const loginTenantname = this._OperatorConsoleAsParent.getLoggedinTenant();
        return loginTenantname;
    }

    // getMobxReaction(){
    //     return reaction;
    // }

    getReactDebounce(){
        return debounce;
    }

    getCallInfoArray(){
        const callInfoArray = [...this._OperatorConsoleAsParent.getPhoneClient().getCallInfos().getCallInfoArray()];
        return callInfoArray;
    }

    getCurrentCallIndex(){
       const callIndex = this._OperatorConsoleAsParent.getPhoneClient().getCallInfos().getCurrentCallIndex();
       return callIndex;
    }

    getCallInfoCount(){
        const count = this._OperatorConsoleAsParent.getPhoneClient().getCallInfos().getCallInfoCount();
        return count;
    }

    getCallInfoAt( index ){
        const callInfo = this._OperatorConsoleAsParent.getPhoneClient().getCallInfos().getCallInfoAt(index);
        return callInfo;
    }
    
}
