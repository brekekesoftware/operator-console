import LegacyButtonWidgetSubData from "./LegacyButtonWidgetSubData";
import WidgetData from "../WidgetData";

export default class LegacyButtonWidgetSubData_transferButton extends LegacyButtonWidgetSubData {

    constructor( dataOptions = null, subDataOptions, dataVersion = null  ) {
        super(  dataOptions, subDataOptions, dataVersion  );

        let currentOptions;
        const oSubData = subDataOptions["legacyButtonWidgetSubDataObject"];
        if( dataVersion === "2.0.0"){
            currentOptions = dataOptions;
            this._label = subDataOptions["label"];
        }
        else if( oSubData  ){
            currentOptions = oSubData["legacyButtonWidgetSubTypeId"];
            this._label = currentOptions["label"];
        }
        else {
            currentOptions = subDataOptions;
            this._label = currentOptions["label"];
        }

        this._icon = currentOptions["icon"];
        this._iconName = currentOptions["iconName"];
        this._iconWidth = currentOptions["iconWidth"];
        this._iconHeight = currentOptions["iconHeight"];
        this._fontSize = currentOptions["fontSize"];
        this._fgColor = currentOptions["fgColor"];
        this._bgColor = currentOptions["bgColor"];
        this._outerBorderColor = currentOptions["outerBorderColor"];
        this._outerBorderRadius = currentOptions["outerBorderRadius"];
        this._outerBorderThickness = currentOptions["outerBorderThickness"];

        //Added - version 2.1.5
        this._cancelTransferIcon = currentOptions["cancelTransferIcon"];
        this._cancelTransferIconName = currentOptions["cancelTransferIconName"];
        this._cancelTransferIconWidth = currentOptions["cancelTransferIconWidth"];
        this._cancelTransferIconHeight = currentOptions["cancelTransferIconHeight"];
        this._cancelTransferFontSize = currentOptions["cancelTransferFontSize"];
        this._cancelTransferFgColor = currentOptions["cancelTransferFgColor"];
        this._cancelTransferBgColor = currentOptions["cancelTransferBgColor"];
        this._cancelTransferOuterBorderColor = currentOptions["cancelTransferOuterBorderColor"];
        this._cancelTransferOuterBorderRadius = currentOptions["cancelTransferOuterBorderRadius"];
        this._cancelTransferOuterBorderThickness = currentOptions["cancelTransferOuterBorderThickness"];
        this._cancelTransferLabel = currentOptions["cancelTransferLabel"];
        this._transferMode  = subDataOptions["transferMode"];


    }

