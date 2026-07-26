import React from 'react';
import Button from "antd/lib/button";
import i18n from "../../../i18n";
import Popconfirm from "antd/lib/popconfirm";
import {Checkbox, Divider, Input, Modal, Select} from "antd";
//import AutoComplete from "antd/lib/auto-complete";
import WidgetSettingsTemplates from "./template/WidgetSettingsTemplates";
import Notification from "antd/lib/notification";
import BrekekeOperatorConsole from "../../../index";
import EditScreenView from "../../EditScreenView";
import WidgetSettingsTemplate from "./template/WidgetSettingsTemplate";
import WidgetData from "../../../data/widgetData/WidgetData";
import LegacyButtonEditorSubWidgetSettingsFactory
    from "./legacyButtonEditorSubWidgetSettings/LegacyButtonEditorSubWidgetSettingsFactory";


let _select_widget_settings_template_name = null;
let _new_widget_settings_template_name = null;
let _load_button_function = true;
//!abstract
export default class EditorWidgetSettings extends React.Component {
    constructor( props ) {
        super( props );
        this._EditScreenViewAsParent = props["editScreenViewAsParent"];
        this.state = {
        };
    }

    _getWidgetData(){
        return this.props["widgetData"];
    }

    _getRenderMainJsx(){
        throw new Error("Not implemented.");
        return null;
    }

    componentDidUpdate(){
        //empty( for subclass )
    }

    componentDidMount(){
        //empty( for subclass )
    }

    componentWillUnmount(){
        //empty( for subclass )
    }

    getEditScreenViewAsParent(){
        return this._EditScreenViewAsParent;
    }

    _onChangeLoadButtonFunction(e){
        const eLoadButtonFunction = document.getElementById("loadButtonFunction_EditorWidgetSettings_OperatorConsole_Brekeke");
        const checked = eLoadButtonFunction.checked;
        _load_button_function = checked === true;
        this.setState({rerender:true});
    }

    _onChangeSelectWidgetSettingsTemplateName(widgetSettingsTemplateName  ){
        _select_widget_settings_template_name = widgetSettingsTemplateName;
        this.setState({rerender:true});
    }

    _onChangeNewWidgetSettingsTemplateName( ev ){
        const widgetSettingsTemplateName = ev.target.value;
        _new_widget_settings_template_name = widgetSettingsTemplateName;
        this.setState({rerender:true});
    }

    _onClickRenameTemplateButton(){
        const oldName = _select_widget_settings_template_name;
        if( !oldName  ){
            Notification.warning({ message:i18n.t("No_template_specified")});
            return;
        }
        const name = _new_widget_settings_template_name;
        if( !name ){
            Notification.warning({ message:i18n.t("The_name_has_not_been_entered") });
            return;
        }
        const nameTrimmed = name.trim();
        if( nameTrimmed.length === 0  ){
            Notification.warning({ message:i18n.t("The_name_has_not_been_entered") });
            return;
        }

        if( nameTrimmed.length > WidgetSettingsTemplate.WIDGET_SETTINGS_TEMPLATE_NAME_MAX_LENGTH ){
            Notification.warning({ message:i18n.t("The_name_is_too_long") });
            return;
        }

        const oc = BrekekeOperatorConsole.getStaticInstance();

        const wsts = WidgetSettingsTemplates.getWidgetSettingsTemplates();
        wsts.reloadWidgetSettingsTemplatesAsync( oc.getPalRestApi(), () =>{
                const wsta = wsts.getWidgetSettingsTemplateArray();
                const wst = wsta.find( (itm) =>{
                   const b =  itm.getWidgetSettingsTemplateName() === oldName;
                   return b;
                });
                if( !wst ){
                    Notification.warning({ message:i18n.t("The_specified_template_does_not_exist") });
                    return;
                }
                const index = wsta.findIndex( (itm) =>{
                    const b =  itm.getWidgetSettingsTemplateName() === nameTrimmed;
                    return b;
                });
                if( index !== -1 ){
                    Notification.warning({ message:i18n.t("The_specified_template_name_already_exists") });
                    return;
                }

                wst.setWidgetSettingsTemplateName( nameTrimmed );
                wsts.saveWidgetSettingsTemplatesAsync( oc.getPalRestApi(), () =>{
                        Notification.success({ key: 'sync', message: i18n.t("saved_data_to_pbx_successfully") });
                        _select_widget_settings_template_name = _new_widget_settings_template_name;
                        this.setState({rerender:true});
                    },
                    (errorOrResponse) =>{
                        this.setState({rerender:true});
                    }
                );
            },
            ( errorOrResponse ) =>{
                this.setState({rerender:true});
            }
        );

    }

