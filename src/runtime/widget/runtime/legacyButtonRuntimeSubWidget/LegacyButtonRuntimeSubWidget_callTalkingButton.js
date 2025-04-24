import React from 'react';
import i18n from "../../../../i18n";
import LegacyButtonRuntimeSubWidget from "./LegacyButtonRuntimeSubWidget";
import BrekekeOperatorConsole from "../../../../index";
import clsx from "clsx";
import Util from "../../../../Util";

export default class LegacyButtonRuntimeSubWidget_callTalkingButton extends LegacyButtonRuntimeSubWidget  {

    constructor( legacyButtonRuntimeWidgetAsParent, legacyButtonRuntimeSubWidgetData  ) {
        super(  legacyButtonRuntimeWidgetAsParent, legacyButtonRuntimeSubWidgetData  );
    }


    ////!override
    // getRenderJsx() {
    //     return <div
    //         style={{
    //             border: "1px solid #000000",
    //             backgroundColor: "#0000FF",
    //             width: "100%",
    //             height: "100%",
    //             boxSizing: "border-box"
    //         }}></div>
    // }

    //!override
    getRenderJsx(tooltipOfButtonWidget) {
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

        const currentCallInfo = BrekekeOperatorConsole.getStaticInstance().getPhoneClient().getCallInfos().getCurrentCallInfo();

        const isDanger = currentCallInfo?.getIsAnswered() && !currentCallInfo?.getIsHolding();
        if( isDanger ){
            //Use default.
            color = null;
            backgroundColor = null;
        }

        return <button title={tooltipOfButtonWidget}  className=
            {
                clsx(
                    "kbc-button kbc-button-fill-parent",
                    isDanger && 'kbc-button-danger  kbc-callTalking-button-danger'
                )
            }
           style={{
               fontSize:sButtonFontSize,
               border:border,
               borderRadius:borderRadius,
               color:color,
               backgroundColor:backgroundColor
           }}
        >{this._getIconJsx()}</button>
    }

}