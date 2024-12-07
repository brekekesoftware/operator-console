export default class PhonebookContactInfozInfo_AutoDialView_ver2{
    //!private
    constructor( key, title, value, type ) {
        this._InfoKeyName = key;
        //Set name
        this._IsTelKey = type === "phone";
        this._IsCustomKey = false;

        if( !title || title.length === 0 ){
            if( !key || key.length === 0 ){
                this._Title = "";
            }
            else{
                this._Title = key;
            }
        }
        else{
            this._Title = title;
        }

        if( !key || key.length === 0 ) {
            //this._Title = "";
        }
        else {
            if ( this._IsTelKey) {
                if( !title || title.length === 0  ){
                    this._Title = PhonebookContactInfozInfo_AutoDialView_ver2.getTelTitle( key );
                }
                // //this._Title = key.substring(5).trim(); //"$tel_".length;
                // this._Title = key.substring(5 ); //"$tel_".length;
            } else {
                const isInfoKey = key.startsWith("$");
                if( isInfoKey ) {
                    // //this._Title = key.substring(1).trim();
                    // this._Title = key.substring(1);
                }
                else {
                    // //this._Title = key.trim();
                    // this._Title = key;
                    this._IsCustomKey = true;
                }
            }
        }

        // //Capitalize the first letter
        // if( this._Title ){
        //     if( this._Title.length > 1 ) {
        //         const firstChar = this._Title[0];
        //         this._Title = firstChar.toUpperCase() + this._Title.substring(1);
        //     }
        //     else if( this._Title.length === 1 ){
        //         const firstChar = this._Title[0];
        //         this._Title = firstChar.toUpperCase();
        //     }
        // }

        this._setValue(value);
    }

    static getTitleByPhonebookItem( item  ){
        let title;
        if( item.caption ){
            title = item.caption;
        }
        else{
            title = item.id;
            if( title ){
                const indexOfUnderscore = title.indexOf("_");
                if( indexOfUnderscore !== -1 ){
                    title = title.substring( indexOfUnderscore + 1 );
                }
            }
            if( title && title.length !== 0 && title[0] === "$" ){
                title = title.substring(1);
            }
        }
        return title;
    }

    static getTelTitle( telKey ){
        if( PhonebookContactInfozInfo_AutoDialView_ver2.isTelKey( telKey ) ) {
            const telTitle = telKey.substring(5); //"$tel_".length;
            return telTitle;
        }
        else{
            return telKey;
        }
    }

    static isTelKey( telKey ){
        const b = telKey && telKey.startsWith("$tel_");
        return b;
    }

    static isHiddenCustomKey( key ){
        const b =  key.startsWith("$");
        return b;
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



}
