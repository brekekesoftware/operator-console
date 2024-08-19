import BaseDividerData from "./BaseDividerData";
import BaseDivider from "./base/BaseDivider";

export default class HorizontalDividerData extends BaseDividerData {

    constructor( panelDataAsParent, oDataObject ) {
        super( panelDataAsParent, oDataObject  );
    }

    //override
    getDividerDirection(){
        return BaseDividerData.DIVIDER_DIRECTIONS.horizontal;
    }

}