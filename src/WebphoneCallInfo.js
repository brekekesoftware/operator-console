import ACallInfo from "./ACallInfo";
import Notification from "antd/lib/notification";
import i18n from "./i18n";
import PalCallInfos from "./PalCallInfos";
import BrekekeOperatorConsole from "./index";

export default class WebphoneCallInfo extends ACallInfo {

    constructor( webphoneCallInfosAsParent, callObject) {
        super( webphoneCallInfosAsParent );
        this._WebphoneCallInfosAsParent = webphoneCallInfosAsParent;
        this._OnHoldFunctions = new Array();    //!const
        this._Id = callObject.id;
        this._hangup = callObject.hangup;
        this._conferenceTransferring = callObject.conferenceTransferring;
        this._pbxRoomId = callObject.pbxRoomId;
        this._pbxTalkerId = callObject.pbxTalkerId;
        this._incoming = callObject.incoming;
        this._answered = callObject.answered;
        this._partyNumber = callObject.partyNumber;
        this._answer = callObject.answer;
        this._answeredAt = callObject.answeredAt;
        this._holding = callObject.holding;
        this._recording = callObject.recording;
        this._muted = callObject.muted;
        this._partyName = callObject.partyName;
        this._toggleHoldWithCheck = callObject.toggleHoldWithCheck;
        this._toggleMuted = callObject.toggleMuted;
        this._toggleRecording = callObject.toggleRecording;
        this._setHolding = callObject.setHolding;
        this._CallObject = callObject;
        this._isVideoEnable = true;
    }

    isVideoEnable() {
        return this._isVideoEnable;
    }

    isVideoActive(){
        const b = this._isVideoActive;
        return b;
    }

    startVideo(){
        const callObject = this._CallObject;
        callObject.videoStreamActive = true;
        this._isVideoActive = true;
    }

    stopVideo(){
        const callObject = this._CallObject;
        callObject.videoStreamActive = false;
        this._isVideoActive = false;
    }

    /**
     *  overload method
     */
    conference(){
       const promise =  this._conferenceTransferring();
       const this_ = this;
       promise.then( function(res){ //res is true.
           //console.log("Succeeded  to conference call. res=", res );
           if( res === true || res === "true") {    //success
               this_.setIsTransferring(false);
           }
       }, function(res){
           console.error("Failed to conference call. res=", res );
           Notification.error({message: i18n.t('failedToConferenceCall') + "\r\n" + res, duration:0 });
       } );
    }

    /**
     * overload method
     */
    setHolding( b ){
        this._setHolding(b);
    }


        /**
     *  overload method
     */
    toggleHoldWithCheck() {
        this._toggleHoldWithCheck();
    }

    /**
     *  overload method
     */
    getPbxRoomId() {
        return this._pbxRoomId;
    }

    /**
     *  overload method
     */
    getPbxTalkerId() {
        return this._pbxTalkerId;
    }

    /**
     *  overload method
     * @returns {boolean}
     */
    getIsIncoming() {
        return this._incoming === true;
    }

    /**
     *  overload method
     * @returns {boolean}
     */
    getIsAnswered() {
        return this._answered === true;
    }

    /**
     * overload method
     */
    getPartyNumber() {
        return this._partyNumber;
    }

    /**
     *  overload method
     * @returns {*}
     */
    getPartyName() {
        return this._partyName;
    }

    _onHold(){
        this._WebphoneCallInfosAsParent.getPhoneClientAsParent().getOperatorConsoleAsParent().onHoldByCallInfo(this);

        const onHoldFunctions = [...this._OnHoldFunctions];
        for( let i = 0; i < onHoldFunctions.length; i++ ) {
            const func = onHoldFunctions[i];
            func( this );   //!forBug needs try catch?
        }

    }

    _onUnhold(){
        this._WebphoneCallInfosAsParent.getPhoneClientAsParent().getOperatorConsoleAsParent().onUnholdByCallInfo(this);
    }

    onUpdateWebphoneCallObjectProperty(field, val) {
        const propertyName = "_" + field;
        this[propertyName] = val;

        if( field === "holding" ){
            if( val === true ){
                this._onHold();
            }
            else if( val === false ){
                this._onUnhold();
            }
        }

        //When a call turns into a talk, if the call is not active, place the call on hold.
        if( field === "answered" && val === true ) {
            const callStatus = this.getCallStatus();
            if ( callStatus === ACallInfo.CALL_STATUSES.talking ) {
                const bActive = this._WebphoneCallInfosAsParent.isCurrentCallByCallId( this.getCallId() );
                if (!bActive) {
                    this.toggleHoldWithCheck();
                }
            }
        }
    }

