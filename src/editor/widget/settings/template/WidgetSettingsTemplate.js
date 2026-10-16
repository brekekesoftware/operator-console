import OCUtil from "../../../../OCUtil";

const _WIDGET_SETTINGS_TEMPLATE_NAME_MAX_LENGTH = 50;
export default class WidgetSettingsTemplate {

    constructor( oArg ) {
        this._WidgetSettingsTemplatesAsParent = oArg["WidgetSettingsTemplatesAsParent"];
        this._name = oArg["WidgetSettingsTemplateName"];
        const wstinaivo = oArg["WidgetSettingsTemplateFieldNamesAndFieldValuesObject"];
        if( wstinaivo ){
            this._FieldNamesAndFieldValuesObject = structuredClone( wstinaivo );
        }
        else{
            this._FieldNamesAndFieldValuesObject = new Object();
        }

    }

    getWidgetSettingsTemplateName(){
        return this._name;
    }

    setWidgetSettingsTemplateName( s ){
        this._name = s;
    }

    getWidgetSettingsTemplateFieldNameArray(){
        const sItemNames = Object.keys( this._FieldNamesAndFieldValuesObject );
        return sItemNames;
    }

    getWidgetSettingsTemplateFieldValue( sItemName ){
        const fieldValue = this._FieldNamesAndFieldValuesObject[ sItemName ];
        return fieldValue;
    }

    isWidgetSettingsTemplateFieldExists( fieldName ){
        const b = this._FieldNamesAndFieldValuesObject.hasOwnProperty( fieldName );
        return b;
    }

    setWidgetSettingsTemplateField( itemName, itemValue ){
        this._FieldNamesAndFieldValuesObject[ itemName ] = itemValue;
    }

    clearWidgetSettingsTemplateFields(){
        const names = Object.getOwnPropertyNames( this._FieldNamesAndFieldValuesObject );
        for (const n of names) {
            delete this._FieldNamesAndFieldValuesObject[n];
        }
    }

    static get WIDGET_SETTINGS_TEMPLATE_NAME_MAX_LENGTH(){
        return _WIDGET_SETTINGS_TEMPLATE_NAME_MAX_LENGTH;
    }

}