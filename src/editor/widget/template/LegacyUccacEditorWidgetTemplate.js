import EditorWidgetTemplate from "./EditorWidgetTemplate";
import WidgetData from "../../../data/widgetData/WidgetData";
import React from 'react';
import i18n from "../../../i18n";

export default class LegacyUccacEditorWidgetTemplate extends EditorWidgetTemplate{

    constructor( editorWidgetTemplateFactoryAsParent ) {
        super( editorWidgetTemplateFactoryAsParent, WidgetData.WIDGET_TYPE_IDS.legacyUccac  );
    }

    //!overload
    getWidth(){
        return 200;
    }

    //!overload
    getHeight(){
        return 48;
    }

    //!overload
    getRenderMainJsx( jsxKey, editScreenViewAsCaller  ) {
        return (
            <table>
                <thead>
                <tr>
                    <th>{i18n.t("ucChatAgentComponent")}</th>
                </tr>
                </thead>
            </table>
        );
    }

}