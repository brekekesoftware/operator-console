import React from 'react';
import LegacyButtonEditorSubWidgetSettings from "./LegacyButtonEditorSubWidgetSettings";
import Form from "antd/lib/form";
import i18n from "../../../../i18n";
import EditScreenView from "../../../EditScreenView";
import {Button, Select} from "antd";
import EditorAutoDialView_ver2 from "../../../EditorAutoDialView_ver2";

export default class LegacyButtonEditorSubWidgetSettings_autoDialButton extends LegacyButtonEditorSubWidgetSettings  {

    constructor( legacyButtonEditorWidgetSettingsAsParent, legacyButtonEditorSubWidgetData  ) {
        super(  legacyButtonEditorWidgetSettingsAsParent, legacyButtonEditorSubWidgetData  );
    }


    //!override
    onLegacyButtonEditorSubWidgetSettingsChangedOther(){
        super.onLegacyButtonEditorSubWidgetSettingsChangedOther();
        const editScreenView = EditorAutoDialView_ver2.getStaticInstance();
        const b = editScreenView.trySetInvisible(this);
        console.log("LegacyButtonEditorSubWidgetSettings_autoDialButton:componentWillUnmount. trySetInvisible="+ b );
    }

    _onChangeLabel(label){
        //const label = e.currentTarget.value;
        this._LegacyButtonEditorSubWidgetData.setLabel( label  );
        this._LegacyButtonEditorWidgetSettingsAsParent.getEditScreenViewAsParent().commitEdit();
    }
	
	_onChangeAutoDialTableHeaderFontSize(n){
        const cloneSystemSettingsData = EditScreenView.getEditScreenViewInstance().getCloneSystemSettingsData();
		cloneSystemSettingsData.setAutoDialTableHeaderFontSize(n);
        this._LegacyButtonEditorWidgetSettingsAsParent.getEditScreenViewAsParent().commitEdit();
	}

	_onChangeAutoDialTableBodyFontSize(n){
        const cloneSystemSettingsData = EditScreenView.getEditScreenViewInstance().getCloneSystemSettingsData();
		cloneSystemSettingsData.setAutoDialTableBodyFontSize(n);
        this._LegacyButtonEditorWidgetSettingsAsParent.getEditScreenViewAsParent().commitEdit();
	}
	
	_onChangeSwitchSize( s ){
        const cloneSystemSettingsData = EditScreenView.getEditScreenViewInstance().getCloneSystemSettingsData();
		cloneSystemSettingsData.setAutoDialSwitchSize(s);
        this._LegacyButtonEditorWidgetSettingsAsParent.getEditScreenViewAsParent().commitEdit();
    }

    _onChangeLampSize( n ){
        const cloneSystemSettingsData = EditScreenView.getEditScreenViewInstance().getCloneSystemSettingsData();
        cloneSystemSettingsData.setAutoDialLampSize(n);
        this._LegacyButtonEditorWidgetSettingsAsParent.getEditScreenViewAsParent().commitEdit();
    }

    _onChangeAutoDialIconSize(n){
        const cloneSystemSettingsData = EditScreenView.getEditScreenViewInstance().getCloneSystemSettingsData();
        cloneSystemSettingsData.setAutoDialIconSize(n);
        this._LegacyButtonEditorWidgetSettingsAsParent.getEditScreenViewAsParent().commitEdit();
    }

    _onChangeAutoDialButtonSize(n){
        const cloneSystemSettingsData = EditScreenView.getEditScreenViewInstance().getCloneSystemSettingsData();
        cloneSystemSettingsData.setAutoDialButtonSize(n);
        this._LegacyButtonEditorWidgetSettingsAsParent.getEditScreenViewAsParent().commitEdit();
    }

    _onChangeAutoDialInputFieldHeight(n){
        const cloneSystemSettingsData = EditScreenView.getEditScreenViewInstance().getCloneSystemSettingsData();
        cloneSystemSettingsData.setAutoDialInputFieldHeight(n);
        this._LegacyButtonEditorWidgetSettingsAsParent.getEditScreenViewAsParent().commitEdit();
    }

