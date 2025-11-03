import React from 'react';
import LegacyButtonEditorSubWidgetSettings from "./LegacyButtonEditorSubWidgetSettings";
import Form from "antd/lib/form";
import i18n from "../../../../i18n";
import Input from "antd/lib/input";
import InputNumber from "antd/lib/input-number";
import {Colorpicker} from "antd-colorpicker";
import TextArea from "antd/es/input/TextArea";
import EditScreenView from "../../../EditScreenView";
import {Divider, Select} from "antd";

export default class LegacyButtonEditorSubWidgetSettings_autoDialButton extends LegacyButtonEditorSubWidgetSettings  {

    constructor( legacyButtonEditorWidgetSettingsAsParent, legacyButtonEditorSubWidgetData  ) {
        super(  legacyButtonEditorWidgetSettingsAsParent, legacyButtonEditorSubWidgetData  );
    }

    _onChangeLabel(label){
        //const label = e.currentTarget.value;
        this._LegacyButtonEditorSubWidgetData.setLabel( label  );
        this._LegacyButtonEditorWidgetSettingsAsParent.getEditScreenViewAsParent().setState({rerender:true});
    }
	
	_onChangeAutoDialTableHeaderFontSize(n){
        const cloneSystemSettingsData = EditScreenView.getEditScreenViewInstance().getCloneSystemSettingsData();
		cloneSystemSettingsData.setAutoDialTableHeaderFontSize(n);
        this._LegacyButtonEditorWidgetSettingsAsParent.getEditScreenViewAsParent().setState({rerender:true});
	}

	_onChangeAutoDialTableBodyFontSize(n){
        const cloneSystemSettingsData = EditScreenView.getEditScreenViewInstance().getCloneSystemSettingsData();
		cloneSystemSettingsData.setAutoDialTableBodyFontSize(n);
        this._LegacyButtonEditorWidgetSettingsAsParent.getEditScreenViewAsParent().setState({rerender:true});
	}
	
	_onChangeSwitchSize( s ){
        const cloneSystemSettingsData = EditScreenView.getEditScreenViewInstance().getCloneSystemSettingsData();
		cloneSystemSettingsData.setAutoDialSwitchSize(s);
        this._LegacyButtonEditorWidgetSettingsAsParent.getEditScreenViewAsParent().setState({rerender:true});
    }

    _onChangeLampSize( n ){
        const cloneSystemSettingsData = EditScreenView.getEditScreenViewInstance().getCloneSystemSettingsData();
        cloneSystemSettingsData.setAutoDialLampSize(n);
        this._LegacyButtonEditorWidgetSettingsAsParent.getEditScreenViewAsParent().setState({rerender:true});
    }

    _onChangeAutoDialIconSize(n){
        const cloneSystemSettingsData = EditScreenView.getEditScreenViewInstance().getCloneSystemSettingsData();
        cloneSystemSettingsData.setAutoDialIconSize(n);
        this._LegacyButtonEditorWidgetSettingsAsParent.getEditScreenViewAsParent().setState({rerender:true});
    }

    _onChangeAutoDialButtonSize(n){
        const cloneSystemSettingsData = EditScreenView.getEditScreenViewInstance().getCloneSystemSettingsData();
        cloneSystemSettingsData.setAutoDialButtonSize(n);
        this._LegacyButtonEditorWidgetSettingsAsParent.getEditScreenViewAsParent().setState({rerender:true});
    }

    _onChangeAutoDialInputFieldHeight(n){
        const cloneSystemSettingsData = EditScreenView.getEditScreenViewInstance().getCloneSystemSettingsData();
        cloneSystemSettingsData.setAutoDialInputFieldHeight(n);
        this._LegacyButtonEditorWidgetSettingsAsParent.getEditScreenViewAsParent().setState({rerender:true});
    }

    _onChangeAutoDialInputFieldFontSize(n){
        const cloneSystemSettingsData = EditScreenView.getEditScreenViewInstance().getCloneSystemSettingsData();
        cloneSystemSettingsData.setAutoDialInputFieldFontSize(n);
        this._LegacyButtonEditorWidgetSettingsAsParent.getEditScreenViewAsParent().setState({rerender:true});
    }

