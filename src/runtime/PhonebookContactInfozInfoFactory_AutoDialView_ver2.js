import PhonebookContactInfozTelInfo_AutoDialView_ver2 from "./PhonebookContactInfozTelInfo_AutoDialView_ver2";
import PhonebookContactInfozInfo_AutoDialView_ver2 from "./PhonebookContactInfozInfo_AutoDialView_ver2";

export default class PhonebookContactInfozInfoFactory_AutoDialView_ver2{

    static createPhonebookContactInfozInfoTry( key, title = null, value, type = null  ){
        //const key = pbItem.key;
        if( !key || key.length === 0 ) {
            return null;
        }
        const isTelKey = PhonebookContactInfozInfo_AutoDialView_ver2.isTelKey( key );

        let info;
        if ( isTelKey ) {
            info = new PhonebookContactInfozTelInfo_AutoDialView_ver2( key, title, value, isTelKey );
        }
        else{
            info = new PhonebookContactInfozInfo_AutoDialView_ver2( key,title, value, isTelKey );
        }
        return info;
    }

}