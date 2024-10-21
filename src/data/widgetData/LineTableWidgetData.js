import WidgetData from "./WidgetData";
import LineTableWidgetLineData from "./LineTableWidgetLineData";

export default class LineTableWidgetData extends WidgetData {
    constructor( options ) {
        super(options);
        let lineCount = options["lineCount"];
        if( !lineCount ){
            lineCount = 0;
        }
        this._LineDataArray = new Array( lineCount );
        const lineDatasOption = options["lineDataArray"];
        for( let i = 0; i < lineCount; i++ ){
            const lineDataOptions = structuredClone( lineDatasOption[i] );
            lineDataOptions["lineTableWidgetDataAsParent"] = this;
            const lineData = new LineTableWidgetLineData( lineDataOptions );
            this._LineDataArray[i] = lineData;
        }

        this._linetableBgColor = options["linetableBgColor"];
        this._linetableOuterBorderThickness = options["linetableOuterBorderThickness"];
        this._linetableOuterBorderColor = options["linetableOuterBorderColor"];
        this._linetableOuterBorderRadius = options["linetableOuterBorderRadius"];

        this._linetableHeaderFgColor = options["linetableHeaderFgColor"];
        this._linetableHeaderRowUnderlineThickness = options["linetableHeaderRowUnderlineThickness"];
        this._linetableHeaderRowUnderlineColor = options["linetableHeaderRowUnderlineColor"];

        this._linetableBodyFgColor = options["linetableBodyFgColor"];
        this._linetableBodyRowUnderlineThickness = options["linetableBodyRowUnderlineThickness"];
        this._linetableBodyRowUnderlineColor = options["linetableBodyRowUnderlineColor"];

        this._lineButtonFontSize = options["lineButtonFontSize"];
        this._lineButtonWidth = options["lineButtonWidth"];
        this._lineButtonHeight = options["lineButtonHeight"];
        this._lineButtonFgColor = options["lineButtonFgColor"];
        this._lineButtonBgColor = options["lineButtonBgColor"];
        this._lineButtonOuterBorderColor = options["lineButtonOuterBorderColor"];
        this._lineButtonOuterBorderRadius = options["lineButtonOuterBorderRadius"];
        this._lineButtonOuterBorderThickness = options["lineButtonOuterBorderThickness"];

        this._transferButtonFontSize = options["transferButtonFontSize"];
        this._transferButtonWidth = options["transferButtonWidth"];
        this._transferButtonHeight = options["transferButtonHeight"];
        this._transferButtonFgColor = options["transferButtonFgColor"];
        this._transferButtonBgColor = options["transferButtonBgColor"];
        this._transferButtonOuterBorderColor = options["transferButtonOuterBorderColor"];
        this._transferButtonOuterBorderRadius = options["transferButtonOuterBorderRadius"];
        this._transferButtonOuterBorderThickness = options["transferButtonOuterBorderThickness"];

        this._transferCancelButtonFontSize = options["transferCancelButtonFontSize"];
        this._transferCancelButtonWidth = options["transferCancelButtonWidth"];
        this._transferCancelButtonHeight = options["transferCancelButtonHeight"];
        this._transferCancelButtonFgColor = options["transferCancelButtonFgColor"];
        this._transferCancelButtonBgColor = options["transferCancelButtonBgColor"];
        this._transferCancelButtonOuterBorderColor = options["transferCancelButtonOuterBorderColor"];
        this._transferCancelButtonOuterBorderRadius = options["transferCancelButtonOuterBorderRadius"];
        this._transferCancelButtonOuterBorderThickness = options["transferCancelButtonOuterBorderThickness"];

        this._linetableHeaderFontSize = options["linetableHeaderFontSize"];
        this._linetableBodyFontSize = options["linetableBodyFontSize"];
    }

