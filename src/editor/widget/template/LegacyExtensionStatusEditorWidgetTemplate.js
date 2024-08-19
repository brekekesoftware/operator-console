import EditorWidgetTemplate from "./EditorWidgetTemplate";
import WidgetData from "../../../data/widgetData/WidgetData";
import React from 'react';
import i18n from "../../../i18n";

export default class LegacyExtensionStatusEditorWidgetTemplate extends EditorWidgetTemplate{

    constructor( editorWidgetTemplateFactoryAsParent ) {
        super( editorWidgetTemplateFactoryAsParent, WidgetData.WIDGET_TYPE_IDS.legacyExtensionStatus  );
    }

    //!overload
    getWidth(){
        return 64;
    }

    //!overload
    getHeight(){
        return 84;
    }

    //!overload
    getRenderMainJsx( jsxKey, editScreenViewAsCaller  ) {
        return (
            <div className="led-box" style={{
            }}>
                <div className="led-grey"></div>
                <p>{i18n.t("extension_status")}</p>
            </div>
        );
    }

}