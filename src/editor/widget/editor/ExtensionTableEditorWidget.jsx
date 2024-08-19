import React from 'react';
import EditorWidget from "./EditorWidget";
import i18n from "../../../i18n";
import Util from "../../../Util";

const EXTENSION_TABLE_TH_HEIGHT = 25;   //25px
const EXTENSION_TABLE_TD_HEIGHT = 30;   //30px

export default class ExtensionTableEditorWidget extends EditorWidget{

    constructor( props ) {
        super( props );
    }

    //!overload
    _getRenderMainJsx() {
        const widgetData = this.getWidgetData();
        const tableHeight = widgetData.getWidgetHeight();
        const rowCount = Math.ceil( ( tableHeight - EXTENSION_TABLE_TH_HEIGHT ) / EXTENSION_TABLE_TD_HEIGHT  );
        const extensions =  new Array( rowCount );
        for( let i = 0; i < extensions.length; i++ ){
            extensions[i] = {name:"\u00A0"};
        }
        const extensionsStatus = {};

        const outerBorderRadius = ( widgetData.getExtensiontableOuterBorderRadius() || widgetData.getExtensiontableOuterBorderRadius() === 0 ) ? widgetData.getExtensiontableOuterBorderRadius() : 0; //!default
        const outerBorderThickness = ( widgetData.getExtensiontableOuterBorderThickness() || widgetData.getExtensiontableOuterBorderThickness() === 0 ) ? widgetData.getExtensiontableOuterBorderThickness()  : 0; //!default
        const outerBorderColor = Util.getRgbaCSSStringFromAntdColor(  widgetData.getExtensiontableOuterBorderColor(), "rgb(0,0,0,0)" );
        const headerFgColor = Util.getRgbaCSSStringFromAntdColor(  widgetData.getExtensiontableHeaderFgColor() , "" );
        const bodyFgColor = Util.getRgbaCSSStringFromAntdColor(  widgetData.getExtensiontableBodyFgColor() , "" );
        //const bodyActiveRowBgColor = Util.getRgbaCSSStringFromAntdColor( props.extensiontableBodyActiveRowBgColor, "'#B9DFA9'" );   //!default
        const backgroundColor = Util.getRgbaCSSStringFromAntdColor( widgetData.getExtensiontableBgColor(), "" );
        const headerRowUnderlineThickness = ( widgetData.getExtensiontableHeaderRowUnderlineThickness() || widgetData.getExtensiontableHeaderRowUnderlineThickness() === 0 ) ? widgetData.getExtensiontableHeaderRowUnderlineThickness() : 1; //!default
        const headerRowUnderlineColor = Util.getRgbaCSSStringFromAntdColor( widgetData.getExtensiontableHeaderRowUnderlineColor() , "'#e0e0e0'" );   //!default
        const bodyRowUnderlineThickness = ( widgetData.getExtensiontableBodyRowUnderlineThickness() || widgetData.getExtensiontableBodyRowUnderlineThickness() === 0 ) ? widgetData.getExtensiontableBodyRowUnderlineThickness() : 1; //!default
        const bodyRowUnderlineColor = Util.getRgbaCSSStringFromAntdColor( widgetData.getExtensiontableBodyRowUnderlineColor() , "'#e0e0e0'" );   //!default

        let key = 0;
        return (
            <table className="brOCExtensiontable" style={{
                borderRadius:outerBorderRadius,
                border: outerBorderThickness + "px solid " + outerBorderColor,
                backgroundColor:backgroundColor,
            }}>
                <thead>
                <tr style={{
                    color:headerFgColor,
                    borderBottom: headerRowUnderlineThickness +  "px solid " + headerRowUnderlineColor
                }}>
                    <th style={{
                        textTransform:"uppercase",
                        height:EXTENSION_TABLE_TH_HEIGHT,
                        borderRadius:outerBorderRadius +  "px 0 0 0",
                    }}>{i18n.t("id")}</th>
                    <th style={{
                        textTransform:"uppercase",
                        height:EXTENSION_TABLE_TH_HEIGHT,
                    }}>{i18n.t("name")}</th>
                    <th style={{
                        textTransform:"uppercase",
                        height:EXTENSION_TABLE_TH_HEIGHT,
                        borderRadius:"0 " + outerBorderRadius + "px 0 0",
                    }}>{i18n.t("status")}</th>
                </tr>
                </thead>
                <tbody style={{
                    color:bodyFgColor,
                }}>
                {extensions.map((ext) => (
                    <tr key={key++}
                        style={{
                            color: bodyFgColor,
                            borderBottom: bodyRowUnderlineThickness +  "px solid " + bodyRowUnderlineColor
                        }}
                    >
                        <td style={{
                            height:EXTENSION_TABLE_TD_HEIGHT,
                            borderRadius:"0 " + outerBorderRadius +  "px 0 0",
                        }}>{ext?.id}</td>
                        <td style={{
                            height:EXTENSION_TABLE_TD_HEIGHT
                        }}>{ext?.name}</td>
                        <td style={{
                            height:EXTENSION_TABLE_TD_HEIGHT,
                            borderRadius:"0 " + outerBorderRadius + "px 0 0 ",
                        }}>{Object.values(extensionsStatus?.[ext?.id]?.callStatus || {}).join(',')}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        );
    }


}