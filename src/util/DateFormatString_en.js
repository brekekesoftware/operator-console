import DateFormatString from "./DateFormatString";

export default class DateFormatString_en extends  DateFormatString {

    constructor() {
        super();
    }

    //!override
    getYYYYMMDDhhmmssStringFromDate(date) {
        const s =
            DateFormatString._get_MMByDate(date)
            + '/'
            + DateFormatString._get_DDByDate(date)
            + '/'
            + DateFormatString._get_YYYYByDate(date)
            + ' '
            + DateFormatString._get_hhByDate(date)
            + ':'
            + DateFormatString._get_mmByDate(date)
            + ':'
            + DateFormatString._get_ssByDate(date)
        ;
        return s;
    }


}