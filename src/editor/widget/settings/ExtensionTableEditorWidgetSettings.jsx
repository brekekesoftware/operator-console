import React from 'react';
import EditorWidgetSettings from "./EditorWidgetSettings";
import i18n from "../../../i18n";
import {Colorpicker} from "antd-colorpicker";
import InputNumber from "antd/lib/input-number";
import {Divider} from "antd";

export default class ExtensionTableEditorWidgetSettings extends EditorWidgetSettings {
    _onChangeExtensiontableBgColor( color ){
        const widgetData = this._getWidgetData();
        widgetData.setExtensiontableBgColor(color);
        this._EditScreenViewAsParent.setState({rerender:true});
    }

    _onChangeExtensiontableOuterBorderThickness( n ){
        const widgetData = this._getWidgetData();
        widgetData.setExtensiontableOuterBorderThickness(n);
        this._EditScreenViewAsParent.setState({rerender:true});
    }

    _onChangeExtensiontableOuterBorderColor( color ){
        const widgetData = this._getWidgetData();
        widgetData.setExtensiontableOuterBorderColor(color);
        this._EditScreenViewAsParent.setState({rerender:true});
    }

    _onChangeExtensiontableOuterBorderRadius( n ){
        const widgetData = this._getWidgetData();
        widgetData.setExtensiontableOuterBorderRadius(n);
        this._EditScreenViewAsParent.setState({rerender:true});
    }

    _onChangeExtensiontableHeaderFgColor( color ){
        const widgetData = this._getWidgetData();
        widgetData.setExtensiontableHeaderFgColor(color);
        this._EditScreenViewAsParent.setState({rerender:true});
    }

    _onChangeExtensiontableHeaderRowUnderlineThickness( n ){
        const widgetData = this._getWidgetData();
        widgetData.setExtensiontableHeaderRowUnderlineThickness(n);
        this._EditScreenViewAsParent.setState({rerender:true});
    }

    _onChangeExtensiontableHeaderRowUnderlineColor( color ){
        const widgetData = this._getWidgetData();
        widgetData.setExtensiontableHeaderRowUnderlineColor(color);
        this._EditScreenViewAsParent.setState({rerender:true});
    }

    _onChangeExtensiontableBodyFgColor( color ){
        const widgetData = this._getWidgetData();
        widgetData.setExtensiontableBodyFgColor(color);
        this._EditScreenViewAsParent.setState({rerender:true});
    }

    _onChangeExtensiontableBodyRowUnderlineThickness( n ){
        const widgetData = this._getWidgetData();
        widgetData.setExtensiontableBodyRowUnderlineThickness(n);
        this._EditScreenViewAsParent.setState({rerender:true});
    }

    _onChangeExtensiontableBodyRowUnderlineColor( color ){
        const widgetData = this._getWidgetData();
        widgetData.setExtensiontableBodyRowUnderlineColor(color);
        this._EditScreenViewAsParent.setState({rerender:true});
    }

    //!override
    _getRenderMainJsx(){
        const widgetData = this._getWidgetData();
        const jsx = (
            <>
                <p>{i18n.t("bgColor")}</p>
                <Colorpicker format="rgb" value={widgetData.getExtensiontableBgColor()}
                             onChange={(color) => this._onChangeExtensiontableBgColor(color)}/>
                <p>{i18n.t("outerBorderThickness")}</p>
                <InputNumber min="0" value={widgetData.getExtensiontableOuterBorderThickness()}
                             onChange={(n) => this._onChangeExtensiontableOuterBorderThickness(n)}/>
                <p>{i18n.t("outerBorderColor")}</p>
                <Colorpicker format="rgb" value={widgetData.getExtensiontableOuterBorderColor()}
                             onChange={(color) => this._onChangeExtensiontableOuterBorderColor(color)}/>
                <p>{i18n.t("outerBorderRadius")}</p>
                <InputNumber min="0" value={widgetData.getExtensiontableOuterBorderRadius()}
                             onChange={(n) => this._onChangeExtensiontableOuterBorderRadius(n)}/>
                <Divider>{i18n.t("header_settings")}</Divider>
                <p>{i18n.t("fgColor")}</p>
                <Colorpicker format="rgb" value={widgetData.getExtensiontableHeaderFgColor()}
                             onChange={(color) => this._onChangeExtensiontableHeaderFgColor(color)}/>
                <p>{i18n.t("rowUnderlineThickness")}</p>
                <InputNumber min="0" value={widgetData.getExtensiontableHeaderRowUnderlineThickness()}
                             onChange={(n) => this._onChangeExtensiontableHeaderRowUnderlineThickness(n)}/>
                <p>{i18n.t("rowUnderlineColor")}</p>
                <Colorpicker format="rgb" value={widgetData.getExtensiontableHeaderRowUnderlineColor()}
                             onChange={(color) => this._onChangeExtensiontableHeaderRowUnderlineColor(color)}/>
                <Divider>{i18n.t("body_settings")}</Divider>
                <p>{i18n.t("fgColor")}</p>
                <Colorpicker format="rgb" value={widgetData.getExtensiontableBodyFgColor()}
                             onChange={(color) => this._onChangeExtensiontableBodyFgColor(color)}/>
                <p>{i18n.t("rowUnderlineThickness")}</p>
                <InputNumber min="0" value={widgetData.getExtensiontableBodyRowUnderlineThickness()}
                             onChange={(n) => this._onChangeExtensiontableBodyRowUnderlineThickness(n)}/>
                <p>{i18n.t("rowUnderlineColor")}</p>
                <Colorpicker format="rgb" value={widgetData.getExtensiontableBodyRowUnderlineColor()}
                             onChange={(color) => this._onChangeExtensiontableBodyRowUnderlineColor(color)}/>
            </>
        );
        return jsx;
    }
}