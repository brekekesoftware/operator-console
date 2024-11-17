import React from 'react';
import {Select} from "antd";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import BrekekeOperatorConsole from "../../../../index";
import {fas} from "@fortawesome/free-solid-svg-icons";
import {far} from "@fortawesome/free-regular-svg-icons";
import {fab} from "@fortawesome/free-brands-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

//!abstract
export default class LegacyButtonEditorSubWidgetSettings{
    constructor( legacyButtonEditorWidgetSettingsAsParent, legacyButtonEditorSubWidgetData  ) {
        this._LegacyButtonEditorWidgetSettingsAsParent = legacyButtonEditorWidgetSettingsAsParent;
        this._LegacyButtonEditorSubWidgetData = legacyButtonEditorSubWidgetData;
    }

    //!abstract
    getRenderJsx(){
        throw new Error("Not implemented.");
    }

  _getIconSelectJsx( strIcon, evOnFormIconSelected, bGetIconDisabled ){

    //const operatorConsoleAsParent = this._LegacyButtonEditorWidgetSettingsAsParent.getEditScreenViewAsParent().getOperatorConsoleAsParent();
    const operatorConsole = BrekekeOperatorConsole.getStaticInstance();
    const defaultButtonFileInfos = operatorConsole.getDefaultButtonImageFileInfos();
    let fileInfos = defaultButtonFileInfos.getFileInfos();
    if( !fileInfos ){
      fileInfos = new Array();
    }
    let key = -1;

    const subWidgetData = this._LegacyButtonEditorSubWidgetData;
    let sIcon;
    if( strIcon ){
        sIcon = strIcon;
    }
    else if( bGetIconDisabled !== true && subWidgetData.getIcon && subWidgetData.getIcon() ){
      sIcon = subWidgetData.getIcon();
    }
    else{
      sIcon = null;
    }

    let  onFormIconSelected;
    if( evOnFormIconSelected ){
        onFormIconSelected = evOnFormIconSelected;
    }
    else {
        onFormIconSelected = (ev) => this._onFormIconSelected(ev);
    }

    return (
        <Select
            showSearch
            //allowClear    //!comment Did not work.
            filterOption={(input, option) =>
                (option?.value ?? '').toLowerCase().includes(input.toLowerCase())
            }
            value={sIcon}
            defaultValue={sIcon}
            onSelect={ (e) => onFormIconSelected(e) }
            style={{width:"100%"}}
        >
          <Select.Option value={''}></Select.Option>
          {[...Object.values(fas), ...Object.values(far), ...Object.values(fab)].map((icon, i) => {
            const value = icon.prefix + ' fa-' + icon.iconName;
            key++;
            return (
                <Select.Option key={key} value={value}>
                  <FontAwesomeIcon fixedWidth icon={icon}/>
                  <span style={{marginLeft: 4}}>{icon.iconName}</span>
                </Select.Option>
            );
          })}
          { fileInfos.map( (fileInfo, i ) =>{
            key++;
            const fileName = fileInfo["name"];
            const fileUrl = fileInfo["url"];
            const value = "PATH:" + fileUrl;
            return (
                <Select.Option key={key} value={value}>
                  <div style={{display:"table",verticalAlign:"middle"}}>
                    <img src={fileUrl} width={32} height={32} style={{verticalAlign:"middle"}}/>
                    <div style={{display:"table-cell",paddingLeft: 4,verticalAlign:"middle"}}>{fileName}</div>
                  </div>
                </Select.Option>
            );
          })}
        </Select>
    )
  }

    _onFormIconSelected( icon ){
        this._LegacyButtonEditorSubWidgetData.setIcon( icon );
        this._LegacyButtonEditorWidgetSettingsAsParent.getEditScreenViewAsParent().setState({rerender:true});
    }

    _onChangeFgColor( color ){
        this._LegacyButtonEditorSubWidgetData.setFgColor(color);
        this._LegacyButtonEditorWidgetSettingsAsParent.getEditScreenViewAsParent().setState({rerender:true});
    }

    _onChangeBgColor( color ){
        this._LegacyButtonEditorSubWidgetData.setBgColor(color);
        this._LegacyButtonEditorWidgetSettingsAsParent.getEditScreenViewAsParent().setState({rerender:true});
    }

    _onChangeOuterBorderColor( color ){
        this._LegacyButtonEditorSubWidgetData.setOuterBorderColor(color);
        this._LegacyButtonEditorWidgetSettingsAsParent.getEditScreenViewAsParent().setState({rerender:true});
    }

    _onChangeOuterBorderRadius( n ){
        this._LegacyButtonEditorSubWidgetData.setOuterBorderRadius(n);
        this._LegacyButtonEditorWidgetSettingsAsParent.getEditScreenViewAsParent().setState({rerender:true});
    }

    _onChangeOuterBorderThickness( n ){
        this._LegacyButtonEditorSubWidgetData.setOuterBorderThickness(n);
        this._LegacyButtonEditorWidgetSettingsAsParent.getEditScreenViewAsParent().setState({rerender:true});
    }

    _onChangeFontSize( n ){
        this._LegacyButtonEditorSubWidgetData.setFontSize(n);
        this._LegacyButtonEditorWidgetSettingsAsParent.getEditScreenViewAsParent().setState({rerender:true});
    }

    _onChangeIconWidth( n ){
        this._LegacyButtonEditorSubWidgetData.setIconWidth(n);
        this._LegacyButtonEditorWidgetSettingsAsParent.getEditScreenViewAsParent().setState({rerender:true});
    }

    _onChangeIconHeight( n ){
        this._LegacyButtonEditorSubWidgetData.setIconHeight(n);
        this._LegacyButtonEditorWidgetSettingsAsParent.getEditScreenViewAsParent().setState({rerender:true});
    }

}