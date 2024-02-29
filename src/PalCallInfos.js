import ACallInfos from "./ACallInfos";
import {reaction} from "mobx";
import PalCallInfo from "./PalCallInfo";
import PalPhoneClient from "./PalPhoneClient";
import ACallInfo from "./ACallInfo";

export default class PalCallInfos extends ACallInfos{
    constructor( options ) {
        super( options  );
        this._PalCallInfoArray = new Array();
        this._PalCallInfoObject = new Object();    //{callid:palCallInfo}
        this._currentCallIndex = -1;

        //this._RoomIdTalkerIdCallInfos = new Object; //{ roomId, {talkerId:palCallInfo}}
        this._latestCallId = -1;
    }

    // _getCallInfoByRoomIdAndTalkerId( roomId, talkerId ){
    //     const talkerIdPalCallInfos = this._RoomIdTalkerIdCallInfos[ roomId ];
    //     if( !talkerIdPalCallInfos ){
    //         return null;
    //     }
    //     const palCallInfo = talkerIdPalCallInfos[ talkerId ];
    //     return palCallInfo;
    // }

    _addCallInfoByPalCallInfos(  palNotifyStatusEventParam ){
        this._latestCallId++;
        const callId = this._latestCallId;
        const palCallInfo = new PalCallInfo(this, callId, palNotifyStatusEventParam );

        // const roomId = palCallInfo.getPbxRoomId();
        // const talkerId = palCallInfo.getPbxTalkerId();

        // let talkerIdPalCallInfos = this._RoomIdTalkerIdCallInfos[ roomId ];
        // if( !talkerIdPalCallInfos ){
        //     talkerIdPalCallInfos = new Object();    //{talkerId:palCallInfo}
        //     this._RoomIdTalkerIdCallInfos[ roomId ] = talkerIdPalCallInfos;
        //     talkerIdPalCallInfos[ talkerId ] = palCallInfo;
        // }
        // else{
        //     if( talkerIdPalCallInfos[ talkerId ] ){
        //         throw new Error("PalCallInfo already exists.");
        //         return;
        //     }
        //     talkerIdPalCallInfos[ talkerId ] = palCallInfo;
        // }

        this._PalCallInfoArray.push( palCallInfo );
        this._PalCallInfoObject[ palCallInfo.getCallId() ] = palCallInfo;

        this.onAddCallInfoByCallInfosSubclass( this, palCallInfo );

        return palCallInfo;
    }

    /**
     *  overload method
     * @private
     */
    _getCallInfoObjects(){
        return this._PalCallInfoObject;
    }

    /**
     *  overload method
     *  //!danger return array reference
     */
    getCallInfoArray() {
        return this._PalCallInfoArray;
    }

    onFlushPalNofityStatusEventByPalPhoneClient(e){
        const status = parseInt( e.status );
        const phoneIdx = e["phone_idx"]

        if( status === PalCallInfos.PAL_NOTIFY_STATUS_STATUSES.callSuccess && phoneIdx == PalPhoneClient.PHONE_INDEX) {
            const role = e.role;
            const roomId = e.room_id;
            if (role === 's') {
                const callInfoCount = this.getCallInfoCount();
                for (let i = 0; i < callInfoCount; i++) {
                    const callInfo = this.getCallInfoAt(i);
                    const bRoom = roomId === callInfo.getPbxRoomId();
                    if (bRoom) {
                        if (callInfo.getCallStatus() === ACallInfo.CALL_STATUSES.calling) {
                            callInfo.onCallSuccessByPalCallInfos(e);
                            return;
                        }
                    }
                }
            }
        }

        const username = this._PhoneClientAsParent.getOperatorConsoleAsParent().getLoggedinUsername();
        if( e["user"] !== username  ){
            return;
        }

        const talkerId = e.talker_id;
        const callInfoIndex = this._getCallInfoIndexByTalkerId( talkerId );
        if( callInfoIndex !== -1 ){
            const palCallInfo = this.getCallInfoAt( callInfoIndex );
            palCallInfo.onFlushPalNotifyStatusEventByPalCallInfos( e );
            return;
        }

        if( phoneIdx != PalPhoneClient.PHONE_INDEX ){
            return;
        }


        switch( status ){
            case PalCallInfos.PAL_NOTIFY_STATUS_STATUSES.calling:
                this._addCallInfoByPalCallInfos( e );
                break;
            case PalCallInfos.PAL_NOTIFY_STATUS_STATUSES.incoming:
                //call from sip phone
                this._addCallInfoByPalCallInfos( e );
                break;
        }
    }

