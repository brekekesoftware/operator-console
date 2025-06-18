const _WIDGET_TYPE_ID__LEGACY_BUTTON = 0;

const _WIDGET_TYPE_IDS = Object.freeze({
    legacyButton: _WIDGET_TYPE_ID__LEGACY_BUTTON,
    callPanel: 1,
    legacyExtensionStatus: 2,
    text: 3,
    callTable: 4,
    extensionTable: 5,
    note: 6,
    lineTable: 7,
    legacyUccac: 8,   //Legacy UC chat agent component
});
const _WIDGET_TYPE_NAMES_FOR_I18N = Object.freeze({ //{widgetTypeId : widget type name forI i8n}
    0 : "LegacyButton",
    1 : "LegacyCallPanel",
    2 : "LegacyExtensionStatus",
    3 : "Text",
    4 : "CallTable",
    5 : "ExtensionTable",
    6 : "Note",
    7 : "LineTable",
    8 : "LegacyUccacWidget"
});

const _WIDGET_TYPE_DEFAULT_WIDTHS = Object.freeze({
    3 : 160, //text
    4 : 640,    //callTable
    5 : 640,   //extensionTable
    6 : 160, //note
    7 : 640, //lineTable
    8 : 470 //legacyUccac
});

const _WIDGET_TYPE_DEFAULT_HEIGHTS = Object.freeze({
    3 : 160, //text
    4 : 128,    //callTable
    5 : 128,   //extensionTable
    6 : 160, //note
    7 : 128, //lineTable
    8 : 300 //legacyUccac
});

//Text widget's fields
const _WIDGET_FIELD_NAME_WIDTH = "width";
const _WIDGET_FIELD_NAME_HEIGHT = "height";
const _WIDGET_FIELD_NAME_TEXT = "text";
const _WIDGET_FIELD_NAME_FONT_SIZE = "fontSize";
const _WIDGET_FIELD_NAME_FG_COLOR = "fgColor";
const _WIDGET_FIELD_NAME_BG_COLOR = "bgColor";
const _WIDGET_FIELD_NAME_BORDER_RADIUS = "borderRadius";

//Note widget's fields
const  _WIDGET_FIELD_NAME_NAME_NAME = "nameName";
const  _WIDGET_FIELD_NAME_NAME_LABEL = "nameLabel";
const  _WIDGET_FIELD_NAME_NAME_FONT_SIZE = "nameFontSize";
const  _WIDGET_FIELD_NAME_NAME_FG_COLOR = "nameFgColor";
const  _WIDGET_FIELD_NAME_NAME_BG_COLOR = "nameBgColor";
const _WIDGET_FIELD_NAME_TEXT_FONT_SIZE = "textFontSize";
const  _WIDGET_FIELD_NAME_TEXT_FG_COLOR = "textFgColor";
const  _WIDGET_FIELD_NAME_TEXT_BG_START_COLOR = "textBgStartColor";
const  _WIDGET_FIELD_NAME_TEXT_BG_END_COLOR = "textBgEndColor";

//Line table's fields
//const _WIDGET_FIELD_NAME_LINE_COUNT = "lineCount";
const _WIDGET_FIELD_NAME_LINE_DATA_ARRAY = "lineDataArray";
const _WIDGET_FIELD_NAME_TRANSFER_METHOD = "transferMethod";
const _WIDGET_FIELD_NAME_OUTER_BORDER_THICKNESS = "outerBorderThickness";
const _WIDGET_FIELD_NAME_OUTER_BORDER_COLOR = "outerBorderColor";
const _WIDGET_FIELD_NAME_OUTER_BORDER_RADIUS = "outerBorderRadius";

const _WIDGET_FIELD_NAME_HEADER_FONT_SIZE = "headerFontSize";
const _WIDGET_FIELD_NAME_HEADER_FG_COLOR = "headerFgColor";
const _WIDGET_FIELD_NAME_HEADER_BG_COLOR = "headerBgColor";
const _WIDGET_FIELD_NAME_HEADER_ROW_UNDERLINE_THICKNESS  = "headerRowUnderlineThickness";
const _WIDGET_FIELD_NAME_HEADER_ROW_UNDERLINE_COLOR  = "headerRowUnderlineColor";

const _WIDGET_FIELD_NAME_BODY_FONT_SIZE = "bodyFontSize";
const _WIDGET_FIELD_NAME_BODY_FG_COLOR = "bodyFgColor";
const _WIDGET_FIELD_NAME_BODY_ROW_UNDERLINE_THICKNESS = "bodyRowUnderlineThickness";
const _WIDGET_FIELD_NAME_BODY_ROW_UNDERLINE_COLOR = "bodyRowUnderlineColor";

const _WIDGET_FIELD_NAME_LINE_BUTTON_FONT_SIZE = "lineButtonFontSize";
const _WIDGET_FIELD_NAME_LINE_BUTTON_WIDTH = "lineButtonWidth";
const _WIDGET_FIELD_NAME_LINE_BUTTON_HEIGHT = "lineButtonHeight";
const _WIDGET_FIELD_NAME_LINE_BUTTON_FG_COLOR = "lineButtonFgColor";
const _WIDGET_FIELD_NAME_LINE_BUTTON_BG_COLOR = "lineButtonBgColor";
const _WIDGET_FIELD_NAME_LINE_BUTTON_OUTER_BORDER_COLOR = "lineButtonOuterBorderColor";
const _WIDGET_FIELD_NAME_LINE_BUTTON_OUTER_BORDER_RADIUS = "lineButtonOuterBorderRadius";
const _WIDGET_FIELD_NAME_LINE_BUTTON_OUTER_BORDER_THICKNESS = "lineButtonOuterBorderThickness";

const _WIDGET_FIELD_NAME_TRANSFER_BUTTON_FONT_SIZE = "transferButtonFontSize";
const _WIDGET_FIELD_NAME_TRANSFER_BUTTON_WIDTH = "transferButtonWidth";
const _WIDGET_FIELD_NAME_TRANSFER_BUTTON_HEIGHT = "transferButtonHeight";
const _WIDGET_FIELD_NAME_TRANSFER_BUTTON_FG_COLOR = "transferButtonFgColor";
const _WIDGET_FIELD_NAME_TRANSFER_BUTTON_BG_COLOR = "transferButtonBgColor";
const _WIDGET_FIELD_NAME_TRANSFER_BUTTON_OUTER_BORDER_COLOR = "transferButtonOuterBorderColor";
const _WIDGET_FIELD_NAME_TRANSFER_BUTTON_OUTER_BORDER_RADIUS = "transferButtonOuterBorderRadius";
const _WIDGET_FIELD_NAME_TRANSFER_BUTTON_OUTER_BORDER_THICKNESS = "transferButtonOuterBorderThickness";

const _WIDGET_FIELD_NAME_CANCEL_TRANSFER_BUTTON_FONT_SIZE = "cancelTransferButtonFontSize";
const _WIDGET_FIELD_NAME_CANCEL_TRANSFER_BUTTON_WIDTH = "cancelTransferButtonWidth";
const _WIDGET_FIELD_NAME_CANCEL_TRANSFER_BUTTON_HEIGHT = "cancelTransferButtonHeight";
const _WIDGET_FIELD_NAME_CANCEL_TRANSFER_BUTTON_FG_COLOR = "cancelTransferButtonFgColor";
const _WIDGET_FIELD_NAME_CANCEL_TRANSFER_BUTTON_BG_COLOR = "cancelTransferButtonBgColor";
const _WIDGET_FIELD_NAME_CANCEL_TRANSFER_BUTTON_OUTER_BORDER_COLOR = "cancelTransferButtonOuterBorderColor";
const _WIDGET_FIELD_NAME_CANCEL_TRANSFER_BUTTON_OUTER_BORDER_RADIUS = "cancelTransferButtonOuterBorderRadius";
const _WIDGET_FIELD_NAME_CANCEL_TRANSFER_BUTTON_OUTER_BORDER_THICKNESS = "cancelTransferButtonOuterBorderThickness";

