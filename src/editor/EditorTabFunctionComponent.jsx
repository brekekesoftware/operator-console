import React, {useState} from 'react';
import {Tabs} from "antd";
import {DndContext, PointerSensor, useSensor} from "@dnd-kit/core";
import {arrayMove, horizontalListSortingStrategy, SortableContext, useSortable} from "@dnd-kit/sortable";
import { CSS } from '@dnd-kit/utilities';
import GridLines from "react-gridlines";
import EditorWidgetFactory from "./widget/editor/EditorWidgetFactory";
import EditorWidgetTemplateFactory from "./widget/template/EditorWidgetTemplateFactory";

const DraggableTabNode = ({ className, ...props }) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
        id: props['data-node-key'],
    });
    const style = {
        ...props.style,
        transform: CSS.Translate.toString(transform),
        transition,
        cursor: 'move',
    };
    return React.cloneElement(props.children, {
        ref: setNodeRef,
        style,
        ...attributes,
        ...listeners,
    });
};



const _onTabClick = ( tabKey, mouseEvent, editorPaneAsParent  ) =>{
    const pane = editorPaneAsParent;
    const paneId = pane.getPaneId();
    pane.onTabClickByEditorTabFunctionComponent( tabKey, mouseEvent );
}

const _onDragOver = function( ev ){
    ev.preventDefault();
    //ev.target.style.cursor = 'grabbing';
}

const _onDragEnter = function( ev ) {
    ev.preventDefault();
    //ev.dataTransfer.dropEffect = "grabbing";
}

const _onDrop = function( ev, editorPane, tabData, tabId ){
    ev.preventDefault();
    ev.stopPropagation();
    //const e = ev.target;
    const sWidgetTypeId = ev.dataTransfer.getData('editorWidgetTypeId');
    if( !sWidgetTypeId ){
        return;
    }
    //const paneData = this.props["paneData"];
    const widgetTypeId = parseInt( sWidgetTypeId );
    const editorWidgetTemplate = EditorWidgetTemplateFactory.getStaticEditorWidgetSettingsFactoryInstance().getEditorWidgetTemplateByWidgetTypeId( widgetTypeId );
    const widgetWidth = editorWidgetTemplate.getWidth();
    const widgetHeight = editorWidgetTemplate.getHeight();

    const offsetX = parseInt(ev.dataTransfer.getData('offsetX'));
    const offsetY = parseInt(ev.dataTransfer.getData('offsetY'));
    const eTabRoot = document.querySelector('[data-broc-tab-id="' + tabId + '"]');
    const boundingRect = eTabRoot.getBoundingClientRect();
    const editingScreenGrid = editorPane.getEditScreenView().getEditingScreenGrid();

    let  widgetRelativePositionX = ev.clientX - boundingRect.left - offsetX;
    let widgetRelativePositionY = ev.clientY - boundingRect.top - offsetY;

    widgetRelativePositionX -= widgetRelativePositionX % editingScreenGrid;
    widgetRelativePositionY -= widgetRelativePositionY  % editingScreenGrid;
    const widgetDatas = tabData.getWidgetDatas();
    widgetDatas.addWidgetData( widgetTypeId, widgetRelativePositionX, widgetRelativePositionY, widgetWidth, widgetHeight );
    const widgetIndex = widgetDatas.getWidgetDataCount() - 1;
    const widgetData = widgetDatas.getWidgetDataAt( widgetIndex );
    editorPane.getEditScreenView().setSelectingEditorWidgetDataToState( widgetData );
}


