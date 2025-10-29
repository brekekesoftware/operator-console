import React, {createRef} from 'react';
import VideoCallDiv from "./VideoCallDiv";
import {VideoCallDivPlayer} from "./VideoCallDivPlayer";

export default class VideoCallDiv_other extends VideoCallDiv{

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

    getVideoStreamObject(){
        return this._VideoStreamObject;
    }

    _onClickVideoCallDivOther( ev ){
        const widget = this._Parent.getVideoCallWindowsRuntimeWidgetAsParent();
        widget.onClickVideoCallDivOther(this);
    }

    //!override
    _getRenderMainJsx(){
        const videoStreamObject = this._VideoStreamObject;
        //this._setVideoSrcObject(this._VideoRef);
        return (
            <div className="videoCallDiv_other" onClick={ (ev) => this._onClickVideoCallDivOther(ev)}>
                <VideoCallDivPlayer stream={videoStreamObject} playsInline={true} autoPlay={true} style={{
                    width: "100%",
                    height: "100%",
                    // objectFit: "cover",
                    objectFit: "contain",
                    overflow: "hidden",
                    backgroundColor: "black"
                }}></VideoCallDivPlayer>
            </div>
        );
    }
}