    //!override
    setWidgetDataToObjectMain( o ){

        const lineCount = this._LineDataArray.length;
        o["lineCount"] = lineCount;
        if( lineCount  !== 0 ){
            o["lineDataArray"] = new Array( lineCount );
            for( let i = 0; i < lineCount; i++ ){
                const oLineData = new Object();
                const lineData = this._LineDataArray[i];
                lineData.setLineTableWidgetLineDataToObject( oLineData );
                o["lineDataArray"][i] = oLineData;
            }
        }
        else{
            delete o["lineDataArray"];
        }

        if( this._linetableBgColor ){
            o["linetableBgColor"] = this._linetableBgColor;
        }
        else{
            delete o["linetableBgColor"];
        }

        if( this._linetableOuterBorderThickness || this._linetableOuterBorderThickness === 0  ){
            o["linetableOuterBorderThickness"] = this._linetableOuterBorderThickness;
        }
        else{
            delete o["linetableOuterBorderThickness"];
        }

        if( this._linetableOuterBorderColor ){
            o["linetableOuterBorderColor"] = this._linetableOuterBorderColor;
        }
        else{
            delete o["linetableOuterBorderColor"];
        }

        if( this._linetableOuterBorderRadius || this._linetableOuterBorderRadius === 0  ){
            o["linetableOuterBorderRadius"] = this._linetableOuterBorderRadius;
        }
        else{
            delete o["linetableOuterBorderRadius"];
        }

        if( this._linetableHeaderFgColor ){
            o["linetableHeaderFgColor"] = this._linetableHeaderFgColor;
        }
        else{
            delete o["linetableHeaderFgColor"];
        }

        if( this._linetableHeaderRowUnderlineThickness || this._linetableHeaderRowUnderlineThickness === 0  ){
            o["linetableHeaderRowUnderlineThickness"] = this._linetableHeaderRowUnderlineThickness;
        }
        else{
            delete o["linetableHeaderRowUnderlineThickness"];
        }

        if( this._linetableHeaderRowUnderlineColor ){
            o["linetableHeaderRowUnderlineColor"] = this._linetableHeaderRowUnderlineColor;
        }
        else{
            delete o["linetableHeaderRowUnderlineColor"];
        }

        if( this._linetableBodyFgColor ){
            o["linetableBodyFgColor"] = this._linetableBodyFgColor;
        }
        else{
            delete o["linetableBodyFgColor"];
        }

        if( this._linetableBodyRowUnderlineThickness || this._linetableBodyRowUnderlineThickness === 0  ){
            o["linetableBodyRowUnderlineThickness"] = this._linetableBodyRowUnderlineThickness;
        }
        else{
            delete o["linetableBodyRowUnderlineThickness"];
        }

        if( this._linetableBodyRowUnderlineColor ){
            o["linetableBodyRowUnderlineColor"] = this._linetableBodyRowUnderlineColor;
        }
        else{
            delete o["linetableBodyRowUnderlineColor"];
        }

        if( this._lineButtonWidth || this._lineButtonWidth === 0  ){
            o["lineButtonWidth"] = this._lineButtonWidth;
        }
        else{
            delete o["lineButtonWidth"];
        }

        if( this._lineButtonHeight || this._lineButtonHeight === 0  ){
            o["lineButtonHeight"] = this._lineButtonHeight;
        }
        else{
            delete o["lineButtonHeight"];
        }

        if( this._lineButtonFgColor ){
            o["lineButtonFgColor"] = this._lineButtonFgColor;
        }
        else{
            delete o["lineButtonFgColor"];
        }

        if( this._lineButtonBgColor ){
            o["lineButtonBgColor"] = this._lineButtonBgColor;
        }
        else{
            delete o["lineButtonBgColor"];
        }

        if( this._lineButtonOuterBorderColor ){
            o["lineButtonOuterBorderColor"] = this._lineButtonOuterBorderColor;
        }
        else{
            delete o["lineButtonOuterBorderColor"];
        }

        if( this._lineButtonOuterBorderRadius || this._lineButtonOuterBorderRadius === 0  ){
            o["lineButtonOuterBorderRadius"] = this._lineButtonOuterBorderRadius;
        }
        else{
            delete o["lineButtonOuterBorderRadius"];
        }

        if( this._lineButtonOuterBorderThickness || this._lineButtonOuterBorderThickness === 0  ){
            o["lineButtonOuterBorderThickness"] = this._lineButtonOuterBorderThickness;
        }
        else{
            delete o["lineButtonOuterBorderThickness"];
        }

        if( this._transferButtonWidth || this._transferButtonWidth === 0  ){
            o["transferButtonWidth"] = this._transferButtonWidth;
        }
        else{
            delete o["transferButtonWidth"];
        }

        if( this._transferButtonHeight || this._transferButtonHeight === 0  ){
            o["transferButtonHeight"] = this._transferButtonHeight;
        }
        else{
            delete o["transferButtonHeight"];
        }

        if( this._transferButtonFgColor ){
            o["transferButtonFgColor"] = this._transferButtonFgColor;
        }
        else{
            delete o["transferButtonFgColor"];
        }

        if( this._transferButtonBgColor ){
            o["transferButtonBgColor"] = this._transferButtonBgColor;
        }
        else{
            delete o["transferButtonBgColor"];
        }

        if( this._transferButtonOuterBorderColor ){
            o["transferButtonOuterBorderColor"] = this._transferButtonOuterBorderColor;
        }
        else{
            delete o["transferButtonOuterBorderColor"];
        }

        if( this._transferButtonOuterBorderRadius || this._transferButtonOuterBorderRadius === 0  ){
            o["transferButtonOuterBorderRadius"] = this._transferButtonOuterBorderRadius;
        }
        else{
            delete o["transferButtonOuterBorderRadius"];
        }

        if( this._transferButtonOuterBorderThickness || this._transferButtonOuterBorderThickness === 0  ){
            o["transferButtonOuterBorderThickness"] = this._transferButtonOuterBorderThickness;
        }
        else{
            delete o["transferButtonOuterBorderThickness"];
        }

        if( this._transferCancelButtonWidth || this._transferCancelButtonWidth === 0  ){
            o["transferCancelButtonWidth"] = this._transferCancelButtonWidth;
        }
        else{
            delete o["transferCancelButtonWidth"];
        }

        if( this._transferCancelButtonHeight || this._transferCancelButtonHeight === 0  ){
            o["transferCancelButtonHeight"] = this._transferCancelButtonHeight;
        }
        else{
            delete o["transferCancelButtonHeight"];
        }

        if( this._transferCancelButtonFgColor ){
            o["transferCancelButtonFgColor"] = this._transferCancelButtonFgColor;
        }
        else{
            delete o["transferCancelButtonFgColor"];
        }

        if( this._transferCancelButtonBgColor ){
            o["transferCancelButtonBgColor"] = this._transferCancelButtonBgColor;
        }
        else{
            delete o["transferCancelButtonBgColor"];
        }

        if( this._transferCancelButtonOuterBorderColor ){
            o["transferCancelButtonOuterBorderColor"] = this._transferCancelButtonOuterBorderColor;
        }
        else{
            delete o["transferCancelButtonOuterBorderColor"];
        }

        if( this._transferCancelButtonOuterBorderRadius || this._transferCancelButtonOuterBorderRadius === 0  ){
            o["transferCancelButtonOuterBorderRadius"] = this._transferCancelButtonOuterBorderRadius;
        }
        else{
            delete o["transferCancelButtonOuterBorderRadius"];
        }

        if( this._transferCancelButtonOuterBorderThickness || this._transferCancelButtonOuterBorderThickness === 0  ){
            o["transferCancelButtonOuterBorderThickness"] = this._transferCancelButtonOuterBorderThickness;
        }
        else{
            delete o["transferCancelButtonOuterBorderThickness"];
        }

        if( this._linetableHeaderFontSize ){
            o["linetableHeaderFontSize"] = this._linetableHeaderFontSize;
        }
        else{
            delete o["linetableHeaderFontSize"];
        }

        if( this._linetableBodyFontSize ){
            o["linetableBodyFontSize"] = this._linetableBodyFontSize;
        }
        else{
            delete o["linetableBodyFontSize"];
        }

        if( this._lineButtonFontSize ){
            o["lineButtonFontSize"] = this._lineButtonFontSize;
        }
        else{
            delete o["lineButtonFontSize"];
        }

        if( this._transferButtonFontSize ){
            o["transferButtonFontSize"] = this._transferButtonFontSize;
        }
        else{
            delete o["transferButtonFontSize"];
        }

        if( this._transferCancelButtonFontSize ){
            o["transferCancelButtonFontSize"] = this._transferCancelButtonFontSize;
        }
        else{
            delete o["transferCancelButtonFontSize"];
        }

    }

