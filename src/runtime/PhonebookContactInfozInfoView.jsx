import React from "react";
import "./reset.css"
import "./phonebookContactInfozInfoView.css"
import i18n from "../i18n";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import BrekekeOperatorConsole from "../index";
import OCUtil from "../OCUtil";
import {Button, Checkbox, Input} from "antd";
import Popconfirm from "antd/lib/popconfirm";
import Notification from "antd/lib/notification";
import PhonebookContactInfo_AutoDialView_ver2 from "./PhonebookContactInfo_AutoDialView_ver2";

const BUILTIN_CUSTOM_ITEM_KEYNAMES = Object.freeze([
    "Address(Work)","Email(Work)","Ext.","Fax","Job title","Middle name","Nickname","Other","Prefix","Suffix","Website"
]);
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
        this._PbSummaryArray = new Array();
        _INSTANCE = this;
    }

    static getStaticPhonebookContactInfozInfoViewInstance(){
        return _INSTANCE;
    }

    getPhonebookContactInfoFromState(){
        return this.state.pbContactInfo;
    }

    // componentDidUpdate() {
    //     const  pbContactInfo = this.state.pbContactInfo;
    //     if( !pbContactInfo ){
    //         return;
    //     }
    //
    //     if( this.state.renderOnce !== true ) {
    //         setTimeout(() => {
    //             const eShared = document.getElementById("shared_PhonebookContactInfozInfoView_brOC");
    //             const bShared = pbContactInfo.getIsShared();
    //             eShared.checked = bShared;
    //             this.setState({renderOnce: true});
    //         }, 1000);
    //     }
    // }

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
        this._PbSummaryArray.length = 0;
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
                        //// const eCustomItemName = document.querySelector('[data-br-name="PhonebookContactInfozInfoView_customItemName_' + i + '"]');
                        // const eCustomItemName = document.getElementById("brOC_PhonebookContactInfozInfoView_customItemName_" + i );
                        // if( eCustomItemName ){
                        //     eCustomItemName.value = infozCustomItem.getName();
                        //     const eCustomItemValue = document.querySelector('[data-br-name="PhonebookContactInfozInfoView_customItemValue_' + i + '"]');
                        //     eCustomItemValue.value = infozCustomItem.getValue();
                        // }

                        this._PbContactInfozCustomItemArray.push( infozCustomItem );
                    }
                }

                //const eShared = document.getElementById("shared_PhonebookContactInfozInfoView_brOC");
                const bShared = pbGotContactInfo.getIsShared();
                //eShared.checked = bShared;
                this.setState({pbContactInfo:pbGotContactInfo, sharedChecked:bShared }, () =>{
                    //Refresh custom item element's name&value
                    for (let i = 0; i < this._PbContactInfozCustomItemArray.length; i++) {
                        const customItem = this._PbContactInfozCustomItemArray[i];
                        //const eCustomItemName = document.querySelector('[data-br-name="PhonebookContactInfozInfoView_customItemName_' + i + '"]');
                        const eCustomItemName = document.getElementById("brOC_PhonebookContactInfozInfoView_customItemName_" + i );
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

    async _reloadEmptyContactInfo(){
        this._PbContactInfozCustomItemArray.length = 0;
        this._PbSummaryArray.length = 0;

        const getPhonebooksOptions ={
            methodName : "getPhonebooks",
            // methodParams : JSON.stringify({
            // }),
        }
        const oc = BrekekeOperatorConsole.getStaticInstance();
        const pbSummaryArray = await oc.getPalRestApi().callPalRestApiMethodAsync( getPhonebooksOptions ).catch( (resOrError) =>{
            OCUtil.logErrorWithNotification("Failed to get phone books.", i18n.t("Failed_to_get_phone_books"), resOrError );
            return;
        });
        if( Array.isArray( pbSummaryArray) ){
            this._PbSummaryArray.length = pbSummaryArray.length;
            for( let i = 0; i < pbSummaryArray.length; i++ ){   //!optimize. copy
                this._PbSummaryArray[i] = pbSummaryArray[i];
            }
        }
        const pbContactInfo = new PhonebookContactInfo_AutoDialView_ver2(); //empty
        this.setState({pbContactInfo:pbContactInfo} );
    }

    openPhonebookContactInfozInfoView( pbContactInfo ){
        this.setState( { pbContactInfo:null,sharedChecked:null }, ()=>
        {
            if( pbContactInfo ) {
                this._reloadContactInfo(pbContactInfo.getAid());
            }
            else{
                this._reloadEmptyContactInfo();
            }
        });
    }

    closePhonebookContactInfozInfoView( thenFunc ){
        this.setState({pbContactInfo:null,sharedChecked:null}, () =>{
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
        const oc = BrekekeOperatorConsole.getStaticInstance();
        //validation
        const phonebookName = document.getElementById("phonebookName_PhonebookContactInfozInfoView").value;
        if( !phonebookName || phonebookName.length === 0 ){
            Notification.warning({message:i18n.t("No_phonebook_assigned")});
            return;
        }

        const eShared = document.getElementById("shared_PhonebookContactInfozInfoView_brOC");
        const isShared = eShared.checked === true;
        const isAdmin = oc.getIsAdmin();
        const isSaveable = isShared === false || ( isShared === true && isAdmin === true );
        if( isSaveable !== true  ){
            console.warn("You do not have permission to save phone book contact.");
            Notification.warning({
                message: i18n.t("You_do_not_have_permission_to_save_phone_book_contact"),
            });
            return;
        }


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

        let aid = null; //add
        if(  this.state.pbContactInfo ) {
            aid = this.state.pbContactInfo.getAid();
        }
        //const sIsShared = this.state.pbContactInfo.getIsShared().toString();



        const oMethodParams = {
            phonebook : phonebookName,
            shared: isShared.toString(),
            info: oInfo,
        };
        if( aid ){
            oMethodParams["aid"] =  aid;
        }

        const setContactOptions = {
            methodName : "setContact",
            methodParams : JSON.stringify(oMethodParams)
        };



        const promise = oc.getPalRestApi().callPalRestApiMethodAsync( setContactOptions  );
        promise.then( (result) =>{
            if( result == null ){
                OCUtil.logErrorWithNotification("Failed to set contact(PAL rest API).", i18n.t("failed_to_save_data_to_pbx") );
            }
            else {
                Notification.success({message: i18n.t("saved_data_to_pbx_successfully")});
                let sAid = result["aid"];
                this._reloadContactInfo(sAid);
            }
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
                //const eCustomItemName = document.querySelector('[data-br-name="PhonebookContactInfozInfoView_customItemName_' + i + '"]');
                const eCustomItemName = document.getElementById("brOC_PhonebookContactInfozInfoView_customItemName_" + i );
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

    _isAddContact(){
        return !this.state.pbContactInfo || !this.state.pbContactInfo.getAid();
    }

    _deleteContact(){
        const oc = BrekekeOperatorConsole.getStaticInstance();
        const isShared = this.state.pbContactInfo.getIsShared() === true;
        const isAdmin = oc.getIsAdmin();
        const isDeletable = isShared === false || ( isShared === true && isAdmin === true );
        if( isDeletable !== true  ){
            console.warn("You do not have permission to delete phone book contact.. aid=" + aid);
            Notification.warning({
                message: i18n.t("You_do_not_have_permission_to_delete_phone_book_contact"),
            });
            return;
        }

        const failFunc = ( resOrError ) =>{
            if( Array.isArray( resOrError ) ) {
                const aid = resOrError[0];
                console.error("Failed to delete phone book contact. aid=" + aid);
                Notification.error({
                    message: i18n.t("failed_to_save_data_to_pbx"),
                    duration: 0
                });
            }
            else{
                OCUtil.logErrorWithNotification("Failed to delete phone book contact.", i18n.t("failed_to_save_data_to_pbx"), resOrError );
            }
        };

        const aid = this.state.pbContactInfo.getAid();
        const deleteContactOptions = {
            methodName : "deleteContact",
            methodParams : JSON.stringify({
                aid : aid
            }),
            onSuccessFunction : (ret) =>{
                let bSuccess = false;
                const arSucceeded = ret["succeeded"];
                if( Array.isArray( arSucceeded ) ) {
                    if( arSucceeded.length !== 0 ) {
                        const iAidRet = arSucceeded[0];
                        let aidIntegerOrString = aid;
                        if( Number.isInteger( iAidRet ) && OCUtil.isString(aid)){
                            aidIntegerOrString = parseInt( aid );
                        }
                        bSuccess = aidIntegerOrString  === iAidRet;
                    }
                }
                if( bSuccess === true ){
                    Notification.success( { message:i18n.t("saved_data_to_pbx_successfully") });
                    this.closePhonebookContactInfozInfoView();
                }
                else{
                    //const arFailed = ret["failed"];
                    failFunc();
                }
            },
            onFailFunction : (resOrError) => failFunc( resOrError )
        };
        oc.getPalRestApi().callPalRestApiMethod( deleteContactOptions );
    }

    //!DIdNotWork
    // _toggleShared(){
    //     const eShared = document.getElementById("shared_PhonebookContactInfozInfoView_brOC");
    //     const isChecked = eShared.checked;
    //     eShared.checked = !isChecked;
    //     this.setState({sharedDefaultChecked:!isChecked});
    // }

    // _toggleShared(){
    //     const eShared = document.getElementById("shared_PhonebookContactInfozInfoView_brOC");
    //     const isChecked = eShared.checked;
    //     eShared.checked = !isChecked;
    //     this._rerenderShared();
    // }

    _rerenderShared(){
        const eShared = document.getElementById("shared_PhonebookContactInfozInfoView_brOC");
        const isChecked = eShared.checked;
        this.setState({sharedChecked:isChecked});
    }

    render(){
        if( !this.state.pbContactInfo ){
            return (null);
        }
        const oc = BrekekeOperatorConsole.getStaticInstance();
        const extensionsStatus = oc.state.extensionsStatus;
        const extensions = oc.state.extensions;
        const isShared = this.state.pbContactInfo.getIsShared();
        const isAdmin = oc.getIsAdmin();
        const isSaveable = isShared  === false || ( isShared === true && isAdmin === true );

        // let sharedDefaultChecked;
        // if( this.state.sharedDefaultChecked === undefined || this.state.sharedDefaultChecked === null ){
        //     sharedDefaultChecked = isShared;
        // }
        // else{
        //     sharedDefaultChecked = this.state.sharedDefaultChecked;
        // }

        let sharedChecked;
        if( this.state.sharedChecked === undefined || this.state.sharedChecked === null ){
            sharedChecked = isShared;
        }
        else{
            sharedChecked = this.state.sharedChecked;
        }

        return (<>
            <div className="brOCReset phonebookContactInfozInfoView ">
                <table className={"defaultBorderWithRadius outsidePaddingWithoutBorderRadius"}>
                    <tbody>
                    <tr>
                        <td style={{textAlign: "right", verticalAlign: "top"}}>
                            { isSaveable && (
                                <Popconfirm title={i18n.t("are_you_sure")} onConfirm={ () => this.closePhonebookContactInfozInfoView() }
                                            okText={i18n.t("yes")}
                                            cancelText={i18n.t("no")}
                                >
                                    <FontAwesomeIcon icon="far fa-window-close" className="closeFontAwesomeIcon" />
                                </Popconfirm>
                            )}
                            { !isSaveable && (
                                <FontAwesomeIcon icon="far fa-window-close" onClick={(e) => this.closePhonebookContactInfozInfoView()} className="closeFontAwesomeIcon" />
                            )}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div className={"autoDialView_ver2_tableParent"} style={{maxHeight:"500px"}}>
                                <table className="defaultContentTable">
                                    <thead>
                                    <tr>
                                        <th colSpan="2" className="displayNameTitleTh" style={{textTransform: "unset",height:"19px"}}>
                                            {this.state.pbContactInfo.getDisplayName()}
                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <th>
                                            <label htmlFor="phonebookName_PhonebookContactInfozInfoView">{i18n.t("Phonebook")}</label>
                                        </th>
                                        <td>
                                            { !this._isAddContact() && (
                                                <Input
                                                    id="phonebookName_PhonebookContactInfozInfoView"
                                                    defaultValue={ this.state.pbContactInfo.getPhonebookName()}
                                                    style={{width: "300px",cursor:"not-allowed"}} disabled={true}
                                                />
                                            )}
                                            {
                                                this._isAddContact() && ( <>
                                                        <Input type="text" id="phonebookName_PhonebookContactInfozInfoView" list="phonebookName_datalist_PhonebookContactInfozInfoView"
                                                               maxLength={100}
                                                               onFocus={(e) => this._onInputFocus()}
                                                               onBlur={(e) => this._onInputBlur()}
                                                               style={{width:"300px"}}
                                                        />
                                                        <datalist id="phonebookName_datalist_PhonebookContactInfozInfoView">
                                                            {
                                                                this._PbSummaryArray.map( ( pbSummary, i ) =>{
                                                                    const phonebookName = pbSummary["phonebook"];
                                                                    return <option key={i} value={phonebookName} >{phonebookName}</option>
                                                                })
                                                            }
                                                        </datalist>
                                                    </>
                                                )
                                            }
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>
                                            <label htmlFor="shared_PhonebookContactInfozInfoView_brOC" style={{cursor:"pointer"}}>
                                                {i18n.t("Shared")}
                                            </label>
                                        </th>
                                        <td>
                                            <Checkbox id="shared_PhonebookContactInfozInfoView_brOC"
                                                //defaultChecked={sharedDefaultChecked}
                                                      checked={sharedChecked}
                                                      onClick={(e)=>this._rerenderShared()}
                                                      disabled={isAdmin !== true }/>
                                        </td>
                                    </tr>
                                    {
                                        PhonebookContactInfo_AutoDialView_ver2.BUILTIN_DEFAULT_PHONEBOOK_CONTACTINFO_ITEM_KEYNAMES.map(
                                            ( key, i) => {
                                                const info = this.state.pbContactInfo.getPhonebookContactInfoByKeyname( key );
                                                if (info.isTelKey()) {
                                                    return (null);
                                                }
                                                // if (info.getInfoKeyName() === "$lang") { //!comment Not editable
                                                //     return (null);
                                                // }
                                                // if( info.isCustomKey() === true ){
                                                //     return (null);
                                                // }
                                                const infoKeyName = info.getInfoKeyName();
                                                return (
                                                    <tr key={i}>
                                                        <th>{info.getTitle()}</th>
                                                        <td>
                                                            <Input data-br-isinfoparam="true"
                                                                   data-br-name={"PhonebookContactInfozInfoView_infoItem_" + infoKeyName }
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
                                                {PhonebookContactInfo_AutoDialView_ver2.BUILTIN_DEFAULT_PHONEBOOK_CONTACTINFO_TEL_ITEM_KEYNAMES.map((telKeyName, i) => {
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
                                                            id={"brOC_PhonebookContactInfozInfoView_customItemName_" + i}
                                                            list={"brOC_PhonebookContactInfozInfoView_datalist_customItemName_" + i }
                                                            //defaultValue={customItem.getName()}
                                                            style={{width: "200px"}} disabled={!isSaveable}
                                                            maxLength="1000"
                                                            onChange={(e) => this._onChangeCustomItemInputName(customItem, e)}
                                                            onFocus={(e) => this._onCustomItemNameInputFocus(customItem, e)}
                                                            onBlur={(e) => this._onCustomItemNameInputBlur(customItem, e)}
                                                        />
                                                        <datalist
                                                            id={"brOC_PhonebookContactInfozInfoView_datalist_customItemName_" + i }>
                                                            {
                                                                BUILTIN_CUSTOM_ITEM_KEYNAMES.map(( keyname, i) => {
                                                                    return <option key={i}
                                                                                   value={keyname}>{keyname}</option>
                                                                })
                                                            }
                                                        </datalist>
                                                    </th>
                                                    <td>
                                                        <Input
                                                            data-br-name={"PhonebookContactInfozInfoView_customItemValue_" + i}
                                                            //defaultValue={customItem.getValue()}
                                                            style={{width: "300px"}} disabled={!isSaveable}
                                                            maxLength="1000"
                                                            onChange={(e) => this._onChangeCustomItemInputValue(customItem, e)}
                                                            onFocus={(e) => this._onCustomItemValueInputFocus(customItem, e )}
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
                                { ( isSaveable && this._isAddContact() !== true ) &&
                                    <Popconfirm title={i18n.t("are_you_sure")} onConfirm={ () => this._deleteContact() }
                                                okText={i18n.t("yes")}
                                                cancelText={i18n.t("no")}
                                    >
                                        <Button style={{marginRight:"4px"}} disabled={!isSaveable}>{i18n.t("Delete")}</Button>
                                    </Popconfirm>
                                }
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
