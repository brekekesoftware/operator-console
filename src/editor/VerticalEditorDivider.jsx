import React from 'react';
import BaseDivider from "../base/BaseDivider";
import BaseDividerData from "../data/BaseDividerData";
import EditorDivider from "./EditorDivider";

export default class VerticalEditorDivider extends EditorDivider  {

    constructor(props) {
        super(props);
    }

    //override
    getProps(){
        return {
            cssClass : "verticalDivider",
            dividerDirection : BaseDividerData.DIVIDER_DIRECTIONS.vertical
        };
    }

    //!override
    getDividerDirection(){
        return BaseDividerData.DIVIDER_DIRECTIONS.vertical
    }


}