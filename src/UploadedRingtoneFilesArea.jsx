import React from "react";
import {Button, Input} from "antd";
import i18n from "./i18n";
import OCUtil from "./OCUtil";
import BrekekeOperatorConsole from "./index";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Popconfirm from "antd/lib/popconfirm";
import Spin from "antd/lib/spin";
import Notification from "antd/lib/notification";
import { ulid } from 'ulid';
import "./UploadedRingtoneFilesArea.css"
import UserSettingsView from "./UserSettingsView";

const UPLOADABLE_MAX_SIZE_MB = 50;
const UPLOADABLE_MAX_SIZE_BYTE = UPLOADABLE_MAX_SIZE_MB * 1024 * 1024;

let _INSTANCE;
export default class UploadedRingtoneFilesArea extends React.Component {

	constructor( props ){
		super(props);
		_INSTANCE = this;
		this._UserSettingsFormAsParent = props.userSettingsFormAsParent;
	}

	static getStaticInstance(){
		return _INSTANCE;
	}

	_resetRingtoneAudioPlayers(){
		const players = this.props.ringtoneAudioPlayers;
		players.clearRingtoneAudioPlayers();

		const usrf = BrekekeOperatorConsole.getStaticInstance().getUserSettingsRingtoneFiles();
		const ringtoneFileDataArray = usrf.getRingtoneFileDataArray();

		if( Array.isArray( ringtoneFileDataArray ) ){
			for( let i = 0; i < ringtoneFileDataArray.length; i++ ){
				const ringtoneFileData = ringtoneFileDataArray[i];
				const fileId = ringtoneFileData.id;
				const ePlayButton = document.getElementById( fileId + "_play_UploadedRingtoneFilesArea_UserSettings_brOC");
				const eStopButton = document.getElementById( fileId + "_stop_UploadedRingtoneFilesArea_UserSettings_brOC");
				const options = {
					playElement : ePlayButton,
					stopElement : eStopButton,
				};
				this.props.ringtoneAudioPlayers.addRingtoneAudioPlayer( options );
			}
		}

	}

	//onRingtoneFileDataArrayUpdated( userSettingsFormAsCaller  ){
	//	this._resetRingtoneAudioPlayers();
	//	//const ringtoneFileDataArray = this.props.ringtoneFileDataArray;
	//	//const temp = 0;
	//}

	componentDidUpdate(){
		this._resetRingtoneAudioPlayers();
	}

	componentDidMount() {
		this._resetRingtoneAudioPlayers();
	}



	async _uploadRingtoneFile (){
		const eFile = document.getElementById("broc_UserSettingsForm_upload_ringtone_file");
		if( !eFile.files || eFile.files.length === 0 || !eFile.files[0] ){
			Notification.warning({message: i18n.t('No_file_has_been_selected')});
			return;
		}
		const file = eFile.files[0];
		if( file.size === 0 ){
			Notification.warning({message: i18n.t('The_file_is_empty')});
			return;
		}
		if( file.size > UPLOADABLE_MAX_SIZE_BYTE ){
			Notification.warning({message: i18n.t('The_file_size_exceeds_the_maximum_limit') + " " + UPLOADABLE_MAX_SIZE_MB + "MB"});
			return;
		}
		let fileTypeLower;
		if(	!file.type ){
			fileTypeLower = null;
		}
		else{
			fileTypeLower = file.type.toLowerCase();
		}
		if( fileTypeLower !== "audio/wav" && fileTypeLower !== "audio/mpeg" && fileTypeLower !== "audio/x-wav" &&
			fileTypeLower !== "audio/aac" && fileTypeLower !== "audio/ogg" && fileTypeLower !== "audio/webm" &&
			fileTypeLower !== "audio/midi" && fileTypeLower !== "audio/x-midi" &&
			fileTypeLower !== "audio/opus" && fileTypeLower !== "audio/3gpp" && fileTypeLower !== "audio/3gpp2"
		){
			console.warn("This format is not supported as an audio file." + file.type );
			Notification.warning({message: i18n.t('This_format_is_not_supported')});
			return;
		}

		// const eTitle = document.getElementById("broc_UserSettingsForm_upload_ringtone_file_title");
		// let title = eTitle.value;
		// if( !title || title.length === 0 ){
		// 	title = file.name;
		// }

		try {
			//await _uploadRingtoneFileAsync( file, title );
			const usrf = BrekekeOperatorConsole.getStaticInstance().getUserSettingsRingtoneFiles();
			await usrf.uploadRingtoneFileAsync( file );
			Notification.success( { message:i18n.t("Uploaded_the_file") });
		}
		catch(ex){
			//!testit
			if(ex.name === "QuotaExceededError") {
				OCUtil.logErrorWithNotification("Ringtone files cannot be saved because the storage capacity has been exceeded.", i18n.t("Ringtone_files_cannot_be_saved"), ex);
			}
			else {
				OCUtil.logErrorWithNotification("An error occurred while retrieving ringtone files.", i18n.t("An_error_occurred_while_retrieving_ringtone_files"), ex);
			}
		}
		UserSettingsView.getStaticInstance().setState({rerender:true});
	}


