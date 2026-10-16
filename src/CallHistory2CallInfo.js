import {add} from "@dnd-kit/utilities";

export  default class CallHistory2CallInfo {

    constructor( options ) {
        this._CallHistory2AsParent = options["callHistory2AsParent"];
        const aCallInfo = options["callInfo"];
        if( aCallInfo ) {
            this._CallInfoUuid = aCallInfo.getCallInfoUuid();
            this._AddCallMillisTime = Date.now();
            this._PartyNumber = aCallInfo.getPartyNumber();
            //this._IsIncoming = aCallInfo.getIsIncoming();
            //this._IsTransfer = aCallInfo.getIsTransferring();
			this._responder = aCallInfo.getResponder();
        }
        else {  //create from log line
            this._CallInfoUuid = options["uuid"];
            this._PartyNumber = options["partyNumber"];
            this._AddCallMillisTime = options["addCallMillisTime"];
            this._answeredAt = options["answeredAt"];
            this._endCallMillisTime =  options["endCallMillisTime"];
            this._recId = options["recId"];
			this._responder = options["responder"];
        }
        this._IsIncoming = options["isIncoming"];
        this._IsTransfer = options["isTransfer"];
    }

    getPartyNumber(){
        return this._PartyNumber;
    }

    getAddCallMillisTime() {
        return this._AddCallMillisTime;
    }

    getIsIncoming() {
        return this._IsIncoming;
    }

    getCallInfoUuid() {
        return this._CallInfoUuid;
    }

    onUpdateCallInfoForCallHistory2CallInfo( callHistory2AsCaller, callInfo ) {
        this._answeredAt = callInfo.getAnsweredAt();
        this._IsIncoming = callInfo.getIsIncoming();    //for notify_status role = c
        this._responder = callInfo.getResponder();
    }

    onRemoveCallInfoForCallHistory2CallInfo( callHistory2AsCaller, callInfo, notifyStatusEvent = undefined )  {
        this._endCallMillisTime = Date.now();
        if( notifyStatusEvent ) {
            this._recId = notifyStatusEvent["rec"];
        }
        this._responder = callInfo.getResponder();
    }

    getAnsweredAt() {
        return this._answeredAt;
    }

    getEndCallMillisTime(){
        return this._endCallMillisTime;
    }

    getIsTransfer(){
        return this._IsTransfer;
    }

    getRecId(){
        return this._recId;
    }
	
	getResponder(){
		return this._responder;
	}

    static getTsvHeaderString() {
        const s =
            CallHistory2CallInfo._toTsvValue("uuid") + "\t" +
            CallHistory2CallInfo._toTsvValue("partyNumber") + "\t" +
            CallHistory2CallInfo._toTsvValue("addCallMillisTime") + "\t" +
            CallHistory2CallInfo._toTsvValue("endCallMillisTime") + "\t" +
            CallHistory2CallInfo._toTsvValue("isIncoming") + "\t" +
            CallHistory2CallInfo._toTsvValue("answeredAt") + "\t" +
            CallHistory2CallInfo._toTsvValue("isTransfer") + "\t" +
            CallHistory2CallInfo._toTsvValue("recId") + "\t" + 
            CallHistory2CallInfo._toTsvValue("responder") + "\t" 			
        ;
        return s;
    }

    /**
     *  get tab separated data string
     */
    getTsvValuesString() {
        const s =
            CallHistory2CallInfo._toTsvValue( this._CallInfoUuid ) + "\t" +
            CallHistory2CallInfo._toTsvValue(this._PartyNumber ) + "\t" +
            CallHistory2CallInfo._toTsvValue(this._AddCallMillisTime) + "\t" +
            CallHistory2CallInfo._toTsvValue(this._endCallMillisTime) + "\t" +
            CallHistory2CallInfo._toTsvValue(this._IsIncoming) + "\t" +
            CallHistory2CallInfo._toTsvValue(this._answeredAt) + "\t" +
            CallHistory2CallInfo._toTsvValue(this._IsTransfer === true ) + "\t" +
            CallHistory2CallInfo._toTsvValue(this._recId ) + "\t" + 
			CallHistory2CallInfo._toTsvValue(this._responder )
		;
        return s;
    }

    static _toTsvValue( o ) {
        if( o === undefined || o === null ){
            return "";
        }

        if (typeof o === 'string' || o instanceof String){
            let s = o.replaceAll("\t", "\\t");
            s = s.replaceAll("\n", "\\n");
            s = s.replaceAll("\r", "\\r");
            return s;
        }
        else{
            const s = o.toString();
            return s;
        }
    }

    static fromTsvValue(s) {
        if( s ) {
            s = s.replaceAll("\\t", "\t");
            s = s.replaceAll("\\n","\n");
            s = s.replaceAll("\\r","\r");
        }
        return s;
    }

