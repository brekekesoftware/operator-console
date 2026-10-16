//!modify PBX
import PhonebookContactInfozTelInfo_AutoDialView_ver2 from "./PhonebookContactInfozTelInfo_AutoDialView_ver2";

export default class PhonebookContact_AutoDialView_ver2 {

    constructor( phonebookContactListContact ) {
            this._Aid = phonebookContactListContact["aid"];
            this._DisplayName = phonebookContactListContact["display_name"];
            this._PhonebookName = phonebookContactListContact["phonebook"];
            this._User = phonebookContactListContact["user"];
            this._latestContactInfo = null;
//            this._phonebookContactInfozTelInfo_AutoDialView_ver2_array = null;
    }

    getDisplayName(){
        return this._DisplayName;
    }

    getUser(){
        return this._User;
    }

    getAid(){
        return this._Aid;
    }

    getPhonebookName() {
        return this._PhonebookName;
    }

    setLatestPhonebookContactInfo( contactInfo ){
        this._latestContactInfo = contactInfo;//!reference
    }

    getLatestPhonebookContactInfo(){
        return this._latestContactInfo;
    }

    // setLatestTelInfoArrayFromFreezedPhonebookContactInfozTelInfoArray( freezedPhonebookContactInfozTelInfoArray ){
    //     const length = freezedPhonebookContactInfozTelInfoArray ? freezedPhonebookContactInfozTelInfoArray.length : 0;
    //     this._phonebookContactInfozTelInfo_AutoDialView_ver2_array = new Array( length );
    //     for( let i = 0; i < length; i++ ){
    //         const copySrc = freezedPhonebookContactInfozTelInfoArray[i];
    //         const info = new PhonebookContactInfozTelInfo_AutoDialView_ver2( null, null, null, null,copySrc );
    //         this._phonebookContactInfozTelInfo_AutoDialView_ver2_array[i] = info;
    //     }
    //     Object.freeze(this._phonebookContactInfozTelInfo_AutoDialView_ver2_array);
    // }

    // getLatestFreezedPhonebookContactInfozTelInfoArray(){
    //     return this._phonebookContactInfozTelInfo_AutoDialView_ver2_array;
    // }

}
