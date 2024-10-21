import React from 'react';
import EditorWidgetSettings from "./EditorWidgetSettings";
import i18n from "../../../i18n";
import {Input} from "antd";
import {InputNumber} from "antd";
import {Colorpicker} from "antd-colorpicker";

export default class LegacyExtensionStatusEditorWidgetSettings extends EditorWidgetSettings {
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

    _onChangeExtension( e ){
        const extension = e.currentTarget.value;
        this._getWidgetData().setExtension( extension  );
        this.getEditScreenViewAsParent().setState({rerender:true});
    }

    _onChangeExtensionStatusFgColor( color ){
        const widgetData = this._getWidgetData();
        widgetData.setExtensionStatusFgColor(color);
        this._EditScreenViewAsParent.setState({rerender:true});
    }

    _onChangeExtensionStatusLampSize( size ){
        const widgetData = this._getWidgetData();
        widgetData.setExtensionStatusLampSize( size );
        this._EditScreenViewAsParent.setState({rerender:true});
    }

    _onChangeExtensionStatusExtensionFontSize( size ){
        const widgetData = this._getWidgetData();
        widgetData.setExtensionStatusExtensionFontSize( size );
        this._EditScreenViewAsParent.setState({rerender:true});
    }

    _onChangeExtensionStatusExtensionTextTopMargin( size ){
        const widgetData = this._getWidgetData();
        widgetData.setExtensionStatusExtensionTextTopMargin( size );
        this._EditScreenViewAsParent.setState({rerender:true});
    }

    getEditScreenViewAsParent(){
        return this._EditScreenViewAsParent;
    }

    //!override
    _getRenderMainJsx(){
        const widgetData = this._getWidgetData();
        const jsx =   (
            <>
                <p>{i18n.t("extension")}</p>
                <Input value={widgetData.getExtension()} onChange={(e) => this._onChangeExtension(e)}/>
                <p>{i18n.t("fgColor")}</p>
                <Colorpicker format="rgb" value={widgetData.getExtensionStatusFgColor()}
                             onChange={(color) => this._onChangeExtensionStatusFgColor(color)}/>
                <p>{i18n.t("Lamp_size")}</p>
                <InputNumber min={0} value={widgetData.getExtensionStatusLampSize()}
                             onChange={(val) => this._onChangeExtensionStatusLampSize(val)}/>
                <p>{i18n.t("Text_top_margin")}</p>
                <InputNumber value={widgetData.getExtensionStatusExtensionTextTopMargin()}
                             onChange={(val) => this._onChangeExtensionStatusExtensionTextTopMargin(val)}/>
                <p>{i18n.t("Text_size")}</p>
                <InputNumber min={0} value={widgetData.getExtensionStatusExtensionFontSize()}
                             onChange={(val) => this._onChangeExtensionStatusExtensionFontSize(val)}/>
            </>
        );
        return jsx;
    }
}