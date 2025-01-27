import React from 'react';
import i18n from "../../../../i18n";
import LegacyButtonRuntimeSubWidget from "./LegacyButtonRuntimeSubWidget";
import BrekekeOperatorConsole from "../../../../index";
import clsx from "clsx";
import Util from "../../../../Util";

export default class LegacyButtonRuntimeSubWidget_lineButton extends LegacyButtonRuntimeSubWidget  {

    constructor( legacyButtonRuntimeWidgetAsParent, legacyButtonRuntimeSubWidgetData  ) {
        super(  legacyButtonRuntimeWidgetAsParent, legacyButtonRuntimeSubWidgetData  );
    }

    _onClickLineButton( line ){
        const oc = BrekekeOperatorConsole.getStaticInstance();
        let onSetValidLineFunc;
        if( oc.getDialing() && oc.getDialing().length !== 0 ){
                onSetValidLineFunc = () =>{
                    oc.makeCall2();
                };
        }
        oc.handleLine(line, onSetValidLineFunc );
    }

    //!override
    getRenderJsx() {
        const subWidgetData = this.getLegacyButtonSubWidgetData();
        //const widgetData = this.getLegacyButtonSubWidgetData().getLegacyButtonWidgetDataAsParent();
        const sButtonFontSize = subWidgetData.getFontSize() ? subWidgetData.getFontSize() + "px" : "1rem";    //!default
        const buttonFgColor = subWidgetData.getFgColor();
        const buttonBgColor = subWidgetData.getBgColor();
        const buttonOuterBorderColor = subWidgetData.getOuterBorderColor();
        const buttonOuterBorderThickness = subWidgetData.getOuterBorderThickness();
        const buttonOuterBorderRadius = subWidgetData.getOuterBorderRadius();

        let color = Util.isAntdRgbaProperty( buttonFgColor  ) ? Util.getRgbaCSSStringFromAntdColor( buttonFgColor ) : "";
        let backgroundColor = Util.isAntdRgbaProperty( buttonBgColor ) ? Util.getRgbaCSSStringFromAntdColor( buttonBgColor ) : "";
        const border = Util.isNumeric( buttonOuterBorderThickness ) && Util.isAntdRgbaProperty( buttonOuterBorderColor) ?
            "solid " + buttonOuterBorderThickness + "px " + Util.getRgbaCSSStringFromAntdColor( buttonOuterBorderColor )  : "";
        const borderRadius = Util.isNumber( buttonOuterBorderRadius ) ? buttonOuterBorderRadius + "px" : "";

        const oc = BrekekeOperatorConsole.getStaticInstance();
        const callInfos = oc.getPhoneClient().getCallInfos();
        const myParksStatus = oc.getMyParksStatus();
        const linesStatus = oc.getLinesStatus();
        const parksStatus = oc.getParksStatus();
        const loginUser = oc.getLoginUser();

        const line = this._LegacyButtonRuntimeSubWidgetData.getLine();

        const { line_talker, room_id, status } = linesStatus[line] || {};
        let light = '';
        if (status === 'on') {
            const callInfo = room_id ? callInfos.getCallInfoWherePbxRoomIdEqual( room_id )  : null;
            const park = parksStatus[line];

            if (line_talker === loginUser?.pbxUsername) {
                light = 'kbc-button-success-flash kbc-line-button-loginUser-success-flash';
            } else if (park) {
                light = myParksStatus[line] ? 'kbc-button-success-flash-slow kbc-line-button-park-success-flash-slow' : 'kbc-line-button-park-danger-flash-slow';
            } else if (callInfo) {
                if (callInfo?.getIsIncoming() && !callInfo?.getIsAnswered() ) {
                    light = 'kbc-button-danger-flash kbc-line-button-callInfo-danger-flash'
                } else {
                    light = 'kbc-button-success kbc-line-button-callInfo-success'
                }
            } else {
                light = 'kbc-button-danger kbc-line-button-danger'
            }
        }

        // if( light && light.length !== 0 ){
        //     //Use default.
        //     color = null;
        //     backgroundColor = null;
        // }

        const subtypeName = this._getLegacyButtonWidgetSubTypeName();
        const iconJsx = this._getIconJsx();
        return <button title={i18n.t(`legacy_button_description.${subtypeName}`)}
                       className={clsx("kbc-button kbc-button-fill-parent", light)}
                       style={{
                           fontSize:sButtonFontSize,
                           border:border,
                           borderRadius:borderRadius,
                           color:color,
                           backgroundColor:backgroundColor
                       }}
                       onClick={() => this._onClickLineButton(line) }
        >{iconJsx}</button>
    }

}