import EditorWidgetTemplate from "./EditorWidgetTemplate";
import WidgetData from "../../../data/widgetData/WidgetData";
import iconSrc from "./icons/lineTable.jpg";

export default class LineTableEditorWidgetTemplate extends EditorWidgetTemplate{

    constructor( editorWidgetTemplateFactoryAsParent ) {
        super( editorWidgetTemplateFactoryAsParent, WidgetData.WIDGET_TYPE_IDS.lineTable  );
    }

    //!overload
    getWidth(){
        return 128;
    }

    //!overload
    getHeight(){
        return 64;
    }

    //!overload
    getIconSrc(){
        return iconSrc;
    }

    //!overload
    getLabelKey(){
        return "LineTable";
    }

}