    //!override
    _setWidgetSubDataToObjectMain( o ){
        if( this._icon ){
            o["icon"] = this._icon;
        }
        else{
            delete o["icon"];
        }

        if( this._iconName ){
            o["iconName"] = this._iconName;
        }
        else{
            delete o["iconName"];
        }

        if( this._iconWidth ){
            o["iconWidth"] = this._iconWidth;
        }
        else{
            delete o["iconWidth"];
        }

        if( this._iconHeight ){
            o["iconHeight"] = this._iconHeight;
        }
        else{
            delete o["iconHeight"];
        }

        if( this._fontSize ){
            o["fontSize"] = this._fontSize;
        }
        else{
            delete o["fontSize"];
        }

        if( this._fgColor ){
            o["fgColor"] = this._fgColor;
        }
        else{
            delete o["fgColor"];
        }

        if( this._bgColor ){
            o["bgColor"] = this._bgColor;
        }
        else{
            delete o["bgColor"];
        }

        if( this._outerBorderColor ){
            o["outerBorderColor"] = this._outerBorderColor;
        }
        else{
            delete o["outerBorderColor"];
        }

        if( this._outerBorderRadius ){
            o["outerBorderRadius"] = this._outerBorderRadius;
        }
        else{
            delete o["outerBorderRadius"];
        }

        if( this._outerBorderThickness ){
            o["outerBorderThickness"] = this._outerBorderThickness;
        }
        else{
            delete o["outerBorderThickness"];
        }

        if( this._label ){
            o["label"] = this._label;
        }
        else{
            delete o["label"];
        }

        //Added - version 2.1.5
        if( this._cancelTransferIcon ){
            o["cancelTransferIcon"] = this._cancelTransferIcon;
        }
        else{
            delete o["cancelTransferIcon"];
        }

        if( this._cancelTransferIconName ){
            o["cancelTransferIconName"] = this._cancelTransferIconName;
        }
        else{
            delete o["cancelTransferIconName"];
        }

        if( this._cancelTransferIconWidth ){
            o["cancelTransferIconWidth"] = this._cancelTransferIconWidth;
        }
        else{
            delete o["cancelTransferIconWidth"];
        }

        if( this._cancelTransferIconHeight ){
            o["cancelTransferIconHeight"] = this._cancelTransferIconHeight;
        }
        else{
            delete o["cancelTransferIconHeight"];
        }

        if( this._cancelTransferFontSize ){
            o["cancelTransferFontSize"] = this._cancelTransferFontSize;
        }
        else{
            delete o["cancelTransferFontSize"];
        }

        if( this._cancelTransferFgColor ){
            o["cancelTransferFgColor"] = this._cancelTransferFgColor;
        }
        else{
            delete o["cancelTransferFgColor"];
        }

        if( this._cancelTransferBgColor ){
            o["cancelTransferBgColor"] = this._cancelTransferBgColor;
        }
        else{
            delete o["cancelTransferBgColor"];
        }

        if( this._cancelTransferOuterBorderColor ){
            o["cancelTransferOuterBorderColor"] = this._cancelTransferOuterBorderColor;
        }
        else{
            delete o["cancelTransferOuterBorderColor"];
        }

        if( this._cancelTransferOuterBorderRadius ){
            o["cancelTransferOuterBorderRadius"] = this._cancelTransferOuterBorderRadius;
        }
        else{
            delete o["cancelTransferOuterBorderRadius"];
        }

        if( this._cancelTransferOuterBorderThickness ){
            o["cancelTransferOuterBorderThickness"] = this._cancelTransferOuterBorderThickness;
        }
        else{
            delete o["cancelTransferOuterBorderThickness"];
        }

        if( this._cancelTransferLabel ){
            o["cancelTransferLabel"] = this._cancelTransferLabel;
        }
        else{
            delete o["cancelTransferLabel"];
        }

        if( this._transferMode ){
            o["transferMode"] = this._transferMode;
        }
        else{
            delete o["transferMode"];
        }
    }

    setIcon( icon ){
        this._icon = icon;
    }

    getIcon(){
        return this._icon;
    }

    setIconName( iconName ){
        this._iconName = iconName;
    }

    getIconName(){
        return this._iconName;
    }

    getIconWidth(){
        return this._iconWidth;
    }

    setIconWidth( n ){
        this._iconWidth = n;
    }

    getIconHeight(){
        return this._iconHeight;
    }

    setIconHeight( n ){
        this._iconHeight = n;
    }

    setFontSize( fontSize ){
        this._fontSize = fontSize;
    }

    getFontSize(){
        return this._fontSize;
    }

    getFgColor(){
        return this._fgColor;
    }

    setFgColor( color ){
        this._fgColor = color;
    }

    getBgColor(){
        return this._bgColor;
    }

    setBgColor( color ){
        this._bgColor = color;
    }

    getOuterBorderColor(){
        return this._outerBorderColor;
    }

    setOuterBorderColor( col ){
        this._outerBorderColor = col;
    }

    getOuterBorderRadius(){
        return this._outerBorderRadius;
    }

    setOuterBorderRadius( n ){
        this._outerBorderRadius = n;
    }

    getOuterBorderThickness(){
        return this._outerBorderThickness;
    }

    setOuterBorderThickness( n ){
        this._outerBorderThickness = n;
    }

    setLabel( label ){
        this._label = label;
    }

    getLabel(){
        return this._label;
    }

    setCancelTransferIconName( iconName ){
        this._cancelTransferIconName = iconName;
    }

    getCancelTransferIconName(){
        return this._cancelTransferIconName;
    }

    setCancelTransferIcon( icon ){
        this._cancelTransferIcon = icon;
    }

    getCancelTransferIcon(){
        return this._cancelTransferIcon;
    }

    getCancelTransferIconWidth(){
        return this._cancelTransferIconWidth;
    }

    setCancelTransferIconWidth( n ){
        this._cancelTransferIconWidth = n;
    }

    getCancelTransferIconHeight(){
        return this._cancelTransferIconHeight;
    }

    setCancelTransferIconHeight( n ){
        this._cancelTransferIconHeight = n;
    }

    setCancelTransferFontSize( fontSize ){
        this._cancelTransferFontSize = fontSize;
    }

    getCancelTransferFontSize(){
        return this._cancelTransferFontSize;
    }