//UC Chat agent component widget's fields
//
//const _WIDGET_FIELD_NAME_FG_COLOR = "fgColor";
//const _WIDGET_FIELD_NAME_BG_COLOR = "bgColor";
//const _WIDGET_FIELD_NAME_BORDER_RADIUS = "borderRadius";

const _WIDGET_FIELD_NAME_INSIDE_SHADOW_HORIZONTAL_OFFSET = "insideShadowHorizontalOffset";
const _WIDGET_FIELD_NAME_INSIDE_SHADOW_VERTICAL_OFFSET = "insideShadowVerticalOffset";
const _WIDGET_FIELD_NAME_INSIDE_SHADOW_BLUR = "insideShadowBlur";
const _WIDGET_FIELD_NAME_INSIDE_SHADOW_SPREAD = "insideShadowSpread";
const _WIDGET_FIELD_NAME_INSIDE_SHADOW_COLOR = "insideShadowColor";

const _WIDGET_FIELD_NAME_OUTSIDE_SHADOW_HORIZONTAL_OFFSET = "outsideShadowHorizontalOffset";
const _WIDGET_FIELD_NAME_OUTSIDE_SHADOW_VERTICAL_OFFSET = "outsideShadowVerticalOffset";
const _WIDGET_FIELD_NAME_OUTSIDE_SHADOW_BLUR = "outsideShadowBlur";
const _WIDGET_FIELD_NAME_OUTSIDE_SHADOW_SPREAD = "outsideShadowSpread";
const _WIDGET_FIELD_NAME_OUTSIDE_SHADOW_COLOR = "outsideShadowColor";

//Extension status widget's fields
//
const _WIDGET_FIELD_NAME_EXTENSION = "extension";
//const _WIDGET_FIELD_NAME_FG_COLOR = "fgColor";
const _WIDGET_FIELD_NAME_LAMP_SIZE = "lampSize";
const _WIDGET_FIELD_NAME_TEXT_TOP_MARGIN = "textTopMargin";
//const _WIDGET_FIELD_NAME_FONT_SIZE = "fontSize";

//Extension table widget's fields
//
//const _WIDGET_FIELD_NAME_BG_COLOR = "bgColor";

//const _WIDGET_FIELD_NAME_OUTER_BORDER_THICKNESS = "outerBorderThickness";
//const _WIDGET_FIELD_NAME_OUTER_BORDER_COLOR = "outerBorderColor";
//const _WIDGET_FIELD_NAME_OUTER_BORDER_RADIUS = "outerBorderRadius";

//const _WIDGET_FIELD_NAME_HEADER_FG_COLOR = "headerFgColor";
//const _WIDGET_FIELD_NAME_HEADER_BG_COLOR = "headerBgColor";
//const _WIDGET_FIELD_NAME_HEADER_ROW_UNDERLINE_THICKNESS = "headerRowUnderlineThickness";
//const _WIDGET_FIELD_NAME_HEADER_ROW_UNDERLINE_COLOR = "headerRowUnderlineColor";
//const _WIDGET_FIELD_NAME_HEADER_FONT_SIZE = "headerFontSize";

//const _WIDGET_FIELD_NAME_BODY_FG_COLOR = "bodyFgColor";
//const _WIDGET_FIELD_NAME_BODY_ROW_UNDERLINE_THICKNESS = "bodyRowUnderlineThickness";
//const _WIDGET_FIELD_NAME_BODY_ROW_UNDERLINE_COLOR = "bodyRowUnderlineColor";
//const _WIDGET_FIELD_NAME_BODY_FONT_SIZE = "bodyFontSize";

//Call table widget's fields
//
//const _WIDGET_FIELD_NAME_BG_COLOR = "bgColor";
//const _WIDGET_FIELD_NAME_OUTER_BORDER_THICKNESS = "outerBorderThickness";
//const _WIDGET_FIELD_NAME_OUTER_BORDER_COLOR = "outerBorderColor";
//const _WIDGET_FIELD_NAME_OUTER_BORDER_RADIUS = "outerBorderRadius";
//const _WIDGET_FIELD_NAME_HEADER_FG_COLOR = "headerFgColor";
//const _WIDGET_FIELD_NAME_HEADER_BG_COLOR = "headerBgColor";
//const _WIDGET_FIELD_NAME_HEADER_ROW_UNDERLINE_THICKNESS = "headerRowUnderlineThickness";
//const _WIDGET_FIELD_NAME_HEADER_ROW_UNDERLINE_COLOR = "headerRowUnderlineColor";
//const _WIDGET_FIELD_NAME_BODY_FG_COLOR = "bodyFgColor";
//const _WIDGET_FIELD_NAME_BODY_ROW_UNDERLINE_THICKNESS = "bodyRowUnderlineThickness";
//const _WIDGET_FIELD_NAME_BODY_ROW_UNDERLINE_COLOR = "bodyRowUnderlineColor";
//const _WIDGET_FIELD_NAME_HEADER_FONT_SIZE = "headerFontSize";
//const _WIDGET_FIELD_NAME_BODY_FONT_SIZE = "bodyFontSize";
const _WIDGET_FIELD_NAME_BODY_ACTIVE_ROW_BG_COLOR = "bodyActiveRowBgColor";
const _WIDGET_FIELD_NAME_ACTIVE_BUTTON_FONT_SIZE = "activeButtonFontSize";
const _WIDGET_FIELD_NAME_ACTIVE_BUTTON_WIDTH = "activeButtonWidth";
const _WIDGET_FIELD_NAME_ACTIVE_BUTTON_HEIGHT = "activeButtonHeight";
const _WIDGET_FIELD_NAME_BODY_ACTIVE_ROW_FG_COLOR = "bodyActiveRowFgColor";

//CallPanel widget's fields
//
//const _WIDGET_FIELD_NAME_FG_COLOR = "fgColor";
//const _WIDGET_FIELD_NAME_BG_COLOR = "bgColor";
//const _WIDGET_FIELD_NAME_BORDER_RADIUS = "borderRadius";

//const _WIDGET_FIELD_NAME_INSIDE_SHADOW_HORIZONTAL_OFFSET = "insideShadowHorizontalOffset";
//const _WIDGET_FIELD_NAME_INSIDE_SHADOW_VERTICAL_OFFSET = "insideShadowVerticalOffset";
//const _WIDGET_FIELD_NAME_INSIDE_SHADOW_BLUR = "insideShadowBlur";
//const _WIDGET_FIELD_NAME_INSIDE_SHADOW_SPREAD = "insideShadowSpread";
//const _WIDGET_FIELD_NAME_INSIDE_SHADOW_COLOR = "insideShadowColor";

//const _WIDGET_FIELD_NAME_OUTSIDE_SHADOW_HORIZONTAL_OFFSET = "outsideShadowHorizontalOffset";
//const _WIDGET_FIELD_NAME_OUTSIDE_SHADOW_VERTICAL_OFFSET = "outsideShadowVerticalOffset";
//const _WIDGET_FIELD_NAME_OUTSIDE_SHADOW_BLUR = "outsideShadowBlur";
//const _WIDGET_FIELD_NAME_OUTSIDE_SHADOW_SPREAD = "outsideShadowSpread";
//const _WIDGET_FIELD_NAME_OUTSIDE_SHADOW_COLOR = "outsideShadowColor";

