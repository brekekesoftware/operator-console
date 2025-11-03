import {CallHistory} from "./CallHistory";
import Campon from "./Campon";
import SystemSettingsForm from "./SystemSettingsForm";
import QuickBusy_ver2 from "./runtime/QuickBusy_ver2";
import OCUtil from "./OCUtil";
import Util from "./Util";
import i18n from "./i18n";
import Notification from "antd/lib/notification";
import {CallHistory2} from "./CallHistory2";

export default class SystemSettingsData {
    constructor(operatorConsoleAsParent, cloneSystemSettingsData) {
        this._OperatorConsoleAsParent = operatorConsoleAsParent;
        if (!cloneSystemSettingsData) {
            this._Data = {};
            this._setDefaultDatas();
        } else {
            this.setCloneDatas(cloneSystemSettingsData);
        }
    }

    getAutoDialMaxDisplayCount() {
        return this._Data.autoDialMaxSaveCount;
    }

    getAutoDialMaxSaveCount() {
        return this._Data.autoDialMaxSaveCount;
    }

    getQuickBusyClickToCall() {
        return this._Data.quickBusyClickToCall;
    }

    getAutoDialRecentDisplayOrder() {
        return this._Data.autoDialRecentDisplayOrder;
    }

    getAutoDialPhonebookName() {
        return this._Data.autoDialPhonebookName;
    }

    getAutoDialOneTouchCall() {
        return this._Data.autoDialOneTouchCall;
    }

    setAutoDialSwitchSize(n) {
        this._Data.autoDialSwitchSize = n;
    }

    getAutoDialSwitchSize() {
        return this._Data.autoDialSwitchSize;
    }

    getAutoDialLampSize() {
        return this._Data.autoDialLampSize;
    }

    setAutoDialLampSize(n){
        this._Data.autoDialLampSize = n;
    }

    /**
     *
     * @param eventArgs     const arg ={
     *             errorCode : UCCAC_UCCAC_INIT_ERRORS.loadResourceFailed,
     *             errorResourcePath : resourcePath,
     *             errorEvent:ev
     *         }
     * @private
     */
    _onBeginSetSystemSettingsDataFail( eventArgs, initFailFunction ){
        // for( let i = 0; i < eventArgs.length; i++ ){
        //     const ea = eventArgs[i];
        //     console.error("Failed to UC chat agent component initialization. errorCode=" + ea.errorCode + ",resourcePath=" + ea.errorResourcePath + ",errorEvent=" , ea.errorEvent );
        //     const message = i18n.t("FailedToUCCACInitialization") + " errorCode=" + ea.errorCode + ",resourcePath=" + ea.errorResourcePath + ",errorEvent=" + ea.errorEvent;
        //     Notification.error({message: message, duration:0 });
        // }
        initFailFunction( eventArgs );
    }

    _onBeginSetSystemSettingsDataSuccess( appData, initSuccessFunction ){
        //cache ringtone files
        const ringtoneInfos = appData.ringtoneInfos;
        SystemSettingsData.cacheRingtones( ringtoneInfos );
        const ringtoneInfos2 = appData.ringtoneInfos2;
        SystemSettingsData.cacheRingtones2( ringtoneInfos2 );
        //!modify systemSettingsData
        this._Data.autoDialMaxDisplayCount = appData.autoDialMaxDisplayCount;
        this._Data.autoDialMaxSaveCount = appData.autoDialMaxSaveCount;
        this._Data.camponTimeoutSeconds = appData.camponTimeoutSeconds;
        this._Data.shortDials = appData.shortDials;
        this._Data.ringtoneInfos = appData.ringtoneInfos;
        this._Data.ringtoneInfos2 = appData.ringtoneInfos2;
        this._Data.quickBusyClickToCall = appData.quickBusyClickToCall;
        this._Data.ucUrl = appData.ucUrl;
        this._Data.ucChatAgentComponentEnabled = appData.ucChatAgentComponentEnabled;
        this._Data.phoneTerminal = appData.phoneTerminal;
        this._Data.extensionScript = appData.extensionScript;
        this._camponTimeoutMillis = appData.camponTimeoutSeconds * 1000;
        this._Data.autoDialRecentDisplayOrder = appData.autoDialRecentDisplayOrder;
		this._Data.autoDialPhonebookName = appData.autoDialPhonebookName;
        this._Data.autoDialTableHeaderFontSize = appData.autoDialTableHeaderFontSize;
        this._Data.autoDialTableBodyFontSize = appData.autoDialTableBodyFontSize;
        this._Data.autoDialSwitchSize = appData.autoDialSwitchSize;
        this._Data.autoDialLampSize = appData.autoDialLampSize;
        this._Data.autoDialIconSize = appData.autoDialIconSize;
        this._Data.autoDialButtonSize = appData.autoDialButtonSize;
        this._Data.autoDialInputFieldHeight = appData.autoDialInputFieldHeight;
        this._Data.autoDialInputFieldFontSize = appData.autoDialInputFieldFontSize;
        this._Data.autoDialTabFontSize = appData.autoDialTabFontSize;
        this._Data.autoDialOtherFontSize = appData.autoDialOtherFontSize;
        initSuccessFunction();
    }

