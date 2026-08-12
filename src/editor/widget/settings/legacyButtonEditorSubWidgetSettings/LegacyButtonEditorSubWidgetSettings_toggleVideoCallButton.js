import React from 'react';
import LegacyButtonEditorSubWidgetSettings from "./LegacyButtonEditorSubWidgetSettings";
import Form from "antd/lib/form";
import i18n from "../../../../i18n";
import EditScreenView from "../../../EditScreenView";

export default class LegacyButtonEditorSubWidgetSettings_toggleVideoCallButton extends LegacyButtonEditorSubWidgetSettings  {

    constructor( legacyButtonEditorWidgetSettingsAsParent, legacyButtonEditorSubWidgetData  ) {
        super(  legacyButtonEditorWidgetSettingsAsParent, legacyButtonEditorSubWidgetData  );
    }

    // _onFormVideoOnIconSelected( icon ){
    //     this._LegacyButtonEditorSubWidgetData.setVideoOnIcon( icon );
    //     this._LegacyButtonEditorWidgetSettingsAsParent.getEditScreenViewAsParent().commitEdit();
    // }

    _onVideoOnIconSelected( selectIconModalAsCaller, icon, iconTitle ){
        this._LegacyButtonEditorSubWidgetData.setVideoOnIcon( icon );
        this._LegacyButtonEditorSubWidgetData.setVideoOnIconTitle( iconTitle );
        this._LegacyButtonEditorWidgetSettingsAsParent.getEditScreenViewAsParent().commitEdit();
    }

    _onVideoOnIconSelectCanceled( selectIconModalAsCaller ){
    }

    _onClickRemoveVideoOnIcon(ev){
        const subWidgetData = this._LegacyButtonEditorSubWidgetData;
        subWidgetData.setVideoOnIcon(null);
        subWidgetData.setVideoOnIconTitle(null);
        this._LegacyButtonEditorWidgetSettingsAsParent.getEditScreenViewAsParent().commitEdit();
    }

    _onChangeVideoOnFgColor( color ){
        this._LegacyButtonEditorSubWidgetData.setVideoOnFgColor(color);
        this._LegacyButtonEditorWidgetSettingsAsParent.getEditScreenViewAsParent().commitEdit();
    }

    _onChangeVideoOnBgColor( color ){
        this._LegacyButtonEditorSubWidgetData.setVideoOnBgColor(color);
        this._LegacyButtonEditorWidgetSettingsAsParent.getEditScreenViewAsParent().commitEdit();
    }

    _onChangeVideoOnOuterBorderColor( color ){
        this._LegacyButtonEditorSubWidgetData.setVideoOnOuterBorderColor(color);
        this._LegacyButtonEditorWidgetSettingsAsParent.getEditScreenViewAsParent().commitEdit();
    }

    _onChangeVideoOnOuterBorderRadius( n ){
        this._LegacyButtonEditorSubWidgetData.setVideoOnOuterBorderRadius(n);
        this._LegacyButtonEditorWidgetSettingsAsParent.getEditScreenViewAsParent().commitEdit();
    }

    _onChangeVideoOnOuterBorderThickness( n ){
        this._LegacyButtonEditorSubWidgetData.setVideoOnOuterBorderThickness(n);
        this._LegacyButtonEditorWidgetSettingsAsParent.getEditScreenViewAsParent().commitEdit();
    }

    _onChangeVideoOnFontSize( n ){
        this._LegacyButtonEditorSubWidgetData.setVideoOnFontSize(n);
        this._LegacyButtonEditorWidgetSettingsAsParent.getEditScreenViewAsParent().commitEdit();
    }

    _onChangeVideoOnIconWidth( n ){
        this._LegacyButtonEditorSubWidgetData.setVideoOnIconWidth(n);
        this._LegacyButtonEditorWidgetSettingsAsParent.getEditScreenViewAsParent().commitEdit();
    }

    _onChangeVideoOnIconHeight( n ){
        this._LegacyButtonEditorSubWidgetData.setVideoOnIconHeight(n);
        this._LegacyButtonEditorWidgetSettingsAsParent.getEditScreenViewAsParent().commitEdit();
    }

    _onChangeVideoOnLabel(videoOnLabel){
        //const videoOnLabel = e.currentTarget.value;
        this._LegacyButtonEditorSubWidgetData.setVideoOnLabel( videoOnLabel  );
        this._LegacyButtonEditorWidgetSettingsAsParent.getEditScreenViewAsParent().commitEdit();
    }

    // _onFormVideoOffIconSelected( icon ){
    //     this._LegacyButtonEditorSubWidgetData.setVideoOffIcon( icon );
    //     this._LegacyButtonEditorWidgetSettingsAsParent.getEditScreenViewAsParent().commitEdit();
    // }