//LegacyButtonWidget widget's fields
//Not include subtype datas
//
const _WIDGET_FIELD_NAME__LEGACY_BUTTON_WIDGET_SUB_TYPE_ID = "legacy-button_subTypeId";
const _WIDGET_FIELD_NAME_TOOLTIP_JA = "tooltip_ja";
const _WIDGET_FIELD_NAME_TOOLTIP_EN = "tooltip_en";

//LegacyButtonWidgetSubData fields
//
const _WIDGET_FIELD_NAME_LABEL = "label";
const _WIDGET_FIELD_NAME_ICON = "icon";
const _WIDGET_FIELD_NAME_ICON_NAME = "iconName";
const _WIDGET_FIELD_NAME_ICON_WIDTH = "iconWidth";
const _WIDGET_FIELD_NAME_ICON_HEIGHT = "iconHeight";

const _WIDGET_FIELD_NAME_KEYPAD_BUTTON__SYMBOL = "keypad-button_symbol";

const _WIDGET_FIELD_NAME_LINE_BUTTON__LINE = "line-button_line";

const _WIDGET_FIELD_NAME_ONETOUCHDIAL_BUTTON__NUMBER = "onetouchdial-button_number";
const _WIDGET_FIELD_NAME_ONETOUCHDIAL_BUTTON__MODE = "onetouchdial-button_mode";

const _WIDGET_FIELD_NAME_PARKCALL_BUTTON__NUMBER = "parkcall-button_number";

const _WIDGET_FIELD_NAME_KEYPAD_BUTTON__ZERO = "keypad-button_zero";
const _WIDGET_FIELD_NAME_KEYPAD_BUTTON__ONE = "keypad-button_one";
const _WIDGET_FIELD_NAME_KEYPAD_BUTTON__TWO = "keypad-button_two";
const _WIDGET_FIELD_NAME_KEYPAD_BUTTON__THREE = "keypad-button_three";
const _WIDGET_FIELD_NAME_KEYPAD_BUTTON__FOUR = "keypad-button_four";
const _WIDGET_FIELD_NAME_KEYPAD_BUTTON__FIVE = "keypad-button_five";
const _WIDGET_FIELD_NAME_KEYPAD_BUTTON__SIX = "keypad-button_six";
const _WIDGET_FIELD_NAME_KEYPAD_BUTTON__SEVEN = "keypad-button_seven";
const _WIDGET_FIELD_NAME_KEYPAD_BUTTON__EIGHT = "keypad-button_eight";
const _WIDGET_FIELD_NAME_KEYPAD_BUTTON__NINE = "keypad-button_nine";
const _WIDGET_FIELD_NAME_KEYPAD_BUTTON__ASTERISK = "keypad-button_asterisk";
const _WIDGET_FIELD_NAME_KEYPAD_BUTTON__SHARP = "keypad-button_sharp";

const  _WIDGET_FIELD_NAME_TOGGLE_HOLD_BUTTON__HOLD_ICON  = "toggleHold-button_hold-icon";
const  _WIDGET_FIELD_NAME_TOGGLE_HOLD_BUTTON__HOLD_ICON_NAME = "toggleHold-button_hold-iconName";
const  _WIDGET_FIELD_NAME_TOGGLE_HOLD_BUTTON__HOLD_ICON_WIDTH = "toggleHold-button_hold-iconWidth";
const  _WIDGET_FIELD_NAME_TOGGLE_HOLD_BUTTON__HOLD_ICON_HEIGHT = "toggleHold-button_hold-iconHeight";
const  _WIDGET_FIELD_NAME_TOGGLE_HOLD_BUTTON__HOLD_FONT_SIZE = "toggleHold-button_hold-fontSize";
const  _WIDGET_FIELD_NAME_TOGGLE_HOLD_BUTTON__HOLD_FG_COLOR = "toggleHold-button_hold-fgColor";
const  _WIDGET_FIELD_NAME_TOGGLE_HOLD_BUTTON__HOLD_BG_COLOR = "toggleHold-button_hold-bgColor";
const  _WIDGET_FIELD_NAME_TOGGLE_HOLD_BUTTON__HOLD_OUTER_BORDER_COLOR = "toggleHold-button_hold-outerBorderColor";
const  _WIDGET_FIELD_NAME_TOGGLE_HOLD_BUTTON__HOLD_OUTER_BORDER_RADIUS = "toggleHold-button_hold-outerBorderRadius";
const  _WIDGET_FIELD_NAME_TOGGLE_HOLD_BUTTON__HOLD_OUTER_BORDER_THICKNESS = "toggleHold-button_hold-outerBorderThickness";
const  _WIDGET_FIELD_NAME_TOGGLE_HOLD_BUTTON__HOLD_LABEL = "toggleHold-button_hold-label";

const  _WIDGET_FIELD_NAME_TOGGLE_HOLD_BUTTON__UNHOLD_ICON  = "toggleHold-button_unhold-iIcon";
const  _WIDGET_FIELD_NAME_TOGGLE_HOLD_BUTTON__UNHOLD_ICON_NAME = "toggleHold-button_unhold-iconName";
const  _WIDGET_FIELD_NAME_TOGGLE_HOLD_BUTTON__UNHOLD_ICON_WIDTH = "toggleHold-button_unhold-iconWidth";
const  _WIDGET_FIELD_NAME_TOGGLE_HOLD_BUTTON__UNHOLD_ICON_HEIGHT = "toggleHold-button_unhold-iconHeight";
const  _WIDGET_FIELD_NAME_TOGGLE_HOLD_BUTTON__UNHOLD_FONT_SIZE = "toggleHold-button_unhold-fontSize";
const  _WIDGET_FIELD_NAME_TOGGLE_HOLD_BUTTON__UNHOLD_FG_COLOR = "toggleHold-button_unhold-fgColor";
const  _WIDGET_FIELD_NAME_TOGGLE_HOLD_BUTTON__UNHOLD_BG_COLOR = "toggleHold-button_unhold-bgColor";
const  _WIDGET_FIELD_NAME_TOGGLE_HOLD_BUTTON__UNHOLD_OUTER_BORDER_COLOR = "toggleHold-button_unhold-outerBorderColor";
const  _WIDGET_FIELD_NAME_TOGGLE_HOLD_BUTTON__UNHOLD_OUTER_BORDER_RADIUS = "toggleHold-button_unhold-outerBorderRadius";
const  _WIDGET_FIELD_NAME_TOGGLE_HOLD_BUTTON__UNHOLD_OUTER_BORDER_THICKNESS = "toggleHold-button_unhold-outerBorderThickness";
const  _WIDGET_FIELD_NAME_TOGGLE_HOLD_BUTTON__UNHOLD_LABEL = "toggleHold-button_unhold-label";

const _WIDGET_FIELD_NAME_TRANSFER_BUTTON__TRANSFER_LABEL = "transfer-button_transfer-label";
const _WIDGET_FIELD_NAME_TRANSFER_BUTTON__TRANSFER_ICON = "transfer-button_transfer-icon";
const _WIDGET_FIELD_NAME_TRANSFER_BUTTON__TRANSFER_ICON_NAME = "transfer-button_transfer-iconName";
const _WIDGET_FIELD_NAME_TRANSFER_BUTTON__TRANSFER_ICON_WIDTH = "transfer-button_transfer-iconWidth";
const _WIDGET_FIELD_NAME_TRANSFER_BUTTON__TRANSFER_ICON_HEIGHT = "transfer-button_transfer-iconHeight";
const _WIDGET_FIELD_NAME_TRANSFER_BUTTON__TRANSFER_FONT_SIZE = "transfer-button_transfer-fontSize";
const _WIDGET_FIELD_NAME_TRANSFER_BUTTON__TRANSFER_FG_COLOR = "transfer-button_transfer-fgColor";
const _WIDGET_FIELD_NAME_TRANSFER_BUTTON__TRANSFER_BG_COLOR = "transfer-button_transfer-bgColor";
const _WIDGET_FIELD_NAME_TRANSFER_BUTTON__TRANSFER_OUTER_BORDER_COLOR = "transfer-button_transfer-outerBorderColor";
const _WIDGET_FIELD_NAME_TRANSFER_BUTTON__TRANSFER_OUTER_BORDER_RADIUS = "transfer-button_transfer-outerBorderRadius";
const _WIDGET_FIELD_NAME_TRANSFER_BUTTON__TRANSFER_OUTER_BORDER_THICKNESS = "transfer-button_transfer-outerBorderThickness";
const _WIDGET_FIELD_NAME_TRANSFER_BUTTON__MODE = "transfer-button_mode";

