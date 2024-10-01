import React from 'react';
import {Rnd} from "react-rnd";

export default class RuntimeWidget extends React.Component {

    constructor(props) {
        super(props);
        this._RuntimePaneAsParent = props["runtimePane"]; //tabs or noTabs
    }

    getWidgetData(){
        return this.props["widgetData"];
    }

    getRuntimePaneAsParent(){
        return this._RuntimePaneAsParent;
    }

    componentDidUpdate(){
        //empty( for subclass )
    }

    componentWillUnmount(){
        //empty( for subclass )
    }

    componentDidMount(){
        //empty( for subclass )
    }

    render(){
        const widgetData = this.getWidgetData();

        const relativePositionX = widgetData.getWidgetRelativePositionX();
        const relativePositionY = widgetData.getWidgetRelativePositionY();
        const widgetWidth = widgetData.getWidgetWidth();
        const widgetHeight  = widgetData.getWidgetHeight();
        //const backgroundColor = this.getBackgroundColor();
        //const widgetTypeId = this._WidgetData.getWidgetTypeId();
        const widgetIndex = this.props["widgetIndex"];

        //const  boundingRect = this._EditorPanelAsParent.getEditorPanelBoundingClientRect();


        //const absolutePositionX = boundingRect["x"] + relativePositionX;    //!temp
        //const absolutePositionY = boundingRect["y"] + relativePositionX;    //!temp

        // const jsx = <div
        //     style={{
        //         position:"absolute",
        //         left:relativePositionX,
        //         top:relativePositionY,
        //         width:widgetWidth,
        //         height:widgetHeight,
        //         border:"1px solid #000000",
        //         backgroundColor:this.getBackgroundColor(),
        //         //translate : relativePositionX + "px " + relativePositionY + "px"
        //     }}
        // ></div>;

        const css = {
            position:"absolute",
            left:relativePositionX + "px",
            top:relativePositionY + "px",
            width:widgetWidth + "px",
            height:widgetHeight + "px"
        };
        const jsx = <div
            style={css}
        >
            {this._getRenderMainJsx()}
        </div>
        return jsx;
    }

    //abstract
    _getRenderMainJsx(){
        throw new Error("Not implemented.");
    }

}