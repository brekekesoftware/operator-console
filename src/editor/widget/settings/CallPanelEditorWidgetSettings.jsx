import React from 'react';
import EditorWidgetSettings from "./EditorWidgetSettings";
import i18n from "../../../i18n";

export default class CallPanelEditorWidgetSettings extends EditorWidgetSettings {
    _onChangeCallpanelFgColor( color ){
        const widgetData = this._getWidgetData();
        widgetData.setCallpanelFgColor(color);
        this._EditScreenViewAsParent.commitEdit();
    }

    _onChangeCallpanelBgColor( color ){
        const widgetData = this._getWidgetData();
        widgetData.setCallpanelBgColor(color);
        this._EditScreenViewAsParent.commitEdit();
    }

    _onChangeCallpanelBorderRadius( n ){
        const widgetData = this._getWidgetData();
        widgetData.setCallpanelBorderRadius(n);
        this._EditScreenViewAsParent.commitEdit();
    }

    _onChangeInsideShadow_horizontalOffset( n ){
        const widgetData = this._getWidgetData();
        widgetData.setInsideShadow_horizontalOffset(n);
        this._EditScreenViewAsParent.commitEdit();
    }

    _onChangeInsideShadow_verticalOffset( n ){
        const widgetData = this._getWidgetData();
        widgetData.setInsideShadow_verticalOffset(n);
        this._EditScreenViewAsParent.commitEdit();
    }

    _onChangeInsideShadow_blur( n ){
        const widgetData = this._getWidgetData();
        widgetData.setInsideShadow_blur(n);
        this._EditScreenViewAsParent.commitEdit();
    }

    _onChangeInsideShadow_spread( n ){
        const widgetData = this._getWidgetData();
        widgetData.setInsideShadow_spread(n);
        this._EditScreenViewAsParent.commitEdit();
    }

    _onChangeInsideShadow_color( color ){
        const widgetData = this._getWidgetData();
        widgetData.setInsideShadow_color(color);
        this._EditScreenViewAsParent.commitEdit();
    }

    _onChangeOutsideShadow_horizontalOffset( n ){
        const widgetData = this._getWidgetData();
        widgetData.setOutsideShadow_horizontalOffset(n);
        this._EditScreenViewAsParent.commitEdit();
    }

    _onChangeOutsideShadow_verticalOffset( n ){
        const widgetData = this._getWidgetData();
        widgetData.setOutsideShadow_verticalOffset(n);
        this._EditScreenViewAsParent.commitEdit();
    }

    _onChangeOutsideShadow_blur( n ){
        const widgetData = this._getWidgetData();
        widgetData.setOutsideShadow_blur(n);
        this._EditScreenViewAsParent.commitEdit();
    }

    _onChangeOutsideShadow_spread( n ){
        const widgetData = this._getWidgetData();
        widgetData.setOutsideShadow_spread(n);
        this._EditScreenViewAsParent.commitEdit();
    }

    _onChangeOutsideShadow_color( color ){
        const widgetData = this._getWidgetData();
        widgetData.setOutsideShadow_color(color);
        this._EditScreenViewAsParent.commitEdit();
    }

	_onChangeCallIconWidth( n ){
        const widgetData = this._getWidgetData();
        widgetData.setCallIconWidth(n);
        this._EditScreenViewAsParent.commitEdit();
    }

	_onChangeCallIconHeight( n ){
        const widgetData = this._getWidgetData();
        widgetData.setCallIconHeight(n);
        this._EditScreenViewAsParent.commitEdit();
    }

    _onChangeCallerNameSize(n){
        const widgetData = this._getWidgetData();
        widgetData.setCallerNameSize(n);
        this._EditScreenViewAsParent.commitEdit();
    }

	_onChangeCallerNumberSizeWithCallerName(n){
        const widgetData = this._getWidgetData();
        widgetData.setCallerNumberSizeWithCallerName(n);
        this._EditScreenViewAsParent.commitEdit();
	}

    _onChangeCallerNumberSizeWithoutCallerName(n){
        const widgetData = this._getWidgetData();
        widgetData.setCallerNumberSizeWithoutCallerName(n);
        this._EditScreenViewAsParent.commitEdit();
    }

    _onChangeCallDurationSize(n){
        const widgetData = this._getWidgetData();
        widgetData.setCallDurationSize(n);
        this._EditScreenViewAsParent.commitEdit();
    }

    _onChangeKeyboardIconWidth(n){
        const widgetData = this._getWidgetData();
        widgetData.setKeyboardIconWidth(n);
        this._EditScreenViewAsParent.commitEdit();
    }

    _onChangeKeyboardIconHeight(n){
        const widgetData = this._getWidgetData();
        widgetData.setKeyboardIconHeight(n);
        this._EditScreenViewAsParent.commitEdit();
    }

