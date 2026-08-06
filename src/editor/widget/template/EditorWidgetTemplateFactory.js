import LegacyButtonEditorWidgetTemplate from "./LegacyButtonEditorWidgetTemplate";
import WidgetData from "../../../data/widgetData/WidgetData";
import CallPanelEditorWidgetTemplate from "./CallPanelEditorWidgetTemplate";
import LegacyExtensionStatusEditorWidgetTemplate from "./LegacyExtensionStatusEditorWidgetTemplate";
import TextEditorWidgetTemplate from "./TextEditorWidgetTemplate";
import CallTableEditorWidgetTemplate from "./CallTableEditorWidgetTemplate";
import ExtensionTableEditorWidgetTemplate from "./ExtensionTableEditorWidgetTemplate";
import NoteEditorWidgetTemplate from "./NoteEditorWidgetTemplate";
import LineTableEditorWidgetTemplate from "./LineTableEditorWidgetTemplate";
import LegacyUccacEditorWidgetTemplate from "./LegacyUccacEditorWidgetTemplate";
import VideoCallWindowsEditorWidgetTemplate from "./VideoCallWindowsEditorWidgetTemplate";

export default class EditorWidgetTemplateFactory{

    //!private
    constructor() {
        // const legacyButtonWidgetTypeId = WidgetData.WIDGET_TYPE_IDS.legacyButton;
        // this._EditorWidgetTemplates = Object.freeze({
        //     legacyButtonWidgetTypeId :   new LegacyButtonEditorWidgetTemplate(this)
        // });

        this._EditorWidgetTemplates = new Object();   //!const
        this._EditorWidgetTemplates[ WidgetData.WIDGET_TYPE_IDS.legacyButton ] =   new LegacyButtonEditorWidgetTemplate(this);
        this._EditorWidgetTemplates[ WidgetData.WIDGET_TYPE_IDS.callPanel ] =   new CallPanelEditorWidgetTemplate(this);
        this._EditorWidgetTemplates[ WidgetData.WIDGET_TYPE_IDS.legacyExtensionStatus ] =   new LegacyExtensionStatusEditorWidgetTemplate(this);
        this._EditorWidgetTemplates[ WidgetData.WIDGET_TYPE_IDS.text ] =   new TextEditorWidgetTemplate(this);
        this._EditorWidgetTemplates[ WidgetData.WIDGET_TYPE_IDS.callTable ] =   new CallTableEditorWidgetTemplate(this);
        this._EditorWidgetTemplates[ WidgetData.WIDGET_TYPE_IDS.extensionTable ] =   new ExtensionTableEditorWidgetTemplate(this);
        this._EditorWidgetTemplates[ WidgetData.WIDGET_TYPE_IDS.note ] =   new NoteEditorWidgetTemplate(this);
        this._EditorWidgetTemplates[ WidgetData.WIDGET_TYPE_IDS.lineTable ] =   new LineTableEditorWidgetTemplate(this);
        this._EditorWidgetTemplates[ WidgetData.WIDGET_TYPE_IDS.legacyUccac ] =   new LegacyUccacEditorWidgetTemplate(this);
        this._EditorWidgetTemplates[ WidgetData.WIDGET_TYPE_IDS.videoCallWindows ] =   new VideoCallWindowsEditorWidgetTemplate(this);
        Object.freeze( this._EditorWidgetTemplates );

        // Object keys that look like array indices (all of WIDGET_TYPE_IDS's values) are
        // always iterated in ascending numeric order by JS engines, regardless of insertion
        // order, so Object.values() can't be used to control the palette's display order.
        this._EditorWidgetTemplateDisplayOrder = [
            WidgetData.WIDGET_TYPE_IDS.callPanel,
            WidgetData.WIDGET_TYPE_IDS.legacyButton,
            WidgetData.WIDGET_TYPE_IDS.text,
            WidgetData.WIDGET_TYPE_IDS.note,
            WidgetData.WIDGET_TYPE_IDS.legacyExtensionStatus,
            WidgetData.WIDGET_TYPE_IDS.callTable,
            WidgetData.WIDGET_TYPE_IDS.lineTable,
            WidgetData.WIDGET_TYPE_IDS.extensionTable,
            WidgetData.WIDGET_TYPE_IDS.legacyUccac,
            WidgetData.WIDGET_TYPE_IDS.videoCallWindows,
        ];
    }

    static getStaticEditorWidgetSettingsFactoryInstance(){
        return _INSTANCE;
    }

    getEditorWidgetTemplateArray(){
        return this._EditorWidgetTemplateDisplayOrder.map( ( widgetTypeId ) => this._EditorWidgetTemplates[ widgetTypeId ] );
    }

    getEditorWidgetTemplateByWidgetTypeId( widgetTypeId ){
        const t = this._EditorWidgetTemplates[ widgetTypeId ];
        return t;
    }

}
const _INSTANCE = new EditorWidgetTemplateFactory();