const _WIDGET_FIELD_NAME_TRANSFER_BUTTON__CANCEL_TRANSFER_LABEL = "transfer-button_cancelTransfer-label";
const _WIDGET_FIELD_NAME_TRANSFER_BUTTON__CANCEL_TRANSFER_ICON = "transfer-button_cancelTransfer-icon";
const _WIDGET_FIELD_NAME_TRANSFER_BUTTON__CANCEL_TRANSFER_ICON_NAME = "transfer-button_cancelTransfer-iconName";
const _WIDGET_FIELD_NAME_TRANSFER_BUTTON__CANCEL_TRANSFER_ICON_WIDTH = "transfer-button_cancelTransfer-iconWidth";
const _WIDGET_FIELD_NAME_TRANSFER_BUTTON__CANCEL_TRANSFER_ICON_HEIGHT = "transfer-button_cancelTransfer-iconHeight";
const _WIDGET_FIELD_NAME_TRANSFER_BUTTON__CANCEL_TRANSFER_FONT_SIZE = "transfer-button_cancelTransfer-fontSize";
const _WIDGET_FIELD_NAME_TRANSFER_BUTTON__CANCEL_TRANSFER_FG_COLOR = "transfer-button_cancelTransfer-fgColor";
const _WIDGET_FIELD_NAME_TRANSFER_BUTTON__CANCEL_TRANSFER_BG_COLOR = "transfer-button_cancelTransfer-bgColor";
const _WIDGET_FIELD_NAME_TRANSFER_BUTTON__CANCEL_TRANSFER_OUTER_BORDER_COLOR = "transfer-button_cancelTransfer-outerBorderColor";
const _WIDGET_FIELD_NAME_CANCEL_TRANSFER_OUTER_BORDER_RADIUS = "transfer-button_cancelTransfer-outerBorderRadius";
const _WIDGET_FIELD_NAME_TRANSFER_BUTTON__CANCEL_TRANSFER_OUTER_BORDER_THICKNESS = "transfer-button_cancelTransfer-outerBorderThickness";

//!abstract
export default class WidgetData{
    constructor( options ) {
        this._WidgetDatasAsParent = options["widgetDatasAsParent"];

        // const oWidgetData = options["oWidgetData"];
        // if( oWidgetData ){
        //     this._widgetUuid = oWidgetData["widgetUuid"];
        //     this._widgetRelativePositionX = oWidgetData["widgetRelativePositionX"];
        //     this._widgetRelativePositionY = oWidgetData["widgetRelativePositionY"];
        //     this._widgetWidth = oWidgetData["widgetWidth"];
        //     this._widgetHeight = oWidgetData["widgetHeight"];
        //     this._WidgetTypeId= oWidgetData["widgetTypeId"];
        // }
        // else {
            this._widgetUuid = options["widgetUuid"];
            this._WidgetTypeId = options["widgetTypeId"];
            this._widgetRelativePositionX = options["widgetRelativePositionX"];
            this._widgetRelativePositionY = options["widgetRelativePositionY"];
            this._widgetWidth = options["widgetWidth"];
            this._widgetHeight = options["widgetHeight"];
        //}
    }

    getWidgetTypeId(){
        return this._WidgetTypeId;
    }

    getWidgetNameForI18n(){
        const widgetTypeId = this.getWidgetTypeId();
        const nameForI18n = _WIDGET_TYPE_NAMES_FOR_I18N[ widgetTypeId ];
        return nameForI18n;
    }

    setWidgetDataToObject( o, parent ){
        if( parent ){
            o["widgetDatasAsParent"] = parent;
        }
        o["widgetUuid"] = this._widgetUuid;
        o["widgetRelativePositionX"] = this._widgetRelativePositionX;
        o["widgetRelativePositionY"] = this._widgetRelativePositionY;
        o["widgetWidth"] = this._widgetWidth;
        o["widgetHeight"] = this._widgetHeight;
        o["widgetTypeId"] = this._WidgetTypeId;

        this.setWidgetDataToObjectMain( o );
    }

    //!abstract
    setWidgetDataToObjectMain( o ){
        throw new Error("Not implemented.");
    }

    static get WIDGET_TYPE_IDS(){
        return _WIDGET_TYPE_IDS;
    }
	
	static get WIDGET_TYPE_ID__LEGACY_BUTTON(){
		return _WIDGET_TYPE_ID__LEGACY_BUTTON;
	}

    static get WIDGET_TYPE_DEFAULT_WIDTHS(){
        return _WIDGET_TYPE_DEFAULT_WIDTHS;
    }

    static get WIDGET_TYPE_DEFAULT_HEIGHTS(){
        return _WIDGET_TYPE_DEFAULT_HEIGHTS;
    }

    static getWidgetTypeIdByWidgetTypeName( widgetTypeName ){
        const entries = Object.entries(_WIDGET_TYPE_NAMES_FOR_I18N);
        let widgetTypeId = -1;
        for (const [sCurrentWidgetTypeId, currentWidgetTypeName] of entries  ) {
            if( currentWidgetTypeName === widgetTypeName ){
                widgetTypeId = parseInt( sCurrentWidgetTypeId );
                break;
            }
        }
        return widgetTypeId;
    }

    //!abstract
    importFromWidget_ver0_1( widget_ver0_1 ){
        throw new Error("Not implemented.");
    }

    getWidgetRelativePositionX(){
        return this._widgetRelativePositionX;
    }

    getWidgetRelativePositionY(){
        return this._widgetRelativePositionY;
    }

    getWidgetDatasAsParent(){
        return this._WidgetDatasAsParent;
    }

    setWidgetRelativePositionX( x ){
        this._widgetRelativePositionX = x;
    }

    setWidgetRelativePositionY( y ){
        this._widgetRelativePositionY= y;
    }

    setWidgetWidth( w ){
        this._widgetWidth = w;
    }

    setWidgetHeight( h ){
        this._widgetHeight = h;
    }

    getWidgetWidth(){
        return this._widgetWidth;
    }

    getWidgetHeight(){
        return this._widgetHeight;
    }

    getWidgetUuid(){
        return this._widgetUuid;
    }

    loadFromWidgetSettingsTemplate( wst, bIncludeButtonFunction ){
        this._widgetWidth= wst.getWidgetSettingsTemplateFieldValue( _WIDGET_FIELD_NAME_WIDTH );
        this._widgetHeight = wst.getWidgetSettingsTemplateFieldValue( _WIDGET_FIELD_NAME_HEIGHT  );
        this.loadFromWidgetSettingsTemplateMain( wst, bIncludeButtonFunction );
    }

    saveToWidgetSettingsTemplate( wst ){
        wst.clearWidgetSettingsTemplateFields();
        wst.setWidgetSettingsTemplateField( _WIDGET_FIELD_NAME_WIDTH, this._widgetWidth );
        wst.setWidgetSettingsTemplateField( _WIDGET_FIELD_NAME_HEIGHT, this._widgetHeight );
        this.saveToWidgetSettingsTemplateMain(wst);
    }

    //!abstract
    loadFromWidgetSettingsTemplateMain( wst, bIncludeButtonFunction = undefined ){
        throw new Error("Not implemented.");
    }

