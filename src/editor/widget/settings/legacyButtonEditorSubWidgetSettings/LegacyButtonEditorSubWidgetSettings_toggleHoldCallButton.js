import React from 'react';
import LegacyButtonEditorSubWidgetSettings from "./LegacyButtonEditorSubWidgetSettings";
import Form from "antd/lib/form";
import i18n from "../../../../i18n";
import EditScreenView from "../../../EditScreenView";

export default class LegacyButtonEditorSubWidgetSettings_toggleHoldCallButton extends LegacyButtonEditorSubWidgetSettings  {

    constructor( legacyButtonEditorWidgetSettingsAsParent, legacyButtonEditorSubWidgetData  ) {
        super(  legacyButtonEditorWidgetSettingsAsParent, legacyButtonEditorSubWidgetData  );
    }

    // _onFormHoldIconSelected( icon ){
    //     this._LegacyButtonEditorSubWidgetData.setHoldIcon( icon );
    //     this._LegacyButtonEditorWidgetSettingsAsParent.getEditScreenViewAsParent().commitEdit();
    // }

    _onHoldIconSelected( selectIconModalAsCaller, icon, iconName ){
        this._LegacyButtonEditorSubWidgetData.setHoldIcon( icon );
        this._LegacyButtonEditorSubWidgetData.setHoldIconName( iconName );
        this._LegacyButtonEditorWidgetSettingsAsParent.getEditScreenViewAsParent().commitEdit();
    }

    _onHoldIconSelectCanceled( selectIconModalAsCaller ){
    }

    _onClickRemoveHoldIcon(ev){
        const subWidgetData = this._LegacyButtonEditorSubWidgetData;
        subWidgetData.setHoldIcon(null);
        subWidgetData.setHoldIconName(null);
        this._LegacyButtonEditorWidgetSettingsAsParent.getEditScreenViewAsParent().commitEdit();
    }

    _onChangeHoldFgColor( color ){
        this._LegacyButtonEditorSubWidgetData.setHoldFgColor(color);
        this._LegacyButtonEditorWidgetSettingsAsParent.getEditScreenViewAsParent().commitEdit();
    }

    _onChangeHoldBgColor( color ){
        this._LegacyButtonEditorSubWidgetData.setHoldBgColor(color);
        this._LegacyButtonEditorWidgetSettingsAsParent.getEditScreenViewAsParent().commitEdit();
    }

    _onChangeHoldOuterBorderColor( color ){
        this._LegacyButtonEditorSubWidgetData.setHoldOuterBorderColor(color);
        this._LegacyButtonEditorWidgetSettingsAsParent.getEditScreenViewAsParent().commitEdit();
    }

    _onChangeHoldOuterBorderRadius( n ){
        this._LegacyButtonEditorSubWidgetData.setHoldOuterBorderRadius(n);
        this._LegacyButtonEditorWidgetSettingsAsParent.getEditScreenViewAsParent().commitEdit();
    }

    _onChangeHoldOuterBorderThickness( n ){
        this._LegacyButtonEditorSubWidgetData.setHoldOuterBorderThickness(n);
        this._LegacyButtonEditorWidgetSettingsAsParent.getEditScreenViewAsParent().commitEdit();
    }

    _onChangeHoldFontSize( n ){
        this._LegacyButtonEditorSubWidgetData.setHoldFontSize(n);
        this._LegacyButtonEditorWidgetSettingsAsParent.getEditScreenViewAsParent().commitEdit();
    }

    _onChangeHoldIconWidth( n ){
        this._LegacyButtonEditorSubWidgetData.setHoldIconWidth(n);
        this._LegacyButtonEditorWidgetSettingsAsParent.getEditScreenViewAsParent().commitEdit();
    }

    _onChangeHoldIconHeight( n ){
        this._LegacyButtonEditorSubWidgetData.setHoldIconHeight(n);
        this._LegacyButtonEditorWidgetSettingsAsParent.getEditScreenViewAsParent().commitEdit();
    }

    _onChangeHoldLabel(holdLabel){
        //const holdLabel = e.currentTarget.value;
        this._LegacyButtonEditorSubWidgetData.setHoldLabel( holdLabel  );
        this._LegacyButtonEditorWidgetSettingsAsParent.getEditScreenViewAsParent().commitEdit();
    }

    // _onFormUnholdIconSelected( icon ){
    //     this._LegacyButtonEditorSubWidgetData.setUnholdIcon( icon );
    //     this._LegacyButtonEditorWidgetSettingsAsParent.getEditScreenViewAsParent().commitEdit();
    // }

