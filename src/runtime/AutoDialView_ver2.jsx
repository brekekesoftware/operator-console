import React from "react";
import DropDownMenu from "../DropDownMenu";
import i18n from "../i18n";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import Button from "antd/lib/button";
import Popconfirm from "antd/lib/popconfirm";
import Notification from "antd/lib/notification";
import "./reset.css"
import "./AutoDialView_ver2.css"
import BrekekeOperatorConsole from "../index";
import OCUtil from "../OCUtil";
import {CallHistory2} from "../CallHistory2";
import {Input, Switch} from "antd";
import Spin from "antd/lib/spin";
import Empty from "antd/lib/empty";
import PhonebookContactInfozTelsView from "./PhonebookContactInfozTelsView";
import PhonebookContactInfozInfoView from "./PhonebookContactInfozInfoView";
let AUTO_DIAL_VIEW_VER2;
const _GET_CONTACT_LIST_LIMIT = 1000;   //!limit max 1000

class PhonebookContactInfozInfo_AutoDialView_ver2{
    //!private
    constructor( key, value, isTelKey ) {
        this._InfoKeyName = key;
        //Set name
        this._IsTelKey = isTelKey;
        this._IsCustomKey = false;
        if( !key || key.length === 0 ) {
            this._Title = "";
        }
        else {
            if ( this._IsTelKey) {
                //this._Title = key.substring(5).trim(); //"$tel_".length;
                this._Title = key.substring(5 ); //"$tel_".length;
            } else {
                const isInfoKey = key.startsWith("$");
                if( isInfoKey ) {
                    //this._Title = key.substring(1).trim();
                    this._Title = key.substring(1);
                }
                else {
                    //this._Title = key.trim();
                    this._Title = key;
                    this._IsCustomKey = true;
                }
            }
        }

        //Capitalize the first letter
        if( this._Title ){
            if( this._Title.length > 1 ) {
                const firstChar = this._Title[0];
                this._Title = firstChar.toUpperCase() + this._Title.substring(1);
            }
            else if( this._Title.length === 1 ){
                const firstChar = this._Title[0];
                this._Title = firstChar.toUpperCase();
            }
        }

        this._setValue(value);
    }

    getInfoKeyName(){
        return this._InfoKeyName;
    }

    //!virtual
    _setValue( val ){
        if( !val ) {
            this._Value =  "";
        }
        else {
            //this._Value = value.trim();
            this._Value = val;
        }
    }

    getValue(){
        return this._Value;
    }

    getTitle() {
        return this._Title;
    }

    isTelKey() {
        return this._IsTelKey;
    }

    isCustomKey(){
        return this._IsCustomKey;
    }

    static createTry( key, value ) {
        if( !key || key.length === 0 ) {
            return null;
        }


        const isTelKey = key.startsWith("$tel_");

        let info;
        if ( isTelKey ) {
            info = new PhonebookContactInfozTelInfo_AutoDialView_ver2( key, value, isTelKey );
        }
        else{
            info = new PhonebookContactInfozInfo_AutoDialView_ver2( key,value, isTelKey );
        }
        return info;
    }

}

class PhonebookContactInfozTelInfo_AutoDialView_ver2 extends PhonebookContactInfozInfo_AutoDialView_ver2{
    constructor( key, value, isTelKey ) {
        super( key,value, isTelKey  );
        this._SvgPathD =PhonebookContactInfozTelInfo_AutoDialView_ver2._getSvgPathD( this._Title  );
    }

    //!override
    _setValue( val ){
        if( val === undefined || val === null  || val.length === 0 ) {
            this._Value = "";
        }
        else {
            //this._Value = value.trim();
            this._Value = val.trim();
        }
    }

    getSvgPathD(){
        return this._SvgPathD;
    }

    static _getSvgPathD( title ){
        const titleLower = title.toLowerCase();
        let svgPathD;
        switch(  titleLower ){
            case "work":
                svgPathD = "M10,2H14A2,2 0 0,1 16,4V6H20A2,2 0 0,1 22,8V19A2,2 0 0,1 20,21H4C2.89,21 2,20.1 2,19V8C2,6.89 2.89,6 4,6H8V4C8,2.89 8.89,2 10,2M14,6V4H10V6H14Z";    //bag icon
                break;
            case "mobile":
                svgPathD = "M17,19H7V5H17M17,1H7C5.89,1 5,1.89 5,3V21A2,2 0 0,0 7,23H17A2,2 0 0,0 19,21V3C19,1.89 18.1,1 17,1Z";
                break;
            case "home":
                svgPathD = "M10,20V14H14V20H19V12H22L12,3L2,12H5V20H10Z";
                break;
            default:
                svgPathD = "M6.62,10.79C8.06,13.62 10.38,15.94 13.21,17.38L15.41,15.18C15.69,14.9 16.08,14.82 16.43,14.93C17.55,15.3 18.75,15.5 20,15.5A1,1 0 0,1 21,16.5V20A1,1 0 0,1 20,21A17,17 0 0,1 3,4A1,1 0 0,1 4,3H7.5A1,1 0 0,1 8.5,4C8.5,5.25 8.7,6.45 9.07,7.57C9.18,7.92 9.1,8.31 8.82,8.59L6.62,10.79Z";  //tel icon
                break;
        }
        return svgPathD;
    }

}

