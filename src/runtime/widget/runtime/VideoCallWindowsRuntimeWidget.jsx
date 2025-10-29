import React, {createRef} from 'react';
import RuntimeWidget from "./RuntimeWidget";
import BrekekeOperatorConsole, {OperatorConsole} from "../../../index";
import i18n from "../../../i18n";
import Util from "../../../Util";
import WebphonePhoneClient from "../../../WebphonePhoneClient";
import VideoCallDivs from "./VideoCallDivs";
import VideoCallDiv from "./VideoCallDiv";
export default class VideoCallWindowsRuntimeWidget extends RuntimeWidget {

    constructor( props ) {
        super( props );
        this._VideoCallDivs = new VideoCallDivs(this);
        this._LatestVideoStreamObjects = new Array();
        this._latestCallObject = undefined;
        this._MainVideoRef = createRef();
    }

    // _clearObject( o ){
    //     for (const key in o ) {
    //         delete o[key];
    //     }
    // }

    onClickVideoCallDivOther( videoCallDivOtherAsCaller ){
        const vso = videoCallDivOtherAsCaller.getVideoStreamObject();
        if( vso === this._mainVideoClientSession?.videoStreamObject ){
            return;
        }

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
        const vcst = callObject.videoClientSessionTable;
        if( !vcst ){
            return;
        }
        //Find videoClientSession from videoStreamObject
        let foundVcs = null;web
        for( let i = 0; i < vcst.length; i++ ){
            const vcs = vcst[i];
            const videoStreamObject = vcs.remoteStreamObject;
            if( videoStreamObject === vso ){
                foundVcs = vcs;
                break;
            }
        }
        if( foundVcs && this._mainVideoClientSession !== foundVcs  ){
            this._mainVideoClientSession = foundVcs;
            this.setState({rerender:true});
        }
    }

    _setMainVideoSrcObject(){
        if( !this._MainVideoRef.current ){
            return;
        }
        this._MainVideoRef.current.srcObject = this._mainVideoClientSession?.remoteStreamObject;
    }

    //!override
    componentDidMount() {
        super.componentDidMount();

        const args = null;
        this._VideoCallDivs.initVideoCallDivs( args );
        this.setState({rerender:true})  //!bad render twice
    }


    //!override
    componentDidUpdate(){
        super.componentDidUpdate();
        const oc = BrekekeOperatorConsole.getStaticInstance();
        const phoneClient = oc.getPhoneClient();
        if( phoneClient.constructor.name !== WebphonePhoneClient.name ) {
            this._VideoCallDivs.clearVideoCallDivArray();
            return;
        }
        const webphoneCallInfos = phoneClient.getCallInfos();
        const webphoneCallInfo = webphoneCallInfos.getCurrentCallInfo();

        //!bad //!overhead. I want to keep everything contained within the render method.
        if( webphoneCallInfo ){
            let bSame;
            const callObject = webphoneCallInfo.getWebphoneCallObject();
            const vcst = callObject.videoClientSessionTable;
            //check need update
            if( this._latestCallObject !== callObject ) {
                bSame = false;
            }
            else{
                if (this._LatestVideoStreamObjects.length !== vcst.length + 1) {    //1 is self video stream object
                    bSame = false;
                } else {
                    if (callObject.localStreamObject !== this._LatestVideoStreamObjects[0]) {
                        bSame = false;
                    } else {
                        bSame = true;
                        for (let i = 0; i < vcst.length; i++) {
                            const vcs = vcst[i];
                            // if( vcs === this._mainVideoClientSession ){
                            //     continue;
                            // }
                            const videoStreamObject = vcs.remoteStreamObject;
                            const latestOtherVideoStreamObject = this._LatestVideoStreamObjects[i + 1];
                            if (videoStreamObject !== latestOtherVideoStreamObject) {
                                bSame = false;
                                break;
                            }
                        }
                    }
                }
            }

            if( bSame ){
                //No need refresh.
                return;
            }
            this._VideoCallDivs.clearVideoCallDivArray();


            const args = null;
            this._VideoCallDivs.initVideoCallDivs(args);
            this._LatestVideoStreamObjects.length = 0;

            const vcdSelfArgs ={
                videoCallDivType : VideoCallDiv.VIDEO_CALL_DIV_TYPES.self,
                videoStreamObject : callObject.localStreamObject
            }
            const vcdSelf = this._VideoCallDivs.addVideoCallDiv( vcdSelfArgs );
            this._LatestVideoStreamObjects.push( callObject.localStreamObject );

            // //!temp
            // for (let i = 0; i < 2; i++ ){
            //     const vcdOtherArgs = {
            //         videoCallDivType : VideoCallDiv.VIDEO_CALL_DIV_TYPES.other,
            //         videoStreamObject : undefined
            //     };
            //     const vcdOther = this._VideoCallDivs.addVideoCallDiv( vcdOtherArgs );
            //     //this._LatestVideoStreamObjects.push( undefined );
            // }


            if( vcst ) {
                if( (!this._mainVideoClientSession || !this._mainVideoClientSession.videoStreamObject ) && vcst.length !== 0 ){
                    this._mainVideoClientSession = vcst[0];
                }

                for (let i = 0; i < vcst.length; i++ ){
                    const vcs = vcst[i];
                    if( vcs === this._mainVideoClientSession ){
                        this._LatestVideoStreamObjects.push( vcs.remoteStreamObject );
                        continue;
                    }
                    const vcdOtherArgs = {
                        videoCallDivType : VideoCallDiv.VIDEO_CALL_DIV_TYPES.other,
                        videoStreamObject : vcs.remoteStreamObject
                    };
                    const vcdOther = this._VideoCallDivs.addVideoCallDiv( vcdOtherArgs );
                    this._LatestVideoStreamObjects.push( vcs.remoteStreamObject );
                }

            }

            this._latestCallObject = callObject;
            this.setState({rerender:true});
        }

    }

