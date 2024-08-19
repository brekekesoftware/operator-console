import LegacyButtonWidgetSubData from "./LegacyButtonWidgetSubData";

export default class LegacyButtonWidgetSubData_outgoingCallButton extends LegacyButtonWidgetSubData {

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
    }

    //!override
    _setWidgetSubDataToObjectMain( o ){
        if( this._label ){
            o["label"] = this._label;
        }
    }

    setLabel( label ){
        this._label = label;
    }

    getLabel(){
        return this._label;
    }

    //!override
    importLegacyButtonWidgetSubDataFromWidget_ver0_1( widget_ver0_1 ){
        if( widget_ver0_1.label ){
            this._label = widget_ver0_1.label;
        }
    }

}