    getCancelTransferFgColor(){
        return this._cancelTransferFgColor;
    }

    setCancelTransferFgColor( color ){
        this._cancelTransferFgColor = color;
    }

    getCancelTransferBgColor(){
        return this._cancelTransferBgColor;
    }

    setCancelTransferBgColor( color ){
        this._cancelTransferBgColor = color;
    }

    getCancelTransferOuterBorderColor(){
        return this._cancelTransferOuterBorderColor;
    }

    setCancelTransferOuterBorderColor( col ){
        this._cancelTransferOuterBorderColor = col;
    }

    getCancelTransferOuterBorderRadius(){
        return this._cancelTransferOuterBorderRadius;
    }

    setCancelTransferOuterBorderRadius( n ){
        this._cancelTransferOuterBorderRadius = n;
    }

    getCancelTransferOuterBorderThickness(){
        return this._cancelTransferOuterBorderThickness;
    }

    setCancelTransferOuterBorderThickness( n ){
        this._cancelTransferOuterBorderThickness = n;
    }

    setCancelTransferLabel( label ){
        this._cancelTransferLabel = label;
    }

    getCancelTransferLabel(){
        return this._cancelTransferLabel;
    }

    getTransferMode(){
        return this._transferMode;
    }

    setTransferMode( s ){
        this._transferMode = s;
    }

    //!override
    importLegacyButtonWidgetSubDataFromWidget_ver0_1( widget_ver0_1 ){
        if( widget_ver0_1.icon ){
            this._icon = widget_ver0_1.icon;
        }
        if( widget_ver0_1.buttonBgColor ){
            this._bgColor = widget_ver0_1.buttonBgColor;
        }
        if( widget_ver0_1.buttonFgColor ){
            this._fgColor = widget_ver0_1.buttonFgColor;
        }
        if( widget_ver0_1.buttonOuterBorderColor ){
            this._outerBorderColor = widget_ver0_1.buttonOuterBorderColor;
        }
        if( widget_ver0_1.buttonOuterBorderRadius ){
            this._outerBorderRadius = widget_ver0_1.buttonOuterBorderRadius;
        }
        if( widget_ver0_1.buttonOuterBorderThickness ){
            this._outerBorderThickness = widget_ver0_1.buttonOuterBorderThickness;
        }
        if( widget_ver0_1.label ){
            this._label = widget_ver0_1.label;
        }
    }

