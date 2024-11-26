import React from 'react';
import LegacyButtonEditorSubWidget from "./LegacyButtonEditorSubWidget";
import i18n from "../../../../i18n";
import Util from "../../../../Util";
import ACallInfo from "../../../../ACallInfo";
import BrekekeOperatorConsole from "../../../../index";
import clsx from "clsx";

export default class LegacyButtonEditorSubWidget_pickUpCallButton extends LegacyButtonEditorSubWidget  {

    constructor( legacyButtonEditorWidgetAsParent, legacyButtonEditorSubWidgetData  ) {
        super(  legacyButtonEditorWidgetAsParent, legacyButtonEditorSubWidgetData  );
    }

    //!override
    getRenderJsx() {
        const subWidgetData = this.getLegacyButtonSubWidgetData();
        //const widgetData = this.getLegacyButtonSubWidgetData().getLegacyButtonWidgetDataAsParent();
        const sButtonFontSize = subWidgetData.getFontSize() ? subWidgetData.getFontSize() + "px" : "1rem";    //!default
        const buttonFgColor = subWidgetData.getFgColor();
        const buttonBgColor = subWidgetData.getBgColor();
        const buttonOuterBorderColor = subWidgetData.getOuterBorderColor();
        const buttonOuterBorderThickness = subWidgetData.getOuterBorderThickness();
        const buttonOuterBorderRadius = subWidgetData.getOuterBorderRadius();

        let color = Util.isAntdRgbaProperty( buttonFgColor  ) ? Util.getRgbaCSSStringFromAntdColor( buttonFgColor ) : "";
        let backgroundColor = Util.isAntdRgbaProperty( buttonBgColor ) ? Util.getRgbaCSSStringFromAntdColor( buttonBgColor ) : "";
        const border = Util.isNumeric( buttonOuterBorderThickness ) && Util.isAntdRgbaProperty( buttonOuterBorderColor) ?
            "solid " + buttonOuterBorderThickness + "px " + Util.getRgbaCSSStringFromAntdColor( buttonOuterBorderColor )  : "";
        const borderRadius = Util.isNumber( buttonOuterBorderRadius ) ? buttonOuterBorderRadius + "px" : "";

        const oc = BrekekeOperatorConsole.getStaticInstance();
        const currentCallInfo = oc.getPhoneClient().getCallInfos().getCurrentCallInfo();
        const subtypeName = this._getLegacyButtonWidgetSubTypeName();
        const iconJsx = this._getIconJsx();

        const isFlash = currentCallInfo && currentCallInfo.getCallStatus() === ACallInfo.CALL_STATUSES.incoming && currentCallInfo.getIsAnswered() === false;

        return <button title={i18n.t(`legacy_button_description.${subtypeName}`)} className={clsx("kbc-button kbc-button-fill-parent", isFlash === true && "kbc-button-danger-flash kbc-pickUpCall-button-danger-flash")}
                       style={{
                           fontSize:sButtonFontSize,
                           border:border,
                           borderRadius:borderRadius,
                           color:color,
                           backgroundColor:backgroundColor
                       }}
                       disabled={true}
        >{iconJsx}</button>
    }

}