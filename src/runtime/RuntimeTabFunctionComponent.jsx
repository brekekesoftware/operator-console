import React, {useState} from 'react';
import {Tabs} from "antd";
import {DndContext, PointerSensor, useSensor} from "@dnd-kit/core";
import {arrayMove, horizontalListSortingStrategy, SortableContext, useSortable} from "@dnd-kit/sortable";
import { CSS } from '@dnd-kit/utilities';
import GridLines from "react-gridlines";
import RuntimeWidgetFactory from "./widget/runtime/RuntimeWidgetFactory";

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



const _onTabClick = ( tabKey, mouseEvent, runtimePaneAsParent  ) =>{
    const pane = runtimePaneAsParent;
    const paneId = pane.getPaneId();
    pane.onTabClickByRuntimeTabFunctionComponent( tabKey, mouseEvent );
}

const _onDragOver = function( ev ){
    ev.preventDefault();
    //ev.target.style.cursor = 'grabbing';
}

const _onDragEnter = function( ev ) {
    ev.preventDefault();
    //ev.dataTransfer.dropEffect = "grabbing";
}

export default function RuntimeTabFunctionComponent(props){
    const runtimePaneAsParent = props["runtimePaneAsParent"];
    const tabsData = props["tabsData"];

    //css["position"] = "relative";

    const tabItems = new Array(tabsData.getTabDataCount() );
    //const runtimeScreenView = runtimePaneAsParent.getRuntimeScreenView();
    for( let i = 0; i < tabItems.length; i++ ){
        const tabData = tabsData.getTabDataAt(i);
        const widgetDataArray = tabData.getWidgetDatas().getWidgetDataArray();

        const tabId= runtimePaneAsParent.getPaneId() + '_' + tabData.getTabKeyAsString();

        const tabChildren = (
            <div
                data-broc-tab-id={tabId}
            >
                {widgetDataArray.map( (widgetData,index) =>{
                    const options = {
                        runtimePane:runtimePaneAsParent,
                        widgetData:widgetData,
                        jsxKey:index
                    };
                    const widgetJsx = RuntimeWidgetFactory.getStaticRuntimeWidgetFactoryInstance().getRuntimeWidgetJsx( options );
                    return widgetJsx;
                })}
            </div>
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
            runtimePaneAsParent.setState({rerender:true});

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
        runtimePaneAsParent.setState({rerender:true});
    }

    const activeKey = tabsData.getSelectedTabKeyAsString();
    const className = props["className"] + " overflowAuto";
    const paneId = props["data-br-container-id"];
    const css = props["css"];
    const jsx = (
        <Tabs
            style={css}
            data-br-container-id={paneId}
            className={className}
            //tabBarStyle={{overflow:"auto"}}
            activeKey={activeKey}
            onChange={(selectedKey) => _onChangeByTabs(selectedKey) }
            onTabClick={(tabKey,mouseEvent) => _onTabClick(tabKey, mouseEvent, runtimePaneAsParent ) }
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