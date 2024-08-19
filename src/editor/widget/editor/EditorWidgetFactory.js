import React from "react";
import LegacyButtonEditorWidget from "./LegacyButtonEditorWidget";
import CallPanelEditorWidget from "./CallPanelEditorWidget";
import WidgetData from "../../../data/widgetData/WidgetData";
import LegacyExtensionStatusEditorWidget from "./LegacyExtensionStatusEditorWidget";
import TextEditorWidget from "./TextEditorWidget";
import CallTableEditorWidget from "./CallTableEditorWidget";
import ExtensionTableEditorWidget from "./ExtensionTableEditorWidget";
import NoteEditorWidget from "./NoteEditorWidget";
import LineTableEditorWidget from "./LineTableEditorWidget";
import LegacyUccacEditorWidget from "./LegacyUccacEditorWidget";

function LegacyUccacEditorWidgetEditorWidget(props) {
    return null;
}

export default class EditorWidgetFactory {

    //!private
    constructor() {
    }

    static getStaticEditorWidgetFactoryInstance(){
        return _INSTANCE;
    }

    getEditorWidgetJsx( options  ){
        const editorPane = options["editorPane"]; //tabs or noTabs
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
                jsx = <LegacyButtonEditorWidget editorPane={editorPane} key={jsxKey} widgetData={widgetData} widgetIndex={jsxKey}></LegacyButtonEditorWidget>
                break;
            case WidgetData.WIDGET_TYPE_IDS.callPanel:
                jsx = <CallPanelEditorWidget editorPane={editorPane} key={jsxKey} widgetData={widgetData} widgetIndex={jsxKey}></CallPanelEditorWidget>
                break;
            case WidgetData.WIDGET_TYPE_IDS.legacyExtensionStatus:
                jsx = <LegacyExtensionStatusEditorWidget editorPane={editorPane} key={jsxKey} widgetData={widgetData} widgetIndex={jsxKey}></LegacyExtensionStatusEditorWidget>
                break;
            case WidgetData.WIDGET_TYPE_IDS.text:
                jsx = <TextEditorWidget editorPane={editorPane} key={jsxKey} widgetData={widgetData} widgetIndex={jsxKey}></TextEditorWidget>
                break;
            case WidgetData.WIDGET_TYPE_IDS.callTable:
                jsx = <CallTableEditorWidget editorPane={editorPane} key={jsxKey} widgetData={widgetData} widgetIndex={jsxKey}></CallTableEditorWidget>
                break;
            case WidgetData.WIDGET_TYPE_IDS.extensionTable:
                jsx = <ExtensionTableEditorWidget editorPane={editorPane} key={jsxKey} widgetData={widgetData} widgetIndex={jsxKey}></ExtensionTableEditorWidget>
                break;
            case WidgetData.WIDGET_TYPE_IDS.note:
                jsx = <NoteEditorWidget editorPane={editorPane} key={jsxKey} widgetData={widgetData} widgetIndex={jsxKey}></NoteEditorWidget>
                break;
            case WidgetData.WIDGET_TYPE_IDS.lineTable:
                jsx = <LineTableEditorWidget editorPane={editorPane} key={jsxKey} widgetData={widgetData} widgetIndex={jsxKey}></LineTableEditorWidget>
                break;
            case WidgetData.WIDGET_TYPE_IDS.legacyUccac:
                jsx = <LegacyUccacEditorWidget editorPane={editorPane} key={jsxKey} widgetData={widgetData} widgetIndex={jsxKey}></LegacyUccacEditorWidget>
                break;
            default:
                throw new Error("The widget jsx was not present. widgetTypeId=" + widgetType );
        }
        return jsx;
    }


}
const _INSTANCE = new EditorWidgetFactory();