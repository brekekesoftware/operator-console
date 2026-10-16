import i18n from "./i18n";
import OCUtil from "./OCUtil";
import {ulid} from "ulid";
import BrekekeOperatorConsole from "./index";
import WebphonePhoneClient from "./WebphonePhoneClient";

export default class UserSettingsRingtoneFiles{
    constructor( operatorConsoleAsParent ) {
        this._Parent = operatorConsoleAsParent;
    }

    async reinitAsync(){
        this._dbName = this._getDbName();
		this._ringtoneFileDataArray = await this._getRingtoneFileDataArray();
	}		
	
	clear(){
		this._dbName = null;
		this._ringtoneFileDataArray = null;
		
		//if( removeAndSaveNotExistRingtoneFilesReferencesForUseSettings === true ){
		//	const userSettings = BrekekeOperatorConsole.getStaticInstance().getUserSettingsData();
		//	const bSaved = userSettings.removeAndSaveNotExistRingtoneFilesReferences( this );
		//}
	}
	
	getRingtoneFileDataArray(){
		return this._ringtoneFileDataArray;
	}

	//!testit
    async _deleteDatabaseAsync (){
        return new Promise(async (resolve, reject) => {

            const deleteRequest = indexedDB.deleteDatabase(this._dbName);

            deleteRequest.onsuccess = async () => {
                const phoneClient = BrekekeOperatorConsole.getStaticInstance().getPhoneClient();
                const bWebphone = phoneClient.constructor.name === WebphonePhoneClient.name;
                if( bWebphone ) {
                    const ringtoneFileDataArray = await this._getRingtoneFileDataArray();
                    if( Array.isArray( ringtoneFileDataArray ) ){
                        const caches = phoneClient.getObjectUrlCachesForRingtone();
                        for( let i = 0; i < ringtoneFileDataArray.length; i++ ){
                            const ringtoneFileData = ringtoneFileDataArray[i];
                            //const file = ringtoneFileData["file"];
                            caches.deleteObjectUrlCache( ringtoneFileData.id );
                        }
                    }
                }

                resolve(true);
            };

            deleteRequest.onerror = () => {
                const error = deleteRequest.error;
                OCUtil.logErrorWithNotification("Database(" + this._dbName + ") deletion failed.", i18n.t("Database_deletion_failed"), error );
                reject(deleteRequest.error);
            };

            deleteRequest.onblocked = () => {
                OCUtil.logErrorWithNotification("Database(" + this._dbName + ") deletion failed.If you have other browser tabs open, please close them and try again.", i18n.t("Database_deletion_failed") + " " + i18n.t("If_you_have_other_browser_tabs_open") );
                reject();
            };
        });
    }

    _getDbName(){
        const dbName = "Brekeke\tOperatorConsole\UserSettingsRingtoneFiles\t" + this._Parent.getLoggedinPbxHost() + "\t" + this._Parent.getLoggedinPbxPort() + "\t" + this._Parent.getLoggedinTenant() + "\t" + this._Parent.getLoggedinUsername();
        return dbName;
    }

    async _openIndexedDB(){
        const db = await new Promise((resolve, reject) => {
            const req = window.indexedDB.open( this._dbName );

            req.onupgradeneeded = (e) => {
                const db = e.target.result;
                if (!db.objectStoreNames.contains("ringtoneFileDataArray")) {
                    db.createObjectStore("ringtoneFileDataArray", { keyPath: "id" });
                }
            };

            req.onsuccess = () => resolve(req.result);
            req.onerror = () => reject(req.error);
        });

        if (!db.objectStoreNames.contains("ringtoneFileDataArray")) {
            db.close();
            await this._deleteDatabaseAsync();
            const newDb = this. _openIndexedDB();
            return newDb;
        }

        return db;
    };