    _onVideoOffIconSelected( selectIconModalAsCaller, icon, iconTitle ){
        this._LegacyButtonEditorSubWidgetData.setVideoOffIcon( icon );
        this._LegacyButtonEditorSubWidgetData.setVideoOffIconTitle( iconTitle );
        this._LegacyButtonEditorWidgetSettingsAsParent.getEditScreenViewAsParent().commitEdit();
    }

    _onVideoOffIconSelectCanceled( selectIconModalAsCaller ){
    }

    _onClickRemoveVideoOffIcon(ev){
        const subWidgetData = this._LegacyButtonEditorSubWidgetData;
        subWidgetData.setVideoOffIcon(null);
        subWidgetData.setVideoOffIconTitle(null);
        this._LegacyButtonEditorWidgetSettingsAsParent.getEditScreenViewAsParent().commitEdit();
    }

    _onChangeVideoOffFgColor( color ){
        this._LegacyButtonEditorSubWidgetData.setVideoOffFgColor(color);
        this._LegacyButtonEditorWidgetSettingsAsParent.getEditScreenViewAsParent().commitEdit();
    }

    _onChangeVideoOffBgColor( color ){
        this._LegacyButtonEditorSubWidgetData.setVideoOffBgColor(color);
        this._LegacyButtonEditorWidgetSettingsAsParent.getEditScreenViewAsParent().commitEdit();
    }

    _onChangeVideoOffOuterBorderColor( color ){
        this._LegacyButtonEditorSubWidgetData.setVideoOffOuterBorderColor(color);
        this._LegacyButtonEditorWidgetSettingsAsParent.getEditScreenViewAsParent().commitEdit();
    }

    _onChangeVideoOffOuterBorderRadius( n ){
        this._LegacyButtonEditorSubWidgetData.setVideoOffOuterBorderRadius(n);
        this._LegacyButtonEditorWidgetSettingsAsParent.getEditScreenViewAsParent().commitEdit();
    }

    _onChangeVideoOffOuterBorderThickness( n ){
        this._LegacyButtonEditorSubWidgetData.setVideoOffOuterBorderThickness(n);
        this._LegacyButtonEditorWidgetSettingsAsParent.getEditScreenViewAsParent().commitEdit();
    }

    _onChangeVideoOffFontSize( n ){
        this._LegacyButtonEditorSubWidgetData.setVideoOffFontSize(n);
        this._LegacyButtonEditorWidgetSettingsAsParent.getEditScreenViewAsParent().commitEdit();
    }

    _onChangeVideoOffIconWidth( n ){
        this._LegacyButtonEditorSubWidgetData.setVideoOffIconWidth(n);
        this._LegacyButtonEditorWidgetSettingsAsParent.getEditScreenViewAsParent().commitEdit();
    }

    _onChangeVideoOffIconHeight( n ){
        this._LegacyButtonEditorSubWidgetData.setVideoOffIconHeight(n);
        this._LegacyButtonEditorWidgetSettingsAsParent.getEditScreenViewAsParent().commitEdit();
    }

    _onChangeVideoOffLabel(unvideoOnLabel){
        //const unvideoOnLabel = e.currentTarget.value;
        this._LegacyButtonEditorSubWidgetData.setVideoOffLabel( unvideoOnLabel  );
        this._LegacyButtonEditorWidgetSettingsAsParent.getEditScreenViewAsParent().commitEdit();
    }

