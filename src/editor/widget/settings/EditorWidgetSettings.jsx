import React from 'react';
import Button from "antd/lib/button";
import i18n from "../../../i18n";
import Popconfirm from "antd/lib/popconfirm";
import {Checkbox, Input, Modal, Select} from "antd";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash} from "@fortawesome/free-solid-svg-icons";
import {ColorPicker} from "antd";
import InputNumber from "antd/lib/input-number";
import AutoComplete from "antd/lib/auto-complete";
import WidgetSettingsTemplates from "./template/WidgetSettingsTemplates";
import Notification from "antd/lib/notification";
import BrekekeOperatorConsole from "../../../index";
import EditScreenView from "../../EditScreenView";
import WidgetSettingsTemplate from "./template/WidgetSettingsTemplate";
import WidgetData from "../../../data/widgetData/WidgetData";
import LegacyButtonEditorSubWidgetSettingsFactory
    from "./legacyButtonEditorSubWidgetSettings/LegacyButtonEditorSubWidgetSettingsFactory";
import EditorWidgetTemplateFactory from "../template/EditorWidgetTemplateFactory";
import Util from "../../../Util";


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

    //!presentational helper. Renders a "Settings"-style bordered field: label above, a
    //!light-grey box below containing the antd-colorpicker swatch plus a live hex/percent readout.
    _renderColorField( labelKey, colorValue, onChange ){
        const rgb = colorValue && colorValue.rgb;
        const hex = colorValue && colorValue.hex ? colorValue.hex.replace("#", "").toUpperCase() : "";
        const percent = rgb && typeof rgb.a === "number" ? Math.round(rgb.a * 100) : 100;
        return (
            <div className="brOCSettingsField">
                <p className="brOCSettingsFieldLabel">{i18n.t(labelKey)}</p>
                <div className="brOCSettingsFieldBox">
                    {/* <Colorpicker value={colorValue} onChange={onChange} showText allowClear /> */}
                    <ColorPicker value={Util.toAntdColorPickerValue(colorValue)} onChange={(color) => onChange(Util.fromAntdColorPickerOnChange(color))} showText allowClear />
                </div>
            </div>
        );
    }

    //!presentational helper. Renders a labelled number field in the same bordered-box style.
    _renderNumberField( labelKey, value, onChange, extraProps ){
        return (
            <div className="brOCSettingsField">
                <p className="brOCSettingsFieldLabel">{i18n.t(labelKey)}</p>
                <div className="brOCSettingsFieldBox">
                    <InputNumber className="brOCSettingsFieldInput" variant="borderless" value={value}
                                 onChange={onChange} {...extraProps}/>
                </div>
            </div>
        );
    }

    //!presentational helper. Renders a labelled single-line text field in the same bordered-box style.
    _renderTextField( labelKey, value, onChange, extraProps ){
        return (
            <div className="brOCSettingsField">
                <p className="brOCSettingsFieldLabel">{i18n.t(labelKey)}</p>
                <div className="brOCSettingsFieldBox">
                    <Input className="brOCSettingsFieldInput" variant="borderless" value={value}
                           onChange={onChange} {...extraProps}/>
                </div>
            </div>
        );
    }

    //!presentational helper. Renders a labelled multi-line text field in the same bordered-box style.
    _renderTextAreaField( labelKey, value, onChange, extraProps ){
        return (
            <div className="brOCSettingsField">
                <p className="brOCSettingsFieldLabel">{i18n.t(labelKey)}</p>
                <div className="brOCSettingsFieldBox">
                    <Input.TextArea className="brOCSettingsFieldInput" variant="borderless" value={value}
                                    onChange={onChange} {...extraProps}/>
                </div>
            </div>
        );
    }

    //!presentational helper. Renders a labelled select field in the same bordered-box style.
    _renderSelectField( labelKey, value, onChange, optionsJsx, extraProps ){
        return (
            <div className="brOCSettingsField">
                <p className="brOCSettingsFieldLabel">{i18n.t(labelKey)}</p>
                <div className="brOCSettingsFieldBox">
                    <Select className="brOCSettingsFieldInput" variant="borderless" value={value}
                            onChange={onChange} {...extraProps}>
                        {optionsJsx}
                    </Select>
                </div>
            </div>
        );
    }

    //!presentational helper. Renders a labelled autocomplete field in the same bordered-box style.
    _renderAutoCompleteField( labelKey, value, onChange, extraProps ){
        return (
            <div className="brOCSettingsField">
                <p className="brOCSettingsFieldLabel">{i18n.t(labelKey)}</p>
                <div className="brOCSettingsFieldBox">
                    <AutoComplete className="brOCSettingsFieldInput" variant="borderless" value={value}
                                  onChange={onChange} {...extraProps}/>
                </div>
            </div>
        );
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
        const widgetDescMessageKey = `widget_description.${widgetNameForII18n}`;
        const widgetTemplate = EditorWidgetTemplateFactory.getStaticEditorWidgetSettingsFactoryInstance().getEditorWidgetTemplateByWidgetTypeId( widgetData.getWidgetTypeId() );
        const widgetNameLabelKey = widgetTemplate ? widgetTemplate.getLabelKey() : widgetNameForII18n;
        const jsx = (
            <>
                <div style={{display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 12px 0px 12px"}}>
                    <p className="brOCSettingsSectionHeading" style={{margin: 0}}>{i18n.t( widgetNameLabelKey)}</p>
                    <Popconfirm title={i18n.t("are_you_sure")}
                                onConfirm={() => this._EditScreenViewAsParent.onConfirmOkRemoveEditorWidget(widgetData)}
                                okText={i18n.t("yes")}
                                cancelText={i18n.t("no")}
                    >
                        <a className="icon_general brOCSettingsDeleteIcon"><FontAwesomeIcon icon={faTrash}/></a>
                    </Popconfirm>
                </div>
                <div className="brOCSettingsFieldLabel" style={{padding: "4px 12px 0px 12px"}}>{i18n.t( widgetDescMessageKey)}</div>
                <div style={{
                    overflowY: 'auto',
                    flexGrow: "1",
                    height: "0px", /* height:0 is for show scrollbar */
                    paddingLeft: 12,
                    paddingRight: 12
                }}>
                    {this._getRenderMainJsx()}
                    <div className="brOCWidgetSettingsPanel">
                        <p className="brOCSettingsSectionHeading">{i18n.t("Template")}</p>
						{ widgetData.getWidgetTypeId() === WidgetData.WIDGET_TYPE_ID__LEGACY_BUTTON  ? (
                            <div>
                                <Checkbox
                                    id="loadButtonFunction_EditorWidgetSettings_OperatorConsole_Brekeke"
                                        checked={_load_button_function === true }
                                    onChange={(e) => this._onChangeLoadButtonFunction(e)}
                                 />
                                <label className="brOCSettingsFieldLabel" style={{marginLeft: "2px", display: "inline"}}
                                       htmlFor="loadButtonFunction_EditorWidgetSettings_OperatorConsole_Brekeke">{i18n.t("Load_function")}</label>
                            </div>
						)
						: null
						}
                        <div className="brOCSettingsField">
                            <p className="brOCSettingsFieldLabel">{i18n.t("Select_a_template")}</p>
                            <div className="brOCSettingsFieldBox">
                                <Select
                                        className="brOCSettingsFieldInput"
                                        variant="borderless"
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
                        </div>
                        <div className={"defaultButtonMarginTop"}>
                                <Popconfirm title={i18n.t("Are_you_sure_you_want_to_overwrite_it?")} disabled={bDisabled}
                        			onConfirm={() => this._onClickOverwriteSaveWidgetSettingsTemplateButton()}
                        			okText={i18n.t("yes")}
                        			cancelText={i18n.t("no")}
                        		>
                        			<Button className="brOCSettingsButton" disabled={bDisabled}>{i18n.t("Save")}</Button>
                        		</Popconfirm>
								<Popconfirm disabled={bDisabled} title={i18n.t("are_you_sure")}
											onConfirm={() => this._onClickLoadWidgetSettingsTemplateButton()}
											okText={i18n.t("yes")}
											cancelText={i18n.t("no")}
								>
									<Button className="brOCSettingsButton defaultButtonMarginLeft" disabled={bDisabled} >{i18n.t("Load")}</Button>
								</Popconfirm>
                        </div>
                        <div className={"defaultButtonMarginTop"}>
                            <Popconfirm disabled={bDisabled} title={i18n.t("are_you_sure")}
                                        onConfirm={() => this._onConfirmOkDeleteWidgetSettingsTemplate()}
                                        okText={i18n.t("yes")}
                                        cancelText={i18n.t("no")}
                            >
                                <Button className="brOCSettingsButton" disabled={bDisabled}>{i18n.t("Delete")}</Button>
                            </Popconfirm>
                        </div>
                        <div className="brOCSettingsField">
                            <p className="brOCSettingsFieldLabel">{i18n.t("Create_or_rename_a_template")}</p>
                            <div className="brOCSettingsFieldBox">
                                <Input
                                    className="brOCSettingsFieldInput"
                                    variant="borderless"
                                    style={{width: "100%"}}
                                    placeholder={i18n.t("Enter_a_new_name")}
                                    onChange={(ev) => this._onChangeNewWidgetSettingsTemplateName(ev)}
                                />
                            </div>
                        </div>
                        <div className={"defaultButtonMarginTop"}>
                            <Button className="brOCSettingsButton" onClick={() => this._onClickCreateWidgetSettingsTemplateButton()}>{i18n.t("Create")}</Button>
                            <Button disabled={bDisabled} onClick={() => this._onClickRenameTemplateButton()} className="brOCSettingsButton brOCMarginLeftButtonToButton" >{i18n.t("Rename")}</Button>
                        </div>
                    </div>
                </div>
            </>
        );
        return jsx;
    }
}