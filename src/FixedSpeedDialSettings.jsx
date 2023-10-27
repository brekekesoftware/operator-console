import React from "react";
import Form from "antd/lib/form";
import Button from 'antd/lib/button';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, Space } from 'antd';
import PrintHello from './PrintHello';

export default class FixedSpeedDialSettings extends React.Component {
    constructor( props ){
        super(props);
        this.formRef = React.createRef();
        this.state = {
            savedShortDials : this.props.savedShortDials
        };
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
    }



    render(){
        return (
            <>
                <div>Hello world.</div>
                <Form ref={this.formRef} layout="vertical" initialValues={this.state.savedShortDials} >
                    <PrintHello text={"HOGEHOGE"} />
                </Form>
            </>
        )
    }

}