import LegacyButtonWidgetSubData from "./LegacyButtonWidgetSubData";

export default class LegacyButtonWidgetSubData_lineButton extends LegacyButtonWidgetSubData {

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
        this._line = currentOptions["line"];
    }

    //!override
    _setWidgetSubDataToObjectMain( o ){
        if( this._label ){
            o["label"] = this._label;
        }
        if( this._line ){
            o["line"] = this._line;
        }
    }

    setLabel( label ){
        this._label = label;
    }

    getLabel(){
        return this._label;
    }

    setLine( line ){
        this._line = line;
    }

    getLine(){
        return this._line;
    }

    //!override
    importLegacyButtonWidgetSubDataFromWidget_ver0_1( widget_ver0_1 ){
        if( widget_ver0_1.label ){
            this._label = widget_ver0_1.label;
        }
        if( widget_ver0_1.line ){
            this._line = widget_ver0_1.line;
        }
    }

}