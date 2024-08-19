import React from 'react';
import LegacyButtonEditorSubWidget from "./LegacyButtonEditorSubWidget";
import i18n from "../../../../i18n";
import BrekekeOperatorConsole, {OperatorConsole} from "../../../../index";
import clsx from "clsx";
import Util from "../../../../Util";

export default class LegacyButtonEditorSubWidget_noAnswerButton extends LegacyButtonEditorSubWidget  {

    constructor( legacyButtonEditorWidgetAsParent, legacyButtonEditorSubWidgetData  ) {
        super(  legacyButtonEditorWidgetAsParent, legacyButtonEditorSubWidgetData  );
    }


    ////!override
    // getRenderJsx() {
    //     return <div
    //         style={{
    //             border: "1px solid #000000",
    //             backgroundColor: "#0000FF",
    //             width: "100%",
    //             height: "100%",
    //             boxSizing: "border-box"
    //         }}></div>
    // }

    //!override
    getRenderJsx() {
        const widgetData = this.getLegacyButtonSubWidgetData().getLegacyButtonWidgetDataAsParent();
        const buttonFgColor = widgetData.getFgColor();
        const buttonBgColor = widgetData.getBgColor();
        const buttonOuterBorderColor = widgetData.getOuterBorderColor();
        const buttonOuterBorderThickness = widgetData.getOuterBorderThickness();
        const buttonOuterBorderRadius = widgetData.getOuterBorderRadius();

        let color = Util.isAntdRgbaProperty( buttonFgColor  ) ? Util.getRgbaCSSStringFromAntdColor( buttonFgColor ) : "";
        let backgroundColor = Util.isAntdRgbaProperty( buttonBgColor ) ? Util.getRgbaCSSStringFromAntdColor( buttonBgColor ) : "";
        const border = Util.isNumeric( buttonOuterBorderThickness ) && Util.isAntdRgbaProperty( buttonOuterBorderColor) ?
            "solid " + buttonOuterBorderThickness + "px " + Util.getRgbaCSSStringFromAntdColor( buttonOuterBorderColor )  : "";
        const borderRadius = Util.isNumber( buttonOuterBorderRadius ) ? buttonOuterBorderRadius + "px" : "";

        const oc = BrekekeOperatorConsole.getStaticInstance();
        const subtypeName = this._getLegacyButtonWidgetSubTypeName();
        const iconJsx = this._getIconJsx();
        const isDanger = oc.getAutoRejectIncoming();
        if( isDanger ){
            color = null;
            backgroundColor = null;
        }
        return <button title={i18n.t(`legacy_button_description.${subtypeName}`)} className={clsx("kbc-button kbc-button-fill-parent", isDanger && 'kbc-button-danger')}
                       style={{
                           border:border,
                           borderRadius:borderRadius,
                           color:color,
                           backgroundColor:backgroundColor
                       }}
                       disabled={true}
                       // onClick={oc.toggleAutoRejectIncoming}
        >{iconJsx}</button>

    }

}