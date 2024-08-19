import React from "react";
import LegacyButtonWidgetSubData from "../../../../data/widgetData/legacyButtonWidgetSubData/LegacyButtonWidgetSubData";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import i18n from "../../../../i18n";

//!abstract
export default class LegacyButtonRuntimeSubWidget  {

    constructor( legacyButtonRuntimeWidgetAsParent, legacyButtonRuntimeSubWidgetData  ) {
        this._LegacyButtonRuntimeWidgetAsParent = legacyButtonRuntimeWidgetAsParent;
        this._LegacyButtonWidgetSubTypeId = legacyButtonRuntimeSubWidgetData.getLegacyButtonWidgetSubTypeId();
        this._LegacyButtonRuntimeSubWidgetData = legacyButtonRuntimeSubWidgetData;
    }

    getLegacyButtonSubWidgetData(){
        return this._LegacyButtonRuntimeSubWidgetData;
    }

    _getLegacyButtonWidgetSubTypeName(){
        const subtypeName = LegacyButtonWidgetSubData.getLegacyButtonWidgetSubtypeName( this._LegacyButtonWidgetSubTypeId );
        return subtypeName;
    }

    //!abstract
    getRenderJsx(){
        throw new Error("Not implemented.");
    }

    _getIconJsx( icon, label  ){
        const widgetData = this._LegacyButtonRuntimeSubWidgetData.getLegacyButtonWidgetDataAsParent();
        if( !icon ){
            icon = widgetData.getIcon();
        }

        if( !label && this._LegacyButtonRuntimeSubWidgetData.getLabel ){
            label = this._LegacyButtonRuntimeSubWidgetData.getLabel();
        }

        if( !label ){
            const subtypeName = this._getLegacyButtonWidgetSubTypeName();
            label = i18n.t(`legacy_button_label.${subtypeName}`);
        }

        let iconJsx;
        if( !icon ){
            iconJsx = label;
        }
        else if( icon.startsWith("PATH:") ){
            let alt;
            if( label ){
                alt = label;
            }
            else{
                alt = icon;
            }
            const src = icon.substring(5,icon.length);   //5 is path:
            iconJsx = (<img src={src} alt={alt} width={32} heigth={32} />);
        }
        else {
            iconJsx = (<FontAwesomeIcon size="lg" icon={icon}/>);
        }
        return iconJsx;
    }


}