    //!override
    _exportLegacyButtonWidgetSubDataToWidgetSettingsTemplateMain( wst ){
        wst.setWidgetSettingsTemplateField( WidgetData.WIDGET_FIELD_NAME_TRANSFER_BUTTON__TRANSFER_LABEL, this._label );
        wst.setWidgetSettingsTemplateField( WidgetData.WIDGET_FIELD_NAME_TRANSFER_BUTTON__TRANSFER_ICON, this._icon );
        wst.setWidgetSettingsTemplateField( WidgetData.WIDGET_FIELD_NAME_TRANSFER_BUTTON__TRANSFER_ICON_NAME, this._iconName );
        wst.setWidgetSettingsTemplateField( WidgetData.WIDGET_FIELD_NAME_TRANSFER_BUTTON__TRANSFER_ICON_WIDTH, this._iconWidth );
        wst.setWidgetSettingsTemplateField( WidgetData.WIDGET_FIELD_NAME_TRANSFER_BUTTON__TRANSFER_ICON_HEIGHT, this._iconHeight );
        wst.setWidgetSettingsTemplateField( WidgetData.WIDGET_FIELD_NAME_TRANSFER_BUTTON__TRANSFER_FONT_SIZE, this._fontSize );
        wst.setWidgetSettingsTemplateField( WidgetData.WIDGET_FIELD_NAME_TRANSFER_BUTTON__TRANSFER_FG_COLOR, this._fgColor );
        wst.setWidgetSettingsTemplateField( WidgetData.WIDGET_FIELD_NAME_TRANSFER_BUTTON__TRANSFER_BG_COLOR, this._bgColor );
        wst.setWidgetSettingsTemplateField( WidgetData.WIDGET_FIELD_NAME_TRANSFER_BUTTON__TRANSFER_OUTER_BORDER_COLOR, this._outerBorderColor );
        wst.setWidgetSettingsTemplateField( WidgetData.WIDGET_FIELD_NAME_TRANSFER_BUTTON__TRANSFER_OUTER_BORDER_RADIUS, this._outerBorderRadius );
        wst.setWidgetSettingsTemplateField( WidgetData.WIDGET_FIELD_NAME_TRANSFER_BUTTON__TRANSFER_OUTER_BORDER_THICKNESS, this._outerBorderThickness );

        wst.setWidgetSettingsTemplateField( WidgetData.WIDGET_FIELD_NAME_TRANSFER_BUTTON__CANCEL_TRANSFER_LABEL, this._cancelTransferLabel );
        wst.setWidgetSettingsTemplateField( WidgetData.WIDGET_FIELD_NAME_TRANSFER_BUTTON__CANCEL_TRANSFER_ICON, this._cancelTransferIcon );
        wst.setWidgetSettingsTemplateField( WidgetData.WIDGET_FIELD_NAME_TRANSFER_BUTTON__CANCEL_TRANSFER_ICON_NAME, this._cancelTransferIconName );
        wst.setWidgetSettingsTemplateField( WidgetData.WIDGET_FIELD_NAME_TRANSFER_BUTTON__CANCEL_TRANSFER_ICON_WIDTH, this._cancelTransferIconWidth );
        wst.setWidgetSettingsTemplateField( WidgetData.WIDGET_FIELD_NAME_TRANSFER_BUTTON__CANCEL_TRANSFER_ICON_HEIGHT, this._cancelTransferIconHeight );
        wst.setWidgetSettingsTemplateField( WidgetData.WIDGET_FIELD_NAME_TRANSFER_BUTTON__CANCEL_TRANSFER_FONT_SIZE, this._cancelTransferFontSize );
        wst.setWidgetSettingsTemplateField( WidgetData.WIDGET_FIELD_NAME_TRANSFER_BUTTON__CANCEL_TRANSFER_FG_COLOR, this._cancelTransferFgColor );
        wst.setWidgetSettingsTemplateField( WidgetData.WIDGET_FIELD_NAME_TRANSFER_BUTTON__CANCEL_TRANSFER_BG_COLOR, this._cancelTransferBgColor );
        wst.setWidgetSettingsTemplateField( WidgetData.WIDGET_FIELD_NAME_TRANSFER_BUTTON__CANCEL_TRANSFER_OUTER_BORDER_COLOR, this._cancelTransferOuterBorderColor );
        wst.setWidgetSettingsTemplateField( WidgetData.WIDGET_FIELD_NAME_TRANSFER_BUTTON__CANCEL_TRANSFER_OUTER_BORDER_RADIUS, this._cancelTransferOuterBorderRadius );
        wst.setWidgetSettingsTemplateField( WidgetData.WIDGET_FIELD_NAME_TRANSFER_BUTTON__CANCEL_TRANSFER_OUTER_BORDER_THICKNESS, this._cancelTransferOuterBorderThickness );

        wst.setWidgetSettingsTemplateField( WidgetData.WIDGET_FIELD_NAME_TRANSFER_BUTTON__MODE, this._transferMode );

    }

