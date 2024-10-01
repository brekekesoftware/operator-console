import {Checkbox, Form, Select} from "antd";
import ShortDialSettings from "./ShortDialSettings";
import React from "react";
import { useForm } from 'react-hook-form';
import InputNumber from "antd/lib/input-number";
import i18n from "./i18n";
import Input from "antd/lib/input";
import {Radio} from "antd";
import {CallHistory} from "./CallHistory";
import Campon from "./Campon";
import TextArea from "antd/es/input/TextArea";
import RingtoneSettings from "./RingtoneSettings";
import {CallHistory2} from "./CallHistory2";

//const [ systemSettingsUseForm ] = Form.useForm();
let systemSettingsUseForm = null;

const SystemSettingsForm = ( props ) => {

    const [ systemSettingsUseForm ] = Form.useForm();
    //setSystemSettingsUseFormFunction( systemSettingsUseForm );
    const setSystemSettingsUseFormBindedFunction = props.setSystemSettingsUseFormBindedFunction;
    setSystemSettingsUseFormBindedFunction( systemSettingsUseForm );
    //const ucChatAgentComponentEnabled = props.systemSettingsData.getUcChatAgentComponentEnabled();
    return <Form form={systemSettingsUseForm} initialValues={props.systemSettingsData.getData()} layout="vertical">
        <section>
            <h1>{i18n.t("camponSettings")}</h1>
            <Form.Item label={i18n.t("timeoutSeconds")} name="camponTimeoutSeconds">
                <InputNumber style={{width:100}} />
            </Form.Item>
            <h1>{i18n.t("quickBusySettings")}</h1>
            <Form.Item name="quickBusyClickToCall" valuePropName="checked">
                <Checkbox>{i18n.t("clickToCall")}</Checkbox>
            </Form.Item>
            <h1>{i18n.t("shortDialSettings")}</h1>
            <ShortDialSettings />
            <h1>{i18n.t("autoDialSettings")}</h1>
            <Form.Item label={i18n.t("maxSaveCount")} name="autoDialMaxSaveCount">
                <InputNumber style={{width:100}} />
            </Form.Item>
            <Form.Item label={i18n.t("maxDisplayCount")} name="autoDialMaxDisplayCount">
                <InputNumber style={{width:100}} />
            </Form.Item>
            <Form.Item label={i18n.t("RecentDisplayOrder")} name={"autoDialRecentDisplayOrder"}>
                <Select>
                    <Select.Option value={CallHistory2.RECENT_DISPLAY_ORDERS.CALL_OR_INCOMING_COUNT_DESC}>{i18n.t("CallOrIncomingCountDesc")}</Select.Option>
                    <Select.Option value={CallHistory2.RECENT_DISPLAY_ORDERS.ADD_DATETIME_DESC}>{i18n.t("StartDatetimeDesc")}</Select.Option>
                </Select>
            </Form.Item>
            <Form.Item label={i18n.t("PhonebookName")} name={"autoDialPhonebookName"}>
				<Input maxLength={300} style={{width:"240px"}}/>
			</Form.Item>
            <h1>{i18n.t("ringtoneSettings")}</h1>
            <RingtoneSettings />
            <h1>{i18n.t("ucSettings")}</h1>
            <Form.Item label={i18n.t("ucUrl")} name="ucUrl">
                <Input style={{width:500}} maxLength={300} />
            </Form.Item>
            <Form.Item label={i18n.t("ucChatAgentComponent")} name="ucChatAgentComponentEnabled">
                {/*<Radio.Group onChange={props.onChangeUcChatAgentComponentEnabledFunction}>*/}
                <Radio.Group>
                    <Radio value={false}>{i18n.t("off")}</Radio>
                    <Radio value={true}>{i18n.t("on")}</Radio>
                </Radio.Group>
            </Form.Item>
            <h1>{i18n.t("otherSettings")}</h1>
            <Form.Item label={i18n.t("phoneTerminal")} name="phoneTerminal">
                <Radio.Group disabled={ props["hasCall"] }>
                    <Radio value={"phoneTerminal_webphone"}>{i18n.t("webphone")}</Radio>
                    <Radio value={"phoneTerminal_pal"}>{i18n.t("otherPhoneTerminal_pal")}</Radio>
                </Radio.Group>
            </Form.Item>
            <Form.Item label={i18n.t("extensionScript")} name="extensionScript" >
                <TextArea rows={30} maxLength={1000000}  style={{minHeight:600,minWidth:800,marginRight:30}} />
            </Form.Item>
        </section>
    </Form>
};


const getSystemSettingsUseForm = () => systemSettingsUseForm;

export default SystemSettingsForm
//export default getSystemSettingsUseForm