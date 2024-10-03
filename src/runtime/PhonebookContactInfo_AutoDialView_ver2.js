export default class PhonebookContactInfo_AutoDialView_ver2{

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
        this._TelInfoTitleArray = new Array();
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
                this._TelInfoTitleArray.push( pbContactInfozInfo.getTitle() );
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
        Object.freeze(this._TelInfoTitleArray);
        Object.freeze(this._PhonebookContactInfozTelInfoArray);
        Object.freeze(this._PhonebookContactInfozInfoArray);
    }

    getFreezedTelInfoKeyNameArray(){
        return this._TelInfoKeyNameArray;
    }

    getFreezedTelInfoTitleArray(){
        return this._TelInfoTitleArray;
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
