import LegacyButtonWidgetSubData from "./LegacyButtonWidgetSubData";
import WidgetData from "../WidgetData";

export default class LegacyButtonWidgetSubData_toggleHoldCallButton extends LegacyButtonWidgetSubData {

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

        this._holdIcon = currentOptions["holdIcon"];
        this._holdIconName = currentOptions["holdIconName"];
        this._holdIconWidth = currentOptions["holdIconWidth"];
        this._holdIconHeight = currentOptions["holdIconHeight"];
        this._holdFontSize = currentOptions["holdFontSize"];
        this._holdFgColor = currentOptions["holdFgColor"];
        this._holdBgColor = currentOptions["holdBgColor"];
        this._holdOuterBorderColor = currentOptions["holdOuterBorderColor"];
        this._holdOuterBorderRadius = currentOptions["holdOuterBorderRadius"];
        this._holdOuterBorderThickness = currentOptions["holdOuterBorderThickness"];
        this._holdLabel = currentOptions["holdLabel"];
        this._unholdIcon = currentOptions["unholdIcon"];
        this._unholdIconName = currentOptions["unholdIconName"];
        this._unholdIconWidth = currentOptions["unholdIconWidth"];
        this._unholdIconHeight = currentOptions["unholdIconHeight"];
        this._unholdFontSize = currentOptions["unholdFontSize"];
        this._unholdFgColor = currentOptions["unholdFgColor"];
        this._unholdBgColor = currentOptions["unholdBgColor"];
        this._unholdOuterBorderColor = currentOptions["unholdOuterBorderColor"];
        this._unholdOuterBorderRadius = currentOptions["unholdOuterBorderRadius"];
        this._unholdOuterBorderThickness = currentOptions["unholdOuterBorderThickness"];
        this._unholdLabel = currentOptions["unholdLabel"];
    }

    //!override
    _setWidgetSubDataToObjectMain( o ){
        if( this._holdIcon ){
            o["holdIcon"] = this._holdIcon;
        }
        else{
            delete o["holdIcon"];
        }

        if( this._holdIconName ){
            o["holdIconName"] = this._holdIconName;
        }
        else{
            delete o["holdIconName"];
        }

        if( this._holdIconWidth ){
            o["holdIconWidth"] = this._holdIconWidth;
        }
        else{
            delete o["holdIconWidth"];
        }

        if( this._holdIconHeight ){
            o["holdIconHeight"] = this._holdIconHeight;
        }
        else{
            delete o["holdIconHeight"];
        }

        if( this._holdFontSize ){
            o["holdFontSize"] = this._holdFontSize;
        }
        else{
            delete o["holdFontSize"];
        }

        if( this._holdFgColor ){
            o["holdFgColor"] = this._holdFgColor;
        }
        else{
            delete o["holdFgColor"];
        }

        if( this._holdBgColor ){
            o["holdBgColor"] = this._holdBgColor;
        }
        else{
            delete o["holdBgColor"];
        }

        if( this._holdOuterBorderColor ){
            o["holdOuterBorderColor"] = this._holdOuterBorderColor;
        }
        else{
            delete o["holdOuterBorderColor"];
        }

        if( this._holdOuterBorderRadius ){
            o["holdOuterBorderRadius"] = this._holdOuterBorderRadius;
        }
        else{
            delete o["holdOuterBorderRadius"];
        }

        if( this._holdOuterBorderThickness ){
            o["holdOuterBorderThickness"] = this._holdOuterBorderThickness;
        }
        else{
            delete o["holdOuterBorderThickness"];
        }

        if( this._holdLabel ){
            o["holdLabel"] = this._holdLabel;
        }
        else{
            delete o["holdLabel"];
        }

        if( this._unholdIcon ){
            o["unholdIcon"] = this._unholdIcon;
        }
        else{
            delete o["unholdIcon"];
        }

        if( this._unholdIconName ){
            o["unholdIconName"] = this._unholdIconName;
        }
        else{
            delete o["unholdIconName"];
        }

        if( this._unholdIconWidth ){
            o["unholdIconWidth"] = this._unholdIconWidth;
        }
        else{
            delete o["unholdIconWidth"];
        }

        if( this._unholdIconHeight ){
            o["unholdIconHeight"] = this._unholdIconHeight;
        }
        else{
            delete o["unholdIconHeight"];
        }

        if( this._unholdFontSize ){
            o["unholdFontSize"] = this._unholdFontSize;
        }
        else{
            delete o["unholdFontSize"];
        }

        if( this._unholdFgColor ){
            o["unholdFgColor"] = this._unholdFgColor;
        }
        else{
            delete o["unholdFgColor"];
        }

        if( this._unholdBgColor ){
            o["unholdBgColor"] = this._unholdBgColor;
        }
        else{
            delete o["unholdBgColor"];
        }

        if( this._unholdOuterBorderColor ){
            o["unholdOuterBorderColor"] = this._unholdOuterBorderColor;
        }
        else{
            delete o["unholdOuterBorderColor"];
        }

        if( this._unholdOuterBorderRadius ){
            o["unholdOuterBorderRadius"] = this._unholdOuterBorderRadius;
        }
        else{
            delete o["unholdOuterBorderRadius"];
        }

        if( this._unholdOuterBorderThickness ){
            o["unholdOuterBorderThickness"] = this._unholdOuterBorderThickness;
        }
        else{
            delete o["unholdOuterBorderThickness"];
        }

        if( this._unholdLabel ){
            o["unholdLabel"] = this._unholdLabel;
        }
        else{
            delete o["unholdLabel"];
        }
    }

    setHoldIcon( icon ){
        this._holdIcon = icon;
    }

    getHoldIcon(){
        return this._holdIcon;
    }

    setHoldIconName( iconName ){
        this._holdIconName = iconName;
    }

    getHoldIconName(){
        return this._holdIconName;
    }

    getHoldIconWidth(){
        return this._holdIconWidth;
    }

    setHoldIconWidth( n ){
        this._holdIconWidth = n;
    }

    getHoldIconHeight(){
        return this._holdIconHeight;
    }

    setHoldIconHeight( n ){
        this._holdIconHeight = n;
    }

    setHoldFontSize( fontSize ){
        this._holdFontSize = fontSize;
    }

    getHoldFontSize(){
        return this._holdFontSize;
    }

    getHoldFgColor(){
        return this._holdFgColor;
    }

    setHoldFgColor( color ){
        this._holdFgColor = color;
    }

    getHoldBgColor(){
        return this._holdBgColor;
    }

    setHoldBgColor( color ){
        this._holdBgColor = color;
    }

    getHoldOuterBorderColor(){
        return this._holdOuterBorderColor;
    }

    setHoldOuterBorderColor( col ){
        this._holdOuterBorderColor = col;
    }

    getHoldOuterBorderRadius(){
        return this._holdOuterBorderRadius;
    }

    setHoldOuterBorderRadius( n ){
        this._holdOuterBorderRadius = n;
    }

    getHoldOuterBorderThickness(){
        return this._holdOuterBorderThickness;
    }

    setHoldOuterBorderThickness( n ){
        this._holdOuterBorderThickness = n;
    }

    getHoldLabel(){
        return this._holdLabel;
    }

    setHoldLabel( label ){
        this._holdLabel = label;
    }

    setUnholdIcon( icon ){
        this._unholdIcon = icon;
    }

    getUnholdIcon(){
        return this._unholdIcon;
    }

    setUnholdIconName( iconName ){
        this._unholdIconName = iconName;
    }

    getUnholdIconName(){
        return this._unholdIconName;
    }

    getUnholdIconWidth(){
        return this._unholdIconWidth;
    }

    setUnholdIconWidth( n ){
        this._unholdIconWidth = n;
    }

    getUnholdIconHeight(){
        return this._unholdIconHeight;
    }

    setUnholdIconHeight( n ){
        this._unholdIconHeight = n;
    }

    setUnholdFontSize( fontSize ){
        this._unholdFontSize = fontSize;
    }

    getUnholdFontSize(){
        return this._unholdFontSize;
    }

    getUnholdFgColor(){
        return this._unholdFgColor;
    }

    setUnholdFgColor( color ){
        this._unholdFgColor = color;
    }

    getUnholdBgColor(){
        return this._unholdBgColor;
    }

    setUnholdBgColor( color ){
        this._unholdBgColor = color;
    }

    getUnholdOuterBorderColor(){
        return this._unholdOuterBorderColor;
    }

    setUnholdOuterBorderColor( col ){
        this._unholdOuterBorderColor = col;
    }

    getUnholdOuterBorderRadius(){
        return this._unholdOuterBorderRadius;
    }

    setUnholdOuterBorderRadius( n ){
        this._unholdOuterBorderRadius = n;
    }

    getUnholdOuterBorderThickness(){
        return this._unholdOuterBorderThickness;
    }

    setUnholdOuterBorderThickness( n ){
        this._unholdOuterBorderThickness = n;
    }

    setUnholdLabel( label ){
        this._unholdLabel = label;
    }

    getUnholdLabel(){
        return this._unholdLabel;
    }

    //!override
    importLegacyButtonWidgetSubDataFromWidget_ver0_1( widget_ver0_1 ){
    }

    //!override
    _exportLegacyButtonWidgetSubDataToWidgetSettingsTemplateMain( wst ){
        wst.setWidgetSettingsTemplateField( WidgetData.WIDGET_FIELD_NAME_TOGGLE_HOLD_BUTTON__HOLD_LABEL, this._holdLabel );
        wst.setWidgetSettingsTemplateField( WidgetData.WIDGET_FIELD_NAME_TOGGLE_HOLD_BUTTON__HOLD_ICON, this._holdIcon );
        wst.setWidgetSettingsTemplateField( WidgetData.WIDGET_FIELD_NAME_TOGGLE_HOLD_BUTTON__HOLD_ICON_NAME, this._holdIconName );
        wst.setWidgetSettingsTemplateField( WidgetData.WIDGET_FIELD_NAME_TOGGLE_HOLD_BUTTON__HOLD_ICON_WIDTH, this._holdIconWidth );
        wst.setWidgetSettingsTemplateField( WidgetData.WIDGET_FIELD_NAME_TOGGLE_HOLD_BUTTON__HOLD_ICON_HEIGHT, this._holdIconHeight );
        wst.setWidgetSettingsTemplateField( WidgetData.WIDGET_FIELD_NAME_TOGGLE_HOLD_BUTTON__HOLD_FONT_SIZE, this._holdFontSize );
        wst.setWidgetSettingsTemplateField( WidgetData.WIDGET_FIELD_NAME_TOGGLE_HOLD_BUTTON__HOLD_FG_COLOR, this._holdFgColor );
        wst.setWidgetSettingsTemplateField( WidgetData.WIDGET_FIELD_NAME_TOGGLE_HOLD_BUTTON__HOLD_BG_COLOR, this._holdBgColor );
        wst.setWidgetSettingsTemplateField( WidgetData.WIDGET_FIELD_NAME_TOGGLE_HOLD_BUTTON__HOLD_OUTER_BORDER_COLOR, this._holdOuterBorderColor );
        wst.setWidgetSettingsTemplateField( WidgetData.WIDGET_FIELD_NAME_TOGGLE_HOLD_BUTTON__HOLD_OUTER_BORDER_RADIUS, this._holdOuterBorderRadius );
        wst.setWidgetSettingsTemplateField( WidgetData.WIDGET_FIELD_NAME_TOGGLE_HOLD_BUTTON__HOLD_OUTER_BORDER_THICKNESS, this._holdOuterBorderThickness );

        wst.setWidgetSettingsTemplateField( WidgetData.WIDGET_FIELD_NAME_TOGGLE_HOLD_BUTTON__UNHOLD_LABEL, this._unholdLabel );
        wst.setWidgetSettingsTemplateField( WidgetData.WIDGET_FIELD_NAME_TOGGLE_HOLD_BUTTON__UNHOLD_ICON, this._unholdIcon );
        wst.setWidgetSettingsTemplateField( WidgetData.WIDGET_FIELD_NAME_TOGGLE_HOLD_BUTTON__UNHOLD_ICON_NAME, this._unholdIconName );
        wst.setWidgetSettingsTemplateField( WidgetData.WIDGET_FIELD_NAME_TOGGLE_HOLD_BUTTON__UNHOLD_ICON_WIDTH, this._unholdIconWidth );
        wst.setWidgetSettingsTemplateField( WidgetData.WIDGET_FIELD_NAME_TOGGLE_HOLD_BUTTON__UNHOLD_ICON_HEIGHT, this._unholdIconHeight );
        wst.setWidgetSettingsTemplateField( WidgetData.WIDGET_FIELD_NAME_TOGGLE_HOLD_BUTTON__UNHOLD_FONT_SIZE, this._unholdFontSize );
        wst.setWidgetSettingsTemplateField( WidgetData.WIDGET_FIELD_NAME_TOGGLE_HOLD_BUTTON__UNHOLD_FG_COLOR, this._unholdFgColor );
        wst.setWidgetSettingsTemplateField( WidgetData.WIDGET_FIELD_NAME_TOGGLE_HOLD_BUTTON__UNHOLD_BG_COLOR, this._unholdBgColor );
        wst.setWidgetSettingsTemplateField( WidgetData.WIDGET_FIELD_NAME_TOGGLE_HOLD_BUTTON__UNHOLD_OUTER_BORDER_COLOR, this._unholdOuterBorderColor );
        wst.setWidgetSettingsTemplateField( WidgetData.WIDGET_FIELD_NAME_TOGGLE_HOLD_BUTTON__UNHOLD_OUTER_BORDER_RADIUS, this._unholdOuterBorderRadius );
        wst.setWidgetSettingsTemplateField( WidgetData.WIDGET_FIELD_NAME_TOGGLE_HOLD_BUTTON__UNHOLD_OUTER_BORDER_THICKNESS, this._unholdOuterBorderThickness );
    }

    //!override
    _importLegacyButtonWidgetSubDataFromWidgetSettingsTemplateMain( wst ){
        if( wst.isWidgetSettingsTemplateFieldExists( WidgetData.WIDGET_FIELD_NAME_TOGGLE_HOLD_BUTTON__HOLD_LABEL ) === true ) {
            this._holdLabel = wst.getWidgetSettingsTemplateFieldValue(WidgetData.WIDGET_FIELD_NAME_TOGGLE_HOLD_BUTTON__HOLD_LABEL);
        }
        if( wst.isWidgetSettingsTemplateFieldExists( WidgetData.WIDGET_FIELD_NAME_TOGGLE_HOLD_BUTTON__HOLD_ICON ) === true ) {
            this._holdIcon = wst.getWidgetSettingsTemplateFieldValue(WidgetData.WIDGET_FIELD_NAME_TOGGLE_HOLD_BUTTON__HOLD_ICON);
        }
        if( wst.isWidgetSettingsTemplateFieldExists( WidgetData.WIDGET_FIELD_NAME_TOGGLE_HOLD_BUTTON__HOLD_ICON_NAME ) === true ) {
            this._holdIconName = wst.getWidgetSettingsTemplateFieldValue(WidgetData.WIDGET_FIELD_NAME_TOGGLE_HOLD_BUTTON__HOLD_ICON_NAME);
        }
        if( wst.isWidgetSettingsTemplateFieldExists( WidgetData.WIDGET_FIELD_NAME_TOGGLE_HOLD_BUTTON__HOLD_ICON_WIDTH ) === true ) {
            this._holdIconWidth = wst.getWidgetSettingsTemplateFieldValue(WidgetData.WIDGET_FIELD_NAME_TOGGLE_HOLD_BUTTON__HOLD_ICON_WIDTH);
        }
        if( wst.isWidgetSettingsTemplateFieldExists( WidgetData.WIDGET_FIELD_NAME_TOGGLE_HOLD_BUTTON__HOLD_ICON_HEIGHT ) === true ) {
            this._holdIconHeight = wst.getWidgetSettingsTemplateFieldValue(WidgetData.WIDGET_FIELD_NAME_TOGGLE_HOLD_BUTTON__HOLD_ICON_HEIGHT);
        }
        if( wst.isWidgetSettingsTemplateFieldExists( WidgetData.WIDGET_FIELD_NAME_TOGGLE_HOLD_BUTTON__HOLD_FONT_SIZE ) === true ) {
            this._holdFontSize = wst.getWidgetSettingsTemplateFieldValue(WidgetData.WIDGET_FIELD_NAME_TOGGLE_HOLD_BUTTON__HOLD_FONT_SIZE);
        }
        if( wst.isWidgetSettingsTemplateFieldExists( WidgetData.WIDGET_FIELD_NAME_TOGGLE_HOLD_BUTTON__HOLD_FG_COLOR ) === true ) {
            this._holdFgColor = wst.getWidgetSettingsTemplateFieldValue(WidgetData.WIDGET_FIELD_NAME_TOGGLE_HOLD_BUTTON__HOLD_FG_COLOR);
        }
        if( wst.isWidgetSettingsTemplateFieldExists( WidgetData.WIDGET_FIELD_NAME_TOGGLE_HOLD_BUTTON__HOLD_BG_COLOR ) === true ) {
            this._holdBgColor = wst.getWidgetSettingsTemplateFieldValue(WidgetData.WIDGET_FIELD_NAME_TOGGLE_HOLD_BUTTON__HOLD_BG_COLOR);
        }
        if( wst.isWidgetSettingsTemplateFieldExists( WidgetData.WIDGET_FIELD_NAME_TOGGLE_HOLD_BUTTON__HOLD_OUTER_BORDER_COLOR ) === true ) {
            this._holdOuterBorderColor = wst.getWidgetSettingsTemplateFieldValue(WidgetData.WIDGET_FIELD_NAME_TOGGLE_HOLD_BUTTON__HOLD_OUTER_BORDER_COLOR);
        }
        if( wst.isWidgetSettingsTemplateFieldExists( WidgetData.WIDGET_FIELD_NAME_TOGGLE_HOLD_BUTTON__HOLD_OUTER_BORDER_RADIUS ) === true ) {
            this._holdOuterBorderRadius = wst.getWidgetSettingsTemplateFieldValue(WidgetData.WIDGET_FIELD_NAME_TOGGLE_HOLD_BUTTON__HOLD_OUTER_BORDER_RADIUS);
        }
        if( wst.isWidgetSettingsTemplateFieldExists( WidgetData.WIDGET_FIELD_NAME_TOGGLE_HOLD_BUTTON__HOLD_OUTER_BORDER_THICKNESS ) === true ) {
            this._holdOuterBorderThickness = wst.getWidgetSettingsTemplateFieldValue(WidgetData.WIDGET_FIELD_NAME_TOGGLE_HOLD_BUTTON__HOLD_OUTER_BORDER_THICKNESS);
        }

        if( wst.isWidgetSettingsTemplateFieldExists( WidgetData.WIDGET_FIELD_NAME_TOGGLE_HOLD_BUTTON__UNHOLD_LABEL ) === true ) {
            this._unholdLabel = wst.getWidgetSettingsTemplateFieldValue(WidgetData.WIDGET_FIELD_NAME_TOGGLE_HOLD_BUTTON__UNHOLD_LABEL);
        }
        if( wst.isWidgetSettingsTemplateFieldExists( WidgetData.WIDGET_FIELD_NAME_TOGGLE_HOLD_BUTTON__UNHOLD_ICON ) === true ) {
            this._unholdIcon = wst.getWidgetSettingsTemplateFieldValue(WidgetData.WIDGET_FIELD_NAME_TOGGLE_HOLD_BUTTON__UNHOLD_ICON);
        }
        if( wst.isWidgetSettingsTemplateFieldExists( WidgetData.WIDGET_FIELD_NAME_TOGGLE_HOLD_BUTTON__UNHOLD_ICON_NAME ) === true ) {
            this._unholdIconName = wst.getWidgetSettingsTemplateFieldValue(WidgetData.WIDGET_FIELD_NAME_TOGGLE_HOLD_BUTTON__UNHOLD_ICON_NAME);
        }
        if( wst.isWidgetSettingsTemplateFieldExists( WidgetData.WIDGET_FIELD_NAME_TOGGLE_HOLD_BUTTON__UNHOLD_ICON_WIDTH ) === true ) {
            this._unholdIconWidth = wst.getWidgetSettingsTemplateFieldValue(WidgetData.WIDGET_FIELD_NAME_TOGGLE_HOLD_BUTTON__UNHOLD_ICON_WIDTH);
        }
        if( wst.isWidgetSettingsTemplateFieldExists( WidgetData.WIDGET_FIELD_NAME_TOGGLE_HOLD_BUTTON__UNHOLD_ICON_HEIGHT ) === true ) {
            this._unholdIconHeight = wst.getWidgetSettingsTemplateFieldValue(WidgetData.WIDGET_FIELD_NAME_TOGGLE_HOLD_BUTTON__UNHOLD_ICON_HEIGHT);
        }
        if( wst.isWidgetSettingsTemplateFieldExists( WidgetData.WIDGET_FIELD_NAME_TOGGLE_HOLD_BUTTON__UNHOLD_FONT_SIZE ) === true ) {
            this._unholdFontSize = wst.getWidgetSettingsTemplateFieldValue(WidgetData.WIDGET_FIELD_NAME_TOGGLE_HOLD_BUTTON__UNHOLD_FONT_SIZE);
        }
        if( wst.isWidgetSettingsTemplateFieldExists( WidgetData.WIDGET_FIELD_NAME_TOGGLE_HOLD_BUTTON__UNHOLD_FG_COLOR ) === true ) {
            this._unholdFgColor = wst.getWidgetSettingsTemplateFieldValue(WidgetData.WIDGET_FIELD_NAME_TOGGLE_HOLD_BUTTON__UNHOLD_FG_COLOR);
        }
        if( wst.isWidgetSettingsTemplateFieldExists( WidgetData.WIDGET_FIELD_NAME_TOGGLE_HOLD_BUTTON__UNHOLD_BG_COLOR ) === true ) {
            this._unholdBgColor = wst.getWidgetSettingsTemplateFieldValue(WidgetData.WIDGET_FIELD_NAME_TOGGLE_HOLD_BUTTON__UNHOLD_BG_COLOR);
        }
        if( wst.isWidgetSettingsTemplateFieldExists( WidgetData.WIDGET_FIELD_NAME_TOGGLE_HOLD_BUTTON__UNHOLD_OUTER_BORDER_COLOR ) === true ) {
            this._unholdOuterBorderColor = wst.getWidgetSettingsTemplateFieldValue(WidgetData.WIDGET_FIELD_NAME_TOGGLE_HOLD_BUTTON__UNHOLD_OUTER_BORDER_COLOR);
        }
        if( wst.isWidgetSettingsTemplateFieldExists( WidgetData.WIDGET_FIELD_NAME_TOGGLE_HOLD_BUTTON__UNHOLD_OUTER_BORDER_RADIUS ) === true ) {
            this._unholdOuterBorderRadius = wst.getWidgetSettingsTemplateFieldValue(WidgetData.WIDGET_FIELD_NAME_TOGGLE_HOLD_BUTTON__UNHOLD_OUTER_BORDER_RADIUS);
        }
        if( wst.isWidgetSettingsTemplateFieldExists( WidgetData.WIDGET_FIELD_NAME_TOGGLE_HOLD_BUTTON__UNHOLD_OUTER_BORDER_THICKNESS ) === true ) {
            this._unholdOuterBorderThickness = wst.getWidgetSettingsTemplateFieldValue(WidgetData.WIDGET_FIELD_NAME_TOGGLE_HOLD_BUTTON__UNHOLD_OUTER_BORDER_THICKNESS);
        }
    }
}