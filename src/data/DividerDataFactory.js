import BaseDividerData from "./BaseDividerData";
import VerticalDividerData from "./VerticalDividerData";
import HorizontalDividerData from "./HorizontalDividerData";
export default class DividerDataFactory{

    //!private
    constructor() {
    }

    static getDividerDataFactoryStaticInstance(){
        return _DIVIDER_DATA_FACTORY;
    }

    createDividerDataFromObject( paneDataAsParent, oDividerData ){
        const dividerDirection = oDividerData["dividerDirection"];
        let dividerData;
        switch( dividerDirection ){
            case BaseDividerData.DIVIDER_DIRECTIONS.vertical:
                dividerData = new VerticalDividerData( paneDataAsParent, oDividerData );
                break;
            case BaseDividerData.DIVIDER_DIRECTIONS.horizontal:
                dividerData = new HorizontalDividerData( paneDataAsParent,  oDividerData );
                break;
            default:
                throw new Error("Invalid operation.");
        }
        return dividerData;
    }
}
const _DIVIDER_DATA_FACTORY = new DividerDataFactory();