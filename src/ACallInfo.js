import { v4 as uuidv4 } from 'uuid';

/**
 *  abstract class
 */
export default class ACallInfo {
    constructor( callInfosAsParent ) {
        this._CallInfosAsParent = callInfosAsParent;
        this._CallInfoUuid = uuidv4();
    }

    /**
     *  abstract method
     */
    hangupWithUnhold(){
        throw new Error("Not implemented.");
    }

    /**
     *  abstract method
     */
    hangup(){
        throw new Error("Not implemented.");
    }

    /**
     *  abstract method
     */
    conference(){
        throw new Error("Not implemented.");
    }

    /**
     * abstract method
     */
    getPbxRoomId(){
        throw new Error("Not implemented.");
        return null;
    }

    /**
     *  abstract method
     */
    getPbxTalkerId(){
        throw new Error("Not implemented.");
        return null;
    }

    /**
     *  abstract method
     * @returns {boolean}
     */
    getIsIncoming(){
        throw new Error("Not implemented.");
        return false;
    }

    /**
     *  abstract method
     * @returns {boolean}
     */
    getIsAnswered(){
        throw new Error("Not implemented.");
        return false;
    }

    /**
     * abstract method
     * @returns {null}
     */
    getPartyNumber(){
        throw new Error("Not implemented.");
        return null;
    }

    /**
     *  abstract method
     * @returns {string}
     */
    getPartyName(){
        throw new Error("Not implemented.");
        return "";
    }

    /**
     *  abstract method
     * @returns {null}
     */
    getCallId(){
        throw new Error("Not implemented.");
        return null;
    }

    /**
     *  abstract method
     */
    answerCall(){
        throw new Error("Not implemented.");
    }

    /**
     * abstract method
     * @returns {number}
     */
    getAnsweredAt(){
        throw new Error("Not implemented.");
        return -1;
    }

    /**
     * abstract method
     * @returns {boolean}
     */
    getIsHolding(){
        throw new Error("Not implemented.");
        return false;
    }

    /**
     *  abstract method
     * @returns {boolean}
     */
    getIsRecording(){
        throw new Error("Not implemented.");
        return false;
    }

    /**
     *  abstract method
     * @returns {boolean}
     */
    getIsMuted(){
        throw new Error("Not implemented.");
        return false;
    }

    getCallStatus() {
        let status = null;
        if (this.getIsHolding() === true) {
            status = ACallInfo.CALL_STATUSES.holding;
        } else if (this.getIsAnswered() === true) {
            status = ACallInfo.CALL_STATUSES.talking;
        } else if (this.getIsIncoming() === true) {
            status = ACallInfo.CALL_STATUSES.incoming;
        } else {
            status = ACallInfo.CALL_STATUSES.calling;
        }
        return status;
    }

    /**
     *  abstract method
     */
    toggleHoldWihtCheck( okFunc, ngFunc ){
        throw new Error("Not implemented.");
    }

    /**
     *  abstrace method
     */
    toggleMutedAsync(){
        throw new Error("Not implemented.");
    }

    /**
     *  abstrace method
     */
    toggleRecordingAsync(){
        throw new Error("Not implemented.");
        return new Promise( null );
    }

    /**
     *  abstract  method
     * @param func
     */
    addOnHoldFunction( func ) {
        throw new Error("Not implemented.");
    }

    /**
     *  abstract method
     * @param func
     * @return is deleted.
     */
    removeOnHoldFunction( func ){
        throw new Error("Not implemented.");
    }

    getCallInfoUuid(){
        return this._CallInfoUuid;
    }

}
//!modify OperatorConsole ref from 202404240424
ACallInfo.CALL_STATUSES ={
    //unknown : 0,
    talking: 1,
    holding: 2,
    calling: 3,
    incoming : 4
}