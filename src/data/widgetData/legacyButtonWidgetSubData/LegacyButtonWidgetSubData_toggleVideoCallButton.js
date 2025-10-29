import LegacyButtonWidgetSubData from "./LegacyButtonWidgetSubData";
import WidgetData from "../WidgetData";

export default class LegacyButtonWidgetSubData_toggleVideoCallButton extends LegacyButtonWidgetSubData {

    constructor( dataOptions = null, subDataOptions, dataVersion = null  ) {
        super( dataOptions, subDataOptions, dataVersion  );

        let currentOptions;
        const oSubData = subDataOptions["legacyButtonWidgetSubDataObject"];
        if( dataVersion === "2.0.0"){ //Not present in data version < 2.1.5
            currentOptions = subDataOptions;
        }
        else if( oSubData  ){
            currentOptions = oSubData["legacyButtonWidgetSubTypeId"];
        }
        else {
            currentOptions = subDataOptions;
        }

        this._videoOnIcon = currentOptions["videoOnIcon"];
        this._videoOnIconTitle = currentOptions["videoOnIconTitle"];
        this._videoOnIconWidth = currentOptions["videoOnIconWidth"];
        this._videoOnIconHeight = currentOptions["videoOnIconHeight"];
        this._videoOnFontSize = currentOptions["videoOnFontSize"];
        this._videoOnFgColor = currentOptions["videoOnFgColor"];
        this._videoOnBgColor = currentOptions["videoOnBgColor"];
        this._videoOnOuterBorderColor = currentOptions["videoOnOuterBorderColor"];
        this._videoOnOuterBorderRadius = currentOptions["videoOnOuterBorderRadius"];
        this._videoOnOuterBorderThickness = currentOptions["videoOnOuterBorderThickness"];
        this._videoOnLabel = currentOptions["videoOnLabel"];
		
        this._videoOffIcon = currentOptions["videoOffIcon"];
        this._videoOffIconTitle = currentOptions["videoOffIconTitle"];
        this._videoOffIconWidth = currentOptions["videoOffIconWidth"];
        this._videoOffIconHeight = currentOptions["videoOffIconHeight"];
        this._videoOffFontSize = currentOptions["videoOffFontSize"];
        this._videoOffFgColor = currentOptions["videoOffFgColor"];
        this._videoOffBgColor = currentOptions["videoOffBgColor"];
        this._videoOffOuterBorderColor = currentOptions["videoOffOuterBorderColor"];
        this._videoOffOuterBorderRadius = currentOptions["videoOffOuterBorderRadius"];
        this._videoOffOuterBorderThickness = currentOptions["videoOffOuterBorderThickness"];
        this._videoOffLabel = currentOptions["videoOffLabel"];
    }

