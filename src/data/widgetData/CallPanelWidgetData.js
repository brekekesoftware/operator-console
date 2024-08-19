import WidgetData from "./WidgetData";

export default class CallPanelWidgetData extends WidgetData{
    constructor( options ) {
        super( options );
        this._callpanelFgColor = options["callpanelFgColor"];
        this._callpanelBgColor = options["callpanelBgColor"];
        this._callpanelBorderRadius = options["callpanelBorderRadius"];
        this._outsideShadow_horizontalOffset = options["outsideShadow_horizontalOffset"];
        this._outsideShadow_verticalOffset = options["outsideShadow_verticalOffset"];
        this._outsideShadow_blur = options["outsideShadow_blur"];
        this._outsideShadow_spread = options["outsideShadow_spread"];
        this._outsideShadow_color = options["outsideShadow_color"];
        this._insideShadow_horizontalOffset = options["insideShadow_horizontalOffset"];
        this._insideShadow_verticalOffset = options["insideShadow_verticalOffset"];
        this._insideShadow_blur = options["insideShadow_blur"];
        this._insideShadow_spread = options["insideShadow_spread"];
        this._insideShadow_color = options["insideShadow_color"];
    }

    //!override
    setWidgetDataToObjectMain( o ){
        if( !!this._callpanelFgColor ){
            o["callpanelFgColor"] = this._callpanelFgColor;
        }
        else{
            delete o["callpanelFgColor"];
        }

        if( !!this._callpanelBgColor ){
            o["callpanelBgColor"] = this._callpanelBgColor;
        }
        else{
            delete o["callpanelBgColor"];
        }

        if( this._callpanelBorderRadius || this._callpanelBorderRadius === 0 ){
            o["callpanelBorderRadius"] = this._callpanelBorderRadius;
        }
        else{
            delete o["callpanelBorderRadius"];
        }

        if( this._outsideShadow_horizontalOffset || this._outsideShadow_horizontalOffset === 0 ){
            o["outsideShadow_horizontalOffset"] = this._outsideShadow_horizontalOffset;
        }
        else{
            delete o["outsideShadow_horizontalOffset"];
        }

        if( this._outsideShadow_verticalOffset || this._outsideShadow_verticalOffset === 0 ){
            o["outsideShadow_verticalOffset"] = this._outsideShadow_verticalOffset;
        }
        else{
            delete o["outsideShadow_verticalOffset"];
        }

        if( this._outsideShadow_blur || this._outsideShadow_blur === 0 ){
            o["outsideShadow_blur"] = this._outsideShadow_blur;
        }
        else{
            delete o["outsideShadow_blur"];
        }

        if( this._outsideShadow_spread || this._outsideShadow_spread === 0  ){
            o["outsideShadow_spread"] = this._outsideShadow_spread;
        }
        else{
            delete o["outsideShadow_spread"];
        }

        if( !!this._outsideShadow_color ){
            o["outsideShadow_color"] = this._outsideShadow_color;
        }
        else{
            delete o["outsideShadow_color"];
        }

        if( this._insideShadow_horizontalOffset || this._insideShadow_horizontalOffset === 0 ){
            o["insideShadow_horizontalOffset"] = this._insideShadow_horizontalOffset;
        }
        else{
            delete o["insideShadow_horizontalOffset"];
        }

        if( this._insideShadow_verticalOffset || this._insideShadow_verticalOffset === 0 ){
            o["insideShadow_verticalOffset"] = this._insideShadow_verticalOffset;
        }
        else{
            delete o["insideShadow_verticalOffset"];
        }

        if( this._insideShadow_blur || this._insideShadow_blur === 0 ){
            o["insideShadow_blur"] = this._insideShadow_blur;
        }
        else{
            delete o["insideShadow_blur"];
        }

        if( this._insideShadow_spread || this._insideShadow_spread === 0 ){
            o["insideShadow_spread"] = this._insideShadow_spread;
        }
        else{
            delete o["insideShadow_spread"];
        }

        if( !!this._insideShadow_color ){
            o["insideShadow_color"] = this._insideShadow_color;
        }
        else{
            delete o["insideShadow_color"];
        }

    }

    getCallpanelFgColor(){
        return this._callpanelFgColor;
    }

    setCallpanelFgColor( color ){
        this._callpanelFgColor = color;
    }

    getCallpanelBgColor(){
        return this._callpanelBgColor;
    }

