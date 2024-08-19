import React from 'react';
import BaseDivider from "../base/BaseDivider";
import BaseDividerData from "../data/BaseDividerData";
import EditorDivider from "./EditorDivider";

export default class HorizontalEditorDivider extends EditorDivider  {

    constructor(props) {
        super(props);
    }

    //!override
    getProps(){
        return {
            cssClass : "horizontalDivider",
            dividerDirection : BaseDividerData.DIVIDER_DIRECTIONS.horizontal
        };
    }

    //!override
    getDividerDirection(){
        return BaseDividerData.DIVIDER_DIRECTIONS.horizontal
    }

}