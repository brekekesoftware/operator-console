import React from 'react';
import EditorDivider from "./EditorDivider";
import VerticalDividerData from "../data/VerticalDividerData";
import HorizontalDividerData from "../data/HorizontalDividerData";
import BasePane from "../base/BasePane";
import BaseDividerData from "../data/BaseDividerData";
import PaneData from "../data/PaneData";
import EditorTabFunctionComponent from "./EditorTabFunctionComponent";
import GridLines from "react-gridlines";
import EditorWidgetFactory from "./widget/editor/EditorWidgetFactory";
import EditorWidgetTemplateFactory from "./widget/template/EditorWidgetTemplateFactory";
import WidgetData from "../data/widgetData/WidgetData";
import i18n from "../i18n";

let _PANES = new Object();

//!abstract class
export default class EditorPane extends BasePane {

    //!abstract
    getEditScreenView(){
        throw new Error("Not implemented.");
    }

    //!abstract
    getEditScreenViewFromProps( props ){
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
        let editorVerticalAreaClassName;
        if(  this._VerticalDepth === 0  ){
            width = 100;
            editorVerticalAreaClassName = "editorVerticalAreaWidth100Percent";
        }
        else{
            width = 50;
            editorVerticalAreaClassName = "editorVerticalAreaWidth50Percent";
        }
        this._EditorVerticalAreaClassName = editorVerticalAreaClassName;
        this._WidthWithPercent = width + "%";

        let height;
        let editorHorizontalAreaClassName;
        if( this._HorizontalDepth === 0  ){
            height = 100;
            editorHorizontalAreaClassName = "editorHorizontalAreaHeight100Percent";
        }
        else{
            height = 50;
            editorHorizontalAreaClassName = "editorHorizontalAreaHeight50Percent";
        }
        this._EditorHorizontalAreaClassName = editorHorizontalAreaClassName;
        this._HeightWithPercent = height + "%";


        // if( parentContainer && parentContainer.getDividerData() ){
        //     const parentDividerData = parentContainer.getDividerData();
        //
        // }

        this._ClassName = props["className"];

        this.state = {
            parentContainer : parentContainer,
        };
    }

    getEditingPaneData(){
        return this.props["paneData"];
    }

    setEditorPanezSelectedTabKeyAsString( sTabKey ){
        this.props["paneData"].getTabsData().setSelectedTabKeyAsString( sTabKey );
    }

    setEditorPanezEnableTabs( b ){
        this.props["paneData"].setEnableTabs(b);
    }

    getEditorPanezEnableTabs(){
        const b = this.props["paneData"].getEnableTabs();
        return b;
    }

    getPaneId(){
        return this.props["paneData"].getPaneNumber();
    }

    static getEditorPaneByContainerId(containerId ){
        const container = _PANES[ containerId ];
        return container;
    }

    setDivider( direction ){
        const paneData = this.props["paneData"];
        paneData.setDivider(direction);
        this.setState({rerender:true});
    }

    getDividerData(){
        return this.props["paneData"].getDividerData();
    }

    onTabClickByEditorTabFunctionComponent( tabKey, mouseEvent ){
        this.getEditScreenView().onTabClickByEditorPanel( this, tabKey, mouseEvent );
    }

    removeEditorDivider( onRemoveEditorDividerFunction ){
        const paneData = this.props["paneData"];
        paneData.removeDividerData();

        this.setState({rerender:true},
            ()=>{
                if( onRemoveEditorDividerFunction ){
                    onRemoveEditorDividerFunction(this);
                }
            }
        );
    }

    // _getChildContainerElement( className ){
    //     const eThis  = document.querySelector('[data-br-container-id="' + this._containerId + '"]');
    //     const e = eThis.querySelector("." + className );
    //     return e;
    // }
    //
    // getChildLeftContainerElement(){
    //     const e = this._getChildContainerElement("leftContainer");
    //     return e;
    // }
    //
    // getChildRightContainerElement(){
    //     const e = this._getChildContainerElement("rightContainer");
    //     return e;
    // }
    //
    // getChildUpperContainerElement(){
    //     const e = this._getChildContainerElement("upperContainer");
    //     return e;
    // }
    //
    // getChildBottomContainerElement(){
    //     const e = this._getChildContainerElement("bottomContainer");
    //     return e;
    // }

    //!abstract
    _getChildrenJsx(dividerDirection, widthClassName, heightClassName ){
        throw new Error("Not Implemented.");


    }