    _onChangeAutoDialInputFieldFontSize(n){
        const cloneSystemSettingsData = EditScreenView.getEditScreenViewInstance().getCloneSystemSettingsData();
        cloneSystemSettingsData.setAutoDialInputFieldFontSize(n);
        this._LegacyButtonEditorWidgetSettingsAsParent.getEditScreenViewAsParent().commitEdit();
    }

    _onChangeAutoDialTabFontSize(n){
        const cloneSystemSettingsData = EditScreenView.getEditScreenViewInstance().getCloneSystemSettingsData();
        cloneSystemSettingsData.setAutoDialTabFontSize(n);
        this._LegacyButtonEditorWidgetSettingsAsParent.getEditScreenViewAsParent().commitEdit();
    }

    _onChangeAutoDialOtherFontSize(n){
        const cloneSystemSettingsData = EditScreenView.getEditScreenViewInstance().getCloneSystemSettingsData();
        cloneSystemSettingsData.setAutoDialOtherFontSize(n);
        this._LegacyButtonEditorWidgetSettingsAsParent.getEditScreenViewAsParent().commitEdit();
    }
	
	getAutoDialInputFieldFontSize(){
        const cloneSystemSettingsData = EditScreenView.getEditScreenViewInstance().getCloneSystemSettingsData();
		const n = cloneSystemSettingsData.getAutoDialInputFieldFontSize();
		return n;
	}
	
	getAutoDialTableHeaderFontSize(){
        const cloneSystemSettingsData = EditScreenView.getEditScreenViewInstance().getCloneSystemSettingsData();
		const n = cloneSystemSettingsData.getAutoDialTableHeaderFontSize();
		return n;
	}
	
	getAutoDialTableBodyFontSize(){
        const cloneSystemSettingsData = EditScreenView.getEditScreenViewInstance().getCloneSystemSettingsData();
		const n = cloneSystemSettingsData.getAutoDialTableBodyFontSize();
		return n;
	}
	
	getAutoDialSwitchSize(){
        const cloneSystemSettingsData = EditScreenView.getEditScreenViewInstance().getCloneSystemSettingsData();
		const n = cloneSystemSettingsData.getAutoDialSwitchSize();
		return n;
	}

	getAutoDialLampSize(){
        const cloneSystemSettingsData = EditScreenView.getEditScreenViewInstance().getCloneSystemSettingsData();
		const n = cloneSystemSettingsData.getAutoDialLampSize();
		return n;
	}
	
	getAutoDialIconSize(){
        const cloneSystemSettingsData = EditScreenView.getEditScreenViewInstance().getCloneSystemSettingsData();
		const n = cloneSystemSettingsData.getAutoDialIconSize();
		return n;
	}
	
	getAutoDialIconSize(){
        const cloneSystemSettingsData = EditScreenView.getEditScreenViewInstance().getCloneSystemSettingsData();
		const n = cloneSystemSettingsData.getAutoDialIconSize();
		return n;
	}
	
	getAutoDialButtonSize(){
        const cloneSystemSettingsData = EditScreenView.getEditScreenViewInstance().getCloneSystemSettingsData();
		const n = cloneSystemSettingsData.getAutoDialButtonSize();
		return n;
	}

	getAutoDialOtherFontSize(){
        const cloneSystemSettingsData = EditScreenView.getEditScreenViewInstance().getCloneSystemSettingsData();
		const n = cloneSystemSettingsData.getAutoDialOtherFontSize();
		return n;
	}
	
	getAutoDialTabFontSize(){
        const cloneSystemSettingsData = EditScreenView.getEditScreenViewInstance().getCloneSystemSettingsData();
		const n = cloneSystemSettingsData.getAutoDialTabFontSize();
		return n;
	}

	getAutoDialInputFieldHeight(){
        const cloneSystemSettingsData = EditScreenView.getEditScreenViewInstance().getCloneSystemSettingsData();
		const n = cloneSystemSettingsData.getAutoDialInputFieldHeight();
		return n;
	}

