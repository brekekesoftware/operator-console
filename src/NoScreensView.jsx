import React, {useEffect, useRef, useState} from 'react'
import {Button, Form, Input, Modal, Radio} from "antd";
import Popconfirm from "antd/lib/popconfirm";
import Notification from "antd/lib/notification";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash} from "@fortawesome/free-solid-svg-icons";
import i18n from "./i18n";
import Spin from "antd/lib/spin";
import BrekekeOperatorConsole from "./index";
import ScreenData from "./data/ScreenData";
import OCUtil from "./OCUtil";

const REGEX =  /^[0-9a-zA-Z\-\_\ ]*$/;

function fetchLayouts( operatorConsoleAsParent, setLayouts, setIsLoadingNames ) {
    setIsLoadingNames( true );
    const getNoteNamesOptions = {
        methodName: "getNoteNames",
        methodParams: {
            tenant: operatorConsoleAsParent.getLoggedinTenant(),
            filter: BrekekeOperatorConsole.LAYOUT_NOTE_NAME_FILTER,
            limit: -1,
            offset: 0
        },
        onSuccessFunction: ( allNoteNames ) => {
            const layouts = [];
            if( allNoteNames && allNoteNames.length !== 0 ){
                for( let i = 0; i < allNoteNames.length; i++ ){
                    const noteName = allNoteNames[i];
                    if( BrekekeOperatorConsole.isOCNoteName( noteName ) !== true ){
                        continue;
                    }
                    const shortname = BrekekeOperatorConsole.getOCNoteShortname( noteName );
                    if( shortname.length === 0 ){
                        continue;
                    }
                    layouts.push( {shortname} );
                }
            }
            setLayouts( layouts );
            setIsLoadingNames( false );
        },
        onFailFunction: ( errOrResponse ) => {
            setLayouts( [] );
            setIsLoadingNames( false );
            OCUtil.logErrorWithNotification( "Failed to get note names.", i18n.t( "Failed_to_get_note_names" ), errOrResponse );
        }
    };
    operatorConsoleAsParent.getPalRestApi().callPalRestApiMethod( getNoteNamesOptions );
}

function deleteLayout( operatorConsoleAsParent, shortname, onDone ) {
    const noteName = BrekekeOperatorConsole.getOCNoteName( shortname );
    const options = {};
    const tenant = operatorConsoleAsParent.getLoggedinTenant();
    if( tenant ){
        options["tenant"] = tenant;
    }
    options["name"] = noteName;
    const deleteNoteOptions = {
        methodName: "deleteNote",
        methodParams: options,
        onSuccessFunction: () => {
            Notification.success( {message: i18n.t( "Layouts_have_been_deleted" )} );
            onDone();
        },
        onFailFunction: ( errOrResponse ) => {
            OCUtil.logErrorWithNotification( "Failed to delete layouts.", i18n.t( "Failed_to_delete_layouts" ), errOrResponse );
            onDone();
        }
    };
    operatorConsoleAsParent.getPalRestApi().callPalRestApiMethod( deleteNoteOptions );
}

