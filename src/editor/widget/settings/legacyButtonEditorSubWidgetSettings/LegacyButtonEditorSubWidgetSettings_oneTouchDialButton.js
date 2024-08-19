import React from 'react';
import LegacyButtonEditorSubWidgetSettings from "./LegacyButtonEditorSubWidgetSettings";
import Form from "antd/lib/form";
import i18n from "../../../../i18n";
import Input from "antd/lib/input";
import {Select} from "antd";

export default class LegacyButtonEditorSubWidgetSettings_oneTouchDialButton extends LegacyButtonEditorSubWidgetSettings  {

    constructor( legacyButtonEditorWidgetSettingsAsParent, legacyButtonEditorSubWidgetData  ) {
        super(  legacyButtonEditorWidgetSettingsAsParent, legacyButtonEditorSubWidgetData  );
    }

    _onChangeLabel(e){
        const label = e.currentTarget.value;
        this._LegacyButtonEditorSubWidgetData.setLabel( label  );
        this._LegacyButtonEditorWidgetSettingsAsParent.getEditScreenViewAsParent().setState({rerender:true});
    }

    _onChangeNumber(e){
        const sNumber = e.currentTarget.value;
        this._LegacyButtonEditorSubWidgetData.setNumber( sNumber  );
        this._LegacyButtonEditorWidgetSettingsAsParent.getEditScreenViewAsParent().setState({rerender:true});
    }

    _onChangeOnetouchdialMode(sOnetouchdialMode){
        //const sOnetouchdialMode = e.currentTarget.value;
        this._LegacyButtonEditorSubWidgetData.setOnetouchdialMode( sOnetouchdialMode  );
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
        const sNumber = this._LegacyButtonEditorSubWidgetData.getNumber() ? this._LegacyButtonEditorSubWidgetData.getNumber() : "";
        const onetouchdialMode = this._LegacyButtonEditorSubWidgetData.getOnetouchdialMode() ? this._LegacyButtonEditorSubWidgetData.getOnetouchdialMode() : "callOnly";


        return  (
            <>
                <p>{i18n.t("label")}</p>
                <Input placeholder={i18n.t(`legacy_button_label.${subtypeName}`)} allowClear value={sLabel}
                       defaultValue={sLabel} onChange={(e) => this._onChangeLabel(e)}/>
                <p>{i18n.t("number")}</p>
                <Input allowClear value={sNumber}
                       defaultValue={sNumber} onChange={(e) => this._onChangeNumber(e)}/>
                <p>{i18n.t("mode")}</p>
                <Select
                    // onChange={(value) => {
                    // }}
                    style={{ width: "100%"}}
                    //placeholder="Please select a option"
                    value={onetouchdialMode}
                    defaultValue={onetouchdialMode}
                    onSelect={(e) => this._onChangeOnetouchdialMode(e)}
                >
                    <Select.Option value="callOnly">{i18n.t("callOnly")}</Select.Option>
                    <Select.Option value="attendedTransferOrCall">{i18n.t("attendedTransferOrCall")}</Select.Option>
                    <Select.Option value="blindTransferOrCall">{i18n.t("blindTransferOrCall")}</Select.Option>
                    <Select.Option value="attendedTransferOnly">{i18n.t("attendedTransferOnly")}</Select.Option>
                    <Select.Option value="blindTransferOnly">{i18n.t("blindTransferOnly")}</Select.Option>
                </Select>
            </>
        );
    }

}