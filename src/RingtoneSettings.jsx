import React from "react";
import {Button, Form, Input, Space} from "antd";
import {MinusCircleOutlined, PlusOutlined} from "@ant-design/icons";
import i18n from "./i18n";

export default class ShortDialSettings extends React.Component {
    constructor( props ){
        super(props);
    }

    render(){
        //return <div>Hello {this.text}</div>
        return <Form.List name="ringtoneInfos">
            {(fields, { add, remove }) => (
                <>
                    {fields.map(({ key, name, ...restField }) => (
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
                                name={[name, 'ringtoneFilepathOrFileurl']}
                                rules={[{ required: true, message: i18n.t("missingRingtoneFilepathOrFileurl") }]}
                            >
                                <Input placeholder={i18n.t("ringtoneFilepathOrFileurl")} style={{width:600}} />
                            </Form.Item>
                            <MinusCircleOutlined onClick={() => remove(name)} />
                        </Space>
                    ))}
                    <Form.Item>
                        <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                            {i18n.t("addField")}
                        </Button>
                    </Form.Item>
                </>
            )}
        </Form.List>
    }

}