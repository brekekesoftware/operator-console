import React from "react";
import DropDownMenu from "../DropDownMenu";
import i18n from "../i18n";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import Button from "antd/lib/button";
import Popconfirm from "antd/lib/popconfirm";
import Notification from "antd/lib/notification";
import "../runtime/reset.css"
import "../runtime/AutoDialView_ver2.css"
import BrekekeOperatorConsole from "../index";
import OCUtil from "../OCUtil";
import {CallHistory2} from "../CallHistory2";
import {Checkbox, Input, Switch} from "antd";
import Spin from "antd/lib/spin";
import EditorPhonebookContactInfozTelsView from "./EditorPhonebookContactInfozTelsView";
import EditorPhonebookContactInfozInfoView from "./EditorPhonebookContactInfozInfoView";
import PhonebookContactInfo_AutoDialView_ver2 from "../runtime/PhonebookContactInfo_AutoDialView_ver2";
import Select from "antd/lib/select";
import RuntimeUcUserStatuses from "./RuntimeUcUserStatuses";
import PhonebookContact_AutoDialView_ver2 from "../runtime/PhonebookContact_AutoDialView_ver2";
import CallHistory2CallInfo from "../CallHistory2CallInfo";
import LegacyButtonEditorSubWidgetSettings_autoDialButton
    from "./widget/settings/legacyButtonEditorSubWidgetSettings/LegacyButtonEditorSubWidgetSettings_autoDialButton";
import "./EditorAutoDialView_ver2.css";
let AUTO_DIAL_VIEW_VER2;
const _GET_CONTACT_LIST_LIMIT = 50;   //!limit max 1000
const _GET_VOICEMAIL_LIST_LIMIT = 50;   //!limit max 1000
const _EXTENSION_FILTER_COLUMN_NAME_DEFAULT_VALUE = "extensionNumber";
const MAX_DATE_MILLISECONDS = 999;
const MAX_DATE_YEAR = 275759;
const VOICEMAIL_STATUS_MESSAGE_KEYS = {
    new: "Voicemail-status_New",
    saved: "Voicemail-status_Saved",
    read: "Voicemail-status_Read",
}
const VOICEMAIL_STATUS_OTHER_MESSAGE_KEY = "Voicemail-status_Other";
const VOICEMAIL_TYPE_MESSAGE_KEYS = {   //freeze
    "voicemail" : "Voicemail-type_voicemail",
    "call-recording" : "Voicemail-type_call-recording",
    "ivr" : "Voicemail-type_ivr"
}
const VOICEMAIL_TYPE_OTHER_MESSAGE_KEY = "Voicemail-type_other";
const VOICEMAIL_FILTER_STATUS_VALUE_READ = 3;
const VOICEMAIL_FILTER_STATUS_VALUES = {
    new : 1,
    saved : 2,
    read : VOICEMAIL_FILTER_STATUS_VALUE_READ
}
const FILTER_NONE_MESSAGE_KEY = "Filter-None";
const FILTER_NONE_VALUE = -1;
const READ_STATUS_ENABLED = false;

const _DUMMY_PHONEBOOKS_EN = [  //!wantTo freeze
    {phonebook : "phonebook1",shared:"true" },
    {phonebook : "phonebook2",shared:"true" },
];

const _DUMMY_PHONEBOOKS_JA = [  //!wantTo freeze
    {phonebook : "電話帳1",shared:"true" },
    {phonebook : "電話帳2",shared:"true" },
];

const _DUMMY_CONTACT_LIST_JA = [
    {
        aid:"15",
        display_name:"たろう 山田",
        phonebook:"電話帳1",
        user : ""
    }
];

const _DUMMY_CONTACT_LIST_EN = [
    {
        aid:"14",
        display_name:"Firstname Lastname",
        phonebook:"phonebook1",
        user : ""
    }
];

const _DUMMY_CONTACT_EN = {
    aid : "14",
    display_name : "Firstname Lastname",
    info : {
        $address: "myAddress",
        $company : "myCompany",
        $email : "email@email.email",
        $firstname : "Firstname",
        $lastname : "Lastname",
        $notes : "myNotes",
        $tel_ext : "444",
        $tel_home : "111",
        $tel_mobile : "333",
        $tel_other : "555",
        $tel_work : "222",
        Fax : "666",
        Nickname : "myNickname",
        Website : "https://my.web.site",
        myCustom1 : "myCustom1",
        myCustom2 : "myCustom2",
    },
    phonebook : "phonebook1",
    shared : "true"
};

const _DUMMY_CONTACT_JA = {
    aid : "15",
    display_name : "たろう 山田",
    info : {
        $address: "東京都 新宿区 新宿 97-98-99",
        $company : "やまだ株式会社",
        $email : "email@email.email",
        $firstname : "たろう",
        $lastname : "山田",
        $notes : "ノート1",
        $tel_ext : "444",
        $tel_home : "0X-1234-5678",
        $tel_mobile : "0X0-1111-2222",
        $tel_other : "0X-8888-9999",
        $tel_work : "0X-8765-4321",
        Fax : "0X-6666-7777",
        Website : "https://taro.yamada.taro",
        カスタム名1 : "カスタム値1",
        カスタム名2 : "カスタム値2",
    },
    phonebook : "電話帳1",
    shared : "true"
};

const _DUMMY_VOICEMAILS = [ //!freeze
    {
        from:"sip:abcdefghij@127.0.0.1",
        id:"1764194081357",
        length:"5",
        rec_id:"fed030e951ac69acc04a69174ad4202467ca84ee058d5a254c291e138aac3ed6",
        status : "new",
        time:"1764194081356",
        to:"9876543210",
        type:"call-recording"
    },
    {
        from: "sip:0123456789@127.0.0.1",
        id: "1764188190158",
        length: "9",
        rec_id: "fed030e951ac69ac413d1fd6077c80898ca74819dfcd1d1e07fb39b08bc520b9",
        status: "saved",
        time: "1764188190157",
        to: "9876543210",
        type: "voicemail"
    }
];

const _DUMMY_EXTENSIONS_EN = [ //!freeze
    {id:"abcdefghij", name:"abcdefghij_name"}
];

const _DUMMY_EXTENSIONS_JA = [ //!freeze
    {id:"0123456789", name:"0123456789_名前"}
];


const _DUMMY_CALLINFOARRAY_JA = [   //!freeze
    new CallHistory2CallInfo({
        addCallMillisTime : 1764187669128,
        answeredAt : 1764187669428,
        callHistory2AsParent : null,
        endCallMillisTime : 1764187675387,
        isIncoming : true,
        isTransfer : true,
        partyNumber : "0123456789",
        uuid : "01234567-0123-0123-0123-0123456789ab",
        recId : "00000000000000000000000000"
    })
];

const _DUMMY_CALLINFOARRAY_EN = [   //!freeze
    new CallHistory2CallInfo({
        addCallMillisTime : 1764187669128,
        answeredAt : 1764187669428,
        callHistory2AsParent : null,
        endCallMillisTime : 1764187675387,
        isIncoming : true,
        isTransfer : true,
        partyNumber : "abcdefghij",
        uuid : "01234567-0123-0123-0123-0123456789ab",
        recId : "00000000000000000000000000"
    })
];

export default class EditorAutoDialView_ver2 extends React.Component {
    constructor( props ){
        super(props);
        this.state = {
            recentShowDetailChecked : false
        };
        this._checkAll_voicemails = false;


        // const oc = BrekekeOperatorConsole.getStaticInstance();
        // oc.getCallHistory2().sortIfNeed();
        AUTO_DIAL_VIEW_VER2 = this;
        this._phonebookContactInfoArray = null;
        this._autoDialViewzPhonebookContactArray = null;
        this._filteredExtensionArray = null;
        this._currentExtensionFilterColumnName = _EXTENSION_FILTER_COLUMN_NAME_DEFAULT_VALUE;
        this.clearLatestSearchInfo();

        this._callInfoArrayForDisplay = null;
        this._voicemails = undefined;
        this._totalVoicemailCount = 0;
        this._newVoicemailCount = 0;
        this._savedVoicemailCount = 0;
        this._readVoicemailCount = 0;
        this._checkedVoicemailMap = {};	//Voicemail ID:checked
        this._voicemailsDisplayOrder = "desc";
        this._voicemailsFilterStatus = FILTER_NONE_VALUE;
        this._latestVoicemailsFilterStatus = FILTER_NONE_VALUE;
        this._voicemailsFilterOtherParty = "";
        this._latestVoicemailsFilterOtherParty = "";
		this._voicemailsTimeOrder = "desc";
		this._latestVoicemailsTimeOrder = this._voicemailsTimeOrder;
    }

    _getDummyCallHistory2CallInfoArray(){
        const oc = BrekekeOperatorConsole.getStaticInstance();
        const lang = oc.getLoggedinLanguage();
        let callHistory2CallInfoArray;
        if( lang === "ja" ){
            callHistory2CallInfoArray = _DUMMY_CALLINFOARRAY_JA;
        }
        else{
            callHistory2CallInfoArray = _DUMMY_CALLINFOARRAY_EN;
        }
        return callHistory2CallInfoArray;
    }

    static _getDummyExtensionStatusClassName( extensionId, extensionsStatus ) {
        return "led-grey";
        // const status = Object.values(extensionsStatus?.[extensionId]?.callStatus || {});
        // const statusClassName = (status.find(s => s === 'talking') && 'led-red') ||
        //     (status.find(s => ['holding', 'calling', 'ringing'].includes(s)) && 'led-yellow') ||
        //     (extensionsStatus?.[extensionId]?.registered ? 'led-green' : 'led-grey');
        // return statusClassName;
    }

