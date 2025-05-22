import React from 'react';
import {Rnd} from "react-rnd";
import clsx from "clsx";

const _EDITOR_WIDGETS = {};    //widgetData/EditorWidget
export default class EditorWidget extends React.Component {

    constructor(props) {
        super(props);
        this._EditorPaneAsParent = props["editorPane"]; //tabs or noTabs
        const widgetData = props["widgetData"];
        _EDITOR_WIDGETS[ widgetData ] = this;
    }

    static onRemoveWidgetByEditScreenView_static( editScreenViewAsCaller, widgetData ){
        delete _EDITOR_WIDGETS[ widgetData ];
    }

    // static _getEditorWidgetByWidgetData_static( widgetData ){
    //     const editorWidget = _EDITOR_WIDGETS[ widgetData ];
    //     return editorWidget;
    // }

    getWidgetData(){
        return this.props["widgetData"];
    }

    componentDidMount(){
        //!empty for subclass
    }

    componentDidUpdate(){
        //!empty for subclass
    }

    componentWillUnmount(){
        //!empty for subclass
    }

    getEditorPaneAsParent(){
        return this._EditorPaneAsParent;
    }


    _onWidgetMoved = ( x, y, widgetData ) => {
        const editView = this._EditorPaneAsParent.getEditScreenView();
        const editingScreenGrid = editView.getEditingScreenGrid();

        //drag limit
        if( x <= -widgetData.getWidgetWidth()  ){
            x = -widgetData.getWidgetWidth() + editingScreenGrid;
        }
        // if( y <= -widgetData.getWidgetHeight()  ){
        //     y = -widgetData.getWidgetHeight() + editingScreenGrid;
        // };

        const y2 = y + widgetData.getWidgetHeight();
        if( y2 < 0 ){
            y = editingScreenGrid - widgetData.getWidgetHeight();
        }

        //const editingWidgets = [...this.state.editingWidgets];
        const rx = x % editingScreenGrid;
        if (rx > editingScreenGrid * 0.5) {
            x += (editingScreenGrid - rx);
        } else {
            x -= rx;
        }
        const ry = y % editingScreenGrid;
        if (ry > editingScreenGrid * 0.5) {
            y += (editingScreenGrid - ry);
        } else {
            y -= ry;
        }

        const paneData = this._EditorPaneAsParent.getEditingPaneData();
        let widgetDatas;
        if( paneData.getEnableTabs() === true ) {
            const tabsData = paneData.getTabsData();
            const tabData = tabsData.getSelectedTabData();
            widgetDatas = tabData.getWidgetDatas();
        }
        else{
            widgetDatas = paneData.getWidgetDatasForNoTabs();
        }


        //const widgetDataArray = widgetDatas.getWidgetDataArray();
        //const widgetData = widgetDataArray[ widgetIndex ];
        widgetData.setWidgetRelativePositionX( x );
        widgetData.setWidgetRelativePositionY( y );
        widgetDatas.setIndexToLastByWidgetData( widgetData ); //render last
    }

    _moveWidgetForOnKeyDown( ev, widgetData, eWidget ){
        ev.stopPropagation();
        ev.preventDefault();
        const eParent = eWidget.parentElement;
        const rectParent = eParent.getBoundingClientRect();
        const rectWidget = eWidget.getBoundingClientRect();
        const x = eParent.scrollLeft + rectWidget.left - rectParent.left;
        const y = eParent.scrollTop + rectWidget.top - rectParent.top;
        const editView = this._EditorPaneAsParent.getEditScreenView();
        const editingScreenGrid = editView.getEditingScreenGrid();

        const keyCode = ev.keyCode;
        switch( keyCode ){
            case 38:    //Up arrow
                this._onWidgetMoved( x, y - editingScreenGrid - 0.1, widgetData );    //!bad -0.1
                break;
            case 40:    //Down arrow
                this._onWidgetMoved( x, y + editingScreenGrid, widgetData );
                break;
            case 37:    //Left arrow
                this._onWidgetMoved( x - editingScreenGrid, y, widgetData );
                break;
            case 39:    //Right arrow
                this._onWidgetMoved( x + editingScreenGrid, y, widgetData );
                break;
            default:
                console.error("Invalid call.");
                return;
        }
        this._EditorPaneAsParent.setState({rerender:true});
    }

    _onKeyDownFromEditScreenView( ev, widgetData, eWidget ){
        //const eWidget = ev.target.parentElement;    //Rnd tag
        //const eWidget = ev.target;    //Rnd tag
        // if( eWidget.classList.contains("brOCSelectingWidget") !== true ){
        //     return;
        // }

        const keyCode = ev.keyCode;
        switch( keyCode ){
            case 38:    //Up arrow
                this._moveWidgetForOnKeyDown( ev, widgetData, eWidget );
                break;
            case 40:    //Down arrow
                this._moveWidgetForOnKeyDown( ev, widgetData, eWidget );
                break;
            case 37:    //Left arrow
                this._moveWidgetForOnKeyDown( ev, widgetData, eWidget );
                break;
            case 39: //Right arrow
                this._moveWidgetForOnKeyDown( ev, widgetData, eWidget );
                break;
        }



    }

    _onDragStop( ev, data, widgetData  ){
        ev.stopPropagation();
        ev.preventDefault();
        this._onWidgetMoved(  data.lastX, data.lastY, widgetData );
//        this.makeWidgetOnTop(i);
        this._EditorPaneAsParent.getEditScreenView().setSelectingEditorWidgetDataToState( widgetData );
        //this._EditorPaneAsParent.setState({rerender:true});
    }

