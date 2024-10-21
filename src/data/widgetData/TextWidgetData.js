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
}