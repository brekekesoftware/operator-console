import TabsData from "./TabsData";
import WidgetDatasForNoTabs from "./WidgetDatasForNoTabs";
import HorizontalDividerData from "./HorizontalDividerData";
import VerticalDividerData from "./VerticalDividerData";
import BaseDividerData from "./BaseDividerData";
import DividerDataFactory from "./DividerDataFactory";

const _PANE_TYPES = Object.freeze({
    rootPane : 0,
    leftPane : 1,
    rightPane : 2,
    upperPane : 3,
    bottomPane : 4
});
const _ROOT_PANE_NUMBER = 0;
//!abstract
export default class PaneData {

    constructor(  options  ){
        this._PaneDatasAsParent = options.paneDatasAsParent;

        const paneDataObject = options.paneDataObject;
        if( paneDataObject ){
            this._PaneType = paneDataObject["paneType"];
            this._PaneNumber = paneDataObject["paneNumber"];
            this._ParentPaneNumber = paneDataObject["parentPaneNumber"];
            this._paneWidth = paneDataObject["paneWidth"];
            this._paneHeight = paneDataObject["paneHeight"];

            const childPaneNumbers = paneDataObject["childPaneNumbers"];
            const enSrcChildPaneNumber = Object.entries( childPaneNumbers );
            this._ChildPaneNumbers = new Object();    //paneType, paneNumber
            enSrcChildPaneNumber.forEach(([sPaneType,paneNumber ]) => {  //!optimize use clone
                const paneType = parseInt( sPaneType );
                this._ChildPaneNumbers[ paneType ] = paneNumber;
            });
            this._enableTabs = paneDataObject["enableTabs"];
            const oDividerData = paneDataObject["dividerData"];
            if( oDividerData ){
                this._dividerData = DividerDataFactory.getDividerDataFactoryStaticInstance().createDividerDataFromObject( this, oDividerData );
            }
            else{
                this._dividerData = null;
            }
            const oWidgetDatasForNoTab = paneDataObject["widgetDatasForNoTab"];
            this._WidgetDatasForNoTabs = new WidgetDatasForNoTabs( this, null, oWidgetDatasForNoTab );

            const oTabsData = paneDataObject["tabsData"];
            this._TabsData = new TabsData( this, null,  oTabsData );

        }
        else {

            this._PaneType = options.paneType;
            this._PaneNumber = options.paneNumber;
            this._ChildPaneNumbers = new Object();    //paneType, paneNumber

            if (!options.cloneSrcPaneData) {
                this._paneWidth = options["paneWidth"];
                this._paneWidth = options["paneHeight"];
                this._enableTabs = false;
                this._dividerData = null;
                this._WidgetDatasForNoTabs = new WidgetDatasForNoTabs(this);    //Widget datas for no tabs.
                this._TabsData = new TabsData(this);
            } else {
                this._enableTabs = options.cloneSrcPaneData._enableTabs;
                this._paneWidth = options.cloneSrcPaneData._paneWidth;
                this._paneHeight = options.cloneSrcPaneData._paneHeight;
                const srcWidgetDatasForNoTabs = options.cloneSrcPaneData._WidgetDatasForNoTabs;
                this._WidgetDatasForNoTabs = new WidgetDatasForNoTabs(this, srcWidgetDatasForNoTabs);
                const srcTabsData = options.cloneSrcPaneData._TabsData;
                this._TabsData = new TabsData(this, srcTabsData);

                const srcDividerData = options.cloneSrcPaneData._dividerData;
                if (srcDividerData) {
                    this.setDivider(srcDividerData.getDividerDirection());
                } else {
                    this._dividerData = null;
                }
            }

            if (options.parentPaneData) {
                options.parentPaneData._setChildPaneTypeAndPaneNumber(options.paneType, this._PaneNumber);
                this._ParentPaneNumber = options.parentPaneData.getPaneNumber();
            } else {
                this._ParentPaneNumber = -1;
            }
        }

    }

    getWidgetDatasForNoTabs(){
        return this._WidgetDatasForNoTabs;
    }

    setPaneDataToObject( o ){
        o["paneType"] = this._PaneType;
        o["paneNumber"] =  this._PaneNumber;

        if( this._paneWidth ){
            o["paneWidth"] = this._paneWidth;
        }
        if( this._paneHeight  ){
            o["paneHeight"] = this._paneHeight;
        }

        o["parentPaneNumber"] = this._ParentPaneNumber;
        const dstChildPaneNumbers = new Object();
        const enSrcChildPaneNumber = Object.entries(  this._ChildPaneNumbers );
        enSrcChildPaneNumber.forEach(([sPaneType,paneNumber ]) => {  //!optimize use clone
            const paneType = parseInt( sPaneType );
            dstChildPaneNumbers[ paneType ] = paneNumber;
        });
        o["childPaneNumbers"] = dstChildPaneNumbers;
        o["enableTabs"] =  this._enableTabs;
        if( this._dividerData){
            const oDividerData = new Object();
            this._dividerData.setDividerDataToObject( oDividerData );
            o["dividerData"] = oDividerData;
        }
        else{
            o["dividerData"] = null;
        }

        const oWidgetDatasForNoTab = new Object();
        this._WidgetDatasForNoTabs.setWidgetDatasForNoTabDataToObject( oWidgetDatasForNoTab );
        o["widgetDatasForNoTab"] = oWidgetDatasForNoTab;

        const oTabsData = new Object();
        this._TabsData.setTabsDataToObject( oTabsData );
        o["tabsData"] = oTabsData;
    }

