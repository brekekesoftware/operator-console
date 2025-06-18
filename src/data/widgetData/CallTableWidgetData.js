import WidgetData from "./WidgetData";

export default class CallTableWidgetData extends WidgetData{
    constructor( options ) {
        super( options );

        this._calltableBgColor = options["calltableBgColor"];
        this._calltableOuterBorderThickness = options["calltableOuterBorderThickness"];
        this._calltableOuterBorderColor = options["calltableOuterBorderColor"];
        this._calltableOuterBorderRadius = options["calltableOuterBorderRadius"];
        this._calltableHeaderFgColor = options["calltableHeaderFgColor"];
        this._calltableHeaderBgColor = options["calltableHeaderBgColor"];
        this._calltableHeaderRowUnderlineThickness = options["calltableHeaderRowUnderlineThickness"];
        this._calltableHeaderRowUnderlineColor = options["calltableHeaderRowUnderlineColor"];
        this._calltableBodyFgColor = options["calltableBodyFgColor"];
        this._calltableBodyRowUnderlineThickness = options["calltableBodyRowUnderlineThickness"];
        this._calltableBodyRowUnderlineColor = options["calltableBodyRowUnderlineColor"];
        this._calltableBodyActiveRowBgColor = options["calltableBodyActiveRowBgColor"];
		this._calltableHeaderFontSize = options["calltableHeaderFontSize"];
		this._calltableBodyFontSize = options["calltableBodyFontSize"];
        this._calltableActiveButtonFontSize = options["calltableActiveButtonFontSize"];
        this._calltableActiveButtonWidth = options["calltableActiveButtonWidth"];
        this._calltableActiveButtonHeight = options["calltableActiveButtonHeight"];
        this._calltableBodyActiveRowFgColor = options["calltableBodyActiveRowFgColor"];
    }

    //!override
    setWidgetDataToObjectMain( o ){
        if( this._calltableBgColor ){
            o["calltableBgColor"] = this._calltableBgColor;
        }
        else{
            delete o["calltableBgColor"];
        }

        if( this._calltableOuterBorderThickness || this._calltableOuterBorderThickness !== 0 ){
            o["calltableOuterBorderThickness"] = this._calltableOuterBorderThickness;
        }
        else{
            delete o["calltableOuterBorderThickness"];
        }

        if( this._calltableOuterBorderColor ){
            o["calltableOuterBorderColor"] = this._calltableOuterBorderColor;
        }
        else{
            delete o["calltableOuterBorderColor"];
        }

        if( this._calltableOuterBorderRadius || this._calltableOuterBorderRadius !== 0 ){
            o["calltableOuterBorderRadius"] = this._calltableOuterBorderRadius;
        }
        else{
            delete o["calltableOuterBorderRadius"];
        }

        if( this._calltableOuterBorderRadius || this._calltableOuterBorderRadius !== 0 ){
            o["calltableOuterBorderRadius"] = this._calltableOuterBorderRadius;
        }
        else{
            delete o["calltableOuterBorderRadius"];
        }

        if( this._calltableHeaderFgColor ){
            o["calltableHeaderFgColor"] = this._calltableHeaderFgColor;
        }
        else{
            delete o["calltableHeaderFgColor"];
        }

        if( this._calltableHeaderBgColor ){
            o["calltableHeaderBgColor"] = this._calltableHeaderBgColor;
        }
        else{
            delete o["calltableHeaderBgColor"];
        }

        if( this._calltableHeaderRowUnderlineThickness || this._calltableHeaderRowUnderlineThickness !== 0 ){
            o["calltableHeaderRowUnderlineThickness"] = this._calltableHeaderRowUnderlineThickness;
        }
        else{
            delete o["calltableHeaderRowUnderlineThickness"];
        }

        if( this._calltableHeaderRowUnderlineColor ){
            o["calltableHeaderRowUnderlineColor"] = this._calltableHeaderRowUnderlineColor;
        }
        else{
            delete o["calltableHeaderRowUnderlineColor"];
        }

        if( this._calltableBodyFgColor ){
            o["calltableBodyFgColor"] = this._calltableBodyFgColor;
        }
        else{
            delete o["calltableBodyFgColor"];
        }

        if( this._calltableBodyRowUnderlineThickness || this._calltableBodyRowUnderlineThickness !== 0 ){
            o["calltableBodyRowUnderlineThickness"] = this._calltableBodyRowUnderlineThickness;
        }
        else{
            delete o["calltableBodyRowUnderlineThickness"];
        }

        if( this._calltableBodyRowUnderlineColor ){
            o["calltableBodyRowUnderlineColor"] = this._calltableBodyRowUnderlineColor;
        }
        else{
            delete o["calltableBodyRowUnderlineColor"];
        }

        if( this._calltableBodyActiveRowBgColor ){
            o["calltableBodyActiveRowBgColor"] = this._calltableBodyActiveRowBgColor;
        }
        else{
            delete o["calltableBodyActiveRowBgColor"];
        }
		
		if( this._calltableHeaderFontSize ){
			o["calltableHeaderFontSize"] = this._calltableHeaderFontSize;
		}
		else{
			delete o["calltableHeaderFontSize"];
		}

		if( this._calltableBodyFontSize ){
			o["calltableBodyFontSize"] = this._calltableBodyFontSize;
		}
		else{
			delete o["calltableBodyFontSize"];
		}

        if( this._calltableActiveButtonFontSize ){
            o["calltableActiveButtonFontSize"] = this._calltableActiveButtonFontSize;
        }
        else{
            delete o["calltableActiveButtonFontSize"];
        }

        if( this._calltableActiveButtonWidth ){
            o["calltableActiveButtonWidth"] = this._calltableActiveButtonWidth;
        }
        else{
            delete o["calltableActiveButtonWidth"];
        }

        if( this._calltableActiveButtonHeight ){
            o["calltableActiveButtonHeight"] = this._calltableActiveButtonHeight;
        }
        else{
            delete o["calltableActiveButtonHeight"];
        }

        if( this._calltableBodyActiveRowFgColor ){
            o["calltableBodyActiveRowFgColor"] = this._calltableBodyActiveRowFgColor;
        }
        else{
            delete o["calltableBodyActiveRowFgColor"];
        }
    }