    _onChangeInputTextSize(n){
        const widgetData = this._getWidgetData();
        widgetData.setInputTextSize(n);
        this._EditScreenViewAsParent.commitEdit();
    }

    _onChangeMissedCallSize(n){
        const widgetData = this._getWidgetData();
        widgetData.setMissedCallSize(n);
        this._EditScreenViewAsParent.commitEdit();
    }

    //!override
    _getRenderMainJsx(){
        const widgetData = this._getWidgetData();
        const widgetNameForII18n = widgetData.getWidgetNameForI18n();

        const jsx = (
            <div className="brOCWidgetSettingsPanel">
                <p className="brOCSettingsSectionHeading">{i18n.t("Settings")}</p>
                {this._renderColorField("fgColor", widgetData.getCallpanelFgColor(), (color) => this._onChangeCallpanelFgColor(color))}
                {this._renderColorField("bgColor", widgetData.getCallpanelBgColor(), (color) => this._onChangeCallpanelBgColor(color))}
                {this._renderNumberField("borderRadius", widgetData.getCallpanelBorderRadius(), (n) => this._onChangeCallpanelBorderRadius(n), {min: 0})}

                <p className="brOCSettingsSectionHeading">{i18n.t("insideShadow_settings")}</p>
                {this._renderNumberField("horizontalOffset", widgetData.getInsideShadow_horizontalOffset(), (n) => this._onChangeInsideShadow_horizontalOffset(n), {step: 1})}
                {this._renderNumberField("verticalOffset", widgetData.getInsideShadow_verticalOffset(), (n) => this._onChangeInsideShadow_verticalOffset(n), {step: 1})}
                {this._renderNumberField("blur", widgetData.getInsideShadow_blur(), (n) => this._onChangeInsideShadow_blur(n), {step: 1})}
                {this._renderNumberField("spread", widgetData.getInsideShadow_spread(), (n) => this._onChangeInsideShadow_spread(n), {step: 1})}
                {this._renderColorField("color", widgetData.getInsideShadow_color(), (color) => this._onChangeInsideShadow_color(color))}

                <p className="brOCSettingsSectionHeading">{i18n.t("outsideShadow_settings")}</p>
                {this._renderNumberField("horizontalOffset", widgetData.getOutsideShadow_horizontalOffset(), (n) => this._onChangeOutsideShadow_horizontalOffset(n), {step: 1})}
                {this._renderNumberField("verticalOffset", widgetData.getOutsideShadow_verticalOffset(), (n) => this._onChangeOutsideShadow_verticalOffset(n), {step: 1})}
                {this._renderNumberField("blur", widgetData.getOutsideShadow_blur(), (n) => this._onChangeOutsideShadow_blur(n), {step: 1})}
                {this._renderNumberField("spread", widgetData.getOutsideShadow_spread(), (n) => this._onChangeOutsideShadow_spread(n), {step: 1})}
                {this._renderColorField("color", widgetData.getOutsideShadow_color(), (color) => this._onChangeOutsideShadow_color(color))}

                {this._renderNumberField("CallIconWidth", widgetData.getCallIconWidth(), (n) => this._onChangeCallIconWidth(n), {step: 1, min: 0})}
                {this._renderNumberField("CallIconHeight", widgetData.getCallIconHeight(), (n) => this._onChangeCallIconHeight(n), {step: 1, min: 0})}
                {this._renderNumberField("CallerNameSize", widgetData.getCallerNameSize(), (n) => this._onChangeCallerNameSize(n), {step: 1, min: 0})}
                {this._renderNumberField("CallerNumberSizeWithCallerName", widgetData.getCallerNumberSizeWithCallerName(), (n) => this._onChangeCallerNumberSizeWithCallerName(n), {step: 1, min: 0})}
                {this._renderNumberField("CallerNumberSizeWithoutCallerName", widgetData.getCallerNumberSizeWithoutCallerName(), (n) => this._onChangeCallerNumberSizeWithoutCallerName(n), {step: 1, min: 0})}
                {this._renderNumberField("CallDurationSize", widgetData.getCallDurationSize(), (n) => this._onChangeCallDurationSize(n), {step: 1, min: 0})}
                {this._renderNumberField("KeyboardIconWidth", widgetData.getKeyboardIconWidth(), (n) => this._onChangeKeyboardIconWidth(n), {step: 1, min: 0})}
                {this._renderNumberField("KeyboardIconHeight", widgetData.getKeyboardIconHeight(), (n) => this._onChangeKeyboardIconHeight(n), {step: 1, min: 0})}
                {this._renderNumberField("InputNumberOrTextSize", widgetData.getInputTextSize(), (n) => this._onChangeInputTextSize(n), {step: 1, min: 0})}
                {this._renderNumberField("MissedCallSize", widgetData.getMissedCallSize(), (n) => this._onChangeMissedCallSize(n), {step: 1, min: 0})}
            </div>
        );
        return jsx;
    }
}
