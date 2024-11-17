import LegacyButtonWidgetSubData from "./LegacyButtonWidgetSubData";

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
        this._cancelTransferIconWidth = currentOptions["cancelTransferIconWidth"];
        this._cancelTransferIconHeight = currentOptions["cancelTransferIconHeight"];
        this._cancelTransferFontSize = currentOptions["cancelTransferFontSize"];
        this._cancelTransferFgColor = currentOptions["cancelTransferFgColor"];
        this._cancelTransferBgColor = currentOptions["cancelTransferBgColor"];
        this._cancelTransferOuterBorderColor = currentOptions["cancelTransferOuterBorderColor"];
        this._cancelTransferOuterBorderRadius = currentOptions["cancelTransferOuterBorderRadius"];
        this._cancelTransferOuterBorderThickness = currentOptions["cancelTransferOuterBorderThickness"];
        this._cancelTransferLabel = currentOptions["cancelTransferLabel"];


    }

    //!override
    _setWidgetSubDataToObjectMain( o ){
        if( this._icon ){
            o["icon"] = this._icon;
        }
        else{
            delete o["icon"];
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
    }

    setIcon( icon ){
        this._icon = icon;
    }

    getIcon(){
        return this._icon;
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

}