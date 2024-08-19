import React from "react";
import LegacyButtonEditorWidget from "./LegacyButtonEditorWidget";
import CallPanelEditorWidget from "./CallPanelEditorWidget";
import WidgetData from "../../../data/widgetData/WidgetData";
import LegacyButtonWidgetSubData from "../../../../data/widgetData/legacyButtonWidgetSubData/LegacyButtonWidgetSubData";
import LegacyButtonEditorSubWidget_dummyButton from "./LegacyButtonEditorSubWidget_dummyButton";
import LegacyButtonEditorSubWidget_callTalkingButton from "./LegacyButtonEditorSubWidget_callTalkingButton";
import LegacyButtonEditorSubWidget_noAnswerButton from "./LegacyButtonEditorSubWidget_noAnswerButton";
import LegacyButtonEditorSubWidget_callbackButton from "./LegacyButtonEditorSubWidget_callbackButton";
import LegacyButtonEditorSubWidget_transferButton from "./LegacyButtonEditorSubWidget_transferButton";
import LegacyButtonEditorSubWidget_toggleRecordingButton from "./LegacyButtonEditorSubWidget_toggleRecordingButton";
import LegacyButtonEditorSubWidget_alarmButton from "./LegacyButtonEditorSubWidget_alarmButton";
import LegacyButtonEditorSubWidget_prevCallButton from "./LegacyButtonEditorSubWidget_prevCallButton";
import LegacyButtonEditorSubWidget_monitorDialingExtensionButton
    from "./LegacyButtonEditorSubWidget_monitorDialingExtensionButton";
import LegacyButtonEditorSubWidget_stationLineDesignationButton
    from "./LegacyButtonEditorSubWidget_stationLineDesignationButton";
import LegacyButtonEditorSubWidget_parkCallButton from "./LegacyButtonEditorSubWidget_parkCallButton";
import LegacyButtonEditorSubWidget_seriesSetButton from "./LegacyButtonEditorSubWidget_seriesSetButton";
import LegacyButtonEditorSubWidget_monitoringCallButton from "./LegacyButtonEditorSubWidget_monitoringCallButton";
import LegacyButtonEditorSubWidget_startButton from "./LegacyButtonEditorSubWidget_startButton";
import LegacyButtonEditorSubWidget_toggleMutedButton from "./LegacyButtonEditorSubWidget_toggleMutedButton";
import LegacyButtonEditorSubWidget_leavingSeatButton from "./LegacyButtonEditorSubWidget_leavingSeatButton";
import LegacyButtonEditorSubWidget_nightTimeButton from "./LegacyButtonEditorSubWidget_nightTimeButton";
import LegacyButtonEditorSubWidget_availableButton from "./LegacyButtonEditorSubWidget_availableButton";
import LegacyButtonEditorSubWidget_nextCallButton from "./LegacyButtonEditorSubWidget_nextCallButton";
import LegacyButtonEditorSubWidget_lineButton from "./LegacyButtonEditorSubWidget_lineButton";
import LegacyButtonEditorSubWidget_keypadButton from "./LegacyButtonEditorSubWidget_keypadButton";
import LegacyButtonEditorSubWidget_makeCallButton from "./LegacyButtonEditorSubWidget_makeCallButton";
import LegacyButtonEditorSubWidget_backspaceButton from "./LegacyButtonEditorSubWidget_backspaceButton";
import LegacyButtonEditorSubWidget_incomingCallButton from "./LegacyButtonEditorSubWidget_incomingCallButton";
import LegacyButtonEditorSubWidget_threeWayCallButton from "./LegacyButtonEditorSubWidget_threeWayCallButton";
import LegacyButtonEditorSubWidget_outgoingCallButton from "./LegacyButtonEditorSubWidget_outgoingCallButton";
import LegacyButtonEditorSubWidget_hangUpCallButton from "./LegacyButtonEditorSubWidget_hangUpCallButton";
import LegacyButtonEditorSubWidget_unholdCallButton from "./LegacyButtonEditorSubWidget_unholdCallButton";
import LegacyButtonEditorSubWidget_holdCallButton from "./LegacyButtonEditorSubWidget_holdCallButton";
import LegacyButtonEditorSubWidget_pickUpCallButton from "./LegacyButtonEditorSubWidget_pickUpCallButton";
import LegacyButtonEditorSubWidget_quickCallButton from "./LegacyButtonEditorSubWidget_quickCallButton";
import LegacyButtonEditorSubWidget_autoDialButton from "./LegacyButtonEditorSubWidget_autoDialButton";
import LegacyButtonEditorSubWidget_oneTouchDialButton from "./LegacyButtonEditorSubWidget_oneTouchDialButton";

