import React from 'react';
import i18n from "../../../../i18n";
import LegacyButtonRuntimeSubWidget from "./LegacyButtonRuntimeSubWidget";
import BrekekeOperatorConsole from "../../../../index";
import clsx from "clsx";
import Util from "../../../../Util";

export default class LegacyButtonRuntimeSubWidget_prevCallButton extends LegacyButtonRuntimeSubWidget  {

    constructor( legacyButtonRuntimeWidgetAsParent, legacyButtonRuntimeSubWidgetData  ) {
        super(  legacyButtonRuntimeWidgetAsParent, legacyButtonRuntimeSubWidgetData  );
    }

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
        const callInfos = oc.getPhoneClient().getCallInfos();
        const currentCallIndex = callInfos.getCurrentCallIndex();
        const callInfoCount = callInfos.getCallInfoCount();

        const subtypeName = this._getLegacyButtonWidgetSubTypeName();
        const iconJsx = this._getIconJsx();
        return <button title={i18n.t(`legacy_button_description.${subtypeName}`)}  className={clsx("kbc-button kbc-button-fill-parent", currentCallIndex > 0 && "kbc-button-danger-flash")}
                       style={{
                           border:border,
                           borderRadius:borderRadius,
                           color:color,
                           backgroundColor:backgroundColor
                       }}
                       onClick={(!callInfoCount || currentCallIndex === 0) ? undefined : oc.switchCallUp}
        >{iconJsx}</button>
    }

}