    _getDummyExtensions(){
        const oc = BrekekeOperatorConsole.getStaticInstance();
        const lang = oc.getLoggedinLanguage();
        let extensions;
        if( lang === "ja" ){
            extensions = _DUMMY_EXTENSIONS_JA;
        }
        else{
            extensions = _DUMMY_EXTENSIONS_EN;
        }
        return extensions;
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

    _getDummyContactList(){
        const oc = BrekekeOperatorConsole.getStaticInstance();
        const lang = oc.getLoggedinLanguage();
        let contactList;
        if( lang === "ja" ){
            contactList = _DUMMY_CONTACT_LIST_JA;
        }
        else{
            contactList = _DUMMY_CONTACT_LIST_EN;
        }
        return contactList;
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

    clearLatestSearchInfo(){
        this._latestSearchPhonebookName = null;
        this._latestSearchPhonebookShared = null;
        this._latestSearchPhonebookKeywords = null;
        this._latestSearchPhonebookDate = null;
    }

    _onSelectVoicemailsDisplayOrder(s){
        this._voicemailsDisplayOrder = s;
        this.setState({rerender:true});
    }

    _onSelectVoicemailsFilterStatus(i){
        this._voicemailsFilterStatus = i;
        this.setState({rerender:true});
    }

    _onChangeVoicemailsFilterOtherParty(s){
        this._voicemailsFilterOtherParty = s;
        this.setState({rerender:true});
    }
	
	_onSelectVoicemailsTimeOrder(s){
        this._voicemailsTimeOrder = s;
        this.setState({rerender:true});
    }

    _getPhonebookScrollableDivElement(){

        return document.getElementById("phonebookScrollableDiv_brOC_AutoDialView_ver2");

        //!commentOut It seems that caching is not possible with react.
        // if( !this._PhonebookScrollableDivElement ){
        //     this._PhonebookScrollableDivElement =document.getElementById("phonebookScrollableDiv_brOC_AutoDialView_ver2");
        // }
        // return this._PhonebookScrollableDivElement;
    }

    _getVoicemailScrollableDivElement(){

        return document.getElementById("voicemailScrollableDiv_brOC_AutoDialView_ver2");

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

    _isVoicemailScrollableDivzVerticalScrollbarVisible(){
        const e = this._getVoicemailScrollableDivElement();
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
        const pbxDirectoryname = oc.getLoginPbxDirectoryName();
        if( pbxDirectoryname ){
            pbxDirString = "/" + pbxDirectoryname;
        }
        else{
            pbxDirString = "";
        }

        const phoneBookJsSrc = "https://" + oc.getLoggedinPbxHost() + portString + pbxDirString + "/common/js/brekeke/phonebook/phonebook.js";  //!hardcode https
        this._loadJavascript( phoneBookJsSrc, document.body );
    }

    //from SipUtil.java( SIPServer/PBX )
    static _sipurlToUser( url ){
        if( url === undefined || url === null || url.length == 0 ){
            return "";
        }
        if( url.length > 4 && url[ 3 ] === ':'  ){
            const a = url.indexOf( '@' );
            if( a < 0 ){
                return url.substring( 4 );
            }
            return url.substring( 4, a );
        }else{ //number
            const a = url.indexOf( '@');
            if( a >= 0 ){
                return url.substring( 0, a );
            }
            return url;
        }
    }

    async _resetVoicemailsAsync(){
        //this.setState({rerender:true});
        if( this._voicemails ){
            this._voicemails.length = 0;
        }
        this._appendVoicemailsRecursive(true);
        //this._getVoicemailsAsync();
    }

    _resetPhonebookContactInfoArray( pbKeywords, pbShared, pbName ){
        const oc = BrekekeOperatorConsole.getStaticInstance();
        this._latestPhonebookArray = this._getDummyPhonebooks();
        if( !pbName ) {
            pbName = this._latestPhonebookArray[0];
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
        this._appendDummyPhonebookContacts();
        this.setState({rerender:true});
    }

    _appendVoicemailsRecursive( isFirstTime ){
        setTimeout( () =>{
            // if( !this._voicemails ){
            //     this._voicemails = new Array();
            // }

            if( this._isVoicemailScrollableDivzVerticalScrollbarVisible() !== true || isFirstTime === true ){
                const voicemailCount = this._appendDummyVoicemails();
                this.setState({rerender:true});
                if( voicemailCount > 0 ){
                    this._appendVoicemailsRecursive( false );
                }
                else{
                    this._resetVoicemailStatusCount();
                }
            }
            else{
                this._resetVoicemailStatusCount();
                this.setState({rerender:true});
            }
        },1);
    }

    static getStaticInstance(){
        return AUTO_DIAL_VIEW_VER2;
    }

    _clearCallNoHistory2( this_){
        // const oc = BrekekeOperatorConsole.getStaticInstance();
        // const promise = oc.getCallHistory2().clearCallHistory2(
        //     () =>{
        //         Notification.success({ key: 'sync', message: i18n.t("saved_data_to_pbx_successfully") });
        //     },
        //     ( errorOrResponse ) =>{
        //         OCUtil.logErrorWithNotification("Failed to clear call histories.", i18n.t("failed_to_save_data_to_pbx"), errorOrResponse );
        //     },
        //     oc.getPalRestApi()
        // );

    }

    _onCheck_voicemailsChange(e,sId){
        const bChecked = e.target.checked;
        this._checkedVoicemailMap[ sId ] = bChecked;
        this.setState({rerender:true});
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

    _getArrayTabs(){
        const tabs = document.getElementsByClassName('tab');
        const arrayTabs = Array.prototype.slice.call(tabs);
        return arrayTabs;
    }

    _tabSwitchMain(tgt){
        document.getElementsByClassName('is-active')[0].classList.remove('is-active');
        tgt.classList.add('is-active');

        document.getElementsByClassName('is-show')[0].classList.remove('is-show');
        //const tabs = document.getElementsByClassName('tab');
        const arrayTabs = this._getArrayTabs();
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
        //this._checkMissedCall();

    }

    _onClickClose(){
        const oc = BrekekeOperatorConsole.getStaticInstance();
        this.trySetInvisible();

        //!forBug need?
        // const pbContactInfozInfoView = EditorPhonebookContactInfozInfoView.getStaticPhonebookContactInfozInfoViewInstance();
        // const pbContactInfozTelsView = EditorPhonebookContactInfozTelsView.getStaticPhonebookContactInfozTelsViewInstance();
        // pbContactInfozTelsView.closePhonebookContactInfozTelsView( () => {
        //     pbContactInfozInfoView.closePhonebookContactInfozInfoView(  () => pbContactInfozInfoView.openPhonebookContactInfozInfoView() );
        // });

        EditorPhonebookContactInfozTelsView.getStaticPhonebookContactInfozTelsViewInstance().closePhonebookContactInfozTelsView();
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

    _resetVoicemailStatusCount(){
        if( this._voicemails ){
            this._newVoicemailCount = 0;
            this._savedVoicemailCount = 0;
            this._readVoicemailCount = 0;

            const checkedVoicemailMapOld = this._checkedVoicemailMap;
            this._checkedVoicemailMap = {};

            this._totalVoicemailCount = this._voicemails.length;
            for( let i = 0; i < this._voicemails.length; i++ ){
                const voicemail = this._voicemails[i];
                const sStatus = voicemail["status"];
                if( sStatus === "new" ){
                    this._newVoicemailCount++;
                }
                else if( sStatus === "read"){
                    this._readVoicemailCount++;
                }
                else if( sStatus === "saved"){
                    this._savedVoicemailCount++;
                }

                const sId = voicemail["id"];
                const checked = checkedVoicemailMapOld[sId];
                if( checked === false || checked === true ){
                    this._checkedVoicemailMap[sId] = checked;
                }
            }

        }
        else{
            this._totalVoicemailCount = 0;
            this._newVoicemailCount = 0;
            this._savedVoicemailCount = 0;
            this._readVoicemailCount = 0;
            this._checkedVoicemailMap = {};
        }
        //this.setState({rerender:true});
    }

    async _onClickSearchVoicemails(){
        this._latestVoicemailsFilterStatus = this._voicemailsFilterStatus;
        this._latestVoicemailsFilterOtherParty = this._voicemailsFilterOtherParty;
		this._latestVoicemailsTimeOrder = this._voicemailsTimeOrder;

        this._resetVoicemailsAsync();

        // this._voicemails = await this._getVoicemailsAsync();
        // if( this._voicemails === undefined ){
        //     this._voicemails = null;
        // }
        //
        // if( this._voicemails ){
        // 	this._newVoicemailCount = 0;
        // 	this._savedVoicemailCount = 0;
        // 	this._readVoicemailCount = 0;
        //
        // 	const checkedVoicemailMapOld = this._checkedVoicemailMap;
        // 	this._checkedVoicemailMap = {};
        //
        // 	this._totalVoicemailCount = this._voicemails.length;
        // 	for( let i = 0; i < this._voicemails.length; i++ ){
        // 		const voicemail = this._voicemails[i];
        // 		const sStatus = voicemail["status"];
        // 		if( sStatus === "new" ){
        // 			this._newVoicemailCount++;
        // 		}
        // 		else if( sStatus === "read"){
        // 			this._readVoicemailCount++;
        // 		}
        // 		else if( sStatus === "saved"){
        // 			this._savedVoicemailCount++;
        // 		}
        //
        // 		const sId = voicemail["id"];
        // 		const checked = checkedVoicemailMapOld[sId];
        // 		if( checked === false || checked === true ){
        // 			this._checkedVoicemailMap[sId] = checked;
        // 		}
        // 	}
        //
        // }
        // else{
        // 	this._totalVoicemailCount = 0;
        // 	this._newVoicemailCount = 0;
        // 	this._savedVoicemailCount = 0;
        // 	this._readVoicemailCount = 0;
        // 	this._checkedVoicemailMap = {};
        // }
        // this.setState({rerender:true});
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
        let exts = this._getDummyExtensions();
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
        this._resetPhonebookContactInfoArray();
    }

    // async _downloadVoicemailFromUrl( url, voicemail ){
    //     const sVoicemailStatus = voicemail["status"];
    //     if( sVoicemailStatus !== "read" ) {
    //         const sVoicemailId = voicemail["id"];
    //         const bSuccess = await this._modifyVoicemailReadAsync(sVoicemailId);
    //         if (!bSuccess) {
    //             this._resetVoicemailsAsync();
    //             return;
    //         }
    //     }
    //
    //     const eA = document.createElement("A");
    //     document.body.appendChild(eA);
    //     eA.href = url;
    //     eA.download = "";
    //     eA.type = "application/wav";
    //     eA.click();
    //     eA.remove();
    //     this._resetVoicemailsAsync();
    // }

    // _downloadRecordWavFromUrl( urlPrefix, recId ){
    //     const eA = document.createElement("A");
    //     document.body.appendChild(eA);
    //     eA.href = urlPrefix + recId;
    //     eA.download = "";
    //     eA.type = "application/wav";
    //     eA.click();
    //     eA.remove();
    // }

    // async _modifyVoicemailReadAsync( sVoicemailId ){
    //     const modifyVoicemailOptions ={
    //         methodName : "modifyVoicemails",
    //         methodParams : JSON.stringify({
    //             id: sVoicemailId,
    //             status : "read"
    //         }),
    //     }
    //     const oc = BrekekeOperatorConsole.getStaticInstance();
    //     const oResult = await oc.getPalRestApi().callPalRestApiMethodAsync( modifyVoicemailOptions ).catch( (resOrError) =>{
    //         OCUtil.logErrorWithNotification("Failed to modify voice mail. voiceMailId=" + sVoicemailId, i18n.t("Failed_to_modify_voice_mail"), resOrError );
    //         return false;
    //     });
    //     const modifyCount = oResult["count"];
    //     const bSuccess = modifyCount === 1;
    //     if( !bSuccess ){
    //         console.error("The modified voice mail count is not 1. voiceMailId=" + sVoicemailId );
    //         OCUtil.logErrorWithNotification("Failed to modify voice mail.", i18n.t("Failed_to_modify_voice_mail"));
    //     }
    //     return bSuccess;
    // }

    reshowVoicemails(){
        const canShow = true;
        if( canShow ) {
            this._resetVoicemailsAsync();
        }
        return canShow;
    }

    reshowContactList(){
        // const canShow = ( !this._latestSearchPhonebookKeywords === undefined || !this._latestSearchPhonebookKeywords !== null  ) &&
        //     ( this._latestSearchPhonebookShared !== undefined || this._latestSearchPhonebookShared !== null ) &&
        //     !!this._latestSearchPhonebookName
        // ;
        const canShow = !!this._latestSearchPhonebookDate;
        if( canShow ){
            this._resetPhonebookContactInfoArray();
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

    _onScrollVoicemailScrollableDiv(e){

        if( this._isVoicemailScrollableDivzVerticalScrollbarVisible() !== true ){
            return;
        }

        const {scrollHeight, scrollTop, clientHeight, offsetHeight} = e.target;

        //if (Math.abs(scrollHeight - clientHeight - scrollTop) < 1) {  //!comment not perfect
        if ( scrollHeight - offsetHeight - scrollTop < 1  ) {
            this._appendDummyVoicemails();
            this._resetVoicemailStatusCount();
            this.setState({rerender:true});
        }
    }

    _getDummyVoicemails(){
        const voicemails = _DUMMY_VOICEMAILS;
        return voicemails;
    }


    async _appendDummyVoicemails(){
        const options = {};

        let initVoicemailCount;
        if( this._voicemails ){
            initVoicemailCount = this._voicemails.length;
        }
        else{
            initVoicemailCount = 0;
        }
        options["offset"] = initVoicemailCount;

        if( _GET_VOICEMAIL_LIST_LIMIT > 0 ){
//            options["limit"] = _GET_VOICEMAIL_LIST_LIMIT + initVoicemailCount;
            options["limit"] = _GET_VOICEMAIL_LIST_LIMIT;
        }
		
		options["order"] = this._latestVoicemailsTimeOrder;

        // const getVoicemailsOptions ={
        //     methodName : "getVoicemails",
        //     methodParams : JSON.stringify( options ),
        // }

        let voicemailCount;
        const oc = BrekekeOperatorConsole.getStaticInstance();
        const voicemails = this._getDummyVoicemails();

        if (voicemails) {
            if( !this._voicemails ){
                this._voicemails = new Array();
            }
            else{
                // const compareDisplayOrder = (voicemail1, voicemail2 )  => {
                //     const sTime1 = voicemail1["time"];
                //     const time1 = parseInt(sTime1);
                //     const sTime2 = voicemail2["time"];
                //     const time2 = parseInt(sTime2);
                //
                //     let vmResult;
                //     if( this._voicemailsDisplayOrder === "desc" ){
                //         if( time2 > time1 ){
                //             vmResult = voicemail2;
                //         }
                //         else{
                //             vmResult = voicemail1;
                //         }
                //     }
                //     else{   //asc
                //         if( time1 > time2 ){
                //             vmResult = voicemail2;
                //         }
                //         else{
                //             vmResult = voicemail1;
                //         }
                //     }
                //     return vmResult;
                // }
                // voicemails.sort( compareDisplayOrder );
            }
            voicemailCount = 0;
            for (let i = 0; i < voicemails.length; i++) {
                const voicemail = voicemails[i];
                const iStatus = VOICEMAIL_FILTER_STATUS_VALUES[ voicemail.status ];
                let bAdd = this._latestVoicemailsFilterStatus === FILTER_NONE_VALUE ||  iStatus === this._latestVoicemailsFilterStatus;
                if( bAdd ) {
                    const latestVoicemailsFilterOtherPartyTrimmedLower = this._latestVoicemailsFilterOtherParty.trim().toLowerCase();
                    bAdd = latestVoicemailsFilterOtherPartyTrimmedLower.length === 0;
                    if (!bAdd) {
                        const sFrom = voicemail["from"];
                        let sOtherPartyTrimmedLower = EditorAutoDialView_ver2._sipurlToUser(sFrom);
                        if (sOtherPartyTrimmedLower) {
                            sOtherPartyTrimmedLower = sOtherPartyTrimmedLower.trim().toLowerCase();
                        }
                        bAdd = latestVoicemailsFilterOtherPartyTrimmedLower === sOtherPartyTrimmedLower;
                    }
                }

                if( bAdd ){
                    this._voicemails.push(voicemail);
                    voicemailCount++;
                }
            }
        }
        else{
            voicemailCount = -1;
        }
        return voicemailCount;
    }

	_appendDummyPhonebookContacts(){
		
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

        const contactList = this._getDummyContactList();

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
        // const getContactOptions = {
        //     methodName : "getContact",
        //     methodParams : JSON.stringify({
        //         aid : autodialviewPhonebookContact.getAid()
        //     })
        // };
        // const oc = BrekekeOperatorConsole.getStaticInstance();
        // const contact = await oc.getPalRestApi().callPalRestApiMethodAsync(getContactOptions).catch((rej) => {
        //     OCUtil.logErrorWithNotification("Failed to get phonebook contact.", i18n.t('Failed_to_get_phone_book_contact'), rej );
        //     return;
        // });
        const contact = this._getDummyContact();
        const contactInfo = new PhonebookContactInfo_AutoDialView_ver2(contact);
        const telInfoArray = contactInfo.getFreezedPhonebookContactInfozTelInfoArray();
        if( !telInfoArray || telInfoArray.length === 0 ){
            this._setLatestContactInfoToAutodialviewPhonebookContact( autodialviewPhonebookContact, contactInfo );
            Notification.info({  message: i18n.t("The_phone_number_is_not_registered") });
        }
        else if( telInfoArray.length === 1 ){
            this._callPhonebookCallInfozTel( evMouseClick,telInfoArray[0], ()=>{
                this._setLatestContactInfoToAutodialviewPhonebookContact( autodialviewPhonebookContact, contactInfo );   //for wait button animation
            });
        }
        else{
            this._setLatestContactInfoToAutodialviewPhonebookContact( autodialviewPhonebookContact, contactInfo );
            this._openPhonebookCallInfozTelsView( contactInfo );
        }
    }

    _callPhonebookCallInfozTel( evMouseClick, pbContactInfozTeIInfo, onDoneFunc ){
        const tel = pbContactInfozTeIInfo.getValue();
        EditorAutoDialView_ver2.onClickCallButtonForAutoDialView( evMouseClick, tel, onDoneFunc  );
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
        const pbContactInfozTelsView = EditorPhonebookContactInfozTelsView.getStaticPhonebookContactInfozTelsViewInstance();
        pbContactInfozTelsView.closePhonebookContactInfozTelsView(() => pbContactInfozTelsView.openPhonebookContactInfozTelsView(pbContactInfo));
        //}
    }

    _setLatestContactInfoToAutodialviewPhonebookContact( autodialwiewPhonebookContact, pbContactInfo ){
        autodialwiewPhonebookContact.setLatestPhonebookContactInfo( pbContactInfo );
        this.setState({rerender:true});    //for rerender
    }

    _openPhonebookCallInfozInfoView( pbContactInfo ){
        const pbContactInfozInfoView = EditorPhonebookContactInfozInfoView.getStaticPhonebookContactInfozInfoViewInstance();
        const pbContactInfozTelsView = EditorPhonebookContactInfozTelsView.getStaticPhonebookContactInfozTelsViewInstance();
        pbContactInfozTelsView.closePhonebookContactInfozTelsView( () => {
            pbContactInfozInfoView.closePhonebookContactInfozInfoView(  () => pbContactInfozInfoView.openPhonebookContactInfozInfoView(pbContactInfo) );
        });
    }

    async _openPhonebookCallInfozInfoView2( autodialviewPhonebookContact ){
        // const getContactOptions = {
        //     methodName : "getContact",
        //     methodParams : JSON.stringify({
        //         aid : autodialviewPhonebookContact.getAid()
        //     })
        // };
        // const oc = BrekekeOperatorConsole.getStaticInstance();
        // const contact = await oc.getPalRestApi().callPalRestApiMethodAsync(getContactOptions).catch((rej) => {
        //     OCUtil.logErrorWithNotification("Failed to get phonebook contact.", i18n.t('Failed_to_get_phone_book_contact'), rej );
        //     return;
        // });
        const contact = this._getDummyContact();
        const contactInfo = new PhonebookContactInfo_AutoDialView_ver2(contact);
        this._setLatestContactInfoToAutodialviewPhonebookContact( autodialviewPhonebookContact, contactInfo );
        const pbContactInfozInfoView = EditorPhonebookContactInfozInfoView.getStaticPhonebookContactInfozInfoViewInstance();
        const pbContactInfozTelsView = EditorPhonebookContactInfozTelsView.getStaticPhonebookContactInfozTelsViewInstance();
        pbContactInfozTelsView.closePhonebookContactInfozTelsView( () => {
            pbContactInfozInfoView.closePhonebookContactInfozInfoView(  () => pbContactInfozInfoView.openPhonebookContactInfozInfoView(contactInfo) );
        });
    }

    // async _deleteContact2(  autodialviewPhonebookContact ){
    //     const getContactOptions = {
    //         methodName : "getContact",
    //         methodParams : JSON.stringify({
    //             aid : autodialviewPhonebookContact.getAid()
    //         })
    //     };
    //     const oc = BrekekeOperatorConsole.getStaticInstance();
    //     const contact = await oc.getPalRestApi().callPalRestApiMethodAsync(getContactOptions).catch((rej) => {
    //         OCUtil.logErrorWithNotification("Failed to get phonebook contact.", i18n.t('Failed_to_get_phone_book_contact'), rej );
    //         return;
    //     });
    //     const pbContactInfo = new PhonebookContactInfo_AutoDialView_ver2(contact);
    //     this._setLatestContactInfoToAutodialviewPhonebookContact( autodialviewPhonebookContact, pbContactInfo );
    //     const isShared = pbContactInfo.getIsShared() === true;
    //     const isAdmin = oc.getIsAdmin();
    //     const isDeletable = isShared === false || ( isShared === true && isAdmin === true );
    //     if( isDeletable !== true  ){
    //         const aid = pbContactInfo.getAid();
    //         console.warn("You do not have permission to delete phone book contact.. aid=" + aid);
    //         Notification.warning({
    //             message: i18n.t("You_do_not_have_permission_to_delete_phone_book_contact"),
    //         });
    //         return;
    //     }
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
    //         this._resetPhonebookContactInfoArray);
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
    //                 this._resetPhonebookContactInfoArray();
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
    //         this._resetPhonebookContactInfoArray();
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
    //                 this._resetPhonebookContactInfoArray();
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
        const pbContactInfozInfoView = EditorPhonebookContactInfozInfoView.getStaticPhonebookContactInfozInfoViewInstance();
        const pbContactInfozTelsView = EditorPhonebookContactInfozTelsView.getStaticPhonebookContactInfozTelsViewInstance();
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

    _onCheckAll_voicemailsChange(e){
        const eCheckAllVoicemails = document.getElementById("checkAll_voicemails_brOC_AutoDialView_ver2");
        const checked = eCheckAllVoicemails.checked;

        const eTbody = document.getElementById("voicemailsTbody_brOC_AutoDialView_ver2");
        for( let i = 0; true; i++ ){
            const eCheck = eTbody.querySelector('[data-br-name="check_voicemails_brOC_AutoDialView_ver2_' + i + '"]');
            if( !eCheck ){
                break;
            }
            const eId = eTbody.querySelector('[data-br-name="id_voicemails_brOC_AutoDialView_ver2_' + i + '"]');
            const sId = eId.value;
            this._checkedVoicemailMap[ sId ] = checked;
            //eCheck.checked = checked;
        }

        this._checkAll_voicemails = checked;
        this.setState({rerender:true});
    }

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
    }

    _onClickStartDatetimeCallHistoryCallButton( e, partyNumber ){
        EditorAutoDialView_ver2.onClickCallButtonForAutoDialView( e, partyNumber );
    }

    static _parseYearForAutoDialViewzCallHistory( sYear, iDefaultYear = null ) {
        if (iDefaultYear === undefined || iDefaultYear === null) {
            const dateNow = new Date();
            iDefaultYear = dateNow.getFullYear();
        }
        else{
            iDefaultYear = iDefaultYear;
        }

        let iYear = iDefaultYear;
        try{
            iYear = parseInt( sYear );
        }
        catch( err ){
            //console.log("AutoDialView toYear: Failed to parseInt. Year(String)=" + sYear );
        }
        if( isNaN( iYear ) ){
            iYear = iDefaultYear;
        }
        else if( iYear < 0 ){
            iYear = 0;
        }
        else if( iYear > MAX_DATE_YEAR ){
            iYear = MAX_DATE_YEAR;
        }
        return iYear;
    }

    static _parseMonthForAutoDialViewzCallHistory( sMonth ){
        let iMonth = 12;
        try{
            iMonth = parseInt( sMonth );
        }
        catch( err ){
            //console.log("AutoDialView toMonth: Failed to parseInt. Month(String)=" + sMonth );
        }
        if( isNaN( iMonth ) ){
            iMonth = 12;
        }
        else if( iMonth < 1 ){
            iMonth = 1;
        }
        else if( iMonth > 12 ){
            iMonth = 12;
        }
        return iMonth;
    }

    static _parseDayForAutoDialViewzCallHistory( sDay ){
        let iDay = 1;
        try{
            iDay = parseInt( sDay );
        }
        catch( err ){
            //console.log("AutoDialView fromDay: Failed to parseInt. Day(String)=" + sDay );
        }
        if( isNaN( iDay ) ){
            iDay = 1;
        }
        else if( iDay < 1 ){
            iDay = 1;
        }
        else if( iDay > 31 ){
            iDay = 31;
        }
        return iDay;
    }

    _getDatetimeDescCallInfoArrayForDisplay( iFromYear = null, iFromMonth = null, iFromDay = null, iFromHour = null, iFromMinute = null, iToYear = null, iToMonth = null, iToDay = null, iToHour = null, iToMinute = null ){
        if( iFromYear === undefined || iFromYear === null ){
            iFromYear = this._latestCallHistoryFromYearInt;
        }
        if( iFromMonth === undefined || iFromMonth === null ){
            iFromMonth = this._latestCallHistoryFromMonthInt;
        }
        if( iFromDay === undefined || iFromDay === null ){
            iFromDay = this._latestCallHistoryFromDayInt;
        }
        if( iFromHour === undefined || iFromHour === null ){
            iFromHour = this._latestCallHistoryFromHourInt;
        }
        if( iFromMinute === undefined || iFromMinute === null ){
            iFromMinute = this._latestCallHistoryFromMinuteInt;
        }

        if( iToYear === undefined || iToYear === null ){
            iToYear = this._latestCallHistoryToYearInt;
        }
        if( iToMonth === undefined || iToMonth === null ){
            iToMonth = this._latestCallHistoryToMonthInt;
        }
        if( iToDay === undefined || iToDay === null ){
            iToDay = this._latestCallHistoryToDayInt;
        }
        if( iToHour === undefined || iToHour === null ){
            iToHour = this._latestCallHistoryToHourInt;
        }
        if( iToMinute === undefined || iToMinute === null ){
            iToMinute = this._latestCallHistoryToMinuteInt;
        }

        const oc = BrekekeOperatorConsole.getStaticInstance();
        //const callHistory2 = oc.getCallHistory2();
        //const callInfoArray = callHistory2.getCallHistory2CallInfoArray();
        const callInfoArray = this._getDummyCallHistory2CallInfoArray();

        const systemSettingsData = oc.getSystemSettingsData();
        //callHistory2.sortIfNeed( CallHistory2.RECENT_DISPLAY_ORDERS.ADD_DATETIME_DESC  );

        //const dateFrom = new Date( iFromYear, iFromMonth - 1, iFromDay, iFromHour, iFromMinute );
        //const bChangeFrom = this._setBeforeMaxDateToDayDate( dateFrom, iFromMonth );

        //const dateTo = new Date( iToYear, iToMonth -1, iToDay, iToHour, iToMinute, 0, 0 );
        //const bChangeTo = this._setBeforeMaxDateToDayDate( dateTo, iToMonth );

        const callInfoArrayDateFiltered = new Array();
        // if( dateFrom > dateTo ){
        //     //console.log();
        // }
        // else if( callInfoArray ){
            for (let i = 0; i < callInfoArray.length; i++) {
                const callInfo = callInfoArray[i];
                // const dStartedAt = new Date(callInfo.getAddCallMillisTime())  //!overhead //!cost
                // if( (dStartedAt >= dateFrom &&  dStartedAt < dateTo)  ){
                    callInfoArrayDateFiltered.push( callInfo);
                //}
            }
        //}

        const recentDisplayCount = systemSettingsData.getAutoDialMaxDisplayCount();
        const callInfoArrayForDisplay = callInfoArrayDateFiltered.slice(0, recentDisplayCount);
        return callInfoArrayForDisplay;
    }

    // _setBeforeMaxDateToDayDate( date, iWishMonth ){
    //     const iDateWishMonth = iWishMonth - 1;
    //     const iMonth = date.getMonth();
    //     if( iMonth === iDateWishMonth ){
    //         return false;
    //     }
    //     else{
    //         const dateBefore = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    //         for( let day = 1;; day++ ) {
    //             dateBefore.setDate(date.getDate() - day);
    //             if (dateBefore.getMonth() == iDateWishMonth) {
    //                 date.setFullYear( dateBefore.getFullYear());
    //                 date.setMonth( dateBefore.getMonth());
    //                 date.setDate( dateBefore.getDate());
    //                 date.setHours( 23 );
    //                 date.setMinutes( 59 );
    //                 date.setSeconds( 59 );
    //                 date.setMilliseconds( MAX_DATE_MILLISECONDS  );
    //                 break;
    //             }
    //         }
    //         return true;
    //     }
    // }

    _resetFromDateToDate(){

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

        const dateFrom = new Date();
        const iFromFullYear = dateFrom.getFullYear();
        const sFromFullYear = iFromFullYear.toString();
        const iFromMonth = dateFrom.getMonth() + 1;
        const sMonth = iFromMonth.toString();
        const iFromDay = dateFrom.getDate();
        const sFromDay = iFromDay.toString();

        this._callInfosFromYear = sFromFullYear;
        this._callInfosFromMonth = sMonth;
        this._callInfosFromDay = sFromDay;
        const iFromHour = 0;
        this._callInfosFromHour = iFromHour.toString().padStart(2,'0');
        const iFromMinute = 0;
        this._callInfosFromMinute = iFromMinute.toString().padStart(2,'0');

        const dateFromMax = OCUtil.getMaxDayDate( iFromFullYear, iFromMonth );
        this._callInfosMaxFromDate = new Date( dateFromMax.getTime());

        const dateTo = new Date( dateFrom.getFullYear(), dateFrom.getMonth(), dateFrom.getDate() + 1 );
        const iToFullYear = dateTo.getFullYear();
        this._callInfosToYear = iToFullYear.toString();
        const iToMonth = dateTo.getMonth() + 1;
        this._callInfosToMonth = iToMonth.toString();
        const iToDay = dateTo.getDate();
        this._callInfosToDay = iToDay.toString();
        const iToHour = 0;
        this._callInfosToHour = iToHour.toString().padStart(2,'0');
        const iToMinute = 0;
        this._callInfosToMinute = iToMinute.toString().padStart(2,'0');

        const dateToMax = OCUtil.getMaxDayDate( iToFullYear, iToMonth );
        this._callInfosMaxToDate = new Date( dateToMax.getTime());

        this._latestCallHistoryFromYearInt = iFromFullYear;
        this._latestCallHistoryFromMonthInt = iFromMonth;
        this._latestCallHistoryFromDayInt = iFromDay;
        this._latestCallHistoryFromHourInt = iFromHour;
        this._latestCallHistoryFromMinuteInt = iFromMinute;

        this._latestCallHistoryToYearInt = iToFullYear;
        this._latestCallHistoryToMonthInt = iToMonth;
        this._latestCallHistoryToDayInt = iToDay;
        this._latestCallHistoryToHourInt = iToHour;
        this._latestCallHistoryToMinuteInt = iToMinute;
    }

    onShowAutoDialView_ver2ByOperatorConsole( operatorConsoleAsCaller ){
        const bFirstShowTime = !this._callInfoArrayForDisplay;
        if( !bFirstShowTime ){
            return;
        }

        this._resetFromDateToDate();

        this.setState({rerender:true});
    }

    _onClickForGetDatetimeDescCallInfoArrayForDisplay(){
        //Date from begin.
        //
        //const eFromYear = document.getElementById("brOC_autoDialView_ver2_callInfos_fromYear");
        //const sFromYear = eFromYear.value;
        const sFromYear = this._callInfosFromYear;
        const iFromYear = EditorAutoDialView_ver2._parseYearForAutoDialViewzCallHistory( sFromYear );

        // const eFromMonth = document.getElementById("brOC_autoDialView_ver2_callInfos_fromMonth");
        // const sFromMonth = eFromMonth.value;
        const sFromMonth = this._callInfosFromMonth;
        const iFromMonth = EditorAutoDialView_ver2._parseYearForAutoDialViewzCallHistory( sFromMonth );

        // const eFromDay = document.getElementById("brOC_autoDialView_ver2_callInfos_fromDay");
        // const sFromDay = eFromDay.value;
        const sFromDay = this._callInfosFromDay;
        const iFromDay = EditorAutoDialView_ver2._parseDayForAutoDialViewzCallHistory( sFromDay )

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
        const iToYear = EditorAutoDialView_ver2._parseYearForAutoDialViewzCallHistory( sToYear );

        // const eToMonth = document.getElementById("brOC_autoDialView_ver2_callInfos_toMonth");
        // const sToMonth = eToMonth.value;
        const sToMonth = this._callInfosToMonth;
        const iToMonth = EditorAutoDialView_ver2._parseMonthForAutoDialViewzCallHistory( sToMonth);


        // const eToDay = document.getElementById("brOC_autoDialView_ver2_callInfos_toDay");
        // const sToDay = eToDay.value;
        const sToDay = this._callInfosToDay;
        const iToDay = EditorAutoDialView_ver2._parseDayForAutoDialViewzCallHistory( sToDay )

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
        let iToMinute = 0;
        try{
            iToMinute = parseInt( sToMinute );
        }
        catch( err ){
            //console.log("AutoDialView toMinute: Failed to parseInt. toMinute(String)=" + sToMinute );
        }
        if( isNaN( iToMinute ) ){
            iToMinute = 0;
        }
        else if( iToMinute < 0 ){
            iToMinute = 0;
        }
        else if( iToMinute > 59){
            iToMinute = 59;
        }
        //
        //Date to end.

        this._latestCallHistoryFromYearInt = iFromYear;
        this._latestCallHistoryFromMonthInt = iFromMonth;
        this._latestCallHistoryFromDayInt = iFromDay;
        this._latestCallHistoryFromHourInt = iFromHour;
        this._latestCallHistoryFromMinuteInt = iFromMinute;

        this._latestCallHistoryToYearInt = iToYear;
        this._latestCallHistoryToMonthInt = iToMonth;
        this._latestCallHistoryToDayInt = iToDay;
        this._latestCallHistoryToHourInt = iToHour;
        this._latestCallHistoryToMinuteInt = iToMinute;

        //this._callInfoArrayForDisplay = null;   //Display spin
        this._latestCallHistory2CallInfoArrayRefreshMilliTime = -1;
        this.setState({rerender:true});
    }

    _onChangeFromHour( sHour ) {
        this._callInfosFromHour = sHour;
        this.setState({rerender:true});
    }

    _onChangeToHour( sHour ) {
        this._callInfosToHour = sHour;
        this.setState({rerender:true});
    }

    _onChangeFromMinute( sMinute ) {
        this._callInfosFromMinute = sMinute;
        this.setState({rerender:true});
    }

    _onChangeToMinute( sMinute ) {
        this._callInfosToMinute = sMinute;
        this.setState({rerender:true});
    }

    _onChangeToYear( sYear ){
        this._callInfosToYear = sYear;

        const iYear = EditorAutoDialView_ver2._parseYearForAutoDialViewzCallHistory( sYear );
        const sMonth = this._callInfosToMonth;
        const iMonth = EditorAutoDialView_ver2._parseMonthForAutoDialViewzCallHistory( sMonth );
        const sDay = this._callInfosToDay;
        const iDay = EditorAutoDialView_ver2._parseDayForAutoDialViewzCallHistory( sDay  );
        const date = new Date( iYear, iMonth -1, iDay );
        const dateMax = OCUtil.getMaxDayDate( iYear, iMonth );
        const iMaxDay = dateMax.getDate();
        this._callInfosMaxToDate = new Date( dateMax.getTime());
        if( date.getMonth() !== dateMax.getMonth()){
            this._callInfosToDay = iMaxDay.toString();
        }
        this.setState({rerender:true});
    }

    _onChangeFromYear( sYear ){
        this._callInfosFromYear = sYear;

        const iYear = EditorAutoDialView_ver2._parseYearForAutoDialViewzCallHistory( sYear );
        const sMonth = this._callInfosFromMonth;
        const iMonth = EditorAutoDialView_ver2._parseMonthForAutoDialViewzCallHistory( sMonth );
        const sDay = this._callInfosFromDay;
        const iDay = EditorAutoDialView_ver2._parseDayForAutoDialViewzCallHistory( sDay  );
        const date = new Date( iYear, iMonth -1, iDay );
        const dateMax = OCUtil.getMaxDayDate( iYear, iMonth );
        const iMaxDay = dateMax.getDate();
        this._callInfosMaxFromDate = new Date( dateMax.getTime());
        if( date.getMonth() !== dateMax.getMonth()){
            this._callInfosFromDay = iMaxDay.toString();
        }
        this.setState({rerender:true});
    }

    onGetAndSetUcUserStatusesByRuntimeUcUserStatuses( runtimeUcUserStatusesAsCaller ){
        this.setState({rerender:true});
    }

    _onChangeFromMonth( sMonth ){
        this._callInfosFromMonth = sMonth;

        const sYear = this._callInfosFromYear;
        const iYear = EditorAutoDialView_ver2._parseYearForAutoDialViewzCallHistory( sYear );
        const iMonth = EditorAutoDialView_ver2._parseMonthForAutoDialViewzCallHistory( sMonth );
        const sDay = this._callInfosFromDay;
        const iDay = EditorAutoDialView_ver2._parseDayForAutoDialViewzCallHistory( sDay  );
        const date = new Date( iYear, iMonth -1, iDay );
        const dateMax = OCUtil.getMaxDayDate( iYear, iMonth );
        const iMaxDay = dateMax.getDate();
        this._callInfosMaxFromDate = new Date( dateMax.getTime());
        if( date.getMonth() !== dateMax.getMonth()){
            this._callInfosFromDay = iMaxDay.toString();
        }
        this.setState({rerender:true});
    }

    _onChangeToMonth( sMonth ){
        this._callInfosToMonth = sMonth;

        const sYear = this._callInfosToYear;
        const iYear = EditorAutoDialView_ver2._parseYearForAutoDialViewzCallHistory( sYear );
        const iMonth = EditorAutoDialView_ver2._parseMonthForAutoDialViewzCallHistory( sMonth );
        const sDay = this._callInfosToDay;
        const iDay = EditorAutoDialView_ver2._parseDayForAutoDialViewzCallHistory( sDay  );
        const date = new Date( iYear, iMonth -1, iDay );
        const dateMax = OCUtil.getMaxDayDate( iYear, iMonth );
        const iMaxDay = dateMax.getDate();
        this._callInfosMaxToDate = new Date( dateMax.getTime());
        if( date.getMonth() !== dateMax.getMonth()){
            this._callInfosToDay = iMaxDay.toString();
        }
        this.setState({rerender:true});
    }

    _onChangeFromDay( sDay ){
        this._callInfosFromDay = sDay;

        const sYear = this._callInfosFromYear;
        const iYear = EditorAutoDialView_ver2._parseYearForAutoDialViewzCallHistory( sYear );
        const sMonth = this._callInfosFromMonth;
        const iMonth = EditorAutoDialView_ver2._parseMonthForAutoDialViewzCallHistory( sMonth  );
        const iDay = EditorAutoDialView_ver2._parseDayForAutoDialViewzCallHistory(  sDay );
        const date = new Date( iYear, iMonth -1, iDay );
        const dateMax = OCUtil.getMaxDayDate( iYear, iMonth );
        const iMaxDay = dateMax.getDate();
        this._callInfosMaxFromDate = new Date( dateMax.getTime());
        if( date.getMonth() !== dateMax.getMonth()){
            this._callInfosFromDay = iMaxDay.toString();
        }
        this.setState({rerender:true});
    }

    _onChangeToDay( sDay ){
        this._callInfosToDay = sDay;

        const sYear = this._callInfosToYear;
        const iYear = EditorAutoDialView_ver2._parseYearForAutoDialViewzCallHistory( sYear );
        const sMonth = this._callInfosToMonth;
        const iMonth = EditorAutoDialView_ver2._parseMonthForAutoDialViewzCallHistory( sMonth  );
        const iDay = EditorAutoDialView_ver2._parseDayForAutoDialViewzCallHistory(  sDay );
        const date = new Date( iYear, iMonth -1, iDay );
        const dateMax = OCUtil.getMaxDayDate( iYear, iMonth );
        const iMaxDay = dateMax.getDate();
        this._callInfosMaxToDate = new Date( dateMax.getTime());
        if( date.getMonth() !== dateMax.getMonth()){
            this._callInfosToDay = iMaxDay.toString();
        }
        this.setState({rerender:true});
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        //this._checkMissedCall();
    }

    // _checkMissedCall(){
    //     const oc = BrekekeOperatorConsole.getStaticInstance();
    //     if( oc.getHasMissedCallFromState() === true ){
    //         const eRecentTab = document.getElementById("tabA_AutoDialView_ver2_brOC");
    //         if( eRecentTab ) {
    //             const bContain = eRecentTab.classList.contains("is-active");
    //             if (bContain) {
    //                 oc.setHasMissedCallToFalseToState();
    //                 //this.setState({rerender:true});
    //             }
    //         }
    //     }
    // }

    static getUcUserStatusClassName( extensionId, status ) {
        let className = null;
        switch( status ){
            case 0:
                className = "led-grey";
                break;
            case 1:
                className = "led-green";
                break;
            case 2:
                className = "led-yellow";
                break;
            case 3:
                className = "led-red";
                break;
        }
        return className;
    }

    getEditorAutoDialButtonSettings(){
        const editorAutoDialButton = this._editorAutoDialButton;
        return editorAutoDialButton;
    }

    isVisible(){
        const b = !!this._editorAutoDialButton;
        return b;
    }

    trySetVisible(editorAutoDialButton){
        const b =  !this._editorAutoDialButton;
        if( b ) {
            setTimeout( () =>{
                this._editorAutoDialButton = editorAutoDialButton;
                this.setState({rerender:true});
            }, 1 );
        }
        return b;
    }

    trySetInvisible( editorAutoDialButtonSettingsAsCaller = this._editorAutoDialButton ){
        const b = editorAutoDialButtonSettingsAsCaller === this._editorAutoDialButton;
        if( this._editorAutoDialButton && b ){

            setTimeout( () => {
                this._editorAutoDialButton = null;
                this.setState({rerender:true});
            }, 1 );
        }
        return b;
    }

    render() {
        const oc = BrekekeOperatorConsole.getStaticInstance();
        if ( !this.isVisible() ) {
            //return (null);
            return (null);
        }

        const editorAutoDialButton = this._editorAutoDialButton;

        const dateFormatString = oc.getDateFormatStringInstance();
        const language = oc.getLoggedinLanguage();
        const callHistory2 = oc.getCallHistory2();
        const systemSettingsData = oc.getSystemSettingsData();
        callHistory2.sortIfNeed( systemSettingsData.getAutoDialRecentDisplayOrder()  ); //!bad Not a render logic
        const recentDisplayOrder = systemSettingsData.getAutoDialRecentDisplayOrder();
        const recentDisplayCount = systemSettingsData.getAutoDialMaxDisplayCount();
        const inputFieldFontSize = editorAutoDialButton.getAutoDialInputFieldFontSize();

        //!bad Not a render logic
        let fromDaySelectOptionsJsx;
        let toDaySelectOptionsJsx;
        if( recentDisplayOrder === CallHistory2.RECENT_DISPLAY_ORDERS.ADD_DATETIME_DESC ) {
            const latestCallHistory2RefreshTime = callHistory2.getLatestCallHistoryCallInfoArrayRefreshMilliTime();
            if( this._latestCallHistory2CallInfoArrayRefreshMilliTime === undefined ){  //!forBug For abort infinite constructor&render loop   //!bad
                this._resetFromDateToDate();
                this._latestCallHistory2CallInfoArrayRefreshMilliTime = -1;
                this.setState({rerender:true});
            }
            else if( latestCallHistory2RefreshTime !== this._latestCallHistory2CallInfoArrayRefreshMilliTime ){
                this._latestCallHistory2CallInfoArrayRefreshMilliTime = latestCallHistory2RefreshTime;
                setTimeout(() => {
                    this._callInfoArrayForDisplay = this._getDatetimeDescCallInfoArrayForDisplay();
                    this.setState({rerender: true});
                }, 1);
            }
            // const eRecentShowDetail = document.getElementById("recentShowDetail_brOC_AutoDialView_ver2");
            // const bRecentShowDetail = eRecentShowDetail.checked;

            fromDaySelectOptionsJsx = new Array();
            const iMaxFromDay = this._callInfosMaxFromDate.getDate();
            for( let i = 1; i <= iMaxFromDay; i++ ){
                fromDaySelectOptionsJsx.push(<Select.Option value={ i.toString() }><span style={{fontSize:inputFieldFontSize}}>{i}</span></Select.Option>);
            }

            toDaySelectOptionsJsx = new Array();
            const iMaxToDay = this._callInfosMaxToDate.getDate();
            for( let i = 1; i <= iMaxToDay; i++ ){
                toDaySelectOptionsJsx.push(<Select.Option value={ i.toString() }><span style={{fontSize:inputFieldFontSize}}>{i}</span></Select.Option>);
            }
        }

        const isUsingUc = true;

        const tableHeaderFontSize = editorAutoDialButton.getAutoDialTableHeaderFontSize();
        const tableBodyFontSize = editorAutoDialButton.getAutoDialTableBodyFontSize();
        let switchSize;
        const sSwitchSize = editorAutoDialButton.getAutoDialSwitchSize();
        if( OCUtil.isString( sSwitchSize) && sSwitchSize.toLowerCase() === "small"){
            switchSize = "small";
        }
        else{
            switchSize = undefined;
        }

        const lampSize = editorAutoDialButton.getAutoDialLampSize();
        const iconSize = editorAutoDialButton.getAutoDialIconSize();
        const buttonSize = editorAutoDialButton.getAutoDialButtonSize();
        const svgButtonSize = buttonSize || buttonSize === 0 ? buttonSize : 24; //!default
        const otherFontSize = editorAutoDialButton.getAutoDialOtherFontSize();

        let sPort = "";
        const loginPort = oc.getLoginPort();
        if( loginPort && loginPort.length !== 0 ){
            sPort = ":" + loginPort;
        }
        let sPbxDirName = "";
        const pbxDirectoryName = oc.getLoginPbxDirectoryName();
        if( pbxDirectoryName && pbxDirectoryName.length !== 0 ){
            sPbxDirName = "/" + pbxDirectoryName;
        }

        const voicemailsFilterStatuses = Object.entries( VOICEMAIL_FILTER_STATUS_VALUES );
        const voicemailWavUrlPrefix = location.protocol + "//" + oc.getLoginHostname() + sPort + sPbxDirName + "/rec/";

        return (<>
            <EditorPhonebookContactInfozInfoView editorAutoDialViewAsParent={this} />
            <EditorPhonebookContactInfozTelsView editorAutoDialViewAsParent={this}/>
            {/*<div ref={this._AutoDialViewRef} className="brOCReset autoDialView">*/}
            {/*<div className="brOCReset autoDialView" style={{right:this._autoDialViewRightStyle}}>*/}
            <div className="autoDialViewWrapper">
                <div className="brOCReset autoDialView editorAutoDialView">
                    {/*<table className={"defaultBorderWithRadius outsidePaddingWithoutBorderRadius"} data-br-name="brOC_AutoDialView_ver2_rootTable">*/}
                    <table className={"defaultBorderWithRadius outsidePaddingWithoutBorderRadius"} >
                        <tbody>
                        <tr>
                            <td>
                                <table className="defaultTranparentTable defaultSpaceBottom">
                                    <tbody>
                                    <tr>
                                        <td style={{width: "99%"}}>
                                            {/*<Popconfirm title={i18n.t("are_you_sure")}*/}
                                            {/*            onConfirm={() => this._clearCallNoHistory2(this)}*/}
                                            {/*            okText={i18n.t("yes")}*/}
                                            {/*            cancelText={i18n.t("no")}*/}
                                            {/*>*/}
                                                <Button>{i18n.t("ClearRecent")}</Button>
                                            {/*</Popconfirm>*/}
                                        </td>
                                        <td style={{textAlign: "right", verticalAlign: "top"}}>
                                            <FontAwesomeIcon icon="far fa-window-close"
                                                             onClick={ () => this._onClickClose() }
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
                                                        style={{fontSize: editorAutoDialButton.getAutoDialTabFontSize()}}
                                                        onClick={(e) => this._tabSwitchAndSortIfNeedCallHistory2(e.target)}>{i18n.t("Recent")}</li>
                                                    <li className="tab tab-B"
                                                        style={{fontSize: editorAutoDialButton.getAutoDialTabFontSize()}}
                                                        onClick={(e) => {
                                                            const eTarget2 = document.getElementById("tabA_AutoDialView_ver2_brOC");
                                                            this.tabSwitch(e.target, eTarget2);
                                                            if (this._filteredExtensionArray === null) {   //First time
                                                                setTimeout(() => {
                                                                    this._filteredExtensionArray = this._getFilteredExtensionArray();
                                                                    this.setState({rerender: true});
                                                                }, 5);
                                                            }
                                                        }}>{i18n.t("User")}</li>
                                                    <li className="tab tab-C" id="tabB_AutoDialView_ver2_brOC"
                                                        style={{fontSize: editorAutoDialButton.getAutoDialTabFontSize()}}
                                                        onClick={(e) => {
                                                            // const eTarget2 = document.getElementById("tabA_AutoDialView_ver2_brOC");
                                                            // this.tabSwitch(e, eTarget2 );
                                                            this.tabSwitch(e.target, null);
                                                            //if( this._phonebookContactInfoArray === null ){
                                                            if (this.reshowContactList() === false) {
                                                                this._resetPhonebookContactInfoArray();
                                                            }
                                                            //}
                                                        }}>{i18n.t("Phonebook")}</li>
                                                    <li className="tab tab-D"
                                                        style={{fontSize: editorAutoDialButton.getAutoDialTabFontSize()}}
                                                        onClick={(e) => {
                                                            this.tabSwitch(e.target);
                                                            if (this.reshowVoicemails() === false) {
                                                                this._resetVoicemailsAsync();
                                                            }
                                                        }}>{i18n.t("Voice_mails")}</li>
                                                </ul>

                                                <div className="panel-group defaultBorderRadiusBottom">
                                                    <div className="panel tab-A is-show">
                                                        {recentDisplayOrder === CallHistory2.RECENT_DISPLAY_ORDERS.CALL_OR_INCOMING_COUNT_DESC && (
                                                            <div className={"autoDialView_ver2_RecentRoot"}>
                                                                <table style={{border: "0", width: "100%"}}
                                                                       className={"defaultContentTable"}>
                                                                    <thead>
                                                                    <tr className="defaultItemPaddingForTr">
                                                                        <th style={{fontSize: tableHeaderFontSize}}>{i18n.t("CallNo")}</th>
                                                                        <th style={{fontSize: tableHeaderFontSize, width: 10}}>{i18n.t("CallStatus")}</th>
                                                                        { isUsingUc && <th style={{fontSize:tableHeaderFontSize,width: 10}}>{i18n.t("UcStatus")}</th> }
                                                                        <th style={{fontSIze:tableHeaderFontSize,width:10}}>{i18n.t("Call")}</th>
                                                                        <th style={{fontSize:tableHeaderFontSize}}>{i18n.t("LatestStartedAt")}</th>
                                                                    </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                    {callHistory2.getCallHistory2CallInfoArray().slice(0, recentDisplayCount).map((callHistory2CallInfo, i) => {
                                                                        const partyNumber = callHistory2CallInfo.getPartyNumber();
                                                                        //const isExtension = OCUtil.indexOfArrayFromExtensions(oc.state.extensions, partyNumber) !== -1;
                                                                        const isExtension = true;
                                                                        //const extensionsStatus = oc.state.extensionsStatus;
                                                                        //const statusClassName = isExtension ? OCUtil.getExtensionStatusClassName(partyNumber, extensionsStatus) : "";
                                                                        const statusClassName = 'led-grey';
                                                                        const sAddDateTime = dateFormatString.getYYYYMMDDhhmmssStringFromDate( new Date(callHistory2CallInfo.getAddCallMillisTime() ) );

                                                                        let ucUserStatusJsx;
                                                                        if( isUsingUc ){
                                                                            if( isExtension ){
                                                                                //const ucUserStatus = RuntimeUcUserStatuses.getRuntimeUcUserStatusesStaticInstance().getUcUserStatus( partyNumber );
                                                                                const ucUserStatus = 0;
                                                                                if( ucUserStatus || ucUserStatus === 0 ){
                                                                                    const ucUserStatusClassName = EditorAutoDialView_ver2.getUcUserStatusClassName( partyNumber, ucUserStatus );
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
                                                                                <td style={{fontSize:tableBodyFontSize}}>{partyNumber}</td>
                                                                                <td style={{fontSize:tableBodyFontSize,textAlign: "center",width:10}}>
                                                                                    <div style={{width:lampSize,height:lampSize}} className={statusClassName}></div>
                                                                                </td>
                                                                                { isUsingUc && (
                                                                                    <td style={{fontSize:tableBodyFontSize,textAlign: "center",width:10}}>
                                                                                        {ucUserStatusJsx}
                                                                                    </td>
                                                                                )}
                                                                                <td style={{fontSize:tableBodyFontSize,width:10}}>
                                                                                    {partyNumber && (<div style={{
                                                                                        display: "flex",
                                                                                        justifyContent: "center"
                                                                                    }}>
                                                                                        <button
                                                                                            title={i18n.t(`Call`)}
                                                                                            className="kbc-button kbc-button-fill-parent legacyButtonPadding brOCDefaultKbcButtonMargin"
                                                                                            onClick={(e) => {
                                                                                                EditorAutoDialView_ver2.onClickCallButtonForAutoDialView(e, partyNumber);
                                                                                            }
                                                                                            }>
                                                                                            {<FontAwesomeIcon style={{width:buttonSize,height:buttonSize}} size="lg"
                                                                                                              icon="fas fa-phone"/>}
                                                                                        </button>
                                                                                    </div>)}
                                                                                </td>
                                                                                <td style={{fontSize:tableBodyFontSize,textAlign: "center"}}>
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
                                                            <table style={{border: "0",width:"100%"}}
                                                                   className={"defaultContentTable"}>
                                                                <tbody>
                                                                <tr className={"noHoverContentColorForTr"}>
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
                                                                                        //allowClear
                                                                                        defaultValue={this._callInfosFromYear}
                                                                                        value={this._callInfosFromYear}
                                                                                        onFocus={(e) => this._onCallInfosFromYearFocus(e)}
                                                                                        onBlur={(e) => this._onCallInfosFromYearBlur(e)}
                                                                                        style={{
                                                                                            width: "100px",
                                                                                            height:editorAutoDialButton.getAutoDialInputFieldHeight(),
                                                                                            fontSize:editorAutoDialButton.getAutoDialInputFieldFontSize(),
                                                                                            //size: "middle"
                                                                                        }}
                                                                                        onChange={(e) => this._onChangeFromYear( e.target.value ) }
                                                                                    />
                                                                                    <span style={{margin:"0 4px 0 2px"}}>{i18n.t("Year")}</span>
                                                                                    <Select
                                                                                        id="brOC_autoDialView_ver2_callInfos_fromMonth"
                                                                                        style={{width: "60px",height:editorAutoDialButton.getAutoDialInputFieldHeight(),fontSize:editorAutoDialButton.getAutoDialInputFieldFontSize()}} size="large"
                                                                                        onChange={(val) => this._onChangeFromMonth( val ) }
                                                                                        defaultValue={this._callInfosFromMonth}
                                                                                        value={this._callInfosFromMonth}
                                                                                    >
                                                                                        <Select.Option
                                                                                            value={"1"}><span style={{fontSize:inputFieldFontSize}}>1</span></Select.Option>
                                                                                        <Select.Option
                                                                                            value={"2"}><span style={{fontSize:inputFieldFontSize}}>2</span></Select.Option>
                                                                                        <Select.Option
                                                                                            value={"3"}><span style={{fontSize:inputFieldFontSize}}>3</span></Select.Option>
                                                                                        <Select.Option
                                                                                            value={"4"}><span style={{fontSize:inputFieldFontSize}}>4</span></Select.Option>
                                                                                        <Select.Option
                                                                                            value={"5"}><span style={{fontSize:inputFieldFontSize}}>5</span></Select.Option>
                                                                                        <Select.Option
                                                                                            value={"6"}><span style={{fontSize:inputFieldFontSize}}>6</span></Select.Option>
                                                                                        <Select.Option
                                                                                            value={"7"}><span style={{fontSize:inputFieldFontSize}}>7</span></Select.Option>
                                                                                        <Select.Option
                                                                                            value={"8"}><span style={{fontSize:inputFieldFontSize}}>8</span></Select.Option>
                                                                                        <Select.Option
                                                                                            value={"9"}><span style={{fontSize:inputFieldFontSize}}>9</span></Select.Option>
                                                                                        <Select.Option
                                                                                            value={"10"}><span style={{fontSize:inputFieldFontSize}}>10</span></Select.Option>
                                                                                        <Select.Option
                                                                                            value={"11"}><span style={{fontSize:inputFieldFontSize}}>11</span></Select.Option>
                                                                                        <Select.Option
                                                                                            value={"12"}><span style={{fontSize:inputFieldFontSize}}>12</span></Select.Option>
                                                                                    </Select>
                                                                                    <span style={{margin:"0 4px 0 2px"}}>{i18n.t("Month")}</span>
                                                                                    <Select
                                                                                        id="brOC_autoDialView_ver2_callInfos_fromDay"
                                                                                        style={{width: "60px",height:editorAutoDialButton.getAutoDialInputFieldHeight(),fontSize:editorAutoDialButton.getAutoDialInputFieldFontSize()}} size="large"
                                                                                        onChange={(val) => this._onChangeFromDay( val ) }
                                                                                        defaultValue={this._callInfosFromDay}
                                                                                        value={this._callInfosFromDay}
                                                                                    >
                                                                                        {fromDaySelectOptionsJsx}
                                                                                    </Select>
                                                                                    <div style={{margin:"0 6px 0 4px"}}>{i18n.t("Day")}</div>
                                                                                    <Select
                                                                                        id="brOC_autoDialView_ver2_callInfos_fromHour"
                                                                                        style={{width: "60px",height:editorAutoDialButton.getAutoDialInputFieldHeight(),fontSize:editorAutoDialButton.getAutoDialInputFieldFontSize()}} size="large"
                                                                                        onChange={(val) => this._onChangeFromHour(val) }
                                                                                        defaultValue={this._callInfosFromHour}
                                                                                        value={this._callInfosFromHour}
                                                                                    >
                                                                                        <Select.Option
                                                                                            value={"00"}><span style={{fontSize:inputFieldFontSize}}>00</span></Select.Option>
                                                                                        <Select.Option
                                                                                            value={"01"}><span style={{fontSize:inputFieldFontSize}}>01</span></Select.Option>
                                                                                        <Select.Option
                                                                                            value={"02"}><span style={{fontSize:inputFieldFontSize}}>02</span></Select.Option>
                                                                                        <Select.Option
                                                                                            value={"03"}><span style={{fontSize:inputFieldFontSize}}>03</span></Select.Option>
                                                                                        <Select.Option
                                                                                            value={"04"}><span style={{fontSize:inputFieldFontSize}}>04</span></Select.Option>
                                                                                        <Select.Option
                                                                                            value={"05"}><span style={{fontSize:inputFieldFontSize}}>05</span></Select.Option>
                                                                                        <Select.Option
                                                                                            value={"06"}><span style={{fontSize:inputFieldFontSize}}>06</span></Select.Option>
                                                                                        <Select.Option
                                                                                            value={"07"}><span style={{fontSize:inputFieldFontSize}}>07</span></Select.Option>
                                                                                        <Select.Option
                                                                                            value={"08"}><span style={{fontSize:inputFieldFontSize}}>08</span></Select.Option>
                                                                                        <Select.Option
                                                                                            value={"09"}><span style={{fontSize:inputFieldFontSize}}>09</span></Select.Option>
                                                                                        <Select.Option
                                                                                            value={"10"}><span style={{fontSize:inputFieldFontSize}}>10</span></Select.Option>
                                                                                        <Select.Option
                                                                                            value={"11"}><span style={{fontSize:inputFieldFontSize}}>11</span></Select.Option>
                                                                                        <Select.Option
                                                                                            value={"12"}><span style={{fontSize:inputFieldFontSize}}>12</span></Select.Option>
                                                                                        <Select.Option
                                                                                            value={"13"}><span style={{fontSize:inputFieldFontSize}}>13</span></Select.Option>
                                                                                        <Select.Option
                                                                                            value={"14"}><span style={{fontSize:inputFieldFontSize}}>14</span></Select.Option>
                                                                                        <Select.Option
                                                                                            value={"15"}><span style={{fontSize:inputFieldFontSize}}>15</span></Select.Option>
                                                                                        <Select.Option
                                                                                            value={"16"}><span style={{fontSize:inputFieldFontSize}}>16</span></Select.Option>
                                                                                        <Select.Option
                                                                                            value={"17"}><span style={{fontSize:inputFieldFontSize}}>17</span></Select.Option>
                                                                                        <Select.Option
                                                                                            value={"18"}><span style={{fontSize:inputFieldFontSize}}>18</span></Select.Option>
                                                                                        <Select.Option
                                                                                            value={"19"}><span style={{fontSize:inputFieldFontSize}}>19</span></Select.Option>
                                                                                        <Select.Option
                                                                                            value={"20"}><span style={{fontSize:inputFieldFontSize}}>20</span></Select.Option>
                                                                                        <Select.Option
                                                                                            value={"21"}><span style={{fontSize:inputFieldFontSize}}>21</span></Select.Option>
                                                                                        <Select.Option
                                                                                            value={"22"}><span style={{fontSize:inputFieldFontSize}}>22</span></Select.Option>
                                                                                        <Select.Option
                                                                                            value={"23"}><span style={{fontSize:inputFieldFontSize}}>23</span></Select.Option>
                                                                                    </Select>
                                                                                    <span style={{margin:"0 4px 0 4px"}}>:</span>
                                                                                    <Select
                                                                                        id="brOC_autoDialView_ver2_callInfos_fromMinute"
                                                                                        style={{width: "60px",height:editorAutoDialButton.getAutoDialInputFieldHeight(),fontSize:editorAutoDialButton.getAutoDialInputFieldFontSize()}} size="large"
                                                                                        onChange={(val) => this._onChangeFromMinute(val) }
                                                                                        defaultValue={this._callInfosFromMinute}
                                                                                        value={this._callInfosFromMinute}
                                                                                    >
                                                                                        <Select.Option
                                                                                            value={"00"}><span style={{fontSize:inputFieldFontSize}}>00</span></Select.Option>
                                                                                        <Select.Option
                                                                                            value={"15"}><span style={{fontSize:inputFieldFontSize}}>15</span></Select.Option>
                                                                                        <Select.Option
                                                                                            value={"30"}><span style={{fontSize:inputFieldFontSize}}>30</span></Select.Option>
                                                                                        <Select.Option
                                                                                            value={"45"}><span style={{fontSize:inputFieldFontSize}}>45</span></Select.Option>
                                                                                    </Select>
                                                                                    <span style={{margin:"0 4px 0 4px"}}>~</span>
                                                                                    <Input
                                                                                        id="brOC_autoDialView_ver2_callInfos_toYear"
                                                                                        maxLength={4}
                                                                                        //placeholder={i18n.t('Year')}
                                                                                        //allowClear
                                                                                        onFocus={(e) => this._onCallInfosToYearFocus(e)}
                                                                                        onBlur={(e) => this._onCallInfosToYearBlur(e)}
                                                                                        style={{
                                                                                            width: "100px",
                                                                                            height:editorAutoDialButton.getAutoDialInputFieldHeight(),
                                                                                            fontSize:editorAutoDialButton.getAutoDialInputFieldFontSize(),
                                                                                            //size: "middle"
                                                                                        }}
                                                                                        defaultValue={this._callInfosToYear}
                                                                                        value={this._callInfosToYear}
                                                                                        onChange={(e) => this._onChangeToYear( e.target.value ) }
                                                                                    />
                                                                                    <span style={{margin:"0 4px 0 2px"}}>{i18n.t("Year")}</span>
                                                                                    <Select
                                                                                        id="brOC_autoDialView_ver2_callInfos_toMonth"
                                                                                        style={{width: "60px",height:editorAutoDialButton.getAutoDialInputFieldHeight(),fontSize:editorAutoDialButton.getAutoDialInputFieldFontSize()}} size="large"
                                                                                        onChange={(val) => this._onChangeToMonth( val ) }
                                                                                        defaultValue={this._callInfosToMonth}
                                                                                        value={this._callInfosToMonth}
                                                                                    >
                                                                                        <Select.Option
                                                                                            value={"1"}><span style={{fontSize:inputFieldFontSize}}>1</span></Select.Option>
                                                                                        <Select.Option
                                                                                            value={"2"}><span style={{fontSize:inputFieldFontSize}}>2</span></Select.Option>
                                                                                        <Select.Option
                                                                                            value={"3"}><span style={{fontSize:inputFieldFontSize}}>3</span></Select.Option>
                                                                                        <Select.Option
                                                                                            value={"4"}><span style={{fontSize:inputFieldFontSize}}>4</span></Select.Option>
                                                                                        <Select.Option
                                                                                            value={"5"}><span style={{fontSize:inputFieldFontSize}}>5</span></Select.Option>
                                                                                        <Select.Option
                                                                                            value={"6"}><span style={{fontSize:inputFieldFontSize}}>6</span></Select.Option>
                                                                                        <Select.Option
                                                                                            value={"7"}><span style={{fontSize:inputFieldFontSize}}>7</span></Select.Option>
                                                                                        <Select.Option
                                                                                            value={"8"}><span style={{fontSize:inputFieldFontSize}}>8</span></Select.Option>
                                                                                        <Select.Option
                                                                                            value={"9"}><span style={{fontSize:inputFieldFontSize}}>9</span></Select.Option>
                                                                                        <Select.Option
                                                                                            value={"10"}><span style={{fontSize:inputFieldFontSize}}>10</span></Select.Option>
                                                                                        <Select.Option
                                                                                            value={"11"}><span style={{fontSize:inputFieldFontSize}}>11</span></Select.Option>
                                                                                        <Select.Option
                                                                                            value={"12"}><span style={{fontSize:inputFieldFontSize}}>12</span></Select.Option>
                                                                                    </Select>
                                                                                    <span style={{margin:"0 4px 0 2px"}}>{i18n.t("Month")}</span>
                                                                                    <Select
                                                                                        id="brOC_autoDialView_ver2_callInfos_toDay"
                                                                                        style={{width: "60px",height:editorAutoDialButton.getAutoDialInputFieldHeight(),fontSize:editorAutoDialButton.getAutoDialInputFieldFontSize()}} size="large"
                                                                                        onChange={(val) => this._onChangeToDay( val ) }
                                                                                        defaultValue={this._callInfosToDay}
                                                                                        value={this._callInfosToDay}
                                                                                    >
                                                                                        {toDaySelectOptionsJsx}
                                                                                    </Select>
                                                                                    <div style={{margin: "0px 6px 0 4px"}}>{i18n.t("Day")}</div>
                                                                                    <Select
                                                                                        id="brOC_autoDialView_ver2_callInfos_toHour"
                                                                                        style={{width: "60px",height:editorAutoDialButton.getAutoDialInputFieldHeight(),fontSize:editorAutoDialButton.getAutoDialInputFieldFontSize()}} size="large"
                                                                                        onChange={(val) => this._onChangeToHour( val ) }
                                                                                        defaultValue={this._callInfosToHour}
                                                                                        value={this._callInfosToHour}
                                                                                    >
                                                                                        <Select.Option
                                                                                            value={"00"}><span style={{fontSize:inputFieldFontSize}}>00</span></Select.Option>
                                                                                        <Select.Option
                                                                                            value={"01"}><span style={{fontSize:inputFieldFontSize}}>01</span></Select.Option>
                                                                                        <Select.Option
                                                                                            value={"02"}><span style={{fontSize:inputFieldFontSize}}>02</span></Select.Option>
                                                                                        <Select.Option
                                                                                            value={"03"}><span style={{fontSize:inputFieldFontSize}}>03</span></Select.Option>
                                                                                        <Select.Option
                                                                                            value={"04"}><span style={{fontSize:inputFieldFontSize}}>04</span></Select.Option>
                                                                                        <Select.Option
                                                                                            value={"05"}><span style={{fontSize:inputFieldFontSize}}>05</span></Select.Option>
                                                                                        <Select.Option
                                                                                            value={"06"}><span style={{fontSize:inputFieldFontSize}}>06</span></Select.Option>
                                                                                        <Select.Option
                                                                                            value={"07"}><span style={{fontSize:inputFieldFontSize}}>07</span></Select.Option>
                                                                                        <Select.Option
                                                                                            value={"08"}><span style={{fontSize:inputFieldFontSize}}>08</span></Select.Option>
                                                                                        <Select.Option
                                                                                            value={"09"}><span style={{fontSize:inputFieldFontSize}}>09</span></Select.Option>
                                                                                        <Select.Option
                                                                                            value={"10"}><span style={{fontSize:inputFieldFontSize}}>10</span></Select.Option>
                                                                                        <Select.Option
                                                                                            value={"11"}><span style={{fontSize:inputFieldFontSize}}>11</span></Select.Option>
                                                                                        <Select.Option
                                                                                            value={"12"}><span style={{fontSize:inputFieldFontSize}}>12</span></Select.Option>
                                                                                        <Select.Option
                                                                                            value={"13"}><span style={{fontSize:inputFieldFontSize}}>13</span></Select.Option>
                                                                                        <Select.Option
                                                                                            value={"14"}><span style={{fontSize:inputFieldFontSize}}>14</span></Select.Option>
                                                                                        <Select.Option
                                                                                            value={"15"}><span style={{fontSize:inputFieldFontSize}}>15</span></Select.Option>
                                                                                        <Select.Option
                                                                                            value={"16"}><span style={{fontSize:inputFieldFontSize}}>16</span></Select.Option>
                                                                                        <Select.Option
                                                                                            value={"17"}><span style={{fontSize:inputFieldFontSize}}>17</span></Select.Option>
                                                                                        <Select.Option
                                                                                            value={"18"}><span style={{fontSize:inputFieldFontSize}}>18</span></Select.Option>
                                                                                        <Select.Option
                                                                                            value={"19"}><span style={{fontSize:inputFieldFontSize}}>19</span></Select.Option>
                                                                                        <Select.Option
                                                                                            value={"20"}><span style={{fontSize:inputFieldFontSize}}>20</span></Select.Option>
                                                                                        <Select.Option
                                                                                            value={"21"}><span style={{fontSize:inputFieldFontSize}}>21</span></Select.Option>
                                                                                        <Select.Option
                                                                                            value={"22"}><span style={{fontSize:inputFieldFontSize}}>22</span></Select.Option>
                                                                                        <Select.Option
                                                                                            value={"23"}><span style={{fontSize:inputFieldFontSize}}>23</span></Select.Option>
                                                                                    </Select>
                                                                                    <span style={{margin:"0 4px 0 4px"}}>:</span>
                                                                                    <Select
                                                                                        id="brOC_autoDialView_ver2_callInfos_toMinute"
                                                                                        style={{width: "60px",height:editorAutoDialButton.getAutoDialInputFieldHeight(),fontSize:editorAutoDialButton.getAutoDialInputFieldFontSize()}} size="large"
                                                                                        onChange={(val) => this._onChangeToMinute(val) }
                                                                                        defaultValue={this._callInfosToMinute}
                                                                                        value={this._callInfosToMinute}
                                                                                    >
                                                                                        <Select.Option
                                                                                            value={"00"}><span style={{fontSize:inputFieldFontSize}}>00</span></Select.Option>
                                                                                        <Select.Option
                                                                                            value={"15"}><span style={{fontSize:inputFieldFontSize}}>15</span></Select.Option>
                                                                                        <Select.Option
                                                                                            value={"30"}><span style={{fontSize:inputFieldFontSize}}>30</span></Select.Option>
                                                                                        <Select.Option
                                                                                            value={"45"}><span style={{fontSize:inputFieldFontSize}}>45</span></Select.Option>
                                                                                    </Select>
                                                                                </div>
                                                                            </td>
                                                                            <td>
                                                                                <button
                                                                                    title={i18n.t(`Search`)}
                                                                                    className="kbc-button kbc-button-fill-parent legacyButtonPadding brOCDefaultKbcButtonMargin"
                                                                                    onClick={(e) => this._onClickForGetDatetimeDescCallInfoArrayForDisplay()}
                                                                                    // size={"middle"}
                                                                                >
                                                                                    <svg height={svgButtonSize} viewBox="3 3 17.5 17.5"
                                                                                         width={svgButtonSize}>
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
                                                                                        style={{width: "60px",height:editorAutoDialButton.getAutoDialInputFieldHeight(),fontSize:editorAutoDialButton.getAutoDialInputFieldFontSize()}} size="large"
                                                                                        onChange={(val) => this._onChangeFromMonth( val ) }
                                                                                        defaultValue={this._callInfosFromMonth}
                                                                                        value={this._callInfosFromMonth}
                                                                                    >
                                                                                        <Select.Option
                                                                                            value={"1"}><span style={{fontSize:inputFieldFontSize}}>1</span></Select.Option>
                                                                                        <Select.Option
                                                                                            value={"2"}><span style={{fontSize:inputFieldFontSize}}>2</span></Select.Option>
                                                                                        <Select.Option
                                                                                            value={"3"}><span style={{fontSize:inputFieldFontSize}}>3</span></Select.Option>
                                                                                        <Select.Option
                                                                                            value={"4"}><span style={{fontSize:inputFieldFontSize}}>4</span></Select.Option>
                                                                                        <Select.Option
                                                                                            value={"5"}><span style={{fontSize:inputFieldFontSize}}>5</span></Select.Option>
                                                                                        <Select.Option
                                                                                            value={"6"}><span style={{fontSize:inputFieldFontSize}}>6</span></Select.Option>
                                                                                        <Select.Option
                                                                                            value={"7"}><span style={{fontSize:inputFieldFontSize}}>7</span></Select.Option>
                                                                                        <Select.Option
                                                                                            value={"8"}><span style={{fontSize:inputFieldFontSize}}>8</span></Select.Option>
                                                                                        <Select.Option
                                                                                            value={"9"}><span style={{fontSize:inputFieldFontSize}}>9</span></Select.Option>
                                                                                        <Select.Option
                                                                                            value={"10"}><span style={{fontSize:inputFieldFontSize}}>10</span></Select.Option>
                                                                                        <Select.Option
                                                                                            value={"11"}><span style={{fontSize:inputFieldFontSize}}>11</span></Select.Option>
                                                                                        <Select.Option
                                                                                            value={"12"}><span style={{fontSize:inputFieldFontSize}}>12</span></Select.Option>
                                                                                    </Select>
                                                                                    <span
                                                                                        style={{margin: "0 4px 0 4px"}}>/</span>
                                                                                    <Select
                                                                                        id="brOC_autoDialView_ver2_callInfos_fromDay"
                                                                                        style={{width: "60px",height:editorAutoDialButton.getAutoDialInputFieldHeight(),fontSize:editorAutoDialButton.getAutoDialInputFieldFontSize()}} size="large"
                                                                                        onChange={(val) => this._onChangeFromDay( val ) }
                                                                                        defaultValue={this._callInfosFromDay}
                                                                                        value={this._callInfosFromDay}
                                                                                    >
                                                                                        {fromDaySelectOptionsJsx}
                                                                                    </Select>
                                                                                    <span
                                                                                        style={{margin: "0 4px 0 4px"}}>/</span>
                                                                                    <Input
                                                                                        id="brOC_autoDialView_ver2_callInfos_fromYear"
                                                                                        maxLength={4}
                                                                                        // placeholder={i18n.t('Year')}
                                                                                        //allowClear
                                                                                        defaultValue={this._callInfosFromYear}
                                                                                        value={this._callInfosFromYear}
                                                                                        onFocus={(e) => this._onCallInfosFromYearFocus(e)}
                                                                                        onBlur={(e) => this._onCallInfosFromYearBlur(e)}
                                                                                        style={{
                                                                                            width: "100px",
                                                                                            height:editorAutoDialButton.getAutoDialInputFieldHeight(),
                                                                                            fontSize:editorAutoDialButton.getAutoDialInputFieldFontSize(),
                                                                                            //size: "middle"
                                                                                        }}
                                                                                        onChange={(e) => this._onChangeFromYear( e.target.value ) }
                                                                                    />
                                                                                    <span style={{marginLeft: "6px"}}></span>
                                                                                    <Select
                                                                                        id="brOC_autoDialView_ver2_callInfos_fromHour"
                                                                                        style={{width: "60px",height:editorAutoDialButton.getAutoDialInputFieldHeight(),fontSize:editorAutoDialButton.getAutoDialInputFieldFontSize()}} size="large"
                                                                                        onChange={(val) => this._onChangeFromHour(val) }
                                                                                        defaultValue={this._callInfosFromHour}
                                                                                        value={this._callInfosFromHour}
                                                                                    >
                                                                                        <Select.Option
                                                                                            value={"00"}><span style={{fontSize:inputFieldFontSize}}>00</span></Select.Option>
                                                                                        <Select.Option
                                                                                            value={"01"}><span style={{fontSize:inputFieldFontSize}}>01</span></Select.Option>
                                                                                        <Select.Option
                                                                                            value={"02"}><span style={{fontSize:inputFieldFontSize}}>02</span></Select.Option>
                                                                                        <Select.Option
                                                                                            value={"03"}><span style={{fontSize:inputFieldFontSize}}>03</span></Select.Option>
                                                                                        <Select.Option
                                                                                            value={"04"}><span style={{fontSize:inputFieldFontSize}}>04</span></Select.Option>
                                                                                        <Select.Option
                                                                                            value={"05"}><span style={{fontSize:inputFieldFontSize}}>05</span></Select.Option>
                                                                                        <Select.Option
                                                                                            value={"06"}><span style={{fontSize:inputFieldFontSize}}>06</span></Select.Option>
                                                                                        <Select.Option
                                                                                            value={"07"}><span style={{fontSize:inputFieldFontSize}}>07</span></Select.Option>
                                                                                        <Select.Option
                                                                                            value={"08"}><span style={{fontSize:inputFieldFontSize}}>08</span></Select.Option>
                                                                                        <Select.Option
                                                                                            value={"09"}><span style={{fontSize:inputFieldFontSize}}>09</span></Select.Option>
                                                                                        <Select.Option
                                                                                            value={"10"}><span style={{fontSize:inputFieldFontSize}}>10</span></Select.Option>
                                                                                        <Select.Option
                                                                                            value={"11"}><span style={{fontSize:inputFieldFontSize}}>11</span></Select.Option>
                                                                                        <Select.Option
                                                                                            value={"12"}><span style={{fontSize:inputFieldFontSize}}>12</span></Select.Option>
                                                                                        <Select.Option
                                                                                            value={"13"}><span style={{fontSize:inputFieldFontSize}}>13</span></Select.Option>
                                                                                        <Select.Option
                                                                                            value={"14"}><span style={{fontSize:inputFieldFontSize}}>14</span></Select.Option>
                                                                                        <Select.Option
                                                                                            value={"15"}><span style={{fontSize:inputFieldFontSize}}>15</span></Select.Option>
                                                                                        <Select.Option
                                                                                            value={"16"}><span style={{fontSize:inputFieldFontSize}}>16</span></Select.Option>
                                                                                        <Select.Option
                                                                                            value={"17"}><span style={{fontSize:inputFieldFontSize}}>17</span></Select.Option>
                                                                                        <Select.Option
                                                                                            value={"18"}><span style={{fontSize:inputFieldFontSize}}>18</span></Select.Option>
                                                                                        <Select.Option
                                                                                            value={"19"}><span style={{fontSize:inputFieldFontSize}}>19</span></Select.Option>
                                                                                        <Select.Option
                                                                                            value={"20"}><span style={{fontSize:inputFieldFontSize}}>20</span></Select.Option>
                                                                                        <Select.Option
                                                                                            value={"21"}><span style={{fontSize:inputFieldFontSize}}>21</span></Select.Option>
                                                                                        <Select.Option
                                                                                            value={"22"}><span style={{fontSize:inputFieldFontSize}}>22</span></Select.Option>
                                                                                        <Select.Option
                                                                                            value={"23"}><span style={{fontSize:inputFieldFontSize}}>23</span></Select.Option>
                                                                                    </Select>
                                                                                    <span
                                                                                        style={{margin: "0 4px 0 4px"}}>:</span>
                                                                                    <Select
                                                                                        id="brOC_autoDialView_ver2_callInfos_fromMinute"
                                                                                        style={{width: "60px",height:editorAutoDialButton.getAutoDialInputFieldHeight(),fontSize:editorAutoDialButton.getAutoDialInputFieldFontSize()}} size="large"
                                                                                        onChange={(val) => this._onChangeFromMinute(val) }
                                                                                        defaultValue={this._callInfosFromMinute}
                                                                                        value={this._callInfosFromMinute}
                                                                                    >
                                                                                        <Select.Option
                                                                                            value={"00"}><span style={{fontSize:inputFieldFontSize}}>00</span></Select.Option>
                                                                                        <Select.Option
                                                                                            value={"15"}><span style={{fontSize:inputFieldFontSize}}>15</span></Select.Option>
                                                                                        <Select.Option
                                                                                            value={"30"}><span style={{fontSize:inputFieldFontSize}}>30</span></Select.Option>
                                                                                        <Select.Option
                                                                                            value={"45"}><span style={{fontSize:inputFieldFontSize}}>45</span></Select.Option>
                                                                                    </Select>
                                                                                    <span
                                                                                        style={{margin: "0 4px 0 4px"}}>~</span>
                                                                                    <Select
                                                                                        id="brOC_autoDialView_ver2_callInfos_toMonth"
                                                                                        style={{width: "60px",height:editorAutoDialButton.getAutoDialInputFieldHeight(),fontSize:editorAutoDialButton.getAutoDialInputFieldFontSize()}} size="large"
                                                                                        onChange={(val) => this._onChangeToMonth( val ) }
                                                                                        defaultValue={this._callInfosToMonth}
                                                                                        value={this._callInfosToMonth}
                                                                                    >
                                                                                        <Select.Option
                                                                                            value={"1"}><span style={{fontSize:inputFieldFontSize}}>1</span></Select.Option>
                                                                                        <Select.Option
                                                                                            value={"2"}><span style={{fontSize:inputFieldFontSize}}>2</span></Select.Option>
                                                                                        <Select.Option
                                                                                            value={"3"}><span style={{fontSize:inputFieldFontSize}}>3</span></Select.Option>
                                                                                        <Select.Option
                                                                                            value={"4"}><span style={{fontSize:inputFieldFontSize}}>4</span></Select.Option>
                                                                                        <Select.Option
                                                                                            value={"5"}><span style={{fontSize:inputFieldFontSize}}>5</span></Select.Option>
                                                                                        <Select.Option
                                                                                            value={"6"}><span style={{fontSize:inputFieldFontSize}}>6</span></Select.Option>
                                                                                        <Select.Option
                                                                                            value={"7"}><span style={{fontSize:inputFieldFontSize}}>7</span></Select.Option>
                                                                                        <Select.Option
                                                                                            value={"8"}><span style={{fontSize:inputFieldFontSize}}>8</span></Select.Option>
                                                                                        <Select.Option
                                                                                            value={"9"}><span style={{fontSize:inputFieldFontSize}}>9</span></Select.Option>
                                                                                        <Select.Option
                                                                                            value={"10"}><span style={{fontSize:inputFieldFontSize}}>10</span></Select.Option>
                                                                                        <Select.Option
                                                                                            value={"11"}><span style={{fontSize:inputFieldFontSize}}>11</span></Select.Option>
                                                                                        <Select.Option
                                                                                            value={"12"}><span style={{fontSize:inputFieldFontSize}}>12</span></Select.Option>
                                                                                    </Select>
                                                                                    <span
                                                                                        style={{margin: "0 4px 0 4px"}}>/</span>
                                                                                    <Select
                                                                                        id="brOC_autoDialView_ver2_callInfos_toDay"
                                                                                        style={{width: "60px",height:editorAutoDialButton.getAutoDialInputFieldHeight(),fontSize:editorAutoDialButton.getAutoDialInputFieldFontSize()}} size="large"
                                                                                        onChange={(val) => this._onChangeToDay( val ) }
                                                                                        defaultValue={this._callInfosToDay}
                                                                                        value={this._callInfosToDay}
                                                                                    >
                                                                                        {toDaySelectOptionsJsx}
                                                                                    </Select>
                                                                                    <span
                                                                                        style={{margin: "0 4px 0 4px"}}>/</span>
                                                                                    <Input
                                                                                        id="brOC_autoDialView_ver2_callInfos_toYear"
                                                                                        maxLength={4}
                                                                                        //placeholder={i18n.t('Year')}
                                                                                        //allowClear
                                                                                        onFocus={(e) => this._onCallInfosToYearFocus(e)}
                                                                                        onBlur={(e) => this._onCallInfosToYearBlur(e)}
                                                                                        style={{
                                                                                            width: "100px",
                                                                                            height:editorAutoDialButton.getAutoDialInputFieldHeight(),
                                                                                            fontSize:editorAutoDialButton.getAutoDialInputFieldFontSize(),
                                                                                            //size: "middle"
                                                                                        }}
                                                                                        defaultValue={this._callInfosToYear}
                                                                                        value={this._callInfosToYear}
                                                                                        onChange={(e) => this._onChangeToYear(e.target.value)}
                                                                                    />
                                                                                    <span style={{marginLeft: "6px"}}></span>
                                                                                    <Select
                                                                                        id="brOC_autoDialView_ver2_callInfos_toHour"
                                                                                        style={{width: "60px",height:editorAutoDialButton.getAutoDialInputFieldHeight(),fontSize:editorAutoDialButton.getAutoDialInputFieldFontSize()}} size="large"
                                                                                        onChange={(val) => this._onChangeToHour( val ) }
                                                                                        defaultValue={this._callInfosToHour}
                                                                                        value={this._callInfosToHour}
                                                                                    >
                                                                                        <Select.Option
                                                                                            value={"00"}><span style={{fontSize:inputFieldFontSize}}>00</span></Select.Option>
                                                                                        <Select.Option
                                                                                            value={"01"}><span style={{fontSize:inputFieldFontSize}}>01</span></Select.Option>
                                                                                        <Select.Option
                                                                                            value={"02"}><span style={{fontSize:inputFieldFontSize}}>02</span></Select.Option>
                                                                                        <Select.Option
                                                                                            value={"03"}><span style={{fontSize:inputFieldFontSize}}>03</span></Select.Option>
                                                                                        <Select.Option
                                                                                            value={"04"}><span style={{fontSize:inputFieldFontSize}}>04</span></Select.Option>
                                                                                        <Select.Option
                                                                                            value={"05"}><span style={{fontSize:inputFieldFontSize}}>05</span></Select.Option>
                                                                                        <Select.Option
                                                                                            value={"06"}><span style={{fontSize:inputFieldFontSize}}>06</span></Select.Option>
                                                                                        <Select.Option
                                                                                            value={"07"}><span style={{fontSize:inputFieldFontSize}}>07</span></Select.Option>
                                                                                        <Select.Option
                                                                                            value={"08"}><span style={{fontSize:inputFieldFontSize}}>08</span></Select.Option>
                                                                                        <Select.Option
                                                                                            value={"09"}><span style={{fontSize:inputFieldFontSize}}>09</span></Select.Option>
                                                                                        <Select.Option
                                                                                            value={"10"}><span style={{fontSize:inputFieldFontSize}}>10</span></Select.Option>
                                                                                        <Select.Option
                                                                                            value={"11"}><span style={{fontSize:inputFieldFontSize}}>11</span></Select.Option>
                                                                                        <Select.Option
                                                                                            value={"12"}><span style={{fontSize:inputFieldFontSize}}>12</span></Select.Option>
                                                                                        <Select.Option
                                                                                            value={"13"}><span style={{fontSize:inputFieldFontSize}}>13</span></Select.Option>
                                                                                        <Select.Option
                                                                                            value={"14"}><span style={{fontSize:inputFieldFontSize}}>14</span></Select.Option>
                                                                                        <Select.Option
                                                                                            value={"15"}><span style={{fontSize:inputFieldFontSize}}>15</span></Select.Option>
                                                                                        <Select.Option
                                                                                            value={"16"}><span style={{fontSize:inputFieldFontSize}}>16</span></Select.Option>
                                                                                        <Select.Option
                                                                                            value={"17"}><span style={{fontSize:inputFieldFontSize}}>17</span></Select.Option>
                                                                                        <Select.Option
                                                                                            value={"18"}><span style={{fontSize:inputFieldFontSize}}>18</span></Select.Option>
                                                                                        <Select.Option
                                                                                            value={"19"}><span style={{fontSize:inputFieldFontSize}}>19</span></Select.Option>
                                                                                        <Select.Option
                                                                                            value={"20"}><span style={{fontSize:inputFieldFontSize}}>20</span></Select.Option>
                                                                                        <Select.Option
                                                                                            value={"21"}><span style={{fontSize:inputFieldFontSize}}>21</span></Select.Option>
                                                                                        <Select.Option
                                                                                            value={"22"}><span style={{fontSize:inputFieldFontSize}}>22</span></Select.Option>
                                                                                        <Select.Option
                                                                                            value={"23"}><span style={{fontSize:inputFieldFontSize}}>23</span></Select.Option>
                                                                                    </Select>
                                                                                    <span
                                                                                        style={{margin: "0 4px 0 4px"}}>:</span>
                                                                                    <Select
                                                                                        id="brOC_autoDialView_ver2_callInfos_toMinute"
                                                                                        style={{width: "60px",height:editorAutoDialButton.getAutoDialInputFieldHeight(),fontSize:editorAutoDialButton.getAutoDialInputFieldFontSize()}} size="large"
                                                                                        onChange={(val) => this._onChangeToMinute(val) }
                                                                                        defaultValue={this._callInfosToMinute}
                                                                                        value={this._callInfosToMinute}
                                                                                    >
                                                                                        <Select.Option
                                                                                            value={"00"}><span style={{fontSize:inputFieldFontSize}}>00</span></Select.Option>
                                                                                        <Select.Option
                                                                                            value={"15"}><span style={{fontSize:inputFieldFontSize}}>15</span></Select.Option>
                                                                                        <Select.Option
                                                                                            value={"30"}><span style={{fontSize:inputFieldFontSize}}>30</span></Select.Option>
                                                                                        <Select.Option
                                                                                            value={"45"}><span style={{fontSize:inputFieldFontSize}}>45</span></Select.Option>
                                                                                    </Select>
                                                                                </div>
                                                                            </td>
                                                                            <td>
                                                                                <button
                                                                                    title={i18n.t(`Search`)}
                                                                                    className="kbc-button kbc-button-fill-parent legacyButtonPadding brOCDefaultKbcButtonMargin"
                                                                                    onClick={(e) => this._onClickForGetDatetimeDescCallInfoArrayForDisplay()}
                                                                                    //size={"middle"}
                                                                                >
                                                                                    <svg height={svgButtonSize} viewBox="3 3 17.5 17.5"
                                                                                         width={svgButtonSize}>
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
                                                                <tr className={"noHoverContentColorForTr"}>
                                                                    <td colSpan={3}>
                                                                        <div style={{
                                                                            display: "flex",
                                                                            alignItems: "center",
                                                                            margin: "4px"
                                                                        }}>
                                                                            <Checkbox
                                                                                id="recentShowDetail_brOC_AutoDialView_ver2"
                                                                                checked={this.state.recentShowDetailChecked}
                                                                                onChange={(e) => this._onRecentShowDetailChange(e)}
                                                                            />
                                                                            <label style={{marginLeft: "2px",fontSize:otherFontSize}}
                                                                                   htmlFor="recentShowDetail_brOC_AutoDialView_ver2">{i18n.t("Show_detail")}</label>
                                                                        </div>
                                                                        <div className={"autoDialView_ver2_tableParent"}>
                                                                            <table style={{border: "0",width:"100%"}}
                                                                                   className={"defaultContentTable"}>
                                                                                <thead>
                                                                                <tr className="defaultItemPaddingForTr">
                                                                                    <th style={{fontSize: tableHeaderFontSize}}>{i18n.t("Tel")}</th>
                                                                                    <th style={{
                                                                                        fontSize: tableHeaderFontSize,
                                                                                        width: 10
                                                                                    }}>{i18n.t("CallStatus")}</th>
                                                                                    {isUsingUc && <th style={{
                                                                                        fontSize: tableHeaderFontSize,
                                                                                        width: 10
                                                                                    }}>{i18n.t("UcStatus")}</th>}
                                                                                    <th style={{
                                                                                        fontSize: tableHeaderFontSize,
                                                                                        width: 10
                                                                                    }}></th>
                                                                                    <th style={{fontSize: tableHeaderFontSize}}>{i18n.t("Incoming")}</th>
                                                                                    <th style={{fontSize: tableHeaderFontSize}}>{i18n.t("Transfer")}</th>
                                                                                    {this.state.recentShowDetailChecked &&
                                                                                        <th style={{fontSize: tableHeaderFontSize}}>{i18n.t("responder")}</th>}
                                                                                    <th style={{fontSize: tableHeaderFontSize}}>{i18n.t("StartedAt")}</th>
                                                                                    {this.state.recentShowDetailChecked &&
                                                                                        <th style={{fontSize: tableHeaderFontSize}}>{i18n.t("AnsweredAt")}</th>}
                                                                                    {this.state.recentShowDetailChecked &&
                                                                                        <th style={{fontSize: tableHeaderFontSize}}>{i18n.t("EndedAt")}</th>}
                                                                                    <th style={{fontSize: tableHeaderFontSize}}>{i18n.t("Recording-file")}</th>
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
                                                                                    //const isExtension = OCUtil.indexOfArrayFromExtensions(oc.state.extensions, partyNumber) !== -1;
                                                                                    const isExtension = true;
                                                                                    //const extensionsStatus = oc.state.extensionsStatus;
                                                                                    //const statusClassName = isExtension ? OCUtil.getExtensionStatusClassName(partyNumber, extensionsStatus) : "";
                                                                                    const statusClassName = 'led-grey';
                                                                                    const sIsIncoming = callHistory2CallInfo.getIsIncoming() ? "✓" : "";
                                                                                    const sStartedAt = dateFormatString.getYYYYMMDDhhmmssStringFromDate( new Date(callHistory2CallInfo.getAddCallMillisTime()) );
                                                                                    const sAnsweredAt = callHistory2CallInfo.getAnsweredAt() ? dateFormatString.getYYYYMMDDhhmmssStringFromDate( new Date(callHistory2CallInfo.getAnsweredAt())) : "";
                                                                                    const sEndedAt = callHistory2CallInfo.getEndCallMillisTime() ? dateFormatString.getYYYYMMDDhhmmssStringFromDate( new Date(callHistory2CallInfo.getEndCallMillisTime())) : "";
                                                                                    const sIsTransfer = callHistory2CallInfo.getIsTransfer() ? "✓" : "";
                                                                                    const sRecId = callHistory2CallInfo.getRecId();
																					const sResponder = callHistory2CallInfo.getResponder();

                                                                                    let ucUserStatusJsx;
                                                                                    if( isUsingUc ){
                                                                                        if( isExtension ){
                                                                                            //const ucUserStatus = RuntimeUcUserStatuses.getRuntimeUcUserStatusesStaticInstance().getUcUserStatus( partyNumber );
                                                                                            const ucUserStatus = 0;
                                                                                            if( ucUserStatus || ucUserStatus === 0 ){
                                                                                                const ucUserStatusClassName = EditorAutoDialView_ver2.getUcUserStatusClassName( partyNumber, ucUserStatus );
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
                                                                                            <td style={{
                                                                                                fontSize: tableBodyFontSize,
                                                                                                width: 10
                                                                                            }}>{partyNumber}</td>
                                                                                            <td style={{
                                                                                                fontSize: tableBodyFontSize,
                                                                                                textAlign: "center",
                                                                                                width: 10
                                                                                            }}>
                                                                                                <div
                                                                                                    style={{
                                                                                                        width: lampSize,
                                                                                                        height: lampSize
                                                                                                    }}
                                                                                                    className={statusClassName}></div>
                                                                                            </td>
                                                                                            {isUsingUc && (
                                                                                                <td style={{
                                                                                                    fontSize: tableBodyFontSize,
                                                                                                    textAlign: "center",
                                                                                                    width: 10
                                                                                                }}>
                                                                                                    {ucUserStatusJsx}
                                                                                                </td>
                                                                                            )}
                                                                                            <td style={{
                                                                                                fontSize: tableBodyFontSize,
                                                                                                width: 10
                                                                                            }}>
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
                                                                                                                    style={{
                                                                                                                        width: buttonSize,
                                                                                                                        height: buttonSize
                                                                                                                    }}
                                                                                                                    size="lg"
                                                                                                                    icon="fas fa-phone"/>}
                                                                                                        </button>
                                                                                                    </div>)}
                                                                                            </td>
                                                                                            <td style={{
                                                                                                fontSize: tableBodyFontSize,
                                                                                                textAlign: "center"
                                                                                            }}>{sIsIncoming}</td>
                                                                                            <td style={{
                                                                                                fontSize: tableBodyFontSize,
                                                                                                textAlign: "center"
                                                                                            }}>{sIsTransfer}</td>
																							{this.state.recentShowDetailChecked &&
                                                                                                <td style={{
                                                                                                    fontSize: tableBodyFontSize,
                                                                                                    textAlign: "left"
                                                                                                }}>{sResponder ? sResponder : "" }</td>}
                                                                                            <td style={{
                                                                                                fontSize: tableBodyFontSize,
                                                                                                textAlign: "center"
                                                                                            }}>{sStartedAt}</td>
                                                                                            {this.state.recentShowDetailChecked &&
                                                                                                <td style={{
                                                                                                    fontSize: tableBodyFontSize,
                                                                                                    textAlign: "center"
                                                                                                }}>{sAnsweredAt}</td>}
                                                                                            {this.state.recentShowDetailChecked &&
                                                                                                <td style={{
                                                                                                    fontSize: tableBodyFontSize,
                                                                                                    textAlign: "center"
                                                                                                }}>{sEndedAt}</td>}
                                                                                            <td style={{
                                                                                                fontSize: tableBodyFontSize,
                                                                                                textAlign: "center"
                                                                                            }}>
                                                                                                {sRecId &&
                                                                                                    <FontAwesomeIcon
                                                                                                        style={{
                                                                                                            width: buttonSize,
                                                                                                            height: buttonSize,
                                                                                                            cursor: "pointer"
                                                                                                        }}
                                                                                                        size="lg"
                                                                                                        icon="fa-solid fa-download"
                                                                                                        // onClick={(e) => this._downloadRecordWavFromUrl(recordWavUrlPrefix, sRecId)}
                                                                                                    />}
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
                                                        )}
                                                    </div>
                                                    <div className="panel tab-B">
                                                        <table className="defaultContentTable"
                                                               style={{border: "0", width: "100%"}}>
                                                            <tbody>
                                                            <tr className="defaultItemPaddingForTr noHoverContentColorForTr">
                                                                <td>
                                                                    <Input
                                                                        id="brOC_autoDialView_ver2_extension_filterWord"
                                                                        maxLength={1000}
                                                                        placeholder={i18n.t('Filter')}
                                                                        //allowClear
                                                                        defaultValue={''}
                                                                        onFocus={(e) => this._onExtensionsKeywordsFocus(e)}
                                                                    onBlur={(e) => this._onExtensionsKeywordsBlur(e)}
                                                                    style={{width: "300px", height:editorAutoDialButton.getAutoDialInputFieldHeight(),fontSize:editorAutoDialButton.getAutoDialInputFieldFontSize(),
                                                                        //size: "middle"
                                                                    }}
                                                                />
                                                            </td>
                                                            <td style={{paddingLeft: "0px"}}>
                                                                <Select
                                                                    id="brOC_autoDialView_ver2_extension_filterColumnName"
                                                                    style={{width:"120px",height:editorAutoDialButton.getAutoDialInputFieldHeight(),fontSize:editorAutoDialButton.getAutoDialInputFieldFontSize()}}
                                                                    defaultValue={ _EXTENSION_FILTER_COLUMN_NAME_DEFAULT_VALUE } size="large" onChange={ (val) =>{
                                                                    this._currentExtensionFilterColumnName = val;
                                                                }}>
                                                                    <Select.Option
                                                                        value={ _EXTENSION_FILTER_COLUMN_NAME_DEFAULT_VALUE }><span style={{fontSize:inputFieldFontSize}}>{i18n.t("ExtensionNumber")}</span></Select.Option>
                                                                    <Select.Option
                                                                        value="name"><span style={{fontSize:inputFieldFontSize}}>{i18n.t("Name")}</span></Select.Option>
                                                                </Select>
                                                            </td>
                                                            <td style={{paddingLeft: "4px"}}>
                                                                <button
                                                                    title={i18n.t(`Search`)}
                                                                    className="kbc-button kbc-button-fill-parent legacyButtonPadding brOCDefaultKbcButtonMargin"
                                                                    onClick={(e) => this._onClickGetExtensionList()}
                                                                    //size={"middle"}
                                                                >
                                                                    <svg height={svgButtonSize} width={svgButtonSize} viewBox="3 3 17.5 17.5">
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
                                                                            <th style={{fontSize:tableHeaderFontSize}}>{i18n.t("ExtensionNumber")}</th>
                                                                            <th style={{fontSize:tableHeaderFontSize}}>{i18n.t("Name")}</th>
                                                                            <th style={{fontSize:tableHeaderFontSize,width:10}}>{i18n.t("CallStatus")}</th>
                                                                            { isUsingUc && <th style={{fontSize:tableHeaderFontSize,width:10}}>{i18n.t("UcStatus")}</th> }
                                                                            <th style={{fontSize:tableHeaderFontSize,width:10}}>{i18n.t("Call")}</th>
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
                                                                            //const extensionsStatus = oc.state.extensionsStatus;
                                                                            //const statusClassName = this._getDummyExtensionStatusClassName(ext.id, extensionsStatus);
                                                                            const statusClassName = 'led-grey';

                                                                            let ucUserStatusJsx;
                                                                            if( isUsingUc ){
                                                                                //const ucUserStatus = RuntimeUcUserStatuses.getRuntimeUcUserStatusesStaticInstance().getUcUserStatus( ext.id );
                                                                                const ucUserStatus = 0;
                                                                                if( ucUserStatus || ucUserStatus === 0 ){
                                                                                    const ucUserStatusClassName = EditorAutoDialView_ver2.getUcUserStatusClassName( ext.id, ucUserStatus );
                                                                                    ucUserStatusJsx = <div style={{width:lampSize,height:lampSize}} className={ucUserStatusClassName}></div>;
                                                                                }
                                                                                else{
                                                                                    ucUserStatusJsx = <></>;
                                                                                }
                                                                            }

                                                                            return (
                                                                                <tr key={i}>
                                                                                    <td style={{fontSize:tableBodyFontSize}}>{ext.id}</td>
                                                                                    <td style={{fontSize:tableBodyFontSize}}>{ext.name}</td>
                                                                                    <td style={{fontSize:tableBodyFontSize,width: 10,textAlign:"center"}}>
                                                                                        <div
                                                                                            style={{width:lampSize,height:lampSize}}
                                                                                            className={statusClassName}></div>
                                                                                    </td>
                                                                                    { isUsingUc &&
                                                                                        <td style={{fontSize:tableBodyFontSize,width: 10,textAlign:"center"}}>
                                                                                            {ucUserStatusJsx}
                                                                                        </td>
                                                                                    }
                                                                                    <td style={{fontSize:tableBodyFontSize,width:10,textAlign:"center"}}>
                                                                                        <div style={{
                                                                                            display: "flex",
                                                                                            justifyContent: "center"
                                                                                        }}>
                                                                                            <button
                                                                                                title={i18n.t(`Call`)}
                                                                                                className="kbc-button kbc-button-fill-parent legacyButtonPadding brOCDefaultKbcButtonMargin"
                                                                                                onClick={(e) => {
                                                                                                    EditorAutoDialView_ver2.onClickCallButtonForAutoDialView(e, ext.id);
                                                                                                }
                                                                                                }>
                                                                                                {<FontAwesomeIcon
                                                                                                    style={{width:buttonSize,height:buttonSize}}
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
                                                        <table className="defaultContentTable" style={{border: "0",width:"100%"}}>
                                                            <tbody>
                                                            <tr className="defaultItemPaddingForTr noHoverContentColorForTr">
                                                                <td>
                                                                    <Input
                                                                        id="brOC_autoDialView_ver2_phonebook_keywords"
                                                                        maxLength={1000}
                                                                        placeholder={i18n.t('Keywords')}
                                                                        //allowClear
                                                                        defaultValue={''}
                                                                        onFocus={(e) => this._onPhonebookKeywordsFocus(e)}
                                                                        onBlur={(e) => this._onPhonebookKeywordsBlur(e)}
                                                                        style={{width: "300px",height:editorAutoDialButton.getAutoDialInputFieldHeight(),fontSize:editorAutoDialButton.getAutoDialInputFieldFontSize()}}/>
                                                                </td>
                                                                <td style={{paddingLeft: "4px"}}>
                                                                    <button
                                                                        title={i18n.t(`Search`)}
                                                                        className="kbc-button kbc-button-fill-parent legacyButtonPadding brOCDefaultKbcButtonMargin"
                                                                        onClick={(e) => this._onClickGetContactList()}
                                                                    >
                                                                        <svg width={svgButtonSize} height={svgButtonSize} viewBox="3 3 17.5 17.5">
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
                                                            <tr className="defaultItemPaddingForTr noHoverContentColorForTr">
                                                                <td>
                                                                    <span style={{fontSize:otherFontSize}}>{i18n.t("OnlySharedContacts")}</span>
                                                                </td>
                                                                <td style={{paddingLeft: "0"}}>
                                                                    <Switch
                                                                        id="brOC_autoDialView_ver2_phonebook_onlySharedContacts"
                                                                        // defaultChecked={false}   //!bug? Sometimes it stops working.
                                                                        size={switchSize}
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
                                                                                    <th style={{fontSize:tableHeaderFontSize}}>{i18n.t("PhonebookName")}</th>
                                                                                    <th style={{fontSize:tableHeaderFontSize}}>{i18n.t("Shared")}</th>
                                                                                    <th style={{fontSize:tableHeaderFontSize}}>{i18n.t("DisplayName")}</th>
                                                                                    <th style={{fontSize:tableHeaderFontSize,textAlign: "center",width:10}}>{i18n.t("Call")}</th>
                                                                                    <th style={{fontSize:tableHeaderFontSize,textAlign: "center",width:10}}>{i18n.t("Info")}</th>
                                                                                    <th style={{fontSize:tableHeaderFontSize,textAlign: "center",width:10}}>{i18n.t("Delete")}</th>
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
                                                                                            <td style={{fontSize:tableBodyFontSize}}>{autoDialViewzPhoneBookContact.getPhonebookName()}</td>
                                                                                            <td style={{fontSize:tableBodyFontSize,textAlign: "center"}}>{sShared}</td>
                                                                                            <td style={{fontSize:tableBodyFontSize}}>{autoDialViewzPhoneBookContact.getDisplayName()}</td>
                                                                                            <td style={{fontSize:tableBodyFontSize,width:10}}>
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
                                                                                                                style={{width:buttonSize,height:buttonSize}}
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
                                                                                                                style={{width:buttonSize,height:buttonSize}}
                                                                                                                size="lg"
                                                                                                                icon="fas fa-phone"/>
                                                                                                        </button>
                                                                                                    )}
                                                                                                    {telInfoArray && telInfoArray.length > 1 && (
                                                                                                        <a onClick={(e) => this._openPhonebookCallInfozTelsView(latestPbContactInfo)}>
                                                                                                            <FontAwesomeIcon
                                                                                                                style={{width:iconSize,height:iconSize}}
                                                                                                                size="lg"
                                                                                                                icon="fas fa-phone"/>
                                                                                                        </a>
                                                                                                    )}
                                                                                                </div>
                                                                                            </td>
                                                                                            <td style={{fontSize:tableBodyFontSize,width:10}}>
                                                                                                <div style={{
                                                                                                    display: "flex",
                                                                                                    alignItems: "center",
                                                                                                    justifyContent: "center"
                                                                                                }}>
                                                                                                    <a onClick={(e) => this._openPhonebookCallInfozInfoView2(autoDialViewzPhoneBookContact)}>
                                                                                                        {<FontAwesomeIcon
                                                                                                            style={{width:iconSize,height:iconSize}}
                                                                                                            size="lg"
                                                                                                            icon="fas fa-info-circle"/>}
                                                                                                    </a>
                                                                                                </div>
                                                                                            </td>
                                                                                            <td style={{fontSize:tableBodyFontSize,width:10}}>
                                                                                                {isDeletable && (
                                                                                                    <div style={{
                                                                                                        display: "flex",
                                                                                                        alignItems: "center",
                                                                                                        justifyContent: "center"
                                                                                                    }}>
                                                                                                        {/*<Popconfirm*/}
                                                                                                        {/*    title={i18n.t("are_you_sure")}*/}
                                                                                                        {/*    onConfirm={() => this._deleteContact2(autoDialViewzPhoneBookContact)}*/}
                                                                                                        {/*    okText={i18n.t("yes")}*/}
                                                                                                        {/*    cancelText={i18n.t("no")}*/}
                                                                                                        {/*>*/}
                                                                                                            <a>
                                                                                                                {
                                                                                                                    <FontAwesomeIcon
                                                                                                                        style={{width:iconSize,height:iconSize}}
                                                                                                                        size="lg"
                                                                                                                        icon="fa fa-trash"/>}
                                                                                                            </a>
                                                                                                        {/*</Popconfirm>*/}
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
                                                            <tr className="unsetBackgroundColor_AutoDialView_ver2">
                                                                <td colSpan="3" className="unsetBackgroundColor_AutoDialView_ver2"
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
                                                    {/* Voicemails area */}
                                                    <div className="panel tab-D">
                                                        <table className="defaultContentTable" style={{border: "0",width:"100%"}}>
                                                            <tbody>
                                                            <tr className="defaultItemPaddingForTr unsetBackgroundColor_AutoDialView_ver2">
                                                                <td className="unsetBackgroundColor_AutoDialView_ver2" style={{paddingLeft:"8px",paddingRight:"4px"}}>
                                                                    <div style={{display:"flex",justifyContent:"space-between"}}>
                                                                        <div style={{
                                                                            display: "flex",
                                                                            alignItems: "center",
                                                                            justifyContent: "start"
                                                                        }}>

                                                                            <span
                                                                                style={{
                                                                                    fontSize: otherFontSize,
                                                                                    marginLeft: 12
                                                                                }}>{i18n.t("Other_party")}:</span>
                                                                            <Input
                                                                                onChange={(e) => this._onChangeVoicemailsFilterOtherParty(e.target.value)}
                                                                                //style={{width: "100px"}}
                                                                                style={{
                                                                                    marginLeft: 4,
                                                                                    width: "120px",
                                                                                    height: editorAutoDialButton.getAutoDialInputFieldHeight(),
                                                                                    fontSize: editorAutoDialButton.getAutoDialInputFieldFontSize(),
                                                                                    //size: "middle"
                                                                                }}
                                                                                //placeholder="Please select a option"
                                                                                value={this._voicemailsFilterOtherParty}
                                                                                defaultValue={this._voicemailsFilterOtherParty}
                                                                                //onSelect={(i) => this._onSelectVoicemailsFilterStatus(i)}
                                                                            />
                                                                            <span
                                                                                style={{
                                                                                    fontSize: otherFontSize,
                                                                                    marginLeft: 12
                                                                                }}>{i18n.t("Status")}:</span>
                                                                            <Select
                                                                                // onChange={(value) => {
                                                                                // }}
                                                                                //style={{width: "100px"}}
                                                                                style={{
                                                                                    marginLeft: 4,
                                                                                    width: "100px",
                                                                                    height: editorAutoDialButton.getAutoDialInputFieldHeight(),
                                                                                    fontSize: editorAutoDialButton.getAutoDialInputFieldFontSize(),
                                                                                    //size: "middle"
                                                                                }}
                                                                                //placeholder="Please select a option"
                                                                                value={this._voicemailsFilterStatus}
                                                                                defaultValue={this._voicemailsFilterStatus}
                                                                                onSelect={(i) => this._onSelectVoicemailsFilterStatus(i)}
                                                                            >
                                                                                <Select.Option
                                                                                    value={FILTER_NONE_VALUE}>
                                                                                    <span
                                                                                        style={{fontSize: inputFieldFontSize}}></span>
                                                                                </Select.Option>
                                                                                {voicemailsFilterStatuses.map(([oStatus, iStatus]) => {
                                                                                    if (READ_STATUS_ENABLED !== true && iStatus === VOICEMAIL_FILTER_STATUS_VALUE_READ) {
                                                                                        return (null);
                                                                                    }
                                                                                    const sMessageKey = VOICEMAIL_STATUS_MESSAGE_KEYS[oStatus];
                                                                                    return <Select.Option
                                                                                        value={iStatus}>
                                                                                        <span
                                                                                            style={{fontSize: inputFieldFontSize}}>{i18n.t(sMessageKey)}</span>
                                                                                    </Select.Option>
                                                                                })}
                                                                            </Select>
																			<span
                                                                                style={{
                                                                                    fontSize: otherFontSize,
                                                                                    marginLeft: 12
                                                                                }}>{i18n.t("Time_order")}:</span>
                                                                            <Select
                                                                                // onChange={(value) => {
                                                                                // }}
                                                                                //style={{width: "100px"}}
                                                                                style={{
                                                                                    marginLeft: 4,
                                                                                    width: "100px",
                                                                                    height: systemSettingsData.getAutoDialInputFieldHeight(),
                                                                                    fontSize: systemSettingsData.getAutoDialInputFieldFontSize(),
                                                                                    //size: "middle"
                                                                                }}
                                                                                //placeholder="Please select a option"
                                                                                value={this._voicemailsTimeOrder}
                                                                                defaultValue={this._voicemailsTimeOrder}
                                                                                onSelect={(s) => this._onSelectVoicemailsTimeOrder(s)}
                                                                            >
                                                                                <Select.Option
                                                                                    value="asc">
                                                                                    <span
                                                                                        style={{fontSize: inputFieldFontSize}}>{i18n.t("Asc")}</span>
                                                                                </Select.Option>
                                                                                <Select.Option
                                                                                    value="desc">
                                                                                    <span
                                                                                        style={{fontSize: inputFieldFontSize}}>{i18n.t("Desc")}</span>
                                                                                </Select.Option>
                                                                            </Select>
                                                                            {/*<span style={{fontSize:otherFontSize}}>{i18n.t("DisplayOrder-Order")}:</span>*/}
                                                                            {/*<Select*/}
                                                                            {/*    // onChange={(value) => {*/}
                                                                            {/*    // }}*/}
                                                                            {/*    //style={{width: "100px"}}*/}
                                                                            {/*    style={{*/}
                                                                            {/*        marginLeft:4,*/}
                                                                            {/*        width: "100px",*/}
                                                                            {/*        height: editorAutoDialButton.getAutoDialInputFieldHeight(),*/}
                                                                            {/*        fontSize: editorAutoDialButton.getAutoDialInputFieldFontSize(),*/}
                                                                            {/*        //size: "middle"*/}
                                                                            {/*    }}*/}
                                                                            {/*    //placeholder="Please select a option"*/}
                                                                            {/*    value={this._voicemailsDisplayOrder}*/}
                                                                            {/*    defaultValue={this._voicemailsDisplayOrder}*/}
                                                                            {/*    onSelect={(e) => this._onSelectVoicemailsDisplayOrder(e)}*/}
                                                                            {/*>*/}
                                                                            {/*    <Select.Option value="asc"><span*/}
                                                                            {/*        style={{fontSize: inputFieldFontSize}}>{i18n.t("DisplayOrder-Asc")}</span></Select.Option>*/}
                                                                            {/*    <Select.Option value="desc"><span style={{fontSize: inputFieldFontSize}}>{i18n.t("DisplayOrder-Desc")}</span></Select.Option>*/}
                                                                            {/*</Select>*/}
                                                                            <button
                                                                                title={i18n.t(`Search`)}
                                                                                className="kbc-button kbc-button-fill-parent legacyButtonPadding brOCDefaultKbcButtonMargin"
                                                                                onClick={(e) => this._onClickSearchVoicemails()}
                                                                                //size={"middle"}
                                                                                style={{marginLeft: "10px"}}
                                                                            >
                                                                                <svg height={svgButtonSize}
                                                                                     width={svgButtonSize}
                                                                                     viewBox="3 3 17.5 17.5">
                                                                                    <path
                                                                                        d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z"
                                                                                        fill="black">
                                                                                    </path>
                                                                                </svg>
                                                                            </button>
                                                                        </div>
                                                                        <div style={{
                                                                            display: "flex",
                                                                            alignItems: "center",
                                                                            justifyContent: "end",
                                                                            marginLeft : "16px"
                                                                        }}>
                                                                        <span
                                                                            style={{fontSize: otherFontSize}}>{i18n.t("Total")}&nbsp;{this._totalVoicemailCount}</span>
                                                                            <span
                                                                                style={{fontSize: otherFontSize}}>,&nbsp;{i18n.t("Voicemail-status_New")}&nbsp;{this._newVoicemailCount}</span>
                                                                            <span
                                                                                style={{fontSize: otherFontSize}}>,&nbsp;{i18n.t("Voicemail-status_Saved")}&nbsp;{this._savedVoicemailCount}</span>
                                                                            { READ_STATUS_ENABLED && <span
                                                                                style={{fontSize: otherFontSize}}>,&nbsp;{i18n.t("Voicemail-status_Read")}&nbsp;{this._readVoicemailCount}</span>}
                                                                            {/*<Popconfirm title={i18n.t("are_you_sure")} onConfirm={ () => this._deleteVoicemails() }*/}
                                                                            {/*            okText={i18n.t("yes")}*/}
                                                                            {/*            cancelText={i18n.t("no")}*/}
                                                                            {/*>*/}
                                                                                <Button style={{marginLeft:"12px",fontSize:otherFontSize}}>{i18n.t("Delete_voice_mails")}</Button>
                                                                            {/*</Popconfirm>*/}
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                            {/* Voicemails main content start */}
                                                            <tr>
                                                                <td colSpan={3} style={{padding:"0px"}}>
                                                                    {/*<div style={{*/}
                                                                    {/*    display: "flex",*/}
                                                                    {/*    alignItems: "center",*/}
                                                                    {/*    margin: "4px"*/}
                                                                    {/*}}>*/}
                                                                    {/*    <Checkbox*/}
                                                                    {/*        id="recentShowDetail_brOC_AutoDialView_ver2"*/}
                                                                    {/*        checked={this.state.recentShowDetailChecked}*/}
                                                                    {/*        onChange={(e) => this._onRecentShowDetailChange(e)}*/}
                                                                    {/*    />*/}
                                                                    {/*    <label style={{*/}
                                                                    {/*        marginLeft: "2px",*/}
                                                                    {/*        fontSize: otherFontSize*/}
                                                                    {/*    }}*/}
                                                                    {/*           htmlFor="recentShowDetail_brOC_AutoDialView_ver2">{i18n.t("Show_detail")}</label>*/}
                                                                    {/*</div>*/}

                                                                    <div className={"autoDialView_ver2_tableParent"}
                                                                         id="voicemailScrollableDiv_brOC_AutoDialView_ver2"
                                                                         onScroll={(e) => this._onScrollVoicemailScrollableDiv(e)}
                                                                    >
                                                                        <table style={{border: "0", width: "100%"}}
                                                                               className={"defaultContentTable"}>
                                                                            <thead>
                                                                            <tr className="defaultItemPaddingForTr">
                                                                                <th style={{
                                                                                    fontSize: tableHeaderFontSize,
                                                                                    width: 10,
                                                                                    textAlign: "center",
                                                                                    //paddingLeft:0,
                                                                                    //paddingRight:0
                                                                                }}>
                                                                                    <Checkbox
                                                                                        id="checkAll_voicemails_brOC_AutoDialView_ver2"
                                                                                        checked={this._checkAll_voicemails}
                                                                                        onChange={(e) => this._onCheckAll_voicemailsChange(e)}
                                                                                    />
                                                                                </th>
                                                                                <th style={{fontSize: tableHeaderFontSize}}>{i18n.t("Voicemail_Datetime")}</th>
                                                                                <th style={{
                                                                                    fontSize: tableHeaderFontSize,
                                                                                    width: 10
                                                                                }}>{i18n.t("Status")}</th>
                                                                                <th style={{fontSize: tableHeaderFontSize}}>{i18n.t("Other_party")}</th>
                                                                                <th style={{fontSize: tableHeaderFontSize}}>{i18n.t("Voicemail-type")}</th>
                                                                                <th style={{fontSize: tableHeaderFontSize}}>{i18n.t("Voicemail-Seconds")}</th>
                                                                                <th style={{fontSize: tableHeaderFontSize}}>{i18n.t("Download")}</th>
                                                                                <th style={{
                                                                                    fontSize: tableHeaderFontSize,
                                                                                    width: 10
                                                                                }}>{i18n.t("CallStatus")}</th>
                                                                                {isUsingUc && <th style={{
                                                                                    fontSize: tableHeaderFontSize,
                                                                                    width: 10
                                                                                }}>{i18n.t("UcStatus")}</th>}
                                                                                <th style={{
                                                                                    fontSIze: tableHeaderFontSize,
                                                                                    width: 10
                                                                                }}>{i18n.t("Call")}</th>
                                                                            </tr>
                                                                            </thead>
                                                                            <tbody
                                                                                id="voicemailsTbody_brOC_AutoDialView_ver2">
                                                                            {this._voicemails === undefined && (
                                                                                <div style={{
                                                                                    display: "flex",
                                                                                    justifyContent: "center",
                                                                                    alignItems: "center",
                                                                                    height: "inherit"
                                                                                }}>
                                                                                    <Spin/>
                                                                                </div>
                                                                            )}
                                                                            {this._voicemails && this._voicemails.map((voicemail, i) => {

                                                                                const sFrom = voicemail["from"];
                                                                                const sBytes = voicemail["length"];
                                                                                const bytes = parseInt(sBytes);
                                                                                const rec_id = voicemail["rec_id"];
                                                                                const sStatus = voicemail["status"];
                                                                                const sTime = voicemail["time"];
                                                                                const time = parseInt(sTime);
                                                                                const sType = voicemail["type"];
                                                                                let sTypeShow = VOICEMAIL_TYPE_MESSAGE_KEYS[sType];
                                                                                if (!sTypeShow) {
                                                                                    sTypeShow = VOICEMAIL_TYPE_OTHER_MESSAGE_KEY
                                                                                }

                                                                                const date = new Date(time);
                                                                                const sDateAndTimeOfCall = dateFormatString.getYYYYMMDDhhmmssStringFromDate(date);
                                                                                const sId = voicemail["id"];
                                                                                let sStatusShow = VOICEMAIL_STATUS_MESSAGE_KEYS[sStatus];
                                                                                if (!sStatusShow) {
                                                                                    sStatusShow = VOICEMAIL_STATUS_OTHER_MESSAGE_KEY;
                                                                                }
                                                                                const sOtherParty = EditorAutoDialView_ver2._sipurlToUser(sFrom);

                                                                                //const isExtension = OCUtil.indexOfArrayFromExtensions(oc.state.extensions, sOtherParty) !== -1;
                                                                                const isExtension = true;
                                                                                //const extensionsStatus = oc.state.extensionsStatus;
                                                                                //const statusClassName = isExtension ? EditorAutoDialView_ver2._getDummyExtensionStatusClassName(sOtherParty, extensionsStatus) : null;
                                                                                const statusClassName = 'led-grey';

                                                                                let ucUserStatusJsx;
                                                                                if (isUsingUc) {
                                                                                    if (isExtension) {
                                                                                        //const ucUserStatus = RuntimeUcUserStatuses.getRuntimeUcUserStatusesStaticInstance().getUcUserStatus(sOtherParty);
                                                                                        const ucUserStatus = 0;
                                                                                        if (ucUserStatus || ucUserStatus === 0) {
                                                                                            const ucUserStatusClassName = EditorAutoDialView_ver2.getUcUserStatusClassName(sOtherParty, ucUserStatus);
                                                                                            ucUserStatusJsx = <div style={{
                                                                                                width: lampSize,
                                                                                                height: lampSize
                                                                                            }}
                                                                                                                   className={ucUserStatusClassName}></div>;
                                                                                        } else {
                                                                                            ucUserStatusJsx = <></>;
                                                                                        }
                                                                                    } else {
                                                                                        ucUserStatusJsx = <></>;
                                                                                    }
                                                                                }

                                                                                let bChecked = false;
                                                                                const checked = this._checkedVoicemailMap[sId];
                                                                                if (checked === false || checked === true) {
                                                                                    bChecked = checked;
                                                                                }

                                                                                const voicemailWavUrl = voicemailWavUrlPrefix + rec_id;

                                                                                return (
                                                                                    <tr key={i}>
                                                                                        <Input type="hidden"
                                                                                               data-br-name={"id_voicemails_brOC_AutoDialView_ver2_" + i}
                                                                                               value={sId}/>
                                                                                        <td style={{
                                                                                            fontSize: tableBodyFontSize,
                                                                                            width: 10,
                                                                                            textAlign: "center",
                                                                                            //paddingLeft:0,
                                                                                            paddingRight: 0
                                                                                        }}>
                                                                                            <Checkbox
                                                                                                data-br-name={"check_voicemails_brOC_AutoDialView_ver2_" + i}
                                                                                                checked={bChecked}
                                                                                                onChange={(e) => this._onCheck_voicemailsChange(e, sId)}
                                                                                            />
                                                                                        </td>
                                                                                        <td style={{
                                                                                            fontSize: tableBodyFontSize,
                                                                                            textAlign: "center"
                                                                                        }}>
                                                                                            {sDateAndTimeOfCall}
                                                                                        </td>
                                                                                        <td style={{
                                                                                            fontSize: tableBodyFontSize,
                                                                                            textAlign: "center"
                                                                                        }}>{i18n.t(sStatusShow)}</td>
                                                                                        <td style={{
                                                                                            fontSize: tableBodyFontSize,
                                                                                            textAlign: "center"
                                                                                        }}>
                                                                                            {sOtherParty}
                                                                                        </td>
                                                                                        <td style={{
                                                                                            fontSize: tableBodyFontSize,
                                                                                            textAlign: "center"
                                                                                        }}>{i18n.t(sTypeShow)}</td>
                                                                                        <td style={{
                                                                                            fontSize: tableBodyFontSize,
                                                                                            textAlign: "right"
                                                                                        }}>{bytes}</td>
                                                                                        <td style={{
                                                                                            fontSize: tableBodyFontSize,
                                                                                            textAlign: "center"
                                                                                        }}>
                                                                                            <FontAwesomeIcon
                                                                                                style={{
                                                                                                    width: buttonSize,
                                                                                                    height: buttonSize,
                                                                                                    cursor: "pointer"
                                                                                                }}
                                                                                                size="lg"
                                                                                                icon="fa-solid fa-download"
                                                                                                // onClick={(e) => this._downloadVoicemailFromUrl(voicemailWavUrl, voicemail)}
                                                                                            />
                                                                                        </td>
                                                                                        <td style={{
                                                                                            fontSize: tableBodyFontSize,
                                                                                            width: 10,
                                                                                            textAlign: "center"
                                                                                        }}>
                                                                                            {!!statusClassName &&
                                                                                                <div
                                                                                                    style={{
                                                                                                        width: lampSize,
                                                                                                        height: lampSize
                                                                                                    }}
                                                                                                    className={statusClassName}></div>
                                                                                            }
                                                                                        </td>
                                                                                        {isUsingUc &&
                                                                                            <td style={{
                                                                                                fontSize: tableBodyFontSize,
                                                                                                width: 10,
                                                                                                textAlign: "center"
                                                                                            }}>
                                                                                                {ucUserStatusJsx}
                                                                                            </td>
                                                                                        }
                                                                                        <td style={{
                                                                                            fontSize: tableBodyFontSize,
                                                                                            width: 10,
                                                                                            textAlign: "center"
                                                                                        }}>
                                                                                            {sOtherParty && <div style={{
                                                                                                display: "flex",
                                                                                                justifyContent: "center"
                                                                                            }}>
                                                                                                <button
                                                                                                    title={i18n.t(`Call`)}
                                                                                                    className="kbc-button kbc-button-fill-parent legacyButtonPadding brOCDefaultKbcButtonMargin"
                                                                                                    onClick={(e) => {
                                                                                                        EditorAutoDialView_ver2.onClickCallButtonForAutoDialView(e, sOtherParty);
                                                                                                    }
                                                                                                    }>
                                                                                                    {<FontAwesomeIcon
                                                                                                        style={{
                                                                                                            width: buttonSize,
                                                                                                            height: buttonSize
                                                                                                        }}
                                                                                                        size="lg"
                                                                                                        icon="fas fa-phone"/>}
                                                                                                </button>
                                                                                            </div>}
                                                                                        </td>

                                                                                    </tr>
                                                                                )
                                                                            })}
                                                                            </tbody>
                                                                        </table>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                            <tr className="deleteVoicemails_AutoDialView_ver2 unsetBackgroundColor_AutoDialView_ver2">
                                                                <td colSpan="3"
                                                                    className="deleteVoicemails_AutoDialView_ver2 unsetBackgroundColor_AutoDialView_ver2"
                                                                    style={{paddingRight: "4px", paddingTop: "4px"}}>
                                                                    <div style={{
                                                                        display: "flex",
                                                                        alignItems: "center",
                                                                        justifyContent: "end"
                                                                    }}>
                                                                        {/*<Popconfirm title={i18n.t("are_you_sure")} onConfirm={ () => this._deleteVoicemails() }*/}
                                                                        {/*            okText={i18n.t("yes")}*/}
                                                                        {/*            cancelText={i18n.t("no")}*/}
                                                                        {/*>*/}
                                                                            <Button style={{fontSize:otherFontSize}}>{i18n.t("Delete_voice_mails")}</Button>
                                                                        {/*</Popconfirm>*/}
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                            {/* Voicemails main content end */}
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                    {/* panel tab-D end*/}
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
            </div>
            {/*<DropDownMenu operatorConsole={oc} ></DropDownMenu>*/}
        </>)
    }
}