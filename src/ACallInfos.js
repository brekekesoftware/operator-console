import ACallInfo from "./ACallInfo";

/**
 *  abstract class
 */
export default class ACallInfos{
    constructor( options  ) {
        this._PhoneClientAsParent = options["phoneClient"];
    }

    getPhoneClientAsParent(){
        return this._PhoneClientAsParent;
    }

    //!callme after add callinfo
    onAddCallInfoByCallInfosSubclass( webphoneCallInfosAsCaller, callInfo ){
        const callStatus = callInfo.getCallStatus();
        //if( this.state.isCalling === true && !call.pbxRoomId && !call.pbxTalkerId ){



        if (callStatus === ACallInfo.CALL_STATUSES.calling) {
            const newCurrentCallIndex = this.getCallIndexByCallId( callInfo.getCallId() );
            const pc = this.getPhoneClientAsParent();
            const oc = pc.getOperatorConsoleAsParent();
            oc.setCurrentCallIndex(newCurrentCallIndex);
            //this.setState({isCalling:false});
        }

        const currentCallIndex = this.getCurrentCallIndex();
        if( currentCallIndex === -1 ){
            this.getPhoneClientAsParent().getOperatorConsoleAsParent().setCurrentCallIndex(0);
        }

        this._PhoneClientAsParent.getOperatorConsoleAsParent().onAddCallInfoByCallInfos(  this, callInfo );
    }

    /**
     *  abstract method
     */
    _getCallInfoObjects(){
        throw new Error("Not implemented.");
        return new Object();
    }

    /**
     *  abstract method
     *  //!danger return array reference
     */
    getCallInfoArray(){
        throw new Error("Not implemented.");
        return null;
    }

    getCallInfoCount(){
        const array = this.getCallInfoArray();
        const count = array.length;
        return count;
    }

    getCallInfoAt( index ){
        const array = this.getCallInfoArray();
        const callInfo = array[index];
        return callInfo;
    }

    getCurrentCallId(){
        const currentCallIndex = this.getCurrentCallIndex();
        if( currentCallIndex === -1  ){
            return null;
        }
        const callInfo = this.getCallInfoAt( currentCallIndex );
        const callId = callInfo.getCallId();
        return callId;
    }

    getCallInfoWherePbxRoomIdEqual( pbxRoomId ){
        const array = this.getCallInfoArray();
        const callInfoFind = array.find((callInfo) => callInfo.getPbxRoomId() === pbxRoomId );
        return callInfoFind;
    }

    getCallInfoWhereTalkerIdEqual( talkerId ){
        const callInfoArray = this.getCallInfoArray();
        const itm = callInfoArray.find( ( element ) =>{
            if( element.getPbxTalkerId() === talkerId ){
                return true;
            }
            return false;
        });
        return itm;
    }

    getCallIndexWhereCallIdEqual( callId ){
        const callInfoArray = this.getCallInfoArray();
        const itm = callInfoArray.findIndex( ( element ) =>{
            if( element.getCallId() === callId ){
                return true;
            }
            return false;
        });
        return itm;
    }

    /**
     *  abstract method
     * @returns {number}
     */
    getCurrentCallIndex(){
        throw new Error("Not implemented.");
        return -1;
    }

    /**
     *  abstract method
     * @param index number
     */
    setCurrentCallIndexByOperatorConsole( index ){
        throw new Error("Not implemented.");
    }

    getCurrentCallInfo(){
        const currentCallIndex = this.getCurrentCallIndex();
        if( currentCallIndex === -1 ){
            return null;
        }
        const callInfo = this.getCallInfoAt( currentCallIndex );
        return callInfo;
    }

    getCallIndexByCallId( callId ){
        const array = this.getCallInfoArray();
        for( let i = 0; i < array.length; i++ ){
            const callInfo = array[i];
            const callId_ = callInfo.getCallId();
            if( callId_ === callId ){
                return i;
            }
        }
        return -1;
    }

    getCallIdByIndex( index ){
        const array = this.getCallInfoArray();
        if( index < 0 || index >= array.length ){
            return null;
        }
        const callInfo = array[index];
        const callId = callInfo.getCallId();
        return callId;
    }

    _getCallInfoByCallId( id ){
        const callInfo = this._getCallInfoObjects()[id];
        return callInfo;
    }

    getCallInfoIndexByCallInfo( callInfo ){
        const array = this.getCallInfoArray();
        const index = array.indexOf( callInfo );
        return index;
    }


    //!callme
    onEndCallByPhoneClient(callId){
        const callInfo = this._getCallInfoByCallId( callId );
        if( !callInfo ){
            return;
        }

        const removeCallIndex = this.getCallIndexByCallId(callId);

        let currentCallIndex = this.getCurrentCallIndex();
        if (removeCallIndex === currentCallIndex ) {
            if( this.getCallInfoArray().length > 1 ) {
                currentCallIndex=0;
            }
            else{
                currentCallIndex = -1;
            }
        }
        else if(removeCallIndex < currentCallIndex ){
            currentCallIndex--;
        }

        // const callById = {...this.callById};
        // deleteProperty(callById, call.id);
        // this._callIds = [...this._callIds].filter(id => id !== call.id);
        // this.callById = callById;
        //this.setState({this._callIds, this.callById});

        const callInfoArray = this.getCallInfoArray();
        for( let i = 0; i < callInfoArray.length; i++ ){
            const callInfo = callInfoArray[i];
            if( callInfo.getCallId() === callId ){
                callInfoArray.splice( i, 1 );
                break;
            }
        }
        const callInfos = this._getCallInfoObjects();
        delete callInfos[ callId ];

        const oc = this._PhoneClientAsParent.getOperatorConsoleAsParent();
        oc.setCurrentCallIndex( currentCallIndex );
        oc.onRemoveCallInfoByCallInfos( this, callInfo );

    }

    isCurrentCallByCallId( callId ){
        const callIndex = this.getCallIndexByCallId( callId );
        //!forBug need callIndex === -1 check?
        const currentCallIndex = this.getCurrentCallIndex();
        const bCurrent = callIndex === currentCallIndex;
        return bCurrent;
    }

    _getCallInfoByCallId( id ){
        const callInfo = this._getCallInfoObjects()[id];
        return callInfo;
    }

    getCurrentCallInfo(){
        const currentCallIndex = this.getCurrentCallIndex();
        if( currentCallIndex === -1  ){
            return null;
        }
        const callInfo = this.getCallInfoAt( currentCallIndex );
        return callInfo;
    }
}