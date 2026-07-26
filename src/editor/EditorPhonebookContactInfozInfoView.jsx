import React from "react";
import "../reset.css"
import "../runtime/phonebookContactInfozInfoView.css"
import i18n from "../i18n";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import BrekekeOperatorConsole from "../index";
import OCUtil from "../OCUtil";
import {Button, Checkbox, Input} from "antd";
import Popconfirm from "antd/lib/popconfirm";
import Notification from "antd/lib/notification";
import AutoComplete from "antd/lib/auto-complete";
import RuntimeUcUserStatuses from "../runtime/RuntimeUcUserStatuses";
import PhonebookContactInfo_AutoDialView_ver2 from "../runtime/PhonebookContactInfo_AutoDialView_ver2";
import EditorAutoDialView_ver2 from "./EditorAutoDialView_ver2";
import PhonebookContactInfozInfo_AutoDialView_ver2 from "../runtime/PhonebookContactInfozInfo_AutoDialView_ver2";
import "./EditorPhonebookContactInfozInfoView.css"

const _DUMMY_CONTACT_EN = Object.freeze({
    aid: "14",
    display_name: "Firstname Lastname",
    info : Object.freeze({
        $address: "myAddress",
        $company: "myCompany",
        $email: "email@email.email",
        $firstname: "Firstname",
        $lastname: "Lastname",
        $notes: "myNotes",
        $tel_ext: "444",
        $tel_home: "111-111-1111",
        $tel_mobile: "333-333-3333",
        $tel_other: "555-555-5555",
        $tel_work: "222-222-2222",
        Fax : "666-666-6666",
        Website : "https://my.dummy.website",
        myCustom1: "myCustom1",
        myCustom2: "myCustom2"
    }),
    phonebook: "phonebook1",
    shared: "true"
});

const _DUMMY_CONTACT_JA = Object.freeze({
    aid: "15",
    display_name: "たろう 山田",
    info : Object.freeze({
        $address: "東京都 新宿区 新宿 97-98-99",
        $company: "やまだ株式会社",
        $email: "taro@yamada.email",
        $firstname: "たろう",
        $lastname: "山田",
        $notes: "ノート1",
        $tel_ext: "444",
        $tel_home: "0X-1234-5678",
        $tel_mobile: "0X0-1111-2222",
        $tel_other: "0X-8888-9999",
        $tel_work: "0X-8765-4321",
        Fax : "0X-6666-7777",
        Website : "https://taro.yamada.website",
        カスタム名1: "カスタム値1",
        カスタム名2: "カスタム値2"
    }),
    phonebook: "電話帳1",
    shared: "true"
});

const _DUMMY_PHONEBOOKS_EN = [  //!wantTo freeze
    {phonebook : "phonebook1",shared:"true" },
    {phonebook : "phonebook2",shared:"true" },
];

const _DUMMY_PHONEBOOKS_JA = [  //!wantTo freeze
    {phonebook : "電話帳1",shared:"true" },
    {phonebook : "電話帳2",shared:"true" },
];