// class PhonebookContactInfozTel_AutoDialView_ver2{
//     /**
//      *
//      * @param infoPropertyName ex. $tel_mobile
//      * @param infoPropertyValueAsTel  999
//      */
//     constructor( phonebookContactInfozInfo  ) {
//         this._Title = phonebookContactInfozInfo.getTitle();
//         this._Tel = phonebookContactInfozInfo.getValue().trim();
//         this._SvgPathD =PhonebookContactInfozTel_AutoDialView_ver2.getSvgPathD( this._Title  );
//     }
//
//     getTitle(){
//         return this._Title;
//     }
//
//     getTel(){
//         return this._Tel;
//     }
//
//     getSvgPathD(){
//         return this._SvgPathD;
//     }
//
//     static getSvgPathD( title ){
//         const titleLower = title.toLowerCase();
//         let svgPathD;
//         switch(  titleLower ){
//             case "work":
//                 svgPathD = "M10,2H14A2,2 0 0,1 16,4V6H20A2,2 0 0,1 22,8V19A2,2 0 0,1 20,21H4C2.89,21 2,20.1 2,19V8C2,6.89 2.89,6 4,6H8V4C8,2.89 8.89,2 10,2M14,6V4H10V6H14Z";    //bag icon
//                 break;
//             case "mobile":
//                 svgPathD = "M17,19H7V5H17M17,1H7C5.89,1 5,1.89 5,3V21A2,2 0 0,0 7,23H17A2,2 0 0,0 19,21V3C19,1.89 18.1,1 17,1Z";
//                 break;
//             case "home":
//                 svgPathD = "M10,20V14H14V20H19V12H22L12,3L2,12H5V20H10Z";
//                 break;
//             default:
//                 svgPathD = "M6.62,10.79C8.06,13.62 10.38,15.94 13.21,17.38L15.41,15.18C15.69,14.9 16.08,14.82 16.43,14.93C17.55,15.3 18.75,15.5 20,15.5A1,1 0 0,1 21,16.5V20A1,1 0 0,1 20,21A17,17 0 0,1 3,4A1,1 0 0,1 4,3H7.5A1,1 0 0,1 8.5,4C8.5,5.25 8.7,6.45 9.07,7.57C9.18,7.92 9.1,8.31 8.82,8.59L6.62,10.79Z";  //tel icon
//                 break;
//         }
//         return svgPathD;
//     }
//
//     static createPhonebookContactInfozTel_AutoDialView_ver2Try( pbContactInfozInfo  ){
//         if( pbContactInfozInfo.isTelKey() !== true ){
//             return null;
//         }
//         const value = pbContactInfozInfo.getValue();
//         if( !value  ){
//             return null;
//         }
//         const infoPropertyValueAsTelTrim = value.trim();
//         if( value.length === 0 ){
//             return null;
//         }
//
//         const pbTel = new PhonebookContactInfozTel_AutoDialView_ver2( pbContactInfozInfo );
//         return pbTel;
//     }
//
//
// }

class PhonebookContactInfo_AutoDialView_ver2{

    constructor( contact ) {
        this._Aid = contact["aid"];
        this._DisplayName = contact["display_name"];
        this._PhonebookName = contact["phonebook"];

        const shared = contact["shared"];
        if (typeof shared == "boolean") {
            this._IsShared = shared;
        }
        else{
            if (typeof shared === 'string' || shared instanceof String){
                this._IsShared = shared.toLowerCase() === "true";
            }
            else{
                this._IsShared = false;
            }
        }

        this._PhonebookContactInfozTelInfoArray = new Array();
        this._PhonebookContactInfozInfoArray = new Array();
        this._TelInfoKeyNameArray = new Array();
        //!collect phonebook tel info
        const info = contact["info"];
        const infoEntries = Object.entries(info);
        for( const [key, value] of infoEntries ){
            const pbContactInfozInfo = PhonebookContactInfozInfo_AutoDialView_ver2.createTry( key, value );
            if( !pbContactInfozInfo ){
                continue;
            }
            if( pbContactInfozInfo instanceof  PhonebookContactInfozTelInfo_AutoDialView_ver2 ){
                this._TelInfoKeyNameArray.push( pbContactInfozInfo.getInfoKeyName() );
                if( pbContactInfozInfo.getValue() && pbContactInfozInfo.getValue().length !== 0 )
                {
                    this._PhonebookContactInfozTelInfoArray.push(pbContactInfozInfo);
                }
            }
            // const pbTel = PhonebookContactInfozTel_AutoDialView_ver2.createPhonebookContactInfozTel_AutoDialView_ver2Try( pbContactInfozInfo  );
            // if( pbTel ){
            //     this._PhonebookContactInfozTelInfoArray.push( pbTel );
            // }
            this._PhonebookContactInfozInfoArray.push( pbContactInfozInfo );
        }
        Object.freeze(this._TelInfoKeyNameArray);
        Object.freeze(this._PhonebookContactInfozTelInfoArray);
        Object.freeze(this._PhonebookContactInfozInfoArray);
    }

    getFreezedTelInfoKeyNameArray(){
        return this._TelInfoKeyNameArray;
    }

    getFreezedPhonebookContactInfozTelInfoArray(){
        return this._PhonebookContactInfozTelInfoArray;
    }

    getFreezedPhonebookContactInfozInfoArray(){
        return this._PhonebookContactInfozInfoArray;
    }

    getPhonebookContactInfozInfoByInfoKeyName( infoKeyName ){
        const foundInfo = this._PhonebookContactInfozInfoArray.find( (info) =>{
            return info.getInfoKeyName() === infoKeyName;
        });
        return foundInfo;
    }

    getDisplayName(){
        return this._DisplayName;
    }

    getIsShared(){
        return this._IsShared;
    }

    getAid(){
        return this._Aid;
    }