    _onUnholdIconSelected( selectIconModalAsCaller, icon, iconName ){
        this._LegacyButtonEditorSubWidgetData.setUnholdIcon( icon );
        this._LegacyButtonEditorSubWidgetData.setUnholdIconName( iconName );
        this._LegacyButtonEditorWidgetSettingsAsParent.getEditScreenViewAsParent().commitEdit();
    }

    _onUnholdIconSelectCanceled( selectIconModalAsCaller ){
    }

    _onClickRemoveUnholdIcon(ev){
        const subWidgetData = this._LegacyButtonEditorSubWidgetData;
        subWidgetData.setUnholdIcon(null);
        subWidgetData.setUnholdIconName(null);
        this._LegacyButtonEditorWidgetSettingsAsParent.getEditScreenViewAsParent().commitEdit();
    }

    _onChangeUnholdFgColor( color ){
        this._LegacyButtonEditorSubWidgetData.setUnholdFgColor(color);
        this._LegacyButtonEditorWidgetSettingsAsParent.getEditScreenViewAsParent().commitEdit();
    }

    _onChangeUnholdBgColor( color ){
        this._LegacyButtonEditorSubWidgetData.setUnholdBgColor(color);
        this._LegacyButtonEditorWidgetSettingsAsParent.getEditScreenViewAsParent().commitEdit();
    }

    _onChangeUnholdOuterBorderColor( color ){
        this._LegacyButtonEditorSubWidgetData.setUnholdOuterBorderColor(color);
        this._LegacyButtonEditorWidgetSettingsAsParent.getEditScreenViewAsParent().commitEdit();
    }

    _onChangeUnholdOuterBorderRadius( n ){
        this._LegacyButtonEditorSubWidgetData.setUnholdOuterBorderRadius(n);
        this._LegacyButtonEditorWidgetSettingsAsParent.getEditScreenViewAsParent().commitEdit();
    }

    _onChangeUnholdOuterBorderThickness( n ){
        this._LegacyButtonEditorSubWidgetData.setUnholdOuterBorderThickness(n);
        this._LegacyButtonEditorWidgetSettingsAsParent.getEditScreenViewAsParent().commitEdit();
    }

    _onChangeUnholdFontSize( n ){
        this._LegacyButtonEditorSubWidgetData.setUnholdFontSize(n);
        this._LegacyButtonEditorWidgetSettingsAsParent.getEditScreenViewAsParent().commitEdit();
    }

    _onChangeUnholdIconWidth( n ){
        this._LegacyButtonEditorSubWidgetData.setUnholdIconWidth(n);
        this._LegacyButtonEditorWidgetSettingsAsParent.getEditScreenViewAsParent().commitEdit();
    }

    _onChangeUnholdIconHeight( n ){
        this._LegacyButtonEditorSubWidgetData.setUnholdIconHeight(n);
        this._LegacyButtonEditorWidgetSettingsAsParent.getEditScreenViewAsParent().commitEdit();
    }

    _onChangeUnholdLabel(unholdLabel){
        //const unholdLabel = e.currentTarget.value;
        this._LegacyButtonEditorSubWidgetData.setUnholdLabel( unholdLabel  );
        this._LegacyButtonEditorWidgetSettingsAsParent.getEditScreenViewAsParent().commitEdit();
    }

