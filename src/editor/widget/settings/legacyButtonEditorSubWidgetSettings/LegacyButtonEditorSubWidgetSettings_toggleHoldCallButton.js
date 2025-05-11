import React from 'react';
import LegacyButtonEditorSubWidgetSettings from "./LegacyButtonEditorSubWidgetSettings";
import Form from "antd/lib/form";
import i18n from "../../../../i18n";
import Input from "antd/lib/input";
import {Divider} from "antd";
import InputNumber from "antd/lib/input-number";
import {Colorpicker} from "antd-colorpicker";
import EditScreenView from "../../../EditScreenView";

export default class LegacyButtonEditorSubWidgetSettings_toggleHoldCallButton extends LegacyButtonEditorSubWidgetSettings  {

    constructor( legacyButtonEditorWidgetSettingsAsParent, legacyButtonEditorSubWidgetData  ) {
        super(  legacyButtonEditorWidgetSettingsAsParent, legacyButtonEditorSubWidgetData  );
    }

    // _onFormHoldIconSelected( icon ){
    //     this._LegacyButtonEditorSubWidgetData.setHoldIcon( icon );
    //     this._LegacyButtonEditorWidgetSettingsAsParent.getEditScreenViewAsParent().setState({rerender:true});
    // }

    _onHoldIconSelected( selectIconModalAsCaller, icon ){
        this._LegacyButtonEditorSubWidgetData.setHoldIcon( icon );
        this._LegacyButtonEditorWidgetSettingsAsParent.getEditScreenViewAsParent().setState({rerender:true});
    }

    _onHoldIconSelectCanceled( selectIconModalAsCaller ){
    }

    _onClickRemoveHoldIcon(ev){
        const subWidgetData = this._LegacyButtonEditorSubWidgetData;
        subWidgetData.setHoldIcon(null);
        this._LegacyButtonEditorWidgetSettingsAsParent.getEditScreenViewAsParent().setState({rerender:true});
    }

    _onChangeHoldFgColor( color ){
        this._LegacyButtonEditorSubWidgetData.setHoldFgColor(color);
        this._LegacyButtonEditorWidgetSettingsAsParent.getEditScreenViewAsParent().setState({rerender:true});
    }

    _onChangeHoldBgColor( color ){
        this._LegacyButtonEditorSubWidgetData.setHoldBgColor(color);
        this._LegacyButtonEditorWidgetSettingsAsParent.getEditScreenViewAsParent().setState({rerender:true});
    }

    _onChangeHoldOuterBorderColor( color ){
        this._LegacyButtonEditorSubWidgetData.setHoldOuterBorderColor(color);
        this._LegacyButtonEditorWidgetSettingsAsParent.getEditScreenViewAsParent().setState({rerender:true});
    }

    _onChangeHoldOuterBorderRadius( n ){
        this._LegacyButtonEditorSubWidgetData.setHoldOuterBorderRadius(n);
        this._LegacyButtonEditorWidgetSettingsAsParent.getEditScreenViewAsParent().setState({rerender:true});
    }

    _onChangeHoldOuterBorderThickness( n ){
        this._LegacyButtonEditorSubWidgetData.setHoldOuterBorderThickness(n);
        this._LegacyButtonEditorWidgetSettingsAsParent.getEditScreenViewAsParent().setState({rerender:true});
    }

    _onChangeHoldFontSize( n ){
        this._LegacyButtonEditorSubWidgetData.setHoldFontSize(n);
        this._LegacyButtonEditorWidgetSettingsAsParent.getEditScreenViewAsParent().setState({rerender:true});
    }

    _onChangeHoldIconWidth( n ){
        this._LegacyButtonEditorSubWidgetData.setHoldIconWidth(n);
        this._LegacyButtonEditorWidgetSettingsAsParent.getEditScreenViewAsParent().setState({rerender:true});
    }

    _onChangeHoldIconHeight( n ){
        this._LegacyButtonEditorSubWidgetData.setHoldIconHeight(n);
        this._LegacyButtonEditorWidgetSettingsAsParent.getEditScreenViewAsParent().setState({rerender:true});
    }

    _onChangeHoldLabel(e){
        const holdLabel = e.currentTarget.value;
        this._LegacyButtonEditorSubWidgetData.setHoldLabel( holdLabel  );
        this._LegacyButtonEditorWidgetSettingsAsParent.getEditScreenViewAsParent().setState({rerender:true});
    }

