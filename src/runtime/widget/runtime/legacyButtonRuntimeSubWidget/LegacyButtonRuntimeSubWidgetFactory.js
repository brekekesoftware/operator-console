import LegacyButtonWidgetSubData from "../../../../data/widgetData/legacyButtonWidgetSubData/LegacyButtonWidgetSubData";
import LegacyButtonRuntimeSubWidget_dummyButton from "./LegacyButtonRuntimeSubWidget_dummyButton";
import LegacyButtonRuntimeSubWidget_callTalkingButton from "./LegacyButtonRuntimeSubWidget_callTalkingButton";
import LegacyButtonRuntimeSubWidget_noAnswerButton from "./LegacyButtonRuntimeSubWidget_noAnswerButton";
import LegacyButtonRuntimeSubWidget_callbackButton from "./LegacyButtonRuntimeSubWidget_callbackButton";
import LegacyButtonRuntimeSubWidget_transferButton from "./LegacyButtonRuntimeSubWidget_transferButton";
import LegacyButtonRuntimeSubWidget_toggleRecordingButton from "./LegacyButtonRuntimeSubWidget_toggleRecordingButton";
import LegacyButtonRuntimeSubWidget_alarmButton from "./LegacyButtonRuntimeSubWidget_alarmButton";
import LegacyButtonRuntimeSubWidget_prevCallButton from "./LegacyButtonRuntimeSubWidget_prevCallButton";
import LegacyButtonRuntimeSubWidget_monitorDialingExtensionButton
    from "./LegacyButtonRuntimeSubWidget_minitorDialingExtensionButton";
import LegacyButtonRuntimeSubWidget_stationLineDesignationButton
    from "./LegacyButtonRuntimeSubWidget_stationLineDesignationButton";
import LegacyButtonRuntimeSubWidget_parkCallButton from "./LegacyButtonRuntimeSubWidget_parkCallButton";
import LegacyButtonRuntimeSubWidget_seriesSetButton from "./LegacyButtonRuntimeSubWidget_seriesSetButton";
import LegacyButtonRuntimeSubWidget_monitoringCallButton from "./LegacyButtonRuntimeSubWidget_monitoringCallButton";
import LegacyButtonRuntimeSubWidget_startButton from "./LegacyButtonRuntimeSubWidget_startButton";
import LegacyButtonRuntimeSubWidget_toggleMutedButton from "./LegacyButtonRuntimeSubWidget_toggleMutedButton";
import LegacyButtonRuntimeSubWidget_leavingSeatButton from "./LegacyButtonRuntimeSubWidget_leavingSeatButton";
import LegacyButtonRuntimeSubWidget_nightTimeButton from "./LegacyButtonRuntimeSubWidget_nightTimeButton";
import LegacyButtonRuntimeSubWidget_availableButton from "./LegacyButtonRuntimeSubWidget_availableButton";
import LegacyButtonRuntimeSubWidget_nextCallButton from "./LegacyButtonRuntimeSubWidget_nextCallButton";
import LegacyButtonRuntimeSubWidget_lineButton from "./LegacyButtonRuntimeSubWidget_lineButton";
import LegacyButtonRuntimeSubWidget_keypadButton from "./LegacyButtonRuntimeSubWidget_keypadButton";
import LegacyButtonRuntimeSubWidget_makeCallButton from "./LegacyButtonRuntimeSubWidget_makeCallButton";
import LegacyButtonRuntimeSubWidget_backspaceButton from "./LegacyButtonRuntimeSubWidget_backspaceButton";
import LegacyButtonRuntimeSubWidget_incomingCallButton from "./LegacyButtonRuntimeSubWidget_incomingCallButton";
import LegacyButtonRuntimeSubWidget_threeWayCallButton from "./LegacyButtonRuntimeSubWidget_threeWayCallButton";
import LegacyButtonRuntimeSubWidget_outgoingCallButton from "./LegacyButtonRuntimeSubWidget_outgoingCallButton";
import LegacyButtonRuntimeSubWidget_hangUpCallButton from "./LegacyButtonRuntimeSubWidget_hangUpCallButton";
import LegacyButtonRuntimeSubWidget_unholdCallButton from "./LegacyButtonRuntimeSubWidget_unholdCallButton";
import LegacyButtonRuntimeSubWidget_holdCallButton from "./LegacyButtonRuntimeSubWidget_holdCallButton";
import LegacyButtonRuntimeSubWidget_pickUpCallButton from "./LegacyButtonRuntimeSubWidget_pickUpCallButton";
import LegacyButtonRuntimeSubWidget_quickCallButton from "./LegacyButtonRuntimeSubWidget_quickCallButton";
import LegacyButtonRuntimeSubWidget_autoDialButton from "./LegacyButtonRuntimeSubWidget_autoDialButton";
import LegacyButtonRuntimeSubWidget_oneTouchDialButton from "./LegacyButtonRuntimeSubWidget_oneTouchDialButton";