    //!override
    getRenderJsx() {
        const subtypeName = this._LegacyButtonEditorSubWidgetData.getLegacyButtonWidgetSubTypeName();
        let  sHoldLabel;
        if( this._LegacyButtonEditorSubWidgetData.getHoldLabel() ){
            sHoldLabel = this._LegacyButtonEditorSubWidgetData.getHoldLabel();
        }
        else{
            sHoldLabel = "";
        }
        let  sUnholdLabel;
        if( this._LegacyButtonEditorSubWidgetData.getUnholdLabel() ){
            sUnholdLabel = this._LegacyButtonEditorSubWidgetData.getUnholdLabel();
        }
        else{
            sUnholdLabel = "";
        }

        const subWidgetData = this._LegacyButtonEditorSubWidgetData;
        //const holdIconSelectJsx = this._getIconSelectJsx( subWidgetData.getHoldIcon(), this._onFormHoldIconSelected );
        const holdIconSelectJsx = this._getSelectIconModalJsx(
			subWidgetData.getHoldIcon(),
            subWidgetData.getHoldIconName(),
			( selectIconModalAsCaller, icon, iconName ) => this._onHoldIconSelected( selectIconModalAsCaller, icon, iconName ),
			(selectIconModalAsCaller) => this._onHoldIconSelectCanceled(selectIconModalAsCaller),
			(ev) => this._onClickRemoveHoldIcon(ev)
		);
        //const unholdIconSelectJsx = this._getIconSelectJsx( subWidgetData.getUnholdIcon(), this._onFormUnholdIconSelected );
        const unholdIconSelectJsx = this._getSelectIconModalJsx(
			subWidgetData.getUnholdIcon(),
            subWidgetData.getUnholdIconName(),
			( selectIconModalAsCaller, icon, iconName ) => this._onUnholdIconSelected( selectIconModalAsCaller, icon, iconName ),
			(selectIconModalAsCaller) => this._onUnholdIconSelectCanceled(selectIconModalAsCaller),
			(ev) => this._onClickRemoveUnholdIcon(ev)
		);
        return  (
            <div className="brOCWidgetSettingsPanel">
                <p className="brOCSettingsSectionHeading">{i18n.t("Hold_button_settings")}</p>
                {this._renderIconField("icon", holdIconSelectJsx)}
                {this._renderFieldRow(
                    this._renderNumberField("Icon_width", subWidgetData.getHoldIconWidth(), (n) => this._onChangeHoldIconWidth(n), {min: "0"}),
                    this._renderNumberField("Icon_height", subWidgetData.getHoldIconHeight(), (n) => this._onChangeHoldIconHeight(n), {min: "0"})
                )}
                {this._renderFieldRow(
                    this._renderTextField("label", sHoldLabel, (e) => this._onChangeHoldLabel(e), {maxLength: 1000, allowClear: true, defaultValue: sHoldLabel}),
                    this._renderNumberField("Text_size", subWidgetData.getHoldFontSize(), (n) => this._onChangeHoldFontSize(n), {min: "0"})
                )}
                {this._renderColorField("fgColor", subWidgetData.getHoldFgColor(), (color) => this._onChangeHoldFgColor(color))}
                {this._renderColorField("bgColor", subWidgetData.getHoldBgColor(), (color) => this._onChangeHoldBgColor(color))}
                {this._renderColorField("outerBorderColor", subWidgetData.getHoldOuterBorderColor(), (color) => this._onChangeHoldOuterBorderColor(color))}
                {this._renderNumberField("outerBorderRadius", subWidgetData.getHoldOuterBorderRadius(), (n) => this._onChangeHoldOuterBorderRadius(n), {min: "0"})}
                {this._renderNumberField("outerBorderThickness", subWidgetData.getHoldOuterBorderThickness(), (n) => this._onChangeHoldOuterBorderThickness(n), {min: "1"})}

                <p className="brOCSettingsSectionHeading">{i18n.t("Unhold_button_settings")}</p>
                {this._renderIconField("icon", unholdIconSelectJsx)}
                {this._renderFieldRow(
                    this._renderNumberField("Icon_width", subWidgetData.getUnholdIconWidth(), (n) => this._onChangeUnholdIconWidth(n), {min: "0"}),
                    this._renderNumberField("Icon_height", subWidgetData.getUnholdIconHeight(), (n) => this._onChangeUnholdIconHeight(n), {min: "0"})
                )}
                {this._renderFieldRow(
                    this._renderTextField("label", sUnholdLabel, (e) => this._onChangeUnholdLabel(e), {maxLength: 1000, allowClear: true, defaultValue: sUnholdLabel}),
                    this._renderNumberField("Text_size", subWidgetData.getUnholdFontSize(), (n) => this._onChangeUnholdFontSize(n), {min: "0"})
                )}
                {this._renderColorField("fgColor", subWidgetData.getUnholdFgColor(), (color) => this._onChangeUnholdFgColor(color))}
                {this._renderColorField("bgColor", subWidgetData.getUnholdBgColor(), (color) => this._onChangeUnholdBgColor(color))}
                {this._renderColorField("outerBorderColor", subWidgetData.getUnholdOuterBorderColor(), (color) => this._onChangeUnholdOuterBorderColor(color))}
                {this._renderNumberField("outerBorderRadius", subWidgetData.getUnholdOuterBorderRadius(), (n) => this._onChangeUnholdOuterBorderRadius(n), {min: "0"})}
                {this._renderNumberField("outerBorderThickness", subWidgetData.getUnholdOuterBorderThickness(), (n) => this._onChangeUnholdOuterBorderThickness(n), {min: "1"})}
            </div>
        );
    }

}