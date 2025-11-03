import WidgetData from "./WidgetData";

export default class ExtensionTableWidgetData extends WidgetData{
    constructor( options ) {
        super( options );
        this._extensiontableBgColor = options["extensiontableBgColor"];
        this._extensiontableOuterBorderThickness = options["extensiontableOuterBorderThickness"];
        this._extensiontableOuterBorderColor = options["extensiontableOuterBorderColor"];
        this._extensiontableOuterBorderRadius = options["extensiontableOuterBorderRadius"];
        this._extensiontableHeaderFgColor = options["extensiontableHeaderFgColor"];
        this._extensiontableHeaderBgColor = options["extensiontableHeaderBgColor"];
        this._extensiontableHeaderRowUnderlineThickness = options["extensiontableHeaderRowUnderlineThickness"];
        this._extensiontableHeaderRowUnderlineColor = options["extensiontableHeaderRowUnderlineColor"];
        this._extensiontableBodyFgColor = options["extensiontableBodyFgColor"];
        this._extensiontableBodyRowUnderlineThickness = options["extensiontableBodyRowUnderlineThickness"];
        this._extensiontableBodyRowUnderlineColor = options["extensiontableBodyRowUnderlineColor"];
        this._extensiontableBodyFontSize = options["extensiontableBodyFontSize"];
        this._extensiontableHeaderFontSize = options["extensiontableHeaderFontSize"];
    }

    //!override
    setWidgetDataToObjectMain( o ){
        if( this._extensiontableBgColor ){
            o["extensiontableBgColor"] = this._extensiontableBgColor;
        }
        else{
            delete o["extensiontableBgColor"];
        }

        if( this._extensiontableOuterBorderThickness || this._extensiontableOuterBorderThickness === 0 ){
            o["extensiontableOuterBorderThickness"] = this._extensiontableOuterBorderThickness;
        }
        else{
            delete o["extensiontableOuterBorderThickness"];
        }

        if( this._extensiontableOuterBorderColor ){
            o["extensiontableOuterBorderColor"] = this._extensiontableOuterBorderColor;
        }
        else{
            delete o["extensiontableOuterBorderColor"];
        }

        if( this._extensiontableOuterBorderRadius || this._extensiontableOuterBorderRadius === 0 ){
            o["extensiontableOuterBorderRadius"] = this._extensiontableOuterBorderRadius;
        }
        else{
            delete o["extensiontableOuterBorderRadius"];
        }

        if( this._extensiontableHeaderFgColor ){
            o["extensiontableHeaderFgColor"] = this._extensiontableHeaderFgColor;
        }
        else{
            delete o["extensiontableHeaderFgColor"];
        }

        if( this._extensiontableHeaderBgColor ){
            o["extensiontableHeaderBgColor"] = this._extensiontableHeaderBgColor;
        }
        else{
            delete o["extensiontableHeaderBgColor"];
        }

        if( this._extensiontableHeaderRowUnderlineThickness || this._extensiontableHeaderRowUnderlineThickness === 0 ){
            o["extensiontableHeaderRowUnderlineThickness"] = this._extensiontableHeaderRowUnderlineThickness;
        }
        else{
            delete o["extensiontableHeaderRowUnderlineThickness"];
        }

        if( this._extensiontableHeaderRowUnderlineColor ){
            o["extensiontableHeaderRowUnderlineColor"] = this._extensiontableHeaderRowUnderlineColor;
        }
        else{
            delete o["extensiontableHeaderRowUnderlineColor"];
        }

        if( this._extensiontableBodyFgColor ){
            o["extensiontableBodyFgColor"] = this._extensiontableBodyFgColor;
        }
        else{
            delete o["extensiontableBodyFgColor"];
        }

        if( this._extensiontableBodyRowUnderlineThickness || this._extensiontableBodyRowUnderlineThickness === 0 ){
            o["extensiontableBodyRowUnderlineThickness"] = this._extensiontableBodyRowUnderlineThickness;
        }
        else{
            delete o["extensiontableBodyRowUnderlineThickness"];
        }

        if( this._extensiontableBodyRowUnderlineColor ){
            o["extensiontableBodyRowUnderlineColor"] = this._extensiontableBodyRowUnderlineColor;
        }
        else{
            delete o["extensiontableBodyRowUnderlineColor"];
        }

        if( this._extensiontableBodyFontSize ){
            o["extensiontableBodyFontSize"] = this._extensiontableBodyFontSize;
        }
        else{
            delete o["extensiontableBodyFontSize"];
        }

        if( this._extensiontableHeaderFontSize ){
            o["extensiontableHeaderFontSize"] = this._extensiontableHeaderFontSize;
        }
        else{
            delete o["extensiontableHeaderFontSize"];
        }
    }

