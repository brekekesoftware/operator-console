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

    _getIconJsx( icon, label, nIconWidth, nIconHeight  ){
        const subWidgetData = this._LegacyButtonRuntimeSubWidgetData;
        //const widgetData = subWidgetData.getLegacyButtonWidgetDataAsParent();
        if( !icon && subWidgetData.getIcon ){
            icon = subWidgetData.getIcon();
        }

        if( !label && subWidgetData.getLabel ){
            label = subWidgetData.getLabel();
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
            let iconWidth;
            if( nIconWidth ){
                iconWidth = nIconWidth;
            }
            else{
                if( subWidgetData.getIconWidth ) {
                    iconWidth = subWidgetData.getIconWidth();
                }
                if( !iconWidth ){
                    iconWidth = 32;
                }
            }
            let iconHeight;
            if( nIconHeight ){
                iconHeight = nIconHeight;
            }
            else {
                if( subWidgetData.getIconHeight ) {
                    iconHeight = subWidgetData.getIconHeight();
                }
                if( !iconHeight ){
                    iconHeight = 32;
                }
            }
            iconJsx = (<img src={src} alt={alt} width={iconWidth} height={iconHeight} />);
        }
        else {
            let iconWidth;
            if( nIconWidth ){
                iconWidth = nIconWidth;
            }
            else{
                iconWidth = subWidgetData.getIconWidth();
            }
            let iconHeight;
            if( nIconHeight ){
                iconHeight = nIconHeight;
            }
            else {
                iconHeight = subWidgetData.getIconHeight();
            }

            const oStyle = {};
            let size = "lg";
            if( iconWidth !== undefined && iconWidth !== null ){
                oStyle["width"]  = iconWidth + "px";
                size = null;
            }
            if( iconHeight !== undefined && iconHeight !== null ){
                oStyle["height"]  = iconHeight + "px";
                size = null;
            }
            if( size === null ) {
                iconJsx = (<FontAwesomeIcon style={oStyle} icon={icon}/>);
            }
            else{
                iconJsx = (<FontAwesomeIcon size={size} icon={icon}/>);
            }
        }
        return iconJsx;
    }


}