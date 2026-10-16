import EditorWidgetTemplate from "./EditorWidgetTemplate";
import WidgetData from "../../../data/widgetData/WidgetData";
import iconSrc from "./icons/callPanel.jpg";

export default class CallPanelEditorWidgetTemplate extends EditorWidgetTemplate{

    constructor( editorWidgetTemplateFactoryAsParent ) {
        super( editorWidgetTemplateFactoryAsParent, WidgetData.WIDGET_TYPE_IDS.callPanel  );
    }

    //!overload
    getWidth(){
        return 210;
    }

    //!overload
    getHeight(){
        return 110;
    }

    //!overload
    getIconSrc(){
        return iconSrc;
    }

    //!overload
    getLabelKey(){
        return "CallPanel";
    }

}