    getCalltableBgColor(){
        return this._calltableBgColor;
    }

    setCalltableBgColor( color ){
        this._calltableBgColor = color;
    }

    getCalltableOuterBorderThickness(){
        return this._calltableOuterBorderThickness;
    }

    setCalltableOuterBorderThickness( n ){
        this._calltableOuterBorderThickness = n;
    }

    getCalltableOuterBorderColor(){
        return this._calltableOuterBorderColor;
    }

    setCalltableOuterBorderColor( color ){
        this._calltableOuterBorderColor = color;
    }

    getCalltableOuterBorderRadius(){
        return this._calltableOuterBorderRadius;
    }

    setCalltableOuterBorderRadius( n ){
        this._calltableOuterBorderRadius = n;
    }

    getCalltableHeaderFgColor(){
        return this._calltableHeaderFgColor;
    }

    setCalltableHeaderFgColor( color ){
        this._calltableHeaderFgColor = color;
    }

    getCalltableHeaderBgColor(){
        return this._calltableHeaderBgColor;
    }

    setCalltableHeaderBgColor( color ){
        this._calltableHeaderBgColor = color;
    }

    getCalltableHeaderRowUnderlineThickness(){
        return this._calltableHeaderRowUnderlineThickness;
    }

    setCalltableHeaderRowUnderlineThickness(n){
        this._calltableHeaderRowUnderlineThickness = n;
    }

    getCalltableHeaderRowUnderlineColor(){
        return this._calltableHeaderRowUnderlineColor;
    }

    setCalltableHeaderRowUnderlineColor(color){
        this._calltableHeaderRowUnderlineColor = color;
    }

    getCalltableBodyFgColor(){
        return this._calltableBodyFgColor;
    }

    setCalltableBodyFgColor( color ){
        this._calltableBodyFgColor = color;
    }

    getCalltableBodyRowUnderlineThickness(){
        return this._calltableBodyRowUnderlineThickness;
    }

    setCalltableBodyRowUnderlineThickness( n ){
        this._calltableBodyRowUnderlineThickness = n;
    }

    getCalltableBodyRowUnderlineColor(){
        return this._calltableBodyRowUnderlineColor;
    }

    setCalltableBodyRowUnderlineColor( color ){
        this._calltableBodyRowUnderlineColor = color;
    }

    getCalltableBodyActiveRowBgColor(){
        return this._calltableBodyActiveRowBgColor;
    }

    setCalltableBodyActiveRowBgColor( color ){
        this._calltableBodyActiveRowBgColor = color;
    }

    getCalltableBodyActiveRowFgColor(){
        return this._calltableBodyActiveRowFgColor;
    }

    setCalltableBodyActiveRowFgColor( color ){
        this._calltableBodyActiveRowFgColor = color;
    }
	