class EditorPbContactInfozCustomItem{
    constructor( options ) {
        const pbContactInfozItem = options["pbContactInfozItem"];
        if( pbContactInfozItem ) {
            //this._name = pbContactInfozItem.getInfoKeyName();
            const phonebookItem = pbContactInfozItem.getPhonebookItem();
            let name;
            if( phonebookItem && phonebookItem.caption ){
                name = phonebookItem.caption;
            }
            else{
                name = pbContactInfozItem.getInfoKeyName();
            }
            this._name = name;
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

    setNameForce( name ){
        this._name = name;
    }

    setName( name, isBuiltin  ){
        //let validName = name.replace("$", "");
        if( isBuiltin !== true ) {
            let validName = OCUtil.removeChar(name, '$');
            validName = validName.trim();
            this.setNameForce( validName );
        }
        else{
            this.setNameForce( name );
        }
    }
}

let _INSTANCE;
export default class EditorPhonebookContactInfozInfoView extends React.Component {

    constructor(props) {
        super(props);
        this.state ={
            pbContactInfo : null,
        }
        this._PbContactInfozCustomItemArray = new Array();
        this._PbSummaryArray = new Array();
        const oc = BrekekeOperatorConsole.getStaticInstance();
        const lang = oc.getLoggedinLanguage();
        this._Phonebook = Brekeke.Phonebook.getManager(lang);
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

    _onCustomItemNameInputFocus( customItem, e = null ){
        // setTimeout( () => {
        //     const name = customItem.getName();
        //     const itmTitle = this._Phonebook.item.find( (itm) =>{
        //         return itm.id === name;
        //     } );
        //     let val;
        //     if( itmTitle ){
        //         val = PhonebookContactInfozInfo_AutoDialView_ver2.getTitleByPhonebookItem( itmTitle );
        //     }
        //     else{
        //         val = name;
        //     }
        //     e.target.value = val;
        //     //e.target.value = name;
        // }, 1 );
        this._onInputFocus();
    }

    _onCustomItemNameInputBlur( customItem, e = null ){
        // setTimeout( () => {
        //     const name = customItem.getName();
        //     const itmTitle = this._Phonebook.item.find( (itm) =>{
        //         return itm.id === name;
        //     } );
        //     let val;
        //     if( itmTitle ){
        //         val = PhonebookContactInfozInfo_AutoDialView_ver2.getTitleByPhonebookItem( itmTitle );
        //     }
        //     else{
        //         val = name;
        //     }
        //     e.target.value = val;
        //     //e.target.value = name;
        // }, 1 );
        this._onInputBlur();
    }

    _onCustomItemValueInputFocus( customItem, e ){
        setTimeout( () => {
            const value = customItem.getValue();
            e.target.value = value;
        }, 1 );
        this._onInputFocus();
    }

    _onCustomItemValueInputBlur( customItem, e ){
        setTimeout( () => {
            const value = customItem.getValue();
            e.target.value = value;
        }, 1 );
        this._onInputBlur();
    }

    _getDummyContact(){
        const oc = BrekekeOperatorConsole.getStaticInstance();
        const lang = oc.getLoggedinLanguage();
        let contact;
        if( lang === "ja" ){
            contact = _DUMMY_CONTACT_JA;
        }
        else{
            contact = _DUMMY_CONTACT_EN;
        }
        return contact;
    }

    _reloadContactInfo( aid ){
        this._PbContactInfozCustomItemArray.length = 0;
        this._PbSummaryArray.length = 0;
        const contact = this._getDummyContact();

            const pbGotContactInfo =  new PhonebookContactInfo_AutoDialView_ver2( contact );

            //Collect info's custom items.
            const pbContactInfozInfoArray = pbGotContactInfo.getFreezedPhonebookContactInfozInfoArray();
            for( let i = 0; i < pbContactInfozInfoArray.length; i++ ){
                const infozItem = pbContactInfozInfoArray[i];
                const phonebookItem = this._Phonebook.item.find( (phonebookItem) =>{
                    const b =  phonebookItem.id === infozItem.getInfoKeyName();
                    return b;
                });
                if( phonebookItem ){
                    if( phonebookItem.onscreen === true ){
                        continue;
                    }
                    if( phonebookItem.type === "phone"){
                        continue;
                    }
                }

                //if( infozItem.isCustomKey() ){
                const infozCustomItem = new EditorPbContactInfozCustomItem( { pbContactInfozItem : infozItem} );

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
                //}
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
                    const phonebookItem = this._Phonebook.item.find( (phonebookItem) =>{
                        return name === phonebookItem.id;
                    });
                    if( phonebookItem ){
                        //eCustomItemName.value = PhonebookContactInfozInfo_AutoDialView_ver2.getTitleByPhonebookItem( phonebookItem );
                        eCustomItemName.value = phonebookItem.id;
                    }
                    else{
                        eCustomItemName.value = name;
                    }

                    //eCustomItemName.defaultValue = name;

                    //eCustomItemName.setAttribute("value", title );
                    const eCustomItemValue = document.querySelector('[data-br-name="PhonebookContactInfozInfoView_customItemValue_' + i + '"]');
                    const value = customItem.getValue();
                    //eCustomItemValue.defaultValue = value;
                    eCustomItemValue.value = value;
                    //eCustomItemName.setAttribute("value", value  );
                }
            });


    }

    _getDummyPhonebooks(){
        const oc = BrekekeOperatorConsole.getStaticInstance();
        const lang = oc.getLoggedinLanguage();
        let phonebooks;
        if( lang === "ja" ){
            phonebooks = _DUMMY_PHONEBOOKS_JA;
        }
        else{
            phonebooks = _DUMMY_PHONEBOOKS_EN;
        }
        return phonebooks;
    }

    async _reloadEmptyContactInfo(){
        this._PbContactInfozCustomItemArray.length = 0;
        this._PbSummaryArray.length = 0;

        const oc = BrekekeOperatorConsole.getStaticInstance();
        const pbSummaryArray = this._getDummyPhonebooks();
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

    _makeCall( evMouseClick, tel ){
        //AutoDialView_ver2.onClickCallButtonForAutoDialView( evMouseClick, tel );

        //// const oc = BrekekeOperatorConsole.getStaticInstance();
        //// oc.setDialingAndMakeCall( tel );
        //// oc.abortAutoDialView_ver2();
    }

    _getPhonebookItemByCaption( caption ){  //!limitation //!forBug //!warning //Not appropriate if a caption with the same name exists
        const itmFound = this._Phonebook.item.find( ( itm ) =>{
            return itm.caption === caption;
        });
        return itmFound;
    }

    // _save(){
    //     const oc = BrekekeOperatorConsole.getStaticInstance();
    //     //validation
    //     const phonebookName = document.getElementById("phonebookName_PhonebookContactInfozInfoView").value;
    //     if( !phonebookName || phonebookName.length === 0 ){
    //         Notification.warning({message:i18n.t("No_phonebook_assigned")});
    //         return;
    //     }
    //
    //     const eShared = document.getElementById("shared_PhonebookContactInfozInfoView_brOC");
    //     const isShared = eShared.checked === true;
    //     const isAdmin = oc.getIsAdmin();
    //     const isSaveable = isShared === false || ( isShared === true && isAdmin === true );
    //     if( isSaveable !== true  ){
    //         console.warn("You do not have permission to save phone book contact.");
    //         Notification.warning({
    //             message: i18n.t("You_do_not_have_permission_to_save_phone_book_contact"),
    //         });
    //         return;
    //     }
    //
    //
    //     const iInfoKeyWithinnameStartIndex = "PhonebookContactInfozInfoView_infoItem_".length;
    //
    //     const eInfoParams = document.querySelectorAll('[data-br-isinfoparam="true"]');
    //     const oInfo = {};
    //     for( let i = 0 ; i < eInfoParams.length; i++ ){
    //         const eInfoParam = eInfoParams[i];
    //         const sInfoKeyWithinname = eInfoParam.getAttribute("data-br-name");
    //         const sInfoKeyName = sInfoKeyWithinname.substring( iInfoKeyWithinnameStartIndex );
    //         const sInfoValue = eInfoParam.value;
    //         oInfo[ sInfoKeyName ] = sInfoValue;
    //     }
    //
    //     //Collect custom items
    //     for( let i = 0; i < this._PbContactInfozCustomItemArray.length; i++ ){
    //         const customItem = this._PbContactInfozCustomItemArray[i];
    //
    //         const bHidden = PhonebookContactInfozInfo_AutoDialView_ver2.isHiddenCustomKey( customItem.getName() );
    //         if( bHidden !== true ) {
    //             customItem.setName(customItem.getName()); //Remove first $ char(for Builtin)
    //         }
    //         const customItemName = customItem.getName();
    //
    //         if( customItemName.length === 0 ){
    //             continue;
    //         }
    //         let pbItem;
    //         if( bHidden !== true ) {
    //             this._getPhonebookItemByCaption(customItemName);
    //         }
    //         else{
    //             pbItem = null;
    //         }
    //         //const bIsBuiltin = !!pbItem;
    //         let name;
    //         if( pbItem ){
    //             name = pbItem.id;   //Builtin by phonebook
    //         }
    //         else{
    //             name = customItemName;  //Custom by user
    //         }
    //         oInfo[ name ] = customItem.getValue();
    //     }
    //
    //     let aid = null; //add
    //     if(  this.state.pbContactInfo ) {
    //         aid = this.state.pbContactInfo.getAid();
    //     }
    //     //const sIsShared = this.state.pbContactInfo.getIsShared().toString();
    //
    //
    //
    //     const oMethodParams = {
    //         phonebook : phonebookName,
    //         shared: isShared.toString(),
    //         info: oInfo,
    //     };
    //     if( aid ){
    //         oMethodParams["aid"] =  aid;
    //     }
    //
    //     const setContactOptions = {
    //         methodName : "setContact",
    //         methodParams : JSON.stringify(oMethodParams)
    //     };
    //
    //
    //
    //     const promise = oc.getPalRestApi().callPalRestApiMethodAsync( setContactOptions  );
    //     promise.then( (result) =>{
    //         if( result == null ){
    //             OCUtil.logErrorWithNotification("Failed to set contact(PAL rest API).", i18n.t("failed_to_save_data_to_pbx") );
    //         }
    //         else {
    //             Notification.success({message: i18n.t("saved_data_to_pbx_successfully")});
    //             let sAid = result["aid"];
    //             this._reloadContactInfo(sAid);
    //             EditorAutoDialView_ver2.getStaticInstance().reshowContactList();  //Refresh Contact list
    //         }
    //     }).catch( (errorOrResponse) =>{
    //         OCUtil.logErrorWithNotification("Failed to set contact(PAL rest API).", i18n.t("failed_to_save_data_to_pbx"), errorOrResponse );
    //     } );
    // }

    _addItem(){
        const customItem = new EditorPbContactInfozCustomItem("","");
        this._PbContactInfozCustomItemArray.push( customItem );
        this.setState({refresh:true}, ()=>{
            //Refresh custom item element's name&value
            for (let i = 0; i < this._PbContactInfozCustomItemArray.length; i++) {
                const customItem = this._PbContactInfozCustomItemArray[i];
                //const eCustomItemName = document.querySelector('[data-br-name="PhonebookContactInfozInfoView_customItemName_' + i + '"]');
                const eCustomItemName = document.getElementById("brOC_PhonebookContactInfozInfoView_customItemName_" + i );
                const name = customItem.getName();

                const phonebookItem = this._Phonebook.item.find( (phonebookItem) =>{
                    const b = phonebookItem.id === name;
                    return b;
                });
                let title;
                if( phonebookItem ){
                    title = PhonebookContactInfozInfo_AutoDialView_ver2.getTitleByPhonebookItem( phonebookItem );
                }
                else{
                    title = name;
                }

                //eCustomItemName.defaultValue = title;
                eCustomItemName.value = title;
                //eCustomItemName.setAttribute("value", title );
                const eCustomItemValue = document.querySelector('[data-br-name="PhonebookContactInfozInfoView_customItemValue_' + i + '"]');
                const value = customItem.getValue();
                //eCustomItemValue.defaultValue = value;
                eCustomItemValue.value = value;
                //eCustomItemName.setAttribute("value", value  );
            }
        });
    }

    _onChangeCustomItemInputName( customItem, eventOrValue ){
        const bEventOrValueIsEvent =  typeof( eventOrValue ) === Event; //!notTested //!forBug
        const phonebookItem = this._Phonebook.item.find( (phonebookItem) =>{
            const title = PhonebookContactInfozInfo_AutoDialView_ver2.getTitleByPhonebookItem( phonebookItem );
            let b;
            if( bEventOrValueIsEvent ){ //!notTested //!forBug
                b = title === e.target.value;
            }
            else{   //eventOrValue is value
                b = title === eventOrValue;
            }
            return b;
        } );
        let name = phonebookItem ? phonebookItem.id : null;
        if( bEventOrValueIsEvent ){
            name = eventOrValue.target.value;
        }
        else{    //eventOrValue is value
            name = eventOrValue;
        }
        //const isCustomItem = !phonebookItem || phonebookItem.type === "phone";
        //customItem.setName( name, !isCustomItem );
        customItem.setNameForce( name );
        this.setState({rerender:true});
    }

    _onChangeCustomItemInputValue( customItem, e ){
        const value = e.target.value;
        customItem.setValue( value );
        this.setState({rerender:true});
    }

    _isAddContact(){
        return !this.state.pbContactInfo || !this.state.pbContactInfo.getAid();
    }

    // _deleteContact(){
    //     const oc = BrekekeOperatorConsole.getStaticInstance();
    //     const isShared = this.state.pbContactInfo.getIsShared() === true;
    //     const isAdmin = oc.getIsAdmin();
    //     const isDeletable = isShared === false || ( isShared === true && isAdmin === true );
    //     if( isDeletable !== true  ){
    //         console.warn("You do not have permission to delete phone book contact.. aid=" + aid);
    //         Notification.warning({
    //             message: i18n.t("You_do_not_have_permission_to_delete_phone_book_contact"),
    //         });
    //         return;
    //     }
    //
    //     const failFunc = ( resOrError ) =>{
    //         if( Array.isArray( resOrError ) ) {
    //             const aid = resOrError[0];
    //             console.error("Failed to delete phone book contact. aid=" + aid);
    //             Notification.error({
    //                 message: i18n.t("failed_to_save_data_to_pbx"),
    //                 duration: 0
    //             });
    //         }
    //         else{
    //             OCUtil.logErrorWithNotification("Failed to delete phone book contact.", i18n.t("failed_to_save_data_to_pbx"), resOrError );
    //         }
    //     };
    //
    //     const aid = this.state.pbContactInfo.getAid();
    //     const deleteContactOptions = {
    //         methodName : "deleteContact",
    //         methodParams : JSON.stringify({
    //             aid : aid
    //         }),
    //         onSuccessFunction : (ret) =>{
    //             let bSuccess = false;
    //             const arSucceeded = ret["succeeded"];
    //             if( Array.isArray( arSucceeded ) ) {
    //                 if( arSucceeded.length !== 0 ) {
    //                     const iAidRet = arSucceeded[0];
    //                     let aidIntegerOrString = aid;
    //                     if( Number.isInteger( iAidRet ) && OCUtil.isString(aid)){
    //                         aidIntegerOrString = parseInt( aid );
    //                     }
    //                     bSuccess = aidIntegerOrString  === iAidRet;
    //                 }
    //             }
    //             if( bSuccess === true ){
    //                 Notification.success( { message:i18n.t("saved_data_to_pbx_successfully") });
    //                 EditorAutoDialView_ver2.getStaticInstance().reshowContactList();  //Refresh Contact list
    //                 this.closePhonebookContactInfozInfoView();
    //             }
    //             else{
    //                 //const arFailed = ret["failed"];
    //                 failFunc();
    //             }
    //         },
    //         onFailFunction : (resOrError) => {
    //             EditorAutoDialView_ver2.getStaticInstance().reshowContactList();  //Refresh Contact list
    //             failFunc( resOrError );
    //         }
    //     };
    //     oc.getPalRestApi().callPalRestApiMethod( deleteContactOptions );
    // }

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

    _deleteCustomItemRow( index ){
        // const trId = "brOC_PhonebookContactInfozInfoView_customItemRow_" + index;
        // const eTr = document.getElementById( trId );
        // eTr.remove();
        this._PbContactInfozCustomItemArray.splice(index,1);

        // //Reset after items name & value
        // //const iTo = this._PbContactInfozCustomItemArray.length + 1;
        // for( let i = 0;i < this._PbContactInfozCustomItemArray.length; i++ ){
        //     const customItem = this._PbContactInfozCustomItemArray[i];
        //     const iIndex = i + 1;
        //
        //     const eName = document.getElementById("brOC_PhonebookContactInfozInfoView_customItemName_" + iIndex );
        //     const sName = eName.value;
        //     customItem.setName( sName );
        //
        //     const eValue = document.querySelector('[data-br-name="PhonebookContactInfozInfoView_customItemValue_' + iIndex + '"]');
        //     const sValue = eValue.value;
        //     customItem.setValue( sValue );
        // }
        this.setState({rerender:true});
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

        const customItemOptions = new Array();
        for( let i = 0; i < this._Phonebook.item.length; i++ ){
            const itm = this._Phonebook.item[i];
            if( itm.onscreen === true ) {
                continue;
            }
            if( itm.type === "phone" ){
                continue;
            }
            const title = PhonebookContactInfozInfo_AutoDialView_ver2.getTitleByPhonebookItem( itm );
            const option = { value:title, label:title };
            customItemOptions.push( option  );
        }

        //const systemSettingsData = oc.getSystemSettingsData();
        const editorAutoDialViewAsParent = this.props.editorAutoDialViewAsParent;
        const editorAutoDialButton = editorAutoDialViewAsParent.getEditorAutoDialButtonSettings();
        const  isUsingUc = true;

        const lampSize = editorAutoDialButton.getAutoDialLampSize();
        const iconSize = editorAutoDialButton.getAutoDialIconSize();
        const buttonSize = editorAutoDialButton.getAutoDialButtonSize();
        const inputFieldFontSize = editorAutoDialButton.getAutoDialInputFieldFontSize();
        const otherFontSize = editorAutoDialButton.getAutoDialOtherFontSize();
        const headerFontSize = editorAutoDialButton.getAutoDialTableHeaderFontSize();
        const bodyFontSize = editorAutoDialButton.getAutoDialTableBodyFontSize();
        return (<>
            <div className="brOCReset phonebookContactInfozInfoView editorPhonebookContactInfozInfoView">
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
                                <table className="defaultContentTable sideTable">
                                    <thead>
                                    <tr>
                                        <th colSpan="2" className="displayNameTitleTh" style={{textTransform: "unset",height:"19px"}}>
                                            <span style={{fontSize:otherFontSize}}>{this.state.pbContactInfo.getDisplayName()}</span>
                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <th>
                                            <label htmlFor="phonebookName_PhonebookContactInfozInfoView" style={{fontSize:headerFontSize}}>{i18n.t("Phonebook")}</label>
                                        </th>
                                        <td>
                                            { !this._isAddContact() && (
                                                <Input
                                                    id="phonebookName_PhonebookContactInfozInfoView"
                                                    defaultValue={ this.state.pbContactInfo.getPhonebookName()}
                                                    style={{width: "300px",cursor:"not-allowed",height:editorAutoDialButton.getAutoDialInputFieldHeight(),fontSize:editorAutoDialButton.getAutoDialInputFieldFontSize()}} disabled={true}
                                                />
                                            )}
                                            {
                                                this._isAddContact() && ( <>
                                                        <Input type="text" id="phonebookName_PhonebookContactInfozInfoView" list="phonebookName_datalist_PhonebookContactInfozInfoView"
                                                               maxLength={100}
                                                               onFocus={(e) => this._onInputFocus()}
                                                               onBlur={(e) => this._onInputBlur()}
                                                               style={{width:"300px",height:editorAutoDialButton.getAutoDialInputFieldHeight(),fontSize:editorAutoDialButton.getAutoDialInputFieldFontSize()}}
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
                                            <label htmlFor="shared_PhonebookContactInfozInfoView_brOC" style={{cursor:"pointer"}}
                                                   style={{fontSize:headerFontSize}}
                                            >
                                                {i18n.t("Shared")}
                                            </label>
                                        </th>
                                        <td>
                                            <Checkbox id="shared_PhonebookContactInfozInfoView_brOC"
                                                //defaultChecked={sharedDefaultChecked}
                                                      checked={sharedChecked}
                                                      onClick={(e)=>this._rerenderShared()}
                                                      disabled={isAdmin !== true }
                                                // size="large"    //No effect
                                            />
                                        </td>
                                    </tr>
                                    {
                                        this._Phonebook.item.map(
                                            ( item, i) => {
                                                if ( item.type === "phone" ) {
                                                    return (null);
                                                }
                                                if( item.onscreen !== true  ){
                                                    return (null);
                                                }

                                                // if (info.getInfoKeyName() === "$lang") { //!comment Not editable
                                                //     return (null);
                                                // }
                                                // if( info.isCustomKey() === true ){
                                                //     return (null);
                                                // }
                                                const info = this.state.pbContactInfo.getPhonebookContactInfoByKeyname( item.id );
                                                let val;
                                                if( info ){
                                                    val = info.getValue();
                                                }
                                                else{
                                                    val = null;
                                                }
                                                const title = PhonebookContactInfozInfo_AutoDialView_ver2.getTitleByPhonebookItem(item);

                                                return (
                                                    <tr key={i}>
                                                        <th><span style={{fontSize:headerFontSize}}>{title}</span></th>
                                                        <td>
                                                            <Input data-br-isinfoparam="true"
                                                                   data-br-name={"PhonebookContactInfozInfoView_infoItem_" + item.id  }
                                                                   defaultValue={val}
                                                                   style={{width: "300px",height:editorAutoDialButton.getAutoDialInputFieldHeight(),fontSize:editorAutoDialButton.getAutoDialInputFieldFontSize()}} disabled={!isSaveable}
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
                                            <span style={{fontSize:headerFontSize}}>{i18n.t("Tels")}</span>
                                        </th>
                                        <td>
                                            <table className="defaultContentTable PhonebookContactInfozInfoTelsTable">
                                                <thead>
                                                <tr>
                                                    <th
                                                        className="defaultItemPaddingTopImportant"><span style={{fontSize:headerFontSize}}>{i18n.t("Type")}</span></th>
                                                    <th
                                                        className="defaultItemPaddingTopImportant"><span style={{fontSize:headerFontSize}}>{i18n.t("Tel")}</span></th>
                                                    <th className="defaultItemPaddingTopImportant"
                                                        style={{
                                                            textAlign: "center"
                                                        }}><span style={{fontSize:headerFontSize}}>{i18n.t("Status")}</span></th>
                                                    { isUsingUc && <th className="defaultItemPaddingTopImportant"
                                                                       style={{
                                                                           textAlign: "center"
                                                                       }}><span style={{fontSize:headerFontSize}}>{i18n.t("UcStatus")}</span></th> }
                                                    <th className="defaultItemPaddingTopImportant"
                                                        style={{
                                                            textAlign: "center"
                                                        }}><span style={{fontSize: headerFontSize}}>{i18n.t("Call")}</span></th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {this._Phonebook.item.map((phonebookItem, i) => {
                                                    if( phonebookItem.type !== "phone" ){
                                                        return (null);
                                                    }
                                                    const telKeyName = phonebookItem.id;
                                                    const telInfo = this.state.pbContactInfo.getPhonebookContactInfozInfoByInfoKeyName(telKeyName);
                                                    let tel;
                                                    if (telInfo) {
                                                        tel = telInfo.getValue();
                                                    } else {
                                                        tel = "";
                                                    }
                                                    //const telTitle = this.state.pbContactInfo.getFreezedTelInfoTitleArray()[i];
                                                    let  telTitle = phonebookItem.caption;
                                                    if( !telTitle || telTitle.length === 0 ){
                                                        telTitle = PhonebookContactInfozInfo_AutoDialView_ver2.getTelTitle( phonebookItem.id );
                                                    }

                                                    const isExtension = OCUtil.indexOfArrayFromExtensions(extensions, tel) !== -1;
                                                    const statusClassName = isExtension ? OCUtil.getExtensionStatusClassName(tel, extensionsStatus) : "";

                                                    let ucUserStatusJsx;
                                                    if( isUsingUc ){
                                                        if( isExtension ){
                                                            const ucUserStatus = RuntimeUcUserStatuses.getRuntimeUcUserStatusesStaticInstance().getUcUserStatus( tel );
                                                            if( ucUserStatus || ucUserStatus === 0 ){
                                                                const ucUserStatusClassName = EditorAutoDialView_ver2.getUcUserStatusClassName( tel, ucUserStatus );
                                                                ucUserStatusJsx = <div style={{width:lampSize,height:lampSize}} className={ucUserStatusClassName}></div>;
                                                            }
                                                            else{
                                                                ucUserStatusJsx = <></>;
                                                            }
                                                        }
                                                        else{
                                                            ucUserStatusJsx = <></>;
                                                        }
                                                    }

                                                    return (
                                                        <tr key={i}>
                                                            <td><span style={{fontSize:bodyFontSize}}>{telTitle}</span></td>
                                                            <td>
                                                                <Input
                                                                    data-br-isinfoparam="true"
                                                                    data-br-name={"PhonebookContactInfozInfoView_infoItem_" + telKeyName}
                                                                    defaultValue={tel}
                                                                    style={{width: "160px",height:editorAutoDialButton.getAutoDialInputFieldHeight(),fontSize:editorAutoDialButton.getAutoDialInputFieldFontSize()}} disabled={!isSaveable}
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
                                                                    <div style={{width:lampSize,height:lampSize}} className={statusClassName}></div>
                                                                </div>
                                                            </td>
                                                            { isUsingUc && (
                                                                <td style={{textAlign: "center",width:10}}>
                                                                    {ucUserStatusJsx}
                                                                </td>
                                                            )}
                                                            <td>
                                                                {tel.length !== 0 && (<div style={{
                                                                    display: "flex",
                                                                    alignItems: "center",
                                                                    justifyContent: "center"
                                                                }}>
                                                                    <button
                                                                        title={i18n.t(`Call`)}
                                                                        className="kbc-button kbc-button-fill-parent legacyButtonPadding"
                                                                        onClick={(e) => this._makeCall(e, tel)}
                                                                    >
                                                                        <FontAwesomeIcon style={{width:buttonSize,height:buttonSize}} size="lg" icon="fas fa-phone"/>
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
                                            const bHidden = PhonebookContactInfozInfo_AutoDialView_ver2.isHiddenCustomKey( customItem.getName() );
                                            if( bHidden ){
                                                return <>
                                                    <Input
                                                        type="hidden"
                                                        id={"brOC_PhonebookContactInfozInfoView_customItemName_" + i}
                                                        value={customItem.getName()}
                                                    />
                                                    <Input
                                                        type="hidden"
                                                        data-br-name={"PhonebookContactInfozInfoView_customItemValue_" + i}
                                                        value={customItem.getValue()}
                                                    />
                                                </>
                                            }

                                            const customItemName = customItem.getName();
                                            const customItemValue = customItem.getValue();
                                            return (
                                                // <tr key={i} id={"brOC_PhonebookContactInfozInfoView_customItemRow_" + i }>
                                                <tr key={i} >
                                                    <th>
                                                        {/*<Input*/}
                                                        {/*    id={"brOC_PhonebookContactInfozInfoView_customItemName_" + i}*/}
                                                        {/*    list={"brOC_PhonebookContactInfozInfoView_datalist_customItemName_" + i }*/}
                                                        {/*    defaultValue={customItem.getName()}*/}
                                                        {/*    style={{width: "200px"}} disabled={!isSaveable}*/}
                                                        {/*    maxLength="1000"*/}
                                                        {/*    onChange={(e) => this._onChangeCustomItemInputName(customItem, e)}*/}
                                                        {/*    onFocus={(e) => this._onCustomItemNameInputFocus(customItem, e)}*/}
                                                        {/*    onBlur={(e) => this._onCustomItemNameInputBlur(customItem, e)}*/}
                                                        {/*/>*/}
                                                        {/*<datalist*/}
                                                        {/*    id={"brOC_PhonebookContactInfozInfoView_datalist_customItemName_" + i }>*/}
                                                        {/*    {*/}
                                                        {/*        this._Phonebook.item.map(( itm, i) => {*/}
                                                        {/*            if( itm.onscreen === true ){*/}
                                                        {/*                return (null);*/}
                                                        {/*            }*/}
                                                        {/*            if( itm.type === "phone" ){*/}
                                                        {/*                return (null);*/}
                                                        {/*            }*/}
                                                        {/*            const title = PhonebookContactInfozInfo_AutoDialView_ver2.getTitleByPhonebookItem( itm );*/}
                                                        {/*            return <option key={i}*/}
                                                        {/*                           value={itm.id}>{title}</option>*/}
                                                        {/*        })*/}
                                                        {/*    }*/}
                                                        {/*</datalist>*/}
                                                        <AutoComplete defaultValue={customItemName} value={customItemName}
                                                                      options={customItemOptions}
                                                                      id={"brOC_PhonebookContactInfozInfoView_customItemName_" + i}
                                                                      style={{
                                                                          width: "200px",
                                                                          height:editorAutoDialButton.getAutoDialInputFieldHeight(),
                                                                          fontSize:editorAutoDialButton.getAutoDialInputFieldFontSize(),
                                                                          verticalAlign:"middle"
                                                                      }} maxLength={1000}
                                                                      disabled={!isSaveable}
                                                                      onChange={(val) => this._onChangeCustomItemInputName(customItem, val)}
                                                                      onFocus={() => this._onCustomItemNameInputFocus(customItem)}
                                                                      onBlur={() => this._onCustomItemNameInputBlur(customItem)}
                                                        />
                                                    </th>
                                                    <td>
                                                        <table style={{verticalAlign:"middle"}}>
                                                            <tbody>
                                                            <tr>
                                                                <td>
                                                                    <Input
                                                                        data-br-name={"PhonebookContactInfozInfoView_customItemValue_" + i}
                                                                        defaultValue={customItemValue}
                                                                        value={customItemValue}
                                                                        style={{verticalAlign:"middle",width: "300px",height:editorAutoDialButton.getAutoDialInputFieldHeight(),fontSize:editorAutoDialButton.getAutoDialInputFieldFontSize()}} disabled={!isSaveable}
                                                                        maxLength="1000"
                                                                        onChange={(e) => this._onChangeCustomItemInputValue(customItem, e)}
                                                                        onFocus={(e) => this._onCustomItemValueInputFocus(customItem, e)}
                                                                        onBlur={(e) => this._onCustomItemValueInputBlur(customItem, e)}
                                                                    />
                                                                </td>
                                                                <td>
                                                                    <Popconfirm title={i18n.t("are_you_sure")} onConfirm={ () => this._deleteCustomItemRow(i) }
                                                                                okText={i18n.t("yes")}
                                                                                cancelText={i18n.t("no")}
                                                                    >
                                                                        <a style={{marginLeft: "10px"}}>
                                                                            {<FontAwesomeIcon
                                                                                style={{width:iconSize,height:iconSize,verticalAlign:"middle"}}
                                                                                size="lg"
                                                                                icon="fa fa-trash"/>}
                                                                        </a>
                                                                    </Popconfirm>
                                                                </td>
                                                            </tr></tbody>
                                                        </table>
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
                                                                  style={{fontSize:otherFontSize,textDecoration: "underline", cursor: "pointer"}}>
                                                &gt;&gt;{i18n.t("Add_item")}
                                            </span> }
                                            { !isSaveable && <span className="defaultDisabledTextColor" style={{fontSize:otherFontSize,textDecoration:"underline", cursor:"not-allowed"}}>
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
                                    // <Popconfirm title={i18n.t("are_you_sure")} onConfirm={ () => this._deleteContact() }
                                    //             okText={i18n.t("yes")}
                                    //             cancelText={i18n.t("no")}
                                    // >
                                        <Button style={{marginRight:"4px"}} disabled={!isSaveable}>{i18n.t("Delete")}</Button>
                                    // </Popconfirm>
                                }
                                <Button type="success" disabled={!isSaveable}>
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
