import Notification from "antd/lib/notification";
import BrekekeOperatorConsole from "./index";

export const USER_SETTINGS_DATA_CALL_SELECTION = {
  Voice: 0,
  Video: 1,
  Choice: 2
};

export default class UserSettingsData{
    constructor( operatorConsoleAsParent ) {
        this._Parent = operatorConsoleAsParent;
        this.clear();
    }

    clear(){
        this._data = {};
    }

	getRingtoneInfos2Array(){
		return this._data["ringtoneInfos2"];
	}
	
	getPhoneIndex(){
		return this._data["phoneIndex"];
	}
	
	getWebphoneCamera(){
		return this._data["webphone_camera"];
	}

	getWebphoneMicrophone(){
		return this._data["webphone_microphone"];
	}
	
	getWebphoneSpeaker(){
		return this._data["webphone_speaker"];
	}
	
	getCallSelection(){
		return this._data["callSelection"];
	}
	
	setPhoneIndex( n ){
		this._data["phoneIndex"] = n;
	}
	
	getPhoneTerminal(){
		return this._data["phoneTerminal"];
	}
	
	getShortDials(){
        return this._data["shortDials"];
    }
	
	getDtmfSendMode(){
		return this._data["dtmfSendMode"];
	}

    _getLocalstorageKey(){
        const localstorageKeySuffix= this._Parent.getLoggedinPbxHost() + "\t" + this._Parent.getLoggedinPbxPort() + "\t" + this._Parent.getLoggedinTenant() + "\t" + this._Parent.getLoggedinUsername();
        const userSettingsLocalStorageKeyString = "Brekeke\tOperatorConsole\tUserSettingsData\t" + localstorageKeySuffix;
        return userSettingsLocalStorageKeyString;
    }
	
	updateSave(){
		const sValues = JSON.stringify(this._data);
		const localstorageKey = this._getLocalstorageKey();
	   try{
			window.localStorage.setItem( localstorageKey, sValues );
	   }
	   catch( ex ){
		   //!testit
			if (ex.name === "QuotaExceededError" || ex.name === "NS_ERROR_DOM_QUOTA_REACHED") {
				console.error( "The storage is full and cannot save. Please delete some settings. error=" ,  ex );
				Notification.error( { message: i18n.t("The_storage_is_full_and_cannot_save_Please_delete_some_settings")} );　//!todo show error message.
			}
			else{
				throw ex;
			}
		}		
	}
	
	async saveUserSettingsData( dataObject, initSuccessFunction, initFailFunction, bRemoveNotExistUploadFileReferences = true ){
		
		const successFunction = () =>{

			if( bRemoveNotExistUploadFileReferences ){
				//Remove records that specify an upload file that does not exist.
				const ringtoneInfos2 = dataObject["ringtoneInfos2"];
				if( Array.isArray( ringtoneInfos2 ) ){
					const userSettingsRingtoneFiles = BrekekeOperatorConsole.getStaticInstance().getUserSettingsRingtoneFiles();
					let arFileData = userSettingsRingtoneFiles.getRingtoneFileDataArray();
					if( !Array.isArray( arFileData ) ){
						arFileData = new Array();
					}
					
					for( let i = 0; i < ringtoneInfos2.length; i++ ){
						const ringtoneInfo = ringtoneInfos2[i];
						if( ringtoneInfo["ringtoneResourceType"] !== "uploadedFile" ){
							continue;
						}
						
						const uploadedFileId = ringtoneInfo["uploadedFileId"];
						const bExist = arFileData.some( (fileData) =>{
							const b = fileData["id"] === uploadedFileId;
							return b;
						});
						if( !bExist ){
							ringtoneInfos2.splice( i, 1 );
							i--;
						}
					}
				}
			}

			this._data = structuredClone( dataObject );
			const dtmfSendMode = this._data["dtmfSendMode"];
			if( !Number.isInteger( dtmfSendMode ) ){
				this._data["dtmfSendMode"] = dtmfSendMode ? parseInt( dtmfSendMode ) : -100000000;	//-100000000 = Use layout setting
			}
			this.updateSave();
			
			initSuccessFunction();
		};
		const failFunction = (error) =>{
			initFailFunction( error );
		};
		
		
		const oc = BrekekeOperatorConsole.getStaticInstance();
		await oc.onBeginSaveUserSettingsDataForOperatorConsole( this, dataObject, successFunction, failFunction );
	}

    load(){
        const userSettingsLocalStorageKeyString = this._getLocalstorageKey();
        const sUserSettingsObjectJson = window.localStorage.getItem( userSettingsLocalStorageKeyString );
        let userSettingsObject;
        if( sUserSettingsObjectJson ){
            this._data = JSON.parse(sUserSettingsObjectJson);
        }
        else{
            this._data = {};
        }
    }

    //setData( data ){
        //this._data = structuredClone( data  );
    //}
	
	getData(){
		const data = this._data;
		return data;
	}
	
	async removeAndSaveNotExistRingtoneFilesReferences( userSettingsRingtoneFiles ){
		const infosArray = this.getRingtoneInfos2Array();
		if( !Array.isArray( infosArray ) ){
			return false;
		}

		let arFileData = userSettingsRingtoneFiles.getRingtoneFileDataArray();
		if( !Array.isArray( arFileData ) ){
			arFileData = new Array();
		}

		const removeInfoIndexes = new Array();
		for( let i = 0; i < infosArray.length; i++ ){
			const info = infosArray[i];
			const sType = info["ringtoneResourceType"];
			if( sType !== "uploadedFile" ){
				continue;
			}

			const bExist = arFileData.some( (fileData) => {
				const fileDataId = fileData["id"];
				const infoFileId = info["uploadedFileId"];
				const b = fileDataId === infoFileId;
				return b;
			});
			if( !bExist ){
				removeInfoIndexes.push( i );
			}
		}
		const bSave = removeInfoIndexes.length !== 0;
		if( bSave ){
			for( let i = removeInfoIndexes.length - 1; i >= 0; i-- ){
				const removeIndex = removeInfoIndexes[i];
				infosArray.splice( removeIndex, 1 );
			}
			await this.saveUserSettingsData( this.getData(), false );
		}

		return bSave;
		
	}
}