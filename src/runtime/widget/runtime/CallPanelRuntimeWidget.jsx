import React from 'react';
import RuntimeWidget from "./RuntimeWidget";
//import {IconKeyboard, IconPhoneIncoming, IconPhoneOutgoing} from "../../../icons";
import BrekekeOperatorConsole from "../../../index";
import Util from "../../../Util";
import i18n from "../../../i18n";

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
        const bHasMissedCall = oc.getHasMissedCallFromState();

        const callIconWidth = widgetData.getCallIconWidth();
        const callIconHeight = widgetData.getCallIconHeight();
        const callerNameSize = widgetData.getCallerNameSize();
        const callerNumberSizeWithoutCallerName = widgetData.getCallerNumberSizeWithoutCallerName();
        const callerNumberSizeWithCallerName = widgetData.getCallerNumberSizeWithCallerName();
        const iCallerNumberSize = hasPartyName ?  callerNumberSizeWithCallerName : callerNumberSizeWithoutCallerName;
        const callDurationSize = widgetData.getCallDurationSize();
        const keyboardIconWidth = widgetData.getKeyboardIconWidth();
        const keyboardIconHeight = widgetData.getKeyboardIconHeight();
        const inputTextSIze = widgetData.getInputTextSize();
        const missedCallSize = widgetData.getMissedCallSize();
		
		const iCallIconWidth = callIconWidth || callIconWidth === 0 ? callIconWidth : 18;
		const iCallIconHeight = callIconHeight || callIconHeight === 0 ? callIconHeight : 18;
		const iKeyboardIconWidth = keyboardIconWidth || keyboardIconWidth === 0 ? keyboardIconWidth : 20;
		const iKeyboardIconHeight = keyboardIconHeight || keyboardIconHeight === 0 ? keyboardIconHeight : 14;

        const IconPhoneIncoming = <svg viewBox="3 3 18 18" width={iCallIconWidth} height={iCallIconHeight} preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M4,3A1,1 0 0,0 3,4A17,17 0 0,0 20,21A1,1 0 0,0 21,20V16.5A1,1 0 0,0 20,15.5C18.75,15.5 17.55,15.3 16.43,14.93C16.08,14.82 15.69,14.9 15.41,15.17L13.21,17.37C10.38,15.93 8.06,13.62 6.62,10.78L8.82,8.57C9.1,8.31 9.18,7.92 9.07,7.57C8.7,6.45 8.5,5.25 8.5,4A1,1 0 0,0 7.5,3H4M19,11V9.5H15.5L21,4L20,3L14.5,8.5V5H13V11H19Z"/></svg>
        const IconPhoneOutgoing = <svg viewBox="3 3 18 18" width={iCallIconWidth} height={iCallIconHeight} preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M4,3A1,1 0 0,0 3,4A17,17 0 0,0 20,21A1,1 0 0,0 21,20V16.5A1,1 0 0,0 20,15.5C18.75,15.5 17.55,15.3 16.43,14.93C16.08,14.82 15.69,14.9 15.41,15.17L13.21,17.37C10.38,15.93 8.06,13.62 6.62,10.78L8.82,8.57C9.1,8.31 9.18,7.92 9.07,7.57C8.7,6.45 8.5,5.25 8.5,4A1,1 0 0,0 7.5,3H4M15,3V4.5H18.5L13,10L14,11L19.5,5.5V9H21V3H15Z"/></svg>
        const IconKeyboard = <svg viewBox="2 5 20 14" width={iKeyboardIconWidth} height={iKeyboardIconHeight} preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M19,10H17V8H19M19,13H17V11H19M16,10H14V8H16M16,13H14V11H16M16,17H8V15H16M7,10H5V8H7M7,13H5V11H7M8,11H10V13H8M8,8H10V10H8M11,11H13V13H11M11,8H13V10H11M20,5H4C2.89,5 2,5.89 2,7V17A2,2 0 0,0 4,19H20A2,2 0 0,0 22,17V7C22,5.89 21.1,5 20,5Z"/></svg>

        return (
            <div className="brOCCallPanel" style={{
                borderRadius: callpanelBorderRadius,
                backgroundColor: callpanelBgColor,
                boxShadow: sBoxShadow,
                color: callpanelFgColor
            }}>
                {bHasMissedCall && (<div className={"missedCallRow-callPanel-brekeke_operatorConsole"}>
                    <div className="brOCCallPanelLeft">
                        {IconPhoneIncoming}
                    </div>
                    <div className="brOCCallPanelMain">
                        <div className="brOCCallPanelMissedCall" style={{fontSize:missedCallSize}}>{i18n.t("There_is_a_missed_call")}</div>
                    </div>
                </div>)}
                <div className="brOCCallPanelRow">
                    <div className="brOCCallPanelLeft">
                        {!!currentCallInfo && (currentCallInfo.getIsIncoming() ? IconPhoneIncoming : IconPhoneOutgoing)}
                    </div>
                    <div className="brOCCallPanelMainForRows">
                        {hasPartyName && <div className="brOCCallPanelPartyName" style={{fontSize:callerNameSize}}>{partyName}</div>}
                        <div
                            className={hasPartyName ? "brOCCallPanelPartyNumber_small" : "brOCCallPanelPartyNumber"}
                            style={{fontSize:iCallerNumberSize}}
                        >{currentCallInfo?.getPartyNumber()}</div>
                        <div className="brOCCallPanelDuration" style={{fontSize:callDurationSize}}>{this.state.duration}</div>
                    </div>
                </div>
                <div className="brOCCallPanelRow">
                    {bIsDTMFInput !== true && dialing.length !== 0 && (
                        <div className="brOCCallPanelLeft">{IconKeyboard}</div>
                    )}
                    <div className="brOCCallPanelMain">
                        <div className="brOCCallPanelDialing" style={{fontSize:inputTextSIze}}>{dialing}</div>
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