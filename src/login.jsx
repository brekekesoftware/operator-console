import React from 'react'
import Form from 'antd/lib/form';
import 'antd/lib/form/style';
import Button from 'antd/lib/button';
import 'antd/lib/button/style';
import Input from 'antd/lib/input';
import 'antd/lib/input/style';
import './login.scss'
import i18n from "./i18n";


export default function Login({ initialValues, onSubmit, isSigningin }) {
  return (
      <div>
          <div className="brOCLoginHeaderLogo">
              <div className="brOCLoginHeaderLogoImage"></div>
              <div className="brOCLoginHeaderLogoProduct">Operator Console</div>
          </div>
            <div className={"brOCLoginBody"}>
                <div className="brOCLoginTitle">Sign In</div>
                <div className="brOCLoginMessageDiv" name="brOCLoginMessage" style={{display:"none"}}>
                </div>
                <Form
                  name="login"
                  initialValues={initialValues}
                  onFinish={onSubmit}
                >
                  <Form.Item
                    name="hostname"
                    rules={[
                      {
                        required: true,
                        message: i18n.t("hostname_is_required"),
                      },
                    ]}
                  >
                    <Input className="ant-input-forBrOCLogin" placeholder={i18n.t("hostname")} />
                  </Form.Item>
                  <Form.Item
                    name="port"
                    rules={[
                      {
                        required: true,
                        message: i18n.t("port_is_required"),
                      },
                    ]}
                  >
                    <Input className="ant-input-forBrOCLogin" placeholder={i18n.t("port")} />
                  </Form.Item>
                  <Form.Item
                    name="tenant"
                    rules={[
                      {
                        required: true,
                        message: i18n.t("tenant_is_required"),
                      },
                    ]}
                  >
                    <Input className="ant-input-forBrOCLogin" placeholder={i18n.t("tenant")} />
                  </Form.Item>
                  <Form.Item
                    name="username"
                    rules={[
                      {
                        required: true,
                        message: i18n.t("username_is_required"),
                      },
                    ]}
                  >
                    <Input className="ant-input-forBrOCLogin" placeholder={i18n.t("username")} />
                  </Form.Item>
                  <Form.Item
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: i18n.t("password_is_required"),
                      },
                    ]}
                  >
                    <Input className="ant-input-forBrOCLogin" type="password" placeholder={i18n.t("password")} />
                  </Form.Item>

                  <Form.Item>
                    <Button type="success" htmlType="submit" className="brOCLoginButton" disabled={isSigningin}>
                      {i18n.t("signin")}
                    </Button>
                  </Form.Item>
                </Form>
          </div>
        </div>
  )
}