    static _resizeLineDatasArray(arr, newSize) {
        while(newSize > arr.length) {
            const options = {
                "lineTableWidgetDataAsParent" : this
            }
            const lineData = new LineTableWidgetLineData( options );
            arr.push( lineData );
        }
        arr.length = newSize;
    }

    getLineButtonFontSize(){
        return this._lineButtonFontSize;
    }

    setLineButtonFontSize(n){
        this._lineButtonFontSize = n;
    }

    getTransferButtonFontSize(){
        return this._transferButtonFontSize;
    }

    setTransferButtonFontSize(n){
        this._transferButtonFontSize = n;
    }

    getTransferCancelButtonFontSize(){
        return this._transferCancelButtonFontSize;
    }

    setTransferCancelButtonFontSize(n){
        this._transferCancelButtonFontSize = n;
    }

    getLinetableHeaderFontSize(){
        return this._linetableHeaderFontSize;
    }

    setLinetableHeaderFontSize( n ){
        this._linetableHeaderFontSize = n;
    }

    getLinetableBodyFontSize(){
        return this._linetableBodyFontSize;
    }

    setLinetableBodyFontSize( n ){
        this._linetableBodyFontSize = n;
    }

    setLineDataArrayCount( count ){
        LineTableWidgetData._resizeLineDatasArray( this._LineDataArray, count  );
    }