	getCalltableHeaderFontSize(){
		return this._calltableHeaderFontSize;
	}
	
	setCalltableHeaderFontSize( size ){
		this._calltableHeaderFontSize = size;
	}

	getCalltableBodyFontSize(){
		return this._calltableBodyFontSize;
	}
	
	setCalltableBodyFontSize( size ){
		this._calltableBodyFontSize = size;
	}

    getCalltableActiveButtonFontSize(){
        return this._calltableActiveButtonFontSize;
    }

    setCalltableActiveButtonFontSize( size ){
        this._calltableActiveButtonFontSize = size;
    }

    getCalltableActiveButtonWidth(){
        return this._calltableActiveButtonWidth;
    }

    setCalltableActiveButtonWidth( n ){
        this._calltableActiveButtonWidth = n;
    }

    getCalltableActiveButtonHeight(){
        return this._calltableActiveButtonHeight;
    }

    setCalltableActiveButtonHeight( n ){
        this._calltableActiveButtonHeight = n;
    }

    //!override
    importFromWidget_ver0_1(widget_ver0_1) {
        if( widget_ver0_1.calltableBgColor ){
            this._calltableBgColor = widget_ver0_1.calltableBgColor;
        }
        if( widget_ver0_1.calltableBodyActiveRowBgColor ){
            this._calltableBodyActiveRowBgColor = widget_ver0_1.calltableBodyActiveRowBgColor;
        }
        if( widget_ver0_1.calltableBodyFgColor ){
            this._calltableBodyFgColor = widget_ver0_1.calltableBodyFgColor;
        }
        if( widget_ver0_1.calltableBodyRowUnderlineColor ){
            this._calltableBodyRowUnderlineColor = widget_ver0_1.calltableBodyRowUnderlineColor;
        }
        if( widget_ver0_1.calltableBodyRowUnderlineThickness ){
            this._calltableBodyRowUnderlineThickness = widget_ver0_1.calltableBodyRowUnderlineThickness;
        }
        if( widget_ver0_1.calltableHeaderFgColor ){
            this._calltableHeaderFgColor = widget_ver0_1.calltableHeaderFgColor;
        }
        if( widget_ver0_1.calltableHeaderRowUnderlineColor ){
            this._calltableHeaderRowUnderlineColor = widget_ver0_1.calltableHeaderRowUnderlineColor;
        }
        if( widget_ver0_1.calltableHeaderRowUnderlineThickness ){
            this._calltableHeaderRowUnderlineThickness = widget_ver0_1.calltableHeaderRowUnderlineThickness;
        }
        if( widget_ver0_1.calltableOuterBorderColor ){
            this._calltableOuterBorderColor = widget_ver0_1.calltableOuterBorderColor;
        }
        if( widget_ver0_1.calltableOuterBorderRadius ){
            this._calltableOuterBorderRadius = widget_ver0_1.calltableOuterBorderRadius;
        }
        if( widget_ver0_1.calltableOuterBorderThickness ){
            this._calltableOuterBorderThickness = widget_ver0_1.calltableOuterBorderThickness;
        }

    }

