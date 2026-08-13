import React from 'react';
import LegacyButtonEditorSubWidgetSettings from "./LegacyButtonEditorSubWidgetSettings";
import Form from "antd/lib/form";
import i18n from "../../../../i18n";

export default class LegacyButtonEditorSubWidgetSettings_holdCallButton extends LegacyButtonEditorSubWidgetSettings  {

    constructor( legacyButtonEditorWidgetSettingsAsParent, legacyButtonEditorSubWidgetData  ) {
        super(  legacyButtonEditorWidgetSettingsAsParent, legacyButtonEditorSubWidgetData  );
    }

    _onChangeLabel(label){
        //const label = e.currentTarget.value;
        this._LegacyButtonEditorSubWidgetData.setLabel( label  );
        this._LegacyButtonEditorWidgetSettingsAsParent.getEditScreenViewAsParent().commitEdit();
    }

    //!override
    getRenderJsx() {
        const subtypeName = this._LegacyButtonEditorSubWidgetData.getLegacyButtonWidgetSubTypeName();
        let  sLabel;
        if( this._LegacyButtonEditorSubWidgetData.getLabel() ){
            sLabel = this._LegacyButtonEditorSubWidgetData.getLabel();
        }
        else{
            sLabel = "";
        }

        //const iconSelectJsx = this._getIconSelectJsx();
        const iconSelectJsx = this._getSelectIconModalJsx();

        const subWidgetData = this._LegacyButtonEditorSubWidgetData;
        return  (
            <div className="brOCWidgetSettingsPanel">
                {this._renderIconField("icon", iconSelectJsx)}
                {this._renderFieldRow(
                    this._renderNumberField("Icon_width", subWidgetData.getIconWidth(), (n) => this._onChangeIconWidth(n), {min: "0"}),
                    this._renderNumberField("Icon_height", subWidgetData.getIconHeight(), (n) => this._onChangeIconHeight(n), {min: "0"})
                )}
                {this._renderFieldRow(
                    this._renderTextAreaField("label", sLabel, (e) => this._onChangeLabel(e.target.value), {maxLength: 1000, style: {minHeight:68}, defaultValue: sLabel, rows: 3}),
                    this._renderNumberField("Text_size", subWidgetData.getFontSize(), (n) => this._onChangeFontSize(n), {min: "0"})
                )}
                {this._renderColorField("fgColor", subWidgetData.getFgColor(), (color) => this._onChangeFgColor(color))}
                {this._renderColorField("bgColor", subWidgetData.getBgColor(), (color) => this._onChangeBgColor(color))}
                {this._renderColorField("outerBorderColor", subWidgetData.getOuterBorderColor(), (color) => this._onChangeOuterBorderColor(color))}
                {this._renderFieldRow(
                    this._renderNumberField("outerBorderThickness", subWidgetData.getOuterBorderThickness(), (n) => this._onChangeOuterBorderThickness(n), {min: "1"}),
                    this._renderNumberField("outerBorderRadius", subWidgetData.getOuterBorderRadius(), (n) => this._onChangeOuterBorderRadius(n), {min: "0"})
                )}
            </div>
        );
    }

}