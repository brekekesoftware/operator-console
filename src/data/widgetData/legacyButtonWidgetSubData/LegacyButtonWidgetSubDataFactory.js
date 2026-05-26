import DividerDataFactory from "../../DividerDataFactory";
import LegacyButtonWidgetSubData from "./LegacyButtonWidgetSubData";
import LegacyButtonWidgetSubData_dummyButton from "./LegacyButtonWidgetSubData_dummyButton";
import LegacyButtonWidgetSubData_callTalkingButton from "./LegacyButtonWidgetSubData_callTalkingButton";
import LegacyButtonWidgetSubData_noAnswerButton from "./LegacyButtonWidgetSubData_noAnswerButton";
import LegacyButtonWidgetSubData_callbackButton from "./LegacyButtonWidgetSubData_callbackButton";
import LegacyButtonWidgetSubData_transferButton from "./LegacyButtonWidgetSubData_transferButton";
import LegacyButtonWidgetSubData_toggleRecordingButton from "./LegacyButtonWidgetSubData_toggleRecordingButton";
import LegacyButtonWidgetSubData_alarmButton from "./LegacyButtonWidgetSubData_alarmButton";
import LegacyButtonWidgetSubData_prevCallButton from "./LegacyButtonWidgetSubData_prevCallButton";
import LegacyButtonWidgetSubData_monitorDialingExtensionButton
    from "./LegacyButtonWidgetSubData_monitorDialingExtensionButton";
import LegacyButtonWidgetSubData_stationLineDesignationButton
    from "./LegacyButtonWidgetSubData_stationLineDesignationButton";
import LegacyButtonWidgetSubData_parkCallButton from "./LegacyButtonWidgetSubData_parkCallButton";
import LegacyButtonWidgetSubData_seriesSetButton from "./LegacyButtonWidgetSubData_seriesSetButton";
import LegacyButtonWidgetSubData_monitoringCallButton from "./LegacyButtonWidgetSubData_monitoringCallButton";
import LegacyButtonWidgetSubData_startButton from "./LegacyButtonWidgetSubData_startButton";
import LegacyButtonWidgetSubData_toggleMutedButton from "./LegacyButtonWidgetSubData_toggleMutedButton";
import LegacyButtonWidgetSubData_leavingSeatButton from "./LegacyButtonWidgetSubData_leavingSeatButton";
import LegacyButtonWidgetSubData_nightTimeButton from "./LegacyButtonWidgetSubData_nightTimeButton";
import LegacyButtonWidgetSubData_availableButton from "./LegacyButtonWidgetSubData_availableButton";
import LegacyButtonWidgetSubData_nextCallButton from "./LegacyButtonWidgetSubData_nextCallButton";
import LegacyButtonWidgetSubData_lineButton from "./LegacyButtonWidgetSubData_lineButton";
import LegacyButtonWidgetSubData_keypadButton from "./LegacyButtonWidgetSubData_keypadButton";
import LegacyButtonWidgetSubData_makeCallButton from "./LegacyButtonWidgetSubData_makeCallButton";
import LegacyButtonWidgetSubData_backspaceButton from "./LegacyButtonWidgetSubData_backspaceButton";
import LegacyButtonWidgetSubData_incomingCallButton from "./LegacyButtonWidgetSubData_incomingCallButton";
import LegacyButtonWidgetSubData_threeWayCallButton from "./LegacyButtonWidgetSubData_threeWayCallButton";
import LegacyButtonWidgetSubData_outgoingCallButton from "./LegacyButtonWidgetSubData_outgoingCallButton";
import LegacyButtonWidgetSubData_hangUpCallButton from "./LegacyButtonWidgetSubData_hangUpCallButton";
import LegacyButtonWidgetSubData_unholdCallButton from "./LegacyButtonWidgetSubData_unholdCallButton";
import LegacyButtonWidgetSubData_holdCallButton from "./LegacyButtonWidgetSubData_holdCallButton";
import LegacyButtonWidgetSubData_pickUpCallButton from "./LegacyButtonWidgetSubData_pickUpCallButton";
import LegacyButtonWidgetSubData_quickCallButton from "./LegacyButtonWidgetSubData_quickCallButton";
import LegacyButtonWidgetSubData_autoDialButton from "./LegacyButtonWidgetSubData_autoDialButton";
import LegacyButtonWidgetSubData_oneTouchDialButton from "./LegacyButtonWidgetSubData_oneTouchDialButton";
import LegacyButtonWidgetSubData_toggleHoldCallButton from "./LegacyButtonWidgetSubData_toggleHoldCallButton";
import LegacyButtonWidgetSubData_toggleVideoCallButton from "./LegacyButtonWidgetSubData_toggleVideoCallButton";
import OCUtil from "../../../OCUtil";
import i18n from "../../../i18n";