    async _getRingtoneFileDataArray(){
        const db = await this._openIndexedDB();

        return new Promise((resolve, reject) => {
            const tx = db.transaction("ringtoneFileDataArray", "readonly");
            const store = tx.objectStore("ringtoneFileDataArray");

            const req = store.getAll();

            let result = null;
            req.onsuccess = () =>{
                //resolve(req.result);
                result = req.result;
            }
            req.onerror = () => {
                reject(req.error);
            };
            tx.oncomplete = () => {
                db.close();
                resolve(result);
            };

            tx.onerror = () => {
                db.close();
                reject(tx.error);
            };
        });
    }

	_getRecord( key, store ){
		return new Promise((resolve,reject) => {
			const req = store.get(key);

            req.onsuccess = () =>{
                resolve(req.result);
            }
            req.onerror = () => {
                reject(req.error);
            };
		});			
	}

    async _deleteRecord(db, storeName, key){
        return new Promise(async (resolve, reject) => {
            const tx = db.transaction([storeName], 'readwrite');
            const store = tx.objectStore(storeName);

            let ringtoneFileData;
			const phoneClient = BrekekeOperatorConsole.getStaticInstance().getPhoneClient();
			const bWebphone = phoneClient.constructor.name === WebphonePhoneClient.name;
	        if( bWebphone ) {
				ringtoneFileData = await this._getRecord( key, store );
			}
			
            const request = store.delete(key);

            request.onsuccess = () => {
                //resolve(request.result);
                if( ringtoneFileData  ) {
                    //const file = ringtoneFileData["file"];
                    const caches = phoneClient.getObjectUrlCachesForRingtone();
                    caches.deleteObjectUrlCache( ringtoneFileData.id );
                }
                resolve();

            };

            request.onerror = (event) => {
                reject(event.target.error);
            };

            tx.oncomplete = () => {
                db.close();

				//const userSettings = BrekekeOperatorConsole.getStaticInstance().getUserSettingsData();
				//const bSaved = userSettings.removeAndSaveNotExistRingtoneFilesReferences( this );

                resolve();
            };

            tx.onerror = () => {
                db.close();
                reject(tx.error);
            };


        });
    }


    async _uploadRingtoneFileAsync(file ){
        const db = await this._openIndexedDB();

        return new Promise((resolve, reject) => {
            const tx = db.transaction("ringtoneFileDataArray", "readwrite");
            const store = tx.objectStore("ringtoneFileDataArray");

            //const ou = URL.createObjectURL(file);

            // const putData = {
            //   id: ulid(),
            //   objectURL : ou,
            //   name: file.name,
            //   size: file.size,
            //   type: file.type,
            //   lastModified : file.lastModified
            // };

            const putData = {
                id: ulid(),
                file: file,
            };

            const req = store.put(putData);

            req.onsuccess = () =>{
            };
            req.onerror = () => reject(req.error);

            tx.oncomplete = () => {
                db.close();
                resolve( putData );
            };

            tx.onerror = () => {
                db.close();
                reject(tx.error);
            };

        });

    }
    
    async uploadRingtoneFileAsync( file ){
        const fileData = this._uploadRingtoneFileAsync( file );
        this._ringtoneFileDataArray = await this._getRingtoneFileDataArray();	//!optimize

		//const userSettings = BrekekeOperatorConsole.getStaticInstance().getUserSettingsData();
		//const bSaved = userSettings.removeAndSaveNotExistRingtoneFilesReferences( this );

        return fileData;
    }

    async deleteRingtoneFileAsync( fileId ){
        const db = await this._openIndexedDB();
        try{
            await this._deleteRecord( db, "ringtoneFileDataArray", fileId );
        //    Notification.success( { message:i18n.t("The_file_has_been_deleted") });
        //}
        //catch(ex){
        //    OCUtil.logErrorWithNotification("The ringtone file was not deleted.", i18n.t("The_file_was_not_deleted"), ex );
        }
        finally{
            db.close();
        }
		this._ringtoneFileDataArray = await this._getRingtoneFileDataArray();	//!optimize

		//const userSettings = BrekekeOperatorConsole.getStaticInstance().getUserSettingsData();
		//const bSaved = userSettings.removeAndSaveNotExistRingtoneFilesReferences( this );
		
    }


}