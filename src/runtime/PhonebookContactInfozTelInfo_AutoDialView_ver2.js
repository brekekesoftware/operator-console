import PhonebookContactInfozInfo_AutoDialView_ver2 from "./PhonebookContactInfozInfo_AutoDialView_ver2";

export default class PhonebookContactInfozTelInfo_AutoDialView_ver2 extends PhonebookContactInfozInfo_AutoDialView_ver2{
    constructor( key, title, value, type, phonebookItem = null ) {
        super(key, title, value, type, phonebookItem );
        this._SvgPathD = PhonebookContactInfozTelInfo_AutoDialView_ver2._getSvgPathD(this._Title);
    }

    // constructor( key, title, value, type, copySrc ) {
    //     if( copySrc ){
    //         super( key, title, value, type );
    //         this.copyFrom(copySrc);
    //     }
    //     else {
    //         super(key, title, value, type);
    //         this._SvgPathD = PhonebookContactInfozTelInfo_AutoDialView_ver2._getSvgPathD(this._Title);
    //     }
    // }

    //!override
    _setValue( val ){
        if( val === undefined || val === null  || val.length === 0 ) {
            super._Value = "";
        }
        else {
            //this._Value = value.trim();
            super._Value = val.trim();
        }
    }

    getSvgPathD(){
        return this._SvgPathD;
    }

    // copyFrom( phonebookContactInfozTelInfo_AutoDialView_ver2 ) {
    //     super.copyFrom( phonebookContactInfozTelInfo_AutoDialView_ver2 );
    //     this._SvgPathD = phonebookContactInfozTelInfo_AutoDialView_ver2._SvgPathD;
    // }

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