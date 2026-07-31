import React from 'react';
import EditorWidgetSettings from "./EditorWidgetSettings";
import i18n from "../../../i18n";
import {Select} from "antd";

const MAX_LINE_COUNT = 300;

export default class LineTableEditorWidgetSettings extends EditorWidgetSettings {
    constructor( props ) {
        super( props );
    }

    // componentDidUpdate(){
    //     super.componentDidUpdate();
    //     const widgetData = this._getWidgetData();
    //     if( this._latestWidgetData !== widgetData  ){
    //
    //     }
    //     this._latestWidgetData = widgetData;
    // }

    _onChangeResourceName( e, lineDataIndex ){
        const widgetData = this._getWidgetData();
        const lineDataArray = widgetData.getLineDataArray();
        const lineData = lineDataArray[ lineDataIndex ];
        const resourceName  = e.currentTarget.value;
        lineData.setResourceName( resourceName  );
        this.getEditScreenViewAsParent().commitEdit();
    }

    _onChangeLineLabel( e, lineDataIndex ){
        const widgetData = this._getWidgetData();
        const lineDataArray = widgetData.getLineDataArray();
        const lineData = lineDataArray[ lineDataIndex ];
        const lineLabel = e.currentTarget.value;
        lineData.setLineLabel( lineLabel  );
        this.getEditScreenViewAsParent().commitEdit();
    }

    _onChangeLineCount( lineCount ){
        const widgetData = this._getWidgetData();
        //const lineCount = e.currentTarget.value;
        widgetData.setLineDataArrayCount( lineCount );
        this.getEditScreenViewAsParent().commitEdit();
    }

    _onChangeLinetableBgColor( color ){
        const widgetData = this._getWidgetData();
        widgetData.setLinetableBgColor(color);
        this._EditScreenViewAsParent.commitEdit();
    }

    _onChangeLinetableOuterBorderThickness( n ){
        const widgetData = this._getWidgetData();
        widgetData.setLinetableOuterBorderThickness(n);
        this._EditScreenViewAsParent.commitEdit();
    }

    _onChangeLinetableOuterBorderColor( color ){
        const widgetData = this._getWidgetData();
        widgetData.setLinetableOuterBorderColor(color);
        this._EditScreenViewAsParent.commitEdit();
    }

    _onChangeLinetableOuterBorderRadius( n ){
        const widgetData = this._getWidgetData();
        widgetData.setLinetableOuterBorderRadius(n);
        this._EditScreenViewAsParent.commitEdit();
    }

    _onChangeLinetableHeaderFgColor( color ){
        const widgetData = this._getWidgetData();
        widgetData.setLinetableHeaderFgColor(color);
        this._EditScreenViewAsParent.commitEdit();
    }

    _onChangeLinetableHeaderBgColor( color ){
        const widgetData = this._getWidgetData();
        widgetData.setLinetableHeaderBgColor(color);
        this._EditScreenViewAsParent.commitEdit();
    }

    _onChangeLinetableHeaderRowUnderlineThickness( n ){
        const widgetData = this._getWidgetData();
        widgetData.setLinetableHeaderRowUnderlineThickness(n);
        this._EditScreenViewAsParent.commitEdit();
    }

    _onChangeLinetableHeaderRowUnderlineColor( color ){
        const widgetData = this._getWidgetData();
        widgetData.setLinetableHeaderRowUnderlineColor(color);
        this._EditScreenViewAsParent.commitEdit();
    }

    _onChangeLinetableBodyFgColor( color ){
        const widgetData = this._getWidgetData();
        widgetData.setLinetableBodyFgColor(color);
        this._EditScreenViewAsParent.commitEdit();
    }

    _onChangeLinetableBodyRowUnderlineThickness( n ){
        const widgetData = this._getWidgetData();
        widgetData.setLinetableBodyRowUnderlineThickness(n);
        this._EditScreenViewAsParent.commitEdit();
    }

    _onChangeLinetableBodyRowUnderlineColor( color ){
        const widgetData = this._getWidgetData();
        widgetData.setLinetableBodyRowUnderlineColor(color);
        this._EditScreenViewAsParent.commitEdit();
    }

    _onChangeLineButtonWidth( n ){
        const widgetData = this._getWidgetData();
        widgetData.setLineButtonWidth(n);
        this._EditScreenViewAsParent.commitEdit();
    }

    _onChangeLineButtonHeight( n ){
        const widgetData = this._getWidgetData();
        widgetData.setLineButtonHeight(n);
        this._EditScreenViewAsParent.commitEdit();
    }

    _onChangeLineButtonFgColor( color ){
        const widgetData = this._getWidgetData();
        widgetData.setLineButtonFgColor(color);
        this._EditScreenViewAsParent.commitEdit();
    }

