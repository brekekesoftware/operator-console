import React from 'react';
import RuntimeWidget from "./RuntimeWidget";
import LegacyButtonRuntimeSubWidgetFactory from "./legacyButtonRuntimeSubWidget/LegacyButtonRuntimeSubWidgetFactory";
import i18n from "../../../i18n";
import BrekekeOperatorConsole from "../../../index";
import Util from "../../../Util";

export default class LegacyExtensionStatusRuntimeWidget extends RuntimeWidget{

    constructor( props ) {
        super( props );
    }

    //!overload
    _getRenderMainJsx() {
        const oc = BrekekeOperatorConsole.getStaticInstance();
        const extensions = oc.getExtensions();
        const extensionsStatus = oc.getExtensionsStatus();
        const widgetData = this.getWidgetData();
        const extension = widgetData.getExtension();
        const ext = extensions.find(({id}) => id == extension);
        const status = Object.values(extensionsStatus?.[ext?.id]?.callStatus || {});
        const extensionStatusFgColor = Util.getRgbaCSSStringFromAntdColor( widgetData.getExtensionStatusFgColor(), "" );

        return (
            <div className="led-box" style={{
                color:extensionStatusFgColor
            }}>
                <div className={
                    (status.find(s => s === 'talking') && 'led-red') ||
                    (status.find(s => ['holding', 'calling', 'ringing'].includes(s)) && 'led-yellow') ||
                    (extensionsStatus?.[ext?.id]?.registered ? 'led-green' : 'led-grey')
                }></div>
                <p>{ext?.name || extension || i18n.t("extension_status")}</p>
            </div>
        );
    }


}