    static createTryFromLineForCallHistory2( options ) {
        const callHistory2AsParent = options["callHistory2AsParent"];
        const uuidColumnIndex = options["uuidColumnIndex"];
        const partyNumberColumnIndex = options["partyNumberColumnIndex"];
        const addCallMillisTimeColumnIndex = options["addCallMillisTimeColumnIndex"];
        const endCallMillisTimeColumnIndex = options["endCallMillisTimeColumnIndex"];
        const isIncomingColumnIndex = options["isIncomingColumnIndex"];
        const answeredAtColumnIndex = options["answeredAtColumnIndex"];
        let line = options["line"];
        const isTransferColumnIndex = options["isTransferColumnIndex"];
        const recIdColumnIndex = options["recIdColumnIndex"];
        const responderColumnIndex = options["responderColumnIndex"];

        const lineLength = line.length;
        if( lineLength === 0 ){
            return null;
        }
        if( line[ lineLength - 1 ] === '\r'){
            line = line.substring(0,lineLength - 1);
        }
        const valueColumns = line.split("\t");
        if( valueColumns.length <= uuidColumnIndex ){
            console.warn("The 'uuid' column does not exist.");
            return null;
        }
        const uuidValue = CallHistory2CallInfo.fromTsvValue( valueColumns[ uuidColumnIndex ] );

        let partyNumberValue = null;
        if( valueColumns.length <= partyNumberColumnIndex ) {
            //console.warn("The 'partyNumber' column does not exist.");
        }
        else {
            partyNumberValue = CallHistory2CallInfo.fromTsvValue( valueColumns[ partyNumberColumnIndex ] );
        }

        let addCallMillisTimeValue = null;
        if( valueColumns.length <= addCallMillisTimeColumnIndex ) {
            console.warn("The 'addCallMillisTime' column does not exist.");
            return null;
        }
        else {
            const sAddCallMillisTimeValue = CallHistory2CallInfo.fromTsvValue( valueColumns[ addCallMillisTimeColumnIndex ] );
            try {
                addCallMillisTimeValue = parseInt(sAddCallMillisTimeValue);
            }
            catch(err){
                console.warn("The 'addCallMillisTime' column value is not valid. value=" + sAddCallMillisTimeValue );
                return null;
            }
        }

        let endCallMillisTimeValue = null;
        if( valueColumns.length <= endCallMillisTimeColumnIndex ) {
            //console.warn("The 'endCallMillisTime' column does not exist.");
        }
        else {
            const sEndCallMillisTimeValue = CallHistory2CallInfo.fromTsvValue( valueColumns[ endCallMillisTimeColumnIndex ] );
            if( sEndCallMillisTimeValue.trim().length == 0 ) {
                //console.warn("The 'endCallMillisTime' column value is empty.");
            }
            else {
                try {
                    endCallMillisTimeValue = parseInt(sEndCallMillisTimeValue);
                } catch (err) {
                    console.warn("The 'endCallMillisTime' column value is not valid. value=" + sEndCallMillisTimeValue );
                }
            }
        }

        let isIncomingColumnValue = null;
        if( valueColumns.length <= isIncomingColumnIndex ) {
            //console.warn("The 'isIncomingColumn' column does not exist.");
        }
        else {
            const sIsIncomingColumnValue = CallHistory2CallInfo.fromTsvValue( valueColumns[ isIncomingColumnIndex ] );
            const lower = sIsIncomingColumnValue.toLowerCase();
            if( lower === "true" || lower === "1" ) {
                isIncomingColumnValue = true;
            }
            else if( lower === "false" || lower === "0") {
                isIncomingColumnValue = false;
            }
        }

        let answeredAtColumnValue = null;
        if( valueColumns.length <= answeredAtColumnIndex  ) {
            //console.warn("The 'answeredAtColumn' column does not exist.");
        }
        else {
            const sAnsweredAtColumnValue = CallHistory2CallInfo.fromTsvValue( valueColumns[ answeredAtColumnIndex ] );
            if( sAnsweredAtColumnValue.trim().length == 0 ) {
                //console.warn("The 'endCallMillisTime' column value is empty.");
            }
            else {
                try {
                    answeredAtColumnValue = parseInt(sAnsweredAtColumnValue);
                } catch (err) {
                    console.warn("The 'endCallMillisTime' column value is not valid. value=" + sAnsweredAtColumnValue );
                }
            }
        }

        let isTransferColumnValue = null;
        if(  Number.isInteger( isTransferColumnIndex ) !== true || isTransferColumnIndex < 0 ) {
        }
        else {
            let sIsTransferColumnValue = CallHistory2CallInfo.fromTsvValue( valueColumns[ isTransferColumnIndex ] );
            const lower = sIsTransferColumnValue.toLowerCase();
            if( lower === "true" || lower === "1" ) {
                isTransferColumnValue = true;
            }
            else if( lower === "false" || lower === "0") {
                isTransferColumnValue = false;
            }
        }

        let recIdColumnValue = null;
        if(  Number.isInteger( recIdColumnIndex ) !== true || recIdColumnIndex < 0 ) {
        }
        else {
            recIdColumnValue = CallHistory2CallInfo.fromTsvValue( valueColumns[ recIdColumnIndex ] );
        }

        let responderColumnValue = null;
        if(  Number.isInteger( responderColumnIndex ) !== true || responderColumnIndex < 0 ) {
        }
        else {
            responderColumnValue = CallHistory2CallInfo.fromTsvValue( valueColumns[ responderColumnIndex ] );
        }

        const constructorOptions = {
            callHistory2AsParent,
            "uuid" : uuidValue,
            "partyNumber" : partyNumberValue,
            "addCallMillisTime" : addCallMillisTimeValue,
            "endCallMillisTime" : endCallMillisTimeValue,
            "isIncoming" : isIncomingColumnValue,
            "answeredAt" : answeredAtColumnValue,
            "isTransfer" : isTransferColumnValue,
            "recId" : recIdColumnValue,
            "responder" : responderColumnValue,
        }

        const callHistory2CallInfo = new CallHistory2CallInfo( constructorOptions );
        return callHistory2CallInfo;

    }

}