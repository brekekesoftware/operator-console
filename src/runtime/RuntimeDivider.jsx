import React from 'react';
import BaseDivider from "../base/BaseDivider";
import BaseDividerData from "../data/BaseDividerData";
import RuntimePane from "./RuntimePane";

let _RUNTIME_DIVIDER_ID = -1;
let _RUNTIME_DIVIDER_OBJECT = new Object();

export default class RuntimeDivider extends BaseDivider  {

    constructor(props) {
        super(props);
        this._RuntimePaneAsParent = props["runtimePaneAsParent"];
        _RUNTIME_DIVIDER_ID++;
        this._RuntimeDividerId = _RUNTIME_DIVIDER_ID;
        _RUNTIME_DIVIDER_OBJECT[ this._RuntimeDividerId ] = this;
    }

    static getRuntimeDividerByContainerId( id ){
        const o = _RUNTIME_DIVIDER_OBJECT[ id ];
        return o;
    }

    //!abstract
    getDividerDirection(){
        throw new Error("Not implemented.");
    }

    //abstract
    getProps(){
        throw new Error("Not implemented.");
    }

    _onMouseDown( ev ){
        ev.preventDefault();

        const eDivider = ev.target;
        this._element = eDivider;

        this._startClientX =  ev.clientX;
        this._startClientY =  ev.clientY;

        const direction = this.getDividerDirection();
        switch( direction ){
            case BaseDividerData.DIVIDER_DIRECTIONS.horizontal:
                const eUpperContainer = this._element.previousElementSibling;
                this._upperContainerElement = eUpperContainer;
                const eBottomContainer = this._element.nextElementSibling;
                this._bottomContainerElement = eBottomContainer;
                this._startUpperHeight = eUpperContainer.getBoundingClientRect().height;

                this._mouseMoveEventListenerForHorizontalFunction = (ev) =>{
                    this._mouseMoveHandlerForHorizontal(ev);
                };
                document.addEventListener('mousemove', this._mouseMoveEventListenerForHorizontalFunction);
                this._mouseUpEventListenerForHorizontalFunction = ( ev ) =>{
                    this._mouseUpHandlerForHorizontal(ev);
                };
                document.addEventListener('mouseup', this._mouseUpEventListenerForHorizontalFunction);
                break;
            case BaseDividerData.DIVIDER_DIRECTIONS.vertical:
                //const eLeftContainer = container.getChildLeftContainerElement();
                const eLeftContainer = this._element.previousElementSibling;
                this._leftContainerElement = eLeftContainer;
                this._startLeftWidth = eLeftContainer.getBoundingClientRect().width;
                //const eRightContainer = container.getChildRightContainerElement();
                const eRightContainer = this._element.nextElementSibling;
                this._rightContainerElement = eRightContainer;

                this._mouseMoveEventListenerForVerticalFunction = (ev) =>{
                    this._mouseMoveHandlerForVertical(ev);
                };
                document.addEventListener('mousemove', this._mouseMoveEventListenerForVerticalFunction);
                this._mouseUpEventListenerForVerticalFunction = ( ev ) =>{
                    this._mouseUpHandlerForVertical(ev);
                };
                document.addEventListener('mouseup', this._mouseUpEventListenerForVerticalFunction);
                break;
        }
    }

    _mouseMoveHandlerForHorizontal(e) {
        e.preventDefault();

        const upperHeight = this._startUpperHeight;
        const horizontalDivider = this._element;
        const upperSide = this._upperContainerElement;
        const bottomSide = this._bottomContainerElement;

        // How far the mouse has been moved
        //const dx = e.clientX - this._startClientX;
        const dy = e.clientY - this._startClientY;


        const newUpperHeight = ((upperHeight + dy) * 100) / horizontalDivider.parentNode.getBoundingClientRect().height;
        //upperSide.style.height = newUpperHeight + '%';
        const upperPaneId = upperSide.getAttribute("data-br-container-id");
        const upperRuntimePane = RuntimePane.getRuntimePaneByContainerId( upperPaneId );
        const upperRuntimePaneData = upperRuntimePane.getRuntimePaneData();
        upperRuntimePaneData.setPaneHeight( newUpperHeight );

        const newBottomHeight = 100 - newUpperHeight;
        //bottomSide.style.height = newBottomHeight + "%";
        const bottomPaneId = bottomSide.getAttribute("data-br-container-id");
        const bottomRuntimePane = RuntimePane.getRuntimePaneByContainerId( bottomPaneId );
        const bottomRuntimePaneData = bottomRuntimePane.getRuntimePaneData();
        bottomRuntimePaneData.setPaneHeight( newBottomHeight );

        horizontalDivider.style.cursor = 'row-resize';
        document.body.style.cursor = 'row-resize';

        upperSide.style.userSelect = 'none';
        upperSide.style.pointerEvents = 'none';

        bottomSide.style.userSelect = 'none';
        bottomSide.style.pointerEvents = 'none';

        this._RuntimePaneAsParent.getRuntimeScreenView().setState({rerender:true});
    };

