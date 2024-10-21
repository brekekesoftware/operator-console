import CallHistory2CallInfo from "./CallHistory2CallInfo";
import debounce from "debounce";
import {defaultTransition} from "@dnd-kit/sortable/dist/hooks/defaults";
import AutoDialView_ver2 from "./runtime/AutoDialView_ver2";
import OCUtil from "./OCUtil";
import i18n from "./i18n";
import BrekekeOperatorConsole from "./index";    //!bad Cross References

const CALLHISTORY2_CALL_HISTORIES_DATA_ID = "OperatorConsole-CallHistory2-callHistories-test2";
const CALLHISTORY2_RECENT_DISPLAY_ORDERS = Object.freeze( {
    CALL_OR_INCOMING_COUNT_DESC : "0",
    ADD_DATETIME_DESC : "1"
});


class CallHistory2FoTInfo{  //FoT is FREQUENCY_OF_TRANSMISSION
    constructor( ch2CallInfo ) {
        this._ch2CallInfo = ch2CallInfo;
        this._hitCount = 0;
        this._isLoadedEvenOnce = false;
    }

    getHitCount(){
        return this._hitCount;
    }

    setHitCount( n ){
        this._hitCount = n;
    }

    getCallHistory2CallInfo(){
        return this._ch2CallInfo;
    }

    trySetCallHistory2CallInfo( ch2CallInfo ){
        if( ch2CallInfo.getPartyNumber() !== this._ch2CallInfo.getPartyNumber() ){
            return false;
        }
        if( ch2CallInfo.getAddCallMillisTime() < this._ch2CallInfo.getAddCallMillisTime() ){
            return false;
        }
        if( !ch2CallInfo.getEndCallMillisTime() ){
            return false;
        }
        if( !!this._ch2CallInfo.getEndCallMillisTime() && ch2CallInfo.getEndCallMillisTime() < this._ch2CallInfo.getEndCallMillisTime() ){
            return false;
        }

        this._ch2CallInfo = ch2CallInfo;
        return true;
    }
}

export class CallHistory2 {
    constructor(operatorConsoleAsParent) {
        this._OperatorConsoleAsParent = operatorConsoleAsParent;
        this._CallHistoryCallInfosObject = new Object();
        this._CallHistoryCallInfoArray = new Array();   //sortable array
        this._prevSort = null;  //Set dirty

        this._FlushSave = debounce(
            () => {
                this._save(
                    () =>{

                    },
                    ( errorOrResponse ) =>{
                        OCUtil.logErrorWithNotification("Failed to save call histories.", i18n.t("Failed_to_save_call_histories"), errorOrResponse );
                    }
                );
            },
            5000
        );
        // this._FlushSaveCount = debounce(
        //     () =>
        //     {
        //         this._trySetSaveCount( this._saveCount );
        //     },
        //     5000
        // );
    }

    //!warn Do not change the contents of the array.
    getCallHistory2CallInfoArray() {
        return this._CallHistoryCallInfoArray;
        // const freezedArray = Object.freeze( this._CallHistoryCallInfoArray );
        // return freezedArray;
    }

    static get RECENT_DISPLAY_ORDERS(){
        return CALLHISTORY2_RECENT_DISPLAY_ORDERS;
    }

    clearCallHistory2( onSuccessFunction, onFailFunction ){
        this._prevSort = null;  //Set dirty

        //clear object
        const propNames = Object.getOwnPropertyNames(this._CallHistoryCallInfosObject);
        for (const prop of propNames ) {
            delete this._CallHistoryCallInfosObject[prop];
        }

        this._save( onSuccessFunction, onFailFunction );
    }

