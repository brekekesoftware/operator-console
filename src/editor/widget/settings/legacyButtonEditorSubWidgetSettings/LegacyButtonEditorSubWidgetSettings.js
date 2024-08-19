//!abstract
export default class LegacyButtonEditorSubWidgetSettings{
    constructor( legacyButtonEditorWidgetSettingsAsParent, legacyButtonEditorSubWidgetData  ) {
        this._LegacyButtonEditorWidgetSettingsAsParent = legacyButtonEditorWidgetSettingsAsParent;
        this._LegacyButtonEditorSubWidgetData = legacyButtonEditorSubWidgetData;
    }

    //!abstract
    getRenderJsx(){
        throw new Error("Not implemented.");
    }

}