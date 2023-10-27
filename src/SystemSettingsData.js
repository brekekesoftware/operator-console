import {CallHistory} from "./CallHistory";
import Campon from "./Campon";
import SystemSettingsForm from "./SystemSettingsForm";
import QuickBusy from "./QuickBusy";

export default class SystemSettingsData{
    constructor( operatorConsoleAsParent ) {
        this._OperatorConsoleAsParent = operatorConsoleAsParent;
        this._Data = {};
        this._setDefaultDatas();
    }

    getAutoDialMaxDisplayCount(){
        return this._Data.autoDialMaxSaveCount;
    }

    getAutoDialMaxSaveCount(){
        return this._Data.autoDialMaxSaveCount;
    }

    getQuickBusyClickToCall() {
        return this._Data.quickBusyClickToCall;
    }

    setData( appData ){
        this._Data.autoDialMaxDisplayCount = appData.autoDialMaxDisplayCount;
        this._Data.autoDialMaxSaveCount = appData.autoDialMaxSaveCount;
        this._Data.camponTimeoutSeconds = appData.camponTimeoutSeconds;
        this._Data.shortDials = appData.shortDials;
        this._Data.quickBusyClickToCall = appData.quickBusyClickToCall;
        this._camponTimeoutMillis = appData.camponTimeoutSeconds * 1000;

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

    }

    getShortDials(){
        return this._Data.shortDials;
    }

    getCamponTimeoutMillis(){
        return this._camponTimeoutMillis;
    }

    _formatSystemSettingsAppData(appData){
        if( !appData ){
            appData = {};
        }
        appData.autoDialMaxDisplayCount = appData.autoDialMaxDisplayCount ? appData.autoDialMaxDisplayCount : CallHistory.getDefaultMaxDisplayCount();
        appData.autoDialMaxSaveCount = appData.autoDialMaxSaveCount ? appData.autoDialMaxSaveCount : CallHistory.getDefaultMaxSaveCount();
        appData.camponTimeoutSeconds = appData.camponTimeoutSeconds ? appData.camponTimeoutSeconds : Campon.getDefaultCamponTimeoutMilliSeconds();
        appData.shortDials = appData.shortDials ? appData.shortDials : null;
        appData.quickBusyClickToCall = appData.quickBusyClickToCall ? appData.quickBusyClickToCall : QuickBusy.getDefaultQuickBusyClickToCall();

        this._camponTimeoutMillis = appData.camponTimeoutSeconds * 1000;
    }

}