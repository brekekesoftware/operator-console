import React from 'react';
import EditorWidgetSettings from "./EditorWidgetSettings";
import i18n from "../../../i18n";

export default class VideoCallWindowsEditorWidgetSettings extends EditorWidgetSettings {
    _onChangeFgColor( color ){
        const widgetData = this._getWidgetData();
        widgetData.setFgColor(color);
        this._EditScreenViewAsParent.commitEdit();
    }

    _onChangeBgColor( color ){
        const widgetData = this._getWidgetData();
        widgetData.setBgColor(color);
        this._EditScreenViewAsParent.commitEdit();
    }

    _onChangeBorderRadius( n ){
        const widgetData = this._getWidgetData();
        widgetData.setBorderRadius(n);
        this._EditScreenViewAsParent.commitEdit();
    }

    _onChangeInsideShadow_horizontalOffset( n ){
        const widgetData = this._getWidgetData();
        widgetData.setInsideShadow_horizontalOffset(n);
        this._EditScreenViewAsParent.commitEdit();
    }

    _onChangeInsideShadow_varticalOffset( n ){
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

    _onChangeOutsideShadow_varticalOffset( n ){
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

    //!override
    _getRenderMainJsx(){
        const widgetData = this._getWidgetData();
        const jsx = (
            <div className="brOCWidgetSettingsPanel">
                <p className="brOCSettingsSectionHeading">{i18n.t("Settings")}</p>
                {this._renderColorField("fgColor", widgetData.getFgColor(), (color) => this._onChangeFgColor(color))}
                {this._renderColorField("bgColor", widgetData.getBgColor(), (color) => this._onChangeBgColor(color))}
                {this._renderNumberField("borderRadius", widgetData.getBorderRadius(), (n) => this._onChangeBorderRadius(n), {min: 0})}

                <p className="brOCSettingsSectionHeading">{i18n.t("insideShadow_settings")}</p>
                {this._renderFieldRow(
                    this._renderNumberField("horizontalOffset", widgetData.getInsideShadow_horizontalOffset(), (n) => this._onChangeInsideShadow_horizontalOffset(n), {step: 1}),
                    this._renderNumberField("verticalOffset", widgetData.getInsideShadow_verticalOffset(), (n) => this._onChangeInsideShadow_varticalOffset(n), {step: 1})
                )}
                {this._renderFieldRow(
                    this._renderNumberField("blur", widgetData.getInsideShadow_blur(), (n) => this._onChangeInsideShadow_blur(n), {step: 1}),
                    this._renderNumberField("spread", widgetData.getInsideShadow_spread(), (n) => this._onChangeInsideShadow_spread(n), {step: 1})
                )}
                {this._renderColorField("color", widgetData.getInsideShadow_color(), (color) => this._onChangeInsideShadow_color(color))}

                <p className="brOCSettingsSectionHeading">{i18n.t("outsideShadow_settings")}</p>
                {this._renderFieldRow(
                    this._renderNumberField("horizontalOffset", widgetData.getOutsideShadow_horizontalOffset(), (n) => this._onChangeOutsideShadow_horizontalOffset(n), {step: 1}),
                    this._renderNumberField("verticalOffset", widgetData.getOutsideShadow_verticalOffset(), (n) => this._onChangeOutsideShadow_varticalOffset(n), {step: 1})
                )}
                {this._renderFieldRow(
                    this._renderNumberField("blur", widgetData.getOutsideShadow_blur(), (n) => this._onChangeOutsideShadow_blur(n), {step: 1}),
                    this._renderNumberField("spread", widgetData.getOutsideShadow_spread(), (n) => this._onChangeOutsideShadow_spread(n), {step: 1})
                )}
                {this._renderColorField("color", widgetData.getOutsideShadow_color(), (color) => this._onChangeOutsideShadow_color(color))}
            </div>
        );
        return jsx;
    }
}