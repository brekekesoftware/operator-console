import React from "react";
import "./reset.css"
import "./phonebookContactInfozInfoView.css"
import i18n from "../i18n";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import BrekekeOperatorConsole from "../index";
import OCUtil from "../OCUtil";
import {Button, Input} from "antd";
import Popconfirm from "antd/lib/popconfirm";
import Notification from "antd/lib/notification";
import PhonebookContactInfo_AutoDialView_ver2 from "./PhonebookContactInfo_AutoDialView_ver2";

class PbContactInfozCustomItem{
    constructor( options ) {
        const pbContactInfozItem = options["pbContactInfozItem"];
        if( pbContactInfozItem ) {
            this._name = pbContactInfozItem.getInfoKeyName();
            this._value = pbContactInfozItem.getValue();
        }
        else{
            // const name = options["name"];
            // const value = options["value"];
            // this.setName( name );
            // this.setValue( value );
            this._name = "";
            this._value = "";
        }
    }

    getName(){
        return this._name;
    }

    getValue(){
        return this._value;
    }

    setValue( val ){
        this._value = val;
    }

    setName( name ){
        //let validName = name.replace("$", "");
        let validName = OCUtil.removeChar( name, '$');
        validName = validName.trim();
        this._name = validName;
    }
}

let _INSTANCE;
export default class PhonebookContactInfozInfoView extends React.Component {

    constructor(props) {
        super(props);
        this.state ={
            pbContactInfo : null,
        }
        this._PbContactInfozCustomItemArray = new Array();

        _INSTANCE = this;
    }

    static getStaticPhonebookContactInfozInfoViewInstance(){
        return _INSTANCE;
    }

    getPhonebookContactInfoFromState(){
        return this.state.pbContactInfo;
    }

    _onInputFocus(){
        const oc = BrekekeOperatorConsole.getStaticInstance();
        oc.addDisableKeydownToDialingCounter();
        oc.addDisablePasteToDialingCounter();
    }

    _onInputBlur(){
        const oc = BrekekeOperatorConsole.getStaticInstance();
        oc.subtractDisableKeydownToDialingCounter();
        oc.subtractDisablePasteToDialingCounter();
    }

    _onCustomItemNameInputFocus( customItem, e ){
        setTimeout( () => {
            const name = customItem.getName();
            e.target.value = name;
        }, 1 );
        this._onInputFocus();
    }

    _onCustomItemValueInputFocus( customItem, e ){
        setTimeout( () => {
            const value = customItem.getValue();
            e.target.value = value;
        }, 1 );
        this._onInputFocus();
    }

    _onCustomItemNameInputBlur( customItem, e ){
        setTimeout( () => {
            const name = customItem.getName();
            e.target.value = name;
        }, 1 );
        this._onInputBlur();
    }

    _onCustomItemValueInputBlur( customItem, e ){
        setTimeout( () => {
            const value = customItem.getValue();
            e.target.value = value;
        }, 1 );
        this._onInputBlur();
    }

