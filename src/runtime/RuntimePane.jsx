import React from 'react';
import VerticalDividerData from "../data/VerticalDividerData";
import HorizontalDividerData from "../data/HorizontalDividerData";
import BasePane from "../base/BasePane";
import BaseDividerData from "../data/BaseDividerData";
import PaneData from "../data/PaneData";
import GridLines from "react-gridlines";
import RuntimeTabFunctionComponent from "./RuntimeTabFunctionComponent";
import RuntimeWidgetFactory from "./widget/runtime/RuntimeWidgetFactory";

let _PANES = new Object();

//!abstract class
export default class RuntimePane extends BasePane {

    //!abstract
    getRuntimeScreenView(){
        throw new Error("Not implemented.");
    }

    //!abstract
    getRuntimeScreenViewFromProps( props ){
        throw new Error("Not implemented.");
    }

    getPaneData(){
        return this.props["paneData"];
    }

    constructor(props) {
        super(props);

        // const screenData = this.getEditScreenViewFromProps(props).getScreenData();
        const parentContainer = props["parent-container"];
        const paneType = props["paneType"];
        const paneData = props["paneData"];
        // let paneData;
        // if( parentContainer ){
        //     const parentPaneData = parentContainer.getEditingPaneData();
        //     paneData = screenData.addPaneData( paneType, parentPaneData  );
        //
        // }
        // else {
        //     paneData = screenData.addPaneData( PaneData.PANE_TYPES.rootPane );
        // }

        const paneNumber = paneData.getPaneNumber();
        _PANES[ paneNumber ] = this;

        let verticalDepth;
        let horizontalDepth;
        if( parentContainer ){
            verticalDepth = parentContainer._VerticalDepth;
            horizontalDepth = parentContainer._HorizontalDepth;
            const dividerData = parentContainer.getDividerData();
            const direction = dividerData.getDividerDirection();
            switch ( direction ) {
                case BaseDividerData.DIVIDER_DIRECTIONS.vertical:
                    verticalDepth++;
                    break;
                case BaseDividerData.DIVIDER_DIRECTIONS.horizontal:
                    horizontalDepth++;
                    break;
            }
        }
        else{
            verticalDepth = 0;
            horizontalDepth = 0;
        }
        this._VerticalDepth = verticalDepth;
        this._HorizontalDepth = horizontalDepth;

        // let depth;
        // if( parentContainer ){
        //     depth = parentContainer._Depth + 1;
        // }
        // else{
        //     depth = 0;
        // }
        // this._Depth = depth;
        //
        // let width = 100
        // for( let i = 0; i < this._Depth ; i++ ){
        //     width /= 2;
        // }
        let width;
        let runtimeVerticalAreaClassName;
        if(  this._VerticalDepth === 0  ){
            width = 100;
            runtimeVerticalAreaClassName = "editorVerticalAreaWidth100Percent";
        }
        else{
            width = 50;
            runtimeVerticalAreaClassName = "editorVerticalAreaWidth50Percent";
        }
        this._RuntimeVerticalAreaClassName = runtimeVerticalAreaClassName;
        this._WidthWithPercent = width + "%";

        let height;
        let runtimeHorizontalAreaClassName;
        if( this._HorizontalDepth === 0  ){
            height = 100;
            runtimeHorizontalAreaClassName = "editorHorizontalAreaHeight100Percent";
        }
        else{
            height = 50;
            runtimeHorizontalAreaClassName = "editorHorizontalAreaHeight50Percent";
        }
        this._RuntimeHorizontalAreaClassName = runtimeHorizontalAreaClassName;
        this._HeightWithPercent = height + "%";

        const backgroundColor = props["backgroundColor"];

        // if( parentContainer && parentContainer.getDividerData() ){
        //     const parentDividerData = parentContainer.getDividerData();
        //
        // }

        this.state = {
            parentContainer : parentContainer,
            backgroundColor : backgroundColor,
        };
    }

    getRuntimePaneData(){
        return this.props["paneData"];
    }

    setRuntimePanezSelectedTabKeyAsString( sTabKey ){
        this.props["paneData"].getTabsData().setSelectedTabKeyAsString( sTabKey );
    }

    setRuntimePanezEnableTabs( b ){
        this.props["paneData"].setEnableTabs(b);
    }

    getRuntimePanezEnableTabs(){
        const b = this.props["paneData"].getEnableTabs();
        return b;
    }

