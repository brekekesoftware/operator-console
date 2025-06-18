import React from 'react';
import LegacyButtonEditorSubWidgetSettings from "./LegacyButtonEditorSubWidgetSettings";
import i18n from "../../../../i18n";
import Input from "antd/lib/input";
import InputNumber from "antd/lib/input-number";
import {Colorpicker} from "antd-colorpicker";
import {Divider, Select} from "antd";

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
        this._LegacyButtonEditorWidgetSettingsAsParent.getEditScreenViewAsParent().setState({rerender:true});
    }

    _onCancelTransferIconSelectCanceled( selectIconModalAsCaller ){
    }

    _onClickRemoveCancelTransferIcon(ev){
        const subWidgetData = this._LegacyButtonEditorSubWidgetData;
        subWidgetData.setCancelTransferIcon(null);
        subWidgetData.setCancelTransferIconName(null);
        this._LegacyButtonEditorWidgetSettingsAsParent.getEditScreenViewAsParent().setState({rerender:true});
    }

    _onChangeLabel(e){
        const label = e.currentTarget.value;
        this._LegacyButtonEditorSubWidgetData.setLabel( label  );
        this._LegacyButtonEditorWidgetSettingsAsParent.getEditScreenViewAsParent().setState({rerender:true});
    }

    _onChangeCancelTransferLabel(e){
        const label = e.currentTarget.value;
        this._LegacyButtonEditorSubWidgetData.setCancelTransferLabel( label  );
        this._LegacyButtonEditorWidgetSettingsAsParent.getEditScreenViewAsParent().setState({rerender:true});
    }

    // _onFormCancelTransferIconSelected( icon ){
    //     this._LegacyButtonEditorSubWidgetData.setCancelTransferIcon( icon );
    //     this._LegacyButtonEditorWidgetSettingsAsParent.getEditScreenViewAsParent().setState({rerender:true});
    // }

    _onChangeCancelTransferFgColor( color ){
        this._LegacyButtonEditorSubWidgetData.setCancelTransferFgColor(color);
        this._LegacyButtonEditorWidgetSettingsAsParent.getEditScreenViewAsParent().setState({rerender:true});
    }

    _onChangeCancelTransferBgColor( color ){
        this._LegacyButtonEditorSubWidgetData.setCancelTransferBgColor(color);
        this._LegacyButtonEditorWidgetSettingsAsParent.getEditScreenViewAsParent().setState({rerender:true});
    }

    _onChangeCancelTransferOuterBorderColor( color ){
        this._LegacyButtonEditorSubWidgetData.setCancelTransferOuterBorderColor(color);
        this._LegacyButtonEditorWidgetSettingsAsParent.getEditScreenViewAsParent().setState({rerender:true});
    }

    _onChangeCancelTransferOuterBorderRadius( n ){
        this._LegacyButtonEditorSubWidgetData.setCancelTransferOuterBorderRadius(n);
        this._LegacyButtonEditorWidgetSettingsAsParent.getEditScreenViewAsParent().setState({rerender:true});
    }

    _onChangeCancelTransferOuterBorderThickness( n ){
        this._LegacyButtonEditorSubWidgetData.setCancelTransferOuterBorderThickness(n);
        this._LegacyButtonEditorWidgetSettingsAsParent.getEditScreenViewAsParent().setState({rerender:true});
    }

    _onChangeCancelTransferFontSize( n ){
        this._LegacyButtonEditorSubWidgetData.setCancelTransferFontSize(n);
        this._LegacyButtonEditorWidgetSettingsAsParent.getEditScreenViewAsParent().setState({rerender:true});
    }

    _onChangeCancelTransferIconWidth( n ){
        this._LegacyButtonEditorSubWidgetData.setCancelTransferIconWidth(n);
        this._LegacyButtonEditorWidgetSettingsAsParent.getEditScreenViewAsParent().setState({rerender:true});
    }

    _onChangeCancelTransferIconHeight( n ){
        this._LegacyButtonEditorSubWidgetData.setCancelTransferIconHeight(n);
        this._LegacyButtonEditorWidgetSettingsAsParent.getEditScreenViewAsParent().setState({rerender:true});
    }

    _onChangeTransferMode( s ){
        this._LegacyButtonEditorSubWidgetData.setTransferMode(s);
        this._LegacyButtonEditorWidgetSettingsAsParent.getEditScreenViewAsParent().setState({rerender:true});
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
            <>
                <Divider>{i18n.t("Transfer_button_settings")}</Divider>
                <p>{i18n.t("icon")}</p>
                {transferIconSelectJsx}
                <p>{i18n.t("Icon_width")}</p>
                <InputNumber min="0" value={subWidgetData.getIconWidth()}
                             onChange={(n) => this._onChangeIconWidth(n)}/>
                <p>{i18n.t("Icon_height")}</p>
                <InputNumber min="0" value={subWidgetData.getIconHeight()}
                             onChange={(n) => this._onChangeIconHeight(n)}/>
                <p>{i18n.t("label")}</p>
                <Input placeholder={i18n.t(`legacy_button_label.${subtypeName}`)} allowClear value={sLabel}
                       defaultValue={sLabel} onChange={(e) => this._onChangeLabel(e)}/>
                <p>{i18n.t("mode")}</p>
                <Select
                    // onChange={(value) => {
                    // }}
                    style={{width: "100%"}}
                    //placeholder="Please select a option"
                    value={transferMode}
                    defaultValue={transferMode}
                    onSelect={(e) => this._onChangeTransferMode(e)}
                >
                    <Select.Option value="attendedTransfer">{i18n.t("Attended_transfer")}</Select.Option>
                    <Select.Option value="blindTransfer">{i18n.t("Blind_transfer")}</Select.Option>
                </Select>
                <p>{i18n.t("Text_size")}</p>
                <InputNumber min="0" value={subWidgetData.getFontSize()}
                             onChange={(n) => this._onChangeFontSize(n)}/>
                <p>{i18n.t("fgColor")}</p>
                <Colorpicker format="rgb" value={subWidgetData.getFgColor()}
                             onChange={(color) => this._onChangeFgColor(color)}/>
                <p>{i18n.t("bgColor")}</p>
                <Colorpicker format="rgb" value={subWidgetData.getBgColor()}
                             onChange={(color) => this._onChangeBgColor(color)}/>
                <p>{i18n.t("outerBorderColor")}</p>
                <Colorpicker format="rgb" value={subWidgetData.getOuterBorderColor()}
                             onChange={(color) => this._onChangeOuterBorderColor(color)}/>
                <p>{i18n.t("outerBorderRadius")}</p>
                <InputNumber min="0" value={subWidgetData.getOuterBorderRadius()}
                             onChange={(n) => this._onChangeOuterBorderRadius(n)}/>
                <p>{i18n.t("outerBorderThickness")}</p>
                <InputNumber min="1" value={subWidgetData.getOuterBorderThickness()}
                             onChange={(n) => this._onChangeOuterBorderThickness(n)}/>
                <Divider>{i18n.t("Cancel_transfer_button_settings")}</Divider>
                <p>{i18n.t("icon")}</p>
                {cancelTransferIconSelectJsx}
                <p>{i18n.t("Icon_width")}</p>
                <InputNumber min="0" value={subWidgetData.getCancelTransferIconWidth()}
                             onChange={(n) => this._onChangeCancelTransferIconWidth(n)}/>
                <p>{i18n.t("Icon_height")}</p>
                <InputNumber min="0" value={subWidgetData.getCancelTransferIconHeight()}
                             onChange={(n) => this._onChangeCancelTransferIconHeight(n)}/>
                <p>{i18n.t("label")}</p>
                <Input placeholder={i18n.t(`Cancel_transfer`)} allowClear value={sCancelTransferLabel}
                       defaultValue={sCancelTransferLabel} onChange={(e) => this._onChangeCancelTransferLabel(e)}/>
                <p>{i18n.t("Text_size")}</p>
                <InputNumber min="0" value={subWidgetData.getCancelTransferFontSize()}
                             onChange={(n) => this._onChangeCancelTransferFontSize(n)}/>
                <p>{i18n.t("fgColor")}</p>
                <Colorpicker format="rgb" value={subWidgetData.getCancelTransferFgColor()}
                             onChange={(color) => this._onChangeCancelTransferFgColor(color)}/>
                <p>{i18n.t("bgColor")}</p>
                <Colorpicker format="rgb" value={subWidgetData.getCancelTransferBgColor()}
                             onChange={(color) => this._onChangeCancelTransferBgColor(color)}/>
                <p>{i18n.t("outerBorderColor")}</p>
                <Colorpicker format="rgb" value={subWidgetData.getCancelTransferOuterBorderColor()}
                             onChange={(color) => this._onChangeCancelTransferOuterBorderColor(color)}/>
                <p>{i18n.t("outerBorderRadius")}</p>
                <InputNumber min="0" value={subWidgetData.getCancelTransferOuterBorderRadius()}
                             onChange={(n) => this._onChangeCancelTransferOuterBorderRadius(n)}/>
                <p>{i18n.t("outerBorderThickness")}</p>
                <InputNumber min="1" value={subWidgetData.getCancelTransferOuterBorderThickness()}
                             onChange={(n) => this._onChangeCancelTransferOuterBorderThickness(n)}/>
            </>
        );
    }


}