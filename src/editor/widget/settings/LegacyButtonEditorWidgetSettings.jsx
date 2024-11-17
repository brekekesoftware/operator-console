import React from 'react';
import EditorWidgetSettings from "./EditorWidgetSettings";
import LegacyButtonEditorSubWidgetSettingsFactory
    from "./legacyButtonEditorSubWidgetSettings/LegacyButtonEditorSubWidgetSettingsFactory";
import {Select} from "antd";
import i18n from "../../../i18n";
import LegacyButtonWidgetSubData from "../../../data/widgetData/legacyButtonWidgetSubData/LegacyButtonWidgetSubData";

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
                {subWidgetSettingsJsx}
            </>
        );
        return jsx;
    }
}