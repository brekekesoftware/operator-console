import WidgetDatas from "./WidgetDatas";

export default class WidgetDatasForTabs extends WidgetDatas {

    constructor( tabDataAsParent, cloneSrcWidgetDatasForTabs, oWidgetDatas, dataVersion = null  ) {
        super( cloneSrcWidgetDatasForTabs, oWidgetDatas, dataVersion );
        this._TabDataAsParent = tabDataAsParent;
    }

    setWidgetDatasForTabsToObject( o ){
        super._setWidgetDatasToObject(o);
    }

}