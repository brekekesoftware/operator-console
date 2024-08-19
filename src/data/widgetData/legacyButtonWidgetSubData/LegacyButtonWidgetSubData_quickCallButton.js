import LegacyButtonWidgetSubData from "./LegacyButtonWidgetSubData";

export default class LegacyButtonWidgetSubData_quickCallButton extends LegacyButtonWidgetSubData {

    constructor( options ) {
        super(  options );

        let currentOptions;
        const oSubData = options["legacyButtonWidgetSubDataObject"];
        if( oSubData  ){
            currentOptions = oSubData["legacyButtonWidgetSubTypeId"];
        }
        else {
            currentOptions = options;
        }

        this._label = currentOptions["label"];
        this._keypadZero = currentOptions["keypadZero"];
        this._keypadOne = currentOptions["keypadOne"];
        this._keypadTwo = currentOptions["keypadTwo"];
        this._keypadThree = currentOptions["keypadThree"];
        this._keypadFour = currentOptions["keypadFour"];
        this._keypadFive = currentOptions["keypadFive"];
        this._keypadSix = currentOptions["keypadSix"];
        this._keypadSeven = currentOptions["keypadSeven"];
        this._keypadEight = currentOptions["keypadEight"];
        this._keypadNine = currentOptions["keypadNine"];
        this._keypadAsterisk = currentOptions["keypadAsterisk"];
        this._keypadSharp = currentOptions["keypadSharp"];
    }

    //!override
    _setWidgetSubDataToObjectMain( o ){
        if( this._label ) {
            o["label"] = this._label;
        }
        if( this._keypadZero ) {
            o["keypadZero"] = this._keypadZero;
        }
        if( this._keypadOne ) {
            o["keypadOne"] = this._keypadOne;
        }
        if( this._keypadTwo ) {
            o["keypadTwo"] = this._keypadTwo;
        }
        if( this._keypadThree ) {
            o["keypadThree"] = this._keypadThree;
        }
        if( this._keypadFour ) {
            o["keypadFour"] = this._keypadFour;
        }
        if( this._keypadFive ) {
            o["keypadFive"] = this._keypadFive;
        }
        if( this._keypadSix ) {
            o["keypadSix"] = this._keypadSix;
        }
        if( this._keypadSeven ) {
            o["keypadSeven"] = this._keypadSeven;
        }
        if( this._keypadEight ) {
            o["keypadEight"] = this._keypadEight;
        }
        if( this._keypadNine ) {
            o["keypadNine"] = this._keypadNine;
        }
        if( this._keypadAsterisk ) {
            o["keypadAsterisk"] = this._keypadAsterisk;
        }
        if( this._keypadSharp ) {
            o["keypadSharp"] = this._keypadSharp;
        }
    }

    setLabel( label ){
        this._label = label;
    }

    getLabel(){
        return this._label;
    }

    setKeypadZero( k ){
        this._keypadZero = k;
    }

    getKeypadZero(){
        return this._keypadZero;
    }

    setKeypadOne( k ){
        this._keypadOne = k;
    }

    getKeypadOne(){
        return this._keypadOne;
    }

    setKeypadTwo( k ){
        this._keypadTwo = k;
    }

    getKeypadTwo(){
        return this._keypadTwo;
    }

    setKeypadThree( k ){
        this._keypadThree = k;
    }

    getKeypadThree(){
        return this._keypadThree;
    }

    setKeypadFour(k){
        this._keypadFour = k;
    }

    getKeypadFour(){
        return this._keypadFour;
    }

    setKeypadFive(k){
        this._keypadFive = k;
    }

    getKeypadFive(){
        return this._keypadFive;
    }

    setKeypadSix( k ){
        this._keypadSix = k;
    }

    getKeypadSix(){
        return this._keypadSix;
    }

    setKeypadSeven(k){
        this._keypadSeven = k;
    }

    getKeypadSeven(){
        return this._keypadSeven;
    }

    setKeypadEight(k){
        this._keypadEight = k;
    }

    getKeypadEight(){
        return this._keypadEight;
    }

    setKeypadNine(k){
        this._keypadNine = k;
    }

    getKeypadNine(){
        return this._keypadNine;
    }

    setKeypadAsterisk(k){
        this._keypadAsterisk = k;
    }

    getKeypadAsterisk(){
        return this._keypadAsterisk;
    }

    setKeypadSharp(k){
        this._keypadSharp = k;
    }

    getKeypadSharp(){
        return this._keypadSharp;
    }

    //!override
    importLegacyButtonWidgetSubDataFromWidget_ver0_1( widget_ver0_1 ){
        if( widget_ver0_1.label ){
            this._label = widget_ver0_1.label;
        }
        if( widget_ver0_1.keypad_zero ){
            this._keypadZero = widget_ver0_1.keypad_zero;
        }
        if( widget_ver0_1.keypad_one ){
            this._keypadOne = widget_ver0_1.keypad_one;
        }
        if( widget_ver0_1.keypad_two ){
            this._keypadTwo = widget_ver0_1.keypad_two;
        }
        if( widget_ver0_1.keypad_three ){
            this._keypadThree = widget_ver0_1.keypad_three;
        }
        if( widget_ver0_1.keypad_four ){
            this._keypadFour = widget_ver0_1.keypad_four;
        }
        if( widget_ver0_1.keypad_five ){
            this._keypadFive = widget_ver0_1.keypad_five;
        }
        if( widget_ver0_1.keypad_six ){
            this._keypadSix = widget_ver0_1.keypad_six;
        }
        if( widget_ver0_1.keypad_seven ){
            this._keypadSeven = widget_ver0_1.keypad_seven;
        }
        if( widget_ver0_1.keypad_eight ){
            this._keypadEight = widget_ver0_1.keypad_eight;
        }
        if( widget_ver0_1.keypad_nine  ){
            this._keypadNine = widget_ver0_1.keypad_nine;
        }
        if( widget_ver0_1.keypad_asterisk ){
            this._keypadAsterisk = widget_ver0_1.keypad_asterisk;
        }
        if( widget_ver0_1.keypad_sharp ){
            this._keypadSharp = widget_ver0_1.keypad_sharp;
        }
    }
}