    getPaneType(){
        return this._PaneType;
    }

    getParentPaneNumber(){
        const parentPaneNumber = this._ParentPaneNumber;
        return parentPaneNumber;
    }

    setDivider( dividerDirection ){
        if( this._dividerData ){
            throw new Error("Invalid operation/");
        }

        switch( dividerDirection ){
            case BaseDividerData.DIVIDER_DIRECTIONS.vertical:
                const leftPaneData = this._PaneDatasAsParent.addPaneData( PaneData.PANE_TYPES.leftPane, this );
                this._setChildPaneTypeAndPaneNumber( PaneData.PANE_TYPES.leftPane, leftPaneData.getPaneNumber());
                const rightPaneData = this._PaneDatasAsParent.addPaneData( PaneData.PANE_TYPES.rightPane, this );
                this._setChildPaneTypeAndPaneNumber( PaneData.PANE_TYPES.rightPane, rightPaneData.getPaneNumber());
                this._dividerData = new VerticalDividerData(this);
                break;
            case BaseDividerData.DIVIDER_DIRECTIONS.horizontal:
                const upperPaneData = this._PaneDatasAsParent.addPaneData( PaneData.PANE_TYPES.upperPane, this );
                this._setChildPaneTypeAndPaneNumber( PaneData.PANE_TYPES.upperPane, upperPaneData.getPaneNumber());
                const bottomPaneData = this._PaneDatasAsParent.addPaneData(  PaneData.PANE_TYPES.bottomPane, this );
                this._setChildPaneTypeAndPaneNumber( PaneData.PANE_TYPES.bottomPane, bottomPaneData.getPaneNumber());
                this._dividerData = new HorizontalDividerData(this);
                break;
            default:
                throw new Error("Invalid operation");
        }
    }


    _setChildPaneTypeAndPaneNumber( paneType, paneNumber ){
        if( this._dividerData ){
            //check
            switch( this._dividerData.getDividerDirection() ) {
                case BaseDividerData.DIVIDER_DIRECTIONS.vertical:
                    if( paneType !== PaneData.PANE_TYPES.leftPane && paneType !== PaneData.PANE_TYPES.rightPane ){
                        throw new Error("Invalid operation.");
                    }
                    break;
                case BaseDividerData.DIVIDER_DIRECTIONS.horizontal:
                    if( paneType !== PaneData.PANE_TYPES.upperPane && paneType !== PaneData.PANE_TYPES.bottomPane ){
                        throw new Error("Invalid operation.");
                    }
                    break;
            }
        }
        else{
            switch( paneType ){
                case PaneData.PANE_TYPES.upperPane:
                case PaneData.PANE_TYPES.bottomPane:
                    this._dividerData = new HorizontalDividerData();
                    break;
                case PaneData.PANE_TYPES.leftPane:
                case PaneData.PANE_TYPES.rightPane:
                    this._dividerData = new VerticalDividerData();
                    break;
                default:
                    throw new Error("Invalid operation.");
            }
        }
        this._ChildPaneNumbers[ paneType ] = paneNumber;
    }

    getChildPaneNumberByPaneType( paneType ){
        const paneNumber = this._ChildPaneNumbers[ paneType ];
        return paneNumber;
    }

    static get PANE_TYPES(){
        return _PANE_TYPES;
    }

    static get ROOT_PANE_NUMBER(){
        return _ROOT_PANE_NUMBER;
    }

    setPaneWidth( w ){
        this._paneWidth = w;
    }

    setPaneHeight( h ){
        this._paneHeight = h;
    }

    getPaneWidth(){
        return this._paneWidth;
    }

    getPaneHeight(){
        return this._paneHeight;
    }


    getTabsData(){
        return this._TabsData;
    }

    getWidgetDatasForNoTabs(){
        return this._WidgetDatasForNoTabs;
    }

    getEnableTabs(){
        return this._enableTabs;
    }

    setEnableTabs(b){
        this._enableTabs = b;
    }

    getPaneNumber(){
        return this._PaneNumber;
    }

    getDividerData(){
        const dividerData = this._dividerData;
        return dividerData;
    }

    hasDividerData(){
        return !!this._dividerData;
    }

    removeDividerData(){
        if( !this.getDividerData() ){
            throw new Error("Invalid operation.");
        }

        for (const [paneType, childPaneNumber] of Object.entries(this._ChildPaneNumbers)) {
            const childPaneData = this._PaneDatasAsParent.getPaneDataByPaneNumber(childPaneNumber);
            if( childPaneData.hasDividerData() ){
                childPaneData.removeDividerData();
            }

            this._PaneDatasAsParent.removePaneDataByPaneNumberForce(childPaneNumber );
            delete this._ChildPaneNumbers[ paneType ];
        }

        this._dividerData = null;
    }

    getPaneDatasAsParent(){
        return this._PaneDatasAsParent;
    }

}