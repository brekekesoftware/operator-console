import React, {useEffect, useRef, useState} from 'react'
import {Button, Modal, Radio} from "antd";
import Popconfirm from "antd/lib/popconfirm";
import Notification from "antd/lib/notification";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash} from "@fortawesome/free-solid-svg-icons";
import Spin from "antd/lib/spin";
import i18n from "./i18n";
import BrekekeOperatorConsole from "./index";
import OCUtil from "./OCUtil";
import RuntimeHiddenUccacUcClient from "./runtime/RuntimeHiddenUccacUcClient";
import LegacyUccacRuntimeWidget from "./runtime/widget/runtime/LegacyUccacRuntimeWidget";

function fetchLayouts( operatorConsole, setLayouts, setIsLoading, setSelectedShortname ) {
    setIsLoading( true );
    const getNoteNamesOptions = {
        methodName: "getNoteNames",
        methodParams: {
            tenant: operatorConsole.getLoggedinTenant(),
            filter: BrekekeOperatorConsole.LAYOUT_NOTE_NAME_FILTER,
            limit: -1,
            offset: 0
        },
        onSuccessFunction: ( allNoteNames ) => {
            const lastLayoutShortname = operatorConsole.getLastLayoutShortname();
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
                    layouts.push( {shortname, isCurrent: shortname === lastLayoutShortname} );
                }
            }
            setLayouts( layouts );
            setSelectedShortname( ( prevSelectedShortname ) => {
                if( prevSelectedShortname && layouts.some( ( layout ) => layout.shortname === prevSelectedShortname ) ){
                    return prevSelectedShortname;
                }
                return lastLayoutShortname;
            } );
            setIsLoading( false );
        },
        onFailFunction: ( errOrResponse ) => {
            setLayouts( [] );
            setIsLoading( false );
            OCUtil.logErrorWithNotification( "Failed to get note names.", i18n.t( "Failed_to_get_note_names" ), errOrResponse );
        }
    };
    operatorConsole.getPalRestApi().callPalRestApiMethod( getNoteNamesOptions );
}

function loadSelectedLayout( operatorConsole, shortname, setIsApplying, close ) {
    const noteName = BrekekeOperatorConsole.getOCNoteName( shortname );
    const getNoteOptions = {
        methodName: "getNote",
        methodParams: {
            tenant: operatorConsole.getLoggedinTenant(),
            name: noteName
        },
        onSuccessFunction: ( res ) => {
            if( !res ){
                setIsApplying( false );
                Notification.warning( {message: i18n.t( 'The_note_does_not_exist' )} );
                return;
            }
            const sNote = res.note;
            let oNote;
            try {
                oNote = JSON.parse( sNote );
            } catch( err ) {
                console.error( err );
                setIsApplying( false );
                Notification.error( {message: i18n.t( 'Failed_to_get_note' ) + "\r\n" + err, duration: 0} );
                return;
            }
            operatorConsole.setOCNote( shortname, oNote, () => {
                    setIsApplying( false );
                    BrekekeOperatorConsole.getStaticInstance().abortAutoDialView_ver2();
                    const ct = LegacyUccacRuntimeWidget.getLegacyUccacRuntimeWidgetCount();
                    for( let i = 0; i < ct; i++ ){
                        const legacyUccacRuntimeWidget = LegacyUccacRuntimeWidget.getLegacyUccacRuntimeWidgetAt( i );
                        legacyUccacRuntimeWidget.onSetOCNoteByOpenLayoutModalForDropDownMenu( this );
                    }
                    RuntimeHiddenUccacUcClient.getRuntimeHiddenUccacUcClientStaticInstance().onSetOCNoteByOpenLayoutModalForDropDownMenu( this );
                    close();
                },
                ( e ) => {
                    setIsApplying( false );
                    if( Array.isArray( e ) ){
                        for( let i = 0; i < e.length; i++ ){
                            console.error( "setOCNote failed. errors[" + i + "]=", e[i] );
                        }
                    }
                    else{
                        console.error( "setOCNote failed. error=", e );
                    }
                    try {
                        const sError = JSON.stringify( e );
                        Notification.error( {message: i18n.t( 'failed_to_save_data_to_pbx' ) + "\r\n" + sError, duration: 0} );
                    } catch( err ) {
                        Notification.error( {message: i18n.t( 'failed_to_save_data_to_pbx' ) + "\r\n" + e, duration: 0} );
                    }
                } );
        },
        onFailFunction: ( errorOrResponse ) => {
            OCUtil.logErrorWithNotification( "Failed to get note.", i18n.t( "Failed_to_get_note" ), errorOrResponse );
            setIsApplying( false );
        }
    };
    operatorConsole.getPalRestApi().callPalRestApiMethod( getNoteOptions );
}

