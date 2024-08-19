import LegacyButtonWidgetSubData from "../../../../data/widgetData/legacyButtonWidgetSubData/LegacyButtonWidgetSubData";
import LegacyButtonEditorSubWidgetSettings_dummyButton from "./LegacyButtonEditorSubWidgetSettings_dummyButton";
import LegacyButtonEditorSubWidgetSettings_callTalkingButton
    from "./LegacyButtonEditorSubWidgetSettings_callTalkingButton";
import LegacyButtonEditorSubWidgetSettings_noAnswerButton from "./LegacyButtonEditorSubWidgetSettings_noAnswerButton";
import LegacyButtonEditorSubWidgetSettings_callbackButton from "./LegacyButtonEditorSubWidgetSettings_callbackButton";
import LegacyButtonEditorSubWidgetSettings_transferButton from "./LegacyButtonEditorSubWidgetSettings_transferButton";
import LegacyButtonEditorSubWidgetSettings_toggleRecordingButton
    from "./LegacyButtonEditorSubWidgetSettings_toggleRecordingButton";
import LegacyButtonEditorSubWidgetSettings_alarmButton from "./LegacyButtonEditorSubWidgetSettings_alarmButton";
import LegacyButtonEditorSubWidgetSettings_prevCallButton from "./LegacyButtonEditorSubWidgetSettings_prevCallButton";
import LegacyButtonEditorSubWidgetSettings_monitorDialingExtensionButton
    from "./LegacyButtonEditorSubWidgetSettings_monitorDialingExtensionButton";
import LegacyButtonEditorSubWidgetSettings_stationLineDesignationButton
    from "./LegacyButtonEditorSubWidgetSettings_stationLineDsignationButton";
import LegacyButtonEditorSubWidgetSettings_parkCallButton from "./LegacyButtonEditorSubWidgetSettings_parkCallButton";
import LegacyButtonEditorSubWidgetSettings_seriesSetButton from "./LegacyButtonEditorSubWidgetSettings_seriesSetButton";
import LegacyButtonEditorSubWidgetSettings_monitoringCallButton
    from "./LegacyButtonEditorSubWidgetSettings_monitoringCallButton";
import LegacyButtonEditorSubWidgetSettings_startButton from "./LegacyButtonEditorSubWidgetSettings_startButton";
import LegacyButtonEditorSubWidgetSettings_toggleMutedButton
    from "./LegacyButtonEditorSubWidgetSettings_toggleMutedButton";
import LegacyButtonEditorSubWidgetSettings_leavingSeatButton
    from "./LegacyButtonEditorSubWidgetSettings_leavingSeatButton";
import LegacyButtonEditorSubWidgetSettings_nightTimeButton from "./LegacyButtonEditorSubWidgetSettings_nightTimeButton";
import LegacyButtonEditorSubWidgetSettings_availableButton from "./LegacyButtonEditorSubWidgetSettings_availableButton";
import LegacyButtonEditorSubWidgetSettings_nextCallButton from "./LegacyButtonEditorSubWidgetSettings_nextCallButton";
import LegacyButtonEditorSubWidgetSettings_lineButton from "./LegacyButtonEditorSubWidgetSettings_lineButton";
import LegacyButtonEditorSubWidgetSettings_keypadButton from "./LegacyButtonEditorSubWidgetSettings_keypadButton";
import LegacyButtonEditorSubWidgetSettings_makeCallButton from "./LegacyButtonEditorSubWidgetSettings_makeCallButton";
import LegacyButtonEditorSubWidgetSettings_backspaceButton from "./LegacyButtonEditorSubWidgetSettings_backspaceButton";
import LegacyButtonEditorSubWidgetSettings_incomingCallButton
    from "./LegacyButtonEditorSubWidgetSettings_incomingCallButton";
import LegacyButtonEditorSubWidgetSettings_threeWayCallButton
    from "./LegacyButtonEditorSubWidgetSettings_threeWayCallButton";
import LegacyButtonEditorSubWidgetSettings_outgoingCallButton
    from "./LegacyButtonEditorSubWidgetSettings_outgoingCallButton";
import LegacyButtonEditorSubWidgetSettings_hangUpCallButton
    from "./LegacyButtonEditorSubWidgetSettings_hangUpCallButton";
import LegacyButtonEditorSubWidgetSettings_unholdCallButton
    from "./LegacyButtonEditorSubWidgetSettings_unholdCallButton";
import LegacyButtonEditorSubWidgetSettings_holdCallButton from "./LegacyButtonEditorSubWidgetSettings_holdCallButton";
import LegacyButtonEditorSubWidgetSettings_pickUpCallButton
    from "./LegacyButtonEditorSubWidgetSettings_pickUpCallButton";
