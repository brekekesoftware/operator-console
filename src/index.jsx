import React, {useState} from 'react'
import ReactDOM from 'react-dom/client'
import Login from './login'
// import { IconPhone, IconBackspace } from './icons'
import CallPanel from './callPanel'
// import UpOutlined from '@ant-design/icons/UpOutlined'
// import DownOutlined from '@ant-design/icons/DownOutlined'
import MoreOutlined from '@ant-design/icons/MoreOutlined'
// import CloseOutlined from '@ant-design/icons/CloseOutlined'
// import CloseOutlined from '@ant-design/icons/CloseOutlined'
// import CheckCircleOutlined from '@ant-design/icons/CheckCircleOutlined'
import clsx from 'clsx'
import { reaction } from "mobx"
import {getProperty, setProperty, hasProperty, deleteProperty} from 'dot-prop';
import Dropdown from 'antd/lib/dropdown';
import 'antd/lib/dropdown/style';
import Menu from 'antd/lib/menu';
import 'antd/lib/menu/style';
import Button from 'antd/lib/button';
import 'antd/lib/button/style';
import Carousel from 'antd/lib/carousel';
import 'antd/lib/carousel/style';
import { Rnd } from 'react-rnd';
import Button from 'antd/lib/button';
import 'antd/lib/button/style';
import 'antd-button-color/dist/css/style.less';
import Input from 'antd/lib/input';
import 'antd/lib/input/style';
// import Radio from 'antd/lib/radio';
// import 'antd/lib/radio/style';
import Select from 'antd/lib/select';
import 'antd/lib/select/style';
import InputNumber from 'antd/lib/input-number';
import 'antd/lib/input-number/style';
import Space from 'antd/lib/space';
import 'antd/lib/space/style';
import Empty from 'antd/lib/empty';
import 'antd/lib/empty/style';
import Form from 'antd/lib/form';
import 'antd/lib/form/style';
// import Table from 'antd/lib/table';
// import 'antd/lib/table/style';
// import Modal from 'antd/lib/modal';
// import 'antd/lib/modal/style';
import 'antd/lib/notification/style';
// import Tooltip from 'antd/lib/tooltip';
// import 'antd/lib/tooltip/style';
import Spin from 'antd/lib/spin';
import 'antd/lib/spin/style';
import AutoComplete from 'antd/lib/auto-complete';
import APhoneClient from "./APhoneClient";
import WebphonePhoneClient from "./WebphonePhoneClient";
import PalPhoneClient from "./PalPhoneClient";
//import 'antd/lib/auto-complete/style';  //!commentout build error antd ^5.3.1

// import Message from 'antd/lib/message';
// import 'antd/lib/message/style';
import Popconfirm from 'antd/lib/popconfirm';
// Popconfirm.defaultProps = {
//   okButtonProps: {
//     type: "danger",
//     size: "medium",
//   },
//   cancelButtonProps: {
//     type: "secondary",
//     size: "medium",
//   },
// };
import 'antd/lib/popconfirm/style';
import { SketchPicker } from 'react-color';
import GridLines from 'react-gridlines';
import logo from './logo.png'
import './index.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library as FontAwesomeLibrary } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
FontAwesomeLibrary.add(fas, far, fab)
import debounce from 'debounce'

import i18n, { DEFAULT_LOCALE, isValidLocale, loadTranslations } from "./i18n";

import SystemSettingsView, {OPERATOR_CONSOLE_SYSTEM_SETTINGS_DATA_ID,OPERATOR_CONSOLE_SYSTEM_SETTINGS_DATA_VERSION} from "./SystemSettingsView";
const PBX_APP_DATA_NAME = 'operator_console';
//const PBX_APP_DATA_VERSION = '0.1';
const PBX_APP_DATA_VERSION = '2.0.0';
//const WIDGET_LEFT_SPACE_FOR_IMPORT_FROM_VER_0_1 = 10;
//const WIDGET_TOP_SPACE_FOR_IMPORT_FROM_VER_0_1 = 0;


import { CallHistory } from './CallHistory';
import DropDownMenu from "./DropDownMenu";
import QuickBusy from "./QuickBusy";
import LineTableSettings from "./LineTableSettings"
import LineTable from "./LineTable"
import Notification from "antd/lib/notification";
import ExtensionsStatus from "./ExtensionsStatus";
import Campon from "./Campon";
import SystemSettingsData from "./SystemSettingsData";
import NoScreensView from "./NoScreensView";
import {Select, Modal, Tabs} from "antd";
import LegacyCallPanelSettings from "./LegacyCallPanelSettings";
import LegacyUccacWidgetSettings from "./LegacyUccacWidgetSettings";
import CallTableSettings from "./CallTableSettings";
import {Colorpicker} from "antd-colorpicker";
import Util from "./Util";
import ExtensionTableSettings from "./ExtensionTableSettings";
import UccacWrapper from "./UccacWrapper";
import BrekekeOperatorConsoleEx from "./BrekekeOperatorConsoleEx";
//import BusylightStatusChanger from "./BusylightStatusChanger";
import OCUtil, {BROC_BROCCALLOBJECT_CALL_STATUSES} from "./OCUtil";
import UccacWidget from "./UccacWidget";
import Login from "./Login";
import ACallInfos from "./ACallInfos";
import ACallInfo from "./ACallInfo";
import FileInfosLoader from "./FileInfosLoader";
import EditScreenView from "./editor/EditScreenView";
import ScreenData from "./data/ScreenData";
import ShowScreenView_ver2 from "./runtime/ShowScreenView_ver2";
import PaneData from "./data/PaneData";
import WidgetData from "./data/widgetData/WidgetData";
import {CallHistory2} from "./CallHistory2";
import PalRestApi from "./PalRestApi";
export const brOcDisplayStates = Object.freeze({
    //loading: 0,
    showScreen: 1,
    editingScreen: 2,
    waitQuickCallKey: 3,
    systemSettingsView: 4,
    noScreens:5,
    editingScreen_ver2:6,
    showScreen_ver2:7,
    waitQuickCallKey_ver2:8
});

function LegacyCallPanel({ operatorConsoleAsParent, borderRadius, callpanelBgColor, callpanelFgColor,
                             outsideShadow_horizontalOffset, outsideShadow_verticalOffset, outsideShadow_blur,  outsideShadow_spread, outsideShadow_color,
                             insideShadow_horizontalOffset,insideShadow_verticalOffset, insideShadow_blur,  insideShadow_spread, insideShadow_color,
                             context }) {
    //const { currentCallIndex, callIds = [], callById = {}, dialing  } = context;
    const dialing = !!context ? context.dialing : undefined;
    //const currentCall = callById[callIds[currentCallIndex]];
    const currentCallInfo = operatorConsoleAsParent.getPhoneClient().getCallInfos().getCurrentCallInfo();
    return (
        <CallPanel
            operatorConsoleAsParent={operatorConsoleAsParent}
            currentCallInfo = {currentCallInfo}
            dialing={dialing}
            borderRadius={borderRadius}
            callpanelBgColor={callpanelBgColor}
            callpanelFgColor={callpanelFgColor}
            outsideShadow_horizontalOffset={outsideShadow_horizontalOffset}
            outsideShadow_verticalOffset={outsideShadow_verticalOffset}
            outsideShadow_blur={outsideShadow_blur}
            outsideShadow_spread={outsideShadow_spread}
            outsideShadow_color={outsideShadow_color}
            insideShadow_horizontalOffset={insideShadow_horizontalOffset}
            insideShadow_verticalOffset={insideShadow_verticalOffset}
            insideShadow_blur={insideShadow_blur}
            insideShadow_spread={insideShadow_spread}
            insideShadow_color={insideShadow_color}
            isEditMode={!context}
        />
    );
}
function LegacyUccacWidget({ operatorConsoleAsParent, uccacWrapper, borderRadius, uccacwidgetBgColor, uccacwidgetFgColor,
                               outsideShadow_horizontalOffset, outsideShadow_verticalOffset, outsideShadow_blur,  outsideShadow_spread, outsideShadow_color,
                               insideShadow_horizontalOffset,insideShadow_verticalOffset, insideShadow_blur,  insideShadow_spread, insideShadow_color,
                               context  }) {
    return (
        <UccacWidget
            operatorConsoleAsParent={operatorConsoleAsParent}
            uccacWrapper={uccacWrapper}
            borderRadius={borderRadius}
            uccacwidgetBgColor={uccacwidgetBgColor}
            uccacwidgetFgColor={uccacwidgetFgColor}
            outsideShadow_horizontalOffset={outsideShadow_horizontalOffset}
            outsideShadow_verticalOffset={outsideShadow_verticalOffset}
            outsideShadow_blur={outsideShadow_blur}
            outsideShadow_spread={outsideShadow_spread}
            outsideShadow_color={outsideShadow_color}
            insideShadow_horizontalOffset={insideShadow_horizontalOffset}
            insideShadow_verticalOffset={insideShadow_verticalOffset}
            insideShadow_blur={insideShadow_blur}
            insideShadow_spread={insideShadow_spread}
            insideShadow_color={insideShadow_color}
            context={context}
        />
    );
}
//!later
function LegacyExtensionStatus({ extension, exStatusFgColor, context = {} }) {
    const { extensions = [], extensionsStatus = {} } = context;
    const ext = extensions.find(({id}) => id == extension);
    const status = Object.values(extensionsStatus?.[ext?.id]?.callStatus || {});
    const color = Util.isAntdRgbaProperty( exStatusFgColor  ) ? Util.getRgbaCSSStringFromAntdColor( exStatusFgColor ) : "";
    return (
        <div className="led-box" style={{
            color:color,
        }}>
            <div className={
                (status.find(s => s === 'talking') && 'led-red') ||
                (status.find(s => ['holding', 'calling', 'ringing'].includes(s)) && 'led-yellow') ||
                (extensionsStatus?.[ext?.id]?.registered ? 'led-green' : 'led-grey')
            }></div>
            <p>{ext?.name || extension || i18n.t("extension_status")}</p>
        </div>
    );
}

function LegacyCallTalkingButton({ operatorConsoleAsParent, subtype, icon, label, buttonFgColor, buttonBgColor, buttonOuterBorderColor, buttonOuterBorderRadius, buttonOuterBorderThickness, context = {}}) {
    //const { currentCallIndex, callIds = [], callById = {} } = context;
    //const currentCall = callById[callIds[currentCallIndex]];
    const currentCallInfo = operatorConsoleAsParent.getPhoneClient().getCallInfos().getCurrentCallInfo();

    const color = Util.isAntdRgbaProperty( buttonFgColor  ) ? Util.getRgbaCSSStringFromAntdColor( buttonFgColor ) : "";
    const backgroundColor = Util.isAntdRgbaProperty( buttonBgColor ) ? Util.getRgbaCSSStringFromAntdColor( buttonBgColor ) : "";
    const border = Util.isNumeric( buttonOuterBorderThickness ) && Util.isAntdRgbaProperty( buttonOuterBorderColor) ?
        "solid " + buttonOuterBorderThickness + "px " + Util.getRgbaCSSStringFromAntdColor( buttonOuterBorderColor )  : "";
    const borderRadius = Util.isNumber( buttonOuterBorderRadius ) ? buttonOuterBorderRadius + "px" : "";
    const iconJsx = getIconJsx( icon, label );
    return (
        <button title={i18n.t(`legacy_button_description.${subtype}`)}  className=
            {
                clsx(
                    "kbc-button kbc-button-fill-parent",
                    currentCallInfo?.getIsAnswered() && !currentCallInfo?.getIsHolding() && 'kbc-button-danger'
                )
            }
                style={{
                    border:border,
                    borderRadius:borderRadius,
                    color:color,
                    backgroundColor:backgroundColor
                }}
        >{iconJsx}</button>
    );
}
// function LegacyIsExtensionButton({ subtype, icon, label, context = {} }) {
//   const { currentCallIndex, callIds = [], callById = {} } = context;
//   const currentCall = callById[callIds[currentCallIndex]];
//   return (
//     <button title={i18n.t(`legacy_button_description.${subtype}`)}  className={clsx(
//         "kbc-button kbc-button-fill-parent",
//         currentCall?._isExtension && (
//           currentCall?.answered
//             ? 'kbc-button-danger'
//             : 'kbc-button-danger-flash'
//         )
//       )}>{icon ? <FontAwesomeIcon size="lg" icon={icon}/> : label}</button>
//   );
// }
function LegacyNoAnswerButton({ operatorConsoleAsParent, subtype, icon, label, buttonFgColor, buttonBgColor, buttonOuterBorderColor, buttonOuterBorderRadius, buttonOuterBorderThickness, context = {}}) {
    const color = Util.isAntdRgbaProperty( buttonFgColor  ) ? Util.getRgbaCSSStringFromAntdColor( buttonFgColor ) : "";
    const backgroundColor = Util.isAntdRgbaProperty( buttonBgColor ) ? Util.getRgbaCSSStringFromAntdColor( buttonBgColor ) : "";
    const border = Util.isNumeric( buttonOuterBorderThickness ) && Util.isAntdRgbaProperty( buttonOuterBorderColor) ?
        "solid " + buttonOuterBorderThickness + "px " + Util.getRgbaCSSStringFromAntdColor( buttonOuterBorderColor )  : "";
    const borderRadius = Util.isNumber( buttonOuterBorderRadius ) ? buttonOuterBorderRadius + "px" : "";
    const iconJsx = getIconJsx( icon, label );
    return (
        <button title={i18n.t(`legacy_button_description.${subtype}`)}  className={clsx("kbc-button kbc-button-fill-parent", context.autoRejectIncoming && 'kbc-button-danger')}
                style={{
                    border:border,
                    borderRadius:borderRadius,
                    color:color,
                    backgroundColor:backgroundColor
                }}
                onClick={context.toggleAutoRejectIncoming}>{iconJsx}</button>
    );
}
function LegacyCallbackButton({ operatorConsoleAsParent, subtype, icon, label, buttonFgColor, buttonBgColor, buttonOuterBorderColor, buttonOuterBorderRadius, buttonOuterBorderThickness }) {
    const color = Util.isAntdRgbaProperty( buttonFgColor  ) ? Util.getRgbaCSSStringFromAntdColor( buttonFgColor ) : "";
    const backgroundColor = Util.isAntdRgbaProperty( buttonBgColor ) ? Util.getRgbaCSSStringFromAntdColor( buttonBgColor ) : "";
    const border = Util.isNumeric( buttonOuterBorderThickness ) && Util.isAntdRgbaProperty( buttonOuterBorderColor) ?
        "solid " + buttonOuterBorderThickness + "px " + Util.getRgbaCSSStringFromAntdColor( buttonOuterBorderColor )  : "";
    const borderRadius = Util.isNumber( buttonOuterBorderRadius ) ? buttonOuterBorderRadius + "px" : "";
    const iconJsx = getIconJsx( icon, label );
    return (
        <button title={i18n.t(`legacy_button_description.${subtype}`)}  className="kbc-button kbc-button-fill-parent"   //!todo implement
                style={{
                    border:border,
                    borderRadius:borderRadius,
                    color:color,
                    backgroundColor:backgroundColor
                }}
        >{iconJsx}</button>
    );
}
function LegacyTransferButton({ operatorConsoleAsParent, subtype, icon, label, buttonFgColor, buttonBgColor, buttonOuterBorderColor, buttonOuterBorderRadius, buttonOuterBorderThickness, context ={} }) {
    const color = Util.isAntdRgbaProperty( buttonFgColor  ) ? Util.getRgbaCSSStringFromAntdColor( buttonFgColor ) : "";
    const backgroundColor = Util.isAntdRgbaProperty( buttonBgColor ) ? Util.getRgbaCSSStringFromAntdColor( buttonBgColor ) : "";
    const border = Util.isNumeric( buttonOuterBorderThickness ) && Util.isAntdRgbaProperty( buttonOuterBorderColor) ?
        "solid " + buttonOuterBorderThickness + "px " + Util.getRgbaCSSStringFromAntdColor( buttonOuterBorderColor )  : "";
    const borderRadius = Util.isNumber( buttonOuterBorderRadius ) ? buttonOuterBorderRadius + "px" : "";
    const iconJsx = getIconJsx( icon, label );
    return (
        // <button title={i18n.t(`legacy_button_description.${subtype}`)} onClick={ () => context.operatorConsole.transferDialingCall() } className="kbc-button kbc-button-fill-parent"
        <button title={i18n.t(`legacy_button_description.${subtype}`)} onClick={ () => operatorConsoleAsParent.transferDialingCall() } className="kbc-button kbc-button-fill-parent"                style={{
            border:border,
            borderRadius:borderRadius,
            color:color,
            backgroundColor:backgroundColor
        }}
        >{iconJsx}</button>
    );
}

function LegacyToggleRecordingButton({ operatorConsoleAsParent, subtype, icon, label, buttonFgColor, buttonBgColor, buttonOuterBorderColor, buttonOuterBorderRadius, buttonOuterBorderThickness, context = {}}) {
    //const { currentCallIndex, callIds = [], callById = {} } = context;
    //const currentCall = callById[callIds[currentCallIndex]];
    const currentCallInfo = operatorConsoleAsParent.getPhoneClient().getCallInfos().getCurrentCallInfo();

    const color = Util.isAntdRgbaProperty( buttonFgColor  ) ? Util.getRgbaCSSStringFromAntdColor( buttonFgColor ) : "";
    const backgroundColor = Util.isAntdRgbaProperty( buttonBgColor ) ? Util.getRgbaCSSStringFromAntdColor( buttonBgColor ) : "";
    const border = Util.isNumeric( buttonOuterBorderThickness ) && Util.isAntdRgbaProperty( buttonOuterBorderColor) ?
        "solid " + buttonOuterBorderThickness + "px " + Util.getRgbaCSSStringFromAntdColor( buttonOuterBorderColor )  : "";
    const borderRadius = Util.isNumber( buttonOuterBorderRadius ) ? buttonOuterBorderRadius + "px" : "";
    const iconJsx = getIconJsx( icon, label );
    return (
        <button title={i18n.t(`legacy_button_description.${subtype}`)}  className={clsx("kbc-button kbc-button-fill-parent", currentCallInfo?.getIsRecording() && 'kbc-button-danger')}
                style={{
                    border:border,
                    borderRadius:borderRadius,
                    color:color,
                    backgroundColor:backgroundColor
                }}
                onClick={ () =>{
                    context.toggleCallRecording();
                }}
        >{iconJsx}</button>
    );
}
function LegacyAlarmButton({ operatorConsoleAsParent, subtype, icon, label, buttonFgColor, buttonBgColor, buttonOuterBorderColor, buttonOuterBorderRadius, buttonOuterBorderThickness }) {
    const color = Util.isAntdRgbaProperty( buttonFgColor  ) ? Util.getRgbaCSSStringFromAntdColor( buttonFgColor ) : "";
    const backgroundColor = Util.isAntdRgbaProperty( buttonBgColor ) ? Util.getRgbaCSSStringFromAntdColor( buttonBgColor ) : "";
    const border = Util.isNumeric( buttonOuterBorderThickness ) && Util.isAntdRgbaProperty( buttonOuterBorderColor) ?
        "solid " + buttonOuterBorderThickness + "px " + Util.getRgbaCSSStringFromAntdColor( buttonOuterBorderColor )  : "";
    const borderRadius = Util.isNumber( buttonOuterBorderRadius ) ? buttonOuterBorderRadius + "px" : "";
    const iconJsx = getIconJsx( icon, label );
    return (
        <button title={i18n.t(`legacy_button_description.${subtype}`)}  className="kbc-button kbc-button-fill-parent"   //!todo implement
                style={{
                    border:border,
                    borderRadius:borderRadius,
                    color:color,
                    backgroundColor:backgroundColor
                }}
        >{iconJsx}</button>
    );
}
function LegacyPrevCallButton({ operatorConsoleAsParent, subtype, icon, label, buttonFgColor, buttonBgColor, buttonOuterBorderColor, buttonOuterBorderRadius, buttonOuterBorderThickness, context = {}}) {
    //const { currentCallIndex, callIds = [] } = context;
    const callInfos = operatorConsoleAsParent.getPhoneClient().getCallInfos();
    const currentCallIndex = callInfos.getCurrentCallIndex();
    const callInfoCount = callInfos.getCallInfoCount();
    const color = Util.isAntdRgbaProperty( buttonFgColor  ) ? Util.getRgbaCSSStringFromAntdColor( buttonFgColor ) : "";
    const backgroundColor = Util.isAntdRgbaProperty( buttonBgColor ) ? Util.getRgbaCSSStringFromAntdColor( buttonBgColor ) : "";
    const border = Util.isNumeric( buttonOuterBorderThickness ) && Util.isAntdRgbaProperty( buttonOuterBorderColor) ?
        "solid " + buttonOuterBorderThickness + "px " + Util.getRgbaCSSStringFromAntdColor( buttonOuterBorderColor )  : "";
    const borderRadius = Util.isNumber( buttonOuterBorderRadius ) ? buttonOuterBorderRadius + "px" : "";
    const iconJsx = getIconJsx( icon, label );
    return (
        <button title={i18n.t(`legacy_button_description.${subtype}`)}  className={clsx("kbc-button kbc-button-fill-parent", currentCallIndex > 0 && "kbc-button-danger-flash")}
                style={{
                    border:border,
                    borderRadius:borderRadius,
                    color:color,
                    backgroundColor:backgroundColor
                }}
                onClick={(!callInfoCount || currentCallIndex === 0) ? undefined : context.switchCallUp}
        >
            {iconJsx}
        </button>
    );
}
function LegacyMonitorDialingExtensionButton({ operatorConsoleAsParent, subtype, icon, label, buttonFgColor, buttonBgColor, buttonOuterBorderColor, buttonOuterBorderRadius, buttonOuterBorderThickness, context = {} }) {
    const color = Util.isAntdRgbaProperty( buttonFgColor  ) ? Util.getRgbaCSSStringFromAntdColor( buttonFgColor ) : "";
    const backgroundColor = Util.isAntdRgbaProperty( buttonBgColor ) ? Util.getRgbaCSSStringFromAntdColor( buttonBgColor ) : "";
    const border = Util.isNumeric( buttonOuterBorderThickness ) && Util.isAntdRgbaProperty( buttonOuterBorderColor) ?
        "solid " + buttonOuterBorderThickness + "px " + Util.getRgbaCSSStringFromAntdColor( buttonOuterBorderColor )  : "";
    const borderRadius = Util.isNumber( buttonOuterBorderRadius ) ? buttonOuterBorderRadius + "px" : "";
    const iconJsx = getIconJsx( icon, label );
    return (
        <button title={i18n.t(`legacy_button_description.${subtype}`)} className="kbc-button kbc-button-fill-parent"
                style={{
                    border:border,
                    borderRadius:borderRadius,
                    color:color,
                    backgroundColor:backgroundColor
                }}
                onClick={context.monitorDialingExtension}>{iconJsx}</button>
    );
}
function LegacyStationLineDesignationButton({ operatorConsoleAsParent, subtype, icon, label, buttonFgColor, buttonBgColor, buttonOuterBorderColor, buttonOuterBorderRadius, buttonOuterBorderThickness }) {
    const color = Util.isAntdRgbaProperty( buttonFgColor  ) ? Util.getRgbaCSSStringFromAntdColor( buttonFgColor ) : "";
    const backgroundColor = Util.isAntdRgbaProperty( buttonBgColor ) ? Util.getRgbaCSSStringFromAntdColor( buttonBgColor ) : "";
    const border = Util.isNumeric( buttonOuterBorderThickness ) && Util.isAntdRgbaProperty( buttonOuterBorderColor) ?
        "solid " + buttonOuterBorderThickness + "px " + Util.getRgbaCSSStringFromAntdColor( buttonOuterBorderColor )  : "";
    const borderRadius = Util.isNumber( buttonOuterBorderRadius ) ? buttonOuterBorderRadius + "px" : "";
    const iconJsx = getIconJsx( icon, label );
    return (
        <button title={i18n.t(`legacy_button_description.${subtype}`)}  className="kbc-button kbc-button-fill-parent"   //!todo implement
                style={{
                    border:border,
                    borderRadius:borderRadius,
                    color:color,
                    backgroundColor:backgroundColor
                }}
        >{iconJsx}</button>
    );
}
function LegacyParkCallButton({ operatorConsoleAsParent, subtype, icon, label, number, buttonFgColor, buttonBgColor, buttonOuterBorderColor, buttonOuterBorderRadius, buttonOuterBorderThickness, context = {} }) {
    const { myParksStatus = {}, parksStatus = {} } = context;
    const light = myParksStatus[number] ? 'kbc-button-success-flash-slow' : parksStatus[number] ? 'kbc-button-danger-flash-slow' : '';
    const color = Util.isAntdRgbaProperty( buttonFgColor  ) ? Util.getRgbaCSSStringFromAntdColor( buttonFgColor ) : "";
    const backgroundColor = Util.isAntdRgbaProperty( buttonBgColor ) ? Util.getRgbaCSSStringFromAntdColor( buttonBgColor ) : "";
    const border = Util.isNumeric( buttonOuterBorderThickness ) && Util.isAntdRgbaProperty( buttonOuterBorderColor) ?
        "solid " + buttonOuterBorderThickness + "px " + Util.getRgbaCSSStringFromAntdColor( buttonOuterBorderColor )  : "";
    const borderRadius = Util.isNumber( buttonOuterBorderRadius ) ? buttonOuterBorderRadius + "px" : "";
    const iconJsx = getIconJsx( icon, label );
    return (
        <button title={i18n.t(`legacy_button_description.${subtype}`)}  className={clsx("kbc-button kbc-button-fill-parent", light)}
                style={{
                    border:border,
                    borderRadius:borderRadius,
                    color:color,
                    backgroundColor:backgroundColor
                }}
                onClick={() => context?.handlePark(number)}>{iconJsx}</button>
    );
}
function LegacySeriesSetButton({ operatorConsoleAsParent, subtype, icon, label, buttonFgColor, buttonBgColor, buttonOuterBorderColor, buttonOuterBorderRadius, buttonOuterBorderThickness }) {
    const color = Util.isAntdRgbaProperty( buttonFgColor  ) ? Util.getRgbaCSSStringFromAntdColor( buttonFgColor ) : "";
    const backgroundColor = Util.isAntdRgbaProperty( buttonBgColor ) ? Util.getRgbaCSSStringFromAntdColor( buttonBgColor ) : "";
    const border = Util.isNumeric( buttonOuterBorderThickness ) && Util.isAntdRgbaProperty( buttonOuterBorderColor) ?
        "solid " + buttonOuterBorderThickness + "px " + Util.getRgbaCSSStringFromAntdColor( buttonOuterBorderColor )  : "";
    const borderRadius = Util.isNumber( buttonOuterBorderRadius ) ? buttonOuterBorderRadius + "px" : "";
    const iconJsx = getIconJsx( icon, label );
    return (
        <button title={i18n.t(`legacy_button_description.${subtype}`)}  className="kbc-button kbc-button-fill-parent"   //!todo implement
                style={{
                    border:border,
                    borderRadius:borderRadius,
                    color:color,
                    backgroundColor:backgroundColor
                }}
        >{iconJsx}</button>
    );
}
function LegacyMonitoringCallButton({ operatorConsoleAsParent, subtype, icon, label, buttonFgColor, buttonBgColor, buttonOuterBorderColor, buttonOuterBorderRadius, buttonOuterBorderThickness, context = {}}) {
    const color = Util.isAntdRgbaProperty( buttonFgColor  ) ? Util.getRgbaCSSStringFromAntdColor( buttonFgColor ) : "";
    const backgroundColor = Util.isAntdRgbaProperty( buttonBgColor ) ? Util.getRgbaCSSStringFromAntdColor( buttonBgColor ) : "";
    const border = Util.isNumeric( buttonOuterBorderThickness ) && Util.isAntdRgbaProperty( buttonOuterBorderColor) ?
        "solid " + buttonOuterBorderThickness + "px " + Util.getRgbaCSSStringFromAntdColor( buttonOuterBorderColor )  : "";
    const borderRadius = Util.isNumber( buttonOuterBorderRadius ) ? buttonOuterBorderRadius + "px" : "";
    const iconJsx = getIconJsx( icon, label );
    return (
        <button title={i18n.t(`legacy_button_description.${subtype}`)}  className={clsx("kbc-button kbc-button-fill-parent", !!context.monitoringExtension && 'kbc-button-danger')} //!todo implement
                style={{
                    border:border,
                    borderRadius:borderRadius,
                    color:color,
                    backgroundColor:backgroundColor
                }}
        >{iconJsx}</button>
    );
}
function LegacyStartButton({ operatorConsoleAsParent, subtype, icon, label, buttonFgColor, buttonBgColor, buttonOuterBorderColor, buttonOuterBorderRadius, buttonOuterBorderThickness }) {
    const color = Util.isAntdRgbaProperty( buttonFgColor  ) ? Util.getRgbaCSSStringFromAntdColor( buttonFgColor ) : "";
    const backgroundColor = Util.isAntdRgbaProperty( buttonBgColor ) ? Util.getRgbaCSSStringFromAntdColor( buttonBgColor ) : "";
    const border = Util.isNumeric( buttonOuterBorderThickness ) && Util.isAntdRgbaProperty( buttonOuterBorderColor) ?
        "solid " + buttonOuterBorderThickness + "px " + Util.getRgbaCSSStringFromAntdColor( buttonOuterBorderColor )  : "";
    const borderRadius = Util.isNumber( buttonOuterBorderRadius ) ? buttonOuterBorderRadius + "px" : "";
    const iconJsx = getIconJsx( icon, label );
    return (
        <button title={i18n.t(`legacy_button_description.${subtype}`)}  className="kbc-button kbc-button-fill-parent"   //!todo implement
                style={{
                    border:border,
                    borderRadius:borderRadius,
                    color:color,
                    backgroundColor:backgroundColor
                }}
        >{iconJsx}</button>
    );
}
function LegacyToggleMutedButton({ operatorConsoleAsParent, subtype, icon, label, buttonFgColor, buttonBgColor, buttonOuterBorderColor, buttonOuterBorderRadius, buttonOuterBorderThickness, context = {}}) {
    //const { currentCallIndex, callIds = [], callById = {} } = context;
    //const currentCall = callById[callIds[currentCallIndex]];
    const currentCallInfo = operatorConsoleAsParent.getPhoneClient().getCallInfos().getCurrentCallInfo();
    const color = Util.isAntdRgbaProperty( buttonFgColor  ) ? Util.getRgbaCSSStringFromAntdColor( buttonFgColor ) : "";
    const backgroundColor = Util.isAntdRgbaProperty( buttonBgColor ) ? Util.getRgbaCSSStringFromAntdColor( buttonBgColor ) : "";
    const border = Util.isNumeric( buttonOuterBorderThickness ) && Util.isAntdRgbaProperty( buttonOuterBorderColor) ?
        "solid " + buttonOuterBorderThickness + "px " + Util.getRgbaCSSStringFromAntdColor( buttonOuterBorderColor )  : "";
    const borderRadius = Util.isNumber( buttonOuterBorderRadius ) ? buttonOuterBorderRadius + "px" : "";
    const iconJsx = getIconJsx( icon, label );
    return (
        <button title={i18n.t(`legacy_button_description.${subtype}`)}  className={clsx("kbc-button kbc-button-fill-parent", currentCallInfo?.getIsMuted() && 'kbc-button-danger')}
                style={{
                    border:border,
                    borderRadius:borderRadius,
                    color:color,
                    backgroundColor:backgroundColor
                }}
                onClick={(!currentCallInfo) ? undefined : context.toggleCallMuted}>{iconJsx}</button>
    );
}
function LegacyLeavingSeatButton({ operatorConsoleAsParent, subtype, icon, label, buttonFgColor, buttonBgColor, buttonOuterBorderColor, buttonOuterBorderRadius, buttonOuterBorderThickness  }) {
    const color = Util.isAntdRgbaProperty( buttonFgColor  ) ? Util.getRgbaCSSStringFromAntdColor( buttonFgColor ) : "";
    const backgroundColor = Util.isAntdRgbaProperty( buttonBgColor ) ? Util.getRgbaCSSStringFromAntdColor( buttonBgColor ) : "";
    const border = Util.isNumeric( buttonOuterBorderThickness ) && Util.isAntdRgbaProperty( buttonOuterBorderColor) ?
        "solid " + buttonOuterBorderThickness + "px " + Util.getRgbaCSSStringFromAntdColor( buttonOuterBorderColor )  : "";
    const borderRadius = Util.isNumber( buttonOuterBorderRadius ) ? buttonOuterBorderRadius + "px" : "";
    const iconJsx = getIconJsx( icon, label );
    return (
        <button title={i18n.t(`legacy_button_description.${subtype}`)}  className="kbc-button kbc-button-fill-parent"   //!todo implement
                style={{
                    border:border,
                    borderRadius:borderRadius,
                    color:color,
                    backgroundColor:backgroundColor
                }}
        >{iconJsx}</button>
    );
}
function LegacyNightTimeButton({ operatorConsoleAsParent, subtype, icon, label, buttonFgColor, buttonBgColor, buttonOuterBorderColor, buttonOuterBorderRadius, buttonOuterBorderThickness  }) {
    const color = Util.isAntdRgbaProperty( buttonFgColor  ) ? Util.getRgbaCSSStringFromAntdColor( buttonFgColor ) : "";
    const backgroundColor = Util.isAntdRgbaProperty( buttonBgColor ) ? Util.getRgbaCSSStringFromAntdColor( buttonBgColor ) : "";
    const border = Util.isNumeric( buttonOuterBorderThickness ) && Util.isAntdRgbaProperty( buttonOuterBorderColor) ?
        "solid " + buttonOuterBorderThickness + "px " + Util.getRgbaCSSStringFromAntdColor( buttonOuterBorderColor )  : "";
    const borderRadius = Util.isNumber( buttonOuterBorderRadius ) ? buttonOuterBorderRadius + "px" : "";
    const iconJsx = getIconJsx( icon, label );
    return (
        <button title={i18n.t(`legacy_button_description.${subtype}`)}  className="kbc-button kbc-button-fill-parent"   //!todo implement
                style={{
                    border:border,
                    borderRadius:borderRadius,
                    color:color,
                    backgroundColor:backgroundColor
                }}
        >{iconJsx}</button>
    );
}
function LegacyAvailableButton({ operatorConsoleAsParent, subtype, icon, label, buttonFgColor, buttonBgColor, buttonOuterBorderColor, buttonOuterBorderRadius, buttonOuterBorderThickness }) {
    const color = Util.isAntdRgbaProperty( buttonFgColor  ) ? Util.getRgbaCSSStringFromAntdColor( buttonFgColor ) : "";
    const backgroundColor = Util.isAntdRgbaProperty( buttonBgColor ) ? Util.getRgbaCSSStringFromAntdColor( buttonBgColor ) : "";
    const border = Util.isNumeric( buttonOuterBorderThickness ) && Util.isAntdRgbaProperty( buttonOuterBorderColor) ?
        "solid " + buttonOuterBorderThickness + "px " + Util.getRgbaCSSStringFromAntdColor( buttonOuterBorderColor )  : "";
    const borderRadius = Util.isNumber( buttonOuterBorderRadius ) ? buttonOuterBorderRadius + "px" : "";
    const iconJsx = getIconJsx( icon, label );
    return (
        <button title={i18n.t(`legacy_button_description.${subtype}`)}  className="kbc-button kbc-button-fill-parent"   //!todo impelement
                style={{
                    border:border,
                    borderRadius:borderRadius,
                    color:color,
                    backgroundColor:backgroundColor
                }}
        >{iconJsx}</button>
    );
}
function LegacyNextCallButton({ operatorConsoleAsParent, subtype, icon, label, buttonFgColor, buttonBgColor, buttonOuterBorderColor, buttonOuterBorderRadius, buttonOuterBorderThickness, context = {}}) {
    //const { currentCallIndex, callIds = [] } = context;
    const callInfos = operatorConsoleAsParent.getPhoneClient().getCallInfos();
    const currentCallIndex = callInfos.getCurrentCallIndex();
    const callInfoCount = callInfos.getCallInfoCount();
    const color = Util.isAntdRgbaProperty( buttonFgColor  ) ? Util.getRgbaCSSStringFromAntdColor( buttonFgColor ) : "";
    const backgroundColor = Util.isAntdRgbaProperty( buttonBgColor ) ? Util.getRgbaCSSStringFromAntdColor( buttonBgColor ) : "";
    const border = Util.isNumeric( buttonOuterBorderThickness ) && Util.isAntdRgbaProperty( buttonOuterBorderColor) ?
        "solid " + buttonOuterBorderThickness + "px " + Util.getRgbaCSSStringFromAntdColor( buttonOuterBorderColor )  : "";
    const borderRadius = Util.isNumber( buttonOuterBorderRadius ) ? buttonOuterBorderRadius + "px" : "";
    const iconJsx = getIconJsx( icon, label );
    return (
        <button title={i18n.t(`legacy_button_description.${subtype}`)}  className={clsx("kbc-button kbc-button-fill-parent", (currentCallIndex < callInfoCount - 1) && "kbc-button-danger-flash")}
                style={{
                    border:border,
                    borderRadius:borderRadius,
                    color:color,
                    backgroundColor:backgroundColor
                }}
                onClick={(!callInfoCount || currentCallIndex === callInfoCount - 1) ? undefined : context.switchCallDown}>
            {iconJsx}
        </button>
    );
}
function LegacyLineButton({ operatorConsoleAsParent, subtype, icon, label, line, buttonFgColor, buttonBgColor, buttonOuterBorderColor, buttonOuterBorderRadius, buttonOuterBorderThickness, context = {} }) {
    const callInfos = operatorConsoleAsParent.getPhoneClient().getCallInfos();
    const { myParksStatus = {}, linesStatus = {}, parksStatus = {}, loginUser } = context;
    const { line_talker, room_id, status } = linesStatus[line] || {};
    let light = '';
    if (status === 'on') {
        const callInfo = room_id ? callInfos.getCallInfoWherePbxRoomIdEqual( room_id )  : null;
        const park = parksStatus[line];

        if (line_talker === loginUser?.pbxUsername) {
            light = 'kbc-button-success-flash';
        } else if (park) {
            light = myParksStatus[line] ? 'kbc-button-success-flash-slow' : 'kbc-button-danger-flash-slow';
        } else if (callInfo) {
            if (callInfo?.getIsIncoming() && !callInfo?.getIsAnswered() ) {
                light = 'kbc-button-danger-flash'
            } else {
                light = 'kbc-button-success'
            }
        } else {
            light = 'kbc-button-danger'
        }
    }
    const color = Util.isAntdRgbaProperty( buttonFgColor  ) ? Util.getRgbaCSSStringFromAntdColor( buttonFgColor ) : "";
    const backgroundColor = Util.isAntdRgbaProperty( buttonBgColor ) ? Util.getRgbaCSSStringFromAntdColor( buttonBgColor ) : "";
    const border = Util.isNumeric( buttonOuterBorderThickness ) && Util.isAntdRgbaProperty( buttonOuterBorderColor) ?
        "solid " + buttonOuterBorderThickness + "px " + Util.getRgbaCSSStringFromAntdColor( buttonOuterBorderColor )  : "";
    const borderRadius = Util.isNumber( buttonOuterBorderRadius ) ? buttonOuterBorderRadius + "px" : "";
    const iconJsx = getIconJsx( icon, label );
    return (
        <button title={i18n.t(`legacy_button_description.${subtype}`)}
                className={clsx("kbc-button kbc-button-fill-parent", light)}
                style={{
                    border:border,
                    borderRadius:borderRadius,
                    color:color,
                    backgroundColor:backgroundColor
                }}
                onClick={() => context.handleLine(line)}
        >
            {iconJsx}
        </button>
    );
}
function LegacyKeypadButton({ operatorConsoleAsParent, subtype, icon,  symbol, buttonFgColor, buttonBgColor, buttonOuterBorderColor, buttonOuterBorderRadius, buttonOuterBorderThickness, context = {} }) {
    const color = Util.isAntdRgbaProperty( buttonFgColor  ) ? Util.getRgbaCSSStringFromAntdColor( buttonFgColor ) : "";
    const backgroundColor = Util.isAntdRgbaProperty( buttonBgColor ) ? Util.getRgbaCSSStringFromAntdColor( buttonBgColor ) : "";
    const border = Util.isNumeric( buttonOuterBorderThickness ) && Util.isAntdRgbaProperty( buttonOuterBorderColor) ?
        "solid " + buttonOuterBorderThickness + "px " + Util.getRgbaCSSStringFromAntdColor( buttonOuterBorderColor )  : "";
    const borderRadius = Util.isNumber( buttonOuterBorderRadius ) ? buttonOuterBorderRadius + "px" : "";
    const iconJsx = getIconJsx( icon, symbol );
    return (
        <button title={i18n.t(`legacy_button_description.${subtype}`)} className="kbc-button kbc-button-fill-parent"
                style={{
                    border:border,
                    borderRadius:borderRadius,
                    color:color,
                    backgroundColor:backgroundColor
                }}
                onClick={
                    () => {
                        let sDialing = _getQuickCallDialingBySymbol( symbol, context.currentScreenQuickCallWidget );
                        if( sDialing ) {
                            context.setDialingAndMakeCall( sDialing, context );
                        }
                        else{
                            context.appendKeypadValue(symbol);
                        }
                    }
                }>{iconJsx}</button>
    );
}