    _onChangeAutoDialTabFontSize(n){
        const cloneSystemSettingsData = EditScreenView.getEditScreenViewInstance().getCloneSystemSettingsData();
        cloneSystemSettingsData.setAutoDialTabFontSize(n);
        this._LegacyButtonEditorWidgetSettingsAsParent.getEditScreenViewAsParent().setState({rerender:true});
    }

    _onChangeAutoDialOtherFontSize(n){
        const cloneSystemSettingsData = EditScreenView.getEditScreenViewInstance().getCloneSystemSettingsData();
        cloneSystemSettingsData.setAutoDialOtherFontSize(n);
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
        //const iconSelectJsx = this._getIconSelectJsx();
        const iconSelectJsx = this._getSelectIconModalJsx();

        const subWidgetData = this._LegacyButtonEditorSubWidgetData;

        const cloneSystemSettingsData = EditScreenView.getEditScreenViewInstance().getCloneSystemSettingsData();
		let switchSize = cloneSystemSettingsData.getAutoDialSwitchSize();
        if( !switchSize ){
            switchSize = "";
        }
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
                <TextArea maxLength={1000} style={{minHeight: 68}}
                    /* placeholder={i18n.t("label")} */
                    /* allowClear */
                          value={sLabel}
                          defaultValue={sLabel}
                          rows={3}
                          onChange={(e) => this._onChangeLabel(e.target.value)}
                />
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
                <Divider>{i18n.t("View")}</Divider>
                <p>{i18n.t("Tab_font_size")}</p>
                <InputNumber min={0} value={cloneSystemSettingsData.getAutoDialTabFontSize()}
                             onChange={(n) => this._onChangeAutoDialTabFontSize(n)}/>
                <p>{i18n.t("TableHeaderTextSize")}</p>
                <InputNumber min={0} value={cloneSystemSettingsData.getAutoDialTableHeaderFontSize()}
                             onChange={(n) => this._onChangeAutoDialTableHeaderFontSize(n)}/>
                <p>{i18n.t("TableBodyTextSize")}</p>
                <InputNumber min={0} value={cloneSystemSettingsData.getAutoDialTableBodyFontSize()}
                             onChange={(n) => this._onChangeAutoDialTableBodyFontSize(n)}/>
                <p>{i18n.t("Lamp_size")}</p>
                <InputNumber min={0} value={cloneSystemSettingsData.getAutoDialLampSize()}
                             onChange={(n) => this._onChangeLampSize(n)}/>
                <p>{i18n.t("Icon_size")}</p>
                <InputNumber min={0} value={cloneSystemSettingsData.getAutoDialIconSize()}
                             onChange={(n) => this._onChangeAutoDialIconSize(n)}/>
                <p>{i18n.t("Input_field_height")}</p>
                <InputNumber min={0} value={cloneSystemSettingsData.getAutoDialInputFieldHeight()}
                             onChange={(n) => this._onChangeAutoDialInputFieldHeight(n)}/>
                <p>{i18n.t("Input_field_font_size")}</p>
                <InputNumber min={0} value={cloneSystemSettingsData.getAutoDialInputFieldFontSize()}
                             onChange={(n) => this._onChangeAutoDialInputFieldFontSize(n)}/>
                <p>{i18n.t("Button_size")}</p>
                <InputNumber min={0} value={cloneSystemSettingsData.getAutoDialButtonSize()}
                             onChange={(n) => this._onChangeAutoDialButtonSize(n)}/>
                <p>{i18n.t("SwitchSize")}</p>
                <Select
                    // onChange={(value) => {
                    // }}
                    style={{width: "100%"}}
                    //placeholder="Please select a option"
                    value={switchSize}
                    defaultValue={switchSize}
                    onSelect={(e) => this._onChangeSwitchSize(e)}
                >
                    <Select.Option value={""}>{i18n.t("Default")}</Select.Option>
                    <Select.Option value="small">{i18n.t("Small")}</Select.Option>
                </Select>
                <p>{i18n.t("Other_font_sizes")}</p>
                <InputNumber min={0} value={cloneSystemSettingsData.getAutoDialOtherFontSize()}
                             onChange={(n) => this._onChangeAutoDialOtherFontSize(n)}/>
            </>
        );
    }

}