    //!abstract
    saveToWidgetSettingsTemplateMain( wst ){
        throw new Error("Not implemented.");
    }

    static get WIDGET_FIELD_NAME_TEXT(){
        return _WIDGET_FIELD_NAME_TEXT;
    }

    static get WIDGET_FIELD_NAME_FONT_SIZE(){
        return _WIDGET_FIELD_NAME_FONT_SIZE;
    }

    static get WIDGET_FIELD_NAME_FG_COLOR(){
        return _WIDGET_FIELD_NAME_FG_COLOR;
    }

    static get WIDGET_FIELD_NAME_BG_COLOR(){
        return _WIDGET_FIELD_NAME_BG_COLOR;
    }

    static get WIDGET_FIELD_NAME_BORDER_RADIUS(){
        return _WIDGET_FIELD_NAME_BORDER_RADIUS;
    }

    static get WIDGET_FIELD_NAME_NAME_NAME() {
        return _WIDGET_FIELD_NAME_NAME_NAME
    }

    static get WIDGET_FIELD_NAME_NAME_LABEL(){
        return _WIDGET_FIELD_NAME_NAME_LABEL;
    }

    static get WIDGET_FIELD_NAME_NAME_FONT_SIZE(){
        return _WIDGET_FIELD_NAME_NAME_FONT_SIZE;
    }

    static get WIDGET_FIELD_NAME_NAME_FG_COLOR(){
        return _WIDGET_FIELD_NAME_NAME_FG_COLOR;
    }

    static get WIDGET_FIELD_NAME_NAME_BG_COLOR(){
        return _WIDGET_FIELD_NAME_NAME_BG_COLOR;
    }

    static get WIDGET_FIELD_NAME_TEXT_FONT_SIZE(){
        return _WIDGET_FIELD_NAME_TEXT_FONT_SIZE;
    }

    static get WIDGET_FIELD_NAME_TEXT_FG_COLOR(){
        return _WIDGET_FIELD_NAME_TEXT_FG_COLOR;
    }

    static get WIDGET_FIELD_NAME_TEXT_BG_START_COLOR(){
        return _WIDGET_FIELD_NAME_TEXT_BG_START_COLOR;
    }

    static get WIDGET_FIELD_NAME_TEXT_BG_END_COLOR(){
        return _WIDGET_FIELD_NAME_TEXT_BG_END_COLOR;
    }

    // static get WIDGET_FIELD_NAME_LINE_COUNT(){
    //     return _WIDGET_FIELD_NAME_LINE_COUNT;
    // }

    static get WIDGET_FIELD_NAME_LINE_DATA_ARRAY(){
        return _WIDGET_FIELD_NAME_LINE_DATA_ARRAY;
    }

    static get WIDGET_FIELD_NAME_TRANSFER_METHOD(){
        return _WIDGET_FIELD_NAME_TRANSFER_METHOD;
    }

    static get WIDGET_FIELD_NAME_OUTER_BORDER_THICKNESS(){
        return _WIDGET_FIELD_NAME_OUTER_BORDER_THICKNESS;
    }

    static get WIDGET_FIELD_NAME_OUTER_BORDER_COLOR(){
        return _WIDGET_FIELD_NAME_OUTER_BORDER_COLOR;
    }

    static get  WIDGET_FIELD_NAME_OUTER_BORDER_RADIUS(){
        return _WIDGET_FIELD_NAME_OUTER_BORDER_RADIUS;
    }

    static get  WIDGET_FIELD_NAME_HEADER_FONT_SIZE() {
        return _WIDGET_FIELD_NAME_HEADER_FONT_SIZE;
    }

    static get WIDGET_FIELD_NAME_HEADER_FG_COLOR(){
        return _WIDGET_FIELD_NAME_HEADER_FG_COLOR;
    }

    static get WIDGET_FIELD_NAME_HEADER_BG_COLOR(){
        return _WIDGET_FIELD_NAME_HEADER_BG_COLOR;
    }

    static get WIDGET_FIELD_NAME_HEADER_ROW_UNDERLINE_THICKNESS(){
        return _WIDGET_FIELD_NAME_HEADER_ROW_UNDERLINE_THICKNESS;
    }

    static get WIDGET_FIELD_NAME_HEADER_ROW_UNDERLINE_COLOR(){
        return _WIDGET_FIELD_NAME_HEADER_ROW_UNDERLINE_COLOR;
    }

    static get WIDGET_FIELD_NAME_BODY_FONT_SIZE(){
        return  _WIDGET_FIELD_NAME_BODY_FONT_SIZE;
    }

    static get WIDGET_FIELD_NAME_BODY_FG_COLOR(){
        return _WIDGET_FIELD_NAME_BODY_FG_COLOR;
    }

    static get WIDGET_FIELD_NAME_BODY_ROW_UNDERLINE_THICKNESS(){
        return _WIDGET_FIELD_NAME_BODY_ROW_UNDERLINE_THICKNESS;
    }

    static get WIDGET_FIELD_NAME_BODY_ROW_UNDERLINE_COLOR(){
        return _WIDGET_FIELD_NAME_BODY_ROW_UNDERLINE_COLOR;
    }

    static get WIDGET_FIELD_NAME_LINE_BUTTON_FONT_SIZE(){
        return _WIDGET_FIELD_NAME_LINE_BUTTON_FONT_SIZE;
    }

    static get WIDGET_FIELD_NAME_LINE_BUTTON_WIDTH(){
        return _WIDGET_FIELD_NAME_LINE_BUTTON_WIDTH;
    }

    static get WIDGET_FIELD_NAME_LINE_BUTTON_HEIGHT(){
        return _WIDGET_FIELD_NAME_LINE_BUTTON_HEIGHT;
    }

    static get WIDGET_FIELD_NAME_LINE_BUTTON_FG_COLOR(){
        return _WIDGET_FIELD_NAME_LINE_BUTTON_FG_COLOR;
    }

    static get WIDGET_FIELD_NAME_LINE_BUTTON_BG_COLOR(){
        return _WIDGET_FIELD_NAME_LINE_BUTTON_BG_COLOR;
    }

    static get WIDGET_FIELD_NAME_LINE_BUTTON_OUTER_BORDER_COLOR(){
        return _WIDGET_FIELD_NAME_LINE_BUTTON_OUTER_BORDER_COLOR;
    }

    static get WIDGET_FIELD_NAME_LINE_BUTTON_OUTER_BORDER_RADIUS(){
        return _WIDGET_FIELD_NAME_LINE_BUTTON_OUTER_BORDER_RADIUS;
    }

    static get WIDGET_FIELD_NAME_LINE_BUTTON_OUTER_BORDER_THICKNESS(){
        return _WIDGET_FIELD_NAME_LINE_BUTTON_OUTER_BORDER_THICKNESS;
    }

    static get WIDGET_FIELD_NAME_TRANSFER_BUTTON_FONT_SIZE() {
        return _WIDGET_FIELD_NAME_TRANSFER_BUTTON_FONT_SIZE;
    }

    static get WIDGET_FIELD_NAME_TRANSFER_BUTTON_WIDTH(){
        return _WIDGET_FIELD_NAME_TRANSFER_BUTTON_WIDTH;
    }

    static get WIDGET_FIELD_NAME_TRANSFER_BUTTON_HEIGHT(){
        return _WIDGET_FIELD_NAME_TRANSFER_BUTTON_HEIGHT;
    }

    static get WIDGET_FIELD_NAME_TRANSFER_BUTTON_FG_COLOR(){
        return _WIDGET_FIELD_NAME_TRANSFER_BUTTON_FG_COLOR;
    }

    static get WIDGET_FIELD_NAME_TRANSFER_BUTTON_BG_COLOR(){
        return _WIDGET_FIELD_NAME_TRANSFER_BUTTON_BG_COLOR;
    }