import LegacyButtonEditorSubWidgetSettings_quickCallButton from "./LegacyButtonEditorSubWidgetSettings_quickCallButton";
import LegacyButtonEditorSubWidgetSettings_autoDialButton from "./LegacyButtonEditorSubWidgetSettings_autoDialButton";
import LegacyButtonEditorSubWidgetSettings_oneTouchDialButton
    from "./LegacyButtonEditorSubWidgetSettings_oneTouchDialButton";

export default class LegacyButtonEditorSubWidgetSettingsFactory  {

    //!private
    constructor() {
    }

    static getStaticLegacyButtonEditorSubWidgetSettingsFactoryInstance(){
        return _INSTANCE;
    }

    newLegacyButtonEditorSubWidgetSettings( legacyButtonEditorWidgetSettingsAsParent, legacyButtonEditorSubWidgetData  ){

        // const dataObject = {};
        // widgetData.setWidgetDataToObject( dataObject );
        // dataObject["editorPaneAsParent"] = editorPaneAsParent;
        //dataObject["editorTabFunctionComponentAsParent"] = editorTabFunctionComponentAsParent;
        const widgetSubTypeId = legacyButtonEditorSubWidgetData.getLegacyButtonWidgetSubTypeId();
        let legacyButtonEditorSubWidgetSettings;
        switch( widgetSubTypeId ){
            case LegacyButtonWidgetSubData.LEGACY_BUTTON_WIDGET_SUBTYPE_IDS.dummy:
                legacyButtonEditorSubWidgetSettings = new LegacyButtonEditorSubWidgetSettings_dummyButton( legacyButtonEditorWidgetSettingsAsParent, legacyButtonEditorSubWidgetData );
                break;
            case LegacyButtonWidgetSubData.LEGACY_BUTTON_WIDGET_SUBTYPE_IDS.callTalking:
                legacyButtonEditorSubWidgetSettings = new LegacyButtonEditorSubWidgetSettings_callTalkingButton( legacyButtonEditorWidgetSettingsAsParent, legacyButtonEditorSubWidgetData );
                break;
            case LegacyButtonWidgetSubData.LEGACY_BUTTON_WIDGET_SUBTYPE_IDS.noAnswer:
                legacyButtonEditorSubWidgetSettings = new LegacyButtonEditorSubWidgetSettings_noAnswerButton( legacyButtonEditorWidgetSettingsAsParent, legacyButtonEditorSubWidgetData );
                break;
            case LegacyButtonWidgetSubData.LEGACY_BUTTON_WIDGET_SUBTYPE_IDS.callback:
                legacyButtonEditorSubWidgetSettings = new LegacyButtonEditorSubWidgetSettings_callbackButton( legacyButtonEditorWidgetSettingsAsParent, legacyButtonEditorSubWidgetData );
                break;
            case LegacyButtonWidgetSubData.LEGACY_BUTTON_WIDGET_SUBTYPE_IDS.transfer:
                legacyButtonEditorSubWidgetSettings = new LegacyButtonEditorSubWidgetSettings_transferButton( legacyButtonEditorWidgetSettingsAsParent, legacyButtonEditorSubWidgetData );
                break;
            case LegacyButtonWidgetSubData.LEGACY_BUTTON_WIDGET_SUBTYPE_IDS.toggleRecording:
                legacyButtonEditorSubWidgetSettings = new LegacyButtonEditorSubWidgetSettings_toggleRecordingButton( legacyButtonEditorWidgetSettingsAsParent, legacyButtonEditorSubWidgetData );
                break;
            case LegacyButtonWidgetSubData.LEGACY_BUTTON_WIDGET_SUBTYPE_IDS.alarm:
                legacyButtonEditorSubWidgetSettings = new LegacyButtonEditorSubWidgetSettings_alarmButton( legacyButtonEditorWidgetSettingsAsParent, legacyButtonEditorSubWidgetData );
                break;
            case LegacyButtonWidgetSubData.LEGACY_BUTTON_WIDGET_SUBTYPE_IDS.prevCall:
                legacyButtonEditorSubWidgetSettings = new LegacyButtonEditorSubWidgetSettings_prevCallButton( legacyButtonEditorWidgetSettingsAsParent, legacyButtonEditorSubWidgetData );
                break;
            case LegacyButtonWidgetSubData.LEGACY_BUTTON_WIDGET_SUBTYPE_IDS.monitorDialingExtension:
                legacyButtonEditorSubWidgetSettings = new LegacyButtonEditorSubWidgetSettings_monitorDialingExtensionButton( legacyButtonEditorWidgetSettingsAsParent, legacyButtonEditorSubWidgetData );
                break;
            case LegacyButtonWidgetSubData.LEGACY_BUTTON_WIDGET_SUBTYPE_IDS.stationLineDesignation:
                legacyButtonEditorSubWidgetSettings = new LegacyButtonEditorSubWidgetSettings_stationLineDesignationButton( legacyButtonEditorWidgetSettingsAsParent, legacyButtonEditorSubWidgetData );
                break;
            case LegacyButtonWidgetSubData.LEGACY_BUTTON_WIDGET_SUBTYPE_IDS.parkCall:
                legacyButtonEditorSubWidgetSettings = new LegacyButtonEditorSubWidgetSettings_parkCallButton( legacyButtonEditorWidgetSettingsAsParent, legacyButtonEditorSubWidgetData );
                break;
            case LegacyButtonWidgetSubData.LEGACY_BUTTON_WIDGET_SUBTYPE_IDS.seriesSet:
                legacyButtonEditorSubWidgetSettings = new LegacyButtonEditorSubWidgetSettings_seriesSetButton( legacyButtonEditorWidgetSettingsAsParent, legacyButtonEditorSubWidgetData );
                break;
            case LegacyButtonWidgetSubData.LEGACY_BUTTON_WIDGET_SUBTYPE_IDS.monitoringCall:
                legacyButtonEditorSubWidgetSettings = new LegacyButtonEditorSubWidgetSettings_monitoringCallButton( legacyButtonEditorWidgetSettingsAsParent, legacyButtonEditorSubWidgetData );
                break;
            case LegacyButtonWidgetSubData.LEGACY_BUTTON_WIDGET_SUBTYPE_IDS.start:
                legacyButtonEditorSubWidgetSettings = new LegacyButtonEditorSubWidgetSettings_startButton( legacyButtonEditorWidgetSettingsAsParent, legacyButtonEditorSubWidgetData );
                break;
            case LegacyButtonWidgetSubData.LEGACY_BUTTON_WIDGET_SUBTYPE_IDS.toggleMuted:
                legacyButtonEditorSubWidgetSettings = new LegacyButtonEditorSubWidgetSettings_toggleMutedButton( legacyButtonEditorWidgetSettingsAsParent, legacyButtonEditorSubWidgetData );
                break;
            case LegacyButtonWidgetSubData.LEGACY_BUTTON_WIDGET_SUBTYPE_IDS.leavingSeat:
                legacyButtonEditorSubWidgetSettings = new LegacyButtonEditorSubWidgetSettings_leavingSeatButton( legacyButtonEditorWidgetSettingsAsParent, legacyButtonEditorSubWidgetData );
                break;
            case LegacyButtonWidgetSubData.LEGACY_BUTTON_WIDGET_SUBTYPE_IDS.nightTime:
                legacyButtonEditorSubWidgetSettings = new LegacyButtonEditorSubWidgetSettings_nightTimeButton( legacyButtonEditorWidgetSettingsAsParent, legacyButtonEditorSubWidgetData );
                break;
            case LegacyButtonWidgetSubData.LEGACY_BUTTON_WIDGET_SUBTYPE_IDS.available:
                legacyButtonEditorSubWidgetSettings = new LegacyButtonEditorSubWidgetSettings_availableButton( legacyButtonEditorWidgetSettingsAsParent, legacyButtonEditorSubWidgetData );
                break;
            case LegacyButtonWidgetSubData.LEGACY_BUTTON_WIDGET_SUBTYPE_IDS.nextCall:
                legacyButtonEditorSubWidgetSettings = new LegacyButtonEditorSubWidgetSettings_nextCallButton( legacyButtonEditorWidgetSettingsAsParent, legacyButtonEditorSubWidgetData );
                break;
            case LegacyButtonWidgetSubData.LEGACY_BUTTON_WIDGET_SUBTYPE_IDS.line:
                legacyButtonEditorSubWidgetSettings = new LegacyButtonEditorSubWidgetSettings_lineButton( legacyButtonEditorWidgetSettingsAsParent, legacyButtonEditorSubWidgetData );
                break;
            case LegacyButtonWidgetSubData.LEGACY_BUTTON_WIDGET_SUBTYPE_IDS.keypad:
                legacyButtonEditorSubWidgetSettings = new LegacyButtonEditorSubWidgetSettings_keypadButton( legacyButtonEditorWidgetSettingsAsParent, legacyButtonEditorSubWidgetData );
                break;
            case LegacyButtonWidgetSubData.LEGACY_BUTTON_WIDGET_SUBTYPE_IDS.makeCall:
                legacyButtonEditorSubWidgetSettings = new LegacyButtonEditorSubWidgetSettings_makeCallButton( legacyButtonEditorWidgetSettingsAsParent, legacyButtonEditorSubWidgetData );
                break;
            case LegacyButtonWidgetSubData.LEGACY_BUTTON_WIDGET_SUBTYPE_IDS.backspace:
                legacyButtonEditorSubWidgetSettings = new LegacyButtonEditorSubWidgetSettings_backspaceButton( legacyButtonEditorWidgetSettingsAsParent, legacyButtonEditorSubWidgetData );
                break;
            case LegacyButtonWidgetSubData.LEGACY_BUTTON_WIDGET_SUBTYPE_IDS.incomingCall:
                legacyButtonEditorSubWidgetSettings = new LegacyButtonEditorSubWidgetSettings_incomingCallButton( legacyButtonEditorWidgetSettingsAsParent, legacyButtonEditorSubWidgetData );
                break;
            case LegacyButtonWidgetSubData.LEGACY_BUTTON_WIDGET_SUBTYPE_IDS.threeWayCall:
                legacyButtonEditorSubWidgetSettings = new LegacyButtonEditorSubWidgetSettings_threeWayCallButton( legacyButtonEditorWidgetSettingsAsParent, legacyButtonEditorSubWidgetData );
                break;
            case LegacyButtonWidgetSubData.LEGACY_BUTTON_WIDGET_SUBTYPE_IDS.outgoingCall:
                legacyButtonEditorSubWidgetSettings = new LegacyButtonEditorSubWidgetSettings_outgoingCallButton( legacyButtonEditorWidgetSettingsAsParent, legacyButtonEditorSubWidgetData );
                break;
            case LegacyButtonWidgetSubData.LEGACY_BUTTON_WIDGET_SUBTYPE_IDS.hangUpCall:
                legacyButtonEditorSubWidgetSettings = new LegacyButtonEditorSubWidgetSettings_hangUpCallButton( legacyButtonEditorWidgetSettingsAsParent, legacyButtonEditorSubWidgetData );
                break;
            case LegacyButtonWidgetSubData.LEGACY_BUTTON_WIDGET_SUBTYPE_IDS.unholdCall:
                legacyButtonEditorSubWidgetSettings = new LegacyButtonEditorSubWidgetSettings_unholdCallButton( legacyButtonEditorWidgetSettingsAsParent, legacyButtonEditorSubWidgetData );
                break;
            case LegacyButtonWidgetSubData.LEGACY_BUTTON_WIDGET_SUBTYPE_IDS.holdCall:
                legacyButtonEditorSubWidgetSettings = new LegacyButtonEditorSubWidgetSettings_holdCallButton( legacyButtonEditorWidgetSettingsAsParent, legacyButtonEditorSubWidgetData );
                break;
            case LegacyButtonWidgetSubData.LEGACY_BUTTON_WIDGET_SUBTYPE_IDS.pickUpCall:
                legacyButtonEditorSubWidgetSettings = new LegacyButtonEditorSubWidgetSettings_pickUpCallButton( legacyButtonEditorWidgetSettingsAsParent, legacyButtonEditorSubWidgetData );
                break;
            case LegacyButtonWidgetSubData.LEGACY_BUTTON_WIDGET_SUBTYPE_IDS.quickCall:
                legacyButtonEditorSubWidgetSettings = new LegacyButtonEditorSubWidgetSettings_quickCallButton( legacyButtonEditorWidgetSettingsAsParent, legacyButtonEditorSubWidgetData );
                break;
            case LegacyButtonWidgetSubData.LEGACY_BUTTON_WIDGET_SUBTYPE_IDS.autoDial:
                legacyButtonEditorSubWidgetSettings = new LegacyButtonEditorSubWidgetSettings_autoDialButton( legacyButtonEditorWidgetSettingsAsParent, legacyButtonEditorSubWidgetData );
                break;
            case LegacyButtonWidgetSubData.LEGACY_BUTTON_WIDGET_SUBTYPE_IDS.oneTouchDial:
                legacyButtonEditorSubWidgetSettings = new LegacyButtonEditorSubWidgetSettings_oneTouchDialButton( legacyButtonEditorWidgetSettingsAsParent, legacyButtonEditorSubWidgetData );
                break;
            default:
                throw new Error("The legacy button editor sub widget settings was not present. legacyButtonWidgetSubTypeId=" +widgetSubTypeId  );
        }
        return legacyButtonEditorSubWidgetSettings;
    }


}
const _INSTANCE = new LegacyButtonEditorSubWidgetSettingsFactory();