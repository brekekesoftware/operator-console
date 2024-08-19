import React from 'react';
import i18n from "../../../../i18n";
import LegacyButtonRuntimeSubWidget from "./LegacyButtonRuntimeSubWidget";
import BrekekeOperatorConsole from "../../../../index";
import Util from "../../../../Util";

export default class LegacyButtonRuntimeSubWidget_keypadButton extends LegacyButtonRuntimeSubWidget  {

    constructor( legacyButtonRuntimeWidgetAsParent, legacyButtonRuntimeSubWidgetData  ) {
        super(  legacyButtonRuntimeWidgetAsParent, legacyButtonRuntimeSubWidgetData  );
    }

    _getQuickCallDialingBySymbol( symbol, quickCallWidgetSubData ){
        if( !quickCallWidgetSubData ){
            return null;
        }
        if( symbol === '0' ) return quickCallWidgetSubData.getKeypadZero();
        if( symbol === '1' ) return quickCallWidgetSubData.getKeypadOne();
        if( symbol === '2' ) return quickCallWidgetSubData.getKeypadTwo();
        if( symbol === '3' ) return quickCallWidgetSubData.getKeypadThree();
        if( symbol === '4' ) return quickCallWidgetSubData.getKeypadFour();
        if( symbol === '5' ) return quickCallWidgetSubData.getKeypadFive();
        if( symbol === '6' ) return quickCallWidgetSubData.getKeypadSix();
        if( symbol === '7' ) return quickCallWidgetSubData.getKeypadSeven();
        if( symbol === '8' ) return quickCallWidgetSubData.getKeypadEight();
        if( symbol === '9' ) return quickCallWidgetSubData.getKeypadNine();
        if( symbol === '*' ) return quickCallWidgetSubData.getKeypadAsterisk();
        if( symbol === '#' ) return quickCallWidgetSubData.getKeypadSharp();
        return null;
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

        const oc = BrekekeOperatorConsole.getStaticInstance();
        const subtypeName = this._getLegacyButtonWidgetSubTypeName();
        const symbol = this._LegacyButtonRuntimeSubWidgetData.getSymbol();
        const iconJsx = this._getIconJsx( null, symbol );
        return <button title={i18n.t(`legacy_button_description.${subtypeName}`)} className="kbc-button kbc-button-fill-parent"
                       style={{
                           border:border,
                           borderRadius:borderRadius,
                           color:color,
                           backgroundColor:backgroundColor
                       }}
                       onClick={
                           () => {
                               let sDialing = this._getQuickCallDialingBySymbol( symbol, oc.getCurrentScreenQuickCallWidgetSubDataFromState() );
                               if( sDialing ) {
                                   oc.setDialingAndMakeCall( sDialing );
                               }
                               else if( symbol ){
                                   oc.appendKeypadValue(symbol);
                               }
                           }
                       }
        >{iconJsx}</button>
    }

}