    static get WIDGET_FIELD_NAME_TRANSFER_BUTTON_OUTER_BORDER_COLOR(){
        return _WIDGET_FIELD_NAME_TRANSFER_BUTTON_OUTER_BORDER_COLOR;
    }

    static get WIDGET_FIELD_NAME_TRANSFER_BUTTON_OUTER_BORDER_RADIUS(){
        return _WIDGET_FIELD_NAME_TRANSFER_BUTTON_OUTER_BORDER_RADIUS;
    }

    static get WIDGET_FIELD_NAME_TRANSFER_BUTTON_OUTER_BORDER_THICKNESS(){
        return _WIDGET_FIELD_NAME_TRANSFER_BUTTON_OUTER_BORDER_THICKNESS;
    }

    static get WIDGET_FIELD_NAME_CANCEL_TRANSFER_BUTTON_FONT_SIZE(){
        return _WIDGET_FIELD_NAME_CANCEL_TRANSFER_BUTTON_FONT_SIZE;
    }

    static get WIDGET_FIELD_NAME_CANCEL_TRANSFER_BUTTON_WIDTH(){
        return _WIDGET_FIELD_NAME_CANCEL_TRANSFER_BUTTON_WIDTH;
    }

    static get WIDGET_FIELD_NAME_CANCEL_TRANSFER_BUTTON_HEIGHT(){
        return _WIDGET_FIELD_NAME_CANCEL_TRANSFER_BUTTON_HEIGHT;
    }

    static get WIDGET_FIELD_NAME_CANCEL_TRANSFER_BUTTON_FG_COLOR(){
        return _WIDGET_FIELD_NAME_CANCEL_TRANSFER_BUTTON_FG_COLOR;
    }

    static get WIDGET_FIELD_NAME_CANCEL_TRANSFER_BUTTON_BG_COLOR(){
        return _WIDGET_FIELD_NAME_CANCEL_TRANSFER_BUTTON_BG_COLOR;
    }

    static get WIDGET_FIELD_NAME_CANCEL_TRANSFER_BUTTON_OUTER_BORDER_COLOR(){
        return _WIDGET_FIELD_NAME_CANCEL_TRANSFER_BUTTON_OUTER_BORDER_COLOR;
    }

    static get WIDGET_FIELD_NAME_CANCEL_TRANSFER_BUTTON_OUTER_BORDER_RADIUS(){
        return _WIDGET_FIELD_NAME_CANCEL_TRANSFER_BUTTON_OUTER_BORDER_RADIUS;
    }

    static get WIDGET_FIELD_NAME_CANCEL_TRANSFER_BUTTON_OUTER_BORDER_THICKNESS(){
        return _WIDGET_FIELD_NAME_CANCEL_TRANSFER_BUTTON_OUTER_BORDER_THICKNESS;
    }

    static get WIDGET_FIELD_NAME_INSIDE_SHADOW_HORIZONTAL_OFFSET(){
        return _WIDGET_FIELD_NAME_INSIDE_SHADOW_HORIZONTAL_OFFSET;
    }

    static get WIDGET_FIELD_NAME_INSIDE_SHADOW_VERTICAL_OFFSET(){
        return _WIDGET_FIELD_NAME_INSIDE_SHADOW_VERTICAL_OFFSET;
    }

    static get WIDGET_FIELD_NAME_INSIDE_SHADOW_BLUR(){
        return _WIDGET_FIELD_NAME_INSIDE_SHADOW_BLUR;
    }

    static get WIDGET_FIELD_NAME_INSIDE_SHADOW_SPREAD(){
        return _WIDGET_FIELD_NAME_INSIDE_SHADOW_SPREAD;
    }

    static get WIDGET_FIELD_NAME_INSIDE_SHADOW_COLOR(){
        return _WIDGET_FIELD_NAME_INSIDE_SHADOW_COLOR;
    }

    static get WIDGET_FIELD_NAME_OUTSIDE_SHADOW_HORIZONTAL_OFFSET(){
        return _WIDGET_FIELD_NAME_OUTSIDE_SHADOW_HORIZONTAL_OFFSET;
    }

    static get WIDGET_FIELD_NAME_OUTSIDE_SHADOW_VERTICAL_OFFSET(){
        return _WIDGET_FIELD_NAME_OUTSIDE_SHADOW_VERTICAL_OFFSET;
    }

    static get WIDGET_FIELD_NAME_OUTSIDE_SHADOW_BLUR(){
        return _WIDGET_FIELD_NAME_OUTSIDE_SHADOW_BLUR;
    }

    static get WIDGET_FIELD_NAME_OUTSIDE_SHADOW_SPREAD(){
        return _WIDGET_FIELD_NAME_OUTSIDE_SHADOW_SPREAD;
    }

    static get WIDGET_FIELD_NAME_OUTSIDE_SHADOW_COLOR(){
        return _WIDGET_FIELD_NAME_OUTSIDE_SHADOW_COLOR;
    }

    static get WIDGET_FIELD_NAME_EXTENSION(){
        return _WIDGET_FIELD_NAME_EXTENSION;
    }
    static get WIDGET_FIELD_NAME_LAMP_SIZE(){
        return _WIDGET_FIELD_NAME_LAMP_SIZE;
    }
    static get WIDGET_FIELD_NAME_TEXT_TOP_MARGIN(){
        return _WIDGET_FIELD_NAME_TEXT_TOP_MARGIN;
    }

    static get WIDGET_FIELD_NAME_BODY_ACTIVE_ROW_BG_COLOR(){
        return _WIDGET_FIELD_NAME_BODY_ACTIVE_ROW_BG_COLOR;
    }

    static get WIDGET_FIELD_NAME_ACTIVE_BUTTON_FONT_SIZE(){
        return _WIDGET_FIELD_NAME_ACTIVE_BUTTON_FONT_SIZE;
    }

    static get WIDGET_FIELD_NAME_ACTIVE_BUTTON_WIDTH(){
        return _WIDGET_FIELD_NAME_ACTIVE_BUTTON_WIDTH;
    }

    static get  WIDGET_FIELD_NAME_ACTIVE_BUTTON_HEIGHT(){
        return _WIDGET_FIELD_NAME_ACTIVE_BUTTON_HEIGHT;
    }

    static get WIDGET_FIELD_NAME_BODY_ACTIVE_ROW_FG_COLOR(){
        return _WIDGET_FIELD_NAME_BODY_ACTIVE_ROW_FG_COLOR;
    }

    static get WIDGET_FIELD_NAME__LEGACY_BUTTON_WIDGET_SUB_TYPE_ID(){
        return _WIDGET_FIELD_NAME__LEGACY_BUTTON_WIDGET_SUB_TYPE_ID;
    }

    static get WIDGET_FIELD_NAME_TOOLTIP_JA(){
        return _WIDGET_FIELD_NAME_TOOLTIP_JA;
    }

    static get WIDGET_FIELD_NAME_TOOLTIP_EN(){
        return _WIDGET_FIELD_NAME_TOOLTIP_EN;
    }

    static get WIDGET_FIELD_NAME_LABEL(){
        return _WIDGET_FIELD_NAME_LABEL;
    }

    static get WIDGET_FIELD_NAME_ICON(){
        return _WIDGET_FIELD_NAME_ICON;
    }

    static get WIDGET_FIELD_NAME_ICON_NAME(){
        return  _WIDGET_FIELD_NAME_ICON_NAME;
    }

    static get WIDGET_FIELD_NAME_ICON_WIDTH(){
        return _WIDGET_FIELD_NAME_ICON_WIDTH;
    }

    static get WIDGET_FIELD_NAME_ICON_HEIGHT(){
        return _WIDGET_FIELD_NAME_ICON_HEIGHT;
    }

