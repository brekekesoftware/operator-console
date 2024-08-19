import React, {useState} from 'react';
import RuntimeWidget from "./RuntimeWidget";
import LegacyButtonRuntimeSubWidgetFactory from "./legacyButtonRuntimeSubWidget/LegacyButtonRuntimeSubWidgetFactory";
import i18n from "../../../i18n";
import BrekekeOperatorConsole from "../../../index";
import Notification from "antd/lib/notification";
import Util from "../../../Util";
import Popconfirm from "antd/lib/popconfirm";
import OCUtil from "../../../OCUtil";
import Dropdown from "antd/lib/dropdown";
import {Button, Modal} from "antd";

function LineButton({ label, line, width, height, color,  backgroundColor,  border,  borderRadius }) {
    const oc = BrekekeOperatorConsole.getStaticInstance();
    return (
        <button style={{
            display:"inline-block",
            padding:1,
            margin:"0px 0px 0.75rem 0px",
            color:color,
            backgroundColor:backgroundColor,
            border:border,
            borderRadius:borderRadius,
            width:width,
            height:height
        }} title={i18n.t(`legacy_button_description.LegacyLineButton`)}
                className={"kbc-button kbc-button-fill-parent"}
                onClick={() => oc.handleLine(line)}
        >
            {label}
        </button>
    );
}

function TransferCancelButton({  callInfo,
                                  transferCancelButtonFgColor,
                                  transferCancelButtonBgColor,
                                  transferCancelButtonOuterBorderColor,
                                  transferCancelButtonOuterBorderRadius,
                                  transferCancelButtonOuterBorderThickness,
                                  transferCancelButtonWidth,
                                  transferCancelButtonHeight
                              }){
    const confirm = (e) => {
        const oc = BrekekeOperatorConsole.getStaticInstance();
        const campon = oc.getCampon();
        const bSuccess = campon.tryCancelCampOn( callInfo );
        if( bSuccess ) {
            callInfo.camponDstExtensionId = null;
            oc.setState({latestCamponCall: null});    //for redraw
        }
        else{
            oc.setState({latestCamponCall: callInfo});    //for redraw
            Notification.error({message:i18n.t("FailedToCancelTransfer")});
        }
    };
    const cancel = (e) => {
    };

    const transferCancelButtonColor = Util.isAntdRgbaProperty( transferCancelButtonFgColor  ) ? Util.getRgbaCSSStringFromAntdColor( transferCancelButtonFgColor ) : "";
    const transferCancelButtonBackgroundColor = Util.isAntdRgbaProperty( transferCancelButtonBgColor ) ? Util.getRgbaCSSStringFromAntdColor( transferCancelButtonBgColor ) : "";
    const transferCancelButtonBorder = Util.isNumeric( transferCancelButtonOuterBorderThickness ) && Util.isAntdRgbaProperty( transferCancelButtonOuterBorderColor) ?
        "solid " + transferCancelButtonOuterBorderThickness + "px " + Util.getRgbaCSSStringFromAntdColor( transferCancelButtonOuterBorderColor )  : "";
    const transferCancelButtonBorderRadius = Util.isNumber( transferCancelButtonOuterBorderRadius ) ? transferCancelButtonOuterBorderRadius + "px" : "";

    return <Popconfirm
        title={i18n.t("cancelTransferTitle")}
        description={i18n.t("AreYouSureToCancelThisTransfer")}
        onConfirm={confirm}
        onCancel={cancel}
        okText={i18n.t("yes")}
        cancelText={i18n.t("no")}
    >
        <button style={{
            display:"inline-block",
            padding: 1, margin: "0px 0px 0.75rem 0px",
            color: transferCancelButtonColor,
            backgroundColor: transferCancelButtonBackgroundColor,
            border:transferCancelButtonBorder,
            borderRadius:transferCancelButtonBorderRadius,
            width:transferCancelButtonWidth,
            height:transferCancelButtonHeight
        }} title={i18n.t(`transferCancelButtonDesc`)}
                className={"kbc-button kbc-button-fill-parent"}
            //onClick={() => alert("onClick campon button!") }
        >
            {i18n.t("cancel")}
        </button>
    </Popconfirm>
}