    getExtensiontableBodyFontSize(){
        return this._extensiontableBodyFontSize;
    }

    setExtensiontableBodyFontSize( n ){
        this._extensiontableBodyFontSize = n;
    }

    getExtensiontableHeaderFontSize(){
        return this._extensiontableHeaderFontSize;
    }

    setExtensiontableHeaderFontSize( n ){
        this._extensiontableHeaderFontSize = n;
    }

    getExtensiontableBgColor(){
        return this._extensiontableBgColor;
    }

    setExtensiontableBgColor( color ){
        this._extensiontableBgColor = color;
    }

    getExtensiontableOuterBorderThickness(){
        return this._extensiontableOuterBorderThickness;
    }

    setExtensiontableOuterBorderThickness( n ){
        this._extensiontableOuterBorderThickness = n;
    }

    getExtensiontableOuterBorderColor(){
        return this._extensiontableOuterBorderColor;
    }

    setExtensiontableOuterBorderColor( color ){
        this._extensiontableOuterBorderColor = color;
    }

    getExtensiontableOuterBorderRadius(){
        return this._extensiontableOuterBorderRadius;
    }

    setExtensiontableOuterBorderRadius(n){
        this._extensiontableOuterBorderRadius = n;
    }

    getExtensiontableHeaderFgColor(){
        return this._extensiontableHeaderFgColor;
    }

    setExtensiontableHeaderFgColor( color ){
        this._extensiontableHeaderFgColor = color;
    }

    getExtensiontableHeaderBgColor(){
        return this._extensiontableHeaderBgColor;
    }

    setExtensiontableHeaderBgColor( color ){
        this._extensiontableHeaderBgColor = color;
    }

    getExtensiontableHeaderRowUnderlineThickness(){
        return this._extensiontableHeaderRowUnderlineThickness;
    }

    setExtensiontableHeaderRowUnderlineThickness(n){
        this._extensiontableHeaderRowUnderlineThickness = n;
    }

    getExtensiontableHeaderRowUnderlineColor(){
        return this._extensiontableHeaderRowUnderlineColor;
    }

    setExtensiontableHeaderRowUnderlineColor( color ){
        this._extensiontableHeaderRowUnderlineColor = color;
    }

    getExtensiontableBodyFgColor(){
        return this._extensiontableBodyFgColor;
    }

    setExtensiontableBodyFgColor( color ){
        this._extensiontableBodyFgColor = color;
    }

    getExtensiontableBodyRowUnderlineThickness(){
        return this._extensiontableBodyRowUnderlineThickness;
    }

    setExtensiontableBodyRowUnderlineThickness( n ){
        this._extensiontableBodyRowUnderlineThickness = n;
    }

    getExtensiontableBodyRowUnderlineColor(){
        return this._extensiontableBodyRowUnderlineColor;
    }

    setExtensiontableBodyRowUnderlineColor( color ){
        this._extensiontableBodyRowUnderlineColor = color;
    }

