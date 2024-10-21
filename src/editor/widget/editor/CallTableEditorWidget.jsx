import React from 'react';
import i18n from "../../../i18n";
import EditorWidget from "./EditorWidget";
import BrekekeOperatorConsole from "../../../index";
import Util from "../../../Util";
import DummyCallInfo from "../../../DummyCallInfo";
const CELL_MARGIN = 4;
const CURRENT_CALL_INDEX = 1;
export default class CallTableEditorWidget extends EditorWidget{

    constructor( props ) {
        super( props );
        this._CallInfoArray = Object.freeze([
            new DummyCallInfo({
                partyNumber : "12345678",
                partyName : i18n.t("DummyPartyName") + "(1)",
                isIncoming: true,
                isAnswered: true,
                isHolding : true,
                isRecording : true,
                isMuted : true,
                answeredAt : new Date(2024, 0, 10, 12, 30, 0, 0).getTime()
            }),
            new DummyCallInfo({
                partyNumber : "87654321",
                partyName : i18n.t("DummyPartyName") + "(2)",
                isIncoming: false,
                isAnswered: false,
                isHolding : false,
                isRecording : false,
                isMuted : false,
                answeredAt : null,
            })
        ]);
    }

    //!overload
    _getRenderMainJsx() {
        const oc = BrekekeOperatorConsole.getStaticInstance();
        //const callInfos = oc.getPhoneClient().getCallInfos();
        const callInfoArray = this._CallInfoArray;
        const currentCallIndex = CURRENT_CALL_INDEX;

        const widgetData = this.getWidgetData();
        const callTableThFontSize = widgetData.getCalltableHeaderFontSize() ?  widgetData.getCalltableHeaderFontSize() : 10;
        const callTableTdFontSize = widgetData.getCalltableBodyFontSize() ? widgetData.getCalltableBodyFontSize() : 12;
        // const callTableTheadRowHeight = 44;
        // const callTableTbodyRowHeight = 44;
        const callTableTheadRowHeight = callTableThFontSize + CELL_MARGIN;
        const callTableTbodyRowHeight = callTableTdFontSize + CELL_MARGIN;
        
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

        const activeButtonWidth = widgetData.getCalltableActiveButtonWidth() ?  widgetData.getCalltableActiveButtonWidth() : 42;   //!default
        const activeButtonHeight = widgetData.getCalltableActiveButtonHeight() ?  widgetData.getCalltableActiveButtonHeight() : 42;   //!default
        //const activeButtonCellWidth = activeButtonWidth + CELL_MARGIN;
        //const activeButtonCellWidth = 50;
        const activeButtonCellHeight = activeButtonHeight + CELL_MARGIN;
        const activeButtonFontSize = widgetData.getCalltableActiveButtonFontSize() ? widgetData.getCalltableActiveButtonFontSize() :  9;

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
                            //width:activeButtonCellWidth,
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
                        let tdActive;
                        if( i === currentCallIndex ){
                            tdActive = "\u00A0";
                        }
                        else{
                            tdActive = <div style={{width:activeButtonWidth,height:activeButtonHeight,margin:"0 auto"}}><button title={i18n.t("activeButtonDesc")} className="kbc-button kbc-button-fill-parent" style={{fontSize:activeButtonFontSize}} disabled={true}>{i18n.t("active")}</button></div>;
                        }
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
                                //width:activeButtonCellWidth,
                                height:activeButtonCellHeight,
                                paddingTop:0,paddingBottom:0,
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