    getLineDataArray(){
        return this._LineDataArray;
    }

    getLinetableBgColor(){
        return this._linetableBgColor;
    }

    setLinetableBgColor( color ){
        this._linetableBgColor = color;
    }

    getLinetableOuterBorderThickness(){
        return this._linetableOuterBorderThickness;
    }

    setLinetableOuterBorderThickness( n ){
        this._linetableOuterBorderThickness = n;
    }

    getLinetableOuterBorderColor(){
        return this._linetableOuterBorderColor;
    }

    setLinetableOuterBorderColor( color ){
        this._linetableOuterBorderColor = color;
    }

    getLinetableOuterBorderRadius(){
        return this._linetableOuterBorderRadius;
    }

    setLinetableOuterBorderRadius( n ){
        this._linetableOuterBorderRadius = n;
    }

    getLinetableHeaderFgColor(){
        return this._linetableHeaderFgColor;
    }

    setLinetableHeaderFgColor( color ){
        this._linetableHeaderFgColor = color;
    }

    getLinetableHeaderRowUnderlineThickness(){
        return this._linetableHeaderRowUnderlineThickness;
    }

    setLinetableHeaderRowUnderlineThickness( n ){
        this._linetableHeaderRowUnderlineThickness = n;
    }

    getLinetableHeaderRowUnderlineColor(){
        return this._linetableHeaderRowUnderlineColor;
    }

    setLinetableHeaderRowUnderlineColor( color ){
        this._linetableHeaderRowUnderlineColor = color;
    }

