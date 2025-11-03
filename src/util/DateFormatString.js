//!abstract
export default class DateFormatString{

    constructor() {
    }

    //!abstract
    getYYYYMMDDhhmmssStringFromDate( date ){
        throw new Error("Not implemented.");
        return "";
    }
	
	
    //!protected
    static  _get_YYYYByDate(date) {
        const iFullYear = date.getFullYear();
        const sFullYear = iFullYear.toString().padStart(4,'0');
		return sFullYear;
	}

    //!protected
    static  _get_MMByDate(date){
        const iMonth = date.getMonth();
        const sMonth = (iMonth + 1).toString().padStart(2,'0');
		return sMonth;
	}

    //!protected
	static _get_DDByDate(date){
        const iDay = date.getDate();
        const sDay = iDay.toString().padStart(2,'0');
		return sDay;
	}

    static  _get_hhByDate(date){
        const iHour = date.getHours();
        const sHour = iHour.toString().padStart(2,'0');
		return sHour;
	}

    //!protected
    static  _get_mmByDate(date){
        const iMinute = date.getMinutes();
        const sMinute = iMinute.toString().padStart(2,'0');
		return sMinute;
	}

    //!protected
    static  _get_ssByDate(date){
        const iSecond = date.getSeconds();
        const sSecond = iSecond.toString().padStart(2,'0');
        return sSecond;
    }


}