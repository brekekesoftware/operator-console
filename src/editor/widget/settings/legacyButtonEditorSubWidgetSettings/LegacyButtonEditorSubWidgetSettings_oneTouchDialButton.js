import React from 'react';
import LegacyButtonEditorSubWidgetSettings from "./LegacyButtonEditorSubWidgetSettings";
import Form from "antd/lib/form";
import i18n from "../../../../i18n";
import Input from "antd/lib/input";
import {Select} from "antd";
import InputNumber from "antd/lib/input-number";
import {Colorpicker} from "antd-colorpicker";

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

        const iconSelectJsx = this._getIconSelectJsx();
        const subWidgetData = this._LegacyButtonEditorSubWidgetData;
        return  (
            <>
                <p>{i18n.t("icon")}</p>
                {iconSelectJsx}
                <p>{i18n.t("Icon_width")}</p>
                <InputNumber min="0" value={subWidgetData.getIconWidth()}
                             onChange={(n) => this._onChangeIconWidth(n)}/>
                <p>{i18n.t("Icon_height")}</p>
                <InputNumber min="0" value={subWidgetData.getIconHeight()}
                             onChange={(n) => this._onChangeIconHeight(n)}/>
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
                    style={{width: "100%"}}
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
                <p>{i18n.t("Text_size")}</p>
                <InputNumber min="0" value={subWidgetData.getFontSize()}
                             onChange={(n) => this._onChangeFontSize(n)}/>
                <p>{i18n.t("fgColor")}</p>
                <Colorpicker format="rgb" value={subWidgetData.getFgColor()}
                             onChange={(color) => this._onChangeFgColor(color)}/>
                <p>{i18n.t("bgColor")}</p>
                <Colorpicker format="rgb" value={subWidgetData.getBgColor()}
                             onChange={(color) => this._onChangeBgColor(color)}/>
                <p>{i18n.t("outerBorderColor")}</p>
                <Colorpicker format="rgb" value={subWidgetData.getOuterBorderColor()}
                             onChange={(color) => this._onChangeOuterBorderColor(color)}/>
                <p>{i18n.t("outerBorderRadius")}</p>
                <InputNumber min="0" value={subWidgetData.getOuterBorderRadius()}
                             onChange={(n) => this._onChangeOuterBorderRadius(n)}/>
                <p>{i18n.t("outerBorderThickness")}</p>
                <InputNumber min="1" value={subWidgetData.getOuterBorderThickness()}
                             onChange={(n) => this._onChangeOuterBorderThickness(n)}/>
            </>
        );
    }

}