	async _deleteRingtoneFile( fileId ){
		const usrf = BrekekeOperatorConsole.getStaticInstance().getUserSettingsRingtoneFiles();
		await usrf.deleteRingtoneFileAsync( fileId );
		//const userSettings = BrekekeOperatorConsole.getStaticInstance().getUserSettingsData();
		//const bSaved = userSettings.removeAndSaveNotExistRingtoneFilesReferences( usrf );
		//this._removeAndSaveNotExistRingtoneFilesReferences( usrf );
		
		UserSettingsView.getStaticInstance().setState({rerender:true});
	}

	// _removeAndSaveNotExistRingtoneFilesReferences( userSettingsRingtoneFiles ){
	// 	const usv = UserSettingsView.getStaticInstance();
	// 	const ringtoneSettings2 = usv.getUserSettingsRingtoneSettings2();
	// 	const infosArray = ringtoneSettings2.getRingtoneInfos2();
	// 	if( !Array.isArray( infosArray ) ){
	// 		return false;
	// 	}
	//
	// 	let arFileData = userSettingsRingtoneFiles.getRingtoneFileDataArray();
	// 	if( !Array.isArray( arFileData ) ){
	// 		arFileData = new Array();
	// 	}
	//
	// 	const removeInfoIndexes = new Array();
	// 	for( let i = 0; i < infosArray.length; i++ ){
	// 		const info = infosArray[i];
	// 		const sType = info["ringtoneResourceType"];
	// 		if( sType !== "uploadedFile" ){
	// 			continue;
	// 		}
	//
	// 		const bExist = arFileData.some( (fileData) => {
	// 			const fileDataId = fileData["id"];
	// 			const infoFileId = info["uploadedFileId"];
	// 			const b = fileDataId === infoFileId;
	// 			return b;
	// 		});
	// 		if( !bExist ){
	// 			removeInfoIndexes.push( i );
	// 		}
	// 	}
	// 	const bRemove = removeInfoIndexes.length !== 0;
	// 	if( bRemove ){
	// 		for( let i = removeInfoIndexes.length - 1; i >= 0; i-- ){
	// 			const removeIndex = removeInfoIndexes[i];
	// 			infosArray.splice( removeIndex, 1 );
	// 		}
	// 	}
	//
	// 	return bRemove;
	//
	// }
	
