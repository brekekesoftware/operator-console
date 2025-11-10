import VideoCallDiv from "./VideoCallDiv";
import VideoCallDiv_other from "./VideoCallDiv_other";
import VideoCallDiv_self from "./VideoCallDiv_self";
import {createRef} from "react";
import React from 'react';

export default class VideoCallDivs {

    constructor(  videoCallWindowsRuntimeWidgetAsParent) {
        this._Parent = videoCallWindowsRuntimeWidgetAsParent;
        this._VideoCallDivArray = new Array();
        this._Ref = createRef();
    }

    getVideoCallWindowsRuntimeWidgetAsParent(){
        return this._Parent;
    }

    initVideoCallDivs( args = null ){
        const bRender = !!this._Ref.current;    //!bad
        if( !bRender ){
            return false;
        }

        this._latestScaleRatio = 1.0;

        //let rootElement;
        let divItemAspectRatio;
        if( args ){
            //rootElement = args["rootElement"];
            divItemAspectRatio = args["divAspectRatio"];
        }
        // if( !rootElement ){
        //     rootElement = document.body;
        // }
        if( !Number.isInteger( divItemAspectRatio ) ){
            divItemAspectRatio = 1.777777777777778;
        }
        //this._RootElement = rootElement;
        this._DivItemAspectRatio = divItemAspectRatio;

        //this._resetDivsPositionAndScale();
        const cmpStyle = getComputedStyle( this._Ref.current );
        //const rootWidth = parseFloat( cmpStyle.width );
        const rootHeight = parseFloat( cmpStyle.height );
        this._rootHeight = rootHeight;
        return true;
    }

    getDivItemAspectRatio(){
        return this._DivItemAspectRatio;
    }

    clearVideoCallDivArray(){
        const bRender = !!this._Ref.current;    //!bad
        if( !bRender ){
            return false;
        }

        if( this._VideoCallDivArray.length === 0 ){
            return false;
        }
        this._VideoCallDivArray.length = 0;
        this._resetDivsPositionAndScale();
        return true;
    }

    getRootElementHeight(){
        return this._rootHeight;
    }

    _resetDivsPositionAndScale(){
        const divCount = this._VideoCallDivArray.length;


        const cmpStyle = getComputedStyle(this._Ref.current);
        const rootWidth = parseFloat( cmpStyle.width );
        const rootHeight = parseFloat( cmpStyle.height );
        this._rootHeight = rootHeight;

        //Sum the original sizes
        let totalWidth = 0.0;
        let totalHeight = 0.0;
        let currentHorizontalWidth = 0.0;
        let currentHorizontalHeight = 0.0;
        let heightCount = divCount > 0 ? 1 : 0;

        for( let i = 0; i < divCount; i++ ){
            const currentDiv = this._VideoCallDivArray[i];
            //const width = currentDiv.getDivWidth() + 8;	//8 is gap
            //const height = currentDiv.getDivHeight() + 8;	//8 is gap
            const width = currentDiv.getDivWidth();
            const height = currentDiv.getDivHeight();

            totalWidth += width;
            currentHorizontalWidth += width;

            const bWrap = currentHorizontalWidth > rootWidth;
            if( bWrap === true ){
                heightCount++;
                currentHorizontalWidth = width;
                totalHeight += currentHorizontalHeight + height;
                currentHorizontalHeight = height;
            }
            else{
                if( height > currentHorizontalHeight ){
                    currentHorizontalHeight = height;
                }
            }



        }

        if( totalHeight === 0.0 && divCount !== 0 ){
            totalHeight = currentHorizontalHeight;
        }

        //Shrink to fit the parent element's size
        //const widthRatio = rootWidth / totalWidth;
        let heightRatio = (rootHeight / totalHeight);
        if( heightRatio >= 1.0 ){
            heightRatio = this._latestScaleRatio;
        }
        else{
            heightRatio *= this._latestScaleRatio;
        }
        const scaleRatio = heightRatio;

        //let scaleRatio;
        //if( widthRatio < heightRatio ){
        //scaleRatio = widthRatio;
        //}
        //else{
        //scaleRatio = heightRatio;
        //}

        //Scaling videos
        for( let i = 0; i < divCount; i++  ){
            const currentDiv = this._VideoCallDivArray[i];
            const width = currentDiv.getOriginalWidth();
            const newWidth = width * scaleRatio;
            currentDiv.setDivWidth( Math.floor( newWidth ) );

            const height = currentDiv.getOriginalHeight();
            const newHeight = height * scaleRatio;
            currentDiv.setDivHeight( Math.floor( newHeight ) );
        }
        this._latestScaleRatio = scaleRatio;


    }

    //!mayBug
    //It may cause bugs. semiDeep  copy
   static  _copyArgs( args ){
        const args2 = {};
        for (const [key, value] of Object.entries(args)) {
            args2[ key ] = value;
        }
        return args2;
    }

    addVideoCallDiv( args ){
        const resetDivsPositionAndScale = args["resetDivsPositionAndScale"];
        //const args2 = structuredClone(args);  //error
        //const args2 = [...args];
        const args2 = VideoCallDivs._copyArgs(args);
        args2["videoCallDivsAsParent"] = this;
        args2["scaleRatio"] = this._latestScaleRatio;
        const videoCallDivType = args["videoCallDivType"];
        let videoCallDiv;
        switch( videoCallDivType ){
            case VideoCallDiv.VIDEO_CALL_DIV_TYPES.self:
                videoCallDiv = new VideoCallDiv_self( args2 );
                break;
            case VideoCallDiv.VIDEO_CALL_DIV_TYPES.other:
                videoCallDiv = new VideoCallDiv_other( args2 );
                break;
            default:
                throw new Error("VideoCallDivType does not exist. " + videoCallDivType );
                break;
        }
        //this._VideoCallDivArray.splice( 0, 0, window );
        this._VideoCallDivArray.push(videoCallDiv);

        if( resetDivsPositionAndScale !== false ) {
            this._resetDivsPositionAndScale();
        }

        return videoCallDiv;
    }

    getVideoCallDivCount(){
        const count = this._VideoCallDivArray.length;
        return count;
    }

    getVideoCallDivAt( index ){
        const vcd = this._VideoCallDivArray[index];
        return vcd;
    }

    getRenderJsx(){
        return (
            <div ref={this._Ref}
                style={{
                        height: "33%",
                        width:"100%",
                        //backgroundColor:"#000000",
                        display: "flex",
                        flexWrap: "wrap",
                        alignItems: "flex-start",
                        alignContent: "flex-start",
                        justifyContent: "flex-start",
                        position:"relative",
                        zIndex:1
                        //gap:"4px 4px"
                    }}
            >
                {this._VideoCallDivArray.map( (vcd, i ) =>{
                    return vcd.getRenderJsx(i);
                })}
            </div>

        );
    }
}