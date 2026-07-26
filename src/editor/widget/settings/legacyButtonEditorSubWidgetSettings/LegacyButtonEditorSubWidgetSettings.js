import React from 'react';
import {Button, Select} from "antd";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import BrekekeOperatorConsole from "../../../../index";
import {fas} from "@fortawesome/free-solid-svg-icons";
import {far} from "@fortawesome/free-regular-svg-icons";
import {fab} from "@fortawesome/free-brands-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import EditScreenView from "../../../EditScreenView";
import SelectIconModal from "../../../SelectIconModal";
import i18n from "../../../../i18n";
import "./LegacyButtonEditorSubWidgetSettings.css";

//!abstract
export default class LegacyButtonEditorSubWidgetSettings{
    constructor( legacyButtonEditorWidgetSettingsAsParent, legacyButtonEditorSubWidgetData  ) {
        this._LegacyButtonEditorWidgetSettingsAsParent = legacyButtonEditorWidgetSettingsAsParent;
        this._LegacyButtonEditorSubWidgetData = legacyButtonEditorSubWidgetData;
    }

    getLegacyButtonEditorSubWidgetData(){
        return this._LegacyButtonEditorSubWidgetData;
    }

    //!abstract
    getRenderJsx(){
        throw new Error("Not implemented.");
    }

    //!virtual
    onLegacyButtonEditorSubWidgetSettingsChangedOther(){

    }

    _onOkSelectIconModal(selectIconModalAsCaller, selectedIconValue, selectedIconName ){
        if( selectedIconValue ) {
            const subWidgetData = this._LegacyButtonEditorSubWidgetData;
            subWidgetData.setIcon(selectedIconValue);
            subWidgetData.setIconName( selectedIconName );
            const esv = EditScreenView.getEditScreenViewInstance();
            esv.setState({rerender: true});
        }
    }

    _onCancelSelectIconModal(selectIconModalAsCaller){

    }

    //!virtual
    onLoadFromWidgetSettingsTemplateByLegacyButtonEditorWidgetSettings(  legacyButtonEditorWidgetSettingsAsCaller, wst,  _load_button_function = null ){

    }

    _onClickSelectIconModalButton( ev, iconValue, iconName, okFunction = null, cancelFunction = null ){

        let okFunc = okFunction;
        if( !okFunc ){
            okFunc = (selectIconModalAsCaller, selectedIconValue, selectedIconName ) => this._onOkSelectIconModal( selectIconModalAsCaller,selectedIconValue, selectedIconName );
        }

        let cancelFunc = cancelFunction;
        if( !cancelFunc ){
            cancelFunc = (selectIconModalAsCaller) => this._onCancelSelectIconModal(selectIconModalAsCaller);
        }

        const selectIconModal = SelectIconModal.getSelectIconModalInstance();
        const args = {
            selectedIconValue:iconValue,
            selectedIconName :iconName,
            onOkFunction: (selectIconModalAsCaller, selectedIconValue, selectedIconName ) => okFunc(selectIconModalAsCaller, selectedIconValue, selectedIconName ),
            onCancelFunction: (selectIconModalAsCaller) => cancelFunc(selectIconModalAsCaller)
        };
        selectIconModal.setSelectIconModalVisibleToState(args);
    }

    _onClickRemoveIcon(ev){
        const subWidgetData = this._LegacyButtonEditorSubWidgetData;
        subWidgetData.setIcon(null);
        subWidgetData.setIconName(null);
        const esv = EditScreenView.getEditScreenViewInstance();
        esv.setState({rerender:true});
    }

