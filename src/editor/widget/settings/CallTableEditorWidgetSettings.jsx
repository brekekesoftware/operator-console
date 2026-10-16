import React from 'react';
import EditorWidgetSettings from "./EditorWidgetSettings";
import i18n from "../../../i18n";

export default class CallTableEditorWidgetSettings extends EditorWidgetSettings {

    _onChangeCalltableBgColor( color ){
        const widgetData = this._getWidgetData();
        widgetData.setCalltableBgColor(color);
        this._EditScreenViewAsParent.commitEdit();
    }

    _onChangeCalltableOuterBorderThickness( n ){
        const widgetData = this._getWidgetData();
        widgetData.setCalltableOuterBorderThickness(n);
        this._EditScreenViewAsParent.commitEdit();
    }

    _onChangeCalltableOuterBorderColor( color ){
        const widgetData = this._getWidgetData();
        widgetData.setCalltableOuterBorderColor(color);
        this._EditScreenViewAsParent.commitEdit();
    }

    _onChangeCalltableOuterBorderRadius( n ){
        const widgetData = this._getWidgetData();
        widgetData.setCalltableOuterBorderRadius(n);
        this._EditScreenViewAsParent.commitEdit();
    }

    _onChangeCalltableHeaderFgColor( color ){
        const widgetData = this._getWidgetData();
        widgetData.setCalltableHeaderFgColor(color);
        this._EditScreenViewAsParent.commitEdit();
    }

    _onChangeCalltableHeaderBgColor( color ){
        const widgetData = this._getWidgetData();
        widgetData.setCalltableHeaderBgColor(color);
        this._EditScreenViewAsParent.commitEdit();
    }

    _onChangeCalltableHeaderRowUnderlineThickness( n ){
        const widgetData = this._getWidgetData();
        widgetData.setCalltableHeaderRowUnderlineThickness(n);
        this._EditScreenViewAsParent.commitEdit();
    }

    _onChangeCalltableHeaderRowUnderlineColor( color ){
        const widgetData = this._getWidgetData();
        widgetData.setCalltableHeaderRowUnderlineColor(color);
        this._EditScreenViewAsParent.commitEdit();
    }

    _onChangeCalltableBodyFgColor( color ){
        const widgetData = this._getWidgetData();
        widgetData.setCalltableBodyFgColor(color);
        this._EditScreenViewAsParent.commitEdit();
    }

    _onChangeCalltableBodyRowUnderlineThickness( n ){
        const widgetData = this._getWidgetData();
        widgetData.setCalltableBodyRowUnderlineThickness(n);
        this._EditScreenViewAsParent.commitEdit();
    }

    _onChangeCalltableBodyRowUnderlineColor( color ){
        const widgetData = this._getWidgetData();
        widgetData.setCalltableBodyRowUnderlineColor(color);
        this._EditScreenViewAsParent.commitEdit();
    }

    _onChangeCalltableBodyActiveRowBgColor( color ){
        const widgetData = this._getWidgetData();
        widgetData.setCalltableBodyActiveRowBgColor(color);
        this._EditScreenViewAsParent.commitEdit();
    }

    _onChangeCalltableBodyActiveRowFgColor( color ){
        const widgetData = this._getWidgetData();
        widgetData.setCalltableBodyActiveRowFgColor(color);
        this._EditScreenViewAsParent.commitEdit();
    }

    _onChangeCalltableHeaderFontSize( size ){
        const widgetData = this._getWidgetData();
        widgetData.setCalltableHeaderFontSize(size);
        this._EditScreenViewAsParent.commitEdit();
    }

    _onChangeCalltableBodyFontSize( size ){
        const widgetData = this._getWidgetData();
        widgetData.setCalltableBodyFontSize(size);
        this._EditScreenViewAsParent.commitEdit();
    }

    _onChangeCalltableActiveButtonWidth( n ){
        const widgetData = this._getWidgetData();
        widgetData.setCalltableActiveButtonWidth(n);
        this._EditScreenViewAsParent.commitEdit();
    }

    _onChangeCalltableActiveButtonHeight( n ){
        const widgetData = this._getWidgetData();
        widgetData.setCalltableActiveButtonHeight(n);
        this._EditScreenViewAsParent.commitEdit();
    }