export default class LegacyButtonEditorSubWidgetFactory  {

    //!private
    constructor() {
    }

    static getStaticLegacyButtonEditorSubWidgetFactoryInstance(){
        return _INSTANCE;
    }

    newLegacyButtonEditorSubWidget( legacyButtonEditorWidgetAsParent, widgetSubData  ){

        // const dataObject = {};
        // widgetData.setWidgetDataToObject( dataObject );
        // dataObject["editorPaneAsParent"] = editorPaneAsParent;
        //dataObject["editorTabFunctionComponentAsParent"] = editorTabFunctionComponentAsParent;
        const widgetSubTypeId = widgetSubData.getLegacyButtonWidgetSubTypeId();
        let legacyButtonEditorSubWidget;
        switch( widgetSubTypeId ){
            case LegacyButtonWidgetSubData.LEGACY_BUTTON_WIDGET_SUBTYPE_IDS.dummy:
                legacyButtonEditorSubWidget = new LegacyButtonEditorSubWidget_dummyButton( legacyButtonEditorWidgetAsParent, widgetSubData );
                break;
            case LegacyButtonWidgetSubData.LEGACY_BUTTON_WIDGET_SUBTYPE_IDS.callTalking:
                legacyButtonEditorSubWidget = new LegacyButtonEditorSubWidget_callTalkingButton( legacyButtonEditorWidgetAsParent, widgetSubData );
                break;
            case LegacyButtonWidgetSubData.LEGACY_BUTTON_WIDGET_SUBTYPE_IDS.noAnswer:
                legacyButtonEditorSubWidget = new LegacyButtonEditorSubWidget_noAnswerButton( legacyButtonEditorWidgetAsParent, widgetSubData );
                break;
            case LegacyButtonWidgetSubData.LEGACY_BUTTON_WIDGET_SUBTYPE_IDS.callback:
                legacyButtonEditorSubWidget = new LegacyButtonEditorSubWidget_callbackButton( legacyButtonEditorWidgetAsParent, widgetSubData );
                break;
            case LegacyButtonWidgetSubData.LEGACY_BUTTON_WIDGET_SUBTYPE_IDS.transfer:
                legacyButtonEditorSubWidget = new LegacyButtonEditorSubWidget_transferButton( legacyButtonEditorWidgetAsParent, widgetSubData );
                break;
            case LegacyButtonWidgetSubData.LEGACY_BUTTON_WIDGET_SUBTYPE_IDS.toggleRecording:
                legacyButtonEditorSubWidget = new LegacyButtonEditorSubWidget_toggleRecordingButton( legacyButtonEditorWidgetAsParent, widgetSubData );
                break;
            case LegacyButtonWidgetSubData.LEGACY_BUTTON_WIDGET_SUBTYPE_IDS.alarm:
                legacyButtonEditorSubWidget = new LegacyButtonEditorSubWidget_alarmButton( legacyButtonEditorWidgetAsParent, widgetSubData );
                break;
            case LegacyButtonWidgetSubData.LEGACY_BUTTON_WIDGET_SUBTYPE_IDS.prevCall:
                legacyButtonEditorSubWidget = new LegacyButtonEditorSubWidget_prevCallButton( legacyButtonEditorWidgetAsParent, widgetSubData );
                break;
            case LegacyButtonWidgetSubData.LEGACY_BUTTON_WIDGET_SUBTYPE_IDS.monitorDialingExtension:
                legacyButtonEditorSubWidget = new LegacyButtonEditorSubWidget_monitorDialingExtensionButton( legacyButtonEditorWidgetAsParent, widgetSubData );
                break;
            case LegacyButtonWidgetSubData.LEGACY_BUTTON_WIDGET_SUBTYPE_IDS.stationLineDesignation:
                legacyButtonEditorSubWidget = new LegacyButtonEditorSubWidget_stationLineDesignationButton( legacyButtonEditorWidgetAsParent, widgetSubData );
                break;
            case LegacyButtonWidgetSubData.LEGACY_BUTTON_WIDGET_SUBTYPE_IDS.parkCall:
                legacyButtonEditorSubWidget = new LegacyButtonEditorSubWidget_parkCallButton( legacyButtonEditorWidgetAsParent, widgetSubData );
                break;
            case LegacyButtonWidgetSubData.LEGACY_BUTTON_WIDGET_SUBTYPE_IDS.seriesSet:
                legacyButtonEditorSubWidget = new LegacyButtonEditorSubWidget_seriesSetButton( legacyButtonEditorWidgetAsParent, widgetSubData );
                break;
            case LegacyButtonWidgetSubData.LEGACY_BUTTON_WIDGET_SUBTYPE_IDS.monitoringCall:
                legacyButtonEditorSubWidget = new LegacyButtonEditorSubWidget_monitoringCallButton( legacyButtonEditorWidgetAsParent, widgetSubData );
                break;
            case LegacyButtonWidgetSubData.LEGACY_BUTTON_WIDGET_SUBTYPE_IDS.start:
                legacyButtonEditorSubWidget = new LegacyButtonEditorSubWidget_startButton( legacyButtonEditorWidgetAsParent, widgetSubData );
                break;
            case LegacyButtonWidgetSubData.LEGACY_BUTTON_WIDGET_SUBTYPE_IDS.toggleMuted:
                legacyButtonEditorSubWidget = new LegacyButtonEditorSubWidget_toggleMutedButton( legacyButtonEditorWidgetAsParent, widgetSubData );
                break;
            case LegacyButtonWidgetSubData.LEGACY_BUTTON_WIDGET_SUBTYPE_IDS.leavingSeat:
                legacyButtonEditorSubWidget = new LegacyButtonEditorSubWidget_leavingSeatButton( legacyButtonEditorWidgetAsParent, widgetSubData );
                break;
            case LegacyButtonWidgetSubData.LEGACY_BUTTON_WIDGET_SUBTYPE_IDS.nightTime:
                legacyButtonEditorSubWidget = new LegacyButtonEditorSubWidget_nightTimeButton( legacyButtonEditorWidgetAsParent, widgetSubData );
                break;
            case LegacyButtonWidgetSubData.LEGACY_BUTTON_WIDGET_SUBTYPE_IDS.available:
                legacyButtonEditorSubWidget = new LegacyButtonEditorSubWidget_availableButton( legacyButtonEditorWidgetAsParent, widgetSubData );
                break;
            case LegacyButtonWidgetSubData.LEGACY_BUTTON_WIDGET_SUBTYPE_IDS.nextCall:
                legacyButtonEditorSubWidget = new LegacyButtonEditorSubWidget_nextCallButton( legacyButtonEditorWidgetAsParent, widgetSubData );
                break;
            case LegacyButtonWidgetSubData.LEGACY_BUTTON_WIDGET_SUBTYPE_IDS.line:
                legacyButtonEditorSubWidget = new LegacyButtonEditorSubWidget_lineButton( legacyButtonEditorWidgetAsParent, widgetSubData );
                break;
            case LegacyButtonWidgetSubData.LEGACY_BUTTON_WIDGET_SUBTYPE_IDS.keypad:
                legacyButtonEditorSubWidget = new LegacyButtonEditorSubWidget_keypadButton( legacyButtonEditorWidgetAsParent, widgetSubData );
                break;
            case LegacyButtonWidgetSubData.LEGACY_BUTTON_WIDGET_SUBTYPE_IDS.makeCall:
                legacyButtonEditorSubWidget = new LegacyButtonEditorSubWidget_makeCallButton( legacyButtonEditorWidgetAsParent, widgetSubData );
                break;
            case LegacyButtonWidgetSubData.LEGACY_BUTTON_WIDGET_SUBTYPE_IDS.backspace:
                legacyButtonEditorSubWidget = new LegacyButtonEditorSubWidget_backspaceButton( legacyButtonEditorWidgetAsParent, widgetSubData );
                break;
            case LegacyButtonWidgetSubData.LEGACY_BUTTON_WIDGET_SUBTYPE_IDS.incomingCall:
                legacyButtonEditorSubWidget = new LegacyButtonEditorSubWidget_incomingCallButton( legacyButtonEditorWidgetAsParent, widgetSubData );
                break;
            case LegacyButtonWidgetSubData.LEGACY_BUTTON_WIDGET_SUBTYPE_IDS.threeWayCall:
                legacyButtonEditorSubWidget = new LegacyButtonEditorSubWidget_threeWayCallButton( legacyButtonEditorWidgetAsParent, widgetSubData );
                break;
            case LegacyButtonWidgetSubData.LEGACY_BUTTON_WIDGET_SUBTYPE_IDS.outgoingCall:
                legacyButtonEditorSubWidget = new LegacyButtonEditorSubWidget_outgoingCallButton( legacyButtonEditorWidgetAsParent, widgetSubData );
                break;
            case LegacyButtonWidgetSubData.LEGACY_BUTTON_WIDGET_SUBTYPE_IDS.hangUpCall:
                legacyButtonEditorSubWidget = new LegacyButtonEditorSubWidget_hangUpCallButton( legacyButtonEditorWidgetAsParent, widgetSubData );
                break;
            case LegacyButtonWidgetSubData.LEGACY_BUTTON_WIDGET_SUBTYPE_IDS.unholdCall:
                legacyButtonEditorSubWidget = new LegacyButtonEditorSubWidget_unholdCallButton( legacyButtonEditorWidgetAsParent, widgetSubData );
                break;
            case LegacyButtonWidgetSubData.LEGACY_BUTTON_WIDGET_SUBTYPE_IDS.holdCall:
                legacyButtonEditorSubWidget = new LegacyButtonEditorSubWidget_holdCallButton( legacyButtonEditorWidgetAsParent, widgetSubData );
                break;
            case LegacyButtonWidgetSubData.LEGACY_BUTTON_WIDGET_SUBTYPE_IDS.pickUpCall:
                legacyButtonEditorSubWidget = new LegacyButtonEditorSubWidget_pickUpCallButton( legacyButtonEditorWidgetAsParent, widgetSubData );
                break;
            case LegacyButtonWidgetSubData.LEGACY_BUTTON_WIDGET_SUBTYPE_IDS.quickCall:
                legacyButtonEditorSubWidget = new LegacyButtonEditorSubWidget_quickCallButton( legacyButtonEditorWidgetAsParent, widgetSubData );
                break;
            case LegacyButtonWidgetSubData.LEGACY_BUTTON_WIDGET_SUBTYPE_IDS.autoDial:
                legacyButtonEditorSubWidget = new LegacyButtonEditorSubWidget_autoDialButton( legacyButtonEditorWidgetAsParent, widgetSubData );
                break;
            case LegacyButtonWidgetSubData.LEGACY_BUTTON_WIDGET_SUBTYPE_IDS.oneTouchDial:
                legacyButtonEditorSubWidget = new LegacyButtonEditorSubWidget_oneTouchDialButton( legacyButtonEditorWidgetAsParent, widgetSubData );
                break;
            default:
                throw new Error("The legacy button editor sub widget was not present. legacyButtonWidgetSubTypeId=" +widgetSubTypeId  );
        }
        return legacyButtonEditorSubWidget;
    }


}
const _INSTANCE = new LegacyButtonEditorSubWidgetFactory();