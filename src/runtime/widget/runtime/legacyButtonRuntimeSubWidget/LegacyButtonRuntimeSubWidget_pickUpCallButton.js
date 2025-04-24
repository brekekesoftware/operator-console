import React from 'react';
import i18n from "../../../../i18n";
import LegacyButtonRuntimeSubWidget from "./LegacyButtonRuntimeSubWidget";
import BrekekeOperatorConsole from "../../../../index";
import Util from "../../../../Util";
import ACallInfo from "../../../../ACallInfo";
import clsx from "clsx";

export default class LegacyButtonRuntimeSubWidget_pickUpCallButton extends LegacyButtonRuntimeSubWidget  {

    constructor( legacyButtonRuntimeWidgetAsParent, legacyButtonRuntimeSubWidgetData  ) {
        super(  legacyButtonRuntimeWidgetAsParent, legacyButtonRuntimeSubWidgetData  );
    }

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

        const oc = BrekekeOperatorConsole.getStaticInstance();
        const currentCallInfo = oc.getPhoneClient().getCallInfos().getCurrentCallInfo();
        const subtypeName = this._getLegacyButtonWidgetSubTypeName();
        const iconJsx = this._getIconJsx();

        // const callInfos = oc.getPhoneClient().getCallInfos();
        // const callInfoCount = callInfos.getCallInfoCount();
        // let isFlash = false;
        // for( let i = 0; i < callInfoCount; i++ ){
        //     const callInfo = callInfos.getCallInfoAt( i );
        //     const isIncoming = callInfo.getCallStatus() === ACallInfo.CALL_STATUSES.incoming;
        //     if( isIncoming === true  ){
        //         isFlash = true;
        //         break;
        //     }
        // }

        const isFlash = currentCallInfo && currentCallInfo.getCallStatus() === ACallInfo.CALL_STATUSES.incoming && currentCallInfo.getIsAnswered() === false;

        return <button title={tooltipOfButtonWidget} className={clsx("kbc-button kbc-button-fill-parent", isFlash === true && "kbc-button-danger-flash kbc-pickUpCall-button-danger-flash")}
                       style={{
                           fontSize:sButtonFontSize,
                           border:border,
                           borderRadius:borderRadius,
                           color:color,
                           backgroundColor:backgroundColor
                       }}
                       onClick={
                           () => {
                               if( !currentCallInfo ) {
                                   return;
                               }
                               const bIsIncoming = currentCallInfo.getIsIncoming();
                               if( !bIsIncoming ) {
                                   return;
                               }
                               const bIsAnswered = currentCallInfo.getIsAnswered();
                               if( bIsAnswered ) {
                                   return;
                               }

                               oc.answerCall();
                           }
                       }
        >{iconJsx}</button>
    }

}