    getLinetableBodyFgColor(){
        return this._linetableBodyFgColor;
    }

    setLinetableBodyFgColor( color ){
        this._linetableBodyFgColor = color;
    }

    getLinetableBodyRowUnderlineThickness(){
        return this._linetableBodyRowUnderlineThickness;
    }

    setLinetableBodyRowUnderlineThickness(n){
        this._linetableBodyRowUnderlineThickness = n;
    }

    getLinetableBodyRowUnderlineColor(){
        return this._linetableBodyRowUnderlineColor;
    }

    setLinetableBodyRowUnderlineColor( color ){
        this._linetableBodyRowUnderlineColor = color;
    }

    getLineButtonWidth(){
        return this._lineButtonWidth;
    }

    setLineButtonWidth(n){
        this._lineButtonWidth = n;
    }

    getLineButtonHeight(){
        return this._lineButtonHeight;
    }

    setLineButtonHeight(n){
        this._lineButtonHeight = n;
    }

    getLineButtonFgColor(){
        return this._lineButtonFgColor;
    }

    setLineButtonFgColor( color ){
        this._lineButtonFgColor = color;
    }

    getLineButtonBgColor(){
        return this._lineButtonBgColor;
    }

    setLineButtonBgColor( color ){
        this._lineButtonBgColor = color;
    }

    getLineButtonOuterBorderColor(){
        return this._lineButtonOuterBorderColor;
    }

    setLineButtonOuterBorderColor( color ){
        this._lineButtonOuterBorderColor = color;
    }

    getLineButtonOuterBorderRadius(){
        return this._lineButtonOuterBorderRadius;
    }

    setLineButtonOuterBorderRadius( n ){
        this._lineButtonOuterBorderRadius = n;
    }

    getLineButtonOuterBorderThickness(){
        return this._lineButtonOuterBorderThickness;
    }

    setLineButtonOuterBorderThickness( n ){
        this._lineButtonOuterBorderThickness = n;
    }

    getTransferButtonWidth(){
        return this._transferButtonWidth;
    }

    setTransferButtonWidth(n){
        this._transferButtonWidth = n;
    }

    getTransferButtonHeight(){
        return this._transferButtonHeight;
    }

    setTransferButtonHeight(n){
        this._transferButtonHeight = n;
    }

    getTransferButtonFgColor(){
        return this._transferButtonFgColor;
    }

    setTransferButtonFgColor( color ){
        this._transferButtonFgColor = color;
    }

    getTransferButtonBgColor(){
        return this._transferButtonBgColor;
    }

    setTransferButtonBgColor( color ){
        this._transferButtonBgColor = color;
    }

    getTransferButtonOuterBorderColor(){
        return this._transferButtonOuterBorderColor;
    }

    setTransferButtonOuterBorderColor( color ){
        this._transferButtonOuterBorderColor = color;
    }

    getTransferButtonOuterBorderRadius(){
        return this._transferButtonOuterBorderRadius;
    }

    setTransferButtonOuterBorderRadius( n ){
        this._transferButtonOuterBorderRadius = n;
    }

    getTransferButtonOuterBorderThickness(){
        return this._transferButtonOuterBorderThickness;
    }

    setTransferButtonOuterBorderThickness( n ){
        this._transferButtonOuterBorderThickness = n;
    }

    getTransferCancelButtonWidth(){
        return this._transferCancelButtonWidth;
    }

    setTransferCancelButtonWidth(n){
        this._transferCancelButtonWidth = n;
    }

    getTransferCancelButtonHeight(){
        return this._transferCancelButtonHeight;
    }

    setTransferCancelButtonHeight(n){
        this._transferCancelButtonHeight = n;
    }

    getTransferCancelButtonFgColor(){
        return this._transferCancelButtonFgColor;
    }

    setTransferCancelButtonFgColor( color ){
        this._transferCancelButtonFgColor = color;
    }

