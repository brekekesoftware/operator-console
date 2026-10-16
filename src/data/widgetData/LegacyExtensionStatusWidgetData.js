import WidgetData from "./WidgetData";

export default class LegacyExtensionStatusWidgetData extends WidgetData {
    constructor(options) {
        super(options);
        this._extension = options["extension"];
        this._extensionStatusFgColor = options["extensionStatusFgColor"];
        this._extensionStatusLampSize = options["extensionStatusLampSize"];
        this._extensionStatusExtensionTextTopMargin = options["extensionStatusExtensionTextTopMargin"];
        this._extensionStatusExtensionFontSize = options["extensionStatusExtensionFontSize"];
    }

    //!override
    setWidgetDataToObjectMain(o) {

        if (!!this._extension) {
            o["extension"] = this._extension;
        } else {
            delete o["extension"];
        }

        if (!!this._extensionStatusFgColor) {
            o["extensionStatusFgColor"] = this._extensionStatusFgColor;
        } else {
            delete o["extensionStatusFgColor"];
        }

        if( !!this._extensionStatusLampSize ){
            o["extensionStatusLampSize"] = this._extensionStatusLampSize;
        }
        else{
            delete o["extensionStatusLampSize"];
        }

        if( !!this._extensionStatusExtensionTextTopMargin ){
            o["extensionStatusExtensionTextTopMargin"] = this._extensionStatusExtensionTextTopMargin;
        }
        else{
            delete o["extensionStatusExtensionTextTopMargin"];
        }

        if( !!this._extensionStatusExtensionFontSize ){
            o["extensionStatusExtensionFontSize"] = this._extensionStatusExtensionFontSize;
        }
        else{
            delete o["extensionStatusExtensionFontSize"];
        }
    }

    setExtension(extension) {
        this._extension = extension;
    }

    getExtension() {
        return this._extension;
    }

    setExtensionStatusFgColor(color) {
        this._extensionStatusFgColor = color;
    }

    getExtensionStatusFgColor() {
        return this._extensionStatusFgColor;
    }

    setExtensionStatusLampSize( size ){
        this._extensionStatusLampSize = size;
    }

    getExtensionStatusLampSize(){
        return this._extensionStatusLampSize;
    }

    setExtensionStatusExtensionFontSize( size ){
        this._extensionStatusExtensionFontSize = size;
    }

    getExtensionStatusExtensionFontSize(){
        return this._extensionStatusExtensionFontSize;
    }

    setExtensionStatusExtensionTextTopMargin( margin ){
        this._extensionStatusExtensionTextTopMargin = margin;
    }

    getExtensionStatusExtensionTextTopMargin(){
        return this._extensionStatusExtensionTextTopMargin;
    }

    //!override
    importFromWidget_ver0_1(widget_ver0_1) {
        if( widget_ver0_1.extension ){
            this.setExtension( widget_ver0_1.extension );
        }
        if (widget_ver0_1.exStatusFgColor ) {
            this.setExtensionStatusFgColor( widget_ver0_1.exStatusFgColor );
        }
    }

    //!override
    loadFromWidgetSettingsTemplateMain( wst, bIncludeButtonFunction = undefined ){
        if( wst.isWidgetSettingsTemplateFieldExists( WidgetData.WIDGET_FIELD_NAME_EXTENSION ) === true ) {
            this._extension = wst.getWidgetSettingsTemplateFieldValue(WidgetData.WIDGET_FIELD_NAME_EXTENSION);
        }
        if( wst.isWidgetSettingsTemplateFieldExists( WidgetData.WIDGET_FIELD_NAME_FG_COLOR ) === true ) {
            this._extensionStatusFgColor = wst.getWidgetSettingsTemplateFieldValue(WidgetData.WIDGET_FIELD_NAME_FG_COLOR);
        }
        if( wst.isWidgetSettingsTemplateFieldExists( WidgetData.WIDGET_FIELD_NAME_LAMP_SIZE ) === true ) {
            this._extensionStatusLampSize = wst.getWidgetSettingsTemplateFieldValue(WidgetData.WIDGET_FIELD_NAME_LAMP_SIZE);
        }
        if( wst.isWidgetSettingsTemplateFieldExists( WidgetData.WIDGET_FIELD_NAME_TEXT_TOP_MARGIN ) === true ) {
            this._extensionStatusExtensionTextTopMargin = wst.getWidgetSettingsTemplateFieldValue(WidgetData.WIDGET_FIELD_NAME_TEXT_TOP_MARGIN);
        }
        if( wst.isWidgetSettingsTemplateFieldExists( WidgetData.WIDGET_FIELD_NAME_FONT_SIZE ) === true ) {
            this._extensionStatusExtensionFontSize = wst.getWidgetSettingsTemplateFieldValue(WidgetData.WIDGET_FIELD_NAME_FONT_SIZE);
        }

    }

    //!override
    saveToWidgetSettingsTemplateMain( wst ){
        wst.setWidgetSettingsTemplateField( WidgetData.WIDGET_FIELD_NAME_EXTENSION, this._extension );
        wst.setWidgetSettingsTemplateField( WidgetData.WIDGET_FIELD_NAME_FG_COLOR, this._extensionStatusFgColor );
        wst.setWidgetSettingsTemplateField( WidgetData.WIDGET_FIELD_NAME_LAMP_SIZE, this._extensionStatusLampSize );
        wst.setWidgetSettingsTemplateField( WidgetData.WIDGET_FIELD_NAME_TEXT_TOP_MARGIN, this._extensionStatusExtensionTextTopMargin );
        wst.setWidgetSettingsTemplateField( WidgetData.WIDGET_FIELD_NAME_FONT_SIZE, this._extensionStatusExtensionFontSize );
    }
}