    // _onFormUnholdIconSelected( icon ){
    //     this._LegacyButtonEditorSubWidgetData.setUnholdIcon( icon );
    //     this._LegacyButtonEditorWidgetSettingsAsParent.getEditScreenViewAsParent().setState({rerender:true});
    // }

    _onUnholdIconSelected( selectIconModalAsCaller, icon ){
        this._LegacyButtonEditorSubWidgetData.setUnholdIcon( icon );
        this._LegacyButtonEditorWidgetSettingsAsParent.getEditScreenViewAsParent().setState({rerender:true});
    }

    _onUnholdIconSelectCanceled( selectIconModalAsCaller ){
    }

    _onClickRemoveUnholdIcon(ev){
        const subWidgetData = this._LegacyButtonEditorSubWidgetData;
        subWidgetData.setUnholdIcon(null);
        this._LegacyButtonEditorWidgetSettingsAsParent.getEditScreenViewAsParent().setState({rerender:true});
    }

    _onChangeUnholdFgColor( color ){
        this._LegacyButtonEditorSubWidgetData.setUnholdFgColor(color);
        this._LegacyButtonEditorWidgetSettingsAsParent.getEditScreenViewAsParent().setState({rerender:true});
    }

    _onChangeUnholdBgColor( color ){
        this._LegacyButtonEditorSubWidgetData.setUnholdBgColor(color);
        this._LegacyButtonEditorWidgetSettingsAsParent.getEditScreenViewAsParent().setState({rerender:true});
    }

    _onChangeUnholdOuterBorderColor( color ){
        this._LegacyButtonEditorSubWidgetData.setUnholdOuterBorderColor(color);
        this._LegacyButtonEditorWidgetSettingsAsParent.getEditScreenViewAsParent().setState({rerender:true});
    }

    _onChangeUnholdOuterBorderRadius( n ){
        this._LegacyButtonEditorSubWidgetData.setUnholdOuterBorderRadius(n);
        this._LegacyButtonEditorWidgetSettingsAsParent.getEditScreenViewAsParent().setState({rerender:true});
    }

    _onChangeUnholdOuterBorderThickness( n ){
        this._LegacyButtonEditorSubWidgetData.setUnholdOuterBorderThickness(n);
        this._LegacyButtonEditorWidgetSettingsAsParent.getEditScreenViewAsParent().setState({rerender:true});
    }

    _onChangeUnholdFontSize( n ){
        this._LegacyButtonEditorSubWidgetData.setUnholdFontSize(n);
        this._LegacyButtonEditorWidgetSettingsAsParent.getEditScreenViewAsParent().setState({rerender:true});
    }

    _onChangeUnholdIconWidth( n ){
        this._LegacyButtonEditorSubWidgetData.setUnholdIconWidth(n);
        this._LegacyButtonEditorWidgetSettingsAsParent.getEditScreenViewAsParent().setState({rerender:true});
    }

    _onChangeUnholdIconHeight( n ){
        this._LegacyButtonEditorSubWidgetData.setUnholdIconHeight(n);
        this._LegacyButtonEditorWidgetSettingsAsParent.getEditScreenViewAsParent().setState({rerender:true});
    }