    getPaneId(){
        return this.props["paneData"].getPaneNumber();
    }

    static getRuntimePaneByContainerId(containerId ){
        const container = _PANES[ containerId ];
        return container;
    }

    // _getCSS(){
    //     const css = {
    //         backgroundColor:this.state.backgroundColor,
    //         width:"100%",
    //         height:"100%"
    //     };
    //     return css;
    // }

    setDivider( direction ){
        const paneData = this.props["paneData"];
        paneData.setDivider(direction);
        this.setState({rerender:true});
    }

    getDividerData(){
        return this.props["paneData"].getDividerData();
    }

    onTabClickByRuntimeTabFunctionComponent( tabKey, mouseEvent ){
        this.getRuntimeScreenView().onTabClickByRuntimePane( this, tabKey, mouseEvent );
    }

    //!abstract
    _getChildrenJsx(dividerDirection, widthClassName, heightClassName ){
        throw new Error("Not Implemented.");
    }

    render(){

        const paneData = this.props["paneData"];
        const dividerData = paneData.getDividerData();
        let jsx;
        if( dividerData ) {
            const dividerDirection = dividerData.getDividerDirection();
            let widthClassName;
            let heightClassName;
            if( this.state.parentContainer ){
                if( this.state.parentContainer.getDividerData().getDividerDirection() === BaseDividerData.DIVIDER_DIRECTIONS.vertical ){
                    widthClassName = "width50PercentMinusDividerWidth";
                }
                else {
                    widthClassName = "width100Percent";
                }
            }
            else{
                widthClassName = "width100Percent";
            }
            if( this.state.parentContainer ){
                if( this.state.parentContainer.getDividerData().getDividerDirection() === BaseDividerData.DIVIDER_DIRECTIONS.horizontal ){
                    heightClassName = "height50PercentMinusDividerHeight";
                }
                else {
                    heightClassName = "height100Percent";
                }
            }
            else{
                heightClassName = "height100Percent";
            }

            jsx = this._getChildrenJsx( dividerDirection, widthClassName, heightClassName  );
        }
        else {
            const css = {
                position:"relative"
            };

            if( !this.state.parentContainer ){
                //root container
                css["width"] = "100%";
                css["height"] = "100%";
            }
            //}
            const className =  "containerContent " +  this.props.className;
            const paneData = this.props["paneData"];
            const screenData = paneData.getPaneDatasAsParent().getScreenDataAsParent();
            css["color"] = screenData.getScreenForegroundColor();
            css["backgroundColor"] = screenData.getScreenBackgroundColor();

            const paneWidth = paneData.getPaneWidth();
            if( paneWidth && paneWidth !== -1 ){
                const dividerHalfWidthPx = getComputedStyle(document.documentElement).getPropertyValue("--broc_dividerHalfWidth");
                css["width"] = "calc(" + paneWidth + "% - " + dividerHalfWidthPx + ")" ;
            }
            const paneHeight = paneData.getPaneHeight();
            if( paneHeight && paneHeight  !== -1 ){
                const dividerHalfHeightPx = getComputedStyle(document.documentElement).getPropertyValue("--broc_dividerHalfHeight");
                css["height"] = "calc(" + paneHeight + "% - " + dividerHalfHeightPx + ")";
            }

            if( paneData.getEnableTabs() ){
                jsx = <RuntimeTabFunctionComponent
                    data-br-container-id={paneData.getPaneNumber() }
                    tabsData={paneData.getTabsData()}
                    runtimePaneAsParent={this}
                    className={className}
                    css={css}
                />
            }
            else{
                const runtimeScreenView = this.getRuntimeScreenView();
                const widgetDatas = paneData.getWidgetDatasForNoTabs();
                const widgetDataArray = widgetDatas.getWidgetDataArray();
                jsx = <div
                    data-br-container-id={paneData.getPaneNumber() }
                    // parent-container={this.state.parentContainer}
                    className={className}
                    style={css}
                >
                        {
                            widgetDataArray.map( ( widgetData, index ) => {
                                const widgetJsx = RuntimeWidgetFactory.getStaticRuntimeWidgetFactoryInstance().getRuntimeWidgetJsx({
                                    runtimePane: this,
                                    widgetData: widgetData,
                                    jsxKey : index
                                });
                                return widgetJsx;
                            })
                        }
                </div>
            }


        }

        return jsx;
    }

}