    _onChangeLineButtonBgColor( color ){
        const widgetData = this._getWidgetData();
        widgetData.setLineButtonBgColor(color);
        this._EditScreenViewAsParent.commitEdit();
    }

    _onChangeLineButtonOuterBorderColor( color ){
        const widgetData = this._getWidgetData();
        widgetData.setLineButtonOuterBorderColor(color);
        this._EditScreenViewAsParent.commitEdit();
    }

    _onChangeLineButtonOuterBorderRadius( n ){
        const widgetData = this._getWidgetData();
        widgetData.setLineButtonOuterBorderRadius(n);
        this._EditScreenViewAsParent.commitEdit();
    }

    _onChangeLineButtonOuterBorderThickness( n ){
        const widgetData = this._getWidgetData();
        widgetData.setLineButtonOuterBorderThickness(n);
        this._EditScreenViewAsParent.commitEdit();
    }

    _onChangeTransferButtonWidth( n ){
        const widgetData = this._getWidgetData();
        widgetData.setTransferButtonWidth(n);
        this._EditScreenViewAsParent.commitEdit();
    }

    _onChangeTransferButtonHeight( n ){
        const widgetData = this._getWidgetData();
        widgetData.setTransferButtonHeight(n);
        this._EditScreenViewAsParent.commitEdit();
    }

    _onChangeTransferButtonFgColor( color ){
        const widgetData = this._getWidgetData();
        widgetData.setTransferButtonFgColor(color);
        this._EditScreenViewAsParent.commitEdit();
    }

    _onChangeTransferButtonBgColor( color ){
        const widgetData = this._getWidgetData();
        widgetData.setTransferButtonBgColor(color);
        this._EditScreenViewAsParent.commitEdit();
    }

    _onChangeTransferButtonOuterBorderColor( color ){
        const widgetData = this._getWidgetData();
        widgetData.setTransferButtonOuterBorderColor(color);
        this._EditScreenViewAsParent.commitEdit();
    }

    _onChangeTransferButtonOuterBorderRadius( n ){
        const widgetData = this._getWidgetData();
        widgetData.setTransferButtonOuterBorderRadius(n);
        this._EditScreenViewAsParent.commitEdit();
    }

    _onChangeTransferButtonOuterBorderThickness( n ){
        const widgetData = this._getWidgetData();
        widgetData.setTransferButtonOuterBorderThickness(n);
        this._EditScreenViewAsParent.commitEdit();
    }

    _onChangeTransferCancelButtonWidth( n ){
        const widgetData = this._getWidgetData();
        widgetData.setTransferCancelButtonWidth(n);
        this._EditScreenViewAsParent.commitEdit();
    }

    _onChangeTransferCancelButtonHeight( n ){
        const widgetData = this._getWidgetData();
        widgetData.setTransferCancelButtonHeight(n);
        this._EditScreenViewAsParent.commitEdit();
    }

    _onChangeTransferCancelButtonFgColor( color ){
        const widgetData = this._getWidgetData();
        widgetData.setTransferCancelButtonFgColor(color);
        this._EditScreenViewAsParent.commitEdit();
    }

    _onChangeTransferCancelButtonBgColor( color ){
        const widgetData = this._getWidgetData();
        widgetData.setTransferCancelButtonBgColor(color);
        this._EditScreenViewAsParent.commitEdit();
    }

    _onChangeTransferCancelButtonOuterBorderColor( color ){
        const widgetData = this._getWidgetData();
        widgetData.setTransferCancelButtonOuterBorderColor(color);
        this._EditScreenViewAsParent.commitEdit();
    }

    _onChangeTransferCancelButtonOuterBorderRadius( n ){
        const widgetData = this._getWidgetData();
        widgetData.setTransferCancelButtonOuterBorderRadius(n);
        this._EditScreenViewAsParent.commitEdit();
    }

    _onChangeTransferCancelButtonOuterBorderThickness( n ){
        const widgetData = this._getWidgetData();
        widgetData.setTransferCancelButtonOuterBorderThickness(n);
        this._EditScreenViewAsParent.commitEdit();
    }

    _onChangeLinetableHeaderFontSize( n ){
        const widgetData = this._getWidgetData();
        widgetData.setLinetableHeaderFontSize(n);
        this._EditScreenViewAsParent.commitEdit();
    }

    _onChangeLinetableBodyFontSize( n ){
        const widgetData = this._getWidgetData();
        widgetData.setLinetableBodyFontSize(n);
        this._EditScreenViewAsParent.commitEdit();
    }

    _onChangeLineButtonFontSize( n ){
        const widgetData = this._getWidgetData();
        widgetData.setLineButtonFontSize(n);
        this._EditScreenViewAsParent.commitEdit();
    }