    static get WIDGET_FIELD_NAME_KEYPAD_BUTTON__SYMBOL(){
        return _WIDGET_FIELD_NAME_KEYPAD_BUTTON__SYMBOL;
    }

    static get  WIDGET_FIELD_NAME_LINE_BUTTON__LINE(){
        return _WIDGET_FIELD_NAME_LINE_BUTTON__LINE;
    }

    static get WIDGET_FIELD_NAME_ONETOUCHDIAL_BUTTON__NUMBER(){
        return _WIDGET_FIELD_NAME_ONETOUCHDIAL_BUTTON__NUMBER;
    }

    static get WIDGET_FIELD_NAME_ONETOUCHDIAL_BUTTON__MODE(){
        return _WIDGET_FIELD_NAME_ONETOUCHDIAL_BUTTON__MODE;
    }

    static get WIDGET_FIELD_NAME_PARKCALL_BUTTON__NUMBER(){
        return _WIDGET_FIELD_NAME_PARKCALL_BUTTON__NUMBER;
    }

    static get WIDGET_FIELD_NAME_KEYPAD_BUTTON__ZERO(){
        return _WIDGET_FIELD_NAME_KEYPAD_BUTTON__ZERO;
    }

    static get WIDGET_FIELD_NAME_KEYPAD_BUTTON__ONE(){
        return _WIDGET_FIELD_NAME_KEYPAD_BUTTON__ONE;
    }

    static get WIDGET_FIELD_NAME_KEYPAD_BUTTON__TWO(){
        return _WIDGET_FIELD_NAME_KEYPAD_BUTTON__TWO;
    }

    static get WIDGET_FIELD_NAME_KEYPAD_BUTTON__THREE(){
        return _WIDGET_FIELD_NAME_KEYPAD_BUTTON__THREE;
    }

    static get WIDGET_FIELD_NAME_KEYPAD_BUTTON__FOUR(){
        return _WIDGET_FIELD_NAME_KEYPAD_BUTTON__FOUR;
    }

    static get WIDGET_FIELD_NAME_KEYPAD_BUTTON__FIVE(){
        return _WIDGET_FIELD_NAME_KEYPAD_BUTTON__FIVE;
    }

    static get WIDGET_FIELD_NAME_KEYPAD_BUTTON__SIX(){
        return _WIDGET_FIELD_NAME_KEYPAD_BUTTON__SIX;
    }

    static get WIDGET_FIELD_NAME_KEYPAD_BUTTON__SEVEN(){
        return _WIDGET_FIELD_NAME_KEYPAD_BUTTON__SEVEN;
    }

    static get WIDGET_FIELD_NAME_KEYPAD_BUTTON__EIGHT(){
        return _WIDGET_FIELD_NAME_KEYPAD_BUTTON__EIGHT;
    }

    static get WIDGET_FIELD_NAME_KEYPAD_BUTTON__NINE(){
        return _WIDGET_FIELD_NAME_KEYPAD_BUTTON__NINE;
    }

    static get WIDGET_FIELD_NAME_KEYPAD_BUTTON__ASTERISK(){
        return _WIDGET_FIELD_NAME_KEYPAD_BUTTON__ASTERISK;
    }

    static get WIDGET_FIELD_NAME_KEYPAD_BUTTON__SHARP(){
        return _WIDGET_FIELD_NAME_KEYPAD_BUTTON__SHARP;
    }

    static get WIDGET_FIELD_NAME_TOGGLE_HOLD_BUTTON__HOLD_ICON(){
        return _WIDGET_FIELD_NAME_TOGGLE_HOLD_BUTTON__HOLD_ICON;
    }

    static get WIDGET_FIELD_NAME_TOGGLE_HOLD_BUTTON__HOLD_ICON_NAME(){
        return _WIDGET_FIELD_NAME_TOGGLE_HOLD_BUTTON__HOLD_ICON_NAME;
    }

    static get WIDGET_FIELD_NAME_TOGGLE_HOLD_BUTTON__HOLD_ICON_WIDTH(){
        return _WIDGET_FIELD_NAME_TOGGLE_HOLD_BUTTON__HOLD_ICON_WIDTH;
    }

    static get WIDGET_FIELD_NAME_TOGGLE_HOLD_BUTTON__HOLD_ICON_HEIGHT(){
        return _WIDGET_FIELD_NAME_TOGGLE_HOLD_BUTTON__HOLD_ICON_HEIGHT;
    }

    static get WIDGET_FIELD_NAME_TOGGLE_HOLD_BUTTON__HOLD_FONT_SIZE(){
        return _WIDGET_FIELD_NAME_TOGGLE_HOLD_BUTTON__HOLD_FONT_SIZE;
    }

    static get WIDGET_FIELD_NAME_TOGGLE_HOLD_BUTTON__HOLD_FG_COLOR(){
        return _WIDGET_FIELD_NAME_TOGGLE_HOLD_BUTTON__HOLD_FG_COLOR;
    }

    static get WIDGET_FIELD_NAME_TOGGLE_HOLD_BUTTON__HOLD_BG_COLOR(){
        return _WIDGET_FIELD_NAME_TOGGLE_HOLD_BUTTON__HOLD_BG_COLOR;
    }

    static get WIDGET_FIELD_NAME_TOGGLE_HOLD_BUTTON__HOLD_OUTER_BORDER_COLOR(){
        return _WIDGET_FIELD_NAME_TOGGLE_HOLD_BUTTON__HOLD_OUTER_BORDER_COLOR;
    }

    static get WIDGET_FIELD_NAME_TOGGLE_HOLD_BUTTON__HOLD_OUTER_BORDER_RADIUS(){
        return _WIDGET_FIELD_NAME_TOGGLE_HOLD_BUTTON__HOLD_OUTER_BORDER_RADIUS;
    }

    static get WIDGET_FIELD_NAME_TOGGLE_HOLD_BUTTON__HOLD_OUTER_BORDER_THICKNESS(){
        return _WIDGET_FIELD_NAME_TOGGLE_HOLD_BUTTON__HOLD_OUTER_BORDER_THICKNESS;
    }

    static get WIDGET_FIELD_NAME_TOGGLE_HOLD_BUTTON__HOLD_LABEL(){
        return _WIDGET_FIELD_NAME_TOGGLE_HOLD_BUTTON__HOLD_LABEL;
    }

    static get WIDGET_FIELD_NAME_TOGGLE_HOLD_BUTTON__UNHOLD_ICON(){
        return _WIDGET_FIELD_NAME_TOGGLE_HOLD_BUTTON__UNHOLD_ICON;
    }

    static get WIDGET_FIELD_NAME_TOGGLE_HOLD_BUTTON__UNHOLD_ICON_NAME(){
        return _WIDGET_FIELD_NAME_TOGGLE_HOLD_BUTTON__UNHOLD_ICON_NAME;
    }

    static get WIDGET_FIELD_NAME_TOGGLE_HOLD_BUTTON__UNHOLD_ICON_WIDTH(){
        return _WIDGET_FIELD_NAME_TOGGLE_HOLD_BUTTON__UNHOLD_ICON_WIDTH;
    }

    static get WIDGET_FIELD_NAME_TOGGLE_HOLD_BUTTON__UNHOLD_ICON_HEIGHT(){
        return _WIDGET_FIELD_NAME_TOGGLE_HOLD_BUTTON__UNHOLD_ICON_HEIGHT;
    }

    static get WIDGET_FIELD_NAME_TOGGLE_HOLD_BUTTON__UNHOLD_FONT_SIZE(){
        return _WIDGET_FIELD_NAME_TOGGLE_HOLD_BUTTON__UNHOLD_FONT_SIZE;
    }

