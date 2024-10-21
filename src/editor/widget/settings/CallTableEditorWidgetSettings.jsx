import React from 'react';
import EditorWidgetSettings from "./EditorWidgetSettings";
import i18n from "../../../i18n";
import {Colorpicker} from "antd-colorpicker";
import InputNumber from "antd/lib/input-number";
import {Divider} from "antd";

export default class CallTableEditorWidgetSettings extends EditorWidgetSettings {

    _onChangeCalltableBgColor( color ){
        const widgetData = this._getWidgetData();
        widgetData.setCalltableBgColor(color);
        this._EditScreenViewAsParent.setState({rerender:true});
    }

    _onChangeCalltableOuterBorderThickness( n ){
        const widgetData = this._getWidgetData();
        widgetData.setCalltableOuterBorderThickness(n);
        this._EditScreenViewAsParent.setState({rerender:true});
    }

    _onChangeCalltableOuterBorderColor( color ){
        const widgetData = this._getWidgetData();
        widgetData.setCalltableOuterBorderColor(color);
        this._EditScreenViewAsParent.setState({rerender:true});
    }

    _onChangeCalltableOuterBorderRadius( n ){
        const widgetData = this._getWidgetData();
        widgetData.setCalltableOuterBorderRadius(n);
        this._EditScreenViewAsParent.setState({rerender:true});
    }

    _onChangeCalltableHeaderFgColor( color ){
        const widgetData = this._getWidgetData();
        widgetData.setCalltableHeaderFgColor(color);
        this._EditScreenViewAsParent.setState({rerender:true});
    }

    _onChangeCalltableHeaderRowUnderlineThickness( n ){
        const widgetData = this._getWidgetData();
        widgetData.setCalltableHeaderRowUnderlineThickness(n);
        this._EditScreenViewAsParent.setState({rerender:true});
    }

    _onChangeCalltableHeaderRowUnderlineColor( color ){
        const widgetData = this._getWidgetData();
        widgetData.setCalltableHeaderRowUnderlineColor(color);
        this._EditScreenViewAsParent.setState({rerender:true});
    }

    _onChangeCalltableBodyFgColor( color ){
        const widgetData = this._getWidgetData();
        widgetData.setCalltableBodyFgColor(color);
        this._EditScreenViewAsParent.setState({rerender:true});
    }

    _onChangeCalltableBodyRowUnderlineThickness( n ){
        const widgetData = this._getWidgetData();
        widgetData.setCalltableBodyRowUnderlineThickness(n);
        this._EditScreenViewAsParent.setState({rerender:true});
    }

    _onChangeCalltableBodyRowUnderlineColor( color ){
        const widgetData = this._getWidgetData();
        widgetData.setCalltableBodyRowUnderlineColor(color);
        this._EditScreenViewAsParent.setState({rerender:true});
    }

    _onChangeCalltableBodyActiveRowBgColor( color ){
        const widgetData = this._getWidgetData();
        widgetData.setCalltableBodyActiveRowBgColor(color);
        this._EditScreenViewAsParent.setState({rerender:true});
    }

    _onChangeCalltableHeaderFontSize( size ){
        const widgetData = this._getWidgetData();
        widgetData.setCalltableHeaderFontSize(size);
        this._EditScreenViewAsParent.setState({rerender:true});
    }

    _onChangeCalltableBodyFontSize( size ){
        const widgetData = this._getWidgetData();
        widgetData.setCalltableBodyFontSize(size);
        this._EditScreenViewAsParent.setState({rerender:true});
    }

    _onChangeCalltableActiveButtonWidth( n ){
        const widgetData = this._getWidgetData();
        widgetData.setCalltableActiveButtonWidth(n);
        this._EditScreenViewAsParent.setState({rerender:true});
    }

    _onChangeCalltableActiveButtonHeight( n ){
        const widgetData = this._getWidgetData();
        widgetData.setCalltableActiveButtonHeight(n);
        this._EditScreenViewAsParent.setState({rerender:true});
    }

    _onChangeCalltableActiveButtonFontSize( size ){
        const widgetData = this._getWidgetData();
        widgetData.setCalltableActiveButtonFontSize(size);
        this._EditScreenViewAsParent.setState({rerender:true});
    }