    _onChangeUnholdLabel(e){
        const unholdLabel = e.currentTarget.value;
        this._LegacyButtonEditorSubWidgetData.setUnholdLabel( unholdLabel  );
        this._LegacyButtonEditorWidgetSettingsAsParent.getEditScreenViewAsParent().setState({rerender:true});
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
			( selectIconModalAsCaller, icon ) => this._onHoldIconSelected( selectIconModalAsCaller, icon ),
			(selectIconModalAsCaller) => this._onHoldIconSelectCanceled(selectIconModalAsCaller),
			(ev) => this._onClickRemoveHoldIcon(ev)
		);
        //const unholdIconSelectJsx = this._getIconSelectJsx( subWidgetData.getUnholdIcon(), this._onFormUnholdIconSelected );
        const unholdIconSelectJsx = this._getSelectIconModalJsx(
			subWidgetData.getUnholdIcon(),
			( selectIconModalAsCaller, icon ) => this._onUnholdIconSelected( selectIconModalAsCaller, icon ),
			(selectIconModalAsCaller) => this._onUnholdIconSelectCanceled(selectIconModalAsCaller),
			(ev) => this._onClickRemoveUnholdIcon(ev)
		);
        return  (
            <>
                <Divider>{i18n.t("Hold_button_settings")}</Divider>
                <p>{i18n.t("icon")}</p>
                {holdIconSelectJsx}
                <p>{i18n.t("Icon_width")}</p>
                <InputNumber min="0" value={subWidgetData.getHoldIconWidth()}
                             onChange={(n) => this._onChangeHoldIconWidth(n)}/>
                <p>{i18n.t("Icon_height")}</p>
                <InputNumber min="0" value={subWidgetData.getHoldIconHeight()}
                             onChange={(n) => this._onChangeHoldIconHeight(n)}/>
                <p>{i18n.t("label")}</p>
                <Input placeholder={i18n.t(`Hold`)} allowClear value={sHoldLabel}
                       defaultValue={sHoldLabel} onChange={(e) => this._onChangeHoldLabel(e)}/>
                <p>{i18n.t("Text_size")}</p>
                <InputNumber min="0" value={subWidgetData.getHoldFontSize()}
                             onChange={(n) => this._onChangeHoldFontSize(n)}/>
                <p>{i18n.t("fgColor")}</p>
                <Colorpicker format="rgb" value={subWidgetData.getHoldFgColor()}
                             onChange={(color) => this._onChangeHoldFgColor(color)}/>
                <p>{i18n.t("bgColor")}</p>
                <Colorpicker format="rgb" value={subWidgetData.getHoldBgColor()}
                             onChange={(color) => this._onChangeHoldBgColor(color)}/>
                <p>{i18n.t("outerBorderColor")}</p>
                <Colorpicker format="rgb" value={subWidgetData.getHoldOuterBorderColor()}
                             onChange={(color) => this._onChangeHoldOuterBorderColor(color)}/>
                <p>{i18n.t("outerBorderRadius")}</p>
                <InputNumber min="0" value={subWidgetData.getHoldOuterBorderRadius()}
                             onChange={(n) => this._onChangeHoldOuterBorderRadius(n)}/>
                <p>{i18n.t("outerBorderThickness")}</p>
                <InputNumber min="1" value={subWidgetData.getHoldOuterBorderThickness()}
                             onChange={(n) => this._onChangeHoldOuterBorderThickness(n)}/>
                <Divider>{i18n.t("Unhold_button_settings")}</Divider>
                <p>{i18n.t("icon")}</p>
                {unholdIconSelectJsx}
                <p>{i18n.t("Icon_width")}</p>
                <InputNumber min="0" value={subWidgetData.getUnholdIconWidth()}
                             onChange={(n) => this._onChangeUnholdIconWidth(n)}/>
                <p>{i18n.t("Icon_height")}</p>
                <InputNumber min="0" value={subWidgetData.getUnholdIconHeight()}
                             onChange={(n) => this._onChangeUnholdIconHeight(n)}/>
                <p>{i18n.t("label")}</p>
                <Input placeholder={i18n.t(`Unhold`)} allowClear value={sUnholdLabel}
                       defaultValue={sUnholdLabel} onChange={(e) => this._onChangeUnholdLabel(e)}/>
                <p>{i18n.t("Text_size")}</p>
                <InputNumber min="0" value={subWidgetData.getUnholdFontSize()}
                             onChange={(n) => this._onChangeUnholdFontSize(n)}/>
                <p>{i18n.t("fgColor")}</p>
                <Colorpicker format="rgb" value={subWidgetData.getUnholdFgColor()}
                             onChange={(color) => this._onChangeUnholdFgColor(color)}/>
                <p>{i18n.t("bgColor")}</p>
                <Colorpicker format="rgb" value={subWidgetData.getUnholdBgColor()}
                             onChange={(color) => this._onChangeUnholdBgColor(color)}/>
                <p>{i18n.t("outerBorderColor")}</p>
                <Colorpicker format="rgb" value={subWidgetData.getUnholdOuterBorderColor()}
                             onChange={(color) => this._onChangeUnholdOuterBorderColor(color)}/>
                <p>{i18n.t("outerBorderRadius")}</p>
                <InputNumber min="0" value={subWidgetData.getUnholdOuterBorderRadius()}
                             onChange={(n) => this._onChangeUnholdOuterBorderRadius(n)}/>
                <p>{i18n.t("outerBorderThickness")}</p>
                <InputNumber min="1" value={subWidgetData.getUnholdOuterBorderThickness()}
                             onChange={(n) => this._onChangeUnholdOuterBorderThickness(n)}/>
            </>
        );
    }

}