    // _onClickCreateTemplateButton(){
    //     const name = _new_widget_settings_template_name;
    //     if( !name ){
    //         Notification.warning({ message:i18n.t("The_name_has_not_been_entered") });
    //         return;
    //     }
    //     const nameTrimmed = name.trim();
    //     if( nameTrimmed.length === 0  ){
    //         Notification.warning({ message:i18n.t("The_name_has_not_been_entered") });
    //         return;
    //     }
    //
    //     if( nameTrimmed.length > WidgetSettingsTemplate.WIDGET_SETTINGS_TEMPLATE_NAME_MAX_LENGTH  ){
    //         Notification.warning({ message:i18n.t("The_name_is_too_long") });
    //         return;
    //     }
    //
    //     // //check name exists
    //     // const wsts = WidgetSettingsTemplates.getWidgetSettingsTemplates();
    //     // const wsta = wsts.getWidgetSettingsTemplateArray();
    //     // for( let i = 0; i < wsta.length; i++ ){
    //     //     const sTitle = wsta[i].getWidgetSettingsTemplateName();
    //     //     if( sTitle === nameTrimmed ){
    //     //         Notification.warning({ message:i18n.t("The_title_you_entered_already_exists") });
    //     //         return;
    //     //     }
    //     // }
    //
    //     const oc = BrekekeOperatorConsole.getStaticInstance();
    //
    //     const wsts = WidgetSettingsTemplates.getWidgetSettingsTemplates();
    //     wsts.reloadWidgetSettingsTemplatesAsync( oc.getPalRestApi(), () =>{
    //
    //             const index = wsts.getWidgetSettingsTemplateArray().findIndex( (itm) =>{
    //                const b = itm.getWidgetSettingsTemplateName() === nameTrimmed;
    //                return b;
    //             });
    //             if( index !== -1 ){
    //                 Notification.warning({ message:i18n.t("The_specified_template_name_already_exists") });
    //                 this.setState({rerender:true});
    //                 return;
    //             }
    //
    //             wsts.insertWidgetSettingsTemplate( nameTrimmed);
    //             wsts.saveWidgetSettingsTemplatesAsync( oc.getPalRestApi(), () =>{
    //                 Notification.success({ key: 'sync', message: i18n.t("saved_data_to_pbx_successfully") });
    //                 this.setState({rerender:true});
    //             },
    //                 (errorOrResponse) =>{
    //                     this.setState({rerender:true});
    //
    //                 }
    //             );
    //         },
    //         ( errorOrResponse ) =>{
    //             this.setState({rerender:true});
    //         }
    //     );
    //
    // }

    _onClickCreateWidgetSettingsTemplateButton(){
        const name = _new_widget_settings_template_name;
        if( !name ){
            Notification.warning({ message:i18n.t("The_name_has_not_been_entered") });
            return;
        }
        const nameTrimmed = name.trim();
        if( nameTrimmed.length === 0  ){
            Notification.warning({ message:i18n.t("The_name_has_not_been_entered") });
            return;
        }

        if( nameTrimmed.length > WidgetSettingsTemplate.WIDGET_SETTINGS_TEMPLATE_NAME_MAX_LENGTH  ){
            Notification.warning({ message:i18n.t("The_name_is_too_long") });
            return;
        }

        const oc = BrekekeOperatorConsole.getStaticInstance();

        const wsts = WidgetSettingsTemplates.getWidgetSettingsTemplates();
        wsts.reloadWidgetSettingsTemplatesAsync( oc.getPalRestApi(), () =>{
                let wst = wsts.getWidgetSettingsTemplateArray().find( (itm) =>{
                    const b = itm.getWidgetSettingsTemplateName() === nameTrimmed;
                    return b;
                });
                if( wst ){
                    Notification.warning({ message:i18n.t("The_specified_template_name_already_exists") });
                    return;
                }

                wst = wsts.insertWidgetSettingsTemplate( nameTrimmed );
                const widgetData = this._getWidgetData();
                widgetData.saveToWidgetSettingsTemplate(wst,this);

                wsts.saveWidgetSettingsTemplatesAsync( oc.getPalRestApi(), () =>{
                        Notification.success({ key: 'sync', message: i18n.t("saved_data_to_pbx_successfully") });
                        this.setState({ rerender:true});
                    },
                    (errorOrResponse) =>{
                        this.setState({rerender:true});
                    }
                );
            },
            ( errorOrResponse ) =>{
                this.setState({rerender:true});
            }
        );
    }

