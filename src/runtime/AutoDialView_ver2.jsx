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
import {Checkbox, Input, Switch} from "antd";
import Spin from "antd/lib/spin";
import Empty from "antd/lib/empty";
import PhonebookContactInfozTelsView from "./PhonebookContactInfozTelsView";
import PhonebookContactInfozInfoView from "./PhonebookContactInfozInfoView";
import PhonebookContactInfo_AutoDialView_ver2 from "./PhonebookContactInfo_AutoDialView_ver2";
import PhonebookContact_AutoDialView_ver2 from "./PhonebookContact_AutoDialView_ver2";
import Select from "antd/lib/select";
let AUTO_DIAL_VIEW_VER2;
const _GET_CONTACT_LIST_LIMIT = 1000;   //!limit max 1000
const _EXTENSION_FILTER_COLUMN_NAME_DEFAULT_VALUE = "extensionNumber";
const MAX_DATE_MILLISECONDS = 999;
const MAX_DATE_YEAR = 275759;

export default class AutoDialView_ver2 extends React.Component {

    constructor( props ){
        super(props);
        this.state = {
            recentShowDetailChecked : false
        };
        // const oc = BrekekeOperatorConsole.getStaticInstance();
        // oc.getCallHistory2().sortIfNeed();
        AUTO_DIAL_VIEW_VER2 = this;
        this._phonebookContactInfoArray = null;
        this._autoDialViewzPhonebookContactArray = null;
        this._filteredExtensionArray = null;
        this._currentExtensionFilterColumnName = _EXTENSION_FILTER_COLUMN_NAME_DEFAULT_VALUE;
        //this._autoDialViewRightStyle = "0";
        this.clearLatestSearchInfo();
        //this._PhonebookScrollableDivElement = null;
        //this._AutoDialViewRef = React.createRef();
        this._callInfoArrayForDisplay = null;
    }

    clearLatestSearchInfo(){
        this._latestSearchPhonebookName = null;
        this._latestSearchPhonebookShared = null;
        this._latestSearchPhonebookKeywords = null;
        this._latestSearchPhonebookDate = null;
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

    _loadJavascript(src , parentElement) {
        const eScript = document.createElement("script");
        eScript.type = "application/javascript";
        eScript.src = src;
        parentElement.appendChild(eScript);
    }

     componentDidMount(){
         //const eAutoDialView_ver2 = document.getElementById("brOC_AutoDialView_Ver2");
         //const autoDialViewRef = this._AutoDialViewRef;
         //const eAutoDialView_ver2 = autoDialViewRef.current;
         //const eAutoDialView_ver2 = this._AutoDialViewElement;
         const oc = BrekekeOperatorConsole.getStaticInstance();

         const port = oc.getLoggedinPbxPort();
         let portString;
         if( port !== null && port !== undefined && (port + "").length !== 0  ){
             portString = ":" + port;
         }
         else{
             portString = "";
         }

         let pbxDirString;
         const pbxDirecotryname = oc.getLoginPbxDirectoryName();
         if( pbxDirecotryname ){
             pbxDirString = "/" + pbxDirecotryname;
         }
         else{
             pbxDirString = "";
         }

        const phoneBookJsSrc = "https://" + oc.getLoggedinPbxHost() + portString + pbxDirString + "/common/js/brekeke/phonebook/phonebook.js";  //!hardcode https
         this._loadJavascript( phoneBookJsSrc, document.body );
     }

    // componentDidMount(){
    //     this._PhonebookScrollableDiv = document.getElementById("phonebookScrollableDiv_brOC_AutoDialView_ver2");
    // }

    // componentDidUpdate(prevProps, prevState, snapshot) {
    //     const eRecentShowDetail = document.getElementById("recentShowDetail_brOC_AutoDialView_ver2");
    //     if( eRecentShowDetail ){
    //         if( eRecentShowDetail.checked !== this.state.recentShowDetailChecked ){
    //             eRecentShowDetail.checked = this.state.recentShowDetailChecked;
    //             this.setState({recentShowDetailChecked:this.state.recentShowDetailChecked});
    //         }
    //     }
    //
    // }

    async _resetPhonebookContactInfoArrayAsync( pbKeywords, pbShared, pbName ){
        const getPhonebooksOptions ={
            methodName : "getPhonebooks",
            // methodParams : JSON.stringify({
            // }),
        }
        const oc = BrekekeOperatorConsole.getStaticInstance();
        this._latestPhonebookArray = await oc.getPalRestApi().callPalRestApiMethodAsync( getPhonebooksOptions ).catch( (resOrError) =>{
            OCUtil.logErrorWithNotification("Failed to get phone books.", i18n.t("Failed_to_get_phone_books"), resOrError );
            return;
        });
        const systemSettingsData = oc.getSystemSettingsData();
        if( !pbName ) {
            pbName = systemSettingsData.getAutoDialPhonebookName();
        }

        this._latestSearchPhonebookDate = new Date();
        this._latestSearchPhonebookName = pbName;
        this._latestSearchPhonebookShared = pbShared;
        this._latestSearchPhonebookKeywords = pbKeywords;
        if( this._phonebookContactInfoArray == null ){
            this._phonebookContactInfoArray = new Array();
        }
        else {
            this._phonebookContactInfoArray.length = 0; //clear array
        }
        if( this._autoDialViewzPhonebookContactArray == null ){
            this._autoDialViewzPhonebookContactArray = new Array();
        }
        else {
            this._autoDialViewzPhonebookContactArray.length = 0; //clear array
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
            },
            oc.getPalRestApi()
        );

    }

    _tabSwitchAndSortIfNeedCallHistory2(eTarget1){
        const eTarget2 = document.getElementById("tabB_AutoDialView_ver2_brOC");
        this.tabSwitch(eTarget1, eTarget2 );
        const oc = BrekekeOperatorConsole.getStaticInstance();
        const sort = oc.getSystemSettingsData().getAutoDialRecentDisplayOrder();
        oc.getCallHistory2().sortIfNeed( sort );
    }

    tabSwitch(eTarget1, eTarget2 = null ){
        this._tabSwitchMain( eTarget1 );
        // if( eTarget2 ) {    //!forBug
        //     setTimeout(() => {
        //         this._tabSwitchMain(eTarget2);
        //         setTimeout(() => {
        //                 this._tabSwitchMain(eTarget1);
        //                 //setTimeout( () => this._tabSwitchMain(eTarget1), 5 );
        //             }
        //             , 5);
        //     }, 5);
        // }
    }

    _tabSwitchMain(tgt){
        document.getElementsByClassName('is-active')[0].classList.remove('is-active');
        tgt.classList.add('is-active');

        document.getElementsByClassName('is-show')[0].classList.remove('is-show');
        const tabs = document.getElementsByClassName('tab');
        const arrayTabs = Array.prototype.slice.call(tabs);
        const index = arrayTabs.indexOf(tgt);
        document.getElementsByClassName('panel')[index].classList.add('is-show');
        //this._resetAutoDialViewRightStyleToElementForBug();

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

    _onClickGetContactList(){
        const keywords = this._getPhonebookKeywordsValue();
        const bOnlySharedContacts = this._getPhonebookSharedValue();
        this._getContactList( keywords, bOnlySharedContacts );
    }

    _getExtensionFilterWordValue(){
        const eInput = document.getElementById("brOC_autoDialView_ver2_extension_filterWord");
        const v = eInput.value;
        return v;
    }

    _getExtensionFilterColumnName(){
        //Not supported in AntDesign Select.
        //const e = document.getElementById("brOC_autoDialView_ver2_extension_filterColumnName");
        //const v = e.value;

        const v = this._currentExtensionFilterColumnName;
        return v;
    }

    _onClickGetExtensionList(){
        const filterWord = this._getExtensionFilterWordValue();
        const filterColumnName = this._getExtensionFilterColumnName();
        this._filteredExtensionArray = this._getFilteredExtensionArray( filterWord, filterColumnName );
        this.setState({rerender:true});
    }

    _getFilteredExtensionArray( filterWord, filterColumnName ){
        // let filterWordTrimmed;
        // if( filterWord ) {
        //      filterWord = filterWord.trim();
        // }
        // else{
        //     filterWordTrimmed = "";
        // }
        const oc = BrekekeOperatorConsole.getStaticInstance();
        let exts = oc.state.extensions;
        if( !exts ){
            exts = new Array();
        }

        let filterdExts;
        if( !filterWord || filterWord.length === 0 || !filterColumnName || filterColumnName.length === 0 ){
            filterdExts = new Array( exts.length );
            for( let i = 0; i < exts.length; i++ ) {
                filterdExts[i] = exts[i];
            }
        }
        else{
            filterdExts = new Array();
            if( filterColumnName === "extensionNumber"){
                for (let i = 0; i < exts.length; i++) {
                    const ext = exts[i];
                    const extensionNumber = ext.id;
                    const bInclude = extensionNumber.includes( filterWord );
                    if( bInclude === true ){
                        filterdExts.push( ext );
                    }
                }
            }
            else if( filterColumnName === "name") {
                for (let i = 0; i < exts.length; i++) {
                    const ext = exts[i];
                    const name = ext.name;
                    const bInclude = name.includes( filterWord );
                    if( bInclude === true ){
                        filterdExts.push( ext );
                    }
                }
            }
        }

        return filterdExts;
    }

    _getContactList( keywords, bOnlySharedContacts ){
        this._resetPhonebookContactInfoArrayAsync( keywords, bOnlySharedContacts );
    }

    reshowContactList(){
        // const canShow = ( !this._latestSearchPhonebookKeywords === undefined || !this._latestSearchPhonebookKeywords !== null  ) &&
        //     ( this._latestSearchPhonebookShared !== undefined || this._latestSearchPhonebookShared !== null ) &&
        //     !!this._latestSearchPhonebookName
        // ;
        const canShow = !!this._latestSearchPhonebookDate;
        if( canShow ){
            this._resetPhonebookContactInfoArrayAsync( this._latestSearchPhonebookKeywords, this._latestSearchPhonebookShared, this._latestSearchPhonebookName );
        }
        return canShow;
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

    _onExtensionsKeywordsFocus(e){
        const oc = BrekekeOperatorConsole.getStaticInstance();
        oc.addDisableKeydownToDialingCounter();
        oc.addDisablePasteToDialingCounter();
    }

    _onExtensionsKeywordsBlur(e){
        const oc = BrekekeOperatorConsole.getStaticInstance();
        oc.subtractDisableKeydownToDialingCounter();
        oc.subtractDisablePasteToDialingCounter();
    }

    _onCallInfosFromYearFocus(e){
        const oc = BrekekeOperatorConsole.getStaticInstance();
        oc.addDisableKeydownToDialingCounter();
        oc.addDisablePasteToDialingCounter();
    }

    _onCallInfosFromYearBlur(e){
        const oc = BrekekeOperatorConsole.getStaticInstance();
        oc.subtractDisableKeydownToDialingCounter();
        oc.subtractDisablePasteToDialingCounter();
    }

    _onCallInfosToYearFocus(e){
        const oc = BrekekeOperatorConsole.getStaticInstance();
        oc.addDisableKeydownToDialingCounter();
        oc.addDisablePasteToDialingCounter();
    }

    _onCallInfosToYearBlur(e){
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
        //let offset = this._phonebookContactInfoArray.length;
        let offset = this._autoDialViewzPhonebookContactArray.length;
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
                const contactInfo2 = new PhonebookContact_AutoDialView_ver2(contactListItem);
                this._autoDialViewzPhonebookContactArray.push(contactInfo2);
            }

            // for (let i = 0; i < contactList.length; i++) {
            //     const contactListItem = contactList[i];
            //     const aid = contactListItem["aid"];
            //     const getContactOptions = {
            //         methodName : "getContact",
            //         methodParams : JSON.stringify({
            //             aid : aid
            //         })
            //     };
            //     const contact = await oc.getPalRestApi().callPalRestApiMethodAsync(getContactOptions).catch((rej) => {
            //         OCUtil.logErrorWithNotification("Failed to get phonebook contact.", i18n.t('Failed_to_get_phone_book_contact'), rej );
            //         contactListCount = -2;
            //         return contactListCount;
            //     });
            //     const contactInfo = new PhonebookContactInfo_AutoDialView_ver2(contact);
            //     this._phonebookContactInfoArray.push(contactInfo);
            //     contactListCount = contactList.length;
            // }
            contactListCount = contactList.length;
        }
        else{
            contactListCount = -1;
        }
        return contactListCount;
    }

   async  _callOrOpenPhonebookCallInfozTelsView( evMouseClick, autodialviewPhonebookContact ){
        const getContactOptions = {
            methodName : "getContact",
            methodParams : JSON.stringify({
                aid : autodialviewPhonebookContact.getAid()
            })
        };
        const oc = BrekekeOperatorConsole.getStaticInstance();
        const contact = await oc.getPalRestApi().callPalRestApiMethodAsync(getContactOptions).catch((rej) => {
            OCUtil.logErrorWithNotification("Failed to get phonebook contact.", i18n.t('Failed_to_get_phone_book_contact'), rej );
            return;
        });
        const contactInfo = new PhonebookContactInfo_AutoDialView_ver2(contact);
        const telInfoArray = contactInfo.getFreezedPhonebookContactInfozTelInfoArray();
        if( !telInfoArray || telInfoArray.length === 0 ){
            this.setLatestContactInfoToAutodialviewPhonebookContact( autodialviewPhonebookContact, contactInfo );
            Notification.info({  message: i18n.t("The_phone_number_is_not_registered") });
        }
        else if( telInfoArray.length === 1 ){
            this._callPhonebookCallInfozTel( evMouseClick,telInfoArray[0], ()=>{
                this.setLatestContactInfoToAutodialviewPhonebookContact( autodialviewPhonebookContact, contactInfo );   //for wait button animation
            });
        }
        else{
            this.setLatestContactInfoToAutodialviewPhonebookContact( autodialviewPhonebookContact, contactInfo );
            this._openPhonebookCallInfozTelsView( contactInfo );
        }
    }