    _reloadContactInfo( aid ){
        this._PbContactInfozCustomItemArray.length = 0;
        const getContactOptions = {
            methodName : "getContact",
            methodParams : JSON.stringify({
                aid : aid
            })
        };
        const oc = BrekekeOperatorConsole.getStaticInstance();
        const promise = oc.getPalRestApi().callPalRestApiMethodAsync(getContactOptions);
        promise.then( (contact) =>{
            if( !contact ){
                OCUtil.logErrorWithNotification("Failed to get phonebook contact.", i18n.t('Failed_to_get_phone_book_contact') );
            }
            else{
                const pbGotContactInfo =  new PhonebookContactInfo_AutoDialView_ver2( contact );

                //Collect info's custom items.
                const pbContactInfozInfoArray = pbGotContactInfo.getFreezedPhonebookContactInfozInfoArray();
                for( let i = 0; i < pbContactInfozInfoArray.length; i++ ){
                    const infozItem = pbContactInfozInfoArray[i];
                    if( infozItem.isCustomKey() ){
                        const infozCustomItem = new PbContactInfozCustomItem( { pbContactInfozItem : infozItem} );

                        //Did not work
                        // //Refresh custom item element's value
                        // const eCustomItemName = document.querySelector('[data-br-name="PhonebookContactInfozInfoView_customItemName_' + i + '"]');
                        // if( eCustomItemName ){
                        //     eCustomItemName.value = infozCustomItem.getName();
                        //     const eCustomItemValue = document.querySelector('[data-br-name="PhonebookContactInfozInfoView_customItemValue_' + i + '"]');
                        //     eCustomItemValue.value = infozCustomItem.getValue();
                        // }

                        this._PbContactInfozCustomItemArray.push( infozCustomItem );
                    }
                }

                this.setState({pbContactInfo:pbGotContactInfo}, () =>{
                        //Refresh custom item element's name&value
                        for (let i = 0; i < this._PbContactInfozCustomItemArray.length; i++) {
                            const customItem = this._PbContactInfozCustomItemArray[i];
                            const eCustomItemName = document.querySelector('[data-br-name="PhonebookContactInfozInfoView_customItemName_' + i + '"]');
                            const name = customItem.getName();
                            //eCustomItemName.defaultValue = name;
                            eCustomItemName.value = name;
                            //eCustomItemName.setAttribute("value", name );
                            const eCustomItemValue = document.querySelector('[data-br-name="PhonebookContactInfozInfoView_customItemValue_' + i + '"]');
                            const value = customItem.getValue();
                            //eCustomItemValue.defaultValue = value;
                            eCustomItemValue.value = value;
                            //eCustomItemName.setAttribute("value", value  );
                        }
                });
            }
        }).catch((rej) => {
            OCUtil.logErrorWithNotification("Failed to get phonebook contact.", i18n.t('Failed_to_get_phone_book_contact'), rej );
        });
    }

    openPhonebookContactInfozInfoView( pbContactInfo ){
        this.setState( { pbContactInfo: null }, ()=>
        {
            this._reloadContactInfo(pbContactInfo.getAid());
        });
    }

    closePhonebookContactInfozInfoView( thenFunc ){
        this.setState({pbContactInfo:null}, () =>{
            this._PbContactInfozCustomItemArray.length = 0;
            if( thenFunc ){
                thenFunc();
            }
        });
    }

    _makeCall( tel ){
        const oc = BrekekeOperatorConsole.getStaticInstance();
        oc.setDialingAndMakeCall( tel );
        oc.abortAutoDialView_ver2();
    }

    _save(){
        const iInfoKeyWithinnameStartIndex = "PhonebookContactInfozInfoView_infoItem_".length;

        const eInfoParams = document.querySelectorAll('[data-br-isinfoparam="true"]');
        const oInfo = {};
        for( let i = 0 ; i < eInfoParams.length; i++ ){
            const eInfoParam = eInfoParams[i];
            const sInfoKeyWithinname = eInfoParam.getAttribute("data-br-name");
            const sInfoKeyName = sInfoKeyWithinname.substring( iInfoKeyWithinnameStartIndex );
            const sInfoValue = eInfoParam.value;
            oInfo[ sInfoKeyName ] = sInfoValue;
        }

        //Collect custom items
        for( let i = 0; i < this._PbContactInfozCustomItemArray.length; i++ ){
            const customItem = this._PbContactInfozCustomItemArray[i];
            const name = customItem.getName();
            if( name.length === 0 ){
                continue;
            }
            oInfo[ name ] = customItem.getValue();
        }

        const aid = this.state.pbContactInfo.getAid();
        const phonebookName = this.state.pbContactInfo.getPhonebookName();
        const sIsShared = this.state.pbContactInfo.getIsShared().toString();

        const setContactOptions = {
            methodName : "setContact",
            methodParams : JSON.stringify({
                aid: aid,
                phonebook: phonebookName,
                shared: sIsShared,
                info: oInfo
            })
        };

        const oc = BrekekeOperatorConsole.getStaticInstance();
        const promise = oc.getPalRestApi().callPalRestApiMethodAsync( setContactOptions  );
        promise.then( (res) =>{
            Notification.success({ message: i18n.t("saved_data_to_pbx_successfully") });
            this._reloadContactInfo( aid );
        }).catch( (errorOrResponse) =>{
            OCUtil.logErrorWithNotification("Failed to set contact(PAL rest API).", i18n.t("failed_to_save_data_to_pbx"), errorOrResponse );
        } );
    }