    _getSelectIconModalJsx( sIcon = null, sIconName = null, okFunction = null, cancelFunction = null, onClickRemoveIconButtonFunction = null, getIconFunction = null, getIconNameFunction = null  ){
        const subWidgetData = this._LegacyButtonEditorSubWidgetData;
        if( !sIcon && subWidgetData.getIcon ) {
            if( getIconFunction ){
                sIcon = getIconFunction();
            }
            else if( subWidgetData.getIcon ) {
                sIcon = subWidgetData.getIcon();
            }
        }
        if( !sIconName ) {
            if( getIconNameFunction ){
                sIconName = getIconNameFunction();
            }
            else if( subWidgetData.getIconName  ){
                sIconName = subWidgetData.getIconName();
            }
        }
        let iconJsx;
        if( sIcon ){
            if( sIcon.startsWith("PATH:") ){
                const src = sIcon.substring(5,sIcon.length);
                iconJsx = <img src={src} alt={sIcon} title={sIcon} className="imageIconImage_LegacyButtonEditorSubWidgetSettings" />;
            }
            else{
                iconJsx = <FontAwesomeIcon icon={sIcon} className="FontAwesomeIconImage_LegacyButtonEditorSubWidgetSettings" />
            }
        }
        else{
            iconJsx = (null);
        }

        let  onClickRemoveIconButtonFunction_ = onClickRemoveIconButtonFunction;
        if( !onClickRemoveIconButtonFunction_ ){
            onClickRemoveIconButtonFunction_ = (ev) => this._onClickRemoveIcon(ev);
        }

        return (
            <>
                <div>
                    {iconJsx}
                </div>
                { sIconName ? (
                    <div>
                        {sIconName}
                    </div>)
                    : (null)
                }
                <div className="brOCMarginTopButtonToElement_short">
                    <Button onClick={(ev) => this._onClickSelectIconModalButton(ev,sIcon, sIconName, okFunction, cancelFunction )}>{i18n.t("SelectAnIcon")}</Button>
                    <Button className="brOCMarginLeftButtonToButton" onClick={(ev) => onClickRemoveIconButtonFunction_(ev) } disabled={!sIcon}>{ i18n.t("RemoveIcon")}</Button>
                </div>
            </>
        );
    }

    //Don't use it anymore
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

    _onFormIconSelected( icon, iconName ){
        this._LegacyButtonEditorSubWidgetData.setIcon( icon );
        this._LegacyButtonEditorSubWidgetData.setIconName( iconName );
        this._LegacyButtonEditorWidgetSettingsAsParent.getEditScreenViewAsParent().commitEdit();
    }

    _onChangeFgColor( color ){
        this._LegacyButtonEditorSubWidgetData.setFgColor(color);
        this._LegacyButtonEditorWidgetSettingsAsParent.getEditScreenViewAsParent().commitEdit();
    }

    _onChangeBgColor( color ){
        this._LegacyButtonEditorSubWidgetData.setBgColor(color);
        this._LegacyButtonEditorWidgetSettingsAsParent.getEditScreenViewAsParent().commitEdit();
    }

    _onChangeOuterBorderColor( color ){
        this._LegacyButtonEditorSubWidgetData.setOuterBorderColor(color);
        this._LegacyButtonEditorWidgetSettingsAsParent.getEditScreenViewAsParent().commitEdit();
    }

    _onChangeOuterBorderRadius( n ){
        this._LegacyButtonEditorSubWidgetData.setOuterBorderRadius(n);
        this._LegacyButtonEditorWidgetSettingsAsParent.getEditScreenViewAsParent().commitEdit();
    }

    _onChangeOuterBorderThickness( n ){
        this._LegacyButtonEditorSubWidgetData.setOuterBorderThickness(n);
        this._LegacyButtonEditorWidgetSettingsAsParent.getEditScreenViewAsParent().commitEdit();
    }

    _onChangeFontSize( n ){
        this._LegacyButtonEditorSubWidgetData.setFontSize(n);
        this._LegacyButtonEditorWidgetSettingsAsParent.getEditScreenViewAsParent().commitEdit();
    }

    _onChangeIconWidth( n ){
        this._LegacyButtonEditorSubWidgetData.setIconWidth(n);
        this._LegacyButtonEditorWidgetSettingsAsParent.getEditScreenViewAsParent().commitEdit();
    }

    _onChangeIconHeight( n ){
        this._LegacyButtonEditorSubWidgetData.setIconHeight(n);
        this._LegacyButtonEditorWidgetSettingsAsParent.getEditScreenViewAsParent().commitEdit();
    }

}