    //!override
    loadFromWidgetSettingsTemplateMain( wst, bIncludeButtonFunction = undefined ){
        if( wst.isWidgetSettingsTemplateFieldExists( WidgetData.WIDGET_FIELD_NAME_BG_COLOR ) === true ) {
            this._calltableBgColor = wst.getWidgetSettingsTemplateFieldValue(WidgetData.WIDGET_FIELD_NAME_BG_COLOR);
        }
        if( wst.isWidgetSettingsTemplateFieldExists( WidgetData.WIDGET_FIELD_NAME_OUTER_BORDER_THICKNESS ) === true ) {
            this._calltableOuterBorderThickness = wst.getWidgetSettingsTemplateFieldValue(WidgetData.WIDGET_FIELD_NAME_OUTER_BORDER_THICKNESS);
        }
        if( wst.isWidgetSettingsTemplateFieldExists( WidgetData.WIDGET_FIELD_NAME_OUTER_BORDER_COLOR ) === true ) {
            this._calltableOuterBorderColor = wst.getWidgetSettingsTemplateFieldValue(WidgetData.WIDGET_FIELD_NAME_OUTER_BORDER_COLOR);
        }
        if( wst.isWidgetSettingsTemplateFieldExists( WidgetData.WIDGET_FIELD_NAME_OUTER_BORDER_RADIUS ) === true ) {
            this._calltableOuterBorderRadius = wst.getWidgetSettingsTemplateFieldValue(WidgetData.WIDGET_FIELD_NAME_OUTER_BORDER_RADIUS);
        }
        if( wst.isWidgetSettingsTemplateFieldExists( WidgetData.WIDGET_FIELD_NAME_HEADER_FG_COLOR ) === true ) {
            this._calltableHeaderFgColor = wst.getWidgetSettingsTemplateFieldValue(WidgetData.WIDGET_FIELD_NAME_HEADER_FG_COLOR);
        }
        if( wst.isWidgetSettingsTemplateFieldExists( WidgetData.WIDGET_FIELD_NAME_HEADER_BG_COLOR ) === true ) {
            this._calltableHeaderBgColor = wst.getWidgetSettingsTemplateFieldValue(WidgetData.WIDGET_FIELD_NAME_HEADER_BG_COLOR);
        }
        if( wst.isWidgetSettingsTemplateFieldExists( WidgetData.WIDGET_FIELD_NAME_HEADER_ROW_UNDERLINE_THICKNESS ) === true ) {
            this._calltableHeaderRowUnderlineThickness = wst.getWidgetSettingsTemplateFieldValue(WidgetData.WIDGET_FIELD_NAME_HEADER_ROW_UNDERLINE_THICKNESS);
        }
        if( wst.isWidgetSettingsTemplateFieldExists( WidgetData.WIDGET_FIELD_NAME_HEADER_ROW_UNDERLINE_COLOR ) === true ) {
            this._calltableHeaderRowUnderlineColor = wst.getWidgetSettingsTemplateFieldValue(WidgetData.WIDGET_FIELD_NAME_HEADER_ROW_UNDERLINE_COLOR);
        }
        if( wst.isWidgetSettingsTemplateFieldExists( WidgetData.WIDGET_FIELD_NAME_BODY_FG_COLOR ) === true ) {
            this._calltableBodyFgColor = wst.getWidgetSettingsTemplateFieldValue(WidgetData.WIDGET_FIELD_NAME_BODY_FG_COLOR);
        }
        if( wst.isWidgetSettingsTemplateFieldExists( WidgetData.WIDGET_FIELD_NAME_BODY_ROW_UNDERLINE_THICKNESS ) === true ) {
            this._calltableBodyRowUnderlineThickness = wst.getWidgetSettingsTemplateFieldValue(WidgetData.WIDGET_FIELD_NAME_BODY_ROW_UNDERLINE_THICKNESS);
        }
        if( wst.isWidgetSettingsTemplateFieldExists( WidgetData.WIDGET_FIELD_NAME_BODY_ROW_UNDERLINE_COLOR) === true ) {
            this._calltableBodyRowUnderlineColor = wst.getWidgetSettingsTemplateFieldValue(WidgetData.WIDGET_FIELD_NAME_BODY_ROW_UNDERLINE_COLOR);
        }
        if( wst.isWidgetSettingsTemplateFieldExists( WidgetData.WIDGET_FIELD_NAME_BODY_ACTIVE_ROW_BG_COLOR) === true ) {
            this._calltableBodyActiveRowBgColor = wst.getWidgetSettingsTemplateFieldValue(WidgetData.WIDGET_FIELD_NAME_BODY_ACTIVE_ROW_BG_COLOR);
        }
        if( wst.isWidgetSettingsTemplateFieldExists( WidgetData.WIDGET_FIELD_NAME_HEADER_FONT_SIZE) === true ) {
            this._calltableHeaderFontSize = wst.getWidgetSettingsTemplateFieldValue(WidgetData.WIDGET_FIELD_NAME_HEADER_FONT_SIZE);
        }
        if( wst.isWidgetSettingsTemplateFieldExists( WidgetData.WIDGET_FIELD_NAME_BODY_FONT_SIZE) === true ) {
            this._calltableBodyFontSize = wst.getWidgetSettingsTemplateFieldValue(WidgetData.WIDGET_FIELD_NAME_BODY_FONT_SIZE);
        }
        if( wst.isWidgetSettingsTemplateFieldExists( WidgetData.WIDGET_FIELD_NAME_ACTIVE_BUTTON_FONT_SIZE) === true ) {
            this._calltableActiveButtonFontSize = wst.getWidgetSettingsTemplateFieldValue(WidgetData.WIDGET_FIELD_NAME_ACTIVE_BUTTON_FONT_SIZE);
        }
        if( wst.isWidgetSettingsTemplateFieldExists( WidgetData.WIDGET_FIELD_NAME_ACTIVE_BUTTON_WIDTH) === true ) {
            this._calltableActiveButtonWidth = wst.getWidgetSettingsTemplateFieldValue(WidgetData.WIDGET_FIELD_NAME_ACTIVE_BUTTON_WIDTH);
        }
        if( wst.isWidgetSettingsTemplateFieldExists( WidgetData.WIDGET_FIELD_NAME_ACTIVE_BUTTON_HEIGHT) === true ) {
            this._calltableActiveButtonHeight = wst.getWidgetSettingsTemplateFieldValue(WidgetData.WIDGET_FIELD_NAME_ACTIVE_BUTTON_HEIGHT);
        }
        if( wst.isWidgetSettingsTemplateFieldExists( WidgetData.WIDGET_FIELD_NAME_BODY_ACTIVE_ROW_FG_COLOR) === true ) {
            this._calltableBodyActiveRowFgColor = wst.getWidgetSettingsTemplateFieldValue(WidgetData.WIDGET_FIELD_NAME_BODY_ACTIVE_ROW_FG_COLOR);
        }
    }

