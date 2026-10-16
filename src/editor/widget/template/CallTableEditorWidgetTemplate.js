import EditorWidgetTemplate from "./EditorWidgetTemplate";
import WidgetData from "../../../data/widgetData/WidgetData";
import iconSrc from "./icons/callTable.jpg";

export default class CallTableEditorWidgetTemplate extends EditorWidgetTemplate{

    constructor( editorWidgetTemplateFactoryAsParent ) {
        super( editorWidgetTemplateFactoryAsParent, WidgetData.WIDGET_TYPE_IDS.callTable  );
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
        return "CallTable";
    }

}