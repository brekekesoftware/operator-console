import React from "react";
import i18n from "../../../i18n";

//!abstract class
export default class EditorWidgetTemplate {

    constructor( editorWidgetTemplateFactoryAsParent, widgetTypeId  ) {
        this._EditorWidgetTemplateFactoryAsParent = editorWidgetTemplateFactoryAsParent;
        this._WidgetTypeId = widgetTypeId;
    }

    getWidgetTypeId(){
        return this._WidgetTypeId;
    }

    //!abstract. Initial width/height given to a widget of this type when dropped onto the canvas.
    getWidth(){
        throw new Error("Not implemented.");
    }

    //!abstract. Initial width/height given to a widget of this type when dropped onto the canvas.
    getHeight(){
        throw new Error("Not implemented.");
    }

    //!abstract. Palette card icon (72x72).
    getIconSrc(){
        throw new Error("Not implemented.");
    }

    //!abstract. i18n key for the palette card label.
    getLabelKey(){
        throw new Error("Not implemented.");
    }

    getRenderJsx( jsxKey, editScreenViewAsCaller  ) {
        return <div
            key={jsxKey}
            className="grabbable brOCWidgetTemplateCard"
            data-br-widget-type-id={this._WidgetTypeId }
            draggable={true}
            onDragStart={(ev) => editScreenViewAsCaller.onDragEditorWidgetTemplateStart(ev) }>
            <img className="brOCWidgetTemplateCardIcon" src={this.getIconSrc()} alt=""/>
            <p className="brOCWidgetTemplateCardLabel">{i18n.t(this.getLabelKey())}</p>
            </div>
    }

}