    //!override
    getRenderJsx() {
        const subtypeName = this._LegacyButtonEditorSubWidgetData.getLegacyButtonWidgetSubTypeName();
        let  sVideoOnLabel;
        if( this._LegacyButtonEditorSubWidgetData.getVideoOnLabel() ){
            sVideoOnLabel = this._LegacyButtonEditorSubWidgetData.getVideoOnLabel();
        }
        else{
            sVideoOnLabel = "";
        }
        let  sVideoOffLabel;
        if( this._LegacyButtonEditorSubWidgetData.getVideoOffLabel() ){
            sVideoOffLabel = this._LegacyButtonEditorSubWidgetData.getVideoOffLabel();
        }
        else{
            sVideoOffLabel = "";
        }

        const subWidgetData = this._LegacyButtonEditorSubWidgetData;
        //const videoOnIconSelectJsx = this._getIconSelectJsx( subWidgetData.getVideoOnIcon(), this._onFormVideoOnIconSelected );
        const videoOnIconSelectJsx = this._getSelectIconModalJsx(
			subWidgetData.getVideoOnIcon(),
            subWidgetData.getVideoOnIconTitle(),
			( selectIconModalAsCaller, icon, iconTitle ) => this._onVideoOnIconSelected( selectIconModalAsCaller, icon, iconTitle ),
			(selectIconModalAsCaller) => this._onVideoOnIconSelectCanceled(selectIconModalAsCaller),
			(ev) => this._onClickRemoveVideoOnIcon(ev)
		);
        //const unvideoOnIconSelectJsx = this._getIconSelectJsx( subWidgetData.getVideoOffIcon(), this._onFormVideoOffIconSelected );
        const unvideoOnIconSelectJsx = this._getSelectIconModalJsx(
			subWidgetData.getVideoOffIcon(),
            subWidgetData.getVideoOffIconTitle(),
			( selectIconModalAsCaller, icon, iconTitle ) => this._onVideoOffIconSelected( selectIconModalAsCaller, icon, iconTitle ),
			(selectIconModalAsCaller) => this._onVideoOffIconSelectCanceled(selectIconModalAsCaller),
			(ev) => this._onClickRemoveVideoOffIcon(ev)
		);
        return  (
            <div className="brOCWidgetSettingsPanel">
                <p className="brOCSettingsSectionHeading">{i18n.t("VideoOn_button_settings")}</p>
                {this._renderIconField("icon", videoOnIconSelectJsx)}
                {this._renderFieldRow(
                    this._renderNumberField("Icon_width", subWidgetData.getVideoOnIconWidth(), (n) => this._onChangeVideoOnIconWidth(n), {min: "0"}),
                    this._renderNumberField("Icon_height", subWidgetData.getVideoOnIconHeight(), (n) => this._onChangeVideoOnIconHeight(n), {min: "0"})
                )}
                {this._renderFieldRow(
                    this._renderTextField("label", sVideoOnLabel, (e) => this._onChangeVideoOnLabel(e), {maxLength: 1000, allowClear: true, defaultValue: sVideoOnLabel}),
                    this._renderNumberField("Text_size", subWidgetData.getVideoOnFontSize(), (n) => this._onChangeVideoOnFontSize(n), {min: "0"})
                )}
                {this._renderColorField("fgColor", subWidgetData.getVideoOnFgColor(), (color) => this._onChangeVideoOnFgColor(color))}
                {this._renderColorField("bgColor", subWidgetData.getVideoOnBgColor(), (color) => this._onChangeVideoOnBgColor(color))}
                {this._renderColorField("outerBorderColor", subWidgetData.getVideoOnOuterBorderColor(), (color) => this._onChangeVideoOnOuterBorderColor(color))}
                {this._renderNumberField("outerBorderRadius", subWidgetData.getVideoOnOuterBorderRadius(), (n) => this._onChangeVideoOnOuterBorderRadius(n), {min: "0"})}
                {this._renderNumberField("outerBorderThickness", subWidgetData.getVideoOnOuterBorderThickness(), (n) => this._onChangeVideoOnOuterBorderThickness(n), {min: "1"})}

                <p className="brOCSettingsSectionHeading">{i18n.t("VideoOff_button_settings")}</p>
                {this._renderIconField("icon", unvideoOnIconSelectJsx)}
                {this._renderFieldRow(
                    this._renderNumberField("Icon_width", subWidgetData.getVideoOffIconWidth(), (n) => this._onChangeVideoOffIconWidth(n), {min: "0"}),
                    this._renderNumberField("Icon_height", subWidgetData.getVideoOffIconHeight(), (n) => this._onChangeVideoOffIconHeight(n), {min: "0"})
                )}
                {this._renderFieldRow(
                    this._renderTextField("label", sVideoOffLabel, (e) => this._onChangeVideoOffLabel(e), {maxLength: 1000, allowClear: true, defaultValue: sVideoOffLabel}),
                    this._renderNumberField("Text_size", subWidgetData.getVideoOffFontSize(), (n) => this._onChangeVideoOffFontSize(n), {min: "0"})
                )}
                {this._renderColorField("fgColor", subWidgetData.getVideoOffFgColor(), (color) => this._onChangeVideoOffFgColor(color))}
                {this._renderColorField("bgColor", subWidgetData.getVideoOffBgColor(), (color) => this._onChangeVideoOffBgColor(color))}
                {this._renderColorField("outerBorderColor", subWidgetData.getVideoOffOuterBorderColor(), (color) => this._onChangeVideoOffOuterBorderColor(color))}
                {this._renderNumberField("outerBorderRadius", subWidgetData.getVideoOffOuterBorderRadius(), (n) => this._onChangeVideoOffOuterBorderRadius(n), {min: "0"})}
                {this._renderNumberField("outerBorderThickness", subWidgetData.getVideoOffOuterBorderThickness(), (n) => this._onChangeVideoOffOuterBorderThickness(n), {min: "1"})}
            </div>
        );
    }

}