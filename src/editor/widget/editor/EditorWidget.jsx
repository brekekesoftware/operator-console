import React from 'react';
import {Rnd} from "react-rnd";

export default class EditorWidget extends React.Component {

    constructor(props) {
        super(props);
        this._EditorPaneAsParent = props["editorPane"]; //tabs or noTabs
    }

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
        if( y <= -widgetData.getWidgetHeight()  ){
            y = -widgetData.getWidgetHeight() + editingScreenGrid;
        };

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

    _onDragStop( ev, data, widgetData  ){
        ev.stopPropagation();
        ev.preventDefault();
        this._onWidgetMoved(  data.lastX, data.lastY, widgetData );
//        this.makeWidgetOnTop(i);
        this._EditorPaneAsParent.getEditScreenView().setSelectingEditorWidgetDataToState( widgetData );
        this._EditorPaneAsParent.setState({rerender:true});
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

    _onMouseDown( ev, widgetData  ){
        ev.stopPropagation();
        //ev.preventDefault();

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
        this._EditorPaneAsParent.getEditScreenView().setSelectingEditorWidgetDataToState( widgetData );

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
        const jsx = <Rnd
            size={{width:widgetWidth,height:widgetHeight}}
            position={{x:relativePositionX,y:relativePositionY}}
            //bounds="parent"
            dragGrid={[editingScreenGrid, editingScreenGrid]}
            resizeGrid={[editingScreenGrid, editingScreenGrid]}
            enableResizing={true}
            onDragStop={ (ev,data) => this._onDragStop(ev,data, widgetData )}
            onResizeStop={ (e, dir, ref, delta, pos)  => this._onResizeStop( e,dir,ref,delta,pos, widgetData ) }
            onMouseDown={ (ev)=> this._onMouseDown( ev, widgetData  )}
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