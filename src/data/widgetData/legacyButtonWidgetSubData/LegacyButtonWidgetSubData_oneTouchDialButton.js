import LegacyButtonWidgetSubData from "./LegacyButtonWidgetSubData";

export default class LegacyButtonWidgetSubData_oneTouchDialButton extends LegacyButtonWidgetSubData {

    constructor( options ) {
        super(  options );

        let currentOptions;
        const oSubData = options["legacyButtonWidgetSubDataObject"];
        if( oSubData  ){
            currentOptions = oSubData["legacyButtonWidgetSubTypeId"];
        }
        else {
            currentOptions = options;
        }

        this._label = currentOptions["label"];
        this._number = currentOptions["number"];
        this._onetouchdialMode = currentOptions["onetouchdialMode"];
    }

    //!override
    _setWidgetSubDataToObjectMain( o ){
        if( this._label ){
            o["label"] = this._label;
        }
        if( this._number ){
            o["number"] = this._number;
        }
        if( this._onetouchdialMode ){
            o["onetouchdialMode"] = this._onetouchdialMode;
        }

    }

    setLabel( label ){
        this._label = label;
    }

    getLabel(){
        return this._label;
    }

    setNumber( s ){
        this._number = s;
    }

    getNumber(){
        return this._number;
    }

    setOnetouchdialMode( s ){
        this._onetouchdialMode = s;
    }

    getOnetouchdialMode(){
        return this._onetouchdialMode;
    }

    //!override
    importLegacyButtonWidgetSubDataFromWidget_ver0_1( widget_ver0_1 ){
        if( widget_ver0_1.label ){
            this._label = widget_ver0_1.label;
        }
        if( widget_ver0_1.number ){
            this._number = widget_ver0_1.number;
        }
        if( widget_ver0_1.onetouchdialMode ){
            this._onetouchdialMode = widget_ver0_1.onetouchdialMode;
        }

    }
}