    _onClickOverwriteSaveWidgetSettingsTemplateButton(){
        const name = _select_widget_settings_template_name;
        if( !name ){
            Notification.warning({ message:i18n.t("The_name_has_not_been_selected") });
            return;
        }
        const nameTrimmed = name.trim();
        if( nameTrimmed.length === 0  ){
            Notification.warning({ message:i18n.t("The_name_has_not_been_selected") });
            return;
        }

        // if( nameTrimmed.length > WidgetSettingsTemplate.WIDGET_SETTINGS_TEMPLATE_NAME_MAX_LENGTH  ){
        //     Notification.warning({ message:i18n.t("The_name_is_too_long") });
        //     return;
        // }

        const oc = BrekekeOperatorConsole.getStaticInstance();

        const wsts = WidgetSettingsTemplates.getWidgetSettingsTemplates();
        wsts.reloadWidgetSettingsTemplatesAsync( oc.getPalRestApi(), () =>{
                let wst = wsts.getWidgetSettingsTemplateArray().find( (itm) =>{
                    const b = itm.getWidgetSettingsTemplateName() === nameTrimmed;
                    return b;
                });
                if( !wst ){
                    Notification.warning({ message:i18n.t("The_specified_template_does_not_exist") });
                    return;
                }

                const widgetData = this._getWidgetData();
                widgetData.saveToWidgetSettingsTemplate(wst);

                wsts.saveWidgetSettingsTemplatesAsync( oc.getPalRestApi(), () =>{
                        Notification.success({ key: 'sync', message: i18n.t("saved_data_to_pbx_successfully") });
                        this.setState({ rerender:true});
                    },
                    (errorOrResponse) =>{
                        this.setState({rerender:true});
                    }
                );
            },
            ( errorOrResponse ) =>{
                this.setState({rerender:true});
            }
        );
    }

    // _onClickSaveWidgetSettingsTemplateButton(){
    //     const name = _select_widget_settings_template_name;
    //     if( !name ){
    //         Notification.warning({ message:i18n.t("The_name_has_not_been_entered") });
    //         return;
    //     }
    //     const nameTrimmed = name.trim();
    //     if( nameTrimmed.length === 0  ){
    //         Notification.warning({ message:i18n.t("The_name_has_not_been_entered") });
    //         return;
    //     }
    //
    //     if( nameTrimmed.length > WidgetSettingsTemplate.WIDGET_SETTINGS_TEMPLATE_NAME_MAX_LENGTH  ){
    //         Notification.warning({ message:i18n.t("The_name_is_too_long") });
    //         return;
    //     }
    //
    //     const oc = BrekekeOperatorConsole.getStaticInstance();
    //
    //     const wsts = WidgetSettingsTemplates.getWidgetSettingsTemplates();
    //     wsts.reloadWidgetSettingsTemplatesAsync( oc.getPalRestApi(), () =>{
    //             let wst = wsts.getWidgetSettingsTemplateArray().find( (itm) =>{
    //                 const b = itm.getWidgetSettingsTemplateName() === nameTrimmed;
    //                 return b;
    //             });
    //             if( !wst ){
    //                 //add
    //                 wst = wsts.insertWidgetSettingsTemplate( nameTrimmed );
    //             }
    //
    //             const widgetData = this._getWidgetData();
    //             widgetData.saveToWidgetSettingsTemplate(wst);
    //
    //             wsts.saveWidgetSettingsTemplatesAsync( oc.getPalRestApi(), () =>{
    //                     Notification.success({ key: 'sync', message: i18n.t("saved_data_to_pbx_successfully") });
    //                     this.setState({ rerender:true});
    //                 },
    //                 (errorOrResponse) =>{
    //                     this.setState({rerender:true});
    //                 }
    //             );
    //         },
    //         ( errorOrResponse ) =>{
    //             this.setState({rerender:true});
    //         }
    //     );
    // }