    _mouseUpHandlerForHorizontal(ev) {
        ev.preventDefault();

        const horizontalDivider = this._element;
        const upperSide = this._upperContainerElement;
        const bottomSide = this._bottomContainerElement;

        horizontalDivider.style.removeProperty('cursor');
        document.body.style.removeProperty('cursor');

        upperSide.style.removeProperty('user-select');
        upperSide.style.removeProperty('pointer-events');

        bottomSide.style.removeProperty('user-select');
        bottomSide.style.removeProperty('pointer-events');

        document.removeEventListener('mousemove', this._mouseMoveEventListenerForHorizontalFunction );
        document.removeEventListener('mouseup', this._mouseUpEventListenerForHorizontalFunction );
    };

    _mouseMoveHandlerForVertical (e) {
        e.preventDefault();

        const x = this._startClientX;
        const y = this._startClientY;
        const leftWidth = this._startLeftWidth;
        const leftSide = this._leftContainerElement;
        const rightSide = this._rightContainerElement;
        const verticalDivider = this._element;

        // How far the mouse has been moved
        const dx = e.clientX - x;
        //const dy = e.clientY - y;

        const newLeftWidth = ((leftWidth + dx) * 100) / verticalDivider.parentNode.getBoundingClientRect().width;
        //leftSide.style.width = newLeftWidth + '%';
        const leftPaneId = leftSide.getAttribute("data-br-container-id");
        const leftRuntimePane = RuntimePane.getRuntimePaneByContainerId( leftPaneId );
        const leftRuntimePaneData = leftRuntimePane.getRuntimePaneData();
        leftRuntimePaneData.setPaneWidth( newLeftWidth );

        const newRightWidth = 100 - newLeftWidth;
        //rightSide.style.width = newRightWidth + "%";
        const rightPaneId = rightSide.getAttribute("data-br-container-id");
        const rightRuntimePane = RuntimePane.getRuntimePaneByContainerId( rightPaneId );
        const rightRuntimePaneData = rightRuntimePane.getRuntimePaneData();
        rightRuntimePaneData.setPaneWidth( newRightWidth );

        verticalDivider.style.cursor = 'col-resize';
        document.body.style.cursor = 'col-resize';

        leftSide.style.userSelect = 'none';
        leftSide.style.pointerEvents = 'none';

        rightSide.style.userSelect = 'none';
        rightSide.style.pointerEvents = 'none';

        this._RuntimePaneAsParent.getRuntimeScreenView().setState({rerender:true});
    };

    _mouseUpHandlerForVertical(ev) {
        ev.preventDefault();

        const verticalDivider = this._element;
        const leftSide = this._leftContainerElement;
        const rightSide = this._rightContainerElement;


        verticalDivider.style.removeProperty('cursor');
        document.body.style.removeProperty('cursor');

        leftSide.style.removeProperty('user-select');
        leftSide.style.removeProperty('pointer-events');

        rightSide.style.removeProperty('user-select');
        rightSide.style.removeProperty('pointer-events');

        document.removeEventListener('mousemove', this._mouseMoveEventListenerForVerticalFunction  );
        document.removeEventListener('mouseup', this._mouseUpEventListenerForVerticalFunction);
    };

    render(){

        const props = this.getProps();

        return (
            <div
                data-br-runtime-divider-id={ this._RuntimeDividerId }
                className={props.cssClass}
                onMouseDown={ (ev) => this._onMouseDown(ev) }
            ></div>
        );
    }

}