    _save( onSuccessFunction, onFailFunction ) {

        //set save count
        this._syncSaveCount();

        //write header
        const headerLine = CallHistory2CallInfo.getTsvHeaderString();
        let sData = headerLine + "\n";

        const ch2CallInfoArray = Object.values(this._CallHistoryCallInfosObject);

        for (let i = 0; i < ch2CallInfoArray.length; i++) {
            const ch2CallInfo = ch2CallInfoArray[i];
            const line = ch2CallInfo.getTsvValuesString() + "\n";
            sData += line;
        }

        const oData = {"lines": sData};
        const setAppDataOptions = {
            methodName: "setAppData",
            methodParams: JSON.stringify({
                data_id: CALLHISTORY2_CALL_HISTORIES_DATA_ID,
                data: oData
            }),
            onSuccessFunction: onSuccessFunction,
            onFailFunction: onFailFunction
        }
        const oc = BrekekeOperatorConsole.getStaticInstance();
        oc.getPalRestApi().callPalRestApiMethod( setAppDataOptions );
    }

    _syncSaveCount( ){
        const autoDialView = AutoDialView_ver2.getStaticInstance();
        if( autoDialView ) {
            autoDialView.setState({rerender:true});
        }

        const settings = this._OperatorConsoleAsParent.getSystemSettingsData();
        const n = settings.getAutoDialMaxSaveCount();

        if( Object.keys( this._CallHistoryCallInfosObject ).length <= n ){
            this._saveCount = n;
            return false;
        }

        const prevSortOrder = this._prevSort;
        this.sortIfNeed( CALLHISTORY2_RECENT_DISPLAY_ORDERS.ADD_DATETIME_DESC );
        //const deleted = this._CallHistoryCallInfoArray.length - 1 >= 0 && this._CallHistoryCallInfoArray.length - 1 > this._CallHistoryCallInfoArray.length - n;
        const startIndex = this._CallHistoryCallInfoArray.length - 1;
        let  endIndex = this._CallHistoryCallInfoArray.length - (this._CallHistoryCallInfoArray.length  - n);
        if( endIndex < 0  ){
            endIndex = 0;
        }

        for( let i = startIndex;  i >= endIndex ; i-- ){
            const ch2CallInfo = this._CallHistoryCallInfoArray[i];
            const uuid = ch2CallInfo.getCallInfoUuid();
            delete this._CallHistoryCallInfosObject[ uuid ];
        }
        //if( deleted === true && prevSortOrder !== CALLHISTORY2_RECENT_DISPLAY_ORDERS.ADD_DATETIME_DESC ){
        if(  prevSortOrder !== CALLHISTORY2_RECENT_DISPLAY_ORDERS.ADD_DATETIME_DESC ){
            this._prevSort = null;  //Set dirty
        }
        this._saveCount = n;
        return true;
    }

    static parseAutoDialRecentDisplayOrderForce( s ){
        const defaultOrder = CALLHISTORY2_RECENT_DISPLAY_ORDERS.CALL_OR_INCOMING_COUNT_DESC;
        if( typeof s !== 'string' ){
            return defaultOrder;
        }
        let  n;
        try {
            n = parseInt(s);
        }
        catch(err){
            return defaultOrder;
        }
        const maxNumber = Object.keys( CALLHISTORY2_RECENT_DISPLAY_ORDERS ).length - 1;
        if( n < 0 || n > maxNumber ){
            return defaultOrder;
        }
        return s;
    }