    //!override
    _setWidgetSubDataToObjectMain( o ){
        if( this._videoOnIcon ){
            o["videoOnIcon"] = this._videoOnIcon;
        }
        else{
            delete o["videoOnIcon"];
        }

        if( this._videoOnIconTitle ){
            o["videoOnIconTitle"] = this._videoOnIconTitle;
        }
        else{
            delete o["videoOnIconTitle"];
        }

        if( this._videoOnIconWidth ){
            o["videoOnIconWidth"] = this._videoOnIconWidth;
        }
        else{
            delete o["videoOnIconWidth"];
        }

        if( this._videoOnIconHeight ){
            o["videoOnIconHeight"] = this._videoOnIconHeight;
        }
        else{
            delete o["videoOnIconHeight"];
        }

        if( this._videoOnFontSize ){
            o["videoOnFontSize"] = this._videoOnFontSize;
        }
        else{
            delete o["videoOnFontSize"];
        }

        if( this._videoOnFgColor ){
            o["videoOnFgColor"] = this._videoOnFgColor;
        }
        else{
            delete o["videoOnFgColor"];
        }

        if( this._videoOnBgColor ){
            o["videoOnBgColor"] = this._videoOnBgColor;
        }
        else{
            delete o["videoOnBgColor"];
        }

        if( this._videoOnOuterBorderColor ){
            o["videoOnOuterBorderColor"] = this._videoOnOuterBorderColor;
        }
        else{
            delete o["videoOnOuterBorderColor"];
        }

        if( this._videoOnOuterBorderRadius ){
            o["videoOnOuterBorderRadius"] = this._videoOnOuterBorderRadius;
        }
        else{
            delete o["videoOnOuterBorderRadius"];
        }

        if( this._videoOnOuterBorderThickness ){
            o["videoOnOuterBorderThickness"] = this._videoOnOuterBorderThickness;
        }
        else{
            delete o["videoOnOuterBorderThickness"];
        }

        if( this._videoOnLabel ){
            o["videoOnLabel"] = this._videoOnLabel;
        }
        else{
            delete o["videoOnLabel"];
        }


        if( this._videoOffIcon ){
            o["videoOffIcon"] = this._videoOffIcon;
        }
        else{
            delete o["videoOffIcon"];
        }

        if( this._videoOffIconTitle ){
            o["videoOffIconTitle"] = this._videoOffIconTitle;
        }
        else{
            delete o["videoOffIconTitle"];
        }

        if( this._videoOffIconWidth ){
            o["videoOffIconWidth"] = this._videoOffIconWidth;
        }
        else{
            delete o["videoOffIconWidth"];
        }

        if( this._videoOffIconHeight ){
            o["videoOffIconHeight"] = this._videoOffIconHeight;
        }
        else{
            delete o["videoOffIconHeight"];
        }

        if( this._videoOffFontSize ){
            o["videoOffFontSize"] = this._videoOffFontSize;
        }
        else{
            delete o["videoOffFontSize"];
        }

        if( this._videoOffFgColor ){
            o["videoOffFgColor"] = this._videoOffFgColor;
        }
        else{
            delete o["videoOffFgColor"];
        }

        if( this._videoOffBgColor ){
            o["videoOffBgColor"] = this._videoOffBgColor;
        }
        else{
            delete o["videoOffBgColor"];
        }

        if( this._videoOffOuterBorderColor ){
            o["videoOffOuterBorderColor"] = this._videoOffOuterBorderColor;
        }
        else{
            delete o["videoOffOuterBorderColor"];
        }

        if( this._videoOffOuterBorderRadius ){
            o["videoOffOuterBorderRadius"] = this._videoOffOuterBorderRadius;
        }
        else{
            delete o["videoOffOuterBorderRadius"];
        }

        if( this._videoOffOuterBorderThickness ){
            o["videoOffOuterBorderThickness"] = this._videoOffOuterBorderThickness;
        }
        else{
            delete o["videoOffOuterBorderThickness"];
        }

        if( this._videoOffLabel ){
            o["videoOffLabel"] = this._videoOffLabel;
        }
        else{
            delete o["videoOffLabel"];
        }
    }

    setVideoOnIcon( icon ){
        this._videoOnIcon = icon;
    }

    getVideoOnIcon(){
        return this._videoOnIcon;
    }

    setVideoOnIconTitle( iconTitle ){
        this._videoOnIconTitle = iconTitle;
    }

    getVideoOnIconTitle(){
        return this._videoOnIconTitle;
    }

    getVideoOnIconWidth(){
        return this._videoOnIconWidth;
    }

    setVideoOnIconWidth( n ){
        this._videoOnIconWidth = n;
    }

    getVideoOnIconHeight(){
        return this._videoOnIconHeight;
    }

    setVideoOnIconHeight( n ){
        this._videoOnIconHeight = n;
    }

    setVideoOnFontSize( fontSize ){
        this._videoOnFontSize = fontSize;
    }

    getVideoOnFontSize(){
        return this._videoOnFontSize;
    }

    getVideoOnFgColor(){
        return this._videoOnFgColor;
    }

    setVideoOnFgColor( color ){
        this._videoOnFgColor = color;
    }