export default class LegacyButtonRuntimeSubWidgetFactory  {

    //!private
    constructor() {
    }

    static getStaticLegacyButtonRuntimeSubWidgetFactoryInstance(){
        return _INSTANCE;
    }

    newLegacyButtonRuntimeSubWidget( legacyButtonRuntimeWidgetAsParent, widgetSubData  ){

        // const dataObject = {};
        // widgetData.setWidgetDataToObject( dataObject );
        // dataObject["editorPaneAsParent"] = editorPaneAsParent;
        //dataObject["editorTabFunctionComponentAsParent"] = editorTabFunctionComponentAsParent;
        const widgetSubTypeId = widgetSubData.getLegacyButtonWidgetSubTypeId();
        let legacyButtonRuntimeSubWidget;
        switch( widgetSubTypeId ){
            case LegacyButtonWidgetSubData.LEGACY_BUTTON_WIDGET_SUBTYPE_IDS.dummy:
                legacyButtonRuntimeSubWidget = new LegacyButtonRuntimeSubWidget_dummyButton( legacyButtonRuntimeWidgetAsParent, widgetSubData );
                break;
            case LegacyButtonWidgetSubData.LEGACY_BUTTON_WIDGET_SUBTYPE_IDS.callTalking:
                legacyButtonRuntimeSubWidget = new LegacyButtonRuntimeSubWidget_callTalkingButton( legacyButtonRuntimeWidgetAsParent, widgetSubData );
                break;
            case LegacyButtonWidgetSubData.LEGACY_BUTTON_WIDGET_SUBTYPE_IDS.noAnswer:
                legacyButtonRuntimeSubWidget = new LegacyButtonRuntimeSubWidget_noAnswerButton( legacyButtonRuntimeWidgetAsParent, widgetSubData );
                break;
            case LegacyButtonWidgetSubData.LEGACY_BUTTON_WIDGET_SUBTYPE_IDS.callback:
                legacyButtonRuntimeSubWidget = new LegacyButtonRuntimeSubWidget_callbackButton( legacyButtonRuntimeWidgetAsParent, widgetSubData );
                break;
            case LegacyButtonWidgetSubData.LEGACY_BUTTON_WIDGET_SUBTYPE_IDS.transfer:
                legacyButtonRuntimeSubWidget = new LegacyButtonRuntimeSubWidget_transferButton( legacyButtonRuntimeWidgetAsParent, widgetSubData );
                break;
            case LegacyButtonWidgetSubData.LEGACY_BUTTON_WIDGET_SUBTYPE_IDS.toggleRecording:
                legacyButtonRuntimeSubWidget = new LegacyButtonRuntimeSubWidget_toggleRecordingButton( legacyButtonRuntimeWidgetAsParent, widgetSubData );
                break;
            case LegacyButtonWidgetSubData.LEGACY_BUTTON_WIDGET_SUBTYPE_IDS.alarm:
                legacyButtonRuntimeSubWidget = new LegacyButtonRuntimeSubWidget_alarmButton( legacyButtonRuntimeWidgetAsParent, widgetSubData );
                break;
            case LegacyButtonWidgetSubData.LEGACY_BUTTON_WIDGET_SUBTYPE_IDS.prevCall:
                legacyButtonRuntimeSubWidget = new LegacyButtonRuntimeSubWidget_prevCallButton( legacyButtonRuntimeWidgetAsParent, widgetSubData );
                break;
            case LegacyButtonWidgetSubData.LEGACY_BUTTON_WIDGET_SUBTYPE_IDS.monitorDialingExtension:
                legacyButtonRuntimeSubWidget = new LegacyButtonRuntimeSubWidget_monitorDialingExtensionButton( legacyButtonRuntimeWidgetAsParent, widgetSubData );
                break;
            case LegacyButtonWidgetSubData.LEGACY_BUTTON_WIDGET_SUBTYPE_IDS.stationLineDesignation:
                legacyButtonRuntimeSubWidget = new LegacyButtonRuntimeSubWidget_stationLineDesignationButton( legacyButtonRuntimeWidgetAsParent, widgetSubData );
                break;
            case LegacyButtonWidgetSubData.LEGACY_BUTTON_WIDGET_SUBTYPE_IDS.parkCall:
                legacyButtonRuntimeSubWidget = new LegacyButtonRuntimeSubWidget_parkCallButton( legacyButtonRuntimeWidgetAsParent, widgetSubData );
                break;
            case LegacyButtonWidgetSubData.LEGACY_BUTTON_WIDGET_SUBTYPE_IDS.seriesSet:
                legacyButtonRuntimeSubWidget = new LegacyButtonRuntimeSubWidget_seriesSetButton( legacyButtonRuntimeWidgetAsParent, widgetSubData );
                break;
            case LegacyButtonWidgetSubData.LEGACY_BUTTON_WIDGET_SUBTYPE_IDS.monitoringCall:
                legacyButtonRuntimeSubWidget = new LegacyButtonRuntimeSubWidget_monitoringCallButton( legacyButtonRuntimeWidgetAsParent, widgetSubData );
                break;
            case LegacyButtonWidgetSubData.LEGACY_BUTTON_WIDGET_SUBTYPE_IDS.start:
                legacyButtonRuntimeSubWidget = new LegacyButtonRuntimeSubWidget_startButton( legacyButtonRuntimeWidgetAsParent, widgetSubData );
                break;
            case LegacyButtonWidgetSubData.LEGACY_BUTTON_WIDGET_SUBTYPE_IDS.toggleMuted:
                legacyButtonRuntimeSubWidget = new LegacyButtonRuntimeSubWidget_toggleMutedButton( legacyButtonRuntimeWidgetAsParent, widgetSubData );
                break;
            case LegacyButtonWidgetSubData.LEGACY_BUTTON_WIDGET_SUBTYPE_IDS.leavingSeat:
                legacyButtonRuntimeSubWidget = new LegacyButtonRuntimeSubWidget_leavingSeatButton( legacyButtonRuntimeWidgetAsParent, widgetSubData );
                break;
            case LegacyButtonWidgetSubData.LEGACY_BUTTON_WIDGET_SUBTYPE_IDS.nightTime:
                legacyButtonRuntimeSubWidget = new LegacyButtonRuntimeSubWidget_nightTimeButton( legacyButtonRuntimeWidgetAsParent, widgetSubData );
                break;
            case LegacyButtonWidgetSubData.LEGACY_BUTTON_WIDGET_SUBTYPE_IDS.available:
                legacyButtonRuntimeSubWidget = new LegacyButtonRuntimeSubWidget_availableButton( legacyButtonRuntimeWidgetAsParent, widgetSubData );
                break;
            case LegacyButtonWidgetSubData.LEGACY_BUTTON_WIDGET_SUBTYPE_IDS.nextCall:
                legacyButtonRuntimeSubWidget = new LegacyButtonRuntimeSubWidget_nextCallButton( legacyButtonRuntimeWidgetAsParent, widgetSubData );
                break;
            case LegacyButtonWidgetSubData.LEGACY_BUTTON_WIDGET_SUBTYPE_IDS.line:
                legacyButtonRuntimeSubWidget = new LegacyButtonRuntimeSubWidget_lineButton( legacyButtonRuntimeWidgetAsParent, widgetSubData );
                break;
            case LegacyButtonWidgetSubData.LEGACY_BUTTON_WIDGET_SUBTYPE_IDS.keypad:
                legacyButtonRuntimeSubWidget = new LegacyButtonRuntimeSubWidget_keypadButton( legacyButtonRuntimeWidgetAsParent, widgetSubData );
                break;
            case LegacyButtonWidgetSubData.LEGACY_BUTTON_WIDGET_SUBTYPE_IDS.makeCall:
                legacyButtonRuntimeSubWidget = new LegacyButtonRuntimeSubWidget_makeCallButton( legacyButtonRuntimeWidgetAsParent, widgetSubData );
                break;
            case LegacyButtonWidgetSubData.LEGACY_BUTTON_WIDGET_SUBTYPE_IDS.backspace:
                legacyButtonRuntimeSubWidget = new LegacyButtonRuntimeSubWidget_backspaceButton( legacyButtonRuntimeWidgetAsParent, widgetSubData );
                break;
            case LegacyButtonWidgetSubData.LEGACY_BUTTON_WIDGET_SUBTYPE_IDS.incomingCall:
                legacyButtonRuntimeSubWidget = new LegacyButtonRuntimeSubWidget_incomingCallButton( legacyButtonRuntimeWidgetAsParent, widgetSubData );
                break;
            case LegacyButtonWidgetSubData.LEGACY_BUTTON_WIDGET_SUBTYPE_IDS.threeWayCall:
                legacyButtonRuntimeSubWidget = new LegacyButtonRuntimeSubWidget_threeWayCallButton( legacyButtonRuntimeWidgetAsParent, widgetSubData );
                break;
            case LegacyButtonWidgetSubData.LEGACY_BUTTON_WIDGET_SUBTYPE_IDS.outgoingCall:
                legacyButtonRuntimeSubWidget = new LegacyButtonRuntimeSubWidget_outgoingCallButton( legacyButtonRuntimeWidgetAsParent, widgetSubData );
                break;
            case LegacyButtonWidgetSubData.LEGACY_BUTTON_WIDGET_SUBTYPE_IDS.hangUpCall:
                legacyButtonRuntimeSubWidget = new LegacyButtonRuntimeSubWidget_hangUpCallButton( legacyButtonRuntimeWidgetAsParent, widgetSubData );
                break;
            case LegacyButtonWidgetSubData.LEGACY_BUTTON_WIDGET_SUBTYPE_IDS.unholdCall:
                legacyButtonRuntimeSubWidget = new LegacyButtonRuntimeSubWidget_unholdCallButton( legacyButtonRuntimeWidgetAsParent, widgetSubData );
                break;
            case LegacyButtonWidgetSubData.LEGACY_BUTTON_WIDGET_SUBTYPE_IDS.holdCall:
                legacyButtonRuntimeSubWidget = new LegacyButtonRuntimeSubWidget_holdCallButton( legacyButtonRuntimeWidgetAsParent, widgetSubData );
                break;
            case LegacyButtonWidgetSubData.LEGACY_BUTTON_WIDGET_SUBTYPE_IDS.pickUpCall:
                legacyButtonRuntimeSubWidget = new LegacyButtonRuntimeSubWidget_pickUpCallButton( legacyButtonRuntimeWidgetAsParent, widgetSubData );
                break;
            case LegacyButtonWidgetSubData.LEGACY_BUTTON_WIDGET_SUBTYPE_IDS.quickCall:
                legacyButtonRuntimeSubWidget = new LegacyButtonRuntimeSubWidget_quickCallButton( legacyButtonRuntimeWidgetAsParent, widgetSubData );
                break;
            case LegacyButtonWidgetSubData.LEGACY_BUTTON_WIDGET_SUBTYPE_IDS.autoDial:
                legacyButtonRuntimeSubWidget = new LegacyButtonRuntimeSubWidget_autoDialButton( legacyButtonRuntimeWidgetAsParent, widgetSubData );
                break;
            case LegacyButtonWidgetSubData.LEGACY_BUTTON_WIDGET_SUBTYPE_IDS.oneTouchDial:
                legacyButtonRuntimeSubWidget = new LegacyButtonRuntimeSubWidget_oneTouchDialButton( legacyButtonRuntimeWidgetAsParent, widgetSubData );
                break;
            default:
                throw new Error("The legacy button runtime  sub widget was not present. legacyButtonWidgetSubTypeId=" +widgetSubTypeId  );
        }
        return legacyButtonRuntimeSubWidget;
    }


}
const _INSTANCE = new LegacyButtonRuntimeSubWidgetFactory();