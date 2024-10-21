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
        this._icon = options["icon"];
        this._iconWidth = options["iconWidth"];
        this._iconHeight = options["iconHeight"];
        this._fontSize = options["fontSize"];
        this._fgColor = options["fgColor"];
        this._bgColor = options["bgColor"];
        this._outerBorderColor = options["outerBorderColor"];
        this._outerBorderRadius = options["outerBorderRadius"];
        this._outerBorderThickness = options["outerBorderThickness"];

        this.setSubDataByOptions( legacyButtonWidgetSubDataOptions )
    }

    setSubDataByOptions( options ){
        options["legacyButtonWidgetDataAsParent"] = this;
        this._subData = LegacyButtonWidgetSubDataFactory.getLegacyButtonWidgetSubDataFactoryStaticInstance().newLegacyButtonWidgetSubDataInstance(options);
    }

    //!override
    setWidgetDataToObjectMain( o ){
        const oSubData = new Object();
        this._subData.setWidgetSubDataToObject( oSubData );
        o["legacyButtonWidgetSubDataOptions"] = oSubData;

        if( this._icon ){
            o["icon"] = this._icon;
        }
        else{
            delete o["icon"];
        }

        if( this._iconWidth ){
            o["iconWidth"] = this._iconWidth;
        }
        else{
            delete o["iconWidth"];
        }

        if( this._iconHeight ){
            o["iconHeight"] = this._iconHeight;
        }
        else{
            delete o["iconHeight"];
        }

        if( this._fontSize ){
            o["fontSize"] = this._fontSize;
        }
        else{
            delete o["fontSize"];
        }

        if( this._fgColor ){
            o["fgColor"] = this._fgColor;
        }
        else{
            delete o["fgColor"];
        }

        if( this._bgColor ){
            o["bgColor"] = this._bgColor;
        }
        else{
            delete o["bgColor"];
        }

        if( this._outerBorderColor ){
            o["outerBorderColor"] = this._outerBorderColor;
        }
        else{
            delete o["outerBorderColor"];
        }

        if( this._outerBorderRadius ){
            o["outerBorderRadius"] = this._outerBorderRadius;
        }
        else{
            delete o["outerBorderRadius"];
        }

        if( this._outerBorderThickness ){
            o["outerBorderThickness"] = this._outerBorderThickness;
        }
        else{
            delete o["outerBorderThickness"];
        }

    }

    setIcon( icon ){
        this._icon = icon;
    }

    getIcon(){
        return this._icon;
    }

    getIconWidth(){
        return this._iconWidth;
    }

    setIconWidth( n ){
        this._iconWidth = n;
    }

    getIconHeight(){
        return this._iconHeight;
    }

    setIconHeight( n ){
        this._iconHeight = n;
    }

    setFontSize( fontSize ){
        this._fontSize = fontSize;
    }

    getFontSize(){
        return this._fontSize;
    }

    getFgColor(){
        return this._fgColor;
    }

    setFgColor( color ){
        this._fgColor = color;
    }

    getBgColor(){
        return this._bgColor;
    }

    setBgColor( color ){
        this._bgColor = color;
    }

    getOuterBorderColor(){
        return this._outerBorderColor;
    }

    setOuterBorderColor( col ){
        this._outerBorderColor = col;
    }

    getOuterBorderRadius(){
        return this._outerBorderRadius;
    }

    setOuterBorderRadius( n ){
        this._outerBorderRadius = n;
    }

    getOuterBorderThickness(){
        return this._outerBorderThickness;
    }

    setOuterBorderThickness( n ){
        this._outerBorderThickness = n;
    }

    setSubDataBySubtypeId( subtypeId ){
        const options = new Object();
        options["legacyButtonWidgetDataAsParent"] = this;
        this._subData.setWidgetSubDataToObject( options );
        options["legacyButtonWidgetSubTypeId"] = subtypeId;
        this._subData = LegacyButtonWidgetSubDataFactory.getLegacyButtonWidgetSubDataFactoryStaticInstance().newLegacyButtonWidgetSubDataInstance(options);
        return this._subData;
    }

    getSubData(){
        return this._subData;
    }

    //!override
    importFromWidget_ver0_1(widget_ver0_1) {
        if( widget_ver0_1.icon ){
            this._icon = widget_ver0_1.icon;
        }
        if( widget_ver0_1.buttonBgColor ){
            this._bgColor = widget_ver0_1.buttonBgColor;
        }
        if( widget_ver0_1.buttonFgColor ){
            this._fgColor = widget_ver0_1.buttonFgColor;
        }
        if( widget_ver0_1.buttonOuterBorderColor ){
            this._outerBorderColor = widget_ver0_1.buttonOuterBorderColor;
        }
        if( widget_ver0_1.buttonOuterBorderRadius ){
            this._outerBorderRadius = widget_ver0_1.buttonOuterBorderRadius;
        }
        if( widget_ver0_1.buttonOuterBorderThickness ){
            this._outerBorderThickness = widget_ver0_1.buttonOuterBorderThickness;
        }

        const subtypeName = widget_ver0_1.subtype;
        const subtypeId = LegacyButtonWidgetSubData.getLegacyButtonWidgetSubtypeId( subtypeName );  //!forBug check null and return false(Import failed).   /!future
        const subData = this.setSubDataBySubtypeId(subtypeId);
        subData.importLegacyButtonWidgetSubDataFromWidget_ver0_1( widget_ver0_1 );
    }
}