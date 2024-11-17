import WidgetDatas from "./WidgetDatas";

export default class WidgetDatasForNoTabs extends WidgetDatas {

    constructor( paneDataAsParent, cloneSrcWidgetDatasForNoTabs, oWidgetDatasForNoTabs, dataVersion = null  ) {
        super( cloneSrcWidgetDatasForNoTabs, oWidgetDatasForNoTabs, dataVersion  );
        this._PaneDataAsParent = paneDataAsParent;
    }

    setWidgetDatasForNoTabDataToObject( o ){
        super._setWidgetDatasToObject( o );
    }
}