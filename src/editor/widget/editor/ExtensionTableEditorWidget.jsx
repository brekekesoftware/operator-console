import React from 'react';
import EditorWidget from "./EditorWidget";
import i18n from "../../../i18n";
import Util from "../../../Util";

const EXTENSION_TABLE_TH_HEIGHT = 25;   //25px
const EXTENSION_TABLE_TD_HEIGHT = 30;   //30px

export default class ExtensionTableEditorWidget extends EditorWidget{

    constructor( props ) {
        super( props );
        this._Extensions  = Object.freeze([
            {"id" : "12345678",
                "name" : i18n.t("DummyExtensionName") + "(1)"},
            {"id" : "87654321",
                "name" : i18n.t("DummyExtensionName") + "(2)"},
        ]);
        this._ExtensionsStatus = Object.freeze({
            "12345678": "calling",
            "87654321":"ringing"
        });
    }

    //!overload
    _getRenderMainJsx() {
        const widgetData = this.getWidgetData();
        //const tableHeight = widgetData.getWidgetHeight();
        //const rowCount = Math.ceil( ( tableHeight - EXTENSION_TABLE_TH_HEIGHT ) / EXTENSION_TABLE_TD_HEIGHT  );
        //const extensions =  new Array( rowCount );
        // for( let i = 0; i < extensions.length; i++ ){
        //     extensions[i] = {name:"\u00A0"};
        // }
        //const extensionsStatus = {};

        //const rowCount = EXTENSIONS.length;
        const extensions =  this._Extensions;
        const extensionsStatus = this._ExtensionsStatus;

        const outerBorderRadius = ( widgetData.getExtensiontableOuterBorderRadius() || widgetData.getExtensiontableOuterBorderRadius() === 0 ) ? widgetData.getExtensiontableOuterBorderRadius() : 0; //!default
        const outerBorderThickness = ( widgetData.getExtensiontableOuterBorderThickness() || widgetData.getExtensiontableOuterBorderThickness() === 0 ) ? widgetData.getExtensiontableOuterBorderThickness()  : 0; //!default
        const outerBorderColor = Util.getRgbaCSSStringFromAntdColor(  widgetData.getExtensiontableOuterBorderColor(), "rgb(0,0,0,0)" );
        const headerFgColor = Util.getRgbaCSSStringFromAntdColor(  widgetData.getExtensiontableHeaderFgColor() , "" );
        const headerBgColor = Util.getRgbaCSSStringFromAntdColor(  widgetData.getExtensiontableHeaderBgColor() , "" );
        const bodyFgColor = Util.getRgbaCSSStringFromAntdColor(  widgetData.getExtensiontableBodyFgColor() , "" );
        //const bodyActiveRowBgColor = Util.getRgbaCSSStringFromAntdColor( props.extensiontableBodyActiveRowBgColor, "'#B9DFA9'" );   //!default
        const backgroundColor = Util.getRgbaCSSStringFromAntdColor( widgetData.getExtensiontableBgColor(), "" );
        const headerRowUnderlineThickness = ( widgetData.getExtensiontableHeaderRowUnderlineThickness() || widgetData.getExtensiontableHeaderRowUnderlineThickness() === 0 ) ? widgetData.getExtensiontableHeaderRowUnderlineThickness() : 0; //!default
        const headerRowUnderlineColor = Util.getRgbaCSSStringFromAntdColor( widgetData.getExtensiontableHeaderRowUnderlineColor() , "#e0e0e0" );   //!default
        const bodyRowUnderlineThickness = ( widgetData.getExtensiontableBodyRowUnderlineThickness() || widgetData.getExtensiontableBodyRowUnderlineThickness() === 0 ) ? widgetData.getExtensiontableBodyRowUnderlineThickness() : 0; //!default
        const bodyRowUnderlineColor = Util.getRgbaCSSStringFromAntdColor( widgetData.getExtensiontableBodyRowUnderlineColor() , "#e0e0e0" );   //!default
        const headerFontSize = widgetData.getExtensiontableHeaderFontSize() ? widgetData.getExtensiontableHeaderFontSize() :  14;
        const bodyFontSize = widgetData.getExtensiontableBodyFontSize() ? widgetData.getExtensiontableBodyFontSize() :  14;

        let key = 0;
        return (
            <div className="brOCExtensiontableWrapper" style={{
                borderRadius:outerBorderRadius,
                backgroundColor:backgroundColor,
                borderStyle : "solid",
                borderColor : outerBorderColor,
                borderWidth: outerBorderThickness +  "px"
            }}>
            <table className="brOCExtensiontable">
                <thead>
                <tr style={{
                    color:headerFgColor,
                    backgroundColor:headerBgColor
                }}>
                    <th style={{
                        fontSize : headerFontSize + "px",
                        textTransform:"uppercase",
                        //height:EXTENSION_TABLE_TH_HEIGHT,
                        borderBottomStyle : "solid",
                        borderBottomColor : headerRowUnderlineColor,
                        borderBottomWidth: headerRowUnderlineThickness +  "px"
                    }}>{i18n.t("ExtensionNumber")}</th>
                    <th style={{
                        fontSize : headerFontSize + "px",
                        textTransform:"uppercase",
                        //height:EXTENSION_TABLE_TH_HEIGHT,
                        borderBottomStyle : "solid",
                        borderBottomColor : headerRowUnderlineColor,
                        borderBottomWidth: headerRowUnderlineThickness +  "px"
                    }}>{i18n.t("name")}</th>
                    <th style={{
                        fontSize : headerFontSize + "px",
                        textTransform:"uppercase",
                        //height:EXTENSION_TABLE_TH_HEIGHT,
                        borderBottomStyle : "solid",
                        borderBottomColor : headerRowUnderlineColor,
                        borderBottomWidth: headerRowUnderlineThickness +  "px"
                    }}>{i18n.t("status")}</th>
                </tr>
                </thead>
                <tbody style={{
                    color:bodyFgColor,
                    display:"table-row-group"
                }}>
                {extensions.map((ext) => (
                    <tr key={key++}
                        style={{
                            color: bodyFgColor
                        }}
                    >
                        <td style={{
                            fontSize : bodyFontSize + "px",
                            //height:EXTENSION_TABLE_TD_HEIGHT,
                            borderBottomStyle : "solid",
                            borderBottomColor : bodyRowUnderlineColor,
                            borderBottomWidth: bodyRowUnderlineThickness +  "px"
                        }}>{ext?.id}</td>
                        <td style={{
                            fontSize : bodyFontSize + "px",
                            //height:EXTENSION_TABLE_TD_HEIGHT
                            borderBottomStyle : "solid",
                            borderBottomColor : bodyRowUnderlineColor,
                            borderBottomWidth: bodyRowUnderlineThickness +  "px"
                        }}>{ext?.name}</td>
                        <td style={{
                            fontSize : bodyFontSize + "px",
                            //height:EXTENSION_TABLE_TD_HEIGHT,
                            borderBottomStyle : "solid",
                            borderBottomColor : bodyRowUnderlineColor,
                            borderBottomWidth: bodyRowUnderlineThickness +  "px"
                        }}>{extensionsStatus[ext.id]}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            </div>
        );
    }


}