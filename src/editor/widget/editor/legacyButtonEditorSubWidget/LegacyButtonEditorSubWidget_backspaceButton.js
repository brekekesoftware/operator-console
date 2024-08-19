import React from 'react';
import LegacyButtonEditorSubWidget from "./LegacyButtonEditorSubWidget";
import i18n from "../../../../i18n";
import Util from "../../../../Util";

export default class LegacyButtonEditorSubWidget_backspaceButton extends LegacyButtonEditorSubWidget  {

    constructor( legacyButtonEditorWidgetAsParent, legacyButtonEditorSubWidgetData  ) {
        super(  legacyButtonEditorWidgetAsParent, legacyButtonEditorSubWidgetData  );
    }

    //!override
    getRenderJsx() {
        const widgetData = this.getLegacyButtonSubWidgetData().getLegacyButtonWidgetDataAsParent();
        const buttonFgColor = widgetData.getFgColor();
        const buttonBgColor = widgetData.getBgColor();
        const buttonOuterBorderColor = widgetData.getOuterBorderColor();
        const buttonOuterBorderThickness = widgetData.getOuterBorderThickness();
        const buttonOuterBorderRadius = widgetData.getOuterBorderRadius();

        const color = Util.isAntdRgbaProperty( buttonFgColor  ) ? Util.getRgbaCSSStringFromAntdColor( buttonFgColor ) : "";
        const backgroundColor = Util.isAntdRgbaProperty( buttonBgColor ) ? Util.getRgbaCSSStringFromAntdColor( buttonBgColor ) : "";
        const border = Util.isNumeric( buttonOuterBorderThickness ) && Util.isAntdRgbaProperty( buttonOuterBorderColor) ?
            "solid " + buttonOuterBorderThickness + "px " + Util.getRgbaCSSStringFromAntdColor( buttonOuterBorderColor )  : "";
        const borderRadius = Util.isNumber( buttonOuterBorderRadius ) ? buttonOuterBorderRadius + "px" : "";

        const subtypeName = this._getLegacyButtonWidgetSubTypeName();
        const iconJsx = this._getIconJsx();
        return <button title={i18n.t(`legacy_button_description.${subtypeName}`)} className="kbc-button kbc-button-fill-parent"
                       style={{
                           border:border,
                           borderRadius:borderRadius,
                           color:color,
                           backgroundColor:backgroundColor
                       }}
                       disabled={true}
        >{iconJsx}</button>
    }

}