function _getQuickCallDialingBySymbol( symbol, quickCallWidget ){
    if( !quickCallWidget ){
        return null;
    }
    if( symbol === '0' ) return quickCallWidget.keypad_zero;
    if( symbol === '1' ) return quickCallWidget.keypad_one;
    if( symbol === '2' ) return quickCallWidget.keypad_two;
    if( symbol === '3' ) return quickCallWidget.keypad_three;
    if( symbol === '4' ) return quickCallWidget.keypad_four;
    if( symbol === '5' ) return quickCallWidget.keypad_five;
    if( symbol === '6' ) return quickCallWidget.keypad_six;
    if( symbol === '7' ) return quickCallWidget.keypad_seven;
    if( symbol === '8' ) return quickCallWidget.keypad_eight;
    if( symbol === '9' ) return quickCallWidget.keypad_nine;
    if( symbol === '*' ) return quickCallWidget.keypad_asterisk;
    if( symbol === '#' ) return quickCallWidget.keypad_sharp;
    return null;
}

function LegacyMakeCallButton({ operatorConsoleAsParent, subtype, icon, label, buttonFgColor, buttonBgColor, buttonOuterBorderColor, buttonOuterBorderRadius, buttonOuterBorderThickness, context = {}}) {
    const color = Util.isAntdRgbaProperty( buttonFgColor  ) ? Util.getRgbaCSSStringFromAntdColor( buttonFgColor ) : "";
    const backgroundColor = Util.isAntdRgbaProperty( buttonBgColor ) ? Util.getRgbaCSSStringFromAntdColor( buttonBgColor ) : "";
    const border = Util.isNumeric( buttonOuterBorderThickness ) && Util.isAntdRgbaProperty( buttonOuterBorderColor) ?
        "solid " + buttonOuterBorderThickness + "px " + Util.getRgbaCSSStringFromAntdColor( buttonOuterBorderColor )  : "";
    const borderRadius = Util.isNumber( buttonOuterBorderRadius ) ? buttonOuterBorderRadius + "px" : "";
    const iconJsx = getIconJsx( icon, label );
    return (
        <button title={i18n.t(`legacy_button_description.${subtype}`)} className="kbc-button kbc-button-fill-parent"
                style={{
                    border:border,
                    borderRadius:borderRadius,
                    color:color,
                    backgroundColor:backgroundColor
                }}
                onClick={ () => {
                    if( operatorConsoleAsParent.getIsDTMFInput() !== true ) {
                        context.makeCallWithShortDial( context );
                    }
                }
                }>
            {iconJsx}
        </button>
    );
}
function LegacyBackspaceButton({ operatorConsoleAsParent, subtype, icon, label, buttonFgColor, buttonBgColor, buttonOuterBorderColor, buttonOuterBorderRadius, buttonOuterBorderThickness, context = {} }) {
    //const { currentCallIndex, callIds = [], callById = {} } = context;
    //const currentCall = callById[callIds[currentCallIndex]];
    const color = Util.isAntdRgbaProperty( buttonFgColor  ) ? Util.getRgbaCSSStringFromAntdColor( buttonFgColor ) : "";
    const backgroundColor = Util.isAntdRgbaProperty( buttonBgColor ) ? Util.getRgbaCSSStringFromAntdColor( buttonBgColor ) : "";
    const border = Util.isNumeric( buttonOuterBorderThickness ) && Util.isAntdRgbaProperty( buttonOuterBorderColor) ?
        "solid " + buttonOuterBorderThickness + "px " + Util.getRgbaCSSStringFromAntdColor( buttonOuterBorderColor )  : "";
    const borderRadius = Util.isNumber( buttonOuterBorderRadius ) ? buttonOuterBorderRadius + "px" : "";
    const iconJsx = getIconJsx( icon, label );
    return (
        <button title={i18n.t(`legacy_button_description.${subtype}`)} className="kbc-button kbc-button-fill-parent"
                style={{
                    border:border,
                    borderRadius:borderRadius,
                    color:color,
                    backgroundColor:backgroundColor
                }}
                onClick={context.backspaceKeypadValue}>
            {iconJsx}
        </button>
    );
}
function LegacyIncomingCallButton({ operatorConsoleAsParent, subtype, icon, label, buttonFgColor, buttonBgColor, buttonOuterBorderColor, buttonOuterBorderRadius, buttonOuterBorderThickness, context = {} }) {
    //const { currentCallIndex, callIds = [], callById = {} } = context;
    //const currentCall = callById[callIds[currentCallIndex]];
    const currentCallInfo = operatorConsoleAsParent.getPhoneClient().getCallInfos().getCurrentCallInfo();
    const color = Util.isAntdRgbaProperty( buttonFgColor  ) ? Util.getRgbaCSSStringFromAntdColor( buttonFgColor ) : "";
    const backgroundColor = Util.isAntdRgbaProperty( buttonBgColor ) ? Util.getRgbaCSSStringFromAntdColor( buttonBgColor ) : "";
    const border = Util.isNumeric( buttonOuterBorderThickness ) && Util.isAntdRgbaProperty( buttonOuterBorderColor) ?
        "solid " + buttonOuterBorderThickness + "px " + Util.getRgbaCSSStringFromAntdColor( buttonOuterBorderColor )  : "";
    const borderRadius = Util.isNumber( buttonOuterBorderRadius ) ? buttonOuterBorderRadius + "px" : "";
    const iconJsx = getIconJsx( icon, label );
    return (
        <button title={i18n.t(`legacy_button_description.${subtype}`)} className={clsx("kbc-button kbc-button-fill-parent", (currentCallInfo?.getIsIncoming() && currentCallInfo?.getIsAnswered() && !currentCallInfo?.getIsHolding() ) && 'kbc-button-danger')}    //!todo implement
                style={{
                    border:border,
                    borderRadius:borderRadius,
                    color:color,
                    backgroundColor:backgroundColor
                }}
        >{iconJsx}</button>
    );
}
function LegacyThreeWayCallButton({ operatorConsoleAsParent, subtype, icon, label, buttonFgColor, buttonBgColor, buttonOuterBorderColor, buttonOuterBorderRadius, buttonOuterBorderThickness, context = {} }) {
    const color = Util.isAntdRgbaProperty( buttonFgColor  ) ? Util.getRgbaCSSStringFromAntdColor( buttonFgColor ) : "";
    const backgroundColor = Util.isAntdRgbaProperty( buttonBgColor ) ? Util.getRgbaCSSStringFromAntdColor( buttonBgColor ) : "";
    const border = Util.isNumeric( buttonOuterBorderThickness ) && Util.isAntdRgbaProperty( buttonOuterBorderColor) ?
        "solid " + buttonOuterBorderThickness + "px " + Util.getRgbaCSSStringFromAntdColor( buttonOuterBorderColor )  : "";
    const borderRadius = Util.isNumber( buttonOuterBorderRadius ) ? buttonOuterBorderRadius + "px" : "";
    const iconJsx = getIconJsx( icon, label );
    return (
        <button title={i18n.t(`legacy_button_description.${subtype}`)}  className="kbc-button kbc-button-fill-parent"
                style={{
                    border:border,
                    borderRadius:borderRadius,
                    color:color,
                    backgroundColor:backgroundColor
                }}
                onClick={context.joinConversation}>{iconJsx}</button>
    );
    /*
    return (
        <button title={i18n.t(`legacy_button_description.${subtype}`)}  className="kbc-button kbc-button-fill-parent"
                style={{
                    border:border,
                    borderRadius:borderRadius,
                    color:color,
                    backgroundColor:backgroundColor
                }}
                onClick={(!context.monitoringExtension) ? undefined : context.joinConversation}>{iconJsx}</button>
    );
     */
}
function LegacyOutgoingCallButton({ operatorConsoleAsParent, subtype, icon, label, buttonFgColor, buttonBgColor, buttonOuterBorderColor, buttonOuterBorderRadius, buttonOuterBorderThickness, context = {} }) {
    //const { currentCallIndex, callIds = [], callById = {} } = context;
    //const currentCall = callById[callIds[currentCallIndex]];
    const currentCallInfo = operatorConsoleAsParent.getPhoneClient().getCallInfos().getCurrentCallInfo();
    const color = Util.isAntdRgbaProperty( buttonFgColor  ) ? Util.getRgbaCSSStringFromAntdColor( buttonFgColor ) : "";
    const backgroundColor = Util.isAntdRgbaProperty( buttonBgColor ) ? Util.getRgbaCSSStringFromAntdColor( buttonBgColor ) : "";
    const border = Util.isNumeric( buttonOuterBorderThickness ) && Util.isAntdRgbaProperty( buttonOuterBorderColor) ?
        "solid " + buttonOuterBorderThickness + "px " + Util.getRgbaCSSStringFromAntdColor( buttonOuterBorderColor )  : "";
    const borderRadius = Util.isNumber( buttonOuterBorderRadius ) ? buttonOuterBorderRadius + "px" : "";
    const iconJsx = getIconJsx( icon, label );
    return (
        <button title={i18n.t(`legacy_button_description.${subtype}`)}  className={clsx("kbc-button kbc-button-fill-parent", (!!currentCallInfo && currentCallInfo?.getIsAnswered() && !currentCallInfo?.getIsIncoming() && !currentCallInfo?.getIsHolding()) && 'kbc-button-danger')}  //!todo implement
                style={{
                    border:border,
                    borderRadius:borderRadius,
                    color:color,
                    backgroundColor:backgroundColor
                }}
        >{iconJsx}</button>
    );
}
function LegacyHangUpCallButton({ operatorConsoleAsParent, subtype, icon, label, buttonFgColor, buttonBgColor, buttonOuterBorderColor, buttonOuterBorderRadius, buttonOuterBorderThickness, context = {} }) {
    //const { currentCallIndex, callIds = [], callById = {} } = context;
    //const currentCall = callById[callIds[currentCallIndex]];
    const currentCallInfo = operatorConsoleAsParent.getPhoneClient().getCallInfos().getCurrentCallInfo();
    const color = Util.isAntdRgbaProperty( buttonFgColor  ) ? Util.getRgbaCSSStringFromAntdColor( buttonFgColor ) : "";
    const backgroundColor = Util.isAntdRgbaProperty( buttonBgColor ) ? Util.getRgbaCSSStringFromAntdColor( buttonBgColor ) : "";
    const border = Util.isNumeric( buttonOuterBorderThickness ) && Util.isAntdRgbaProperty( buttonOuterBorderColor) ?
        "solid " + buttonOuterBorderThickness + "px " + Util.getRgbaCSSStringFromAntdColor( buttonOuterBorderColor )  : "";
    const borderRadius = Util.isNumber( buttonOuterBorderRadius ) ? buttonOuterBorderRadius + "px" : "";
    const iconJsx = getIconJsx( icon, label );

    let bDisabled;
    if( currentCallInfo ){
        const callStatus = currentCallInfo.getCallStatus();
        const bHolding = callStatus === ACallInfo.CALL_STATUSES.holding;
        if( bHolding === true ){
            bDisabled = true;
        }
        else{
            bDisabled = false;
        }
    }
    else{
        bDisabled = false;
    }

    return (
        <button title={i18n.t(`legacy_button_description.${subtype}`)}  className="kbc-button kbc-button-fill-parent"
                style={{
                    border:border,
                    borderRadius:borderRadius,
                    color:color,
                    backgroundColor:backgroundColor
                }}
                onClick={
                    () => {
                        if(!currentCallInfo) {
                            return;
                        }
                        context.hangUpCall();
                    }
                }
                disabled={bDisabled}
        >{iconJsx}</button>
    );
}
function LegacyUnholdCallButton({ operatorConsoleAsParent, subtype, icon, label, buttonFgColor, buttonBgColor, buttonOuterBorderColor, buttonOuterBorderRadius, buttonOuterBorderThickness, context = {} }) {
    //const { currentCallIndex, callIds = [], callById = {} } = context;
    //const currentCall = callById[callIds[currentCallIndex]];
    const currentCallInfo = operatorConsoleAsParent.getPhoneClient().getCallInfos().getCurrentCallInfo();
    const color = Util.isAntdRgbaProperty( buttonFgColor  ) ? Util.getRgbaCSSStringFromAntdColor( buttonFgColor ) : "";
    const backgroundColor = Util.isAntdRgbaProperty( buttonBgColor ) ? Util.getRgbaCSSStringFromAntdColor( buttonBgColor ) : "";
    const border = Util.isNumeric( buttonOuterBorderThickness ) && Util.isAntdRgbaProperty( buttonOuterBorderColor) ?
        "solid " + buttonOuterBorderThickness + "px " + Util.getRgbaCSSStringFromAntdColor( buttonOuterBorderColor )  : "";
    const borderRadius = Util.isNumber( buttonOuterBorderRadius ) ? buttonOuterBorderRadius + "px" : "";
    const iconJsx = getIconJsx( icon, label );
    return (
        <button title={i18n.t(`legacy_button_description.${subtype}`)}  className="kbc-button kbc-button-fill-parent"
                style={{
                    border:border,
                    borderRadius:borderRadius,
                    color:color,
                    backgroundColor:backgroundColor
                }}
                onClick={
                    () => {
                        if( !currentCallInfo ) {
                            return;
                        }
                        const bHolding =  currentCallInfo.getIsHolding();
                        if( !bHolding ) {
                            return;
                        }
                        context.resumeCall();
                    }
                }
        >{iconJsx}</button>
    );
}
function LegacyHoldCallButton({ operatorConsoleAsParent, subtype, icon, label, buttonFgColor, buttonBgColor, buttonOuterBorderColor, buttonOuterBorderRadius, buttonOuterBorderThickness, context = {} }) {
    //const { currentCallIndex, callIds = [], callById = {} } = context;
    //const currentCall = callById[callIds[currentCallIndex]];
    const currentCallInfo = operatorConsoleAsParent.getPhoneClient().getCallInfos().getCurrentCallInfo();

    const color = Util.isAntdRgbaProperty( buttonFgColor  ) ? Util.getRgbaCSSStringFromAntdColor( buttonFgColor ) : "";
    const backgroundColor = Util.isAntdRgbaProperty( buttonBgColor ) ? Util.getRgbaCSSStringFromAntdColor( buttonBgColor ) : "";
    const border = Util.isNumeric( buttonOuterBorderThickness ) && Util.isAntdRgbaProperty( buttonOuterBorderColor) ?
        "solid " + buttonOuterBorderThickness + "px " + Util.getRgbaCSSStringFromAntdColor( buttonOuterBorderColor )  : "";
    const borderRadius = Util.isNumber( buttonOuterBorderRadius ) ? buttonOuterBorderRadius + "px" : "";
    const iconJsx = getIconJsx( icon, label );
    return (
        <button title={i18n.t(`legacy_button_description.${subtype}`)}  className="kbc-button kbc-button-fill-parent"
                style={{
                    border:border,
                    borderRadius:borderRadius,
                    color:color,
                    backgroundColor:backgroundColor
                }}
                onClick={(!currentCallInfo || !currentCallInfo.getIsAnswered() || currentCallInfo.getIsHolding() ) ? undefined : context.holdCall}>{iconJsx}</button>
    );
}
function LegacyPickUpCallButton({ operatorConsoleAsParent, subtype, icon, label, buttonFgColor, buttonBgColor, buttonOuterBorderColor, buttonOuterBorderRadius, buttonOuterBorderThickness, context = {} }) {
    //const { currentCallIndex, callIds = [], callById = {} } = context;
    //const currentCall = callById[callIds[currentCallIndex]];
    const currentCallInfo = operatorConsoleAsParent.getPhoneClient().getCallInfos().getCurrentCallInfo();

    const color = Util.isAntdRgbaProperty( buttonFgColor  ) ? Util.getRgbaCSSStringFromAntdColor( buttonFgColor ) : "";
    const backgroundColor = Util.isAntdRgbaProperty( buttonBgColor ) ? Util.getRgbaCSSStringFromAntdColor( buttonBgColor ) : "";
    const border = Util.isNumeric( buttonOuterBorderThickness ) && Util.isAntdRgbaProperty( buttonOuterBorderColor) ?
        "solid " + buttonOuterBorderThickness + "px " + Util.getRgbaCSSStringFromAntdColor( buttonOuterBorderColor )  : "";
    const borderRadius = Util.isNumber( buttonOuterBorderRadius ) ? buttonOuterBorderRadius + "px" : "";
    const iconJsx = getIconJsx( icon, label );
    return (
        <button title={i18n.t(`legacy_button_description.${subtype}`)}  className="kbc-button kbc-button-fill-parent"
                style={{
                    border:border,
                    borderRadius:borderRadius,
                    color:color,
                    backgroundColor:backgroundColor
                }}
                onClick={
                    () => {
                        if( !currentCallInfo ) {
                            return;
                        }
                        const bIsIncoming = currentCallInfo.getIsIncoming();
                        if( !bIsIncoming ) {
                            return;
                        }
                        const bIsAnswered = currentCallInfo.getIsAnswered();
                        if( bIsAnswered ) {
                            return;
                        }

                        context.answerCall();
                    }
                }>
            {iconJsx}
        </button>
    );
}
function getIconJsx( icon, label ){
    let iconJsx;
    if( !icon ){
        iconJsx = label;
    }
    else if( icon.startsWith("PATH:") ){
        let alt;
        if( label ){
            alt = label;
        }
        else{
            alt = icon;
        }
        const src = icon.substring(5,icon.length);   //5 is path:
        iconJsx = (<img src={src} alt={alt} width={32} heigth={32} />);
    }
    else {
        iconJsx = (<FontAwesomeIcon size="lg" icon={icon}/>);
    }
    return iconJsx;
}

function LegacyDummyButton({ operatorConsoleAsParent, subtype, icon, label, buttonFgColor, buttonBgColor, buttonOuterBorderColor, buttonOuterBorderRadius, buttonOuterBorderThickness  }) {
    const color = Util.isAntdRgbaProperty( buttonFgColor  ) ? Util.getRgbaCSSStringFromAntdColor( buttonFgColor ) : "";
    const backgroundColor = Util.isAntdRgbaProperty( buttonBgColor ) ? Util.getRgbaCSSStringFromAntdColor( buttonBgColor ) : "";
    const border = Util.isNumeric( buttonOuterBorderThickness ) && Util.isAntdRgbaProperty( buttonOuterBorderColor) ?
        "solid " + buttonOuterBorderThickness + "px " + Util.getRgbaCSSStringFromAntdColor( buttonOuterBorderColor )  : "";
    const borderRadius = Util.isNumber( buttonOuterBorderRadius ) ? buttonOuterBorderRadius + "px" : "";
    const iconJsx = getIconJsx( icon, label );
    return (
        <button title={i18n.t(`legacy_button_description.${subtype}`)} className="kbc-button kbc-button-fill-parent"
                style={{
                    border:border,
                    borderRadius:borderRadius,
                    color:color,
                    backgroundColor:backgroundColor
                }}
        >{iconJsx}</button>
    );
}
function LegacyQuickCallButton({ operatorConsoleAsParent, subtype, icon, label, buttonFgColor, buttonBgColor, buttonOuterBorderColor, buttonOuterBorderRadius, buttonOuterBorderThickness, context = {} }) {
    const color = Util.isAntdRgbaProperty( buttonFgColor  ) ? Util.getRgbaCSSStringFromAntdColor( buttonFgColor ) : "";
    const backgroundColor = Util.isAntdRgbaProperty( buttonBgColor ) ? Util.getRgbaCSSStringFromAntdColor( buttonBgColor ) : "";
    const border = Util.isNumeric( buttonOuterBorderThickness ) && Util.isAntdRgbaProperty( buttonOuterBorderColor) ?
        "solid " + buttonOuterBorderThickness + "px " + Util.getRgbaCSSStringFromAntdColor( buttonOuterBorderColor )  : "";
    const borderRadius = Util.isNumber( buttonOuterBorderRadius ) ? buttonOuterBorderRadius + "px" : "";
    const iconJsx = getIconJsx( icon, label );
    return (
        //<button title={i18n.t(`legacy_button_description.${subtype}`)}  className="kbc-button kbc-button-fill-parent"
        <button title={i18n.t(`legacy_button_description.${subtype}`)}  className={clsx("kbc-button kbc-button-fill-parent", context.widget && context.currentScreenQuickCallWidget === context.widget && 'kbc-button-danger')}
                style={{
                    border:border,
                    borderRadius:borderRadius,
                    color:color,
                    backgroundColor:backgroundColor
                }}
                onClick={ () => context?.toggleQuickCallScreen( context.widget )  }>{iconJsx}</button>
    );
}

function LegacyAutoDialButton({ operatorConsoleAsParent, subtype, icon, label, buttonFgColor, buttonBgColor, buttonOuterBorderColor, buttonOuterBorderRadius, buttonOuterBorderThickness, context = {} }) {
    const isRedColor = context.showAutoDialWidgets && BrekekeOperatorConsole._getIndexFromArray( context.showAutoDialWidgets, context.widget ) !== -1;
    const color = Util.isAntdRgbaProperty( buttonFgColor  ) ? Util.getRgbaCSSStringFromAntdColor( buttonFgColor ) : "";
    const backgroundColor = Util.isAntdRgbaProperty( buttonBgColor ) ? Util.getRgbaCSSStringFromAntdColor( buttonBgColor ) : "";
    const border = Util.isNumeric( buttonOuterBorderThickness ) && Util.isAntdRgbaProperty( buttonOuterBorderColor) ?
        "solid " + buttonOuterBorderThickness + "px " + Util.getRgbaCSSStringFromAntdColor( buttonOuterBorderColor )  : "";
    const borderRadius = Util.isNumber( buttonOuterBorderRadius ) ? buttonOuterBorderRadius + "px" : "";
    const iconJsx = getIconJsx( icon, label );
    return (
        //<button title={i18n.t(`legacy_button_description.${subtype}`)}  className="kbc-button kbc-button-fill-parent"
        <button title={i18n.t(`legacy_button_description.${subtype}`)}  className={clsx("kbc-button kbc-button-fill-parent", isRedColor && 'kbc-button-danger')}
                style={{
                    border:border,
                    borderRadius:borderRadius,
                    color:color,
                    backgroundColor:backgroundColor
                }}
                onClick={ () => context?.onClickAutoDial( context.widget )  }>{iconJsx}</button>
    );
}

function LegacyOneTouchDialButton({ operatorConsoleAsParent, subtype, icon, label, buttonFgColor, buttonBgColor, buttonOuterBorderColor, buttonOuterBorderRadius, buttonOuterBorderThickness, context }) {
    const color = Util.isAntdRgbaProperty( buttonFgColor  ) ? Util.getRgbaCSSStringFromAntdColor( buttonFgColor ) : "";
    const backgroundColor = Util.isAntdRgbaProperty( buttonBgColor ) ? Util.getRgbaCSSStringFromAntdColor( buttonBgColor ) : "";
    const border = Util.isNumeric( buttonOuterBorderThickness ) && Util.isAntdRgbaProperty( buttonOuterBorderColor) ?
        "solid " + buttonOuterBorderThickness + "px " + Util.getRgbaCSSStringFromAntdColor( buttonOuterBorderColor )  : "";
    const borderRadius = Util.isNumber( buttonOuterBorderRadius ) ? buttonOuterBorderRadius + "px" : "";
    const iconJsx = getIconJsx( icon, label );
    if( !context ){ //edit mode
        return (
            <button title={i18n.t(`legacy_button_description.${subtype}`)} className="kbc-button kbc-button-fill-parent"    //!todo implement onClick
                    style={{
                        border:border,
                        borderRadius:borderRadius,
                        color:color,
                        backgroundColor:backgroundColor
                    }}
            >{icon ? <FontAwesomeIcon size="lg" icon={icon}/> : label}</button>
        );
    }
    else {
        const {widget, setDialingAndMakeCall} = context;
        const number = widget.number;
        return (
            <button title={i18n.t(`legacy_button_description.${subtype}`)} className="kbc-button kbc-button-fill-parent" //!todo implement onClick
                    style={{
                        border:border,
                        borderRadius:borderRadius,
                        color:color,
                        backgroundColor:backgroundColor
                    }}
                    onClick={() => {
                        let onetouchdialMode = widget.onetouchdialMode;
                        if( !onetouchdialMode ) {
                            onetouchdialMode = "callOnly";    //!default
                        }

                        const currentCallInfo = operatorConsoleAsParent.getPhoneClient().getCallInfos().getCurrentCallInfo();
                        if( !!currentCallInfo ) {   //transfer?
                            const callStatus = currentCallInfo.getCallStatus();
                            const canTransferByCallStatus = callStatus == ACallInfo.CALL_STATUSES.holding || callStatus === ACallInfo.CALL_STATUSES.talking;
                            if( canTransferByCallStatus === true ) {
                                const canTransferByOnetouchdialMode = onetouchdialMode === "attendedTransferOrCall" || onetouchdialMode === "blindTransferOrCall" || onetouchdialMode === "attendedTransferOnly" || onetouchdialMode === "blindTransferOnly";
                                if(  canTransferByOnetouchdialMode === true ) {
                                    //const talkerId = currentCallInfo.getPbxTalkerId();
                                    //const tenant = operatorConsoleAsParent.getLoggedinTenant();
                                    const mode = onetouchdialMode === "blindTransferOrCall" || onetouchdialMode === "blindTransferOnly" ? "blind" : undefined; //use attended
                                    operatorConsoleAsParent.transferCall( number, mode, currentCallInfo );
                                    return;
                                }
                            }
                        }

                        //call
                        if( onetouchdialMode !== "attendedTransferOnly" && onetouchdialMode !== "blindTransferOnly" ) {
                            if( currentCallInfo ) {
                                const callStatus = currentCallInfo.getCallStatus();
                                if( callStatus === ACallInfo.CALL_STATUSES.talking ) {
                                    const timelimit = Date.now() + BrekekeOperatorConsole.WAIT_HOLD_TIMELIMIT_MILLIS_AT_ONETOUCHDIAL;
                                    const func = function (callInfoAsCaller) {
                                        const removed = currentCallInfo.removeOnHoldFunction(func);
                                        if (Date.now() > timelimit) {
                                            Notification.error({message: i18n.t('failedToHoldCallAtOneTouchDial') + "\r\n" +  e, duration:0 });
                                            return;
                                        }
                                        setDialingAndMakeCall(number, context);
                                    };
                                    currentCallInfo.addOnHoldFunction(func);
                                    currentCallInfo.toggleHoldWithCheck();
                                    return;
                                }
                            }
                            setDialingAndMakeCall(number, context);
                        }
                    }}>
                {iconJsx}
            </button>
        );
    }
}

