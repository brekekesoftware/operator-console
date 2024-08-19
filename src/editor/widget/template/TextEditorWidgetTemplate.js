import EditorWidgetTemplate from "./EditorWidgetTemplate";
import WidgetData from "../../../data/widgetData/WidgetData";
import React from 'react';
import i18n from "../../../i18n";

export default class TextEditorWidgetTemplate extends EditorWidgetTemplate{

    constructor( editorWidgetTemplateFactoryAsParent ) {
        super( editorWidgetTemplateFactoryAsParent, WidgetData.WIDGET_TYPE_IDS.text  );
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
            <div style={{
                textOverflow: 'ellipsis',
                whiteSpace: 'pre-wrap',
                overflow: 'hidden',
                wordBreak: 'break-all',
                width: '100%',
                height: '100%',
                textAlign: 'center',
                backgroundColor:"rgb(245,245,245)"
            }}>{i18n.t("text")}</div>
        );
    }

}