    _addItem(){
        const customItem = new PbContactInfozCustomItem("","");
        this._PbContactInfozCustomItemArray.push( customItem );
        this.setState({refresh:true}, ()=>{
            //Refresh custom item element's name&value
            for (let i = 0; i < this._PbContactInfozCustomItemArray.length; i++) {
                const customItem = this._PbContactInfozCustomItemArray[i];
                const eCustomItemName = document.querySelector('[data-br-name="PhonebookContactInfozInfoView_customItemName_' + i + '"]');
                const name = customItem.getName();
                //eCustomItemName.defaultValue = name;
                eCustomItemName.value = name;
                //eCustomItemName.setAttribute("value", name );
                const eCustomItemValue = document.querySelector('[data-br-name="PhonebookContactInfozInfoView_customItemValue_' + i + '"]');
                const value = customItem.getValue();
                //eCustomItemValue.defaultValue = value;
                eCustomItemValue.value = value;
                //eCustomItemName.setAttribute("value", value  );
            }
        });
    }

    _onChangeCustomItemInputName( customItem, e ){
        const name = e.target.value;
        customItem.setName( name );
    }

    _onChangeCustomItemInputValue( customItem, e ){
        const value = e.target.value;
        customItem.setValue( value );
    }

    render(){
        if( !this.state.pbContactInfo ){
            return (null);
        }
        const oc = BrekekeOperatorConsole.getStaticInstance();
        const extensionsStatus = oc.state.extensionsStatus;
        const extensions = oc.state.extensions;
        const isSaveable = this.state.pbContactInfo.getIsShared() === false;

        const telKeyNames = this.state.pbContactInfo.getFreezedTelInfoKeyNameArray();
        return (<>
            <div className="brOCReset phonebookContactInfozInfoView ">
                <table className={"defaultBorderWithRadius outsidePaddingWithoutBorderRadius"}>
                    <tbody>
                    <tr>
                        <td style={{textAlign: "right", verticalAlign: "top"}}>
                            <Popconfirm title={i18n.t("are_you_sure")} onConfirm={ () => this.closePhonebookContactInfozInfoView() }
                                        okText={i18n.t("yes")}
                                        cancelText={i18n.t("no")}
                            >
                                <span className="linkDeco">[X]</span>
                            </Popconfirm>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div className={"autoDialView_ver2_tableParent"}>
                                <table className="defaultContentTable">
                                    <thead>
                                    <tr>
                                        <th colSpan="2" className="displayNameTitleTh" style={{textTransform: "unset"}}>
                                            {this.state.pbContactInfo.getDisplayName()}
                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        this.state.pbContactInfo.getFreezedPhonebookContactInfozInfoArray().map(
                                            (info, i) => {
                                                if (info.isTelKey()) {
                                                    return (null);
                                                }
                                                if (info.getInfoKeyName() === "$lang") { //!comment Not editable
                                                    return (null);
                                                }
                                                if( info.isCustomKey() === true ){
                                                    return (null);
                                                }
                                                return (
                                                    <tr key={i}>
                                                        <th>{info.getTitle()}</th>
                                                        <td>
                                                            <Input data-br-isinfoparam="true"
                                                                   data-br-name={"PhonebookContactInfozInfoView_infoItem_" + info.getInfoKeyName()}
                                                                   defaultValue={info.getValue()}
                                                                   style={{width: "300px"}} disabled={!isSaveable}
                                                                   maxLength="1000"
                                                                   onFocus={(e) => this._onInputFocus()}
                                                                   onBlur={(e) => this._onInputBlur()}
                                                            />
                                                        </td>
                                                    </tr>
                                                );
                                            }
                                        )
                                    }
                                    <tr>
                                        <th style={{verticalAlign: "middle"}}>
                                            {i18n.t("Tels")}
                                        </th>
                                        <td>
                                            <table className="defaultContentTable PhonebookContactInfozInfoTelsTable">
                                                <thead>
                                                <tr>
                                                    <th className="defaultItemPaddingTopImportant">{i18n.t("Type")}</th>
                                                    <th className="defaultItemPaddingTopImportant">{i18n.t("Tel")}</th>
                                                    <th className="defaultItemPaddingTopImportant"
                                                        style={{textAlign: "center"}}>{i18n.t("Status")}</th>
                                                    <th className="defaultItemPaddingTopImportant"
                                                        style={{textAlign: "center"}}>{i18n.t("Call")}</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {telKeyNames.map((telKeyName, i) => {
                                                    const telInfo = this.state.pbContactInfo.getPhonebookContactInfozInfoByInfoKeyName(telKeyName);
                                                    let tel;
                                                    if (telInfo) {
                                                        tel = telInfo.getValue();
                                                    } else {
                                                        tel = "";
                                                    }
                                                    const telTitle = this.state.pbContactInfo.getFreezedTelInfoTitleArray()[i];

                                                    const isExtension = OCUtil.indexOfArrayFromExtensions(extensions, tel) !== -1;
                                                    const statusClassName = isExtension ? OCUtil.getExtensionStatusClassName(tel, extensionsStatus) : "";
                                                    return (
                                                        <tr key={i}>
                                                            <td>{telTitle}</td>
                                                            <td>
                                                                <Input
                                                                    data-br-isinfoparam="true"
                                                                    data-br-name={"PhonebookContactInfozInfoView_infoItem_" + telKeyName}
                                                                    defaultValue={tel}
                                                                    style={{width: "160px"}} disabled={!isSaveable}
                                                                    maxLength="1000"
                                                                    onFocus={(e) => this._onInputFocus()}
                                                                    onBlur={(e) => this._onInputBlur()}
                                                                />
                                                            </td>
                                                            <td>
                                                                <div style={{
                                                                    display: "flex",
                                                                    alignItems: "center",
                                                                    justifyContent: "center"
                                                                }}>
                                                                    <div className={statusClassName}></div>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                {tel.length !== 0 && (<div style={{
                                                                    display: "flex",
                                                                    alignItems: "center",
                                                                    justifyContent: "center"
                                                                }}>
                                                                    <button
                                                                        title={i18n.t(`Call`)}
                                                                        className="kbc-button kbc-button-fill-parent legacyButtonPadding"
                                                                        onClick={(e) => this._makeCall(tel)}
                                                                    >
                                                                        <FontAwesomeIcon size="lg" icon="fas fa-phone"/>
                                                                    </button>
                                                                </div>)}
                                                            </td>
                                                        </tr>
                                                    )
                                                })}
                                                </tbody>
                                            </table>
                                        </td>
                                    </tr>
                                    {
                                        this._PbContactInfozCustomItemArray.map( (customItem, i ) =>{
                                            return (
                                                <tr key={i}>
                                                    <th>
                                                        <Input
                                                            data-br-name={"PhonebookContactInfozInfoView_customItemName_" + i }
                                                            //defaultValue={customItem.getName()}
                                                            style={{width: "200px"}} disabled={!isSaveable}
                                                            maxLength="1000"
                                                            onChange={(e) => this._onChangeCustomItemInputName(customItem, e)}
                                                            onFocus={(e) => this._onCustomItemNameInputFocus( customItem, e )}
                                                            onBlur={(e) => this._onCustomItemNameInputBlur( customItem, e )}
                                                        />
                                                    </th>
                                                    <td>
                                                        <Input
                                                            data-br-name={"PhonebookContactInfozInfoView_customItemValue_" + i}
                                                            //defaultValue={customItem.getValue()}
                                                            style={{width: "300px"}} disabled={!isSaveable}
                                                            maxLength="1000"
                                                            onChange={(e) => this._onChangeCustomItemInputValue(customItem, e)}
                                                            onFocus={(e) => this._onCustomItemValueInputFocus( customItem, e )}
                                                            onBlur={(e) => this._onCustomItemValueInputBlur( customItem, e )}
                                                        />
                                                    </td>
                                                </tr>
                                            );
                                        })
                                    }
                                    <tr className="unsetBackgroundColor_important_PhonebookContactInfozInfoView">
                                        <td colSpan={2}
                                            className="unsetBackgroundColor_important_PhonebookContactInfozInfoView"
                                            style={{paddingTop: "4px", paddingRight: "4px"}}>
                                            { isSaveable && <span onClick={(e) => this._addItem()}
                                                  style={{textDecoration: "underline", cursor: "pointer"}}>
                                                &gt;&gt;{i18n.t("Add_item")}
                                            </span> }
                                            { !isSaveable && <span className="defaultDisabledTextColor" style={{textDecoration:"underline", cursor:"not-allowed"}}>
                                                &gt;&gt;{i18n.t("Add_item")}
                                            </span> }
                                        </td>
                                    </tr>

                                    </tbody>
                                </table>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={2} style={{paddingTop: "4px", paddingRight: "4px"}}>
                            <div style={{display: "flex", alignItems: "center", justifyContent: "end"}}>
                                <Button type="success" onClick={(e) => this._save()} disabled={!isSaveable}>
                                    {i18n.t("save")}
                                </Button>
                            </div>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </>)


    }


}