    loadCallHistory2( onSuccessFunction, onFailFunction ){

        const getAppDataOptions = {
            methodName : "getAppData",
            methodParams : JSON.stringify({
                data_id: CALLHISTORY2_CALL_HISTORIES_DATA_ID
            }),
            onSuccessFunction : ( sJsonData ) => {
                if( !sJsonData || sJsonData.length === 0 ){
                    this._isLoadedEvenOnce = true;
                    console.log("The CallHistory2Data(Json response) is empty.");
                    if( onSuccessFunction ){
                        onSuccessFunction();
                    }
                    return false;
                }

                const oData = JSON.parse( sJsonData );
                const sLines = oData["lines"];
                if( !sLines ){
                    this._isLoadedEvenOnce = true;
                    //console.log("The CallHIstory2Data  is empty(Line property's value is null) so it will not be read.")
                    if( onSuccessFunction ){
                        onSuccessFunction();
                    }
                    return false;
                }

                const lines = sLines.split("\n");
                if( lines.length === 0 ){
                    this._isLoadedEvenOnce = true;
                    //console.log("The CallHIstory2Data  is empty so it will not be read.")
                    if( onSuccessFunction ){
                        onSuccessFunction();
                    }
                    return false;
                }
                let  headerLine = lines[0];
                const headerLineLength = headerLine.length;
                if( headerLineLength === 0 ){
                    this._isLoadedEvenOnce = true;
                    console.warn("The CallHistory2Data's header is not defined so it will not be read.")
                    if( onSuccessFunction ){
                        onSuccessFunction();
                    }
                    return false;
                }
                if( headerLine[ headerLineLength - 1 ] === '\r'){
                    headerLine = headerLine.substring(0,headerLineLength - 1);
                }

                let uuidColumnIndex = -1;
                let partyNumberColumnIndex = -1;
                let addCallMillisTimeColumnIndex = -1;
                let endCallMillisTimeColumnIndex = -1;
                let isIncomingColumnIndex = -1;
                let answeredAtColumnIndex = -1;

                //read header line
                const headerColumnNames = headerLine.split("\t");
                for( let i = 0; i < headerColumnNames.length; i++ ){
                    const headerColumnName = CallHistory2CallInfo.fromTsvValue( headerColumnNames[i] );
                    //!modify
                    switch( headerColumnName ){
                        case "uuid":
                            uuidColumnIndex = i;
                            break;
                        case "partyNumber":
                            partyNumberColumnIndex = i;
                            break;
                        case "addCallMillisTime":
                            addCallMillisTimeColumnIndex = i;
                            break;
                        case "endCallMillisTime":
                            endCallMillisTimeColumnIndex = i;
                            break;
                        case "isIncoming":
                            isIncomingColumnIndex = i;
                            break;
                        case "answeredAt":
                            answeredAtColumnIndex = i;
                            break;
                        default:
                            console.warn("Unknown header value('" + headerColumnName + "') was found. Processing of this value will be skipped.");
                            break;
                    }
                }

                if( uuidColumnIndex === -1 ){
                    this._isLoadedEvenOnce = true;
                    console.warn("Call history will not load because the 'uuid' column does not exist.");
                    if( onSuccessFunction ){
                        onSuccessFunction();
                    }
                    return false;
                }

                this._prevSort = null;  //Set dirty

                //clear object
                const propNames = Object.getOwnPropertyNames(this._CallHistoryCallInfosObject);
                for (const prop of propNames ) {
                    delete this._CallHistoryCallInfosObject[prop];
                }

                //read value lines
                for( let i = 1; i < lines.length; i++ ){
                    const  line = lines[i];
                    if( line.trim().length === 0 ){ //Is empty line?
                        continue;
                    }
                    const options = {
                        callHistory2AsParent: this,
                        uuidColumnIndex,
                        partyNumberColumnIndex,
                        addCallMillisTimeColumnIndex,
                        endCallMillisTimeColumnIndex,
                        isIncomingColumnIndex,
                        answeredAtColumnIndex,
                        line
                    };
                    const ch2CallInfo = CallHistory2CallInfo.createTryFromLineForCallHistory2( options );
                    if( ch2CallInfo === null ) {
                        console.warn("The row will be skipped read. Line index:" + i);
                        continue;
                    }
                    const uuid = ch2CallInfo.getCallInfoUuid();
                    const bAlready = this._CallHistoryCallInfosObject.hasOwnProperty( uuid );
                    if( bAlready ){
                        console.warn("The call history for UUID('" + uuid + "') will be overwritten.");
                        const findUuidFunc = ( item ) => item.getCallInfoUuid() === uuid;
                        const foundIndex = this._CallHistoryCallInfoArray.findIndex( findUuidFunc );
                        this._CallHistoryCallInfoArray.splice( foundIndex, 1 );
                    }
                    this._CallHistoryCallInfosObject[ uuid ] = ch2CallInfo;

                }
                this._syncSaveCount();
                this._isLoadedEvenOnce = true;
                if( onSuccessFunction ){
                    onSuccessFunction();
                }
                return true;
            },
            onFailFunction: (errorOrResponse) =>{
                if( onFailFunction ){
                    onFailFunction( errorOrResponse );
                }
            }
        }
        this._OperatorConsoleAsParent.getPalRestApi().callPalRestApiMethod( getAppDataOptions );

    }

