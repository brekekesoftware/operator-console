import OCUtil from "../../../../OCUtil";
import i18n from "../../../../i18n";
import WidgetSettingsTemplate from "./WidgetSettingsTemplate";

const _WIDGET_SETTINGS_TEMPLATES_DATA_ID = "WidgetSettingsTemplatesDataId-WidgetSettingsTemplates-OperatorConsole-Brekeke";
const _WIDGET_SETTINGS_TEMPLATES_FORMAT = "20250611000000";

export default class WidgetSettingsTemplates{
    constructor( ) {
        this._WidgetSettingsTemplateArray = new Array();
    }

    getWidgetSettingsTemplateArray(){
        return this._WidgetSettingsTemplateArray;
    }

    saveWidgetSettingsTemplatesAsync( palRestApi, onSuccessFunction, onFailFunction ){
        const templateObjectArray = new Array( this._WidgetSettingsTemplateArray.length );
        for( let i = 0; i < this._WidgetSettingsTemplateArray.length; i++ ){
            const wst = this._WidgetSettingsTemplateArray[i];
            const oWst = {};
            oWst["WidgetSettingsTemplateName"] = wst.getWidgetSettingsTemplateName();
            const wstfnafvo = new Object();
            oWst["WidgetSettingsTemplateFieldNamesAndFieldValuesObject"] = wstfnafvo
            const nameArray = wst.getWidgetSettingsTemplateFieldNameArray();
            for( let n = 0; n < nameArray.length; n++ ){
                const templateItemName = nameArray[n];
                const templateItemValue = wst.getWidgetSettingsTemplateFieldValue( templateItemName );
                wstfnafvo[ templateItemName ] = templateItemValue;
            }
            templateObjectArray[i] = oWst;
        }


        const oData = {
            "WidgetSettingsTemplateFormat" : _WIDGET_SETTINGS_TEMPLATES_FORMAT,
            "WidgetSettingsTemplateArray": templateObjectArray
        };
        const setAppDataOptions = {
            methodName: "setAppData",
            methodParams: JSON.stringify({
                data_id: _WIDGET_SETTINGS_TEMPLATES_DATA_ID,
                data: oData
            }),
            onSuccessFunction: () =>{
                //Notification.success({ key: 'sync', message: i18n.t("saved_data_to_pbx_successfully") });
                onSuccessFunction();
            },
            onFailFunction:  ( errorOrResponse ) =>{
                OCUtil.logErrorWithNotification("Failed to save WidgetSettingsTemplates.", i18n.t("failed_to_save_data_to_pbx"), errorOrResponse );
                onFailFunction( errorOrResponse );
            }
        };
        palRestApi.callPalRestApiMethod( setAppDataOptions );
    }

    static getWidgetSettingsTemplates(){
        return _WIDGET_SETTINGS_TEMPLATES;
    }

    // static isWidgetSettingsLoaded(){
    //     const b = !!_WIDGET_SETTINGS_TEMPLATES;
    //     return b;
    // }

    reloadWidgetSettingsTemplatesAsync( palRestApi, onSuccessFunction, onFailFunction  ){
        const getAppDataOptions = {
            methodName : "getAppData",
            methodParams : JSON.stringify({
                data_id: _WIDGET_SETTINGS_TEMPLATES_DATA_ID
            }),
            onSuccessFunction : ( sJsonData ) => {
                let oData;
                if( sJsonData && sJsonData.length !== 0 ){
                    try {
                        oData = JSON.parse(sJsonData);
                    } catch (err) {
                        OCUtil.logErrorWithNotification("Failed to parse WidgetSettingsTemplates(json).", i18n.t("Failed_to_parse_widget_settings_templates"), err);
                        onFailFunction(this, err);
                        return false;
                    }
                }
                else{
                    oData = null;
                }


                if( !oData ){
                    onSuccessFunction(this);
                    return;
                }

                const templateFormat = oData["WidgetSettingsTemplateFormat"];
                this._widgetSettingsTemplateFormat = templateFormat;

                this._WidgetSettingsTemplateArray.length = 0;

                const templateArray = oData["WidgetSettingsTemplateArray"];
                if( !templateArray  ){
                    onSuccessFunction(this);
                    return;
                }

                for( let i = 0; i < templateArray.length; i++ ){
                    const oTemplate = templateArray[i];
                    const oArg = {
                        "WidgetSettingsTemplatesAsParent" : this,
                        "WidgetSettingsTemplateName" :  oTemplate["WidgetSettingsTemplateName"],
                        "WidgetSettingsTemplateFieldNamesAndFieldValuesObject" : oTemplate["WidgetSettingsTemplateFieldNamesAndFieldValuesObject"]
                    };
                    const wst = new WidgetSettingsTemplate( oArg );
                    this._WidgetSettingsTemplateArray.push( wst );
                }

                onSuccessFunction(this);
                return true;
            },
            onFailFunction: (errorOrResponse) =>{
                OCUtil.logErrorWithNotification("Failed to load widget template settings.", i18n.t("Failed_to_load_widget_template_settings"), errorOrResponse );
                onFailFunction(this, errorOrResponse );
            }
        }
        palRestApi.callPalRestApiMethod( getAppDataOptions );

    }

    insertWidgetSettingsTemplate( name, itemNamesAndItemValuesObject = null ){
        const oArg = {
            "WidgetSettingsTemplatesAsParent" : this,
            "WidgetSettingsTemplateName" : name,
            "WidgetSettingsTemplateFieldNamesAndFieldValuesObject" : itemNamesAndItemValuesObject
        };
        const wst = new WidgetSettingsTemplate(oArg);
        this._WidgetSettingsTemplateArray.unshift( wst );
        return wst;
    }

    deleteWidgetSettingsTemplateByIndex( index ){
        this._WidgetSettingsTemplateArray.splice(index,1);
    }

}
const _WIDGET_SETTINGS_TEMPLATES = new WidgetSettingsTemplates();
