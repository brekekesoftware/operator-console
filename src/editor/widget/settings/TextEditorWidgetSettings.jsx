import React from 'react';
import EditorWidgetSettings from "./EditorWidgetSettings";
import i18n from "../../../i18n";

export default class TextEditorWidgetSettings extends EditorWidgetSettings {
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

    _onChangeTextFontSize( n ){
        const widgetData = this._getWidgetData();
        widgetData.setTextFontSize(n);
        this._EditScreenViewAsParent.commitEdit();
    }

    _onChangeTextFgColor( color ){
        const widgetData = this._getWidgetData();
        widgetData.setTextFgColor(color);
        this._EditScreenViewAsParent.commitEdit();
    }

    _onChangeTextBgColor( color ){
        const widgetData = this._getWidgetData();
        widgetData.setTextBgColor(color);
        this._EditScreenViewAsParent.commitEdit();
    }

    _onChangeTextBorderRadius( n ){
        const widgetData = this._getWidgetData();
        widgetData.setTextBorderRadius(n);
        this._EditScreenViewAsParent.commitEdit();
    }

    _onChangeTextArea( e ){
        const text = e.currentTarget.value;
        this._getWidgetData().setText( text  );
        this.getEditScreenViewAsParent().commitEdit();
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
                {this._renderTextAreaField("text", widgetData.getText(), (e) => this._onChangeTextArea(e), {style: {width: "100%", height: "160px"}})}
                {this._renderNumberField("Text_size", widgetData.getTextFontSize(), (n) => this._onChangeTextFontSize(n), {min: 0})}
                {this._renderColorField("fgColor", widgetData.getTextFgColor(), (color) => this._onChangeTextFgColor(color))}
                {this._renderColorField("bgColor", widgetData.getTextBgColor(), (color) => this._onChangeTextBgColor(color))}
                {this._renderNumberField("borderRadius", widgetData.getTextBorderRadius(), (n) => this._onChangeTextBorderRadius(n), {min: 0})}
            </div>
        );
        return jsx;
    }
}