function TransferButton({ callInfo, title,
                            transferButtonWidth,
                            transferButtonHeight,
                            transferButtonFgColor,
                            transferButtonBgColor,
                            transferButtonOuterBorderColor,
                            transferButtonOuterBorderRadius,
                            transferButtonOuterBorderThickness,
                        }) {
    const [open, setOpen] = useState(false);

    const oc = BrekekeOperatorConsole.getStaticInstance();
    const handleMenuClick = (e) => {
        const camponExtension = oc.state.extensions[e.key];
        const extensionsStatus = oc.state.extensionsStatus;
        const isBusy = OCUtil.isExtensionBusy( camponExtension.id, extensionsStatus  );
        // const es = oc.getExtensionsStatusInstance();
        // const isBusy = es.isBusyByExtensionId( camponExtension.id );
        setOpen(false);
        if( isBusy ){
            showModalForBusy( {camponExtension,callInfo, title});
        }
        else{
            showModal( {camponExtension,callInfo, title});
        }
    };

    let extensions = oc.getExtensions();
    if (!extensions) {
        extensions = new Array();
    }
    const myExtensionId = oc.getLoginUser().pbxUsername;

    const currentCallInfo = oc.getCurrentCallInfo();
    const currentCallNumber = currentCallInfo ? currentCallInfo.getPartyNumber() : null;
    //!optimize!
    const items = new Array(  );
    for (let i = 0; i < extensions.length; i++) {
        const extension = extensions[i];
        const extensionCallNumber = extension.id;
        if (extensionCallNumber === myExtensionId) {
            continue;
        }
        if( currentCallNumber ===  extensionCallNumber){
            continue;
        }

        const extensionsStatus = oc.getExtensionsStatus();
        const statusClassName = OCUtil.getExtensionStatusClassName(extensionCallNumber, extensionsStatus);
        //const label = extensionCallNumber + " " + (<div className={statusClassName}></div> );
        const label = (<>{extensionCallNumber}
            <div style={{display: "inline-block"}} className={statusClassName}></div>
        </>);
        const item = {
            label: label,
            key: i
        };
        items.push( item );
    }
    const [modalLoading, setModalLoading] = useState(false);
    const [modalOpen, setModalOpen] = useState(null);
    const showModal = ({ camponExtension, callInfo, title } ) => {
        setModalOpen( {camponExtension, callInfo, title } );
    };

    const handleBlindTransferNow = () =>{
        const transferMode =  "attended";
        const camponExtension = modalOpen.camponExtension;
        const pbxTalkerId = callInfo.getPbxTalkerId();
        const tenant = undefined;
        oc.transferCallCore(  camponExtension.id, transferMode , pbxTalkerId, tenant ,
            ( operatorConsoleAsCaller, message) => {
                if( message.startsWith("fail")){
                    Notification.error({message: i18n.t("failed_to_transfer_call")});
                }
                else {
                    const callInfo = operatorConsoleAsCaller.getPhoneClient().getCallInfos().getCallInfoWhereTalkerIdEqual(pbxTalkerId);
                    if (!callInfo) {
                        Notification.error({message: i18n.t("failed_to_transfer_call")});
                    } else {
                        callInfo.hangup();
                    }
                }
            }
        );
        setModalOpen(null); //close modal
    };

    const handleActiveAndStartBlindTransferNow = () =>{
        const callId = modalOpen.callInfo.getCallId();
        const callIndex = oc.getPhoneClient().getCallInfos().getCallIndexByCallId( callId );
        oc.switchCallIndexWithoutHold(callIndex);

        const transferMode =  undefined;    //attended
        const camponExtension = modalOpen.camponExtension;
        const pbxTalkerId = callInfo.getPbxTalkerId();
        const tenant = undefined;
        oc.transferCallCore(  camponExtension.id, transferMode , pbxTalkerId, tenant ,
            ( operatorConsoleAsCaller, message) => {
                if( message.startsWith("fail")){
                    Notification.error({message: i18n.t("failed_to_transfer_call")});
                }
                else {
                    const callInfo = operatorConsoleAsCaller.getPhoneClient().getCallInfos().getCallInfoWhereTalkerIdEqual(pbxTalkerId);
                    if (!callInfo) {
                        Notification.error({message: i18n.t("failed_to_transfer_call")});
                    } else {
                        callInfo.hangup();
                    }
                }
            }
        );
        setModalOpen(null); //close modal
    };

    const handleModalCancel = () => {
        setModalOpen(null); //close modal
    };

    const handleOpenChange = (flag) => {
        setOpen(flag);
    };

    const [modalForBusyOpen, setModalForBusyOpen] = useState(null);
    const showModalForBusy = ({ camponExtension, callInfo, title } ) => {
        setModalForBusyOpen( {camponExtension, callInfo, title } );
    };

    const handleModalForBusyCancel = () => {
        setModalForBusyOpen(null);
    };

    const handleCamponAuto = () =>{
        setModalForBusyOpen(null);  //close modal

        const callInfo = modalForBusyOpen.callInfo;
        const camponExtension = modalForBusyOpen.camponExtension;
        const campon = oc.getCampon();

        const settingData = oc.getSystemSettingsData();
        const timeoutMillis = settingData.getCamponTimeoutMillis();
        const isBlindTransfer = true;
        const transferExtensionId = camponExtension.id;
        callInfo.camponDstExtensionId = transferExtensionId;
        oc.setState({latestCamponCall:callInfo});    //for redraw
        const title = modalForBusyOpen.title;
        const bCampOn = campon.tryStartCamponOrTransfer( callInfo,  isBlindTransfer, timeoutMillis, title );
    }

    const handleCamponManual = () => {
        setModalForBusyOpen(null);  //close modal

        const callInfo = modalForBusyOpen.callInfo;
        const camponExtension = modalForBusyOpen.camponExtension;
        const campon = oc.getCampon();

        const settingData = oc.getSystemSettingsData();
        const timeoutMillis = settingData.getCamponTimeoutMillis();
        const isBlindTransfer = false;
        const transferExtensionId = camponExtension.id;
        callInfo.camponDstExtensionId = transferExtensionId;
        oc.setState({latestCamponCall:callInfo});    //for redraw

        const title = modalForBusyOpen.title;
        const bCampOn = campon.tryStartCamponOrTransfer( callInfo, isBlindTransfer, timeoutMillis, title  );
    }

    const transferButtonColor = Util.isAntdRgbaProperty( transferButtonFgColor  ) ? Util.getRgbaCSSStringFromAntdColor( transferButtonFgColor ) : "";
    const transferButtonBackgroundColor = Util.isAntdRgbaProperty( transferButtonBgColor ) ? Util.getRgbaCSSStringFromAntdColor( transferButtonBgColor ) : "";
    const transferButtonBorder = Util.isNumeric( transferButtonOuterBorderThickness ) && Util.isAntdRgbaProperty( transferButtonOuterBorderColor) ?
        "solid " + transferButtonOuterBorderThickness + "px " + Util.getRgbaCSSStringFromAntdColor( transferButtonOuterBorderColor )  : "";
    const transferButtonBorderRadius = Util.isNumber( transferButtonOuterBorderRadius ) ? transferButtonOuterBorderRadius + "px" : "";

    return (
        <>
            <Dropdown key="dropdown" menu={{items, onClick: handleMenuClick}} trigger="click" open={open} onOpenChange={handleOpenChange}>
                <button style={{
                    display:"inline-block",
                    padding: 1,
                    margin: "0px 0px 0.75rem 0px",
                    color:transferButtonColor,
                    backgroundColor:transferButtonBackgroundColor,
                    border:transferButtonBorder,
                    borderRadius:transferButtonBorderRadius,
                    width:transferButtonWidth,
                    height:transferButtonHeight
                }} title={i18n.t(`transferButtonDesc`)}
                        className={"kbc-button kbc-button-fill-parent"}
                    //onClick={() => alert("onClick campon button!") }
                >
                    {i18n.t("transfer")}
                </button>
            </Dropdown>
            <Modal
                key="modal"
                open={modalOpen != null }
                title={i18n.t("transfer")}
                onOk={handleBlindTransferNow}
                onCancel={handleModalCancel}
                width={700}
                footer={[
                    <div key="0" style={{whiteSpace:"nowrap"}}>
                        <Button key="submit" type="primary" loading={modalLoading} onClick={handleBlindTransferNow}>
                            {i18n.t("blindTransfer")}
                        </Button>
                        <Button key="submit2" type="primary" loading={modalLoading} onClick={handleActiveAndStartBlindTransferNow}>
                            {i18n.t("activateAndStartBlindTransfer")}
                        </Button>
                        <Button key="back" onClick={handleModalCancel}>
                            {i18n.t("cancel")}
                        </Button>
                    </div>
                ]}
            >
                {i18n.t("confirmTransferNow")}
            </Modal>
            <Modal
                key="modalForBusy"
                open={modalForBusyOpen != null  }
                title={i18n.t("transfer")}
                onOk={handleCamponAuto}
                onCancel={handleModalForBusyCancel}
                footer={[
                    <div key="1" style={{whiteSpace:"nowrap"}}>
                        <Button key="submitForBusy" type="primary" loading={modalLoading} onClick={handleCamponAuto}>
                            {i18n.t("campOnAuto")}
                        </Button>
                        <Button key="submitForBusy2" type="primary" loading={modalLoading} onClick={handleCamponManual}>
                            {i18n.t("campOn")}
                        </Button>
                        <Button key="backForBusy" onClick={handleModalForBusyCancel}>
                            {i18n.t("cancel")}
                        </Button>
                    </div>
                ]}
            >
                {i18n.t("confirmTransferForBusy")}
            </Modal>
        </>
    );
}

