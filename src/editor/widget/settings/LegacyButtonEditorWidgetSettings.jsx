import React from 'react';
import EditorWidgetSettings from "./EditorWidgetSettings";
import LegacyButtonEditorSubWidgetSettingsFactory
    from "./legacyButtonEditorSubWidgetSettings/LegacyButtonEditorSubWidgetSettingsFactory";
import {Select} from "antd";
import {fas} from "@fortawesome/free-solid-svg-icons";
import {far} from "@fortawesome/free-regular-svg-icons";
import {fab} from "@fortawesome/free-brands-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Form from "antd/lib/form";
import i18n from "../../../i18n";
import LegacyButtonWidgetSubData from "../../../data/widgetData/legacyButtonWidgetSubData/LegacyButtonWidgetSubData";
import {Colorpicker} from "antd-colorpicker";
import InputNumber from "antd/lib/input-number";

export default class LegacyButtonEditorWidgetSettings extends EditorWidgetSettings {
    constructor( props ) {
        super( props );
    }

    // componentDidUpdate(){
    //     super.componentDidUpdate();
    //     const widgetData = this._getWidgetData();
    //     if( this._latestWidgetData !== widgetData  ){
    //
    //     }
    //     this._latestWidgetData = widgetData;
    // }

    _getIconSelectJsx(){
        const widgetData = this._getWidgetData();

        const operatorConsoleAsParent = this._EditScreenViewAsParent.getOperatorConsoleAsParent();
        const defaultButtonFileInfos = operatorConsoleAsParent.getDefaultButtonImageFileInfos();
        let fileInfos = defaultButtonFileInfos.getFileInfos();
        if( !fileInfos ){
            fileInfos = new Array();
        }
        let key = -1;

        let sIcon;
        if( widgetData.getIcon() ){
            sIcon = widgetData.getIcon();
        }
        else{
            sIcon = null;
        }
        return (
            <Select
                showSearch
                allowClear
                filterOption={(input, option) =>
                    (option?.value ?? '').toLowerCase().includes(input.toLowerCase())
                }
                value={sIcon}
                defaultValue={sIcon}
                onSelect={ (e) => this._onFormIconSelected(e) }
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

    _onFormValueChange( ev1, ev2){
        const temp = 0;
       // this._EditScreenViewAsParent.setState({rerender:true});
    }

    _onFormSubtypeSelected( ev1, ev2 ){
        const selectedSubtypeId = parseInt( ev1 );
        const widgetData = this._getWidgetData();
        widgetData.setSubDataBySubtypeId( selectedSubtypeId );
        this._EditScreenViewAsParent.setState({rerender:true});
    }

    _onFormIconSelected( icon ){
        const widgetData = this._getWidgetData();
        widgetData.setIcon( icon );
        this._EditScreenViewAsParent.setState({rerender:true});
    }

    _onChangeFgColor( color ){
        const widgetData = this._getWidgetData();
        widgetData.setFgColor(color);
        this._EditScreenViewAsParent.setState({rerender:true});
    }

    _onChangeBgColor( color ){
        const widgetData = this._getWidgetData();
        widgetData.setBgColor(color);
        this._EditScreenViewAsParent.setState({rerender:true});
    }

    _onChangeOuterBorderColor( color ){
        const widgetData = this._getWidgetData();
        widgetData.setOuterBorderColor(color);
        this._EditScreenViewAsParent.setState({rerender:true});
    }

    _onChangeOuterBorderRadius( n ){
        const widgetData = this._getWidgetData();
        widgetData.setOuterBorderRadius(n);
        this._EditScreenViewAsParent.setState({rerender:true});
    }

    _onChangeOuterBorderThickness( n ){
        const widgetData = this._getWidgetData();
        widgetData.setOuterBorderThickness(n);
        this._EditScreenViewAsParent.setState({rerender:true});
    }

    _onChangeFontSize( n ){
        const widgetData = this._getWidgetData();
        widgetData.setFontSize(n);
        this._EditScreenViewAsParent.setState({rerender:true});
    }

    _onChangeIconWidth( n ){
        const widgetData = this._getWidgetData();
        widgetData.setIconWidth(n);
        this._EditScreenViewAsParent.setState({rerender:true});
    }

    _onChangeIconHeight( n ){
        const widgetData = this._getWidgetData();
        widgetData.setIconHeight(n);
        this._EditScreenViewAsParent.setState({rerender:true});
    }

    getEditScreenViewAsParent(){
        return this._EditScreenViewAsParent;
    }

    //!override
    _getRenderMainJsx(){
        const widgetData = this._getWidgetData();
        const legacyButtonWidgetData = widgetData;
        const legacyButtonWidgetSubData = legacyButtonWidgetData.getSubData();
        const editingWidgetSubtypeName = legacyButtonWidgetSubData.getLegacyButtonWidgetSubTypeName();
        const editingWidgetSubtypeId = legacyButtonWidgetSubData.getLegacyButtonWidgetSubTypeId();
        const legacyButtonEditorSubWidgetSettings = LegacyButtonEditorSubWidgetSettingsFactory.getStaticLegacyButtonEditorSubWidgetSettingsFactoryInstance().newLegacyButtonEditorSubWidgetSettings( this, legacyButtonWidgetSubData );

        const enSubtype = Object.entries( LegacyButtonWidgetSubData.LEGACY_BUTTON_WIDGET_SUBTYPE_NAMES_MAP );

        const iconSelectJsx = this._getIconSelectJsx();
        const subWidgetSettingsJsx = legacyButtonEditorSubWidgetSettings.getRenderJsx();
        const sEditingWidgetSubtypeId = editingWidgetSubtypeId.toString();
        const jsx =   (
            <>
                <p>{i18n.t("function")}</p>
                <Select
                    style={{width: '100%'}}
                    onSelect={(ev1, ev2) => this._onFormSubtypeSelected(ev1, ev2)}
                    defaultValue={sEditingWidgetSubtypeId}
                    value={sEditingWidgetSubtypeId}
                >
                    {enSubtype.map(([subtypeId, subtypeName], i) => {
                        return <Select.Option key={i} value={subtypeId}
                                              title={i18n.t(`legacy_button_description.${subtypeName}`)}>
                            {i18n.t(`legacy_button_label.${subtypeName}`)}
                        </Select.Option>
                    })}
                </Select>
                <p style={{
                    marginTop: 12,
                    marginBottom: 0
                }}>{i18n.t(`legacy_button_description.${editingWidgetSubtypeName}`)}</p>
                <p>{i18n.t("icon")}</p>
                {iconSelectJsx}
                <p>{i18n.t("Icon_width")}</p>
                <InputNumber min="0" value={widgetData.getIconWidth()}
                             onChange={(n) => this._onChangeIconWidth(n)}/>
                <p>{i18n.t("Icon_height")}</p>
                <InputNumber min="0" value={widgetData.getIconHeight()}
                             onChange={(n) => this._onChangeIconHeight(n)}/>
                {subWidgetSettingsJsx}
                <p>{i18n.t("Text_size")}</p>
                <InputNumber min="0" value={widgetData.getFontSize()}
                             onChange={(n) => this._onChangeFontSize(n)}/>
                <p>{i18n.t("fgColor")}</p>
                <Colorpicker format="rgb" value={widgetData.getFgColor()}
                             onChange={(color) => this._onChangeFgColor(color)}/>
                <p>{i18n.t("bgColor")}</p>
                <Colorpicker format="rgb" value={widgetData.getBgColor()}
                             onChange={(color) => this._onChangeBgColor(color)}/>
                <p>{i18n.t("outerBorderColor")}</p>
                <Colorpicker format="rgb" value={widgetData.getOuterBorderColor()}
                             onChange={(color) => this._onChangeOuterBorderColor(color)}/>
                <p>{i18n.t("outerBorderRadius")}</p>
                <InputNumber min="0" value={widgetData.getOuterBorderRadius()}
                             onChange={(n) => this._onChangeOuterBorderRadius(n)}/>
                <p>{i18n.t("outerBorderThickness")}</p>
                <InputNumber min="1" value={widgetData.getOuterBorderThickness()}
                             onChange={(n) => this._onChangeOuterBorderThickness(n)}/>
            </>
        );
        return jsx;
    }
}