	_playRingtone( index ){
		const player = this.props.ringtoneAudioPlayers.getRingtoneAudioPlayer( index );
		const usrf = BrekekeOperatorConsole.getStaticInstance().getUserSettingsRingtoneFiles();
		const ringtoneFileDataArray = usrf.getRingtoneFileDataArray();
		const fileData = ringtoneFileDataArray[index];
		const file = fileData.file;
		const ou = URL.createObjectURL(file);
		//const ou = file.objectURL;
		const srcOption = { src : ou };

		const playErrorPromise = player.playRingtoneAudio( srcOption );
		playErrorPromise.then( (ex) =>{
			if( ex ) {
				OCUtil.logWarningWithNotification("Can't play audio. ", i18n.t("CannotPlayAudio"), ex);
			}
		});
	}

	_stopRingtone( index ){
		const player = this.props.ringtoneAudioPlayers.getRingtoneAudioPlayer( index );
		player.stopRingtoneAudio();
	}

	render(){
		const usrf = BrekekeOperatorConsole.getStaticInstance().getUserSettingsRingtoneFiles();
		const ringtoneFileDataArray = usrf.getRingtoneFileDataArray();
		const ringtoneFileDataArrayIsLoading = this.props.ringtoneFileDataArrayIsLoading;
		return (
			<>
			<div className="UploadedRingtoneFilesArea_uploaded_ringtone_files_wrapper">
				<table className="UploadedRingtoneFilesArea_uploaded_ringtone_files">
					<thead>
					<tr>
						<th>{i18n.t("File_name")}</th>
						<th>{i18n.t("File-size")}(KB)</th>
						<th style={{width: "1px"}}>{i18n.t("Play-sound-file")}</th>
						<th style={{width: "1px"}}>{i18n.t("Delete")}</th>
					</tr>
					</thead>
					<tbody>
					{ ringtoneFileDataArrayIsLoading === true && <Spin /> }
					{ ringtoneFileDataArrayIsLoading !== true && ringtoneFileDataArray && ringtoneFileDataArray.map((ringtoneFileData, index) => {
							const  fileSizeBase = ringtoneFileData.file?.size / 1024.0;
							const fileSize = Math.trunc( fileSizeBase );//Math.floor( fileSizeBase * 10 ) / 10;
							const fileId = ringtoneFileData.id;
							return (
								<tr>
									<td style={{textAlign:"left"}}>{ringtoneFileData.file?.name}</td>
									<td style={{textAlign:"right"}}>{fileSize}</td>
									<td style={{width: "1px"}}>
										<FontAwesomeIcon icon="fa-solid fa-play" id={fileId + "_play_UploadedRingtoneFilesArea_UserSettings_brOC"} onClick={ () => this._playRingtone( index ) }/>
										<FontAwesomeIcon icon="fa-solid fa-stop" id={fileId + "_stop_UploadedRingtoneFilesArea_UserSettings_brOC"} style={{display:"none"}} onClick={ () => this._stopRingtone(index) }/>
									</td>
									<td style={{width: "1px"}}>
										<Popconfirm title={i18n.t("are_you_sure")} onConfirm={ () => this._deleteRingtoneFile( ringtoneFileData.id ) }
													okText={i18n.t("yes")}
													cancelText={i18n.t("no")}
										>
											<FontAwesomeIcon size="lg" icon="fa fa-trash" style={{cursor:"pointer"}} />
										</Popconfirm>
									</td>
								</tr>
							)
						}
					)}
					</tbody>
				</table>
			</div>
            <div style={{marginTop:12}}>
				<div style={{display:"flex",alignItems:"center"}}>
                    {/*{i18n.t("Title")}:<Input type="text" id="broc_UserSettingsForm_upload_ringtone_file_title" style={{width:220}} />*/}
					<Input type="file" id="broc_UserSettingsForm_upload_ringtone_file" style={{marginLeft:4,width:300}} />
					<Button onClick={ () => this._uploadRingtoneFile() } style={{marginLeft:4}}>{i18n.t("Upload")}</Button>
				</div>
				<div style={{color: "red"}}>*{i18n.t("Uploading_files_that_infringe_copyright_is_prohibited")}</div>
            </div>	
			</>
		)
	}
}