function LineTableRow( { index, lineInfo, bodyFgColor, bodyRowUnderlineThickness, bodyRowUnderlineColor, outerBorderRadius,
                           lineButtonWidth,
                           lineButtonHeight,
                           lineButtonFgColor,
                           lineButtonBgColor,
                           lineButtonOuterBorderColor,
                           lineButtonOuterBorderRadius,
                           lineButtonOuterBorderThickness,
                           transferButtonWidth,
                           transferButtonHeight,
                           transferButtonFgColor,
                           transferButtonBgColor,
                           transferButtonOuterBorderColor,
                           transferButtonOuterBorderRadius,
                           transferButtonOuterBorderThickness,
                           transferCancelButtonWidth,
                           transferCancelButtonHeight,
                           transferCancelButtonFgColor,
                           transferCancelButtonBgColor,
                           transferCancelButtonOuterBorderColor,
                           transferCancelButtonOuterBorderRadius,
                           transferCancelButtonOuterBorderThickness,
                       }){
    const lightClassname = _getLightClassname( lineInfo.line  );
    const title = lineInfo.lineLabel ? lineInfo.lineLabel : lineInfo.line;
    const oc = BrekekeOperatorConsole.getStaticInstance();
    const callInfo = lineInfo.room_id ? oc.getPhoneClient().getCallInfos().getCallInfoWherePbxRoomIdEqual( lineInfo.room_id ) : null;

    const lineButtonColor = Util.isAntdRgbaProperty( lineButtonFgColor  ) ? Util.getRgbaCSSStringFromAntdColor( lineButtonFgColor ) : "";
    const lineButtonBackgroundColor = Util.isAntdRgbaProperty( lineButtonBgColor ) ? Util.getRgbaCSSStringFromAntdColor( lineButtonBgColor ) : "";
    const lineButtonBorder = Util.isNumeric( lineButtonOuterBorderThickness ) && Util.isAntdRgbaProperty( lineButtonOuterBorderColor) ?
        "solid " + lineButtonOuterBorderThickness + "px " + Util.getRgbaCSSStringFromAntdColor( lineButtonOuterBorderColor )  : "";
    const lineButtonBorderRadius = Util.isNumber( lineButtonOuterBorderRadius ) ? lineButtonOuterBorderRadius + "px" : "";

    return (<tr key={index} className={lightClassname} style={{
        color: bodyFgColor,
        borderBottom: bodyRowUnderlineThickness +  "px solid " + bodyRowUnderlineColor
    }}>
        <td style={{
            borderRadius:"0 " + outerBorderRadius +  "px 0 0",
        }}>{title}</td>
        <td>{lineInfo.talker}</td>
        {/*<td style={{width:70,height:70}}>*/}
        <td>
            <LineButton
                line={lineInfo.line}
                label={lineInfo.label}
                width={lineButtonWidth}
                height={lineButtonHeight}
                color={ lineButtonColor }
                backgroundColor={ lineButtonBackgroundColor }
                border={ lineButtonBorder }
                borderRadius={ lineButtonBorderRadius }
            ></LineButton>
        </td>
        {/*<td style={{width:100,height:70}}>*/}
        <td>
            { callInfo && ( ( callInfo.getIsIncoming() && !callInfo.getIsAnswered() ) === false ) && lineInfo.talker ?
                callInfo.camponDstExtensionId ?
                    <TransferCancelButton callInfo={callInfo}
                                          transferCancelButtonWidth = {transferCancelButtonWidth}
                                          transferCancelButtonHeight = {transferCancelButtonHeight}
                                          transferCancelButtonFgColor={transferCancelButtonFgColor}
                                          transferCancelButtonBgColor={transferCancelButtonBgColor}
                                          transferCancelButtonOuterBorderColor ={transferCancelButtonOuterBorderColor}
                                          transferCancelButtonOuterBorderRadius ={transferCancelButtonOuterBorderRadius}
                                          transferCancelButtonOuterBorderThickness = {transferCancelButtonOuterBorderThickness}
                    ></TransferCancelButton>
                    :
                    <TransferButton callInfo={callInfo} title={title}
                                    transferButtonWidth = {transferButtonWidth}
                                    transferButtonHeight = {transferButtonHeight}
                                    transferButtonFgColor={transferButtonFgColor}
                                    transferButtonBgColor={transferButtonBgColor}
                                    transferButtonOuterBorderColor ={transferButtonOuterBorderColor}
                                    transferButtonOuterBorderRadius ={transferButtonOuterBorderRadius}
                                    transferButtonOuterBorderThickness = {transferButtonOuterBorderThickness}
                    ></TransferButton> : "" }
        </td>
        <td style={{
            borderRadius:"0 " + outerBorderRadius + "px 0 0 ",
        }}>
            { callInfo && callInfo.camponDstExtensionId ?  callInfo.camponDstExtensionId : "" }
        </td>
    </tr>);
}

