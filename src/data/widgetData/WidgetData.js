
const _WIDGET_TYPE_IDS = Object.freeze({
    legacyButton: 0,
    callPanel: 1,
    legacyExtensionStatus: 2,
    text: 3,
    callTable: 4,
    extensionTable: 5,
    note: 6,
    lineTable: 7,
    legacyUccac: 8,   //Legacy UC chat agent component
});
const _WIDGET_TYPE_NAMES_FOR_I18N = Object.freeze({ //{widgetTypeId : widget type name forI i8n}
    0 : "LegacyButton",
    1 : "LegacyCallPanel",
    2 : "LegacyExtensionStatus",
    3 : "Text",
    4 : "CallTable",
    5 : "ExtensionTable",
    6 : "Note",
    7 : "LineTable",
    8 : "LegacyUccacWidget"
});
//!abstract
export default class WidgetData{
    constructor( options ) {
        this._WidgetDatasAsParent = options["widgetDatasAsParent"];

        // const oWidgetData = options["oWidgetData"];
        // if( oWidgetData ){
        //     this._widgetUuid = oWidgetData["widgetUuid"];
        //     this._widgetRelativePositionX = oWidgetData["widgetRelativePositionX"];
        //     this._widgetRelativePositionY = oWidgetData["widgetRelativePositionY"];
        //     this._widgetWidth = oWidgetData["widgetWidth"];
        //     this._widgetHeight = oWidgetData["widgetHeight"];
        //     this._WidgetTypeId= oWidgetData["widgetTypeId"];
        // }
        // else {
            this._widgetUuid = options["widgetUuid"];
            this._WidgetTypeId = options["widgetTypeId"];
            this._widgetRelativePositionX = options["widgetRelativePositionX"];
            this._widgetRelativePositionY = options["widgetRelativePositionY"];
            this._widgetWidth = options["widgetWidth"];
            this._widgetHeight = options["widgetHeight"];
        //}
    }

    getWidgetTypeId(){
        return this._WidgetTypeId;
    }

    getWidgetNameForI18n(){
        const widgetTypeId = this.getWidgetTypeId();
        const nameForI18n = _WIDGET_TYPE_NAMES_FOR_I18N[ widgetTypeId ];
        return nameForI18n;
    }

    setWidgetDataToObject( o, parent ){
        if( parent ){
            o["widgetDatasAsParent"] = parent;
        }
        o["widgetUuid"] = this._widgetUuid;
        o["widgetRelativePositionX"] = this._widgetRelativePositionX;
        o["widgetRelativePositionY"] = this._widgetRelativePositionY;
        o["widgetWidth"] = this._widgetWidth;
        o["widgetHeight"] = this._widgetHeight;
        o["widgetTypeId"] = this._WidgetTypeId;

        this.setWidgetDataToObjectMain( o );
    }

    //!abstract
    setWidgetDataToObjectMain( o ){
        throw new Error("Not implemented.");
    }

    static get WIDGET_TYPE_IDS(){
        return _WIDGET_TYPE_IDS;
    }

    static getWidgetTypeIdByWidgetTypeName( widgetTypeName ){
        const entries = Object.entries(_WIDGET_TYPE_NAMES_FOR_I18N);
        let widgetTypeId = -1;
        for (const [sCurrentWidgetTypeId, currentWidgetTypeName] of entries  ) {
            if( currentWidgetTypeName === widgetTypeName ){
                widgetTypeId = parseInt( sCurrentWidgetTypeId );
                break;
            }
        }
        return widgetTypeId;
    }

    //!abstract
    importFromWidget_ver0_1( widget_ver0_1 ){
        throw new Error("Not implemented.");
    }

    getWidgetRelativePositionX(){
        return this._widgetRelativePositionX;
    }

    getWidgetRelativePositionY(){
        return this._widgetRelativePositionY;
    }

    getWidgetDatasAsParent(){
        return this._WidgetDatasAsParent;
    }

    setWidgetRelativePositionX( x ){
        this._widgetRelativePositionX = x;
    }

    setWidgetRelativePositionY( y ){
        this._widgetRelativePositionY= y;
    }

    setWidgetWidth( w ){
        this._widgetWidth = w;
    }

    setWidgetHeight( h ){
        this._widgetHeight = h;
    }

    getWidgetWidth(){
        return this._widgetWidth;
    }

    getWidgetHeight(){
        return this._widgetHeight;
    }

    getWidgetUuid(){
        return this._widgetUuid;
    }

}