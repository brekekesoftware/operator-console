import React from 'react';
import RuntimeWidget from "./RuntimeWidget";
import LegacyButtonRuntimeSubWidgetFactory from "./legacyButtonRuntimeSubWidget/LegacyButtonRuntimeSubWidgetFactory";
import LegacyButtonEditorSubWidgetFactory
    from "../../../editor/widget/editor/legacyButtonEditorSubWidget/LegacyButtonEditorSubWidgetFactory";
import BrekekeOperatorConsole from "../../../index";
import i18n from "../../../i18n";

export default class LegacyButtonRuntimeWidget extends RuntimeWidget{

    constructor( props ) {
        super( props );
    }

    //!overload
    _getRenderMainJsx() {
        const widgetData = this.props.widgetData;
        const legacyButtonWidgetSubData = widgetData.getSubData();
        const subWidget = LegacyButtonRuntimeSubWidgetFactory.getStaticLegacyButtonRuntimeSubWidgetFactoryInstance().newLegacyButtonRuntimeSubWidget( this, legacyButtonWidgetSubData );
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