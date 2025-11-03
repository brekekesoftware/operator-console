import React from 'react';

const _VIDEO_CALL_DIV_TYPES = Object.freeze({
    self : 0,
    other: 1
});
//!abstract
export default class VideoCallDiv{

    constructor( args ) {

        this._Parent = args["videoCallDivsAsParent"];
        this._VideoStreamObject = args["videoStreamObject"];
        //const eRoot = document.createElement("DIV");
        //this._Parent.getVideoCallDivsRootElement().appendChild( eRoot );
        //this._RootElement = eRoot;

        this._OriginalHeight = this._Parent.getRootElementHeight();
        const aspectRatio = this._Parent.getDivItemAspectRatio();
        this._OriginalWidth = this._OriginalHeight * aspectRatio;

        const scaleRatio = args["scaleRatio"];

        this._currentWidth = this._OriginalWidth * scaleRatio;
        this._currentHeight = this._OriginalHeight * scaleRatio;

    }

    getOriginalWidth(){
        return this._OriginalWidth;
    }

    getOriginalHeight() {
        return this._OriginalHeight;
    }

    getDivWidth(){
        return this._currentWidth;
    }

    getDivHeight(){
        return this._currentHeight;
    }

    setDivWidth( f ){
        this._currentWidth = f;
    }

    setDivHeight( f ){
        this._currentHeight = f;
    }

    getRenderJsx(jsxKey){
        const mainJsx = this._getRenderMainJsx();
        return (
            <div key={jsxKey} style={{width:this._currentWidth,height:this._currentHeight}}>
                {mainJsx}
            </div>
        )
    }

    //!abstract
    _getRenderMainJsx(){
        throw new Error("Not implemented");
    }

    static get VIDEO_CALL_DIV_TYPES(){
        return _VIDEO_CALL_DIV_TYPES;
    }

}