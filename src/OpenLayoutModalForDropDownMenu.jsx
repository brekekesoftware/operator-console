import React from 'react'
import {Button, Modal} from "antd";
import {useState} from "react";
import Spin from "antd/lib/spin";
import i18n from "./i18n";
import BrekekeOperatorConsole from "./index";
import Notification from "antd/lib/notification";


export default function OpenLayoutModalForDropDownMenu(props  ) {
    const operatorConsole = props.operatorConsole
    const open = props.useStateOpen;
    const setOpen = props.useStateSetOpen;
    const noteNamesContent = props.noteNamesContent;
    //const setNewOrOpenLayoutOpen = props.useStateSetNewOrOpenLayoutOpen;
    //const noteNamesContent =  props.useStateNoteNamesContent;

    const [openLayoutOpen, setOpenLayoutOpen] = useState(false);

    const handleOk = () => {
        setOpen(false);
    };
    const handleCancel = () => {
        setOpen(false);
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
    >
        <div className="brOCReset">
            {noteNamesContent}
        </div>
    </Modal> );

}

export function refreshNoteNamesContent( operatorConsole, setNoteNamesContentFunc, setOpenLayoutModalOpenFunc, setIsLoading   ) {
    const selectOCNoteByShortname = ( operatorConsole, shortname ) =>{
        const promise = operatorConsole.getOCNote(  shortname );
        promise.then( (noteInfo) => {
            const sNote = noteInfo.note;
            const oNote = JSON.parse(sNote);
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
                    if( Array.isArray(e)){
                        for( let i = 0; i < e.length; i++ ){
                            const err = e[i];
                            console.error("setOCNote failed. errors[" + i + "]=" , err );
                        }
                    }
                    else{
                        console.error("setOCNote failed. error=" , e );
                    }

                    try {
                        const sError = JSON.stringify(e);
                        Notification.error({message: i18n.t('failed_to_save_data_to_pbx') + "\r\n" +  sError, duration:0 });
                    }
                    catch( err ){
                        Notification.error({message: i18n.t('failed_to_save_data_to_pbx') + "\r\n" +  e, duration:0 });
                    }
                    //Notification.error({message: i18n.t('failed_to_save_data_to_pbx') + "\r\n" +  e, duration:0 });

                    setOpenLayoutModalOpenFunc(false);
                });
        });
        setIsLoading(true);
        // }).catch( (err) =>{
        // });
    };

    setNoteNamesContentFunc(<Spin />);
    const promise = operatorConsole.getOCNoteNamesPromise();
    promise.then((noteNames) => {
        if (!noteNames || noteNames.length == 0) {
            setNoteNamesContentFunc(i18n.t("Layout_does_not_exist"));
        } else {
            let jsxContents = [];
            for (let i = 0; i < noteNames.length; i++) {
                const noteName = noteNames[i];
                const noteShortname = BrekekeOperatorConsole.getOCNoteShortname( noteName );
                const sNoteShortname = <div key={i}><a className="test" onClick={ () => selectOCNoteByShortname( operatorConsole, noteShortname ) } >{noteShortname}</a><br /></div>;
                jsxContents.push( sNoteShortname );
            }
            setNoteNamesContentFunc(jsxContents);
        }
    }).catch((err) => {
        console.error(err);
        const sErr = i18n.t("failed_to_load_data_from_pbx") + " " + err;
        Notification.error( { message:sErr, duration:0 } );
    });
}