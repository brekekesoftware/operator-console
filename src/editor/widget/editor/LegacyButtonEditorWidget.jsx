import EditorWidget from "./EditorWidget";
import LegacyButtonEditorSubWidgetFactory from "./legacyButtonEditorSubWidget/LegacyButtonEditorSubWidgetFactory";
import BrekekeOperatorConsole from "../../../index";
import i18n from "../../../i18n";

export default class LegacyButtonEditorWidget extends EditorWidget{

    constructor( props ) {
        super( props );
    }

    //!overload
    _getRenderMainJsx() {
        const widgetData = this.getWidgetData();
        const legacyButtonWidgetSubData = widgetData.getSubData();
        const subWidget = LegacyButtonEditorSubWidgetFactory.getStaticLegacyButtonEditorSubWidgetFactoryInstance().newLegacyButtonEditorSubWidget( this, legacyButtonWidgetSubData );
		const language = BrekekeOperatorConsole.getStaticInstance().getLoggedinLanguage();
		let tooltipOfButtonWidget = widgetData.getTooltipOfButtonWidget( language );
        if( tooltipOfButtonWidget === undefined || tooltipOfButtonWidget === null ){
            const subtypeName = legacyButtonWidgetSubData.getLegacyButtonWidgetSubTypeName();
            tooltipOfButtonWidget = i18n.t(`legacy_button_description.${subtypeName}`);
        }
        const jsx = subWidget.getRenderJsx(tooltipOfButtonWidget);
        return jsx;
    }


}