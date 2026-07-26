import React from "react";
import {Button, Space} from 'antd';
import i18n from "./i18n";
import Popconfirm from 'antd/lib/popconfirm';
import UserSettingsForm from "./UserSettingsForm";
import Notification from "antd/lib/notification";
import RingtoneAudioPlayers from "./RingtoneAudioPlayers";
import BrekekeOperatorConsole from "./index";
import UserRingtonePlayerForTest from "./UserRingtonePlayerForTest";
import WebphonePhoneClient from "./WebphonePhoneClient";
import OCUtil from "./OCUtil";

let _INSTANCE;
export default class UserSettingsView extends React.Component {

    constructor( props ){
        super(props);
		_INSTANCE = this;
        this.state = {

        };
        this._OperatorConsoleAsParent = this.props.operatorConsole;
		this._ringtoneSettings2 = null;
        this._RingtoneAudioPlayers = new RingtoneAudioPlayers(this);
        this._RingtoneAudioPlayersForUploaded = new RingtoneAudioPlayers(this);
        this.setUserSettingsUseFormBindedFunction = this.setUserSettingsUseForm.bind(this);
    	const username = this._OperatorConsoleAsParent.getLoggedinUsername();
		this._UserSettingsLocalStorageKeyString = "brekeke:operator-console:user-settings:" + username;
    }
	
	setUserSettingsUseForm = ( userSettingsUseForm ) => {
        this._userSettingsUseForm = userSettingsUseForm;
    }
	
	static getStaticInstance(){
		return _INSTANCE;
	}

	
    saveUserSettings = async () => {
        this._userSettingsUseForm.validateFields()
           .then( async ( values ) => {
			   const oc = BrekekeOperatorConsole.getStaticInstance();
               const hasCall = oc.getPhoneClient().getCallInfos().getCallInfoCount() !== 0;
               if( hasCall ) {
				   const userSettingsData = oc.getUserSettingsData();
                   const ptData = userSettingsData.getPhoneTerminal();
                   const ptValue = values["phoneTerminal"]
                   if (ptData !== ptValue) {
                       Notification.error({message: i18n.t('cannotChangeThePhoneTerminal') } );
                       return;
                   }
               }
			   
               console.log('saving userSettings...', values );

               this.setState( {isUserSettingsSaving:true}, async ()=> {
							const userSettingsData = oc.getUserSettingsData();

							const currentCamera = values["webphone_camera"];
							const currentMic = values["webphone_microphone"];
							const currentSpeaker = values["webphone_speaker"];
							
							//delete values["webphone_camera"];
							//delete values["webphone_microphone"];
							//delete values["webphone_speaker"];

							const successFunction = async () => {
								try{


									this._onSaved();
								}finally{
									this.setState( {isUserSettingsSaving:false} );
								}

							};
							const failFunction = (error) =>{
								this.setState( {isUserSettingsSaving:false}, () =>{
									OCUtil.logErrorWithNotification("Failed to save user settings", i18n.t("Failed_to_save_user_settings"), error);
								});
							}
							await userSettingsData.saveUserSettingsData( values, successFunction, failFunction );
                   }
                );
           })
           .catch( (errorInfo) => {
               console.error( i18n.t("CouldNotSavePleaseCheckYourEntries") + " error=" ,  errorInfo);
               Notification.error( { message: i18n.t("CouldNotSavePleaseCheckYourEntries"),duration:15} );　//!todo show error message.
           } );
    }

	_onSaved(){	
		Notification.success({ key: 'sync', message: i18n.t("Saved_data_successfully") });
		this._abortUserSettings();
	}

    _abortUserSettings(){
        this._RingtoneAudioPlayers.clearRingtoneAudioPlayers();
        this._RingtoneAudioPlayersForUploaded.clearRingtoneAudioPlayers();
        this._OperatorConsoleAsParent.abortUserSettings();
    }

	setUserSettingsRingtoneSettings2( ringtoneSettings2 ){
		this._ringtoneSettings2 = ringtoneSettings2;
	}
	
	getUserSettingsRingtoneSettings2(){
		return this._ringtoneSettings2;
	}

    render(){
		const oc = BrekekeOperatorConsole.getStaticInstance();
		
        const userSettingsObject = oc.getUserSettingsData().getData();
		//if( !userSettingsObject["phoneTerminal"] ){
			//userSettingsObject["phoneTerminal"] = "phoneTerminal_layout";	//!default
		//}
		
        const isButtonsDisabled = this.state.isUserSettingsSaving === true;
        const hasCall = oc.getPhoneClient().getCallInfos().getCallInfoCount() !== 0;
            return  <>
                    <div style={{display: 'flex', justifyContent:"flex-end",padding: 4, borderBottom: 'solid 1px #e0e0e0'}}>
                        <div>
                            <Space>
                                <Popconfirm title={i18n.t("are_you_sure")} onConfirm={ () => this._abortUserSettings() }
                                            okText={i18n.t("yes")}
                                            cancelText={i18n.t("no")}
                                >
                                    <Button type="secondary" disabled={isButtonsDisabled}>{i18n.t("discard")}</Button>
                                </Popconfirm>
                                <Space/>
                                <Button type="success" htmlType="cancel" onClick={ () => this.saveUserSettings() } disabled={isButtonsDisabled}>
                                    {i18n.t("save")}
                                </Button>
                            </Space>
                        </div>
                    </div>
					<div style={{position:"absolute",left:20,top:40,paddingRight:20,paddingBottom:20,width:"calc(100% - 40px)",height:"calc(100% - 60px)",overflow:"scroll"}}>
                        <div>
                            <UserSettingsForm
								hasCall={ hasCall }
                                userSettingsObject={ userSettingsObject }
                                ringtoneAudioPlayers={ this._RingtoneAudioPlayers  }
                                ringtoneAudioPlayersForUploaded={ this._RingtoneAudioPlayersForUploaded  }
                                setUserSettingsUseFormBindedFunction={this.setUserSettingsUseFormBindedFunction}
								ringtoneSettings2Setter={ (ringtoneSettings2) => this.setUserSettingsRingtoneSettings2( ringtoneSettings2 ) }
                           />
                        </div>
						{/*<div>*/}
						{/*	<UserRingtonePlayerForTest userSettingsViewAsParent={this} />*/}
						{/*</div>*/}
                    </div>
                </>
    }

}