    sortIfNeed( sortOrder ){
        if( this._prevSort === sortOrder  ){
            return false;
        }

        switch( sortOrder ){
            case CALLHISTORY2_RECENT_DISPLAY_ORDERS.CALL_OR_INCOMING_COUNT_DESC:
                this._sortCallOrIncomingCountDesc();
                break;
            case CALLHISTORY2_RECENT_DISPLAY_ORDERS.ADD_DATETIME_DESC:
                this._sortStartDatetimeDesc();
                break;
            default:
                throw new Error("Unknown sort order");
        }
        this._prevSort = sortOrder;
        return true;
    }

    _sortCallOrIncomingCountDesc(){
        this._CallHistoryCallInfoArray.length = 0;
        const ch2CallInfoArray = Object.values( this._CallHistoryCallInfosObject );
        const partyNumberMap = new Object();    //{ partyNumber : CallHistory2FoTInfo }
        for( let i = 0; i < ch2CallInfoArray.length; i++ ){
            const ch2CallInfo = ch2CallInfoArray[i];
            const partyNumber = ch2CallInfo.getPartyNumber();
            if( !partyNumber ){
                console.log("partyNumber is not defined. Skip collecting to map. itemIndex=" + i );
                continue;
            }

            let ch2FoTInfo = partyNumberMap[ partyNumber ]; //!optimize. Use hasOwnProperty
            if( !ch2FoTInfo ){
                ch2FoTInfo = new CallHistory2FoTInfo(  ch2CallInfo );
                ch2FoTInfo.setHitCount(1);
                partyNumberMap[ partyNumber ] = ch2FoTInfo;
            }
            else{
                const bSet = ch2FoTInfo.trySetCallHistory2CallInfo( ch2CallInfo );
                if( bSet === true ){
                    let hitCount = ch2FoTInfo.getHitCount();
                    hitCount++;
                    ch2FoTInfo.setHitCount( hitCount );
                }
            }
        }

        const intlCollator = new Intl.Collator();
        const compareFunc = ( ch2FoTlnfoA, ch2FoTInfoB ) =>{
            const nHitCount = ch2FoTInfoB.getHitCount() - ch2FoTlnfoA.getHitCount();
            if( nHitCount !== 0 ){
                return nHitCount;
            }
            const ch2CallInfoA = ch2FoTlnfoA.getCallHistory2CallInfo();
            const ch2CallInfoB = ch2FoTInfoB.getCallHistory2CallInfo();
            const nAddCallMillisTime =  ch2CallInfoB.getAddCallMillisTime() - ch2CallInfoA.getAddCallMillisTime();
            if( nAddCallMillisTime !== 0 ){
                return nAddCallMillisTime;
            }
            const nEndCallMillisTime = ch2CallInfoB.getEndCallMillisTime() - ch2CallInfoA.getEndCallMillisTime();

            if( isNaN( nEndCallMillisTime ) ){
                //!pending NaN case
            }
            else {
                if (nEndCallMillisTime !== 0) {
                    return nEndCallMillisTime;
                }
            }

             const partyNumberResult = intlCollator.compare( ch2CallInfoA.getPartyNumber(), ch2CallInfoB.getPartyNumber() );    //ASC order
            return partyNumberResult;
        };

        const ch2FoTInfoArray = Object.values( partyNumberMap );
        ch2FoTInfoArray.sort( compareFunc );

        //!optimize. array copy
        this._CallHistoryCallInfoArray.length = ch2FoTInfoArray.length;
        for( let i = 0; i < ch2FoTInfoArray.length; i++ ){
            const ch2FoTInfo = ch2FoTInfoArray[i];
            const ch2CallInfo = ch2FoTInfo.getCallHistory2CallInfo();
            this._CallHistoryCallInfoArray[i] = ch2CallInfo;
        }

    }

    onSavingSystemSettingsForCallHistory2( operatorConsoleAsCaller ){
        this._syncSaveCount();
    }

