export default class LineTableWidgetLineData {

    constructor( options ) {
        this._LineTableWidgetDataAsParent =  options["lineTableWidgetDataAsParent"];
        this._resourceName = options["resourceName"];
        this._lineLabel = options["lineLabel"];
    }

    setLineTableWidgetLineDataToObject( o ){
        if( this._resourceName  ){
            o["resourceName"] = this._resourceName;
        }
        if( this._lineLabel ){
            o["lineLabel"] = this._lineLabel;
        }
    }

    getResourceName(){
        return this._resourceName;
    }

    setResourceName( name ){
        this._resourceName = name;
    }

    getLineLabel(){
        return this._lineLabel;
    }

    setLineLabel( label ){
        this._lineLabel = label;
    }


}