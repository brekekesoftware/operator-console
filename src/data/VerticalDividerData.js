import BaseDividerData from "./BaseDividerData";

export default class VerticalDividerData extends BaseDividerData {

    constructor( panelDataAsParent, oDataObject ) {
        super( panelDataAsParent, oDataObject  );
    }

    //override
    getDividerDirection(){
        return BaseDividerData.DIVIDER_DIRECTIONS.vertical;
    }



}