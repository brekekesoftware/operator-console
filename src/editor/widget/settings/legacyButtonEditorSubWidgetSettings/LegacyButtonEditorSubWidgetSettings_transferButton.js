import React from 'react';
import LegacyButtonEditorSubWidgetSettings from "./LegacyButtonEditorSubWidgetSettings";
import i18n from "../../../../i18n";
import {Select} from "antd";

export default class LegacyButtonEditorSubWidgetSettings_transferButton extends LegacyButtonEditorSubWidgetSettings  {

    constructor( legacyButtonEditorWidgetSettingsAsParent, legacyButtonEditorSubWidgetData  ) {
        super(  legacyButtonEditorWidgetSettingsAsParent, legacyButtonEditorSubWidgetData  );
    }

    _onTransferIconSelected( selectIconModalAsCaller, selectedIconValue, selectedIconName ){
        this._onFormIconSelected( selectedIconValue, selectedIconName  );
    }

    _onTransferIconSelectCanceled( selectIconModalAsCaller ){
    }

    _onClickRemoveTransferIcon(ev){
        this._onFormIconSelected( null );
    }

    _onCancelTransferIconSelected( selectIconModalAsCaller, icon, iconName ){
        this._LegacyButtonEditorSubWidgetData.setCancelTransferIcon( icon );
        this._LegacyButtonEditorSubWidgetData.setCancelTransferIconName( iconName );
        this._LegacyButtonEditorWidgetSettingsAsParent.getEditScreenViewAsParent().commitEdit();
    }

    _onCancelTransferIconSelectCanceled( selectIconModalAsCaller ){
    }

    _onClickRemoveCancelTransferIcon(ev){
        const subWidgetData = this._LegacyButtonEditorSubWidgetData;
        subWidgetData.setCancelTransferIcon(null);
        subWidgetData.setCancelTransferIconName(null);
        this._LegacyButtonEditorWidgetSettingsAsParent.getEditScreenViewAsParent().commitEdit();
    }

    _onChangeLabel(label){
        //const label = e.currentTarget.value;
        this._LegacyButtonEditorSubWidgetData.setLabel( label  );
        this._LegacyButtonEditorWidgetSettingsAsParent.getEditScreenViewAsParent().commitEdit();
    }

    _onChangeCancelTransferLabel(e){
        const label = e.currentTarget.value;
        this._LegacyButtonEditorSubWidgetData.setCancelTransferLabel( label  );
        this._LegacyButtonEditorWidgetSettingsAsParent.getEditScreenViewAsParent().commitEdit();
    }

    // _onFormCancelTransferIconSelected( icon ){
    //     this._LegacyButtonEditorSubWidgetData.setCancelTransferIcon( icon );
    //     this._LegacyButtonEditorWidgetSettingsAsParent.getEditScreenViewAsParent().commitEdit();
    // }

    _onChangeCancelTransferFgColor( color ){
        this._LegacyButtonEditorSubWidgetData.setCancelTransferFgColor(color);
        this._LegacyButtonEditorWidgetSettingsAsParent.getEditScreenViewAsParent().commitEdit();
    }

    _onChangeCancelTransferBgColor( color ){
        this._LegacyButtonEditorSubWidgetData.setCancelTransferBgColor(color);
        this._LegacyButtonEditorWidgetSettingsAsParent.getEditScreenViewAsParent().commitEdit();
    }

    _onChangeCancelTransferOuterBorderColor( color ){
        this._LegacyButtonEditorSubWidgetData.setCancelTransferOuterBorderColor(color);
        this._LegacyButtonEditorWidgetSettingsAsParent.getEditScreenViewAsParent().commitEdit();
    }

    _onChangeCancelTransferOuterBorderRadius( n ){
        this._LegacyButtonEditorSubWidgetData.setCancelTransferOuterBorderRadius(n);
        this._LegacyButtonEditorWidgetSettingsAsParent.getEditScreenViewAsParent().commitEdit();
    }

    _onChangeCancelTransferOuterBorderThickness( n ){
        this._LegacyButtonEditorSubWidgetData.setCancelTransferOuterBorderThickness(n);
        this._LegacyButtonEditorWidgetSettingsAsParent.getEditScreenViewAsParent().commitEdit();
    }

    _onChangeCancelTransferFontSize( n ){
        this._LegacyButtonEditorSubWidgetData.setCancelTransferFontSize(n);
        this._LegacyButtonEditorWidgetSettingsAsParent.getEditScreenViewAsParent().commitEdit();
    }

    _onChangeCancelTransferIconWidth( n ){
        this._LegacyButtonEditorSubWidgetData.setCancelTransferIconWidth(n);
        this._LegacyButtonEditorWidgetSettingsAsParent.getEditScreenViewAsParent().commitEdit();
    }

    _onChangeCancelTransferIconHeight( n ){
        this._LegacyButtonEditorSubWidgetData.setCancelTransferIconHeight(n);
        this._LegacyButtonEditorWidgetSettingsAsParent.getEditScreenViewAsParent().commitEdit();
    }

