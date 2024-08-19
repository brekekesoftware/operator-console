import React from 'react';
import EditorWidget from "./EditorWidget";
import BrekekeOperatorConsole from "../../../index";
import i18n from "../../../i18n";
import Util from "../../../Util";

const CALL_TABLE_TH_HEIGHT = 50;
const CALL_TABLE_TD_HEIGHT = 45;

export default class CallTableEditorWidget extends EditorWidget{

    constructor( props ) {
        super( props );
    }

    //!overload
    _getRenderMainJsx() {
        const widgetData = this.getWidgetData();
        const tableHeight = widgetData.getWidgetHeight();
        const rowCount = Math.ceil( ( tableHeight - CALL_TABLE_TH_HEIGHT ) / CALL_TABLE_TD_HEIGHT  );
        const callInfoArray = new Array(rowCount);
        for( let i = 0; i < rowCount; i++ ){
            callInfoArray[i] = null;
        }
        const currentCallIndex = -1;

        let idKey = 0;

        const CallTableColumns = [  //!overhead
            {key: 'getPartyNumber', title: i18n.t('PartyNumber'),      formatter: (v) => (v + '')},
            {key: 'getPartyName',   title: i18n.t('PartyName'),        formatter: (v) => (v + '')},
            {key: 'getIsIncoming',    title:  i18n.t('Incoming'),    formatter: (v) => (v ? '✓' : '')},
            {key: 'getIsAnswered',    title: i18n.t('Answered'),    formatter: (v) => (v ? '✓' : '')},
            {key: 'getIsHolding',     title: i18n.t('Holding'),     formatter: (v) => (v ? '✓' : '')},
            {key: 'getIsRecording',   title:  i18n.t('Recording'),   formatter: (v) => (v ? '✓' : '')},
            {key: 'getIsMuted',       title:  i18n.t('Muted'),       formatter: (v) => (v ? '✓' : '')},
            {key: 'getAnsweredAt',  title:  i18n.t("AnsweredAt") , formatter: (v) => (v ? new Date(v).toLocaleTimeString() : '')},
        ]

        const callTableThFontSize = 10;
        const callTableTdFontSize = 12;
        const activeButtonFontSize = 9;

        const outerBorderRadius = ( widgetData.getCalltableOuterBorderRadius() || widgetData.getCalltableOuterBorderRadius() === 0 ) ? widgetData.getCalltableOuterBorderRadius() : 0; //!default
        const outerBorderThickness = ( widgetData.getCalltableOuterBorderThickness() || widgetData.getCalltableOuterBorderThickness() === 0 ) ? widgetData.getCalltableOuterBorderThickness() : 0; //!default
        const outerBorderColor = Util.getRgbaCSSStringFromAntdColor(  widgetData.getCalltableOuterBorderColor(), "rgba(0,0,0,0)" );
        const headerFgColor = Util.getRgbaCSSStringFromAntdColor(  widgetData.getCalltableHeaderFgColor() , "" );
        const bodyFgColor = Util.getRgbaCSSStringFromAntdColor(  widgetData.getCalltableBodyFgColor() , "" );
        const bodyActiveRowBgColor = Util.getRgbaCSSStringFromAntdColor( widgetData.getCalltableBodyActiveRowBgColor(), "#B9DFA9" );   //!default
        const backgroundColor = Util.getRgbaCSSStringFromAntdColor( widgetData.getCalltableBgColor(), "" );
        const headerRowUnderlineThickness = ( widgetData.getCalltableHeaderRowUnderlineThickness() || widgetData.getCalltableHeaderRowUnderlineThickness() === 0 ) ? widgetData.getCalltableHeaderRowUnderlineThickness() : 1; //!default
        const headerRowUnderlineColor = Util.getRgbaCSSStringFromAntdColor( widgetData.getCalltableHeaderRowUnderlineColor() , "#e0e0e0" );   //!default
        const bodyRowUnderlineThickness = ( widgetData.getCalltableBodyRowUnderlineThickness() || widgetData.getCalltableBodyRowUnderlineThickness() === 0 ) ? widgetData.getCalltableBodyRowUnderlineThickness() : 1; //!default
        const bodyRowUnderlineColor = Util.getRgbaCSSStringFromAntdColor( widgetData.getCalltableBodyRowUnderlineColor(), "#e0e0e0" );   //!default

        const callTableTheadRowHeight = 44;
        const callTableTbodyRowHeight = 44;
        const cellCount = CallTableColumns.length + 1;   //1 is active botton

        return (
            <div className="brOCCalltableWrapper">
                <table className="brOCCalltable"  style={{
                    borderRadius:outerBorderRadius,
                    border: outerBorderThickness + "px solid " + outerBorderColor,
                    backgroundColor:backgroundColor,
                }}>
                    <thead>
                    <tr style={{
                        color:headerFgColor,
                        borderBottom: headerRowUnderlineThickness +  "px solid " + headerRowUnderlineColor,
                        display:"table-row",
                        tableLayout:"unset",
                        height:callTableTheadRowHeight
                    }}>
                        {CallTableColumns.map((item, i ) => {
                            const key = item.key;
                            const title = item.title;

                            let borderRadiusTH;
                            const isFirstTH = i === 0;
                            if( isFirstTH === true ){
                                borderRadiusTH =  outerBorderRadius +  "px 0 0 0";
                            }
                            else{
                                borderRadiusTH =  "";   //"0"
                            }

                            return <th key={key}
                                       style={{
                                           paddingTop:0,
                                           paddingBottom:0,
                                           borderRadius:borderRadiusTH,
                                           fontSize:callTableThFontSize
                                       }}>{title}</th>;})
                        }
                        <th style={{
                            paddingTop:0,
                            paddingBottom:0,
                            borderRadius:"0 " + outerBorderRadius + "px 0 0",
                            fontSize:callTableThFontSize
                        }}>{i18n.t("activeButton")}</th>
                    </tr>
                    </thead>
                    <tbody style={{
                        color:bodyFgColor,
                        display:"table-row-group"
                    }}>
                    {callInfoArray.map((callInfo, i) => {
                        const tdActive = "\u00A0";
                        return (<tr key={idKey++} style={{
                            color: bodyFgColor,
                            backgroundColor: i === currentCallIndex ? bodyActiveRowBgColor : "",
                            paddingTop:0,
                            paddingBottom:0,
                            borderBottom: bodyRowUnderlineThickness +  "px solid " + bodyRowUnderlineColor,
                            display:"table-row",
                            height: callTableTbodyRowHeight
                        }}>
                            {CallTableColumns.map((column, i) => {
                                    let borderRadiusTD;
                                    const isFirstTD = i === 0;

                                    //!forBug //!check //!deadCode
                                    if( isFirstTD === true ){
                                        borderRadiusTD =  "0 " + outerBorderRadius +  "px 0 0";
                                    }
                                    else{
                                        borderRadiusTD =  "";   //"0"
                                    }
                                    borderRadiusTD =  "";   //"0"

                                    const key = column.key;
                                    const formatter = column.formatter;
                                    let v;
                                    if( !callInfo ){
                                        v = "\u00A0";   //for edit mode
                                    }
                                    else{
                                        v =  formatter( callInfo[key]() );
                                    }
                                    return <td key={key}
                                               style={{
                                                   paddingTop:0,
                                                   paddingBottom:0,
                                                   borderRadius:borderRadiusTD,
                                                   fontSize:callTableTdFontSize
                                               }}>{v}</td>
                                }
                            )}
                            <td style={{
                                width:80,paddingTop:0,paddingBottom:0,
                                borderRadius:"0 " + outerBorderRadius + "px 0 0 ",
                            }}>
                                {tdActive}
                            </td>
                        </tr>);
                    })}
                    <tr colSpan={cellCount}></tr>
                    </tbody>
                </table>
            </div>
        );
    }


}