class LegacyButtonWidgetSubData_pickUpCallCallButton {
    constructor(options) {
        
    }

}

export default class LegacyButtonWidgetSubDataFactory{
    //!private
    constructor() {
    }

    static getLegacyButtonWidgetSubDataFactoryStaticInstance(){
        return _INSTANCE;
    }

    newLegacyButtonWidgetSubDataInstance( dataOptions = null, subDataOptions, dataVersion = null  ){
        let  subDataTypeId = subDataOptions["legacyButtonWidgetSubTypeId"];
        if( !subDataTypeId && subDataTypeId !== 0 ){
            const oSubData = subDataOptions["legacyButtonWidgetSubDataObject"];
            subDataTypeId = oSubData["legacyButtonWidgetSubTypeId"];
        }

        if( !subDataTypeId ){
            subDataTypeId = LegacyButtonWidgetSubData.LEGACY_BUTTON_WIDGET_SUBTYPE_IDS.dummy;  //!default
        }

        let subData;
        switch( subDataTypeId ){
            case LegacyButtonWidgetSubData.LEGACY_BUTTON_WIDGET_SUBTYPE_IDS.dummy:
                subData = new LegacyButtonWidgetSubData_dummyButton( dataOptions, subDataOptions, dataVersion  );
                break;
            case LegacyButtonWidgetSubData.LEGACY_BUTTON_WIDGET_SUBTYPE_IDS.callTalking:
                subData = new LegacyButtonWidgetSubData_callTalkingButton( dataOptions, subDataOptions, dataVersion  );
                break;
            case LegacyButtonWidgetSubData.LEGACY_BUTTON_WIDGET_SUBTYPE_IDS.noAnswer:
                subData = new LegacyButtonWidgetSubData_noAnswerButton( dataOptions, subDataOptions, dataVersion  );
                break;
            case LegacyButtonWidgetSubData.LEGACY_BUTTON_WIDGET_SUBTYPE_IDS.callback:
                subData = new LegacyButtonWidgetSubData_callbackButton( dataOptions, subDataOptions, dataVersion  );
                break;
            case LegacyButtonWidgetSubData.LEGACY_BUTTON_WIDGET_SUBTYPE_IDS.transfer:
                subData = new LegacyButtonWidgetSubData_transferButton( dataOptions, subDataOptions, dataVersion  );
                break;
            case LegacyButtonWidgetSubData.LEGACY_BUTTON_WIDGET_SUBTYPE_IDS.toggleRecording:
                subData = new LegacyButtonWidgetSubData_toggleRecordingButton( dataOptions, subDataOptions, dataVersion  );
                break;
            case LegacyButtonWidgetSubData.LEGACY_BUTTON_WIDGET_SUBTYPE_IDS.alarm:
                subData = new LegacyButtonWidgetSubData_alarmButton( dataOptions, subDataOptions, dataVersion  );
                break;
            case LegacyButtonWidgetSubData.LEGACY_BUTTON_WIDGET_SUBTYPE_IDS.prevCall:
                subData = new LegacyButtonWidgetSubData_prevCallButton( dataOptions, subDataOptions, dataVersion  );
                break;
            case LegacyButtonWidgetSubData.LEGACY_BUTTON_WIDGET_SUBTYPE_IDS.monitorDialingExtension:
                subData = new LegacyButtonWidgetSubData_monitorDialingExtensionButton( dataOptions, subDataOptions, dataVersion  );
                break;
            case LegacyButtonWidgetSubData.LEGACY_BUTTON_WIDGET_SUBTYPE_IDS.stationLineDesignation:
                subData = new LegacyButtonWidgetSubData_stationLineDesignationButton( dataOptions, subDataOptions, dataVersion  );
                break;
            case LegacyButtonWidgetSubData.LEGACY_BUTTON_WIDGET_SUBTYPE_IDS.parkCall:
                subData = new LegacyButtonWidgetSubData_parkCallButton( dataOptions, subDataOptions, dataVersion  );
                break;
            case LegacyButtonWidgetSubData.LEGACY_BUTTON_WIDGET_SUBTYPE_IDS.seriesSet:
                subData = new LegacyButtonWidgetSubData_seriesSetButton( dataOptions, subDataOptions, dataVersion  );
                break;
            case LegacyButtonWidgetSubData.LEGACY_BUTTON_WIDGET_SUBTYPE_IDS.monitoringCall:
                subData = new LegacyButtonWidgetSubData_monitoringCallButton( dataOptions, subDataOptions, dataVersion  );
                break;
            case LegacyButtonWidgetSubData.LEGACY_BUTTON_WIDGET_SUBTYPE_IDS.start:
                subData = new LegacyButtonWidgetSubData_startButton( dataOptions, subDataOptions, dataVersion  );
                break;
            case LegacyButtonWidgetSubData.LEGACY_BUTTON_WIDGET_SUBTYPE_IDS.toggleMuted:
                subData = new LegacyButtonWidgetSubData_toggleMutedButton( dataOptions, subDataOptions, dataVersion  );
                break;
            case LegacyButtonWidgetSubData.LEGACY_BUTTON_WIDGET_SUBTYPE_IDS.leavingSeat:
                subData = new LegacyButtonWidgetSubData_leavingSeatButton( dataOptions, subDataOptions, dataVersion  );
                break;
            case LegacyButtonWidgetSubData.LEGACY_BUTTON_WIDGET_SUBTYPE_IDS.nightTime:
                subData = new LegacyButtonWidgetSubData_nightTimeButton( dataOptions, subDataOptions, dataVersion  );
                break;
            case LegacyButtonWidgetSubData.LEGACY_BUTTON_WIDGET_SUBTYPE_IDS.available:
                subData = new LegacyButtonWidgetSubData_availableButton( dataOptions, subDataOptions, dataVersion  );
                break;
            case LegacyButtonWidgetSubData.LEGACY_BUTTON_WIDGET_SUBTYPE_IDS.nextCall:
                subData = new LegacyButtonWidgetSubData_nextCallButton( dataOptions, subDataOptions, dataVersion  );
                break;
            case LegacyButtonWidgetSubData.LEGACY_BUTTON_WIDGET_SUBTYPE_IDS.line:
                subData = new LegacyButtonWidgetSubData_lineButton( dataOptions, subDataOptions, dataVersion  );
                break;
            case LegacyButtonWidgetSubData.LEGACY_BUTTON_WIDGET_SUBTYPE_IDS.keypad:
                subData = new LegacyButtonWidgetSubData_keypadButton( dataOptions, subDataOptions, dataVersion  );
                break;
            case LegacyButtonWidgetSubData.LEGACY_BUTTON_WIDGET_SUBTYPE_IDS.makeCall:
                subData = new LegacyButtonWidgetSubData_makeCallButton( dataOptions, subDataOptions, dataVersion  );
                break;
            case LegacyButtonWidgetSubData.LEGACY_BUTTON_WIDGET_SUBTYPE_IDS.backspace:
                subData = new LegacyButtonWidgetSubData_backspaceButton( dataOptions, subDataOptions, dataVersion  );
                break;
            case LegacyButtonWidgetSubData.LEGACY_BUTTON_WIDGET_SUBTYPE_IDS.incomingCall:
                subData = new LegacyButtonWidgetSubData_incomingCallButton( dataOptions, subDataOptions, dataVersion  );
                break;
            case LegacyButtonWidgetSubData.LEGACY_BUTTON_WIDGET_SUBTYPE_IDS.threeWayCall:
                subData = new LegacyButtonWidgetSubData_threeWayCallButton( dataOptions, subDataOptions, dataVersion  );
                break;
            case LegacyButtonWidgetSubData.LEGACY_BUTTON_WIDGET_SUBTYPE_IDS.outgoingCall:
                subData = new LegacyButtonWidgetSubData_outgoingCallButton( dataOptions, subDataOptions, dataVersion  );
                break;
            case LegacyButtonWidgetSubData.LEGACY_BUTTON_WIDGET_SUBTYPE_IDS.hangUpCall:
                subData = new LegacyButtonWidgetSubData_hangUpCallButton( dataOptions, subDataOptions, dataVersion  );
                break;
            case LegacyButtonWidgetSubData.LEGACY_BUTTON_WIDGET_SUBTYPE_IDS.unholdCall:
                subData = new LegacyButtonWidgetSubData_unholdCallButton( dataOptions, subDataOptions, dataVersion  );
                break;
            case LegacyButtonWidgetSubData.LEGACY_BUTTON_WIDGET_SUBTYPE_IDS.holdCall:
                subData = new LegacyButtonWidgetSubData_holdCallButton( dataOptions, subDataOptions, dataVersion  );
                break;
            case LegacyButtonWidgetSubData.LEGACY_BUTTON_WIDGET_SUBTYPE_IDS.pickUpCall:
                subData = new LegacyButtonWidgetSubData_pickUpCallButton( dataOptions, subDataOptions, dataVersion  );
                break;
            case LegacyButtonWidgetSubData.LEGACY_BUTTON_WIDGET_SUBTYPE_IDS.quickCall:
                subData = new LegacyButtonWidgetSubData_quickCallButton( dataOptions, subDataOptions, dataVersion  );
                break;
            case LegacyButtonWidgetSubData.LEGACY_BUTTON_WIDGET_SUBTYPE_IDS.autoDial:
                subData = new LegacyButtonWidgetSubData_autoDialButton( dataOptions, subDataOptions, dataVersion  );
                break;
            case LegacyButtonWidgetSubData.LEGACY_BUTTON_WIDGET_SUBTYPE_IDS.oneTouchDial:
                subData = new LegacyButtonWidgetSubData_oneTouchDialButton( dataOptions, subDataOptions, dataVersion  );
                break;
            case LegacyButtonWidgetSubData.LEGACY_BUTTON_WIDGET_SUBTYPE_IDS.toggleHoldCall:
                subData = new LegacyButtonWidgetSubData_toggleHoldCallButton( dataOptions, subDataOptions, dataVersion  );
                break;
            case LegacyButtonWidgetSubData.LEGACY_BUTTON_WIDGET_SUBTYPE_IDS.toggleVideoCall:
                subData = new LegacyButtonWidgetSubData_toggleVideoCallButton( dataOptions, subDataOptions, dataVersion  );
                break;
            default:
				OCUtil.logErrorWithNotification("Could not create an instance of the Button widget because the subtype is unknown.subTypeId=" + subDataTypeId,i18n.t("Could_not_create_an_instance_of_the_button_widget~") + subDataTypeId);
                throw new Error("Cannot create an instance of the Button widget because the subtype is unknown.subTypeId=" + subDataTypeId );
                //subData = null;
                //break;
			}

        return subData;

    }


}
const _INSTANCE = new LegacyButtonWidgetSubDataFactory();