    getPhonebookName() {
        return this._PhonebookName;
    }

}

export default class AutoDialView_ver2 extends React.Component {

    constructor( props ){
        super(props);
        this.state = {
        };
        // const oc = BrekekeOperatorConsole.getStaticInstance();
        // oc.getCallHistory2().sortIfNeed();
        AUTO_DIAL_VIEW_VER2 = this;
        this._phonebookContactInfoArray = null;
        this._PhonebookScrollableDivElement = null;
        this._latestSearchPhonebookName = null;
        this._latestSearchPhonebookShared = null;
        this._latestSearchPhonebookKeywords = null;
    }

    _getPhonebookScrollableDivElement(){

        return document.getElementById("phonebookScrollableDiv_brOC_AutoDialView_ver2");

        //!commentOut It seems that caching is not possible with react.
        // if( !this._PhonebookScrollableDivElement ){
        //     this._PhonebookScrollableDivElement =document.getElementById("phonebookScrollableDiv_brOC_AutoDialView_ver2");
        // }
        // return this._PhonebookScrollableDivElement;
    }

    _isPhonebookScrollableDivzVerticalScrollbarVisible(){
        const e = this._getPhonebookScrollableDivElement();
        const scrollHeight = e.scrollHeight;
        const clientHeight = e.clientHeight;
        const b = scrollHeight > clientHeight;
        return b;
    }


    // componentDidMount(){
    //     this._PhonebookScrollableDiv = document.getElementById("phonebookScrollableDiv_brOC_AutoDialView_ver2");
    // }

    _resetPhonebookContactInfoArrayAsync( pbKeywords, pbShared ){
        const oc = BrekekeOperatorConsole.getStaticInstance();
        const systemSettingsData = oc.getSystemSettingsData();
        const pbName = systemSettingsData.getAutoDialPhonebookName();
        this._latestSearchPhonebookName = pbName;
        this._latestSearchPhonebookShared = pbShared;
        this._latestSearchPhonebookKeywords = pbKeywords;
        if( this._phonebookContactInfoArray == null ){
            this._phonebookContactInfoArray = new Array();
        }
        else {
            this._phonebookContactInfoArray.length = 0; //clear array
        }
        this.setState({rerender:true});
        this._appendPhonebookContactsRecursive();
    }

    _appendPhonebookContactsRecursive(){
        setTimeout( () =>{
            if( this._isPhonebookScrollableDivzVerticalScrollbarVisible() !== true ){
                this._appendPhonebookContactsAsync().then( (contactListCount) =>{
                    this.setState({rerender:true});
                    if( contactListCount > 0 ){
                        this._appendPhonebookContactsRecursive();
                    }
                })
                    .catch( (err) =>{
                        console.error("Failed to get phonebook contacts.", err);
                        try {
                            const sErr = JSON.stringify(err);
                            Notification.error({
                                message: i18n.t('An_error_occurred_while_retrieving_the_phone_book') + "\r\n" + sErr,
                                duration: 0
                            });
                        } catch (err) {
                            Notification.error({
                                message: i18n.t('An_error_occurred_while_retrieving_the_phone_book') + "\r\n" + err,
                                duration: 0
                            });
                        }
                    });

            }
        },1);
    }

    // async _resetPhonebookContactInfoArrayAsync( pbKeywords, pbShared ){
    // 	const oc = BrekekeOperatorConsole.getStaticInstance();
    // 	const systemSettingsData = oc.getSystemSettingsData();
    // 	const pbBaseName = systemSettingsData.getAutoDialPhonebookName();
    //
    // 	//const pbShared = this._getPhonebookSharedValue();
    // 	//const pbKeywords = this._getPhonebookKeywordsValue();
    // 	const options = {};
    // 	if( pbBaseName && pbBaseName.length !== 0 ){
    // 		options["phonebook"] = pbBaseName;
    // 	}
    // 	if( pbShared !== undefined && pbShared !== null ){
    // 		options["shared"] = pbShared;
    // 	}
    // 	if( pbKeywords && pbKeywords.length !== 0 ){
    // 		options["search_text"] = pbKeywords;
    // 	}
    //     if( _GET_CONTACT_LIST_LIMIT > 0 ){
    //         options["limit"] = _GET_CONTACT_LIST_LIMIT;
    //     }
    //
    //     if( this._phonebookContactInfoArray == null ){
    //         this._phonebookContactInfoArray = new Array();
    //     }
    //     else {
    //         this._phonebookContactInfoArray.length = 0; //clear array
    //     }
    //
    //     const phoneClient = oc.getPhoneClient();
    //     let offset = 0;
    //     let bContinue;
    //     do {
    //         options["offset"] = offset;
    //         const contactList = await phoneClient.getContactListAsync(options).catch((rej) => {
    //             console.error("Failed to get phonebook contact list.", rej);
    //             try {
    //                 const sRej = JSON.stringify(rej);
    //                 Notification.error({
    //                     message: i18n.t('Failed_to_get_phone_book_contact_list') + "\r\n" + sRej,
    //                     duration: 0
    //                 });
    //             } catch (err) {
    //                 Notification.error({
    //                     message: i18n.t('Failed_to_get_phone_book_contact_list') + "\r\n" + rej,
    //                     duration: 0
    //                 });
    //             }
    //         });
    //         if (contactList) {
    //             for (let i = 0; i < contactList.length; i++) {
    //                 const contactListItem = contactList[i];
    //                 const aid = contactListItem["aid"];
    //                 const getContactOptions = {aid: aid};
    //                 const contact = await phoneClient.getContactAsync(getContactOptions).catch((rej) => {
    //                     console.error("Failed to get phonebook contact.", rej);
    //                     try {
    //                         const sRej = JSON.stringify(rej);
    //                         Notification.error({
    //                             message: i18n.t('Failed_to_get_phone_book_contact') + "\r\n" + sRej,
    //                             duration: 0
    //                         });
    //                     } catch (err) {
    //                         Notification.error({
    //                             message: i18n.t('Failed_to_get_phone_book_contact') + "\r\n" + rej,
    //                             duration: 0
    //                         });
    //                     }
    //                 });
    //                 const contactInfo = new PhonebookContactInfo_AutoDialView_ver2(contact);
    //                 this._phonebookContactInfoArray.push(contactInfo);
    //             }
    //         }
    //         if( contactList ) {
    //             offset += contactList.length;
    //         }
    //         bContinue = ( contactList && contactList.length !== 0 ) && this._isPhonebookScrollableDivzVerticalScrollbarVisible() !== true;
    //     }
    //     while(bContinue === true );
    //     this.setState({rerender:true});
    // }

