import WidgetDatasForTabs from "./WidgetDatasForTabs";

export default class TabData{

    constructor( tabDatasAsParent, tabKeyAsInt, tabTitle, srcTabData, oTab   ) {
        if( srcTabData ){
            this._tabLabel = srcTabData.getTabLabel();
            this._TabKeyAsInt = srcTabData.getTabKeyAsInt();
            this._TabKeyAsString = srcTabData.getTabKeyAsString();
            this._WidgetDatas = new WidgetDatasForTabs(this, srcTabData._WidgetDatas );
        }
        else if( oTab ){
            this._tabLabel = oTab["tabLabel"];
            this._TabKeyAsInt = oTab["tabKeyAsInt"];
            this._TabKeyAsString = this._TabKeyAsInt.toString();
            this._WidgetDatas = new WidgetDatasForTabs(this, null, oTab["widgetDatas"]);
        }
        else {
            this._tabLabel = tabTitle;
            this._TabKeyAsString = tabKeyAsInt.toString();
            this._TabKeyAsInt = tabKeyAsInt;
            this._WidgetDatas = new WidgetDatasForTabs(this);
        }
    }

    setTabDataToObject(o){
        o["tabLabel"] = this._tabLabel;
        o["tabKeyAsInt"] = this._TabKeyAsInt;

        const oWidgetDatas = new Object();
        this._WidgetDatas.setWidgetDatasForTabsToObject( oWidgetDatas );
        o["widgetDatas"] = oWidgetDatas;
    }

    getTabKeyAsInt(){
        return this._TabKeyAsInt;
    }

    getTabKeyAsString(){
        return this._TabKeyAsString;
    }

    getTabLabel(){
        return this._tabLabel;
    }

    setTabLabel( s ){
        this._tabLabel = s;
    }

    getWidgetDatas(){
        return this._WidgetDatas;
    }


}