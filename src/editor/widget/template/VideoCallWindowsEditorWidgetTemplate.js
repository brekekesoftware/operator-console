import EditorWidgetTemplate from "./EditorWidgetTemplate";
import WidgetData from "../../../data/widgetData/WidgetData";
import iconSrc from "./icons/videoCallWindows.svg";

export default class VideoCallWindowsEditorWidgetTemplate extends EditorWidgetTemplate{

    constructor( editorWidgetTemplateFactoryAsParent ) {
        super( editorWidgetTemplateFactoryAsParent, WidgetData.WIDGET_TYPE_IDS.videoCallWindows  );
    }

    //!overload
    getWidth(){
        return 200;
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
        return "VideoCallWindows";
    }

}