    _onChangeCalltableActiveButtonFontSize( size ){
        const widgetData = this._getWidgetData();
        widgetData.setCalltableActiveButtonFontSize(size);
        this._EditScreenViewAsParent.commitEdit();
    }

    //!override
    _getRenderMainJsx(){
        const widgetData = this._getWidgetData();
        const jsx = (
            <div className="brOCWidgetSettingsPanel">
                <p className="brOCSettingsSectionHeading">{i18n.t("Settings")}</p>
                {this._renderColorField("bgColor", widgetData.getCalltableBgColor(), (color) => this._onChangeCalltableBgColor(color))}
                {this._renderColorField("outerBorderColor", widgetData.getCalltableOuterBorderColor(), (color) => this._onChangeCalltableOuterBorderColor(color))}
                {this._renderFieldRow(
                    this._renderNumberField("outerBorderThickness", widgetData.getCalltableOuterBorderThickness(), (n) => this._onChangeCalltableOuterBorderThickness(n), {min: 0}),
                    this._renderNumberField("outerBorderRadius", widgetData.getCalltableOuterBorderRadius(), (n) => this._onChangeCalltableOuterBorderRadius(n), {min: 0})
                )}

                <p className="brOCSettingsSectionHeading">{i18n.t("header_settings")}</p>
                {this._renderNumberField("Text_size", widgetData.getCalltableHeaderFontSize(), (size) => this._onChangeCalltableHeaderFontSize(size), {min: 0})}
                {this._renderColorField("fgColor", widgetData.getCalltableHeaderFgColor(), (color) => this._onChangeCalltableHeaderFgColor(color))}
                {this._renderColorField("bgColor", widgetData.getCalltableHeaderBgColor(), (color) => this._onChangeCalltableHeaderBgColor(color))}
                {this._renderColorField("rowUnderlineColor", widgetData.getCalltableHeaderRowUnderlineColor(), (color) => this._onChangeCalltableHeaderRowUnderlineColor(color))}
                {this._renderNumberField("rowUnderlineThickness", widgetData.getCalltableHeaderRowUnderlineThickness(), (n) => this._onChangeCalltableHeaderRowUnderlineThickness(n), {min: 0})}

                <p className="brOCSettingsSectionHeading">{i18n.t("body_settings")}</p>
                {this._renderNumberField("Text_size", widgetData.getCalltableBodyFontSize(), (size) => this._onChangeCalltableBodyFontSize(size), {min: 0})}
                {this._renderColorField("fgColor", widgetData.getCalltableBodyFgColor(), (color) => this._onChangeCalltableBodyFgColor(color))}
                {this._renderColorField("rowUnderlineColor", widgetData.getCalltableBodyRowUnderlineColor(), (color) => this._onChangeCalltableBodyRowUnderlineColor(color))}
                {this._renderNumberField("rowUnderlineThickness", widgetData.getCalltableBodyRowUnderlineThickness(), (n) => this._onChangeCalltableBodyRowUnderlineThickness(n), {min: 0})}
                {this._renderColorField("activeRowFgColor", widgetData.getCalltableBodyActiveRowFgColor(), (color) => this._onChangeCalltableBodyActiveRowFgColor(color))}
                {this._renderColorField("activeRowBgColor", widgetData.getCalltableBodyActiveRowBgColor(), (color) => this._onChangeCalltableBodyActiveRowBgColor(color))}

                <p className="brOCSettingsSectionHeading">{i18n.t("Active_button_settings")}</p>
                {this._renderNumberField("Text_size", widgetData.getCalltableActiveButtonFontSize(), (n) => this._onChangeCalltableActiveButtonFontSize(n), {min: 0})}
                {this._renderFieldRow(
                    this._renderNumberField("width", widgetData.getCalltableActiveButtonWidth(), (n) => this._onChangeCalltableActiveButtonWidth(n), {min: 0}),
                    this._renderNumberField("height", widgetData.getCalltableActiveButtonHeight(), (n) => this._onChangeCalltableActiveButtonHeight(n), {min: 0})
                )}
            </div>
        );
        return jsx;
    }
}