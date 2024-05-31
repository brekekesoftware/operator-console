import ACallInfo from "./ACallInfo";
import Notification from "antd/lib/notification";
import i18n from "./i18n";

export default class WebphoneCallInfo extends ACallInfo {

    constructor( webphoneCallInfosAsParent, callObject) {
        super( webphoneCallInfosAsParent );
        this._WebphoneCallInfosAsParent = webphoneCallInfosAsParent;
        this._OnHoldFunctions = new Array();    //!const
        this._Id = callObject.id;
        this._hangupWithUnhold = callObject.hangupWithUnhold;
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



    }

    /**
     *  overload method
     */
    hangupWithUnhold() {
        this._hangupWithUnhold();
    }

    /**
     *  overload method
     */
    conference(){
       const promise =  this._conferenceTransferring();
       promise.then( function(res){ //res is true.
           //console.log("Succeeded  to conference call. res=", res );
       }, function(res){
           console.error("Failed to conference call. res=", res );
           Notification.error({message: i18n.t('failedToConferenceCall') + "\r\n" + res, duration:0 });
       } );
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

    onUpdateWebphoneCallObjectProperty(field, val) {
        const propertyName = "_" + field;
        this[propertyName] = val;

        if( field === "holding" ){
            if( val === true ){
                this._WebphoneCallInfosAsParent.getPhoneClientAsParent().getOperatorConsoleAsParent().onHoldByCallInfo(this);

                const onHoldFunctions = [...this._OnHoldFunctions];
                for( let i = 0; i < onHoldFunctions.length; i++ ) {
                    const func = onHoldFunctions[i];
                    func( this );   //!forBug needs try catch?
                }
            }
            else if( val === false ){
                this._WebphoneCallInfosAsParent.getPhoneClientAsParent().getOperatorConsoleAsParent().onUnholdByCallInfo(this);
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

        this._hangupWithUnhold = callObject.hangupWithUnhold;
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

        if( this._incoming ) {
            if (!wasAnsweredAt || wasAnsweredAt === 0) {
                if (this._answeredAt && this._answeredAt !== 0) {
                    //answered incoming call.
                    this._WebphoneCallInfosAsParent.getPhoneClientAsParent().getOperatorConsoleAsParent().onAnswerIncomingCallByPalCallInfo( this );
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
        const cl = this._WebphoneCallInfosAsParent.getWebphonePhoneClientAsParent();
        cl.hangup( this );
    }

    /**
     *  overload method
     */
    answerCall() {
        this._answer();
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
}