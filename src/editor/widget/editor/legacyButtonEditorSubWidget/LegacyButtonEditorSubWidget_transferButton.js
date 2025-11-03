import React from 'react';
import LegacyButtonEditorSubWidget from "./LegacyButtonEditorSubWidget";
import i18n from "../../../../i18n";
import BrekekeOperatorConsole from "../../../../index";
import Util from "../../../../Util";

export default class LegacyButtonEditorSubWidget_transferButton extends LegacyButtonEditorSubWidget  {

    constructor( legacyButtonEditorWidgetAsParent, legacyButtonEditorSubWidgetData  ) {
        super(  legacyButtonEditorWidgetAsParent, legacyButtonEditorSubWidgetData  );
    }

    //!override
    getRenderJsx(tooltipOfButtonWidget) {
        const subWidgetData = this.getLegacyButtonSubWidgetData();
        //const widgetData = this.getLegacyButtonSubWidgetData().getLegacyButtonWidgetDataAsParent();
        const oc = BrekekeOperatorConsole.getStaticInstance();
        const currentCallInfo = oc.getPhoneClient().getCallInfos().getCurrentCallInfo();
        const bTransferring = currentCallInfo?.getIsTransferring();
        if( bTransferring ){
            const sCancelTransferButtonFontSize = subWidgetData.getCancelTransferFontSize() ? subWidgetData.getCancelTransferFontSize() + "px" : "1rem";    //!default
            const cancelTransferButtonFgColor = subWidgetData.getCancelTransferFgColor();
            const cancelTransferButtonBgColor = subWidgetData.getCancelTransferBgColor();
            const cancelTransferButtonOuterBorderColor = subWidgetData.getCancelTransferOuterBorderColor();
            const cancelTransferButtonOuterBorderThickness = subWidgetData.getCancelTransferOuterBorderThickness();
            const cancelTransferButtonOuterBorderRadius = subWidgetData.getCancelTransferOuterBorderRadius();

            let cancelTransferColor = Util.isAntdRgbaProperty( cancelTransferButtonFgColor  ) ? Util.getRgbaCSSStringFromAntdColor( cancelTransferButtonFgColor ) : "";
            let cancelTransferBackgroundColor = Util.isAntdRgbaProperty( cancelTransferButtonBgColor ) ? Util.getRgbaCSSStringFromAntdColor( cancelTransferButtonBgColor ) : "";
            const cancelTransferBorder = Util.isNumeric( cancelTransferButtonOuterBorderThickness ) && Util.isAntdRgbaProperty( cancelTransferButtonOuterBorderColor) ?
                "solid " + cancelTransferButtonOuterBorderThickness + "px " + Util.getRgbaCSSStringFromAntdColor( cancelTransferButtonOuterBorderColor )  : "";
            const cancelTransferBorderRadius = Util.isNumber( cancelTransferButtonOuterBorderRadius ) ? cancelTransferButtonOuterBorderRadius + "px" : "";

//            const transferIconJsx = this._getIconJsx();
            let cancelTransferLabel;
            if( subWidgetData.getLabel() ){
                cancelTransferLabel = subWidgetData.getCancelTransferLabel();
            }
            else{
                cancelTransferLabel = i18n.t("Cancel_transfer");
            }
            const cancelTransferIconJsx = this._getIconJsx( subWidgetData.getCancelTransferIcon(), cancelTransferLabel, subWidgetData.getCancelTransferIconWidth(), subWidgetData.getCancelTransferIconHeight() );
            return         <button title={tooltipOfButtonWidget} className="kbc-button kbc-button-fill-parent kbc-button-danger-flash kbc-transfer-button-danger-flash"
                                   style={{
                                       fontSize:sCancelTransferButtonFontSize,
                                       border:cancelTransferBorder,
                                       borderRadius:cancelTransferBorderRadius,
                                       color:cancelTransferColor,
                                       backgroundColor:cancelTransferBackgroundColor
                                   }}
                                   disabled={true}
            >{cancelTransferIconJsx}</button>
        }
        else{
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

//            const transferIconJsx = this._getIconJsx();
            let transferLabel;
            if( subWidgetData.getLabel() ){
                transferLabel = subWidgetData.getLabel();
            }
            else{
                transferLabel = i18n.t("Transfer");
            }
            const transferIconJsx = this._getIconJsx( subWidgetData.getIcon(), transferLabel, subWidgetData.getIconWidth(), subWidgetData.getIconHeight() );
            return         <button title={tooltipOfButtonWidget} className="kbc-button kbc-button-fill-parent"
                                   style={{
                                       fontSize:sButtonFontSize,
                                       border:border,
                                       borderRadius:borderRadius,
                                       color:color,
                                       backgroundColor:backgroundColor
                                   }}
                                   disabled={true}
            >{transferIconJsx}</button>
        }

    }

}