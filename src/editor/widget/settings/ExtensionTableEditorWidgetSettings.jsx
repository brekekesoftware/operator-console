import React from 'react';
import EditorWidgetSettings from "./EditorWidgetSettings";
import i18n from "../../../i18n";

export default class ExtensionTableEditorWidgetSettings extends EditorWidgetSettings {
    _onChangeExtensiontableBgColor( color ){
        const widgetData = this._getWidgetData();
        widgetData.setExtensiontableBgColor(color);
        this._EditScreenViewAsParent.commitEdit();
    }

    _onChangeExtensiontableOuterBorderThickness( n ){
        const widgetData = this._getWidgetData();
        widgetData.setExtensiontableOuterBorderThickness(n);
        this._EditScreenViewAsParent.commitEdit();
    }

    _onChangeExtensiontableOuterBorderColor( color ){
        const widgetData = this._getWidgetData();
        widgetData.setExtensiontableOuterBorderColor(color);
        this._EditScreenViewAsParent.commitEdit();
    }

    _onChangeExtensiontableOuterBorderRadius( n ){
        const widgetData = this._getWidgetData();
        widgetData.setExtensiontableOuterBorderRadius(n);
        this._EditScreenViewAsParent.commitEdit();
    }

    _onChangeExtensiontableHeaderFgColor( color ){
        const widgetData = this._getWidgetData();
        widgetData.setExtensiontableHeaderFgColor(color);
        this._EditScreenViewAsParent.commitEdit();
    }

    _onChangeExtensiontableHeaderBgColor( color ){
        const widgetData = this._getWidgetData();
        widgetData.setExtensiontableHeaderBgColor(color);
        this._EditScreenViewAsParent.commitEdit();
    }

    _onChangeExtensiontableHeaderRowUnderlineThickness( n ){
        const widgetData = this._getWidgetData();
        widgetData.setExtensiontableHeaderRowUnderlineThickness(n);
        this._EditScreenViewAsParent.commitEdit();
    }

    _onChangeExtensiontableHeaderRowUnderlineColor( color ){
        const widgetData = this._getWidgetData();
        widgetData.setExtensiontableHeaderRowUnderlineColor(color);
        this._EditScreenViewAsParent.commitEdit();
    }

    _onChangeExtensiontableBodyFgColor( color ){
        const widgetData = this._getWidgetData();
        widgetData.setExtensiontableBodyFgColor(color);
        this._EditScreenViewAsParent.commitEdit();
    }

    _onChangeExtensiontableBodyRowUnderlineThickness( n ){
        const widgetData = this._getWidgetData();
        widgetData.setExtensiontableBodyRowUnderlineThickness(n);
        this._EditScreenViewAsParent.commitEdit();
    }

    _onChangeExtensiontableBodyRowUnderlineColor( color ){
        const widgetData = this._getWidgetData();
        widgetData.setExtensiontableBodyRowUnderlineColor(color);
        this._EditScreenViewAsParent.commitEdit();
    }

  _onChangeExtensiontableBodyFontSize( n ){
    const widgetData = this._getWidgetData();
    widgetData.setExtensiontableBodyFontSize(n);
    this._EditScreenViewAsParent.commitEdit();
  }

    _onChangeExtensiontableHeaderFontSize( n ){
        const widgetData = this._getWidgetData();
        widgetData.setExtensiontableHeaderFontSize(n);
        this._EditScreenViewAsParent.commitEdit();
    }

    //!override
    _getRenderMainJsx(){
        const widgetData = this._getWidgetData();
        const jsx = (
            <div className="brOCWidgetSettingsPanel">
                <p className="brOCSettingsSectionHeading">{i18n.t("Settings")}</p>
                {this._renderColorField("bgColor", widgetData.getExtensiontableBgColor(), (color) => this._onChangeExtensiontableBgColor(color))}
                {this._renderColorField("outerBorderColor", widgetData.getExtensiontableOuterBorderColor(), (color) => this._onChangeExtensiontableOuterBorderColor(color))}
                {this._renderFieldRow(
                    this._renderNumberField("outerBorderThickness", widgetData.getExtensiontableOuterBorderThickness(), (n) => this._onChangeExtensiontableOuterBorderThickness(n), {min: 0}),
                    this._renderNumberField("outerBorderRadius", widgetData.getExtensiontableOuterBorderRadius(), (n) => this._onChangeExtensiontableOuterBorderRadius(n), {min: 0})
                )}

                <p className="brOCSettingsSectionHeading">{i18n.t("header_settings")}</p>
                {this._renderNumberField("Text_size", widgetData.getExtensiontableHeaderFontSize(), (n) => this._onChangeExtensiontableHeaderFontSize(n), {min: 0})}
                {this._renderColorField("fgColor", widgetData.getExtensiontableHeaderFgColor(), (color) => this._onChangeExtensiontableHeaderFgColor(color))}
                {this._renderColorField("bgColor", widgetData.getExtensiontableHeaderBgColor(), (color) => this._onChangeExtensiontableHeaderBgColor(color))}
                {this._renderColorField("rowUnderlineColor", widgetData.getExtensiontableHeaderRowUnderlineColor(), (color) => this._onChangeExtensiontableHeaderRowUnderlineColor(color))}
                {this._renderNumberField("rowUnderlineThickness", widgetData.getExtensiontableHeaderRowUnderlineThickness(), (n) => this._onChangeExtensiontableHeaderRowUnderlineThickness(n), {min: 0})}

                <p className="brOCSettingsSectionHeading">{i18n.t("body_settings")}</p>
                {this._renderNumberField("Text_size", widgetData.getExtensiontableBodyFontSize(), (n) => this._onChangeExtensiontableBodyFontSize(n), {min: 0})}
                {this._renderColorField("fgColor", widgetData.getExtensiontableBodyFgColor(), (color) => this._onChangeExtensiontableBodyFgColor(color))}
                {this._renderColorField("rowUnderlineColor", widgetData.getExtensiontableBodyRowUnderlineColor(), (color) => this._onChangeExtensiontableBodyRowUnderlineColor(color))}
                {this._renderNumberField("rowUnderlineThickness", widgetData.getExtensiontableBodyRowUnderlineThickness(), (n) => this._onChangeExtensiontableBodyRowUnderlineThickness(n), {min: 0})}
            </div>
        );
        return jsx;
    }
}