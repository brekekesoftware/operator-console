import React from 'react';
import EditorWidgetSettings from "./EditorWidgetSettings";
import i18n from "../../../i18n";

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
        this.getEditScreenViewAsParent().commitEdit();
    }

    _onChangeExtensionStatusFgColor( color ){
        const widgetData = this._getWidgetData();
        widgetData.setExtensionStatusFgColor(color);
        this._EditScreenViewAsParent.commitEdit();
    }

    _onChangeExtensionStatusLampSize( size ){
        const widgetData = this._getWidgetData();
        widgetData.setExtensionStatusLampSize( size );
        this._EditScreenViewAsParent.commitEdit();
    }

    _onChangeExtensionStatusExtensionFontSize( size ){
        const widgetData = this._getWidgetData();
        widgetData.setExtensionStatusExtensionFontSize( size );
        this._EditScreenViewAsParent.commitEdit();
    }

    _onChangeExtensionStatusExtensionTextTopMargin( size ){
        const widgetData = this._getWidgetData();
        widgetData.setExtensionStatusExtensionTextTopMargin( size );
        this._EditScreenViewAsParent.commitEdit();
    }

    getEditScreenViewAsParent(){
        return this._EditScreenViewAsParent;
    }

    //!override
    _getRenderMainJsx(){
        const widgetData = this._getWidgetData();
        const jsx =   (
            <div className="brOCWidgetSettingsPanel">
                <p className="brOCSettingsSectionHeading">{i18n.t("Settings")}</p>
                {this._renderTextField("extension", widgetData.getExtension(), (e) => this._onChangeExtension(e))}
                {this._renderColorField("fgColor", widgetData.getExtensionStatusFgColor(), (color) => this._onChangeExtensionStatusFgColor(color))}
                {this._renderNumberField("Lamp_size", widgetData.getExtensionStatusLampSize(), (val) => this._onChangeExtensionStatusLampSize(val), {min: 0})}
                {this._renderNumberField("Text_top_margin", widgetData.getExtensionStatusExtensionTextTopMargin(), (val) => this._onChangeExtensionStatusExtensionTextTopMargin(val))}
                {this._renderNumberField("Text_size", widgetData.getExtensionStatusExtensionFontSize(), (val) => this._onChangeExtensionStatusExtensionFontSize(val), {min: 0})}
            </div>
        );
        return jsx;
    }
}