import React from 'react';
import i18n from "../../../../i18n";
import LegacyButtonRuntimeSubWidget from "./LegacyButtonRuntimeSubWidget";
import BrekekeOperatorConsole from "../../../../index";
import Util from "../../../../Util";
import ACallInfo from "../../../../ACallInfo";

export default class LegacyButtonRuntimeSubWidget_toggleVideoOnCallButton extends LegacyButtonRuntimeSubWidget  {

    constructor( legacyButtonRuntimeWidgetAsParent, legacyButtonRuntimeSubWidgetData  ) {
        super(  legacyButtonRuntimeWidgetAsParent, legacyButtonRuntimeSubWidgetData  );
    }

    _onClickVideoOnButton(ev, currentCallInfo ){
        if( !currentCallInfo ){
            return;
        }
        if( !currentCallInfo.getIsAnswered() ){
            return;
        }
        //const bRemoteVideoEnabled = currentCallInfo.getIsRemoteVideoEnabled();
        const bLocalVideoEnabled = currentCallInfo.getIsLocalVideoEnabled();

        //if( bRemoteVideoEnabled || bLocalVideoEnabled ){
        if( bLocalVideoEnabled ){
            return;
        }
        currentCallInfo.toggleVideo();
    }

    //!override
    getRenderJsx(tooltipOfButtonWidget) {
        const subWidgetData = this.getLegacyButtonSubWidgetData();
        //const widgetData = this.getLegacyButtonSubWidgetData().getLegacyButtonWidgetDataAsParent();

        const oc = BrekekeOperatorConsole.getStaticInstance();
        const phoneClient = oc.getPhoneClient();
        const currentCallInfo = phoneClient.getCallInfos().getCurrentCallInfo();
        const bToggleVideoSupport = phoneClient.getIsToggleVideoSupport();
        if( bToggleVideoSupport && !!currentCallInfo && currentCallInfo.getIsAnswered() === true ) {
            const bLocalVideoEnabled =  currentCallInfo?.getIsLocalVideoEnabled();	//!temp
            const bRemoteVideoEnabled =  currentCallInfo?.getIsRemoteVideoEnabled();	//!temp
            const bVideoOn = bLocalVideoEnabled;
            if (bVideoOn) {
                const sVideoOffButtonFontSize = subWidgetData.getVideoOffFontSize() ? subWidgetData.getVideoOffFontSize() + "px" : "1rem";    //!default
                const videoOffButtonFgColor = subWidgetData.getVideoOffFgColor();
                const videoOffButtonBgColor = subWidgetData.getVideoOffBgColor();
                const videoOffButtonOuterBorderColor = subWidgetData.getVideoOffOuterBorderColor();
                const videoOffButtonOuterBorderThickness = subWidgetData.getVideoOffOuterBorderThickness();
                const videoOffButtonOuterBorderRadius = subWidgetData.getVideoOffOuterBorderRadius();

                let videoOffColor = Util.isAntdRgbaProperty(videoOffButtonFgColor) ? Util.getRgbaCSSStringFromAntdColor(videoOffButtonFgColor) : "";
                let videoOffBackgroundColor = Util.isAntdRgbaProperty(videoOffButtonBgColor) ? Util.getRgbaCSSStringFromAntdColor(videoOffButtonBgColor) : "";
                const videoOffBorder = Util.isNumeric(videoOffButtonOuterBorderThickness) && Util.isAntdRgbaProperty(videoOffButtonOuterBorderColor) ?
                    "solid " + videoOffButtonOuterBorderThickness + "px " + Util.getRgbaCSSStringFromAntdColor(videoOffButtonOuterBorderColor) : "";
                const videoOffBorderRadius = Util.isNumber(videoOffButtonOuterBorderRadius) ? videoOffButtonOuterBorderRadius + "px" : "";

                let videoOffLabel;
                if (subWidgetData.getVideoOffLabel()) {
                    videoOffLabel = subWidgetData.getVideoOffLabel();
                } else {
                    videoOffLabel = i18n.t("VideoOff");
                }
                const videoOffIconJsx = this._getIconJsx(subWidgetData.getVideoOffIcon(), videoOffLabel, subWidgetData.getVideoOffIconWidth(), subWidgetData.getVideoOffIconHeight());
                return <button title={tooltipOfButtonWidget}
                               className="kbc-button kbc-button-fill-parent kbc-button-danger kbc-toggleVideoCall-button-danger"
                               style={{
                                   fontSize: sVideoOffButtonFontSize,
                                   border: videoOffBorder,
                                   borderRadius: videoOffBorderRadius,
                                   color: videoOffColor,
                                   backgroundColor: videoOffBackgroundColor
                               }}
                               onClick={
                                   (ev) => {
                                       currentCallInfo.toggleVideo();
                                   }
                               }
                >{videoOffIconJsx}</button>
            } else {
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
                if (subWidgetData.getVideoOnLabel()) {
                    videoOnLabel = subWidgetData.getVideoOnLabel();
                } else {
                    videoOnLabel = i18n.t("VideoOn");
                }
                const videoOnIconJsx = this._getIconJsx(subWidgetData.getVideoOnIcon(), videoOnLabel, subWidgetData.getVideoOnIconWidth(), subWidgetData.getVideoOnIconHeight());
                return <button title={tooltipOfButtonWidget} className="kbc-button kbc-button-fill-parent"
                               style={{
                                   fontSize: sVideoOnButtonFontSize,
                                   border: videoOnBorder,
                                   borderRadius: videoOnBorderRadius,
                                   color: videoOnColor,
                                   backgroundColor: videoOnBackgroundColor
                               }}
                               onClick={ (ev) => this._onClickVideoOnButton(ev, currentCallInfo ) }
                >{videoOnIconJsx}</button>
            }
        }
        else{
            const sVideoOnButtonFontSize = subWidgetData.getVideoOnFontSize() ? subWidgetData.getVideoOnFontSize() + "px" : "1rem";    //!default
            const VideoOnButtonFgColor = subWidgetData.getVideoOnFgColor();
            const VideoOnButtonBgColor = subWidgetData.getVideoOnBgColor();
            const VideoOnButtonOuterBorderColor = subWidgetData.getVideoOnOuterBorderColor();
            const VideoOnButtonOuterBorderThickness = subWidgetData.getVideoOnOuterBorderThickness();
            const VideoOnButtonOuterBorderRadius = subWidgetData.getVideoOnOuterBorderRadius();

            const VideoOnColor = Util.isAntdRgbaProperty(VideoOnButtonFgColor) ? Util.getRgbaCSSStringFromAntdColor(VideoOnButtonFgColor) : "";
            const VideoOnBackgroundColor = Util.isAntdRgbaProperty(VideoOnButtonBgColor) ? Util.getRgbaCSSStringFromAntdColor(VideoOnButtonBgColor) : "";
            const VideoOnBorder = Util.isNumeric(VideoOnButtonOuterBorderThickness) && Util.isAntdRgbaProperty(VideoOnButtonOuterBorderColor) ?
                "solid " + VideoOnButtonOuterBorderThickness + "px " + Util.getRgbaCSSStringFromAntdColor(VideoOnButtonOuterBorderColor) : "";
            const VideoOnBorderRadius = Util.isNumber(VideoOnButtonOuterBorderRadius) ? VideoOnButtonOuterBorderRadius + "px" : "";

            let VideoOnLabel;
            if( subWidgetData.getVideoOnLabel() ){
                VideoOnLabel = subWidgetData.getVideoOnLabel();
            }
            else{
                VideoOnLabel = i18n.t("VideoOn");
            }
            const VideoOnIconJsx = this._getIconJsx( subWidgetData.getVideoOnIcon(), VideoOnLabel, subWidgetData.getVideoOnIconWidth(), subWidgetData.getVideoOnIconHeight() );
            return <button title={tooltipOfButtonWidget}
                           className="kbc-button kbc-button-fill-parent"
                           style={{
                               fontSize: sVideoOnButtonFontSize,
                               border: VideoOnBorder,
                               borderRadius: VideoOnBorderRadius,
                               color: VideoOnColor,
                               backgroundColor: VideoOnBackgroundColor
                           }}
                           disabled={true}
            >{VideoOnIconJsx}</button>
        }

    }

}