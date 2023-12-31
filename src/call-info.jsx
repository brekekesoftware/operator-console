import React from 'react'
import { IconKeyboard, IconPhoneIncoming, IconPhoneOutgoing } from './icons'
import "./call-info.scss"
import {Colorpicker} from "antd-colorpicker";
import Util from "./Util"

function formatSecondsToHHMMSS (seconds) {
  const second = parseInt(seconds % 60);
  const minute = parseInt(seconds / 60) % 60;
  const hour = parseInt(seconds / (60 * 60));

  return hour.toString().padStart(2, '0') + ":"
    + minute.toString().padStart(2, '0') + ":"
    + second.toString().padStart(2, '0');
}

export default class CallInfo extends React.Component {
  durationTimeout = null;

  constructor(props) {
    super(props);
    this.state = { duration: '' }
    this.durationTimeout = setTimeout(this.updateCallDuration, 1000);
  }

  componentDidUpdate() {
    if (this.props.call?.answered && !this.durationTimeout) {
      this.updateCallDuration();
    }
    if (!this.props.call?.answered && this.state.duration) {
      this.setState({ duration: '' });
    }
  }

  componentWillUnmount() {
    if (this.durationTimeout) {
      clearTimeout(this.durationTimeout);
    }
  }

  render() {
    const call = this.props.call;

    const callinfoFgColor = Util.getRgbaCSSStringFromAntdColor( this.props.callinfoFgColor , "" );
    const callinfoBgColor = Util.getRgbaCSSStringFromAntdColor( this.props.callinfoBgColor, "" );
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

    return (
      <div className="brOCCallInfo" style={{
        borderRadius:borderRadius,
        backgroundColor:callinfoBgColor,
        boxShadow:sBoxShadow,
        color:callinfoFgColor
      }}>
        <div className="brOCCallInfoRow">
          <div className="brOCCallInfoLeft">
            {!!call && (call.incoming ? IconPhoneIncoming : IconPhoneOutgoing)}
          </div>
          <div className="brOCCallInfoMain">
            <div className="brOCCallInfoPartyNumber">{call?.partyNumber}</div>
            <div className="brOCCallInfoDuration">{this.state.duration}</div>
          </div>
        </div>
        <div className="brOCCallInfoRow">
          {!!this.props.dialing && (
            <div className="brOCCallInfoLeft">{IconKeyboard}</div>
          )}
          <div className="brOCCallInfoMain">
            <div className="brOCCallInfoDialing">{this.props.dialing}</div>
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

    const call = this.props.call;
    if (call && call.answered) {
      this.durationTimeout = setTimeout(this.updateCallDuration, 1000);
      this.setState({
        duration: formatSecondsToHHMMSS(call.answeredAt ? (Date.now() - call.answeredAt) / 1000 : 0)
      });
    }
  }
}
