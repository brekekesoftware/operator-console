export default class ScreenInfo{

    constructor(){
        this._WidgetInfos = new Array();
    }

    getWidgetInfoCount(){
        const count = this._WidgetInfos.length;
        return count;
    }
    
    getWidgetInfoAt( index ){
        const widgetInfo = this._WidgetInfos[index];
        return widgetInfo;
    }


}