    static get WIDGET_FIELD_NAME_TOGGLE_HOLD_BUTTON__UNHOLD_FG_COLOR(){
        return _WIDGET_FIELD_NAME_TOGGLE_HOLD_BUTTON__UNHOLD_FG_COLOR;
    }

    static get WIDGET_FIELD_NAME_TOGGLE_HOLD_BUTTON__UNHOLD_BG_COLOR(){
        return _WIDGET_FIELD_NAME_TOGGLE_HOLD_BUTTON__UNHOLD_BG_COLOR;
    }

    static get WIDGET_FIELD_NAME_TOGGLE_HOLD_BUTTON__UNHOLD_OUTER_BORDER_COLOR(){
        return _WIDGET_FIELD_NAME_TOGGLE_HOLD_BUTTON__UNHOLD_OUTER_BORDER_COLOR;
    }

    static get WIDGET_FIELD_NAME_TOGGLE_HOLD_BUTTON__UNHOLD_OUTER_BORDER_RADIUS(){
        return _WIDGET_FIELD_NAME_TOGGLE_HOLD_BUTTON__UNHOLD_OUTER_BORDER_RADIUS;
    }

    static get WIDGET_FIELD_NAME_UNHOLD_TOGGLE_HOLD_BUTTON__OUTER_BORDER_THICKNESS(){
        return _WIDGET_FIELD_NAME_TOGGLE_HOLD_BUTTON__UNHOLD_OUTER_BORDER_THICKNESS;
    }

    static get WIDGET_FIELD_NAME_TOGGLE_HOLD_BUTTON__UNHOLD_LABEL(){
        return _WIDGET_FIELD_NAME_TOGGLE_HOLD_BUTTON__UNHOLD_LABEL;
    }

    static get WIDGET_FIELD_NAME_TRANSFER_BUTTON__TRANSFER_LABEL(){
        return _WIDGET_FIELD_NAME_TRANSFER_BUTTON__TRANSFER_LABEL;
    }

    static get WIDGET_FIELD_NAME_TRANSFER_BUTTON__TRANSFER_ICON(){
        return _WIDGET_FIELD_NAME_TRANSFER_BUTTON__TRANSFER_ICON;
    }

    static get WIDGET_FIELD_NAME_TRANSFER_BUTTON__TRANSFER_ICON_NAME(){
        return _WIDGET_FIELD_NAME_TRANSFER_BUTTON__TRANSFER_ICON_NAME;
    }

    static get WIDGET_FIELD_NAME_TRANSFER_BUTTON__TRANSFER_ICON_WIDTH(){
        return _WIDGET_FIELD_NAME_TRANSFER_BUTTON__TRANSFER_ICON_WIDTH;
    }

    static get WIDGET_FIELD_NAME_TRANSFER_BUTTON__TRANSFER_ICON_HEIGHT(){
        return _WIDGET_FIELD_NAME_TRANSFER_BUTTON__TRANSFER_ICON_HEIGHT;
    }

    static get WIDGET_FIELD_NAME_TRANSFER_BUTTON__TRANSFER_FONT_SIZE(){
        return _WIDGET_FIELD_NAME_TRANSFER_BUTTON__TRANSFER_FONT_SIZE;
    }

    static get WIDGET_FIELD_NAME_TRANSFER_BUTTON__TRANSFER_FG_COLOR(){
        return _WIDGET_FIELD_NAME_TRANSFER_BUTTON__TRANSFER_FG_COLOR;
    }

    static get WIDGET_FIELD_NAME_TRANSFER_BUTTON__TRANSFER_BG_COLOR(){
        return _WIDGET_FIELD_NAME_TRANSFER_BUTTON__TRANSFER_BG_COLOR;
    }

    static get WIDGET_FIELD_NAME_TRANSFER_BUTTON__TRANSFER_OUTER_BORDER_COLOR(){
        return _WIDGET_FIELD_NAME_TRANSFER_BUTTON__TRANSFER_OUTER_BORDER_COLOR;
    }

    static get WIDGET_FIELD_NAME_TRANSFER_BUTTON__TRANSFER_OUTER_BORDER_RADIUS(){
        return _WIDGET_FIELD_NAME_TRANSFER_BUTTON__TRANSFER_OUTER_BORDER_RADIUS;
    }

    static get WIDGET_FIELD_NAME_TRANSFER_BUTTON__TRANSFER_OUTER_BORDER_THICKNESS(){
        return _WIDGET_FIELD_NAME_TRANSFER_BUTTON__TRANSFER_OUTER_BORDER_THICKNESS;
    }

    static get WIDGET_FIELD_NAME_TRANSFER_BUTTON__CANCEL_TRANSFER_LABEL(){
        return _WIDGET_FIELD_NAME_TRANSFER_BUTTON__CANCEL_TRANSFER_LABEL;
    }

    static get WIDGET_FIELD_NAME_TRANSFER_BUTTON__CANCEL_TRANSFER_ICON(){
        return _WIDGET_FIELD_NAME_TRANSFER_BUTTON__CANCEL_TRANSFER_ICON;
    }

    static get WIDGET_FIELD_NAME_TRANSFER_BUTTON__CANCEL_TRANSFER_ICON_NAME(){
        return _WIDGET_FIELD_NAME_TRANSFER_BUTTON__CANCEL_TRANSFER_ICON_NAME;
    }

    static get WIDGET_FIELD_NAME_TRANSFER_BUTTON__CANCEL_TRANSFER_ICON_WIDTH(){
        return _WIDGET_FIELD_NAME_TRANSFER_BUTTON__CANCEL_TRANSFER_ICON_WIDTH;
    }

    static get WIDGET_FIELD_NAME_TRANSFER_BUTTON__CANCEL_TRANSFER_ICON_HEIGHT(){
        return _WIDGET_FIELD_NAME_TRANSFER_BUTTON__CANCEL_TRANSFER_ICON_HEIGHT;
    }

    static get WIDGET_FIELD_NAME_TRANSFER_BUTTON__CANCEL_TRANSFER_FONT_SIZE(){
        return _WIDGET_FIELD_NAME_TRANSFER_BUTTON__CANCEL_TRANSFER_FONT_SIZE;
    }

    static get WIDGET_FIELD_NAME_TRANSFER_BUTTON__CANCEL_TRANSFER_FG_COLOR(){
        return _WIDGET_FIELD_NAME_TRANSFER_BUTTON__CANCEL_TRANSFER_FG_COLOR;
    }

    static get WIDGET_FIELD_NAME_TRANSFER_BUTTON__CANCEL_TRANSFER_BG_COLOR(){
        return _WIDGET_FIELD_NAME_TRANSFER_BUTTON__CANCEL_TRANSFER_BG_COLOR;
    }

    static get WIDGET_FIELD_NAME_TRANSFER_BUTTON__CANCEL_TRANSFER_OUTER_BORDER_COLOR(){
        return _WIDGET_FIELD_NAME_TRANSFER_BUTTON__CANCEL_TRANSFER_OUTER_BORDER_COLOR;
    }

    static get WIDGET_FIELD_NAME_TRANSFER_BUTTON__CANCEL_TRANSFER_OUTER_BORDER_RADIUS(){
        return _WIDGET_FIELD_NAME_CANCEL_TRANSFER_OUTER_BORDER_RADIUS;
    }

    static get WIDGET_FIELD_NAME_TRANSFER_BUTTON__CANCEL_TRANSFER_OUTER_BORDER_THICKNESS(){
        return _WIDGET_FIELD_NAME_TRANSFER_BUTTON__CANCEL_TRANSFER_OUTER_BORDER_THICKNESS;
    }

    static get WIDGET_FIELD_NAME_TRANSFER_BUTTON__MODE(){
        return _WIDGET_FIELD_NAME_TRANSFER_BUTTON__MODE;
    }

}