    onUpdateWebphoneCallObject(callObject) {
        const wasAnsweredAt = this._answeredAt;

        this._hangup = callObject.hangup;
        this._pbxRoomId = callObject.pbxRoomId;
        this._pbxTalkerId = callObject.pbxTalkerId;
        this._incoming = callObject.incoming;
        this._answered = callObject.answered;
        this._partyNumber = callObject.partyNumber;
        this._answer = callObject.answer;
        this._answeredAt = callObject.answeredAt;
        this._holding = callObject.holding;
        this._recording = callObject.recording;
        this._muted = callObject.muted;
        this._partyName = callObject.partyName;
        this._toggleHoldWithCheck = callObject.toggleHoldWithCheck;
        this._toggleMuted = callObject.toggleMuted;
        this._toggleRecording = callObject.toggleRecording;
        this._setHolding = callObject.setHolding;

        if( this._incoming ) {
            if (!wasAnsweredAt || wasAnsweredAt === 0) {
                if (this._answeredAt && this._answeredAt !== 0) {
                    //answered incoming call.
                    this._WebphoneCallInfosAsParent.getPhoneClientAsParent().getOperatorConsoleAsParent().onAnswerIncomingCallByCallInfo( this );
                }
            }
        }
        this._WebphoneCallInfosAsParent.getPhoneClientAsParent().getOperatorConsoleAsParent().onUpdateCallInfoByCallInfo(this);

    }

    /**
     *  overload method
     * @returns {*}
     */
    getCallId() {
        return this._Id;
    }

    /**
     *  Overload method
     */
    hangup(){
        this._hangup();
        this._isHangupSelf = true;
        //const cl = this._WebphoneCallInfosAsParent.getWebphonePhoneClientAsParent();
        //cl.hangup( this );
    }

    /**
     *  overload method
     */
    answerCall() {
        this._answer();
        BrekekeOperatorConsole.getStaticInstance().onAnsweredCallByWebphoneCallInfo(this);
    }

    /**
     * overload method
     * @returns {number}
     */
    getAnsweredAt() {
        return this._answeredAt;
    }

    /**
     *  overload method
     * @returns {*}
     */
    getIsHolding() {
        return this._holding;
    }

    /**
     * overload method
     * @returns {boolean}
     */
    getIsRecording() {
        return this._recording;
    }

    /**
     *  overload method
     * @returns {boolean}
     */
    getIsMuted() {
        return this._muted;
    }

    /**
     *  overload method
     */
    toggleMutedAsync() {
        const promise =  new Promise(  ( resolve, reject ) =>
            {
                try {
                    this._toggleMuted();
                }
                catch(err){
                    console.error("Failed to toggleMuted. err=" , err );
                    const errMsg = i18n.t("failedToToggleMuted") + "\r\n" + err;
                    reject(errMsg);
                    return;
                }
                resolve();
            }
        );
        return promise;
    }

    /**
     *  overload method
     */
    toggleRecordingAsync(){
        const promise =  new Promise(  ( resolve, reject ) =>
            {
                try {
                    this._toggleRecording();
                }
                catch(err){
                    console.error("Failed to toggleRecording. err=" , err );
                    const errMsg = i18n.t("failedToToggleRecording") + "\r\n" + err;
                    reject(errMsg);
                    return;
                }
                resolve();
            }
        );
        return promise;
    }

    /**
     *  overload method
     * @param func
     */
    addOnHoldFunction( func ) {
        this._OnHoldFunctions.push( func );
    }

    /**
     *  overload method
     * @param func
     * @return is deleted.
     */
    removeOnHoldFunction( func ) {
        const index = this._OnHoldFunctions.indexOf(func);
        if( index === -1 ){
            return false;
        }

        this._OnHoldFunctions.splice(index, 1);
        return true;
    }

    onFlushPalNotifyStatusEventByWebphoneCallInfos(e){
        const status = parseInt( e["status"] );
        switch( status ){
            case PalCallInfos.PAL_NOTIFY_STATUS_STATUSES.transferFail:
                this.setIsTransferring(false);
                break;
            //It is not enough to just monitor UNHOLD for callObject, so monitor it and make it UNHOLD as well.
            case PalCallInfos.PAL_NOTIFY_STATUS_STATUSES.unhold:
                const bHolding = this.getIsHolding();
                if( bHolding ){
                    this._holding = false;
                    this._setHolding(false);
                }
                break;
            case PalCallInfos.PAL_NOTIFY_STATUS_STATUSES.transferResponse:
                //this.setIsTransferring(false);
                const temp = 0;
                break;
        }
    }
}