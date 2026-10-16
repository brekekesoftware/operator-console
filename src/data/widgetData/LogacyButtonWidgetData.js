import WidgetData from "./WidgetData";
import LegacyButtonWidgetSubDataFactory from "./legacyButtonWidgetSubData/LegacyButtonWidgetSubDataFactory";
import LegacyButtonWidgetSubData from "./legacyButtonWidgetSubData/LegacyButtonWidgetSubData";

export default class LegacyButtonWidgetData extends WidgetData{
    constructor( options ) {
        super( options );
        this._tooltipOfButtonWidget_ja = options["tooltipOfButtonWidget_ja"];
        this._tooltipOfButtonWidget_en = options["tooltipOfButtonWidget_en"];

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
        this._setSubDataByOptions( options, legacyButtonWidgetSubDataOptions, dataVersion );
    }

    _setSubDataByOptions( options, subDataOptions, dataVersion = null ){
        subDataOptions["legacyButtonWidgetDataAsParent"] = this;
        this._subData = LegacyButtonWidgetSubDataFactory.getLegacyButtonWidgetSubDataFactoryStaticInstance().newLegacyButtonWidgetSubDataInstance( options, subDataOptions, dataVersion );
    }

    //!override
    setWidgetDataToObjectMain( o ){
        if( this._tooltipOfButtonWidget_en == undefined || this._tooltipOfButtonWidget_en === null  ){
            delete o["tooltipOfButtonWidget_en"];
        }
        else{
            o["tooltipOfButtonWidget_en"] = this._tooltipOfButtonWidget_en;
        }

        if( this._tooltipOfButtonWidget_ja == undefined || this._tooltipOfButtonWidget_ja === null  ){
            delete o["tooltipOfButtonWidget_ja"];
        }
        else{
            o["tooltipOfButtonWidget_ja"] = this._tooltipOfButtonWidget_ja;
        }

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

    setTooltipOfButtonWidget_en( tooltipOfButtonWidget_en ){
        this._tooltipOfButtonWidget_en = tooltipOfButtonWidget_en;
    }

    getTooltipOfButtonWidget_en(){
        return this._tooltipOfButtonWidget_en;
    }

    setTooltipOfButtonWidget_ja( tooltipOfButtonWidget_ja ){
        this._tooltipOfButtonWidget_ja = tooltipOfButtonWidget_ja;
    }

    getTooltipOfButtonWidget_ja(){
        return this._tooltipOfButtonWidget_ja;
    }
	
	getTooltipOfButtonWidget( language ){
		//!depend language //!modify language //!sync language
		let tooltipOfButtonWidget;
		if( language === "ja" ){
			tooltipOfButtonWidget = this._tooltipOfButtonWidget_ja;
		}
		else{
			tooltipOfButtonWidget = this._tooltipOfButtonWidget_en;
		}
		
        return tooltipOfButtonWidget;
    }
	
	setTooltipOfButtonWidget( s, language ){
       //!depend language //!modify language //!sync language
		if( language === "ja" ){
			this._tooltipOfButtonWidget_ja = s;
		}
		else{
			this._tooltipOfButtonWidget_en = s;
		}
	}

    //Override
    loadFromWidgetSettingsTemplateMain( wst ) {
        const bIncludeButtonFunction = true;
        this.loadFromWidgetSettingsTemplate( wst , bIncludeButtonFunction );
    }

    loadFromWidgetSettingsTemplateMain( wst, bIncludeButtonFunction = undefined ){
        if( bIncludeButtonFunction === true ){
            const subTypeId = wst.getWidgetSettingsTemplateFieldValue( WidgetData.WIDGET_FIELD_NAME__LEGACY_BUTTON_WIDGET_SUB_TYPE_ID);
            this.setSubDataBySubtypeId( subTypeId );
        }
        if( wst.isWidgetSettingsTemplateFieldExists( WidgetData.WIDGET_FIELD_NAME_TOOLTIP_EN ) === true ) {
            this._tooltipOfButtonWidget_en = wst.getWidgetSettingsTemplateFieldValue(WidgetData.WIDGET_FIELD_NAME_TOOLTIP_EN);
        }
        if( wst.isWidgetSettingsTemplateFieldExists( WidgetData.WIDGET_FIELD_NAME_TOOLTIP_JA ) === true ) {
            this._tooltipOfButtonWidget_ja = wst.getWidgetSettingsTemplateFieldValue(WidgetData.WIDGET_FIELD_NAME_TOOLTIP_JA);
        }

        this._subData.importLegacyButtonWidgetSubDataFromWidgetSettingsTemplate( wst );

    }

    //!override
    saveToWidgetSettingsTemplateMain( wst, editorWidgetSettings ){
        const subTypeId = this.getSubData().getLegacyButtonWidgetSubTypeId();
        wst.setWidgetSettingsTemplateField( WidgetData.WIDGET_FIELD_NAME__LEGACY_BUTTON_WIDGET_SUB_TYPE_ID, subTypeId );
        wst.setWidgetSettingsTemplateField( WidgetData.WIDGET_FIELD_NAME_TOOLTIP_EN, this._tooltipOfButtonWidget_en );
        wst.setWidgetSettingsTemplateField( WidgetData.WIDGET_FIELD_NAME_TOOLTIP_JA, this._tooltipOfButtonWidget_ja );
        this._subData.exportLegacyButtonWidgetSubDataToWidgetSettingsTemplate( wst, editorWidgetSettings  );
    }
}