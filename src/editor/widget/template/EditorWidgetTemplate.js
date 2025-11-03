import React from "react";
import OCUtil from "../../../OCUtil";

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
        let sWidth;
        if( OCUtil.isNumber( width ) ){
            sWidth = width + "px";
        }
        else{
            sWidth = width;
        }
        let sHeight;
        if( OCUtil.isNumber( height ) ){
            sHeight = height + "px";
        }
        else{
            sHeight = height;
        }

        return <div
            key={jsxKey}
            className="grabbable"
            data-br-widget-type-id={this._WidgetTypeId }
            style={{width:sWidth,height:sHeight,margin:"0 4px 4px 4px"}}
            draggable={true}
            onDragStart={(ev) => editScreenViewAsCaller.onDragEditorWidgetTemplateStart(ev) }>
            {renderMainJsx}
            </div>
    }

}