function Text({ operatorConsoleAsParent, text, textFgColor, textBgColor, textBorderRadius  }) {

    const color = Util.isAntdRgbaProperty( textFgColor  ) ? Util.getRgbaCSSStringFromAntdColor( textFgColor ) : "";
    const backgroundColor = Util.isAntdRgbaProperty( textBgColor ) ? Util.getRgbaCSSStringFromAntdColor( textBgColor ) : '#f5f5f5'; //!default
    //const border = Util.isNumeric( buttonOuterBorderThickness ) && Util.isAntdRgbaProperty( buttonOuterBorderColor) ?
    //    "solid " + buttonOuterBorderThickness + "px " + Util.getRgbaCSSStringFromAntdColor( buttonOuterBorderColor )  : "";
    const borderRadius = Util.isNumber( textBorderRadius ) ? textBorderRadius + "px" : "";

    return (
        <div style={{
            color:color,
            textOverflow: 'ellipsis',
            whiteSpace: 'pre-wrap',
            overflow: 'hidden',
            wordBreak: 'break-all',
            width: '100%',
            height: '100%',
            backgroundColor: backgroundColor,
            textAlign: 'center',
            borderRadius:borderRadius
        }}>{text}</div>
    );
}


// const CALL_TABLE_TH_HEIGHT = 50;
// const CALL_TABLE_TD_HEIGHT = 45;
// function CallTable( props ) {
//     const operatorConsoleAsParent = props.operatorConsoleAsParent;
//     let context = props.context;
//     let callIds, callById, currentCallIndex;
//     let isEditMode;
//     if( !context ){ //in edit mode
//         isEditMode = true;
//         context = {};
//         const tableHeight = props.height;
//         const rowCount = Math.ceil( ( tableHeight - CALL_TABLE_TH_HEIGHT ) / CALL_TABLE_TD_HEIGHT  );
//         callIds = new Array(rowCount);
//         for( let i = 0; i < callIds.length; i++ ){
//             callIds[i] = i;
//         }
//         callById = {};
//         currentCallIndex = -1;
//     }
//     else{ //Not in edit mode
//         isEditMode = false;
//         callIds = context.callIds;
//         if( !callIds ){
//             callIds = [];
//         }
//         callById = context.callById;
//         if( !callById ){
//             callById = {};
//         }
//         currentCallIndex = context.currentCallIndex;
//
//     }
//
//     let idKey = 0;
//
//     const CallTableColumns = [  //!overhead
//         {key: 'partyNumber', title: i18n.t('PartyNumber'),      formatter: (v) => (v + '')},
//         {key: 'partyName',   title: i18n.t('PartyName'),        formatter: (v) => (v + '')},
//         {key: 'incoming',    title:  i18n.t('Incoming'),    formatter: (v) => (v ? '✓' : '')},
//         {key: 'answered',    title: i18n.t('Answered'),    formatter: (v) => (v ? '✓' : '')},
//         {key: 'holding',     title: i18n.t('Holding'),     formatter: (v) => (v ? '✓' : '')},
//         {key: 'recording',   title:  i18n.t('Recording'),   formatter: (v) => (v ? '✓' : '')},
//         {key: 'muted',       title:  i18n.t('Muted'),       formatter: (v) => (v ? '✓' : '')},
//         {key: 'answeredAt',  title:  i18n.t("AnsweredAt") , formatter: (v) => (v ? new Date(v).toLocaleTimeString() : '')},
//     ]
//
//     const outerBorderRadius = props.calltableOuterBorderRadius ? props.calltableOuterBorderRadius : 0; //!default
//     const outerBorderThickness = props.calltableOuterBorderThickness ? props.calltableOuterBorderThickness : 0; //!default
//     const outerBorderColor = Util.getRgbaCSSStringFromAntdColor(  props.calltableOuterBorderColor, "rgba(0,0,0,0)" );
//     const headerFgColor = Util.getRgbaCSSStringFromAntdColor(  props.calltableHeaderFgColor , "" );
//     const bodyFgColor = Util.getRgbaCSSStringFromAntdColor(  props.calltableBodyFgColor , "" );
//     const bodyActiveRowBgColor = Util.getRgbaCSSStringFromAntdColor( props.calltableBodyActiveRowBgColor, "#B9DFA9" );   //!default
//     const backgroundColor = Util.getRgbaCSSStringFromAntdColor( props.calltableBgColor, "" );
//     const headerRowUnderlineThickness = props.calltableHeaderRowUnderlineThickness ? props.calltableHeaderRowUnderlineThickness : 1; //!default
//     const headerRowUnderlineColor = Util.getRgbaCSSStringFromAntdColor( props.calltableHeaderRowUnderlineColor , "#e0e0e0" );   //!default
//     const bodyRowUnderlineThickness = props.calltableBodyRowUnderlineThickness ? props.calltableBodyRowUnderlineThickness : 1; //!default
//     const bodyRowUnderlineColor = Util.getRgbaCSSStringFromAntdColor( props.calltableBodyRowUnderlineColor , "#e0e0e0" );   //!default
//
//
//     return (
//         <table className="brOCCalltable"  style={{
//             borderRadius:outerBorderRadius,
//             border: outerBorderThickness + "px solid " + outerBorderColor,
//             backgroundColor:backgroundColor,
//         }}>
//             <thead>
//             <tr style={{
//                 color:headerFgColor,
//                 borderBottom: headerRowUnderlineThickness +  "px solid " + headerRowUnderlineColor
//             }}>
//                 {CallTableColumns.map((item, i ) => {
//                     const key = item.key;
//                     const title = item.title;
//
//                     let borderRadiusTH;
//                     const isFirstTH = i == 0;
//                     if( isFirstTH === true ){
//                         borderRadiusTH =  outerBorderRadius +  "px 0 0 0";
//                     }
//                     else{
//                         borderRadiusTH =  "";   //"0"
//                     }
//
//                     return <th key={key}
//                                style={{
//                                    height:CALL_TABLE_TH_HEIGHT,
//                                    paddingTop:0,
//                                    paddingBottom:0,
//                                    borderRadius:borderRadiusTH,
//                                }}>{title}</th>;})
//                 }
//                 <th style={{
//                     height:CALL_TABLE_TH_HEIGHT,
//                     paddingTop:0,
//                     paddingBottom:0,
//                     borderRadius:"0 " + outerBorderRadius + "px 0 0",
//                 }}></th>
//             </tr>
//             </thead>
//             <tbody style={{
//                 color:bodyFgColor,
//             }}>
//             {callIds.map((id, i) => {
//                 let tdActive;
//                 if( isEditMode  ){
//                     tdActive = "\u00A0";
//                 }
//                 else if( i === currentCallIndex ){
//                     tdActive = "\u00A0";
//                 }
//                 else{
//                     tdActive = <button title={i18n.t("activeButtonDesc")} className="kbc-button kbc-button-fill-parent" onClick={ () => context.switchCallIndex(i)}>{i18n.t("active")}</button>;
//                 }
//
//                 return (<tr key={idKey++} style={{
//                     color: bodyFgColor,
//                     backgroundColor: i === currentCallIndex ? bodyActiveRowBgColor : "",
//                     height:CALL_TABLE_TD_HEIGHT,
//                     paddingTop:0,
//                     paddingBottom:0,
//                     borderBottom: bodyRowUnderlineThickness +  "px solid " + bodyRowUnderlineColor
//                 }}>
//                     {CallTableColumns.map((column, i) => {
//                             let borderRadiusTD;
//                             const isFirstTD = i == 0;
//                             if( isFirstTD === true ){
//                                 borderRadiusTD =  "0 " + outerBorderRadius +  "px 0 0";
//                             }
//                             else{
//                                 borderRadiusTD =  "";   //"0"
//                             }
//                             borderRadiusTD =  "";   //"0"
//
//                             const key = column.key;
//                             const formatter = column.formatter;
//                             const v0 = callById[id];
//                             let v;
//                             if( !v0 ){
//                                 v = "\u00A0";   //for edit mode
//                             }
//                             else{
//                                 v =  formatter( v0[key]);
//                             }
//                             return <td key={key}
//                                        style={{
//                                            height: CALL_TABLE_TD_HEIGHT,
//                                            paddingTop:0,
//                                            paddingBottom:0,
//                                            borderRadius:borderRadiusTD
//                                        }}>{v}</td>
//                         }
//                     )}
//                     <td style={{
//                         width:80,height:CALL_TABLE_TD_HEIGHT,paddingTop:0,paddingBottom:0,
//                         borderRadius:"0 " + outerBorderRadius + "px 0 0 ",
//                     }}>
//                         {tdActive}
//                     </td>
//                 </tr>);
//             })}
//             </tbody>
//         </table>
//     );
// }