    _onConfirmOkDeleteWidgetSettingsTemplate(){
        const name = _select_widget_settings_template_name;
        if( !name  ){
            Notification.warning({ message:i18n.t("No_template_specified")});
            return;
        }
        if( name.length > WidgetSettingsTemplate.WIDGET_SETTINGS_TEMPLATE_NAME_MAX_LENGTH  ){
            Notification.warning({ message:i18n.t("The_name_is_too_long") });
            return;
        }
        const oc = BrekekeOperatorConsole.getStaticInstance();

        const wsts = WidgetSettingsTemplates.getWidgetSettingsTemplates();
        wsts.reloadWidgetSettingsTemplatesAsync( oc.getPalRestApi(), () =>{

                const index = wsts.getWidgetSettingsTemplateArray().findIndex( (itm) =>{
                    const b = itm.getWidgetSettingsTemplateName() === name;
                    return b;
                });
                if( index === -1 ){
                    Notification.warning({ message:i18n.t("The_specified_template_does_not_exist") });
                    this.setState({rerender:true});
                    return;
                }

                wsts.deleteWidgetSettingsTemplateByIndex( index );
                wsts.saveWidgetSettingsTemplatesAsync( oc.getPalRestApi(), () =>{
                        Notification.success({ key: 'sync', message: i18n.t("saved_data_to_pbx_successfully") });
                        _select_widget_settings_template_name = "";
                        this.setState({rerender:true});
                    },
                    (errorOrResponse) =>{
                        this.setState({rerender:true});
                    }
                );
            },
            ( errorOrResponse ) =>{
                this.setState({rerender:true});
            }
        );
    }

    _onClickLoadWidgetSettingsTemplateButton(){
        const name = _select_widget_settings_template_name;
        if( !name  ){
            Notification.warning({ message:i18n.t("No_template_specified")});
            return;
        }
        if( name.length > WidgetSettingsTemplate.WIDGET_SETTINGS_TEMPLATE_NAME_MAX_LENGTH  ){
            Notification.warning({ message:i18n.t("The_name_is_too_long") });
            return;
        }

        const oc = BrekekeOperatorConsole.getStaticInstance();

        const wsts = WidgetSettingsTemplates.getWidgetSettingsTemplates();
        wsts.reloadWidgetSettingsTemplatesAsync( oc.getPalRestApi(), () =>{

                const wst = wsts.getWidgetSettingsTemplateArray().find( (itm) =>{
                    const b = itm.getWidgetSettingsTemplateName() === name;
                    return b;
                });
                if( !wst ){
                    Notification.warning({ message:i18n.t("The_specified_template_does_not_exist") });
                    this.setState({rerender:true});
                    return;
                }

                const widgetData = this._getWidgetData();
                if( widgetData.getWidgetTypeId() === WidgetData.WIDGET_TYPE_ID__LEGACY_BUTTON ) {
                    widgetData.loadFromWidgetSettingsTemplate(wst, _load_button_function );
                    this._onLoadFromWidgetSettingsTemplate( wst, _load_button_function  );
                }
                else {
                    widgetData.loadFromWidgetSettingsTemplate(wst);
                    this._onLoadFromWidgetSettingsTemplate( wst );
                }
                Notification.success({ message: i18n.t("Loaded_from_the_template") });
                EditScreenView.getEditScreenViewInstance().commitEdit();
            },
            ( errorOrResponse ) =>{
                this.setState({rerender:true});
            }
        );
    }

    //!virtual
    _onLoadFromWidgetSettingsTemplate( wst, _load_button_function ){

    }