function _getLightClassname( line ){
    const oc = BrekekeOperatorConsole.getStaticInstance();
    const myParksStatus = oc.getMyParksStatus();
    const linesStatus = oc.getLinesStatus();
    const parksStatus = oc.getParksStatus();
    const loginUser = oc.getLoginUser();

    const { line_talker, room_id, status } = linesStatus[line] || {};
    let lightClassname = '';
    if (status === 'on') {
        const callInfo = room_id ? oc.getPhoneClient().getCallInfos().getCallInfoWherePbxRoomIdEqual( room_id ) : null;
        const park = parksStatus[line];

        if (line_talker === loginUser?.pbxUsername) {
            lightClassname = 'kbc-button-success-flash';
        } else if (park) {
            lightClassname = myParksStatus[line] ? 'kbc-button-success-flash-slow' : 'kbc-button-danger-flash-slow';
        } else if (callInfo) {
            if (callInfo.getIsIncoming() && !callInfo.getIsAnswered()) {
                lightClassname = 'kbc-button-danger-flash'
            } else {
                lightClassname = 'kbc-button-success'
            }
        } else {
            lightClassname = 'kbc-button-danger'
        }
    }

    return lightClassname;

}

export default class LineTableRuntimeWidget extends RuntimeWidget{

    constructor( props ) {
        super( props );
    }



