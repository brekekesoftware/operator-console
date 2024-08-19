import LegacyButtonWidgetSubData from "./LegacyButtonWidgetSubData";

export default class LegacyButtonWidgetSubData_keypadButton extends LegacyButtonWidgetSubData {

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

        this._symbol = currentOptions["symbol"];
    }

    //!override
    _setWidgetSubDataToObjectMain( o ){
        if( this._symbol ){
            o["symbol"] = this._symbol;
        }
    }

    setSymbol( symbol ){
        this._symbol = symbol;
    }

    getSymbol(){
        return this._symbol;
    }

    //!override
    importLegacyButtonWidgetSubDataFromWidget_ver0_1( widget_ver0_1 ){
        if( widget_ver0_1.label ){
            this._label = widget_ver0_1.label;
        }
        if( widget_ver0_1.symbol ){
            this._symbol = widget_ver0_1.symbol
        }
    }

}