    _onDrop( ev ){
        ev.preventDefault();
        ev.stopPropagation();
        //const e = ev.target;
        const sWidgetTypeId = ev.dataTransfer.getData('editorWidgetTypeId');
        if( !sWidgetTypeId ){
            return;
        }
        const paneData = this.props["paneData"];
        const widgetTypeId = parseInt( sWidgetTypeId );
        const editorPanelId = paneData.getPaneNumber();

        const widgetDatas = paneData.getWidgetDatasForNoTabs();

        const editorWidgetTemplate = EditorWidgetTemplateFactory.getStaticEditorWidgetSettingsFactoryInstance().getEditorWidgetTemplateByWidgetTypeId( widgetTypeId );
        let widgetWidth = editorWidgetTemplate.getWidth();
        let widgetHeight = editorWidgetTemplate.getHeight();
        //Set editor widget value
        switch( widgetTypeId ){
            case WidgetData.WIDGET_TYPE_IDS.callTable:
                    widgetWidth = 640;
                    widgetHeight = 128;
                break;
            case WidgetData.WIDGET_TYPE_IDS.extensionTable:
                    widgetWidth = 640;
                    widgetHeight = 128;
                break;
            case WidgetData.WIDGET_TYPE_IDS.note:
                    widgetWidth = 320;
                    widgetHeight = 320;
                break;
            case WidgetData.WIDGET_TYPE_IDS.lineTable:
                    widgetWidth = 640;
                    widgetHeight = 128;
                break;
            case WidgetData.WIDGET_TYPE_IDS.legacyUccac:
                    widgetWidth = 470;
                    widgetHeight = 300;
                break;
        }


        const offsetX = parseInt(ev.dataTransfer.getData('offsetX'));
        const offsetY = parseInt(ev.dataTransfer.getData('offsetY'));
        const eEditorPanel = document.querySelector('[data-br-container-id="' +  editorPanelId + '"]');
        const panelRect = eEditorPanel.getBoundingClientRect();
        const editingScreenGrid = this.getEditScreenView().getEditingScreenGrid();

        let  widgetRelativePositionX = ev.clientX - panelRect.left - offsetX;
        let widgetRelativePositionY = ev.clientY - panelRect.top - offsetY;

        widgetRelativePositionX -= widgetRelativePositionX % editingScreenGrid;
        widgetRelativePositionY -= widgetRelativePositionY % editingScreenGrid;
        widgetDatas.addWidgetData( widgetTypeId, widgetRelativePositionX, widgetRelativePositionY, widgetWidth, widgetHeight );
        const widgetIndex = widgetDatas.getWidgetDataCount() - 1;
        const widgetData = widgetDatas.getWidgetDataAt( widgetIndex );
        this.getEditScreenView().setSelectingEditorWidgetDataToState( widgetData );
    }

    _onDragOver( ev ){
        ev.preventDefault();
        //ev.target.style.cursor = 'grabbing';
    }

    _onDragEnter( ev ) {
        ev.preventDefault();
        //ev.dataTransfer.dropEffect = "grabbing";
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
                color:this.props.foregroundColor,
                backgroundColor: this.props.backgroundColor
            };

            // if( dividerData ){
            //     const dividerDirection =  dividerData.getDividerDirection();
            //     switch( dividerDirection ){
            //         case BaseDividerData.DIVIDER_DIRECTIONS.vertical:
            //             css["height"] = "100%";
            //             break;
            //         case BaseDividerData.DIVIDER_DIRECTIONS.horizontal:
            //             css["width"] = "100%";
            //             break;
            //
            //     }
            // }
            // else{
                if( this.state.parentContainer ){

                }
                else{
                    //root container
                    css["width"] = "100%";
                    css["height"] = "100%";
                }
            //}
            const className =  "containerContent " +  this._ClassName;
            const paneData = this.props["paneData"];

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
                jsx = <EditorTabFunctionComponent
                    data-br-container-id={paneData.getPaneNumber() }
                    tabsData={paneData.getTabsData()}
                    editorPaneAsParent={this}
                    className={className}
                    css={css}
                />
            }
            else{
                const editScreenView = this.getEditScreenView();
                const editingScreenGrid = editScreenView.getEditingScreenGrid();
                const widgetDatas = paneData.getWidgetDatasForNoTabs();
                const widgetDataArray = widgetDatas.getWidgetDataArray();
                jsx = <div
                    data-br-container-id={paneData.getPaneNumber() }
                    // parent-container={this.state.parentContainer}
                    className={className}
                    style={css}
                    onMouseDown={ (ev)=>   this.getEditScreenView().onMouseDownEditorPaneInSettingsMode(ev) }
                    onDragEnter={ (ev)=> this._onDragEnter(ev)}
                    onDragOver={(ev) =>{ this._onDragOver(ev)}}
                    onDrop={ (ev) => this._onDrop(ev) }
                >
                    <GridLines
                        component="div"
                        className="editingGridLines"
                        strokeWidth={2}
                        cellWidth={editingScreenGrid * 10}
                        cellWidth2={editingScreenGrid}
                        cellHeight={editingScreenGrid * 10}
                        cellHeight2={editingScreenGrid}
                        //height={"100%"}
                        //width={"100%"}
                        //style={{width:"100%",height:"100%"}}
                        //style={{width:"300px",height:"300px",position:"relative"}}
                        //height={"1000px"}
                        //style={{width:"auto"}}
                        //  style={{height:"100%"}}
                        //style={{overflow:"auto"}}
                        //style={{height:"100px",width:"100px"}}
                        //style={{overflow:"auto",position:"relative"}}
                        //style={{whiteSpace:"nowrap"}}
                        // style={{height:"auto",width:"auto"}}
                    >
                        {
                            widgetDataArray.map( ( widgetData, index ) => {
                                const widgetJsx = EditorWidgetFactory.getStaticEditorWidgetFactoryInstance().getEditorWidgetJsx({
                                    editorPane: this,
                                    widgetData: widgetDataArray[index],
                                    jsxKey : index
                                });
                                return widgetJsx;
                            })
                        }
                 </GridLines>
                </div>
            }


        }

        return jsx;
    }

}