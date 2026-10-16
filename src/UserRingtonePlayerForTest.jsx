import React from "react";
import WebphonePhoneClient from "./WebphonePhoneClient";
import BrekekeOperatorConsole from "./index";

const _OBJECT_URL_CACHE_TIMELIMIT_MILLIS = 2 * 60 * 1000;
export default class UserRingtonePlayerForTest extends React.Component {
    constructor( props ) {
        super( props );
        this._UserSettingsViewAsParent = props.userSettingsViewAsParent;
    }
	
	_playFileData( fileData ){
        const oc = BrekekeOperatorConsole.getStaticInstance();
		const phoneClient = oc.getPhoneClient();
        const urlCaches = phoneClient.getObjectUrlCachesForRingtone();
		let objectUrlCache = urlCaches.getObjectUrlCache( fileData.id );
		if( !objectUrlCache ){
			objectUrlCache = urlCaches.createObjectUrlCache( fileData.file, fileData.id, _OBJECT_URL_CACHE_TIMELIMIT_MILLIS );
		}
		const objectUrl = objectUrlCache.getObjectUrl();
		const audio = new Audio(objectUrl);
		audio.play();
		audio.onended = () => {
			//URL.revokeObjectURL(objectUrl);
		};
	}
	
	_deleteCache( fileData ){
        const oc = BrekekeOperatorConsole.getStaticInstance();
		const phoneClient = oc.getPhoneClient();
        const urlCaches = phoneClient.getObjectUrlCachesForRingtone();
		const result = urlCaches.deleteObjectUrlCache(fileData.id);
		const temp = 0;
	}
	

    render(){
        const oc = BrekekeOperatorConsole.getStaticInstance();
        const phoneClient = oc.getPhoneClient();
        if( phoneClient.constructor.name !== WebphonePhoneClient.name ) {
            return (null);
        }

        //const urlCaches = phoneClient.getObjectUrlCachesForRingtone();
        //const arUrlCaches = urlCaches.getObjectUrlCacheArray();
		
		const ringtoneFiles = oc.getUserSettingsRingtoneFiles();
		const arFileDatas = ringtoneFiles.getRingtoneFileDataArray();
		
		return (
			<table>
			{
				arFileDatas.map( (fileData,i) =>{
					return <tr><td>{fileData.file.name}</td><td><a style={{cursor:"pointer"}}　onClick={ () => this._playFileData( fileData  )}>Play</a></td>
						<td><a style={{cursor:"pointer"}} onClick={ () => this._deleteCache( fileData ) }>Delete Cache</a></td>
					</tr>
				})
			}
			</table>
		);
    }
}