import LegacyButtonWidgetSubData from "./LegacyButtonWidgetSubData";

export default class LegacyButtonWidgetSubData_seriesSetButton extends LegacyButtonWidgetSubData {

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