import React from 'react';
import RuntimeWidget from "./RuntimeWidget";
import {IconKeyboard, IconPhoneIncoming, IconPhoneOutgoing} from "../../../icons";
import BrekekeOperatorConsole from "../../../index";
import Util from "../../../Util";

function formatSecondsToHHMMSS (seconds) {
    const secondsNum = Math.floor( seconds );

    const second = Math.floor(secondsNum % 60);
    const minute = Math.floor(secondsNum / 60) % 60;
    const hour = Math.floor(secondsNum / (60 * 60));

    const s = hour.toString().padStart(2, '0') + ":"
        + minute.toString().padStart(2, '0') + ":"
        + second.toString().padStart(2, '0');
    return s;
}

export default class CallPanelRuntimeWidget extends RuntimeWidget{
    durationTimeout = null;

    constructor( props ) {
        super( props );
        this.state = { duration: '' }
        this.durationTimeout = setTimeout(this._updateCallDuration, 1000);
    }

    componentDidUpdate() {
        super.componentDidUpdate();
        const oc = BrekekeOperatorConsole.getStaticInstance();
        const currentCallInfo = oc.getPhoneClient().getCallInfos().getCurrentCallInfo();

        if (currentCallInfo?.getIsAnswered() && !this.durationTimeout) {
            this._updateCallDuration();
        }
        if (!currentCallInfo?.getIsAnswered() && this.state.duration) {
            this.setState({ duration: '' });
        }
    }

    componentWillUnmount() {
        super.componentWillUnmount();
        if (this.durationTimeout) {
            clearTimeout(this.durationTimeout);
        }
    }

    //!overload
    _getRenderMainJsx() {
        const widgetData = this.getWidgetData();

        const callpanelFgColor = Util.getRgbaCSSStringFromAntdColor( widgetData.getCallpanelFgColor() , "" );
        const callpanelBgColor = Util.getRgbaCSSStringFromAntdColor( widgetData.getCallpanelBgColor(), "" );
        const callpanelBorderRadius = ( widgetData.getCallpanelBorderRadius() || widgetData.getCallpanelBorderRadius() === 0 ) ? widgetData.getCallpanelBorderRadius() : "";
        const outsideShadow_horizontalOffset =  ( widgetData.getOutsideShadow_horizontalOffset() || widgetData.getOutsideShadow_horizontalOffset() === 0 ) ? widgetData.getOutsideShadow_horizontalOffset() : "";
        const outsideShadow_verticalOffset = ( widgetData.getOutsideShadow_verticalOffset() || widgetData.getOutsideShadow_verticalOffset() === 0 ) ? widgetData.getOutsideShadow_verticalOffset() : "";
        const outsideShadow_blur = ( widgetData.getOutsideShadow_blur() || widgetData.getOutsideShadow_blur() === 0 ) ? widgetData.getOutsideShadow_blur() : "";
        const outsideShadow_spread = ( widgetData.getOutsideShadow_spread() || widgetData.getOutsideShadow_spread() === 0 ) ? widgetData.getOutsideShadow_spread() : "";
        const outsideShadowColorRgb =  Util.getRgbaCSSStringFromAntdColor( widgetData.getOutsideShadow_color() , "rgba(0,0,0,0)" ); // "rgba(0,0,0,0.2)"  //!default

        const insideShadow_horizontalOffset =  ( widgetData.getInsideShadow_horizontalOffset() || widgetData.getInsideShadow_horizontalOffset() === 0 ) ? widgetData.getInsideShadow_horizontalOffset() : "";
        const insideShadow_verticalOffset = ( widgetData.getInsideShadow_verticalOffset() || widgetData.getInsideShadow_verticalOffset() === 0 ) ? widgetData.getInsideShadow_verticalOffset() : "";
        const insideShadow_blur = ( widgetData.getInsideShadow_blur() || widgetData.getInsideShadow_blur() === 0 ) ? widgetData.getInsideShadow_blur() : "";
        const insideShadow_spread = ( widgetData.getInsideShadow_spread() || widgetData.getInsideShadow_spread() === 0 ) ? widgetData.getInsideShadow_spread() : "";
        const insideShadowColorRgb =  Util.getRgbaCSSStringFromAntdColor( widgetData.getInsideShadow_color() , "rgba(0,0,0,0)" ); //"rgba(48,71,1,1)" //!default

        const sBoxshadowOutside = outsideShadowColorRgb && outsideShadow_horizontalOffset && outsideShadow_verticalOffset && outsideShadow_blur && outsideShadow_spread ? outsideShadowColorRgb + " " + outsideShadow_horizontalOffset + "px " + outsideShadow_verticalOffset + "px " + outsideShadow_blur + "px " + outsideShadow_spread + "px" : "";
        const sBoxshadowInside = insideShadowColorRgb &&  insideShadow_horizontalOffset && insideShadow_verticalOffset && insideShadow_blur && insideShadow_spread ? "inset "+ insideShadowColorRgb + " " + insideShadow_horizontalOffset + "px " + insideShadow_verticalOffset + "px " + insideShadow_blur + "px " + insideShadow_spread + "px" : "";
        const sBoxShadow = sBoxshadowOutside + ( sBoxshadowOutside && sBoxshadowInside ? "," : "" ) + sBoxshadowInside;

        const oc = BrekekeOperatorConsole.getStaticInstance();
        const currentCallInfo = oc.getPhoneClient().getCallInfos().getCurrentCallInfo();
        const bIsDTMFInput = oc.getIsDTMFInput();

        let dialing = oc.getDialing();
        if( !dialing ){
            dialing = "";
        }

        const partyName = currentCallInfo?.getPartyName();
        const hasPartyName = partyName && partyName.length !== 0;
        return (
            <div className="brOCCallPanel" style={{
                borderRadius: callpanelBorderRadius,
                backgroundColor: callpanelBgColor,
                boxShadow: sBoxShadow,
                color: callpanelFgColor
            }}>
                <div className="brOCCallPanelRow">
                    <div className="brOCCallPanelLeft">
                        {!!currentCallInfo && (currentCallInfo.getIsIncoming() ? IconPhoneIncoming : IconPhoneOutgoing)}
                    </div>
                    <div className="brOCCallPanelMain">
                        { hasPartyName && <div className="brOCCallPanelPartyName">{partyName}</div> }
                        <div className={ hasPartyName ? "brOCCallPanelPartyNumber_small" : "brOCCallPanelPartyNumber" }>{currentCallInfo?.getPartyNumber()}</div>
                        <div className="brOCCallPanelDuration">{this.state.duration}</div>
                    </div>
                </div>
                <div className="brOCCallPanelRow">
                    {bIsDTMFInput !== true && dialing.length !== 0 && (
                        <div className="brOCCallPanelLeft">{IconKeyboard}</div>
                    )}
                    <div className="brOCCallPanelMain">
                        <div className="brOCCallPanelDialing">{dialing}</div>
                    </div>
                </div>
            </div>
        );
    }

    _updateCallDuration = () => {
        if (this.durationTimeout) {
            clearTimeout(this.durationTimeout);
            this.durationTimeout = null;
        }

        const oc = BrekekeOperatorConsole.getStaticInstance();
        const currentCallInfo = oc.getCurrentCallInfo();
        if (currentCallInfo && currentCallInfo.getIsAnswered()) {
            this.durationTimeout = setTimeout(this._updateCallDuration, 1000);
            this.setState({
                duration: formatSecondsToHHMMSS(currentCallInfo.getAnsweredAt() ? (Date.now() - currentCallInfo.getAnsweredAt()) / 1000 : 0)
            });
        }
    }

}