    _onResizeStop( ev,dir,element,delta,pos, widgetData  ){
        const style = window.getComputedStyle(element);
        const w = parseInt(style.width);
        const h = parseInt(style.height);
        this._onWidgetResized( dir, pos.x, pos.y, delta, w ,  h, widgetData )
    }

    _onWidgetResized = ( dir, x, y, delta, width, height, widgetData ) => {
        // const editorViewAsParent = this._EditorPanelAsParent.getEditorViewAsParent();
        // const editingScreenGrid = editorViewAsParent.getEditingScreenGrid();

        const paneData = this._EditorPaneAsParent.getEditingPaneData();
        let widgetDatas;
        if( paneData.getEnableTabs() === true ) {
            const tabsData = paneData.getTabsData();
            const tabData = tabsData.getSelectedTabData();
            widgetDatas = tabData.getWidgetDatas();
        }
        else{
            widgetDatas = paneData.getWidgetDatasForNoTabs();
        }

        //const widgetDataArray = widgetDatas.getWidgetDataArray();
        //const widgetData = widgetDataArray[ widgetIndex ];
        //const widgetData = this.getWidgetData();

        const editView = this._EditorPaneAsParent.getEditScreenView();
        const editingScreenGrid = editView.getEditingScreenGrid();
        //resize limit
        if( Math.floor( x ) + width  <= 0 ){
            width = editingScreenGrid - Math.floor( x );
        }
        if( Math.floor( y ) + height  <= 0 ){
            height = editingScreenGrid - Math.floor( y );
        };

        widgetData.setWidgetRelativePositionX( x );
        widgetData.setWidgetRelativePositionY( y );
        widgetData.setWidgetWidth( width );
        widgetData.setWidgetHeight( height );

        widgetDatas.setIndexToLastByWidgetData( widgetData ); //render last

        this._EditorPaneAsParent.setState({rerender:true});

    }

    static onSelectingEditorWidgetKeyDownByEditScreenView_static( editScreenViewAsCaller, ev, widgetData ){
        const editorWidget = _EDITOR_WIDGETS[ widgetData ];
        const eWidget = ev.target.querySelector(".brOCSelectingWidget");
        editorWidget._onKeyDownFromEditScreenView( ev, widgetData, eWidget );
    }

    _onMouseDown( ev, widgetData  ){
        ev.stopPropagation();
        ev.preventDefault();

        // const paneData = this._EditorPaneAsParent.getEditingPaneData();
        // let widgetDatas;
        // if( paneData.getEnableTabs() === true ) {
        //     const tabsData = paneData.getTabsData();
        //     const tabData = tabsData.getSelectedTabData();
        //     widgetDatas = tabData.getWidgetDatas();
        // }
        // else{
        //     widgetDatas = paneData.getWidgetDatasForNoTabs();
        // }

        //const widgetData = widgetDatas.getWidgetDataAt( widgetIndex );
        //const widgetData = this.getWidgetData();

        //Since onDragStop is also called on click, I commented it out to prevent multiple drawing.
        //this._EditorPaneAsParent.getEditScreenView().setSelectingEditorWidgetDataToState( widgetData );

    }

    render(){
        const editScreenView = this._EditorPaneAsParent.getEditScreenView();
        const editingScreenGrid = editScreenView.getEditingScreenGrid();

        const widgetData = this.getWidgetData();
        const relativePositionX = widgetData.getWidgetRelativePositionX();
        const relativePositionY = widgetData.getWidgetRelativePositionY();
        const widgetWidth = widgetData.getWidgetWidth();
        const widgetHeight  = widgetData.getWidgetHeight();
        //const backgroundColor = this.getBackgroundColor();
        //const widgetTypeId = this._WidgetData.getWidgetTypeId();
        //const widgetIndex = this.props["widgetIndex"];

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
        const bIsThisWidgetSelecting = editScreenView.getSelectingEditorWidgetDataFromState() === widgetData;
        const jsx = <Rnd
            className={clsx("brOCEditingWidget", bIsThisWidgetSelecting && "brOCSelectingWidget")}
            size={{width:widgetWidth,height:widgetHeight}}
            position={{x:relativePositionX,y:relativePositionY}}
            //bounds="parent"
            dragGrid={[editingScreenGrid, editingScreenGrid]}
            resizeGrid={[editingScreenGrid, editingScreenGrid]}
            enableResizing={true}
            onDragStop={ (ev,data) => this._onDragStop(ev,data, widgetData )}
            onResizeStop={ (e, dir, ref, delta, pos)  => this._onResizeStop( e,dir,ref,delta,pos, widgetData ) }
            onMouseDown={ (ev)=> this._onMouseDown( ev, widgetData  )}
            //tabIndex={-1}   //for enable onKeyDown
            //onKeyDown={ (ev) => this._onKeyDown(ev, widgetData, ev.target )}
            //style={{outline:0}}
            //
            // onResize={(e) => {
            //     e.stopPropagation();
            //     e.preventDefault();
            // }}
            // onResizeStart={(e) => {
            //     e.stopPropagation();
            //     e.preventDefault();
            // }}
        >
            {this._getRenderMainJsx()}
        </Rnd>
        return jsx;
    }

    //abstract
    _getRenderMainJsx(){
        throw new Error("Not implemented.");
    }

}