    render() {
        const widgetData = this._getWidgetData();
        const widgetNameForII18n = widgetData.getWidgetNameForI18n();

        const wsts = WidgetSettingsTemplates.getWidgetSettingsTemplates();
        const wsta = wsts.getWidgetSettingsTemplateArray();

        // const widgetSettingsTemplateOptions = new Array( );
		// let bOverwriteTemplate = false;
        // for( let i = 0; i < wsta.length; i++ ){
        //     const wstn = wsta[i].getWidgetSettingsTemplateName();
        //     //!for old version
        //     if( !wstn ){
        //         continue;
        //     }
        //     widgetSettingsTemplateOptions.push( { value :  wstn });
		//
		// 	if( bOverwriteTemplate === false && _select_widget_settings_template_name === wstn ){
		// 		bOverwriteTemplate = true;
		// 	}
		//
        // }
		
		
        const bDisabled = !wsta || wsta.length === 0;
        const jsx = (
            <>
                <div style={{padding: "12px 12px 0px 12px"}}>{i18n.t(`widget_description.${widgetNameForII18n}`)}</div>
                <div style={{
                    overflowY: 'auto',
                    flexGrow: "1",
                    height: "0px", /* height:0 is for show scrollbar */
                    paddingLeft: 12,
                    paddingRight: 12
                }}>
                    {this._getRenderMainJsx()}
                    <Divider>{i18n.t("Template")}</Divider>
                    {/*<h3>{i18n.t("Template")}</h3>*/}
					{ widgetData.getWidgetTypeId() === WidgetData.WIDGET_TYPE_ID__LEGACY_BUTTON  ? (
                        <div>
                            <Checkbox
                                id="loadButtonFunction_EditorWidgetSettings_OperatorConsole_Brekeke"
                                    checked={_load_button_function === true }
                                onChange={(e) => this._onChangeLoadButtonFunction(e)}
                             />
                            <label style={{marginLeft: "2px"}}
                                   htmlFor="loadButtonFunction_EditorWidgetSettings_OperatorConsole_Brekeke">{i18n.t("Load_function")}</label>
                        </div>
					)
					: null
					}
                    <div className={"defaultElementMarginTop_s"}>
                        {/*<AutoComplete*/}
                        {/*    style={{width: "100%"}}*/}
                        {/*    options={widgetSettingsTemplateOptions}*/}
                        {/*    value={_select_widget_settings_template_name}*/}
                        {/*    onChange={(widgetSettingsTemplateTitle) => this._onChangeSelectWidgetSettingsTemplateName(widgetSettingsTemplateTitle)}*/}
                        {/*    placeholder={i18n.t("Select_or_enter_a_template")}*/}
                        {/*    allowClear={true}*/}
                        {/*    filterOption={(inputValue, option) => {*/}
                        {/*        const b = option.value.toLowerCase().startsWith(inputValue.toLowerCase());*/}
                        {/*        return b;*/}
                        {/*    }*/}
                        {/*    }*/}
                        {/*/>*/}
                        {/*<AutoComplete*/}
                        {/*    style={{width: "100%"}}*/}
                        {/*    options={widgetSettingsTemplateOptions}*/}
                        {/*    value={_select_widget_settings_template_name}*/}
                        {/*    onChange={(widgetSettingsTemplateTitle) => this._onChangeSelectWidgetSettingsTemplateName(widgetSettingsTemplateTitle)}*/}
                        {/*    placeholder={i18n.t("Select_or_enter_a_template")}*/}
                        {/*    allowClear={true}*/}
                        {/*    filterOption={(inputValue, option) => {*/}
                        {/*        const b = option.value.toLowerCase().startsWith(inputValue.toLowerCase());*/}
                        {/*        return b;*/}
                        {/*    }*/}
                        {/*    }*/}
                        {/*/>*/}
                        <Select
                                style={{width:"100%"}}
                                onChange={(widgetSettingsTemplateTitle) => this._onChangeSelectWidgetSettingsTemplateName(widgetSettingsTemplateTitle)}
                                value={_select_widget_settings_template_name}
                                placeholder={i18n.t("Select_a_template")}
                        >
                            { wsta && wsta.map( ( wst, i ) => {
                                    const wstn = wst.getWidgetSettingsTemplateName();
                                    if( wstn ) {
                                        return <Select.Option value={wstn}>{wstn}</Select.Option>
                                    }
                                })
                            }
                        </Select>
                    </div>
                    <div className={"defaultButtonMarginTop"}>
                            <Popconfirm title={i18n.t("Are_you_sure_you_want_to_overwrite_it?")} disabled={bDisabled}
                    			onConfirm={() => this._onClickOverwriteSaveWidgetSettingsTemplateButton()}
                    			okText={i18n.t("yes")}
                    			cancelText={i18n.t("no")}
                    		>
                    			<Button disabled={bDisabled}>{i18n.t("Save")}</Button>
                    		</Popconfirm>
							<Popconfirm disabled={bDisabled} title={i18n.t("are_you_sure")}
										onConfirm={() => this._onClickLoadWidgetSettingsTemplateButton()}
										okText={i18n.t("yes")}
										cancelText={i18n.t("no")}
							>
								<Button className={"defaultButtonMarginLeft"} disabled={bDisabled} >{i18n.t("Load")}</Button>
							</Popconfirm>
                    </div>
                    {/*<div className={"defaultButtonMarginTop"}>*/}
					{/*	{ bOverwriteTemplate ? (*/}
	                {/*        <Popconfirm title={i18n.t("Are_you_sure_you_want_to_overwrite_it?")}*/}
					{/*			onConfirm={() => this._onClickSaveWidgetSettingsTemplateButton()}*/}
					{/*			okText={i18n.t("yes")}*/}
					{/*			cancelText={i18n.t("no")}*/}
					{/*		>*/}
					{/*			<Button>{i18n.t("Save")}</Button>*/}
					{/*		</Popconfirm>*/}
					{/*	) */}
					{/*	: (*/}
					{/*		<Button*/}
					{/*			onClick={() => this._onClickSaveWidgetSettingsTemplateButton()}>{i18n.t("Save")}</Button>*/}
					{/*	)}*/}
                    {/*    <Button className={"defaultButtonMarginLeft"}*/}
                    {/*            onClick={() => this._onClickLoadWidgetSettingsTemplateButton()}>{i18n.t("Load")}</Button>*/}
                    {/*</div>*/}
                    <div className={"defaultButtonMarginTop"}>
                        <Popconfirm disabled={bDisabled} title={i18n.t("are_you_sure")}
                                    onConfirm={() => this._onConfirmOkDeleteWidgetSettingsTemplate()}
                                    okText={i18n.t("yes")}
                                    cancelText={i18n.t("no")}
                        >
                            <Button disabled={bDisabled}>{i18n.t("Delete")}</Button>
                        </Popconfirm>
                    </div>
                    <p>{i18n.t("Create_or_rename_a_template")}</p>
                    <div><Input
                        style={{width: "100%"}}
                        placeholder={i18n.t("Enter_a_new_name")}
                        onChange={(ev) => this._onChangeNewWidgetSettingsTemplateName(ev)}
                    /></div>
                    <div className={"defaultButtonMarginTop"}>
                        {/*<Button onClick={() => this._onClickCreateTemplateButton()}>{i18n.t("Create")}</Button>*/}
                        {/*<Button onClick={() => this._onClickRenameTemplateButton()}*/}
                        {/*        className={"defaultButtonMarginLeft"}>{i18n.t("Rename")}</Button>*/}
                        <Button onClick={() => this._onClickCreateWidgetSettingsTemplateButton()}>{i18n.t("Create")}</Button>
                        <Button disabled={bDisabled} onClick={() => this._onClickRenameTemplateButton()} className="brOCMarginLeftButtonToButton" >{i18n.t("Rename")}</Button>
                    </div>
                </div>
                <div style={{padding: "0px 12px 12px 12px"}}>
                {/*<Button type="secondary"*/}
                    {/*        onClick={() => this.duplicateWidget(this.state.selectingWidgetIndex)}>*/}
                    {/*    {i18n.t("duplicate")}*/}
                    {/*</Button>*/}
                    <Popconfirm title={i18n.t("are_you_sure")}
                                onConfirm={() => this._EditScreenViewAsParent.onConfirmOkRemoveEditorWidget(widgetData)}
                                okText={i18n.t("yes")}
                                cancelText={i18n.t("no")}
                    >
                        <Button type="danger">{i18n.t("remove")}</Button>
                    </Popconfirm>
                </div>
            </>
        );
        return jsx;
    }
}