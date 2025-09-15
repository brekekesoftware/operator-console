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
        this._callIconWidth = options["callIconWidth"];
        this._callIconHeight = options["callIconHeight"];
        this._callerNameSize = options["callerNameSize"];
        this._callerNumberSizeWithoutCallerName = options["callerNumberSizeWithoutCallerName"];
        this._callerNumberSizeWithCallerName = options["callerNumberSizeWithCallerName"];
        this._callDurationSize = options["callDurationSize"];
        this._keyboardIconWidth = options["keyboardIconWidth"];
        this._keyboardIconHeight = options["keyboardIconHeight"];
        this._inputTextSize = options["inputTextSize"];
        this._missedCallSize = options["missedCallSize"];
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

        if( !!this._callIconWidth ){
            o["callIconWidth"] = this._callIconWidth;
        }
        else{
            delete o["callIconWidth"];
        }

        if( !!this._callIconHeight ){
            o["callIconHeight"] = this._callIconHeight;
        }
        else{
            delete o["callIconHeight"];
        }

        if( !!this._callerNameSize ){
            o["callerNameSize"] = this._callerNameSize;
        }
        else{
            delete o["callerNameSize"];
        }

        if( !!this._callerNumberSizeWithCallerName ){
            o["callerNumberSizeWithCallerName"] = this._callerNumberSizeWithCallerName;
        }
        else{
            delete o["callerNumberSizeWithCallerName"];
        }

        if( !!this._callerNumberSizeWithoutCallerName ){
            o["callerNumberSizeWithoutCallerName"] = this._callerNumberSizeWithoutCallerName;
        }
        else{
            delete o["callerNumberSizeWithoutCallerName"];
        }

        if( !!this._callDurationSize ){
            o["callDurationSize"] = this._callDurationSize;
        }
        else{
            delete o["callDurationSize"];
        }

        if( !!this._keyboardIconWidth ){
            o["keyboardIconWidth"] = this._keyboardIconWidth;
        }
        else{
            delete o["keyboardIconWidth"];
        }

        if( !!this._keyboardIconHeight ){
            o["keyboardIconHeight"] = this._keyboardIconHeight;
        }
        else{
            delete o["keyboardIconHeight"];
        }

        if( !!this._inputTextSize ){
            o["inputTextSize"] = this._inputTextSize;
        }
        else{
            delete o["inputTextSize"];
        }

        if( !!this._missedCallSize ){
            o["missedCallSize"] = this._missedCallSize;
        }
        else{
            delete o["missedCallSize"];
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

    getCallIconWidth(){
        return this._callIconWidth;
    }

    setCallIconWidth( n ){
        this._callIconWidth = n;
    }

    getCallIconHeight(){
        return this._callIconHeight;
    }

    setCallIconHeight( n ){
        this._callIconHeight = n;
    }

    getCallerNameSize(){
        return this._callerNameSize;
    }

    setCallerNameSize(n){
        this._callerNameSize = n;
    }

    getCallerNumberSizeWithCallerName(){
        return this._callerNumberSizeWithCallerName;
    }

    setCallerNumberSizeWithCallerName( n ){
        this._callerNumberSizeWithCallerName = n;
    }

    getCallerNumberSizeWithoutCallerName(){
        return this._callerNumberSizeWithoutCallerName;
    }

    setCallerNumberSizeWithoutCallerName( n ){
        this._callerNumberSizeWithoutCallerName = n;
    }

    getCallDurationSize(){
        return this._callDurationSize;
    }

    setCallDurationSize(n){
        this._callDurationSize = n;
    }

    getKeyboardIconWidth(){
        return this._keyboardIconWidth;
    }

    setKeyboardIconWidth(n){
        this._keyboardIconWidth = n;
    }

    getKeyboardIconHeight(){
        return this._keyboardIconHeight;
    }

    setKeyboardIconHeight(n){
        this._keyboardIconHeight = n;
    }

    getInputTextSize(){
        return this._inputTextSize;
    }

    setInputTextSize( n ){
        this._inputTextSize = n;
    }

    getMissedCallSize(){
        return this._missedCallSize;
    }

    setMissedCallSize( n ){
        this._missedCallSize = n;
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

    //!override
    loadFromWidgetSettingsTemplateMain( wst, bIncludeButtonFunction = undefined ){
        if( wst.isWidgetSettingsTemplateFieldExists( WidgetData.WIDGET_FIELD_NAME_FG_COLOR ) === true ) {
            this._callpanelFgColor = wst.getWidgetSettingsTemplateFieldValue(WidgetData.WIDGET_FIELD_NAME_FG_COLOR);
        }
        if( wst.isWidgetSettingsTemplateFieldExists( WidgetData.WIDGET_FIELD_NAME_BG_COLOR ) === true ) {
            this._callpanelBgColor = wst.getWidgetSettingsTemplateFieldValue(WidgetData.WIDGET_FIELD_NAME_BG_COLOR);
        }
        if( wst.isWidgetSettingsTemplateFieldExists( WidgetData.WIDGET_FIELD_NAME_BORDER_RADIUS ) === true ) {
            this._callpanelBorderRadius = wst.getWidgetSettingsTemplateFieldValue(WidgetData.WIDGET_FIELD_NAME_BORDER_RADIUS);
        }
        if( wst.isWidgetSettingsTemplateFieldExists( WidgetData.WIDGET_FIELD_NAME_INSIDE_SHADOW_HORIZONTAL_OFFSET ) === true ) {
            this._insideShadow_horizontalOffset = wst.getWidgetSettingsTemplateFieldValue(WidgetData.WIDGET_FIELD_NAME_INSIDE_SHADOW_HORIZONTAL_OFFSET);
        }
        if( wst.isWidgetSettingsTemplateFieldExists( WidgetData.WIDGET_FIELD_NAME_INSIDE_SHADOW_VERTICAL_OFFSET ) === true ) {
            this._insideShadow_verticalOffset = wst.getWidgetSettingsTemplateFieldValue(WidgetData.WIDGET_FIELD_NAME_INSIDE_SHADOW_VERTICAL_OFFSET);
        }
        if( wst.isWidgetSettingsTemplateFieldExists( WidgetData.WIDGET_FIELD_NAME_INSIDE_SHADOW_BLUR ) === true ) {
            this._insideShadow_blur = wst.getWidgetSettingsTemplateFieldValue(WidgetData.WIDGET_FIELD_NAME_INSIDE_SHADOW_BLUR);
        }
        if( wst.isWidgetSettingsTemplateFieldExists( WidgetData.WIDGET_FIELD_NAME_INSIDE_SHADOW_SPREAD ) === true ) {
            this._insideShadow_spread = wst.getWidgetSettingsTemplateFieldValue(WidgetData.WIDGET_FIELD_NAME_INSIDE_SHADOW_SPREAD);
        }
        if( wst.isWidgetSettingsTemplateFieldExists( WidgetData.WIDGET_FIELD_NAME_INSIDE_SHADOW_COLOR ) === true ) {
            this._insideShadow_color = wst.getWidgetSettingsTemplateFieldValue(WidgetData.WIDGET_FIELD_NAME_INSIDE_SHADOW_COLOR);
        }
        if( wst.isWidgetSettingsTemplateFieldExists( WidgetData.WIDGET_FIELD_NAME_OUTSIDE_SHADOW_HORIZONTAL_OFFSET ) === true ) {
            this._outsideShadow_horizontalOffset = wst.getWidgetSettingsTemplateFieldValue(WidgetData.WIDGET_FIELD_NAME_OUTSIDE_SHADOW_HORIZONTAL_OFFSET);
        }
        if( wst.isWidgetSettingsTemplateFieldExists( WidgetData.WIDGET_FIELD_NAME_OUTSIDE_SHADOW_VERTICAL_OFFSET ) === true ) {
            this._outsideShadow_verticalOffset = wst.getWidgetSettingsTemplateFieldValue(WidgetData.WIDGET_FIELD_NAME_OUTSIDE_SHADOW_VERTICAL_OFFSET);
        }
        if( wst.isWidgetSettingsTemplateFieldExists( WidgetData.WIDGET_FIELD_NAME_OUTSIDE_SHADOW_BLUR ) === true ) {
            this._outsideShadow_blur = wst.getWidgetSettingsTemplateFieldValue(WidgetData.WIDGET_FIELD_NAME_OUTSIDE_SHADOW_BLUR);
        }
        if( wst.isWidgetSettingsTemplateFieldExists( WidgetData.WIDGET_FIELD_NAME_OUTSIDE_SHADOW_SPREAD ) === true ) {
            this._outsideShadow_spread = wst.getWidgetSettingsTemplateFieldValue(WidgetData.WIDGET_FIELD_NAME_OUTSIDE_SHADOW_SPREAD);
        }
        if( wst.isWidgetSettingsTemplateFieldExists( WidgetData.WIDGET_FIELD_NAME_OUTSIDE_SHADOW_COLOR ) === true ) {
            this._outsideShadow_color = wst.getWidgetSettingsTemplateFieldValue(WidgetData.WIDGET_FIELD_NAME_OUTSIDE_SHADOW_COLOR);
        }
        if( wst.isWidgetSettingsTemplateFieldExists( WidgetData.WIDGET_FIELD_NAME_CALL_ICON_WIDTH ) === true ) {
            this._callIconWidth = wst.getWidgetSettingsTemplateFieldValue(WidgetData.WIDGET_FIELD_NAME_CALL_ICON_WIDTH );
        }
        if( wst.isWidgetSettingsTemplateFieldExists( WidgetData.WIDGET_FIELD_NAME_CALL_ICON_HEIGHT ) === true ) {
            this._callIconHeight = wst.getWidgetSettingsTemplateFieldValue(WidgetData.WIDGET_FIELD_NAME_CALL_ICON_HEIGHT );
        }
        if( wst.isWidgetSettingsTemplateFieldExists( WidgetData.WIDGET_FIELD_NAME_CALLER_NAME_SIZE ) === true ) {
            this._callerNameSize = wst.getWidgetSettingsTemplateFieldValue(WidgetData.WIDGET_FIELD_NAME_CALLER_NAME_SIZE);
        }
        if( wst.isWidgetSettingsTemplateFieldExists( WidgetData.WIDGET_FIELD_NAME_CALLER_NUMBER_SIZE_WITH_CALLER_NAME ) === true ) {
            this._callerNumberSizeWithCallerName = wst.getWidgetSettingsTemplateFieldValue(WidgetData.WIDGET_FIELD_NAME_CALLER_NUMBER_SIZE_WITH_CALLER_NAME);
        }
        if( wst.isWidgetSettingsTemplateFieldExists( WidgetData.WIDGET_FIELD_NAME_CALLER_NUMBER_SIZE_WITHOUT_CALLER_NAME ) === true ) {
            this._callerNumberSizeWithoutCallerName = wst.getWidgetSettingsTemplateFieldValue(WidgetData.WIDGET_FIELD_NAME_CALLER_NUMBER_SIZE_WITHOUT_CALLER_NAME );
        }
        if( wst.isWidgetSettingsTemplateFieldExists( WidgetData.WIDGET_FIELD_NAME_CALL_DURATION_SIZE ) === true ) {
            this._callDurationSize = wst.getWidgetSettingsTemplateFieldValue(WidgetData.WIDGET_FIELD_NAME_CALL_DURATION_SIZE);
        }
        if( wst.isWidgetSettingsTemplateFieldExists( WidgetData.WIDGET_FIELD_NAME_KEYBOARD_ICON_WIDTH ) === true ) {
            this._keyboardIconWidth= wst.getWidgetSettingsTemplateFieldValue(WidgetData.WIDGET_FIELD_NAME_KEYBOARD_ICON_WIDTH);
        }
        if( wst.isWidgetSettingsTemplateFieldExists( WidgetData.WIDGET_FIELD_NAME_KEYBOARD_ICON_HEIGHT ) === true ) {
            this._keyboardIconHeight = wst.getWidgetSettingsTemplateFieldValue(WidgetData.WIDGET_FIELD_NAME_KEYBOARD_ICON_HEIGHT);
        }
        if( wst.isWidgetSettingsTemplateFieldExists( WidgetData.WIDGET_FIELD_NAME_INPUT_TEXT_SIZE ) === true ) {
            this._inputTextSize= wst.getWidgetSettingsTemplateFieldValue(WidgetData.WIDGET_FIELD_NAME_INPUT_TEXT_SIZE);
        }
        if( wst.isWidgetSettingsTemplateFieldExists( WidgetData.WIDGET_FIELD_NAME_MISSED_CALL_SIZE ) === true ) {
            this._missedCallSize = wst.getWidgetSettingsTemplateFieldValue(WidgetData.WIDGET_FIELD_NAME_MISSED_CALL_SIZE);
        }

    }

    //!override
    saveToWidgetSettingsTemplateMain( wst ){
        wst.setWidgetSettingsTemplateField( WidgetData.WIDGET_FIELD_NAME_FG_COLOR, this._callpanelFgColor );
        wst.setWidgetSettingsTemplateField( WidgetData.WIDGET_FIELD_NAME_BG_COLOR, this._callpanelBgColor );
        wst.setWidgetSettingsTemplateField( WidgetData.WIDGET_FIELD_NAME_BORDER_RADIUS, this._callpanelBorderRadius );

        wst.setWidgetSettingsTemplateField( WidgetData.WIDGET_FIELD_NAME_INSIDE_SHADOW_HORIZONTAL_OFFSET, this._insideShadow_horizontalOffset );
        wst.setWidgetSettingsTemplateField( WidgetData.WIDGET_FIELD_NAME_INSIDE_SHADOW_VERTICAL_OFFSET, this._insideShadow_verticalOffset );
        wst.setWidgetSettingsTemplateField( WidgetData.WIDGET_FIELD_NAME_INSIDE_SHADOW_BLUR, this._insideShadow_blur );
        wst.setWidgetSettingsTemplateField( WidgetData.WIDGET_FIELD_NAME_INSIDE_SHADOW_SPREAD, this._insideShadow_spread );
        wst.setWidgetSettingsTemplateField( WidgetData.WIDGET_FIELD_NAME_INSIDE_SHADOW_COLOR, this._insideShadow_color );

        wst.setWidgetSettingsTemplateField( WidgetData.WIDGET_FIELD_NAME_OUTSIDE_SHADOW_HORIZONTAL_OFFSET, this._outsideShadow_horizontalOffset );
        wst.setWidgetSettingsTemplateField( WidgetData.WIDGET_FIELD_NAME_OUTSIDE_SHADOW_VERTICAL_OFFSET, this._outsideShadow_verticalOffset );
        wst.setWidgetSettingsTemplateField( WidgetData.WIDGET_FIELD_NAME_OUTSIDE_SHADOW_BLUR, this._outsideShadow_blur );
        wst.setWidgetSettingsTemplateField( WidgetData.WIDGET_FIELD_NAME_OUTSIDE_SHADOW_SPREAD, this._outsideShadow_spread );
        wst.setWidgetSettingsTemplateField( WidgetData.WIDGET_FIELD_NAME_OUTSIDE_SHADOW_COLOR, this._outsideShadow_color );

        wst.setWidgetSettingsTemplateField( WidgetData.WIDGET_FIELD_NAME_CALL_ICON_WIDTH, this._callIconWidth );
        wst.setWidgetSettingsTemplateField( WidgetData.WIDGET_FIELD_NAME_CALL_ICON_HEIGHT, this._callIconHeight );
        wst.setWidgetSettingsTemplateField( WidgetData.WIDGET_FIELD_NAME_CALLER_NAME_SIZE, this._callerNameSize );
        wst.setWidgetSettingsTemplateField( WidgetData.WIDGET_FIELD_NAME_CALLER_NUMBER_SIZE_WITH_CALLER_NAME, this._callerNumberSizeWithCallerName );
        wst.setWidgetSettingsTemplateField( WidgetData.WIDGET_FIELD_NAME_CALLER_NUMBER_SIZE_WITHOUT_CALLER_NAME, this._callerNumberSizeWithoutCallerName );
        wst.setWidgetSettingsTemplateField( WidgetData.WIDGET_FIELD_NAME_CALL_DURATION_SIZE, this._callDurationSize );
        wst.setWidgetSettingsTemplateField( WidgetData.WIDGET_FIELD_NAME_KEYBOARD_ICON_WIDTH, this._keyboardIconWidth );
        wst.setWidgetSettingsTemplateField( WidgetData.WIDGET_FIELD_NAME_KEYBOARD_ICON_HEIGHT, this._keyboardIconHeight );
        wst.setWidgetSettingsTemplateField( WidgetData.WIDGET_FIELD_NAME_INPUT_TEXT_SIZE, this._inputTextSize );
        wst.setWidgetSettingsTemplateField( WidgetData.WIDGET_FIELD_NAME_MISSED_CALL_SIZE, this._missedCallSize );


    }
}