    _onBeginSetSystemSettingsData( appData, initSuccessFunction , initFailFunction ){
        const this_ = this;
        const startInit = this._OperatorConsoleAsParent.onBeginSetSystemSettingsData( appData, this,
            function(){
                this_._onBeginSetSystemSettingsDataSuccess( appData, initSuccessFunction  );
            },
            function( e ) {
                this_._onBeginSetSystemSettingsDataFail( e, initFailFunction );
            }
            );
        return startInit;
    }

    static cacheRingtones( ringtoneInfos ){
        //cache ringtone files
        if( !ringtoneInfos || Array.isArray( ringtoneInfos ) !== true ) {
            return -1;
        }
        if( ringtoneInfos.length === 0 ){
            return 0;
        }

        const rootUrl = Util.getRootUrlString();
        const xhr = new XMLHttpRequest();
        let successCount = 0;
        for( let i = 0; i < ringtoneInfos.length; i++ ){
            const ringtoneInfo = ringtoneInfos[i];
            //const caller = ringtoneInfo.ringtoneCaller;
            const fileOrUrl = ringtoneInfo.ringtoneFilepathOrFileurl;
            let fileUrl = OCUtil.getUrlStringFromPathOrUrl( fileOrUrl, rootUrl );
            try {
                const httpStatus = Util.getHeadResposneCodeByUrl( fileUrl , xhr );
                if( httpStatus !== 200 ){
                    console.error("Failed to load ringtone audio file. fileUrl=" + fileUrl + ",httpStatusCode=" + httpStatus  );
                    Notification.error( {message: i18n.t("FailedToLoadRingtoneAudioFile") + ",fileUrl=" + fileUrl + ",httpStatusCode="  + httpStatus , duration:0 } );
                }
                else {
                    new Audio(fileUrl);   //cache audio file
                    successCount++;
                }
            }
            catch(err){
                console.error("Failed to load ringtone audio file. fileUrl=" + fileUrl + ",error=" , err );
                Notification.error( { message:i18n.t("FailedToLoadRingtoneAudioFile") + ",fileUrl=" + fileUrl + ",error="  + err , duration:0}  );
                continue;
            }
        }
        return successCount;
    }

    static cacheRingtones2( ringtoneInfos2 ){
        //cache ringtone files
        if( !ringtoneInfos2 || Array.isArray( ringtoneInfos2 ) !== true ) {
            return -1;
        }
        if( ringtoneInfos2.length === 0 ){
            return 0;
        }

        //!tocyuu

        return 0;

        // const rootUrl = Util.getRootUrlString();
        // const xhr = new XMLHttpRequest();
        // let successCount = 0;
        // for( let i = 0; i < ringtoneInfos.length; i++ ){
        //     const ringtoneInfo = ringtoneInfos[i];
        //     //const caller = ringtoneInfo.ringtoneCaller;
        //     const fileOrUrl = ringtoneInfo.ringtoneFilepathOrFileurl;
        //     let fileUrl = OCUtil.getUrlStringFromPathOrUrl( fileOrUrl, rootUrl );
        //     try {
        //         const httpStatus = Util.getHeadResposneCodeByUrl( fileUrl , xhr );
        //         if( httpStatus !== 200 ){
        //             console.error("Failed to load ringtone audio file. fileUrl=" + fileUrl + ",httpStatusCode=" + httpStatus  );
        //             Notification.error( {message: i18n.t("FailedToLoadRingtoneAudioFile") + ",fileUrl=" + fileUrl + ",httpStatusCode="  + httpStatus , duration:0 } );
        //         }
        //         else {
        //             new Audio(fileUrl);   //cache audio file
        //             successCount++;
        //         }
        //     }
        //     catch(err){
        //         console.error("Failed to load ringtone audio file. fileUrl=" + fileUrl + ",error=" , err );
        //         Notification.error( { message:i18n.t("FailedToLoadRingtoneAudioFile") + ",fileUrl=" + fileUrl + ",error="  + err , duration:0}  );
        //         continue;
        //     }
        // }
        // return successCount;
    }

