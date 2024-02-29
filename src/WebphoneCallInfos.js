import ACallInfos from "./ACallInfos";
import WebphoneCallInfo from "./WebphoneCallInfo";
import {reaction} from "mobx";

export default class WebphoneCallInfos extends ACallInfos{
    constructor( options ) {
        super( options  );
        this._WebphoneCallInfoArray = new Array();
        this._WebphoneCallInfoObject = new Object();    //{callid:webphoneCallInfo}
        this._currentCallIndex = -1;
        //this._callIds = new Array();
        //this.callById = new Object();
    }

    /**
     *  overload method
     * @private
     */
    _getCallInfoObjects(){
        return this._WebphoneCallInfoObject;
    }

    /**
     *  overload method
     *  //!danger return array reference
     */
    getCallInfoArray() {
        return this._WebphoneCallInfoArray;
    }

    addCallInfoByWebphoneCallObject( callObject ){
            const callInfo = new WebphoneCallInfo( this, callObject );
            this._WebphoneCallInfoArray.push( callInfo );
            this._WebphoneCallInfoObject[ callObject.id ] = callInfo;

        [
            'id',
            'answered',
            'answeredAt',
            'muted',
            'recording',
            'holding',
            'transferring',
        ].forEach((field) => {
            reaction(() => callObject[field], async (val) => {
                console.log('call changed', field, val);
                if (this._getCallInfoByCallId(callObject.id) ){
                    //this.callById = {...this.callById};
                    //setProperty(this.callById, `${callObject.id}.${field}`, val);


                    const callInfo = this._getCallInfoByCallId( callObject.id );
                    callInfo.onUpdateWebphoneCallObjectProperty( field, val );
                }
            })
        })

        this.onAddCallInfoByCallInfosSubclass( this, callInfo );
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
}