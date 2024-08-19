import React from 'react';
import EditorWidget from "./EditorWidget";
import i18n from "../../../i18n";
import Util from "../../../Util";

export default class LegacyUccacEditorWidget extends EditorWidget{

    constructor( props ) {
        super( props );
    }

    //!overload
    _getRenderMainJsx() {
        const widgetData = this.getWidgetData();

        const uccacwidgetFgColor = Util.getRgbaCSSStringFromAntdColor( widgetData.getUccacwidgetFgColor(), "");
        const uccacwidgetBgColor = Util.getRgbaCSSStringFromAntdColor( widgetData.getUccacwidgetBgColor(), "rgba(255,255,255,255)");

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


        return (<div style={{
            display:"flex",
            flexWrap:"wrap",
            height:"100%",
            width:"100%",
            borderRadius: borderRadius,
            backgroundColor: uccacwidgetBgColor,
            boxShadow: sBoxShadow,
            color: uccacwidgetFgColor,
            padding:6
        }}>{i18n.t("ucChatAgentComponentIsInEditMode")}</div> );
    }


}