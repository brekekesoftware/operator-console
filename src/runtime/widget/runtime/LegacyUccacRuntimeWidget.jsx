import React from 'react';
import RuntimeWidget from "./RuntimeWidget";
import BrekekeOperatorConsole from "../../../index";
import RuntimeUccacUcClients from "../../RuntimeUccacUcClients";
import RuntimeHiddenUccacUcclient from "../../RuntimeHiddenUccacUcClient";
import i18n from "../../../i18n";
import Util from "../../../Util";
const LEGACY_UCCAC_RUNTIME_WIDGET_ARRAY = new Array();
export default class LegacyUccacRuntimeWidget extends RuntimeWidget{

    constructor( props ) {
        super( props );
        const oc = BrekekeOperatorConsole.getStaticInstance();
        this._UccacWrapper = oc.getUccacWrapper();
        this._runtimeUccacUcClient = undefined;
        LEGACY_UCCAC_RUNTIME_WIDGET_ARRAY.push( this );
    }

    static getLegacyUccacRuntimeWidgetCount(){
        return LEGACY_UCCAC_RUNTIME_WIDGET_ARRAY.length;
    }

    static getLegacyUccacRuntimeWidgetAt( index ){
        return LEGACY_UCCAC_RUNTIME_WIDGET_ARRAY[index];
    }

    //On open layout(DropDownMenu)
    onSetOCNoteByOpenLayoutModalForDropDownMenu( openLayoutModalForDropDownMenuAsCaller ){
        const bEnable = BrekekeOperatorConsole.getStaticInstance().getSystemSettingsData().getUcChatAgentComponentEnabled();
        if( bEnable ) {
            this._runtimeUccacUcClient.initRuntimeUccacUcClientzUccacAc();
        }

    }

    componentDidMount(){
        super.componentDidMount();
        const bEnable = BrekekeOperatorConsole.getStaticInstance().getSystemSettingsData().getUcChatAgentComponentEnabled();
        if( bEnable ) {
            const ucclient = RuntimeUccacUcClients.getRuntimeUccacUcClientsStaticInstance().useRuntimeUccacUcClientWithoutInit(this);
            this._runtimeUccacUcClient = ucclient;
            this.setState({rerender: true}, () => {
                ucclient.onComponentDidMountByLegacyUccacRuntimeWidget(this);
            });
        }
        RuntimeHiddenUccacUcclient.getRuntimeHiddenUccacUcClientStaticInstance().onComponentDidMountByLegacyUccacRuntimeWidget(this);
        //this._refreshUccacAc();
    }

    componentWillUnmount() {
        if( this._runtimeUccacUcClient ) {
            this._runtimeUccacUcClient.unuseRuntimeUccacUcClient();
        }
        //this._destroyUccacAc();
        //this._UccacWrapper.removeOnUccacInitSuccessFunction( this._onUccacInitSuccessFunction );
        //this._UccacWrapper.removeOnUccacBeforeDeinitFunction( this._onUccacBeforeDeinitFunction );
        RuntimeHiddenUccacUcclient.getRuntimeHiddenUccacUcClientStaticInstance().onComponentWillUnmountByLegacyUccacRuntimeWidget(this);

        const index = LEGACY_UCCAC_RUNTIME_WIDGET_ARRAY.findIndex( (itm) => itm === this );
        LEGACY_UCCAC_RUNTIME_WIDGET_ARRAY.splice(index,1);


        super.componentWillUnmount();
    }

    //!overload
    _getRenderMainJsx() {
        const widgetData = this.getWidgetData();

        const fgColor = Util.getRgbaCSSStringFromAntdColor( widgetData.getUccacwidgetFgColor(), "");
        const bgColor = Util.getRgbaCSSStringFromAntdColor( widgetData.getUccacwidgetBgColor(), "rgba(255,255,255,255)");

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

        if( BrekekeOperatorConsole.getStaticInstance().getSystemSettingsData().getUcChatAgentComponentEnabled() !== true ){
            return (<div style={{
                display:"flex",
                flexWrap:"wrap",
                height:"100%",
                borderRadius: borderRadius,
                backgroundColor: bgColor,
                boxShadow: sBoxShadow,
                color: fgColor,
                padding:6
            }}>{i18n.t("ucChatAgentComponentIsDisabled")}</div> );
        }
        else  if( this._runtimeUccacUcClient ) {
            // const widgetData = this.getWidgetData();
            // const renderArg = {
            //     fgColor: widgetData.getUccacwidgetFgColor(),
            //     bgColor: widgetData.getUccacwidgetBgColor(),
            //     borderRadius: widgetData.getBorderRadius(),
            //     outsideShadow_horizontalOffset: widgetData.getOutsideShadow_horizontalOffset(),
            //     outsideShadow_verticalOffset: widgetData.getOutsideShadow_verticalOffset(),
            //     outsideShadow_blur: widgetData.getOutsideShadow_blur(),
            //     outsideShadow_spread: widgetData.getOutsideShadow_spread(),
            //     outsideShadowColor: widgetData.getOutsideShadow_color(),
            //     insideShadow_horizontalOffset: widgetData.getInsideShadow_horizontalOffset(),
            //     insideShadow_verticalOffset: widgetData.getInsideShadow_verticalOffset(),
            //     insideShadow_blur: widgetData.getInsideShadow_blur(),
            //     insideShadow_spread: widgetData.getInsideShadow_spread(),
            //     insideShadowColor: widgetData.getInsideShadow_color()
            // };
            const renderArg = {
                borderRadius: borderRadius,
                backgroundColor: bgColor,
                boxShadow: sBoxShadow,
                color: fgColor
            }
            const jsx = this._runtimeUccacUcClient.getRenderJsx(renderArg );
            return jsx;
        }
        else {
            return (<div style={{
                display:"flex",
                flexWrap:"wrap",
                height:"100%",
                borderRadius: borderRadius,
                backgroundColor: bgColor,
                boxShadow: sBoxShadow,
                color: fgColor,
                padding:6
            }}>{i18n.t("ucChatAgentComponentHasNotBeenInitialized")}</div> );        
		}

    }


}