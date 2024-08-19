import React from "react";

//!abstract
import LegacyButtonWidgetSubData from "../../../../data/widgetData/legacyButtonWidgetSubData/LegacyButtonWidgetSubData";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import i18n from "../../../../i18n";

export default class LegacyButtonEditorSubWidget  {

    constructor( legacyButtonEditorWidgetAsParent, legacyButtonEditorSubWidgetData  ) {
        this._LegacyButtonEditorWidgetAsParent = legacyButtonEditorWidgetAsParent;
        this._LegacyButtonWidgetSubTypeId = legacyButtonEditorSubWidgetData.getLegacyButtonWidgetSubTypeId();
        this._LegacyButtonEditorSubWidgetData = legacyButtonEditorSubWidgetData;
    }

    _getLegacyButtonWidgetSubTypeName(){
        const subtypeName = LegacyButtonWidgetSubData.getLegacyButtonWidgetSubtypeName( this._LegacyButtonWidgetSubTypeId );
        return subtypeName;
    }

    getLegacyButtonSubWidgetData(){
        return this._LegacyButtonEditorSubWidgetData;
    }

    //!abstract
    getRenderJsx(){
        throw new Error("Not implemented.");
    }

    _getIconJsx( icon, label ){

        const widgetData = this._LegacyButtonEditorSubWidgetData.getLegacyButtonWidgetDataAsParent();
        if(  !icon ){
            icon = widgetData.getIcon();
        }

        if( !label && this._LegacyButtonEditorSubWidgetData.getLabel ){
            label = this._LegacyButtonEditorSubWidgetData.getLabel();
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