    //!override
    importFromWidget_ver0_1(widget_ver0_1) {
        if (widget_ver0_1.extensiontableBgColor) {
            this._extensiontableBgColor = widget_ver0_1.extensiontableBgColor;
        }
        if (widget_ver0_1.extensiontableBodyFgColor) {
            this._extensiontableBodyFgColor = widget_ver0_1.extensiontableBodyFgColor;
        }
        if (widget_ver0_1.extensiontableBodyRowUnderlineColor) {
            this._extensiontableBodyRowUnderlineColor = widget_ver0_1.extensiontableBodyRowUnderlineColor;
        }
        if (widget_ver0_1.extensiontableBodyRowUnderlineThickness) {
            this._extensiontableBodyRowUnderlineThickness = widget_ver0_1.extensiontableBodyRowUnderlineThickness;
        }
        if (widget_ver0_1.extensiontableHeaderFgColor) {
            this._extensiontableHeaderFgColor = widget_ver0_1.extensiontableHeaderFgColor;
        }
        if (widget_ver0_1.extensiontableHeaderRowUnderlineColor) {
            this._extensiontableHeaderRowUnderlineColor = widget_ver0_1.extensiontableHeaderRowUnderlineColor;
        }
        if (widget_ver0_1.extensiontableHeaderRowUnderlineThickness) {
            this._extensiontableHeaderRowUnderlineThickness = widget_ver0_1.extensiontableHeaderRowUnderlineThickness;
        }
        if (widget_ver0_1.extensiontableOuterBorderColor) {
            this._extensiontableOuterBorderColor = widget_ver0_1.extensiontableOuterBorderColor;
        }
        if (widget_ver0_1.extensiontableOuterBorderRadius) {
            this._extensiontableOuterBorderRadius = widget_ver0_1.extensiontableOuterBorderRadius;
        }
        if (widget_ver0_1.extensiontableOuterBorderThickness) {
            this._extensiontableOuterBorderThickness = widget_ver0_1.extensiontableOuterBorderThickness;
        }
    }

    //!override
    loadFromWidgetSettingsTemplateMain( wst, bIncludeButtonFunction = undefined ){

        if( wst.isWidgetSettingsTemplateFieldExists( WidgetData.WIDGET_FIELD_NAME_BG_COLOR ) === true ) {
            this._extensiontableBgColor = wst.getWidgetSettingsTemplateFieldValue(WidgetData.WIDGET_FIELD_NAME_BG_COLOR);
        }

        if( wst.isWidgetSettingsTemplateFieldExists( WidgetData.WIDGET_FIELD_NAME_OUTER_BORDER_THICKNESS ) === true ) {
            this._extensiontableOuterBorderThickness = wst.getWidgetSettingsTemplateFieldValue(WidgetData.WIDGET_FIELD_NAME_OUTER_BORDER_THICKNESS);
        }
        if( wst.isWidgetSettingsTemplateFieldExists( WidgetData.WIDGET_FIELD_NAME_OUTER_BORDER_COLOR ) === true ) {
            this._extensiontableOuterBorderColor = wst.getWidgetSettingsTemplateFieldValue(WidgetData.WIDGET_FIELD_NAME_OUTER_BORDER_COLOR);
        }
        if( wst.isWidgetSettingsTemplateFieldExists( WidgetData.WIDGET_FIELD_NAME_OUTER_BORDER_RADIUS ) === true ) {
            this._extensiontableOuterBorderRadius = wst.getWidgetSettingsTemplateFieldValue(WidgetData.WIDGET_FIELD_NAME_OUTER_BORDER_RADIUS);
        }

        if( wst.isWidgetSettingsTemplateFieldExists( WidgetData.WIDGET_FIELD_NAME_HEADER_FG_COLOR ) === true ) {
            this._extensiontableHeaderFgColor = wst.getWidgetSettingsTemplateFieldValue(WidgetData.WIDGET_FIELD_NAME_HEADER_FG_COLOR);
        }
        if( wst.isWidgetSettingsTemplateFieldExists( WidgetData.WIDGET_FIELD_NAME_HEADER_BG_COLOR ) === true ) {
            this._extensiontableHeaderBgColor = wst.getWidgetSettingsTemplateFieldValue(WidgetData.WIDGET_FIELD_NAME_HEADER_BG_COLOR);
        }
        if( wst.isWidgetSettingsTemplateFieldExists( WidgetData.WIDGET_FIELD_NAME_HEADER_FONT_SIZE ) === true ) {
            this._extensiontableHeaderFontSize = wst.getWidgetSettingsTemplateFieldValue(WidgetData.WIDGET_FIELD_NAME_HEADER_FONT_SIZE);
        }

        if( wst.isWidgetSettingsTemplateFieldExists( WidgetData.WIDGET_FIELD_NAME_HEADER_ROW_UNDERLINE_THICKNESS ) === true ) {
            this._extensiontableHeaderRowUnderlineThickness = wst.getWidgetSettingsTemplateFieldValue(WidgetData.WIDGET_FIELD_NAME_HEADER_ROW_UNDERLINE_THICKNESS);
        }
        if( wst.isWidgetSettingsTemplateFieldExists( WidgetData.WIDGET_FIELD_NAME_HEADER_ROW_UNDERLINE_COLOR ) === true ) {
            this._extensiontableHeaderRowUnderlineColor = wst.getWidgetSettingsTemplateFieldValue(WidgetData.WIDGET_FIELD_NAME_HEADER_ROW_UNDERLINE_COLOR);
        }

        if( wst.isWidgetSettingsTemplateFieldExists( WidgetData.WIDGET_FIELD_NAME_BODY_FONT_SIZE ) === true ) {
            this._extensiontableBodyFontSize = wst.getWidgetSettingsTemplateFieldValue(WidgetData.WIDGET_FIELD_NAME_BODY_FONT_SIZE);
        }
        if( wst.isWidgetSettingsTemplateFieldExists( WidgetData.WIDGET_FIELD_NAME_BODY_FG_COLOR ) === true ) {
            this._extensiontableBodyFgColor = wst.getWidgetSettingsTemplateFieldValue(WidgetData.WIDGET_FIELD_NAME_BODY_FG_COLOR);
        }
        if( wst.isWidgetSettingsTemplateFieldExists( WidgetData.WIDGET_FIELD_NAME_BODY_ROW_UNDERLINE_THICKNESS ) === true ) {
            this._extensiontableBodyRowUnderlineThickness = wst.getWidgetSettingsTemplateFieldValue(WidgetData.WIDGET_FIELD_NAME_BODY_ROW_UNDERLINE_THICKNESS);
        }
        if( wst.isWidgetSettingsTemplateFieldExists( WidgetData.WIDGET_FIELD_NAME_BODY_ROW_UNDERLINE_COLOR ) === true ) {
            this._extensiontableBodyRowUnderlineColor = wst.getWidgetSettingsTemplateFieldValue(WidgetData.WIDGET_FIELD_NAME_BODY_ROW_UNDERLINE_COLOR);
        }

    }

