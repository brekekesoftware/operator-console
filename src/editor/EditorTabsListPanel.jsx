import React from 'react';
import {Input, Popconfirm} from "antd";
import Button from "antd/lib/button";
import Notification from "antd/lib/notification";
import {DndContext, PointerSensor, useSensor} from "@dnd-kit/core";
import {SortableContext, verticalListSortingStrategy, useSortable} from "@dnd-kit/sortable";
import {CSS} from '@dnd-kit/utilities';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash, faGripVertical, faXmark} from "@fortawesome/free-solid-svg-icons";
import i18n from "../i18n";

const _SortableTabRow = ({tabData, onSelect, onChangeLabel, onRemove}) => {
    const {attributes, listeners, setNodeRef, transform, transition} = useSortable({
        id: tabData.getTabKeyAsString(),
    });
    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };
    return (
        <div ref={setNodeRef} style={style} className="brOCTabsListRow"
             onClick={() => onSelect(tabData.getTabKeyAsInt())}>
            <span className="brOCTabsListDragHandle" {...attributes} {...listeners}>
                <FontAwesomeIcon icon={faGripVertical}/>
            </span>
            <Input className="brOCTabsListLabelInput" variant="borderless" value={tabData.getTabLabel()}
                   onClick={(ev) => ev.stopPropagation()}
                   onChange={(ev) => onChangeLabel(tabData.getTabKeyAsInt(), ev.target.value)}/>
            <Popconfirm title={i18n.t("Are_you_sure_you_want_to_remove_the_tab")}
                        placement="left"
                        onConfirm={(ev) => {
                            // antd's Popconfirm popup is portaled to document.body, but React still
                            // bubbles its click through the JSX tree, so without this the row's own
                            // onClick (select) would fire right after removal and re-select the
                            // now-deleted tab's key, leaving TabsData with a dangling selected key.
                            if (ev) ev.stopPropagation();
                            onRemove(tabData.getTabKeyAsInt());
                        }}
                        onCancel={(ev) => { if (ev) ev.stopPropagation(); }}
                        okText={i18n.t("yes")}
                        cancelText={i18n.t("no")}
            >
                <a className="icon_general brOCTabsListRemoveIcon" onClick={(ev) => ev.stopPropagation()}>
                    <FontAwesomeIcon icon={faXmark}/>
                </a>
            </Popconfirm>
        </div>
    );
};

export default function EditorTabsListPanel(props) {
    const editScreenView = props["editScreenView"];
    const currentEditingPane = props["currentEditingPane"];
    const tabsData = currentEditingPane.getEditingPaneData().getTabsData();
    const tabDataArray = tabsData.getTabDataArray();

    const sensor = useSensor(PointerSensor, {
        activationConstraint: {
            distance: 10,
        },
    });

    const _onSelectTab = (tabKeyAsInt) => {
        tabsData.setSelectedTabKeyAsInt(tabKeyAsInt);
        editScreenView.commitEdit();
    };

    const _onChangeLabel = (tabKeyAsInt, label) => {
        const tabData = tabsData.getTabDataByTabKeyAsInt(tabKeyAsInt);
        tabData.setTabLabel(label);
        editScreenView.commitEdit();
    };

    const _onRemoveTab = (tabKeyAsInt) => {
        if (tabsData.getTabDataCount() === 1) {
            Notification.warning({message: i18n.t('youCanNotRemoveLastTab')});
            return;
        }
        tabsData.removeTabDataByTabKeyAsInt(tabKeyAsInt);
        editScreenView.commitEdit();
    };

    const _onRemoveAllTabsAndDisableTabs = () => {
        editScreenView.removeAllTabsAndDisableTabs(currentEditingPane);
    };

    const _onClickNewTab = () => {
        const insertedTabData = tabsData.addTab(i18n.t("UntitledTab"));
        tabsData.setSelectedTabKeyAsInt(insertedTabData.getTabKeyAsInt());
        editScreenView.commitEdit();
    };

    const _onDragEnd = ({active, over}) => {
        if (!over || active.id === over.id) {
            return;
        }
        const activeIndex = tabDataArray.findIndex((tabData) => tabData.getTabKeyAsString() === active.id);
        const overIndex = tabDataArray.findIndex((tabData) => tabData.getTabKeyAsString() === over.id);
        tabsData.replaceTabData(activeIndex, overIndex);
        editScreenView.commitEdit();
    };

    return (
        <div className="editorRightFrameRoot">
            <div style={{display: "flex", alignItems: "center", justifyContent: "space-between"}}>
                <p className="brOCSettingsSectionHeading" style={{margin: 0}}>{i18n.t("Tab")}</p>
                <Popconfirm title={i18n.t("Are_you_sure_you_want_to_remove_all_tabs_and_disable_tabs")}
                            placement="left"
                            onConfirm={_onRemoveAllTabsAndDisableTabs}
                            okText={i18n.t("yes")}
                            cancelText={i18n.t("no")}
                >
                    <a className="icon_general brOCSettingsDeleteIcon"><FontAwesomeIcon icon={faTrash}/></a>
                </Popconfirm>
            </div>
            <DndContext sensors={[sensor]} onDragEnd={_onDragEnd}>
                <SortableContext items={tabDataArray.map((tabData) => tabData.getTabKeyAsString())}
                                 strategy={verticalListSortingStrategy}>
                    <div className="brOCTabsListRows">
                        {tabDataArray.map((tabData) => (
                            <_SortableTabRow key={tabData.getTabKeyAsString()} tabData={tabData}
                                              onSelect={_onSelectTab} onChangeLabel={_onChangeLabel}
                                              onRemove={_onRemoveTab}/>
                        ))}
                    </div>
                </SortableContext>
            </DndContext>
            <Button className="brOCSelectLayoutNewButton defaultElementMarginTop" block
                    onClick={_onClickNewTab}>{i18n.t("newTab")}</Button>
        </div>
    );
}
