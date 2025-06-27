import React from 'react';
import RuntimeWidget from "./RuntimeWidget";
import LegacyButtonRuntimeSubWidgetFactory from "./legacyButtonRuntimeSubWidget/LegacyButtonRuntimeSubWidgetFactory";
import i18n from "../../../i18n";
import BrekekeOperatorConsole from "../../../index";
import Util from "../../../Util";
import ACallInfo from "../../../ACallInfo";
const CELL_MARGIN = 4;
export default class CallTableRuntimeWidget extends RuntimeWidget{

    constructor( props ) {
        super( props );
    }

    //!overload
    _getRenderMainJsx() {
        const oc = BrekekeOperatorConsole.getStaticInstance();
        const callInfos = oc.getPhoneClient().getCallInfos();
        const callInfoArray = callInfos.getCallInfoArray();
        const currentCallIndex = callInfos.getCurrentCallIndex();

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
        const activeButtonCellHeight = activeButtonHeight + CELL_MARGIN;;
        const activeButtonFontSize = widgetData.getCalltableActiveButtonFontSize() ? widgetData.getCalltableActiveButtonFontSize() :  9;

        //!temp
        const videoButtonWidth = 42;   //!default
        const videoButtonHeight = 42;   //!default
        //const videoButtonCellWidth = videoButtonWidth + CELL_MARGIN;
        //const videoButtonCellWidth = 50;
        const videoButtonCellHeight = activeButtonHeight + CELL_MARGIN;
        const videoButtonFontSize = 9;

        const outerBorderRadius = ( widgetData.getCalltableOuterBorderRadius() || widgetData.getCalltableOuterBorderRadius() === 0 ) ? widgetData.getCalltableOuterBorderRadius() : 0; //!default
        const outerBorderThickness = ( widgetData.getCalltableOuterBorderThickness() || widgetData.getCalltableOuterBorderThickness() === 0 ) ? widgetData.getCalltableOuterBorderThickness() : 0; //!default
        const outerBorderColor = Util.getRgbaCSSStringFromAntdColor(  widgetData.getCalltableOuterBorderColor(), "rgba(0,0,0,0)" );
        const headerFgColor = Util.getRgbaCSSStringFromAntdColor(  widgetData.getCalltableHeaderFgColor() , "" );
        const headerBgColor = Util.getRgbaCSSStringFromAntdColor(  widgetData.getCalltableHeaderBgColor() , "" );
        const bodyFgColor = Util.getRgbaCSSStringFromAntdColor(  widgetData.getCalltableBodyFgColor() , "" );
        const bodyActiveRowBgColor = Util.getRgbaCSSStringFromAntdColor( widgetData.getCalltableBodyActiveRowBgColor(), "#B9DFA9" );   //!default
        const bodyActiveRowFgColor = Util.getRgbaCSSStringFromAntdColor( widgetData.getCalltableBodyActiveRowFgColor(), bodyFgColor );
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
                    backgroundColor:backgroundColor,
                    borderStyle : "solid",
                    borderColor : outerBorderColor,
                    borderWidth: outerBorderThickness +  "px"
                    //border: outerBorderThickness + "px solid " + outerBorderColor,
                }}>
                    <thead>
                    <tr style={{
                        color: headerFgColor,
                        backgroundColor: headerBgColor,
                        borderBottomStyle : "solid",
                        borderBottomColor : headerRowUnderlineColor,
                        borderBottomWidth: headerRowUnderlineThickness +  "px",
                        //borderBottom: headerRowUnderlineThickness + "px solid " + headerRowUnderlineColor,
                        display: "table-row",
                        tableLayout: "unset",
                        height: callTableTheadRowHeight
                    }}>
                        {CallTableColumns.map((item, i) => {
                            const key = item.key;
                            const title = item.title;

                            let borderRadiusTH;
                            const isFirstTH = i === 0;
                            if (isFirstTH === true) {
                                borderRadiusTH = outerBorderRadius + "px 0 0 0";
                            } else {
                                borderRadiusTH = "";   //"0"
                            }

                            return <th key={key}
                                       style={{
                                           paddingTop: 0,
                                           paddingBottom: 0,
                                           borderRadius: borderRadiusTH,
                                           fontSize: callTableThFontSize
                                       }}>{title}</th>;
                        })
                        }
                        <th style={{
                            // width:activeButtonCellWidth,
                            height: activeButtonCellHeight,
                            paddingTop: 0,
                            paddingBottom: 0,
                            borderRadius: "0 " + outerBorderRadius + "px 0 0",
                            fontSize: callTableThFontSize
                        }}>{i18n.t("activeButton")}</th>
                        {/*<th style={{*/}
                        {/*    // width:activeButtonCellWidth,*/}
                        {/*    height: videoButtonCellHeight,*/}
                        {/*    paddingTop: 0,*/}
                        {/*    paddingBottom: 0,*/}
                        {/*    borderRadius: "0 " + outerBorderRadius + "px 0 0",*/}
                        {/*    fontSize: callTableThFontSize*/}
                        {/*}}>{i18n.t("Video_button")}</th>*/}
                    </tr>
                    </thead>
                    <tbody style={{
                        color: bodyFgColor,
                        display: "table-row-group"
                    }}>
                    {callInfoArray.map((callInfo, i) => {
                        const isCurrentCallIndex = i === currentCallIndex;

                        let tdActive;
                        if (isCurrentCallIndex) {
                            tdActive = "\u00A0";
                        }
                        else{
                            tdActive = <div style={{width:activeButtonWidth,height:activeButtonHeight,margin:"0 auto"}}><button title={i18n.t("activeButtonDesc")} className="kbc-button kbc-button-fill-parent" style={{fontSize:activeButtonFontSize}} onClick={ () => oc.switchCallIndex(i)}>{i18n.t("active")}</button></div>;
                        }

                        const callStatus = callInfo.getCallStatus();
                        const isStartVideoButtonEnable = isCurrentCallIndex === true && callInfo.isVideoEnable() === true && callStatus === ACallInfo.CALL_STATUSES.talking && callInfo.isVideoActive() === false;
                        const isStopVideoButtonEnable = isCurrentCallIndex === true && callInfo.isVideoEnable() === true && callStatus === ACallInfo.CALL_STATUSES.talking && callInfo.isVideoActive() === true;

                        return (<tr key={idKey++} style={{
                            color:  i === currentCallIndex ? bodyActiveRowFgColor : bodyFgColor,
                            backgroundColor: i === currentCallIndex ? bodyActiveRowBgColor : "",
                            paddingTop:0,
                            paddingBottom:0,
                            borderBottomStyle : "solid",
                            borderBottomColor : bodyRowUnderlineColor,
                            borderBottomWidth: bodyRowUnderlineThickness +  "px",
                            //borderBottom: bodyRowUnderlineThickness +  "px solid " + bodyRowUnderlineColor,
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
                                paddingTop:0,paddingBottom:0,
                                borderRadius:"0 " + outerBorderRadius + "px 0 0 ",
                            }}>
                                {tdActive}
                            </td>
                            {/*<td>*/}
                            {/*    { isStartVideoButtonEnable === true && (*/}
                            {/*        <Popconfirm title={i18n.t("are_you_sure")}*/}
                            {/*                    onConfirm={() => {*/}
                            {/*                        callInfo.startVideo();*/}
                            {/*                        oc.setState({rerender:true});*/}
                            {/*                    }}*/}
                            {/*                    okText={i18n.t("yes")}*/}
                            {/*                    cancelText={i18n.t("no")}*/}
                            {/*        >*/}
                            {/*            <div style={{width:videoButtonWidth,height:videoButtonHeight,margin:"0 auto"}}><button className="kbc-button kbc-button-fill-parent" style={{fontSize:videoButtonFontSize}} >{i18n.t("Start_video")}</button></div>*/}
                            {/*        </Popconfirm>*/}
                            {/*    )}*/}
                            {/*    { isStopVideoButtonEnable === true && (*/}
                            {/*        <Popconfirm title={i18n.t("are_you_sure")}*/}
                            {/*                    onConfirm={() =>{*/}
                            {/*                        callInfo.stopVideo();*/}
                            {/*                        oc.setState({rerender:true});*/}
                            {/*                    }}*/}
                            {/*                    okText={i18n.t("yes")}*/}
                            {/*                    cancelText={i18n.t("no")}*/}
                            {/*        >*/}
                            {/*            <div style={{width:videoButtonWidth,height:videoButtonHeight,margin:"0 auto"}}><button className="kbc-button kbc-button-fill-parent" style={{fontSize:videoButtonFontSize}} >{i18n.t("Stop_video")}</button></div>*/}
                            {/*        </Popconfirm>*/}
                            {/*    )}*/}
                            {/*</td>*/}
                        </tr>);
                    })}
                    <tr colSpan={cellCount}></tr>
                    </tbody>
                </table>
            </div>
        );
    }


}