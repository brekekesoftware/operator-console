import LegacyButtonWidgetSubData from "./LegacyButtonWidgetSubData";

export default class LegacyButtonWidgetSubData_quickCallButton extends LegacyButtonWidgetSubData {

    constructor( dataOptions = null, subDataOptions, dataVersion = null  ) {
        super(  dataOptions, subDataOptions, dataVersion  );

        let currentOptions;
        const oSubData = subDataOptions["legacyButtonWidgetSubDataObject"];
        if( dataVersion === "2.0.0"){
            currentOptions = dataOptions;
            this._label = subDataOptions["label"];
            this._keypadZero = subDataOptions["keypadZero"];
            this._keypadOne = subDataOptions["keypadOne"];
            this._keypadTwo = subDataOptions["keypadTwo"];
            this._keypadThree = subDataOptions["keypadThree"];
            this._keypadFour = subDataOptions["keypadFour"];
            this._keypadFive = subDataOptions["keypadFive"];
            this._keypadSix = subDataOptions["keypadSix"];
            this._keypadSeven = subDataOptions["keypadSeven"];
            this._keypadEight = subDataOptions["keypadEight"];
            this._keypadNine = subDataOptions["keypadNine"];
            this._keypadAsterisk = subDataOptions["keypadAsterisk"];
            this._keypadSharp = subDataOptions["keypadSharp"];
        }
        else if( oSubData  ){
            currentOptions = oSubData["legacyButtonWidgetSubTypeId"];
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
        else {
            currentOptions = subDataOptions;
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

        if( this._label ) {
            o["label"] = this._label;
        }
        else{
            delete o["label"];
        }

        if( this._keypadZero ) {
            o["keypadZero"] = this._keypadZero;
        }
        else{
            delete o["keypadZero"];
        }

        if( this._keypadOne ) {
            o["keypadOne"] = this._keypadOne;
        }
        else{
            delete o["keypadOne"];
        }

        if( this._keypadTwo ) {
            o["keypadTwo"] = this._keypadTwo;
        }
        else{
            delete o["keypadTwo"];
        }

        if( this._keypadThree ) {
            o["keypadThree"] = this._keypadThree;
        }
        else{
            delete o["keypadThree"];
        }

        if( this._keypadFour ) {
            o["keypadFour"] = this._keypadFour;
        }
        else{
            delete o["keypadFour"];
        }

        if( this._keypadFive ) {
            o["keypadFive"] = this._keypadFive;
        }
        else{
            delete o["keypadFive"];
        }

        if( this._keypadSix ) {
            o["keypadSix"] = this._keypadSix;
        }
        else{
            delete o["keypadSix"];
        }

        if( this._keypadSeven ) {
            o["keypadSeven"] = this._keypadSeven;
        }
        else{
            delete o["keypadSeven"];
        }

        if( this._keypadEight ) {
            o["keypadEight"] = this._keypadEight;
        }
        else{
            delete o["keypadEight"];
        }

        if( this._keypadNine ) {
            o["keypadNine"] = this._keypadNine;
        }
        else{
            delete o["keypadNine"];
        }

        if( this._keypadAsterisk ) {
            o["keypadAsterisk"] = this._keypadAsterisk;
        }
        else{
            delete o["keypadAsterisk"];
        }

        if( this._keypadSharp ) {
            o["keypadSharp"] = this._keypadSharp;
        }
        else{
            delete o["keypadSharp"];
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