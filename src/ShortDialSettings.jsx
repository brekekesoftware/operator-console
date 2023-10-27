import React from "react";
import {Button, Form, Input, Space} from "antd";
import {MinusCircleOutlined, PlusOutlined} from "@ant-design/icons";
import i18n from "./i18n";

export default class ShortDialSettings extends React.Component {
    constructor( props ){
        super(props);
        this.text = props.text;
    }

    render(){
        //return <div>Hello {this.text}</div>
        return <Form.List name="shortDials">
            {(fields, { add, remove }) => (
                <>
                    {fields.map(({ key, name, ...restField }) => (
                        <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                            <Form.Item
                                {...restField}
                                name={[name, 'shortDial']}
                                rules={[{ required: true, message: i18n.t("missingShortDial") }]}
                            >
                                <Input placeholder={i18n.t("shortDial")} />
                            </Form.Item>
                            <Form.Item
                                {...restField}
                                name={[name, 'dial']}
                                rules={[{ required: true, message: i18n.t("missingDial") }]}
                            >
                                <Input placeholder={i18n.t("dial")} />
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