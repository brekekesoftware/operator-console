import EditorWidgetTemplate from "./EditorWidgetTemplate";
import WidgetData from "../../../data/widgetData/WidgetData";
import React from 'react';
import i18n from "../../../i18n";

export default class NoteEditorWidgetTemplate extends EditorWidgetTemplate{

    constructor( editorWidgetTemplateFactoryAsParent ) {
        super( editorWidgetTemplateFactoryAsParent, WidgetData.WIDGET_TYPE_IDS.note  );
    }

    //!overload
    getWidth(){
        return 64;
    }

    //!overload
    getHeight(){
        return 48;
    }

    //!overload
    getRenderMainJsx( jsxKey, editScreenViewAsCaller  ) {
        return (
            <div className="brOCStickyNote">{i18n.t("Note")}</div>
        );
    }

}