    _onChangeTransferMode( s ){
        this._LegacyButtonEditorSubWidgetData.setTransferMode(s);
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

        let  sCancelTransferLabel;
        if( this._LegacyButtonEditorSubWidgetData.getCancelTransferLabel() ){
            sCancelTransferLabel = this._LegacyButtonEditorSubWidgetData.getCancelTransferLabel();
        }
        else{
            sCancelTransferLabel = "";
        }

        const subWidgetData = this._LegacyButtonEditorSubWidgetData;
        //const transferIconSelectJsx = this._getIconSelectJsx( subWidgetData.getIcon(), subWidgetData._onFormIconSelected );
        const transferIconSelectJsx = this._getSelectIconModalJsx(
			subWidgetData.getIcon(),
            subWidgetData.getIconName(),
			( selectIconModalAsCaller, selectedIconValue, selectedIconName ) => this._onTransferIconSelected( selectIconModalAsCaller, selectedIconValue, selectedIconName ),
			( selectIconModalAsCaller ) => this._onTransferIconSelectCanceled( selectIconModalAsCaller ),
			( ev ) => this._onClickRemoveTransferIcon(ev)
		);

        const bGetIconDisabled = true;
        //const cancelTransferIconSelectJsx = this._getIconSelectJsx( subWidgetData.getCancelTransferIcon(), (icon) => this._onFormCancelTransferIconSelected(icon), bGetIconDisabled  );
        const cancelTransferIconSelectJsx = this._getSelectIconModalJsx(
			subWidgetData.getCancelTransferIcon(),
            subWidgetData.getCancelTransferIconName(),
			( selectIconModalAsCaller, selectedIconValue, selectedIconName ) => this._onCancelTransferIconSelected( selectIconModalAsCaller, selectedIconValue, selectedIconName ),
			( selectIconModalAsCaller ) => this._onCancelTransferIconSelectCanceled( selectIconModalAsCaller ),
			( ev ) => this._onClickRemoveCancelTransferIcon(ev),
            () => subWidgetData.getCancelTransferIcon(),
            () =>subWidgetData.getCancelTransferIconName()
		);

        const transferMode = this._LegacyButtonEditorSubWidgetData.getTransferMode() ? this._LegacyButtonEditorSubWidgetData.getTransferMode() : "attendedTransfer";

        return  (
            <div className="brOCWidgetSettingsPanel">
                <p className="brOCSettingsSectionHeading">{i18n.t("Transfer_button_settings")}</p>
                {this._renderIconField("icon", transferIconSelectJsx)}
                {this._renderFieldRow(
                    this._renderNumberField("Icon_width", subWidgetData.getIconWidth(), (n) => this._onChangeIconWidth(n), {min: "0"}),
                    this._renderNumberField("Icon_height", subWidgetData.getIconHeight(), (n) => this._onChangeIconHeight(n), {min: "0"})
                )}
                {this._renderTextField("label", sLabel, (e) => this._onChangeLabel(e), {maxLength: 1000, allowClear: true, defaultValue: sLabel})}
                {this._renderSelectField("mode", transferMode, (e) => this._onChangeTransferMode(e), (
                    <>
                        <Select.Option value="attendedTransfer">{i18n.t("Attended_transfer")}</Select.Option>
                        <Select.Option value="blindTransfer">{i18n.t("Blind_transfer")}</Select.Option>
                    </>
                ))}
                {this._renderNumberField("Text_size", subWidgetData.getFontSize(), (n) => this._onChangeFontSize(n), {min: "0"})}
                {this._renderColorField("fgColor", subWidgetData.getFgColor(), (color) => this._onChangeFgColor(color))}
                {this._renderColorField("bgColor", subWidgetData.getBgColor(), (color) => this._onChangeBgColor(color))}
                {this._renderColorField("outerBorderColor", subWidgetData.getOuterBorderColor(), (color) => this._onChangeOuterBorderColor(color))}
                {this._renderFieldRow(
                    this._renderNumberField("outerBorderThickness", subWidgetData.getOuterBorderThickness(), (n) => this._onChangeOuterBorderThickness(n), {min: "1"}),
                    this._renderNumberField("outerBorderRadius", subWidgetData.getOuterBorderRadius(), (n) => this._onChangeOuterBorderRadius(n), {min: "0"})
                )}

                <p className="brOCSettingsSectionHeading">{i18n.t("Cancel_transfer_button_settings")}</p>
                {this._renderIconField("icon", cancelTransferIconSelectJsx)}
                {this._renderFieldRow(
                    this._renderNumberField("Icon_width", subWidgetData.getCancelTransferIconWidth(), (n) => this._onChangeCancelTransferIconWidth(n), {min: "0"}),
                    this._renderNumberField("Icon_height", subWidgetData.getCancelTransferIconHeight(), (n) => this._onChangeCancelTransferIconHeight(n), {min: "0"})
                )}
                {this._renderFieldRow(
                    this._renderTextField("label", sCancelTransferLabel, (e) => this._onChangeCancelTransferLabel(e), {placeholder: i18n.t(`Cancel_transfer`), allowClear: true, defaultValue: sCancelTransferLabel}),
                    this._renderNumberField("Text_size", subWidgetData.getCancelTransferFontSize(), (n) => this._onChangeCancelTransferFontSize(n), {min: "0"})
                )}
                {this._renderColorField("fgColor", subWidgetData.getCancelTransferFgColor(), (color) => this._onChangeCancelTransferFgColor(color))}
                {this._renderColorField("bgColor", subWidgetData.getCancelTransferBgColor(), (color) => this._onChangeCancelTransferBgColor(color))}
                {this._renderColorField("outerBorderColor", subWidgetData.getCancelTransferOuterBorderColor(), (color) => this._onChangeCancelTransferOuterBorderColor(color))}
                {this._renderFieldRow(
                    this._renderNumberField("outerBorderThickness", subWidgetData.getCancelTransferOuterBorderThickness(), (n) => this._onChangeCancelTransferOuterBorderThickness(n), {min: "1"}),
                    this._renderNumberField("outerBorderRadius", subWidgetData.getCancelTransferOuterBorderRadius(), (n) => this._onChangeCancelTransferOuterBorderRadius(n), {min: "0"})
                )}
            </div>
        );
    }


}