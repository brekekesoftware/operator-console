import React from 'react'
import {Button, Modal} from "antd";
import {useState} from "react";
import Spin from "antd/lib/spin";
import i18n from "./i18n";

export default function OpenLayoutModalForNoScreensView(props ) {
    //const operatorConsoleAsParent = props.operatorConsoleAsParent;
    const open = props.useStateOpen;
    const setOpen = props.useStateSetOpen;
    const setNewOrOpenLayoutOpen = props.useStateSetNewOrOpenLayoutOpen;
    const noteNamesContent =  props.useStateNoteNamesContent;

    const handleOk = () => {
            setOpen(false);
        };
        const handleCancel = () => {
            setOpen(false);
            setNewOrOpenLayoutOpen(true);
        };

        const footer = [
            <Button key="back" onClick={handleCancel}>
                {i18n.t("cancel")}
            </Button>,
        ];

    return ( <Modal
        {...props}
        open={open}
        title={i18n.t("selectLayout")}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={footer}
    >
        {noteNamesContent}
    </Modal> );

}