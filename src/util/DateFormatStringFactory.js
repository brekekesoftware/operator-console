//!abstract
//!static
import DateFormatString_ja from "./DateFormatString_ja";
import DateFormatString_en from "./DateFormatString_en";

export default class DateFormatStringFactory{
    static newDateFormatStringInstance( language ){
        let dfs;

        //!depend language //!modify language //!sync language
        if( language === "ja"){
            dfs = new DateFormatString_ja();
        }
        else{
            dfs = new DateFormatString_en();
        }
        return dfs;
    }

}