    static getStaticInstance(){
        return AUTO_DIAL_VIEW_VER2;
    }

    // _clearCallNoHistory( this_){
    //     const oc = BrekekeOperatorConsole.getStaticInstance();
    //     oc.getCallHistory().clearAndSave();
    //     oc.setState({rerender:true},
    //         () => {
    //             Notification.success({ key: 'sync', message: i18n.t("saved_data_to_pbx_successfully") });
    //         }
    //     );  //!bad for rerender
    //
    // }

    _clearCallNoHistory2( this_){
        const oc = BrekekeOperatorConsole.getStaticInstance();
        const promise = oc.getCallHistory2().clearCallHistory2(
            () =>{
                Notification.success({ key: 'sync', message: i18n.t("saved_data_to_pbx_successfully") });
            },
            ( errorOrResponse ) =>{
                OCUtil.logErrorWithNotification("Faild to clear call histories.", i18n.t("failed_to_save_data_to_pbx"), errorOrResponse );
            }
        );

    }

    _tabSwitchAndSortIfNeedCallHistory2(e){
        this.tabSwitch(e);
        const oc = BrekekeOperatorConsole.getStaticInstance();
        const sort = oc.getSystemSettingsData().getAutoDialRecentDisplayOrder();
        oc.getCallHistory2().sortIfNeed( sort );
    }

    tabSwitch(e){
        document.getElementsByClassName('is-active')[0].classList.remove('is-active');
        const tgt = e.target;
        tgt.classList.add('is-active');

        document.getElementsByClassName('is-show')[0].classList.remove('is-show');
        const tabs = document.getElementsByClassName('tab');
        const arrayTabs = Array.prototype.slice.call(tabs);
        const index = arrayTabs.indexOf(tgt);
        document.getElementsByClassName('panel')[index].classList.add('is-show');

        // //!bad To set the table on the right side( browser's bug ? )
        // const eTable =  document.body.querySelector('[data-br-name="brOC_AutoDialView_ver2_rootTable"]');
        // eTable.style.position = "static";
        // eTable.style.visibility = "hidden";
        // setTimeout(  () => {
        //     eTable.style.position = "relative";
        //     eTable.style.visibility = "unset";
        // },1000);
    }

    _onClickClose(){
        const oc = BrekekeOperatorConsole.getStaticInstance();
        oc.abortAutoDialView_ver2();
        PhonebookContactInfozTelsView.getStaticPhonebookContactInfozTelsViewInstance().closePhonebookContactInfozTelsView();
    }

    _onClickGetContactList(e){
        const keywords = this._getPhonebookKeywordsValue();
        const bOnlySharedContacts = this._getPhonebookSharedValue();
        this._resetPhonebookContactInfoArrayAsync( keywords, bOnlySharedContacts );
    }

    _getPhonebookKeywordsValue(){
        const eInputKeywords = document.getElementById("brOC_autoDialView_ver2_phonebook_keywords");
        const keywords = eInputKeywords.value;
        return keywords;
    }

    _getPhonebookSharedValue(){
        const eOnlySharedContacts = document.getElementById("brOC_autoDialView_ver2_phonebook_onlySharedContacts");
        //const bOnlySharedContacts = eOnlySharedContacts.checked;	//!commentout checked is undefined
        const bOnlySharedContacts = eOnlySharedContacts.ariaChecked.toLowerCase() == "true";
        return bOnlySharedContacts;
    }

    _onPhonebookKeywordsFocus(e){
        const oc = BrekekeOperatorConsole.getStaticInstance();
        oc.addDisableKeydownToDialingCounter();
        oc.addDisablePasteToDialingCounter();
    }

    _onPhonebookKeywordsBlur(e){
        const oc = BrekekeOperatorConsole.getStaticInstance();
        oc.subtractDisableKeydownToDialingCounter();
        oc.subtractDisablePasteToDialingCounter();
    }

    _onScrollPhonebookScrollableDiv(e){

        if( this._isPhonebookScrollableDivzVerticalScrollbarVisible() !== true ){
            return;
        }

        const {scrollHeight, scrollTop, clientHeight, offsetHeight} = e.target;

        //if (Math.abs(scrollHeight - clientHeight - scrollTop) < 1) {  //!comment not perfect
        if ( scrollHeight - offsetHeight - scrollTop < 1  ) {
            this._appendPhonebookContactsAsync().then( () =>{
                this.setState({rerender:true});
            } ).catch( (err) =>{
                console.error("An error occurred while processing the phone book.",err);
                try {
                    const sErr = JSON.stringify(err);
                    Notification.error({
                        message: i18n.t('An_error_occurred_while_processing_the_phone_book') + "\r\n" + sErr,
                        duration: 0
                    });
                } catch (err) {
                    Notification.error({
                        message: i18n.t('An_error_occurred_while_processing_the_phone_book') + "\r\n" + err,
                        duration: 0
                    });
                }
            });

        }
    }

