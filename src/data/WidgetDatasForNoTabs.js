import WidgetDatas from "./WidgetDatas";

export default class WidgetDatasForNoTabs extends WidgetDatas {

    constructor( paneDataAsParent, cloneSrcWidgetDatasForNoTabs, oWidgetDatasForNoTabs  ) {
        super( cloneSrcWidgetDatasForNoTabs, oWidgetDatasForNoTabs  );
        this._PaneDataAsParent = paneDataAsParent;
    }

    setWidgetDatasForNoTabDataToObject( o ){
        super._setWidgetDatasToObject( o );
    }
}