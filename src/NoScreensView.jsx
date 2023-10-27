import React from 'react'
import {useState} from "react";
import {Button, Form, Input, Modal} from "antd";
import i18n from "./i18n";
import Popconfirm from "antd/lib/popconfirm";
import Notification from "antd/lib/notification";
import BrekekeOperatorConsole from "./index";
import OpenLayoutModal from "./OpenLayoutModal";
import Spin from "antd/lib/spin";

const REGEX =  /^[0-9a-zA-Z\-\_\ ]*$/;

export default function NoScreensView( props ){
    const operatorConsoleAsParent = props.operatorConsoleAsParent;
    const [open, setOpen] = useState(true);
    const showModal = () => {
        setOpen(true);
    };
    const handleOk = () => {
        setOpen(false);
    };
    const handleCancel = ( operatorConsoleAsParent ) => {
        setOpen(false);
        operatorConsoleAsParent.logout();
    };

    const [ newLayoutUseForm ] = Form.useForm();
    const [newLayoutConfirmOpen, setNewLayoutConfirmOpen] = useState(false);
    const [newLayoutName, setNewLayoutName ] = useState( "" );
    const [newLayoutModalOpen, setNewLayoutModalOpen] = useState(false);

    const handleNewLayoutOk = () => {
        newLayoutUseForm.validateFields().then(( values ) => {
            let layoutName = values.layoutName;
            setNewLayoutName( layoutName );
            layoutName = layoutName.trim();
            if( layoutName.length === 0 ){
                Notification.error( { key:"validation", message:i18n.t('OnlySpacesAreNotAllowed'), duration:15 } );
                return;
            }

            const bMatch = REGEX.test( layoutName );
            if( !bMatch ){
                Notification.error(  {  key:"validation", message:i18n.t('newLayoutValidationError'), duration:15 } );
                return;
            }

            //exists already?
            const layoutNoteName = BrekekeOperatorConsole.getOCNoteName( layoutName );

            const pGetNoteNames = operatorConsoleAsParent.getOCNoteNamesPromise();
            pGetNoteNames.then( ( noteNames ) => {
                let bNoteExists = true;
                if( !noteNames || noteNames.length === 0 ){
                    bNoteExists = false;
                }
                else{
                    const sFind = noteNames.find( ( itm ) => itm === layoutNoteName );
                    if( !sFind ){
                        bNoteExists = false;
                    }
                }

                if( bNoteExists ){

                    setNewLayoutConfirmOpen(true);

                }
                else {
                    const systemSettingsData = BrekekeOperatorConsole.getDefaultSystemSettingsData();
                    const systemSettingsDataData = systemSettingsData.getData();

                    const  layoutsAndSettingsData =  {
                        version:  BrekekeOperatorConsole.getAppDataVersion(),
                        screens:  BrekekeOperatorConsole.getEmptyScreens(),
                        systemSettings: systemSettingsDataData
                    };

                    const noteContent = JSON.stringify( layoutsAndSettingsData );
                    const setNotePromise = operatorConsoleAsParent.setOCNoteByPal(layoutName, noteContent);
                    setNotePromise.then(() => {
                        const sErr = operatorConsoleAsParent.setOCNote( layoutName, layoutsAndSettingsData );
                        if( sErr ){
                            console.error("Failed to setOCNote.", sErr );
                            throw new Error( sErr );
                        }
                        operatorConsoleAsParent.onSavedNewLayoutFromNoScreensView( this, layoutName, layoutsAndSettingsData  );
                        Notification.success( { message:i18n.t("saved_data_to_pbx_successfully") });
                    })
                        .catch((err) => {
                            console.error("Failed to save data to PBX.", err);
                            const msg = i18n.t("failed_to_save_data_to_pbx") + " " + err;
                            Notification.error({message: msg, duration: 0});
                        });
                }

            })
                .catch( (err) =>{
                    console.error("Failed to getNoteNames from  PBX.", err);
                    const msg = i18n.t("failed_to_load_data_from_pbx") + " " + err;
                    Notification.error({message:msg, duration:0} );
                });




        });
        // setLoading(true);
        // setTimeout(() => {
        //     setLoading(false);
        //     setNewLayoutModalOpen(false);
        // }, 3000);

    };
    const handleNewLayoutCancel = () => {
        cancelConfirmNewLayout();
        setNewLayoutModalOpen(false);
        setOpen(true);
    };

    const confirmNewLayout = (  ) => {
        const layoutName = newLayoutName;

        const systemSettingsData = BrekekeOperatorConsole.getDefaultSystemSettingsData();
        const systemSettingsDataData = systemSettingsData.getData();

        const  layoutsAndSettingsData =  {
            version:  BrekekeOperatorConsole.getAppDataVersion(),
            screens:  BrekekeOperatorConsole.getEmptyScreens(),
            systemSettings: systemSettingsDataData
        };

        const noteContent = JSON.stringify( layoutsAndSettingsData );
        const setNotePromise = operatorConsoleAsParent.setOCNoteByPal(layoutName, noteContent);
        setNotePromise.then(() => {
            const sErr = operatorConsoleAsParent.setOCNote( layoutName, layoutsAndSettingsData );
            if( sErr ){
                console.error("Failed to setOCNote.", sErr );
                throw new Error( sErr );
            }
            operatorConsoleAsParent.onSavedNewLayoutFromNoScreensView( this, layoutName, layoutsAndSettingsData );
            Notification.success( { message: i18n.t("saved_data_to_pbx_successfully") } );
        })
            .catch((err) => {
                console.error("Failed to save data to PBX.", err);
                const msg = i18n.t("failed_to_save_data_to_pbx") + " " + err;
                Notification.error({message: msg, duration: 0});
            });

        setNewLayoutConfirmOpen(false);
    };
    const cancelConfirmNewLayout = () => {
        setNewLayoutConfirmOpen(false);
        //message.error('Click on cancelNewLayout.');
    };
    const handleNewLayoutConfirmOpenChange = (newOpen) => {
        if (!newLayoutConfirmOpen) {
            return;
        }
        //handleOk( { newLayoutConfirmOpen, setNewLayoutConfirmOpen } );
        setNewLayoutConfirmOpen(newOpen);
    };

    const [openLayoutOpen, setOpenLayoutOpen] = useState(false);

    const selectOCNoteByShortname = ( shortname ) =>{
        const promise = operatorConsoleAsParent.getOCNote(  shortname );
        promise.then( (noteInfo) =>{
            const sNote = noteInfo.note;
            const oNote = JSON.parse(sNote);
            const dataErrorMessage = operatorConsoleAsParent.setOCNote( shortname, oNote );
            if( dataErrorMessage ){
                console.error("Failed to setOCNote.", dataErrorMessage );
                throw new Error( dataErrorMessage );
            }
            else{
                operatorConsoleAsParent.onSelectOCNoteByShortnameFromNoScreensView(  this );
            }
        }).catch( (err) =>{
            console.error(err);
            Notification.error({message:i18n.t("failed_to_load_data_from_pbx") + " " + err });
        });
    };

    const [noteNamesContent, setNoteNamesContent] = useState(<Spin />);

    const refreshNoteNames = () => {
        setNoteNamesContent(<Spin />);
        const promise = operatorConsoleAsParent.getOCNoteNamesPromise();
        promise.then((noteNames) => {
            if (!noteNames || noteNames.length == 0) {
                setNoteNamesContent(i18n.t("Layout_does_not_exist"));
            } else {
                let jsxContents = [];
                for (let i = 0; i < noteNames.length; i++) {
                    const noteName = noteNames[i];
                    const noteShortname = BrekekeOperatorConsole.getOCNoteShortname( noteName );
                    const sNoteShortname = <div key={i}><a onClick={ () => selectOCNoteByShortname( noteShortname ) } >{noteShortname}</a><br /></div>;
                    jsxContents.push( sNoteShortname );
                }
                setNoteNamesContent(jsxContents);
            }
        }).catch((err) => {
            console.error(err);
            const sErr = i18n.t("failed_to_load_data_from_pbx") + " " + err;
            Notification.error( { message:sErr, duration:0 } );
        });
    }

    const handleOpenLayoutOpen = () =>{
        setOpen(false);
        setOpenLayoutOpen(true);
        refreshNoteNames();
    }

    let newOrOpenLayoutFooter;
    let newOrOpenLayoutTitle;
    let newOrOpenLayoutText;
    if( operatorConsoleAsParent.getIsAdmin() ){
        newOrOpenLayoutTitle = i18n.t("NewOrOpenLayoutTitle");
        newOrOpenLayoutText = i18n.t("NewOrOpenLayoutText");
        newOrOpenLayoutFooter =[
            <Button key="back" onClick={ () => handleCancel( operatorConsoleAsParent ) }>
                {i18n.t("cancel")}
            </Button>,
            <Button key="submit" type="primary" onClick={ () =>{
                setOpen(false);
                setNewLayoutModalOpen(true);
            } }>
                {i18n.t("newLayout")}
            </Button>,
            <Button key="submit2" type="primary" onClick={handleOpenLayoutOpen}>
                {i18n.t("openLayout")}
            </Button>
        ];
    }
    else{
        newOrOpenLayoutTitle = i18n.t("OpenLayoutTitle");
        newOrOpenLayoutText = i18n.t("OpenLayoutText");
        newOrOpenLayoutFooter =[
            <Button key="back" onClick={ () => handleCancel( operatorConsoleAsParent ) }>
                {i18n.t("cancel")}
            </Button>,
            <Button key="submit2" type="primary" onClick={handleOpenLayoutOpen}>
                {i18n.t("openLayout")}
            </Button>
        ];

    }



    return (
        <>
            <OpenLayoutModal
                operatorConsoleAsParent={operatorConsoleAsParent}
                useStateOpen={openLayoutOpen} useStateSetOpen={ setOpenLayoutOpen} useStateSetNewOrOpenLayoutOpen={ setOpen }
                useStateNoteNamesContent = { noteNamesContent }
            />
            <Modal
                open={newLayoutModalOpen}
                title={i18n.t("newLayout")}
                onOk={   handleNewLayoutOk }
                onCancel={handleNewLayoutCancel}
                footer={[
                    <Button key="back" onClick={handleNewLayoutCancel}>
                        {i18n.t("cancel")}
                    </Button>,

                    <Popconfirm key="popconfirm"
                                title={i18n.t("OverwriteLayout")}
                                description={i18n.t("NewNoteOverwriteConfirm")}
                                open={newLayoutConfirmOpen}
                                onOpenChange={handleNewLayoutConfirmOpenChange}
                                onConfirm={ confirmNewLayout }
                                onCancel={cancelConfirmNewLayout}
                                okText={i18n.t("ok")}
                                cancelText={i18n.t("cancel")}
                    >
                        {/*<Button type="link">Delete a task</Button>*/}
                        {/*<Button key="submit" type="primary" onClick={handleOk}>*/}
                        <Button key="submit" type="primary" onClick={handleNewLayoutOk}>
                            {i18n.t("ok")}
                        </Button>
                    </Popconfirm>

                    //<Button key="submit" type="primary" loading={loading} onClick={handleOk}>
                    // <Button
                    //     key="link"
                    //     href="https://google.com"
                    //     type="primary"
                    //     loading={loading}
                    //     onClick={handleOk}
                    // >
                    //     Search on Google
                    // </Button>,
                ]}
            >
                <NewLayoutForm  newLayoutUseForm={newLayoutUseForm} />
            </Modal>
            <Modal
                open={open}
                title={newOrOpenLayoutTitle}
                onOk={handleOk}
                onCancel={ () => handleCancel( operatorConsoleAsParent ) }
                footer={newOrOpenLayoutFooter}
            >
                {newOrOpenLayoutText}
            </Modal>
        </>
    );
}

function NewLayoutForm( { newLayoutUseForm }){
    return <Form form={newLayoutUseForm} layout="vertical">
        <section>
            <Form.Item name="layoutName" rules={[
                {
                    required: true,
                    message: i18n.t("layoutName_is_required"),
                },
            ]}>
                <Input placeholder={i18n.t("layoutName")} />
            </Form.Item>
        </section>
    </Form>;

}