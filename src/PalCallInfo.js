import ACallInfo from "./ACallInfo";
import PalCallInfos from "./PalCallInfos";
import Notification from "antd/lib/notification";
import i18n from "./i18n";

export default class PalCallInfo extends ACallInfo {

    constructor( palCallInfosAsParent, callId, palNotifyStatusEventParam ) {
        super( palCallInfosAsParent );
        this._PalCallInfosAsParent = palCallInfosAsParent;

        const e = palNotifyStatusEventParam;
        const status = parseInt( e["status"] );

        //determine partyName and partyNumber
        //const user = e["user"];
        //const pbxUsername = this._PalCallInfosAsParent.getPhoneClientAsParent().getOperatorConsoleAsParent().getLoggedinUsername();

        let partyName;
        let partyNumber;
        let isIncoming;

        // if(  pbxUsername === user )  {
            partyName = e["other_display_name"] === undefined ? null : e["other_display_name"];
            partyNumber = e["other_number"] === undefined ? null : e["other_number"];
            if( status === PalCallInfos.PAL_NOTIFY_STATUS_STATUSES.incoming ){
                isIncoming = false;
            }
            else {
                isIncoming = e["role"] !== 'c';
            }
        // }
        // else{
        //     partyName = e["user_display_name"] === undefined ? null : e["user_display_name"];
        //     partyNumber = e["user"] === undefined ? null : e["user"];
        //     isIncoming = status === PalCallInfos.PAL_NOTIFY_STATUS_STATUSES.incoming;
        // }



        this._CallId = callId;
        this._pbxRoomId = e["room_id"];
        this._pbxTalkerId = e["talker_id"];
        this._incoming = isIncoming;
        this._answered = status === PalCallInfos.PAL_NOTIFY_STATUS_STATUSES.answerSuccess || status === PalCallInfos.PAL_NOTIFY_STATUS_STATUSES.callSuccess;  //!testit
        this._answeredAt = this._answered === true ? e["time"] : null;    //!testit
        this._holding = status === PalCallInfos.PAL_NOTIFY_STATUS_STATUSES.hold;
        this._recording = false;
        //this._muted = callObject.muted;
        //this._toggleMuted = callObject.toggleMuted;
        this._partyName = partyName;
        this._partyNumber = partyNumber;

    }

    /**
     * update information by PAL notify_status event
     * @param palNotifyStatusEventParam
     */
    onFlushPalNotifyStatusEventByPalCallInfos( palNotifyStatusEventParam ){
        const e = palNotifyStatusEventParam;
        const status = parseInt( e["status"] );
        switch( status ){
            case PalCallInfos.PAL_NOTIFY_STATUS_STATUSES.disconnect:    //disconnect
            // if( e["rescode"] === 404 && e["disconnected_by"] === "1" ){
            //     break;
            // }
            this._PalCallInfosAsParent.getPhoneClientAsParent().onDisconnectByPalCallInfo( this );
            return;
            case PalCallInfos.PAL_NOTIFY_STATUS_STATUSES.callSuccess:
                const bMakeCall =  e["role"] === 'c';
                if( !bMakeCall ) {
                    this._answered = true;
                    this._answeredAt = e["time"];
                }
                break;
            case PalCallInfos.PAL_NOTIFY_STATUS_STATUSES.answerSuccess:
                this._answered = true;
                this._answeredAt = e["time"];
                break;
            case PalCallInfos.PAL_NOTIFY_STATUS_STATUSES.unhold:
                this._holding = false;
                this._PalCallInfosAsParent.getPhoneClientAsParent().getOperatorConsoleAsParent().onUnholdByCallInfo(this);
                break;
            case PalCallInfos.PAL_NOTIFY_STATUS_STATUSES.hold:
                this._holding = true;
                this._PalCallInfosAsParent.getPhoneClientAsParent().getOperatorConsoleAsParent().onHoldByCallInfo(this);
                break;
            case PalCallInfos.PAL_NOTIFY_STATUS_STATUSES.answerCallee:
                this._pbxRoomId = e["room_id"];
                this._answered = true;
                this._answeredAt = e["time"];
                this._PalCallInfosAsParent.getPhoneClientAsParent().getOperatorConsoleAsParent().onAnswerCalleeByPalCallInfo( this );
                break;
        }
        this._PalCallInfosAsParent.getPhoneClientAsParent().getOperatorConsoleAsParent().onUpdateCallInfoByCallInfo(this);
    }

    onCallSuccessByPalCallInfos( eNotifyStatus ){
        this._answered = true;
        this._answeredAt = eNotifyStatus["time"];
        this._PalCallInfosAsParent.getPhoneClientAsParent().getOperatorConsoleAsParent().onCallSuccessByPalCallInfo(this);

    }

