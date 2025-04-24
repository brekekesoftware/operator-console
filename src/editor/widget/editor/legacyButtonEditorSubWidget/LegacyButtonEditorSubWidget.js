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
    getRenderJsx( tooltipOfButtonWidget ){
        throw new Error("Not implemented.");
    }

    _getIconJsx( icon, label, nIconWidth, nIconHeight ){

        const subWidgetData = this._LegacyButtonEditorSubWidgetData;
        //const widgetData = subWidgetData.getLegacyButtonWidgetDataAsParent();
        if(  !icon && subWidgetData.getIcon ){
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
            let  iconHeight;
            if( nIconHeight ){
                iconHeight = nIconHeight;
            }
            else{
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
                if( subWidgetData.getIconWidth ) {
                    iconWidth = subWidgetData.getIconWidth();
                }
            }
            let  iconHeight;
            if( nIconHeight ){
                iconHeight = nIconHeight;
            }
            else{
                if( subWidgetData.getIconHeight ) {
                    iconHeight = subWidgetData.getIconHeight();
                }
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