import {add} from "@dnd-kit/utilities";

export  default class CallHistory2CallInfo {

    constructor( options ) {
        this._CallHistory2AsParent = options["callHistory2AsParent"];
        const aCallInfo = options["callInfo"];
        if( aCallInfo ) {
            this._CallInfoUuid = aCallInfo.getCallInfoUuid();
            this._IsIncoming = aCallInfo.getIsIncoming();
            this._AddCallMillisTime = Date.now();
            this._PartyNumber = aCallInfo.getPartyNumber();
        }
        else {  //create from log line
            this._CallInfoUuid = options["uuid"];
            this._PartyNumber = options["partyNumber"];
            this._AddCallMillisTime = options["addCallMillisTime"];
            this._IsIncoming = options["isIncoming"];

            this._answeredAt = options["answeredAt"];
            this._endCallMillisTime =  options["endCallMillisTime"];
        }
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
    }

    onRemoveCallInfoForCallHistory2CallInfo( callHistory2AsCaller, callInfo )  {
        this._endCallMillisTime = Date.now();
    }

    getAnsweredAt() {
        return this._answeredAt;
    }

    getEndCallMillisTime(){
        return this._endCallMillisTime;
    }

    static getTsvHeaderString() {
        const s =
            CallHistory2CallInfo.toTsvValue("uuid") + "\t" +
            CallHistory2CallInfo.toTsvValue("partyNumber") + "\t" +
            CallHistory2CallInfo.toTsvValue("addCallMillisTime") + "\t" +
            CallHistory2CallInfo.toTsvValue("endCallMillisTime") + "\t" +
            CallHistory2CallInfo.toTsvValue("isIncoming") + "\t" +
            CallHistory2CallInfo.toTsvValue("answeredAt");
        return s;
    }

    /**
     *  get tab separated data string
     */
    getTsvValuesString() {
        const s =
            CallHistory2CallInfo.toTsvValue( this._CallInfoUuid ) + "\t" +
            CallHistory2CallInfo.toTsvValue(this._PartyNumber ) + "\t" +
            CallHistory2CallInfo.toTsvValue(this._AddCallMillisTime) + "\t" +
            CallHistory2CallInfo.toTsvValue(this._endCallMillisTime) + "\t" +
            CallHistory2CallInfo.toTsvValue(this._IsIncoming) + "\t" +
            CallHistory2CallInfo.toTsvValue(this._answeredAt);
        return s;
    }

    static toTsvValue( o ) {
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
        let callHistory2AsParent = options["callHistory2AsParent"];
        let uuidColumnIndex = options["uuidColumnIndex"];
        let partyNumberColumnIndex = options["partyNumberColumnIndex"];
        let addCallMillisTimeColumnIndex = options["addCallMillisTimeColumnIndex"];
        let endCallMillisTimeColumnIndex = options["endCallMillisTimeColumnIndex"];
        let isIncomingColumnIndex = options["isIncomingColumnIndex"];
        let answeredAtColumnIndex = options["answeredAtColumnIndex"];
        let line = options["line"];

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

        const constructorOptions = {
            callHistory2AsParent,
            "uuid" : uuidValue,
            "partyNumber" : partyNumberValue,
            "addCallMillisTime" : addCallMillisTimeValue,
            "endCallMillisTime" : endCallMillisTimeValue,
            "isIncoming" : isIncomingColumnValue,
            "answeredAt" : answeredAtColumnValue
        }

        const callHistory2CallInfo = new CallHistory2CallInfo( constructorOptions );
        return callHistory2CallInfo;

    }

}