    setCallpanelBgColor( color ){
        this._callpanelBgColor = color;
    }

    getCallpanelBorderRadius(){
        return this._callpanelBorderRadius;
    }

    setCallpanelBorderRadius( n ){
        this._callpanelBorderRadius = n;
    }

    getOutsideShadow_horizontalOffset(){
        return this._outsideShadow_horizontalOffset;
    }

    setOutsideShadow_horizontalOffset( n ){
        this._outsideShadow_horizontalOffset = n;
    }

    getOutsideShadow_verticalOffset(){
        return this._outsideShadow_verticalOffset;
    }

    setOutsideShadow_verticalOffset(n){
        this._outsideShadow_verticalOffset = n;
    }

    getOutsideShadow_blur(){
        return this._outsideShadow_blur;
    }

    setOutsideShadow_blur(n){
        this._outsideShadow_blur = n;
    }

    getOutsideShadow_spread(){
        return this._outsideShadow_spread;
    }

    setOutsideShadow_spread(n){
        this._outsideShadow_spread = n;
    }

    getOutsideShadow_color(){
        return this._outsideShadow_color;
    }

    setOutsideShadow_color(n){
        this._outsideShadow_color = n;
    }

    getInsideShadow_horizontalOffset(){
        return this._insideShadow_horizontalOffset;
    }

    setInsideShadow_horizontalOffset( n ){
        this._insideShadow_horizontalOffset = n;
    }

    getInsideShadow_verticalOffset(){
        return this._insideShadow_verticalOffset;
    }

    setInsideShadow_verticalOffset(n){
        this._insideShadow_verticalOffset = n;
    }

    getInsideShadow_blur(){
        return this._insideShadow_blur;
    }

    setInsideShadow_blur(n){
        this._insideShadow_blur = n;
    }

    getInsideShadow_spread(){
        return this._insideShadow_spread;
    }

    setInsideShadow_spread(n){
        this._insideShadow_spread = n;
    }

    getInsideShadow_color(){
        return this._insideShadow_color;
    }

    setInsideShadow_color(n){
        this._insideShadow_color = n;
    }

    //!override
    importFromWidget_ver0_1( widget_ver0_1 ){
        if( widget_ver0_1["borderRadius"] ){
            this.setCallpanelBorderRadius( widget_ver0_1["borderRadius"] );
        }
        if( widget_ver0_1["callpanelBgColor"] ){
            this.setCallpanelBgColor( widget_ver0_1["callpanelBgColor"] );
        }
        if( widget_ver0_1["callpanelFgColor"] ){
            this.setCallpanelFgColor( widget_ver0_1["callpanelFgColor"] );
        }
        if( widget_ver0_1["insideShadow_blur"] ){
            this.setInsideShadow_blur( widget_ver0_1["insideShadow_blur"] );
        }
        if( widget_ver0_1["insideShadow_color"] ){
            this.setInsideShadow_color( widget_ver0_1["insideShadow_color"] );
        }
        if( widget_ver0_1["insideShadow_horizontalOffset"] ){
            this.setInsideShadow_horizontalOffset( widget_ver0_1["insideShadow_horizontalOffset"] );
        }
        if( widget_ver0_1["insideShadow_spread"] ){
            this.setInsideShadow_spread( widget_ver0_1["insideShadow_spread"] );
        }
        if( widget_ver0_1["insideShadow_verticalOffset"] ){
            this.setInsideShadow_verticalOffset( widget_ver0_1["insideShadow_verticalOffset"] );
        }
        if( widget_ver0_1["outsideShadow_blur"] ){
            this.setOutsideShadow_blur( widget_ver0_1["outsideShadow_blur"] );
        }
        if( widget_ver0_1["outsideShadow_color"] ){
            this.setOutsideShadow_color( widget_ver0_1["outsideShadow_color"] );
        }
        if( widget_ver0_1["outsideShadow_horizontalOffset"] ){
            this.setOutsideShadow_horizontalOffset( widget_ver0_1["outsideShadow_horizontalOffset"] );
        }
        if( widget_ver0_1["outsideShadow_spread"] ){
            this.setOutsideShadow_spread( widget_ver0_1["outsideShadow_spread"] );
        }
        if( widget_ver0_1["outsideShadow_verticalOffset"] ){
            this.setOutsideShadow_verticalOffset( widget_ver0_1["outsideShadow_verticalOffset"] );
        }

    }
}