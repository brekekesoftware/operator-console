import React from 'react';
import i18n from "../../../../i18n";
import LegacyButtonRuntimeSubWidget from "./LegacyButtonRuntimeSubWidget";
import BrekekeOperatorConsole from "../../../../index";
import ACallInfo from "../../../../ACallInfo";
import Notification from "antd/lib/notification";
import Util from "../../../../Util";

export default class LegacyButtonRuntimeSubWidget_oneTouchDialButton extends LegacyButtonRuntimeSubWidget  {

    constructor( legacyButtonRuntimeWidgetAsParent, legacyButtonRuntimeSubWidgetData  ) {
        super(  legacyButtonRuntimeWidgetAsParent, legacyButtonRuntimeSubWidgetData  );
    }

    //!override
    getRenderJsx() {
        const widgetData = this.getLegacyButtonSubWidgetData().getLegacyButtonWidgetDataAsParent();
        const sButtonFontSize = widgetData.getFontSize() ? widgetData.getFontSize() + "px" : "1rem";    //!default
        const buttonFgColor = widgetData.getFgColor();
        const buttonBgColor = widgetData.getBgColor();
        const buttonOuterBorderColor = widgetData.getOuterBorderColor();
        const buttonOuterBorderThickness = widgetData.getOuterBorderThickness();
        const buttonOuterBorderRadius = widgetData.getOuterBorderRadius();

        let color = Util.isAntdRgbaProperty( buttonFgColor  ) ? Util.getRgbaCSSStringFromAntdColor( buttonFgColor ) : "";
        let backgroundColor = Util.isAntdRgbaProperty( buttonBgColor ) ? Util.getRgbaCSSStringFromAntdColor( buttonBgColor ) : "";
        const border = Util.isNumeric( buttonOuterBorderThickness ) && Util.isAntdRgbaProperty( buttonOuterBorderColor) ?
            "solid " + buttonOuterBorderThickness + "px " + Util.getRgbaCSSStringFromAntdColor( buttonOuterBorderColor )  : "";
        const borderRadius = Util.isNumber( buttonOuterBorderRadius ) ? buttonOuterBorderRadius + "px" : "";

        const oneTouchDialData = this._LegacyButtonRuntimeSubWidgetData;
        const number = oneTouchDialData.getNumber();

        const subtypeName = this._getLegacyButtonWidgetSubTypeName();
        const iconJsx = this._getIconJsx();
        return <button title={i18n.t(`legacy_button_description.${subtypeName}`)} className="kbc-button kbc-button-fill-parent"
                       style={{
                           fontSize:sButtonFontSize,
                           border:border,
                           borderRadius:borderRadius,
                           color:color,
                           backgroundColor:backgroundColor
                       }}
                       onClick={() => {
                           let onetouchdialMode = oneTouchDialData.getOnetouchdialMode();
                           if( !onetouchdialMode ) {
                               onetouchdialMode = "callOnly";    //!default
                           }
                           const oc = BrekekeOperatorConsole.getStaticInstance();
                           const currentCallInfo = oc.getPhoneClient().getCallInfos().getCurrentCallInfo();
                           if( !!currentCallInfo ) {   //transfer?
                               const callStatus = currentCallInfo.getCallStatus();
                               const canTransferByCallStatus = callStatus == ACallInfo.CALL_STATUSES.holding || callStatus === ACallInfo.CALL_STATUSES.talking;
                               if( canTransferByCallStatus === true ) {
                                   const canTransferByOnetouchdialMode = onetouchdialMode === "attendedTransferOrCall" || onetouchdialMode === "blindTransferOrCall" || onetouchdialMode === "attendedTransferOnly" || onetouchdialMode === "blindTransferOnly";
                                   if(  canTransferByOnetouchdialMode === true ) {
                                       //const talkerId = currentCallInfo.getPbxTalkerId();
                                       //const tenant = operatorConsoleAsParent.getLoggedinTenant();
                                       const mode = onetouchdialMode === "blindTransferOrCall" || onetouchdialMode === "blindTransferOnly" ? "blind" : undefined; //use attended
                                       oc.transferCall( number, mode, currentCallInfo );
                                       return;
                                   }
                               }
                           }

                           //call
                           if( onetouchdialMode !== "attendedTransferOnly" && onetouchdialMode !== "blindTransferOnly" ) {
                               if( currentCallInfo ) {
                                   const callStatus = currentCallInfo.getCallStatus();
                                   if( callStatus === ACallInfo.CALL_STATUSES.talking ) {
                                       const timelimit = Date.now() + BrekekeOperatorConsole.WAIT_HOLD_TIMELIMIT_MILLIS_AT_ONETOUCHDIAL;
                                       const func = function (callInfoAsCaller) {
                                           const removed = currentCallInfo.removeOnHoldFunction(func);
                                           if (Date.now() > timelimit) {
                                               Notification.error({message: i18n.t('failedToHoldCallAtOneTouchDial') + "\r\n" +  e, duration:0 });
                                               return;
                                           }
                                           oc.setDialingAndMakeCall(number, null);
                                       };
                                       currentCallInfo.addOnHoldFunction(func);
                                       currentCallInfo.toggleHoldWithCheck();
                                       return;
                                   }
                               }
                               oc.setDialingAndMakeCall(number, null);
                           }

                       }}
        >{iconJsx}</button>
    }

}