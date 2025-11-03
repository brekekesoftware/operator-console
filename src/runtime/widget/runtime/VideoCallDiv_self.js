import React, {createRef, useRef} from 'react';
import VideoCallDiv from "./VideoCallDiv";
import {VideoCallDivPlayer} from "./VideoCallDivPlayer";
import BrekekeOperatorConsole from "../../../index";
import WebphonePhoneClient from "../../../WebphonePhoneClient";
import i18n from "../../../i18n";

export default class VideoCallDiv_self extends VideoCallDiv{

    constructor(args) {
        super(args);
        //this._VideoRef = createRef();
    }

    // _setVideoSrcObject(ref){
    //     if( !ref.current ){
    //         return;
    //     }
    //     ref.current.srcObject = this._VideoStreamObject;
    // }

    _onClickFrontBackSwitchSvg( ev ){
        const oc = BrekekeOperatorConsole.getStaticInstance();
        const phoneClient = oc.getPhoneClient();
        if( phoneClient.constructor.name !== WebphonePhoneClient.name ) {
            return;
        }
        const webphoneCallInfos = phoneClient.getCallInfos();
        const webphoneCallInfo = webphoneCallInfos.getCurrentCallInfo();
        if( !webphoneCallInfo ){
            return;
        }
        const callObject = webphoneCallInfo.getWebphoneCallObject();
        callObject.toggleSwitchCamera();
        const widget = this._Parent.getVideoCallWindowsRuntimeWidgetAsParent();
        widget.setState({rerender:true});   //!check necessary?
    }

    //!override
    _getRenderMainJsx(){
        const videoStreamObject = this._VideoStreamObject;
        //const videoRef = this._Parent.getVideoCallWindowsRuntimeWidgetAsParent().getOrCreateRefByVideoCallDiv(this);
        //this._setVideoSrcObject(this._VideoRef);
        return (
            <div style={{border: "1px solid #AAAAAA", width: "100%", height: "100%", boxSizing: "border-box"}}>
                <VideoCallDivPlayer stream={videoStreamObject} playsInline={true} autoPlay={true} style={{
                    width: "100%",
                    height: "100%",
                    // objectFit:"cover",
                    objectFit: "contain",
                    overflow: "hidden",
                    backgroundColor: "black"
                }}>
                </VideoCallDivPlayer>
                <div title={i18n.t("Switch_between_front_and_back_camera")}>
                    <svg width={24} height={24} viewBox="0 0 24 24"
                         onClick={(ev) => this._onClickFrontBackSwitchSvg(ev)}
                         style={{position:"relative",left:"2px",top:"-26px",zIndex:1,cursor:"pointer"}}
                    >
                        <path fill="white"
                              d="M20 5H16.83L15 3H9L7.17 5H4C2.9 5 2 5.9 2 7V19C2 20.11 2.9 21 4 21H20C21.11 21 22 20.11 22 19V7C22 5.9 21.11 5 20 5M20 19H4V7H8.05L9.88 5H14.12L16 7H20V19M5 12H7.1C7.65 9.29 10.29 7.55 13 8.1C13.76 8.25 14.43 8.59 15 9L13.56 10.45C13.11 10.17 12.58 10 12 10C10.74 10 9.6 10.8 9.18 12H11L8 15L5 12M16.91 14C16.36 16.71 13.72 18.45 11 17.9C10.25 17.74 9.58 17.41 9 17L10.44 15.55C10.9 15.83 11.43 16 12 16C13.27 16 14.41 15.2 14.83 14H13L16 11L19 14H16.91Z"
                        />
                    </svg>
                </div>
            </div>
        );
    }
}