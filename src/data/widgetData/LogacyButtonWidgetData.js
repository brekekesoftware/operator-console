import WidgetData from "./WidgetData";
import LegacyButtonWidgetSubDataFactory from "./legacyButtonWidgetSubData/LegacyButtonWidgetSubDataFactory";
import LegacyButtonWidgetSubData from "./legacyButtonWidgetSubData/LegacyButtonWidgetSubData";

export default class LegacyButtonWidgetData extends WidgetData{
    constructor( options ) {
        super( options );
        let legacyButtonWidgetSubDataOptions = options["legacyButtonWidgetSubDataOptions"];
        // if( !legacyButtonWidgetSubDataOptions && options["oWidgetData"] ){
        //     legacyButtonWidgetSubDataOptions = options["oWidgetData"]["legacyButtonWidgetSubDataOptions"];
        // }

        if( !legacyButtonWidgetSubDataOptions ){
            legacyButtonWidgetSubDataOptions = {
                legacyButtonWidgetSubTypeId : LegacyButtonWidgetSubData.LEGACY_BUTTON_WIDGET_SUBTYPE_IDS.dummy
            };
        }

        // let currentOptions;
        // if( options["oWidgetData"] ){
        //     currentOptions = options["oWidgetData"];
        // }
        // else{
        //     currentOptions = options;
        // }
        //
        //
        // this._icon = currentOptions["icon"];
        const dataVersion = options["dataVersion"];
        this.setSubDataByOptions( options, legacyButtonWidgetSubDataOptions, dataVersion );
    }

    setSubDataByOptions( options, subDataOptions, dataVersion = null ){
        subDataOptions["legacyButtonWidgetDataAsParent"] = this;
        this._subData = LegacyButtonWidgetSubDataFactory.getLegacyButtonWidgetSubDataFactoryStaticInstance().newLegacyButtonWidgetSubDataInstance( options, subDataOptions, dataVersion );
    }

    //!override
    setWidgetDataToObjectMain( o ){
        const oSubData = new Object();
        this._subData.setWidgetSubDataToObject( oSubData );
        o["legacyButtonWidgetSubDataOptions"] = oSubData;
    }



    setSubDataBySubtypeId( subtypeId ){
        const subDataOptions = new Object();
        subDataOptions["legacyButtonWidgetDataAsParent"] = this;
        this._subData.setWidgetSubDataToObject( subDataOptions );
        subDataOptions["legacyButtonWidgetSubTypeId"] = subtypeId;
        const dataOptions = null;
        const dataVersion = null;
        this._subData = LegacyButtonWidgetSubDataFactory.getLegacyButtonWidgetSubDataFactoryStaticInstance().newLegacyButtonWidgetSubDataInstance( dataOptions, subDataOptions, dataVersion );
        return this._subData;
    }

    getSubData(){
        return this._subData;
    }

    //!override
    importFromWidget_ver0_1(widget_ver0_1) {
        const subtypeName = widget_ver0_1.subtype;
        const subtypeId = LegacyButtonWidgetSubData.getLegacyButtonWidgetSubtypeId( subtypeName );  //!forBug check null and return false(Import failed).   /!future
        const subData = this.setSubDataBySubtypeId(subtypeId);
        subData.importLegacyButtonWidgetSubDataFromWidget_ver0_1( widget_ver0_1 );
    }
}