    //!overload
    _getRenderMainJsx() {
        const oc = BrekekeOperatorConsole.getStaticInstance();
        const widgetData = this.getWidgetData();

        const myParksStatus = oc.getMyParksStatus();
        const linesStatus = oc.getLinesStatus();
        const parksStatus = oc.getParksStatus();
        const loginUser = oc.getLoginUser();

        const lineDataArray = widgetData.getLineDataArray();
        const lineCount = lineDataArray.length;
        const lineInfos = new Array(lineCount);
        for (let i = 0; i < lineCount; i++) {
            const lineData = lineDataArray[i];
            const line = lineData.getResourceName();
            const { line_talker, room_id, line_talker_id } = linesStatus[line] || {};
            const lineInfo = {};
            lineInfo.line = lineData.getResourceName();
            lineInfo.lineLabel = lineData.getLineLabel();
            lineInfo.label = i18n.t("line") + " " +  (i+1);
            lineInfo.talker = line_talker;
            lineInfo.lineTalkerId = line_talker_id;
            lineInfo.room_id = room_id;
            lineInfos[i] = lineInfo;
        }

        const outerBorderRadius = ( widgetData.getLinetableOuterBorderRadius() || widgetData.getLinetableOuterBorderRadius() === 0 ) ? widgetData.getLinetableOuterBorderRadius() : 0; //!default
        const outerBorderThickness = ( widgetData.getLinetableOuterBorderThickness() || widgetData.getLinetableOuterBorderThickness() === 0 ) ? widgetData.getLinetableOuterBorderThickness() : 0; //!default
        const outerBorderColor = Util.getRgbaCSSStringFromAntdColor(  widgetData.getLinetableOuterBorderColor(), "rgb(0,0,0,0)" );
        const headerFgColor = Util.getRgbaCSSStringFromAntdColor(  widgetData.getLinetableHeaderFgColor() , "" );
        const bodyFgColor = Util.getRgbaCSSStringFromAntdColor(  widgetData.getLinetableBodyFgColor() , "" );
        //const bodyActiveRowBgColor = Util.getRgbaCSSStringFromAntdColor( props.linetableBodyActiveRowBgColor, "#B9DFA9" );   //!default
        const backgroundColor = Util.getRgbaCSSStringFromAntdColor( widgetData.getLinetableBgColor(), "" );
        const headerRowUnderlineThickness = ( widgetData.getLinetableHeaderRowUnderlineThickness() || widgetData.getLinetableHeaderRowUnderlineThickness() === 0 ) ? widgetData.getLinetableHeaderRowUnderlineThickness() : 1; //!default
        const headerRowUnderlineColor = Util.getRgbaCSSStringFromAntdColor( widgetData.getLinetableHeaderRowUnderlineColor() , "#e0e0e0" );   //!default
        const bodyRowUnderlineThickness = ( widgetData.getLinetableBodyRowUnderlineThickness() || widgetData.getLinetableBodyRowUnderlineThickness() === 0 ) ? widgetData.getLinetableBodyRowUnderlineThickness() : 1; //!default
        const bodyRowUnderlineColor = Util.getRgbaCSSStringFromAntdColor( widgetData.getLinetableBodyRowUnderlineColor() , "#e0e0e0" );   //!default

        const lineButtonWidth = ( widgetData.getLineButtonWidth() || widgetData.getLineButtonWidth() === 0 ) ? widgetData.getLineButtonWidth() : 40; //!default
        const lineButtonHeight = ( widgetData.getLineButtonHeight() || widgetData.getLineButtonHeight() === 0 ) ? widgetData.getLineButtonHeight() : 40;  //!default


        return (
            <table className="brOCLinetable" style={{
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
                        borderRadius:outerBorderRadius +  "px 0 0 0",
                    }}>{i18n.t("name")}</th>
                    <th>{i18n.t("responder")}</th>
                    {/*<th style={{width:70}}>{i18n.t("line")}</th>*/}
                    <th>{i18n.t("line")}</th>
                    {/*<th style={{width:120}}>{i18n.t("transfer")}</th>*/}
                    <th>{i18n.t("transfer")}</th>
                    <th style={{
                        borderRadius:"0 " + outerBorderRadius + "px 0 0",
                    }}>{i18n.t("camponDest")}</th>
                </tr>
                </thead>
                <tbody style={{
                    color:bodyFgColor,
                }}>
                { lineInfos.map((lineInfo,index) =>(
                    <LineTableRow
                        key={index}
                        index={index}
                        lineInfo={lineInfo}
                        bodyFgColor={bodyFgColor}
                        bodyRowUnderlineThickness={bodyRowUnderlineThickness}
                        bodyRowUnderlineColor={bodyRowUnderlineColor}
                        outerBorderRadius={outerBorderRadius}
                        lineButtonWidth={lineButtonWidth}
                        lineButtonHeight={lineButtonHeight}
                        lineButtonFgColor={widgetData.getLineButtonFgColor()}
                        lineButtonBgColor = {widgetData.getLineButtonBgColor()}
                        lineButtonOuterBorderColor = {widgetData.getLineButtonOuterBorderColor()}
                        lineButtonOuterBorderRadius = {widgetData.getLineButtonOuterBorderRadius()}
                        lineButtonOuterBorderThickness = {widgetData.getLineButtonOuterBorderThickness()}
                        transferButtonWidth={widgetData.getTransferButtonWidth()}
                        transferButtonHeight={widgetData.getTransferButtonHeight()}
                        transferButtonFgColor={widgetData.getTransferButtonFgColor()}
                        transferButtonBgColor = {widgetData.getTransferButtonBgColor()}
                        transferButtonOuterBorderColor = {widgetData.getTransferButtonOuterBorderColor()}
                        transferButtonOuterBorderRadius = {widgetData.getTransferButtonOuterBorderRadius()}
                        transferButtonOuterBorderThickness = {widgetData.getTransferButtonOuterBorderThickness()}
                        transferCancelButtonWidth={widgetData.getTransferCancelButtonWidth()}
                        transferCancelButtonHeight={widgetData.getTransferCancelButtonHeight()}
                        transferCancelButtonFgColor={widgetData.getTransferCancelButtonFgColor()}
                        transferCancelButtonBgColor = {widgetData.getTransferCancelButtonBgColor()}
                        transferCancelButtonOuterBorderColor = {widgetData.getTransferCancelButtonOuterBorderColor()}
                        transferCancelButtonOuterBorderRadius = {widgetData.getTransferCancelButtonOuterBorderRadius()}
                        transferCancelButtonOuterBorderThickness = {widgetData.getTransferCancelButtonOuterBorderThickness()}
                    />
                ))}
                </tbody>

            </table>
        );

    }


}