    getTransferCancelButtonBgColor(){
        return this._transferCancelButtonBgColor;
    }

    setTransferCancelButtonBgColor( color ){
        this._transferCancelButtonBgColor = color;
    }

    getTransferCancelButtonOuterBorderColor(){
        return this._transferCancelButtonOuterBorderColor;
    }

    setTransferCancelButtonOuterBorderColor( color ){
        this._transferCancelButtonOuterBorderColor = color;
    }

    getTransferCancelButtonOuterBorderRadius(){
        return this._transferCancelButtonOuterBorderRadius;
    }

    setTransferCancelButtonOuterBorderRadius( n ){
        this._transferCancelButtonOuterBorderRadius = n;
    }

    getTransferCancelButtonOuterBorderThickness(){
        return this._transferCancelButtonOuterBorderThickness;
    }

    setTransferCancelButtonOuterBorderThickness( n ){
        this._transferCancelButtonOuterBorderThickness = n;
    }

    //!override
    importFromWidget_ver0_1(widget_ver0_1) {
        if( widget_ver0_1.lineCount && Number.isInteger(widget_ver0_1.lineCount) ){
            this.setLineDataArrayCount( widget_ver0_1.lineCount );
            for( let i = 0; i < widget_ver0_1.lineCount; i++ ){
                let resourceName = widget_ver0_1["line" + i ];
                if( !resourceName ){
                    resourceName = "";
                }
                let lineLabel = widget_ver0_1["lineLabel" + i ];
                if( !lineLabel ){
                    lineLabel = "";
                }

                let lineData = this._LineDataArray[i];
                if( !lineData ){
                    const lineDataOptions = {lineTableWidgetDataAsParent:this, resourceName:resourceName,lineLabel:lineLabel};  //!modify LineTableWidgetLineData
                    lineData = new LineTableWidgetLineData( lineDataOptions );
                    this._LineDataArray[i] = lineData;
                }
                else{
                    //!modify LineTableWidgetLineData
                    lineData.setResourceName( resourceName );
                    lineData.setLineLabel( lineLabel );
                }
            }
        }
        else{
            this.setLineDataArrayCount(0);
        }

        if( widget_ver0_1.lineButtonBgColor ){
            this._lineButtonBgColor = widget_ver0_1.lineButtonBgColor;
        }
        if( widget_ver0_1.lineButtonFgColor ){
            this._lineButtonFgColor = widget_ver0_1.lineButtonFgColor;
        }
        if( widget_ver0_1.lineButtonHeight ){
            this._lineButtonHeight = widget_ver0_1.lineButtonHeight;
        }
        if( widget_ver0_1.lineButtonOuterBorderColor ){
            this._lineButtonOuterBorderColor = widget_ver0_1.lineButtonOuterBorderColor;
        }
        if( widget_ver0_1.lineButtonOuterBorderRadius ){
            this._lineButtonOuterBorderRadius = widget_ver0_1.lineButtonOuterBorderRadius;
        }
        if( widget_ver0_1.lineButtonOuterBorderThickness ){
            this._lineButtonOuterBorderThickness = widget_ver0_1.lineButtonOuterBorderThickness;
        }
        if( widget_ver0_1.lineButtonWidth ){
            this._lineButtonWidth = widget_ver0_1.lineButtonWidth;
        }
        if( widget_ver0_1.linetableBgColor ){
            this._linetableBgColor = widget_ver0_1.linetableBgColor;
        }
        if( widget_ver0_1.linetableBodyFgColor ){
            this._linetableBodyFgColor = widget_ver0_1.linetableBodyFgColor;
        }
        if( widget_ver0_1.linetableBodyRowUnderlineColor ){
            this._linetableBodyRowUnderlineColor = widget_ver0_1.linetableBodyRowUnderlineColor;
        }
        if( widget_ver0_1.linetableBodyRowUnderlineColor ){
            this._linetableBodyRowUnderlineColor = widget_ver0_1.linetableBodyRowUnderlineColor;
        }
        if( widget_ver0_1.linetableBodyRowUnderlineThickness ){
            this._linetableBodyRowUnderlineThickness = widget_ver0_1.linetableBodyRowUnderlineThickness;
        }
        if( widget_ver0_1.linetableHeaderFgColor ){
            this._linetableHeaderFgColor  = widget_ver0_1.linetableHeaderFgColor;
        }
        if( widget_ver0_1.linetableHeaderRowUnderlineColor ){
            this._linetableHeaderRowUnderlineColor  = widget_ver0_1.linetableHeaderRowUnderlineColor;
        }
        if( widget_ver0_1.linetableHeaderRowUnderlineThickness ){
            this._linetableHeaderRowUnderlineThickness  = widget_ver0_1.linetableHeaderRowUnderlineThickness;
        }
        if( widget_ver0_1.linetableOuterBorderColor ){
            this._linetableOuterBorderColor  = widget_ver0_1.linetableOuterBorderColor;
        }
        if( widget_ver0_1.linetableOuterBorderRadius ){
            this._linetableOuterBorderRadius  = widget_ver0_1.linetableOuterBorderRadius;
        }
        if( widget_ver0_1.linetableOuterBorderThickness ){
            this._linetableOuterBorderThickness  = widget_ver0_1.linetableOuterBorderThickness;
        }
        if( widget_ver0_1.transferButtonBgColor ){
            this._transferButtonBgColor  = widget_ver0_1.transferButtonBgColor;
        }
        if( widget_ver0_1.transferButtonFgColor ){
            this._transferButtonFgColor  = widget_ver0_1.transferButtonFgColor;
        }
        if( widget_ver0_1.transferButtonHeight ){
            this._transferButtonHeight  = widget_ver0_1.transferButtonHeight;
        }
        if( widget_ver0_1.transferButtonOuterBorderColor ){
            this._transferButtonOuterBorderColor  = widget_ver0_1.transferButtonOuterBorderColor;
        }
        if( widget_ver0_1.transferButtonOuterBorderRadius ){
            this._transferButtonOuterBorderRadius  = widget_ver0_1.transferButtonOuterBorderRadius;
        }
        if( widget_ver0_1.transferButtonOuterBorderThickness ){
            this._transferButtonOuterBorderThickness  = widget_ver0_1.transferButtonOuterBorderThickness;
        }
        if( widget_ver0_1.transferButtonWidth ){
            this._transferButtonWidth  = widget_ver0_1.transferButtonWidth;
        }
        if( widget_ver0_1.transferCancelButtonBgColor ){
            this._transferCancelButtonBgColor  = widget_ver0_1.transferCancelButtonBgColor;
        }
        if( widget_ver0_1.transferCancelButtonFgColor ){
            this._transferCancelButtonFgColor  = widget_ver0_1.transferCancelButtonFgColor;
        }
        if( widget_ver0_1.transferCancelButtonHeight ){
            this._transferCancelButtonHeight  = widget_ver0_1.transferCancelButtonHeight;
        }
        if( widget_ver0_1.transferCancelButtonOuterBorderColor ){
            this._transferCancelButtonOuterBorderColor  = widget_ver0_1.transferCancelButtonOuterBorderColor;
        }
        if( widget_ver0_1.transferCancelButtonOuterBorderRadius ){
            this._transferCancelButtonOuterBorderRadius  = widget_ver0_1.transferCancelButtonOuterBorderRadius;
        }
        if( widget_ver0_1.transferCancelButtonOuterBorderThickness ){
            this._transferCancelButtonOuterBorderThickness  = widget_ver0_1.transferCancelButtonOuterBorderThickness;
        }
        if( widget_ver0_1.transferCancelButtonWidth ){
            this._transferCancelButtonWidth  = widget_ver0_1.transferCancelButtonWidth;
        }
    }

}