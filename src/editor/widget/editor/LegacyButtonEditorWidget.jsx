import EditorWidget from "./EditorWidget";
import LegacyButtonEditorSubWidgetFactory from "./legacyButtonEditorSubWidget/LegacyButtonEditorSubWidgetFactory";

export default class LegacyButtonEditorWidget extends EditorWidget{

    constructor( props ) {
        super( props );
    }

    //!overload
    _getRenderMainJsx() {
        const widgetData = this.getWidgetData();
        const legacyButtonWidgetSubData = widgetData.getSubData();
        const subWidget = LegacyButtonEditorSubWidgetFactory.getStaticLegacyButtonEditorSubWidgetFactoryInstance().newLegacyButtonEditorSubWidget( this, legacyButtonWidgetSubData );
        const jsx = subWidget.getRenderJsx();
        return jsx;
    }


}