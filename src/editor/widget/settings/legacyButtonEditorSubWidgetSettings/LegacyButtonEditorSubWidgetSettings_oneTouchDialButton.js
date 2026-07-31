import React from 'react';
import LegacyButtonEditorSubWidgetSettings from "./LegacyButtonEditorSubWidgetSettings";
import Form from "antd/lib/form";
import i18n from "../../../../i18n";
import {Select} from "antd";

export default class LegacyButtonEditorSubWidgetSettings_oneTouchDialButton extends LegacyButtonEditorSubWidgetSettings  {

    constructor( legacyButtonEditorWidgetSettingsAsParent, legacyButtonEditorSubWidgetData  ) {
        super(  legacyButtonEditorWidgetSettingsAsParent, legacyButtonEditorSubWidgetData  );
    }

    _onChangeLabel(label){
        //const label = e.currentTarget.value;
        this._LegacyButtonEditorSubWidgetData.setLabel( label  );
        this._LegacyButtonEditorWidgetSettingsAsParent.getEditScreenViewAsParent().commitEdit();
    }

    _onChangeNumber(e){
        const sNumber = e.currentTarget.value;
        this._LegacyButtonEditorSubWidgetData.setNumber( sNumber  );
        this._LegacyButtonEditorWidgetSettingsAsParent.getEditScreenViewAsParent().commitEdit();
    }

    _onChangeOnetouchdialMode(sOnetouchdialMode){
        //const sOnetouchdialMode = e.currentTarget.value;
        this._LegacyButtonEditorSubWidgetData.setOnetouchdialMode( sOnetouchdialMode  );
        this._LegacyButtonEditorWidgetSettingsAsParent.getEditScreenViewAsParent().commitEdit();
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

        //const iconSelectJsx = this._getIconSelectJsx();
        const iconSelectJsx = this._getSelectIconModalJsx();

        const subWidgetData = this._LegacyButtonEditorSubWidgetData;
        return  (
            <div className="brOCWidgetSettingsPanel">
                {this._renderIconField("icon", iconSelectJsx)}
                {this._renderNumberField("Icon_width", subWidgetData.getIconWidth(), (n) => this._onChangeIconWidth(n), {min: "0"})}
                {this._renderNumberField("Icon_height", subWidgetData.getIconHeight(), (n) => this._onChangeIconHeight(n), {min: "0"})}
                {this._renderTextAreaField("label", sLabel, (e) => this._onChangeLabel(e.target.value), {maxLength: 1000, style: {minHeight:68}, defaultValue: sLabel, rows: 3})}
                {this._renderTextField("number", sNumber, (e) => this._onChangeNumber(e), {allowClear: true, defaultValue: sNumber})}
                {this._renderSelectField("mode", onetouchdialMode, (e) => this._onChangeOnetouchdialMode(e), (
                    <>
                        <Select.Option value="callOnly">{i18n.t("callOnly")}</Select.Option>
                        <Select.Option value="attendedTransferOrCall">{i18n.t("attendedTransferOrCall")}</Select.Option>
                        <Select.Option value="blindTransferOrCall">{i18n.t("blindTransferOrCall")}</Select.Option>
                        <Select.Option value="attendedTransferOnly">{i18n.t("attendedTransferOnly")}</Select.Option>
                        <Select.Option value="blindTransferOnly">{i18n.t("blindTransferOnly")}</Select.Option>
                        <Select.Option value="selectTransferOrCall">{i18n.t("Select_transfer_or_make_a_new_call")}</Select.Option>
                    </>
                ))}
                {this._renderNumberField("Text_size", subWidgetData.getFontSize(), (n) => this._onChangeFontSize(n), {min: "0"})}
                {this._renderColorField("fgColor", subWidgetData.getFgColor(), (color) => this._onChangeFgColor(color))}
                {this._renderColorField("bgColor", subWidgetData.getBgColor(), (color) => this._onChangeBgColor(color))}
                {this._renderColorField("outerBorderColor", subWidgetData.getOuterBorderColor(), (color) => this._onChangeOuterBorderColor(color))}
                {this._renderNumberField("outerBorderRadius", subWidgetData.getOuterBorderRadius(), (n) => this._onChangeOuterBorderRadius(n), {min: "0"})}
                {this._renderNumberField("outerBorderThickness", subWidgetData.getOuterBorderThickness(), (n) => this._onChangeOuterBorderThickness(n), {min: "1"})}
            </div>
        );
    }

}