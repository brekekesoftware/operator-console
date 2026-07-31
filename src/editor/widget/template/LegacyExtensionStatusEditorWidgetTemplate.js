import EditorWidgetTemplate from "./EditorWidgetTemplate";
import WidgetData from "../../../data/widgetData/WidgetData";
import iconSrc from "./icons/legacyExtensionStatus.jpg";

export default class LegacyExtensionStatusEditorWidgetTemplate extends EditorWidgetTemplate{

    constructor( editorWidgetTemplateFactoryAsParent ) {
        super( editorWidgetTemplateFactoryAsParent, WidgetData.WIDGET_TYPE_IDS.legacyExtensionStatus  );
    }

    //!overload
    getWidth(){
        return 96;
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
        return "extension_status";
    }

}