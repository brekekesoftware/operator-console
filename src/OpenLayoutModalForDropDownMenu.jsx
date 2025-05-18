import React from 'react'
import {Button, Modal} from "antd";
import {useState} from "react";
import Spin from "antd/lib/spin";
import i18n from "./i18n";
import BrekekeOperatorConsole from "./index";
import Notification from "antd/lib/notification";
import OCUtil from "./OCUtil";


export default function OpenLayoutModalForDropDownMenu(props  ) {
    const operatorConsole = props.operatorConsole
    const open = props.useStateOpen;
    const setOpen = props.useStateSetOpen;
    const noteNamesContent = props.noteNamesContent;
    //const setNewOrOpenLayoutOpen = props.useStateSetNewOrOpenLayoutOpen;
    //const noteNamesContent =  props.useStateNoteNamesContent;

    //const [openLayoutOpen, setOpenLayoutOpen] = useState(false);

    const close = () =>{
        const oc = BrekekeOperatorConsole.getStaticInstance();
        oc.subtractDisableKeydownToDialingCounter();
        oc.subtractDisablePasteToDialingCounter();
        setOpen(false);
    }
    const handleOk = () => {
        close();
    };
    const handleCancel = () => {
        close();
        //setNewOrOpenLayoutOpen(true);
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
        maskClosable={false}
    >
        <div className="brOCReset">
            {noteNamesContent}
        </div>
    </Modal> );

}

export function refreshNoteNamesContent( operatorConsole, setNoteNamesContentFunc, setOpenLayoutModalOpenFunc, setIsLoading   ) {
    const selectOCNoteByShortname = ( operatorConsole, shortname ) => {
        const noteName = BrekekeOperatorConsole.getOCNoteName(shortname);
        const getNoteOptions = {
            methodName: "getNote",
            methodParams: JSON.stringify({
                tenant: operatorConsole.getLoggedinTenant(),
                name: noteName
            }),
            onSuccessFunction: (res) => {
                if (res) {
                    const sNote = res.note;
                    let oNote;
                    try {
                        oNote = JSON.parse(sNote);
                    } catch (err) {
                        console.error(err);
                        setIsLoading(false);
                        setOpenLayoutModalOpenFunc(false);
                        Notification.error({message: i18n.t('Failed_to_get_note') + "\r\n" + err, duration: 0});
                        return;
                    }

                    operatorConsole.setOCNote(shortname, oNote, function () {
                            //operatorConsole.onSelectOCNoteByShortnameFromNoScreensView(  this );
                            setIsLoading(false);
                            setOpenLayoutModalOpenFunc(false);
                        },
                        function (e) {
                            // const message = eventArg.message;
                            // console.error("Failed to setOCNote.", message);
                            // Notification.error({message: i18n.t("failed_to_load_data_from_pbx") + " " + message,duration:0});
                            //!testit
                            setIsLoading(false);
                            if (Array.isArray(e)) {
                                for (let i = 0; i < e.length; i++) {
                                    const err = e[i];
                                    console.error("setOCNote failed. errors[" + i + "]=", err);
                                }
                            } else {
                                console.error("setOCNote failed. error=", e);
                            }

                            try {
                                const sError = JSON.stringify(e);
                                Notification.error({
                                    message: i18n.t('failed_to_save_data_to_pbx') + "\r\n" + sError,
                                    duration: 0
                                });
                            } catch (err) {
                                Notification.error({
                                    message: i18n.t('failed_to_save_data_to_pbx') + "\r\n" + e,
                                    duration: 0
                                });
                            }
                            //Notification.error({message: i18n.t('failed_to_save_data_to_pbx') + "\r\n" +  e, duration:0 });

                            setOpenLayoutModalOpenFunc(false);
                        });
                } else {
                    setIsLoading(false);
                    //setOpenLayoutModalOpenFunc(false);
                    Notification.warning({message: i18n.t('The_note_does_not_exist')});
                }
            },
            onFailFunction: (errorOrResponse) => {
                OCUtil.logErrorWithNotification("Failed to get note.", i18n.t("Failed_to_get_note"), errorOrResponse)
                setIsLoading(false);
            }
        }
        operatorConsole.getPalRestApi().callPalRestApiMethod( getNoteOptions );

    };


    setNoteNamesContentFunc(<Spin />);

    const getNoteNamesOptions ={
        methodName : "getNoteNames",
        methodParams : JSON.stringify({tenant:operatorConsole.getLoggedinTenant()}),
        onSuccessFunction : ( allNoteNames ) => {
            if (!allNoteNames || allNoteNames.length == 0) {
                setNoteNamesContentFunc(i18n.t("Layout_does_not_exist"));
                return;
            }

            const noteNames = allNoteNames.filter( function(value){ return value.startsWith( BrekekeOperatorConsole.LAYOUT_NOTE_NAME_PREFIX )} );
            if (!noteNames || noteNames.length == 0) {
                setNoteNamesContentFunc(i18n.t("Layout_does_not_exist"));
                return;
            }

            let jsxContents = [];
            const lastLayoutShortname = operatorConsole.getLastLayoutShortname();
            let currentLayoutBolded = false;
            for (let i = 0; i < noteNames.length; i++) {
                const noteName = noteNames[i];
                const noteShortname = BrekekeOperatorConsole.getOCNoteShortname( noteName );
                if( noteShortname.length === 0 ){   //Skip. Because can not select.
                    continue;
                }
                let isFontBold = false;
                if( currentLayoutBolded === false ){
                    isFontBold = noteShortname === lastLayoutShortname;
                    if( isFontBold === true ){
                        currentLayoutBolded = true;
                    }
                }

                let sNoteShortname;
                if( isFontBold === true ){
                    sNoteShortname = <div key={i}><a style={{fontWeight:"bold"}} className="test"
                                                     onClick={() => selectOCNoteByShortname(operatorConsole, noteShortname)}>{noteShortname}</a><br/>
                    </div>;
                }
                else {
                    sNoteShortname = <div key={i}><a className="test"
                                                     onClick={() => selectOCNoteByShortname(operatorConsole, noteShortname)}>{noteShortname}</a><br/>
                    </div>;
                }
                jsxContents.push( sNoteShortname );
            }
            setNoteNamesContentFunc(jsxContents);
        },
        onFailFunction : ( errOrResponse ) =>{
            OCUtil.logErrorWithNotification( "Failed to get note names.",i18n.t("Failed_to_get_note_names"), errOrResponse );
        }
    }
    operatorConsole.getPalRestApi().callPalRestApiMethod( getNoteNamesOptions );

}