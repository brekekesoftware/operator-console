import React from 'react';
import EditorWidgetSettings from "./EditorWidgetSettings";
import i18n from "../../../i18n";
import {Colorpicker} from "antd-colorpicker";
import InputNumber from "antd/lib/input-number";
import {Divider} from "antd";

export default class LegacyUccacEditorWidgetSettings extends EditorWidgetSettings {
    _onChangeUccacwidgetFgColor( color ){
        const widgetData = this._getWidgetData();
        widgetData.setUccacwidgetFgColor(color);
        this._EditScreenViewAsParent.setState({rerender:true});
    }

    _onChangeUccacwidgetBgColor( color ){
        const widgetData = this._getWidgetData();
        widgetData.setUccacwidgetBgColor(color);
        this._EditScreenViewAsParent.setState({rerender:true});
    }

    _onChangeBorderRadius( n ){
        const widgetData = this._getWidgetData();
        widgetData.setBorderRadius(n);
        this._EditScreenViewAsParent.setState({rerender:true});
    }

    _onChangeInsideShadow_horizontalOffset( n ){
        const widgetData = this._getWidgetData();
        widgetData.setInsideShadow_horizontalOffset(n);
        this._EditScreenViewAsParent.setState({rerender:true});
    }

    _onChangeInsideShadow_varticalOffset( n ){
        const widgetData = this._getWidgetData();
        widgetData.setInsideShadow_verticalOffset(n);
        this._EditScreenViewAsParent.setState({rerender:true});
    }

    _onChangeInsideShadow_blur( n ){
        const widgetData = this._getWidgetData();
        widgetData.setInsideShadow_blur(n);
        this._EditScreenViewAsParent.setState({rerender:true});
    }

    _onChangeInsideShadow_spread( n ){
        const widgetData = this._getWidgetData();
        widgetData.setInsideShadow_spread(n);
        this._EditScreenViewAsParent.setState({rerender:true});
    }

    _onChangeInsideShadow_color( color ){
        const widgetData = this._getWidgetData();
        widgetData.setInsideShadow_color(color);
        this._EditScreenViewAsParent.setState({rerender:true});
    }

    _onChangeOutsideShadow_horizontalOffset( n ){
        const widgetData = this._getWidgetData();
        widgetData.setOutsideShadow_horizontalOffset(n);
        this._EditScreenViewAsParent.setState({rerender:true});
    }

    _onChangeOutsideShadow_varticalOffset( n ){
        const widgetData = this._getWidgetData();
        widgetData.setOutsideShadow_verticalOffset(n);
        this._EditScreenViewAsParent.setState({rerender:true});
    }

    _onChangeOutsideShadow_blur( n ){
        const widgetData = this._getWidgetData();
        widgetData.setOutsideShadow_blur(n);
        this._EditScreenViewAsParent.setState({rerender:true});
    }

    _onChangeOutsideShadow_spread( n ){
        const widgetData = this._getWidgetData();
        widgetData.setOutsideShadow_spread(n);
        this._EditScreenViewAsParent.setState({rerender:true});
    }

    _onChangeOutsideShadow_color( color ){
        const widgetData = this._getWidgetData();
        widgetData.setOutsideShadow_color(color);
        this._EditScreenViewAsParent.setState({rerender:true});
    }

    //!override
    _getRenderMainJsx(){
        const widgetData = this._getWidgetData();
        const jsx = (
            <>
                <p>{i18n.t("fgColor")}</p>
                <Colorpicker format="rgb" value={widgetData.getUccacwidgetFgColor()}
                             onChange={(color) => this._onChangeUccacwidgetFgColor(color)}/>
                <p>{i18n.t("bgColor")}</p>
                <Colorpicker format="rgb" value={widgetData.getUccacwidgetBgColor()}
                             onChange={(color) => this._onChangeUccacwidgetBgColor(color)}/>
                <p>{i18n.t("borderRadius")}</p>
                <InputNumber min="0" value={widgetData.getBorderRadius()}
                             onChange={(n) => this._onChangeBorderRadius(n)}/>
                <Divider>{i18n.t("insideShadow_settings")}</Divider>
                <p>{i18n.t("horizontalOffset")}</p>
                <InputNumber step={1} value={widgetData.getInsideShadow_horizontalOffset()}
                             onChange={(n) => this._onChangeInsideShadow_horizontalOffset(n)}/>
                <p>{i18n.t("verticalOffset")}</p>
                <InputNumber step={1} value={widgetData.getInsideShadow_verticalOffset()}
                             onChange={(n) => this._onChangeInsideShadow_varticalOffset(n)}/>
                <p>{i18n.t("blur")}</p>
                <InputNumber step={1} value={widgetData.getInsideShadow_blur()}
                             onChange={(n) => this._onChangeInsideShadow_blur(n)}/>
                <p>{i18n.t("spread")}</p>
                <InputNumber step={1} value={widgetData.getInsideShadow_spread()}
                             onChange={(n) => this._onChangeInsideShadow_spread(n)}/>
                <p>{i18n.t("color")}</p>
                <Colorpicker format="rgb" value={widgetData.getInsideShadow_color()}
                             onChange={(color) => this._onChangeInsideShadow_color(color)}/>
                <Divider>{i18n.t("outsideShadow_settings")}</Divider>
                <p>{i18n.t("horizontalOffset")}</p>
                <InputNumber step={1} value={widgetData.getOutsideShadow_horizontalOffset()}
                             onChange={(n) => this._onChangeOutsideShadow_horizontalOffset(n)}/>
                <p>{i18n.t("verticalOffset")}</p>
                <InputNumber step={1} value={widgetData.getOutsideShadow_verticalOffset()}
                             onChange={(n) => this._onChangeOutsideShadow_varticalOffset(n)}/>
                <p>{i18n.t("blur")}</p>
                <InputNumber step={1} value={widgetData.getOutsideShadow_blur()}
                             onChange={(n) => this._onChangeOutsideShadow_blur(n)}/>
                <p>{i18n.t("spread")}</p>
                <InputNumber step={1} value={widgetData.getOutsideShadow_spread()}
                             onChange={(n) => this._onChangeOutsideShadow_spread(n)}/>
                <p>{i18n.t("color")}</p>
                <Colorpicker format="rgb" value={widgetData.getOutsideShadow_color()}
                             onChange={(color) => this._onChangeOutsideShadow_color(color)}/>
            </>
        );
        return jsx;
    }
}