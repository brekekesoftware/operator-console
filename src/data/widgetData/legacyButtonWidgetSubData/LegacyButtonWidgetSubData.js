//!abstract

const _LEGACY_BUTTON_WIDGET_SUBTYPE_IDS = Object.freeze({   //[ subtypeKey : subtypeId ]
    dummy: 0,
    callTalking:1,
    noAnswer:2,
    callback:3,
    transfer:4,
    toggleRecording:5,
    alarm:6,
    prevCall:7,
    monitorDialingExtension:8,
    stationLineDesignation:9,
    parkCall:10,
    seriesSet:11,
    monitoringCall:12,
    start:13,
    toggleMuted:14,
    leavingSeat:15,
    nightTime:16,
    available:17,
    nextCall:18,
    line:19,
    keypad:20,
    makeCall:21,
    backspace:22,
    incomingCall:23,
    threeWayCall:24,
    outgoingCall:25,
    hangUpCall:26,
    unholdCall:27,
    holdCall:28,
    pickUpCall:29,
    quickCall:30,
    autoDial:31,
    oneTouchDial:32
});
const _LEGACY_BUTTON_WIDGET_SUBTYPE_NAMES = Object.freeze({ //[ subtypeId : subtypeName ]
    0 : "LegacyDummyButton",
    1: "LegacyCallTalkingButton",
    2 : "LegacyNoAnswerButton",
    3 : "LegacyCallbackButton",
    4 : "LegacyTransferButton",
    5 : "LegacyToggleRecordingButton",
    6 : "LegacyAlarmButton",
    7 : "LegacyPrevCallButton",
    8 : "LegacyMonitorDialingExtensionButton",
    9 : "LegacyStationLineDesignationButton",
    10 : "LegacyParkCallButton",
    11 : "LegacySeriesSetButton",
    12 : "LegacyMonitoringCallButton",
    13 : "LegacyStartButton",
    14 : "LegacyToggleMutedButton",
    15 : "LegacyLeavingSeatButton",
    16 : "LegacyNightTimeButton",
    17 : "LegacyAvailableButton",
    18 : "LegacyNextCallButton",
    19 : "LegacyLineButton",
    20 : "LegacyKeypadButton",
    21 : "LegacyMakeCallButton",
    22 : "LegacyBackspaceButton",
    23 : "LegacyIncomingCallButton",
    24 : "LegacyThreeWayCallButton",
    25 : "LegacyOutgoingCallButton",
    26 : "LegacyHangUpCallButton",
    27 : "LegacyUnholdCallButton",
    28 : "LegacyHoldCallButton",
    29 : "LegacyPickUpCallButton",
    30 : "LegacyQuickCallButton",
    31 : "LegacyAutoDialButton",
    32 : "LegacyOneTouchDialButton"
});
export default class LegacyButtonWidgetSubData{

    constructor( options ) {
        this._LegacyButtonWidgetDataAsParent = options["legacyButtonWidgetDataAsParent"];

        let currentOptions;
        const oSubData = options["legacyButtonWidgetSubDataObject"];
        if( oSubData  ){
            currentOptions = oSubData["legacyButtonWidgetSubTypeId"];
        }
        else {
            currentOptions = options;
        }
        this._SubTypeId = currentOptions["legacyButtonWidgetSubTypeId"];

    }

    getLegacyButtonWidgetDataAsParent(){
        return this._LegacyButtonWidgetDataAsParent;
    }




    static get LEGACY_BUTTON_WIDGET_SUBTYPE_IDS(){
        return _LEGACY_BUTTON_WIDGET_SUBTYPE_IDS;
    }

    static get LEGACY_BUTTON_WIDGET_SUBTYPE_NAMES_MAP(){
        return _LEGACY_BUTTON_WIDGET_SUBTYPE_NAMES;
    }

    static getLegacyButtonWidgetSubtypeName( subtypeId ){
        const name = _LEGACY_BUTTON_WIDGET_SUBTYPE_NAMES[ subtypeId ];
        return name;
    }

    static getLegacyButtonWidgetSubtypeId( subtypeName ){
        const entries = Object.entries(_LEGACY_BUTTON_WIDGET_SUBTYPE_NAMES);
        let subtypeId = null;
        for (const [sCurrentSubtypeId, currentSubtypeName] of entries ) {
            if( currentSubtypeName === subtypeName ){
                subtypeId = parseInt( sCurrentSubtypeId );
                break;
            }
        }
        return subtypeId;
    }

    setWidgetSubDataToObject( o ){
        o["legacyButtonWidgetSubTypeId"] = this.getLegacyButtonWidgetSubTypeId();
        this._setWidgetSubDataToObjectMain( o );
    }

    _setWidgetSubDataToObjectMain( o ){
        throw new Error("Not implemented.");
    }

    getLegacyButtonWidgetSubTypeId(){
        return this._SubTypeId;
    }

    getLegacyButtonWidgetSubTypeName(){
        const subtypeName = _LEGACY_BUTTON_WIDGET_SUBTYPE_NAMES[ this._SubTypeId ];
        return subtypeName;
    }

    //!abstract
    importLegacyButtonWidgetSubDataFromWidget_ver0_1(widget_ver0_1) {
        throw new Error("Not implemented.");
    }

}