    getVideoOnBgColor(){
        return this._videoOnBgColor;
    }

    setVideoOnBgColor( color ){
        this._videoOnBgColor = color;
    }

    getVideoOnOuterBorderColor(){
        return this._videoOnOuterBorderColor;
    }

    setVideoOnOuterBorderColor( col ){
        this._videoOnOuterBorderColor = col;
    }

    getVideoOnOuterBorderRadius(){
        return this._videoOnOuterBorderRadius;
    }

    setVideoOnOuterBorderRadius( n ){
        this._videoOnOuterBorderRadius = n;
    }

    getVideoOnOuterBorderThickness(){
        return this._videoOnOuterBorderThickness;
    }

    setVideoOnOuterBorderThickness( n ){
        this._videoOnOuterBorderThickness = n;
    }

    getVideoOnLabel(){
        return this._videoOnLabel;
    }

    setVideoOnLabel( label ){
        this._videoOnLabel = label;
    }

    setVideoOffIcon( icon ){
        this._videoOffIcon = icon;
    }

    getVideoOffIcon(){
        return this._videoOffIcon;
    }

    setVideoOffIconTitle( iconTitle ){
        this._videoOffIconTitle = iconTitle;
    }

    getVideoOffIconTitle(){
        return this._videoOffIconTitle;
    }

    getVideoOffIconWidth(){
        return this._videoOffIconWidth;
    }

    setVideoOffIconWidth( n ){
        this._videoOffIconWidth = n;
    }

    getVideoOffIconHeight(){
        return this._videoOffIconHeight;
    }

    setVideoOffIconHeight( n ){
        this._videoOffIconHeight = n;
    }

    setVideoOffFontSize( fontSize ){
        this._videoOffFontSize = fontSize;
    }

    getVideoOffFontSize(){
        return this._videoOffFontSize;
    }

    getVideoOffFgColor(){
        return this._videoOffFgColor;
    }

    setVideoOffFgColor( color ){
        this._videoOffFgColor = color;
    }

    getVideoOffBgColor(){
        return this._videoOffBgColor;
    }

    setVideoOffBgColor( color ){
        this._videoOffBgColor = color;
    }

    getVideoOffOuterBorderColor(){
        return this._videoOffOuterBorderColor;
    }

    setVideoOffOuterBorderColor( col ){
        this._videoOffOuterBorderColor = col;
    }

    getVideoOffOuterBorderRadius(){
        return this._videoOffOuterBorderRadius;
    }

    setVideoOffOuterBorderRadius( n ){
        this._videoOffOuterBorderRadius = n;
    }

    getVideoOffOuterBorderThickness(){
        return this._videoOffOuterBorderThickness;
    }

    setVideoOffOuterBorderThickness( n ){
        this._videoOffOuterBorderThickness = n;
    }

    setVideoOffLabel( label ){
        this._videoOffLabel = label;
    }

    getVideoOffLabel(){
        return this._videoOffLabel;
    }

    //!override
    importLegacyButtonWidgetSubDataFromWidget_ver0_1( widget_ver0_1 ){
    }