const CALL_TABLE_TH_HEIGHT = 50;
const CALL_TABLE_TD_HEIGHT = 45;
function CallTable( props ) {
    const operatorConsoleAsParent = props.operatorConsoleAsParent;
    let context = props.context;
    let currentCallIndex;
    let isEditMode;
    let callInfoArray;
    if( !context ){ //in edit mode
        isEditMode = true;
        context = {};
        const tableHeight = props.height;
        const rowCount = Math.ceil( ( tableHeight - CALL_TABLE_TH_HEIGHT ) / CALL_TABLE_TD_HEIGHT  );
        callInfoArray = new Array(rowCount);
        for( let i = 0; i < rowCount; i++ ){
            callInfoArray[i] = null;
        }
        //callById = {};
        currentCallIndex = -1;
    }
    else{ //Not in edit mode
        isEditMode = false;
        //callIds = context.callIds;
        // if( !callIds ){
        //     callIds = [];
        // }
        //callById = context.callById;
        // if( !callById ){
        //     callById = {};
        // }
        const callInfos = operatorConsoleAsParent.getPhoneClient().getCallInfos();
        callInfoArray = callInfos.getCallInfoArray();
        //currentCallIndex = context.currentCallIndex;
        currentCallIndex = callInfos.getCurrentCallIndex();

    }

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

    const outerBorderRadius = props.calltableOuterBorderRadius ? props.calltableOuterBorderRadius : 0; //!default
    const outerBorderThickness = props.calltableOuterBorderThickness ? props.calltableOuterBorderThickness : 0; //!default
    const outerBorderColor = Util.getRgbaCSSStringFromAntdColor(  props.calltableOuterBorderColor, "rgba(0,0,0,0)" );
    const headerFgColor = Util.getRgbaCSSStringFromAntdColor(  props.calltableHeaderFgColor , "" );
    const bodyFgColor = Util.getRgbaCSSStringFromAntdColor(  props.calltableBodyFgColor , "" );
    const bodyActiveRowBgColor = Util.getRgbaCSSStringFromAntdColor( props.calltableBodyActiveRowBgColor, "#B9DFA9" );   //!default
    const backgroundColor = Util.getRgbaCSSStringFromAntdColor( props.calltableBgColor, "" );
    const headerRowUnderlineThickness = props.calltableHeaderRowUnderlineThickness ? props.calltableHeaderRowUnderlineThickness : 1; //!default
    const headerRowUnderlineColor = Util.getRgbaCSSStringFromAntdColor( props.calltableHeaderRowUnderlineColor , "#e0e0e0" );   //!default
    const bodyRowUnderlineThickness = props.calltableBodyRowUnderlineThickness ? props.calltableBodyRowUnderlineThickness : 1; //!default
    const bodyRowUnderlineColor = Util.getRgbaCSSStringFromAntdColor( props.calltableBodyRowUnderlineColor , "#e0e0e0" );   //!default
    const callTableTheadRowHeight = 44;
    const callTableTbodyRowHeight = 44;
    const cellCount = CallTableColumns.length + 1;   //1 is active botton


    return (
        <div className="brOCCalltableWrapper" data-broc-widgetindex={props.widgetIndex}>
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
                        const isFirstTH = i == 0;
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
                    let tdActive;
                    if( isEditMode  ){
                        tdActive = "\u00A0";
                    }
                    else if( i === currentCallIndex ){
                        tdActive = "\u00A0";
                    }
                    else{
                        tdActive = <div style={{width:42,height:42,margin:"0 auto"}}><button title={i18n.t("activeButtonDesc")} className="kbc-button kbc-button-fill-parent" style={{fontSize:activeButtonFontSize}} onClick={ () => context.switchCallIndex(i)}>{i18n.t("active")}</button></div>;
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
                                const isFirstTD = i == 0;
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


function CallTablePreview() {
    return (
        <table>
            <thead>
            <tr>
                <th>{i18n.t("CallTable")}</th>
            </tr>
            </thead>
        </table>
    );
}

const EXTENSION_TABLE_TH_HEIGHT = 25;   //25px
const EXTENSION_TABLE_TD_HEIGHT = 30;   //30px
function ExtensionTable( props ) {
    let context = props.context;
    let isEditmode;
    let extensions , extensionsStatus;
    if( !context ){ //in edit mode
        context = {};
        const tableHeight = props.height;
        const rowCount = Math.ceil( ( tableHeight - EXTENSION_TABLE_TH_HEIGHT ) / EXTENSION_TABLE_TD_HEIGHT  );
        extensions =  new Array( rowCount );
        for( let i = 0; i < extensions.length; i++ ){
            extensions[i] = {name:"\u00A0"};
        }
        extensionsStatus = {};
    }
    else{   //Not in edit mode
        extensions = context.extensions;
        extensionsStatus = context.extensionsStatus;
        if( !extensions ){
            extensions = [];
        }
        if( !extensionsStatus ) {
            extensionsStatus = {};
        }
    }

    const outerBorderRadius = props.extensiontableOuterBorderRadius ? props.extensiontableOuterBorderRadius : 0; //!default
    const outerBorderThickness = props.extensiontableOuterBorderThickness ? props.extensiontableOuterBorderThickness : 0; //!default
    const outerBorderColor = Util.getRgbaCSSStringFromAntdColor(  props.extensiontableOuterBorderColor, "rgb(0,0,0,0)" );
    const headerFgColor = Util.getRgbaCSSStringFromAntdColor(  props.extensiontableHeaderFgColor , "" );
    const bodyFgColor = Util.getRgbaCSSStringFromAntdColor(  props.extensiontableBodyFgColor , "" );
    //const bodyActiveRowBgColor = Util.getRgbaCSSStringFromAntdColor( props.extensiontableBodyActiveRowBgColor, "'#B9DFA9'" );   //!default
    const backgroundColor = Util.getRgbaCSSStringFromAntdColor( props.extensiontableBgColor, "" );
    const headerRowUnderlineThickness = props.extensiontableHeaderRowUnderlineThickness ? props.extensiontableHeaderRowUnderlineThickness : 1; //!default
    const headerRowUnderlineColor = Util.getRgbaCSSStringFromAntdColor( props.extensiontableHeaderRowUnderlineColor , "'#e0e0e0'" );   //!default
    const bodyRowUnderlineThickness = props.extensiontableBodyRowUnderlineThickness ? props.extensiontableBodyRowUnderlineThickness : 1; //!default
    const bodyRowUnderlineColor = Util.getRgbaCSSStringFromAntdColor( props.extensiontableBodyRowUnderlineColor , "'#e0e0e0'" );   //!default

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
function ExtensionTablePreview() {
    return (
        <table>
            <thead>
            <tr>
                <th>{i18n.t("ExtensionTable")}</th>
            </tr>
            </thead>
        </table>
    );
}

function LineTablePreview() {
    return (
        <table>
            <thead>
            <tr>
                <th>{i18n.t("LineTable")}</th>
            </tr>
            </thead>
        </table>
    );
}

function UccacWidgetPreview() {
    return (
        <table>
            <thead>
            <tr>
                <th>{i18n.t("ucChatAgentComponent")}</th>
            </tr>
            </thead>
        </table>
    );
}

class Note extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            content: '',
            loading: false,
            saving: false,
            error: false,
            readonly: true,
        }
    }

    componentDidMount() {

        if (this.props.context?.getNote) {
            this.setState({ loading: true });
            this.props.context.getNote(this.props.noteName )
                .then(({ note, useraccess }) => {
                    this.setState({
                        content: note,
                        loading: false,
                        readonly: useraccess != 2,
                    })
                })
                .catch((err) => {
                    console.error('Failed  to getNote.', err);
                    this.setState({ error: true })
                    throw err;
                });
        }
    }



    _setNoteDebounced = debounce(() => {
        if (this.props.context?.setNote) {
            this.props.context.setNote(this.props.noteName, this.state.content)
                .then(() => this.setState({ saving: false }))
                .catch(() => this.setState({ error: true }))
        }
    }, 500);

    onContentChanged = (e) => {
        this.setState({ content: e.target.value, saving: true, error: false });
        this._setNoteDebounced();
    }

    render() {
        const noteNameFgColor = Util.getRgbaCSSStringFromAntdColor(  this.props.noteNameFgColor , "" );
        const noteNameBackground = Util.getRgbaCSSStringFromAntdColor(  this.props.noteNameBgColor, "" );

        const borderRadius = this.props.noteBorderRadius ? this.props.noteBorderRadius : 3; //!default
        const noteTextForegroundColor = Util.getRgbaCSSStringFromAntdColor( this.props.noteTextFgColor, "" );
        const  background = this.props.noteBgStartColor && this.props.noteBgEndColor ? "linear-gradient(" +
            Util.getRgbaCSSStringFromAntdColor( this.props.noteBgStartColor, "" )+ "," +
            Util.getRgbaCSSStringFromAntdColor(this.props.noteBgEndColor, "" ) +  ")" : "";

        return (
            <div className="brOCStickyNote" style={{
                borderRadius:borderRadius,
                background:background
            }}>
                <div className="brOCStickyNoteName" style={{
                    color:noteNameFgColor,
                    backgroundColor:noteNameBackground
                }}>{this.props.noteName}</div>
                {this.state.loading ? (
                    <Empty image={null} description={<Spin/>}/>
                ) : (
                    <textarea
                        value={this.state.content}
                        onChange={this.onContentChanged}
                        readOnly={this.state.readonly}
                        style={{
                            color:noteTextForegroundColor
                        }}
                    />
                )}
                {(this.state.error || this.state.saving) && (
                    <FontAwesomeIcon icon="fa-solid fa-cloud-arrow-up"
                                     color={this.state.error ? '#FF4526' : 'black'}
                                     style={{position: 'absolute', top: 10, right: 12 }}
                    />
                )}
            </div>
        )
    }
}
function NotePreview() {
    return (
        <div className="brOCStickyNote">{i18n.t("Note")}</div>
    )
}

const LegacyButtonMap = {
    [LegacyDummyButton.name]: LegacyDummyButton,
    [LegacyCallTalkingButton.name]: LegacyCallTalkingButton,
    [LegacyNoAnswerButton.name]: LegacyNoAnswerButton,
    [LegacyCallbackButton.name]: LegacyCallbackButton,
    [LegacyTransferButton.name]: LegacyTransferButton,
    [LegacyToggleRecordingButton.name]: LegacyToggleRecordingButton,
    [LegacyAlarmButton.name]: LegacyAlarmButton,
    [LegacyPrevCallButton.name]: LegacyPrevCallButton,
    [LegacyMonitorDialingExtensionButton.name]: LegacyMonitorDialingExtensionButton,
    [LegacyStationLineDesignationButton.name]: LegacyStationLineDesignationButton,
    [LegacyParkCallButton.name]: LegacyParkCallButton,
    [LegacySeriesSetButton.name]: LegacySeriesSetButton,
    [LegacyMonitoringCallButton.name]: LegacyMonitoringCallButton,
    [LegacyStartButton.name]: LegacyStartButton,
    [LegacyToggleMutedButton.name]: LegacyToggleMutedButton,
    [LegacyLeavingSeatButton.name]: LegacyLeavingSeatButton,
    [LegacyNightTimeButton.name]: LegacyNightTimeButton,
    [LegacyAvailableButton.name]: LegacyAvailableButton,
    [LegacyNextCallButton.name]: LegacyNextCallButton,
    [LegacyLineButton.name]: LegacyLineButton,
    [LegacyKeypadButton.name]: LegacyKeypadButton,
    [LegacyMakeCallButton.name]: LegacyMakeCallButton,
    [LegacyBackspaceButton.name]: LegacyBackspaceButton,
    [LegacyIncomingCallButton.name]: LegacyIncomingCallButton,
    [LegacyThreeWayCallButton.name]: LegacyThreeWayCallButton,
    [LegacyOutgoingCallButton.name]: LegacyOutgoingCallButton,
    [LegacyHangUpCallButton.name]: LegacyHangUpCallButton,
    [LegacyUnholdCallButton.name]: LegacyUnholdCallButton,
    [LegacyHoldCallButton.name]: LegacyHoldCallButton,
    [LegacyPickUpCallButton.name]: LegacyPickUpCallButton,
    [LegacyQuickCallButton.name]: LegacyQuickCallButton,
    [LegacyAutoDialButton.name]: LegacyAutoDialButton,
    [LegacyOneTouchDialButton.name]: LegacyOneTouchDialButton
};

class LegacyButtonSettings extends React.Component {
    constructor(props) {
        super(props);
        this.formRef = React.createRef();
        this.state = {
            widget: window.structuredClone(this.props.widget),
        };

        const operatorConsoleAsParent = props.operatorConsoleAsParent;
        const defaultButtonFileInfos = operatorConsoleAsParent.getDefaultButtonImageFileInfos();
        let fileInfos = defaultButtonFileInfos.getFileInfos();
        if( !fileInfos ){
            fileInfos = new Array();
        }
        let key = -1;
        this.iconSelect = (
            <Select
                showSearch
                allowClear
                filterOption={(input, option) =>
                    (option?.value ?? '').toLowerCase().includes(input.toLowerCase())
                }
            >
                <Select.Option value={''}></Select.Option>
                {[...Object.values(fas), ...Object.values(far), ...Object.values(fab)].map((icon, i) => {
                    const value = icon.prefix + ' fa-' + icon.iconName;
                    key++;
                    return (
                        <Select.Option key={key} value={value}>
                            <FontAwesomeIcon fixedWidth icon={icon}/>
                            <span style={{marginLeft: 4}}>{icon.iconName}</span>
                        </Select.Option>
                    );
                })}
                { fileInfos.map( (fileInfo, i ) =>{
                    key++;
                    const fileName = fileInfo["name"];
                    const fileUrl = fileInfo["url"];
                    const value = "PATH:" + fileUrl;
                    return (
                        <Select.Option key={key} value={value}>
                            <div style={{display:"table",verticalAlign:"middle"}}>
                                <img src={fileUrl} width={32} height={32} style={{verticalAlign:"middle"}}/>
                                <div style={{display:"table-cell",paddingLeft: 4,verticalAlign:"middle"}}>{fileName}</div>
                            </div>
                        </Select.Option>
                    );
                })}
            </Select>
        )
        this.onChangeDebounced = debounce(props.onChange, 250);
    }

    componentDidUpdate(prevProps) {
        if (this.props.widgetIndex != prevProps.widgetIndex) {
            const widget = window.structuredClone(this.props.widget);
            this.setState({widget}, () => {
                this.formRef.current.resetFields();
            })
        }
        if (this.props.onChange != prevProps.onChange) {
            this.onChangeDebounced = debounce(this.props.onChange, 250);
        }
    }

    onSubtypeSelected = (subtype) => {
        this.setState({ widget: {
                ...this.state.widget,
                subtype,
                label: i18n.t(`legacy_button_label.${subtype}`),
            }})
    }

    render() {
        return (
            <Form ref={this.formRef} layout="vertical" initialValues={this.state.widget} onValuesChange={this.onChangeDebounced}>
                <Form.Item label={i18n.t("function")}>
                    <Form.Item name="subtype" noStyle>
                        <Select style={{width: '100%'}} onSelect={this.onSubtypeSelected}>
                            {Object.keys(LegacyButtonMap).map((subtype, i) => (
                                <Select.Option key={i} value={subtype}
                                               title={i18n.t(`legacy_button_description.${subtype}`)}>
                                    {i18n.t(`legacy_button_label.${subtype}`)}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <p style={{marginTop: 12, marginBottom: 0}}>{i18n.t(`legacy_button_description.${this.state.widget.subtype}`)}</p>
                </Form.Item>

                <Form.Item label={i18n.t("icon")} name="icon">
                    {this.iconSelect}
                </Form.Item>
                {this.state.widget.subtype !== LegacyKeypadButton.name && (
                    <Form.Item label={i18n.t("label")} name="label">
                        <Input placeholder={i18n.t(`legacy_button_label.${this.state.widget.subtype}`)} allowClear />
                    </Form.Item>
                )}
                {this.state.widget.subtype === LegacyKeypadButton.name && (
                    <Form.Item label={i18n.t("symbol")} name="symbol">
                        <Input allowClear/>
                    </Form.Item>
                )}
                {this.state.widget.subtype === LegacyLineButton.name && (
                    <Form.Item label={i18n.t("line")} name="line">
                        <Input allowClear/>
                    </Form.Item>
                )}
                {this.state.widget.subtype === LegacyParkCallButton.name && (
                    <Form.Item label={i18n.t("number")} name="number">
                        <Input allowClear/>
                    </Form.Item>
                )}
                {this.state.widget.subtype === LegacyQuickCallButton.name && (<>
                    <Form.Item label="0" name="keypad_zero">
                        <Input allowClear/>
                    </Form.Item>
                    <Form.Item label="1" name="keypad_one">
                        <Input allowClear/>
                    </Form.Item>
                    <Form.Item label="2" name="keypad_two">
                        <Input allowClear/>
                    </Form.Item>
                    <Form.Item label="3" name="keypad_three">
                        <Input allowClear/>
                    </Form.Item>
                    <Form.Item label="4" name="keypad_four">
                        <Input allowClear/>
                    </Form.Item>
                    <Form.Item label="5" name="keypad_five">
                        <Input allowClear/>
                    </Form.Item>
                    <Form.Item label="6" name="keypad_six">
                        <Input allowClear/>
                    </Form.Item>
                    <Form.Item label="7" name="keypad_seven">
                        <Input allowClear/>
                    </Form.Item>
                    <Form.Item label="8" name="keypad_eight">
                        <Input allowClear/>
                    </Form.Item>
                    <Form.Item label="9" name="keypad_nine">
                        <Input allowClear/>
                    </Form.Item>
                    <Form.Item label="*" name="keypad_asterisk">
                        <Input allowClear/>
                    </Form.Item>
                    <Form.Item label="#" name="keypad_sharp">
                        <Input allowClear/>
                    </Form.Item>
                </>)}
                {this.state.widget.subtype === LegacyOneTouchDialButton.name && (
                    <>
                        <Form.Item label={i18n.t("number")} name="number">
                            <Input allowClear/>
                        </Form.Item>
                        <Form.Item label={i18n.t("mode")} name="onetouchdialMode">
                            <Select
                                // onChange={(value) => {
                                // }}
                                style={{ width: "100%"}}
                                //placeholder="Please select a option"
                                defaultValue={"callOnly"}
                            >
                                <Option value="callOnly">{i18n.t("callOnly")}</Option>
                                <Option value="attendedTransferOrCall">{i18n.t("attendedTransferOrCall")}</Option>
                                <Option value="blindTransferOrCall">{i18n.t("blindTransferOrCall")}</Option>
                                <Option value="attendedTransferOnly">{i18n.t("attendedTransferOnly")}</Option>
                                <Option value="blindTransferOnly">{i18n.t("blindTransferOnly")}</Option>
                            </Select>
                        </Form.Item>
                    </>
                )}
                <Form.Item label={i18n.t("fgColor")} name={"buttonFgColor" } rules={[
                    {
                        required: false,
                    }
                ]}>
                    <Colorpicker format="rgb" />
                </Form.Item>
                <Form.Item label={i18n.t("bgColor")} name={`buttonBgColor`} rules={[
                    {
                        required: false,
                    }
                ]}>
                    <Colorpicker format="rgb" />
                </Form.Item>
                <Form.Item label={i18n.t("outerBorderColor")} name={`buttonOuterBorderColor`} rules={[
                    {
                        required: false,
                    }
                ]}>
                    <Colorpicker format="rgb" />
                </Form.Item>
                <Form.Item  label={i18n.t("outerBorderRadius")} name="buttonOuterBorderRadius" rules={[
                    {
                        required: false,
                    },
                ]}>
                    <InputNumber min="0" />
                </Form.Item>
                <Form.Item  label={i18n.t("outerBorderThickness")} name="buttonOuterBorderThickness" rules={[
                    {
                        required: false,
                    },
                ]}>
                    <InputNumber min="1" />
                </Form.Item>
            </Form>
        )
    }
};

function LegacyButton(props) {
    const Component = LegacyButtonMap[props.subtype];
    if (!Component) {
        return null;
    }
    const label = props.label || i18n.t(`legacy_button_label.${props.subtype}`);
    return (
        <Component {...props} label={label} />
    )
}

class LegacyExtensionStatusSettings extends React.Component {
    constructor(props) {
        super(props);
        this.formRef = React.createRef();
        this.state = {
            widget: window.structuredClone(this.props.widget),
        };
        this.onChangeDebounced = debounce(props.onChange, 250);
    }

    componentDidUpdate(prevProps) {
        if (this.props.widgetIndex != prevProps.widgetIndex) {
            const widget = window.structuredClone(this.props.widget);
            this.setState({widget}, () => {
                this.formRef.current.resetFields();
            })
        }
        if (this.props.onChange != prevProps.onChange) {
            this.onChangeDebounced = debounce(this.props.onChange, 250);
        }
    }

    render() {
        return (
            <Form ref={this.formRef} layout="vertical" initialValues={this.state.widget} onValuesChange={this.onChangeDebounced}>
                <Form.Item label={i18n.t("extension")} name="extension">
                    <Input/>
                </Form.Item>
                <Form.Item label={i18n.t("fgColor")} name={"exStatusFgColor" } rules={[
                    {
                        required: false,
                    }
                ]}>
                    <Colorpicker format="rgb" />
                </Form.Item>
            </Form>
        )
    }
}

class TextSettings extends React.Component {
    constructor(props) {
        super(props);
        this.formRef = React.createRef();
        this.state = {
            widget: window.structuredClone(this.props.widget),
        };
        this.onChangeDebounced = debounce(props.onChange, 250);
    }

    componentDidUpdate(prevProps) {
        if (this.props.widgetIndex != prevProps.widgetIndex) {
            const widget = window.structuredClone(this.props.widget);
            this.setState({widget}, () => {
                this.formRef.current.resetFields();
            })
        }
        if (this.props.onChange != prevProps.onChange) {
            this.onChangeDebounced = debounce(this.props.onChange, 250);
        }
    }

    render() {
        return (
            <Form ref={this.formRef} layout="vertical" initialValues={this.state.widget} onValuesChange={this.onChangeDebounced}>
                <Form.Item label={i18n.t("text")} name="text">
                    <Input.TextArea rows={6} />
                </Form.Item>
                <Form.Item label={i18n.t("fgColor")} name={"textFgColor" } rules={[
                    {
                        required: false,
                    }
                ]}>
                    <Colorpicker format="rgb" />
                </Form.Item>
                <Form.Item label={i18n.t("bgColor")} name={"textBgColor" } rules={[
                    {
                        required: false,
                    }
                ]}>
                    <Colorpicker format="rgb" />
                </Form.Item>
                <Form.Item  label={i18n.t("borderRadius")} name="textBorderRadius" rules={[
                    {
                        required: false,
                    },
                ]}>
                    <InputNumber min="0" />
                </Form.Item>
            </Form>
        )
    }
};

class NoteSettings extends React.Component {
    constructor(props) {
        super(props);
        this.formRef = React.createRef();
        this.state = {
            widget: window.structuredClone(this.props.widget),
            nameOptions: [],
        };
        this.onChangeDebounced = debounce(props.onChange, 250);
    }

    componentDidMount() {
        if (this.props.getNoteNames) {
            this.props.getNoteNames().then((names) => {
                this.setState({ nameOptions: names.map((value) => ({ value })) });
            })
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.widgetIndex != prevProps.widgetIndex) {
            const widget = window.structuredClone(this.props.widget);
            this.setState({widget}, () => {
                this.formRef.current.resetFields();
            })
        }
        if (this.props.onChange != prevProps.onChange) {
            this.onChangeDebounced = debounce(this.props.onChange, 250);
        }
    }

    render() {
        return (
            <Form ref={this.formRef} layout="vertical" initialValues={this.state.widget} onValuesChange={this.onChangeDebounced}>
                <Form.Item  label={i18n.t("borderRadius")} name="noteBorderRadius" rules={[
                    {
                        required: false,
                    },
                ]}>
                    <InputNumber min="0" />
                </Form.Item>
                <divider>{i18n.t("noteName_settings")}</divider>
                <Form.Item label={i18n.t("name")} name="noteName">
                    <AutoComplete options={this.state.nameOptions} />
                </Form.Item>
                <Form.Item label={i18n.t("fgColor")} name={"noteNameFgColor" } rules={[
                    {
                        required: false,
                    }
                ]}>
                    <Colorpicker format="rgb" />
                </Form.Item>
                <Form.Item label={i18n.t("bgColor")} name={`noteNameBgColor`} rules={[
                    {
                        required: false,
                    }
                ]}>
                    <Colorpicker format="rgb" />
                </Form.Item>
                <divider>{i18n.t("noteText_settings")}</divider>
                <Form.Item label={i18n.t("fgColor")} name={`noteTextFgColor`} rules={[
                    {
                        required: false,
                    }
                ]}>
                    <Colorpicker format="rgb" />
                </Form.Item>
                <Form.Item label={i18n.t("startBgColor")} name={`noteBgStartColor`} rules={[
                    {
                        required: false,
                    }
                ]}>
                    <Colorpicker format="rgb" />
                </Form.Item>
                <Form.Item label={i18n.t("endBgColor")} name={`noteBgEndColor`} rules={[
                    {
                        required: false,
                    }
                ]}>
                    <Colorpicker format="rgb" />
                </Form.Item>
            </Form>
        )
    }
};

const WidgetMap = {
    [LegacyButton.name]: LegacyButton,
    [LegacyCallPanel.name]: LegacyCallPanel,
    [LegacyExtensionStatus.name]: LegacyExtensionStatus,
    [Text.name]: Text,
    [CallTable.name]: CallTable,
    [ExtensionTable.name]: ExtensionTable,
    ['Note']: Note,
    [LineTable.name]: LineTable,
    [LegacyUccacWidget.name]: LegacyUccacWidget
}
const WidgetPreviewMap = {
    [CallTablePreview.name]: CallTablePreview,
    [ExtensionTablePreview.name]: ExtensionTablePreview,
    [NotePreview.name]: NotePreview,
    [LineTablePreview.name]: LineTablePreview,
    [UccacWidgetPreview.name]:UccacWidgetPreview
}
const WidgetSettingsMap = {
    [LegacyButton.name]: LegacyButtonSettings,
    [LegacyExtensionStatus.name]: LegacyExtensionStatusSettings,
    [Text.name]: TextSettings,
    ['Note']: NoteSettings,
    [LineTable.name]: LineTableSettings,
    [LegacyCallPanel.name]:LegacyCallPanelSettings,
    [CallTable.name]: CallTableSettings,
    [ExtensionTable.name]: ExtensionTableSettings,
    [LegacyUccacWidget.name]:LegacyUccacWidgetSettings
}

const ToolboxWidgets = [
    {type: LegacyButton.name, width: 72, height: 72, subtype: LegacyDummyButton.name },
    {type: LegacyCallPanel.name,
        width: 200, height: 128,
        //borderRadius:8,
        //callpanelBgColor:"#A8C64E",
        ////callpanelFgColor:"",
        //outsideShadow_horizontalOffset:0, outsideShadow_verticalOffset:-1,
        //outsideShadow_blur:7,outsideShadow_spread:1,
        //outsideShadow_color:{"r":0,"g":0,"b":0,"a":0.2},
        //insideShadow_horizontalOffset:0,insideShadow_verticalOffset:-1,
        //insideShadow_blur:9,insideShadow_spread:0,
        //insideShadow_color:{"r":48,"g":71,"b":1,"a":1} //"#304701"
    },
    {type: LegacyExtensionStatus.name, width: 64, extension: '' },
    {type: Text.name, width: 64, height: 72, text:'Text' },
    {type: CallTable.name, width: 640, height: 128, preview: CallTablePreview.name, previewWidth: 128, previewHeight: 64 },
    {type: ExtensionTable.name, width: 640, height: 128, preview: ExtensionTablePreview.name, previewWidth: 128, previewHeight: 64 },
    {type: 'Note', previewWidth: 64, previewHeight: 64, width: 320, height: 320, preview: NotePreview.name },
    {type: LineTable.name, width: 640, height: 128, preview: LineTablePreview.name, previewWidth: 128, previewHeight: 64 },
    {type: LegacyUccacWidget.name,
        width: 470, height: 300,
        preview:UccacWidgetPreview.name
        //borderRadius:8,
        //uccacWidgetBgColor:"#A8C64E",
        ////uccacWidgetFgColor:"",
        //outsideShadow_horizontalOffset:0, outsideShadow_verticalOffset:-1,
        //outsideShadow_blur:7,outsideShadow_spread:1,
        //outsideShadow_color:{"r":0,"g":0,"b":0,"a":0.2},
        //insideShadow_horizontalOffset:0,insideShadow_verticalOffset:-1,
        //insideShadow_blur:9,insideShadow_spread:0,
        //insideShadow_color:{"r":48,"g":71,"b":1,"a":1} //"#304701"
    },
];

const DEFAULT_WIDGETS = [
    {
        "type": "LegacyButton",
        "width": 72,
        "height": 72,
        "subtype": "LegacyLineButton",
        "x": 0,
        "y": 0
    },
    {
        "type": "LegacyButton",
        "width": 72,
        "height": 72,
        "subtype": "LegacyLineButton",
        "x": 80,
        "y": 0
    },
    {
        "type": "LegacyButton",
        "width": 72,
        "height": 72,
        "subtype": "LegacyCallTalkingButton",
        "x": 160,
        "y": 0
    },
    {
        "type": "LegacyButton",
        "width": 72,
        "height": 72,
        "subtype": "LegacyLineButton",
        "x": 240,
        "y": 0
    },
    {
        "type": "LegacyButton",
        "width": 72,
        "height": 72,
        "subtype": "LegacyNoAnswerButton",
        "x": 320,
        "y": 0
    },
    {
        "type": "LegacyButton",
        "width": 72,
        "height": 72,
        "subtype": "LegacyCallbackButton",
        "x": 400,
        "y": 0
    },
    {
        "type": "LegacyButton",
        "width": 72,
        "height": 72,
        "subtype": "LegacyTransferButton",
        "x": 480,
        "y": 0
    },
    {
        "type": "LegacyButton",
        "width": 72,
        "height": 72,
        "subtype": "LegacyToggleRecordingButton",
        "x": 720,
        "y": 0
    },
    {
        "type": "LegacyButton",
        "width": 72,
        "height": 72,
        "subtype": "LegacyAlarmButton",
        "x": 960,
        "y": 0
    },
    {
        "type": "LegacyButton",
        "width": 72,
        "height": 72,
        "subtype": "LegacyPrevCallButton",
        "icon": "fas fa-chevron-up",
        "x": 1040,
        "y": 0
    },
    {
        "type": "LegacyButton",
        "width": 72,
        "height": 72,
        "subtype": "LegacyMonitorDialingExtensionButton",
        "x": 80,
        "y": 80
    },
    {
        "type": "LegacyButton",
        "width": 72,
        "height": 72,
        "subtype": "LegacyStationLineDesignationButton",
        "x": 160,
        "y": 80
    },
    {
        "type": "LegacyButton",
        "width": 72,
        "height": 72,
        "subtype": "LegacyParkCallButton",
        "x": 240,
        "y": 80
    },
    {
        "type": "LegacyButton",
        "width": 72,
        "height": 72,
        "subtype": "LegacySeriesSetButton",
        "x": 320,
        "y": 80
    },
    {
        "type": "LegacyButton",
        "width": 72,
        "height": 72,
        "subtype": "LegacyMonitoringCallButton",
        "x": 400,
        "y": 80
    },
    {
        "type": "LegacyButton",
        "width": 72,
        "height": 72,
        "subtype": "LegacyStartButton",
        "x": 640,
        "y": 80
    },
    {
        "type": "LegacyButton",
        "width": 72,
        "height": 72,
        "subtype": "LegacyToggleMutedButton",
        "x": 720,
        "y": 80
    },
    {
        "type": "LegacyButton",
        "width": 72,
        "height": 72,
        "subtype": "LegacyLeavingSeatButton",
        "x": 800,
        "y": 80
    },
    {
        "type": "LegacyButton",
        "width": 72,
        "height": 72,
        "subtype": "LegacyNightTimeButton",
        "x": 880,
        "y": 80
    },
    {
        "type": "LegacyButton",
        "width": 72,
        "height": 72,
        "subtype": "LegacyAvailableButton",
        "x": 960,
        "y": 80
    },
    {
        "type": "LegacyButton",
        "width": 72,
        "height": 72,
        "subtype": "LegacyNextCallButton",
        "icon": "fas fa-chevron-down",
        "x": 1040,
        "y": 80
    },
    {
        "type": "LegacyButton",
        "width": 72,
        "height": 72,
        "subtype": "LegacyLineButton",
        "x": 0,
        "y": 200,
        "label": "Line 1",
        "line": "external/1"
    },
    {
        "type": "LegacyButton",
        "width": 72,
        "height": 72,
        "subtype": "LegacyLineButton",
        "x": 0,
        "y": 280,
        "label": "Line 2",
        "line": "external/2"
    },
    {
        "type": "LegacyButton",
        "width": 72,
        "height": 72,
        "subtype": "LegacyLineButton",
        "x": 0,
        "y": 360,
        "label": "Line 3",
        "line": "external/3"
    },
    {
        "type": "LegacyButton",
        "width": 72,
        "height": 72,
        "subtype": "LegacyLineButton",
        "x": 0,
        "y": 440,
        "label": "Line 4",
        "line": "external/4"
    },
    {
        "type": "LegacyButton",
        "width": 72,
        "height": 72,
        "subtype": "LegacyLineButton",
        "x": 0,
        "y": 520,
        "label": "Line 5",
        "line": "external/5"
    },
    {
        "type": "LegacyButton",
        "width": 72,
        "height": 72,
        "subtype": "LegacyLineButton",
        "x": 0,
        "y": 610,
        "label": "Line 6",
        "line": "external/6"
    },
    {
        "type": "LegacyButton",
        "width": 72,
        "height": 72,
        "subtype": "LegacyKeypadButton",
        "x": 340,
        "y": 310,
        "symbol": "1"
    },
    {
        "type": "LegacyButton",
        "width": 72,
        "height": 72,
        "subtype": "LegacyKeypadButton",
        "x": 420,
        "y": 310,
        "symbol": "2"
    },
    {
        "type": "LegacyButton",
        "width": 72,
        "height": 72,
        "subtype": "LegacyKeypadButton",
        "x": 500,
        "y": 310,
        "symbol": "3"
    },
    {
        "type": "LegacyButton",
        "width": 72,
        "height": 72,
        "subtype": "LegacyKeypadButton",
        "x": 340,
        "y": 390,
        "symbol": "4"
    },
    {
        "type": "LegacyButton",
        "width": 72,
        "height": 72,
        "subtype": "LegacyKeypadButton",
        "x": 420,
        "y": 390,
        "symbol": "5"
    },
    {
        "type": "LegacyButton",
        "width": 72,
        "height": 72,
        "subtype": "LegacyKeypadButton",
        "x": 500,
        "y": 390,
        "symbol": "6"
    },
    {
        "type": "LegacyButton",
        "width": 72,
        "height": 72,
        "subtype": "LegacyKeypadButton",
        "x": 340,
        "y": 470,
        "symbol": "7"
    },
    {
        "type": "LegacyButton",
        "width": 72,
        "height": 72,
        "subtype": "LegacyKeypadButton",
        "x": 420,
        "y": 470,
        "symbol": "8"
    },
    {
        "type": "LegacyButton",
        "width": 72,
        "height": 72,
        "subtype": "LegacyKeypadButton",
        "x": 500,
        "y": 470,
        "symbol": "9"
    },
    {
        "type": "LegacyButton",
        "width": 72,
        "height": 72,
        "subtype": "LegacyKeypadButton",
        "x": 340,
        "y": 550,
        "symbol": "*"
    },
    {
        "type": "LegacyButton",
        "width": 72,
        "height": 72,
        "subtype": "LegacyKeypadButton",
        "x": 420,
        "y": 550,
        "symbol": "0"
    },
    {
        "type": "LegacyButton",
        "width": 72,
        "height": 72,
        "subtype": "LegacyKeypadButton",
        "x": 500,
        "y": 550,
        "symbol": "#"
    },
    {
        "type": "LegacyButton",
        "width": 152,
        "height": 72,
        "subtype": "LegacyMakeCallButton",
        "icon": "fas fa-phone",
        "x": 340,
        "y": 630
    },
    {
        "type": "LegacyButton",
        "width": 72,
        "height": 72,
        "subtype": "LegacyBackspaceButton",
        "icon": "fas fa-delete-left",
        "x": 500,
        "y": 630
    },
    {
        "type": "LegacyButton",
        "width": 72,
        "height": 72,
        "subtype": "LegacyIncomingCallButton",
        "x": 690,
        "y": 310
    },
    {
        "type": "LegacyButton",
        "width": 72,
        "height": 72,
        "subtype": "LegacyThreeWayCallButton",
        "x": 770,
        "y": 310
    },
    {
        "type": "LegacyButton",
        "width": 72,
        "height": 72,
        "subtype": "LegacyOutgoingCallButton",
        "x": 850,
        "y": 310
    },
    {
        "type": "LegacyButton",
        "width": 150,
        "height": 70,
        "subtype": "LegacyHangUpCallButton",
        "x": 1010,
        "y": 310
    },
    {
        "type": "LegacyButton",
        "width": 150,
        "height": 70,
        "subtype": "LegacyUnholdCallButton",
        "x": 690,
        "y": 400
    },
    {
        "type": "LegacyButton",
        "width": 150,
        "height": 70,
        "subtype": "LegacyHoldCallButton",
        "x": 850,
        "y": 400
    },
    {
        "type": "LegacyButton",
        "width": 150,
        "height": 70,
        "subtype": "LegacyPickUpCallButton",
        "x": 1010,
        "y": 400
    },
    {
        "type": "LegacyCallPanel",
        "width": 290,
        "height": 140,
        "x": 310,
        "y": 160,
        //"borderRadius": 8,
        //"callpanelBgColor": "#A8C64E",
        ////"callpanelFgColor": "",
        //outsideShadow_horizontalOffset:0, outsideShadow_verticalOffset:-1,
        //outsideShadow_blur:7,outsideShadow_spread:1,
        //outsideShadow_color:{"r":0,"g":0,"b":0,"a":0.2},
        //insideShadow_horizontalOffset:0, insideShadow_verticalOffset:-1,
        //insideShadow_blur:9,insideShadow_spread:0,
        //insideShadow_color:{"r":48,"g":71,"b":1,"a":1} //"#304701"
    },
    {
        "type": "LegacyExtensionStatus",
        "width": 72,
        "height": 72,
        "extension": "1001",
        "x": 690,
        "y": 180
    },
    {
        "type": "LegacyExtensionStatus",
        "width": 72,
        "height": 72,
        "extension": "1002",
        "x": 760,
        "y": 180
    },
    {
        "type": "LegacyExtensionStatus",
        "width": 72,
        "height": 72,
        "extension": "1003",
        "x": 830,
        "y": 180
    },
    {
        "type": "LegacyButton",
        "width": 72,
        "height": 72,
        "subtype": "LegacyDummyButton",
        "x": 560,
        "y": 0
    },
    {
        "type": "LegacyButton",
        "width": 72,
        "height": 72,
        "subtype": "LegacyDummyButton",
        "x": 640,
        "y": 0
    },
    {
        "type": "LegacyButton",
        "width": 72,
        "height": 72,
        "subtype": "LegacyDummyButton",
        "x": 0,
        "y": 80
    },
    {
        "type": "LegacyButton",
        "width": 72,
        "height": 72,
        "subtype": "LegacyDummyButton",
        "x": 480,
        "y": 80
    },
    {
        "type": "LegacyButton",
        "width": 72,
        "height": 72,
        "subtype": "LegacyDummyButton",
        "x": 560,
        "y": 80
    }
];
const DEFAULT_SCREEN = {
    "widgets": [],
    "background": "#ffffff00",
    "foreground":"#000000",
    "width": 1280,
    "height": 720,
    "grid": 10,
    "tabDatas" : [{
        tabTitle:"Untitled tab",
        widgetDatas: new Array()
    }]
};
const DEFAULT_SCREENS = [
    window.structuredClone({...DEFAULT_SCREEN, widgets: DEFAULT_WIDGETS}),
    window.structuredClone(DEFAULT_SCREEN),
    window.structuredClone(DEFAULT_SCREEN)
];

const EMPTY_SCREENS = [
    window.structuredClone(DEFAULT_SCREEN)
];

const INIT_STATE = {
    i18nReady: false,

    isInitialized: false,
    loginUser: null,
    syncDownedScreens: false,
    syncDownedSystemSettings: false,
    _downedLayoutAndSystemSettings: false,
    syncLoadedCallHistory: false,
    //callIds: [],
    //callById: {},
    dialing: '',
    extensions: [],
    autoRejectIncoming: false,
    extensionsStatus: {},
    monitoringExtension: '',
    linesStatus: {},
    parksStatus: {},
    myParksStatus: {},
    usingLine: '',

    selectingWidgetIndex: -1,
    //editingWidgets: [],
    editingScreenWidth: 400,
    editingScreenHeight: 400,
    editingScreenGrid: 10,
    editingScreenBackground: '#ffffff00',
    editingScreenForeground:'#000000',

    currentScreenQuickCallWidget: null,
    currentScreenQuickCallWidgetSubData: null,
    currentScreenIndex: 0,
    screens: [DEFAULT_SCREEN],

    locale: '',
    displayState: undefined,
    showAutoDialWidgets: [],
    showAutoDialWidgetSubDatas_ver2 : [],
    //isSaveEditingScreenButtonDisabled: false
    currentScreenTabIndex : 0,
    isSelectingTabInEditLayout : false,
    editingTabDatas : new Array()
};


export default class BrekekeOperatorConsole extends React.Component {
    constructor(props) {
        super(props);
        BREKEKE_OPERATOR_CONSOLE = this;
        this._DefaultPbxDirectoryName = "pbx";
        //this.callById = {};
        //this._callIds = new Array();
		this._disableKeydownToDialingCounter = 0;
		this._disablePasteToDialingCounter = 0;
        this._isDTMFInput = false;
        this._OnBackspaceKeypadValueCallbacks = [];
        this._OnAppendKeypadValueCallbacks = [];
        this._OnClearDialingCallbacks = [];
        //this._OnSetCurrentScreenIndexCallbacks = [];
        this._systemSettingsView = null;
        this.state = window.structuredClone(INIT_STATE);
        this._PalRestApi = new PalRestApi();
        //this.state.operatorConsole = this;
        this._CallHistory = new CallHistory(this);
        this._CallHistory2 = new CallHistory2( this );
        this._OnBeginSaveEditingScreenFunctions = [];
        // this._OnSelectWidgetFuncs = [];
        // this._OnDeselectWidgetFuncs =
        this._Campon = new Campon(this);
        this._ExtensionsStatus = new ExtensionsStatus( this );
        this._UccacWrapper = new UccacWrapper( this );
        this._BrekekeOperatorConsoleEx = new BrekekeOperatorConsoleEx(this);
        //this._OnChangeCallEventListeners = new Array();

        this._OnAddCallInfoEventListeners = new Array();
        this._OnUpdateCallInfoEventListeners = new Array();
        this._OnHoldCallInfoEventListeners = new Array();
        this._OnUnholdCallInfoEventListeners = new Array();
        this._OnRemoveCallInfoEventListeners = new Array();

        //this._OnChangeCurrentCallIdEventListeners = new Array();
        this._OnUnloadExtensionScriptEventListeners = new Array();
        //this._OnPalNotifyStatusEventListeners = new Array();
        //this._BusylightStatusChanger = new BusylightStatusChanger(this); //!dev
        this._aphone = null;
        this._loggedinPal = null;

        this._LoginPalWrapper = new PalWrapper();

        this._RootURLString = Util.getRootUrlString();
        this._DefaultButtonImageFileInfos = new FileInfosLoader();
        this._OnBeforeUnloadFunc = (event) => { this._onBeforeUnload(event)};
        this._OnUnloadFunc = (event) => { this._onUnload( event )};
        window.addEventListener("unload", this._OnUnloadFunc );
        this._defaultSystemSettingsData = new SystemSettingsData( this );
    }

    getDefaultButtonImageFileInfos(){
        return this._DefaultButtonImageFileInfos;
    }

    getPhoneClient(){
        return this._aphone;
    }

    onAnswerCalleeByPalCallInfo( palCallInfo ){
        //If the call is not active when the other party answers, it will be put on hold.
        const currentCallId = this._aphone.getCallInfos().getCurrentCallId();
        const callId = palCallInfo.getCallId();
        const isActive = currentCallId === callId;
        if( !isActive ){
            if( !palCallInfo.getIsHolding() ){
                palCallInfo.toggleHoldWithCheck();
            }
        }
    }


    onDeinitUccacWrapperByUccacWrapper( uccacWrapperAsCaller ){
        // const screen = this._getCurrentScreen();
        // const widgets = screen.widgets;
        // for( let i = 0; i < widgets.length; i++ ){
        //     const widget = widgets[i];
        //     const widgetType = widget.type;
        //     if( widgetType === "LegacyUccacWidget") {
        //         widget.onDeinitUccacWrapperByOperatorConsole(this, uccacWrapperAsCaller );
        //     }
        // }
    }

    onInitUccacWrapperSuccessByUccacWrapper( uccacWrapperAsCaller ){
        // const screen = this._getCurrentScreen();
        // const widgets = screen.widgets;
        // for( let i = 0; i < widgets.length; i++ ){
        //     const widget = widgets[i];
        //     const widgetType = widget.type;
        //     if( widgetType === "LegacyUccacWidget") {
        //         widget.onInitUccacWrapperSuccessByOperatorConsole(this, uccacWrapperAsCaller );
        //     }
        // }
    }

    onSelectOCNoteByShortnameFromNoScreensView( noScreensViewAsCaller ){
        //this.reloadSystemSettingsExtensionScript();
        this.setState( { _downedLayoutAndSystemSettings:true, displayState : brOcDisplayStates.showScreen_ver2 } );

    }

    onSavedNewLayoutFromNoScreensView(  layoutName, layoutsAndSettingsData  ){
        const systemSettingsData = this.getSystemSettingsData();
        const this_ = this;
        systemSettingsData.setSystemSettingsDataData( layoutsAndSettingsData.systemSettings,
            function(){
                this_.setLastLayoutShortname( layoutName );
                const screenData_ver2 = new ScreenData();
                this_.setState( { screenData_ver2 : screenData_ver2, _downedLayoutAndSystemSettings:true, screens: layoutsAndSettingsData.screens, systemSettingsData:systemSettingsData, displayState:brOcDisplayStates.showScreen_ver2, newLayoutModalOpen:false } );
            },
            function(e){ //initFail
                //!testit
                if( Array.isArray(e)){
                    for( let i = 0; i < e.length; i++ ){
                        const err = e[i];
                        console.error("setSystemSettingsDataData failed. errors[" + i + "]=" , err );
                    }
                }
                else{
                    console.error("setSystemSettingsDataData failed. error=" , e );
                }

                try {
                    e = JSON.stringify(e);
                }
                catch(err){
                }
                Notification.error({message: i18n.t('failedToSetupSystemSettingsDataData') + "\r\n" +  e, duration:0 });
            }
        );
    }

    _initAphoneClient( aphone, initOptions ){
        this._aphone = aphone;
        this._aphone.initPhoneClient( initOptions );
    }

    _deinitAphoneClient(){
        if( !this._aphone ){
            return;
        }
        this._aphone.deinitPhoneClient();
        this._aphone = null;
    }


    addOnClearDialingCallbacks(callback) {
        this._OnClearDialingCallbacks.push(callback);
    }

    static getAppDataVersion(){
        return PBX_APP_DATA_VERSION;
    }

    getSystemSettingsData(){
        const systemSettingsData = this.state.systemSettingsData;
        return systemSettingsData;
    }


    static getDefaultScreens(){
        return DEFAULT_SCREENS;
    }

    static getEmptyScreens(){
        return EMPTY_SCREENS;
    }

    getCampon(){
        return this._Campon;
    }

    getExtensionsStatusInstance(){
        return this._ExtensionsStatus;
    }

    getState() {
        return this.state;
    }

    // getCallByRoomId( roomId ) {
    //     const call = Object.values( this.callById).find((call) => call.pbxRoomId === roomId );
    //     return call;
    // }

    getCallHistory2(){
        return this._CallHistory2;
    }

    onSavingSystemSettings(systemSettingsAsCaller) {
        this.getCallHistory().onSavingSystemSettings(this);
        this._CallHistory2.onSavingSystemSettingsForCallHistory2(this);
    }

    onBeginSetSystemSettingsData( newData, systemSettingsDataAsCaller, onInitSuccessUccacFunction, onInitFailUccacFunction  ){
        const isUCMinScript = false;    //!dev
        const this_ = this;
        const bPhoneTerminalChanged = newData.phoneTerminal  !== systemSettingsDataAsCaller.getPhoneTerminal();
        if( bPhoneTerminalChanged || this._aphone == null  ){
            this._deinitAphoneClient();
            const options = {
                operatorConsoleAsParent : this
            };
            const pt = newData.phoneTerminal;
            let phoneClient;
            if( pt === "phoneTerminal_pal"){
                phoneClient = new PalPhoneClient( options );
            }
            else{
                phoneClient = new WebphonePhoneClient( options );
            }

            const initOptions = {...this._getLastLoginAccount()}

            initOptions.onInitSuccessFunction = function( oExtensions ){
                console.log('extensions', oExtensions);
                this_.setState({ extensions: oExtensions },
                    () =>{
                        const initAsync = this_._UccacWrapper.onBeginSetSystemSettingsDataByOperatorConsoleAsParent( newData, systemSettingsDataAsCaller,
                            function() {
                                onInitSuccessUccacFunction();
                                this_._deinitPalWrapper();
                            },
                            onInitFailUccacFunction, isUCMinScript
                        );
                        //return initAsync;
                    }
                );
            };
            initOptions.onInitFailFunction = function( error ){
                onInitFailUccacFunction(error);
            };
            this._initAphoneClient(  phoneClient,  initOptions );
            return false;
        }
        else{
            const initAsync = this_._UccacWrapper.onBeginSetSystemSettingsDataByOperatorConsoleAsParent( newData, systemSettingsDataAsCaller,
                function() {
                    onInitSuccessUccacFunction();
                    this_._deinitPalWrapper();
                },
                onInitFailUccacFunction, isUCMinScript
            );
            return initAsync;
        }

    }

    getCallHistory() {
        return this._CallHistory;
    }

    componentDidMount() {
        this.startShowScreen();

        i18n.onChange(() => {
            if (i18n.locale !== this.state.locale) {
                this.setState({i18nReady: false, locale: i18n.locale}, () => {
                    loadTranslations(i18n.locale).then(() => {
                        this.setState({i18nReady: true});
                    }).catch( (e) =>{
                        console.error("Load translations failed. error=" , e );
                        Notification.error({message: "Load translations failed.", duration:0 });
                    });
                });
            }
        });
        i18n.defaultLocale = '';

        // const lastLoginAccount = localStorage.getItem('lastLoginAccount') || '';
        // try {
        //   this.setState({lastLoginAccount: JSON.parse(lastLoginAccount)})
        // } catch (err) {
        //   console.log('failed to get last signed in account', err);
        // }

        const this_ = this;
        this._onPasteFunction = function(e){
            this_._onPaste(e);
        };
        window.addEventListener("paste",  this._onPasteFunction);
        this._onKeydownFunction =  function(e){
            this_._onKeydown(e);
        };
        window.addEventListener("keydown", this._onKeydownFunction );

    }

    getIsDTMFInput(){
        return this._isDTMFInput;
    }

    componentWillUnmount(){
        window.removeEventListener( "paste", this._onPasteFunction);
        window.removeEventListener( "keydown", this._onKeydown);
    }

    addDisableKeydownToDialingCounter(){
        this._disableKeydownToDialingCounter++;
    }

    subtractDisableKeydownToDialingCounter(){
        this._disableKeydownToDialingCounter--;
    }


    addDisablePasteToDialingCounter(){
        this._disablePasteToDialingCounter++;
    }

    subtractDisablePasteToDialingCounter(){
        this._disablePasteToDialingCounter--;
    }

    // _onKeydown(e){
	// 	console.log("onKeydown.e=" , e );
    //     if( this._disableKeydownToDialingCounter > 0  ){
    //         return;
    //     }
    //
    //     const isDowned = this.state._downedLayoutAndSystemSettings;
    //     if( !isDowned ){
    //         return;
    //     }
    //     const isScreenView = this.state.displayState === brOcDisplayStates.showScreen;
    //     const isShowScreenView_ver2 = this.state.displayState === brOcDisplayStates.showScreen_ver2;
    //     if( !isScreenView && !isShowScreenView_ver2 ){
    //         return;
    //     }
    //
    //     //const [newLayoutModalOpen, setNewLayoutModalOpen] = useState(false);
    //     const newLayoutModalOpen = this.state.newLayoutModalOpen;
    //     if( newLayoutModalOpen === true ){
    //         return;
    //     }
    //
    //     if (
    //         e.getModifierState("Hyper") ||
    //         e.getModifierState("Fn") ||
    //         e.getModifierState("Super") ||
    //         e.getModifierState("OS") ||
    //         e.getModifierState("Win") ||  /* hack for IE */
    //         e.getModifierState("Copilot") /* //!todo //!check //!forbug  work? */
    //     ) {
    //         return;
    //     }
    //
    //     if (
    //         e.getModifierState("Alt") +
    //         e.getModifierState("Control") +
    //         e.getModifierState("Meta") >
    //         1
    //     ) {
    //         return;
    //     }
    //
    //     if (
    //         (e.getModifierState("ScrollLock") ||
    //             e.getModifierState("Scroll")) /* hack for IE */ &&
    //         !e.getModifierState("Control") &&
    //         !e.getModifierState("Alt") &&
    //         !e.getModifierState("Meta")
    //     ) {
    //         switch (e.key) {
    //             case "ArrowDown":
    //             case "Down":
    //                 //e.preventDefault();
    //                 //break;
    //                 return;
    //             case "ArrowLeft":
    //             case "Left":
    //                 //e.preventDefault();
    //                 //break;
    //                 return;
    //             case "ArrowRight":
    //             case "Right":
    //                 //e.preventDefault();
    //                 //break;
    //                 return;
    //             case "ArrowUp":
    //             case "Up":
    //                 //e.preventDefault();
    //                 //break;
    //                 return;
    //             case "Process":
    //                 //e.preventDefault()();
    //                 //break;
    //                 return;
    //         }
    //     }
    //
    //
    //     const keyCode = e.keyCode;
    //     switch( keyCode ) {
    //         case 13:    //enter key
    //             if( this._isDTMFInput === true ) {
    //                 return;
    //             }
    //             this.makeCall();
    //             this._clearDialing();
    //             return;
    //         case 8: //backspace
    //         {
    //             if( this._isDTMFInput === true ){
    //                 return;
    //             }
    //             let dialing = this.state.dialing;
    //             if (!dialing || dialing.length === 0) {
    //                 return;
    //             }
    //             dialing = dialing.substring(0, dialing.length - 1);
    //             this.setDialing(dialing);
    //             return;
    //         }
    //             break;
    //         case 46:    //delete
    //         {
    //             if( this._isDTMFInput === true ){
    //                 return;
    //             }
    //
    //             let dialing = this.state.dialing;
    //             if (!dialing || dialing.length === 0) {
    //                 return;
    //             }
    //             dialing = dialing.substring(1, dialing.length);
    //             this.setDialing(dialing);
    //             return;
    //         }
    //             break;
    //         case 9: //tab
    //         //case 32: //space
    //         case 16: //shift
    //         case 17: //control
    //         case 18: //alt
    //         case 112: //F1
    //         case 113: //F2
    //         case 114: //F3
    //         case 115: //F4
    //         case 116: //F5
    //         case 117: //F6
    //         case 118: //F7
    //         case 119: //F8
    //         case 120: //F9
    //         case 121: //F10
    //         case 122: //F11
    //         case 123: //F12
    //         case 37:    //Left arrow
    //         case 39:    //Right arrow
    //         case 38: //Up arrow
    //         case 40: //Down arrow
    //         case 93:    //menu
    //         case 144: //Numlock
    //         case 33: //pageup
    //         case 34: //pagedown
    //         case 38: //end
    //         case 36: //home
    //         case 45: //insert
    //         case 145: //scroll lock
    //         case 19: //pause
    //         case 44: //print screen
    //         //case ***; //copilot //!check //!todo //!check //!forbug
    //         case 91: //meta
    //         case 29: //NonConvert
    //         case 0: //char key ( with F12?) //for Firefox
    //         case 229: //char key ( with F12?)
    //             return;
    //             break;
    //     }
    //
    //     //modify keychar
    //     let keychar;
    //     switch(keyCode) {
    //         case 96:    //Num 0
    //             keychar = '0';
    //             break;
    //         case 97:    //Num 1
    //             keychar = '1';
    //             break;
    //         case 98: //Num 2
    //             keychar = '2';
    //             break;
    //         case 99: //Num 3
    //             keychar = '3';
    //             break;
    //         case 100: //Num 4
    //             keychar = '4';
    //             break;
    //         case 101: //Num 5
    //             keychar =  '5';
    //             break;
    //         case 102: //Num 6
    //             keychar = '6';
    //             break;
    //         case 103: //Num 7
    //             keychar = '7';
    //             break;
    //         case 104: //Num 8
    //             keychar = '8';
    //             break;
    //         case 105: //Num 9
    //             keychar = '9';
    //             break;
    //         case 111: //Num divide
    //             keychar = '/';
    //             break;
    //         case 106: //Num multiply
    //             keychar = '*';
    //             break;
    //         case 109: //Num subtract
    //             keychar = '-';
    //             break;
    //         case 107: //Num add
    //             keychar = '+'
    //             break;
    //         case 110: //Num decimal
    //             keychar = '.';
    //             break;
    //         default:
    //             keychar  = String.fromCharCode(keyCode);
    //             break;
    //     }
    //     if( !keychar ){
    //         return;
    //     }
    //     const isCaplockOn =  e.getModifierState( "CapsLock" );
    //     if( isCaplockOn ){
    //         if( e.shiftKey ){
    //             keychar = keychar.toLowerCase();
    //         }
    //         else {
    //             keychar = keychar.toUpperCase();
    //         }
    //     }
    //     else{
    //         if( e.shiftKey ) {
    //             keychar = keychar.toUpperCase();
    //         }
    //         else{
    //             keychar = keychar.toLowerCase();
    //         }
    //     }
    //
    //     if( this._isDTMFInput === true ){
    //         if(  this._isSendDTMFChar( keychar ) !== true ) {
    //             return;
    //         }
    //         let  dialing = this.state.dialing;
    //         if( !dialing ){
    //             dialing = keychar;
    //         }
    //         else {
    //             dialing += keychar;
    //         }
    //
    //         if( dialing.length > BrekekeOperatorConsole.DIALING_MAX_LENGTH ){
    //             dialing = dialing.substring( dialing.length - BrekekeOperatorConsole.DIALING_MAX_LENGTH, dialing.length );
    //         }
    //         this.setDialing( dialing );
    //
    //         this.sendDTMFIfNeed(keychar);
    //
    //     }
    //     else{
    //         let  dialing = this.state.dialing;
    //         if( dialing.length >= BrekekeOperatorConsole.DIALING_MAX_LENGTH ){
    //             return;
    //         }
    //
    //         if( !dialing ){
    //             dialing = keychar;
    //         }
    //         else {
    //             dialing += keychar;
    //         }
    //         this.setDialing( dialing );
    //
    //     }
    //
    // }

    _onKeydown(e){
        console.log("onKeydown.e=" , e );
        if( this._disableKeydownToDialingCounter > 0  ){
            return;
        }

        const isDowned = this.state._downedLayoutAndSystemSettings;
        if( !isDowned ){
            return;
        }
        const isScreenView = this.state.displayState === brOcDisplayStates.showScreen;
        const isShowScreenView_ver2 = this.state.displayState === brOcDisplayStates.showScreen_ver2;
        if( !isScreenView && !isShowScreenView_ver2 ){
            return;
        }

        //const [newLayoutModalOpen, setNewLayoutModalOpen] = useState(false);
        const newLayoutModalOpen = this.state.newLayoutModalOpen;
        if( newLayoutModalOpen === true ){
            return;
        }

        if (
            e.getModifierState("Hyper") ||
            e.getModifierState("Fn") ||
            e.getModifierState("Super") ||
            e.getModifierState("OS") ||
            e.getModifierState("Win") ||  /* hack for IE */
            e.getModifierState("Copilot") /* //!todo //!check //!forbug  work? */
        ) {
            return;
        }

        if (
            e.getModifierState("Alt") +
            e.getModifierState("Control") +
            e.getModifierState("Meta") >
            1
        ) {
            return;
        }

        if (
            (e.getModifierState("ScrollLock") ||
                e.getModifierState("Scroll")) /* hack for IE */ &&
            !e.getModifierState("Control") &&
            !e.getModifierState("Alt") &&
            !e.getModifierState("Meta")
        ) {
            switch (e.key) {
                case "ArrowDown":
                case "Down":
                    //e.preventDefault();
                    //break;
                    return;
                case "ArrowLeft":
                case "Left":
                    //e.preventDefault();
                    //break;
                    return;
                case "ArrowRight":
                case "Right":
                    //e.preventDefault();
                    //break;
                    return;
                case "ArrowUp":
                case "Up":
                    //e.preventDefault();
                    //break;
                    return;
                case "Process":
                    //e.preventDefault()();
                    //break;
                    return;
            }
        }


        const keyCode = e.keyCode;
        switch( keyCode ) {
            case 13:    //enter key
                if( this._isDTMFInput === true ) {
                    return;
                }
                this.makeCall();
                this._clearDialing();
                return;
            case 8: //backspace
            {
                if( this._isDTMFInput === true ){
                    return;
                }
                let dialing = this.state.dialing;
                if (!dialing || dialing.length === 0) {
                    return;
                }
                dialing = dialing.substring(0, dialing.length - 1);
                this.setDialing(dialing);
                return;
            }
                break;
            case 46:    //delete
            {
                if( this._isDTMFInput === true ){
                    return;
                }

                let dialing = this.state.dialing;
                if (!dialing || dialing.length === 0) {
                    return;
                }
                dialing = dialing.substring(1, dialing.length);
                this.setDialing(dialing);
                return;
            }
                break;
            case 9: //tab
            //case 32: //space
            case 16: //shift
            case 17: //control
            case 18: //alt
            case 112: //F1
            case 113: //F2
            case 114: //F3
            case 115: //F4
            case 116: //F5
            case 117: //F6
            case 118: //F7
            case 119: //F8
            case 120: //F9
            case 121: //F10
            case 122: //F11
            case 123: //F12
            case 37:    //Left arrow
            case 39:    //Right arrow
            case 38: //Up arrow
            case 40: //Down arrow
            case 93:    //menu
            case 144: //Numlock
            case 33: //pageup
            case 34: //pagedown
            case 38: //end
            case 36: //home
            case 45: //insert
            case 145: //scroll lock
            case 19: //pause
            case 44: //print screen
            //case ***; //copilot //!check //!todo //!check //!forbug
            case 91: //meta
            case 29: //NonConvert
            case 0: //char key ( with F12?) //for Firefox
            case 229: //char key ( with F12?)
                return;
                break;
        }

        let sKey = e.key;
        if( !sKey || sKey.length === 0 ){
            return;
        }

        if( this._isDTMFInput === true ){
            if(  this._isSendDTMFChar( sKey ) !== true ) {
                return;
            }
            let  dialing = this.state.dialing;
            if( !dialing ){
                dialing = sKey;
            }
            else {
                dialing += sKey;
            }

            if( dialing.length > BrekekeOperatorConsole.DIALING_MAX_LENGTH ){
                dialing = dialing.substring( dialing.length - BrekekeOperatorConsole.DIALING_MAX_LENGTH, dialing.length );
            }
            this.setDialing( dialing );

            this.sendDTMFIfNeed(sKey);

        }
        else{
            let  dialing = this.state.dialing;
            if( dialing.length >= BrekekeOperatorConsole.DIALING_MAX_LENGTH ){
                return;
            }

            if( !dialing ){
                dialing = sKey;
            }
            else {
                dialing += sKey;
            }
            this.setDialing( dialing );

        }

    }

    _onPaste(e) {

        if( this._disablePasteToDialingCounter > 0 ){
            return;
        }

        const isDowned = this.state._downedLayoutAndSystemSettings;
        if( !isDowned ){
            return;
        }
        const isScreenView = this.state.displayState === brOcDisplayStates.showScreen;
        const isShowScreenView_ver2 = this.state.displayState === brOcDisplayStates.showScreen_ver2;
        if( !isScreenView && !isShowScreenView_ver2 ){
            return;
        }

        if( this._isDTMFInput === true ){
            return;
        }

        const paste = (e.clipboardData || window.clipboardData).getData("text");
        if( !paste ){
            return;
        }

        let pasteString;
        if( paste.length > BrekekeOperatorConsole.DIALING_MAX_LENGTH ){
            pasteString = paste.substring(0, BrekekeOperatorConsole.DIALING_MAX_LENGTH );
        }
        else{
            pasteString = paste;
        }

        e.preventDefault();
        this.setDialing( pasteString );
    }


    // componentDidUpdate( prevProps ){
    //     this._deformCallTablezTbodies( prevProps );
    // }


    // _deformCallTablezTbodies( prevProps ) {
    //     const isDowned = this.state._downedLayoutAndSystemSettings;
    //     if( !isDowned ){
    //         return;
    //     }
    //     const isScreenView = this.state.displayState === brOcDisplayStates.showScreen;
    //     if( !isScreenView ){
    //         return;
    //     }
    //
    //
    //     //default view
    //     const screens = [...this.state.screens];
    //     for( let i = 0; i < screens.length; i++ ){
    //         const screen = screens[i];
    //         const widgets = screen.widgets;
    //         for( let k = 0; k < widgets.length; k++ ){
    //             const widget = widgets[k];
    //             const widgetType = widget.type;
    //             if( widgetType !== "CallTable" ){
    //                 continue;
    //             }
    //             //Calltable
    //             const widgetIndex = k;
    //             const eWidget = document.querySelector('[data-broc-widgetindex="' + widgetIndex + '"]');;
    //             const eTbody = eWidget.querySelector('tbody');
    //
    //             const eTbodyRows = eTbody.querySelectorAll("tr");
    //             let tbodyRowsHeight = 0;
    //             for( let r = 0; r < eTbodyRows.length; r++ ){
    //                 const eTbodyRow = eTbodyRows[r];
    //                 const h = eTbodyRows.offsetHeight;
    //                 tbodyRowsHeight += h;
    //             }
    //
    //             const eTbodyHeight = eTbody.offsetHeight;
    //             const bNeedInsertEmptyTbodyRow = tbodyRowsHeight < eTbodyHeight;
    //             let eEmptyTbodyRow = eTbody.querySelector('[data-broc-isemptytcalltableztbodyrow="true"]');
    //             if( bNeedInsertEmptyTbodyRow){
    //                 if( !eEmptyTbodyRow ){
    //                     eEmptyTbodyRow = document.createElement("tr");
    //                     const eThead = eTbody.parentElement.querySelector("thead");
    //                     const eThreadRow = eThead.querySelector("tr");
    //                     const eThreadCells = eThreadRow.querySelectorAll("th");
    //                     const cellCount  = eThreadCells.length;
    //                     eEmptyTbodyRow.setAttribute("colspan", cellCount.toString() );
    //                     eEmptyTbodyRow.setAttribute("data-broc-isemptytcalltableztbodyrow", "true" );
    //                     eTbody.appendChild( eEmptyTbodyRow );
    //                 }
    //                 else {
    //                     const eTbodyRows = eTbody.querySelectorAll("tr");
    //                     if (eTbodyRows && eTbodyRows.length !== 0 ){
    //                         const eTbodyLastRow = eTbodyRows [eTbodyRows.length - 1];
    //                         eTbodyLastRow.after(eEmptyTbodyRow);
    //                     }
    //                 }
    //             }
    //             else{
    //                 if( eEmptyTbodyRow ){
    //                     eEmptyTbodyRow.remove();
    //                 }
    //             }
    //
    //
    //         }
    //     }
    //
    //
    // }

    _getLastLayoutLocalstorageKeyName(){
        //let info = this.state.lastLoginAccount;
        // if( !info ){
        //     const lastLoginAccount = localStorage.getItem('lastLoginAccount');
        //     info = JSON.parse( lastLoginAccount );
        // }

        const info = this._getLastLoginAccount();
        // const lastLoginAccount = localStorage.getItem('lastLoginAccount');
        // const info = JSON.parse( lastLoginAccount );

        let pbxDirectoryName = info["pbxDirectoryName"];
        if( !pbxDirectoryName || pbxDirectoryName.length === 0 ){
            pbxDirectoryName = this._DefaultPbxDirectoryName;
        }

        const key = info.hostname + '\t' + info.port + '\t' + info.tenant + '\t' + info.username + "\t" + pbxDirectoryName;
        return key;
    }

    getLoggedinTenant(){
        if( !this.state.loginUser ){
            return null;
        }
        const tenant = this.state.loginUser.pbxTenant;
        return tenant;
    }

    getLoggedinUsername(){
        if( !this.state.loginUser ){
            return null;
        }
        const user = this.state.loginUser.pbxUsername;
        return user;
    }

    getLoggedinPbxHost(){
        if( !this.state.loginUser ){
            return null;
        }
        const pbxHost = this.state.loginUser.pbxHost;
        return pbxHost;
    }

    getLoggedinPbxPort(){
        if( !this.state.loginUser ){
            return null;
        }
        const pbxPort = this.state.loginUser.pbxPort;
        return pbxPort;
    }

    getLoggedinPbxPort(){
        if( !this.state.loginUser ){
            return null;
        }
        const pbxPort = this.state.loginUser.pbxPort;
        return pbxPort;
    }

    getLoggedinPassword(){
        if( !this.state.loginUser ){
            return null;
        }
        const pbxPassword = this.state.loginUser.pbxPassword;
        return pbxPassword;
    }

    getLoggedinLanguage(){
        if( !this.state.loginUser ){
            return null;
        }
        const language = this.state.loginUser.language;
        return language;
    }

    getDialing(){
        return this.state.dialing;
    }


    _getLastLayoutShortname(){
        const key = this._getLastLayoutLocalstorageKeyName();
        const shortName = window.localStorage.getItem( key );
        return shortName;
    }

    _getLastLayoutFullname(){
        const shortName = this._getLastLayoutShortname();
        if( !shortName ){
            return shortName;
        }
        return this._getLayoutFullname( shortName );
    }

    _getLayoutFullname( shortName ){
        const fullName = BrekekeOperatorConsole.LAYOUT_NOTE_NAME_PREFIX + shortName;
        return fullName;
    }

    setLastLayoutShortname( shortName ){
        const key = this._getLastLayoutLocalstorageKeyName();
        window.localStorage.setItem( key, shortName );
        this.setState({lastLayoutShortname : shortName} );
    }

    _removeLastLayoutShortname(){
        const key = this._getLastLayoutLocalstorageKeyName();
        window.localStorage.removeItem( key );
    }

    getLastLayoutShortname(){
        return this.state.lastLayoutShortname;
    }

    getDisplayState() {
        return this.state.displayState;
    }

    setDisplayState(displayState, otherSetStates, callback) {
        const states = {displayState, ...otherSetStates};
        this.setState(states, callback);
    }

    _getCurrentScreen(){
        const screen = this.state.screens[this.state.currentScreenIndex];
        return screen;
    }


    onClickDropDownMenu(e) {
        this.setState({showAutoDialWidgets: [], currentScreenQuickCallWidget: null});
    }

    _onEditingTabClick(sKey){
        const tabIndex = parseInt( sKey );
        this.setState( {
                currentScreenTabIndex:tabIndex,
                isSelectingTabInEditLayout: true,
                selectingWidgetIndex : -1
            },
        );

    }

    _onShowScreenTabClick(sKey){
        const tabIndex = parseInt( sKey );
        this.setState( {
                currentScreenTabIndex:tabIndex
            },
        );

    }

    render() {
        if (!this.state.i18nReady) {
            return <Empty image={null} description={<Spin/>}/>
        }

        const editingWidgetDatas = this._getSelectingEditingWidgetDatas();

        //const selectingWidget = this.state.editingWidgets[this.state.selectingWidgetIndex];
        let selectingEditingWidget;
        if( editingWidgetDatas ) {
            selectingEditingWidget = editingWidgetDatas[this.state.selectingWidgetIndex];
        }
        else{
            selectingEditingWidget = null;
        }
        const SeletingEditingWidgetSettings = WidgetSettingsMap[selectingEditingWidget?.type];
        let selectingWidgetSettingsKey = 0;

        const handleShowConfirmDeleteWidgetOk = () => {
            this.setState({showConfirmDeleteWidget: false});
            this.onWidgetRemoved(this.state.selectingWidgetIndex);
        };
        const handleShowConfirmDeleteWidgetCancel = () => {
            this.setState({showConfirmDeleteWidget: false});
        };

        const handleShowConfirmDeleteTabOk = () => {
            this.setState({showConfirmDeleteTab: false});
            this.removeTabInEditMode(this.state.currentScreenTabIndex);
        };
        const handleShowConfirmDeleteTabCancel = () => {
            this.setState({showConfirmDeleteTab: false});
        };

        const isEditingScreen = !!this.state.isInitialized && this.state._downedLayoutAndSystemSettings && this.state.displayState === brOcDisplayStates.editingScreen;
        let editingTabItems;
        if( isEditingScreen ){
            //const editingScreen = this.state.screens[ this.state.currentScreenIndex ];
            const tabDatas = this.state.editingTabDatas;
            editingTabItems = new Array(  tabDatas.length );
            for( let i = 0; i < editingTabItems.length; i++ ){
                //const tabData = tabDatas[i];
                const editingTabData = this.state.editingTabDatas[i];
                const editingWidgetDatas = editingTabData.widgetDatas;
                const editingTabJsx = (
                    <Rnd
                        size={{width: this.state.editingScreenWidth, height: this.state.editingScreenHeight}}
                        style={{
                            border: 'solid 1px #E0E0E0',
                            background: this.state.editingScreenBackground,
                            color: this.state.editingScreenForeground
                        }}
                        cancel=".brOCEditingWidget"
                        onResizeStop={(ev, dir, ref) => {
                            const style = window.getComputedStyle(ref);
                            this.setEditingScreenSize(parseInt(style.width), parseInt(style.height))
                        }}>
                        <GridLines className="brOCEditingGridLines"
                                   strokeWidth={2}
                                   cellWidth={this.state.editingScreenGrid * 10}
                                   cellWidth2={this.state.editingScreenGrid}
                                   cellHeight={this.state.editingScreenGrid * 10}
                                   cellHeight2={this.state.editingScreenGrid}
                        >
                            {editingWidgetDatas.map((widget, i) => {
                                const Widget = WidgetMap[widget.type];
                                if (!Widget) return null;
                                return (
                                    <Rnd
                                        key={i}
                                        className={clsx("brOCEditingWidget", this.state.selectingWidgetIndex === i && "brOCSelectingWidget")}
                                        size={{width: widget.width, height: widget.height}}
                                        position={{x: widget.x, y: widget.y}}
                                        bounds="parent"
                                        dragGrid={[this.state.editingScreenGrid, this.state.editingScreenGrid]}
                                        resizeGrid={[this.state.editingScreenGrid, this.state.editingScreenGrid]}
                                        onMouseDown={(e) => {
                                            this.selectWidget(i);
                                            e.stopPropagation();
                                        }}
                                        onDragStop={(e, data) => {
                                            e.stopPropagation();
                                            e.preventDefault();
                                            this.onWidgetMoved(i, data.lastX, data.lastY);
                                            this.makeWidgetOnTop(i);
                                        }}
                                        onResize={(e) => {
                                            e.stopPropagation();
                                            e.preventDefault();
                                        }}
                                        onResizeStart={(e) => {
                                            e.stopPropagation();
                                            e.preventDefault();
                                        }}
                                        enableResizing={this.state.selectingWidgetIndex === i}
                                        onResizeStop={(e, dir, ref, delta, pos) => {
                                            const style = window.getComputedStyle(ref);
                                            this.onWidgetResized(i, pos.x, pos.y, parseInt(style.width), parseInt(style.height))
                                        }}
                                    >
                                        <Widget {...widget} operatorConsoleAsParent={this} uccacWrapper={this._UccacWrapper}  />
                                    </Rnd>
                                )
                            })}
                        </GridLines>
                    </Rnd>
                );

                const editingTabItem = {
                    key : i.toString(),
                    label : editingTabData.tabTitle,
                    children : editingTabJsx
                };
                editingTabItems[i] = editingTabItem;
            }
        }
        else{
            editingTabItems = null;
        }

        const editingTabData = this._getSelectingEditingTabData();
        const tabsActiveKey = this.state.currentScreenTabIndex.toString();
        const isEditingScreen_ver2 = this.state.displayState === brOcDisplayStates.editingScreen_ver2;
        if( isEditingScreen_ver2 ){

            const srcScreenData_ver2 = this.state.screenData_ver2;
            const dstScreenData_ver2 = srcScreenData_ver2.cloneScreenData();
            this._editingScreenData_ver2 = dstScreenData_ver2;
            return (
                <EditScreenView
                    operatorConsoleAsParent={this} screenData={this._editingScreenData_ver2}
            >
            </EditScreenView> );
        }



        return (<>
            {!!this.state.isInitialized ? (
                <div style={{flexGrow:1,display:"flex",flexDirection:"column",overflow:"hidden"}}>
                    <img style={{position: 'absolute', top: 4, left: 4, zIndex: 1}} src={logo}/>
                    {this.state._downedLayoutAndSystemSettings ? (
                            this.state.displayState === brOcDisplayStates.editingScreen ? ( //editMode
                                <div style={{display: 'flex', flexGrow: 1, overflow: 'hidden'}}>
                                    <div className="brOCWidgetBox" style={{
                                        width: 240,
                                        borderRight: 'solid 1px #e0e0e0',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: 12,
                                        padding: 12,
                                        paddingTop: 48,
                                        alignItems: 'center',
                                        overflowY: 'auto',
                                        overflowX:'hidden'
                                    }}>
                                        {ToolboxWidgets.map((widget, i) => {
                                            const Preview = WidgetPreviewMap[widget.preview];
                                            if (Preview) {
                                                return (<div key={ i } style={{
                                                    width: widget.previewWidth || widget.width,
                                                    height: widget.previewHeight || widget.height
                                                }} draggable onDragStart={ev => this.onDragStart(ev, i)}>
                                                    <Preview/>
                                                </div>)
                                            }
                                            const Widget = WidgetMap[widget.type];
                                            if (!Widget) {
                                                return null;
                                            }
                                            return (<div key={i} style={{width: widget.width, height: widget.height}} draggable
                                                         onDragStart={ev => this.onDragStart(ev, i)}>
                                                <Widget {...widget} operatorConsoleAsParent={this} uccacWrapper={this._UccacWrapper} />
                                            </div>)
                                        })}
                                    </div>
                                    <div style={{flexGrow: 1, display: 'flex', flexDirection: 'column'}} onDragOver={this.onDragOver}
                                         onDrop={this.onDrop}>
                                        <div style={{display: 'flex', padding: 4, borderBottom: 'solid 1px #e0e0e0'}}>
                                            <Space>
                                                <label>{i18n.t("width")}{": "}
                                                    <InputNumber value={this.state.editingScreenWidth}
                                                                 onPressEnter={(e) => this.setEditingScreenSize(parseInt(e.target.value), this.state.editingScreenHeight)}
                                                                 onStep={(v) => this.setEditingScreenSize(v, this.state.editingScreenHeight)}
                                                    />
                                                </label>
                                                <label>{i18n.t("height")}{": "}
                                                    <InputNumber value={this.state.editingScreenHeight}
                                                                 onPressEnter={(e) => this.setEditingScreenSize(this.state.editingScreenWidth, parseInt(e.target.value))}
                                                                 onStep={(v) => this.setEditingScreenSize(this.state.editingScreenWidth, v)}
                                                    />
                                                </label>
                                                <label>{i18n.t("grid")}{": "}
                                                    <InputNumber value={this.state.editingScreenGrid}
                                                                 onPressEnter={(e) => this.setEditingScreenGrid(parseInt(e.target.value))}
                                                                 onStep={(v) => this.setEditingScreenGrid(v)}
                                                    />
                                                </label>
                                                <label style={{display: 'flex', alignItems: 'center', whiteSpace: 'pre'}}>
                                                    {i18n.t("foreground")}{": "}
                                                    <Dropdown overlay={<SketchPicker
                                                        color={this.state.editingScreenForeground}
                                                        onChangeComplete={this.setEditingScreenForeground}
                                                    />}>
                                                        <div style={{
                                                            width: 48,
                                                            height: 30,
                                                            display: 'inline-block',
                                                            border: 'solid 1px #e0e0e0',
                                                            background: this.state.editingScreenForeground
                                                        }}></div>
                                                    </Dropdown>
                                                </label>
                                                <label style={{display: 'flex', alignItems: 'center', whiteSpace: 'pre'}}>
                                                    {i18n.t("background")}{": "}
                                                    <Dropdown overlay={<SketchPicker
                                                        color={this.state.editingScreenBackground}
                                                        onChangeComplete={this.setEditingScreenBackground}
                                                    />}>
                                                        <div style={{
                                                            width: 48,
                                                            height: 30,
                                                            display: 'inline-block',
                                                            border: 'solid 1px #e0e0e0',
                                                            background: this.state.editingScreenBackground
                                                        }}></div>
                                                    </Dropdown>
                                                </label>
                                            </Space>
                                            <div style={{marginLeft: 'auto'}}>
                                                <Space>
                                                    <Popconfirm title={i18n.t("are_you_sure")} onConfirm={this.abortEditingScreen}
                                                                okText={i18n.t("yes")}
                                                                cancelText={i18n.t("no")}
                                                    >
                                                        <Button type="secondary">{i18n.t("discard")}</Button>
                                                    </Popconfirm>
                                                    <Space/>
                                                    <Button type="success" htmlType="cancel" onClick={this.saveEditingScreen}>
                                                        {i18n.t("save")}
                                                    </Button>
                                                </Space>
                                            </div>
                                        </div>
                                        <div style={{display: 'flex', flexGrow: 1}}>
                                            <div style={{position: 'relative', flexGrow: 1, overflow: 'hidden', background: '#f5f5f5'}}>
                                                <Tabs activeKey={tabsActiveKey} items={ editingTabItems} onTabClick={ (key) => this._onEditingTabClick(key)  } />
                                            </div>
                                            <div style={{
                                                width: 262,
                                                borderLeft: 'solid 1px #e0e0e0',
                                                display: 'flex',
                                                flexDirection: 'column',
                                                gap: 12,
                                                overflow: 'hidden'
                                            }}>
                                                {!!selectingEditingWidget?.type && (
                                                    <div style={{padding:"12px 12px 0px 12px"}}>{i18n.t(`widget_description.${selectingEditingWidget?.type}`)}</div>
                                                )}
                                                <div style={{overflowY: 'auto', flexGrow: 1, height:0, paddingLeft:12, paddingRight:12 }}>   {  /* height:0 is for show scrollbar */ }
                                                    {!!SeletingEditingWidgetSettings && (
                                                        <SeletingEditingWidgetSettings
                                                            key={ selectingWidgetSettingsKey++ }
                                                            widgetIndex={this.state.selectingWidgetIndex}
                                                            widget={{...selectingEditingWidget}}
                                                            onChange={this.updateSelectingWidgetSettings}
                                                            getNoteNames={this.getNoteNames}
                                                            operatorConsoleAsParent={this}
                                                        />
                                                    )}
                                                    {this.state.isSelectingTabInEditLayout === true && (
                                                        <Form id="tabFormInEditMode" layout="vertical" initialValues={{tabTitle:editingTabData.tabTitle}} >
                                                            <Form.Item label={i18n.t("tabTitle")} name="tabTitle">
                                                                <Input maxLength={30}  />
                                                            </Form.Item>
                                                        </Form>
                                                    )}
                                                </div>
                                                {this.state.selectingWidgetIndex !== -1 && (<div style={{padding:"0px 12px 12px 12px"}}>
                                                    <Button type="secondary"
                                                            onClick={() => this.duplicateWidget(this.state.selectingWidgetIndex)}>
                                                        {i18n.t("duplicate")}
                                                    </Button>
                                                    <Popconfirm title={i18n.t("are_you_sure")}
                                                                onConfirm={() => this.onWidgetRemoved(this.state.selectingWidgetIndex)}
                                                                okText={i18n.t("yes")}
                                                                cancelText={i18n.t("no")}
                                                    >
                                                        <Button type="danger">{i18n.t("remove")}</Button>
                                                    </Popconfirm>
                                                    <Modal title={i18n.t("ConfirmDeleteWidgetTitle")} open={this.state.showConfirmDeleteWidget} onOk={handleShowConfirmDeleteWidgetOk} onCancel={handleShowConfirmDeleteWidgetCancel}>
                                                        <p>{i18n.t("ConfirmDeleteWidgetText")}</p>
                                                    </Modal>
                                                </div>)}
                                                {this.state.isSelectingTabInEditLayout === true && (
                                                    <div style={{padding:"0px 12px 12px 12px"}}>
                                                        <Button type="secondary"
                                                                onClick={() => this.changeTabTitleInEditMode()}>
                                                            {i18n.t("changeTitle")}
                                                        </Button>
                                                        <Button type="secondary"
                                                                onClick={() => this.addTabInEditMode()}>
                                                            {i18n.t("add@AddTabButton")}
                                                        </Button>
                                                        <Button type="secondary"
                                                                onClick={() => this.duplicateTabInEditMode()}>
                                                            {i18n.t("duplicate")}
                                                        </Button>                                                        <Popconfirm title={i18n.t("are_you_sure")}
                                                                    onConfirm={() => this.removeTabInEditMode(this.state.currentScreenTabIndex)}
                                                                    okText={i18n.t("yes")}
                                                                    cancelText={i18n.t("no")}
                                                        >
                                                            <Button type="danger">{i18n.t("remove")}</Button>
                                                        </Popconfirm>
                                                        <Modal title={i18n.t("ConfirmDeleteTabTitle")} open={this.state.showConfirmDeleteTab} onOk={handleShowConfirmDeleteTabOk} onCancel={handleShowConfirmDeleteTabCancel}>
                                                            <p>{i18n.t("ConfirmDeleteTabText")}</p>
                                                        </Modal>
                                                </div>)}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            // ) : this.state.displayState === brOcDisplayStates.editingScreen_ver2 ? (
                            //     <EditScreen_ver2
                            //         operatorConsoleAsParent={this}
                            //     />
                            ) : this.state.displayState === brOcDisplayStates.waitQuickCallKey ? (<>
                                    <div style={{
                                        flexGrow: 1,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        overflow: 'hidden',
                                        background: this.state.screens[this.state.currentScreenIndex].background,
                                        color: this.state.screens[ this.state.currentScreenIndex].foreground
                                    }}>
                                        {/*<Carousel dotPosition="top" lazyLoad swipeToSlide draggable*/}
                                        {/*          beforeChange={this.onBeforeCurrentScreenIndexChange}*/}
                                        {/*          afterChange={this.setCurrentScreenIndex} initialSlide={this.state.currentScreenIndex}>*/}
                                        {this.state.screens.map((screen, screenIndex) => {
                                            const tabItems = new Array(screen.tabDatas.length);
                                            for (let i = 0; i < tabItems.length; i++) {
                                                const tabData = screen.tabDatas[i];
                                                const tabTitle = tabData.tabTitle;
                                                let tabJsx;
                                                if (!tabData.widgetDatas || tabData.widgetDatas.length === 0) {
                                                    tabJsx = <Empty image={null} description={i18n.t("no_widgets")}/>;
                                                } else {
                                                    tabJsx = tabData.widgetDatas.map((widgetData, i) => {
                                                        const Widget = WidgetMap[widgetData.type];
                                                        if (!Widget) return null;
                                                        return (<div key={i} style={{
                                                            position: 'absolute',
                                                            left: widgetData.x,
                                                            top: widgetData.y,
                                                            width: widgetData.width,
                                                            height: widgetData.height
                                                        }} onMouseMove={(e) => e.stopPropagation()}>
                                                            <Widget
                                                                {...widgetData}
                                                                operatorConsoleAsParent={this}
                                                                uccacWrapper={this._UccacWrapper}
                                                                context={{
                                                                    loginUser: this.state.loginUser,
                                                                    currentCallIndex: this._getCurrentCallIndex(),
                                                                    //callIds: this._callIds,
                                                                    //callById: this.callById,
                                                                    dialing: this.state.dialing,
                                                                    extensions: this.state.extensions,
                                                                    extensionsStatus: this.state.extensionsStatus,
                                                                    linesStatus: this.state.linesStatus,
                                                                    parksStatus: this.state.parksStatus,
                                                                    myParksStatus: this.state.myParksStatus,
                                                                    usingLine: this.state.usingLine,
                                                                    autoRejectIncoming: this.state.autoRejectIncoming,
                                                                    monitoringExtension: this.state.monitoringExtension,
                                                                    switchCallUp: this.switchCallUp,
                                                                    switchCallDown: this.switchCallDown,
                                                                    switchCallIndex: this.switchCallIndex,
                                                                    monitorDialingExtension: this.monitorDialingExtension,
                                                                    joinConversation: this.joinConversation,
                                                                    appendKeypadValue: this.appendKeypadValue,
                                                                    setDialingAndMakeCall: this.setDialingAndMakeCall,
                                                                    backspaceKeypadValue: this.backspaceKeypadValue,
                                                                    toggleCallRecording: this.toggleCallRecording,
                                                                    toggleCallMuted: this.toggleCallMuted,
                                                                    toggleAutoRejectIncoming: this.toggleAutoRejectIncoming,
                                                                    resumeCall: this.resumeCall,
                                                                    holdCall: this.holdCall,
                                                                    hangUpCall: this.hangUpCall,
                                                                    answerCall: this.answerCall,
                                                                    sendDTMFIfNeed: this.sendDTMFIfNeed,
                                                                    makeCall: this.makeCall,
                                                                    transferCall: this.transferCall,
                                                                    handleLine: this.handleLine,
                                                                    handlePark: this.handlePark,
                                                                    getNote: this.getNote,
                                                                    setNote: this.setNote,
                                                                    toggleQuickCallScreen: this.toggleQuickCallScreen,
                                                                    onClickAutoDial: this.onClickAutoDial,
                                                                    currentScreenQuickCallWidget: this.state.currentScreenQuickCallWidget,
                                                                    widget: widgetData,
                                                                    showAutoDialWidgets: this.state.showAutoDialWidgets,
                                                                    operatorConsole: this
                                                                }}
                                                            />
                                                        </div>);
                                                    });
                                                }
                                                const key = i.toString();
                                                const tabItem = {
                                                    key:key,
                                                    label: tabTitle,
                                                    children: tabJsx
                                                };
                                                tabItems[i] = tabItem;
                                            }

                                            return <div key={screenIndex}>
                                                <div style={{
                                                    position: 'relative',
                                                    width: screen.width,
                                                    height: screen.height,
                                                    margin: '0 auto',
                                                    marginTop: 48,
                                                }}>
                                                    <Tabs activeKey={ tabsActiveKey  } items={tabItems} onTabClick={ (key) => this._onShowScreenTabClick(key)  } />
                                                </div>
                                            </div>
                                        })}
                                        {/*</Carousel>*/}
                                    </div>
                                    <DropDownMenu operatorConsole={this}></DropDownMenu>
                                </>)
                                : this.state.displayState === brOcDisplayStates.systemSettingsView ? (
                                        <SystemSettingsView operatorConsole={this}/>
                                    ) : this.state.displayState === brOcDisplayStates.showScreen_ver2 ? (
                                        <ShowScreenView_ver2 operatorConsoleAsParent={this} />
                                ) :
                                    (<>
                                        {/* defaultView */}
                                        <div style={{
                                            flexGrow: 1,
                                            display: 'flex',
                                            flexDirection: 'column',
                                            overflow: 'hidden',
                                            background: this.state.screens[this.state.currentScreenIndex].background,
                                            color: this.state.screens[this.state.currentScreenIndex].foreground
                                        }}>
                                            {/*<Carousel dotPosition="top" lazyLoad swipeToSlide draggable*/}
                                            {/*          beforeChange={this.onBeforeCurrentScreenIndexChange}*/}
                                            {/*          afterChange={this.setCurrentScreenIndex}*/}
                                            {/*          initialSlide={this.state.currentScreenIndex}>*/}
                                            {this.state.screens.map((screen, screenIndex) => {
                                                // if( !screen.tabDatas ){
                                                //     //set default tabData
                                                //     screen.tabDatas = new Array(1);
                                                //     screen.tabDatas[0] = {
                                                //         tabTitle : "Untitled tab",
                                                //         widgetDatas : new Array()
                                                //     }
                                                // }
                                                const tabItems = new Array( screen.tabDatas.length );
                                                for( let i = 0; i < tabItems.length; i++ ){
                                                    const tabData = screen.tabDatas[i];
                                                    const tabTitle = tabData.tabTitle;
                                                    let  tabJsx;
                                                    if( !tabData.widgetDatas ||  tabData.widgetDatas.length === 0 ) {
                                                        tabJsx = <Empty image={null} description={i18n.t("no_widgets")}/>;
                                                    }
                                                    else{
                                                        tabJsx = tabData.widgetDatas.map( ( widgetData, i ) =>{
                                                            const Widget = WidgetMap[ widgetData.type ];
                                                            if (!Widget) return null;
                                                            return (<div key={i} style={{
                                                                position: 'absolute',
                                                                left: widgetData.x,
                                                                top: widgetData.y,
                                                                width: widgetData.width,
                                                                height: widgetData.height
                                                            }} onMouseMove={(e) => e.stopPropagation()}>
                                                                <Widget
                                                                    {...widgetData}
                                                                    widgetIndex={i}
                                                                    operatorConsoleAsParent={this}
                                                                    uccacWrapper={this._UccacWrapper}
                                                                    context={{
                                                                        loginUser: this.state.loginUser,
                                                                        currentCallIndex: this._getCurrentCallIndex(),
                                                                        //callIds: this._callIds,
                                                                        //callById: this.callById,
                                                                        dialing: this.state.dialing,
                                                                        extensions: this.state.extensions,
                                                                        extensionsStatus: this.state.extensionsStatus,
                                                                        linesStatus: this.state.linesStatus,
                                                                        parksStatus: this.state.parksStatus,
                                                                        myParksStatus: this.state.myParksStatus,
                                                                        usingLine: this.state.usingLine,
                                                                        autoRejectIncoming: this.state.autoRejectIncoming,
                                                                        monitoringExtension: this.state.monitoringExtension,
                                                                        switchCallUp: this.switchCallUp,
                                                                        switchCallDown: this.switchCallDown,
                                                                        switchCallIndex: this.switchCallIndex,
                                                                        monitorDialingExtension: this.monitorDialingExtension,
                                                                        joinConversation: this.joinConversation,
                                                                        appendKeypadValue: this.appendKeypadValue,
                                                                        setDialingAndMakeCall: this.setDialingAndMakeCall,
                                                                        backspaceKeypadValue: this.backspaceKeypadValue,
                                                                        toggleCallRecording: this.toggleCallRecording,
                                                                        toggleCallMuted: this.toggleCallMuted,
                                                                        toggleAutoRejectIncoming: this.toggleAutoRejectIncoming,
                                                                        resumeCall: this.resumeCall,
                                                                        holdCall: this.holdCall,
                                                                        hangUpCall: this.hangUpCall,
                                                                        answerCall: this.answerCall,
                                                                        sendDTMFIfNeed: this.sendDTMFIfNeed,
                                                                        makeCall: this.makeCall,
                                                                        transferCall: this.transferCall,
                                                                        handleLine: this.handleLine,
                                                                        handlePark: this.handlePark,
                                                                        getNote: this.getNote,
                                                                        setNote: this.setNote,
                                                                        toggleQuickCallScreen: this.toggleQuickCallScreen,
                                                                        currentScreenQuickCallWidget: this.state.currentScreenQuickCallWidget,
                                                                        onClickAutoDial: this.onClickAutoDial,
                                                                        widget: widgetData,
                                                                        makeCallWithShortDial: this.makeCallWithShortDial,
                                                                        showAutoDialWidgets: this.state.showAutoDialWidgets,
                                                                        operatorConsole: this
                                                                    }}
                                                                />
                                                            </div>);
                                                        });
                                                    }
                                                    const tabItem = {
                                                        key : i.toString(),
                                                        label : tabTitle,
                                                        children : tabJsx
                                                    };
                                                    tabItems[i] = tabItem;
                                                }

                                                return <div key={screenIndex}>
                                                    <div style={{
                                                        position: 'relative',
                                                        width: screen.width,
                                                        height: screen.height,
                                                        margin: '0 auto',
                                                        marginTop: 48,
                                                    }}>
                                                        <Tabs activeKey={tabsActiveKey} items={tabItems} onTabClick={ (key) => this._onShowScreenTabClick(key)  } />
                                                    </div>
                                                </div>
                                            })}
                                            {/*</Carousel>*/}
                                        </div>
                                        <DropDownMenu operatorConsole={this}></DropDownMenu>
                                        {/*<QuickBusy operatorConsoleAsParent={this}/>*/}
                                    </>)
                        )
                        : this.state.displayState === brOcDisplayStates.noScreens ? (
                                <NoScreensView operatorConsoleAsParent={this} />
                            )
                            : (
                                <Empty image={null} description={<Spin/>}/>
                            )}
                </div>
            ) :  (
                <div className='brOCLoginPage'>
                    <Login operatorConsoleAsParent={this} initialValues={this._getLastLoginAccount()} />
                </div>
            )}

            <div id="brOCPhone"></div>
        </>);
    }

    setLastLoginAccount( lastLoginAccount ){
        this.setState({lastLoginAccount: lastLoginAccount});
    }

    _getLastLoginAccount() {
        const sLastLoginAccount = localStorage.getItem('lastLoginAccount');
        if( sLastLoginAccount ){
            try {
                const lastLoginAccount = JSON.parse(sLastLoginAccount);

                if( !lastLoginAccount["pbxDirectoryName"] || lastLoginAccount["pbxDirectoryName"].length === 0  ){
                    lastLoginAccount["pbxDirectoryName"] = this._DefaultPbxDirectoryName;
                }

                return lastLoginAccount;
            }
            catch( err ){
                console.error(err);
            }
        }
        //const lastLoginAccount = this.state.lastLoginAccount;
        const lastLoginAccount = {hostname:location.hostname, port:location.port,pbxDirectoryName: this._DefaultPbxDirectoryName };
        console.log("set lastLoginAccount from location info.");
        return lastLoginAccount;
    }

    setEditingScreenSize = (width, height) => {
        this.setState({editingScreenWidth: width, editingScreenHeight: height})
    }
    setEditingScreenGrid = (grid) => {
        this.setState({editingScreenGrid: Math.max(grid, 5)})
    }
    setEditingScreenBackground = (color) => {
        this.setState({editingScreenBackground: color.hex})
    }
    setEditingScreenForeground = (color) => {
        this.setState({editingScreenForeground: color.hex})
    }

    startEditingScreen_ver2 = ()=>{
        this.setDisplayState(brOcDisplayStates.editingScreen_ver2 );
    }

    startEditingScreen = () => {
        const {tabDatas, background, width, height, grid, foreground } = this.state.screens[this.state.currentScreenIndex];

        const editingTabDatas = window.structuredClone( tabDatas );


        //const currentTabData  = tabDatas[ this.state.currentScreenTabIndex ];
        //const widgets = currentTabData.widgetDatas;
        //const editingWidgets = window.structuredClone(widgets || []);


        this.setDisplayState(brOcDisplayStates.editingScreen,
            {
//                editingWidgets: editingWidgets,
                editingTabDatas : editingTabDatas,
                editingScreenBackground: background || '#ffffff00',
                editingScreenForeground: foreground || '#000000',
                editingScreenWidth: width || 800,
                editingScreenHeight: height || 600,
                editingScreenGrid: grid || 10,
                isSelectingTabInEditLayout : true,
                selectingWidgetIndex: -1
            }
        );
    }

    startShowScreen = () => {
        this.setDisplayState(brOcDisplayStates.showScreen);
    }

    startShowScreen_ver2 = () => {
        this.setDisplayState(brOcDisplayStates.showScreen_ver2 );
    }

    startSettingsScreen = () => {
        this.setDisplayState(brOcDisplayStates.systemSettingsView);
    }

    getShowAutoDialWidgetSubDatas_ver2(){
        return this.state.showAutoDialWidgetSubDatas_ver2;
    }

    toggleQuickCallScreen = (quickCallButtonWidget) => {
        console.log("quickCallButtonWidget=" + quickCallButtonWidget);

        if (this.state.currentScreenQuickCallWidget === quickCallButtonWidget) {
            this.setDisplayState(brOcDisplayStates.showScreen, {currentScreenQuickCallWidget: null});   //toggle off
        } else {
            this.setDisplayState(brOcDisplayStates.waitQuickCallKey, {currentScreenQuickCallWidget: quickCallButtonWidget});
        }
    }

    toggleQuickCallButton_ver2 = (quickCallButtonWidgetSubData) => {
        console.log("quickCallButtonWidgetSubData=" + quickCallButtonWidgetSubData);

        if (this.state.currentScreenQuickCallWidgetSubData === quickCallButtonWidgetSubData) {
            this.setState({currentScreenQuickCallWidgetSubData: null});   //toggle off
        } else {
            this.setState( {currentScreenQuickCallWidgetSubData: quickCallButtonWidgetSubData});
        }
    }

    getCurrentScreenQuickCallWidgetSubDataFromState(){
        return this.state.currentScreenQuickCallWidgetSubData;
    }

    static _getIndexFromArray(array, item) {
        let index = -1;
        for (let i = 0; i < array.length; i++) {
            if (array[i] === item) {
                index = i;
                break;
            }
        }
        return index;
    }

    onClickAutoDial = (autoDialButtonWidget) => {
        console.log("autoDialButtonWidget=" + autoDialButtonWidget);
        const widgets = this.state.showAutoDialWidgets;
        const index = BrekekeOperatorConsole._getIndexFromArray(widgets, autoDialButtonWidget);
        if (index === -1) {
            //visible autoDialView
            widgets.push(autoDialButtonWidget);
        } else {
            widgets.splice(index, 1);
            // if( widgets.length === 0 ){
            //   //invisible
            // }
        }
        this.setState({showAutoDialWidgets: widgets});  //for rerender
    }

    // isShowAutoDialView_ver2(){
    //     const b = this.getShowAutoDialWidgetSubDatas_ver2().length !== 0;
    //     return b;
    // }

    onClickAutoDialButton_ver2 = (legacyButtonRuntimeSubWidget_autoDialButton) => {
        //console.log("onClick LegacyButtonRuntimeSubWidget_autoDialButton=" + legacyButtonRuntimeSubWidget_autoDialButton);
        const subDatas = this.getShowAutoDialWidgetSubDatas_ver2();
        const subData = legacyButtonRuntimeSubWidget_autoDialButton.getLegacyButtonSubWidgetData();
        const index = BrekekeOperatorConsole._getIndexFromArray(subDatas, subData);
        if (index === -1) {
            //visible autoDialView_ver2
            const sort = this.getSystemSettingsData().getAutoDialRecentDisplayOrder();
            this._CallHistory2.sortIfNeed(sort);
            subDatas.push(subData);
        } else {
            subDatas.splice(index, 1);
            // if( widgets.length === 0 ){
            //   //invisible
            // }
        }
        this.setState({showAutoDialWidgetSubDatas_ver2: subDatas});  //for rerender
    }

    addOnBeginSaveEditingScreenFunctionIfNotExists(func) {
        for (let i = 0; i < this._OnBeginSaveEditingScreenFunctions.length; i++) {
            if (this._OnBeginSaveEditingScreenFunctions[i] === func) {
                return false;
            }
        }
        this._OnBeginSaveEditingScreenFunctions.push(func);
        return true;
    }

    _getCurrentTabDatas(){
        const screen = this.state.screens[ this.state.currentScreenIndex];
        const tabDatas = screen.tabDatas;
        return tabDatas;
    }

    _getCurrentTabData(){
        const tabDatas = this._getCurrentTabDatas();
        const tabData = tabDatas[ this.state.currentScreenTabIndex ];
        return tabData;
    }

    changeTabTitleInEditMode(){
        const form = document.getElementById("tabFormInEditMode");
        const eTabTitle = form.tabTitle;
        let tabTitle = eTabTitle.value.trim();
        if( tabTitle.length === 0 ){
            Notification.warning( { message:i18n.t("tabTitleIsEmpty")} );
            return;
        }
        tabTitle = this._getEditingNewTabTitle( tabTitle, this._getSelectingEditingTabData()  );
        if( tabTitle === null ){
            Notification.warning({ message:i18n.t("tabTitleIsTooLong.")});
            return;
        }

        const tabData = this._getSelectingEditingTabData();
        tabData.tabTitle = tabTitle;
        this.setState({editingTabDatas: this.state.editingTabDatas});
    }

    // _onKeydownTabTitleInEditMode( ev ){
    //     const form = document.getElementById("tabFormInEditMode");
    //     const tabTitle = form.tabTitle.value;
    //     this._previousTabTitleInEditMode = tabTitle;
    // }

    saveEditingScreen = ( ) => {
        for (let i = 0; i < this._OnBeginSaveEditingScreenFunctions.length; i++) {
            const cantSaveMessage = this._OnBeginSaveEditingScreenFunctions[i](this);
            if (cantSaveMessage) {
                Notification.error({message: cantSaveMessage});
                return;
            }
        }

        //const screen = this.state.screens[ this.state.currentScreenIndex ];
        //const tabDatas = screen.tabDatas;

        //const tabIndex = this.state.currentScreenTabIndex;
        //const tabData = tabDatas[ tabIndex ];
        //tabData.widgetDatas = this.state.editingWidgets;

        const newTabDatas = window.structuredClone(  this.state.editingTabDatas );

        const screens = [...this.state.screens];
        screens[this.state.currentScreenIndex] = {
            //widgets: this.state.editingWidgets,
            background: this.state.editingScreenBackground,
            width: this.state.editingScreenWidth,
            height: this.state.editingScreenHeight,
            grid: this.state.editingScreenGrid,
            foreground:this.state.editingScreenForeground,
            tabDatas : newTabDatas
        }
        console.log('saving screen', screens[this.state.currentScreenIndex]);

        this.setState(
            {screens:screens}, ()=> {
                this._syncUp(() => {
                    this.setDisplayState(brOcDisplayStates.showScreen, {screens}, () => {
                        }
                    );
                });
       });
    }

    saveEditingScreen_ver2 = ( ) => {
        for (let i = 0; i < this._OnBeginSaveEditingScreenFunctions.length; i++) {
            const cantSaveMessage = this._OnBeginSaveEditingScreenFunctions[i](this);
            if (cantSaveMessage) {
                Notification.error({message: cantSaveMessage});
                return;
            }
        }

        const clonedScreenData_ver2 = this._editingScreenData_ver2.cloneScreenData();

        this.setState(
            {screenData_ver2:clonedScreenData_ver2}, ()=> {
                this._syncUp(() => {
                    this.setDisplayState(brOcDisplayStates.showScreen_ver2, {}, () => {
                        }
                    );
                });
            });
    }

    getScreenData_ver2(){
        return this.state.screenData_ver2;
    }

    _syncUp = async ( onSuccessFunction ) => {
        //if (!pal) return;
        const systemSettingsData = this.getSystemSettingsData();
        const systemSettingsDataData = systemSettingsData.getData();

        const oScreen_ver2 = this.state.screenData_ver2.getDataAsObject();

        const  layoutsAndSettingsData =  {
            version:  BrekekeOperatorConsole.getAppDataVersion(),
            screens:  this.state.screens,
            systemSettings: systemSettingsDataData,
            screen_ver2 : oScreen_ver2
        };

        const shortname = this.getLastLayoutShortname();
        const noteContent = JSON.stringify( layoutsAndSettingsData );
        const noteName = BrekekeOperatorConsole.getOCNoteName( shortname );

        const setNoteOptions = {
            methodName : "setNote",
            methodParams : JSON.stringify({
                    tenant : this.getLoggedinTenant(),
                    name:noteName,
                    description : "",
                    useraccess : BrekekeOperatorConsole.PAL_NOTE_USERACCESSES.ReadWrite,
                    note : noteContent
            }),
            onSuccessFunction : ( res ) =>{
                Notification.success({ key: 'sync', message: i18n.t("saved_data_to_pbx_successfully") });
                //this.setLastSystemSettingsDataData( systemSettingsDataData );
                if( onSuccessFunction ){
                    onSuccessFunction();
                }
            },
            onFailFunction : ( errorOrResponse ) =>{
                console.error("Failed to save data to PBX.",errorOrResponse);
                Notification.error({
                    key: 'sync',
                    message: i18n.t("failed_to_save_data_to_pbx"),
                    btn: (
                        <Button type="primary" size="small" onClick={() => {
                            this._syncUp();
                            //Notification.close('sync');
                        }}>
                            {i18n.t('retry')}
                        </Button>
                    ),
                    duration: 0,
                });
            }
        };


        //     const setNoteOptions = {
        //         tenant : tenant,
        //         name:name,
        //         description : "",
        //         useraccess : BrekekeOperatorConsole.PAL_NOTE_USERACCESSES.ReadWrite,
        //         note : content
        //     };
        this.getPalRestApi().callPalRestApiMethod( setNoteOptions );


        //this.operatorConsoleAsParent.abortSystemSettings();
    }

    abortEditingScreen = () => {
        this.setDisplayState(brOcDisplayStates.showScreen);
    }

    abortAutoDialView_ver2 = () => {
        this.setState({showAutoDialWidgetSubDatas_ver2: []});  //for rerender
    }

    abortSystemSettings = () => {
        this.setDisplayState(brOcDisplayStates.showScreen_ver2);
    }

    setCurrentScreenIndex = (index) => {
        //const previousIndex = this.state.currentScreenIndex;
        this.setState({currentScreenIndex: index});

        // for( let i = 0; i < this._OnSetCurrentScreenIndexCallbacks.length; i++ ){
        //   const callbackFunc = this._OnSetCurrentScreenIndexCallbacks[i];
        //   callbackFunc( this, index, previousIndex );
        // }
    }

    onBeforeCurrentScreenIndexChange = (index) => {
        this.setState({showAutoDialWidgets: [], currentScreenQuickCallWidget: null});
        this._quickBusy.onBeforeCurrentScreenIndexChange(this, index);
    }

    // onVisibleQuickBusy( quickBusyAsCaller ){
    //   //invisible autoDialView
    //   this.setState({ showAutoDialWidgets:[], currentScreenQuickCallWidget:null });
    // }

    setQuickBusy = (quickBusy) => {
        this._quickBusy = quickBusy;
    }

    // addOnSetCurrentScreenIndexCallback( func ){
    //   this._OnSetCurrentScreenIndexCallbacks.push(func);
    // }


    duplicateScreen = () => {
        const screens = [...this.state.screens];
        screens.splice(this.state.currentScreenIndex + 1, 0, window.structuredClone(screens[this.state.currentScreenIndex]))
        this.setState({screens, currentScreenIndex: this.state.currentScreenIndex + 1}, () => {
            this.syncUp();
        })
    }
    addNextScreen = () => {
        const screens = [...this.state.screens];
        screens.splice(this.state.currentScreenIndex + 1, 0, window.structuredClone(DEFAULT_SCREEN))
        this.setState({screens, currentScreenIndex: this.state.currentScreenIndex + 1}, () => {
            this.syncUp();
        })
    }
    addPreviousScreen = () => {
        const screens = [...this.state.screens];
        screens.splice(this.state.currentScreenIndex - 1, 0, window.structuredClone(DEFAULT_SCREEN))
        this.setState({screens}, () => {
            this.syncUp();
        })
    }
    removeCurrentScreen = () => {
        if (this.state.screens.length <= 1) {
            Notification.warn({message: i18n.t("YouCanNotDeleteLastScreen")});
            return;
        }

        let newCurrentScreenIndex = this.state.currentScreenIndex;
        if (this.state.currentScreenIndex == this.state.screens.length - 1) {
            newCurrentScreenIndex = newCurrentScreenIndex - 1;
        }


        const screens = [...this.state.screens];
        screens.splice(this.state.currentScreenIndex, 1);

        this.setCurrentScreenIndex(newCurrentScreenIndex);

        this.setState({screens}, () => {
            this.syncUp();
        })
    }

    onDragStart = (ev, i) => {
        console.log('onDragStart', ev);
        // ev.preventDefault();
        ev.dataTransfer.clearData();
        ev.dataTransfer.setData('index', i + "");
        const itemRect = ev.target.getBoundingClientRect();
        ev.dataTransfer.setData('offset_x', ev.clientX - itemRect.left);
        ev.dataTransfer.setData('offset_y', ev.clientY - itemRect.top);
    }
    onDragOver = (ev) => {
        ev.preventDefault();
    }
    onDrop = (ev) => {
        console.log('onDrop', ev);
        ev.preventDefault();
        ev.stopPropagation();

        const screenRect = ev.target.getBoundingClientRect();
        const offsetX = parseInt(ev.dataTransfer.getData('offset_x'));
        const offsetY = parseInt(ev.dataTransfer.getData('offset_y'));

        const screen = this.state.screens[this.state.currentScreenIndex];
        const widget = window.structuredClone(ToolboxWidgets[ev.dataTransfer.getData('index')]);
        widget.x = ev.clientX - screenRect.left - offsetX;
        widget.x -= widget.x % screen.grid;
        widget.y = ev.clientY - screenRect.top - offsetY;
        widget.y -= widget.y % screen.grid;

        const editingTabDatas = this.state.editingTabDatas;
        const editingTabData =  editingTabDatas[ this.state.currentScreenTabIndex ];
        const editingWidgetDatas = editingTabData.widgetDatas;
        const newEditingWidgetDatas =  [...editingWidgetDatas, widget]

        editingTabData.widgetDatas = newEditingWidgetDatas;
        editingTabDatas[ this.state.currentScreenTabIndex ] = editingTabData;   //!optimize no need.

        this.setState({
            editingTabDatas : editingTabDatas
        });
        //this.selectWidget(this.state.editingWidgets.length);

        // const selectingTabData = this._getSelectingEditingTabData();
        // const newEditingWidgets = [ ...selectingTabData.widgetDatas, widget ];
        // selectingTabData.widgetDatas = newEditingWidgets;
        // this.setState({ editingTabDatas : this.state.editingTabDatas });


    }

    _getSelectingEditingTabData(){
        const tabData = this.state.editingTabDatas[ this.state.currentScreenTabIndex ];
        return tabData;
    }

    _getSelectingEditingWidgetDatas(){
        const tabData = this._getSelectingEditingTabData();
        if( !tabData ){
            return null;
        }
        const widgetDatas = tabData.widgetDatas;
        return widgetDatas;
    }


    onWidgetMoved = (i, x, y) => {
        //const editingWidgets = [...this.state.editingWidgets];
        const editingTabData = this._getSelectingEditingTabData();
        const editingWidgetDatas = [...editingTabData.widgetDatas];
        const rx = x % this.state.editingScreenGrid;
        if (rx > this.state.editingScreenGrid * 0.5) {
            x += (this.state.editingScreenGrid - rx);
        } else {
            x -= rx;
        }
        const ry = y % this.state.editingScreenGrid;
        if (ry > this.state.editingScreenGrid * 0.5) {
            y += (this.state.editingScreenGrid - ry);
        } else {
            y -= ry;
        }
        editingWidgetDatas[i].x = x;
        editingWidgetDatas[i].y = y;
        editingTabData.widgetDatas = editingWidgetDatas;
        this.state.editingTabDatas[ this.state.currentScreenTabIndex ] = editingTabData;    //!optimize no need.
        this.setState( {editingTabDatas : this.state.editingTabDatas});
        //this.setState({editingWidgets});
    }
    onWidgetResized = (i, x, y, width, height) => {
        //const editingWidgets = [...this.state.editingWidgets];
        const editingTabData = this._getSelectingEditingTabData();
        const editingWidgets = [...editingTabData.widgetDatas];

        editingWidgets[i].x = x;
        editingWidgets[i].y = y;
        editingWidgets[i].width = width;
        editingWidgets[i].height = height;

        editingTabData.widgetDatas = editingWidgets;
        this.setState( {editingTabDatas : this.state.editingTabDatas});
        //this.setState({editingWidgets});
    }
    onWidgetRemoved = (i) => {
        // const widget = this.state.editingWidgets[i];
        // const tWidget = widget.subtype;
        // if( tWidget === "LegacyAutoDialButton" ){
        //     const iW = BrekekeOperatorConsole._getIndexFromArray( this.state.showAutoDialWidgets, widget );
        //     this.state.showAutoDialWidgets.splice( 1, iW );
        //     this.setState( { showAutoDialWidgets:this.state.showAutoDialWidgets});
        // }


        //const editingWidgets = [...this.state.editingWidgets];

        const editingTabDatas = this.state.editingTabDatas;
        const editingTabData = editingTabDatas[ this.state.currentScreenTabIndex ];
        const editingWidgetDatas = editingTabData.widgetDatas;

        //const removingWidget = editingWidgets[ i ];
        // const func = removingWidget.OnRemovingWidget;
        // if( func ){
        //   func(this,i);
        // }
        editingWidgetDatas.splice(i, 1);
        this.setState({
            editingTabDatas : editingTabDatas
        });
        this.selectWidget(this.state.selectingWidgetIndex === i ? -1 : this.state.selectingWidgetIndex);
    }

    removeTabInEditMode( tabIndex ){
        const screen = this.state.screens[ this.state.currentScreenIndex ];
        if ( this.state.editingTabDatas.length == 1) {
            Notification.warning({message: i18n.t("YouCanNotDeleteLastTab")});
            return;
        }

        const editingTabDatas = this.state.editingTabDatas;
        editingTabDatas.splice( tabIndex , 1 );

        let newSelectingTabIndex;
        if( tabIndex == editingTabDatas.length ){
            newSelectingTabIndex = tabIndex - 1;
        }
        else{
            newSelectingTabIndex = tabIndex;
        }


        this.setState({
            editingTabDatas :  editingTabDatas,
            currentScreenTabIndex : newSelectingTabIndex
        });
        //this.setState({ editingTabdatas :  this.state.editingTabDatas, currentScreenTabIndex: newSelectingTabIndex });


    }

    getEditingWidget() {
        if (this.state.selectingWidgetIndex >= 0) {
            const editingWidgetDatasOrg = this._getSelectingEditingWidgetDatas();
            //const editingWidgets = [...editingWidgetDatasOrg];
            //const editingWidget = editingWidgets[this.state.selectingWidgetIndex];
            const editingWidget = editingWidgetDatasOrg[this.state.selectingWidgetIndex];
            return editingWidget;
        }
        return null;
    }

    getEditingWidgets() {
        const editingWidgetDatasOrg = this._getSelectingEditingWidgetDatas();
        const editingWidgets = [...editingWidgetDatasOrg];
        return editingWidgets;
    }


    duplicateWidget = (i) => {
        const editingWidgetDatasOrg = this._getSelectingEditingWidgetDatas();
        const editingWidgets = [...editingWidgetDatasOrg];
        const widget = window.structuredClone(editingWidgets[this.state.selectingWidgetIndex]);
        widget.x += 25;
        widget.y += 25;
        editingWidgets.splice(i + 1, 0, widget);
        // this.setState({
        //     editingWidgets
        // });
        const editingTabData = this._getSelectingEditingTabData();
        editingTabData.widgetDatas = editingWidgets;
        const editingTabDatas = this.state.editingTabDatas;
        editingTabDatas[ this.state.currentScreenTabIndex] = editingTabData;   //!optimize no need
        this.setState({ editingTabDatas : editingTabDatas });

        this.selectWidget(this.state.selectingWidgetIndex + 1);
    }

    _getEditingNewTabTitle( newTabTitle, currentTabData ){
        const editingTabDatas = this.state.editingTabDatas;
        let tabTitle = newTabTitle;
        for( let i = 0; i < editingTabDatas.length; i++ ){
            const editingTabData = editingTabDatas[i];
            if( editingTabData === currentTabData ){
                continue;
            }
            const currentTabTitle = editingTabData.tabTitle;
            if( currentTabTitle === newTabTitle ){
                tabTitle = newTabTitle + " (2)";
                return this._getEditingNewTabTitle( tabTitle );
            }
        }

        if( tabTitle.length > BrekekeOperatorConsole.TAB_TITLE_MAX_LENGTH ){
            return null;
        }

        return tabTitle;
    }

    duplicateTabInEditMode(){
        const editingTabDatas = this.state.editingTabDatas;
        const editingTabData = editingTabDatas[ this.state.currentScreenTabIndex ];
        const newTabTitle = this._getEditingNewTabTitle( editingTabData.tabTitle  );
        if( newTabTitle === null ){
            Notification.warning({ message:i18n.t("tabTitleIsTooLong.")});
            return;
        }

        const newWidgetDatas = [...editingTabData.widgetDatas];
        const newTabData = {
            tabTitle : newTabTitle,
            widgetDatas : newWidgetDatas
        }
        const insertIndex = this.state.currentScreenTabIndex;
        editingTabDatas.splice( insertIndex, 0, newTabData );
        this.setState({editingTabDatas:editingTabDatas});
    }

    addTabInEditMode(){
        const form = document.getElementById("tabFormInEditMode");
        let newTabTitle = form.tabTitle.value.trim();
        if( newTabTitle.length === 0 ){
            Notification.warning({message:i18n.t("tabTitleIsEmpty")});
            return;
        }

        newTabTitle = this._getEditingNewTabTitle( newTabTitle );
        if( newTabTitle === null ){
            Notification.warning({ message:i18n.t("tabTitleIsTooLong.")});
            return;
        }


        const editingTabDatas = this.state.editingTabDatas;
        const newTabData = {
            tabTitle : newTabTitle,
            widgetDatas : new Array()
        }

        const insertIndex = this.state.currentScreenTabIndex;
         editingTabDatas.splice( insertIndex, 0, newTabData );
        this.setState({editingTabDatas:editingTabDatas});
    }

    selectWidget = (i) => {
        if (i !== this.state.selectingWidgetIndex && this.state.selectingWidgetIndex >= 0) {
            //const editingWidgets = [...this.state.editingWidgets];
            //
            //const prevWidget =  editingWidgets[this.state.selectingWidgetIndex];
            // for( let i = 0; i < this._OnDeselectWidgetFuncs.length; i++ ) {
            //   this._OnDeselectWidgetFuncs[i]( this, prevWidget );
            // }
            //const wSelect = editingWidgets[i];
            // for( let i = 0; i < this._OnSelectWidgetFuncs.length; i++ ) {
            //   this._OnSelectWidgetFuncs[i]( this, wSelect );
            // }


            // const Widget = WidgetMap[prevWidget.type];
            // if (Widget) {
            //   const func = Widget.OnDeselectEditingWidget;
            //   if (func) {
            //     func(this);
            //   }
            // }
        }

        if( this._onKeydownAtEditingScreenFunc ){
            window.removeEventListener("keydown", this._onKeydownAtEditingScreenFunc );
            this._onKeydownAtEditingScreenFunc = null;
        }

        if( i !== -1  ) {
            this._onKeydownAtEditingScreenFunc = (ev) => this._onKeydownAtEditingScreen(ev);
            window.addEventListener( "keydown", this._onKeydownAtEditingScreenFunc );
        }

        this.setState({selectingWidgetIndex: i, isSelectingTabInEditLayout: false});
    }

    _onKeydownAtEditingScreen( ev ) {

        if(  this.state.displayState !== brOcDisplayStates.editingScreen ){ //not editing
            window.removeEventListener("keydown", this._onKeydownAtEditingScreenFunc );
            this._onKeydownAtEditingScreenFunc = null;
            return;
        }

        //!later commentout
        // if( ev.keyCode == 46 ){    //Not a delete key
        //     this.setState({showConfirmDeleteWidget:true});
        //     return;
        // }

        //alert( document.activeElement );    //!temp


    }




    makeWidgetOnTop = (i) => {
        //const editingWidgets = [...this.state.editingWidgets];
        const editingWidgetDatas = [...this._getSelectingEditingWidgetDatas()];
        const [widget] = editingWidgetDatas.splice(i, 1);
        editingWidgetDatas.push(widget);
        const editingTabDatas = this.state.editingTabDatas;
        const editingTabData = editingTabDatas[ this.state.currentScreenTabIndex];
        editingTabData.widgetDatas = editingWidgetDatas;
        editingTabDatas[ this.state.currentScreenTabIndex ] = editingTabData; //!optimize no need.
        this.setState({
            editingTabDatas : editingTabDatas
        });
        this.selectWidget(editingWidgetDatas.length - 1);
    }


    updateSelectingWidgetSettings = (settings) => {
        //const editingWidgets = [...this.state.editingWidgets];
        const editingWidgetDatas = [...this._getSelectingEditingWidgetDatas()];
        editingWidgetDatas[this.state.selectingWidgetIndex] = {
            ...editingWidgetDatas[this.state.selectingWidgetIndex],
            ...settings,
        };

        const editingTabDatas = this.state.editingTabDatas;
        const editingTabData = editingTabDatas[ this.state.currentScreenTabIndex ];
        editingTabData.widgetDatas = editingWidgetDatas;
        editingTabDatas[ this.state.currentScreenTabIndex ] = editingTabData;   //!optimize no need
        this.setState({editingTabDatas : editingTabDatas });
        //this.setState({editingWidgets});
    }

    // //!obsolute
    // getCurrentCall = () => {
    //     const id = this.getCurrentCallIdForWebphoneCallInfos();
    //     if( !id ){
    //         return null;
    //     }
    //     const call = this._getCallByCallIdForWebphoneCallInfos(id);
    //     return call;
    // }

    getCurrentCallInfo(){
        return this._aphone.getCallInfos().getCurrentCallInfo();
    }

    _getCurrentCallIndex(){
        return this._aphone.getCallInfos().getCurrentCallIndex();
    }

    //!obsolute
    getCurrentCallIdForWebphoneCallInfos(){
        return this._aphone.getCallInfos().getCurrentCallId();
    }

    // //!obsolute
    // _getCallByCallIdForWebphoneCallInfos = (id ) =>{
    //     return this._aphone.getCallInfos().getCallByCallId();
    // }

    switchCallUp = () => {
        const currentCallIndex = this._getCurrentCallIndex();
        if ( currentCallIndex > 0) {
            this.holdCall();
            this.setCurrentCallIndex( currentCallIndex - 1 );
        }
    }

    setCurrentCallIndex( index ){
        const currentCallIndex = this._getCurrentCallIndex();

        this._aphone.getCallInfos().setCurrentCallIndexByOperatorConsole(index);
        this.setState({refresh:true });
        if( index === currentCallIndex ){
            return false;
        }
        //this._onChangeCurrentCallIndex( index, currentCallIndex  );

        this._onChangeCurrentCallIndex( currentCallIndex, index );


        return true;
    }

    _onChangeCurrentCallIndex( currentCallIndex, index ) {
        this._resetCallInput();
    }

    // _onChangeCurrentCallIndex(index, prevIndex ){
    //     // let currentCallId;
    //     // if( index !== -1 ) {
    //     //     currentCallId = this._callIds[index];
    //     // }
    //     // else{
    //     //     currentCallId = null;
    //     // }
    //     const callInfos = this._aphone.getCallInfos();
    //     const currentCallId = callInfos.getCallIdByIndex( index );
    //     const prevCallId = callInfos.getCallIdByIndex( prevIndex );
    //
    //     // let prevCallId;
    //     // if( prevIndex !== -1 ){
    //     //     prevCallId = this._callIds[prevIndex];
    //     // }
    //     // else{
    //     //     prevCallId = null;
    //     // }
    //
    //     const options = {
    //         currentCallId : currentCallId,
    //         previousCallId : prevCallId
    //     };
    //
    //     for(let i = 0; i < this._OnChangeCurrentCallIdEventListeners.length; i++ ){
    //         const event = this._OnChangeCurrentCallIdEventListeners[i];
    //         event( options );   //!forBug need tryCatch?
    //     }
    // }

    switchCallDown = () => {
        const currentCallIndex = this._getCurrentCallIndex();
        const callInfoCount = this._aphone.getCallInfos().getCallInfoCount();
        if ( currentCallIndex < callInfoCount - 1) {
            this.holdCall();
            this.setCurrentCallIndex( currentCallIndex + 1);
        }
    }

    // getCallIndexByCallId = (callId ) =>{
    //     const index = this._callIds.indexOf( callId );
    //     return index;
    // }

    switchCallIndex = (index) => {
        const currentCallIndex = this._getCurrentCallIndex();
        if( currentCallIndex  === index ) {
            return false;
        }
        this.holdCall();
        this.setCurrentCallIndex(index);
        return true;

        // const ok = this.switchCallIndexWithoutHold( index )
        // if( ok ) {
        //     this.holdCall();
        // }
    }

    switchCallIndexWithoutHold = (index) => {
        if( this._getCurrentCallIndex() === index ) {
            return false;
        }
        this.setCurrentCallIndex(index);
        return true;
    }


    monitorDialingExtension = async () => {
        if (this._aphone.isPalReady()) {
            const extStatus = this.state.extensionsStatus[this.state.dialing];
            if (!extStatus) {
                Notification.error({message: i18n.t('talking_monitored_extension_required')});
                return;
            }
            const talker_id = Object.keys(extStatus.callStatus)
                .find((talker_id) => extStatus.callStatus[talker_id] === 'talking');
            if (!talker_id) {
                Notification.error({message: i18n.t('talking_monitored_extension_required')});
                return;
            }

            const tenant = this.state.loginUser?.pbxTenant;
            const user = this.state.dialing;
            await this._aphone.bargeAsync( tenant, user, talker_id ).catch((err) => {
                console.error( "Failed to monitor extension.", err );
                Notification.error({message: i18n.t('failed_to_monitor_extension')});
                throw err;
            })
            this.setState({monitoringExtension: this.state.dialing});
        }
    }

    joinConversation = () => {
        const currentCallInfo = this._aphone.getCallInfos().getCurrentCallInfo();
        if( !currentCallInfo ){
            return;
        }
        currentCallInfo.conference();
    }

    appendKeypadValue = (key) => {
        let dialing = this.state.dialing + key;
        if( this._isDTMFInput === true ){
            const bSend = this.sendDTMFIfNeed(key);
            if( !bSend ){
                return;
            }
            if( dialing.length > BrekekeOperatorConsole.DIALING_MAX_LENGTH ){
                dialing = dialing.substring( dialing.length - BrekekeOperatorConsole.DIALING_MAX_LENGTH, dialing.length );
            }
        }
        else{
            if( dialing.length > BrekekeOperatorConsole.DIALING_MAX_LENGTH ) {
                return;
            }
        }
        this.setState({dialing: dialing}, () => this._onAppendKeypadValue(key));
    }

    _onAppendKeypadValue(key) {
        for (let i = 0; i < this._OnAppendKeypadValueCallbacks.length; i++) {
            const func = this._OnAppendKeypadValueCallbacks[i];
            func(this, key);
        }
    }


    addOnAppendKeypadValueCallback(func) {
        this._OnAppendKeypadValueCallbacks.push(func);
    }

    setDialingAndMakeCall = (sDialing, context) => {
        this.setState({dialing: sDialing}, () => {
            if( context ) {
                context.makeCall();
            }
            else{
                this.makeCall();
            }
        });
    }

    setDialing = (sDialing) => {
        this.setState({dialing: sDialing});
    }

    setDialingAndMakeCall2 = (sDialing) => {
        this.setState({dialing: sDialing}, () => this.makeCall2());
    }

    backspaceKeypadValue = () => {
        if( this._isDTMFInput === true ){
            return;
        }

        if( !this.state.dialing || this.state.dialing.length == 0 ){
            return;
        }
        const dialing = this.state.dialing.slice(0, -1);
        this.setState({dialing: dialing}, () => this._onBackspaceKeypadVakue());
    }

    _onBackspaceKeypadVakue() {
        const callbacks = this._OnBackspaceKeypadValueCallbacks;
        for (let i = 0; i < callbacks.length; i++) {
            const func = callbacks[i];
            func(this);
        }
    }


    addOnbackspaceKeypadValueCallback = (func) => {
        this._OnBackspaceKeypadValueCallbacks.push(func);
    }

    onRemoveCallInfoByCallInfos( callInfosAsCaller, callInfo ){
        this.setState({refresh:true} );

        this._CallHistory2.onRemoveCallInfoForCallHistory2( this, callInfo );

        const options = {
            callInfo : callInfo
        };
        //this._BusylightStatusChanger.onRemoveCall( options );  //!dev
        for(let i = 0; i < this._OnRemoveCallInfoEventListeners.length; i++ ){
            const event = this._OnRemoveCallInfoEventListeners[i];
            event( options );   //!forBug need tryCatch?
        }

    }

    setOnUnholdCallInfoEventListener(function_ ){
        const index = this._OnUnholdCallInfoEventListeners.indexOf( function_ );
        if( index !== -1 ){
            return false;
        }
        this._OnUnholdCallInfoEventListeners.push( function_ );
        return true;
    }

    removeOnUnholdCallInfoEventListener( function_ ){
        const removedIndex = Util.removeItemFromArray( this._OnUnholdCallInfoEventListeners, function_ );
        return removedIndex;
    }

    _clearOnUnholdCallInfoEventListeners(){
        this._OnUnholdCallInfoEventListeners.splice(0);
    }

    setOnHoldCallInfoEventListener(function_ ){
        const index = this._OnHoldCallInfoEventListeners.indexOf( function_ );
        if( index !== -1 ){
            return false;
        }
        this._OnHoldCallInfoEventListeners.push( function_ );
        return true;
    }

    removeOnHoldCallInfoEventListener( function_ ){
        const removedIndex = Util.removeItemFromArray( this._OnHoldCallInfoEventListeners, function_ );
        return removedIndex;
    }

    _clearOnHoldCallInfoEventListeners(){
        this._OnHoldCallInfoEventListeners.splice(0);
    }

    onAnswerIncomingCallByCallInfo( callInfoAsCaller ){
        this._CallHistory.addCallNoAndSave( callInfoAsCaller.getPartyNumber() );
    }

    onAddCallInfoByCallInfos( callInfos, callInfo ) {
        const callStatus = callInfo.getCallStatus();
        if( callStatus === ACallInfo.CALL_STATUSES.calling ){
            this._CallHistory.addCallNoAndSave( callInfo.getPartyNumber() );
        }

        this.setState({refresh:true});

        this._CallHistory2.onAddCallInfoForCallHistory2( this, callInfo );


        const options = {
            callInfo : callInfo
        }
        //this._BusylightStatusChanger.onInsertCall( options );  //!dev
        for(let i = 0; i < this._OnAddCallInfoEventListeners.length; i++ ){
            const event = this._OnAddCallInfoEventListeners[i];
            event( options );   //!forBug need tryCatch?
        }
    }

    // onUpdateWebphoneCallObjectPropertyByWebphoneCallInfos( webphoneCallInfosAsCaller, webphoneCallObject, field, val ){
    //     this.setState({refresh:true});
    //     const options = {
    //         call : webphoneCallObject,
    //         field: field,
    //         value: val
    //     };  //!forBug need copy objects/array?
    //     for(let i = 0; i < this._OnChangeCallEventListeners.length; i++ ){
    //         const event = this._OnChangeCallEventListeners[i];
    //         event( options );   //!forBug need tryCatch?
    //     }
    // }

    setOnAddCallInfoEventListener(function_ ){
        const index = this._OnAddCallInfoEventListeners.indexOf( function_ );
        if( index !== -1 ){
            return false;
        }
        this._OnAddCallInfoEventListeners.push( function_ );
        return true;
    }

    removeOnAddCallInfoEventListener( function_ ){
        const removedIndex = Util.removeItemFromArray( this._OnAddCallInfoEventListeners, function_ );
        return removedIndex;
    }

    _clearOnAddCallInfoEventListeners(){
        this._OnAddCallInfoEventListeners.splice(0);
    }

    setOnRemoveCallInfoEventListener(function_ ){
        const index = this._OnRemoveCallInfoEventListeners.indexOf( function_ );
        if( index !== -1 ){
            return false;
        }
        this._OnRemoveCallInfoEventListeners.push( function_ );
        return true;
    }

    removeOnRemoveCallInfoEventListener( function_ ){
        const removedIndex = Util.removeItemFromArray( this._OnRemoveCallInfoEventListeners, function_ );
        return removedIndex;
    }

    _clearOnRemoveCallInfoEventListeners(){
        this._OnRemoveCallInfoEventListeners.splice(0);
    }

    // setOnChangeCurrentCallIdEventListener(function_ ){
    //     const index = this._OnChangeCurrentCallIdEventListeners.indexOf( function_ );
    //     if( index !== -1 ){
    //         return false;
    //     }
    //     this._OnChangeCurrentCallIdEventListeners.push( function_ );
    //     return true;
    // }

    // removeOnChangeCurrentCallIdEventListener( function_ ){
    //     const removedIndex = Util.removeItemFromArray( this._OnChangeCurrentCallIdEventListeners, function_ );
    //     return removedIndex;
    // }

    // clearOnChangeCurrentCallIdEventListeners(){
    //     this._OnChangeCurrentCallIdEventListeners.splice(0);
    // }

    _clearAllEventListenersForEx(){
        //this.clearOnChangeCallEventListeners();
        //this.clearOnChangeCurrentCallIdEventListeners();

        this._clearOnUnloadExtensionScriptEventListeners();
        this._clearOnRemoveCallInfoEventListeners();
        this._clearOnAddCallInfoEventListeners();
        this._clearOnUpdateCallInfoEventListeners();
        this._clearOnUnholdCallInfoEventListeners();
        this._clearOnHoldCallInfoEventListeners();
    }

    reloadSystemSettingsExtensionScript(){
        const systemSettingsData = this.state.systemSettingsData;
        const script = systemSettingsData.getExtensionScript();
        this._onUnloadExtensionScript();
        //eval( script );
        try {
            eval(script);
        }
        catch(err){
            console.error( i18n.t('anExtensionScriptExecutingErrorHasOccurred') + ". error=" ,  err);
            Notification.error({message: i18n.t('anExtensionScriptExecutingErrorHasOccurred') + "\r\n" +  err, duration:0 });
            return;
        }

    }



    _onUnloadExtensionScript(){
        for(let i = 0; i < this._OnUnloadExtensionScriptEventListeners.length; i++ ){
            const event = this._OnUnloadExtensionScriptEventListeners[i];
            try {
                event();
            }
            catch( err ){
                console.error( i18n.t('anExtensionScriptUnloadingErrorHasOccurred') + ". error=" ,  err);
                Notification.error({message: i18n.t('anExtensionScriptUnloadingErrorHasOccurred') + "\r\n" +  err, duration:0 });
            }
        }
        this._clearAllEventListenersForEx();
    }

    setOnUnloadExtensionScriptEventListener(function_ ){
        const index = this._OnUnloadExtensionScriptEventListeners.indexOf( function_ );
        if( index !== -1 ){
            return false;
        }
        this._OnUnloadExtensionScriptEventListeners.push( function_ );
        return true;
    }

    removeOnUnloadExtensionScriptEventListener( function_ ){
        const removedIndex = Util.removeItemFromArray( this._OnUnloadExtensionScriptEventListeners, function_ );
        return removedIndex;
    }

    _clearOnUnloadExtensionScriptEventListeners(){
        this._OnUnloadExtensionScriptEventListeners.splice(0);
    }

    // setOnChangeCallEventListener(function_ ){
    //     const index = this._OnChangeCallEventListeners.indexOf( function_ );
    //     if( index !== -1 ){
    //         return false;
    //     }
    //     this._OnChangeCallEventListeners.push( function_ );
    //     return true;
    // }

    // removeOnChangeCallEventListener(function_ ){
    //     const removedIndex = Util.removeItemFromArray( this._OnChangeCallEventListeners, function_ );
    //     return removedIndex;
    // }

    // clearOnChangeCallEventListeners(){
    //     this._OnChangeCallEventListeners.splice(0);
    // }


    _resetCallInput(){
        const callInfos = this._aphone.getCallInfos();
        const currentCallIndex = callInfos.getCurrentCallIndex();
        const bDisconnected =  currentCallIndex < 0;
        if( bDisconnected ){
            this._clearDialing();
            this._isDTMFInput = false;
            return;
        }
        const currentCallInfo = callInfos.getCallInfoAt( currentCallIndex );

        const callStatus = currentCallInfo.getCallStatus();
        const prevCallStatus = this._prevCurrentCallStatus;
        if( callStatus === prevCallStatus ){
            return;
        }

        this._prevCurrentCallStatus = callStatus;

        //!ref to 202404240424
        switch( callStatus ){
            case ACallInfo.CALL_STATUSES.talking:
            case ACallInfo.CALL_STATUSES.calling:
                this._clearDialing();
                this._isDTMFInput = true;
                break;
            case ACallInfo.CALL_STATUSES.holding:
            case ACallInfo.CALL_STATUSES.incoming:
                this._clearDialing();
                this._isDTMFInput = false;
                break;
            default:
                console.error("Could not reset CallInput!");
                break;

        }

        //Not need.
        //this.setState({refresh:true} );
    }


    //!callme
    onUpdateCallInfoByCallInfo = (callInfoAsCaller) => {
        this._resetCallInput();
        this.setState({refresh:true} );

        this._CallHistory2.onUpdateCallInfoForCallHistory2( this, callInfoAsCaller );

        const options = {
            callInfo:callInfoAsCaller
        };
        //this._BusylightStatusChanger.onUpdateCall( options );   //!dev
        for(let i = 0; i < this._OnUpdateCallInfoEventListeners.length; i++ ){
            const event = this._OnUpdateCallInfoEventListeners[i];
            event( options );   //!forBug need tryCatch?
        }


    }

    //!callme
    onCallSuccessByPalCallInfo( palCallInfoAsCaller ){
        this._resetCallInput();
    }

    //!callme
    onHoldByCallInfo( callInfoAsCaller ){
        this._resetCallInput();
        this.setState({refresh:true} );

        const options = {
            callInfo : callInfoAsCaller
        }
        //this._BusylightStatusChanger.onInsertCall( options );  //!dev
        for(let i = 0; i < this._OnHoldCallInfoEventListeners.length; i++ ){
            const event = this._OnHoldCallInfoEventListeners[i];
            event( options );   //!forBug need tryCatch?
        }
    }

    //!callme
    onUnholdByCallInfo( callInfoAsCaller ){
        this._resetCallInput();
        this.setState({refresh:true});

        const options = {
            callInfo : callInfoAsCaller
        }
        //this._BusylightStatusChanger.onInsertCall( options );  //!dev
        for(let i = 0; i < this._OnUnholdCallInfoEventListeners.length; i++ ){
            const event = this._OnUnholdCallInfoEventListeners[i];
            event( options );   //!forBug need tryCatch?
        }
    }



    setOnUpdateCallInfoEventListener(function_ ){
        const index = this._OnUpdateCallInfoEventListeners.indexOf( function_ );
        if( index !== -1 ){
            return false;
        }
        this._OnUpdateCallInfoEventListeners.push( function_ );
        return true;
    }

    removeOnUpdateCallInfoEventListener( function_ ){
        const removedIndex = Util.removeItemFromArray( this._OnUpdateCallInfoEventListeners, function_ );
        return removedIndex;
    }

    _clearOnUpdateCallInfoEventListeners(){
        this._OnUpdateCallInfoEventListeners.splice(0);
    }

    toggleCallRecording = () => {
        const currentCallInfo = this._aphone.getCallInfos().getCurrentCallInfo();
        if (currentCallInfo) {
            const promise = currentCallInfo.toggleRecordingAsync();
            promise.then( (result) => {

            } ).catch( (errMsg ) =>{
                Notification.error({message:errMsg , duration:0 });
            }).finally( () =>{
                this.setState({refresh:true});
            });
        }
    }

    toggleCallMuted = () => {
        const currentCallInfo = this._aphone.getCallInfos().getCurrentCallInfo();
        if (currentCallInfo) {
            const promise = currentCallInfo.toggleMutedAsync();
            promise.then( (result) => {

            } ).catch( (errMsg ) =>{
                Notification.error({message:errMsg , duration:0 });
            }).finally( () =>{
                this.setState({refresh:true});
            });
        }
    }

    toggleAutoRejectIncoming = () => {
        this.setState({autoRejectIncoming: !this.state.autoRejectIncoming});
    }

    getAutoRejectIncoming(){
        return this.state.autoRejectIncoming;
    }

    resumeCall = () => {
        const currentCallInfo = this._aphone.getCallInfos().getCurrentCallInfo();
        if (currentCallInfo && currentCallInfo.getIsHolding()) {
            currentCallInfo.toggleHoldWithCheck();
        }
    }

    holdCall = () => {
        const currentCallInfo = this._aphone.getCallInfos().getCurrentCallInfo();
        if( !currentCallInfo ){
            return false;
        }
        if( currentCallInfo.getIsHolding() ){
            return false;
        }

        const status = currentCallInfo.getCallStatus();
        if( status === ACallInfo.CALL_STATUSES.calling || status === ACallInfo.CALL_STATUSES.incoming ){
            return false;
        }

        currentCallInfo.toggleHoldWithCheck();
        //this.setState({dialing: ''});
    }

    hangUpCall = () => {
        const currentCallInfo = this._aphone.getCallInfos().getCurrentCallInfo();
        if (currentCallInfo) {
            currentCallInfo.hangup();
        }
    }

    answerCall = () => {
        const currentCallInfo = this._aphone.getCallInfos().getCurrentCallInfo();
        if (currentCallInfo && !currentCallInfo.getIsAnswered() ) {
            currentCallInfo.answerCall();
            // const callerNo = currentCallInfo.getPartyNumber();
            // this._CallHistory.addCallNoAndSave(callerNo);
        }
    }

    transferDialingCall = async () => {
        const mode = undefined; //use attended
        this.transferCall( this.state.dialing, mode ).then( () => {
            this._clearDialing(); //!todo I want to run it after the transfer is complete.
        } );
    }

    transferCall = async ( dialing, mode, callInfo ) => {
        if( !callInfo ){
            callInfo = this._aphone.getCallInfos().getCurrentCallInfo();
        }
        if (!callInfo) {
            return false;
        }
        //const tenant = callInfo.pbxTenant;
        const tenant = undefined;   //!testit
        const talkerId = callInfo.getPbxTalkerId();
        await this.transferCallCore( dialing, mode, talkerId, tenant,
            function( this_, message ){
                if( mode === "blind") {
                    if (message && message.toLowerCase().startsWith("fail")) {
                        //!fail
                    } else {
                        callInfo.hangup();
                    }
                }
            }
        );

        return true;
    }

    transferCallCore = async ( dialing, mode, talkerId, tenant, onDoneFunc  ) => {
        if ( this._aphone.isPalReady() && dialing ) {
            const promise = this._aphone.transferAsync( tenant, dialing, talkerId, mode );
            await promise.then((message) => {
                console.log("transferCallCore. result message=" + message );
                if( onDoneFunc ){
                    onDoneFunc( this, message );
                }
            }).catch((err) => {
                console.error("Failed to transfer call.", err );
                Notification.error({message: i18n.t('failed_to_transfer_call'),duration:0});
                throw err;
            });
        }
        else {
            //!testit
            console.error("Failed to transfer call. isPalReady=" + this._aphone.isPalReady() + ",dialing=" + dialing );
            Notification.error({message: i18n.t('failed_to_transfer_call'), duration: 0});
        }

    }

    _isSendDTMFChar( key ){
        if( !key || key.length !== 1 ){
            return false;
        }
        const b = BrekekeOperatorConsole.DTMF_CHARS.indexOf( key ) !== -1;
        return b;
    }

    sendDTMFIfNeed = (key) => {

        if( this._isDTMFInput !== true ){
            return false;
        }


        const currentCallInfo = this._aphone.getCallInfos().getCurrentCallInfo();
        if( !currentCallInfo ){
            return false;
        }
        const bNeedSendDTMF = this._isSendDTMFChar(key);
        // if (this._aphone.isPalReady() && currentCallInfo) {
        if ( bNeedSendDTMF) {
            //const tenant = currentCall.pbxTenant;
            const tenant = undefined;   //!testit
            const signal = key;
            const talker_id = currentCallInfo.getPbxTalkerId();
            this._aphone.sendDTMF(  tenant, talker_id, signal );
        }
        return bNeedSendDTMF;
    }

    makeCallWithShortDial = async (context) => {
        const dialing = this.state.dialing;

        //Search short dial
        const shortDials = this.getSystemSettingsData().getShortDials();
        if (dialing && shortDials) {
            for (let i = 0; i < shortDials.length; i++) {
                const shortDialObject = shortDials[i];
                const shortDial = shortDialObject.shortDial;
                if (shortDial === dialing) {
                    const dial = shortDialObject.dial;
                    this.setDialingAndMakeCall(dial, context);
                    return;
                }
            }
        }
        await this.makeCall();
    }

    // findCallByTalkerId= ( talkerId  ) =>{
    //     const calls = Object.values( this.callById );
    //     const itm = calls.find( ( element ) =>{
    //         if( element.pbxTalkerId === talkerId ){
    //             return true;
    //         }
    //         return false;
    //     });
    //     return itm;
    // }

    makeCall2 = async ( ) => {
        const sDialing = this.state.dialing;
        if (!sDialing) {
            return false;
        }
        console.log("makeCall: sDialing=" + sDialing);
        //this._CallHistory.addCallNoAndSave(sDialing);

        const bUsingLine = this.state.usingLine;

        // const bCall = this._aphone.callByPhoneClient(  sDialing, bUsingLine );
        // if( !bCall ){
        //     return false;
        // }
        this._aphone.callByPhoneClient(  sDialing, bUsingLine );

        this._clearDialing();
        if (this.state.currentScreenQuickCallWidget) {
            this.setDisplayState(brOcDisplayStates.showScreen, {currentScreenQuickCallWidget: null});
        }
        //this.setState({isCalling:true});
        return true;

    }

    _clearDialing() {
        this.setState({dialing: ''}, () => this._onClearDialing());
    }

    _onClearDialing() {
        for (let i = 0; i < this._OnClearDialingCallbacks.length; i++) {
            const callback = this._OnClearDialingCallbacks[i];
            callback(this);
        }
    }

    makeCall = async ( ) => {
        //const {currentCallIndex, callIds = [], callById = {}} = context;
        await this.makeCall2();

    }

    handleLine = async (line) => {
        const {line_talker = '', room_id = ''} = this.state.linesStatus[line] || {};
        const park = this.state.parksStatus[line];
        if (park) {
            this._aphone.callByPhoneClient(line);
            return;
        }

        //const lineCall = Object.values(this.callById).find((call) => call.pbxRoomId === room_id)
        const callInfos =  this._aphone.getCallInfos();
        const lineCallInfo = callInfos.getCallInfoWherePbxRoomIdEqual( room_id );
        if (lineCallInfo) {
            if (lineCallInfo.getIsIncoming() && !lineCallInfo.getIsAnswered() ) {
                const currentCallInfo = callInfos.getCurrentCallInfo();
                // if( !currentCallInfo ){
                //     const callIndex = callInfos.getCallIndexWhereCallIdEqual( lineCallInfo.getCallId() );
                //     callInfos.setCurrentCallIndex( callIndex );
                //     this.resumeCall();
                // }
                //else if ( currentCallInfo.getCallId() !== lineCallInfo.getCallId()) {
                if ( currentCallInfo.getCallId() !== lineCallInfo.getCallId()) {
                    if( currentCallInfo.getIsAnswered() ) {
                        this.holdCall();
                    }
                    const callIndex = callInfos.getCallIndexWhereCallIdEqual( lineCallInfo.getCallId() );
                    this.setCurrentCallIndex( callIndex );
                    //this.resumeCall();
                }
                lineCallInfo.answerCall();

            } else if (lineCallInfo.getIsAnswered) {
                const tenant = this.state.loginUser.pbxTenant;
                const talkerId =  lineCallInfo.getPbxTalkerId();
                const number = line;

                const promise = this._aphone.parkAsync( tenant, talkerId, number );
                await promise.catch((err) => {
                    console.error("Failed to park call.", err );
                    Notification.error({message: i18n.t('failed_to_park_call'),duration:0});
                    throw err;
                });
                const myParksStatus = {...this.state.myParksStatus, [line]: true};
                this.setState({myParksStatus});
            }

            return;
        }

        if (line_talker) {
            if (line_talker === this.state.loginUser.pbxUsername) {
                const promise = this._aphone.lineAsync( line, "off");
                await promise.catch((err) => {
                    console.error("Failed to unhold line.", err );
                    Notification.error({message: i18n.t('failed_to_unhold_line'),duration:0});
                    throw err;
                });
                this.setState({usingLine: ''});
            }
        } else {
            if (this.state.usingLine) {
                const line_ = this.state.usingLine;
                const promise = this._aphone.lineAsync( line_, "off");
                await promise.catch((err) => {
                    console.error("Failed to unhold line.", err );
                    Notification.error({message: i18n.t('failed_to_unhold_line'),duration:0});
                    throw err;
                });
                this.setState({usingLine: ''});
            }
            const promise = this._aphone.lineAsync( line, "on");
            await promise.catch((err) => {
                console.error("Failed to hold line.", err );
                Notification.error({message: i18n.t('failed_to_hold_line'),duration:0});
                throw err;
            });
            this.setState({usingLine: line});
        }
    }

    isAphoneNull(){
        const b = this._aphone === null;
        return b;
    }

    handlePark = async (number) => {
        if (!number) return;

        if (this.state.parksStatus[number]) {
            this.holdCall();
            this._aphone.callByPhoneClient(number);
            return;
        }

        const currentCallInfo = this._aphone.getCallInfos().getCurrentCallInfo();
        if (currentCallInfo) {
            const tenant = this.state.loginUser.pbxTenant;
            const talkerId = currentCallInfo.getPbxTalkerId();
            const promise = this._aphone.parkAsync( tenant, talkerId, number );
            await promise.catch((err) => {
                console.error("Failed to park call.", err );
                Notification.error({message: i18n.t('failed_to_park_call'),duration:0});
                throw err;
            });

            const myParksStatus = {...this.state.myParksStatus, [number]: true};
            this.setState({myParksStatus});
        }
    }





    // _flushLineStatusEvents() {
    //
    // }

    _onBeforeUnloadMain( event ){
        const phoneClient = this.getPhoneClient();
        let hasCall;
        if( phoneClient ){
            hasCall = phoneClient.getCallInfos().getCallInfoCount() !== 0;
        }
        else{
            hasCall = false;
        }
        if( hasCall ) {
            event.preventDefault();
            event.returnValue = i18n.t("areYouSureLeaveThePage");
        }
    }

    _onBeforeUnload(event){
        this._CallHistory2.onBeforeUnloadForCallHistory2( this, event );
        this._onBeforeUnloadMain(event);
    }

    _onUnload(event){
        console.log("OperatorConsole:onUnload. this.aphone=" + this._aphone );
        this._deinitAphoneClient();
        this._deinitPalWrapper();
    }

    _deinitPalWrapper(){
        if( this._loggedinPal ){
            this._loggedinPal.close();
            this._loggedinPal = null;
        }
        this._LoginPalWrapper.deinitPalWrapper();
    }


    // onPalNotifyStatus( options ){
    //     for(let i = 0; i < this._OnPalNotifyStatusEventListeners.length; i++ ){
    //         const event = this._OnPalNotifyStatusEventListeners[i];
    //         event( options );   //!forBug need tryCatch?
    //     }
    // }

    // setOnPalNotifyStatusEventListener(function_ ){
    //     const index = this._OnPalNotifyStatusEventListeners.indexOf( function_ );
    //     if( index !== -1 ){
    //         return false;
    //     }
    //     this._OnPalNotifyStatusEventListeners.push( function_ );
    //     return true;
    // }

    // removeOnPalNotifyStatusEventListener( function_ ){
    //     const removedIndex = Util.removeItemFromArray( this._OnPalNotifyStatusEventListeners, function_ );
    //     return removedIndex;
    // }

    // clearOnPalNotifyStatusEventListeners(){
    //     this._OnPalNotifyStatusEventListeners.splice(0);
    // }

    _setOCNoteFailAtDownLayoutAndSystemSettings( e, downLayoutAndSystemSettingsFailFunction  ) {
        //!testit
        if( Array.isArray(e)){
            for( let i = 0; i < e.length; i++ ){
                const err = e[i];
                console.error("setOCNote failed. errors[" + i + "]=" , err );
            }
        }
        else{
            console.error("setOCNote failed. error=" , e );
        }
        try {
            const sError = JSON.stringify(e);
            Notification.error({message: i18n.t('failed_to_save_data_to_pbx') + "\r\n" +  sError, duration:0 });
        }
        catch( err ){
            Notification.error({message: i18n.t('failed_to_save_data_to_pbx') + "\r\n" +  e, duration:0 });
        }
        //Notification.error({message: i18n.t('failed_to_save_data_to_pbx') , duration:0 });

        // let message = eventArg ? eventArg.message : "";
        // if (!message) {
        //     message = "";
        // }
        // console.error("Failed to setOCNote.", message);
        // if (message) {
        //     Notification.error({message: message,duration:0});
        // }
        //throw new Error(message);

        //console.warn("Failed to getNote." , err );
        //this.setState({ error: true })
        //this.setState( { error:true, _downedLayoutAndSystemSettings:true, displayState:bcOcDisplayStates.noScreens } );   //!need?
        this._removeLastLayoutShortname();  //!reset
        this.setState({displayState: brOcDisplayStates.noScreens}, () => downLayoutAndSystemSettingsFailFunction() );
        //throw err;
    }

    isInitialized(){
        return this.state.isInitialized;
    }

    _downLayoutAndSystemSettingsForLoggedin( downLayoutAndSystemSettingsSuccessFunction, downLayoutAndSystemSettingsFailFunction ){
        if( !this._loggedinPal || this.state._downedLayoutAndSystemSettings ){
            downLayoutAndSystemSettingsFailFunction({message:i18n.t("CouldNotDownloadLayoutAndSystemSettings")});
            return false;
        }

        const layoutShortname = this._getLastLayoutShortname();
        if( layoutShortname ) {
            const layoutFullname = this._getLayoutFullname( layoutShortname );
            const getNoteOptions = {
                tenant : this.state.loginUser.pbxTenant,
                name : layoutFullname
            }
            const this_ = this;
            this._loggedinPal.getNote( getNoteOptions,
                function( res, obj ){
                    const sNote = res.note;
                    const oNote = JSON.parse( sNote );
                    // const oScreen_ver2 = oNote["screen_ver2"];
                    // let screenData_ver2;
                    // if( !oScreen_ver2 ){
                    //     screenData_ver2 = new ScreenData();
                    // }
                    // else{
                    //     screenData_ver2 = ScreenData.createScreenDataFromObject( oScreen_ver2 );
                    // }
                    this_.setOCNote( layoutShortname, oNote, function(){
                            this_.setState({
                                _downedLayoutAndSystemSettings: true,
                                displayState: brOcDisplayStates.showScreen_ver2
                            }, () => {
                                downLayoutAndSystemSettingsSuccessFunction();
                            });

                            //this_.setState( { _downedLayoutAndSystemSettings:true, screenData_ver2: screenData_ver2, displayState:brOcDisplayStates.showScreen_ver2  }, ()=> {
                            // this_._CallHistory2.loadAsync().then( (v) => {
                            //         this_.setState({
                            //             _downedLayoutAndSystemSettings: true,
                            //             displayState: brOcDisplayStates.showScreen_ver2
                            //         }, () => {
                            //             downLayoutAndSystemSettingsSuccessFunction();
                            //         });
                            //     }
                            // );
                        },
                        function(e) {
                            this_._setOCNoteFailAtDownLayoutAndSystemSettings(e, downLayoutAndSystemSettingsFailFunction);
                        }
                    );
                },
                function( err ){
                    console.warn("Failed to getNote. error=" , err );
                    //this.setState({ error: true })
                    //this.setState( { error:true, _downedLayoutAndSystemSettings:true, displayState:bcOcDisplayStates.noScreens } );   //!need?
                    this_._removeLastLayoutShortname();  //!reset
                    this_.setState( {  displayState:brOcDisplayStates.noScreens } );
                    //throw err;
                }

            );

            //const this_ = this;
            // this.getNote( layoutFullname )
            //     .then(( noteInfo ) => {
            //         const sNote = noteInfo.note;
            //         const oNote = JSON.parse( sNote );
            //         this.setOCNote( layoutShortname, oNote, function(){
            //                 this_.setState( { _downedLayoutAndSystemSettings:true }, ()=> downLayoutAndSystemSettingsSuccessFunction() );
            //         },
            //             function(eventArg){
            //                 this_._setOCNoteFailAtDownLayoutAndSystemSettings( eventArg, downLayoutAndSystemSettingsFailFunction  );
            //             });
            //     })
            //     // .catch((err) => {
            //     //     console.warn("Failed to getNote." , err );
            //     //     //this.setState({ error: true })
            //     //     //this.setState( { error:true, _downedLayoutAndSystemSettings:true, displayState:bcOcDisplayStates.noScreens } );   //!need?
            //     //     this._removeLastLayoutShortname();  //!reset
            //     //     this.setState( {  displayState:brOcDisplayStates.noScreens } );
            //     //     //throw err;
            //     // });
        }
        else{
            this.setState( {  displayState:brOcDisplayStates.noScreens } );
//            this.setState( { _downedLayoutAndSystemSettings:true, displayState:brOcDisplayStates.noScreens } );
        }

    }


    getDefaultSystemSettingsData(){
        return this._defaultSystemSettingsData;
    }

    static getStaticInstance(){
        return BREKEKE_OPERATOR_CONSOLE;
    }

    setI18nLocaleByWebphonePhoneClient( locale ){
        i18n.locale = isValidLocale(locale) ? locale : DEFAULT_LOCALE;
    }

    onPalNotifyServerstatusByWebphonePhoneClient(e){
        this._Campon.onPalNotifyServerstatus( this, e );
    }

    getExtensionsStatus(){
        const o = this.state.extensionsStatus;
        return o;
    }

    getUccacWrapper(){
        return this._UccacWrapper;
    }

    getMonitoringExtension(){
        const o = this.state.monitoringExtension;
        return o;
    }

    getUsingLine(){
        const o = this.state.usingLine;
        return o;
    }

    getLinesStatus(){
        const o = this.state.linesStatus;
        return o;
    }

    getParksStatus(){
        const o = this.state.parksStatus;
        return o;
    }

    getMyParksStatus(){
        const o = this.state.myParksStatus;
        return o;
    }

    setParksStatusAndMyParksStatus( parksStatus, myParksStatus ){
        this.setState({ parksStatus, myParksStatus });
    }

    setExtensionsStatusAndMonitoringExtension( extensionsStatus, monitoringExtension ){
        this.setState({ extensionsStatus, monitoringExtension });
    }

    setLinesStatusAndUsingLine( linesStatus, usingLine ){
        this.setState({ linesStatus, usingLine });
    }

    onLoggedinByLogin(  loggedinPal, pbxHost, pbxPort, tenant, user, password, isAdmin, language  ){
        window.addEventListener("beforeunload",  this._OnBeforeUnloadFunc );
        this._loggedinPal = loggedinPal;
        i18n.locale = isValidLocale(language) ? language : DEFAULT_LOCALE;
        const this_ = this;
        const loginUser = {
            pbxHost : pbxHost,
            pbxPort : pbxPort,
            pbxUsername : user,
            pbxTenant : tenant,
            pbxPassword : password,
            language : language,
            isAdmin : isAdmin,
        };
        this.setState({
            loginUser: loginUser,
            isInitialized: true,
            systemSettingsData: new SystemSettingsData(this)
        }, () => {
//            this.syncDownScreens();
//            this._syncDownLayout();

            const filesFileUrl = "components/button/icons/default/filenames.txt";
            const loadDefaultButtonImageFileInfosOptions = {
                filesFileUrl: filesFileUrl,
                timeoutMillisecond:60000,
                loadSuccessFunction : (options) =>{
                    this._startDownLayoutAndSystemSettingsForLoggedin();
                },
                loadFailFunction : (options) =>{
                    const xhrFail = options["xhrFail"];
                    //const filesfile = options["filesFile"];
                    const httpStatus = xhrFail.status;
                    if( httpStatus !== 404 ){
                        //defined
                        console.error("Failed to load file list. requestOptions=" , loadDefaultButtonImageFileInfosOptions, ",responseOptions=", options  );
                        Notification.error({message: i18n.t("FailedToLoadFileList") + "\r\n" +  fileRootUrl, duration:0 });
                    }
                    this._startDownLayoutAndSystemSettingsForLoggedin();
                },
                loadErrorFunction : ( options ) =>{
                    console.error("An error occurred while loading the file list. requestOptions=" , loadDefaultButtonImageFileInfosOptions, ",responseOptions=", options  );
                    Notification.error({message: i18n.t("AnErrorOccurredWhileLoadingTheFileList") + "\r\n" +  fileRootUrl, duration:0 });
                    this._startDownLayoutAndSystemSettingsForLoggedin();
                },
                loadTimeoutFunction: (options) =>{
                    console.error("Loading the file list timed out. requestOptions=" , loadDefaultButtonImageFileInfosOptions, ",responseOptions=", options  );
                    Notification.error({message: i18n.t("LoadingTheFileListTimedOut") + "\r\n" +  fileRootUrl, duration:0 });
                    this._startDownLayoutAndSystemSettingsForLoggedin();
                }
            };
            this._DefaultButtonImageFileInfos.load( loadDefaultButtonImageFileInfosOptions  );
        });

    }

    _startDownLayoutAndSystemSettingsForLoggedin(){
        this._downLayoutAndSystemSettingsForLoggedin(
            function(){

            },
            function(){

            }
        );
    }


//     onEndInitByWebphonePhoneClient( account ){
//         const this_ = this;
//         this.setState({
//             loginUser: account,
//             isInitialized: true,
//             systemSettingsData: new SystemSettingsData(this)
//         }, () => {
// //            this.syncDownScreens();
// //            this._syncDownLayout();
//             this._downLayoutAndSystemSettingsForLoggedin(
//                 function(){
//
//                 },
//                 function(){
//
//                 }
//             );
//         });
//
//     }

    // /**
    //  *
    //  * @param oExtensions ex.[{id:111,name:"111name"},{id:222,name:"222name"}]
    //  */
    // onInitByAphone( oExtensions ){
    //     console.log('extensions', oExtensions);
    //     this.setState({ extensions: oExtensions });
    //
    // }

    // getAdminExtensionPropertiesFromPal(){
    //     const loginUser  = this.state.loginUser;
    //     const tenant = loginUser?.pbxTenant;
    //     const extension = loginUser?.pbxUsername;
    //
    //     const promise = this._aphone.getAdminExtensionPropertiesPromise( tenant, extension );
    //     return promise;
    // }

    getIsAdmin(){
        return this.getLoggedinUserIsAdmin();
    }

    getLoggedinUserIsAdmin(){
        const loginUser = this.state.loginUser;
        if( !loginUser ){
            console.warn("loginUser is undefined.");
            return false;
        }
        const isAdmin = loginUser.isAdmin;
        return isAdmin;
    }

    setIsAdminByWebphonePhoneClient(bool){
        this.setState({isAdmin:bool});
    }

    // getOCNoteNamesPromise(){
    //     const loginUser = this.state.loginUser;
    //     const tenant = loginUser?.pbxTenant;
    //     const filter = BrekekeOperatorConsole.LAYOUT_NOTE_NAME_FILTER;
    //
    //     const promise = this._aphone.getNoteNamesPromise( tenant, filter );
    //     return promise;
    // }

    getLoginPalWrapper(){
        return this._LoginPalWrapper;
    }

    getLoginUser(){
        return this.state.loginUser;
    }

    getExtensions(){
        return this.state.extensions; //!check use cache
    }

    getPalRestApi(){
        return this._PalRestApi;
    }

    logout = () => {
        this._Campon.onBeginLogout(this);

        window.removeEventListener("beforeunload", this._OnBeforeUnloadFunc  );
        if( this._OnUnloadFunc ) {
            window.removeEventListener("unload", this._OnUnloadFunc);
        }

        this._deinitAphoneClient();


        //this._Campon.onBeginLogout(this); //!old location
        //this._BusylightStatusChanger.deinit();  //!dev
        this._onUnloadExtensionScript();
        this._UccacWrapper.deinitUccacWrapper();
        this._deinitPalWrapper();
        this._PalRestApi.deinitPalRestApi();

        this.setState({
            ...window.structuredClone(INIT_STATE),
            i18nReady: true,
            locale: this.state.locale
        });
    }

    // _setDefaultTabDatasToStateScreens(){
    //     const screens = this.state.screens;
    //     for( let i = 0; i < screens.length; i++ ){
    //         const screen = screens[i];
    //         let  tabDatas = screen.tabDatas;
    //         if( tabDatas ){
    //             continue;
    //         }
    //         tabDatas = new Array(1);
    //         const tabData = {
    //             //tabTitle : i18n.t("defaultTabTitle"), //Can not do this
    //             tabTitle : "Untitled tab",
    //             widgetDatas : new Array()
    //         };
    //         tabDatas[0] = tabData;
    //         screen.tabDatas = tabDatas;
    //     }
    //     this.setState({screens:screens});
    // }

    //!testit
    syncUp = async () => {
        const oScreen_ver2 = this.state.screenData_ver2.getDataAsObject();

        const dataId = PBX_APP_DATA_NAME;
        //!old Do not use.
        const data = {
            version : PBX_APP_DATA_VERSION,
            screens : this.state.screens,
            screen_ver2 : oScreen_ver2
        };

        const setAppDataOptions = {
            methodName : "setAppData",
            methodParams : JSON.stringify({
                data_id : dataId,
                data : data
            }),
            onSuccessFunction : ( res ) =>{
                Notification.success({ key: 'sync', message: i18n.t("saved_data_to_pbx_successfully") });
            },
            onFailFunction : ( errorOrResponse ) =>{
                console.error(errorOrResponse);
                Notification.error({
                    key: 'sync',
                    message: i18n.t("failed_to_save_data_to_pbx"),
                    btn: (
                        <Button type="primary" size="small" onClick={() => {
                            this.syncUp();
                            Notification.destroy('sync');
                        }}>
                            {i18n.t('retry')}
                        </Button>
                    ),
                    duration: 0,
                });

            }

        }
        this.getPalRestApi().callPalRestApiMethod( setAppDataOptions );

    }

    //!old
    // _syncDownLayout = () => {
    //     if( !this.pal || this.state.syncDownedLayout ){
    //         return;
    //     }
    //
    //     const layoutFullname = this._getLastLayoutFullname();
    //   if( layoutFullname ) {
    //       this.getNote( layoutFullname )
    //           .then((result) => {
    //               const temp = 0;
    //           })
    //           .catch((err) => {
    //              console.error("Failed to getNote.", err );
    //               this.setState({ error: true })
    //               throw err;
    //           });
    //   }
    // }

    //!old
    // syncDownScreens = async () => {
    //   if (!this.pal || this.state.syncDownedScreens ) return;
    //
    //   const [err, data] = await this.pal.call_pal('getAppData', { data_id: PBX_APP_DATA_NAME })
    //       .then((data) => {
    //         if (!data) {
    //           return [null, null];
    //         }
    //         let json = { error: 'failed to parse app data' };
    //         try {
    //           json = JSON.parse(data);
    //         } catch(err) {
    //           console.warn('failed to parse app data', err);
    //         }
    //         return [null, json];
    //       })
    //       .catch((err) => {
    //         return [err, null];
    //       });
    //
    //   // if data not found
    //   if (err?.code === -2000 || !data) {
    //     this.setState({ screens: DEFAULT_SCREENS, syncDownedScreens: true }, () => {
    //       this.syncUp();
    //       this._syncDownSystemSettings();
    //     });
    //   }
    //   else if (err || data?.error) {
    //     Notification.error({
    //       key: 'sync',
    //       message: i18n.t("failed_to_load_data_from_pbx"),
    //       btn: (<>
    //         <Button type="secondary" size="small" onClick={() => {
    //           //Notification.close('sync');
    //           this.setState({ screens: DEFAULT_SCREENS, syncDownedScreens: true });
    //           this._syncDownSystemSettings();
    //         }}>
    //           {i18n.t('use_the_default')}
    //         </Button>
    //         <Button style={{marginLeft: 12}} type="primary" size="small" onClick={() => {
    //           //Notification.close('sync');
    //           this.syncDownScreens().then( () => {
    //             this.setState({screens: data.screens, syncDownedScreens: true});
    //             this._syncDownSystemSettings();
    //           });
    //         }}>
    //           {i18n.t('retry')}
    //         </Button>
    //       </>),
    //       duration: 0,
    //     });
    //   }
    //   else if (data.version !== PBX_APP_DATA_VERSION) {
    //     // TODO: handle sync data versioning
    //     this.setState({ screens: DEFAULT_SCREENS, syncDownedScreens: true }, () => {
    //       this.syncUp();
    //       this._syncDownSystemSettings();
    //     });
    //   }
    //   else{
    //     this.setState({screens: data.screens, syncDownedScreens: true});
    //     this._syncDownSystemSettings();
    //   }
    //
    //
    // }

    setSystemSettingsView( view ){
        this._systemSettingsView = view;
    }

    // //!old
    // _syncDownSystemSettings = async () => {
    //   const pal = this.pal;
    //   if (!pal || this.state.syncDownedSystemSettings ) return;
    //
    //   const [err, data] = await pal.call_pal('getAppData', { data_id: OPERATOR_CONSOLE_SYSTEM_SETTINGS_DATA_ID })
    //       .then((data) => {
    //         if (!data) {
    //           return [null, null];
    //         }
    //         let json = { error: 'failed to parse app data' };
    //         try {
    //           json = JSON.parse(data);
    //         } catch(err) {
    //           console.warn('failed to parse app data', err);
    //         }
    //         return [null, json];
    //       })
    //       .catch((err) => {
    //         return [err, null];
    //       });
    //
    //   // if data not found
    //   if (err?.code === -2000 || !data) {
    //     this.setState({ syncDownedSystemSettings: true } );
    //   }
    //   else if (err || data?.error) {
    //     Notification.error({
    //       key: 'sync',
    //       message: i18n.t("failed_to_load_data_from_pbx"),
    //       btn: (<>
    //         <Button type="secondary" size="small" onClick={() => {
    //           //Notification.close('sync');
    //           this.setState({ syncDownedSystemSettings: true });
    //         }}>
    //           {i18n.t('use_the_default')}
    //         </Button>
    //         <Button style={{marginLeft: 12}} type="primary" size="small" onClick={() => {
    //           //Notification.close('sync');
    //           this._syncDown();
    //         }}>
    //           {i18n.t('retry')}
    //         </Button>
    //       </>),
    //       duration: 0,
    //     });
    //     return;
    //   }
    //   else {
    //
    //     if (data.version !== OPERATOR_CONSOLE_SYSTEM_SETTINGS_DATA_VERSION) {
    //       // TODO: handle sync data versioning
    //       this.setState({syncDownedSystemSettings: true});
    //       return;
    //     }
    //     this.getSystemSettingsData().setData( data.appData );
    //
    //     this.setState({ syncDownedSystemSettings: true});
    //   }
    //
    //   this._CallHistory.load();
    //   this.setState( { syncLoadedCallHistory : true });
    //
    //
    // }

    // getNoteNames = () => {
    //     const tenant = this.state.loginUser?.pbxTenant;
    //     return this._aphone.getNoteNamesPromise( tenant );
    // }

    // getNote = (name) => {
    //     const tenant = this.state.loginUser?.pbxTenant;
    //     return this._aphone.getNote( tenant, name );
    // }

    // getNoteByLoggedinPal( name, onSuccessFunction, onErrorFunction ){
    //     const tenant = this.state.loginUser.pbxTenant;
    //     this._loggedinPal.getNote({tenant:tenant,name:name}, onSuccessFunction, onErrorFunction );
    // }



    // setNote = async(name, content) => {
    //     const tenant = this.state.loginUser?.pbxTenant;
    //     return this._aphone.setNoteByPhoneClient( tenant, name, content );
    // }

    // getOCNote = ( shortName ) => {
    //     const noteName = BrekekeOperatorConsole.getOCNoteName( shortName );
    //     const note = this.getNote( noteName );
    //     return note;
    // }

    // setOCNoteByPal = async (shortName, content ) =>{
    //     const noteName = BrekekeOperatorConsole.getOCNoteName( shortName );
    //     const noteResultPromise = this.setNote(noteName, content);
    //     return noteResultPromise;
    // }

    setNoteByLoggedinPal( noteName, content, successFunction, errorFunction  ){
        const tenant = this.state.loginUser.pbxTenant;
        const description = "";
        const useraccess = BrekekeOperatorConsole.PAL_NOTE_USERACCESSES.ReadWrite
        const options = {
            tenant : tenant,
            name : noteName,
            description : description,
            useraccess : useraccess,
            note : content
        }
        this._loggedinPal.setNote( options, successFunction, errorFunction );
    }

    getNoteNamesByLoggedinPal( successFunction, errorFunction ){
        const tenant = this.state.loginUser.pbxTenant;
        this._loggedinPal.getNoteNames({tenant:tenant}, successFunction, errorFunction );
    }

    static LAYOUT_NOTE_NAME_PREFIX = "OperatorConsole-";
    static LAYOUT_NOTE_NAME_FILTER = BrekekeOperatorConsole.LAYOUT_NOTE_NAME_PREFIX + "*";

    static getOCNoteName(shortName ){
        const noteName = BrekekeOperatorConsole.LAYOUT_NOTE_NAME_PREFIX + shortName;
        return noteName;
    }

    static getOCNoteShortname( name ){
        const shortname = name.substring( BrekekeOperatorConsole.LAYOUT_NOTE_NAME_PREFIX .length );
        return shortname;
    }

    _convertAppData_version_0_1To2_0_0( oOldContent ){
        const oContent = {};
        oContent.version = PBX_APP_DATA_VERSION;
        const oldScreens = oOldContent.screens;
        oContent.screens = oldScreens; //!bad. Not used but still available  //!forBug. Need deep copy?
        oContent.systemSettings = oOldContent.systemSettings;  //!forBug. Need deep copy?

        const oldScreen = oldScreens[0];

        const screenDataVer2 = new ScreenData();

        const background = oldScreen.background;
        if( background ){
            screenDataVer2.setScreenBackgroundColor( background );
        }
        const foreground = oldScreen.foreground;
        if( foreground ){
            screenDataVer2.setScreenForegroundColor( foreground );
        }
        const grid = oldScreen.grid;
        if( grid ){
            screenDataVer2.setEditingScreenGrid(grid);
        }

        const screenPaneDatas = screenDataVer2.getScreenPaneDatas();
        const screenPaneData = screenPaneDatas.addPaneData(PaneData.PANE_TYPES.rootPane,null);
        const widgetDatas =  screenPaneData.getWidgetDatasForNoTabs();

        const oldWidgets = oldScreen.widgets;
        if( oldWidgets && Array.isArray( oldWidgets ) ){
            for( let i = 0; i < oldWidgets.length; i++ ){
                const oldWidget = oldWidgets[i];

                const widgetTypeId = WidgetData.getWidgetTypeIdByWidgetTypeName( oldWidget.type );
                if( widgetTypeId === -1 ){
                    console.warn("Unable to convert due to unknown widget type.. type=" + oldWidget.type );
                }

                const editingScreenGrid = screenDataVer2.getEditingScreenGrid();
                //const widgetRelativePositionX = oldWidget.x - oldWidget.x  % editingScreenGrid + ( WIDGET_LEFT_SPACE_FOR_IMPORT_FROM_VER_0_1 - WIDGET_LEFT_SPACE_FOR_IMPORT_FROM_VER_0_1 % editingScreenGrid );
                //const widgetRelativePositionY = oldWidget.y - oldWidget.y  % editingScreenGrid + ( WIDGET_TOP_SPACE_FOR_IMPORT_FROM_VER_0_1 - WIDGET_TOP_SPACE_FOR_IMPORT_FROM_VER_0_1 % editingScreenGrid );
                //const widgetRelativePositionX = oldWidget.x - oldWidget.x  % editingScreenGrid;
                //const widgetRelativePositionY = oldWidget.y - oldWidget.y  % editingScreenGrid;
                const widgetRelativePositionX = oldWidget.x;
                const widgetRelativePositionY = oldWidget.y;
                const widgetData = widgetDatas.addWidgetData( widgetTypeId, widgetRelativePositionX, widgetRelativePositionY, oldWidget.width, oldWidget.height  );
                if( widgetData ){
                    widgetData.importFromWidget_ver0_1( oldWidget );
                }
            }
        }

        const oScreen_ver2 = screenDataVer2.getDataAsObject();
        oContent.screen_ver2 = oScreen_ver2;
        return oContent;
    }

    _onSetSystemSettingsDataDataSuccessAtSetOCNote( oScreen_ver2, screens, systemSettingsData, setLastLayoutShortName, shortName, setOCNoteSuccessFunction, setOCNoteFailFunction){
        let screenData_ver2;
        if( !oScreen_ver2 ){
            screenData_ver2 = new ScreenData();
        }
        else{
            screenData_ver2 = ScreenData.createScreenDataFromObject( oScreen_ver2 );
        }
        this.setState( {screens:screens, screenData_ver2:screenData_ver2, systemSettingsData:systemSettingsData }, () =>{
            //this._BusylightStatusChanger.onBeforeReloadBusylightStatusChanger( );  //!dev
            this._CallHistory2. loadCallHistory2(
                () =>{
                    this._toSetNoteSuccess(setLastLayoutShortName, shortName, setOCNoteSuccessFunction);
                },
                (errorOrResponse) =>{
                    if( setOCNoteFailFunction ) {
                        setOCNoteFailFunction(errorOrResponse);
                    }
                }
            );

        } );
    }

    _toSetNoteSuccess( setLastLayoutShortName, shortName, setOCNoteSuccessFunction ){
        this.reloadSystemSettingsExtensionScript();
        //this._BusylightStatusChanger.init();    //!dev
        if (setLastLayoutShortName) {
            this.setLastLayoutShortname(shortName);
        }
        setOCNoteSuccessFunction();
    }

    /**
     *
     * @param shortName
     * @param oContent
     * @param setOCNoteSuccessFunction
     * @param setOCNoteFailFunction
     * @param setLastLayoutShortName
     * @param skipSetSystemSettingsDataData
     * @returns {*|boolean} is async or sync
     */
    setOCNote( shortName,  oContent, setOCNoteSuccessFunction, setOCNoteFailFunction, setLastLayoutShortName=true, skipSetSystemSettingsDataData = false  ){
        const version = oContent.version;
        if( version !== PBX_APP_DATA_VERSION ){
            if( version === "0.1" ){
                oContent = this._convertAppData_version_0_1To2_0_0(oContent);
                //!dev
                if( !oContent ){
                    setOCNoteFailFunction({message: i18n.t("DataVersionMismatch")});
                    return false;
                }

            }
            else {
                //return i18n.t("DataVersionMismatch");
                setOCNoteFailFunction({message: i18n.t("DataVersionMismatch")});
                return false;
            }
        }

        const screens = oContent.screens;
        //set default tabDatas
        for( let i = 0; i < screens.length; i++ ) {
            const screen = screens[i];
            if (!screen.tabDatas) {
                screen.tabDatas = [
                    {
                        tabTitle: i18n.t("defaultTabTitle"),
                        widgetDatas: new Array(),
                    }
                ]
            }
        }


        const systemSettingsDataData = oContent.systemSettings;
        const systemSettingsData = this.state.systemSettingsData;
        const oScreen_ver2 = oContent.screen_ver2;

        if( skipSetSystemSettingsDataData === false ) {
            const this_ = this;
            const bStartInit = systemSettingsData.setSystemSettingsDataData(systemSettingsDataData,
                function(){
                    this_._onSetSystemSettingsDataDataSuccessAtSetOCNote( oScreen_ver2, screens, systemSettingsData, setLastLayoutShortName, shortName, setOCNoteSuccessFunction, setOCNoteFailFunction  );
                },
                function(e){
                    setOCNoteFailFunction(e);
                });
            return bStartInit;
        }
        else{
            this._onSetSystemSettingsDataDataSuccessAtSetOCNote( oScreen_ver2, screens, systemSettingsData, setLastLayoutShortName, shortName, setOCNoteSuccessFunction, setOCNoteFailFunction );
            return false;
        }

    }

    getLoginPassword(){
        const password = this._getLastLoginAccount().password;
        return password;
    }

    getLoginUsername(){
        if( !this.state.loginUser ) {
            return null;
        }

        const loginUsername = this.state.loginUser["pbxUsername"];
        return loginUsername;
    }

    getLoginTenantname(){
        if( !this.state.loginUser ){
            return null;
        }
        const loginTenantname = this.state.loginUser["pbxTenant"];
        return loginTenantname;
    }

}
let BREKEKE_OPERATOR_CONSOLE;
BrekekeOperatorConsole.PAL_NOTE_USERACCESSES ={
    NoAccess : 0,
    ReadOnly : 1,
    ReadWrite : 2
}
BrekekeOperatorConsole.DTMF_CHARS = [
    '0','1','2','3','4','5','6','7','8','9','*','#'
]
BrekekeOperatorConsole.DIALING_MAX_LENGTH = 20; //!const
BrekekeOperatorConsole.TAB_TITLE_MAX_LENGTH = 30; //!const
BrekekeOperatorConsole.WAIT_HOLD_TIMELIMIT_MILLIS_AT_ONETOUCHDIAL = 20 * 1000;

export function OperatorConsole( el, props ) {
    const root = ReactDOM.createRoot( el );
    root.render(<BrekekeOperatorConsole {...props} />);
}

// export function OperatorConsole(el, props) {
//     return new Promise((callback) => {
//         const ref = React.createRef();
//         ReactDOM.render(<BrekekeOperatorConsole {...props} ref={ref}/>, el, () => {
//             if (ref && ref.current) {
//                 callback(ref.current);
//             }
//         });
//     })
// }


