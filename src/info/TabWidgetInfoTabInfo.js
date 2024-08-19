export default class TabWidgetInfoTabInfo {

    constructor( options ) {
        this._TabWidgetInfoAsParent = options["tabWidgetInfoAsParent"];
        //this._title = options["tabWidgetInfoTabInfoTitle"];
        this._WidgetInfos = new Array();
        this._Object = options["object"];
    }

    getTitle(){
        return this._Object["tabWidgetInfoTabInfo_title"];
    }

    setTitle( val ){
        this._Object["tabWidgetInfoTabInfo_title"] = val;
    }




}