    //!override
    _importLegacyButtonWidgetSubDataFromWidgetSettingsTemplateMain( wst ){
        if( wst.isWidgetSettingsTemplateFieldExists( WidgetData.WIDGET_FIELD_NAME_TRANSFER_BUTTON__TRANSFER_LABEL ) === true ) {
            this._label = wst.getWidgetSettingsTemplateFieldValue(WidgetData.WIDGET_FIELD_NAME_TRANSFER_BUTTON__TRANSFER_LABEL);
        }
        if( wst.isWidgetSettingsTemplateFieldExists( WidgetData.WIDGET_FIELD_NAME_TRANSFER_BUTTON__TRANSFER_ICON ) === true ) {
            this._icon = wst.getWidgetSettingsTemplateFieldValue(WidgetData.WIDGET_FIELD_NAME_TRANSFER_BUTTON__TRANSFER_ICON);
        }
        if( wst.isWidgetSettingsTemplateFieldExists( WidgetData.WIDGET_FIELD_NAME_TRANSFER_BUTTON__TRANSFER_ICON_NAME ) === true ) {
            this._iconName = wst.getWidgetSettingsTemplateFieldValue(WidgetData.WIDGET_FIELD_NAME_TRANSFER_BUTTON__TRANSFER_ICON_NAME);
        }
        if( wst.isWidgetSettingsTemplateFieldExists( WidgetData.WIDGET_FIELD_NAME_TRANSFER_BUTTON__TRANSFER_ICON_WIDTH ) === true ) {
            this._iconWidth = wst.getWidgetSettingsTemplateFieldValue(WidgetData.WIDGET_FIELD_NAME_TRANSFER_BUTTON__TRANSFER_ICON_WIDTH);
        }
        if( wst.isWidgetSettingsTemplateFieldExists( WidgetData.WIDGET_FIELD_NAME_TRANSFER_BUTTON__TRANSFER_ICON_HEIGHT ) === true ) {
            this._iconHeight = wst.getWidgetSettingsTemplateFieldValue(WidgetData.WIDGET_FIELD_NAME_TRANSFER_BUTTON__TRANSFER_ICON_HEIGHT);
        }
        if( wst.isWidgetSettingsTemplateFieldExists( WidgetData.WIDGET_FIELD_NAME_TRANSFER_BUTTON__TRANSFER_FONT_SIZE ) === true ) {
            this._fontSize = wst.getWidgetSettingsTemplateFieldValue(WidgetData.WIDGET_FIELD_NAME_TRANSFER_BUTTON__TRANSFER_FONT_SIZE);
        }
        if( wst.isWidgetSettingsTemplateFieldExists( WidgetData.WIDGET_FIELD_NAME_TRANSFER_BUTTON__TRANSFER_FG_COLOR ) === true ) {
            this._fgColor = wst.getWidgetSettingsTemplateFieldValue(WidgetData.WIDGET_FIELD_NAME_TRANSFER_BUTTON__TRANSFER_FG_COLOR);
        }
        if( wst.isWidgetSettingsTemplateFieldExists( WidgetData.WIDGET_FIELD_NAME_TRANSFER_BUTTON__TRANSFER_BG_COLOR ) === true ) {
            this._bgColor = wst.getWidgetSettingsTemplateFieldValue(WidgetData.WIDGET_FIELD_NAME_TRANSFER_BUTTON__TRANSFER_BG_COLOR);
        }
        if( wst.isWidgetSettingsTemplateFieldExists( WidgetData.WIDGET_FIELD_NAME_TRANSFER_BUTTON__TRANSFER_OUTER_BORDER_COLOR ) === true ) {
            this._outerBorderColor = wst.getWidgetSettingsTemplateFieldValue(WidgetData.WIDGET_FIELD_NAME_TRANSFER_BUTTON__TRANSFER_OUTER_BORDER_COLOR);
        }
        if( wst.isWidgetSettingsTemplateFieldExists( WidgetData.WIDGET_FIELD_NAME_TRANSFER_BUTTON__TRANSFER_OUTER_BORDER_RADIUS ) === true ) {
            this._outerBorderRadius = wst.getWidgetSettingsTemplateFieldValue(WidgetData.WIDGET_FIELD_NAME_TRANSFER_BUTTON__TRANSFER_OUTER_BORDER_RADIUS);
        }
        if( wst.isWidgetSettingsTemplateFieldExists( WidgetData.WIDGET_FIELD_NAME_TRANSFER_BUTTON__TRANSFER_OUTER_BORDER_THICKNESS ) === true ) {
            this._outerBorderThickness = wst.getWidgetSettingsTemplateFieldValue(WidgetData.WIDGET_FIELD_NAME_TRANSFER_BUTTON__TRANSFER_OUTER_BORDER_THICKNESS);
        }

        if( wst.isWidgetSettingsTemplateFieldExists( WidgetData.WIDGET_FIELD_NAME_TRANSFER_BUTTON__CANCEL_TRANSFER_LABEL ) === true ) {
            this._cancelTransferLabel = wst.getWidgetSettingsTemplateFieldValue(WidgetData.WIDGET_FIELD_NAME_TRANSFER_BUTTON__CANCEL_TRANSFER_LABEL);
        }
        if( wst.isWidgetSettingsTemplateFieldExists( WidgetData.WIDGET_FIELD_NAME_TRANSFER_BUTTON__CANCEL_TRANSFER_ICON ) === true ) {
            this._cancelTransferIcon = wst.getWidgetSettingsTemplateFieldValue(WidgetData.WIDGET_FIELD_NAME_TRANSFER_BUTTON__CANCEL_TRANSFER_ICON);
        }
        if( wst.isWidgetSettingsTemplateFieldExists( WidgetData.WIDGET_FIELD_NAME_TRANSFER_BUTTON__CANCEL_TRANSFER_ICON_NAME ) === true ) {
            this._cancelTransferIconName = wst.getWidgetSettingsTemplateFieldValue(WidgetData.WIDGET_FIELD_NAME_TRANSFER_BUTTON__CANCEL_TRANSFER_ICON_NAME);
        }
        if( wst.isWidgetSettingsTemplateFieldExists( WidgetData.WIDGET_FIELD_NAME_TRANSFER_BUTTON__CANCEL_TRANSFER_ICON_WIDTH ) === true ) {
            this._cancelTransferIconWidth = wst.getWidgetSettingsTemplateFieldValue(WidgetData.WIDGET_FIELD_NAME_TRANSFER_BUTTON__CANCEL_TRANSFER_ICON_WIDTH);
        }
        if( wst.isWidgetSettingsTemplateFieldExists( WidgetData.WIDGET_FIELD_NAME_TRANSFER_BUTTON__CANCEL_TRANSFER_ICON_HEIGHT ) === true ) {
            this._cancelTransferIconHeight = wst.getWidgetSettingsTemplateFieldValue(WidgetData.WIDGET_FIELD_NAME_TRANSFER_BUTTON__CANCEL_TRANSFER_ICON_HEIGHT);
        }
        if( wst.isWidgetSettingsTemplateFieldExists( WidgetData.WIDGET_FIELD_NAME_TRANSFER_BUTTON__CANCEL_TRANSFER_FONT_SIZE ) === true ) {
            this._cancelTransferFontSize = wst.getWidgetSettingsTemplateFieldValue(WidgetData.WIDGET_FIELD_NAME_TRANSFER_BUTTON__CANCEL_TRANSFER_FONT_SIZE);
        }
        if( wst.isWidgetSettingsTemplateFieldExists( WidgetData.WIDGET_FIELD_NAME_TRANSFER_BUTTON__CANCEL_TRANSFER_FG_COLOR ) === true ) {
            this._cancelTransferFgColor = wst.getWidgetSettingsTemplateFieldValue(WidgetData.WIDGET_FIELD_NAME_TRANSFER_BUTTON__CANCEL_TRANSFER_FG_COLOR);
        }
        if( wst.isWidgetSettingsTemplateFieldExists( WidgetData.WIDGET_FIELD_NAME_TRANSFER_BUTTON__CANCEL_TRANSFER_BG_COLOR ) === true ) {
            this._cancelTransferBgColor = wst.getWidgetSettingsTemplateFieldValue(WidgetData.WIDGET_FIELD_NAME_TRANSFER_BUTTON__CANCEL_TRANSFER_BG_COLOR);
        }
        if( wst.isWidgetSettingsTemplateFieldExists( WidgetData.WIDGET_FIELD_NAME_TRANSFER_BUTTON__CANCEL_TRANSFER_OUTER_BORDER_COLOR ) === true ) {
            this._cancelTransferOuterBorderColor = wst.getWidgetSettingsTemplateFieldValue(WidgetData.WIDGET_FIELD_NAME_TRANSFER_BUTTON__CANCEL_TRANSFER_OUTER_BORDER_COLOR);
        }
        if( wst.isWidgetSettingsTemplateFieldExists( WidgetData.WIDGET_FIELD_NAME_TRANSFER_BUTTON__CANCEL_TRANSFER_OUTER_BORDER_RADIUS ) === true ) {
            this._cancelTransferOuterBorderRadius = wst.getWidgetSettingsTemplateFieldValue(WidgetData.WIDGET_FIELD_NAME_TRANSFER_BUTTON__CANCEL_TRANSFER_OUTER_BORDER_RADIUS);
        }
        if( wst.isWidgetSettingsTemplateFieldExists( WidgetData.WIDGET_FIELD_NAME_TRANSFER_BUTTON__CANCEL_TRANSFER_OUTER_BORDER_THICKNESS ) === true ) {
            this._cancelTransferOuterBorderThickness = wst.getWidgetSettingsTemplateFieldValue(WidgetData.WIDGET_FIELD_NAME_TRANSFER_BUTTON__CANCEL_TRANSFER_OUTER_BORDER_THICKNESS);
        }

        if( wst.isWidgetSettingsTemplateFieldExists( WidgetData.WIDGET_FIELD_NAME_TRANSFER_BUTTON__MODE ) === true ) {
            this._transferMode = wst.getWidgetSettingsTemplateFieldValue(WidgetData.WIDGET_FIELD_NAME_TRANSFER_BUTTON__MODE);
        }
    }
}