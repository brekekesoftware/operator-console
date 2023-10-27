import React from "react";
import Form from "antd/lib/form";
import Button from 'antd/lib/button';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import {Button, Form, Input, Space} from 'antd';
import PrintHello from './PrintHello';
import i18n, { DEFAULT_LOCALE, isValidLocale, loadTranslations } from "./i18n";
import FixedSpeedDialSettings from 'FixedSpeedDialSettings'
import ShortDialSettings from "./ShortDialSettings";
import Popconfirm from 'antd/lib/popconfirm';
import SystemSettingsForm from "./SystemSettingsForm";
import getSystemSettingsUseForm from "./SystemSettingsForm";
import Notification from "antd/lib/notification";
import Empty from "antd/lib/empty";
import Spin from "antd/lib/spin";
import BrekekeOperatorConsole from "./index";
//import ShortDialSettings from "./ShortDialSettings";

export const OPERATOR_CONSOLE_SYSTEM_SETTINGS_DATA_ID = 'operatorConsole_systemSettings';
export const OPERATOR_CONSOLE_SYSTEM_SETTINGS_DATA_VERSION = '0.1';

// const SystemSettingsDownloadStates = {
//     None: 0,
//     Downloading: 1,
//     DownloadOk: 2,
//     DownloadNg: 3,
// };


export default class SystemSettingsView extends React.Component {

    constructor( props ){
        super(props);
        this.state = {

        };
        this.operatorConsoleAsParent = this.props.operatorConsole;
        this.setSystemSettingsUseFormBindedFunction = this.setSystemSettingsUseForm.bind(this);
        this.operatorConsoleAsParent.setSystemSettingsView( this );
    }

    // componentDidUpdate(prevProps, prevState, snapshot) {
    // }

    // componentDidMount() {
    //     this.setState({ downloadingSystemSettings: true }
    //     , () => this._syncDown() );
    // }




    saveSystemSettings = () => {
        this._systemSettingsUseForm.validateFields()
           .then(( values ) => {
               //const systemSettingsAppData = Object.assign( {}, values); //!optimize isRequire?

               // screens[this.state.currentScreenIndex] = {
               //     widgets: this.state.editingWidgets,
               //     background: this.state.editingScreenBackground,
               //     width: this.state.editingScreenWidth,
               //     height: this.state.editingScreenHeight,
               //     grid: this.state.editingScreenGrid,
               // }
               console.log('saving systemSettings...', values );
               this.operatorConsoleAsParent.getSystemSettingsData().setData( values );
               this.operatorConsoleAsParent.onSavingSystemSettings(this);
               this._syncUp();

           })
           .catch( (errorInfo) => {
               //alert("errorInfo=" + errorInfo);
               Notification.error( { message: i18n.t("CouldNotSavePleaseCheckYourEntries"),duration:15} );　//!todo show error message.
           } );
    }

    // //old version
    // _syncUp = async () => {
    //     const pal = this.operatorConsoleAsParent.getPal();
    //     //if (!pal) return;
    //     const systemSettingsData = this.operatorConsoleAsParent.getSystemSettingsData();
    //     const systemSettingsDataData = systemSettingsData.getData();
    //     const [err] = await pal.call_pal('setAppData', {
    //         data_id: OPERATOR_CONSOLE_SYSTEM_SETTINGS_DATA_ID,
    //         data: {
    //             version: OPERATOR_CONSOLE_SYSTEM_SETTINGS_DATA_VERSION,
    //             appData: systemSettingsDataData
    //         }
    //     }).then((data) => ([null, data]))
    //         .catch((err) => ([err, null]));
    //
    //     if (err) {
    //         Notification.error({
    //             key: 'sync',
    //             message: i18n.t("failed_to_save_data_to_pbx"),
    //             btn: (
    //                 <Button type="primary" size="small" onClick={() => {
    //                     //Notification.close('sync');
    //                     this._syncUp();
    //                 }}>
    //                     {i18n.t('retry')}
    //                 </Button>
    //             ),
    //             duration: 0,
    //         });
    //         return;
    //     }

    _syncUp = async () => {
        const pal = this.operatorConsoleAsParent.getPal();
        //if (!pal) return;
        const systemSettingsData = this.operatorConsoleAsParent.getSystemSettingsData();
        const systemSettingsDataData = systemSettingsData.getData();

        const  layoutsAndSettingsData =  {
            version:  BrekekeOperatorConsole.getAppDataVersion(),
            screens:  this.operatorConsoleAsParent.state.screens,
            systemSettings: systemSettingsDataData
        };

        const shortname = this.operatorConsoleAsParent.getLastLayoutShortname();
        const noteContent = JSON.stringify( layoutsAndSettingsData );
        let error;
        await this.operatorConsoleAsParent.setOCNoteByPal( shortname, noteContent ).
        then( () => {
            //this.operatorConsoleAsParent.setLastSystemSettingsDataData( systemSettingsDataData );
            const sErr = this.operatorConsoleAsParent.setOCNote( shortname, layoutsAndSettingsData, false );
            if( sErr ){
                console.error("Failed to setOCNote.", sErr );
                throw new Error(sErr);
            }
        }).catch( (err) => {
            console.error(err);
            error =err;
        });

        if (error) {
            Notification.error({
                key: 'sync',
                message: i18n.t("failed_to_save_data_to_pbx"),
                btn: (
                    <Button type="primary" size="small" onClick={() => {
                        //Notification.close('sync');
                        this._syncUp();
                    }}>
                        {i18n.t('retry')}
                    </Button>
                ),
                duration: 0,
            });
            return;
        }


        Notification.success({ key: 'sync', message: i18n.t("saved_data_to_pbx_successfully") });
        this.operatorConsoleAsParent.abortSystemSettings();
    }

    setSystemSettingsUseForm = ( systemSettingsUseForm ) => {
        this._systemSettingsUseForm = systemSettingsUseForm;
    }

    render(){
            return  <div style={{flexGrow: 1, display: 'flex', flexDirection: 'column', paddingLeft:20}} >
                    <div style={{display: 'flex', padding: 4, borderBottom: 'solid 1px #e0e0e0'}}>
                        <Space>
                        </Space>
                        <div style={{marginLeft: 'auto'}}>
                            <Space>
                                <Popconfirm title={i18n.t("are_you_sure")} onConfirm={this.operatorConsoleAsParent.abortSystemSettings}
                                            okText={i18n.t("yes")}
                                            cancelText={i18n.t("no")}
                                >
                                    <Button type="secondary">{i18n.t("discard")}</Button>
                                </Popconfirm>
                                <Space/>
                                <Button type="success" htmlType="cancel" onClick={this.saveSystemSettings}>
                                    {i18n.t("save")}
                                </Button>
                            </Space>
                        </div>
                    </div>
                    <div style={{display: 'flex', flexGrow: 1}}>
                        <div style={{position: 'relative', flexGrow: 1, overflow: 'hidden'}}>
                            <SystemSettingsForm setSystemSettingsUseFormBindedFunction={this.setSystemSettingsUseFormBindedFunction} systemSettingsData={ this.operatorConsoleAsParent.getSystemSettingsData() } />
                        </div>
                    </div>
                </div>
    }

}