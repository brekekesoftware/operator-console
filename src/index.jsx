import React, {useEffect, useRef} from 'react'
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
const PBX_APP_DATA_VERSION = '0.1';
import { CallHistory } from './CallHistory';
import AutoDialView from "./AutoDialView";
import DropDownMenu from "./DropDownMenu";
import QuickBusy from "./QuickBusy";
import LineTableSettings from "./LineTableSettings"
import LineTable from "./LineTable"
import Notification from "antd/lib/notification";
import ExtensionsStatus from "./ExtensionsStatus";
import Campon from "./Campon";
import SystemSettingsData from "./SystemSettingsData";
import NoScreensView from "./NoScreensView";
import {Modal} from "antd";
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

export const brOcDisplayStates = Object.freeze({
    //loading: 0,
    showScreen: 1,
    editingScreen: 2,
    waitQuickCallKey: 3,
    systemSettingsView: 4,
    noScreens:5,
});

function LegacyCallPanel({ borderRadius, callpanelBgColor, callpanelFgColor,
                            outsideShadow_horizontalOffset, outsideShadow_verticalOffset, outsideShadow_blur,  outsideShadow_spread, outsideShadow_color,
                            insideShadow_horizontalOffset,insideShadow_verticalOffset, insideShadow_blur,  insideShadow_spread, insideShadow_color,
                            context = {} }) {
    const { currentCallIndex, callIds = [], callById = {}, dialing  } = context;
    const currentCall = callById[callIds[currentCallIndex]];
    return (
        <CallPanel
            call={currentCall}
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
function LegacyCallTalkingButton({ subtype, icon, label, buttonFgColor, buttonBgColor, buttonOuterBorderColor, buttonOuterBorderRadius, buttonOuterBorderThickness, context = {}}) {
    const { currentCallIndex, callIds = [], callById = {} } = context;
    const currentCall = callById[callIds[currentCallIndex]];

    const color = Util.isAntdRgbaProperty( buttonFgColor  ) ? Util.getRgbaCSSStringFromAntdColor( buttonFgColor ) : "";
    const backgroundColor = Util.isAntdRgbaProperty( buttonBgColor ) ? Util.getRgbaCSSStringFromAntdColor( buttonBgColor ) : "";
    const border = Util.isNumeric( buttonOuterBorderThickness ) && Util.isAntdRgbaProperty( buttonOuterBorderColor) ?
        "solid " + buttonOuterBorderThickness + "px " + Util.getRgbaCSSStringFromAntdColor( buttonOuterBorderColor )  : "";
    const borderRadius = Util.isNumber( buttonOuterBorderRadius ) ? buttonOuterBorderRadius + "px" : "";
    return (
        <button title={i18n.t(`legacy_button_description.${subtype}`)}  className=
            {
                clsx(
                    "kbc-button kbc-button-fill-parent",
                    currentCall?.answered && !currentCall?.holding && 'kbc-button-danger'
                )
            }
                style={{
                    border:border,
                    borderRadius:borderRadius,
                    color:color,
                    backgroundColor:backgroundColor
                }}
        >{icon ? <FontAwesomeIcon size="lg" icon={icon}/> : label}</button>
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
function LegacyNoAnswerButton({ subtype, icon, label, buttonFgColor, buttonBgColor, buttonOuterBorderColor, buttonOuterBorderRadius, buttonOuterBorderThickness, context = {}}) {
    const color = Util.isAntdRgbaProperty( buttonFgColor  ) ? Util.getRgbaCSSStringFromAntdColor( buttonFgColor ) : "";
    const backgroundColor = Util.isAntdRgbaProperty( buttonBgColor ) ? Util.getRgbaCSSStringFromAntdColor( buttonBgColor ) : "";
    const border = Util.isNumeric( buttonOuterBorderThickness ) && Util.isAntdRgbaProperty( buttonOuterBorderColor) ?
        "solid " + buttonOuterBorderThickness + "px " + Util.getRgbaCSSStringFromAntdColor( buttonOuterBorderColor )  : "";
    const borderRadius = Util.isNumber( buttonOuterBorderRadius ) ? buttonOuterBorderRadius + "px" : "";
    return (
        <button title={i18n.t(`legacy_button_description.${subtype}`)}  className={clsx("kbc-button kbc-button-fill-parent", context.autoRejectIncoming && 'kbc-button-danger')}
                style={{
                    border:border,
                    borderRadius:borderRadius,
                    color:color,
                    backgroundColor:backgroundColor
                }}
                onClick={context.toggleAutoRejectIncoming}>{icon ? <FontAwesomeIcon size="lg" icon={icon}/> : label}</button>
    );
}
function LegacyCallbackButton({ subtype, icon, label, buttonFgColor, buttonBgColor, buttonOuterBorderColor, buttonOuterBorderRadius, buttonOuterBorderThickness }) {
    const color = Util.isAntdRgbaProperty( buttonFgColor  ) ? Util.getRgbaCSSStringFromAntdColor( buttonFgColor ) : "";
    const backgroundColor = Util.isAntdRgbaProperty( buttonBgColor ) ? Util.getRgbaCSSStringFromAntdColor( buttonBgColor ) : "";
    const border = Util.isNumeric( buttonOuterBorderThickness ) && Util.isAntdRgbaProperty( buttonOuterBorderColor) ?
        "solid " + buttonOuterBorderThickness + "px " + Util.getRgbaCSSStringFromAntdColor( buttonOuterBorderColor )  : "";
    const borderRadius = Util.isNumber( buttonOuterBorderRadius ) ? buttonOuterBorderRadius + "px" : "";
    return (
        <button title={i18n.t(`legacy_button_description.${subtype}`)}  className="kbc-button kbc-button-fill-parent"
                style={{
                    border:border,
                    borderRadius:borderRadius,
                    color:color,
                    backgroundColor:backgroundColor
                }}
        >{icon ? <FontAwesomeIcon size="lg" icon={icon}/> : label}</button>
    );
}
function LegacyTransferButton({ subtype, icon, label, buttonFgColor, buttonBgColor, buttonOuterBorderColor, buttonOuterBorderRadius, buttonOuterBorderThickness, context ={} }) {
    const color = Util.isAntdRgbaProperty( buttonFgColor  ) ? Util.getRgbaCSSStringFromAntdColor( buttonFgColor ) : "";
    const backgroundColor = Util.isAntdRgbaProperty( buttonBgColor ) ? Util.getRgbaCSSStringFromAntdColor( buttonBgColor ) : "";
    const border = Util.isNumeric( buttonOuterBorderThickness ) && Util.isAntdRgbaProperty( buttonOuterBorderColor) ?
        "solid " + buttonOuterBorderThickness + "px " + Util.getRgbaCSSStringFromAntdColor( buttonOuterBorderColor )  : "";
    const borderRadius = Util.isNumber( buttonOuterBorderRadius ) ? buttonOuterBorderRadius + "px" : "";
    return (
        <button title={i18n.t(`legacy_button_description.${subtype}`)} onClick={ () => context.operatorConsole._transferDialingCall() } className="kbc-button kbc-button-fill-parent"
                style={{
                    border:border,
                    borderRadius:borderRadius,
                    color:color,
                    backgroundColor:backgroundColor
                }}
        >{icon ? <FontAwesomeIcon size="lg" icon={icon}/> : label}</button>
    );
}

function LegacyToggleRecordingButton({ subtype, icon, label, buttonFgColor, buttonBgColor, buttonOuterBorderColor, buttonOuterBorderRadius, buttonOuterBorderThickness, context = {}}) {
    const { currentCallIndex, callIds = [], callById = {} } = context;
    const currentCall = callById[callIds[currentCallIndex]];

    const color = Util.isAntdRgbaProperty( buttonFgColor  ) ? Util.getRgbaCSSStringFromAntdColor( buttonFgColor ) : "";
    const backgroundColor = Util.isAntdRgbaProperty( buttonBgColor ) ? Util.getRgbaCSSStringFromAntdColor( buttonBgColor ) : "";
    const border = Util.isNumeric( buttonOuterBorderThickness ) && Util.isAntdRgbaProperty( buttonOuterBorderColor) ?
        "solid " + buttonOuterBorderThickness + "px " + Util.getRgbaCSSStringFromAntdColor( buttonOuterBorderColor )  : "";
    const borderRadius = Util.isNumber( buttonOuterBorderRadius ) ? buttonOuterBorderRadius + "px" : "";
    return (
        <button title={i18n.t(`legacy_button_description.${subtype}`)}  className={clsx("kbc-button kbc-button-fill-parent", currentCall?.recording && 'kbc-button-danger')}
                style={{
                    border:border,
                    borderRadius:borderRadius,
                    color:color,
                    backgroundColor:backgroundColor
                }}
                onClick={context.toggleCallRecording}>{icon ? <FontAwesomeIcon size="lg" icon={icon}/> : label}</button>
    );
}
function LegacyAlarmButton({ subtype, icon, label, buttonFgColor, buttonBgColor, buttonOuterBorderColor, buttonOuterBorderRadius, buttonOuterBorderThickness }) {
    const color = Util.isAntdRgbaProperty( buttonFgColor  ) ? Util.getRgbaCSSStringFromAntdColor( buttonFgColor ) : "";
    const backgroundColor = Util.isAntdRgbaProperty( buttonBgColor ) ? Util.getRgbaCSSStringFromAntdColor( buttonBgColor ) : "";
    const border = Util.isNumeric( buttonOuterBorderThickness ) && Util.isAntdRgbaProperty( buttonOuterBorderColor) ?
        "solid " + buttonOuterBorderThickness + "px " + Util.getRgbaCSSStringFromAntdColor( buttonOuterBorderColor )  : "";
    const borderRadius = Util.isNumber( buttonOuterBorderRadius ) ? buttonOuterBorderRadius + "px" : "";
    return (
        <button title={i18n.t(`legacy_button_description.${subtype}`)}  className="kbc-button kbc-button-fill-parent"
                style={{
                    border:border,
                    borderRadius:borderRadius,
                    color:color,
                    backgroundColor:backgroundColor
                }}
        >{icon ? <FontAwesomeIcon size="lg" icon={icon}/> : label}</button>
    );
}
function LegacyPrevCallButton({ subtype, icon, label, buttonFgColor, buttonBgColor, buttonOuterBorderColor, buttonOuterBorderRadius, buttonOuterBorderThickness, context = {}}) {
    const { currentCallIndex, callIds = [] } = context;
    const color = Util.isAntdRgbaProperty( buttonFgColor  ) ? Util.getRgbaCSSStringFromAntdColor( buttonFgColor ) : "";
    const backgroundColor = Util.isAntdRgbaProperty( buttonBgColor ) ? Util.getRgbaCSSStringFromAntdColor( buttonBgColor ) : "";
    const border = Util.isNumeric( buttonOuterBorderThickness ) && Util.isAntdRgbaProperty( buttonOuterBorderColor) ?
        "solid " + buttonOuterBorderThickness + "px " + Util.getRgbaCSSStringFromAntdColor( buttonOuterBorderColor )  : "";
    const borderRadius = Util.isNumber( buttonOuterBorderRadius ) ? buttonOuterBorderRadius + "px" : "";
    return (
        <button title={i18n.t(`legacy_button_description.${subtype}`)}  className={clsx("kbc-button kbc-button-fill-parent", currentCallIndex > 0 && "kbc-button-danger-flash")}
                style={{
                    border:border,
                    borderRadius:borderRadius,
                    color:color,
                    backgroundColor:backgroundColor
                }}
                onClick={(!callIds.length || currentCallIndex === 0) ? undefined : context.switchCallUp}
        >
            {icon ? <FontAwesomeIcon size="lg" icon={icon}/> : label}
        </button>
    );
}
function LegacyMonitorDialingExtensionButton({ subtype, icon, label, buttonFgColor, buttonBgColor, buttonOuterBorderColor, buttonOuterBorderRadius, buttonOuterBorderThickness, context = {} }) {
    const color = Util.isAntdRgbaProperty( buttonFgColor  ) ? Util.getRgbaCSSStringFromAntdColor( buttonFgColor ) : "";
    const backgroundColor = Util.isAntdRgbaProperty( buttonBgColor ) ? Util.getRgbaCSSStringFromAntdColor( buttonBgColor ) : "";
    const border = Util.isNumeric( buttonOuterBorderThickness ) && Util.isAntdRgbaProperty( buttonOuterBorderColor) ?
        "solid " + buttonOuterBorderThickness + "px " + Util.getRgbaCSSStringFromAntdColor( buttonOuterBorderColor )  : "";
    const borderRadius = Util.isNumber( buttonOuterBorderRadius ) ? buttonOuterBorderRadius + "px" : "";
    return (
        <button title={i18n.t(`legacy_button_description.${subtype}`)} className="kbc-button kbc-button-fill-parent"
                style={{
                    border:border,
                    borderRadius:borderRadius,
                    color:color,
                    backgroundColor:backgroundColor
                }}
                onClick={context.monitorDialingExtension}>{icon ? <FontAwesomeIcon size="lg" icon={icon}/> : label}</button>
    );
}
function LegacyStationLineDesignationButton({ subtype, icon, label, buttonFgColor, buttonBgColor, buttonOuterBorderColor, buttonOuterBorderRadius, buttonOuterBorderThickness }) {
    const color = Util.isAntdRgbaProperty( buttonFgColor  ) ? Util.getRgbaCSSStringFromAntdColor( buttonFgColor ) : "";
    const backgroundColor = Util.isAntdRgbaProperty( buttonBgColor ) ? Util.getRgbaCSSStringFromAntdColor( buttonBgColor ) : "";
    const border = Util.isNumeric( buttonOuterBorderThickness ) && Util.isAntdRgbaProperty( buttonOuterBorderColor) ?
        "solid " + buttonOuterBorderThickness + "px " + Util.getRgbaCSSStringFromAntdColor( buttonOuterBorderColor )  : "";
    const borderRadius = Util.isNumber( buttonOuterBorderRadius ) ? buttonOuterBorderRadius + "px" : "";
    return (
        <button title={i18n.t(`legacy_button_description.${subtype}`)}  className="kbc-button kbc-button-fill-parent"
                style={{
                    border:border,
                    borderRadius:borderRadius,
                    color:color,
                    backgroundColor:backgroundColor
                }}
        >{icon ? <FontAwesomeIcon size="lg" icon={icon}/> : label}</button>
    );
}
function LegacyParkCallButton({ subtype, icon, label, number, buttonFgColor, buttonBgColor, buttonOuterBorderColor, buttonOuterBorderRadius, buttonOuterBorderThickness, context = {} }) {
    const { myParksStatus = {}, parksStatus = {} } = context;
    const light = myParksStatus[number] ? 'kbc-button-success-flash-slow' : parksStatus[number] ? 'kbc-button-danger-flash-slow' : '';
    const color = Util.isAntdRgbaProperty( buttonFgColor  ) ? Util.getRgbaCSSStringFromAntdColor( buttonFgColor ) : "";
    const backgroundColor = Util.isAntdRgbaProperty( buttonBgColor ) ? Util.getRgbaCSSStringFromAntdColor( buttonBgColor ) : "";
    const border = Util.isNumeric( buttonOuterBorderThickness ) && Util.isAntdRgbaProperty( buttonOuterBorderColor) ?
        "solid " + buttonOuterBorderThickness + "px " + Util.getRgbaCSSStringFromAntdColor( buttonOuterBorderColor )  : "";
    const borderRadius = Util.isNumber( buttonOuterBorderRadius ) ? buttonOuterBorderRadius + "px" : "";
    return (
        <button title={i18n.t(`legacy_button_description.${subtype}`)}  className={clsx("kbc-button kbc-button-fill-parent", light)}
                style={{
                    border:border,
                    borderRadius:borderRadius,
                    color:color,
                    backgroundColor:backgroundColor
                }}
                onClick={() => context?.handlePark(number)}>{icon ? <FontAwesomeIcon size="lg" icon={icon}/> : label}</button>
    );
}
function LegacySeriesSetButton({ subtype, icon, label, buttonFgColor, buttonBgColor, buttonOuterBorderColor, buttonOuterBorderRadius, buttonOuterBorderThickness }) {
    const color = Util.isAntdRgbaProperty( buttonFgColor  ) ? Util.getRgbaCSSStringFromAntdColor( buttonFgColor ) : "";
    const backgroundColor = Util.isAntdRgbaProperty( buttonBgColor ) ? Util.getRgbaCSSStringFromAntdColor( buttonBgColor ) : "";
    const border = Util.isNumeric( buttonOuterBorderThickness ) && Util.isAntdRgbaProperty( buttonOuterBorderColor) ?
        "solid " + buttonOuterBorderThickness + "px " + Util.getRgbaCSSStringFromAntdColor( buttonOuterBorderColor )  : "";
    const borderRadius = Util.isNumber( buttonOuterBorderRadius ) ? buttonOuterBorderRadius + "px" : "";
    return (
        <button title={i18n.t(`legacy_button_description.${subtype}`)}  className="kbc-button kbc-button-fill-parent"
                style={{
                    border:border,
                    borderRadius:borderRadius,
                    color:color,
                    backgroundColor:backgroundColor
                }}
        >{icon ? <FontAwesomeIcon size="lg" icon={icon}/> : label}</button>
    );
}
function LegacyMonitoringCallButton({ subtype, icon, label, buttonFgColor, buttonBgColor, buttonOuterBorderColor, buttonOuterBorderRadius, buttonOuterBorderThickness, context = {}}) {
    const color = Util.isAntdRgbaProperty( buttonFgColor  ) ? Util.getRgbaCSSStringFromAntdColor( buttonFgColor ) : "";
    const backgroundColor = Util.isAntdRgbaProperty( buttonBgColor ) ? Util.getRgbaCSSStringFromAntdColor( buttonBgColor ) : "";
    const border = Util.isNumeric( buttonOuterBorderThickness ) && Util.isAntdRgbaProperty( buttonOuterBorderColor) ?
        "solid " + buttonOuterBorderThickness + "px " + Util.getRgbaCSSStringFromAntdColor( buttonOuterBorderColor )  : "";
    const borderRadius = Util.isNumber( buttonOuterBorderRadius ) ? buttonOuterBorderRadius + "px" : "";
    return (
        <button title={i18n.t(`legacy_button_description.${subtype}`)}  className={clsx("kbc-button kbc-button-fill-parent", !!context.monitoringExtension && 'kbc-button-danger')}
                style={{
                    border:border,
                    borderRadius:borderRadius,
                    color:color,
                    backgroundColor:backgroundColor
                }}
        >{icon ? <FontAwesomeIcon size="lg" icon={icon}/> : label}</button>
    );
}
function LegacyStartButton({ subtype, icon, label, buttonFgColor, buttonBgColor, buttonOuterBorderColor, buttonOuterBorderRadius, buttonOuterBorderThickness }) {
    const color = Util.isAntdRgbaProperty( buttonFgColor  ) ? Util.getRgbaCSSStringFromAntdColor( buttonFgColor ) : "";
    const backgroundColor = Util.isAntdRgbaProperty( buttonBgColor ) ? Util.getRgbaCSSStringFromAntdColor( buttonBgColor ) : "";
    const border = Util.isNumeric( buttonOuterBorderThickness ) && Util.isAntdRgbaProperty( buttonOuterBorderColor) ?
        "solid " + buttonOuterBorderThickness + "px " + Util.getRgbaCSSStringFromAntdColor( buttonOuterBorderColor )  : "";
    const borderRadius = Util.isNumber( buttonOuterBorderRadius ) ? buttonOuterBorderRadius + "px" : "";
    return (
        <button title={i18n.t(`legacy_button_description.${subtype}`)}  className="kbc-button kbc-button-fill-parent"
                style={{
                    border:border,
                    borderRadius:borderRadius,
                    color:color,
                    backgroundColor:backgroundColor
                }}
        >{icon ? <FontAwesomeIcon size="lg" icon={icon}/> : label}</button>
    );
}
function LegacyToggleMutedButton({ subtype, icon, label, buttonFgColor, buttonBgColor, buttonOuterBorderColor, buttonOuterBorderRadius, buttonOuterBorderThickness, context = {}}) {
    const { currentCallIndex, callIds = [], callById = {} } = context;
    const currentCall = callById[callIds[currentCallIndex]];
    const color = Util.isAntdRgbaProperty( buttonFgColor  ) ? Util.getRgbaCSSStringFromAntdColor( buttonFgColor ) : "";
    const backgroundColor = Util.isAntdRgbaProperty( buttonBgColor ) ? Util.getRgbaCSSStringFromAntdColor( buttonBgColor ) : "";
    const border = Util.isNumeric( buttonOuterBorderThickness ) && Util.isAntdRgbaProperty( buttonOuterBorderColor) ?
        "solid " + buttonOuterBorderThickness + "px " + Util.getRgbaCSSStringFromAntdColor( buttonOuterBorderColor )  : "";
    const borderRadius = Util.isNumber( buttonOuterBorderRadius ) ? buttonOuterBorderRadius + "px" : "";
    return (
        <button title={i18n.t(`legacy_button_description.${subtype}`)}  className={clsx("kbc-button kbc-button-fill-parent", currentCall?.muted && 'kbc-button-danger')}
                style={{
                    border:border,
                    borderRadius:borderRadius,
                    color:color,
                    backgroundColor:backgroundColor
                }}
                onClick={(!currentCall) ? undefined : context.toggleCallMuted}>{icon ? <FontAwesomeIcon size="lg" icon={icon}/> : label}</button>
    );
}
function LegacyLeavingSeatButton({ subtype, icon, label, buttonFgColor, buttonBgColor, buttonOuterBorderColor, buttonOuterBorderRadius, buttonOuterBorderThickness  }) {
    const color = Util.isAntdRgbaProperty( buttonFgColor  ) ? Util.getRgbaCSSStringFromAntdColor( buttonFgColor ) : "";
    const backgroundColor = Util.isAntdRgbaProperty( buttonBgColor ) ? Util.getRgbaCSSStringFromAntdColor( buttonBgColor ) : "";
    const border = Util.isNumeric( buttonOuterBorderThickness ) && Util.isAntdRgbaProperty( buttonOuterBorderColor) ?
        "solid " + buttonOuterBorderThickness + "px " + Util.getRgbaCSSStringFromAntdColor( buttonOuterBorderColor )  : "";
    const borderRadius = Util.isNumber( buttonOuterBorderRadius ) ? buttonOuterBorderRadius + "px" : "";
    return (
        <button title={i18n.t(`legacy_button_description.${subtype}`)}  className="kbc-button kbc-button-fill-parent"
                style={{
                    border:border,
                    borderRadius:borderRadius,
                    color:color,
                    backgroundColor:backgroundColor
                }}
        >{icon ? <FontAwesomeIcon size="lg" icon={icon}/> : label}</button>
    );
}
function LegacyNightTimeButton({ subtype, icon, label, buttonFgColor, buttonBgColor, buttonOuterBorderColor, buttonOuterBorderRadius, buttonOuterBorderThickness  }) {
    const color = Util.isAntdRgbaProperty( buttonFgColor  ) ? Util.getRgbaCSSStringFromAntdColor( buttonFgColor ) : "";
    const backgroundColor = Util.isAntdRgbaProperty( buttonBgColor ) ? Util.getRgbaCSSStringFromAntdColor( buttonBgColor ) : "";
    const border = Util.isNumeric( buttonOuterBorderThickness ) && Util.isAntdRgbaProperty( buttonOuterBorderColor) ?
        "solid " + buttonOuterBorderThickness + "px " + Util.getRgbaCSSStringFromAntdColor( buttonOuterBorderColor )  : "";
    const borderRadius = Util.isNumber( buttonOuterBorderRadius ) ? buttonOuterBorderRadius + "px" : "";
    return (
        <button title={i18n.t(`legacy_button_description.${subtype}`)}  className="kbc-button kbc-button-fill-parent"
                style={{
                    border:border,
                    borderRadius:borderRadius,
                    color:color,
                    backgroundColor:backgroundColor
                }}
        >{icon ? <FontAwesomeIcon size="lg" icon={icon}/> : label}</button>
    );
}
function LegacyAvailableButton({ subtype, icon, label, buttonFgColor, buttonBgColor, buttonOuterBorderColor, buttonOuterBorderRadius, buttonOuterBorderThickness }) {
    const color = Util.isAntdRgbaProperty( buttonFgColor  ) ? Util.getRgbaCSSStringFromAntdColor( buttonFgColor ) : "";
    const backgroundColor = Util.isAntdRgbaProperty( buttonBgColor ) ? Util.getRgbaCSSStringFromAntdColor( buttonBgColor ) : "";
    const border = Util.isNumeric( buttonOuterBorderThickness ) && Util.isAntdRgbaProperty( buttonOuterBorderColor) ?
        "solid " + buttonOuterBorderThickness + "px " + Util.getRgbaCSSStringFromAntdColor( buttonOuterBorderColor )  : "";
    const borderRadius = Util.isNumber( buttonOuterBorderRadius ) ? buttonOuterBorderRadius + "px" : "";
    return (
        <button title={i18n.t(`legacy_button_description.${subtype}`)}  className="kbc-button kbc-button-fill-parent"
                style={{
                    border:border,
                    borderRadius:borderRadius,
                    color:color,
                    backgroundColor:backgroundColor
                }}
        >{icon ? <FontAwesomeIcon size="lg" icon={icon}/> : label}</button>
    );
}
function LegacyNextCallButton({ subtype, icon, label, buttonFgColor, buttonBgColor, buttonOuterBorderColor, buttonOuterBorderRadius, buttonOuterBorderThickness, context = {}}) {
    const { currentCallIndex, callIds = [] } = context;
    const color = Util.isAntdRgbaProperty( buttonFgColor  ) ? Util.getRgbaCSSStringFromAntdColor( buttonFgColor ) : "";
    const backgroundColor = Util.isAntdRgbaProperty( buttonBgColor ) ? Util.getRgbaCSSStringFromAntdColor( buttonBgColor ) : "";
    const border = Util.isNumeric( buttonOuterBorderThickness ) && Util.isAntdRgbaProperty( buttonOuterBorderColor) ?
        "solid " + buttonOuterBorderThickness + "px " + Util.getRgbaCSSStringFromAntdColor( buttonOuterBorderColor )  : "";
    const borderRadius = Util.isNumber( buttonOuterBorderRadius ) ? buttonOuterBorderRadius + "px" : "";
    return (
        <button title={i18n.t(`legacy_button_description.${subtype}`)}  className={clsx("kbc-button kbc-button-fill-parent", (currentCallIndex < callIds.length - 1) && "kbc-button-danger-flash")}
                style={{
                    border:border,
                    borderRadius:borderRadius,
                    color:color,
                    backgroundColor:backgroundColor
                }}
                onClick={(!callIds.length || currentCallIndex === callIds.length - 1) ? undefined : context.switchCallDown}>
            {icon ? <FontAwesomeIcon size="lg" icon={icon}/> : label}
        </button>
    );
}
function LegacyLineButton({ subtype, icon, label, line, buttonFgColor, buttonBgColor, buttonOuterBorderColor, buttonOuterBorderRadius, buttonOuterBorderThickness, context = {} }) {
    const { myParksStatus = {}, linesStatus = {}, parksStatus = {}, loginUser, callById } = context;
    const { line_talker, room_id, status } = linesStatus[line] || {};
    let light = '';
    if (status === 'on') {
        const call = room_id ? Object.values(callById).find((call) => call.pbxRoomId === room_id) : null;
        const park = parksStatus[line];

        if (line_talker === loginUser?.pbxUsername) {
            light = 'kbc-button-success-flash';
        } else if (park) {
            light = myParksStatus[line] ? 'kbc-button-success-flash-slow' : 'kbc-button-danger-flash-slow';
        } else if (call) {
            if (call?.incoming && !call?.answered) {
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
            {icon ? <FontAwesomeIcon size="lg" icon={icon}/> : label}
        </button>
    );
}
function LegacyKeypadButton({ subtype, icon, symbol, buttonFgColor, buttonBgColor, buttonOuterBorderColor, buttonOuterBorderRadius, buttonOuterBorderThickness, context = {} }) {
    const color = Util.isAntdRgbaProperty( buttonFgColor  ) ? Util.getRgbaCSSStringFromAntdColor( buttonFgColor ) : "";
    const backgroundColor = Util.isAntdRgbaProperty( buttonBgColor ) ? Util.getRgbaCSSStringFromAntdColor( buttonBgColor ) : "";
    const border = Util.isNumeric( buttonOuterBorderThickness ) && Util.isAntdRgbaProperty( buttonOuterBorderColor) ?
        "solid " + buttonOuterBorderThickness + "px " + Util.getRgbaCSSStringFromAntdColor( buttonOuterBorderColor )  : "";
    const borderRadius = Util.isNumber( buttonOuterBorderRadius ) ? buttonOuterBorderRadius + "px" : "";
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
                }>{icon ? <FontAwesomeIcon size="lg" icon={icon}/> : symbol}</button>
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

function LegacyMakeCallButton({ subtype, icon, label, buttonFgColor, buttonBgColor, buttonOuterBorderColor, buttonOuterBorderRadius, buttonOuterBorderThickness, context = {}}) {
    const { currentCallIndex, callIds = [], callById = {} } = context;
    const currentCall = callById[callIds[currentCallIndex]];
    const color = Util.isAntdRgbaProperty( buttonFgColor  ) ? Util.getRgbaCSSStringFromAntdColor( buttonFgColor ) : "";
    const backgroundColor = Util.isAntdRgbaProperty( buttonBgColor ) ? Util.getRgbaCSSStringFromAntdColor( buttonBgColor ) : "";
    const border = Util.isNumeric( buttonOuterBorderThickness ) && Util.isAntdRgbaProperty( buttonOuterBorderColor) ?
        "solid " + buttonOuterBorderThickness + "px " + Util.getRgbaCSSStringFromAntdColor( buttonOuterBorderColor )  : "";
    const borderRadius = Util.isNumber( buttonOuterBorderRadius ) ? buttonOuterBorderRadius + "px" : "";
    return (
        <button title={i18n.t(`legacy_button_description.${subtype}`)} className="kbc-button kbc-button-fill-parent"
                style={{
                    border:border,
                    borderRadius:borderRadius,
                    color:color,
                    backgroundColor:backgroundColor
                }}
                onClick={ () => {
                    context.makeCallWithShortDial( context );
                }
                }>
            {icon ? <FontAwesomeIcon size="lg" icon={icon}/> : label}
        </button>
    );
}
function LegacyBackspaceButton({ subtype, icon, label, buttonFgColor, buttonBgColor, buttonOuterBorderColor, buttonOuterBorderRadius, buttonOuterBorderThickness, context = {} }) {
    const { currentCallIndex, callIds = [], callById = {} } = context;
    const currentCall = callById[callIds[currentCallIndex]];
    const color = Util.isAntdRgbaProperty( buttonFgColor  ) ? Util.getRgbaCSSStringFromAntdColor( buttonFgColor ) : "";
    const backgroundColor = Util.isAntdRgbaProperty( buttonBgColor ) ? Util.getRgbaCSSStringFromAntdColor( buttonBgColor ) : "";
    const border = Util.isNumeric( buttonOuterBorderThickness ) && Util.isAntdRgbaProperty( buttonOuterBorderColor) ?
        "solid " + buttonOuterBorderThickness + "px " + Util.getRgbaCSSStringFromAntdColor( buttonOuterBorderColor )  : "";
    const borderRadius = Util.isNumber( buttonOuterBorderRadius ) ? buttonOuterBorderRadius + "px" : "";
    return (
        <button title={i18n.t(`legacy_button_description.${subtype}`)} className="kbc-button kbc-button-fill-parent"
                style={{
                    border:border,
                    borderRadius:borderRadius,
                    color:color,
                    backgroundColor:backgroundColor
                }}
                onClick={(!!currentCall) ? undefined : context.backspaceKeypadValue}>
            {icon ? <FontAwesomeIcon size="lg" icon={icon}/> : label}
        </button>
    );
}
function LegacyIncomingCallButton({ subtype, icon, label, buttonFgColor, buttonBgColor, buttonOuterBorderColor, buttonOuterBorderRadius, buttonOuterBorderThickness, context = {} }) {
    const { currentCallIndex, callIds = [], callById = {} } = context;
    const currentCall = callById[callIds[currentCallIndex]];
    const color = Util.isAntdRgbaProperty( buttonFgColor  ) ? Util.getRgbaCSSStringFromAntdColor( buttonFgColor ) : "";
    const backgroundColor = Util.isAntdRgbaProperty( buttonBgColor ) ? Util.getRgbaCSSStringFromAntdColor( buttonBgColor ) : "";
    const border = Util.isNumeric( buttonOuterBorderThickness ) && Util.isAntdRgbaProperty( buttonOuterBorderColor) ?
        "solid " + buttonOuterBorderThickness + "px " + Util.getRgbaCSSStringFromAntdColor( buttonOuterBorderColor )  : "";
    const borderRadius = Util.isNumber( buttonOuterBorderRadius ) ? buttonOuterBorderRadius + "px" : "";
    return (
        <button title={i18n.t(`legacy_button_description.${subtype}`)} className={clsx("kbc-button kbc-button-fill-parent", (currentCall?.incoming && currentCall?.answered && !currentCall?.holding) && 'kbc-button-danger')}
                style={{
                    border:border,
                    borderRadius:borderRadius,
                    color:color,
                    backgroundColor:backgroundColor
                }}
        >{icon ? <FontAwesomeIcon size="lg" icon={icon}/> : label}</button>
    );
}
function LegacyThreeWayCallButton({ subtype, icon, label, buttonFgColor, buttonBgColor, buttonOuterBorderColor, buttonOuterBorderRadius, buttonOuterBorderThickness, context = {} }) {
    const color = Util.isAntdRgbaProperty( buttonFgColor  ) ? Util.getRgbaCSSStringFromAntdColor( buttonFgColor ) : "";
    const backgroundColor = Util.isAntdRgbaProperty( buttonBgColor ) ? Util.getRgbaCSSStringFromAntdColor( buttonBgColor ) : "";
    const border = Util.isNumeric( buttonOuterBorderThickness ) && Util.isAntdRgbaProperty( buttonOuterBorderColor) ?
        "solid " + buttonOuterBorderThickness + "px " + Util.getRgbaCSSStringFromAntdColor( buttonOuterBorderColor )  : "";
    const borderRadius = Util.isNumber( buttonOuterBorderRadius ) ? buttonOuterBorderRadius + "px" : "";
    return (
        <button title={i18n.t(`legacy_button_description.${subtype}`)}  className="kbc-button kbc-button-fill-parent"
                style={{
                    border:border,
                    borderRadius:borderRadius,
                    color:color,
                    backgroundColor:backgroundColor
                }}
                onClick={(!context.monitoringExtension) ? undefined : context.joinConversation}>{icon ? <FontAwesomeIcon size="lg" icon={icon}/> : label}</button>
    );
}
function LegacyOutgoingCallButton({ subtype, icon, label, buttonFgColor, buttonBgColor, buttonOuterBorderColor, buttonOuterBorderRadius, buttonOuterBorderThickness, context = {} }) {
    const { currentCallIndex, callIds = [], callById = {} } = context;
    const currentCall = callById[callIds[currentCallIndex]];
    const color = Util.isAntdRgbaProperty( buttonFgColor  ) ? Util.getRgbaCSSStringFromAntdColor( buttonFgColor ) : "";
    const backgroundColor = Util.isAntdRgbaProperty( buttonBgColor ) ? Util.getRgbaCSSStringFromAntdColor( buttonBgColor ) : "";
    const border = Util.isNumeric( buttonOuterBorderThickness ) && Util.isAntdRgbaProperty( buttonOuterBorderColor) ?
        "solid " + buttonOuterBorderThickness + "px " + Util.getRgbaCSSStringFromAntdColor( buttonOuterBorderColor )  : "";
    const borderRadius = Util.isNumber( buttonOuterBorderRadius ) ? buttonOuterBorderRadius + "px" : "";
    return (
        <button title={i18n.t(`legacy_button_description.${subtype}`)}  className={clsx("kbc-button kbc-button-fill-parent", (!!currentCall && currentCall?.answered && !currentCall?.incoming && !currentCall?.holding) && 'kbc-button-danger')}
                style={{
                    border:border,
                    borderRadius:borderRadius,
                    color:color,
                    backgroundColor:backgroundColor
                }}
        >{icon ? <FontAwesomeIcon size="lg" icon={icon}/> : label}</button>
    );
}
function LegacyHangUpCallButton({ subtype, icon, label, buttonFgColor, buttonBgColor, buttonOuterBorderColor, buttonOuterBorderRadius, buttonOuterBorderThickness, context = {} }) {
    const { currentCallIndex, callIds = [], callById = {} } = context;
    const currentCall = callById[callIds[currentCallIndex]];
    const color = Util.isAntdRgbaProperty( buttonFgColor  ) ? Util.getRgbaCSSStringFromAntdColor( buttonFgColor ) : "";
    const backgroundColor = Util.isAntdRgbaProperty( buttonBgColor ) ? Util.getRgbaCSSStringFromAntdColor( buttonBgColor ) : "";
    const border = Util.isNumeric( buttonOuterBorderThickness ) && Util.isAntdRgbaProperty( buttonOuterBorderColor) ?
        "solid " + buttonOuterBorderThickness + "px " + Util.getRgbaCSSStringFromAntdColor( buttonOuterBorderColor )  : "";
    const borderRadius = Util.isNumber( buttonOuterBorderRadius ) ? buttonOuterBorderRadius + "px" : "";
    return (
        <button title={i18n.t(`legacy_button_description.${subtype}`)}  className="kbc-button kbc-button-fill-parent"
                style={{
                    border:border,
                    borderRadius:borderRadius,
                    color:color,
                    backgroundColor:backgroundColor
                }}
                onClick={(!currentCall) ? undefined : context.hangUpCall}>{icon ? <FontAwesomeIcon size="lg" icon={icon}/> : label}</button>
    );
}
function LegacyUnholdCallButton({ subtype, icon, label, buttonFgColor, buttonBgColor, buttonOuterBorderColor, buttonOuterBorderRadius, buttonOuterBorderThickness, context = {} }) {
    const { currentCallIndex, callIds = [], callById = {} } = context;
    const currentCall = callById[callIds[currentCallIndex]];
    const color = Util.isAntdRgbaProperty( buttonFgColor  ) ? Util.getRgbaCSSStringFromAntdColor( buttonFgColor ) : "";
    const backgroundColor = Util.isAntdRgbaProperty( buttonBgColor ) ? Util.getRgbaCSSStringFromAntdColor( buttonBgColor ) : "";
    const border = Util.isNumeric( buttonOuterBorderThickness ) && Util.isAntdRgbaProperty( buttonOuterBorderColor) ?
        "solid " + buttonOuterBorderThickness + "px " + Util.getRgbaCSSStringFromAntdColor( buttonOuterBorderColor )  : "";
    const borderRadius = Util.isNumber( buttonOuterBorderRadius ) ? buttonOuterBorderRadius + "px" : "";
    return (
        <button title={i18n.t(`legacy_button_description.${subtype}`)}  className="kbc-button kbc-button-fill-parent"
                style={{
                    border:border,
                    borderRadius:borderRadius,
                    color:color,
                    backgroundColor:backgroundColor
                }}
                onClick={(!currentCall || !currentCall.answered || !currentCall.holding) ? undefined : context.resumeCall}>{icon ? <FontAwesomeIcon size="lg" icon={icon}/> : label}</button>
    );
}
function LegacyHoldCallButton({ subtype, icon, label, buttonFgColor, buttonBgColor, buttonOuterBorderColor, buttonOuterBorderRadius, buttonOuterBorderThickness, context = {} }) {
    const { currentCallIndex, callIds = [], callById = {} } = context;
    const currentCall = callById[callIds[currentCallIndex]];
    const color = Util.isAntdRgbaProperty( buttonFgColor  ) ? Util.getRgbaCSSStringFromAntdColor( buttonFgColor ) : "";
    const backgroundColor = Util.isAntdRgbaProperty( buttonBgColor ) ? Util.getRgbaCSSStringFromAntdColor( buttonBgColor ) : "";
    const border = Util.isNumeric( buttonOuterBorderThickness ) && Util.isAntdRgbaProperty( buttonOuterBorderColor) ?
        "solid " + buttonOuterBorderThickness + "px " + Util.getRgbaCSSStringFromAntdColor( buttonOuterBorderColor )  : "";
    const borderRadius = Util.isNumber( buttonOuterBorderRadius ) ? buttonOuterBorderRadius + "px" : "";
    return (
        <button title={i18n.t(`legacy_button_description.${subtype}`)}  className="kbc-button kbc-button-fill-parent"
                style={{
                    border:border,
                    borderRadius:borderRadius,
                    color:color,
                    backgroundColor:backgroundColor
                }}
                onClick={(!currentCall || !currentCall.answered || currentCall.holding) ? undefined : context.holdCall}>{icon ? <FontAwesomeIcon size="lg" icon={icon}/> : label}</button>
    );
}
function LegacyPickUpCallButton({ subtype, icon, label, buttonFgColor, buttonBgColor, buttonOuterBorderColor, buttonOuterBorderRadius, buttonOuterBorderThickness, context = {} }) {
    const { currentCallIndex, callIds = [], callById = {} } = context;
    const currentCall = callById[callIds[currentCallIndex]];
    const color = Util.isAntdRgbaProperty( buttonFgColor  ) ? Util.getRgbaCSSStringFromAntdColor( buttonFgColor ) : "";
    const backgroundColor = Util.isAntdRgbaProperty( buttonBgColor ) ? Util.getRgbaCSSStringFromAntdColor( buttonBgColor ) : "";
    const border = Util.isNumeric( buttonOuterBorderThickness ) && Util.isAntdRgbaProperty( buttonOuterBorderColor) ?
        "solid " + buttonOuterBorderThickness + "px " + Util.getRgbaCSSStringFromAntdColor( buttonOuterBorderColor )  : "";
    const borderRadius = Util.isNumber( buttonOuterBorderRadius ) ? buttonOuterBorderRadius + "px" : "";
    return (
        <button title={i18n.t(`legacy_button_description.${subtype}`)}  className="kbc-button kbc-button-fill-parent"
                style={{
                    border:border,
                    borderRadius:borderRadius,
                    color:color,
                    backgroundColor:backgroundColor
                }}
                onClick={(!currentCall || !currentCall.incoming || currentCall.answered) ? undefined : context.answerCall}>{icon ? <FontAwesomeIcon size="lg" icon={icon}/> : label}</button>
    );
}
function LegacyDummyButton({ subtype, icon, label, buttonFgColor, buttonBgColor, buttonOuterBorderColor, buttonOuterBorderRadius, buttonOuterBorderThickness  }) {
    const color = Util.isAntdRgbaProperty( buttonFgColor  ) ? Util.getRgbaCSSStringFromAntdColor( buttonFgColor ) : "";
    const backgroundColor = Util.isAntdRgbaProperty( buttonBgColor ) ? Util.getRgbaCSSStringFromAntdColor( buttonBgColor ) : "";
    const border = Util.isNumeric( buttonOuterBorderThickness ) && Util.isAntdRgbaProperty( buttonOuterBorderColor) ?
        "solid " + buttonOuterBorderThickness + "px " + Util.getRgbaCSSStringFromAntdColor( buttonOuterBorderColor )  : "";
    const borderRadius = Util.isNumber( buttonOuterBorderRadius ) ? buttonOuterBorderRadius + "px" : "";
    return (
        <button title={i18n.t(`legacy_button_description.${subtype}`)} className="kbc-button kbc-button-fill-parent"
                style={{
                    border:border,
                    borderRadius:borderRadius,
                    color:color,
                    backgroundColor:backgroundColor
                }}
        >{icon ? <FontAwesomeIcon size="lg" icon={icon}/> : label}</button>
    );
}
function LegacyQuickCallButton({ subtype, icon, label, buttonFgColor, buttonBgColor, buttonOuterBorderColor, buttonOuterBorderRadius, buttonOuterBorderThickness, context = {} }) {
    const color = Util.isAntdRgbaProperty( buttonFgColor  ) ? Util.getRgbaCSSStringFromAntdColor( buttonFgColor ) : "";
    const backgroundColor = Util.isAntdRgbaProperty( buttonBgColor ) ? Util.getRgbaCSSStringFromAntdColor( buttonBgColor ) : "";
    const border = Util.isNumeric( buttonOuterBorderThickness ) && Util.isAntdRgbaProperty( buttonOuterBorderColor) ?
        "solid " + buttonOuterBorderThickness + "px " + Util.getRgbaCSSStringFromAntdColor( buttonOuterBorderColor )  : "";
    const borderRadius = Util.isNumber( buttonOuterBorderRadius ) ? buttonOuterBorderRadius + "px" : "";
    return (
        //<button title={i18n.t(`legacy_button_description.${subtype}`)}  className="kbc-button kbc-button-fill-parent"
        <button title={i18n.t(`legacy_button_description.${subtype}`)}  className={clsx("kbc-button kbc-button-fill-parent", context.widget && context.currentScreenQuickCallWidget === context.widget && 'kbc-button-danger')}
                style={{
                    border:border,
                    borderRadius:borderRadius,
                    color:color,
                    backgroundColor:backgroundColor
                }}
                onClick={ () => context?.toggleQuickCallScreen( context.widget )  }>{icon ? <FontAwesomeIcon size="lg" icon={icon}/> : label}</button>
    );
}

function LegacyAutoDialButton({ subtype, icon, label, buttonFgColor, buttonBgColor, buttonOuterBorderColor, buttonOuterBorderRadius, buttonOuterBorderThickness, context = {} }) {
    const isRedColor = context.showAutoDialWidgets && BrekekeOperatorConsole._getIndexFromArray( context.showAutoDialWidgets, context.widget ) !== -1;
    const color = Util.isAntdRgbaProperty( buttonFgColor  ) ? Util.getRgbaCSSStringFromAntdColor( buttonFgColor ) : "";
    const backgroundColor = Util.isAntdRgbaProperty( buttonBgColor ) ? Util.getRgbaCSSStringFromAntdColor( buttonBgColor ) : "";
    const border = Util.isNumeric( buttonOuterBorderThickness ) && Util.isAntdRgbaProperty( buttonOuterBorderColor) ?
        "solid " + buttonOuterBorderThickness + "px " + Util.getRgbaCSSStringFromAntdColor( buttonOuterBorderColor )  : "";
    const borderRadius = Util.isNumber( buttonOuterBorderRadius ) ? buttonOuterBorderRadius + "px" : "";
    return (
        //<button title={i18n.t(`legacy_button_description.${subtype}`)}  className="kbc-button kbc-button-fill-parent"
        <button title={i18n.t(`legacy_button_description.${subtype}`)}  className={clsx("kbc-button kbc-button-fill-parent", isRedColor && 'kbc-button-danger')}
                style={{
                    border:border,
                    borderRadius:borderRadius,
                    color:color,
                    backgroundColor:backgroundColor
                }}
                onClick={ () => context?.onClickAutoDial( context.widget )  }>{icon ? <FontAwesomeIcon size="lg" icon={icon}/> : label}</button>
    );
}

function LegacyOneTouchDialButton({ subtype, icon, label, buttonFgColor, buttonBgColor, buttonOuterBorderColor, buttonOuterBorderRadius, buttonOuterBorderThickness, context }) {
    const color = Util.isAntdRgbaProperty( buttonFgColor  ) ? Util.getRgbaCSSStringFromAntdColor( buttonFgColor ) : "";
    const backgroundColor = Util.isAntdRgbaProperty( buttonBgColor ) ? Util.getRgbaCSSStringFromAntdColor( buttonBgColor ) : "";
    const border = Util.isNumeric( buttonOuterBorderThickness ) && Util.isAntdRgbaProperty( buttonOuterBorderColor) ?
        "solid " + buttonOuterBorderThickness + "px " + Util.getRgbaCSSStringFromAntdColor( buttonOuterBorderColor )  : "";
    const borderRadius = Util.isNumber( buttonOuterBorderRadius ) ? buttonOuterBorderRadius + "px" : "";
    if( !context ){ //edit mode
        return (
            <button title={i18n.t(`legacy_button_description.${subtype}`)} className="kbc-button kbc-button-fill-parent"
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
            <button title={i18n.t(`legacy_button_description.${subtype}`)} className="kbc-button kbc-button-fill-parent"
                    style={{
                        border:border,
                        borderRadius:borderRadius,
                        color:color,
                        backgroundColor:backgroundColor
                    }}
                    onClick={() => setDialingAndMakeCall(number, context )}>{icon ?
                <FontAwesomeIcon size="lg" icon={icon}/> : label}</button>
        );
    }
}

function Text({ text, textFgColor, textBgColor, textBorderRadius  }) {

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


const CALL_TABLE_TH_HEIGHT = 50;
const CALL_TABLE_TD_HEIGHT = 45;
function CallTable( props ) {
    let context = props.context;
    let callIds, callById, currentCallIndex;
    let isEditMode;
    if( !context ){ //in edit mode
        isEditMode = true;
        context = {};
        const tableHeight = props.height;
        const rowCount = Math.ceil( ( tableHeight - CALL_TABLE_TH_HEIGHT ) / CALL_TABLE_TD_HEIGHT  );
        callIds = new Array(rowCount);
        for( let i = 0; i < callIds.length; i++ ){
            callIds[i] = i;
        }
        callById = {};
        currentCallIndex = -1;
    }
    else{ //Not in edit mode
        isEditMode = false;
        callIds = context.callIds;
        if( !callIds ){
            callIds = [];
        }
        callById = context.callById;
        if( !callById ){
            callById = {};
        }
        currentCallIndex = context.currentCallIndex;

    }

    let idKey = 0;

    const CallTableColumns = [  //!overhead
        {key: 'partyNumber', title: i18n.t('PartyNumber'),      formatter: (v) => (v + '')},
        {key: 'partyName',   title: i18n.t('PartyName'),        formatter: (v) => (v + '')},
        {key: 'incoming',    title:  i18n.t('Incoming'),    formatter: (v) => (v ? '✓' : '')},
        {key: 'answered',    title: i18n.t('Answered'),    formatter: (v) => (v ? '✓' : '')},
        {key: 'holding',     title: i18n.t('Holding'),     formatter: (v) => (v ? '✓' : '')},
        {key: 'recording',   title:  i18n.t('Recording'),   formatter: (v) => (v ? '✓' : '')},
        {key: 'muted',       title:  i18n.t('Muted'),       formatter: (v) => (v ? '✓' : '')},
        {key: 'answeredAt',  title:  i18n.t("AnsweredAt") , formatter: (v) => (v ? new Date(v).toLocaleTimeString() : '')},
    ]

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


    return (
        <table className="brOCCalltable"  style={{
            borderRadius:outerBorderRadius,
            border: outerBorderThickness + "px solid " + outerBorderColor,
            backgroundColor:backgroundColor,
        }}>
            <thead>
            <tr style={{
                color:headerFgColor,
                borderBottom: headerRowUnderlineThickness +  "px solid " + headerRowUnderlineColor
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
                                   height:CALL_TABLE_TH_HEIGHT,
                                   paddingTop:0,
                                   paddingBottom:0,
                                   borderRadius:borderRadiusTH,
                               }}>{title}</th>;})
                }
                <th style={{
                    height:CALL_TABLE_TH_HEIGHT,
                    paddingTop:0,
                    paddingBottom:0,
                    borderRadius:"0 " + outerBorderRadius + "px 0 0",
                }}></th>
            </tr>
            </thead>
            <tbody style={{
                color:bodyFgColor,
            }}>
            {callIds.map((id, i) => {
                let tdActive;
                if( isEditMode  ){
                    tdActive = "\u00A0";
                }
                else if( i === currentCallIndex ){
                    tdActive = "\u00A0";
                }
                else{
                    tdActive = <button title={i18n.t("activeButtonDesc")} className="kbc-button kbc-button-fill-parent" onClick={ () => context.switchCallIndex(i)}>{i18n.t("active")}</button>;
                }

                return (<tr key={idKey++} style={{
                    color: bodyFgColor,
                    backgroundColor: i === currentCallIndex ? bodyActiveRowBgColor : "",
                    height:CALL_TABLE_TD_HEIGHT,
                    paddingTop:0,
                    paddingBottom:0,
                    borderBottom: bodyRowUnderlineThickness +  "px solid " + bodyRowUnderlineColor
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
                            const v0 = callById[id];
                            let v;
                            if( !v0 ){
                                v = "\u00A0";   //for edit mode
                            }
                            else{
                                v =  formatter( v0[key]);
                            }
                            return <td key={key}
                                       style={{
                                           height: CALL_TABLE_TD_HEIGHT,
                                           paddingTop:0,
                                           paddingBottom:0,
                                           borderRadius:borderRadiusTD
                                       }}>{v}</td>
                        }
                    )}
                    <td style={{
                        width:80,height:CALL_TABLE_TD_HEIGHT,paddingTop:0,paddingBottom:0,
                        borderRadius:"0 " + outerBorderRadius + "px 0 0 ",
                    }}>
                        {tdActive}
                    </td>
                </tr>);
            })}
            </tbody>
        </table>
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

    setNoteDebounced = debounce(() => {
        if (this.props.context?.setNote) {
            this.props.context.setNote(this.props.noteName, this.state.content)
                .then(() => this.setState({ saving: false }))
                .catch(() => this.setState({ error: true }))
        }
    }, 500);

    onContentChanged = (e) => {
        this.setState({ content: e.target.value, saving: true, error: false });
        this.setNoteDebounced();
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
                    return (
                        <Select.Option key={i} value={value}>
                            <FontAwesomeIcon fixedWidth icon={icon}/>
                            <span style={{marginLeft: 4}}>{icon.iconName}</span>
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
                    <Form.Item label={i18n.t("number")} name="number">
                        <Input allowClear/>
                    </Form.Item>
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
    [LegacyUccacWidget.name]:LegacyUccacWidgetSettings,
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

    palReady: false,
    loginUser: null,
    syncDownedScreens: false,
    syncDownedSystemSettings: false,
    _downedLayoutAndSystemSettings: false,
    syncLoadedCallHistory: false,
    //currentCallIndex: 0,
    currentCallIndex: -1,
    callIds: [],
    callById: {},
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
    editingWidgets: [],
    editingScreenWidth: 400,
    editingScreenHeight: 400,
    editingScreenGrid: 10,
    editingScreenBackground: '#ffffff00',
    editingScreenForeground:'#000000',

    currentScreenQuickCallWidget: null,
    currentScreenIndex: 0,
    screens: [DEFAULT_SCREEN],

    locale: '',
    displayState: undefined,
    showAutoDialWidgets: []
    //isSaveEditingScreenButtonDisabled: false
};



export default class BrekekeOperatorConsole extends React.Component {
    constructor(props) {
        super(props);
        this.callById = {};
        this._OnBackspaceKeypadValueCallbacks = [];
        this._OnAppendKeypadValueCallbacks = [];
        this._OnClearDialingCallbacks = [];
        //this._OnSetCurrentScreenIndexCallbacks = [];
        this._systemSettingsView = null;
        this.state = window.structuredClone(INIT_STATE);
        //this.state.operatorConsole = this;
        this.phone = null;
        this._CallHistory = new CallHistory(this);
        this._OnBeginSaveEditingScreenFunctions = [];
        // this._OnSelectWidgetFuncs = [];
        // this._OnDeselectWidgetFuncs =
        this._Campon = new Campon(this);
        this._ExtensionsStatus = new ExtensionsStatus( this );
        this._UccacWrapper = new UccacWrapper( this );
        this._BrekekeOperatorConsoleEx = new BrekekeOperatorConsoleEx(this);
        this._OnChangeCallEventListeners = new Array();
        this._OnUpdateCallEventListeners = new Array();
        this._OnInsertCallEventListeners = new Array();
        this._OnRemoveCallEventListeners = new Array();
        this._OnChangeCurrentCallIdEventListeners = new Array();
        this._OnUnloadExtensionScriptEventListeners = new Array();
        this._OnPalNotifyStatusEventListeners = new Array();
        //this._BusylightStatusChanger = new BusylightStatusChanger(this); //!dev
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
        this.setState( { _downedLayoutAndSystemSettings:true } );
    }

    onSavedNewLayoutFromNoScreensView( noScreensViewAsCaller, layoutName, layoutsAndSettingsData  ){
        const systemSettingsData = this.getSystemSettingsData();
        const this_ = this;
        systemSettingsData.setSystemSettingsDataData( layoutsAndSettingsData.systemSettings,
            function(){
                this_.setLastLayoutShortname( layoutName );
                this_.setState( { _downedLayoutAndSystemSettings:true, screens: layoutsAndSettingsData.screens, systemSettingsData:systemSettingsData } );
            },
            function(){ //initFail

            }
            );
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

    onSavingSystemSettings(systemSettingsAsCaller) {
        this.getCallHistory().onSavingSystemSettings(this);
    }

    onBeginSetSystemSettingsData( newData, systemSettingsDataAsCaller, onInitSuccessUccacFunction, onInitFailUccacFunction  ){
        const isUCMinScript = false;    //!dev
        const initAsync = this._UccacWrapper.onBeginSetSystemSettingsDataByOperatorConsoleAsParent( newData, systemSettingsDataAsCaller, onInitSuccessUccacFunction, onInitFailUccacFunction, isUCMinScript );
        return initAsync;
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
                    })
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

    }

    _getLastLayoutLocalstorageKeyName(){
        //let info = this.state.lastLoginAccount;
        // if( !info ){
        //     const lastLoginAccount = localStorage.getItem('lastLoginAccount');
        //     info = JSON.parse( lastLoginAccount );
        // }

        const info = this._getLastLoginAccount();
        // const lastLoginAccount = localStorage.getItem('lastLoginAccount');
        // const info = JSON.parse( lastLoginAccount );
        const key = info.hostname + '\t' + info.port + '\t' + info.tenant + '\t' + info.username;
        return key;
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

    _setDisplayState(displayState, otherSetStates, callback) {
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

    render() {
        if (!this.state.i18nReady) {
            return <Empty image={null} description={<Spin/>}/>
        }

        const selectingWidget = this.state.editingWidgets[this.state.selectingWidgetIndex];
        const SeletingWidgetSettings = WidgetSettingsMap[selectingWidget?.type];
        let selectingWidgetSettingsKey = 0;

        const handleShowConfirmDeleteWidgetOk = () => {
            this.setState({showConfirmDeleteWidget: false});
            this.onWidgetRemoved(this.state.selectingWidgetIndex);
        };
        const handleShowConfirmDeleteWidgetCancel = () => {
            this.setState({showConfirmDeleteWidget: false});
        };


        return (<>
            {!!this.state.palReady ? (
                <div style={{flexGrow:1,display:"flex",flexDirection:"column",overflow:"hidden"}}>
                    <img style={{position: 'absolute', top: 4, left: 4, zIndex: 1}} src={logo}/>
                    {this.state._downedLayoutAndSystemSettings ? (
                            this.state.displayState === brOcDisplayStates.editingScreen ? (
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
                                                        {this.state.editingWidgets.map((widget, i) => {
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
                                            </div>
                                            <div style={{
                                                width: 262,
                                                borderLeft: 'solid 1px #e0e0e0',
                                                display: 'flex',
                                                flexDirection: 'column',
                                                gap: 12,
                                                overflow: 'hidden'
                                            }}>
                                                {!!selectingWidget?.type && (
                                                    <div style={{padding:"12px 12px 0px 12px"}}>{i18n.t(`widget_description.${selectingWidget?.type}`)}</div>
                                                )}
                                                <div style={{overflowY: 'auto', flexGrow: 1, height:0, paddingLeft:12, paddingRight:12 }}>   {  /* height:0 is for show scrollbar */ }
                                                    {!!SeletingWidgetSettings && (
                                                        <SeletingWidgetSettings
                                                            key={ selectingWidgetSettingsKey++ }
                                                            widgetIndex={this.state.selectingWidgetIndex}
                                                            widget={{...selectingWidget}}
                                                            onChange={this.updateSelectingWidgetSettings}
                                                            getNoteNames={this.getNoteNames}
                                                            operatorConsoleAsParent={this}
                                                        />
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
                                            </div>
                                        </div>
                                    </div>
                                </div>
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
                                        {this.state.screens.map((screen, i) => (
                                            <div key={i}>
                                                <div style={{
                                                    position: 'relative',
                                                    width: screen.width,
                                                    height: screen.height,
                                                    margin: '0 auto',
                                                    marginTop: 48,
                                                }}>
                                                    {screen.widgets.map((widget, i) => {
                                                        const Widget = WidgetMap[widget.type];
                                                        if (!Widget) return null;
                                                        return (<div key={i} style={{
                                                            position: 'absolute',
                                                            left: widget.x,
                                                            top: widget.y,
                                                            width: widget.width,
                                                            height: widget.height
                                                        }} onMouseMove={(e) => e.stopPropagation()}>
                                                            <Widget
                                                                {...widget}
                                                                operatorConsoleAsParent={this}
                                                                uccacWrapper={this._UccacWrapper}
                                                                context={{
                                                                    loginUser: this.state.loginUser,
                                                                    currentCallIndex: this.state.currentCallIndex,
                                                                    callIds: this.state.callIds,
                                                                    callById: this.callById,
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
                                                                    sendDTMF: this.sendDTMF,
                                                                    makeCall: this.makeCall,
                                                                    transferCall: this.transferCall,
                                                                    handleLine: this.handleLine,
                                                                    handlePark: this.handlePark,
                                                                    getNote: this.getNote,
                                                                    setNote: this.setNoteByPal,
                                                                    toggleQuickCallScreen: this.toggleQuickCallScreen,
                                                                    onClickAutoDial: this.onClickAutoDial,
                                                                    currentScreenQuickCallWidget: this.state.currentScreenQuickCallWidget,
                                                                    widget: widget,
                                                                    showAutoDialWidgets: this.state.showAutoDialWidgets,
                                                                    operatorConsole: this
                                                                }}
                                                            />
                                                        </div>)
                                                    })}
                                                    {screen.widgets.length === 0 && (
                                                        <Empty image={null} description={i18n.t("no_widgets")}/>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                        {/*</Carousel>*/}
                                    </div>
                                    <DropDownMenu operatorConsole={this}></DropDownMenu>
                                </>)
                                : this.state.displayState === brOcDisplayStates.systemSettingsView ? (
                                        <SystemSettingsView operatorConsole={this}/>
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
                                            {this.state.screens.map((screen, i) => (
                                                <div key={i}>
                                                    <div style={{
                                                        position: 'relative',
                                                        width: screen.width,
                                                        height: screen.height,
                                                        margin: '0 auto',
                                                        marginTop: 48,
                                                    }}>
                                                        {screen.widgets.map((widget, i) => {
                                                            const Widget = WidgetMap[widget.type];
                                                            if (!Widget) return null;
                                                            return (<div key={i} style={{
                                                                position: 'absolute',
                                                                left: widget.x,
                                                                top: widget.y,
                                                                width: widget.width,
                                                                height: widget.height
                                                            }} onMouseMove={(e) => e.stopPropagation()}>
                                                                <Widget
                                                                    {...widget}
                                                                    operatorConsoleAsParent={this}
                                                                    uccacWrapper={this._UccacWrapper}
                                                                    context={{
                                                                        loginUser: this.state.loginUser,
                                                                        currentCallIndex: this.state.currentCallIndex,
                                                                        callIds: this.state.callIds,
                                                                        callById: this.callById,
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
                                                                        sendDTMF: this.sendDTMF,
                                                                        makeCall: this.makeCall,
                                                                        transferCall: this.transferCall,
                                                                        handleLine: this.handleLine,
                                                                        handlePark: this.handlePark,
                                                                        getNote: this.getNote,
                                                                        setNote: this.setNoteByPal,
                                                                        toggleQuickCallScreen: this.toggleQuickCallScreen,
                                                                        currentScreenQuickCallWidget: this.state.currentScreenQuickCallWidget,
                                                                        onClickAutoDial: this.onClickAutoDial,
                                                                        widget: widget,
                                                                        makeCallWithShortDial: this.makeCallWithShortDial,
                                                                        showAutoDialWidgets: this.state.showAutoDialWidgets,
                                                                        operatorConsole: this
                                                                    }}
                                                                />
                                                            </div>)
                                                        })}
                                                        {screen.widgets.length === 0 && (
                                                            <Empty image={null} description={i18n.t("no_widgets")}/>
                                                        )}
                                                    </div>
                                                </div>
                                            ))}
                                            {/*</Carousel>*/}
                                        </div>
                                        <DropDownMenu operatorConsole={this}></DropDownMenu>
                                        <AutoDialView
                                            operatorConsoleAsParent={this}
                                            sortedCallNos={this._CallHistory.getSortedCallNos()}
                                            currentCallIndex={this.state.currentCallIndex}
                                            callIds={this.state.callIds}
                                            callById={this.callById}
                                            isVisible={this.state.showAutoDialWidgets && this.state.showAutoDialWidgets.length !== 0}
                                        />
                                        <QuickBusy operatorConsoleAsParent={this}/>
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
                    <Login initialValues={this._getLastLoginAccount()} onSubmit={this.login} isSigningin={ this.state.isSigningin === true ? true : false }/>
                </div>
            )}

            <div id="brOCPhone"></div>
        </>);
    }

    _getLastLoginAccount() {
        const sLastLoginAccount = localStorage.getItem('lastLoginAccount');
        if( sLastLoginAccount ){
            try {
                const lastLoginAccount = JSON.parse(sLastLoginAccount);
                return lastLoginAccount;
            }
            catch( err ){
                console.error(err);
            }
        }
        //const lastLoginAccount = this.state.lastLoginAccount;
        const lastLoginAccount = {hostname:location.hostname, port:location.port };
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
    startEditingScreen = () => {
        const {widgets, background, width, height, grid, foreground } = this.state.screens[this.state.currentScreenIndex];

        this._setDisplayState(brOcDisplayStates.editingScreen,
            {
                editingWidgets: window.structuredClone(widgets || []),
                editingScreenBackground: background || '#ffffff00',
                editingScreenForeground: foreground || '#000000',
                editingScreenWidth: width || 800,
                editingScreenHeight: height || 600,
                editingScreenGrid: grid || 10,
            }
        );
    }

    startShowScreen = () => {
        this._setDisplayState(brOcDisplayStates.showScreen);
    }

    startSettingsScreen = () => {
        this._setDisplayState(brOcDisplayStates.systemSettingsView);
    }

    toggleQuickCallScreen = (quickCallButtonWidget) => {
        console.log("quickCallButtonWidget=" + quickCallButtonWidget);

        if (this.state.currentScreenQuickCallWidget === quickCallButtonWidget) {
            this._setDisplayState(brOcDisplayStates.showScreen, {currentScreenQuickCallWidget: null});   //toggle off
        } else {
            this._setDisplayState(brOcDisplayStates.waitQuickCallKey, {currentScreenQuickCallWidget: quickCallButtonWidget});
        }
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

    addOnBeginSaveEditingScreenFunctionIfNotExists(func) {
        for (let i = 0; i < this._OnBeginSaveEditingScreenFunctions.length; i++) {
            if (this._OnBeginSaveEditingScreenFunctions[i] === func) {
                return false;
            }
        }
        this._OnBeginSaveEditingScreenFunctions.push(func);
        return true;
    }


    saveEditingScreen = () => {
        for (let i = 0; i < this._OnBeginSaveEditingScreenFunctions.length; i++) {
            const cantSaveMessage = this._OnBeginSaveEditingScreenFunctions[i](this);
            if (cantSaveMessage) {
                Notification.error({message: cantSaveMessage});
                return;
            }
        }

        const screens = [...this.state.screens];
        screens[this.state.currentScreenIndex] = {
            widgets: this.state.editingWidgets,
            background: this.state.editingScreenBackground,
            width: this.state.editingScreenWidth,
            height: this.state.editingScreenHeight,
            grid: this.state.editingScreenGrid,
            foreground:this.state.editingScreenForeground
        }
        console.log('saving screen', screens[this.state.currentScreenIndex]);

        this._setDisplayState(brOcDisplayStates.showScreen, {screens}, () => {
                this._syncUp();
            }
        );
    }

    _syncUp = async () => {
        const pal = this.getPal();
        //if (!pal) return;
        const systemSettingsData = this.getSystemSettingsData();
        const systemSettingsDataData = systemSettingsData.getData();

        const  layoutsAndSettingsData =  {
            version:  BrekekeOperatorConsole.getAppDataVersion(),
            screens:  this.state.screens,
            systemSettings: systemSettingsDataData
        };

        const shortname = this.getLastLayoutShortname();
        const noteContent = JSON.stringify( layoutsAndSettingsData );
        let error;
        await this.setOCNoteByPal( shortname, noteContent ).
        then( () => {
            //this.setLastSystemSettingsDataData( systemSettingsDataData );
        }).catch( (err) => {
            error =err;
        });

        if (error) {
            console.error(error);
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
            return;
        }


        Notification.success({ key: 'sync', message: i18n.t("saved_data_to_pbx_successfully") });
        //this.operatorConsoleAsParent.abortSystemSettings();
    }

    abortEditingScreen = () => {
        this._setDisplayState(brOcDisplayStates.showScreen);
    }

    abortAutoDialView = () => {
        this.setState({showAutoDialWidgets: []});  //for rerender
    }

    abortSystemSettings = () => {
        this._setDisplayState(brOcDisplayStates.showScreen);
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

        this.setState({
            editingWidgets: [...this.state.editingWidgets, widget]
        });
        this.selectWidget(this.state.editingWidgets.length);
    }
    onWidgetMoved = (i, x, y) => {
        const editingWidgets = [...this.state.editingWidgets];
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
        editingWidgets[i].x = x;
        editingWidgets[i].y = y;
        this.setState({editingWidgets});
    }
    onWidgetResized = (i, x, y, width, height) => {
        const editingWidgets = [...this.state.editingWidgets];
        editingWidgets[i].x = x;
        editingWidgets[i].y = y;
        editingWidgets[i].width = width;
        editingWidgets[i].height = height;
        this.setState({editingWidgets});
    }
    onWidgetRemoved = (i) => {
        // const widget = this.state.editingWidgets[i];
        // const tWidget = widget.subtype;
        // if( tWidget === "LegacyAutoDialButton" ){
        //     const iW = BrekekeOperatorConsole._getIndexFromArray( this.state.showAutoDialWidgets, widget );
        //     this.state.showAutoDialWidgets.splice( 1, iW );
        //     this.setState( { showAutoDialWidgets:this.state.showAutoDialWidgets});
        // }


        const editingWidgets = [...this.state.editingWidgets];
        //const removingWidget = editingWidgets[ i ];
        // const func = removingWidget.OnRemovingWidget;
        // if( func ){
        //   func(this,i);
        // }
        editingWidgets.splice(i, 1);
        this.setState({
            editingWidgets,
        });
        this.selectWidget(this.state.selectingWidgetIndex === i ? -1 : this.state.selectingWidgetIndex);
    }

    getEditingWidget() {
        if (this.state.selectingWidgetIndex >= 0) {
            const editingWidgets = [...this.state.editingWidgets];
            const editingWidget = editingWidgets[this.state.selectingWidgetIndex];
            return editingWidget;
        }
        return null;
    }

    getEditingWidgets() {
        const editingWidgets = [...this.state.editingWidgets];
        return editingWidgets;
    }


    duplicateWidget = (i) => {
        const editingWidgets = [...this.state.editingWidgets];
        const widget = window.structuredClone(editingWidgets[this.state.selectingWidgetIndex]);
        widget.x += 25;
        widget.y += 25;
        editingWidgets.splice(i + 1, 0, widget);
        this.setState({
            editingWidgets
        });
        this.selectWidget(this.state.selectingWidgetIndex + 1);
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

        this.setState({selectingWidgetIndex: i});
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
        const editingWidgets = [...this.state.editingWidgets];
        const [widget] = editingWidgets.splice(i, 1);
        editingWidgets.push(widget);
        this.setState({
            editingWidgets,
        });
        this.selectWidget(editingWidgets.length - 1);
    }


    updateSelectingWidgetSettings = (settings) => {
        const editingWidgets = [...this.state.editingWidgets];
        editingWidgets[this.state.selectingWidgetIndex] = {
            ...editingWidgets[this.state.selectingWidgetIndex],
            ...settings,
        };
        this.setState({editingWidgets});
    }

    getCurrentCall = () => {
        const id = this.getCurrentCallId();
        if( !id ){
            return null;
        }
        const call = this.getCallByCallId(id);
        return call;
    }

    _getCurrentCallIndex(){
        return this.state.currentCallIndex;
    }

    getCurrentCallId(){
        const currentCallIndex = this._getCurrentCallIndex();
        if( currentCallIndex === -1  ){
            return null;
        }
        const id = this.state.callIds[ currentCallIndex ];
        return id;
    }

    getCallByCallId = ( id ) =>{
        const call = this.callById[id];
        return call;
    }

    switchCallUp = () => {
        const currentCallIndex = this._getCurrentCallIndex();
        if ( currentCallIndex > 0) {
            this.holdCall();
            this._setCurrentCallIndex( currentCallIndex - 1 );
        }
    }

    _getCallIndexByCallId(){
        const calls = this.state.callById;
    }

    _setCurrentCallIndex( index ){
        const currentCallIndex = this._getCurrentCallIndex();

        this.setState({currentCallIndex: index });
        if( index === currentCallIndex ){
            return false;
        }
        this._onChangeCurrentCallIndex( index, currentCallIndex  );
        return true;
    }

    _onChangeCurrentCallIndex(index, prevIndex ){
        let currentCallId;
        if( index !== -1 ) {
            currentCallId = this.state.callIds[index];
        }
        else{
            currentCallId = null;
        }

        let prevCallId;
        if( prevIndex !== -1 ){
            prevCallId = this.state.callIds[prevIndex];
        }
        else{
            prevCallId = null;
        }

        const options = {
            currentCallId : currentCallId,
            previousCallId : prevCallId
        };

        for(let i = 0; i < this._OnChangeCurrentCallIdEventListeners.length; i++ ){
            const event = this._OnChangeCurrentCallIdEventListeners[i];
            event( options );   //!forBug need tryCatch?
        }
    }

    switchCallDown = () => {
        const currentCallIndex = this._getCurrentCallIndex();
        if ( currentCallIndex < this.state.callIds.length - 1) {
            this.holdCall();
            this._setCurrentCallIndex( currentCallIndex + 1);
        }
    }

    getCallIndexByCallId = (callId ) =>{
        const index = this.state.callIds.indexOf( callId );
        return index;
    }

    switchCallIndex = (index) => {
        const ok = this.switchCallIndexWithoutHold( index )
        if( ok ) {
            this.holdCall();
        }
    }

    switchCallIndexWithoutHold = (index) => {
        if( this.state.currentCallIndex === index ) {
            return false;
        }
        this._setCurrentCallIndex(index);
        return true;
    }


    monitorDialingExtension = async () => {
        if (this.pal) {
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

            await this.pal.call_pal('barge', {
                tenant: this.state.loginUser?.pbxTenant,
                user: this.state.dialing,
                talker_id,
                listen: 'true',
                speak: 'false',
            }).catch((err) => {
                console.error( "Failed to monitor extension.", err );
                Notification.error({message: i18n.t('failed_to_monitor_extension')});
                throw err;
            })
            this.setState({monitoringExtension: this.state.dialing});
        }
    }

    joinConversation = () => {
        // TODO: implement this
    }

    appendKeypadValue = (key) => {
        this.setState({dialing: this.state.dialing + key}, () => this._onAppendKeypadValue(key));
        if (this.getCurrentCall()) {
            this.sendDTMF(key);
        }
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
        this.setState({dialing: sDialing}, () => context.makeCall(context));
    }

    setDialing = (sDialing) => {
        this.setState({dialing: sDialing});
    }

    setDialingAndMakeCallWithState = (sDialing) => {
        const currentCallIndex = this._getCurrentCallIndex();
        this.setState({dialing: sDialing}, () => this.makeCall2( currentCallIndex, this.state.callIds, this.callById));
    }

    setDialingAndMakeCall2 = (sDialing, currentCallIndex, callIds = [], callById = {}) => {
        this.setState({dialing: sDialing}, () => this.makeCall2(currentCallIndex, callIds, callById));
    }

    backspaceKeypadValue = () => {
        this.setState({dialing: this.state.dialing.slice(0, -1)}, () => this._onBackspaceKeypadVakue());
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

    removeCall = (call) => {
        if (!call) return;
        if (!this.callById[call.id]) return;

        const removeCallIndex = this.state.callIds.indexOf(call.id);
        let currentCallIndex = this._getCurrentCallIndex();
        if (removeCallIndex <= currentCallIndex ) {
            currentCallIndex--;
        }

        const callById = {...this.callById};
        deleteProperty(callById, call.id);
        const callIds = [...this.state.callIds].filter(id => id !== call.id);
        this.callById = callById;
        this.setState({callIds, callById});
        this._setCurrentCallIndex( currentCallIndex );

        this._onRemovetCall( call );


    }

    _onPhoneCall = (phoneAsCaller, call) => {
        this.insertCall(call);
    }

    insertCall = (call) => {
        if (!call) return;

        if (this.state.autoRejectIncoming) {
            call.hangupWithUnhold();
            return;
        }

        const callIds = [...this.state.callIds, call.id];
        const callById = {...this.callById};
        const brOCCallObject = {
            ...(this.callById[call.id] || {}),
            id: call.id,
            pbxTenant: call.pbxTenant,
            pbxTalkerId: call.pbxTalkerId,
            pbxRoomId: call.pbxRoomId,
            createdAt: call.createdAt,
            answeredAt: call.answeredAt,
            partyName: call.partyName,
            partyNumber: call.partyNumber,
            incoming: call.incoming,
            answered: call.answered,
            holding: call.holding,
            toggleHoldWithCheck: call.toggleHoldWithCheck,
            hangupWithUnhold: call.hangupWithUnhold,
            answer: call.answer,
            toggleRecording: call.toggleRecording,
            toggleMuted: call.toggleMuted,
            _isExtension: !!this.state.extensions.find((ext) => ext.id == call.partyNumber),
            callByWebphone: call
        };
        //set custom incoming sound.
        const ringtoneInfos = this.getSystemSettingsData().getRingtoneInfos();

        const brOCCallObjectStatus = OCUtil.getCallStatusFromBrOCCallObject( brOCCallObject );
        if(  brOCCallObjectStatus === BROC_BROCCALLOBJECT_CALL_STATUSES.incoming  ) {
            let incomingRingtone = "";
             //set custom incoming sound.
            if (ringtoneInfos && Array.isArray(ringtoneInfos)) {
                for (let i = 0; i < ringtoneInfos.length; i++) {
                    const ringtoneInfo = ringtoneInfos[i];
                    const caller = ringtoneInfo.ringtoneCaller;
                    const matches = brOCCallObject.partyNumber.match( caller );
                    if( matches ){
                        const ringtoneFilepathOrFileurl = ringtoneInfo.ringtoneFilepathOrFileurl;
                        incomingRingtone = OCUtil.getUrlStringFromPathOrUrl( ringtoneFilepathOrFileurl, this._RootURLString  );
                        break;
                    }

                }
            }
            this.phone.setIncomingRingtone( incomingRingtone );
        }


        ////!temp
        // //set custom incoming sound.
        // const brOCCallObjectStatus = OCUtil.getCallStatusFromBrOCCallObject( brOCCallObject );
        // if(  brOCCallObjectStatus === BROC_BROCCALLOBJECT_CALL_STATUSES.incoming  ) {
        //     let  ringtoneUrl = location.href;
        //     ringtoneUrl = Util.removeString( ringtoneUrl,  location.search );
        //     const indexOfSlash = ringtoneUrl.lastIndexOf('/');
        //     if( indexOfSlash !== -1 ) {
        //         const indexOfDot = ringtoneUrl.lastIndexOf(".", indexOfSlash);
        //         if (indexOfDot !== -1) {
        //             ringtoneUrl = ringtoneUrl.substring(0, indexOfSlash );
        //         }
        //     }
        //     ringtoneUrl += "/sounds/fx-lumu-cellphone-ringtone-huawei-y6-fx-old-phone-68532.wav";
        //     console.log("ringtoneUrl=" + ringtoneUrl );
        //     this.phone.setIncomingRingtone(ringtoneUrl);
        // }


        setProperty(callById, call.id,  brOCCallObject  );
        this.callById = callById;
        this.setState({callIds, callById}, () => {
            //if( this.state.isCalling === true && !call.pbxRoomId && !call.pbxTalkerId ){
            const brOCCallObject = this._getBrOCCallObjectByCallId( call.id );
            const brOCCallObjectStatus = OCUtil.getCallStatusFromBrOCCallObject( brOCCallObject );
            if(  brOCCallObjectStatus === BROC_BROCCALLOBJECT_CALL_STATUSES.calling  ){
                const newCurrentCallIndex = this.state.callIds.indexOf(call.id);
                this._setCurrentCallIndex(newCurrentCallIndex);
                //this.setState({isCalling:false});
            }
        });
        const currentCallIndex = this._getCurrentCallIndex();
        if( currentCallIndex === -1 ){
            this._setCurrentCallIndex(0);
        }

        [
            'id',
            'answered',
            'answeredAt',
            'muted',
            'recording',
            'holding',
            'transferring',
        ].forEach((field) => {
            reaction(() => call[field], async (val) => {
                console.log('call changed', field, val);
                if (this.callById[call.id]) {
                    const callById = {...this.callById};
                    setProperty(callById, `${call.id}.${field}`, val);
                    this.callById = callById;
                    this.setState({callById});

                    //When a call turns into a talk, if the call is not active, place the call on hold.
                    if( field === "answered" && val === true ) {
                        const brOCCallObject = callById[ call.id ];
                        const brOCCallObjectStatus = OCUtil.getCallStatusFromBrOCCallObject(brOCCallObject);
                        if (brOCCallObjectStatus === BROC_BROCCALLOBJECT_CALL_STATUSES.talking) {
                            const brOCCallObject = callById[call.id];
                            const bActive = this._isCurrentCallByCallId(brOCCallObject.id);
                            if (!bActive) {
                                brOCCallObject.toggleHoldWithCheck();
                            }
                        }
                    }

                }
                const options = {
                    call : call,
                    field: field,
                    value: val
                };  //!forBug need copy objects/array?
                this._onChangeCall( options );
            })
        })

        this._onInsertCall( call );
    }

    _getBrOCCallObjectByCallId( callId ){
        const brOCCallObject = this.state.callById[ callId ];
        return brOCCallObject;
    }

    _isCurrentCallByCallId( callId ){
        const callIndex = this.getCallIndexByCallId( callId );
        const currentCallIndex = this._getCurrentCallIndex();
        const bCurrent = callIndex === currentCallIndex;
        return bCurrent;
    }

    // _getBrOCCallObjectByCallId( callId ){
    //     const brOCCallObject = this.callById[ callId ];
    //     return brOCCallObject;
    // }

    // _getCurrentCallId() {
    //     callIds[currentCallIndex]
    // }
    _onInsertCall( call ){
        const options = {
            call : call
        }
        //this._BusylightStatusChanger.onInsertCall( options );  //!dev
        for(let i = 0; i < this._OnInsertCallEventListeners.length; i++ ){
            const event = this._OnInsertCallEventListeners[i];
            event( options );   //!forBug need tryCatch?
        }
    }

    setOnInsertCallEventListener(function_ ){
        const index = this._OnInsertCallEventListeners.indexOf( function_ );
        if( index !== -1 ){
            return false;
        }
        this._OnInsertCallEventListeners.push( function_ );
        return true;
    }

    removeOnInsertCallEventListener( function_ ){
        const removedIndex = Util.removeItemFromArray( this._OnInsertCallEventListeners, function_ );
        return removedIndex;
    }

    clearOnInsertCallEventListeners(){
        this._OnInsertCallEventListeners.splice(0);
    }

    _onRemovetCall( call  ){
        const options = {
            call : call
        };
        //this._BusylightStatusChanger.onRemoveCall( options );  //!dev
        for(let i = 0; i < this._OnRemoveCallEventListeners.length; i++ ){
            const event = this._OnRemoveCallEventListeners[i];
            event( options );   //!forBug need tryCatch?
        }
    }

    setOnRemoveCallEventListener(function_ ){
        const index = this._OnRemoveCallEventListeners.indexOf( function_ );
        if( index !== -1 ){
            return false;
        }
        this._OnRemoveCallEventListeners.push( function_ );
        return true;
    }

    removeOnRemoveCallEventListener( function_ ){
        const removedIndex = Util.removeItemFromArray( this._OnRemoveCallEventListeners, function_ );
        return removedIndex;
    }

    clearOnRemoveCallEventListeners(){
        this._OnRemoveCallEventListeners.splice(0);
    }

    setOnChangeCurrentCallIdEventListener(function_ ){
        const index = this._OnChangeCurrentCallIdEventListeners.indexOf( function_ );
        if( index !== -1 ){
            return false;
        }
        this._OnChangeCurrentCallIdEventListeners.push( function_ );
        return true;
    }

    removeOnChangeCurrentCallIdEventListener( function_ ){
        const removedIndex = Util.removeItemFromArray( this._OnChangeCurrentCallIdEventListeners, function_ );
        return removedIndex;
    }

    clearOnChangeCurrentCallIdEventListeners(){
        this._OnChangeCurrentCallIdEventListeners.splice(0);
    }

    _clearAllEventListenersForEx(){
        this.clearOnChangeCallEventListeners();
        this.clearOnUpdateCallEventListeners();
        this.clearOnInsertCallEventListeners();
        this.clearOnRemoveCallEventListeners();
        this.clearOnChangeCurrentCallIdEventListeners();
        this.clearOnUnloadExtensionScriptEventListeners();
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
            Notification.error({message: i18n.t('anExtensionScriptExecutingErrorHasOccurred') + "\r\n" +  err });
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
                Notification.error({message: i18n.t('anExtensionScriptUnloadingErrorHasOccurred') + "\r\n" +  err });
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

    clearOnUnloadExtensionScriptEventListeners(){
        this._OnUnloadExtensionScriptEventListeners.splice(0);
    }


    _onChangeCall( options ){
        for(let i = 0; i < this._OnChangeCallEventListeners.length; i++ ){
            const event = this._OnChangeCallEventListeners[i];
            event( options );   //!forBug need tryCatch?
        }
    }

    setOnChangeCallEventListener(function_ ){
        const index = this._OnChangeCallEventListeners.indexOf( function_ );
        if( index !== -1 ){
            return false;
        }
        this._OnChangeCallEventListeners.push( function_ );
        return true;
    }

    removeOnChangeCallEventListener(function_ ){
        const removedIndex = Util.removeItemFromArray( this._OnChangeCallEventListeners, function_ );
        return removedIndex;
    }

    clearOnChangeCallEventListeners(){
        this._OnChangeCallEventListeners.splice(0);
    }

    updateCall = (call) => {
        if (!call) return;

        const callById = {...this.callById};
        setProperty(callById, call.id, {
            ...(this.callById[call.id] || {}),
            id: call.id,
            pbxTenant: call.pbxTenant,
            pbxTalkerId: call.pbxTalkerId,
            pbxRoomId: call.pbxRoomId,
            createdAt: call.createdAt,
            answeredAt: call.answeredAt,
            partyName: call.partyName,
            partyNumber: call.partyNumber,
            incoming: call.incoming,
            answered: call.answered,
            holding: call.holding,
            toggleHoldWithCheck: call.toggleHoldWithCheck,
            hangupWithUnhold: call.hangupWithUnhold,
            answer: call.answer,
            toggleRecording: call.toggleRecording,
            toggleMuted: call.toggleMuted,
            _isExtension: !!this.state.extensions.find((ext) => ext.id == call.partyNumber),
        });
        this.callById = callById;
        this.setState({callById});


        this._onUpdateCall( call );
    }

    _onUpdateCall( call  ){
        const options = {
            call:call,
        };
        //this._BusylightStatusChanger.onUpdateCall( options );   //!dev
        for(let i = 0; i < this._OnUpdateCallEventListeners.length; i++ ){
            const event = this._OnUpdateCallEventListeners[i];
            event( options );   //!forBug need tryCatch?
        }
    }

    setOnUpdateCallEventListener(function_ ){
        const index = this._OnUpdateCallEventListeners.indexOf( function_ );
        if( index !== -1 ){
            return false;
        }
        this._OnUpdateCallEventListeners.push( function_ );
        return true;
    }

    removeOnUpdateCallEventListener( function_ ){
        const removedIndex = Util.removeItemFromArray( this._OnUpdateCallEventListeners, function_ );
        return removedIndex;
    }

    clearOnUpdateCallEventListeners(){
        this._OnUpdateCallEventListeners.splice(0);
    }

    toggleCallRecording = () => {
        const currentCall = this.getCurrentCall();
        if (currentCall) {
            currentCall.toggleRecording();
        }
    }

    toggleCallMuted = () => {
        const currentCall = this.getCurrentCall();
        if (currentCall) {
            currentCall.toggleMuted();
        }
    }

    toggleAutoRejectIncoming = () => {
        this.setState({autoRejectIncoming: !this.state.autoRejectIncoming});
    }

    resumeCall = () => {
        const currentCall = this.getCurrentCall();
        if (currentCall && currentCall.holding) {
            currentCall.toggleHoldWithCheck();
        }
    }

    holdCall = () => {
        const currentCall = this.getCurrentCall();
        if( !currentCall ){
            return false;
        }
        if( currentCall.holding ){
            return false;
        }

        const status = OCUtil.getCallStatusFromBrOCCallObject( currentCall );
        if( status === BROC_BROCCALLOBJECT_CALL_STATUSES.calling || status === BROC_BROCCALLOBJECT_CALL_STATUSES.incoming ){
            return false;
        }

        currentCall.toggleHoldWithCheck();
        this.setState({dialing: ''});
    }

    hangUpCall = () => {
        const currentCall = this.getCurrentCall();
        if (currentCall) {
            currentCall.hangupWithUnhold();
        }
    }

    answerCall = () => {
        const currentCall = this.getCurrentCall();
        if (currentCall && !currentCall.answered) {
            currentCall.answer();
            const callerNo = currentCall.partyNumber;
            this._CallHistory.addCallNoAndSave(callerNo);
        }
    }

    _transferDialingCall = async () => {
        const mode = undefined; //use attended
        this.transferCall( this.dialing, mode ).then( () => {
            this._clearDialing(); //!todo I want to run it after the transfer is complete.
        } );
    }

    transferCall = async ( dialing, mode ) => {
        const currentCall = this.getCurrentCall();
        if (!currentCall) {
            return;
        }
        const tenant = currentCall.pbxTenant;
        const talkerId = currentCall.pbxTalkerId;
        await this.transferCallCore( dialing, mode, talkerId, tenant );
    }

    transferCallCore = async ( dialing, mode, talkerId, tenant, onDoneFunc  ) => {
        if (this.pal && dialing ) {
            await this.pal.call_pal("transfer", {
                tenant: tenant,
                user: dialing,
                tid: talkerId,
                mode:mode
            }).then((message) => {
                console.log("transferCallCore. result message=" + message );
                if( onDoneFunc ){
                    onDoneFunc( this, message );
                }
            }).catch((err) => {
                console.error("Failed to transfer call.", err );
                Notification.error({message: i18n.t('failed_to_transfer_call')});
                throw err;
            });
        }
    }

    sendDTMF = (key) => {
        const currentCall = this.getCurrentCall();
        if (this.pal && currentCall) {
            this.pal.call_pal('sendDTMF', {
                signal: key,
                tenant: currentCall.pbxTenant,
                talker_id: currentCall.pbxTalkerId,
            })
        }
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
        await this.makeCall(context);
    }

    findCallByTalkerId= ( talkerId  ) =>{
        const calls = Object.values( this.callById );
        const itm = calls.find( ( element ) =>{
            if( element.pbxTalkerId === talkerId ){
                return true;
            }
            return false;
        });
        return itm;
    }

    makeCall2 = async (currentCallIndex, callIds = [], callById = {}) => {

        // if( this.state.isCalling === true ){
        //     return false;
        // }

        // const currentCall = callById[callIds[currentCallIndex]];
        // if (currentCall) {
        //     return;
        // }

        const sDialing = this.state.dialing;
        if (!sDialing) {
            return false;
        }

        console.log("makeCall: sDialing=" + sDialing);
        if (this.phone) {

            this._CallHistory.addCallNoAndSave(sDialing);

            if (this.state.usingLine) {
                this.phone.call(sDialing, {
                    extraHeaders: [`X-PBX-RPI: ${this.state.usingLine}`]
                });
            } else {
                this.phone.call(sDialing);
            }

            this._clearDialing();
            if (this.state.currentScreenQuickCallWidget) {
                this._setDisplayState(brOcDisplayStates.showScreen, {currentScreenQuickCallWidget: null});
            }
            //this.setState({isCalling:true});
            return true;
        }
        return false;

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

    makeCall = async (context = {}) => {
        const {currentCallIndex, callIds = [], callById = {}} = context;
        await this.makeCall2(currentCallIndex, callIds, callById);

    }

    handleLine = async (line) => {
        const {line_talker = '', room_id = ''} = this.state.linesStatus[line] || {};
        const park = this.state.parksStatus[line];
        if (park) {
            this.phone.call(line);
            return;
        }

        const lineCall = Object.values(this.state.callById).find((call) => call.pbxRoomId === room_id)
        if (lineCall) {
            if (lineCall.incoming && !lineCall.answered) {
                const currentCall = this.getCurrentCall();
                if (currentCall && currentCall.id !== lineCall.id) {
                    this.holdCall();
                    const currentCallIndex = this._getCurrentCallIndex();
                    this._setCurrentCallIndex( currentCallIndex + 1 );
                }
                lineCall.answer();

            } else if (lineCall.answered) {
                await this.pal.call_pal('park', {
                    tenant: this.state.loginUser.pbxTenant,
                    tid: lineCall.pbxTalkerId,
                    number: line,
                }).catch((err) => {
                    console.error("Failed to park call.", err );
                    Notification.error({message: i18n.t('failed_to_park_call')});
                    throw err;
                });
                const myParksStatus = {...this.state.myParksStatus, [line]: true};
                this.setState({myParksStatus});
            }

            return;
        }

        if (line_talker) {
            if (line_talker === this.state.loginUser.pbxUsername) {
                await this.pal.call_pal('line', {line, status: 'off'}).catch((err) => {
                    console.error("Failed to unhold line.", err );
                    Notification.error({message: i18n.t('failed_to_unhold_line')});
                    throw err;
                });
                this.setState({usingLine: ''});
            }
        } else {
            if (this.state.usingLine) {
                await this.pal.call_pal('line', {line: this.state.usingLine, status: 'off'}).catch((err) => {
                    console.error("Failed to unhold line.", err );
                    Notification.error({message: i18n.t('failed_to_unhold_line')});
                    throw err;
                });
                this.setState({usingLine: ''});
            }
            await this.pal.call_pal('line', {line, status: 'on'}).catch((err) => {
                console.error("Failed to hold line.", err );
                Notification.error({message: i18n.t('failed_to_hold_line')});
                throw err;
            });
            this.setState({usingLine: line});
        }
    }

    handlePark = async (number) => {
        if (!number) return;

        if (this.state.parksStatus[number]) {
            this.holdCall();
            this.phone.call(number);
            return;
        }

        const currentCall = this.getCurrentCall();
        if (currentCall) {
            await this.pal.call_pal('park', {
                tenant: this.state.loginUser.pbxTenant,
                tid: currentCall.pbxTalkerId,
                number,
            }).catch((err) => {
                console.error("Failed to park call.", err );
                Notification.error({message: i18n.t('failed_to_park_call')});
                throw err;
            });

            const myParksStatus = {...this.state.myParksStatus, [number]: true};
            this.setState({myParksStatus});
        }
    }

    statusEvents = [];
    flushStatusEvents = debounce(() => {
        console.log('pal.notify_status', this.statusEvents);
        this._flushExtensionStatusEvents();
        //this._flushLineStatusEvents();
        this.statusEvents = [];
    }, 250)
    // statusEvents = [];
    // flushStatusEvents = () => {
    //     console.log('pal.notify_status', this.statusEvents);
    //     this._flushExtensionStatusEvents();
    //     //this._flushLineStatusEvents();
    //     this.statusEvents = [];
    // };



    // _flushLineStatusEvents() {
    //
    // }

    _flushExtensionStatusEvents(){
        let extensionsStatus = {...this.state.extensionsStatus};
        let monitoringExtension = this.state.monitoringExtension;

        for (const e of this.statusEvents) {
            //this.old_notify_status && this.old_notify_status(e)

            let status = 'hanging';
            switch (e.status) {
                case '14':
                case '2':
                case '36':
                    status = 'talking';
                    break;
                case '35':
                    status = 'holding';
                    break;
                case '-1':
                    status = 'hanging';
                    break;
                case '1':
                    status = 'calling';
                    break;
                case '65':
                    status = 'ringing';
                    break;
                default:
                    break;
            }

            // //!temp
            // const callById = this.state.callById;
            // const call = Object.values(this.state.callById).find(
            //     (call) => {
            //         //const b = call.pbxRoomId === e.room_id && call.pbxTalkerId === e.talker_id;
            //         const b = call.pbxRoomId === e.room_id;
            //         if( call.pbxRoomId ){
            //             console.log( "//!temp call.pbxRoomId=" + call.pbxRoomId );
            //         }
            //         return b;
            //     }
            // );
            // if( call ) {
            //     const callIndex = this.state.callIds.indexOf(call.id);
            //     const temp = 0; //!temp
            // }

            const path = `${e.user}.callStatus.${e.talker_id}`;
            if (status === 'hanging') {
                deleteProperty(extensionsStatus, path  );
                if (e.user === monitoringExtension) {
                    monitoringExtension = '';
                }
                this._ExtensionsStatus.onDeleteExtensionStatusProperty( this, extensionsStatus, path, status, e );
            } else {
                setProperty(extensionsStatus, path, status);
                this._ExtensionsStatus.onSetExtensionStatusProperty( this, extensionsStatus, path, status, e );
            }

            const options = {
                event : e
            }
            this._onPalNotifyStatus(options);
        }

        this.setState({ extensionsStatus, monitoringExtension });


    }


    lineEvents = [];
    flushLineEvents = debounce(() => {
        console.log('pal.notify_line', this.lineEvents);

        let linesStatus = {...this.state.linesStatus};
        let usingLine = this.state.usingLine;

        for (const e of this.lineEvents) {
            this.old_notify_line && this.old_notify_line(e)

            if (e.status == 'on') {
                linesStatus[e.line] = e;
            } else if (e.status == 'off') {
                deleteProperty(linesStatus, e.line);
                usingLine = usingLine === e.line ? '' : usingLine;
            }
        }

        this.setState({ linesStatus, usingLine });
        this.lineEvents = [];

    }, 250)

    parkEvents = [];
    flushParkEvents = debounce(() => {
        console.log('pal.notify_park', this.parkEvents);

        const parksStatus = {...this.state.parksStatus};
        const myParksStatus = {...this.state.myParksStatus};

        for (const e of this.parkEvents) {
            this.old_notify_park && this.old_notify_park(e)

            if (e.status == 'on') {
                parksStatus[e.park] = e;
            } else if (e.status == 'off') {
                deleteProperty(parksStatus, e.park);
                deleteProperty(myParksStatus, e.park);
            }

            this.setState({ parksStatus, myParksStatus });
            this.parkEvents = [];
        }

    }, 250)

    _onBeforeUnload(event){
        event.preventDefault();
        event.returnValue = 'Check';
    }

    _onUnload(event){
        console.log("OperatorConsole:beforeUnload. this.phone=" + this.phone );

        // remove listener individually
        this.phone.removeListener('pal.notify_line', this.notify_line);
        // remove all listeners for this event
        this.phone.removeAllListeners('pal.notify_line');

        // remove listener individually
        this.phone.removeListener('pal.notify_status', this.notify_status);
        // remove all listeners for this event
        this.phone.removeAllListeners('pal.notify_status');

        // remove listener individually
        this.phone.removeListener('pal.notify_serverstatus', this.notify_serverstatus);
        // remove all listeners for this event
        this.phone.removeAllListeners('pal.notify_serverstatus');

        this.phone.cleanup();
    }


    login = (params) => {
        console.log('login:', params);

        const lastLoginAccount = {
            hostname: params.hostname,
            port: params.port,
            tenant: params.tenant,
            username: params.username,
            password: params.password
        };
        this.setState({lastLoginAccount: lastLoginAccount});
        window.localStorage.setItem('lastLoginAccount', JSON.stringify( lastLoginAccount));

        const eBrOcPhone = document.getElementById('brOCPhone');
        const args = {
            autoLogin: true,
            clearExistingAccounts: true,
            palEvents: [
                'notify_serverstatus',
                'onClose',
                'onError',
                'notify_status',
                'notify_line',
                'notify_park'
                // ...
            ],
            accounts: [ params ],
            'webphone.pal.param.user': '*',
            'webphone.pal.param.line': '*',
            'webphone.pal.param.park': '*',
        };

        this.phone = window.Brekeke.Phone.render(eBrOcPhone, args);

        this.phone.on('call', c => {
            console.log('call', c);
            this._onPhoneCall( this.phone, c );
        })
        this.phone.on('call_update', c => {
            console.log('call_update', c);
            this.updateCall(c);
        })
        this.phone.on('call_end', c => {
            console.log('call_end', c)
            this.removeCall(c);
        })
        this.notify_serverstatus = e => {
            console.log('pal.notify_serverstatus', e);

            if (e?.status === 'active' ) {
                this._initialize( this.account, this.pal );   //initialize
            }
            this._Campon.onPalNotifyServerstatus( this, e );
        }
        this.phone.on("pal.notify_serverstatus", this.notify_serverstatus );


        this.phone.on('pal', ( pal) => {
            window.addEventListener("beforeunload",  this._onBeforeUnload );

            this. account = this.phone.getCurrentAccount();
            console.log('account', this.account)
            console.log('pal', pal)

            //Notification.close('reconnecting'); //!commentout close not found.

            if (this.pal !== pal) {
                this.pal = pal;

                this.notify_status = e => {
                    console.log('pal.notify_status', e)
                    if (e) {
                        this.statusEvents.push(e);
                        this.flushStatusEvents();

                    }
                }

                //this.old_notify_status = pal.notify_status
                //pal.notify_status = this.notify_status;
                this.phone.on('pal.notify_status', this.notify_status);

                // NOTE: currently unused, Shin said registered events are not ready yet
                // var old_notify_registered = pal.notify_registered
                // pal.notify_registered = e => {
                //   old_notify_registered && old_notify_registered(e)
                //   if (e) {
                //     this.setState({
                //       extensionsStatus: {
                //         ...(this.state.extensionsStatus || {}),
                //         [e.user]: {
                //           ...(this.state.extensionsStatus?.[e.user] || {}),
                //           registered: e.registered == 'true',
                //         }
                //       }
                //     })
                //   }
                // }

                //this.old_notify_line = pal.notify_line
                this.notify_line = e => {
                    console.log('pal.notify_line', e)
                    if (e) {
                        this.lineEvents.push(e);
                        this.flushLineEvents();
                    }
                }
                //pal.notify_line = this.notify_line;
                this.phone.on("pal.notify_line", this.notify_line );

                //this.old_notify_park = pal.notify_park;
                this.notify_park = e => {
                    console.log('pal.notify_park', e)
                    if (e) {
                        this.parkEvents.push(e);
                        this.flushParkEvents();
                    }
                }
                //pal.notify_park = this.notify_park;
                this.phone.on("pal.notify_park", this.notify_park );

                const old_onError = pal.onError;
                pal.onError = e => {
                    console.log('pal.onError', e)
                    old_onError && old_onError(e) // call old listener
                }

                // const old_notify_serverstatus = pal.notify_serverstatus
                // pal.notify_serverstatus = e => {
                //     console.log('pal.notify_serverstatus', e);
                //     old_notify_serverstatus && old_notify_serverstatus(e) // call old listener
                //
                //     if (e?.status === 'active' ) {
                //         this._initialize( account, pal );   //initialize
                //     }
                //     this._Campon.onPalNotifyServerstatus( this, e );
                // }

                let old_onClose = pal.onClose
                pal.onClose = e => {
                    console.log('pal.onClose', e)
                    old_onClose && old_onClose(e) // call old listener
                    if (!e.wasClean) {
                        Notification.warning({ key: 'reconnecting', message: i18n.t('reconnecting_pbx'), duration: 20 });
                    }
                }
            }

            //this._initialize( account, pal );   //initialize  for new webphone 2023/04/10~
        } /* ~this.phone.on( */ )  //~this.phone.on
    } //~login

    _onPalNotifyStatus( options ){
        for(let i = 0; i < this._OnPalNotifyStatusEventListeners.length; i++ ){
            const event = this._OnPalNotifyStatusEventListeners[i];
            event( options );   //!forBug need tryCatch?
        }
    }

    setOnPalNotifyStatusEventListener(function_ ){
        const index = this._OnPalNotifyStatusEventListeners.indexOf( function_ );
        if( index !== -1 ){
            return false;
        }
        this._OnPalNotifyStatusEventListeners.push( function_ );
        return true;
    }

    removeOnPalNotifyStatusEventListener( function_ ){
        const removedIndex = Util.removeItemFromArray( this._OnPalNotifyStatusEventListeners, function_ );
        return removedIndex;
    }

    clearOnPalNotifyStatusEventListeners(){
        this._OnPalNotifyStatusEventListeners.splice(0);
    }

    _setOCNoteFailAtDownLayoutAndSystemSettings( eventArg, downLayoutAndSystemSettingsFailFunction  ) {
        let message = eventArg ? eventArg.message : "";
        if (!message) {
            message = "";
        }
        console.error("Failed to setOCNote.", message);
        if (message) {
            Notification.error({message: message});
        }
        //throw new Error(message);

        //console.warn("Failed to getNote." , err );
        //this.setState({ error: true })
        //this.setState( { error:true, _downedLayoutAndSystemSettings:true, displayState:bcOcDisplayStates.noScreens } );   //!need?
        this._removeLastLayoutShortname();  //!reset
        this.setState({displayState: brOcDisplayStates.noScreens}, () => downLayoutAndSystemSettingsFailFunction() );
        //throw err;
    }

    _downLayoutAndSystemSettings( downLayoutAndSystemSettingsSuccessFunction, downLayoutAndSystemSettingsFailFunction ){
        if( !this.pal || this.state._downedLayoutAndSystemSettings ){
            downLayoutAndSystemSettingsFailFunction({message:i18n.t("CouldNotDownloadLayoutAndSystemSettings")});
            return false;
        }

        const this_ = this;
        const layoutShortname = this._getLastLayoutShortname();
        if( layoutShortname ) {
            const layoutFullname = this._getLayoutFullname( layoutShortname );
            this.getNote( layoutFullname )
                .then(( noteInfo ) => {
                    const sNote = noteInfo.note;
                    const oNote = JSON.parse( sNote );
                    this.setOCNote( layoutShortname, oNote, function(){
                            this_.setState( { _downedLayoutAndSystemSettings:true }, ()=> downLayoutAndSystemSettingsSuccessFunction() );
                    },
                        function(eventArg){
                            this_._setOCNoteFailAtDownLayoutAndSystemSettings( eventArg, downLayoutAndSystemSettingsFailFunction  );
                        });
                })
                // .catch((err) => {
                //     console.warn("Failed to getNote." , err );
                //     //this.setState({ error: true })
                //     //this.setState( { error:true, _downedLayoutAndSystemSettings:true, displayState:bcOcDisplayStates.noScreens } );   //!need?
                //     this._removeLastLayoutShortname();  //!reset
                //     this.setState( {  displayState:brOcDisplayStates.noScreens } );
                //     //throw err;
                // });
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


    _initialize( account, pal  ){
        if( this.state.palReady ) {
            console.log("Skip initialize.");
            return;
        }
        this._RootURLString = Util.getRootUrlString();
        this._onUnloadFunc = (event) => { this._onUnload( event )};
        window.addEventListener("unload", this._onUnloadFunc );

        // prompt for permission if needed
        //this.phone.promptBrowserPermission();

        // or if we manually show the prompt, we can accept the permission on user click
        this.phone.acceptBrowserPermission();
        BREKEKE_OPERATOR_CONSOLE = this;
        this._defaultSystemSettingsData = new SystemSettingsData( this );



        pal.call_pal('getExtensions', {
            tenant: account.pbxTenant,
            pattern: '..*',
            limit: -1,
            type: 'user',
            property_names: ['name'],
        }).then(extensions => {
            console.log('extensions', extensions);
            this.setState({ extensions: extensions.map(([id,name]) => ({id,name})) })
        })

        let bReadyExtensionProperties = false;
        pal.call_pal('getExtensionProperties', {
            tenant: account.pbxTenant,
            extension: [account.pbxUsername],
            property_names: ['language','admin'],
        }).then(extensionProps => {
            const locale = extensionProps?.[0]?.[0];
            i18n.locale = isValidLocale(locale) ? locale : DEFAULT_LOCALE;

            const sIsAdmin = extensionProps?.[0]?.[1];
            const t = typeof sIsAdmin;

            let isAdmin = false;
            if ( typeof( sIsAdmin ) === "string" ){
                isAdmin = JSON.parse(sIsAdmin.toLowerCase());
            }
            this._setIsAdmin( isAdmin );
            bReadyExtensionProperties = true;
        }).catch(err => {
            i18n.locale = DEFAULT_LOCALE;
            console.error('Failed to getExtensionProperties', err);
            const msg = i18n.t("failed_to_load_data_from_pbx",) + " " +  err;
            Notification.error({message:msg, duration:0});
        });

        const readyExtensionPropertiesTimelimit = Date.now() + 20000;
        const setIntervalId = setInterval( () => {
            if(  Date.now() > readyExtensionPropertiesTimelimit  ){
                clearInterval( setIntervalId );
                return;
            }
            if( bReadyExtensionProperties !== true ){
                return;
            }
            clearInterval( setIntervalId );
            const this_ = this;
            this.setState({
                loginUser: account,
                palReady: true,
                systemSettingsData: new SystemSettingsData(this)
            }, () => {
//            this.syncDownScreens();
//            this._syncDownLayout();
                this._downLayoutAndSystemSettings(
                    function(){

                    },
                    function(){

                    }
                );
            });
        }, 500  );



    }

    getAdminExtensionPropertiesFromPal(){
        const promise = this._getAdminExtensionPropertiesFromPal( this.pal, this.state.loginUser );
        return promise;
    }

    getIsAdmin(){
        return this.state.isAdmin;
    }

    _setIsAdmin(bool){
        this.setState({isAdmin:bool});
    }

    getOCNoteNamesPromise(){
        const account = this.state.loginUser;
        const promise = this.pal.call_pal("getNoteNames", {
            tenant: account?.pbxTenant,
            filter: BrekekeOperatorConsole.LAYOUT_NOTE_NAME_FILTER
        });
        return promise;
    }


    _getAdminExtensionPropertiesFromPal( pal, account ){
        const promise = this.pal.call_pal("getExtensionProperties", {
            tenant: account?.pbxTenant,
            extension: [ account?.pbxUsername],
            property_names: ["admin"]
        });
        return promise;
    }

    getExtensions(){
        return this.state.extensions; //!check use cache
    }

    getPal = () => this.pal;

    logout = () => {
        this._Campon.onBeginLogout(this);

        // remove listener individually
        this.phone.removeListener('pal.notify_status', this.notify_status )
        // remove all listeners for this event
        this.phone.removeAllListeners('pal.notify_status');

        // remove listener individually
        this.phone.removeListener('pal.notify_serverstatus', this.notify_serverstatus);
        // remove all listeners for this event
        this.phone.removeAllListeners('pal.notify_serverstatus');

        window.removeEventListener("beforeunload", this._onBeforeUnload  );
        if( this._onUnloadFunc ) {
            window.removeEventListener("unload", this._onUnloadFunc);
        }
        this.phone.cleanup();
        //this._Campon.onBeginLogout(this); //!old location
        //this._BusylightStatusChanger.deinit();  //!dev
        this._onUnloadExtensionScript();
        this._UccacWrapper.deinitUccacWrapper();
        this.setState({
            ...window.structuredClone(INIT_STATE),
            i18nReady: true,
            locale: this.state.locale
        });
    }

    syncUp = async () => {
        if (!this.pal) return;

        const [err] = await this.pal.call_pal('setAppData', {
            data_id: PBX_APP_DATA_NAME,
            data: {
                version: PBX_APP_DATA_VERSION,
                screens: this.state.screens,
            }
        }).then((data) => ([null, data]))
            .catch((err) => ([err, null]));

        if (err) {
            console.error(err);
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
            return;
        }

        Notification.success({ key: 'sync', message: i18n.t("saved_data_to_pbx_successfully") });
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

    getNoteNames = () => {
        return this.pal.call_pal('getNoteNames', {
            tenant: this.state.loginUser?.pbxTenant,
        })
    }
    getNote = (name) => {
        return this.pal.call_pal('getNote', {
            tenant: this.state.loginUser?.pbxTenant,
            name,
        })
    }
    setNoteByPal = async(name, content) => {
        return this.pal.call_pal('setNote', {
            tenant: this.state.loginUser?.pbxTenant,
            name,
            note: content,
        })
    }

    getOCNote = ( shortName ) => {
        const noteName = BrekekeOperatorConsole.getOCNoteName( shortName );
        const note = this.getNote( noteName );
        return note;
    }

    setOCNoteByPal = async (shortName, content ) =>{
        const noteName = BrekekeOperatorConsole.getOCNoteName( shortName );
        const noteResultPromise = this.setNoteByPal(noteName, content);
        return noteResultPromise;
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

    _onSetSystemSettingsDataDataSuccessAtSetOCNote( screens, systemSettingsData, setLastLayoutShortName, shortName, setOCNoteSuccessFunction){
        this.setState( {screens:screens, systemSettingsData:systemSettingsData }, () =>{
            //this._BusylightStatusChanger.onBeforeReloadBusylightStatusChanger( );  //!dev
            this.reloadSystemSettingsExtensionScript();
            //this._BusylightStatusChanger.init();    //!dev
            if( setLastLayoutShortName ) {
                this.setLastLayoutShortname(shortName);
            }
            setOCNoteSuccessFunction();
        } );
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
            //!TODO versioning    //!later
            //return i18n.t("DataVersionMismatch");
            setOCNoteFailFunction({message:i18n.t("DataVersionMismatch")});
            return false;
        }

        const screens = oContent.screens;
        const systemSettingsDataData = oContent.systemSettings;
        const systemSettingsData = this.state.systemSettingsData;
        if( skipSetSystemSettingsDataData === false ) {
            const this_ = this;
            const bStartInit = systemSettingsData.setSystemSettingsDataData(systemSettingsDataData,
                function(){
                    this_._onSetSystemSettingsDataDataSuccessAtSetOCNote( screens, systemSettingsData, setLastLayoutShortName, shortName, setOCNoteSuccessFunction );
                },
                function(){
                    setOCNoteFailFunction();
                });
            return bStartInit;
        }
        else{
            this._onSetSystemSettingsDataDataSuccessAtSetOCNote( screens, systemSettingsData, setLastLayoutShortName, shortName, setOCNoteSuccessFunction);
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

    getCallsById(){
        return this.callById;
    }
}
let BREKEKE_OPERATOR_CONSOLE;

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


