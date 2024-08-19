import WidgetData from "./WidgetData";

export default class CallTableWidgetData extends WidgetData{
    constructor( options ) {
        super( options );

        this._calltableBgColor = options["calltableBgColor"];
        this._calltableOuterBorderThickness = options["calltableOuterBorderThickness"];
        this._calltableOuterBorderColor = options["calltableOuterBorderColor"];
        this._calltableOuterBorderRadius = options["calltableOuterBorderRadius"];
        this._calltableHeaderFgColor = options["calltableHeaderFgColor"];
        this._calltableHeaderRowUnderlineThickness = options["calltableHeaderRowUnderlineThickness"];
        this._calltableHeaderRowUnderlineColor = options["calltableHeaderRowUnderlineColor"];
        this._calltableBodyFgColor = options["calltableBodyFgColor"];
        this._calltableBodyRowUnderlineThickness = options["calltableBodyRowUnderlineThickness"];
        this._calltableBodyRowUnderlineColor = options["calltableBodyRowUnderlineColor"];
        this._calltableBodyActiveRowBgColor = options["calltableBodyActiveRowBgColor"];
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

}