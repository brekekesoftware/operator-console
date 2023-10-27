import React from "react";
import { Button, Form, Input, Space } from 'antd';

function PrintHello( {text} ) {
   return <Form.Item
       label="Username"
       name="username"
       rules={[{ required: true, message: 'Please input your username!' }]}
   >
      <Input placeHolder={text} />
   </Form.Item>
}
export default PrintHello;