    setSystemSettingsDataData( appData, initSuccessFunction, initFailFunction  ){
        appData = this._formatSystemSettingsAppData(appData);

        const startInit = this._onBeginSetSystemSettingsData( appData, initSuccessFunction, initFailFunction  );
        return startInit;
    }

    getExtensionScript(){
        return this._Data.extensionScript;
    }

    getData(){
        return this._Data;
    }

   _setDefaultDatas(){
       this._camponTimeoutMillis = Campon.getDefaultCamponTimeoutMilliSeconds();

        this._Data.autoDialMaxDisplayCount = CallHistory.getDefaultMaxDisplayCount();
        this._Data.autoDialMaxSaveCount = CallHistory.getDefaultMaxSaveCount();
       this._Data.camponTimeoutMillis = Campon.getDefaultCamponTimeoutMilliSeconds();
       this._Data.camponTimeoutSeconds =  this._camponTimeoutMillis / 1000;
       this._Data.quickBusyClickToCall = true;
        this._Data.shortDials = null;
        this._Data.ringtoneInfos = null;
       this._Data.ringtoneInfos2 = null;
        this._Data.ucUrl = "";
        this._Data.ucChatAgentComponentEnabled = false;
        this._Data.extensionScript = "";
        this._Data.phoneTerminal = "phoneTerminal_webphone";
        this._Data.autoDialRecentDisplayOrder = CallHistory2.RECENT_DISPLAY_ORDERS.ADD_DATETIME_DESC;
		this._Data.autoDialPhonebookName = "";
       this._Data.autoDialOneTouchCall = true;
       this._Data.autoDial = true;
       this._Data.autoDialTableHeaderFontSize = undefined;
       this._Data.autoDialTableBodyFontSize = undefined;
       this._Data.autoDialSwitchSize = undefined;
       this._Data.autoDialLampSize = undefined;
       this._Data.autoDialIconSize = undefined;
       this._Data.autoDialButtonSize = undefined;
       this._Data.autoDialInputFieldHeight = undefined;
       this._Data.autoDialInputFieldFontSize = undefined;
       this._Data.autoDialTabFontSize = undefined;
       this._Data.autoDialOtherFontSize = undefined;
    }

    setCloneDatas( srcSystemSettingsData ) {
        this._camponTimeoutMillis = srcSystemSettingsData._camponTimeoutMillis;
		this._Data = structuredClone( srcSystemSettingsData._Data );
		/*
        this._Data.autoDialMaxDisplayCount = srcSystemSettingsData._Data.autoDialMaxDisplayCount;
        this._Data.autoDialMaxSaveCount = srcSystemSettingsData._Data.autoDialMaxSaveCount;
        this._Data.camponTimeoutMillis = srcSystemSettingsData._Data.camponTimeoutMillis;
        this._Data.camponTimeoutSeconds = srcSystemSettingsData._Data.camponTimeoutSeconds;
        this._Data.quickBusyClickToCall = srcSystemSettingsData._Data.quickBusyClickToCall;
        if (srcSystemSettingsData._Data.shortDials) {
            this._Data.shortDials = structuredClone(srcSystemSettingsData._Data.shortDials);	//!testit //!forBug
        } else {
            this._Data.shortDials = srcSystemSettingsData._Data.shortDials;
        }
        if (srcSystemSettingsData._Data.ringtoneInfos) {
            this._Data.ringtoneInfos = structuredClone(srcSystemSettingsData._Data.ringtoneInfos);	//!testit //!forBug
        } else {
            this._Data.ringtoneInfos = srcSystemSettingsData._Data.ringtoneInfos;
        }
        if (srcSystemSettingsData._Data.ringtoneInfos2){
            this._Data.ringtoneInfos2 = structuredClone( srcSystemSettingsData._Data.ringtoneInfos2 );  	//!testit //!forBug
        }
        else{
            this._Data.ringtoneInfos2 = srcSystemSettingsData._Data.ringtoneInfos2;
        }
        this._Data.ucUrl = srcSystemSettingsData._Data.ucUrl;
        this._Data.ucChatAgentComponentEnabled = srcSystemSettingsData._Data.ucChatAgentComponentEnabled;
        this._Data.extensionScript = srcSystemSettingsData._Data.extensionScript;
        this._Data.phoneTerminal = srcSystemSettingsData._Data.phoneTerminal;
        this._Data.autoDialRecentDisplayOrder = srcSystemSettingsData._Data.autoDialRecentDisplayOrder;
        this._Data.autoDialPhonebookName = srcSystemSettingsData._Data.autoDialPhonebookName;
        this._Data.autoDialOneTouchCall = srcSystemSettingsData._Data.autoDialOneTouchCall;
        this._Data.autoDial = srcSystemSettingsData._Data.autoDial;
        this._Data.autoDialTableHeaderFontSize = srcSystemSettingsData._Data.autoDialTableHeaderFontSize;
        this._Data.autoDialTableBodyFontSize = srcSystemSettingsData._Data.autoDialTableBodyFontSize;
		*/
    }

