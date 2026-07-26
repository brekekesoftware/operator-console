import React from 'react';
import LegacyButtonEditorSubWidgetSettings from "./LegacyButtonEditorSubWidgetSettings";
import Form from "antd/lib/form";
import i18n from "../../../../i18n";
import Input from "antd/lib/input";
import {Divider} from "antd";
import InputNumber from "antd/lib/input-number";
import {Colorpicker} from "antd-colorpicker";
import EditScreenView from "../../../EditScreenView";
import TextArea from "antd/es/input/TextArea";

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
            <>
                <Divider>{i18n.t("VideoOn_button_settings")}</Divider>
                <p>{i18n.t("icon")}</p>
                {videoOnIconSelectJsx}
                <p>{i18n.t("Icon_width")}</p>
                <InputNumber min="0" value={subWidgetData.getVideoOnIconWidth()}
                             onChange={(n) => this._onChangeVideoOnIconWidth(n)}/>
                <p>{i18n.t("Icon_height")}</p>
                <InputNumber min="0" value={subWidgetData.getVideoOnIconHeight()}
                             onChange={(n) => this._onChangeVideoOnIconHeight(n)}/>
                <p>{i18n.t("label")}</p>
                <TextArea maxLength={1000} style={{minHeight:68}}
                    /* placevideoOner={i18n.t("VideoOn")} */
                    /* allowClear */
                          value={sVideoOnLabel}
                          defaultValue={sVideoOnLabel}
                          rows={3}
                          onChange={(e) => this._onChangeVideoOnLabel(e.target.value)}
                />
                <p>{i18n.t("Text_size")}</p>
                <InputNumber min="0" value={subWidgetData.getVideoOnFontSize()}
                             onChange={(n) => this._onChangeVideoOnFontSize(n)}/>
                <p>{i18n.t("fgColor")}</p>
                <Colorpicker format="rgb" value={subWidgetData.getVideoOnFgColor()}
                             onChange={(color) => this._onChangeVideoOnFgColor(color)}/>
                <p>{i18n.t("bgColor")}</p>
                <Colorpicker format="rgb" value={subWidgetData.getVideoOnBgColor()}
                             onChange={(color) => this._onChangeVideoOnBgColor(color)}/>
                <p>{i18n.t("outerBorderColor")}</p>
                <Colorpicker format="rgb" value={subWidgetData.getVideoOnOuterBorderColor()}
                             onChange={(color) => this._onChangeVideoOnOuterBorderColor(color)}/>
                <p>{i18n.t("outerBorderRadius")}</p>
                <InputNumber min="0" value={subWidgetData.getVideoOnOuterBorderRadius()}
                             onChange={(n) => this._onChangeVideoOnOuterBorderRadius(n)}/>
                <p>{i18n.t("outerBorderThickness")}</p>
                <InputNumber min="1" value={subWidgetData.getVideoOnOuterBorderThickness()}
                             onChange={(n) => this._onChangeVideoOnOuterBorderThickness(n)}/>
                <Divider>{i18n.t("VideoOff_button_settings")}</Divider>
                <p>{i18n.t("icon")}</p>
                {unvideoOnIconSelectJsx}
                <p>{i18n.t("Icon_width")}</p>
                <InputNumber min="0" value={subWidgetData.getVideoOffIconWidth()}
                             onChange={(n) => this._onChangeVideoOffIconWidth(n)}/>
                <p>{i18n.t("Icon_height")}</p>
                <InputNumber min="0" value={subWidgetData.getVideoOffIconHeight()}
                             onChange={(n) => this._onChangeVideoOffIconHeight(n)}/>
                <p>{i18n.t("label")}</p>
                <TextArea maxLength={1000} style={{minHeight:68}}
                    /* placevideoOner={i18n.t("VideoOff")} */
                    /* allowClear */
                          value={sVideoOffLabel}
                          defaultValue={sVideoOffLabel}
                          rows={3}
                          onChange={(e) => this._onChangeVideoOffLabel(e.target.value)}
                />
                <p>{i18n.t("Text_size")}</p>
                <InputNumber min="0" value={subWidgetData.getVideoOffFontSize()}
                             onChange={(n) => this._onChangeVideoOffFontSize(n)}/>
                <p>{i18n.t("fgColor")}</p>
                <Colorpicker format="rgb" value={subWidgetData.getVideoOffFgColor()}
                             onChange={(color) => this._onChangeVideoOffFgColor(color)}/>
                <p>{i18n.t("bgColor")}</p>
                <Colorpicker format="rgb" value={subWidgetData.getVideoOffBgColor()}
                             onChange={(color) => this._onChangeVideoOffBgColor(color)}/>
                <p>{i18n.t("outerBorderColor")}</p>
                <Colorpicker format="rgb" value={subWidgetData.getVideoOffOuterBorderColor()}
                             onChange={(color) => this._onChangeVideoOffOuterBorderColor(color)}/>
                <p>{i18n.t("outerBorderRadius")}</p>
                <InputNumber min="0" value={subWidgetData.getVideoOffOuterBorderRadius()}
                             onChange={(n) => this._onChangeVideoOffOuterBorderRadius(n)}/>
                <p>{i18n.t("outerBorderThickness")}</p>
                <InputNumber min="1" value={subWidgetData.getVideoOffOuterBorderThickness()}
                             onChange={(n) => this._onChangeVideoOffOuterBorderThickness(n)}/>
            </>
        );
    }

}