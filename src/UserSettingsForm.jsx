import {Select, Form, Row, Input} from "antd";
import React, { useState, useEffect } from "react";
import i18n from "./i18n";
import RingtoneSettings2 from "./RingtoneSettings2";
import UploadedRingtoneFilesArea from "./UploadedRingtoneFilesArea";
import BrekekeOperatorConsole from "./index";
import WebphonePhoneClient from "./WebphonePhoneClient";
import UserSettingsData, { USER_SETTINGS_DATA_CALL_SELECTION } from "./UserSettingsData";
import {Radio} from "antd";
import ShortDialSettings from "./ShortDialSettings";

const UserSettingsForm = ( props ) => {
	//const usrf = BrekekeOperatorConsole.getStaticInstance().getUserSettingsRingtoneFiles();
	const oc = BrekekeOperatorConsole.getStaticInstance();
	const phoneClient = oc.getPhoneClient();
    const hasCall = phoneClient.getCallInfos().getCallInfoCount() !== 0;
	
	const bWebphone = phoneClient.constructor.name === WebphonePhoneClient.name;
	
    const [userSettingsUseForm] = Form.useForm();
    const setUserSettingsUseFormBindedFunction = props.setUserSettingsUseFormBindedFunction;
    setUserSettingsUseFormBindedFunction( userSettingsUseForm );
	
    //const initialValues = props.userSettingsObject;
	const initialValues = window.structuredClone( props.userSettingsObject );
	if( !initialValues["dtmfSendMode"] && initialValues["dtmfSendMode"] !== 0 ){
		initialValues["dtmfSendMode"] = "-100000000";	//-100000000 = Use layout setting
	}
	else{
		initialValues["dtmfSendMode"] = initialValues["dtmfSendMode"] + "";
	}
	
	if( !initialValues["phoneTerminal"] ){
		initialValues["phoneTerminal"] = "phoneTerminal_layout";
	}
	
	const usrf = oc.getUserSettingsRingtoneFiles();
	const ringtoneFileDataArray = usrf.getRingtoneFileDataArray();

	let cameraDeviceId;
	let micDeviceId;
	let speaker;
	
	const [cameras, setCameras] = useState(null);
	const [mics, setMics] = useState(null);
	const [speakers, setSpeakers] = useState(null);
	const [loadingDevices, setLoadingDevices] = useState(true);
	
	useEffect(() => {
		if (!bWebphone) {
			return;
		}

		const webphone = phoneClient.getWebphone();
		
		const fetchDevices = async () => {
		  setLoadingDevices(true);
		  try {
			  
			const [camerasData, microphonesData, speakersData] = await Promise.all([
			  webphone.getAvailableCameras(),
			  webphone.getAvailableMicrophones(),
			  webphone.getAvailableSpeakers(),
			]);
			  
			setCameras(camerasData);
			setMics( microphonesData );
			setSpeakers( speakersData );

			cameraDeviceId = webphone.getVideoInputDevice();
			micDeviceId = webphone.getAudioInputDevice();
			speaker = webphone.getAudioOutputDevice();
	
			  userSettingsUseForm.setFieldsValue({
				webphone_camera: cameraDeviceId || "",
				webphone_microphone: micDeviceId || "",
				webphone_speaker: speaker?.deviceId || "",
			  });
			//userSettingsUseForm.resetFields(['webphone_camera','webphone_microphone','webphone_speaker']);
		  } finally {
			setLoadingDevices(false);
		  }
		};

		fetchDevices();
	}, []);

    return <Form form={userSettingsUseForm} initialValues={initialValues} layout="vertical">
        <section>
            <h1>{i18n.t("Global_settings")}</h1>
            <h2>{i18n.t("phoneTerminal")}</h2>
            <Form.Item name="phoneTerminal"
                rules={[
                    {
                        required: false,
						//required: true,
						//message:i18n.t("Please_select")
                    },
                ]}				
			>
                <Radio.Group disabled={props["hasCall"]}>
                    <Radio value={"phoneTerminal_webphone"}>{i18n.t("webphone")}</Radio>
                    <Radio value={"phoneTerminal_pal"}>{i18n.t("otherPhoneTerminal_pal")}</Radio>
                    <Radio value={"phoneTerminal_layout"}>{i18n.t("Use_layout_setting")}</Radio>
                </Radio.Group>
            </Form.Item>
			<h2>{i18n.t("Call_selection")}</h2>
			<Form.Item name="callSelection">
                <Select
					defaultValue={USER_SETTINGS_DATA_CALL_SELECTION.Voice}
                    style={{width:150}}
                >
                    <Select.Option
                        value={USER_SETTINGS_DATA_CALL_SELECTION.Voice}>
                        <span>{i18n.t("Voice_call")}</span>
                    </Select.Option>
                    <Select.Option
                        value={USER_SETTINGS_DATA_CALL_SELECTION.Video}>
                        <span>{i18n.t("Video_call")}</span>
                    </Select.Option>
                    <Select.Option
                        value={USER_SETTINGS_DATA_CALL_SELECTION.Choice}>
                        <span>{i18n.t("Choice")}</span>
                    </Select.Option>
                </Select>
			</Form.Item>
            <h2>{i18n.t("shortDialSettings")}</h2>
            <ShortDialSettings />
            <h1>{i18n.t("Webphone_settings")}</h1>
			<h2>{i18n.t("phoneIndex")}</h2>
            <Form.Item
                // label={i18n.t("phoneIndex")}
                name="phoneIndex"
                rules={[
                    {
                        required: false,
                    },
                ]}
            >
                <Select
                    // onChange={(value) => {
                    // }}
                    //placeholder={i18n.t("phoneIndex")}
                    //value={this._voicemailsFilterStatus}
                    //defaultValue={lastPhoneIndex}
					defaultValue={-1}
                    //onSelect={(i) => this._onSelectPhoneIndex(i)}
                    //className="ant-input-forBrOCLogin"
                    //dropdownStyle={{ backgroundColor: 'green' }}  //Does not work
                    style={{width:150}}
                >
                    <Select.Option
                        value={-1}>
                        <span>({i18n.t("Not_specified")})</span>
                    </Select.Option>
                    {[...Array(4)].map((_, index) => {
                        const phoneIndex = index + 1;
                        return <Select.Option
                            value={phoneIndex}>
                            <span>{phoneIndex}</span>
                        </Select.Option>
                    })}
                </Select>
            </Form.Item>
			<h2>{i18n.t("Device")}</h2>
			{
				bWebphone &&					
					(
						<>
						<Row align="middle">
						<span style={{minWidth:140}}>{i18n.t("Camera")}</span>
						<Form.Item name="webphone_camera">
							<Select style={{width:700}} disabled={false}>
								<Select.Option value={""}><span>({i18n.t("Not_specified")})</span></Select.Option>
								{
									cameras && cameras.map( ( currentCamera, index ) =>{
										return <Select.Option value={currentCamera.deviceId}>
											<span>{currentCamera.label}</span>
										</Select.Option>
									})
								}
							</Select>
						</Form.Item>
						</Row>
						<Row align="middle">
						<span style={{minWidth:140}}>{i18n.t("Microphone")}</span>
						<Form.Item name="webphone_microphone">
							<Select style={{width:700}}>
								<Select.Option value={""}><span>({i18n.t("Not_specified")})</span></Select.Option>
								{
									mics && mics.map( ( currentMic, index ) =>{
										return <Select.Option value={currentMic.deviceId}>
											<span>{currentMic.label}</span>
										</Select.Option>
									})
								}
							</Select>
						</Form.Item>
						</Row>
						<Row align="middle">
						<span style={{minWidth:140}}>{i18n.t("Speaker")}</span>
						<Form.Item name="webphone_speaker">
							<Select style={{width:700}}>
								<Select.Option value={""}><span>({i18n.t("Not_specified")})</span></Select.Option>							
								{
									speakers && speakers.map( ( currentSpeaker, index ) =>{
										return <Select.Option value={currentSpeaker.deviceId}>
											<span>{currentSpeaker.label}</span>
										</Select.Option>
									})
								}
							</Select>
						</Form.Item>
						</Row>
						</>
					)
			}
			{
				!bWebphone &&
					(
						<>
						{i18n.t("Not_currently_using_a_Webphone")}
						<Form.Item name="webphone_camera"
							rules={[
							{
								required: false,
							},
							]}
						>
							<Input type="hidden" />
						</Form.Item>
						<Form.Item name="webphone_microphone"
							rules={[
							{
								required: false,
							},
							]}
						>
							<Input type="hidden" />
						</Form.Item>
						<Form.Item name="webphone_speaker"
							rules={[
							{
								required: false,
							},
							]}						
						>
							<Input type="hidden" />
						</Form.Item>
						</>
					)
			}
            <h2>{i18n.t("DTMF_send_mode")} </h2>
            <Form.Item name="dtmfSendMode">
                <Radio.Group>
                    <Radio value={"0"}>SIP INFO</Radio>
                    <Radio value={"1"}>{i18n.t("Inband")}</Radio>
                    <Radio value={"2"}>RFC2833</Radio>
                    <Radio value={"-100000000"}>{i18n.t("Use_layout_setting")}</Radio>
                </Radio.Group>
            </Form.Item>
            <h2>{i18n.t("ringtoneSettings")}</h2>
			<RingtoneSettings2 form={userSettingsUseForm} initialValues={initialValues} ringtoneSettings2Setter={props.ringtoneSettings2Setter}
                               ringtoneAudioPlayers={props.ringtoneAudioPlayers} ringtoneFileDataArray={ringtoneFileDataArray}   />
            <h4>{i18n.t("Uploaded_ringtone_files")}</h4>
			<UploadedRingtoneFilesArea ringtoneAudioPlayers={ props.ringtoneAudioPlayersForUploaded  } />
        </section>
    </Form>
};
export default UserSettingsForm
