import WidgetData from "./WidgetData";

export default class TextWidgetData extends WidgetData {
    constructor( options ) {
        super(options);
        this._text = options["text"];
        this._textFontSize = options["textFontSize"];
        this._textFgColor = options["textFgColor"];
        this._textBgColor = options["textBgColor"];
        this._textBorderRadius = options["textBorderRadius"];
    }

    //!override
    setWidgetDataToObjectMain( o ){

        if( this._text  ){
            o["text"] = this._text;
        }
        else{
            delete o["text"];
        }

        if( this._textFontSize ){
            o["textFontSize"] = this._textFontSize;
        }
        else{
            delete o["textFontSize"];
        }

        if( this._textFgColor ){
            o["textFgColor"] = this._textFgColor;
        }
        else{
            delete o["textFgColor"];
        }

        if( this._textBgColor ){
            o["textBgColor"] = this._textBgColor;
        }
        else{
            delete o["textBgColor"];
        }

        if( this._textBorderRadius || this._textBorderRadius !== 0 ){
            o["textBorderRadius"] = this._textBorderRadius;
        }
        else{
            delete o["textBorderRadius"];
        }

    }

    setText( text ){
        this._text = text;
    }

    getText(){
        return this._text;
    }

    setTextFontSize( n ){
        this._textFontSize = n;
    }

    getTextFontSize(){
        return this._textFontSize;
    }

    getTextFgColor(){
        return this._textFgColor;
    }

    setTextFgColor( color ){
        this._textFgColor = color;
    }

    getTextBgColor(){
        return this._textBgColor;
    }

    setTextBgColor( color ){
        this._textBgColor = color;
    }

    getTextBorderRadius(){
        return this._textBorderRadius;
    }

    setTextBorderRadius( n ){
        this._textBorderRadius = n;
    }

    //!override
    importFromWidget_ver0_1(widget_ver0_1) {
        if( widget_ver0_1.text ){
            this._text = widget_ver0_1.text;
        }
        if( widget_ver0_1.textBgColor ){
            this._textBgColor = widget_ver0_1.textBgColor;
        }
        if( widget_ver0_1.textFgColor ){
            this._textFgColor = widget_ver0_1.textFgColor;
        }
        if( widget_ver0_1.textBorderRadius ){
            this._textBorderRadius = widget_ver0_1.textBorderRadius;
        }
    }

    //!override
    loadFromWidgetSettingsTemplateMain( wst, bIncludeButtonFunction = undefined ){
        if( wst.isWidgetSettingsTemplateFieldExists( WidgetData.WIDGET_FIELD_NAME_TEXT ) === true ) {
            this._text = wst.getWidgetSettingsTemplateFieldValue(WidgetData.WIDGET_FIELD_NAME_TEXT);
        }
        if( wst.isWidgetSettingsTemplateFieldExists( WidgetData.WIDGET_FIELD_NAME_FONT_SIZE ) === true ) {
            this._textFontSize = wst.getWidgetSettingsTemplateFieldValue(WidgetData.WIDGET_FIELD_NAME_FONT_SIZE);
        }
        if( wst.isWidgetSettingsTemplateFieldExists( WidgetData.WIDGET_FIELD_NAME_FG_COLOR ) === true ) {
            this._textFgColor = wst.getWidgetSettingsTemplateFieldValue(WidgetData.WIDGET_FIELD_NAME_FG_COLOR);
        }
        if( wst.isWidgetSettingsTemplateFieldExists( WidgetData.WIDGET_FIELD_NAME_BG_COLOR ) === true ) {
            this._textBgColor = wst.getWidgetSettingsTemplateFieldValue(WidgetData.WIDGET_FIELD_NAME_BG_COLOR);
        }
        if( wst.isWidgetSettingsTemplateFieldExists( WidgetData.WIDGET_FIELD_NAME_BORDER_RADIUS ) === true ) {
            this._textBorderRadius = wst.getWidgetSettingsTemplateFieldValue(WidgetData.WIDGET_FIELD_NAME_BORDER_RADIUS);
        }
    }

    //!override
    saveToWidgetSettingsTemplateMain( wst ){
        wst.setWidgetSettingsTemplateField( WidgetData.WIDGET_FIELD_NAME_TEXT, this._text );
        wst.setWidgetSettingsTemplateField( WidgetData.WIDGET_FIELD_NAME_FONT_SIZE, this._textFontSize );
        wst.setWidgetSettingsTemplateField( WidgetData.WIDGET_FIELD_NAME_FG_COLOR, this._textFgColor );
        wst.setWidgetSettingsTemplateField( WidgetData.WIDGET_FIELD_NAME_BG_COLOR, this._textBgColor );
        wst.setWidgetSettingsTemplateField( WidgetData.WIDGET_FIELD_NAME_BORDER_RADIUS, this._textBorderRadius );
    }
}