import React from 'react';
import LegacyButtonEditorSubWidgetSettings from "./LegacyButtonEditorSubWidgetSettings";
import i18n from "../../../../i18n";
import Input from "antd/lib/input";

export default class LegacyButtonEditorSubWidgetSettings_quickCallButton extends LegacyButtonEditorSubWidgetSettings  {

    constructor( legacyButtonEditorWidgetSettingsAsParent, legacyButtonEditorSubWidgetData  ) {
        super(  legacyButtonEditorWidgetSettingsAsParent, legacyButtonEditorSubWidgetData  );
    }

    _onChangeLabel(label){
        //const label = e.currentTarget.value;
        this._LegacyButtonEditorSubWidgetData.setLabel( label  );
        this._LegacyButtonEditorWidgetSettingsAsParent.getEditScreenViewAsParent().commitEdit();
    }

    _onChangeKeypadZero(e){
        const sKey = e.currentTarget.value;
        this._LegacyButtonEditorSubWidgetData.setKeypadZero( sKey  );
        this._LegacyButtonEditorWidgetSettingsAsParent.getEditScreenViewAsParent().commitEdit();
    }

    _onChangeKeypadOne(e){
        const sKey = e.currentTarget.value;
        this._LegacyButtonEditorSubWidgetData.setKeypadOne( sKey  );
        this._LegacyButtonEditorWidgetSettingsAsParent.getEditScreenViewAsParent().commitEdit();
    }

    _onChangeKeypadTwo(e){
        const sKey = e.currentTarget.value;
        this._LegacyButtonEditorSubWidgetData.setKeypadTwo( sKey  );
        this._LegacyButtonEditorWidgetSettingsAsParent.getEditScreenViewAsParent().commitEdit();
    }

    _onChangeKeypadThree(e){
        const sKey = e.currentTarget.value;
        this._LegacyButtonEditorSubWidgetData.setKeypadThree( sKey  );
        this._LegacyButtonEditorWidgetSettingsAsParent.getEditScreenViewAsParent().commitEdit();
    }

    _onChangeKeypadFour(e){
        const sKey = e.currentTarget.value;
        this._LegacyButtonEditorSubWidgetData.setKeypadFour( sKey  );
        this._LegacyButtonEditorWidgetSettingsAsParent.getEditScreenViewAsParent().commitEdit();
    }

    _onChangeKeypadFive(e){
        const sKey = e.currentTarget.value;
        this._LegacyButtonEditorSubWidgetData.setKeypadFive( sKey  );
        this._LegacyButtonEditorWidgetSettingsAsParent.getEditScreenViewAsParent().commitEdit();
    }

    _onChangeKeypadSix(e){
        const sKey = e.currentTarget.value;
        this._LegacyButtonEditorSubWidgetData.setKeypadSix( sKey  );
        this._LegacyButtonEditorWidgetSettingsAsParent.getEditScreenViewAsParent().commitEdit();
    }

    _onChangeKeypadSeven(e){
        const sKey = e.currentTarget.value;
        this._LegacyButtonEditorSubWidgetData.setKeypadSeven( sKey  );
        this._LegacyButtonEditorWidgetSettingsAsParent.getEditScreenViewAsParent().commitEdit();
    }

    _onChangeKeypadEight(e){
        const sKey = e.currentTarget.value;
        this._LegacyButtonEditorSubWidgetData.setKeypadEight( sKey  );
        this._LegacyButtonEditorWidgetSettingsAsParent.getEditScreenViewAsParent().commitEdit();
    }

    _onChangeKeypadNine(e){
        const sKey = e.currentTarget.value;
        this._LegacyButtonEditorSubWidgetData.setKeypadNine( sKey  );
        this._LegacyButtonEditorWidgetSettingsAsParent.getEditScreenViewAsParent().commitEdit();
    }

    _onChangeKeypadAsterisk(e){
        const sKey = e.currentTarget.value;
        this._LegacyButtonEditorSubWidgetData.setKeypadAsterisk( sKey  );
        this._LegacyButtonEditorWidgetSettingsAsParent.getEditScreenViewAsParent().commitEdit();
    }