    //!overload
    _getRenderMainJsx() {
        const widgetData = this.getWidgetData();

        const fgColor = Util.getRgbaCSSStringFromAntdColor( widgetData.getFgColor(), "");
        const bgColor = Util.getRgbaCSSStringFromAntdColor( widgetData.getBgColor(), "rgba(255,255,255,255)");

        const borderRadius = ( widgetData.getBorderRadius() || widgetData.getBorderRadius() === 0 ) ? widgetData.getBorderRadius() : "";

        const outsideShadow_horizontalOffset = ( widgetData.getOutsideShadow_horizontalOffset() || widgetData.getOutsideShadow_horizontalOffset() === 0 )  ? widgetData.getOutsideShadow_horizontalOffset() : "";
        const outsideShadow_verticalOffset = ( widgetData.getOutsideShadow_verticalOffset() || widgetData.getOutsideShadow_verticalOffset() === 0 )  ? widgetData.getOutsideShadow_verticalOffset() : "";
        const outsideShadow_blur = ( widgetData.getOutsideShadow_blur() || widgetData.getOutsideShadow_blur() === 0 ) ? widgetData.getOutsideShadow_blur() : "";
        const outsideShadow_spread = ( widgetData.getOutsideShadow_spread() || widgetData.getOutsideShadow_spread() === 0 ) ? widgetData.getOutsideShadow_spread() : "";
        const outsideShadowColorRgb = Util.getRgbaCSSStringFromAntdColor( widgetData.getOutsideShadow_color(), "rgba(0,0,0,0)"); // "rgba(0,0,0,0.2)"  //!default

        const insideShadow_horizontalOffset = ( widgetData.getInsideShadow_horizontalOffset() || widgetData.getInsideShadow_horizontalOffset() === 0 )  ? widgetData.getInsideShadow_horizontalOffset() : "";
        const insideShadow_verticalOffset = ( widgetData.getInsideShadow_verticalOffset() || widgetData.getInsideShadow_verticalOffset() === 0 )  ? widgetData.getInsideShadow_verticalOffset() : "";
        const insideShadow_blur = ( widgetData.getInsideShadow_blur() || widgetData.getInsideShadow_blur() === 0 ) ? widgetData.getInsideShadow_blur() : "";
        const insideShadow_spread = ( widgetData.getInsideShadow_spread() || widgetData.getInsideShadow_spread() === 0 ) ? widgetData.getInsideShadow_spread() : "";
        const insideShadowColorRgb = Util.getRgbaCSSStringFromAntdColor( widgetData.getInsideShadow_color(), "rgba(0,0,0,0)"); // "rgba(48,71,1,1)"  //!default

        const sBoxshadowOutside = outsideShadowColorRgb && outsideShadow_horizontalOffset && outsideShadow_verticalOffset && outsideShadow_blur && outsideShadow_spread ? outsideShadowColorRgb + " " + outsideShadow_horizontalOffset + "px " + outsideShadow_verticalOffset + "px " + outsideShadow_blur + "px " + outsideShadow_spread + "px" : "";
        const sBoxshadowInside = insideShadowColorRgb && insideShadow_horizontalOffset && insideShadow_verticalOffset && insideShadow_blur && insideShadow_spread ? "inset " + insideShadowColorRgb + " " + insideShadow_horizontalOffset + "px " + insideShadow_verticalOffset + "px " + insideShadow_blur + "px " + insideShadow_spread + "px" : "";
        const sBoxShadow = sBoxshadowOutside + (sBoxshadowOutside && sBoxshadowInside ? "," : "") + sBoxshadowInside;

        const oc = BrekekeOperatorConsole.getStaticInstance();
        const phoneClient = oc.getPhoneClient();
        let mainJsx;
        if( phoneClient.constructor.name !== WebphonePhoneClient.name ){
            mainJsx = i18n.t("To_enable_this_widget_select_Webphone_~");
        }
        else{
            const callInfos = phoneClient.getCallInfos();
            const currentCallInfo = callInfos.getCurrentCallInfo();

            const videoCallDivsJsx = this._VideoCallDivs.getRenderJsx();
            this._setMainVideoSrcObject();
            mainJsx = (
                <>
                    <div style={{height: "67%"}}>
                        <video ref={this._MainVideoRef} playsInline={true} autoPlay={true} style={{
                            width: "100%",
                            height: "67%",
                            // objectFit: "cover",
                            objectFit: "contain",
                            overflow: "hidden",
                            position: "absolute"
                        }}></video>
                    </div>
                    {videoCallDivsJsx}
                </>
            );
        }

        return (<div style={{
            //display:"flex",
            //flexWrap:"wrap",
            height: "100%",
            width: "100%",
            borderRadius: borderRadius,
            backgroundColor: bgColor,
            boxShadow: sBoxShadow,
			color: fgColor,
            boxSizing:"border-box"
		}}>
            {mainJsx}
        </div>);
    }


}