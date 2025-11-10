import React from 'react';
import LegacyButtonEditorSubWidget from "./LegacyButtonEditorSubWidget";
import i18n from "../../../../i18n";
import Util from "../../../../Util";
import BrekekeOperatorConsole from "../../../../index";

export default class LegacyButtonEditorSubWidget_toggleVideoCallButton extends LegacyButtonEditorSubWidget  {

    constructor( legacyButtonEditorWidgetAsParent, legacyButtonEditorSubWidgetData  ) {
        super(  legacyButtonEditorWidgetAsParent, legacyButtonEditorSubWidgetData  );
    }

    //!override
    getRenderJsx(tooltipOfButtonWidget) {
        const oc = BrekekeOperatorConsole.getStaticInstance();

		const phoneClient = oc.getPhoneClient();
		const currentCallInfo = phoneClient.getCallInfos().getCurrentCallInfo();
		const bToggleVideoSupport = phoneClient.getIsToggleVideoSupport();
		const subWidgetData = this.getLegacyButtonSubWidgetData();
		if( bToggleVideoSupport ){
		
			//const bVideoOn =  currentCallInfo?.getIsRemoteVideoEnabled() || currentCallInfo?.getIsLocalVideoEnabled();
			//const widgetData = this.getLegacyButtonSubWidgetData().getLegacyButtonWidgetDataAsParent();
			const bLocalVideoEnabled =  currentCallInfo?.getIsLocalVideoEnabled();
			//const bRemoteVideoEnabled =  currentCallInfo?.getIsRemoteVideoEnabled();	//!temp
			const bVideoOn = bLocalVideoEnabled;
			if( bVideoOn ){
				const sVideoOffButtonFontSize = subWidgetData.getVideoOffFontSize() ? subWidgetData.getVideoOffFontSize() + "px" : "1rem";    //!default
				const videoOffButtonFgColor = subWidgetData.getVideoOffFgColor();
				const videoOffButtonBgColor = subWidgetData.getVideoOffBgColor();
				const videoOffButtonOuterBorderColor = subWidgetData.getVideoOffOuterBorderColor();
				const videoOffButtonOuterBorderThickness = subWidgetData.getVideoOffOuterBorderThickness();
				const videoOffButtonOuterBorderRadius = subWidgetData.getVideoOffOuterBorderRadius();

				let videoOffColor = Util.isAntdRgbaProperty( videoOffButtonFgColor  ) ? Util.getRgbaCSSStringFromAntdColor( videoOffButtonFgColor ) : "";
				let videoOffBackgroundColor = Util.isAntdRgbaProperty( videoOffButtonBgColor ) ? Util.getRgbaCSSStringFromAntdColor( videoOffButtonBgColor ) : "";
				const videoOffBorder = Util.isNumeric( videoOffButtonOuterBorderThickness ) && Util.isAntdRgbaProperty( videoOffButtonOuterBorderColor) ?
					"solid " + videoOffButtonOuterBorderThickness + "px " + Util.getRgbaCSSStringFromAntdColor( videoOffButtonOuterBorderColor )  : "";
				const videoOffBorderRadius = Util.isNumber( videoOffButtonOuterBorderRadius ) ? videoOffButtonOuterBorderRadius + "px" : "";

				let videoOffLabel;
				if( subWidgetData.getVideoOffLabel() ){
					videoOffLabel = subWidgetData.getVideoOffLabel();
				}
				else{
					videoOffLabel = i18n.t("VideoOff");
				}
				const videoOffIconJsx = this._getIconJsx( subWidgetData.getVideoOffIcon(), videoOffLabel, subWidgetData.getVideoOffIconWidth(), subWidgetData.getVideoOffIconHeight()  );
				return <button title={tooltipOfButtonWidget} className="kbc-button kbc-button-fill-parent kbc-button-danger kbc-toggleVideoCall-button-danger"
							   style={{
								   fontSize:sVideoOffButtonFontSize,
								   border:videoOffBorder,
								   borderRadius:videoOffBorderRadius,
								   color:videoOffColor,
								   backgroundColor:videoOffBackgroundColor
							   }}
							   disabled={true}
				>{videoOffIconJsx}</button>
			}
			else {
				const sVideoOnButtonFontSize = subWidgetData.getVideoOnFontSize() ? subWidgetData.getVideoOnFontSize() + "px" : "1rem";    //!default
				const videoOnButtonFgColor = subWidgetData.getVideoOnFgColor();
				const videoOnButtonBgColor = subWidgetData.getVideoOnBgColor();
				const videoOnButtonOuterBorderColor = subWidgetData.getVideoOnOuterBorderColor();
				const videoOnButtonOuterBorderThickness = subWidgetData.getVideoOnOuterBorderThickness();
				const videoOnButtonOuterBorderRadius = subWidgetData.getVideoOnOuterBorderRadius();

				const videoOnColor = Util.isAntdRgbaProperty(videoOnButtonFgColor) ? Util.getRgbaCSSStringFromAntdColor(videoOnButtonFgColor) : "";
				const videoOnBackgroundColor = Util.isAntdRgbaProperty(videoOnButtonBgColor) ? Util.getRgbaCSSStringFromAntdColor(videoOnButtonBgColor) : "";
				const videoOnBorder = Util.isNumeric(videoOnButtonOuterBorderThickness) && Util.isAntdRgbaProperty(videoOnButtonOuterBorderColor) ?
					"solid " + videoOnButtonOuterBorderThickness + "px " + Util.getRgbaCSSStringFromAntdColor(videoOnButtonOuterBorderColor) : "";
				const videoOnBorderRadius = Util.isNumber(videoOnButtonOuterBorderRadius) ? videoOnButtonOuterBorderRadius + "px" : "";

				let videoOnLabel;
				if( subWidgetData.getVideoOnLabel() ){
					videoOnLabel = subWidgetData.getVideoOnLabel();
				}
				else{
					videoOnLabel = i18n.t("VideoOn");
				}
				const videoOnIconJsx = this._getIconJsx( subWidgetData.getVideoOnIcon(), videoOnLabel, subWidgetData.getVideoOnIconWidth(), subWidgetData.getVideoOnIconHeight() );
				return <button title={tooltipOfButtonWidget}
							   className="kbc-button kbc-button-fill-parent"
							   style={{
								   fontSize: sVideoOnButtonFontSize,
								   border: videoOnBorder,
								   borderRadius: videoOnBorderRadius,
								   color: videoOnColor,
								   backgroundColor: videoOnBackgroundColor
							   }}
							   disabled={true}
				>{videoOnIconJsx}</button>
			}
		}
		else{
			const sVideoOnButtonFontSize = subWidgetData.getVideoOnFontSize() ? subWidgetData.getVideoOnFontSize() + "px" : "1rem";    //!default
			const videoOnButtonFgColor = subWidgetData.getVideoOnFgColor();
			const videoOnButtonBgColor = subWidgetData.getVideoOnBgColor();
			const videoOnButtonOuterBorderColor = subWidgetData.getVideoOnOuterBorderColor();
			const videoOnButtonOuterBorderThickness = subWidgetData.getVideoOnOuterBorderThickness();
			const videoOnButtonOuterBorderRadius = subWidgetData.getVideoOnOuterBorderRadius();

			const videoOnColor = Util.isAntdRgbaProperty(videoOnButtonFgColor) ? Util.getRgbaCSSStringFromAntdColor(videoOnButtonFgColor) : "";
			const videoOnBackgroundColor = Util.isAntdRgbaProperty(videoOnButtonBgColor) ? Util.getRgbaCSSStringFromAntdColor(videoOnButtonBgColor) : "";
			const videoOnBorder = Util.isNumeric(videoOnButtonOuterBorderThickness) && Util.isAntdRgbaProperty(videoOnButtonOuterBorderColor) ?
				"solid " + videoOnButtonOuterBorderThickness + "px " + Util.getRgbaCSSStringFromAntdColor(videoOnButtonOuterBorderColor) : "";
			const videoOnBorderRadius = Util.isNumber(videoOnButtonOuterBorderRadius) ? videoOnButtonOuterBorderRadius + "px" : "";

			let videoOnLabel;
			if( subWidgetData.getVideoOnLabel() ){
				videoOnLabel = subWidgetData.getVideoOnLabel();
			}
			else{
				videoOnLabel = i18n.t("VideoOn");
			}
			const videoOnIconJsx = this._getIconJsx( subWidgetData.getVideoOnIcon(), videoOnLabel, subWidgetData.getVideoOnIconWidth(), subWidgetData.getVideoOnIconHeight() );
			return <button title={tooltipOfButtonWidget}
						   className="kbc-button kbc-button-fill-parent"
						   style={{
							   fontSize: sVideoOnButtonFontSize,
							   border: videoOnBorder,
							   borderRadius: videoOnBorderRadius,
							   color: videoOnColor,
							   backgroundColor: videoOnBackgroundColor
						   }}
						   disabled={true}
			>{videoOnIconJsx}</button>
		}
    }

}