    _onChangeTransferButtonFontSize( n ){
        const widgetData = this._getWidgetData();
        widgetData.setTransferButtonFontSize(n);
        this._EditScreenViewAsParent.commitEdit();
    }

    _onChangeTransferCancelButtonFontSize( n ){
        const widgetData = this._getWidgetData();
        widgetData.setTransferCancelButtonFontSize(n);
        this._EditScreenViewAsParent.commitEdit();
    }

    _onChangeLinetableTransferMethod( s ){
        const widgetData = this._getWidgetData();
        widgetData.setLinetableTransferMethod(s);
        this._EditScreenViewAsParent.commitEdit();
    }

    //!override
    _getRenderMainJsx(){
        const widgetData = this._getWidgetData();
        const lineDataArray = widgetData.getLineDataArray();
        const lineCount = lineDataArray.length;
        const linetableTransferMethod = widgetData.getLinetableTransferMethod() ? widgetData.getLinetableTransferMethod() : "selectTransferMethod";
        const jsx =   (
            <div className="brOCWidgetSettingsPanel">
                <p className="brOCSettingsSectionHeading">{i18n.t("Settings")}</p>
                {this._renderNumberField("lineCount", lineCount, (count) => this._onChangeLineCount(count), {min: 0, max: MAX_LINE_COUNT})}
                {lineDataArray.map((lineData, i) => {
                    return (<div key={i}>
                        <p className="brOCSettingsSectionHeading">{i18n.t("line") + " " + (i + 1)}</p>
                        {this._renderTextField("resourceName", lineData.getResourceName(), (e) => this._onChangeResourceName(e, i), {maxLength: 300, allowClear: true})}
                        {this._renderTextField("lineLabel", lineData.getLineLabel(), (e) => this._onChangeLineLabel(e, i), {maxLength: 300, allowClear: true})}
                    </div>);
                })}
                {this._renderSelectField("TransferMethod", linetableTransferMethod, (e) => this._onChangeLinetableTransferMethod(e), (
                    <>
                        <Select.Option value="selectTransferMethod">{i18n.t("Select_a_transfer_method")}</Select.Option>
                        <Select.Option
                            value="attendedTransferWithSwitchCall">{i18n.t("Attended_transfer(Switch_a_call)")}</Select.Option>
                        <Select.Option value="attendedTransfer">{i18n.t("Attended_transfer")}</Select.Option>
                        <Select.Option value="blindTransfer">{i18n.t("Blind_transfer")}</Select.Option>
                    </>
                ))}
                {this._renderColorField("bgColor", widgetData.getLinetableBgColor(), (color) => this._onChangeLinetableBgColor(color))}
                {this._renderNumberField("outerBorderThickness", widgetData.getLinetableOuterBorderThickness(), (n) => this._onChangeLinetableOuterBorderThickness(n), {min: 0})}
                {this._renderColorField("outerBorderColor", widgetData.getLinetableOuterBorderColor(), (color) => this._onChangeLinetableOuterBorderColor(color))}
                {this._renderNumberField("outerBorderRadius", widgetData.getLinetableOuterBorderRadius(), (n) => this._onChangeLinetableOuterBorderRadius(n), {min: 0})}

                <p className="brOCSettingsSectionHeading">{i18n.t("header_settings")}</p>
                {this._renderNumberField("Text_size", widgetData.getLinetableHeaderFontSize(), (n) => this._onChangeLinetableHeaderFontSize(n), {min: 0})}
                {this._renderColorField("fgColor", widgetData.getLinetableHeaderFgColor(), (color) => this._onChangeLinetableHeaderFgColor(color))}
                {this._renderColorField("bgColor", widgetData.getLinetableHeaderBgColor(), (color) => this._onChangeLinetableHeaderBgColor(color))}
                {this._renderNumberField("rowUnderlineThickness", widgetData.getLinetableHeaderRowUnderlineThickness(), (n) => this._onChangeLinetableHeaderRowUnderlineThickness(n), {min: 0})}
                {this._renderColorField("rowUnderlineColor", widgetData.getLinetableHeaderRowUnderlineColor(), (color) => this._onChangeLinetableHeaderRowUnderlineColor(color))}

                <p className="brOCSettingsSectionHeading">{i18n.t("body_settings")}</p>
                {this._renderNumberField("Text_size", widgetData.getLinetableBodyFontSize(), (n) => this._onChangeLinetableBodyFontSize(n), {min: 0})}
                {this._renderColorField("fgColor", widgetData.getLinetableBodyFgColor(), (color) => this._onChangeLinetableBodyFgColor(color))}
                {this._renderNumberField("rowUnderlineThickness", widgetData.getLinetableBodyRowUnderlineThickness(), (n) => this._onChangeLinetableBodyRowUnderlineThickness(n), {min: 0})}
                {this._renderColorField("rowUnderlineColor", widgetData.getLinetableBodyRowUnderlineColor(), (color) => this._onChangeLinetableBodyRowUnderlineColor(color))}

                <p className="brOCSettingsSectionHeading">{i18n.t("lineButtonSettings")}</p>
                {this._renderNumberField("Text_size", widgetData.getLineButtonFontSize(), (n) => this._onChangeLineButtonFontSize(n), {min: 0})}
                {this._renderNumberField("width", widgetData.getLineButtonWidth(), (n) => this._onChangeLineButtonWidth(n), {min: 1})}
                {this._renderNumberField("height", widgetData.getLineButtonHeight(), (n) => this._onChangeLineButtonHeight(n), {min: 1})}
                {this._renderColorField("fgColor", widgetData.getLineButtonFgColor(), (color) => this._onChangeLineButtonFgColor(color))}
                {this._renderColorField("bgColor", widgetData.getLineButtonBgColor(), (color) => this._onChangeLineButtonBgColor(color))}
                {this._renderColorField("outerBorderColor", widgetData.getLineButtonOuterBorderColor(), (color) => this._onChangeLineButtonOuterBorderColor(color))}
                {this._renderNumberField("outerBorderRadius", widgetData.getLineButtonOuterBorderRadius(), (n) => this._onChangeLineButtonOuterBorderRadius(n), {min: 0})}
                {this._renderNumberField("outerBorderThickness", widgetData.getLineButtonOuterBorderThickness(), (n) => this._onChangeLineButtonOuterBorderThickness(n), {min: 1})}

                <p className="brOCSettingsSectionHeading">{i18n.t("transferButtonSettings")}</p>
                {this._renderNumberField("Text_size", widgetData.getTransferButtonFontSize(), (n) => this._onChangeTransferButtonFontSize(n), {min: 0})}
                {this._renderNumberField("width", widgetData.getTransferButtonWidth(), (n) => this._onChangeTransferButtonWidth(n), {min: 1})}
                {this._renderNumberField("height", widgetData.getTransferButtonHeight(), (n) => this._onChangeTransferButtonHeight(n), {min: 1})}
                {this._renderColorField("fgColor", widgetData.getTransferButtonFgColor(), (color) => this._onChangeTransferButtonFgColor(color))}
                {this._renderColorField("bgColor", widgetData.getTransferButtonBgColor(), (color) => this._onChangeTransferButtonBgColor(color))}
                {this._renderColorField("outerBorderColor", widgetData.getTransferButtonOuterBorderColor(), (color) => this._onChangeTransferButtonOuterBorderColor(color))}
                {this._renderNumberField("outerBorderRadius", widgetData.getTransferButtonOuterBorderRadius(), (n) => this._onChangeTransferButtonOuterBorderRadius(n), {min: 0})}
                {this._renderNumberField("outerBorderThickness", widgetData.getTransferButtonOuterBorderThickness(), (n) => this._onChangeTransferButtonOuterBorderThickness(n), {min: 1})}

                <p className="brOCSettingsSectionHeading">{i18n.t("transferCancelButtonSettings")}</p>
                {this._renderNumberField("Text_size", widgetData.getTransferCancelButtonFontSize(), (n) => this._onChangeTransferCancelButtonFontSize(n), {min: 0})}
                {this._renderNumberField("width", widgetData.getTransferCancelButtonWidth(), (n) => this._onChangeTransferCancelButtonWidth(n), {min: 1})}
                {this._renderNumberField("height", widgetData.getTransferCancelButtonHeight(), (n) => this._onChangeTransferCancelButtonHeight(n), {min: 1})}
                {this._renderColorField("fgColor", widgetData.getTransferCancelButtonFgColor(), (color) => this._onChangeTransferCancelButtonFgColor(color))}
                {this._renderColorField("bgColor", widgetData.getTransferCancelButtonBgColor(), (color) => this._onChangeTransferCancelButtonBgColor(color))}
                {this._renderColorField("outerBorderColor", widgetData.getTransferCancelButtonOuterBorderColor(), (color) => this._onChangeTransferCancelButtonOuterBorderColor(color))}
                {this._renderNumberField("outerBorderRadius", widgetData.getTransferCancelButtonOuterBorderRadius(), (n) => this._onChangeTransferCancelButtonOuterBorderRadius(n), {min: 0})}
                {this._renderNumberField("outerBorderThickness", widgetData.getTransferCancelButtonOuterBorderThickness(), (n) => this._onChangeTransferCancelButtonOuterBorderThickness(n), {min: 1})}
            </div>
        );
        return jsx;
    }
}