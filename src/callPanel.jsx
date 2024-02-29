import React from 'react'
import { IconKeyboard, IconPhoneIncoming, IconPhoneOutgoing } from './icons'
import "./callPanel.scss"
import {Colorpicker} from "antd-colorpicker";
import Util from "./Util"
import {OperatorConsole} from "./index";
import BrekekeOperatorConsole from "./index";

function formatSecondsToHHMMSS (seconds) {
  const second = parseInt(seconds % 60);
  const minute = parseInt(seconds / 60) % 60;
  const hour = parseInt(seconds / (60 * 60));

  return hour.toString().padStart(2, '0') + ":"
    + minute.toString().padStart(2, '0') + ":"
    + second.toString().padStart(2, '0');
}

export default class CallPanel extends React.Component {
  durationTimeout = null;

  constructor(props) {
    super(props);
    this.state = { duration: '' }
    this.durationTimeout = setTimeout(this.updateCallDuration, 1000);
  }

  componentDidUpdate() {
    if (this.props.currentCallInfo?.getIsAnswered() && !this.durationTimeout) {
      this.updateCallDuration();
    }
    if (!this.props.currentCallInfo?.getIsAnswered() && this.state.duration) {
      this.setState({ duration: '' });
    }
  }

  componentWillUnmount() {
    if (this.durationTimeout) {
      clearTimeout(this.durationTimeout);
    }
  }

  render() {
    const operatorConsoleAsParent = this.props.operatorConsoleAsParent;
    //const call = this.props.call;
    const currentCallInfo = operatorConsoleAsParent.getPhoneClient().getCallInfos().getCurrentCallInfo();

    const callpanelFgColor = Util.getRgbaCSSStringFromAntdColor( this.props.callpanelFgColor , "" );
    const callpanelBgColor = Util.getRgbaCSSStringFromAntdColor( this.props.callpanelBgColor, "" );
    const borderRadius = this.props.borderRadius ? this.props.borderRadius : "";
    const outsideShadow_horizontalOffset =  this.props.outsideShadow_horizontalOffset ? this.props.outsideShadow_horizontalOffset : "";
    const outsideShadow_verticalOffset = this.props.outsideShadow_verticalOffset ? this.props.outsideShadow_verticalOffset : "";
    const outsideShadow_blur = this.props.outsideShadow_blur ? this.props.outsideShadow_blur : "";
    const outsideShadow_spread = this.props.outsideShadow_spread ? this.props.outsideShadow_spread : "";
    const outsideShadowColorRgb =  Util.getRgbaCSSStringFromAntdColor( this.props.outsideShadow_color , "rgba(0,0,0,0)" ); // "rgba(0,0,0,0.2)"  //!default

    const insideShadow_horizontalOffset =  this.props.insideShadow_horizontalOffset ? this.props.insideShadow_horizontalOffset : "";
    const insideShadow_verticalOffset = this.props.insideShadow_verticalOffset ? this.props.insideShadow_verticalOffset : "";
    const insideShadow_blur = this.props.insideShadow_blur ? this.props.insideShadow_blur : "";
    const insideShadow_spread = this.props.insideShadow_spread ? this.props.insideShadow_spread : "";
    const insideShadowColorRgb =  Util.getRgbaCSSStringFromAntdColor( this.props.insideShadow_color , "rgba(0,0,0,0)" ); //"rgba(48,71,1,1)" //!default

    const sBoxshadowOutside = outsideShadowColorRgb && outsideShadow_horizontalOffset && outsideShadow_verticalOffset && outsideShadow_blur && outsideShadow_spread ? outsideShadowColorRgb + " " + outsideShadow_horizontalOffset + "px " + outsideShadow_verticalOffset + "px " + outsideShadow_blur + "px " + outsideShadow_spread + "px" : "";
    const sBoxshadowInside = insideShadowColorRgb &&  insideShadow_horizontalOffset && insideShadow_verticalOffset && insideShadow_blur && insideShadow_spread ? "inset "+ insideShadowColorRgb + " " + insideShadow_horizontalOffset + "px " + insideShadow_verticalOffset + "px " + insideShadow_blur + "px " + insideShadow_spread + "px" : "";
    const sBoxShadow = sBoxshadowOutside + ( sBoxshadowOutside && sBoxshadowInside ? "," : "" ) + sBoxshadowInside;

    function onPaste(e) {
      e.preventDefault();
      const paste = (e.clipboardData || window.clipboardData).getData("text");
      const oc = BrekekeOperatorConsole.getStaticInstance();
      oc.setDialing( paste );
    }

    return (
      <div className="brOCCallPanel" style={{
        borderRadius:borderRadius,
        backgroundColor:callpanelBgColor,
        boxShadow:sBoxShadow,
        color:callpanelFgColor
      }} onPaste={onPaste}>
        <div className="brOCCallPanelRow">
          <div className="brOCCallPanelLeft">
            {!!currentCallInfo && (currentCallInfo.getIsIncoming() ? IconPhoneIncoming : IconPhoneOutgoing)}
          </div>
          <div className="brOCCallPanelMain">
            <div className="brOCCallPanelPartyNumber">{currentCallInfo?.getPartyNumber()}</div>
            <div className="brOCCallPanelDuration">{this.state.duration}</div>
          </div>
        </div>
        <div className="brOCCallPanelRow">
          {!!this.props.dialing && (
            <div className="brOCCallPanelLeft">{IconKeyboard}</div>
          )}
          <div className="brOCCallPanelMain">
            <div className="brOCCallPanelDialing">{this.props.dialing}</div>
          </div>
        </div>
      </div>
    )
  }

  updateCallDuration = () => {
    if (this.durationTimeout) {
      clearTimeout(this.durationTimeout);
      this.durationTimeout = null;
    }

    const currentCallInfo = this.props.currentCallInfo;
    if (currentCallInfo && currentCallInfo.getIsAnswered()) {
      this.durationTimeout = setTimeout(this.updateCallDuration, 1000);
      this.setState({
        duration: formatSecondsToHHMMSS(currentCallInfo.getAnsweredAt() ? (Date.now() - currentCallInfo.getAnsweredAt()) / 1000 : 0)
      });
    }
  }
}