    _sortStartDatetimeDesc(){
        this._CallHistoryCallInfoArray.length = 0;
        const ch2CallInfoArray = Object.values( this._CallHistoryCallInfosObject );
        for( let i = 0; i < ch2CallInfoArray.length; i++ ){
            const ch2CallInfo = ch2CallInfoArray[i];
            this._CallHistoryCallInfoArray.push( ch2CallInfo );
        }


        const intlCollator = new Intl.Collator();
        const compareFunc = ( ch2CallInfoA, ch2CallInfoB ) =>{
            const nAddCallMillisTime = ch2CallInfoB.getAddCallMillisTime() - ch2CallInfoA.getAddCallMillisTime();
            if( nAddCallMillisTime !== 0 ){
                return nAddCallMillisTime;
            }
            const nEndCallMillisTime = ch2CallInfoB.getEndCallMillisTime() - ch2CallInfoA.getEndCallMillisTime();

            if( isNaN( nEndCallMillisTime ) ){
                //!pending NaN case
            }
            else {
                if (nEndCallMillisTime !== 0) {
                    return nEndCallMillisTime;
                }
            }

            const partyNumberResult = intlCollator.compare( ch2CallInfoA.getPartyNumber(), ch2CallInfoB.getPartyNumber() ); //ASC order
            return partyNumberResult;
        };
        this._CallHistoryCallInfoArray.sort( compareFunc );
    }

    onUpdateCallInfoForCallHistory2( operatorConsoleAsCaller, callInfo ){
        const callInfoUuid = callInfo.getCallInfoUuid();
        const callHistory2CallInfo =  this._CallHistoryCallInfosObject[ callInfoUuid ];
        callHistory2CallInfo.onUpdateCallInfoForCallHistory2CallInfo( this, callInfo );
//        this._prevSort = null;    //Set dirty
        this._FlushSave();
    }

    //call end
    onRemoveCallInfoForCallHistory2( operatorConsoleAsCaller, callInfo ){
        const callInfoUuid = callInfo.getCallInfoUuid();

        const callHistory2CallInfo = this._CallHistoryCallInfosObject[ callInfoUuid ];
        if( !callHistory2CallInfo ) {
            return; //This will be null if the number of saves exceeds the maximum.
        }
        callHistory2CallInfo.onRemoveCallInfoForCallHistory2CallInfo( this, callInfo );
        //delete this._CallHistoryCallInfosObject[ callInfoUuid ];

        //const funcIsCallInfoUuid = ( item ) => item === callInfoUuid;
        //const arrayIndex = this._CallHistoryCallInfoArray.findIndex( funcIsCallInfoUuid );
        //this._CallHistoryCallInfoArray.splice( arrayIndex, 1 );

        this._prevSort = null;  //Set dirty
        this._FlushSave();
    }

    onBeginLogoutForCallHistory2( operatorConsoleAsCaller ){
        if( this._isLoadedEvenOnce === true ) {
            this._isLoadedEvenOnce = false;
            this._save(
                () => {

                },
                (errorOrResponse) => {
                    OCUtil.logErrorWithNotification("Failed to save call histories.", i18n.t("Failed_to_save_call_histories"), errorOrResponse);
                }
            );
        }
    }

    onUnloadForCallHistory2( operatorConsoleAsCaller, event ){
        if( this._isLoadedEvenOnce === true ) {
            this._save(
                () => {

                },
                (errorOrResponse) => {
                    OCUtil.logErrorWithNotification("Failed to save call histories.", i18n.t("Failed_to_save_call_histories"), errorOrResponse);
                }
            );
        }
    }

    onAddCallInfoForCallHistory2( operatorConsoleAsCaller, callInfo ){
        const options = {
            callHistory2AsParent : this,
            callInfo : callInfo
        };
        const callHistory2CallInfo = new CallHistory2CallInfo( options );
        const callInfoUuid = callInfo.getCallInfoUuid();
        this._CallHistoryCallInfosObject[ callInfoUuid ] = callHistory2CallInfo
        // if( Object.keys( this._CallHistoryCallInfosObject ).length > this._saveCount ){
        //     this._FlushSaveCount();
        // }

        this._prevSort = null;  //Set dirty
        this._FlushSave();
    }


}