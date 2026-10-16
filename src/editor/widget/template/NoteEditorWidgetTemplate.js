import EditorWidgetTemplate from "./EditorWidgetTemplate";
import WidgetData from "../../../data/widgetData/WidgetData";
import iconSrc from "./icons/note.jpg";

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
    getIconSrc(){
        return iconSrc;
    }

    //!overload
    getLabelKey(){
        return "Note";
    }

}