    _onClickShowPreviewButton(){
        const editorAutoDialView = EditorAutoDialView_ver2.getStaticInstance();
        const b = editorAutoDialView.trySetVisible(this);
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
            <div className="brOCWidgetSettingsPanel">
                {this._renderIconField("icon", iconSelectJsx)}
                {this._renderNumberField("Icon_width", subWidgetData.getIconWidth(), (n) => this._onChangeIconWidth(n), {min: "0"})}
                {this._renderNumberField("Icon_height", subWidgetData.getIconHeight(), (n) => this._onChangeIconHeight(n), {min: "0"})}
                {this._renderTextAreaField("label", sLabel, (e) => this._onChangeLabel(e.target.value), {maxLength: 1000, style: {minHeight: 68}, defaultValue: sLabel, rows: 3})}
                {this._renderNumberField("Text_size", subWidgetData.getFontSize(), (n) => this._onChangeFontSize(n), {min: "0"})}
                {this._renderColorField("fgColor", subWidgetData.getFgColor(), (color) => this._onChangeFgColor(color))}
                {this._renderColorField("bgColor", subWidgetData.getBgColor(), (color) => this._onChangeBgColor(color))}
                {this._renderColorField("outerBorderColor", subWidgetData.getOuterBorderColor(), (color) => this._onChangeOuterBorderColor(color))}
                {this._renderNumberField("outerBorderRadius", subWidgetData.getOuterBorderRadius(), (n) => this._onChangeOuterBorderRadius(n), {min: "0"})}
                {this._renderNumberField("outerBorderThickness", subWidgetData.getOuterBorderThickness(), (n) => this._onChangeOuterBorderThickness(n), {min: "1"})}
                <p className="brOCSettingsSectionHeading">{i18n.t("View")}</p>
                {this._renderNumberField("Tab_font_size", cloneSystemSettingsData.getAutoDialTabFontSize(), (n) => this._onChangeAutoDialTabFontSize(n), {min: 0})}
                {this._renderNumberField("TableHeaderTextSize", cloneSystemSettingsData.getAutoDialTableHeaderFontSize(), (n) => this._onChangeAutoDialTableHeaderFontSize(n), {min: 0})}
                {this._renderNumberField("TableBodyTextSize", cloneSystemSettingsData.getAutoDialTableBodyFontSize(), (n) => this._onChangeAutoDialTableBodyFontSize(n), {min: 0})}
                {this._renderNumberField("Lamp_size", cloneSystemSettingsData.getAutoDialLampSize(), (n) => this._onChangeLampSize(n), {min: 0})}
                {this._renderNumberField("Icon_size", cloneSystemSettingsData.getAutoDialIconSize(), (n) => this._onChangeAutoDialIconSize(n), {min: 0})}
                {this._renderNumberField("Input_field_height", cloneSystemSettingsData.getAutoDialInputFieldHeight(), (n) => this._onChangeAutoDialInputFieldHeight(n), {min: 0})}
                {this._renderNumberField("Input_field_font_size", cloneSystemSettingsData.getAutoDialInputFieldFontSize(), (n) => this._onChangeAutoDialInputFieldFontSize(n), {min: 0})}
                {this._renderNumberField("Button_size", cloneSystemSettingsData.getAutoDialButtonSize(), (n) => this._onChangeAutoDialButtonSize(n), {min: 0})}
                {this._renderSelectField("SwitchSize", switchSize, (e) => this._onChangeSwitchSize(e), (
                    <>
                        <Select.Option value={""}>{i18n.t("Default")}</Select.Option>
                        <Select.Option value="small">{i18n.t("Small")}</Select.Option>
                    </>
                ))}
                {this._renderNumberField("Other_font_sizes", cloneSystemSettingsData.getAutoDialOtherFontSize(), (n) => this._onChangeAutoDialOtherFontSize(n), {min: 0})}
                <p className="brOCSettingsFieldLabel">{i18n.t("Preview")}</p>
                <Button className="brOCSettingsButton" onClick={() => this._onClickShowPreviewButton() }>{i18n.t("Show_Preview")}</Button>
            </div>
        );
    }

}