    /**
     *
     * @returns {Promise<number>}   error:-2,contactList is null:-1:other:contactList's count
     * @private
     */
    async _appendPhonebookContactsAsync(){


        const oc = BrekekeOperatorConsole.getStaticInstance();
        const pbBaseName = this._latestSearchPhonebookName;
        const pbShared = this._latestSearchPhonebookShared;
        const pbKeywords =  this._latestSearchPhonebookKeywords;

        //const pbShared = this._getPhonebookSharedValue();
        //const pbKeywords = this._getPhonebookKeywordsValue();
        const options = {};
        if( pbBaseName && pbBaseName.length !== 0 ){
            options["phonebook"] = pbBaseName;
        }
        if( pbShared !== undefined && pbShared !== null ){
            options["shared"] = pbShared;
        }
        if( pbKeywords && pbKeywords.length !== 0 ){
            options["search_text"] = pbKeywords;
        }
        if( _GET_CONTACT_LIST_LIMIT > 0 ){
            options["limit"] = _GET_CONTACT_LIST_LIMIT;
        }

        const phoneClient = oc.getPhoneClient();
        let offset = this._phonebookContactInfoArray.length;
        options["offset"] = offset;
        let contactListCount;

        const getContactListOptions = {
            methodName : "getContactList",
            methodParams : JSON.stringify( options ),
        }


        const contactList = await oc.getPalRestApi().callPalRestApiMethodAsync(getContactListOptions).catch((rej) => {
            OCUtil.logErrorWithNotification("Failed to get phonebook contact list.", i18n.t('Failed_to_get_phone_book_contact_list'), rej );
            contactListCount = -2;
            return contactListCount;
        });

        if (contactList) {
            for (let i = 0; i < contactList.length; i++) {
                const contactListItem = contactList[i];
                const aid = contactListItem["aid"];
                const getContactOptions = {
                    methodName : "getContact",
                    methodParams : JSON.stringify({
                        aid : aid
                    })
                };
                const contact = await oc.getPalRestApi().callPalRestApiMethodAsync(getContactOptions).catch((rej) => {
                    OCUtil.logErrorWithNotification("Failed to get phonebook contact.", i18n.t('Failed_to_get_phone_book_contact'), rej );
                    contactListCount = -2;
                    return contactListCount;
                });
                const contactInfo = new PhonebookContactInfo_AutoDialView_ver2(contact);
                this._phonebookContactInfoArray.push(contactInfo);
                contactListCount = contactList.length;
            }
        }
        else{
            contactListCount = -1;
        }
        return contactListCount;
    }

    _callPhonebookCallInfozTel( pbContactInfozTeIInfo){
        const tel = pbContactInfozTeIInfo.getValue();
        const oc = BrekekeOperatorConsole.getStaticInstance();
        oc.setDialingAndMakeCall( tel );
        oc.abortAutoDialView_ver2();
    }

    _openPhonebookCallInfozTelsView( pbContactInfo ){
        // const telInfoArray = pbContactInfo.getFreezedPhonebookContactInfozTelInfoArray();
        // if( telInfoArray.length === 1 ){
        //     const telInfo = telInfoArray[0];
        //     const tel = telInfo.getValue();
        //     const oc = BrekekeOperatorConsole.getStaticInstance();
        //     oc.setDialingAndMakeCall( tel );
        // }
        // else{   // >1
        //const pbContactInfozInfoView = PhonebookContactInfozInfoView.getStaticPhonebookContactInfozInfoViewInstance();
        // //const infozInfozContactInfo =  pbContactInfozInfoView.getPhonebookContactInfoFromState();
        // //if( infozInfozContactInfo && infozInfozContactInfo !== pbContactInfo ){
        //     pbContactInfozInfoView.closePhonebookContactInfozInfoView();
        // //}
        const pbContactInfozTelsView = PhonebookContactInfozTelsView.getStaticPhonebookContactInfozTelsViewInstance();
        pbContactInfozTelsView.closePhonebookContactInfozTelsView(() => pbContactInfozTelsView.openPhonebookContactInfozTelsView(pbContactInfo));
        //}
    }

    _openPhonebookCallInfozInfoView( pbContactInfo ){
        const pbContactInfozInfoView = PhonebookContactInfozInfoView.getStaticPhonebookContactInfozInfoViewInstance();
        const pbContactInfozTelsView = PhonebookContactInfozTelsView.getStaticPhonebookContactInfozTelsViewInstance();
        pbContactInfozTelsView.closePhonebookContactInfozTelsView( () => {
            pbContactInfozInfoView.closePhonebookContactInfozInfoView(  () => pbContactInfozInfoView.openPhonebookContactInfozInfoView(pbContactInfo) );
        });
    }