    _callPhonebookCallInfozTel( evMouseClick, pbContactInfozTeIInfo, onDoneFunc ){
        const tel = pbContactInfozTeIInfo.getValue();
        AutoDialView_ver2.onClickCallButtonForAutoDialView( evMouseClick, tel, onDoneFunc  );
        // const oc = BrekekeOperatorConsole.getStaticInstance();
        // oc.setDialingAndMakeCall( tel );
        // oc.abortAutoDialView_ver2();
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

    setLatestContactInfoToAutodialviewPhonebookContact( autodialwiewPhonebookContact, pbContactInfo ){
        autodialwiewPhonebookContact.setLatestPhonebookContactInfo( pbContactInfo );
        this.setState({rerender:true});    //for rerender
    }

    _openPhonebookCallInfozInfoView( pbContactInfo ){
        const pbContactInfozInfoView = PhonebookContactInfozInfoView.getStaticPhonebookContactInfozInfoViewInstance();
        const pbContactInfozTelsView = PhonebookContactInfozTelsView.getStaticPhonebookContactInfozTelsViewInstance();
        pbContactInfozTelsView.closePhonebookContactInfozTelsView( () => {
            pbContactInfozInfoView.closePhonebookContactInfozInfoView(  () => pbContactInfozInfoView.openPhonebookContactInfozInfoView(pbContactInfo) );
        });
    }

    async _openPhonebookCallInfozInfoView2( autodialviewPhonebookContact ){
        const getContactOptions = {
            methodName : "getContact",
            methodParams : JSON.stringify({
                 aid : autodialviewPhonebookContact.getAid()
             })
        };
        const oc = BrekekeOperatorConsole.getStaticInstance();
         const contact = await oc.getPalRestApi().callPalRestApiMethodAsync(getContactOptions).catch((rej) => {
            OCUtil.logErrorWithNotification("Failed to get phonebook contact.", i18n.t('Failed_to_get_phone_book_contact'), rej );
            return;
         });
         const contactInfo = new PhonebookContactInfo_AutoDialView_ver2(contact);
         this.setLatestContactInfoToAutodialviewPhonebookContact( autodialviewPhonebookContact, contactInfo );
        const pbContactInfozInfoView = PhonebookContactInfozInfoView.getStaticPhonebookContactInfozInfoViewInstance();
        const pbContactInfozTelsView = PhonebookContactInfozTelsView.getStaticPhonebookContactInfozTelsViewInstance();
        pbContactInfozTelsView.closePhonebookContactInfozTelsView( () => {
            pbContactInfozInfoView.closePhonebookContactInfozInfoView(  () => pbContactInfozInfoView.openPhonebookContactInfozInfoView(contactInfo) );
        });
    }

    async _deleteContact2(  autodialviewPhonebookContact ){
        const getContactOptions = {
            methodName : "getContact",
            methodParams : JSON.stringify({
                aid : autodialviewPhonebookContact.getAid()
            })
        };
        const oc = BrekekeOperatorConsole.getStaticInstance();
        const contact = await oc.getPalRestApi().callPalRestApiMethodAsync(getContactOptions).catch((rej) => {
            OCUtil.logErrorWithNotification("Failed to get phonebook contact.", i18n.t('Failed_to_get_phone_book_contact'), rej );
            return;
        });
        const pbContactInfo = new PhonebookContactInfo_AutoDialView_ver2(contact);
        this.setLatestContactInfoToAutodialviewPhonebookContact( autodialviewPhonebookContact, pbContactInfo );
        const isShared = pbContactInfo.getIsShared() === true;
        const isAdmin = oc.getIsAdmin();
        const isDeletable = isShared === false || ( isShared === true && isAdmin === true );
        if( isDeletable !== true  ){
            const aid = pbContactInfo.getAid();
            console.warn("You do not have permission to delete phone book contact.. aid=" + aid);
            Notification.warning({
                message: i18n.t("You_do_not_have_permission_to_delete_phone_book_contact"),
            });
            return;
        }

        const aid = pbContactInfo.getAid();

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
            this._resetPhonebookContactInfoArrayAsync( this._latestSearchPhonebookKeywords, this._latestSearchPhonebookShared, this._latestSearchPhonebookName );
        };

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
                    this._resetPhonebookContactInfoArrayAsync( this._latestSearchPhonebookKeywords, this._latestSearchPhonebookShared, this._latestSearchPhonebookName );
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

    // _deleteContact(  pbContactInfo ){
    //     const oc = BrekekeOperatorConsole.getStaticInstance();
    //     const isShared = pbContactInfo.getIsShared() === true;
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
    //
    //     const aid = pbContactInfo.getAid();
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
    //         this._resetPhonebookContactInfoArrayAsync( this._latestSearchPhonebookKeywords, this._latestSearchPhonebookShared, this._latestSearchPhonebookName );
    //     };
    //
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
    //                 this._resetPhonebookContactInfoArrayAsync( this._latestSearchPhonebookKeywords, this._latestSearchPhonebookShared, this._latestSearchPhonebookName );
    //             }
    //             else{
    //                 //const arFailed = ret["failed"];
    //                 failFunc();
    //             }
    //         },
    //         onFailFunction : (resOrError) => failFunc( resOrError )
    //     };
    //     oc.getPalRestApi().callPalRestApiMethod( deleteContactOptions );
    //
    // }

    _openAddContactView(){
        const pbContactInfozInfoView = PhonebookContactInfozInfoView.getStaticPhonebookContactInfozInfoViewInstance();
        const pbContactInfozTelsView = PhonebookContactInfozTelsView.getStaticPhonebookContactInfozTelsViewInstance();
        pbContactInfozTelsView.closePhonebookContactInfozTelsView( () => {
            pbContactInfozInfoView.closePhonebookContactInfozInfoView(  () => pbContactInfozInfoView.openPhonebookContactInfozInfoView() );
        });
    }

    // _toggleAutoDialViewRightStyleForBug(){  //!forBug
    //     //const eAutoDialView = document.getElementsByClassName("autoDialView")[0];
    //     if( this._autoDialViewRightStyle === "0" ){
    //         this._autoDialViewRightStyle = "100px";
    //     }
    //     else {
    //         this._autoDialViewRightStyle = "0";
    //     }
    //     //eAutoDialView.style.right = this._autoDialViewPrevRight;
    // }
    //
    // _resetAutoDialViewRightStyleToElementForBug(){  //!forBug
    //     this._toggleAutoDialViewRightStyleForBug();
    //     const eAutoDialView = document.getElementsByClassName("autoDialView")[0];
    //     setTimeout( ()=> {
    //         eAutoDialView.style.right = this._autoDialViewRightStyle;
    //     },5000);
    // }

    _onRecentShowDetailChange(e){
        const eRecentShowDetail = document.getElementById("recentShowDetail_brOC_AutoDialView_ver2");
        const checked = eRecentShowDetail.checked;
        //this._toggleAutoDialViewRightStyleForBug();
        this.setState({recentShowDetailChecked:checked}, ()=>{
            // //!forBug
            // setTimeout(
            //     () => this.setState({recentShowDetailChecked:!checked}, ()=>{
            //         setTimeout( ()=> this.setState( {recentShowDetailChecked:checked} ),1);
            //     })
            //     ,1
            // );
            // //!forBug
            // setTimeout( () =>
            // {
            //     this.setState({recentShowDetailChecked: !checked}, () => {
            //         setTimeout( () => this.setState({recentShowDetailChecked: checked}
            //             // ,() => {
            //             //     this.setState({recentShowDetailChecked: !checked}, () => {
            //             //         setTimeout(() => this.setState({recentShowDetailChecked: checked}), 5);
            //             //     });
            //             // }
            //         )
            //         ,5);
            //     });
            // },5);


            // this.setState({recentShowDetailChecked:!checked}, ()=>{
            //     this.setState({ recentShowDetailChecked:checked });
            // });
        });
    }

    _onChangeOnlySharedContacts( checked, ev ){
        const keywords = this._getPhonebookKeywordsValue();
        this._getContactList( keywords, checked );
    }

    static onClickCallButtonForAutoDialView( evMouseClick, partyNumber, onDoneFunc ){
        const oc = BrekekeOperatorConsole.getStaticInstance();
        const sysData = oc.getSystemSettingsData();
        const b = sysData.getAutoDialOneTouchCall();
        if( b === true ) {
            oc.abortAutoDialView_ver2();
            //this.props.operatorConsoleAsParent.setDialingAndMakeCall2( callNo, this.props.currentCallIndex, this.props.callIds, this.props.callById );

            const bHasActiaveCall = !!oc.getCurrentCallInfo();
            //const dialing = oc.getDialing();
            //if ( dialing && dialing.length !== 0  && bHasActiaveCall) {
            if (  bHasActiaveCall) {
                //show transfer method modal.
                const runtimeScreenView = oc.getCurrentRuntimeScreenView_ver2();
                runtimeScreenView.setIsShowSelectCallingMethodModal(true, partyNumber );
            }
            else {
                oc.setDialingAndMakeCall2(partyNumber);
            }

        }
        else{
            //flash once call button.
            evMouseClick.target.classList.add("kbc-button-success-flash-once");
            setTimeout( ()=>{
                evMouseClick.target.classList.remove("kbc-button-success-flash-once");
                //oc.abortAutoDialView_ver2();
                if( onDoneFunc ){
                    onDoneFunc();
                }
            }, 1000 );             //!depend. css animation time
            oc.setDialing( partyNumber, false );
        }

    }

    _onClickStartDatetimeCallHistoryCallButton( e, partyNumber ){
        AutoDialView_ver2.onClickCallButtonForAutoDialView( e, partyNumber );
    }

    _getDatetimeDescCallInfoArrayForDisplay(){
        const oc = BrekekeOperatorConsole.getStaticInstance();
        const callHistory2 = oc.getCallHistory2();
        const callInfoArray = callHistory2.getCallHistory2CallInfoArray();

        const systemSettingsData = oc.getSystemSettingsData();
        callHistory2.sortIfNeed( CallHistory2.RECENT_DISPLAY_ORDERS.ADD_DATETIME_DESC  );

        const dateNow = new Date();
        const iCurrentYear = dateNow.getFullYear();

        //Date from begin.
        //
        //const eFromYear = document.getElementById("brOC_autoDialView_ver2_callInfos_fromYear");
        //const sFromYear = eFromYear.value;
        const sFromYear = this._callInfosFromYear;
        let iFromYear = iCurrentYear;
        try{
            iFromYear = parseInt( sFromYear );
        }
        catch( err ){
            //console.log("AutoDialView fromYear: Failed to parseInt. fromYear(String)=" + sFromYear );
        }
        if( isNaN( iFromYear ) ){
            iFromYear = iCurrentYear;
        }
        else if( iFromYear < 0 ){
            iFromYear = 0;
        }
        else if( iFromYear > MAX_DATE_YEAR ){
            iFromYear = MAX_DATE_YEAR;
        }

        // const eFromMonth = document.getElementById("brOC_autoDialView_ver2_callInfos_fromMonth");
        // const sFromMonth = eFromMonth.value;
        const sFromMonth = this._callInfosFromMonth;
        let iFromMonth = 1;
        try{
            iFromMonth = parseInt( sFromMonth );
        }
        catch( err ){
            //console.log("AutoDialView fromMonth: Failed to parseInt. fromMonth(String)=" + sFromMonth );
        }
        if( isNaN( iFromMonth ) ){
            iFromMonth = 1;
        }
        else if( iFromMonth < 1 ){
            iFromMonth = 1;
        }
        else if( iFromMonth > 12 ){
            iFromMonth = 12;
        }

        // const eFromDay = document.getElementById("brOC_autoDialView_ver2_callInfos_fromDay");
        // const sFromDay = eFromDay.value;
        const sFromDay = this._callInfosFromDay;
        let iFromDay = 1;
        try{
            iFromDay = parseInt( sFromDay );
        }
        catch( err ){
            //console.log("AutoDialView fromDay: Failed to parseInt. fromDay(String)=" + sFromDay );
        }
        if( isNaN( iFromDay ) ){
            iFromDay = 1;
        }
        else if( iFromDay < 1 ){
            iFromDay = 1;
        }
        else if( iFromDay > 31 ){
            iFromDay = 31;
        }


        // const eFromHour = document.getElementById("brOC_autoDialView_ver2_callInfos_fromHour");
        // const sFromHour = eFromHour.value;
        const sFromHour = this._callInfosFromHour;
        let iFromHour = 0;
        try{
            iFromHour = parseInt( sFromHour );
        }
        catch( err ){
            //console.log("AutoDialView fromHour: Failed to parseInt. fromHour(String)=" + sFromHour );
        }
        if( isNaN( iFromHour ) ){
            iFromHour = 0;
        }
        else if( iFromHour < 0 ){
            iFromHour = 0;
        }
        else if( iFromHour > 23 ){
            iFromHour = 23;
        }

        // const eFromMinute = document.getElementById("brOC_autoDialView_ver2_callInfos_fromMinute");
        // const sFromMinute = eFromMinute.value;
        const sFromMinute = this._callInfosFromMinute;
        let iFromMinute = 0;
        try{
            iFromMinute = parseInt( sFromMinute );
        }
        catch( err ){
            //console.log("AutoDialView fromMinute: Failed to parseInt. fromMinute(String)=" + sFromMinute );
        }
        if( isNaN( iFromMinute ) ){
            iFromMinute = 0;
        }
        else if( iFromMinute < 0 ){
            iFromMinute = 0;
        }
        else if( iFromMinute > 59 ){
            iFromMinute = 59;
        }
        //
        //Date from end.

        //Date to begin.
        //
        //const eToYear = document.getElementById("brOC_autoDialView_ver2_callInfos_toYear");
        //const sToYear = eToYear.value;
        const sToYear = this._callInfosToYear;
        let iToYear = iCurrentYear;
        try{
            iToYear = parseInt( sToYear );
        }
        catch( err ){
            //console.log("AutoDialView toYear: Failed to parseInt. toYear(String)=" + sToYear );
        }
        if( isNaN( iToYear ) ){
            iToYear = iCurrentYear;
        }
        else if( iToYear < 0 ){
            iToYear = 0;
        }
        else if( iToYear > MAX_DATE_YEAR ){
            iToYear = MAX_DATE_YEAR;
        }

        // const eToMonth = document.getElementById("brOC_autoDialView_ver2_callInfos_toMonth");
        // const sToMonth = eToMonth.value;
        const sToMonth = this._callInfosToMonth;
        let iToMonth = 12;
        try{
            iToMonth = parseInt( sToMonth );
        }
        catch( err ){
            //console.log("AutoDialView toMonth: Failed to parseInt. toMonth(String)=" + sToMonth );
        }
        if( isNaN( iToMonth ) ){
            iToMonth = 12;
        }
        else if( iToMonth < 1 ){
            iToMonth = 1;
        }
        else if( iToMonth > 12 ){
            iToMonth = 12;
        }

        // const eToDay = document.getElementById("brOC_autoDialView_ver2_callInfos_toDay");
        // const sToDay = eToDay.value;
        const sToDay = this._callInfosToDay;
        let iToDay = 31;
        try{
            iToDay = parseInt( sToDay );
        }
        catch( err ){
            //console.log("AutoDialView toDay: Failed to parseInt. toDay(String)=" + sToDay );
        }
        if( isNaN( iToDay ) ){
            iToDay = 31;
        }
        else if( iToDay < 1 ){
            iToDay = 1;
        }
        else if( iToDay > 31 ){
            iToDay = 31;
        }

        // const eToHour = document.getElementById("brOC_autoDialView_ver2_callInfos_toHour");
        // const sToHour = eToHour.value;
        const sToHour = this._callInfosToHour;
        let iToHour = 23;
        try{
            iToHour = parseInt( sToHour );
        }
        catch( err ){
            //console.log("AutoDialView toHour: Failed to parseInt. toHour(String)=" + sToHour );
        }
        if( isNaN( iToHour ) ){
            iToHour = 23;
        }
        else if( iToHour < 0 ){
            iToHour = 0;
        }
        else if( iToHour > 23){
            iToHour = 23;
        }

        // const eToMinute = document.getElementById("brOC_autoDialView_ver2_callInfos_toMinute");
        // const sToMinute = eToMinute.value;
        const sToMinute = this._callInfosToMinute;
        let iToMinute = 59;
        try{
            iToMinute = parseInt( sToMinute );
        }
        catch( err ){
            //console.log("AutoDialView toMinute: Failed to parseInt. toMinute(String)=" + sToMinute );
        }
        if( isNaN( iToMinute ) ){
            iToMinute = 59;
        }
        else if( iToMinute < 0 ){
            iToMinute = 0;
        }
        else if( iToMinute > 59){
            iToMinute = 59;
        }
        //
        //Date to end.

        const dateFrom = new Date( iFromYear, iFromMonth - 1, iFromDay, iFromHour, iFromMinute );
        const bChangeFrom = this._setBeforeMaxDateToDayDate( dateFrom, iFromMonth );

        const dateTo = new Date( iToYear, iToMonth -1, iToDay, iToHour, iToMinute, 59, MAX_DATE_MILLISECONDS );
        const bChangeTo = this._setBeforeMaxDateToDayDate( dateTo, iToMonth );

        const callInfoArrayDateFiltered = new Array();
        if( dateFrom > dateTo ){
            //console.log();
        }
        else if( callInfoArray ){
            for (let i = 0; i < callInfoArray.length; i++) {
                const callInfo = callInfoArray[i];
                const dStartedAt = new Date(callInfo.getAddCallMillisTime())  //!overhead //!cost
                if( (dStartedAt < dateFrom ||  dStartedAt > dateTo) === false ){
                    callInfoArrayDateFiltered.push( callInfo);
                }
            }
        }

        const recentDisplayCount = systemSettingsData.getAutoDialMaxDisplayCount();
        const callInfoArrayForDisplay = callInfoArrayDateFiltered.slice(0, recentDisplayCount);
        return callInfoArrayForDisplay;
    }

    _setBeforeMaxDateToDayDate( date, iWishMonth ){
        const iDateWishMonth = iWishMonth - 1;
        const iMonth = date.getMonth();
        if( iMonth === iDateWishMonth ){
            return false;
        }
        else{
            const dateBefore = new Date(date.getFullYear(), date.getMonth(), date.getDate());
            for( let day = 1;; day++ ) {
                dateBefore.setDate(date.getDate() - day);
                if (dateBefore.getMonth() == iDateWishMonth) {
                    date.setFullYear( dateBefore.getFullYear());
                    date.setMonth( dateBefore.getMonth());
                    date.setDate( dateBefore.getDate());
                    date.setHours( 23 );
                    date.setMinutes( 59 );
                    date.setSeconds( 59 );
                    date.setMilliseconds( MAX_DATE_MILLISECONDS  );
                    break;
                }
            }
            return true;
        }
    }

    componentDidMount(){
        // this._callInfosFromYear = "0000";
        // this._callInfosFromMonth = "1";
        // this._callInfosFromDay = "1";
        // this._callInfosFromHour = "0";
        // this._callInfosFromMinute = "0";
        //
        // this._callInfosToYear = "9999";
        // this._callInfosToMonth = "12";
        // this._callInfosToDay = "31";
        // this._callInfosToHour = "23";
        // this._callInfosToMinute = "59";

        const dateNow = new Date();
        const sFullYear = dateNow.getFullYear();
        const sMonth = (dateNow.getMonth() + 1).toString();
        const sDay = dateNow.getDate().toString();

        this._callInfosFromYear = sFullYear;
        this._callInfosFromMonth = sMonth;
        this._callInfosFromDay = sDay;
        this._callInfosFromHour = "0";
        this._callInfosFromMinute = "0";

        this._callInfosToYear = sFullYear;
        this._callInfosToMonth = sMonth;
        this._callInfosToDay = sDay;
        this._callInfosToHour = "23";
        this._callInfosToMinute = "59";
    }

    _onClickForGetDatetimeDescCallInfoArrayForDisplay(){
        this._callInfoArrayForDisplay = null;   //Display spin
        setTimeout( () =>{  //async
            this._callInfoArrayForDisplay = this._getDatetimeDescCallInfoArrayForDisplay();
            this.setState({rerender:true});
        }, 1);
    }

    render() {
        if (!this.props.isVisible) {
            return (null);
        }


        const oc = BrekekeOperatorConsole.getStaticInstance();
        const language = oc.getLoggedinLanguage();
        const callHistory2 = oc.getCallHistory2();
        const systemSettingsData = oc.getSystemSettingsData();
        callHistory2.sortIfNeed( systemSettingsData.getAutoDialRecentDisplayOrder()  ); //!bad Not a render logic
        const recentDisplayOrder = systemSettingsData.getAutoDialRecentDisplayOrder();
        const recentDisplayCount = systemSettingsData.getAutoDialMaxDisplayCount();

        //!bad Not a render logic
        if( !this._callInfoArrayForDisplay && recentDisplayOrder === CallHistory2.RECENT_DISPLAY_ORDERS.ADD_DATETIME_DESC ){
            setTimeout( () =>{
                this._callInfoArrayForDisplay = this._getDatetimeDescCallInfoArrayForDisplay();
                this.setState({rerender:true});
            },1);
        }

        // const eRecentShowDetail = document.getElementById("recentShowDetail_brOC_AutoDialView_ver2");
        // const bRecentShowDetail = eRecentShowDetail.checked;
        return (<>
            <PhonebookContactInfozInfoView/>
            <PhonebookContactInfozTelsView/>
            {/*<div ref={this._AutoDialViewRef} className="brOCReset autoDialView">*/}
            {/*<div className="brOCReset autoDialView" style={{right:this._autoDialViewRightStyle}}>*/}
            <div className="brOCReset autoDialView">
                {/*<table className={"defaultBorderWithRadius outsidePaddingWithoutBorderRadius"} data-br-name="brOC_AutoDialView_ver2_rootTable">*/}
                <table className={"defaultBorderWithRadius outsidePaddingWithoutBorderRadius"} style={{marginLeft:"auto"}}>
                    <tbody>
                    <tr>
                        <td>
                            <table className="defaultTranparentTable defaultSpaceBottom">
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
                                    <td style={{textAlign: "right", verticalAlign: "top"}}>
                                        <FontAwesomeIcon icon="far fa-window-close"
                                                         onClick={this._onClickClose.bind(this)}
                                                         className="closeFontAwesomeIcon"/>
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
                                                <li className="tab tab-A is-active" id="tabA_AutoDialView_ver2_brOC"
                                                    onClick={(e) => this._tabSwitchAndSortIfNeedCallHistory2(e.target)}>{i18n.t("Recent")}</li>
                                                <li className="tab tab-B"
                                                    onClick={(e) => {
                                                        const eTarget2 = document.getElementById("tabA_AutoDialView_ver2_brOC");
                                                        this.tabSwitch(e.target, eTarget2 );
                                                        if( this._filteredExtensionArray === null ) {   //First time
                                                            setTimeout( () => {
                                                                    this._filteredExtensionArray = this._getFilteredExtensionArray();
                                                                    this.setState({rerender: true});
                                                                },5);
                                                        }
                                                    }}>{i18n.t("User")}</li>
                                                <li className="tab tab-C" id="tabB_AutoDialView_ver2_brOC"
                                                    onClick={(e) => {
                                                        // const eTarget2 = document.getElementById("tabA_AutoDialView_ver2_brOC");
                                                        // this.tabSwitch(e, eTarget2 );
                                                        this.tabSwitch( e.target, null );
                                                        //if( this._phonebookContactInfoArray === null ){
                                                        if (this.reshowContactList() === false) {
                                                            this._resetPhonebookContactInfoArrayAsync();
                                                        }
                                                        //}
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
                                                                                        onClick={(e) => {
                                                                                            AutoDialView_ver2.onClickCallButtonForAutoDialView(e, partyNumber);
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
                                                        <table style={{border: "0"}}
                                                               className={"defaultContentTable"}>
                                                            <tbody>
                                                            <tr>
                                                                {language === "ja" && (
                                                                    <>
                                                                        <td>
                                                                            <div style={{
                                                                                display: "flex",
                                                                                alignItems: "center"
                                                                            }}>
                                                                                <Input
                                                                                    id="brOC_autoDialView_ver2_callInfos_fromYear"
                                                                                    maxLength={4}
                                                                                    // placeholder={i18n.t('Year')}
                                                                                    allowClear
                                                                                    defaultValue={this._callInfosFromYear}
                                                                                    onFocus={(e) => this._onCallInfosFromYearFocus(e)}
                                                                                    onBlur={(e) => this._onCallInfosFromYearBlur(e)}
                                                                                    style={{
                                                                                        width: "100px",
                                                                                        size: "middle"
                                                                                    }}
                                                                                    onChange={(val) => this._callInfosFromYear = val}
                                                                                />
                                                                                <span style={{margin:"0 4px 0 2px"}}>{i18n.t("Year")}</span>
                                                                                <Select
                                                                                    id="brOC_autoDialView_ver2_callInfos_fromMonth"
                                                                                    style={{width: "60px"}} size="large"
                                                                                    onChange={(val) => this._callInfosFromMonth = val}
                                                                                    defaultValue={this._callInfosFromMonth}
                                                                                >
                                                                                    <Select.Option
                                                                                        value={1}>1</Select.Option>
                                                                                    <Select.Option
                                                                                        value={2}>2</Select.Option>
                                                                                    <Select.Option
                                                                                        value={3}>3</Select.Option>
                                                                                    <Select.Option
                                                                                        value={4}>4</Select.Option>
                                                                                    <Select.Option
                                                                                        value={5}>5</Select.Option>
                                                                                    <Select.Option
                                                                                        value={6}>6</Select.Option>
                                                                                    <Select.Option
                                                                                        value={7}>7</Select.Option>
                                                                                    <Select.Option
                                                                                        value={8}>8</Select.Option>
                                                                                    <Select.Option
                                                                                        value={9}>9</Select.Option>
                                                                                    <Select.Option
                                                                                        value={10}>10</Select.Option>
                                                                                    <Select.Option
                                                                                        value={11}>11</Select.Option>
                                                                                    <Select.Option
                                                                                        value={12}>12</Select.Option>
                                                                                </Select>
                                                                                <span style={{margin:"0 4px 0 2px"}}>{i18n.t("Month")}</span>
                                                                                <Select
                                                                                    id="brOC_autoDialView_ver2_callInfos_fromDay"
                                                                                    style={{width: "60px"}} size="large"
                                                                                    onChange={(val) => this._callInfosFromDay = val}
                                                                                    defaultValue={this._callInfosFromDay}
                                                                                >
                                                                                    <Select.Option
                                                                                        value={1}>1</Select.Option>
                                                                                    <Select.Option
                                                                                        value={2}>2</Select.Option>
                                                                                    <Select.Option
                                                                                        value={3}>3</Select.Option>
                                                                                    <Select.Option
                                                                                        value={4}>4</Select.Option>
                                                                                    <Select.Option
                                                                                        value={5}>5</Select.Option>
                                                                                    <Select.Option
                                                                                        value={6}>6</Select.Option>
                                                                                    <Select.Option
                                                                                        value={7}>7</Select.Option>
                                                                                    <Select.Option
                                                                                        value={8}>8</Select.Option>
                                                                                    <Select.Option
                                                                                        value={9}>9</Select.Option>
                                                                                    <Select.Option
                                                                                        value={10}>10</Select.Option>
                                                                                    <Select.Option
                                                                                        value={11}>11</Select.Option>
                                                                                    <Select.Option
                                                                                        value={12}>12</Select.Option>
                                                                                    <Select.Option
                                                                                        value={13}>13</Select.Option>
                                                                                    <Select.Option
                                                                                        value={14}>14</Select.Option>
                                                                                    <Select.Option
                                                                                        value={15}>15</Select.Option>
                                                                                    <Select.Option
                                                                                        value={16}>16</Select.Option>
                                                                                    <Select.Option
                                                                                        value={17}>17</Select.Option>
                                                                                    <Select.Option
                                                                                        value={18}>18</Select.Option>
                                                                                    <Select.Option
                                                                                        value={19}>19</Select.Option>
                                                                                    <Select.Option
                                                                                        value={20}>20</Select.Option>
                                                                                    <Select.Option
                                                                                        value={21}>21</Select.Option>
                                                                                    <Select.Option
                                                                                        value={22}>22</Select.Option>
                                                                                    <Select.Option
                                                                                        value={23}>23</Select.Option>
                                                                                    <Select.Option
                                                                                        value={24}>24</Select.Option>
                                                                                    <Select.Option
                                                                                        value={25}>25</Select.Option>
                                                                                    <Select.Option
                                                                                        value={26}>26</Select.Option>
                                                                                    <Select.Option
                                                                                        value={27}>27</Select.Option>
                                                                                    <Select.Option
                                                                                        value={28}>28</Select.Option>
                                                                                    <Select.Option
                                                                                        value={29}>29</Select.Option>
                                                                                    <Select.Option
                                                                                        value={30}>30</Select.Option>
                                                                                    <Select.Option
                                                                                        value={31}>31</Select.Option>
                                                                                </Select>
                                                                                <div style={{margin:"0 6px 0 4px"}}>{i18n.t("Day")}</div>
                                                                                <Select
                                                                                    id="brOC_autoDialView_ver2_callInfos_fromHour"
                                                                                    style={{width: "60px"}} size="large"
                                                                                    onChange={(val) => this._callInfosFromHour = val}
                                                                                    defaultValue={this._callInfosFromHour}
                                                                                >
                                                                                    <Select.Option
                                                                                        value={0}>0</Select.Option>
                                                                                    <Select.Option
                                                                                        value={1}>1</Select.Option>
                                                                                    <Select.Option
                                                                                        value={2}>2</Select.Option>
                                                                                    <Select.Option
                                                                                        value={3}>3</Select.Option>
                                                                                    <Select.Option
                                                                                        value={4}>4</Select.Option>
                                                                                    <Select.Option
                                                                                        value={5}>5</Select.Option>
                                                                                    <Select.Option
                                                                                        value={6}>6</Select.Option>
                                                                                    <Select.Option
                                                                                        value={7}>7</Select.Option>
                                                                                    <Select.Option
                                                                                        value={8}>8</Select.Option>
                                                                                    <Select.Option
                                                                                        value={9}>9</Select.Option>
                                                                                    <Select.Option
                                                                                        value={10}>10</Select.Option>
                                                                                    <Select.Option
                                                                                        value={11}>11</Select.Option>
                                                                                    <Select.Option
                                                                                        value={12}>12</Select.Option>
                                                                                    <Select.Option
                                                                                        value={13}>13</Select.Option>
                                                                                    <Select.Option
                                                                                        value={14}>14</Select.Option>
                                                                                    <Select.Option
                                                                                        value={15}>15</Select.Option>
                                                                                    <Select.Option
                                                                                        value={16}>16</Select.Option>
                                                                                    <Select.Option
                                                                                        value={17}>17</Select.Option>
                                                                                    <Select.Option
                                                                                        value={18}>18</Select.Option>
                                                                                    <Select.Option
                                                                                        value={19}>19</Select.Option>
                                                                                    <Select.Option
                                                                                        value={20}>20</Select.Option>
                                                                                    <Select.Option
                                                                                        value={21}>21</Select.Option>
                                                                                    <Select.Option
                                                                                        value={22}>22</Select.Option>
                                                                                    <Select.Option
                                                                                        value={23}>23</Select.Option>
                                                                                </Select>
                                                                                <span style={{margin:"0 4px 0 4px"}}>:</span>
                                                                                <Select
                                                                                    id="brOC_autoDialView_ver2_callInfos_fromMinute"
                                                                                    style={{width: "60px"}} size="large"
                                                                                    onChange={(val) => this._callInfosFromMinute = val}
                                                                                    defaultValue={this._callInfosFromMinute}
                                                                                >
                                                                                    <Select.Option
                                                                                        value={0}>0</Select.Option>
                                                                                    <Select.Option
                                                                                        value={1}>1</Select.Option>
                                                                                    <Select.Option
                                                                                        value={2}>2</Select.Option>
                                                                                    <Select.Option
                                                                                        value={3}>3</Select.Option>
                                                                                    <Select.Option
                                                                                        value={4}>4</Select.Option>
                                                                                    <Select.Option
                                                                                        value={5}>5</Select.Option>
                                                                                    <Select.Option
                                                                                        value={6}>6</Select.Option>
                                                                                    <Select.Option
                                                                                        value={7}>7</Select.Option>
                                                                                    <Select.Option
                                                                                        value={8}>8</Select.Option>
                                                                                    <Select.Option
                                                                                        value={9}>9</Select.Option>
                                                                                    <Select.Option
                                                                                        value={10}>10</Select.Option>
                                                                                    <Select.Option
                                                                                        value={11}>11</Select.Option>
                                                                                    <Select.Option
                                                                                        value={12}>12</Select.Option>
                                                                                    <Select.Option
                                                                                        value={13}>13</Select.Option>
                                                                                    <Select.Option
                                                                                        value={14}>14</Select.Option>
                                                                                    <Select.Option
                                                                                        value={15}>15</Select.Option>
                                                                                    <Select.Option
                                                                                        value={16}>16</Select.Option>
                                                                                    <Select.Option
                                                                                        value={17}>17</Select.Option>
                                                                                    <Select.Option
                                                                                        value={18}>18</Select.Option>
                                                                                    <Select.Option
                                                                                        value={19}>19</Select.Option>
                                                                                    <Select.Option
                                                                                        value={20}>20</Select.Option>
                                                                                    <Select.Option
                                                                                        value={21}>21</Select.Option>
                                                                                    <Select.Option
                                                                                        value={22}>22</Select.Option>
                                                                                    <Select.Option
                                                                                        value={23}>23</Select.Option>
                                                                                    <Select.Option
                                                                                        value={24}>24</Select.Option>
                                                                                    <Select.Option
                                                                                        value={25}>25</Select.Option>
                                                                                    <Select.Option
                                                                                        value={26}>26</Select.Option>
                                                                                    <Select.Option
                                                                                        value={27}>27</Select.Option>
                                                                                    <Select.Option
                                                                                        value={28}>28</Select.Option>
                                                                                    <Select.Option
                                                                                        value={29}>29</Select.Option>
                                                                                    <Select.Option
                                                                                        value={30}>30</Select.Option>
                                                                                    <Select.Option
                                                                                        value={31}>31</Select.Option>
                                                                                    <Select.Option
                                                                                        value={32}>32</Select.Option>
                                                                                    <Select.Option
                                                                                        value={33}>33</Select.Option>
                                                                                    <Select.Option
                                                                                        value={34}>34</Select.Option>
                                                                                    <Select.Option
                                                                                        value={35}>35</Select.Option>
                                                                                    <Select.Option
                                                                                        value={36}>36</Select.Option>
                                                                                    <Select.Option
                                                                                        value={37}>37</Select.Option>
                                                                                    <Select.Option
                                                                                        value={38}>38</Select.Option>
                                                                                    <Select.Option
                                                                                        value={39}>39</Select.Option>
                                                                                    <Select.Option
                                                                                        value={40}>40</Select.Option>
                                                                                    <Select.Option
                                                                                        value={41}>41</Select.Option>
                                                                                    <Select.Option
                                                                                        value={42}>42</Select.Option>
                                                                                    <Select.Option
                                                                                        value={43}>43</Select.Option>
                                                                                    <Select.Option
                                                                                        value={44}>44</Select.Option>
                                                                                    <Select.Option
                                                                                        value={45}>45</Select.Option>
                                                                                    <Select.Option
                                                                                        value={46}>46</Select.Option>
                                                                                    <Select.Option
                                                                                        value={47}>47</Select.Option>
                                                                                    <Select.Option
                                                                                        value={48}>48</Select.Option>
                                                                                    <Select.Option
                                                                                        value={49}>49</Select.Option>
                                                                                    <Select.Option
                                                                                        value={50}>50</Select.Option>
                                                                                    <Select.Option
                                                                                        value={51}>51</Select.Option>
                                                                                    <Select.Option
                                                                                        value={52}>52</Select.Option>
                                                                                    <Select.Option
                                                                                        value={53}>53</Select.Option>
                                                                                    <Select.Option
                                                                                        value={54}>54</Select.Option>
                                                                                    <Select.Option
                                                                                        value={55}>55</Select.Option>
                                                                                    <Select.Option
                                                                                        value={56}>56</Select.Option>
                                                                                    <Select.Option
                                                                                        value={57}>57</Select.Option>
                                                                                    <Select.Option
                                                                                        value={58}>58</Select.Option>
                                                                                    <Select.Option
                                                                                        value={59}>59</Select.Option>
                                                                                </Select>
                                                                                <span style={{margin:"0 4px 0 4px"}}>~</span>
                                                                                <Input
                                                                                    id="brOC_autoDialView_ver2_callInfos_toYear"
                                                                                    maxLength={4}
                                                                                    //placeholder={i18n.t('Year')}
                                                                                    allowClear
                                                                                    onFocus={(e) => this._onCallInfosToYearFocus(e)}
                                                                                    onBlur={(e) => this._onCallInfosToYearBlur(e)}
                                                                                    style={{
                                                                                        width: "100px",
                                                                                        size: "middle"
                                                                                    }}
                                                                                    defaultValue={this._callInfosToYear}
                                                                                    onChange={(val) => this._callInfosToYear = val}
                                                                                />
                                                                                <span style={{margin:"0 4px 0 2px"}}>{i18n.t("Year")}</span>
                                                                                <Select
                                                                                    id="brOC_autoDialView_ver2_callInfos_toMonth"
                                                                                    style={{width: "60px"}} size="large"
                                                                                    onChange={(val) => this._callInfosToMonth = val}
                                                                                    defaultValue={this._callInfosToMonth}
                                                                                >
                                                                                    <Select.Option
                                                                                        value={1}>1</Select.Option>
                                                                                    <Select.Option
                                                                                        value={2}>2</Select.Option>
                                                                                    <Select.Option
                                                                                        value={3}>3</Select.Option>
                                                                                    <Select.Option
                                                                                        value={4}>4</Select.Option>
                                                                                    <Select.Option
                                                                                        value={5}>5</Select.Option>
                                                                                    <Select.Option
                                                                                        value={6}>6</Select.Option>
                                                                                    <Select.Option
                                                                                        value={7}>7</Select.Option>
                                                                                    <Select.Option
                                                                                        value={8}>8</Select.Option>
                                                                                    <Select.Option
                                                                                        value={9}>9</Select.Option>
                                                                                    <Select.Option
                                                                                        value={10}>10</Select.Option>
                                                                                    <Select.Option
                                                                                        value={11}>11</Select.Option>
                                                                                    <Select.Option
                                                                                        value={12}>12</Select.Option>
                                                                                </Select>
                                                                                <span style={{margin:"0 4px 0 2px"}}>{i18n.t("Month")}</span>
                                                                                <Select
                                                                                    id="brOC_autoDialView_ver2_callInfos_toDay"
                                                                                    style={{width: "60px"}} size="large"
                                                                                    onChange={(val) => this._callInfosToDay = val}
                                                                                    defaultValue={this._callInfosToDay}
                                                                                >
                                                                                    <Select.Option
                                                                                        value={1}>1</Select.Option>
                                                                                    <Select.Option
                                                                                        value={2}>2</Select.Option>
                                                                                    <Select.Option
                                                                                        value={3}>3</Select.Option>
                                                                                    <Select.Option
                                                                                        value={4}>4</Select.Option>
                                                                                    <Select.Option
                                                                                        value={5}>5</Select.Option>
                                                                                    <Select.Option
                                                                                        value={6}>6</Select.Option>
                                                                                    <Select.Option
                                                                                        value={7}>7</Select.Option>
                                                                                    <Select.Option
                                                                                        value={8}>8</Select.Option>
                                                                                    <Select.Option
                                                                                        value={9}>9</Select.Option>
                                                                                    <Select.Option
                                                                                        value={10}>10</Select.Option>
                                                                                    <Select.Option
                                                                                        value={11}>11</Select.Option>
                                                                                    <Select.Option
                                                                                        value={12}>12</Select.Option>
                                                                                    <Select.Option
                                                                                        value={13}>13</Select.Option>
                                                                                    <Select.Option
                                                                                        value={14}>14</Select.Option>
                                                                                    <Select.Option
                                                                                        value={15}>15</Select.Option>
                                                                                    <Select.Option
                                                                                        value={16}>16</Select.Option>
                                                                                    <Select.Option
                                                                                        value={17}>17</Select.Option>
                                                                                    <Select.Option
                                                                                        value={18}>18</Select.Option>
                                                                                    <Select.Option
                                                                                        value={19}>19</Select.Option>
                                                                                    <Select.Option
                                                                                        value={20}>20</Select.Option>
                                                                                    <Select.Option
                                                                                        value={21}>21</Select.Option>
                                                                                    <Select.Option
                                                                                        value={22}>22</Select.Option>
                                                                                    <Select.Option
                                                                                        value={23}>23</Select.Option>
                                                                                    <Select.Option
                                                                                        value={24}>24</Select.Option>
                                                                                    <Select.Option
                                                                                        value={25}>25</Select.Option>
                                                                                    <Select.Option
                                                                                        value={26}>26</Select.Option>
                                                                                    <Select.Option
                                                                                        value={27}>27</Select.Option>
                                                                                    <Select.Option
                                                                                        value={28}>28</Select.Option>
                                                                                    <Select.Option
                                                                                        value={29}>29</Select.Option>
                                                                                    <Select.Option
                                                                                        value={30}>30</Select.Option>
                                                                                    <Select.Option
                                                                                        value={31}>31</Select.Option>
                                                                                </Select>
                                                                                <div style={{margin: "0px 6px 0 4px"}}>{i18n.t("Day")}</div>
                                                                                <Select
                                                                                    id="brOC_autoDialView_ver2_callInfos_toHour"
                                                                                    style={{width: "60px"}} size="large"
                                                                                    onChange={(val) => this._callInfosToHour = val}
                                                                                    defaultValue={this._callInfosToHour}
                                                                                >
                                                                                    <Select.Option
                                                                                        value={0}>0</Select.Option>
                                                                                    <Select.Option
                                                                                        value={1}>1</Select.Option>
                                                                                    <Select.Option
                                                                                        value={2}>2</Select.Option>
                                                                                    <Select.Option
                                                                                        value={3}>3</Select.Option>
                                                                                    <Select.Option
                                                                                        value={4}>4</Select.Option>
                                                                                    <Select.Option
                                                                                        value={5}>5</Select.Option>
                                                                                    <Select.Option
                                                                                        value={6}>6</Select.Option>
                                                                                    <Select.Option
                                                                                        value={7}>7</Select.Option>
                                                                                    <Select.Option
                                                                                        value={8}>8</Select.Option>
                                                                                    <Select.Option
                                                                                        value={9}>9</Select.Option>
                                                                                    <Select.Option
                                                                                        value={10}>10</Select.Option>
                                                                                    <Select.Option
                                                                                        value={11}>11</Select.Option>
                                                                                    <Select.Option
                                                                                        value={12}>12</Select.Option>
                                                                                    <Select.Option
                                                                                        value={13}>13</Select.Option>
                                                                                    <Select.Option
                                                                                        value={14}>14</Select.Option>
                                                                                    <Select.Option
                                                                                        value={15}>15</Select.Option>
                                                                                    <Select.Option
                                                                                        value={16}>16</Select.Option>
                                                                                    <Select.Option
                                                                                        value={17}>17</Select.Option>
                                                                                    <Select.Option
                                                                                        value={18}>18</Select.Option>
                                                                                    <Select.Option
                                                                                        value={19}>19</Select.Option>
                                                                                    <Select.Option
                                                                                        value={20}>20</Select.Option>
                                                                                    <Select.Option
                                                                                        value={21}>21</Select.Option>
                                                                                    <Select.Option
                                                                                        value={22}>22</Select.Option>
                                                                                    <Select.Option
                                                                                        value={23}>23</Select.Option>
                                                                                </Select>
                                                                                <span style={{margin:"0 4px 0 4px"}}>:</span>
                                                                                <Select
                                                                                    id="brOC_autoDialView_ver2_callInfos_toMinute"
                                                                                    style={{width: "60px"}} size="large"
                                                                                    onChange={(val) => this._callInfosToMinute = val}
                                                                                    defaultValue={this._callInfosToMinute}
                                                                                >
                                                                                    <Select.Option
                                                                                        value={0}>0</Select.Option>
                                                                                    <Select.Option
                                                                                        value={1}>1</Select.Option>
                                                                                    <Select.Option
                                                                                        value={2}>2</Select.Option>
                                                                                    <Select.Option
                                                                                        value={3}>3</Select.Option>
                                                                                    <Select.Option
                                                                                        value={4}>4</Select.Option>
                                                                                    <Select.Option
                                                                                        value={5}>5</Select.Option>
                                                                                    <Select.Option
                                                                                        value={6}>6</Select.Option>
                                                                                    <Select.Option
                                                                                        value={7}>7</Select.Option>
                                                                                    <Select.Option
                                                                                        value={8}>8</Select.Option>
                                                                                    <Select.Option
                                                                                        value={9}>9</Select.Option>
                                                                                    <Select.Option
                                                                                        value={10}>10</Select.Option>
                                                                                    <Select.Option
                                                                                        value={11}>11</Select.Option>
                                                                                    <Select.Option
                                                                                        value={12}>12</Select.Option>
                                                                                    <Select.Option
                                                                                        value={13}>13</Select.Option>
                                                                                    <Select.Option
                                                                                        value={14}>14</Select.Option>
                                                                                    <Select.Option
                                                                                        value={15}>15</Select.Option>
                                                                                    <Select.Option
                                                                                        value={16}>16</Select.Option>
                                                                                    <Select.Option
                                                                                        value={17}>17</Select.Option>
                                                                                    <Select.Option
                                                                                        value={18}>18</Select.Option>
                                                                                    <Select.Option
                                                                                        value={19}>19</Select.Option>
                                                                                    <Select.Option
                                                                                        value={20}>20</Select.Option>
                                                                                    <Select.Option
                                                                                        value={21}>21</Select.Option>
                                                                                    <Select.Option
                                                                                        value={22}>22</Select.Option>
                                                                                    <Select.Option
                                                                                        value={23}>23</Select.Option>
                                                                                    <Select.Option
                                                                                        value={24}>24</Select.Option>
                                                                                    <Select.Option
                                                                                        value={25}>25</Select.Option>
                                                                                    <Select.Option
                                                                                        value={26}>26</Select.Option>
                                                                                    <Select.Option
                                                                                        value={27}>27</Select.Option>
                                                                                    <Select.Option
                                                                                        value={28}>28</Select.Option>
                                                                                    <Select.Option
                                                                                        value={29}>29</Select.Option>
                                                                                    <Select.Option
                                                                                        value={30}>30</Select.Option>
                                                                                    <Select.Option
                                                                                        value={31}>31</Select.Option>
                                                                                    <Select.Option
                                                                                        value={32}>32</Select.Option>
                                                                                    <Select.Option
                                                                                        value={33}>33</Select.Option>
                                                                                    <Select.Option
                                                                                        value={34}>34</Select.Option>
                                                                                    <Select.Option
                                                                                        value={35}>35</Select.Option>
                                                                                    <Select.Option
                                                                                        value={36}>36</Select.Option>
                                                                                    <Select.Option
                                                                                        value={37}>37</Select.Option>
                                                                                    <Select.Option
                                                                                        value={38}>38</Select.Option>
                                                                                    <Select.Option
                                                                                        value={39}>39</Select.Option>
                                                                                    <Select.Option
                                                                                        value={40}>40</Select.Option>
                                                                                    <Select.Option
                                                                                        value={41}>41</Select.Option>
                                                                                    <Select.Option
                                                                                        value={42}>42</Select.Option>
                                                                                    <Select.Option
                                                                                        value={43}>43</Select.Option>
                                                                                    <Select.Option
                                                                                        value={44}>44</Select.Option>
                                                                                    <Select.Option
                                                                                        value={45}>45</Select.Option>
                                                                                    <Select.Option
                                                                                        value={46}>46</Select.Option>
                                                                                    <Select.Option
                                                                                        value={47}>47</Select.Option>
                                                                                    <Select.Option
                                                                                        value={48}>48</Select.Option>
                                                                                    <Select.Option
                                                                                        value={49}>49</Select.Option>
                                                                                    <Select.Option
                                                                                        value={50}>50</Select.Option>
                                                                                    <Select.Option
                                                                                        value={51}>51</Select.Option>
                                                                                    <Select.Option
                                                                                        value={52}>52</Select.Option>
                                                                                    <Select.Option
                                                                                        value={53}>53</Select.Option>
                                                                                    <Select.Option
                                                                                        value={54}>54</Select.Option>
                                                                                    <Select.Option
                                                                                        value={55}>55</Select.Option>
                                                                                    <Select.Option
                                                                                        value={56}>56</Select.Option>
                                                                                    <Select.Option
                                                                                        value={57}>57</Select.Option>
                                                                                    <Select.Option
                                                                                        value={58}>58</Select.Option>
                                                                                    <Select.Option
                                                                                        value={59}>59</Select.Option>
                                                                                </Select>
                                                                            </div>
                                                                        </td>
                                                                        <td>
                                                                            <button
                                                                                title={i18n.t(`Search`)}
                                                                                className="kbc-button kbc-button-fill-parent legacyButtonPadding brOCDefaultKbcButtonMargin"
                                                                                onClick={(e) => this._onClickForGetDatetimeDescCallInfoArrayForDisplay()}
                                                                                size={"middle"}
                                                                            >
                                                                                <svg height="24" viewBox="0 0 24 24"
                                                                                     width="24">
                                                                                    <path
                                                                                        d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z"
                                                                                        fill="black">
                                                                                    </path>
                                                                                </svg>
                                                                            </button>
                                                                        </td>
                                                                        <td style={{width: "99%"}}></td>
                                                                    </>
                                                                )}
                                                                {/*   //!depend language */}
                                                                {language !== "ja" && (
                                                                    <>
                                                                    <td>
                                                                        <div style={{
                                                                            display: "flex",
                                                                            alignItems: "center"
                                                                        }}>
                                                                            <Select
                                                                                id="brOC_autoDialView_ver2_callInfos_fromMonth"
                                                                                style={{width: "60px"}} size="large"
                                                                                onChange={(val) => this._callInfosFromMonth = val}
                                                                                defaultValue={this._callInfosFromMonth}
                                                                            >
                                                                                <Select.Option
                                                                                    value={1}>1</Select.Option>
                                                                                <Select.Option
                                                                                    value={2}>2</Select.Option>
                                                                                <Select.Option
                                                                                    value={3}>3</Select.Option>
                                                                                <Select.Option
                                                                                    value={4}>4</Select.Option>
                                                                                <Select.Option
                                                                                    value={5}>5</Select.Option>
                                                                                <Select.Option
                                                                                    value={6}>6</Select.Option>
                                                                                <Select.Option
                                                                                    value={7}>7</Select.Option>
                                                                                <Select.Option
                                                                                    value={8}>8</Select.Option>
                                                                                <Select.Option
                                                                                    value={9}>9</Select.Option>
                                                                                <Select.Option
                                                                                    value={10}>10</Select.Option>
                                                                                <Select.Option
                                                                                    value={11}>11</Select.Option>
                                                                                <Select.Option
                                                                                    value={12}>12</Select.Option>
                                                                            </Select>
                                                                            <span
                                                                                style={{margin: "0 4px 0 4px"}}>/</span>
                                                                            <Select
                                                                                id="brOC_autoDialView_ver2_callInfos_fromDay"
                                                                                style={{width: "60px"}} size="large"
                                                                                onChange={(val) => this._callInfosFromDay = val}
                                                                                defaultValue={this._callInfosFromDay}
                                                                            >
                                                                                <Select.Option
                                                                                    value={1}>1</Select.Option>
                                                                                <Select.Option
                                                                                    value={2}>2</Select.Option>
                                                                                <Select.Option
                                                                                    value={3}>3</Select.Option>
                                                                                <Select.Option
                                                                                    value={4}>4</Select.Option>
                                                                                <Select.Option
                                                                                    value={5}>5</Select.Option>
                                                                                <Select.Option
                                                                                    value={6}>6</Select.Option>
                                                                                <Select.Option
                                                                                    value={7}>7</Select.Option>
                                                                                <Select.Option
                                                                                    value={8}>8</Select.Option>
                                                                                <Select.Option
                                                                                    value={9}>9</Select.Option>
                                                                                <Select.Option
                                                                                    value={10}>10</Select.Option>
                                                                                <Select.Option
                                                                                    value={11}>11</Select.Option>
                                                                                <Select.Option
                                                                                    value={12}>12</Select.Option>
                                                                                <Select.Option
                                                                                    value={13}>13</Select.Option>
                                                                                <Select.Option
                                                                                    value={14}>14</Select.Option>
                                                                                <Select.Option
                                                                                    value={15}>15</Select.Option>
                                                                                <Select.Option
                                                                                    value={16}>16</Select.Option>
                                                                                <Select.Option
                                                                                    value={17}>17</Select.Option>
                                                                                <Select.Option
                                                                                    value={18}>18</Select.Option>
                                                                                <Select.Option
                                                                                    value={19}>19</Select.Option>
                                                                                <Select.Option
                                                                                    value={20}>20</Select.Option>
                                                                                <Select.Option
                                                                                    value={21}>21</Select.Option>
                                                                                <Select.Option
                                                                                    value={22}>22</Select.Option>
                                                                                <Select.Option
                                                                                    value={23}>23</Select.Option>
                                                                                <Select.Option
                                                                                    value={24}>24</Select.Option>
                                                                                <Select.Option
                                                                                    value={25}>25</Select.Option>
                                                                                <Select.Option
                                                                                    value={26}>26</Select.Option>
                                                                                <Select.Option
                                                                                    value={27}>27</Select.Option>
                                                                                <Select.Option
                                                                                    value={28}>28</Select.Option>
                                                                                <Select.Option
                                                                                    value={29}>29</Select.Option>
                                                                                <Select.Option
                                                                                    value={30}>30</Select.Option>
                                                                                <Select.Option
                                                                                    value={31}>31</Select.Option>
                                                                            </Select>
                                                                            <span
                                                                                style={{margin: "0 4px 0 4px"}}>/</span>
                                                                            <Input
                                                                                id="brOC_autoDialView_ver2_callInfos_fromYear"
                                                                                maxLength={4}
                                                                                // placeholder={i18n.t('Year')}
                                                                                allowClear
                                                                                defaultValue={this._callInfosFromYear}
                                                                                onFocus={(e) => this._onCallInfosFromYearFocus(e)}
                                                                                onBlur={(e) => this._onCallInfosFromYearBlur(e)}
                                                                                style={{
                                                                                    width: "100px",
                                                                                    size: "middle"
                                                                                }}
                                                                                onChange={(val) => this._callInfosFromYear = val}
                                                                            />
                                                                            <span style={{marginLeft: "6px"}}></span>
                                                                            <Select
                                                                                id="brOC_autoDialView_ver2_callInfos_fromHour"
                                                                                style={{width: "60px"}} size="large"
                                                                                onChange={(val) => this._callInfosFromHour = val}
                                                                                defaultValue={this._callInfosFromHour}
                                                                            >
                                                                                <Select.Option
                                                                                    value={0}>0</Select.Option>
                                                                                <Select.Option
                                                                                    value={1}>1</Select.Option>
                                                                                <Select.Option
                                                                                    value={2}>2</Select.Option>
                                                                                <Select.Option
                                                                                    value={3}>3</Select.Option>
                                                                                <Select.Option
                                                                                    value={4}>4</Select.Option>
                                                                                <Select.Option
                                                                                    value={5}>5</Select.Option>
                                                                                <Select.Option
                                                                                    value={6}>6</Select.Option>
                                                                                <Select.Option
                                                                                    value={7}>7</Select.Option>
                                                                                <Select.Option
                                                                                    value={8}>8</Select.Option>
                                                                                <Select.Option
                                                                                    value={9}>9</Select.Option>
                                                                                <Select.Option
                                                                                    value={10}>10</Select.Option>
                                                                                <Select.Option
                                                                                    value={11}>11</Select.Option>
                                                                                <Select.Option
                                                                                    value={12}>12</Select.Option>
                                                                                <Select.Option
                                                                                    value={13}>13</Select.Option>
                                                                                <Select.Option
                                                                                    value={14}>14</Select.Option>
                                                                                <Select.Option
                                                                                    value={15}>15</Select.Option>
                                                                                <Select.Option
                                                                                    value={16}>16</Select.Option>
                                                                                <Select.Option
                                                                                    value={17}>17</Select.Option>
                                                                                <Select.Option
                                                                                    value={18}>18</Select.Option>
                                                                                <Select.Option
                                                                                    value={19}>19</Select.Option>
                                                                                <Select.Option
                                                                                    value={20}>20</Select.Option>
                                                                                <Select.Option
                                                                                    value={21}>21</Select.Option>
                                                                                <Select.Option
                                                                                    value={22}>22</Select.Option>
                                                                                <Select.Option
                                                                                    value={23}>23</Select.Option>
                                                                            </Select>
                                                                            <span
                                                                                style={{margin: "0 4px 0 4px"}}>:</span>
                                                                            <Select
                                                                                id="brOC_autoDialView_ver2_callInfos_fromMinute"
                                                                                style={{width: "60px"}} size="large"
                                                                                onChange={(val) => this._callInfosFromMinute = val}
                                                                                defaultValue={this._callInfosFromMinute}
                                                                            >
                                                                                <Select.Option
                                                                                    value={0}>0</Select.Option>
                                                                                <Select.Option
                                                                                    value={1}>1</Select.Option>
                                                                                <Select.Option
                                                                                    value={2}>2</Select.Option>
                                                                                <Select.Option
                                                                                    value={3}>3</Select.Option>
                                                                                <Select.Option
                                                                                    value={4}>4</Select.Option>
                                                                                <Select.Option
                                                                                    value={5}>5</Select.Option>
                                                                                <Select.Option
                                                                                    value={6}>6</Select.Option>
                                                                                <Select.Option
                                                                                    value={7}>7</Select.Option>
                                                                                <Select.Option
                                                                                    value={8}>8</Select.Option>
                                                                                <Select.Option
                                                                                    value={9}>9</Select.Option>
                                                                                <Select.Option
                                                                                    value={10}>10</Select.Option>
                                                                                <Select.Option
                                                                                    value={11}>11</Select.Option>
                                                                                <Select.Option
                                                                                    value={12}>12</Select.Option>
                                                                                <Select.Option
                                                                                    value={13}>13</Select.Option>
                                                                                <Select.Option
                                                                                    value={14}>14</Select.Option>
                                                                                <Select.Option
                                                                                    value={15}>15</Select.Option>
                                                                                <Select.Option
                                                                                    value={16}>16</Select.Option>
                                                                                <Select.Option
                                                                                    value={17}>17</Select.Option>
                                                                                <Select.Option
                                                                                    value={18}>18</Select.Option>
                                                                                <Select.Option
                                                                                    value={19}>19</Select.Option>
                                                                                <Select.Option
                                                                                    value={20}>20</Select.Option>
                                                                                <Select.Option
                                                                                    value={21}>21</Select.Option>
                                                                                <Select.Option
                                                                                    value={22}>22</Select.Option>
                                                                                <Select.Option
                                                                                    value={23}>23</Select.Option>
                                                                                <Select.Option
                                                                                    value={24}>24</Select.Option>
                                                                                <Select.Option
                                                                                    value={25}>25</Select.Option>
                                                                                <Select.Option
                                                                                    value={26}>26</Select.Option>
                                                                                <Select.Option
                                                                                    value={27}>27</Select.Option>
                                                                                <Select.Option
                                                                                    value={28}>28</Select.Option>
                                                                                <Select.Option
                                                                                    value={29}>29</Select.Option>
                                                                                <Select.Option
                                                                                    value={30}>30</Select.Option>
                                                                                <Select.Option
                                                                                    value={31}>31</Select.Option>
                                                                                <Select.Option
                                                                                    value={32}>32</Select.Option>
                                                                                <Select.Option
                                                                                    value={33}>33</Select.Option>
                                                                                <Select.Option
                                                                                    value={34}>34</Select.Option>
                                                                                <Select.Option
                                                                                    value={35}>35</Select.Option>
                                                                                <Select.Option
                                                                                    value={36}>36</Select.Option>
                                                                                <Select.Option
                                                                                    value={37}>37</Select.Option>
                                                                                <Select.Option
                                                                                    value={38}>38</Select.Option>
                                                                                <Select.Option
                                                                                    value={39}>39</Select.Option>
                                                                                <Select.Option
                                                                                    value={40}>40</Select.Option>
                                                                                <Select.Option
                                                                                    value={41}>41</Select.Option>
                                                                                <Select.Option
                                                                                    value={42}>42</Select.Option>
                                                                                <Select.Option
                                                                                    value={43}>43</Select.Option>
                                                                                <Select.Option
                                                                                    value={44}>44</Select.Option>
                                                                                <Select.Option
                                                                                    value={45}>45</Select.Option>
                                                                                <Select.Option
                                                                                    value={46}>46</Select.Option>
                                                                                <Select.Option
                                                                                    value={47}>47</Select.Option>
                                                                                <Select.Option
                                                                                    value={48}>48</Select.Option>
                                                                                <Select.Option
                                                                                    value={49}>49</Select.Option>
                                                                                <Select.Option
                                                                                    value={50}>50</Select.Option>
                                                                                <Select.Option
                                                                                    value={51}>51</Select.Option>
                                                                                <Select.Option
                                                                                    value={52}>52</Select.Option>
                                                                                <Select.Option
                                                                                    value={53}>53</Select.Option>
                                                                                <Select.Option
                                                                                    value={54}>54</Select.Option>
                                                                                <Select.Option
                                                                                    value={55}>55</Select.Option>
                                                                                <Select.Option
                                                                                    value={56}>56</Select.Option>
                                                                                <Select.Option
                                                                                    value={57}>57</Select.Option>
                                                                                <Select.Option
                                                                                    value={58}>58</Select.Option>
                                                                                <Select.Option
                                                                                    value={59}>59</Select.Option>
                                                                            </Select>
                                                                            <span
                                                                                style={{margin: "0 4px 0 4px"}}>~</span>
                                                                            <Select
                                                                                id="brOC_autoDialView_ver2_callInfos_toMonth"
                                                                                style={{width: "60px"}} size="large"
                                                                                onChange={(val) => this._callInfosToMonth = val}
                                                                                defaultValue={this._callInfosToMonth}
                                                                            >
                                                                                <Select.Option
                                                                                    value={1}>1</Select.Option>
                                                                                <Select.Option
                                                                                    value={2}>2</Select.Option>
                                                                                <Select.Option
                                                                                    value={3}>3</Select.Option>
                                                                                <Select.Option
                                                                                    value={4}>4</Select.Option>
                                                                                <Select.Option
                                                                                    value={5}>5</Select.Option>
                                                                                <Select.Option
                                                                                    value={6}>6</Select.Option>
                                                                                <Select.Option
                                                                                    value={7}>7</Select.Option>
                                                                                <Select.Option
                                                                                    value={8}>8</Select.Option>
                                                                                <Select.Option
                                                                                    value={9}>9</Select.Option>
                                                                                <Select.Option
                                                                                    value={10}>10</Select.Option>
                                                                                <Select.Option
                                                                                    value={11}>11</Select.Option>
                                                                                <Select.Option
                                                                                    value={12}>12</Select.Option>
                                                                            </Select>
                                                                            <span
                                                                                style={{margin: "0 4px 0 4px"}}>/</span>
                                                                            <Select
                                                                                id="brOC_autoDialView_ver2_callInfos_toDay"
                                                                                style={{width: "60px"}} size="large"
                                                                                onChange={(val) => this._callInfosToDay = val}
                                                                                defaultValue={this._callInfosToDay}
                                                                            >
                                                                                <Select.Option
                                                                                    value={1}>1</Select.Option>
                                                                                <Select.Option
                                                                                    value={2}>2</Select.Option>
                                                                                <Select.Option
                                                                                    value={3}>3</Select.Option>
                                                                                <Select.Option
                                                                                    value={4}>4</Select.Option>
                                                                                <Select.Option
                                                                                    value={5}>5</Select.Option>
                                                                                <Select.Option
                                                                                    value={6}>6</Select.Option>
                                                                                <Select.Option
                                                                                    value={7}>7</Select.Option>
                                                                                <Select.Option
                                                                                    value={8}>8</Select.Option>
                                                                                <Select.Option
                                                                                    value={9}>9</Select.Option>
                                                                                <Select.Option
                                                                                    value={10}>10</Select.Option>
                                                                                <Select.Option
                                                                                    value={11}>11</Select.Option>
                                                                                <Select.Option
                                                                                    value={12}>12</Select.Option>
                                                                                <Select.Option
                                                                                    value={13}>13</Select.Option>
                                                                                <Select.Option
                                                                                    value={14}>14</Select.Option>
                                                                                <Select.Option
                                                                                    value={15}>15</Select.Option>
                                                                                <Select.Option
                                                                                    value={16}>16</Select.Option>
                                                                                <Select.Option
                                                                                    value={17}>17</Select.Option>
                                                                                <Select.Option
                                                                                    value={18}>18</Select.Option>
                                                                                <Select.Option
                                                                                    value={19}>19</Select.Option>
                                                                                <Select.Option
                                                                                    value={20}>20</Select.Option>
                                                                                <Select.Option
                                                                                    value={21}>21</Select.Option>
                                                                                <Select.Option
                                                                                    value={22}>22</Select.Option>
                                                                                <Select.Option
                                                                                    value={23}>23</Select.Option>
                                                                                <Select.Option
                                                                                    value={24}>24</Select.Option>
                                                                                <Select.Option
                                                                                    value={25}>25</Select.Option>
                                                                                <Select.Option
                                                                                    value={26}>26</Select.Option>
                                                                                <Select.Option
                                                                                    value={27}>27</Select.Option>
                                                                                <Select.Option
                                                                                    value={28}>28</Select.Option>
                                                                                <Select.Option
                                                                                    value={29}>29</Select.Option>
                                                                                <Select.Option
                                                                                    value={30}>30</Select.Option>
                                                                                <Select.Option
                                                                                    value={31}>31</Select.Option>
                                                                            </Select>
                                                                            <span
                                                                                style={{margin: "0 4px 0 4px"}}>/</span>
                                                                            <Input
                                                                                id="brOC_autoDialView_ver2_callInfos_toYear"
                                                                                maxLength={4}
                                                                                //placeholder={i18n.t('Year')}
                                                                                allowClear
                                                                                onFocus={(e) => this._onCallInfosToYearFocus(e)}
                                                                                onBlur={(e) => this._onCallInfosToYearBlur(e)}
                                                                                style={{
                                                                                    width: "100px",
                                                                                    size: "middle"
                                                                                }}
                                                                                defaultValue={this._callInfosToYear}
                                                                                onChange={(val) => this._callInfosToYear = val}
                                                                            />
                                                                            <span style={{marginLeft: "6px"}}></span>
                                                                            <Select
                                                                                id="brOC_autoDialView_ver2_callInfos_toHour"
                                                                                style={{width: "60px"}} size="large"
                                                                                onChange={(val) => this._callInfosToHour = val}
                                                                                defaultValue={this._callInfosToHour}
                                                                            >
                                                                                <Select.Option
                                                                                    value={0}>0</Select.Option>
                                                                                <Select.Option
                                                                                    value={1}>1</Select.Option>
                                                                                <Select.Option
                                                                                    value={2}>2</Select.Option>
                                                                                <Select.Option
                                                                                    value={3}>3</Select.Option>
                                                                                <Select.Option
                                                                                    value={4}>4</Select.Option>
                                                                                <Select.Option
                                                                                    value={5}>5</Select.Option>
                                                                                <Select.Option
                                                                                    value={6}>6</Select.Option>
                                                                                <Select.Option
                                                                                    value={7}>7</Select.Option>
                                                                                <Select.Option
                                                                                    value={8}>8</Select.Option>
                                                                                <Select.Option
                                                                                    value={9}>9</Select.Option>
                                                                                <Select.Option
                                                                                    value={10}>10</Select.Option>
                                                                                <Select.Option
                                                                                    value={11}>11</Select.Option>
                                                                                <Select.Option
                                                                                    value={12}>12</Select.Option>
                                                                                <Select.Option
                                                                                    value={13}>13</Select.Option>
                                                                                <Select.Option
                                                                                    value={14}>14</Select.Option>
                                                                                <Select.Option
                                                                                    value={15}>15</Select.Option>
                                                                                <Select.Option
                                                                                    value={16}>16</Select.Option>
                                                                                <Select.Option
                                                                                    value={17}>17</Select.Option>
                                                                                <Select.Option
                                                                                    value={18}>18</Select.Option>
                                                                                <Select.Option
                                                                                    value={19}>19</Select.Option>
                                                                                <Select.Option
                                                                                    value={20}>20</Select.Option>
                                                                                <Select.Option
                                                                                    value={21}>21</Select.Option>
                                                                                <Select.Option
                                                                                    value={22}>22</Select.Option>
                                                                                <Select.Option
                                                                                    value={23}>23</Select.Option>
                                                                            </Select>
                                                                            <span
                                                                                style={{margin: "0 4px 0 4px"}}>:</span>
                                                                            <Select
                                                                                id="brOC_autoDialView_ver2_callInfos_toMinute"
                                                                                style={{width: "60px"}} size="large"
                                                                                onChange={(val) => this._callInfosToMinute = val}
                                                                                defaultValue={this._callInfosToMinute}
                                                                            >
                                                                                <Select.Option
                                                                                    value={0}>0</Select.Option>
                                                                                <Select.Option
                                                                                    value={1}>1</Select.Option>
                                                                                <Select.Option
                                                                                    value={2}>2</Select.Option>
                                                                                <Select.Option
                                                                                    value={3}>3</Select.Option>
                                                                                <Select.Option
                                                                                    value={4}>4</Select.Option>
                                                                                <Select.Option
                                                                                    value={5}>5</Select.Option>
                                                                                <Select.Option
                                                                                    value={6}>6</Select.Option>
                                                                                <Select.Option
                                                                                    value={7}>7</Select.Option>
                                                                                <Select.Option
                                                                                    value={8}>8</Select.Option>
                                                                                <Select.Option
                                                                                    value={9}>9</Select.Option>
                                                                                <Select.Option
                                                                                    value={10}>10</Select.Option>
                                                                                <Select.Option
                                                                                    value={11}>11</Select.Option>
                                                                                <Select.Option
                                                                                    value={12}>12</Select.Option>
                                                                                <Select.Option
                                                                                    value={13}>13</Select.Option>
                                                                                <Select.Option
                                                                                    value={14}>14</Select.Option>
                                                                                <Select.Option
                                                                                    value={15}>15</Select.Option>
                                                                                <Select.Option
                                                                                    value={16}>16</Select.Option>
                                                                                <Select.Option
                                                                                    value={17}>17</Select.Option>
                                                                                <Select.Option
                                                                                    value={18}>18</Select.Option>
                                                                                <Select.Option
                                                                                    value={19}>19</Select.Option>
                                                                                <Select.Option
                                                                                    value={20}>20</Select.Option>
                                                                                <Select.Option
                                                                                    value={21}>21</Select.Option>
                                                                                <Select.Option
                                                                                    value={22}>22</Select.Option>
                                                                                <Select.Option
                                                                                    value={23}>23</Select.Option>
                                                                                <Select.Option
                                                                                    value={24}>24</Select.Option>
                                                                                <Select.Option
                                                                                    value={25}>25</Select.Option>
                                                                                <Select.Option
                                                                                    value={26}>26</Select.Option>
                                                                                <Select.Option
                                                                                    value={27}>27</Select.Option>
                                                                                <Select.Option
                                                                                    value={28}>28</Select.Option>
                                                                                <Select.Option
                                                                                    value={29}>29</Select.Option>
                                                                                <Select.Option
                                                                                    value={30}>30</Select.Option>
                                                                                <Select.Option
                                                                                    value={31}>31</Select.Option>
                                                                                <Select.Option
                                                                                    value={32}>32</Select.Option>
                                                                                <Select.Option
                                                                                    value={33}>33</Select.Option>
                                                                                <Select.Option
                                                                                    value={34}>34</Select.Option>
                                                                                <Select.Option
                                                                                    value={35}>35</Select.Option>
                                                                                <Select.Option
                                                                                    value={36}>36</Select.Option>
                                                                                <Select.Option
                                                                                    value={37}>37</Select.Option>
                                                                                <Select.Option
                                                                                    value={38}>38</Select.Option>
                                                                                <Select.Option
                                                                                    value={39}>39</Select.Option>
                                                                                <Select.Option
                                                                                    value={40}>40</Select.Option>
                                                                                <Select.Option
                                                                                    value={41}>41</Select.Option>
                                                                                <Select.Option
                                                                                    value={42}>42</Select.Option>
                                                                                <Select.Option
                                                                                    value={43}>43</Select.Option>
                                                                                <Select.Option
                                                                                    value={44}>44</Select.Option>
                                                                                <Select.Option
                                                                                    value={45}>45</Select.Option>
                                                                                <Select.Option
                                                                                    value={46}>46</Select.Option>
                                                                                <Select.Option
                                                                                    value={47}>47</Select.Option>
                                                                                <Select.Option
                                                                                    value={48}>48</Select.Option>
                                                                                <Select.Option
                                                                                    value={49}>49</Select.Option>
                                                                                <Select.Option
                                                                                    value={50}>50</Select.Option>
                                                                                <Select.Option
                                                                                    value={51}>51</Select.Option>
                                                                                <Select.Option
                                                                                    value={52}>52</Select.Option>
                                                                                <Select.Option
                                                                                    value={53}>53</Select.Option>
                                                                                <Select.Option
                                                                                    value={54}>54</Select.Option>
                                                                                <Select.Option
                                                                                    value={55}>55</Select.Option>
                                                                                <Select.Option
                                                                                    value={56}>56</Select.Option>
                                                                                <Select.Option
                                                                                    value={57}>57</Select.Option>
                                                                                <Select.Option
                                                                                    value={58}>58</Select.Option>
                                                                                <Select.Option
                                                                                    value={59}>59</Select.Option>
                                                                            </Select>
                                                                        </div>
                                                                    </td>
                                                                        <td>
                                                                        <button
                                                                            title={i18n.t(`Search`)}
                                                                            className="kbc-button kbc-button-fill-parent legacyButtonPadding brOCDefaultKbcButtonMargin"
                                                                            onClick={(e) => this._onClickForGetDatetimeDescCallInfoArrayForDisplay()}
                                                                            size={"middle"}
                                                                        >
                                                                            <svg height="24" viewBox="0 0 24 24"
                                                                                 width="24">
                                                                                <path
                                                                                    d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z"
                                                                                    fill="black">
                                                                                </path>
                                                                            </svg>
                                                                        </button>
                                                                    </td>
                                                                    <td style={{width: "99%"}}></td>
                                                                    </>
                                                              )}
                                                            </tr>
                                                            <tr>
                                                                <td colSpan={3}>
                                                                    <div style={{
                                                                        display: "flex",
                                                                        alignItems: "center",
                                                                        margin: "4px"
                                                                    }}>
                                                                        <Checkbox
                                                                            id="recentShowDetail_brOC_AutoDialView_ver2"
                                                                            checked={this.state.recentShowDetailChecked}
                                                                            onChange={(e) => this._onRecentShowDetailChange(e)}/>
                                                                        <label style={{marginLeft: "2px"}}
                                                                               htmlFor="recentShowDetail_brOC_AutoDialView_ver2">{i18n.t("Show_detail")}</label>
                                                                    </div>
                                                                    <div className={"autoDialView_ver2_tableParent"}>
                                                                        <table style={{border: "0"}}
                                                                               className={"defaultContentTable"}>
                                                                            <thead>
                                                                            <tr className="defaultItemPaddingForTr">
                                                                                <th style={{width: "1%"}}>{i18n.t("Tel")}</th>
                                                                                <th style={{width: 20}}>{i18n.t("Status")}</th>
                                                                                <th></th>
                                                                                <th>{i18n.t("Incoming")}</th>
                                                                                <th>{i18n.t("Transfer")}</th>
                                                                                <th>{i18n.t("StartedAt")}</th>
                                                                                {this.state.recentShowDetailChecked &&
                                                                                    <th>{i18n.t("AnsweredAt")}</th>}
                                                                                {this.state.recentShowDetailChecked &&
                                                                                    <th>{i18n.t("EndedAt")}</th>}
                                                                            </tr>
                                                                            </thead>
                                                                            <tbody>
                                                                            { this._callInfoArrayForDisplay === null && (
                                                                                <div style={{
                                                                                    display: "flex",
                                                                                    justifyContent: "center",
                                                                                    alignItems: "center",
                                                                                    height: "inherit"
                                                                                }}>
                                                                                    <Spin/>
                                                                                </div>
                                                                            )}
                                                                            {this._callInfoArrayForDisplay && this._callInfoArrayForDisplay.map((callHistory2CallInfo, i) => {
                                                                                const partyNumber = callHistory2CallInfo.getPartyNumber();
                                                                                const isExtension = OCUtil.indexOfArrayFromExtensions(oc.state.extensions, partyNumber) !== -1;
                                                                                const extensionsStatus = oc.state.extensionsStatus;
                                                                                const statusClassName = isExtension ? OCUtil.getExtensionStatusClassName(partyNumber, extensionsStatus) : "";
                                                                                const sIsIncoming = callHistory2CallInfo.getIsIncoming() ? "✓" : "";
                                                                                const sStartedAt = new Date(callHistory2CallInfo.getAddCallMillisTime()).toLocaleString();  //!overhead //!cost
                                                                                const sAnsweredAt = callHistory2CallInfo.getAnsweredAt() ? new Date(callHistory2CallInfo.getAnsweredAt()).toLocaleString() : "";
                                                                                const sEndedAt = callHistory2CallInfo.getEndCallMillisTime() ? new Date(callHistory2CallInfo.getEndCallMillisTime()).toLocaleString() : "";
                                                                                const sIsTransfer = callHistory2CallInfo.getIsTransfer() ? "✓" : "";
                                                                                return (
                                                                                    <tr key={i}>
                                                                                        <td style={{width: "1%"}}>{partyNumber}</td>
                                                                                        <td>
                                                                                            <div
                                                                                                className={statusClassName}></div>
                                                                                        </td>
                                                                                        <td>
                                                                                            {partyNumber && (
                                                                                                <div style={{
                                                                                                    display: "flex",
                                                                                                    justifyContent: "center"
                                                                                                }}>
                                                                                                    <button
                                                                                                        title={i18n.t(`Call`)}
                                                                                                        className="kbc-button kbc-button-fill-parent legacyButtonPadding brOCDefaultKbcButtonMargin"
                                                                                                        onClick={(e) => {
                                                                                                            this._onClickStartDatetimeCallHistoryCallButton(e, partyNumber);
                                                                                                        }
                                                                                                        }>
                                                                                                        {
                                                                                                            <FontAwesomeIcon
                                                                                                                size="lg"
                                                                                                                icon="fas fa-phone"/>}
                                                                                                    </button>
                                                                                                </div>)}
                                                                                        </td>
                                                                                        <td style={{textAlign: "center"}}>{sIsIncoming}</td>
                                                                                        <td style={{textAlign: "center"}}>{sIsTransfer}</td>
                                                                                        <td>{sStartedAt}</td>
                                                                                        {this.state.recentShowDetailChecked &&
                                                                                            <td>{sAnsweredAt}</td>}
                                                                                        {this.state.recentShowDetailChecked &&
                                                                                            <td>{sEndedAt}</td>}
                                                                                    </tr>
                                                                                )
                                                                            })}
                                                                            </tbody>
                                                                        </table>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                            </tbody>
                                                        </table>
                                                    )}
                                                </div>
                                                <div className="panel tab-B">
                                                <table className="defaultContentTable" style={{border: "0"}}><tbody>
                                                    <tr className="defaultItemPaddingForTr">
                                                        <td>
                                                            <Input
                                                                id="brOC_autoDialView_ver2_extension_filterWord"
                                                                maxLength={1000}
                                                                placeholder={i18n.t('Filter')} allowClear
                                                                defaultValue={''}
                                                                onFocus={(e) => this._onExtensionsKeywordsFocus(e)}
                                                                onBlur={(e) => this._onExtensionsKeywordsBlur(e)}
                                                                style={{width: "300px", size: "middle"}}/>
                                                        </td>
                                                        <td style={{paddingLeft: "0px"}}>
                                                            <Select
                                                                id="brOC_autoDialView_ver2_extension_filterColumnName"
                                                                style={{width:"120px"}}
                                                                defaultValue={ _EXTENSION_FILTER_COLUMN_NAME_DEFAULT_VALUE } size="large" onChange={ (val) =>{
                                                                    this._currentExtensionFilterColumnName = val;
                                                                }}>
                                                                <Select.Option
                                                                    value={ _EXTENSION_FILTER_COLUMN_NAME_DEFAULT_VALUE }>{i18n.t("ExtensionNumber")}</Select.Option>
                                                                <Select.Option
                                                                    value="name">{i18n.t("Name")}</Select.Option>
                                                            </Select>
                                                        </td>
                                                        <td style={{paddingLeft: "4px"}}>
                                                            <button
                                                                title={i18n.t(`Search`)}
                                                                className="kbc-button kbc-button-fill-parent legacyButtonPadding brOCDefaultKbcButtonMargin"
                                                                onClick={(e) => this._onClickGetExtensionList()}
                                                                size={"middle"}
                                                            >
                                                                <svg height="24" viewBox="0 0 24 24" width="24">
                                                                    <path
                                                                        d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z"
                                                                        fill="black">
                                                                    </path>
                                                                </svg>
                                                            </button>
                                                            {/*<svg height="24" viewBox="0 0 24 24" width="24"*/}
                                                            {/*     onClick={(e) => this._onClickGetContactList()}>*/}
                                                            {/*    <path*/}
                                                            {/*        d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z"*/}
                                                            {/*        fill="black">*/}
                                                            {/*    </path>*/}
                                                            {/*</svg>*/}
                                                        </td>
                                                        <td style={{width: "99%"}}></td>
                                                    </tr>
                                                    <tr>
                                                        <td colSpan="4" style={{padding:"0"}}>
                                                            <div className="autoDialView_ver2_tableParent">
                                                                <table className={"defaultContentTable"}
                                                                       style={{border: "0", width:"100%"}}>
                                                                    <thead>
                                                                    <tr className="defaultItemPaddingForTr">
                                                                        <th>{i18n.t("ExtensionNumber")}</th>
                                                                        <th>{i18n.t("Name")}</th>
                                                                        <th style={{width:"1%"}}>{i18n.t("Status")}</th>
                                                                        <th style={{width:"1%"}}></th>
                                                                    </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                    { this._filteredExtensionArray === null && (
                                                                        <div style={{
                                                                            display: "flex",
                                                                            justifyContent: "center",
                                                                            alignItems: "center", height: "inherit"
                                                                        }}>
                                                                            <Spin/>
                                                                        </div>
                                                                    )}
                                                                    { this._filteredExtensionArray !== null && this._filteredExtensionArray.map((ext, i) => {
                                                                        const extensionsStatus = oc.state.extensionsStatus;
                                                                        const statusClassName = OCUtil.getExtensionStatusClassName(ext.id, extensionsStatus);

                                                                        return (
                                                                            <tr key={i}>
                                                                            <td>{ext.id}</td>
                                                                                <td>{ext.name}</td>
                                                                                <td style={{width: "1%"}}>
                                                                                    <div
                                                                                        className={statusClassName}></div>
                                                                                </td>
                                                                                <td style={{width:"1%"}}>
                                                                                    <div style={{
                                                                                        display: "flex",
                                                                                        justifyContent: "center"
                                                                                    }}>
                                                                                        <button
                                                                                            title={i18n.t(`Call`)}
                                                                                            className="kbc-button kbc-button-fill-parent legacyButtonPadding brOCDefaultKbcButtonMargin"
                                                                                                onClick={(e) => {
                                                                                                    AutoDialView_ver2.onClickCallButtonForAutoDialView(e, ext.id);
                                                                                                }
                                                                                                }>
                                                                                                {<FontAwesomeIcon
                                                                                                    size="lg"
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
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                    </table>
                                                </div>
                                                <div className="panel tab-C">
                                                    <table className="defaultContentTable" style={{border: "0"}}>
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
                                                                    onClick={(e) => this._onClickGetContactList()}
                                                                >
                                                                    <svg height="24" viewBox="0 0 24 24" width="24">
                                                                        <path
                                                                            d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z"
                                                                            fill="black">
                                                                        </path>
                                                                    </svg>
                                                                </button>
                                                                {/*<svg height="24" viewBox="0 0 24 24" width="24"*/}
                                                                {/*     onClick={(e) => this._onClickGetContactList()}>*/}
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
                                                                    onChange={(checked, ev) => this._onChangeOnlySharedContacts(checked, ev)}
                                                                />
                                                            </td>
                                                            <td style={{width: "99%"}}></td>
                                                        </tr>
                                                        <tr className="defaultItemPaddingForTr">
                                                            <td colSpan="3"
                                                                className="paddingTopZeroImportant_AutoDialView_ver2"
                                                                style={{padding: "0", width: "100%"}}>
                                                                <div className="autoDialView_ver2_tableParent"
                                                                     id="phonebookScrollableDiv_brOC_AutoDialView_ver2"
                                                                     onScroll={(e) => this._onScrollPhonebookScrollableDiv(e)}>
                                                                    {this._autoDialViewzPhonebookContactArray === null && (
                                                                        <div style={{
                                                                            display: "flex",
                                                                            justifyContent: "center",
                                                                            alignItems: "center", height: "inherit"
                                                                        }}>
                                                                            <Spin/>
                                                                        </div>
                                                                    )
                                                                    }
                                                                    {this._autoDialViewzPhonebookContactArray !== null && (
                                                                        <table className={"defaultContentTable"}
                                                                               style={{border: "0", width: "100%"}}>
                                                                            <thead>
                                                                            <tr>
                                                                                <th>{i18n.t("PhonebookName")}</th>
                                                                                <th>{i18n.t("Shared")}</th>
                                                                                <th>{i18n.t("DisplayName")}</th>
                                                                                <th style={{textAlign: "center"}}>{i18n.t("Call")}</th>
                                                                                <th style={{textAlign: "center"}}>{i18n.t("Info")}</th>
                                                                                <th style={{textAlign: "center"}}>{i18n.t("Delete")}</th>
                                                                            </tr>
                                                                            </thead>
                                                                            <tbody>
                                                                            {this._autoDialViewzPhonebookContactArray.map((autoDialViewzPhoneBookContact, i) => {
                                                                                const latestPbContactInfo = autoDialViewzPhoneBookContact.getLatestPhonebookContactInfo();
                                                                                const wasShared = latestPbContactInfo ? latestPbContactInfo.getIsShared() : false;
                                                                                const isAdmin = oc.getIsAdmin();
                                                                                const isDeletable = wasShared === false || (wasShared === true && isAdmin === true);
                                                                                const telInfoArray = latestPbContactInfo ? latestPbContactInfo.getFreezedPhonebookContactInfozTelInfoArray() : null;
                                                                                const phonebookData = this._latestPhonebookArray.find((phonebookData) => {
                                                                                    const phonebookName = phonebookData.phonebook;
                                                                                    const b = phonebookName === autoDialViewzPhoneBookContact.getPhonebookName();
                                                                                    return b;
                                                                                });
                                                                                let sShared;
                                                                                if (!phonebookData) {
                                                                                    sShared = "(" + i18n.t("Deleted") + ")";
                                                                                } else if (phonebookData.shared == "true" || phonebookData.shared === true) {
                                                                                    sShared = "✓";
                                                                                } else {
                                                                                    sShared = "";
                                                                                }

                                                                                return (
                                                                                    <tr key={i}
                                                                                        style={{height: "42px"}}>
                                                                                        <td>{autoDialViewzPhoneBookContact.getPhonebookName()}</td>
                                                                                        <td style={{textAlign: "center"}}>{sShared}</td>
                                                                                        <td>{autoDialViewzPhoneBookContact.getDisplayName()}</td>
                                                                                        <td>
                                                                                            <div style={{
                                                                                                display: "flex",
                                                                                                alignItems: "center",
                                                                                                justifyContent: "center"
                                                                                            }}>
                                                                                                {!telInfoArray && (
                                                                                                    <button
                                                                                                        title={i18n.t(`Call`)}
                                                                                                        className="kbc-button kbc-button-fill-parent legacyButtonPadding brOCDefaultKbcButtonMargin"
                                                                                                        onClick={(e) => this._callOrOpenPhonebookCallInfozTelsView(e, autoDialViewzPhoneBookContact)}
                                                                                                    >
                                                                                                        <FontAwesomeIcon
                                                                                                            size="lg"
                                                                                                            icon="fas fa-phone"/>
                                                                                                    </button>
                                                                                                )}
                                                                                                {telInfoArray && telInfoArray.length === 1 && (
                                                                                                    <button
                                                                                                        title={i18n.t(`Call`)}
                                                                                                        className="kbc-button kbc-button-fill-parent legacyButtonPadding brOCDefaultKbcButtonMargin"
                                                                                                        onClick={(e) => this._callPhonebookCallInfozTel(e, telInfoArray[0])}
                                                                                                    >
                                                                                                        <FontAwesomeIcon
                                                                                                            size="lg"
                                                                                                            icon="fas fa-phone"/>
                                                                                                    </button>
                                                                                                )}
                                                                                                {telInfoArray && telInfoArray.length > 1 && (
                                                                                                    <a onClick={(e) => this._openPhonebookCallInfozTelsView(latestPbContactInfo)}>
                                                                                                        <FontAwesomeIcon
                                                                                                            size="lg"
                                                                                                            icon="fas fa-phone"/>
                                                                                                    </a>
                                                                                                )}
                                                                                            </div>
                                                                                        </td>
                                                                                        <td>
                                                                                            <div style={{
                                                                                                display: "flex",
                                                                                                alignItems: "center",
                                                                                                justifyContent: "center"
                                                                                            }}>
                                                                                                <a onClick={(e) => this._openPhonebookCallInfozInfoView2(autoDialViewzPhoneBookContact)}>
                                                                                                    {<FontAwesomeIcon
                                                                                                        size="lg"
                                                                                                        icon="fas fa-info-circle"/>}
                                                                                                </a>
                                                                                            </div>
                                                                                        </td>
                                                                                        <td>
                                                                                            {isDeletable && (
                                                                                                <div style={{
                                                                                                    display: "flex",
                                                                                                    alignItems: "center",
                                                                                                    justifyContent: "center"
                                                                                                }}>
                                                                                                    <Popconfirm
                                                                                                        title={i18n.t("are_you_sure")}
                                                                                                        onConfirm={() => this._deleteContact2(autoDialViewzPhoneBookContact)}
                                                                                                        okText={i18n.t("yes")}
                                                                                                        cancelText={i18n.t("no")}
                                                                                                    >
                                                                                                        <a>
                                                                                                            {
                                                                                                                <FontAwesomeIcon
                                                                                                                    size="lg"
                                                                                                                    icon="fa fa-trash"/>}
                                                                                                        </a>
                                                                                                    </Popconfirm>
                                                                                                </div>
                                                                                            )}
                                                                                        </td>
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
                                                        <tr className="addContact_AutoDialView_ver2">
                                                            <td colSpan="3" className="addContact_AutoDialView_ver2"
                                                                style={{paddingRight: "4px", paddingTop: "4px"}}>
                                                                <div style={{
                                                                    display: "flex",
                                                                    alignItems: "center",
                                                                    justifyContent: "end"
                                                                }}>
                                                                    <Button
                                                                        onClick={(e) => this._openAddContactView()}>{i18n.t("Add_contact")}</Button>
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