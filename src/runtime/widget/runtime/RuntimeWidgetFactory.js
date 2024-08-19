import React from "react";
import LegacyButtonRuntimeWidget from "./LegacyButtonRuntimeWidget";
import WidgetData from "../../../data/widgetData/WidgetData";
import CallPanelRuntimeWidget from "./CallPanelRuntimeWidget";
import LegacyExtensionStatusRuntimeWidget from "./LegacyExtensionStatusRuntimeWidget";
import TextRuntimeWidget from "./TextRuntimeWidget";
import CallTableRuntimeWidget from "./CallTableRuntimeWidget";
import ExtensionTableRuntimeWidget from "./ExtensionTableRuntimeWidget";
import NoteRuntimeWidget from "./NoteRuntimeWidget";
import LineTableRuntimeWidget from "./LineTableRuntimeWidget";
import LegacyUccacRuntimeWidget from "./LegacyUccacRuntimeWidget";

export default class RuntimeWidgetFactory {

    //!private
    constructor() {
    }

    static getStaticRuntimeWidgetFactoryInstance(){
        return _INSTANCE;
    }

    getRuntimeWidgetJsx( options  ){
        const runtimePane = options["runtimePane"]; //tabs or noTabs
        //const editorTabFunctionComponentAsParent = options["editorTabFunctionComponentAsParent"];   //nullable
        const widgetData = options["widgetData"];
        const jsxKey = options["jsxKey"];

        // const dataObject = {};
        // widgetData.setWidgetDataToObject( dataObject );
        // dataObject["editorPaneAsParent"] = editorPaneAsParent;
        //dataObject["editorTabFunctionComponentAsParent"] = editorTabFunctionComponentAsParent;
        const widgetType = widgetData.getWidgetTypeId();
        let jsx;
        switch( widgetType ){
            case WidgetData.WIDGET_TYPE_IDS.legacyButton:
                jsx = <LegacyButtonRuntimeWidget runtimePane={runtimePane} key={jsxKey} widgetData={widgetData} widgetIndex={jsxKey}></LegacyButtonRuntimeWidget>
                break;
            case WidgetData.WIDGET_TYPE_IDS.callPanel:
                jsx = <CallPanelRuntimeWidget runtimePane={runtimePane} key={jsxKey} widgetData={widgetData} widgetIndex={jsxKey}></CallPanelRuntimeWidget>
                break;
            case WidgetData.WIDGET_TYPE_IDS.legacyExtensionStatus:
                jsx = <LegacyExtensionStatusRuntimeWidget runtimePane={runtimePane} key={jsxKey} widgetData={widgetData} widgetIndex={jsxKey}></LegacyExtensionStatusRuntimeWidget>
                break;
            case WidgetData.WIDGET_TYPE_IDS.text:
                jsx = <TextRuntimeWidget runtimePane={runtimePane} key={jsxKey} widgetData={widgetData} widgetIndex={jsxKey}></TextRuntimeWidget>
                break;
            case WidgetData.WIDGET_TYPE_IDS.callTable:
                jsx = <CallTableRuntimeWidget runtimePane={runtimePane} key={jsxKey} widgetData={widgetData} widgetIndex={jsxKey}></CallTableRuntimeWidget>
                break;
            case WidgetData.WIDGET_TYPE_IDS.extensionTable:
                jsx = <ExtensionTableRuntimeWidget runtimePane={runtimePane} key={jsxKey} widgetData={widgetData} widgetIndex={jsxKey}></ExtensionTableRuntimeWidget>
                break;
            case WidgetData.WIDGET_TYPE_IDS.note:
                jsx = <NoteRuntimeWidget runtimePane={runtimePane} key={jsxKey} widgetData={widgetData} widgetIndex={jsxKey}></NoteRuntimeWidget>
                break;
            case WidgetData.WIDGET_TYPE_IDS.lineTable:
                jsx = <LineTableRuntimeWidget runtimePane={runtimePane} key={jsxKey} widgetData={widgetData} widgetIndex={jsxKey}></LineTableRuntimeWidget>
                break;
            case WidgetData.WIDGET_TYPE_IDS.legacyUccac:
                jsx = <LegacyUccacRuntimeWidget runtimePane={runtimePane} key={jsxKey} widgetData={widgetData} widgetIndex={jsxKey}></LegacyUccacRuntimeWidget>
                break;
            default:
                throw new Error("The widget jsx was not present. widgetTypeId=" + widgetType );
        }
        return jsx;
    }


}
const _INSTANCE = new RuntimeWidgetFactory();