import React from "react";
import {Button, Form, Input, Select, Space} from "antd";
import {MinusCircleOutlined, NotificationOutlined, PlusOutlined} from "@ant-design/icons";
import i18n from "./i18n";
import BrekekeOperatorConsole from "./index";
import AutoComplete from "antd/lib/auto-complete";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Notification from "antd/lib/notification";
import OCUtil from "./OCUtil";
import Spin from "antd/lib/spin";

const _DEFAULT_RINGTONE_RESOURCE_TYPE = "preset";
export default class RingtoneSettings2 extends React.Component {
    constructor( props ){
        super(props);
        this.state = {rerender:true};
		if( this.props.ringtoneSettings2Setter ){
			this.props.ringtoneSettings2Setter( this );
		}
    }

    _onChangeRingtoneResourceType( index, value, option ){
        this.setState({rerender:true});
    }

    _removeRingtoneInfo( formListRemoveFunc, index ){
        formListRemoveFunc(index);
        const removedItem = this.props.ringtoneAudioPlayers.removeRingtoneAudioPlayerAt(index);
        if( !removedItem ){
            OCUtil.logErrorWithNotification("Failed to remove ringtoneAudioPlayer[" + index + "]", i18n.t("FailedToRemoveRingtoneAudioPlayer"))
        }
    }

    _addRingtoneInfo( formListAddFunc ){
        formListAddFunc();
        //let ringtoneInfos2;
        const fieldsValue = this.props.form.getFieldsValue();
        // if( fieldsValue && fieldsValue.constructor === Object && Object.keys(fieldsValue).length !== 0  ){
        //     ringtoneInfos2 = fieldsValue["ringtoneInfos2"];
        // }
        // else {
        //     //First render
        //     const initialValues = this.props.initialValues;
        //     ringtoneInfos2 = initialValues["ringtoneInfos2"];
        // }

        const addIndex = fieldsValue.ringtoneInfos2.length -1;
        const sPlayElementId = addIndex + "_play_RingtoneSettings2_brOC";
        const sStopElementId = addIndex + "_stop_RingtoneSettings2_brOC";
        //!bad. Wait render
        const intervalId =  setInterval(
            ()=>{
                const ePlay = document.getElementById( sPlayElementId );
                const eStop = document.getElementById( sStopElementId );
                if( !ePlay || !eStop ){
                    return;
                }

                const options = {
                    "playElement" : ePlay,
                    "stopElement" : eStop
                };
                clearInterval( intervalId );
                const ringtoneAudioPlayer = this.props.ringtoneAudioPlayers.addRingtoneAudioPlayer( options );
                if( !ringtoneAudioPlayer ){
                    OCUtil.logErrorWithNotification("Failed to add ringtoneAudioPlayer[" + addIndex + "]", i18n.t("FailedToAddRingtoneAudioPlayer"))
                }
            },
            50
        );


        const temp = 0;
    }

    componentDidMount() {
        //let ringtoneInfos2;
        const fieldsValue = this.props.form.getFieldsValue();
        const ringtoneInfoArray = fieldsValue["ringtoneInfos2"];
         if( Array.isArray( ringtoneInfoArray ) ){
             for( let i = 0; i < ringtoneInfoArray.length; i++ ){
                 const ePlayButton = document.getElementById( i + "_play_RingtoneSettings2_brOC");
                 const eStopButton = document.getElementById( i + "_stop_RingtoneSettings2_brOC");

                 const options = {
                    playElement : ePlayButton,
                    stopElement : eStopButton,
                 };
                 this.props.ringtoneAudioPlayers.addRingtoneAudioPlayer( options );
             }
         }
    }