    //!override
    _exportLegacyButtonWidgetSubDataToWidgetSettingsTemplateMain( wst ){
        wst.setWidgetSettingsTemplateField( WidgetData.WIDGET_FIELD_NAME_TOGGLE_VIDEO_CALL_BUTTON__VIDEO_ON_LABEL, this._videoOnLabel );
        wst.setWidgetSettingsTemplateField( WidgetData.WIDGET_FIELD_NAME_TOGGLE_VIDEO_CALL_BUTTON__VIDEO_ON_ICON, this._videoOnIcon );
        wst.setWidgetSettingsTemplateField( WidgetData.WIDGET_FIELD_NAME_TOGGLE_VIDEO_CALL_BUTTON__VIDEO_ON_ICON_TITLE, this._videoOnIconTitle );
        wst.setWidgetSettingsTemplateField( WidgetData.WIDGET_FIELD_NAME_TOGGLE_VIDEO_CALL_BUTTON__VIDEO_ON_ICON_WIDTH, this._videoOnIconWidth );
        wst.setWidgetSettingsTemplateField( WidgetData.WIDGET_FIELD_NAME_TOGGLE_VIDEO_CALL_BUTTON__VIDEO_ON_ICON_HEIGHT, this._videoOnIconHeight );
        wst.setWidgetSettingsTemplateField( WidgetData.WIDGET_FIELD_NAME_TOGGLE_VIDEO_CALL_BUTTON__VIDEO_ON_FONT_SIZE, this._videoOnFontSize );
        wst.setWidgetSettingsTemplateField( WidgetData.WIDGET_FIELD_NAME_TOGGLE_VIDEO_CALL_BUTTON__VIDEO_ON_FG_COLOR, this._videoOnFgColor );
        wst.setWidgetSettingsTemplateField( WidgetData.WIDGET_FIELD_NAME_TOGGLE_VIDEO_CALL_BUTTON__VIDEO_ON_BG_COLOR, this._videoOnBgColor );
        wst.setWidgetSettingsTemplateField( WidgetData.WIDGET_FIELD_NAME_TOGGLE_VIDEO_CALL_BUTTON__VIDEO_ON_OUTER_BORDER_COLOR, this._videoOnOuterBorderColor );
        wst.setWidgetSettingsTemplateField( WidgetData.WIDGET_FIELD_NAME_TOGGLE_VIDEO_CALL_BUTTON__VIDEO_ON_OUTER_BORDER_RADIUS, this._videoOnOuterBorderRadius );
        wst.setWidgetSettingsTemplateField( WidgetData.WIDGET_FIELD_NAME_TOGGLE_VIDEO_CALL_BUTTON__VIDEO_ON_OUTER_BORDER_THICKNESS, this._videoOnOuterBorderThickness );

        wst.setWidgetSettingsTemplateField( WidgetData.WIDGET_FIELD_NAME_TOGGLE_VIDEO_CALL_BUTTON__VIDEO_OFF_LABEL, this._videoOffLabel );
        wst.setWidgetSettingsTemplateField( WidgetData.WIDGET_FIELD_NAME_TOGGLE_VIDEO_CALL_BUTTON__VIDEO_OFF_ICON, this._videoOffIcon );
        wst.setWidgetSettingsTemplateField( WidgetData.WIDGET_FIELD_NAME_TOGGLE_VIDEO_CALL_BUTTON__VIDEO_OFF_ICON_TITLE, this._videoOffIconTitle );
        wst.setWidgetSettingsTemplateField( WidgetData.WIDGET_FIELD_NAME_TOGGLE_VIDEO_CALL_BUTTON__VIDEO_OFF_ICON_WIDTH, this._videoOffIconWidth );
        wst.setWidgetSettingsTemplateField( WidgetData.WIDGET_FIELD_NAME_TOGGLE_VIDEO_CALL_BUTTON__VIDEO_OFF_ICON_HEIGHT, this._videoOffIconHeight );
        wst.setWidgetSettingsTemplateField( WidgetData.WIDGET_FIELD_NAME_TOGGLE_VIDEO_CALL_BUTTON__VIDEO_OFF_FONT_SIZE, this._videoOffFontSize );
        wst.setWidgetSettingsTemplateField( WidgetData.WIDGET_FIELD_NAME_TOGGLE_VIDEO_CALL_BUTTON__VIDEO_OFF_FG_COLOR, this._videoOffFgColor );
        wst.setWidgetSettingsTemplateField( WidgetData.WIDGET_FIELD_NAME_TOGGLE_VIDEO_CALL_BUTTON__VIDEO_OFF_BG_COLOR, this._videoOffBgColor );
        wst.setWidgetSettingsTemplateField( WidgetData.WIDGET_FIELD_NAME_TOGGLE_VIDEO_CALL_BUTTON__VIDEO_OFF_OUTER_BORDER_COLOR, this._videoOffOuterBorderColor );
        wst.setWidgetSettingsTemplateField( WidgetData.WIDGET_FIELD_NAME_TOGGLE_VIDEO_CALL_BUTTON__VIDEO_OFF_OUTER_BORDER_RADIUS, this._videoOffOuterBorderRadius );
        wst.setWidgetSettingsTemplateField( WidgetData.WIDGET_FIELD_NAME_TOGGLE_VIDEO_CALL_BUTTON__VIDEO_OFF_OUTER_BORDER_THICKNESS, this._videoOffOuterBorderThickness );
    }