function deleteLayout( operatorConsole, shortname, onDone ) {
    const noteName = BrekekeOperatorConsole.getOCNoteName( shortname );
    const options = {};
    const tenant = operatorConsole.getLoggedinTenant();
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
    operatorConsole.getPalRestApi().callPalRestApiMethod( deleteNoteOptions );
}

export default function SelectLayoutModalForDropDownMenu( {operatorConsole, useStateOpen, useStateSetOpen} ) {
    const open = useStateOpen;
    const setOpen = useStateSetOpen;
    const isAdmin = operatorConsole.getIsAdmin() === true;
    const newLayoutModalOpen = operatorConsole.getState().newLayoutModalOpen;

    const [layouts, setLayouts] = useState( [] );
    const [isLoading, setIsLoading] = useState( false );
    const [selectedShortname, setSelectedShortname] = useState( null );
    const [isApplying, setIsApplying] = useState( false );
    const prevNewLayoutModalOpenRef = useRef( newLayoutModalOpen );

    useEffect( () => {
        if( open ){
            fetchLayouts( operatorConsole, setLayouts, setIsLoading, setSelectedShortname );
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open] );

    useEffect( () => {
        if( open && prevNewLayoutModalOpenRef.current === true && newLayoutModalOpen === false ){
            fetchLayouts( operatorConsole, setLayouts, setIsLoading, setSelectedShortname );
        }
        prevNewLayoutModalOpenRef.current = newLayoutModalOpen;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [newLayoutModalOpen] );

    const close = () => {
        operatorConsole.subtractDisableKeydownToDialingCounter();
        operatorConsole.subtractDisablePasteToDialingCounter();
        setOpen( false );
    };

    const handleConfirm = () => {
        if( !selectedShortname ){
            return;
        }
        setIsApplying( true );
        loadSelectedLayout( operatorConsole, selectedShortname, setIsApplying, close );
    };

    const handleNewLayout = () => {
        operatorConsole.setState( {newLayoutModalOpen: true} );
    };

    const handleDelete = ( shortname ) => {
        deleteLayout( operatorConsole, shortname, () => {
            fetchLayouts( operatorConsole, setLayouts, setIsLoading, setSelectedShortname );
        } );
    };

    const footer = (
        <div className="brOCSelectLayoutFooter">
            {isAdmin ? (
                <Button key="new" className="brOCSelectLayoutNewButton" onClick={handleNewLayout}>
                    {i18n.t( "newLayout" )}
                </Button>
            ) : null}
            <Button key="confirm" className="brOCSelectLayoutConfirmButton" disabled={!selectedShortname || isApplying}
                    onClick={handleConfirm}>
                {i18n.t( "confirm" )}
            </Button>
        </div>
    );

    let mainJsx;
    if( isLoading ){
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
                            <span style={layout.isCurrent ? {fontWeight: "bold"} : null}>{layout.shortname}</span>
                        </Radio>
                        {isAdmin && !layout.isCurrent ? (
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
        <Modal
            open={open}
            title={i18n.t( "selectLayout" )}
            onCancel={close}
            footer={footer}
            maskClosable={false}
        >
            <div className="brOCReset">
                {mainJsx}
            </div>
        </Modal>
    );
}