    //!override
    saveToWidgetSettingsTemplateMain( wst ){
        wst.setWidgetSettingsTemplateField( WidgetData.WIDGET_FIELD_NAME_BG_COLOR, this._calltableBgColor );
        wst.setWidgetSettingsTemplateField( WidgetData.WIDGET_FIELD_NAME_OUTER_BORDER_THICKNESS, this._calltableOuterBorderThickness );
        wst.setWidgetSettingsTemplateField( WidgetData.WIDGET_FIELD_NAME_OUTER_BORDER_COLOR, this._calltableOuterBorderColor );
        wst.setWidgetSettingsTemplateField( WidgetData.WIDGET_FIELD_NAME_OUTER_BORDER_RADIUS, this._calltableOuterBorderRadius );
        wst.setWidgetSettingsTemplateField( WidgetData.WIDGET_FIELD_NAME_HEADER_FG_COLOR, this._calltableHeaderFgColor );
        wst.setWidgetSettingsTemplateField( WidgetData.WIDGET_FIELD_NAME_HEADER_BG_COLOR, this._calltableHeaderBgColor );
        wst.setWidgetSettingsTemplateField( WidgetData.WIDGET_FIELD_NAME_HEADER_ROW_UNDERLINE_THICKNESS, this._calltableHeaderRowUnderlineThickness );
        wst.setWidgetSettingsTemplateField( WidgetData.WIDGET_FIELD_NAME_HEADER_ROW_UNDERLINE_COLOR, this._calltableHeaderRowUnderlineColor );
        wst.setWidgetSettingsTemplateField( WidgetData.WIDGET_FIELD_NAME_BODY_FG_COLOR, this._calltableBodyFgColor );
        wst.setWidgetSettingsTemplateField( WidgetData.WIDGET_FIELD_NAME_BODY_ROW_UNDERLINE_THICKNESS, this._calltableBodyRowUnderlineThickness );
        wst.setWidgetSettingsTemplateField( WidgetData.WIDGET_FIELD_NAME_BODY_ROW_UNDERLINE_COLOR, this._calltableBodyRowUnderlineColor );
        wst.setWidgetSettingsTemplateField( WidgetData.WIDGET_FIELD_NAME_BODY_ACTIVE_ROW_BG_COLOR, this._calltableBodyActiveRowBgColor );
        wst.setWidgetSettingsTemplateField( WidgetData.WIDGET_FIELD_NAME_HEADER_FONT_SIZE, this._calltableHeaderFontSize );
        wst.setWidgetSettingsTemplateField( WidgetData.WIDGET_FIELD_NAME_BODY_FONT_SIZE, this._calltableBodyFontSize );
        wst.setWidgetSettingsTemplateField( WidgetData.WIDGET_FIELD_NAME_ACTIVE_BUTTON_FONT_SIZE, this._calltableActiveButtonFontSize );
        wst.setWidgetSettingsTemplateField( WidgetData.WIDGET_FIELD_NAME_ACTIVE_BUTTON_WIDTH, this._calltableActiveButtonWidth );
        wst.setWidgetSettingsTemplateField( WidgetData.WIDGET_FIELD_NAME_ACTIVE_BUTTON_HEIGHT, this._calltableActiveButtonHeight );
        wst.setWidgetSettingsTemplateField( WidgetData.WIDGET_FIELD_NAME_BODY_ACTIVE_ROW_FG_COLOR, this._calltableBodyActiveRowFgColor );
    }
}