export default function NoScreensView( props ){
    const operatorConsoleAsParent = props.operatorConsoleAsParent;
    const isAdmin = operatorConsoleAsParent.getLoggedinUserIsAdmin();
    const newLayoutModalOpen = operatorConsoleAsParent.getState().newLayoutModalOpen;

    const [layouts, setLayouts] = useState( [] );
    const [isLoadingNames, setIsLoadingNames] = useState( false );
    const [selectedShortname, setSelectedShortname] = useState( null );
    const prevNewLayoutModalOpenRef = useRef( newLayoutModalOpen );

    useEffect( () => {
        fetchLayouts( operatorConsoleAsParent, setLayouts, setIsLoadingNames );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [] );

    useEffect( () => {
        if( prevNewLayoutModalOpenRef.current === true && newLayoutModalOpen === false ){
            fetchLayouts( operatorConsoleAsParent, setLayouts, setIsLoadingNames );
        }
        prevNewLayoutModalOpenRef.current = newLayoutModalOpen;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [newLayoutModalOpen] );

    const handleCancel = ( operatorConsoleAsParent ) => {
        operatorConsoleAsParent.logout();
    };

    const [ newLayoutUseForm ] = Form.useForm();
    const [newLayoutConfirmOpen, setNewLayoutConfirmOpen] = useState(false);
    const [newLayoutName, setNewLayoutName ] = useState( "" );

    const handleNewLayoutOk = () => {
        newLayoutUseForm.validateFields().then(( values ) => {
            let layoutName = values.layoutName;
            setNewLayoutName(layoutName);
            layoutName = layoutName.trim();
            if (layoutName.length === 0) {
                Notification.error({key: "validation", message: i18n.t('OnlySpacesAreNotAllowed'), duration: 15});
                return;
            }

            const bMatch = REGEX.test(layoutName);
            if (!bMatch) {
                Notification.error({key: "validation", message: i18n.t('newLayoutValidationError'), duration: 15});
                return;
            }

            //exists already?
            const getNoteNamesOptions ={
              methodName : "getNoteNames",
              methodParams : {tenant:operatorConsoleAsParent.getLoggedinTenant()},
                onSuccessFunction: ( res ) =>{
                    const layoutNoteName = BrekekeOperatorConsole.getOCNoteName(layoutName);
                    const noteNames = res;
                    let bNoteExists = true;
                    if (!noteNames || noteNames.length === 0) {
                        bNoteExists = false;
                    } else {
                        const sFind = noteNames.find((itm) => itm === layoutNoteName);
                        if (!sFind) {
                            bNoteExists = false;
                        }
                    }

                    if (bNoteExists) {

                        setNewLayoutConfirmOpen(true);

                    } else {
                        const systemSettingsData = BrekekeOperatorConsole.getStaticInstance().getDefaultSystemSettingsData();
                        const systemSettingsDataData = systemSettingsData.getData();
                        const oScreen_ver2 = new ScreenData().getDataAsObject();

                        const layoutsAndSettingsData = {
                            version: BrekekeOperatorConsole.getAppDataVersion(),
                            screens: BrekekeOperatorConsole.getEmptyScreens(),
                            systemSettings: systemSettingsDataData,
                            screen_ver2:oScreen_ver2
                        };

                        const noteContent = JSON.stringify(layoutsAndSettingsData);
                        //const layoutNoteName = BrekekeOperatorConsole.getOCNoteName(layoutName);

                        const setNoteOptions = {
                            methodName : "setNote",
                            methodParams : {
                                tenant: operatorConsoleAsParent.getLoggedinTenant(),
                                name: layoutNoteName,
                                description: "",
                                useraccess: BrekekeOperatorConsole.PAL_NOTE_USERACCESSES.ReadOnly,
                                note: noteContent
                            },
                            onSuccessFunction : ( res ) =>{
                                operatorConsoleAsParent.setOCNote(layoutName, layoutsAndSettingsData, function () {
                                        operatorConsoleAsParent.onSavedNewLayoutFromNoScreensView( layoutName, layoutsAndSettingsData);
                                        Notification.success({message: i18n.t("saved_data_to_pbx_successfully")});
                                    },
                                    function (eventArg) {
                                        //!testit
                                        const message = eventArg.message;
                                        OCUtil.logErrorWithNotification("Failed to save data to PBX.", i18n.t("failed_to_save_data_to_pbx"), message );
                                    }
                                );
                            },
                            onFailFunction : ( errOrResponse ) =>{
                                //!testit
                                OCUtil.logErrorWithNotification("Failed to save data to PBX.", i18n.t("failed_to_save_data_to_pbx"), errOrResponse );
                            }
                        }
                        operatorConsoleAsParent.getPalRestApi().callPalRestApiMethod( setNoteOptions );
                    }
                },
                onFailFunction : ( errorOrResponse ) =>{
                    //console.error("Failed to getNoteNames from PAL REST API.", errorOrResponse);

                    let msg;
                    try {
                        const s = JSON.stringify(errorOrResponse);
                        msg = i18n.t("failed_to_load_data_from_pbx") + "\r\n" + s;
                    }
                    catch(err){
                        msg = i18n.t("failed_to_load_data_from_pbx") + "\r\n" + errorOrResponse;
                    }
                    Notification.error({message: msg, duration: 0});
                }
            };
            operatorConsoleAsParent.getPalRestApi().callPalRestApiMethod( getNoteNamesOptions );
        });
    };
    const handleNewLayoutCancel = () => {
        cancelConfirmNewLayout();
        operatorConsoleAsParent.setState({newLayoutModalOpen:false} );
    };

    const confirmNewLayout = (  ) => {
        const layoutName = newLayoutName;

        const systemSettingsData = BrekekeOperatorConsole.getStaticInstance().getDefaultSystemSettingsData();
        const systemSettingsDataData = systemSettingsData.getData();
        const oScreen_ver2 = new ScreenData().getDataAsObject();

        const  layoutsAndSettingsData =  {
            version:  BrekekeOperatorConsole.getAppDataVersion(),
            screens:  BrekekeOperatorConsole.getEmptyScreens(),
            systemSettings: systemSettingsDataData,
            screen_ver2:oScreen_ver2
        };

        const noteContent = JSON.stringify( layoutsAndSettingsData );
        const noteName = BrekekeOperatorConsole.getOCNoteName( layoutName );

        const setNoteOptions ={
            methodName : "setNote",
            methodParams : {
                tenant: operatorConsoleAsParent.getLoggedinTenant(),
                name: noteName,
                description: "",
                useraccess: BrekekeOperatorConsole.PAL_NOTE_USERACCESSES.ReadOnly,
                note: noteContent
            },
            onSuccessFunction : ( res ) =>{
                operatorConsoleAsParent.setOCNote( layoutName, layoutsAndSettingsData, function(){
                        operatorConsoleAsParent.onSavedNewLayoutFromNoScreensView(  layoutName, layoutsAndSettingsData );
                        Notification.success( { message: i18n.t("saved_data_to_pbx_successfully") } );
                        setNewLayoutConfirmOpen(false);
                    },
                    function( e ){
                        //!testit
                        if( Array.isArray(e)){
                            for( let i = 0; i < e.length; i++ ){
                                const err = e[i];
                                console.error("setSystemSettingsDataData failed. errors[" + i + "]=" , err );
                            }
                        }
                        else{
                            console.error("setSystemSettingsDataData failed. error=" , e );
                        }
                        Notification.error({message: i18n.t('failed_to_save_data_to_pbx') + "\r\n" +  e, duration:0 });
                        setNewLayoutConfirmOpen(false);
                    });
            },
            onFailFunction : ( errOrResponse ) =>{
                OCUtil.logErrorWithNotification("Failed to setNote.", i18n.t("failed_to_save_data_to_pbx"), errOrResponse );
            }};
            operatorConsoleAsParent.getPalRestApi().callPalRestApiMethod( setNoteOptions  );

    };
    const cancelConfirmNewLayout = () => {
        setNewLayoutConfirmOpen(false);
    };
    const handleNewLayoutConfirmOpenChange = (newOpen) => {
        if (!newLayoutConfirmOpen) {
            return;
        }
        setNewLayoutConfirmOpen(newOpen);
    };

    const [isLoading, setIsLoading] = useState(false);

    const selectOCNoteByShortname = ( shortname ) =>{
        const noteName = BrekekeOperatorConsole.getOCNoteName( shortname );

        const getNoteByPalRestApiOptions = {
            methodName : "getNote",
            methodParams : {
                tenant : operatorConsoleAsParent.getLoggedinTenant(),
                name : noteName
             },
            onSuccessFunction : ( res ) =>{
                if( res ) {
                    const noteInfo = res;
                    const sNote = noteInfo.note;
                    let oNote;
                    try {
                        oNote = JSON.parse(sNote);
                    } catch (err) {
                        setIsLoading(false)
                        OCUtil.logErrorWithNotification(null, i18n.t('failed_to_load_data_from_pbx'), err);
                        return;
                    }
                    operatorConsoleAsParent.setOCNote(shortname, oNote, function () {
                            setIsLoading(false);
                            operatorConsoleAsParent.onSelectOCNoteByShortnameFromNoScreensView(this);
                        },
                        function (e) {
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
                            Notification.error({
                                message: i18n.t('failed_to_save_data_to_pbx') + "\r\n" + e,
                                duration: 0
                            });
                        }
                    );
                }
                else{
                    setIsLoading(false);
                    Notification.warning({message:i18n.t("The_note_does_not_exist") });
                    fetchLayouts( operatorConsoleAsParent, setLayouts, setIsLoadingNames );
                }
            },
            onFailFunction : ( errorOrResponse ) =>{
                //!testit
                setIsLoading(false);
                console.error("Failed to getNote.", errorOrResponse  );
                let err;
                try {
                    err = JSON.stringify(errorOrResponse);
                }
                catch(e){
                    err = e;
                }
                Notification.error({message:i18n.t("Failed_to_get_note") + "\r\n" + err, duration:0 });
            }
        }
        operatorConsoleAsParent.getPalRestApi().callPalRestApiMethod( getNoteByPalRestApiOptions );

        setIsLoading(true);
    };

    const handleConfirm = () => {
        if( !selectedShortname ){
            return;
        }
        selectOCNoteByShortname( selectedShortname );
    };

    const handleDelete = ( shortname ) => {
        deleteLayout( operatorConsoleAsParent, shortname, () => {
            fetchLayouts( operatorConsoleAsParent, setLayouts, setIsLoadingNames );
        } );
    };

    const displayLoadingStyle =  isLoading ? "block" : "none";
    const spinScreen = useRef(null);
    if( spinScreen.current ) {
        spinScreen.current.style.display = displayLoadingStyle;
    }

    const footer = [
        isAdmin ? (
            <Button key="new" className="brOCSelectLayoutNewButton" onClick={ () => operatorConsoleAsParent.setState({newLayoutModalOpen:true}) }>
                {i18n.t( "newLayout" )}
            </Button>
        ) : null,
        <Button key="confirm" className="brOCSelectLayoutConfirmButton" disabled={!selectedShortname || isLoading}
                onClick={handleConfirm}>
            {i18n.t( "confirm" )}
        </Button>
    ];

    let mainJsx;
    if( isLoadingNames ){
        mainJsx = <Spin/>;
    }
    else if( layouts.length === 0 ){
        mainJsx = i18n.t( "Layout_does_not_exist" );
    }
    else {
        mainJsx = (
            <Radio.Group className="brOCSelectLayoutRadioGroup" value={selectedShortname}
                         onChange={( e ) => setSelectedShortname( e.target.value )}>
                {layouts.map( ( layout ) => (
                    <div key={layout.shortname} className="brOCSelectLayoutRow">
                        <Radio value={layout.shortname}>
                            <span>{layout.shortname}</span>
                        </Radio>
                        {isAdmin ? (
                            <Popconfirm title={i18n.t( "are_you_sure" )} onConfirm={() => handleDelete( layout.shortname )}
                                        okText={i18n.t( "yes" )} cancelText={i18n.t( "no" )}>
                                <a className="icon_general brOCSelectLayoutDeleteIcon">
                                    <FontAwesomeIcon icon={faTrash}/>
                                </a>
                            </Popconfirm>
                        ) : null}
                    </div>
                ) )}
            </Radio.Group>
        );
    }

    return (
        <>
            <Modal
                open={true}
                title={i18n.t( "selectLayout" )}
                onCancel={ () => handleCancel( operatorConsoleAsParent ) }
                footer={footer}
                maskClosable={false}
            >
                <div className="brOCReset">
                    {mainJsx}
                </div>
            </Modal>
            <Modal
                open={ newLayoutModalOpen }
                title={i18n.t("newLayout")}
                onOk={   handleNewLayoutOk }
                onCancel={handleNewLayoutCancel}
                maskClosable={false}
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
                        <Button key="submit" type="primary" onClick={handleNewLayoutOk} className="brOCMarginLeftButtonToButton">
                            {i18n.t("ok")}
                        </Button>
                    </Popconfirm>
                ]}
            >
                <NewLayoutForm  newLayoutUseForm={newLayoutUseForm} />
            </Modal>
            <div ref={spinScreen} className="spinScreen">
                <div>
                    <Spin/>
                </div>
            </div>
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