    //!override
    saveToWidgetSettingsTemplateMain( wst ){
        wst.setWidgetSettingsTemplateField( WidgetData.WIDGET_FIELD_NAME_BG_COLOR, this._extensiontableBgColor );

        wst.setWidgetSettingsTemplateField( WidgetData.WIDGET_FIELD_NAME_OUTER_BORDER_THICKNESS, this._extensiontableOuterBorderThickness );
        wst.setWidgetSettingsTemplateField( WidgetData.WIDGET_FIELD_NAME_OUTER_BORDER_COLOR, this._extensiontableOuterBorderColor );
        wst.setWidgetSettingsTemplateField( WidgetData.WIDGET_FIELD_NAME_OUTER_BORDER_RADIUS, this._extensiontableOuterBorderRadius );

        wst.setWidgetSettingsTemplateField( WidgetData.WIDGET_FIELD_NAME_HEADER_FG_COLOR, this._extensiontableHeaderFgColor );
        wst.setWidgetSettingsTemplateField( WidgetData.WIDGET_FIELD_NAME_HEADER_BG_COLOR, this._extensiontableHeaderBgColor );
        wst.setWidgetSettingsTemplateField( WidgetData.WIDGET_FIELD_NAME_HEADER_FONT_SIZE, this._extensiontableHeaderFontSize );

        wst.setWidgetSettingsTemplateField( WidgetData.WIDGET_FIELD_NAME_HEADER_ROW_UNDERLINE_THICKNESS, this._extensiontableHeaderRowUnderlineThickness );
        wst.setWidgetSettingsTemplateField( WidgetData.WIDGET_FIELD_NAME_HEADER_ROW_UNDERLINE_COLOR, this._extensiontableHeaderRowUnderlineColor );

        wst.setWidgetSettingsTemplateField( WidgetData.WIDGET_FIELD_NAME_BODY_FONT_SIZE, this._extensiontableBodyFontSize );
        wst.setWidgetSettingsTemplateField( WidgetData.WIDGET_FIELD_NAME_BODY_FG_COLOR, this._extensiontableBodyFgColor );
        wst.setWidgetSettingsTemplateField( WidgetData.WIDGET_FIELD_NAME_BODY_ROW_UNDERLINE_THICKNESS, this._extensiontableBodyRowUnderlineThickness );
        wst.setWidgetSettingsTemplateField( WidgetData.WIDGET_FIELD_NAME_BODY_ROW_UNDERLINE_COLOR, this._extensiontableBodyRowUnderlineColor );
    }
}