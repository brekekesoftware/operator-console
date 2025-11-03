import React from 'react'
import {useState} from "react";
import {Button, Checkbox, Modal} from "antd";
import i18n from "./i18n";
import BrekekeOperatorConsole from "./index";
import Notification from "antd/lib/notification";
import OCUtil from "./OCUtil";
import Spin from "antd/lib/spin";
import Popconfirm from "antd/lib/popconfirm";

export default function DeleteLayoutsModalForDropDownMenu( props ){
    const operatorConsole = props.operatorConsole
    const open = props.useStateOpen;
    const setOpen = props.useStateSetOpen;
    //const noteNamesContent = props.noteNamesContent;
    const layoutNamesForDeleteLayouts = props.layoutNamesForDeleteLayouts;
    const isLoadingNoteNamesForDeleteLayouts = props.isLoadingNoteNamesForDeleteLayouts;
    const setNoteNamesFunctionForDeleteLayouts= props.setNoteNamesFunctionForDeleteLayouts;
    const setIsLoadingNoteNamesFunctionForDeleteLayouts= props.setIsLoadingNoteNamesFunctionForDeleteLayouts;
    //const [ refresh,setRefresh] = useState(false);
    //const setRerenderForDeleteLayoutsModal = props.setRerenderForDeleteLayoutsModal;
    //const rerenderForDeleteLayoutsModal = props.rerenderForDeleteLayoutsModal;
    const [ checkAll, setCheckAll ] = useState(false);
    const [ checks, setChecks ] = useState({});
    const [ deleteButtonDisabled , setDeleteButtonDisabled ] = useState(false);

    const handleDelete = () =>{
        setDeleteButtonDisabled(true);
        const promises = new Array();
        for( let i = 0;; i++ ) {
            const eCheckbox = document.getElementById("brOC_DeleteLayoutsModalForDropDownMenu_checkbox_" + i);
            if( !eCheckbox ){
                break;
            }
            if( eCheckbox.disabled === true ) {
                continue;
            }
            if( eCheckbox.checked !== true ){
                continue;
            }
            const layoutName = document.getElementById("brOC_DeleteLayoutsModalForDropDownMenu_layoutName_" + i).value;
            const noteName = BrekekeOperatorConsole.getOCNoteName( layoutName );

            const options = {};
            const tenant = operatorConsole.getLoggedinTenant();
            if (tenant) {
                options["tenant"] = tenant;
            }
            options["name"] = noteName;
            const deleteNoteOptions = {
                methodName : "deleteNote",
                methodParams : JSON.stringify( options ),
            }
            const promise = operatorConsole.getPalRestApi().callPalRestApiMethodAsync(deleteNoteOptions);
            promises.push( promise );
        }
        const p = Promise.allSettled( promises );
        p.then( (results) =>{
            let  success = true;
            for( let i = 0; i < results.length; i++ ){
                const result = results[i];
                if( result["status"] !== "fulfilled" ){
                    success = false;
                }
            }
            if( success ){
                Notification.success( { message:i18n.t("Layouts_have_been_deleted") });
            }
            else{
                OCUtil.logErrorWithNotification("Failed to delete layouts.", i18n.t("Failed_to_delete_layouts") );
            }
            refreshNoteNamesForDeleteLayoutsModalForDropDownMenu( operatorConsole, setNoteNamesFunctionForDeleteLayouts, setIsLoadingNoteNamesFunctionForDeleteLayouts );
            setDeleteButtonDisabled(false);
        });

        // const p = Promise.all( promises );
        // p.then( ()=>{
        //     Notification.success( { message:i18n.t("Layouts_have_been_deleted") });
        //     refreshNoteNamesForDeleteLayoutsModalForDropDownMenu( operatorConsole, setNoteNamesFunctionForDeleteLayouts, setIsLoadingNoteNamesFunctionForDeleteLayouts );
        //     setDeleteButtonDisabled(false);
        // }).catch( (e) =>{
        //     OCUtil.logErrorWithNotification("Failed to delete layouts.", i18n.t("Failed_to_delete_layouts"), e );
        //     refreshNoteNamesForDeleteLayoutsModalForDropDownMenu( operatorConsole, setNoteNamesFunctionForDeleteLayouts, setIsLoadingNoteNamesFunctionForDeleteLayouts );
        //     setDeleteButtonDisabled(false);
        // });
    }

    const handleCancel = () => {
        setCheckAll(false);
        setChecks({});
        setOpen(false);
        operatorConsole.subtractDisableKeydownToDialingCounter();
        operatorConsole.subtractDisablePasteToDialingCounter();

        //setNewOrOpenLayoutOpen(true);
    };

    const _onChangeCheck =( e, layoutName ) => {
        const checked = e.target.checked;
        checks[ layoutName ] = checked;
        setChecks( structuredClone( checks ) );
    }

    const footer = [
        <Button key="back" onClick={handleCancel}>
            {i18n.t("cancel")}
        </Button>,
        <Popconfirm key="submitConfirm" title={i18n.t("are_you_sure")} onConfirm={handleDelete}
                    okText={i18n.t("yes")}
                    cancelText={i18n.t("no")}
        >
            <Button type="primary" key="submit" disabled={deleteButtonDisabled} className="brOCMarginLeftButtonToButton">
                {i18n.t("Delete")}
            </Button>,
        </Popconfirm>
    ];

    let  mainJsx;
    if( isLoadingNoteNamesForDeleteLayouts ){
        mainJsx = <Spin />;
    }
    else if( !layoutNamesForDeleteLayouts || Array.isArray(layoutNamesForDeleteLayouts ) !== true || layoutNamesForDeleteLayouts.length === 0 ){
        mainJsx = i18n.t("Layout_does_not_exist");
    }
    else {
        const _onChangeCheckAll = (e) =>{
            const checked = e.target.checked;
            setCheckAll( checked );
            setChecks( value =>{
                if( checked !== true ){
                    return {};
                }
                const checks = {};
                for( let i = 0;; i++ ) {
                    const eCheckbox = document.getElementById("brOC_DeleteLayoutsModalForDropDownMenu_checkbox_" + i);
                    if( !eCheckbox ){
                        break;
                    }
                    if( eCheckbox.disabled !== true ){
                         //eCheckbox.checked = checked;
                        const layoutName = document.getElementById("brOC_DeleteLayoutsModalForDropDownMenu_layoutName_" + i).value;
                        checks[ layoutName ] = true;
                    }
                }
                return checks;
            })
        };
        mainJsx = [];
        mainJsx.push(<Checkbox key={-1} checked={checkAll} onChange={ (e) => _onChangeCheckAll(e) }>({i18n.t("CheckAll")})</Checkbox>);
        const lastLayoutShortname = operatorConsole.getLastLayoutShortname();
        let currentLayoutBolded = false;
        for( let i = 0; i < layoutNamesForDeleteLayouts.length; i++ ){
            const layoutName = layoutNamesForDeleteLayouts[i];
            let isFontBold = false;
            if( currentLayoutBolded === false ){
                isFontBold = layoutName === lastLayoutShortname;
                if( isFontBold === true ){
                    currentLayoutBolded = true;
                }
            }
            let style;
            let disabled;
            if( isFontBold ){
                style={fontWeight:"bold"};
                disabled = true;
            }
            else{
                style = null;
                disabled = false;
            }
            const checked = checks[ layoutName ] === true;
            mainJsx.push(<div key={i} style={style}><Checkbox checked={checked} disabled={disabled}
                                                              id={"brOC_DeleteLayoutsModalForDropDownMenu_checkbox_" + i}
                                                              onChange={(e) => _onChangeCheck(e, layoutName)}>{layoutName}</Checkbox><input
                type={"hidden"} id={"brOC_DeleteLayoutsModalForDropDownMenu_layoutName_" + i} value={layoutName}/>
            </div>);
        }
    }

    return (<Modal
        {...props}
        open={open}
        title={i18n.t("DeleteLayouts")}
        onOk={handleDelete}
        onCancel={handleCancel}
        footer={footer}
        maskClosable={false}
    >
        <div className="brOCReset">
            { mainJsx }
        </div>
    </Modal> );
}

export function refreshNoteNamesForDeleteLayoutsModalForDropDownMenu(
    operatorConsole, setNoteNamesFunc, setIsLoadingNoteNamesFunc ) {
    //setNoteNamesContentFunc(<Spin />);
   const getNoteNamesOptions ={
        methodName : "getNoteNames",
        methodParams : JSON.stringify({tenant:operatorConsole.getLoggedinTenant()}),
        onSuccessFunction : ( noteNames ) => {
            setNoteNamesFunc( noteNames );
            setIsLoadingNoteNamesFunc( false );
        },
        onFailFunction : ( errOrResponse ) =>{
            setNoteNamesFunc( null  );
            setIsLoadingNoteNamesFunc( false );
            OCUtil.logErrorWithNotification( "Failed to get note names.",i18n.t("Failed_to_get_note_names"), errOrResponse );
        }
    }
    setIsLoadingNoteNamesFunc( true );
    operatorConsole.getPalRestApi().callPalRestApiMethod( getNoteNamesOptions );

}