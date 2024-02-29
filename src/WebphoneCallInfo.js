import ACallInfo from "./ACallInfo";

export default class WebphoneCallInfo extends ACallInfo {

    constructor( webphoneCallInfosAsParent, callObject) {
        super( webphoneCallInfosAsParent );
        this._WebphoneCallInfosAsParent = webphoneCallInfosAsParent;
        this._Id = callObject.id;
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


}