    _playRingtone( index ){
        const player = this.props.ringtoneAudioPlayers.getRingtoneAudioPlayer( index );

        const fieldsValue = this.props.form.getFieldsValue();
        const ringtoneInfoArray = fieldsValue["ringtoneInfos2"];
        const ringtoneInfo = ringtoneInfoArray[index];
        const resourceType = ringtoneInfo["ringtoneResourceType"];
        let srcOption;
        if( resourceType === "preset"){
            const presetFileInfosLoader = BrekekeOperatorConsole.getStaticInstance().getPresetRingtoneSoundFilesInfos();
            const preset = ringtoneInfo["preset"];
            const fileInfo = presetFileInfosLoader.getFileInfoByFilename(preset);
            if( fileInfo ){
                srcOption = { src: fileInfo["urlOrPath"] };
            }
            else{
                console.warn("Can't play audio. Ringtone preset not found. preset=" + preset );
                Notification.warning({ message:i18n.t("CanNotPlayAudioAsNoPresetExists") + "\r\n" + preset });
                return;
            }
        }
		else if( resourceType === "uploadedFile" ){
			if( !this.props.ringtoneFileDataArray ){
				Notification.warning({
					message: i18n.t("The_file_does_not_exist"),
				});
				return;
			}
			const fileId = ringtoneInfo["uploadedFileId"];
			const fileData = this.props.ringtoneFileDataArray.find( (itm) =>{
				return itm.id === fileId;
			});
			if( !fileData ){
				Notification.warning({
					message: i18n.t("The_file_does_not_exist"),
				});
				return;
			}

			const file = fileData.file;
			
			//const validFile = new File([file], file.name, {
				//type: file.type
			//});
            const ou = URL.createObjectURL(file);
			//const ou = file.objectURL;
			srcOption = { src : ou };
		}
        else{
            srcOption = { src: ringtoneInfo["urlOrRelativePath"] };
		}

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

	getRingtoneInfos2(){
		const fieldsValue = this.props.form.getFieldsValue();

		let ringtoneInfos2;
		if( fieldsValue && fieldsValue.constructor === Object && Object.keys(fieldsValue).length !== 0  ){
			ringtoneInfos2 = fieldsValue["ringtoneInfos2"];
		}
		else {
			//First render
			const initialValues = this.props.initialValues;
			ringtoneInfos2 = initialValues["ringtoneInfos2"];
		}		
		return ringtoneInfos2;
	}

    render(){
        let presetFileInfoArray = BrekekeOperatorConsole.getStaticInstance().getPresetRingtoneSoundFilesInfos().getFileInfos();
        const usrf  = BrekekeOperatorConsole.getStaticInstance().getUserSettingsRingtoneFiles();
        const ringtoneFileDataArray = usrf.getRingtoneFileDataArray();
        if( !presetFileInfoArray ){
            presetFileInfoArray = new Array();  //make empty array
        }
        const presetOptions = new Array( presetFileInfoArray.length );
        for( let i = 0; i < presetOptions.length; i++ ){
            const presetFileInfo = presetFileInfoArray[i];
            const name = presetFileInfo.name;
            presetOptions[i] = { value:name, label:name };
        }
        //const hasPresetFileInfos = presetFileInfoArray && presetFileInfoArray.length !== 0;
        return <Form.List name="ringtoneInfos2">
            {(fields, { add, remove }) => {
                return (
                <>
                    {fields.map(({ key, name, ...restField }) => {
                        //const val = this.props.form.getFieldValue("'ringtoneInfos2");
						const ringtoneInfos2 = this.getRingtoneInfos2();

                        const info = ringtoneInfos2[name];  //name is number(index).
                        let ringtoneResourceType;

                        if( info ){
                            ringtoneResourceType = info["ringtoneResourceType"];
                        }
                        else{
                            ringtoneResourceType = _DEFAULT_RINGTONE_RESOURCE_TYPE;    //!default

                        }

						//Check if the specified upload file exists.
						if( ringtoneResourceType === "uploadedFile" ){
							if( Array.isArray( ringtoneFileDataArray ) ){
								const fileId = info["uploadedFileId"];
								if( fileId ){
									const bExist = ringtoneFileDataArray.some( (fileData) => {
										const b = fileId === fileData.id;
										return b;
									});
									if( bExist !== true ){
										return (null);
									}
								}
							}
							else{
								return (null);
							}
						}
						
                        return (
                        <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                            <Form.Item
                                {...restField}
                                name={[name, 'ringtoneCaller']}
                                rules={[{ required: true, message: i18n.t("missingRingtoneCaller") }]}
                            >
                                <Input placeholder={i18n.t("ringtoneCaller")} style={{width:400}} />
                            </Form.Item>
                            <Form.Item
                                {...restField}
                                name={[name,"ringtoneResourceType"]}
                                rules={[{ required: true, message: i18n.t("missingRingtoneResourceType") }]}
                                initialValue={_DEFAULT_RINGTONE_RESOURCE_TYPE}
                                >
                                <Select  onChange={ (value,option ) => this._onChangeRingtoneResourceType( key, value, option ) }>
                                    <Select.Option value="preset">{i18n.t("Preset")}</Select.Option>
                                    <Select.Option value="urlOrRelativePath">{i18n.t("SoundFileURLOrRelativePath")}</Select.Option>
                                    { this.props.ringtoneFileDataArray && <Select.Option value="uploadedFile">{i18n.t("Uploaded_file")}</Select.Option> }
                                </Select>
                            </Form.Item>
                            {/*{ ringtoneResourceType === "preset" && (*/}
                            {/*    <Form.Item*/}
                            {/*        {...restField}*/}
                            {/*        name={[name,"preset"]}*/}
                            {/*        rules={[{ required: true, message: i18n.t("MissingPreset") }]}*/}
                            {/*        // initialValue={null}*/}
                            {/*    >*/}
                            {/*        <Select defaultValue={""}>*/}
                            {/*            <Select.Option value={""}></Select.Option>*/}
                            {/*            { presetFileInfoArray.map( ( fileInfo, index ) => {*/}
                            {/*                return <Select.Option value={ fileInfo.name }>{fileInfo.name}</Select.Option>*/}
                            {/*            } ) }*/}
                            {/*        </Select>*/}
                            {/*    </Form.Item>*/}
                            {/*) }*/}
                            {/*{ ringtoneResourceType === "preset" && (*/}
                            {/*    <Form.Item*/}
                            {/*        {...restField}*/}
                            {/*        name={[name, "preset"]}*/}
                            {/*        rules={[{required: true, message: i18n.t("MissingPreset")}]}*/}
                            {/*        // initialValue={null}*/}
                            {/*    >*/}
                            {/*        <Input list={ name + "_datalist_preset_RingtoneSettings2_brOC"} id={ name + "_input_preset_RingtoneSettings2_brOC"} />*/}
                            {/*        <datalist id={ name + "_datalist_preset_RingtoneSettings2_brOC"}>*/}
                            {/*            { presetFileInfoArray.map( ( fileInfo, index ) => {*/}
                            {/*                return <option value={ fileInfo.name }>{fileInfo.name}</option>*/}
                            {/*            } ) }*/}
                            {/*        </datalist>*/}
                            {/*    </Form.Item>*/}
                            {/*)}*/}
                            {/*{ ringtoneResourceType === "preset" && (*/}
                            {/*    <Form.Item*/}
                            {/*        {...restField}*/}
                            {/*        name={[name,"preset"]}*/}
                            {/*        rules={[{ required: true, message: i18n.t("MissingPreset") }]}*/}
                            {/*        // initialValue={null}*/}
                            {/*    >*/}
                            {/*        <Select defaultValue={""} placeholder={i18n.t("SelectAPreset")} showSearch optionFilterProp={"label"}*/}
                            {/*            options = {presetOptions}*/}
                            {/*            filterOption={false}*/}
                            {/*            style={{ minWidth: 200 }}*/}
                            {/*        >*/}
                            {/*        </Select>*/}
                            {/*    </Form.Item>*/}
                            {/*) }*/}
                            { ringtoneResourceType === "uploadedFile" && (
                                <Form.Item
                                    {...restField}
                                    name={[name,"uploadedFileId"]}
                                    rules={[{ required: true, message: i18n.t("Missing_uploaded_file") }]}
                                    // initialValue={null}
                                >
									<Select style={{minWidth:300,width:"fit-content"}}>
										{ this.props.ringtoneFileDataArray && this.props.ringtoneFileDataArray.map( ( ringtoneFileData, index ) =>{
												return <Select.Option key={index} value={ringtoneFileData.id}>{ringtoneFileData.file.name}</Select.Option>
											})
										}
									</Select>
                                </Form.Item>
                            ) }							
                            { ringtoneResourceType === "preset" && (
                                <Form.Item
                                    {...restField}
                                    name={[name,"preset"]}
                                    rules={[{ required: true, message: i18n.t("MissingPreset") }]}
                                    // initialValue={null}
                                >
                                    <AutoComplete placeholder={i18n.t("SelectAPreset")}
                                            options = {presetOptions}
                                            style={{ minWidth:500 }}
                                    >
                                    </AutoComplete>
                                </Form.Item>
                            ) }
                            {ringtoneResourceType === "urlOrRelativePath" && (
                                <Form.Item
                                    {...restField}
                                    name={[name, "urlOrRelativePath"]}
                                    rules={[{ required: true, message: i18n.t("MissingSoundFileURLOrRelativePath") }]}
                                >
                                    <Input placeholder={i18n.t("SoundFileURLOrRelativePath")} style={{width:400}} />
                                </Form.Item>
                            ) }
                            {!!ringtoneResourceType &&
                                (
                                    <>
                                        <FontAwesomeIcon icon="fa-solid fa-play" id={name + "_play_RingtoneSettings2_brOC"} onClick={ () => this._playRingtone( name ) }/>
                                        <FontAwesomeIcon icon="fa-solid fa-stop" id={name + "_stop_RingtoneSettings2_brOC"} style={{display:"none",position:"relative",left:"-8px"}} onClick={ () => this._stopRingtone(name) }/>
                                    </>
                                )
                            }
                            {/*<Form.Item*/}
                            {/*    {...restField}*/}
                            {/*    name={[name, 'ringtoneFilepathOrFileurl']}*/}
                            {/*    rules={[{ required: true, message: i18n.t("missingRingtoneFilepathOrFileurl") }]}*/}
                            {/*>*/}
                            {/*    <Input placeholder={i18n.t("ringtoneFilepathOrFileurl")} style={{width:600}} />*/}
                            {/*</Form.Item>*/}
                            <MinusCircleOutlined onClick={() => {
                                this._removeRingtoneInfo( remove, name );
                            }
                            } />
                        </Space>
                    )})}
                    <Form.Item>
                        <Button type="dashed" onClick={() => {
                            this._addRingtoneInfo( add );
                        }} block icon={<PlusOutlined />}>
                            {i18n.t("addField")}
                        </Button>
                    </Form.Item>
                </>
            )}}
        </Form.List>
    }

}