    //!override
    _getRenderMainJsx(){
        const widgetData = this._getWidgetData();
        const jsx = (
            <>
                <p>{i18n.t("bgColor")}</p>
                <Colorpicker format="rgb" value={widgetData.getCalltableBgColor()}
                             onChange={(color) => this._onChangeCalltableBgColor(color)}/>
                <p>{i18n.t("outerBorderThickness")}</p>
                <InputNumber min="0" value={widgetData.getCalltableOuterBorderThickness()}
                             onChange={(n) => this._onChangeCalltableOuterBorderThickness(n)}/>
                <p>{i18n.t("outerBorderColor")}</p>
                <Colorpicker format="rgb" value={widgetData.getCalltableOuterBorderColor()}
                             onChange={(color) => this._onChangeCalltableOuterBorderColor(color)}/>
                <p>{i18n.t("outerBorderRadius")}</p>
                <InputNumber min="0" value={widgetData.getCalltableOuterBorderRadius()}
                             onChange={(n) => this._onChangeCalltableOuterBorderRadius(n)}/>
                <Divider>{i18n.t("header_settings")}</Divider>
                <p>{i18n.t("Text_size")}</p>
                <InputNumber min="0" value={widgetData.getCalltableHeaderFontSize()}
                             onChange={(size) => this._onChangeCalltableHeaderFontSize(size)}/>
                <p>{i18n.t("fgColor")}</p>
                <Colorpicker format="rgb" value={widgetData.getCalltableHeaderFgColor()}
                             onChange={(color) => this._onChangeCalltableHeaderFgColor(color)}/>
                <p>{i18n.t("rowUnderlineThickness")}</p>
                <InputNumber min="0" value={widgetData.getCalltableHeaderRowUnderlineThickness()}
                             onChange={(n) => this._onChangeCalltableHeaderRowUnderlineThickness(n)}/>
                <p>{i18n.t("rowUnderlineColor")}</p>
                <Colorpicker format="rgb" value={widgetData.getCalltableHeaderRowUnderlineColor()}
                             onChange={(color) => this._onChangeCalltableHeaderRowUnderlineColor(color)}/>
                <Divider>{i18n.t("body_settings")}</Divider>
                <p>{i18n.t("Text_size")}</p>
                <InputNumber min="0" value={widgetData.getCalltableBodyFontSize()}
                             onChange={(size) => this._onChangeCalltableBodyFontSize(size)}/>
                <p>{i18n.t("fgColor")}</p>
                <Colorpicker format="rgb" value={widgetData.getCalltableBodyFgColor()}
                             onChange={(color) => this._onChangeCalltableBodyFgColor(color)}/>
                <p>{i18n.t("rowUnderlineThickness")}</p>
                <InputNumber min="0" value={widgetData.getCalltableBodyRowUnderlineThickness()}
                             onChange={(n) => this._onChangeCalltableBodyRowUnderlineThickness(n)}/>
                <p>{i18n.t("rowUnderlineColor")}</p>
                <Colorpicker format="rgb" value={widgetData.getCalltableBodyRowUnderlineColor()}
                             onChange={(color) => this._onChangeCalltableBodyRowUnderlineColor(color)}/>
                <p>{i18n.t("activeRowBgColor")}</p>
                <Colorpicker format="rgb" value={widgetData.getCalltableBodyActiveRowBgColor()}
                             onChange={(color) => this._onChangeCalltableBodyActiveRowBgColor(color)}/>
                <Divider>{i18n.t("Active_button_settings")}</Divider>
                <p>{i18n.t("Text_size")}</p>
                <InputNumber min="0" value={widgetData.getCalltableActiveButtonFontSize()}
                             onChange={(n) => this._onChangeCalltableActiveButtonFontSize(n)}/>
                <p>{i18n.t("width")}</p>
                <InputNumber min="0" value={widgetData.getCalltableActiveButtonWidth()}
                             onChange={(n) => this._onChangeCalltableActiveButtonWidth(n)}/>
                <p>{i18n.t("height")}</p>
                <InputNumber min="0" value={widgetData.getCalltableActiveButtonHeight()}
                             onChange={(n) => this._onChangeCalltableActiveButtonHeight(n)}/>
            </>
        );
        return jsx;
    }
}