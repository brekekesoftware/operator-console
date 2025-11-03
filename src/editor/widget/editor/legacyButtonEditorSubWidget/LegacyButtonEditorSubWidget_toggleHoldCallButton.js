import React from 'react';
import LegacyButtonEditorSubWidget from "./LegacyButtonEditorSubWidget";
import i18n from "../../../../i18n";
import Util from "../../../../Util";
import BrekekeOperatorConsole from "../../../../index";

export default class LegacyButtonEditorSubWidget_toggleHoldCallButton extends LegacyButtonEditorSubWidget  {

    constructor( legacyButtonEditorWidgetAsParent, legacyButtonEditorSubWidgetData  ) {
        super(  legacyButtonEditorWidgetAsParent, legacyButtonEditorSubWidgetData  );
    }

    //!override
    getRenderJsx(tooltipOfButtonWidget) {
        const oc = BrekekeOperatorConsole.getStaticInstance();
        const currentCallInfo = oc.getPhoneClient().getCallInfos().getCurrentCallInfo();
        const bHolding = currentCallInfo?.getIsHolding();
        const subWidgetData = this.getLegacyButtonSubWidgetData();
        //const widgetData = this.getLegacyButtonSubWidgetData().getLegacyButtonWidgetDataAsParent();
        if( bHolding ){
            const sUnholdButtonFontSize = subWidgetData.getUnholdFontSize() ? subWidgetData.getUnholdFontSize() + "px" : "1rem";    //!default
            const unholdButtonFgColor = subWidgetData.getUnholdFgColor();
            const unholdButtonBgColor = subWidgetData.getUnholdBgColor();
            const unholdButtonOuterBorderColor = subWidgetData.getUnholdOuterBorderColor();
            const unholdButtonOuterBorderThickness = subWidgetData.getUnholdOuterBorderThickness();
            const unholdButtonOuterBorderRadius = subWidgetData.getUnholdOuterBorderRadius();

            let unholdColor = Util.isAntdRgbaProperty( unholdButtonFgColor  ) ? Util.getRgbaCSSStringFromAntdColor( unholdButtonFgColor ) : "";
            let unholdBackgroundColor = Util.isAntdRgbaProperty( unholdButtonBgColor ) ? Util.getRgbaCSSStringFromAntdColor( unholdButtonBgColor ) : "";
            const unholdBorder = Util.isNumeric( unholdButtonOuterBorderThickness ) && Util.isAntdRgbaProperty( unholdButtonOuterBorderColor) ?
                "solid " + unholdButtonOuterBorderThickness + "px " + Util.getRgbaCSSStringFromAntdColor( unholdButtonOuterBorderColor )  : "";
            const unholdBorderRadius = Util.isNumber( unholdButtonOuterBorderRadius ) ? unholdButtonOuterBorderRadius + "px" : "";

            let unholdLabel;
            if( subWidgetData.getUnholdLabel() ){
                unholdLabel = subWidgetData.getUnholdLabel();
            }
            else{
                unholdLabel = i18n.t("Unhold");
            }
            const unholdIconJsx = this._getIconJsx( subWidgetData.getUnholdIcon(), unholdLabel, subWidgetData.getUnholdIconWidth(), subWidgetData.getUnholdIconHeight()  );
            return <button title={tooltipOfButtonWidget} className="kbc-button kbc-button-fill-parent kbc-button-danger-flash-slow kbc-toggleHoldCall-button-danger-flash"
                           style={{
                               fontSize:sUnholdButtonFontSize,
                               border:unholdBorder,
                               borderRadius:unholdBorderRadius,
                               color:unholdColor,
                               backgroundColor:unholdBackgroundColor
                           }}
                           disabled={true}
            >{unholdIconJsx}</button>
        }
        else {
            const sHoldButtonFontSize = subWidgetData.getHoldFontSize() ? subWidgetData.getHoldFontSize() + "px" : "1rem";    //!default
            const holdButtonFgColor = subWidgetData.getHoldFgColor();
            const holdButtonBgColor = subWidgetData.getHoldBgColor();
            const holdButtonOuterBorderColor = subWidgetData.getHoldOuterBorderColor();
            const holdButtonOuterBorderThickness = subWidgetData.getHoldOuterBorderThickness();
            const holdButtonOuterBorderRadius = subWidgetData.getHoldOuterBorderRadius();

            const holdColor = Util.isAntdRgbaProperty(holdButtonFgColor) ? Util.getRgbaCSSStringFromAntdColor(holdButtonFgColor) : "";
            const holdBackgroundColor = Util.isAntdRgbaProperty(holdButtonBgColor) ? Util.getRgbaCSSStringFromAntdColor(holdButtonBgColor) : "";
            const holdBorder = Util.isNumeric(holdButtonOuterBorderThickness) && Util.isAntdRgbaProperty(holdButtonOuterBorderColor) ?
                "solid " + holdButtonOuterBorderThickness + "px " + Util.getRgbaCSSStringFromAntdColor(holdButtonOuterBorderColor) : "";
            const holdBorderRadius = Util.isNumber(holdButtonOuterBorderRadius) ? holdButtonOuterBorderRadius + "px" : "";

            let holdLabel;
            if( subWidgetData.getHoldLabel() ){
                holdLabel = subWidgetData.getHoldLabel();
            }
            else{
                holdLabel = i18n.t("Hold");
            }
            const holdIconJsx = this._getIconJsx( subWidgetData.getHoldIcon(), holdLabel, subWidgetData.getHoldIconWidth(), subWidgetData.getHoldIconHeight() );
            return <button title={tooltipOfButtonWidget}
                           className="kbc-button kbc-button-fill-parent "
                           style={{
                               fontSize: sHoldButtonFontSize,
                               border: holdBorder,
                               borderRadius: holdBorderRadius,
                               color: holdColor,
                               backgroundColor: holdBackgroundColor
                           }}
                           disabled={true}
            >{holdIconJsx}</button>
        }
    }

}