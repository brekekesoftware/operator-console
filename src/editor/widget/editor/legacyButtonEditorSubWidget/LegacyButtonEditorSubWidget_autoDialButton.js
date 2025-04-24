import React from 'react';
import LegacyButtonEditorSubWidget from "./LegacyButtonEditorSubWidget";
import i18n from "../../../../i18n";
import BrekekeOperatorConsole from "../../../../index";
import clsx from "clsx";
import Util from "../../../../Util";

export default class LegacyButtonEditorSubWidget_autoDialButton extends LegacyButtonEditorSubWidget  {

    constructor( legacyButtonEditorWidgetAsParent, legacyButtonEditorSubWidgetData  ) {
        super(  legacyButtonEditorWidgetAsParent, legacyButtonEditorSubWidgetData  );
    }

    _findWidgetUuidIndex( subWidgetDatas, subWidgetData ){
        const widgetData = subWidgetData.getLegacyButtonWidgetDataAsParent();
        const widgetUuid = widgetData.getWidgetUuid();
        for( let i = 0; i < subWidgetDatas.length; i++ ){   //!optimize
            const currentSubWidgetData = subWidgetDatas[i];
            const currentWidgetData = currentSubWidgetData.getLegacyButtonWidgetDataAsParent();
            const currentWidgetUuid = currentWidgetData.getWidgetUuid();
            if( widgetUuid === currentWidgetUuid  ){
                return i;
            }
        }
        return -1;
    }

    //!override
    getRenderJsx(tooltipOfButtonWidget) {
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
        const subWidgetDatas = oc.getShowAutoDialWidgetSubDatas_ver2();
        const isRedColor =  subWidgetDatas && this._findWidgetUuidIndex( subWidgetDatas, subWidgetData ) !== -1;

        if( isRedColor ){
            //use default
            color = null;
            backgroundColor = null;
        }

        const iconJsx = this._getIconJsx();
        return <button title={tooltipOfButtonWidget}  className={clsx("kbc-button kbc-button-fill-parent", isRedColor && 'kbc-button-danger kbc-autoDial-button-danger')}
                       style={{
                           fontSize:sButtonFontSize,
                           border:border,
                           borderRadius:borderRadius,
                           color:color,
                           backgroundColor:backgroundColor
                       }}
                       disabled={true}
        >{iconJsx}</button>
    }

}