    getShortDials(){
        return this._Data.shortDials;
    }

    getRingtoneInfos(){
        return this._Data.ringtoneInfos;
    }

    getRingtoneInfos2(){
        return this._Data.ringtoneInfos2;
    }

    getCamponTimeoutMillis(){
        return this._camponTimeoutMillis;
    }

    getUcUrl(){
        return this._Data.ucUrl;
    }

    getUcChatAgentComponentEnabled(){
        return this._Data.ucChatAgentComponentEnabled;
    }

    getPhoneTerminal(){
        return this._Data.phoneTerminal;
    }
	
	getAutoDialTableHeaderFontSize(){
		return this._Data.autoDialTableHeaderFontSize;
	}

    setAutoDialTableHeaderFontSize(n){
        this._Data.autoDialTableHeaderFontSize = n;
    }

    setAutoDialTableBodyFontSize(n){
        this._Data.autoDialTableBodyFontSize = n;
    }

    getAutoDialTableBodyFontSize(n) {
        return this._Data.autoDialTableBodyFontSize;
    }

    setAutoDialIconSize( n ){
        this._Data.autoDialIconSize = n;
    }

    getAutoDialIconSize(){
        return this._Data.autoDialIconSize;
    }

    setAutoDialButtonSize( n ){
        this._Data.autoDialButtonSize = n;
    }

    getAutoDialButtonSize(){
        return this._Data.autoDialButtonSize;
    }

    setAutoDialButtonSize( n ){
        this._Data.autoDialButtonSize = n;
    }

    getAutoDialButtonSize(){
        return this._Data.autoDialButtonSize;
    }

    setAutoDialInputFieldHeight( n ){
        this._Data.autoDialInputFieldHeight = n;
    }

    getAutoDialInputFieldHeight(){
        return this._Data.autoDialInputFieldHeight;
    }

    setAutoDialInputFieldFontSize( n ){
        this._Data.autoDialInputFieldFontSize = n;
    }

    getAutoDialInputFieldFontSize(){
        return this._Data.autoDialInputFieldFontSize;
    }

    setAutoDialTabFontSize( n ){
        this._Data.autoDialTabFontSize = n;
    }

    getAutoDialTabFontSize(){
        return this._Data.autoDialTabFontSize;
    }

    setAutoDialOtherFontSize( n ){
        this._Data.autoDialOtherFontSize = n;
    }

    getAutoDialOtherFontSize(){
        return this._Data.autoDialOtherFontSize;
    }

    _formatSystemSettingsAppData(appData){
        if( !appData ){
            appData = {};
        }
        appData.autoDialMaxDisplayCount = appData.autoDialMaxDisplayCount ? appData.autoDialMaxDisplayCount : CallHistory.getDefaultMaxDisplayCount();
        appData.autoDialMaxSaveCount = appData.autoDialMaxSaveCount ? appData.autoDialMaxSaveCount : CallHistory.getDefaultMaxSaveCount();
        appData.camponTimeoutSeconds = appData.camponTimeoutSeconds ? appData.camponTimeoutSeconds : Campon.getDefaultCamponTimeoutMilliSeconds();
        appData.shortDials = appData.shortDials ? appData.shortDials : null;
        appData.ringtoneInfos = appData.ringtoneInfos ? appData.ringtoneInfos : null;
        appData.ringtoneInfos2 = appData.ringtoneInfos2 ? appData.ringtoneInfos2 : null;
        appData.quickBusyClickToCall = OCUtil.isBoolean(appData.quickBusyClickToCall ) ? appData.quickBusyClickToCall : QuickBusy_ver2.getDefaultQuickBusyClickToCall();
        appData.ucUrl = appData.ucUrl ? appData.ucUrl : "";
        appData.ucChatAgentComponentEnabled = appData.ucChatAgentComponentEnabled  === true ? true : false;
        appData.extensionScript = appData.extensionScript ? appData.extensionScript : "";
        appData.phoneTerminal = appData.phoneTerminal ? appData.phoneTerminal : "phoneTerminal_webphone";
        appData.autoDialRecentDisplayOrder = CallHistory2.parseAutoDialRecentDisplayOrderForce( appData.autoDialRecentDisplayOrder );
		appData.autoDialPhonebookName = appData.autoDialPhonebookName ? appData.autoDialPhonebookName : "";
        appData.autoDialOneTouchCall = OCUtil.isBoolean( appData.autoDialOneTouchCall )  ? appData.autoDialOneTouchCall : true;
        return appData;
    }

}