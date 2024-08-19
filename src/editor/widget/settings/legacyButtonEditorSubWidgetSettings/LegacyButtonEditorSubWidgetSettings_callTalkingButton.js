import React from 'react';
import LegacyButtonEditorSubWidgetSettings from "./LegacyButtonEditorSubWidgetSettings";
import Form from "antd/lib/form";
import i18n from "../../../../i18n";
import Input from "antd/lib/input";
import BrekekeOperatorConsole from "../../../../index";

export default class LegacyButtonEditorSubWidgetSettings_callTalkingButton extends LegacyButtonEditorSubWidgetSettings  {

    constructor( legacyButtonEditorWidgetSettingsAsParent, legacyButtonEditorSubWidgetData  ) {
        super(  legacyButtonEditorWidgetSettingsAsParent, legacyButtonEditorSubWidgetData  );
    }

    _onChangeLabel(e){
        const label = e.currentTarget.value;
        this._LegacyButtonEditorSubWidgetData.setLabel( label  );
        this._LegacyButtonEditorWidgetSettingsAsParent.getEditScreenViewAsParent().setState({rerender:true});
    }

    //!override
    getRenderJsx() {
        const subtypeName = this._LegacyButtonEditorSubWidgetData.getLegacyButtonWidgetSubTypeName();
        let  sLabel;
        if( this._LegacyButtonEditorSubWidgetData.getLabel() ){
            sLabel = this._LegacyButtonEditorSubWidgetData.getLabel();
        }
        else{
            sLabel = "";
        }

        return  (
            <>
                <p>{i18n.t("label")}</p>
                <Input placeholder={i18n.t(`legacy_button_label.${subtypeName}`)} allowClear value={sLabel} defaultValue={sLabel} onChange={ (e) => this._onChangeLabel(e) } />
            </>
        );
    }


}