export default function EditorTabFunctionComponent(props){
    const editorPaneAsParent = props["editorPaneAsParent"];
    const tabsData = props["tabsData"];

    //css["position"] = "relative";

    const tabItems = new Array(tabsData.getTabDataCount() );
    const editScreenView = editorPaneAsParent.getEditScreenView();
    const editingScreenGrid = editScreenView.getEditingScreenGrid();
    for( let i = 0; i < tabItems.length; i++ ){
        const tabData = tabsData.getTabDataAt(i);
        const widgetDataArray = tabData.getWidgetDatas().getWidgetDataArray();

        const tabId= editorPaneAsParent.getPaneId() + '_' + tabData.getTabKeyAsString();

        const tabChildren = (
            <GridLines
                data-broc-tab-id={tabId}
                component="div"
                className="editingGridLinesForTab"
                strokeWidth={2}
                cellWidth={editingScreenGrid * 10}
                cellWidth2={editingScreenGrid}
                cellHeight={editingScreenGrid * 10}
                cellHeight2={editingScreenGrid}
                onDragEnter={ (ev)=> _onDragEnter(ev)}
                onDragOver={(ev) =>{ _onDragOver(ev)}}
                onDrop={ (ev) => _onDrop(ev, editorPaneAsParent, tabData, tabId ) }

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
                {widgetDataArray.map( (widgetData,index) =>{
                    const options = {
                        editorPane:editorPaneAsParent,
                        widgetData:widgetDataArray[index],
                        jsxKey:index
                    };
                    const widgetJsx = EditorWidgetFactory.getStaticEditorWidgetFactoryInstance().getEditorWidgetJsx( options );
                    return widgetJsx;
                })}
            </GridLines>
        );

        const tabItem = {
            key: tabData.getTabKeyAsString(),
            label: tabData.getTabLabel(),
            children: tabChildren
        }
        tabItems[i] = tabItem;
    }

    //const [items, setItems] = useState(tabItems );

    // const [items, setItems] = useState([
    //     {
    //         key: '0',
    //         label: 'Tab 1',
    //         children: 'Content of Tab Pane 1',
    //     },
    //     {
    //         key: '1',
    //         label: 'Tab 2',
    //         children: 'Content of Tab Pane 2',
    //     },
    //     {
    //         key: '2',
    //         label: 'Tab 3',
    //         children: 'Content of Tab Pane 3',
    //     },
    // ]);
    const sensor = useSensor(PointerSensor, {
        activationConstraint: {
            distance: 10,
        },
    });
    const onDragEnd = ({ active, over }) => {
        if( !over  ){
            return;
        }

        if (active.id !== over.id) {
            const activeIndex = tabItems.findIndex((i) => i.key === active.id);
            const overIndex = tabItems.findIndex((i) => i.key === over?.id);
            tabsData.replaceTabData( activeIndex, overIndex );
            editorPaneAsParent.setState({rerender:true});

            // setItems((prev) => {
            //     const activeIndex = prev.findIndex((i) => i.key === active.id);
            //     const overIndex = prev.findIndex((i) => i.key === over?.id);
            //     const arrayMoved = arrayMove(prev, activeIndex, overIndex);
            //     return arrayMoved;
            // });
        }
    };

    const _onChangeByTabs = ( selectedKey ) =>{
        tabsData.setSelectedTabKeyAsString( selectedKey );
        editorPaneAsParent.setState({rerender:true});
    }


    const activeKey = tabsData.getSelectedTabKeyAsString();
    const className = props["className"] + " overflowAuto";
    const paneId = props["data-br-container-id"];
    const css = props["css"];
    const jsx = (
        <Tabs
            style={css}
            data-br-container-id={paneId}
            onMouseDown={ (ev) => {
                    ev.stopPropagation();
                    //ev.preventDefault();
                    editScreenView.setCurrentEditorPaneToState( editorPaneAsParent );
                }
            }
            className={className}
            //tabBarStyle={{overflow:"auto"}}
            activeKey={activeKey}
            onChange={(selectedKey) => _onChangeByTabs(selectedKey) }
            onTabClick={(tabKey,mouseEvent) => {
                mouseEvent.stopPropagation();
                _onTabClick(tabKey, mouseEvent, editorPaneAsParent );
            } }
            items={tabItems}
            renderTabBar={(tabBarProps, DefaultTabBar) => (
                <DndContext sensors={[sensor]} onDragEnd={onDragEnd}>
                    <SortableContext items={tabItems.map((i) => i.key)} strategy={horizontalListSortingStrategy}>
                        <DefaultTabBar {...tabBarProps}>
                            {(node) => (
                                <DraggableTabNode {...node.props} key={node.key}>
                                    {node}
                                </DraggableTabNode>
                            )}
                        </DefaultTabBar>
                    </SortableContext>
                </DndContext>
            )}
        />
    );
    return jsx;
}