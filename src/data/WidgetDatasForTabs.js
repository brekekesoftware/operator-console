import WidgetDatas from "./WidgetDatas";

export default class WidgetDatasForTabs extends WidgetDatas {

    constructor( tabDataAsParent, cloneSrcWidgetDatasForTabs, oWidgetDatas  ) {
        super( cloneSrcWidgetDatasForTabs, oWidgetDatas );
        this._TabDataAsParent = tabDataAsParent;
    }

    setWidgetDatasForTabsToObject( o ){
        super._setWidgetDatasToObject(o);
    }

}