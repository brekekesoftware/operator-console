import React from 'react';
import EditorWidgetSettings from "./EditorWidgetSettings";
import LegacyButtonEditorSubWidgetSettingsFactory
    from "./legacyButtonEditorSubWidgetSettings/LegacyButtonEditorSubWidgetSettingsFactory";
import {Button, Select} from "antd";
import i18n from "../../../i18n";
import LegacyButtonWidgetSubData from "../../../data/widgetData/legacyButtonWidgetSubData/LegacyButtonWidgetSubData";
import Input from "antd/lib/input";
import LegacyButtonWidgetSubData_unholdCallButton
    from "../../../data/widgetData/legacyButtonWidgetSubData/LegacyButtonWidgetSubData_unholdCallButton";
import BrekekeOperatorConsole from "../../../index";

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

    _onFormSubtypeSelected( ev1, ev2 ){
        const selectedSubtypeId = parseInt( ev1 );
        const widgetData = this._getWidgetData();
        widgetData.setSubDataBySubtypeId( selectedSubtypeId );
        this._EditScreenViewAsParent.setState({rerender:true});
    }

     getEditScreenViewAsParent(){
        return this._EditScreenViewAsParent;
    }

    _onChangeTooltipOfButtonWidget( s ){
        const widgetData = this._getWidgetData();

        const language = BrekekeOperatorConsole.getStaticInstance().getLoggedinLanguage();
        widgetData.setTooltipOfButtonWidget( s, language );
        this._EditScreenViewAsParent.setState({rerender:true});
    }

    _setTooltipOfButtonWidgetToInitial(){
		// const s = this._getInitialTooltipOfButtonWidget();
        const s = null;
        this._onChangeTooltipOfButtonWidget(s);
    }
	
	_getInitialTooltipOfButtonWidget(){
        const legacyButtonWidgetData = this._getWidgetData();
        const legacyButtonWidgetSubData = legacyButtonWidgetData.getSubData();
        const buttonSubtypeId = legacyButtonWidgetSubData.getLegacyButtonWidgetSubTypeId();

        const subtypeName = LegacyButtonWidgetSubData.getLegacyButtonWidgetSubtypeName( buttonSubtypeId );
        const s = i18n.t(`legacy_button_description.${subtypeName}`);
		
		return s;
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

        const subWidgetSettingsJsx = legacyButtonEditorSubWidgetSettings.getRenderJsx();
        const sEditingWidgetSubtypeId = editingWidgetSubtypeId.toString();

        const language = BrekekeOperatorConsole.getStaticInstance().getLoggedinLanguage();
        let sTooltipOfButtonWidget = widgetData.getTooltipOfButtonWidget( language );
		if( sTooltipOfButtonWidget === undefined || sTooltipOfButtonWidget === null ){
			//Set builtin
			sTooltipOfButtonWidget = this._getInitialTooltipOfButtonWidget();
		}


        const jsx = (
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
                <p>{i18n.t("Tooltip")}</p>
                <Input placeholder={i18n.t("Tooltip")} allowClear value={sTooltipOfButtonWidget}
                       defaultValue={sTooltipOfButtonWidget}
                       maxLength={1000}
                       onChange={(e) => this._onChangeTooltipOfButtonWidget(e.target.value)}/>
				<br />
                <Button className="defaultButtonMarginTop" onClick={() => {
                    this._setTooltipOfButtonWidgetToInitial();
                }}>{i18n.t("RevertToInitial")}</Button>
                <p style={{
                    marginTop: 12,
                    marginBottom: 0
                }}>{i18n.t(`legacy_button_description.${editingWidgetSubtypeName}`)}</p>
                {subWidgetSettingsJsx}
            </>
        );
        return jsx;
    }
}