    render() {
        if (!this.props.isVisible) {
            return (null);
        }

        const oc = BrekekeOperatorConsole.getStaticInstance();
        const callHistory2 = oc.getCallHistory2();
        const systemSettingsData = oc.getSystemSettingsData();
        callHistory2.sortIfNeed( systemSettingsData.getAutoDialRecentDisplayOrder()  ); //!bad Not a render logic
        const recentDisplayOrder = systemSettingsData.getAutoDialRecentDisplayOrder();
        const recentDisplayCount = systemSettingsData.getAutoDialMaxDisplayCount();
        return (<>
            <PhonebookContactInfozInfoView />
            <PhonebookContactInfozTelsView />
            <div className="brOCReset autoDialView">
                {/*<table className={"defaultBorderWithRadius outsidePaddingWithoutBorderRadius"} data-br-name="brOC_AutoDialView_ver2_rootTable">*/}
                <table className={"defaultBorderWithRadius outsidePaddingWithoutBorderRadius"}>
                    <tbody>
                    <tr>
                        <td>
                            <table className="defaultTranparentTable defaultSpaceBottom" style={{width: "100%"}}>
                                <tbody>
                                <tr>
                                    <td style={{width: "99%"}}>
                                        <Popconfirm title={i18n.t("are_you_sure")}
                                                    onConfirm={() => this._clearCallNoHistory2(this)}
                                                    okText={i18n.t("yes")}
                                                    cancelText={i18n.t("no")}
                                        >
                                            <Button>{i18n.t("ClearRecent")}</Button>
                                        </Popconfirm>
                                    </td>
                                    <td style={{textAlign: "right", verticalAlign: "top"}}
                                        onClick={this._onClickClose.bind(this)} className="linkDeco">[X]
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <table className="defaultItemMarginTop">
                                <tbody>
                                <tr style={{border: 0}}>
                                    <td>
                                        <div className="tab-panel">
                                            <ul className="tab-group">
                                                <li className="tab tab-A is-active"
                                                    onClick={(e) => this._tabSwitchAndSortIfNeedCallHistory2(e)}>{i18n.t("Recent")}</li>
                                                <li className="tab tab-B"
                                                    onClick={this.tabSwitch}>{i18n.t("ExtensionNumber")}</li>
                                                <li className="tab tab-C"
                                                    onClick={ (e) => {
                                                        this.tabSwitch(e);
                                                        if( this._phonebookContactInfoArray === null ){
                                                            this._resetPhonebookContactInfoArrayAsync();
                                                        }
                                                    }}>{i18n.t("Phonebook")}</li>
                                            </ul>

                                            <div className="panel-group defaultBorderRadiusBottom">
                                                <div className="panel tab-A is-show">
                                                    {recentDisplayOrder === CallHistory2.RECENT_DISPLAY_ORDERS.CALL_OR_INCOMING_COUNT_DESC && (
                                                        <div className={"autoDialView_ver2_RecentRoot"}>
                                                            <table style={{border: "0"}}
                                                                   className={"defaultContentTable"}>
                                                                <thead>
                                                                <tr className="defaultItemPaddingForTr">
                                                                    <th style={{width: "1%"}}>{i18n.t("CallNo")}</th>
                                                                    <th style={{width: 20}}>{i18n.t("Status")}</th>
                                                                    <th></th>
                                                                    <th>{i18n.t("LatestStartedAt")}</th>
                                                                </tr>
                                                                </thead>
                                                                <tbody>
                                                                {callHistory2.getCallHistory2CallInfoArray().slice(0, recentDisplayCount).map((callHistory2CallInfo, i) => {
                                                                    const partyNumber = callHistory2CallInfo.getPartyNumber();
                                                                    const isExtension = OCUtil.indexOfArrayFromExtensions(oc.state.extensions, partyNumber) !== -1;
                                                                    const extensionsStatus = oc.state.extensionsStatus;
                                                                    const statusClassName = isExtension ? OCUtil.getExtensionStatusClassName(partyNumber, extensionsStatus) : "";
                                                                    const sAddDateTime = new Date(callHistory2CallInfo.getAddCallMillisTime()).toLocaleString();
                                                                    return (
                                                                        <tr key={i}>
                                                                            <td style={{width: "1%"}}>{partyNumber}</td>
                                                                            <td>
                                                                                <div className={statusClassName}></div>
                                                                            </td>
                                                                            <td>
                                                                                {partyNumber && (<div style={{
                                                                                    display: "flex",
                                                                                    justifyContent: "center"
                                                                                }}>
                                                                                    <button
                                                                                        title={i18n.t(`Call`)}
                                                                                        className="kbc-button kbc-button-fill-parent legacyButtonPadding brOCDefaultKbcButtonMargin"
                                                                                        onClick={() => {
                                                                                            oc.abortAutoDialView_ver2();
                                                                                            //this.props.operatorConsoleAsParent.setDialingAndMakeCall2( callNo, this.props.currentCallIndex, this.props.callIds, this.props.callById );
                                                                                            oc.setDialingAndMakeCall2(partyNumber);
                                                                                        }
                                                                                        }>
                                                                                        {<FontAwesomeIcon size="lg"
                                                                                                          icon="fas fa-phone"/>}
                                                                                    </button>
                                                                                </div>)}
                                                                            </td>
                                                                            <td>
                                                                                {sAddDateTime}
                                                                            </td>
                                                                        </tr>
                                                                    )
                                                                })}
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    )}
                                                    {recentDisplayOrder === CallHistory2.RECENT_DISPLAY_ORDERS.ADD_DATETIME_DESC && (
                                                        <div className={"autoDialView_ver2_tableParent"}>
                                                            <table style={{border: "0"}}
                                                                   className={"defaultContentTable"}>
                                                                <thead>
                                                                <tr className="defaultItemPaddingForTr">
                                                                    <th style={{width: "1%"}}>{i18n.t("CallNo")}</th>
                                                                    <th style={{width: 20}}>{i18n.t("Status")}</th>
                                                                    <th></th>
                                                                    <th>{i18n.t("Incoming")}</th>
                                                                    <th>{i18n.t("StartedAt")}</th>
                                                                    <th>{i18n.t("AnsweredAt")}</th>
                                                                    <th>{i18n.t("EndedAt")}</th>
                                                                </tr>
                                                                </thead>
                                                                <tbody>
                                                                {callHistory2.getCallHistory2CallInfoArray().slice(0, recentDisplayCount).map((callHistory2CallInfo, i) => {
                                                                    const partyNumber = callHistory2CallInfo.getPartyNumber();
                                                                    const isExtension = OCUtil.indexOfArrayFromExtensions(oc.state.extensions, partyNumber) !== -1;
                                                                    const extensionsStatus = oc.state.extensionsStatus;
                                                                    const statusClassName = isExtension ? OCUtil.getExtensionStatusClassName(partyNumber, extensionsStatus) : "";
                                                                    const sIsIncoming = callHistory2CallInfo.getIsIncoming() ? "✓" : "";
                                                                    const sStartedAt = new Date(callHistory2CallInfo.getAddCallMillisTime()).toLocaleString();
                                                                    const sAnsweredAt = callHistory2CallInfo.getAnsweredAt() ? new Date(callHistory2CallInfo.getAnsweredAt()).toLocaleString() : "";
                                                                    const sEndedAt = callHistory2CallInfo.getEndCallMillisTime() ? new Date(callHistory2CallInfo.getEndCallMillisTime()).toLocaleString() : "";
                                                                    return (
                                                                        <tr key={i}>
                                                                            <td style={{width: "1%"}}>{partyNumber}</td>
                                                                            <td>
                                                                                <div className={statusClassName}></div>
                                                                            </td>
                                                                            <td>
                                                                                {partyNumber && (<div style={{
                                                                                    display: "flex",
                                                                                    justifyContent: "center"
                                                                                }}>
                                                                                    <button
                                                                                        title={i18n.t(`Call`)}
                                                                                        className="kbc-button kbc-button-fill-parent legacyButtonPadding brOCDefaultKbcButtonMargin"
                                                                                        onClick={() => {
                                                                                            oc.abortAutoDialView_ver2();
                                                                                            //this.props.operatorConsoleAsParent.setDialingAndMakeCall2( callNo, this.props.currentCallIndex, this.props.callIds, this.props.callById );
                                                                                            oc.setDialingAndMakeCall2(partyNumber);
                                                                                        }
                                                                                        }>
                                                                                        {<FontAwesomeIcon size="lg"
                                                                                                          icon="fas fa-phone"/>}
                                                                                    </button>
                                                                                </div>)}
                                                                            </td>
                                                                            <td style={{textAlign: "center"}}>{sIsIncoming}</td>
                                                                            <td>{sStartedAt}</td>
                                                                            <td>{sAnsweredAt}</td>
                                                                            <td>{sEndedAt}</td>
                                                                        </tr>
                                                                    )
                                                                })}
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="panel tab-B">
                                                    <div className="autoDialView_ver2_tableParent">
                                                        <table className={"defaultContentTable"} style={{border: "0"}}>
                                                            <thead>
                                                            <tr className="defaultItemPaddingForTr">
                                                                <th>{i18n.t("ID")}</th>
                                                                <th>{i18n.t("Name")}</th>
                                                                <th>{i18n.t("Status")}</th>
                                                                <th></th>
                                                            </tr>
                                                            </thead>
                                                            <tbody>
                                                            {oc.state.extensions.map((ext, i) => {
                                                                const extensionsStatus = oc.state.extensionsStatus;
                                                                const statusClassName = OCUtil.getExtensionStatusClassName(ext.id, extensionsStatus);

                                                                return (
                                                                    <tr key={i}>
                                                                        <td style={{width: 100}}>{ext.id}</td>
                                                                        <td style={{width: 100}}>{ext.name}</td>
                                                                        <td style={{width: 20}}>
                                                                            <div className={statusClassName}></div>
                                                                        </td>
                                                                        <td style={{width: 50}}>
                                                                            <div style={{
                                                                                display: "flex",
                                                                                justifyContent: "center"
                                                                            }}>
                                                                                <button
                                                                                    title={i18n.t(`Call`)}
                                                                                    className="kbc-button kbc-button-fill-parent legacyButtonPadding brOCDefaultKbcButtonMargin"
                                                                                    onClick={() => {
                                                                                        //oc.setDialingAndMakeCall2( ext.id, this.props.currentCallIndex, this.props.callIds, this.props.callById );
                                                                                        oc.setDialingAndMakeCall2(ext.id);
                                                                                        oc.abortAutoDialView_ver2();
                                                                                    }
                                                                                    }>
                                                                                    {<FontAwesomeIcon size="lg"
                                                                                                      icon="fas fa-phone"/>}
                                                                                </button>
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                )
                                                            })}
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                                <div className="panel tab-C">
                                                    <table className={"defaultContentTable"} style={{border: "0"}}>
                                                        <tbody>
                                                        <tr className="defaultItemPaddingForTr">
                                                            <td>
                                                                <Input
                                                                    id="brOC_autoDialView_ver2_phonebook_keywords"
                                                                    maxLength={1000}
                                                                    placeholder={i18n.t('Keywords')} allowClear
                                                                    defaultValue={''}
                                                                    onFocus={(e) => this._onPhonebookKeywordsFocus(e)}
                                                                    onBlur={(e) => this._onPhonebookKeywordsBlur(e)}
                                                                    style={{width: "300px"}}/>
                                                            </td>
                                                            <td style={{paddingLeft: "4px"}}>
                                                                <button
                                                                    title={i18n.t(`Search`)}
                                                                    className="kbc-button kbc-button-fill-parent legacyButtonPadding brOCDefaultKbcButtonMargin"
                                                                    onClick={(e) => this._onClickGetContactList(e)}
                                                                >
                                                                    <svg height="24" viewBox="0 0 24 24" width="24">
                                                                        <path
                                                                            d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z"
                                                                            fill="black">
                                                                        </path>
                                                                    </svg>
                                                                </button>
                                                                {/*<svg height="24" viewBox="0 0 24 24" width="24"*/}
                                                                {/*     onClick={(e) => this._onClickGetContactList(e)}>*/}
                                                                {/*    <path*/}
                                                                {/*        d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z"*/}
                                                                {/*        fill="black">*/}
                                                                {/*    </path>*/}
                                                                {/*</svg>*/}
                                                            </td>
                                                            <td style={{width: "99%"}}></td>
                                                        </tr>
                                                        <tr className="defaultItemPaddingForTr">
                                                            <td>
                                                                {i18n.t("OnlySharedContacts")}
                                                            </td>
                                                            <td style={{paddingLeft: "0"}}>
                                                                <Switch
                                                                    id="brOC_autoDialView_ver2_phonebook_onlySharedContacts"
                                                                    // defaultChecked={false}   //!bug? Sometimes it stops working.
                                                                />
                                                            </td>
                                                            <td style={{width:"99%"}}></td>
                                                        </tr>
                                                        <tr className="defaultItemPaddingForTr">
                                                            <td colSpan="3"
                                                                className="paddingTopZeroImportant_AutoDialView_ver2"
                                                                style={{padding: "0",width:"100%"}}>
                                                                <div className="autoDialView_ver2_tableParent"
                                                                     id="phonebookScrollableDiv_brOC_AutoDialView_ver2"
                                                                     onScroll={(e) => this._onScrollPhonebookScrollableDiv(e)}>
                                                                    {this._phonebookContactInfoArray === null && (
                                                                        <div style={{
                                                                            display: "flex",
                                                                            justifyContent: "center",
                                                                            alignItems:"center",height:"inherit"}}>
                                                                            <Spin/>
                                                                        </div>
                                                                    )
                                                                    }
                                                                    { this._phonebookContactInfoArray !== null && (
                                                                        <table className={"defaultContentTable"} style={{border: "0",width:"100%"}}>
                                                                            <thead>
                                                                            <tr>
                                                                                <th>{i18n.t("DisplayName")}</th>
                                                                                <th style={{textAlign:"center"}}>{i18n.t("Call")}</th>
                                                                                {/*<th style={{textAlign:"center"}}>{i18n.t("Info")}</th>*/}
                                                                            </tr>
                                                                            </thead>
                                                                            <tbody>
                                                                            { this._phonebookContactInfoArray.map((pbContactInfo,i) => {
                                                                                const pbContactInfozTelInfoArray = pbContactInfo.getFreezedPhonebookContactInfozTelInfoArray();
                                                                                return (
                                                                                    <tr key={i} style={{height:"42px"}}>
                                                                                        <td>{pbContactInfo.getDisplayName()}</td>
                                                                                        <td>
                                                                                            <div style={{display:"flex",alignItems:"center",justifyContent:"center"}}>
                                                                                                { pbContactInfo.getFreezedPhonebookContactInfozTelInfoArray().length === 1 && (
                                                                                                    <button
                                                                                                        title={i18n.t(`Call`)}
                                                                                                        className="kbc-button kbc-button-fill-parent legacyButtonPadding brOCDefaultKbcButtonMargin"
                                                                                                        onClick={(e) => this._callPhonebookCallInfozTel( pbContactInfo.getFreezedPhonebookContactInfozTelInfoArray()[0] )}
                                                                                                    >
                                                                                                        <FontAwesomeIcon size="lg" icon="fas fa-phone" />
                                                                                                    </button>
                                                                                                )}
                                                                                                { pbContactInfo.getFreezedPhonebookContactInfozTelInfoArray().length > 1 && (<FontAwesomeIcon size="lg"
                                                                                                                                                                                              icon="fas fa-phone" onClick={(e) => this._openPhonebookCallInfozTelsView( pbContactInfo ) }/> ) }
                                                                                            </div>
                                                                                        </td>
                                                                                        {/*<td>*/}
                                                                                        {/*    <div style={{*/}
                                                                                        {/*        display: "flex",*/}
                                                                                        {/*        alignItems: "center",*/}
                                                                                        {/*        justifyContent: "center"*/}
                                                                                        {/*    }}>*/}
                                                                                        {/*        <svg height="24"*/}
                                                                                        {/*             viewBox="0 0 24 24"*/}
                                                                                        {/*             width="24"*/}
                                                                                        {/*             onClick={(e) => this._openPhonebookCallInfozInfoView( pbContactInfo )}>*/}
                                                                                        {/*            <path*/}
                                                                                        {/*                d="M13,9H11V7H13M13,17H11V11H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z"*/}
                                                                                        {/*                fill="black"></path>*/}
                                                                                        {/*        </svg>*/}
                                                                                        {/*    </div>*/}
                                                                                        {/*</td>*/}
                                                                                    </tr>
                                                                                );
                                                                            })
                                                                            }
                                                                            </tbody>
                                                                        </table>
                                                                    )}
                                                                </div>
                                                            </td>
                                                        </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
            {/*<DropDownMenu operatorConsole={oc} ></DropDownMenu>*/}
        </>)
    }
}