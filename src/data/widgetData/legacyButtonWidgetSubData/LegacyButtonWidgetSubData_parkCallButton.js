import LegacyButtonWidgetSubData from "./LegacyButtonWidgetSubData";

export default class LegacyButtonWidgetSubData_parkCallButton extends LegacyButtonWidgetSubData {

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
    }

    //!override
    _setWidgetSubDataToObjectMain( o ){
        if( this._label ){
            o["label"] = this._label;
        }
        if( this._number ){
            o["number"] = this._number;
        }
    }

    setLabel( label ){
        this._label = label;
    }

    getLabel(){
        return this._label;
    }

    setNumber( number ){
        this._number = number;
    }

    getNumber(){
        return this._number;
    }

    //!override
    importLegacyButtonWidgetSubDataFromWidget_ver0_1( widget_ver0_1 ){
        if( widget_ver0_1.label ){
            this._label = widget_ver0_1.label;
        }
        if( widget_ver0_1.number ){
            this._number = widget_ver0_1.number;
        }
    }
}