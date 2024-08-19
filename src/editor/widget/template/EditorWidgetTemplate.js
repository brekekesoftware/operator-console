import React from "react";

//!abstract class
export default class EditorWidgetTemplate {

    constructor( editorWidgetTemplateFactoryAsParent, widgetTypeId  ) {
        this._EditorWidgetTemplateFactoryAsParent = editorWidgetTemplateFactoryAsParent;
        this._WidgetTypeId = widgetTypeId;
    }

    getWidgetTypeId(){
        return this._WidgetTypeId;
    }

    //!abstract
    getWidth(){
        throw new Error("Not implemented.");
    }

    //!abstract
    getHeight(){
        throw new Error("Not implemented.");
    }

    //!abstract
    getRenderMainJsx(){
        throw new Error("Not implemented.");
    }

    getRenderJsx( jsxKey, editScreenViewAsCaller  ) {
        const width = this.getWidth();
        const height = this.getHeight();
        const renderMainJsx = this.getRenderMainJsx();
        return <div
            key={jsxKey}
            className="grabbable"
            data-br-widget-type-id={this._WidgetTypeId }
            style={{width: width + "px",height:height + "px",marginBottom:"4px"}}
            draggable={true}
            onDragStart={(ev) => editScreenViewAsCaller.onDragEditorWidgetTemplateStart(ev) }>
            {renderMainJsx}
            </div>
    }

}