    /**
     *  overload method
     */
    hangupWithUnhold() {
        const phoneClient = this._PalCallInfosAsParent.getPhoneClientAsParent();
        const this_ = this;
        if( this.getIsHolding() ){
            phoneClient.unhold( this, function( res, obj ){
                if( res.startsWith("failed")) {
                    console.error("Failed to unhold call. res=", res );
                    Notification.error({message: i18n.t('failedToUnholdCall') + "\r\n" + res, duration: 0});
                }
                else {
                    this_._hangUp();
                }
            },
            function( err ){
                console.error("Failed to unhold call. err=", err );
                Notification.error({message: i18n.t('failedToUnholdCall') + "\r\n" + err, duration:0 });
            });
        }
        else{
            this._hangUp();
        }
    }

    _hangUp(){
        const phoneClient = this._PalCallInfosAsParent.getPhoneClientAsParent();
        phoneClient.hangup( this,
            function( res, obj){

            },
            function( err ) {
                console.error("Failed to hangup call. err=", err );
                Notification.error({message: i18n.t('failedToHangupCall') + "\r\n" + err, duration:0 });
            }
        );
    }

    /**
     *  overload method
     */
    toggleHoldWithCheck() {
        if( this.getIsHolding() === true ){
            this._CallInfosAsParent.getPhoneClientAsParent().unhold( this,
                function( res, obj){
                    if( res.startsWith("failed")) {
                        console.error("Failed to unhold call. res=", res );
                        Notification.error({message: i18n.t('failedToUnholdCall') + "\r\n" + res, duration: 0});
                    }
                },
                function( err ) {
                    console.error("Failed to unhold call. err=", err );
                    Notification.error({message: i18n.t('failedToUnholdCall') + "\r\n" + err, duration:0 });
                }
            );
        }
        else{
            this._CallInfosAsParent.getPhoneClientAsParent().hold( this,
                function( res, obj){

                },
                function( err ) {
                    console.error("Failed to hold call. err=", err );
                    Notification.error({message: i18n.t('failedToHoldCall') + "\r\n" + err, duration:0 });
                }
            );
        }
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

     /**
     *  overload method
     * @returns {*}
     */
    getCallId() {
        return this._CallId;
    }

    /**
     *  overload method
     */
    answerCall() {
        this._CallInfosAsParent.getPhoneClientAsParent().answerCall( this,
            function( res, obj){
                if( res && res.startsWith("failed")){
                    console.error("Failed to answer call. res=", res );
                    Notification.error({message: i18n.t('failedToAnswerCall') + "\r\n" + res, duration:0 });
                }
            },
            function( err ) {
                console.error("Failed to answer call. err=", err );
                Notification.error({message: i18n.t('failedToAnswerCall') + "\r\n" + err, duration:0 });
            }
        );
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
        return false;   //Not supported
    }

    /**
     *  overload method
     */
    toggleMutedAsync() {
        //Not supported
        const promise =  new Promise(  ( resolve, reject ) =>
            {
                const errMsg = i18n.t("thisFeatureIsNotSupported");
                reject(errMsg);
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
                const this_ = this;
                if( this.getIsRecording() === true ){
                    this._CallInfosAsParent.getPhoneClientAsParent().stopRecording( this,
                        function( res, obj){
                            this_._recording = false;
                            resolve();
                        },
                        function( err ) {
                            console.error("Failed to stop recording. err=", err );
                            const errMsg = i18n.t('failedToStopRecording') + "\r\n" + err;
                            reject(errMsg);
                        }
                    );
                }
                else{
                    this._CallInfosAsParent.getPhoneClientAsParent().startRecording( this,
                        function( res, obj){
                            this_._recording = true;
                            resolve();
                        },
                        function( err ) {
                            console.error("Failed to start recording. err=", err );
                            const errMsg = i18n.t('failedToStartRecording') + "\r\n" + err;
                            reject(errMsg);
                        }
                    );
                }
            }
        );
        return promise;

    }

    /**
     *  overload method
     */
    conference(){
        const phoneClient = this._CallInfosAsParent.getPhoneClientAsParent();
        phoneClient.conference( this,
            function( res, obj){
                if( res && res.startsWith("failed")){
                    console.error("Failed to conference call. res=", res );
                    Notification.error({message: i18n.t('failedToConferenceCall') + "\r\n" + res, duration:0 });
                }
            },
            function( err ) {
                console.error("Failed to conference call. err=", err );
                Notification.error({message: i18n.t('failedToConferenceCall') + "\r\n" + err, duration:0 });
            }
        );
    }

}