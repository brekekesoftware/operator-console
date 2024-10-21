import ACallInfo from "./ACallInfo";

/**
 *  for CallTableEditorWidget
 */
export default class DummyCallInfo extends ACallInfo {
    constructor( options  ) {
        //const callInfosAsParent = null;
        super( null );
        this._PartyNumber = options["partyNumber"];
        this._PartyName  = options["partyName"];
        this._IsIncoming = options["isIncoming"];
        this._IsAnswered = options["isAnswered"];
        this._IsHolding = options["isHolding"];
        this._IsRecording = options["isRecording"];
        this._IsMuted = options["isMuted"];
        this._AnsweredAt = options["answeredAt"];
    }

    /**
     *  override method
     * @returns {boolean}
     */
    getIsIncoming(){
        return this._IsIncoming;
    }

    /**
     *  override method
     * @returns {boolean}
     */
    getIsAnswered(){
        return this._IsAnswered;
    }

    /**
     * override method
     * @returns {null}
     */
    getPartyNumber(){
        return this._PartyNumber;
    }

    /**
     *  override method
     * @returns {string}
     */
    getPartyName(){
        return this._PartyName;
    }

    /**
     * override method
     * @returns {number}
     */
    getAnsweredAt(){
        return this._AnsweredAt;
    }

    /**
     * override method
     * @returns {boolean}
     */
    getIsHolding(){
        return this._IsHolding;
    }

    /**
     *  override method
     * @returns {boolean}
     */
    getIsRecording(){
        return this._IsRecording;
    }

    /**
     *  override method
     * @returns {boolean}
     */
    getIsMuted(){
        return this._IsMuted;
    }


}