    //!override
    _importLegacyButtonWidgetSubDataFromWidgetSettingsTemplateMain( wst ){
        if( wst.isWidgetSettingsTemplateFieldExists( WidgetData.WIDGET_FIELD_NAME_TOGGLE_VIDEO_CALL_BUTTON__VIDEO_ON_LABEL ) === true ) {
            this._videoOnLabel = wst.getWidgetSettingsTemplateFieldValue(WidgetData.WIDGET_FIELD_NAME_TOGGLE_VIDEO_CALL_BUTTON__VIDEO_ON_LABEL);
        }
        if( wst.isWidgetSettingsTemplateFieldExists( WidgetData.WIDGET_FIELD_NAME_TOGGLE_VIDEO_CALL_BUTTON__VIDEO_ON_ICON ) === true ) {
            this._videoOnIcon = wst.getWidgetSettingsTemplateFieldValue(WidgetData.WIDGET_FIELD_NAME_TOGGLE_VIDEO_CALL_BUTTON__VIDEO_ON_ICON);
        }
        if( wst.isWidgetSettingsTemplateFieldExists( WidgetData.WIDGET_FIELD_NAME_TOGGLE_VIDEO_CALL_BUTTON__VIDEO_ON_ICON_TITLE ) === true ) {
            this._videoOnIconTitle = wst.getWidgetSettingsTemplateFieldValue(WidgetData.WIDGET_FIELD_NAME_TOGGLE_VIDEO_CALL_BUTTON__VIDEO_ON_ICON_TITLE);
        }
        if( wst.isWidgetSettingsTemplateFieldExists( WidgetData.WIDGET_FIELD_NAME_TOGGLE_VIDEO_CALL_BUTTON__VIDEO_ON_ICON_WIDTH ) === true ) {
            this._videoOnIconWidth = wst.getWidgetSettingsTemplateFieldValue(WidgetData.WIDGET_FIELD_NAME_TOGGLE_VIDEO_CALL_BUTTON__VIDEO_ON_ICON_WIDTH);
        }
        if( wst.isWidgetSettingsTemplateFieldExists( WidgetData.WIDGET_FIELD_NAME_TOGGLE_VIDEO_CALL_BUTTON__VIDEO_ON_ICON_HEIGHT ) === true ) {
            this._videoOnIconHeight = wst.getWidgetSettingsTemplateFieldValue(WidgetData.WIDGET_FIELD_NAME_TOGGLE_VIDEO_CALL_BUTTON__VIDEO_ON_ICON_HEIGHT);
        }
        if( wst.isWidgetSettingsTemplateFieldExists( WidgetData.WIDGET_FIELD_NAME_TOGGLE_VIDEO_CALL_BUTTON__VIDEO_ON_FONT_SIZE ) === true ) {
            this._videoOnFontSize = wst.getWidgetSettingsTemplateFieldValue(WidgetData.WIDGET_FIELD_NAME_TOGGLE_VIDEO_CALL_BUTTON__VIDEO_ON_FONT_SIZE);
        }
        if( wst.isWidgetSettingsTemplateFieldExists( WidgetData.WIDGET_FIELD_NAME_TOGGLE_VIDEO_CALL_BUTTON__VIDEO_ON_FG_COLOR ) === true ) {
            this._videoOnFgColor = wst.getWidgetSettingsTemplateFieldValue(WidgetData.WIDGET_FIELD_NAME_TOGGLE_VIDEO_CALL_BUTTON__VIDEO_ON_FG_COLOR);
        }
        if( wst.isWidgetSettingsTemplateFieldExists( WidgetData.WIDGET_FIELD_NAME_TOGGLE_VIDEO_CALL_BUTTON__VIDEO_ON_BG_COLOR ) === true ) {
            this._videoOnBgColor = wst.getWidgetSettingsTemplateFieldValue(WidgetData.WIDGET_FIELD_NAME_TOGGLE_VIDEO_CALL_BUTTON__VIDEO_ON_BG_COLOR);
        }
        if( wst.isWidgetSettingsTemplateFieldExists( WidgetData.WIDGET_FIELD_NAME_TOGGLE_VIDEO_CALL_BUTTON__VIDEO_ON_OUTER_BORDER_COLOR ) === true ) {
            this._videoOnOuterBorderColor = wst.getWidgetSettingsTemplateFieldValue(WidgetData.WIDGET_FIELD_NAME_TOGGLE_VIDEO_CALL_BUTTON__VIDEO_ON_OUTER_BORDER_COLOR);
        }
        if( wst.isWidgetSettingsTemplateFieldExists( WidgetData.WIDGET_FIELD_NAME_TOGGLE_VIDEO_CALL_BUTTON__VIDEO_ON_OUTER_BORDER_RADIUS ) === true ) {
            this._videoOnOuterBorderRadius = wst.getWidgetSettingsTemplateFieldValue(WidgetData.WIDGET_FIELD_NAME_TOGGLE_VIDEO_CALL_BUTTON__VIDEO_ON_OUTER_BORDER_RADIUS);
        }
        if( wst.isWidgetSettingsTemplateFieldExists( WidgetData.WIDGET_FIELD_NAME_TOGGLE_VIDEO_CALL_BUTTON__VIDEO_ON_OUTER_BORDER_THICKNESS ) === true ) {
            this._videoOnOuterBorderThickness = wst.getWidgetSettingsTemplateFieldValue(WidgetData.WIDGET_FIELD_NAME_TOGGLE_VIDEO_CALL_BUTTON__VIDEO_ON_OUTER_BORDER_THICKNESS);
        }

        if( wst.isWidgetSettingsTemplateFieldExists( WidgetData.WIDGET_FIELD_NAME_TOGGLE_VIDEO_CALL_BUTTON__VIDEO_OFF_LABEL ) === true ) {
            this._videoOffLabel = wst.getWidgetSettingsTemplateFieldValue(WidgetData.WIDGET_FIELD_NAME_TOGGLE_VIDEO_CALL_BUTTON__VIDEO_OFF_LABEL);
        }
        if( wst.isWidgetSettingsTemplateFieldExists( WidgetData.WIDGET_FIELD_NAME_TOGGLE_VIDEO_CALL_BUTTON__VIDEO_OFF_ICON ) === true ) {
            this._videoOffIcon = wst.getWidgetSettingsTemplateFieldValue(WidgetData.WIDGET_FIELD_NAME_TOGGLE_VIDEO_CALL_BUTTON__VIDEO_OFF_ICON);
        }
        if( wst.isWidgetSettingsTemplateFieldExists( WidgetData.WIDGET_FIELD_NAME_TOGGLE_VIDEO_CALL_BUTTON__VIDEO_OFF_ICON_TITLE ) === true ) {
            this._videoOffIconTitle = wst.getWidgetSettingsTemplateFieldValue(WidgetData.WIDGET_FIELD_NAME_TOGGLE_VIDEO_CALL_BUTTON__VIDEO_OFF_ICON_TITLE);
        }
        if( wst.isWidgetSettingsTemplateFieldExists( WidgetData.WIDGET_FIELD_NAME_TOGGLE_VIDEO_CALL_BUTTON__VIDEO_OFF_ICON_WIDTH ) === true ) {
            this._videoOffIconWidth = wst.getWidgetSettingsTemplateFieldValue(WidgetData.WIDGET_FIELD_NAME_TOGGLE_VIDEO_CALL_BUTTON__VIDEO_OFF_ICON_WIDTH);
        }
        if( wst.isWidgetSettingsTemplateFieldExists( WidgetData.WIDGET_FIELD_NAME_TOGGLE_VIDEO_CALL_BUTTON__VIDEO_OFF_ICON_HEIGHT ) === true ) {
            this._videoOffIconHeight = wst.getWidgetSettingsTemplateFieldValue(WidgetData.WIDGET_FIELD_NAME_TOGGLE_VIDEO_CALL_BUTTON__VIDEO_OFF_ICON_HEIGHT);
        }
        if( wst.isWidgetSettingsTemplateFieldExists( WidgetData.WIDGET_FIELD_NAME_TOGGLE_VIDEO_CALL_BUTTON__VIDEO_OFF_FONT_SIZE ) === true ) {
            this._videoOffFontSize = wst.getWidgetSettingsTemplateFieldValue(WidgetData.WIDGET_FIELD_NAME_TOGGLE_VIDEO_CALL_BUTTON__VIDEO_OFF_FONT_SIZE);
        }
        if( wst.isWidgetSettingsTemplateFieldExists( WidgetData.WIDGET_FIELD_NAME_TOGGLE_VIDEO_CALL_BUTTON__VIDEO_OFF_FG_COLOR ) === true ) {
            this._videoOffFgColor = wst.getWidgetSettingsTemplateFieldValue(WidgetData.WIDGET_FIELD_NAME_TOGGLE_VIDEO_CALL_BUTTON__VIDEO_OFF_FG_COLOR);
        }
        if( wst.isWidgetSettingsTemplateFieldExists( WidgetData.WIDGET_FIELD_NAME_TOGGLE_VIDEO_CALL_BUTTON__VIDEO_OFF_BG_COLOR ) === true ) {
            this._videoOffBgColor = wst.getWidgetSettingsTemplateFieldValue(WidgetData.WIDGET_FIELD_NAME_TOGGLE_VIDEO_CALL_BUTTON__VIDEO_OFF_BG_COLOR);
        }
        if( wst.isWidgetSettingsTemplateFieldExists( WidgetData.WIDGET_FIELD_NAME_TOGGLE_VIDEO_CALL_BUTTON__VIDEO_OFF_OUTER_BORDER_COLOR ) === true ) {
            this._videoOffOuterBorderColor = wst.getWidgetSettingsTemplateFieldValue(WidgetData.WIDGET_FIELD_NAME_TOGGLE_VIDEO_CALL_BUTTON__VIDEO_OFF_OUTER_BORDER_COLOR);
        }
        if( wst.isWidgetSettingsTemplateFieldExists( WidgetData.WIDGET_FIELD_NAME_TOGGLE_VIDEO_CALL_BUTTON__VIDEO_OFF_OUTER_BORDER_RADIUS ) === true ) {
            this._videoOffOuterBorderRadius = wst.getWidgetSettingsTemplateFieldValue(WidgetData.WIDGET_FIELD_NAME_TOGGLE_VIDEO_CALL_BUTTON__VIDEO_OFF_OUTER_BORDER_RADIUS);
        }
        if( wst.isWidgetSettingsTemplateFieldExists( WidgetData.WIDGET_FIELD_NAME_TOGGLE_VIDEO_CALL_BUTTON__VIDEO_OFF_OUTER_BORDER_THICKNESS ) === true ) {
            this._videoOffOuterBorderThickness = wst.getWidgetSettingsTemplateFieldValue(WidgetData.WIDGET_FIELD_NAME_TOGGLE_VIDEO_CALL_BUTTON__VIDEO_OFF_OUTER_BORDER_THICKNESS);
        }
    }
}