    /**
     * overload method
     *  @returns {number}
     */
    getCurrentCallIndex(){
        return this._currentCallIndex;
    }

    /**
     *  overload method
     * @param index number
     */
    setCurrentCallIndexByOperatorConsole( index ){
        this._currentCallIndex = index;
    }

    onUpdateCallObjectByWebphoneClient( call ){
        //this.callById = {...this.callById};
        // setProperty(this.callById, call.id, {
        //     ...(this.callById[call.id] || {}),
        //     id: call.id,
        //     pbxTenant: call.pbxTenant,
        //     pbxTalkerId: call.pbxTalkerId,
        //     pbxRoomId: call.pbxRoomId,
        //     createdAt: call.createdAt,
        //     answeredAt: call.answeredAt,
        //     partyName: call.partyName,
        //     partyNumber: call.partyNumber,
        //     incoming: call.incoming,
        //     answered: call.answered,
        //     holding: call.holding,
        //     toggleHoldWithCheck: call.toggleHoldWithCheck,
        //     hangupWithUnhold: call.hangupWithUnhold,
        //     answer: call.answer,
        //     toggleRecording: call.toggleRecording,
        //     toggleMuted: call.toggleMuted,
        //     _isExtension: !!this._PhoneClientAsParent.getOperatorConsoleAsParent().getExtensions().find((ext) => ext.id == call.partyNumber),
        // });
        const callInfo = this._getCallInfoByCallId( call.id );
        callInfo.onUpdateWebphoneCallObject( call );
    }

    _getCallInfoIndexByTalkerId( talkerId ){
        for( let i = 0; i < this._PalCallInfoArray.length; i++ ){
            const ci = this._PalCallInfoArray[i];
            const b = ci.getPbxTalkerId() === talkerId;
            if( b ){
                return i;
            }
        }
        return -1;
    }

    // onDisconnectByPalCallInfo( palCallInfo ){
    //     const removeCallIndex = this.getCallInfoIndexByCallInfo( palCallInfo );
    //     let currentCallIndex = this.getCurrentCallIndex();
    //     if (removeCallIndex === currentCallIndex ) {
    //         if( this.getCallInfoArray().length > 1 ) {
    //             currentCallIndex = 0;
    //         }
    //         else{
    //             currentCallIndex = -1;
    //         }
    //     }
    //     else if(removeCallIndex < currentCallIndex ){
    //         currentCallIndex--;
    //     }
    //
    //     // const callById = {...this.callById};
    //     // deleteProperty(callById, call.id);
    //     // this._callIds = [...this._callIds].filter(id => id !== call.id);
    //     // this.callById = callById;
    //     //this.setState({this._callIds, this.callById});
    //
    //     const callId = palCallInfo.getCallId();
    //     const callInfoArray = this.getCallInfoArray();
    //     for( let i = 0; i < callInfoArray.length; i++ ){
    //         const callInfo = callInfoArray[i];
    //         if( callInfo.getCallId() === callId ){
    //             callInfoArray.splice( i, 1 );
    //             break;
    //         }
    //     }
    //     delete this._PalCallInfoObject[ callId ];
    //
    //     const oc = this._PhoneClientAsParent.getOperatorConsoleAsParent();
    //     oc.setCurrentCallIndex( currentCallIndex );
    //     oc.onRemoveCallInfoByCallInfos( this, palCallInfo );
    // }


    static PAL_NOTIFY_STATUS_STATUSES ={
        calling : 0,
        incoming : 1,
        callSuccess : 2,
        endTalking : 12,
        answerSuccess : 14,
        parkCancel : 21,
        parkStart : 30,
        startRinging : 65,
        hold : 35,
        unhold : 36,
        disconnect : -1,
        answerCallee : 16
    };
}
// PalCallInfos.PAL_NOTIFY_STATUS_STATUSES ={
//     calling : 0,
//     incoming : 1,
//     callSuccess : 2,
//     endTalking : 12,
//     answerSuccess : 14,
//     parkCancel : 21,
//     parkStart : 30,
//     startRinging : 65,
//     hold : 35,
//     unhold : 36,
//     disconnect : -1
// };
