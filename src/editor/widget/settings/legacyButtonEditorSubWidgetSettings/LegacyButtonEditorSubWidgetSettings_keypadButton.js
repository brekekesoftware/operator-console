import React from 'react';
import LegacyButtonEditorSubWidgetSettings from "./LegacyButtonEditorSubWidgetSettings";
import Form from "antd/lib/form";
import i18n from "../../../../i18n";

export default class LegacyButtonEditorSubWidgetSettings_keypadButton extends LegacyButtonEditorSubWidgetSettings  {

    constructor( legacyButtonEditorWidgetSettingsAsParent, legacyButtonEditorSubWidgetData  ) {
        super(  legacyButtonEditorWidgetSettingsAsParent, legacyButtonEditorSubWidgetData  );
    }

    _onChangeSymbol(e){
        const symbol = e.currentTarget.value;
        this._LegacyButtonEditorSubWidgetData.setSymbol( symbol  );
        this._LegacyButtonEditorWidgetSettingsAsParent.getEditScreenViewAsParent().commitEdit();
    }

    //!override
    getRenderJsx() {
        const subtypeName = this._LegacyButtonEditorSubWidgetData.getLegacyButtonWidgetSubTypeName();
        let  sSymbol;
        if( this._LegacyButtonEditorSubWidgetData.getSymbol() ){
            sSymbol = this._LegacyButtonEditorSubWidgetData.getSymbol();
        }
        else{
            sSymbol = "";
        }

        //const iconSelectJsx = this._getIconSelectJsx();
        const iconSelectJsx = this._getSelectIconModalJsx();

        const subWidgetData = this._LegacyButtonEditorSubWidgetData;
        return  (
            <div className="brOCWidgetSettingsPanel">
                {this._renderIconField("icon", iconSelectJsx)}
                {this._renderNumberField("Icon_width", subWidgetData.getIconWidth(), (n) => this._onChangeIconWidth(n), {min: "0"})}
                {this._renderNumberField("Icon_height", subWidgetData.getIconHeight(), (n) => this._onChangeIconHeight(n), {min: "0"})}
                {this._renderTextField("symbol", sSymbol, (e) => this._onChangeSymbol(e), {maxLength: 1, allowClear: true, defaultValue: sSymbol})}
                {this._renderNumberField("Text_size", subWidgetData.getFontSize(), (n) => this._onChangeFontSize(n), {min: "0"})}
                {this._renderColorField("fgColor", subWidgetData.getFgColor(), (color) => this._onChangeFgColor(color))}
                {this._renderColorField("bgColor", subWidgetData.getBgColor(), (color) => this._onChangeBgColor(color))}
                {this._renderColorField("outerBorderColor", subWidgetData.getOuterBorderColor(), (color) => this._onChangeOuterBorderColor(color))}
                {this._renderNumberField("outerBorderRadius", subWidgetData.getOuterBorderRadius(), (n) => this._onChangeOuterBorderRadius(n), {min: "0"})}
                {this._renderNumberField("outerBorderThickness", subWidgetData.getOuterBorderThickness(), (n) => this._onChangeOuterBorderThickness(n), {min: "1"})}
            </div>
        );
    }

}