    _onChangeKeypadSharp(e){
        const sKey = e.currentTarget.value;
        this._LegacyButtonEditorSubWidgetData.setKeypadSharp( sKey  );
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
        const  sKeypadZero = this._LegacyButtonEditorSubWidgetData.getKeypadZero() ? this._LegacyButtonEditorSubWidgetData.getKeypadZero() : "";
        const  sKeypadOne = this._LegacyButtonEditorSubWidgetData.getKeypadOne() ? this._LegacyButtonEditorSubWidgetData.getKeypadOne() : "";
        const  sKeypadTwo = this._LegacyButtonEditorSubWidgetData.getKeypadTwo() ? this._LegacyButtonEditorSubWidgetData.getKeypadTwo() : "";
        const  sKeypadThree = this._LegacyButtonEditorSubWidgetData.getKeypadThree() ? this._LegacyButtonEditorSubWidgetData.getKeypadThree() : "";
        const  sKeypadFour = this._LegacyButtonEditorSubWidgetData.getKeypadFour() ? this._LegacyButtonEditorSubWidgetData.getKeypadFour() : "";
        const  sKeypadFive = this._LegacyButtonEditorSubWidgetData.getKeypadFive() ? this._LegacyButtonEditorSubWidgetData.getKeypadFive() : "";
        const  sKeypadSix = this._LegacyButtonEditorSubWidgetData.getKeypadSix() ? this._LegacyButtonEditorSubWidgetData.getKeypadSix() : "";
        const  sKeypadSeven = this._LegacyButtonEditorSubWidgetData.getKeypadSeven() ? this._LegacyButtonEditorSubWidgetData.getKeypadSeven() : "";
        const  sKeypadEight = this._LegacyButtonEditorSubWidgetData.getKeypadEight() ? this._LegacyButtonEditorSubWidgetData.getKeypadEight() : "";
        const  sKeypadNine = this._LegacyButtonEditorSubWidgetData.getKeypadNine() ? this._LegacyButtonEditorSubWidgetData.getKeypadNine() : "";
        const  sKeypadAsterisk = this._LegacyButtonEditorSubWidgetData.getKeypadAsterisk() ? this._LegacyButtonEditorSubWidgetData.getKeypadAsterisk() : "";
        const  sKeypadSharp = this._LegacyButtonEditorSubWidgetData.getKeypadSharp() ? this._LegacyButtonEditorSubWidgetData.getKeypadSharp() : "";

        //const iconSelectJsx = this._getIconSelectJsx();
        const iconSelectJsx = this._getSelectIconModalJsx();

        const subWidgetData = this._LegacyButtonEditorSubWidgetData;
        return  (
                <div className="brOCWidgetSettingsPanel">
                    {this._renderIconField("icon", iconSelectJsx)}
                    {this._renderNumberField("Icon_width", subWidgetData.getIconWidth(), (n) => this._onChangeIconWidth(n), {min: "0"})}
                    {this._renderNumberField("Icon_height", subWidgetData.getIconHeight(), (n) => this._onChangeIconHeight(n), {min: "0"})}
                    {this._renderTextAreaField("label", sLabel, (e) => this._onChangeLabel(e.target.value), {maxLength: 1000, style: {minHeight:68}, defaultValue: sLabel, rows: 3})}
                    {this._renderRawLabelTextField("0", sKeypadZero, (e) => this._onChangeKeypadZero(e), {allowClear: true, defaultValue: sKeypadZero})}
                    {this._renderRawLabelTextField("1", sKeypadOne, (e) => this._onChangeKeypadOne(e), {allowClear: true, defaultValue: sKeypadOne})}
                    {this._renderRawLabelTextField("2", sKeypadTwo, (e) => this._onChangeKeypadTwo(e), {allowClear: true, defaultValue: sKeypadTwo})}
                    {this._renderRawLabelTextField("3", sKeypadThree, (e) => this._onChangeKeypadThree(e), {allowClear: true, defaultValue: sKeypadThree})}
                    {this._renderRawLabelTextField("4", sKeypadFour, (e) => this._onChangeKeypadFour(e), {allowClear: true, defaultValue: sKeypadFour})}
                    {this._renderRawLabelTextField("5", sKeypadFive, (e) => this._onChangeKeypadFive(e), {allowClear: true, defaultValue: sKeypadFive})}
                    {this._renderRawLabelTextField("6", sKeypadSix, (e) => this._onChangeKeypadSix(e), {allowClear: true, defaultValue: sKeypadSix})}
                    {this._renderRawLabelTextField("7", sKeypadSeven, (e) => this._onChangeKeypadSeven(e), {allowClear: true, defaultValue: sKeypadSeven})}
                    {this._renderRawLabelTextField("8", sKeypadEight, (e) => this._onChangeKeypadEight(e), {allowClear: true, defaultValue: sKeypadEight})}
                    {this._renderRawLabelTextField("9", sKeypadNine, (e) => this._onChangeKeypadNine(e), {allowClear: true, defaultValue: sKeypadNine})}
                    {this._renderRawLabelTextField("*", sKeypadAsterisk, (e) => this._onChangeKeypadAsterisk(e), {allowClear: true, defaultValue: sKeypadAsterisk})}
                    {this._renderRawLabelTextField("#", sKeypadSharp, (e) => this._onChangeKeypadSharp(e), {allowClear: true, defaultValue: sKeypadSharp})}
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