import React from 'react'
import debounce from "debounce";
import Form from "antd/lib/form";
import i18n from "./i18n";
import Input from "antd/lib/input";
import InputNumber from "antd/lib/input-number";
import {Colorpicker} from "antd-colorpicker";
import {Divider} from "antd";

export default class LineTableSettings extends React.Component {
    constructor(props) {
        super(props);
        //this._setDefaultValues( this.props.widget );
        this.formRef = React.createRef();
        // this.state = {
        //     widget: window.structuredClone(this.props.widget)
        // };
        this._operatorConsoleAsParent = props.operatorConsoleAsParent;
        this.onChangeDebounced = () => {
            //debounce(props.onChange, 250);
            const values = this.formRef.current.getFieldsValue();
            LineTableSettings._copyFromValuesFrom( values, this.props.widget  );    //!bad
            this._operatorConsoleAsParent.updateSelectingWidgetSettings( this.props.widget );
            //this._checkInput( this.formRef.current.getFieldsValue() );
        };
        //this._operatorConsoleAsParent.setState( {isSaveEditingScreenButtonDisabled : true } );
        const added = this._operatorConsoleAsParent.addOnBeginSaveEditingScreenFunctionIfNotExists( LineTableSettings._OnBeginSaveEditingScreenFunction );
        //const thisEditingWidget = this._operatorConsoleAsParent.getEditingWidget();
        //thisEditingWidget.OnDeselectEditingWidget = this.OnDeselectEditingWidget.bind(this);
        //thisEditingWidget.OnRemovingWidget = this.OnRemovingWidget.bind(this);
    }

    static _copyFromValuesFrom( src, dst ){
        const lineCount = src.lineCount;
        dst.lineCount = lineCount;
        for( let i = 0; i < lineCount; i++ ){
            let key = "line" + i;
            const lineNo = src[ key ];
            dst[ key ] = lineNo;
            key = "lineLabel" + i;
            const lineLabel = src[ key ];
            dst[ key ] = lineLabel;
        }

        dst.linetableBgColor = src.linetableBgColor;
        dst.linetableHeaderRowUnderlineThickness = src.linetableHeaderRowUnderlineThickness;
        dst.linetableHeaderRowUnderlineColor = src.linetableHeaderRowUnderlineColor;
        dst.linetableBodyRowUnderlineThickness = src.linetableBodyRowUnderlineThickness;
        dst.linetableBodyRowUnderlineColor = src.linetableBodyRowUnderlineColor;
        dst.linetableOuterBorderThickness = src.linetableOuterBorderThickness;
        dst.linetableOuterBorderColor = src.linetableOuterBorderColor;
        dst.linetableOuterBorderRadius = src.linetableOuterBorderRadius;

        dst.linetableHeaderFgColor = src.linetableHeaderFgColor;
        dst.linetableHeaderBgColor = src.linetableHeaderBgColor;
        dst.linetableBodyFgColor = src.linetableBodyFgColor;
        dst.linetableBodyBgColor = src.linetableBodyBgColor;
        //dst.linetableBodyActiveRowBgColor = src.linetableBodyActiveRowBgColor;

        dst.lineButtonWidth = src.lineButtonWidth;
        dst.lineButtonHeight = src.lineButtonHeight;
        dst.lineButtonFgColor = src.lineButtonFgColor;
        dst.lineButtonBgColor = src.lineButtonBgColor;
        dst.lineButtonOuterBorderColor = src.lineButtonOuterBorderColor;
        dst.lineButtonOuterBorderRadius = src.lineButtonOuterBorderRadius;
        dst.lineButtonOuterBorderThickness = src.lineButtonOuterBorderThickness;

        dst.transferButtonWidth = src.transferButtonWidth;
        dst.transferButtonHeight  = src.transferButtonHeight;
        dst.transferButtonFgColor = src.transferButtonFgColor;
        dst.transferButtonBgColor = src.transferButtonBgColor;
        dst.transferButtonOuterBorderColor = src.transferButtonOuterBorderColor;
        dst.transferButtonOuterBorderRadius = src.transferButtonOuterBorderRadius;
        dst.transferButtonOuterBorderThickness = src.transferButtonOuterBorderThickness;

        dst.transferCancelButtonWidth = src.transferCancelButtonWidth;
        dst.transferCancelButtonHeight  = src.transferCancelButtonHeight;
        dst.transferCancelButtonFgColor = src.transferCancelButtonFgColor;
        dst.transferCancelButtonBgColor = src.transferCancelButtonBgColor;
        dst.transferCancelButtonOuterBorderColor = src.transferCancelButtonOuterBorderColor;
        dst.transferCancelButtonOuterBorderRadius = src.transferCancelButtonOuterBorderRadius;
        dst.transferCancelButtonOuterBorderThickness = src.transferCancelButtonOuterBorderThickness;

        //!modify
    }

    static validateAndFormatWidget( lineTableWidget ) {
        const lineCount = lineTableWidget.lineCount;
        if (!lineCount) {
            return i18n.t("lineCount_is_required");
        }
        if (!Number.isInteger(lineCount)) {
            return i18n.t("lineCount_is_not_valid");
        }
        if( lineCount > LineTableSettings.MAX_LINE_NO ){
            return i18n.t("lineCount_is_not_valid");
        }

        for( let i = 0; i < lineCount; i++ ){
            const lineNo = lineTableWidget["line" + i];
            if( !lineNo ){
                return i18n.t("resourceName_is_required@prefix") + (i+1) + i18n.t("resourceName_is_required@suffix");
            }
        }

        return null;
    }

    static _OnBeginSaveEditingScreenFunction( operatorConsoleAsCaller ){
        const widgets = operatorConsoleAsCaller.getEditingWidgets();
        for( let i = 0; i < widgets.length; i++ ) {
            const w = widgets[i];
            if (w.type !== "LineTable") {
                continue;
            }
            const msg = LineTableSettings.validateAndFormatWidget( w );
            if( msg ){
                operatorConsoleAsCaller.selectWidget(i);
                return msg;
            }
        }
        return null;





    }

    // OnRemovingWidget( operatorConsoleAsCaller , removeWidgetIndex ){
    //     const bRemoveSelectingThisWidget = operatorConsoleAsCaller.state.selectingWidgetIndex === removeWidgetIndex;
    //     if( !bRemoveSelectingThisWidget ){
    //         return;
    //     }
    //     operatorConsoleAsCaller.setState( {isSaveEditingScreenButtonDisabled : false } );
    //
    // }
    //
    // OnDeselectEditingWidget( operatorConsoleAsCaller ){
    //     operatorConsoleAsCaller.setState({isSaveEditingScreenButtonDisabled: false});
    // }

    static MAX_LINE_NO = 300;

    // _setDefaultValues( widget ){
    //     if( !widget.lineCount ){
    //         widget.lineCount = 6;  //default value
    //     }
    // }

    // _checkInput( values ){
    //     let isInputOk = true;
    //     for( let i = 0; i < values.lineCount; i++ ){
    //         const line = values["line" + i ];
    //         if( line === undefined || line === "" ){
    //             isInputOk = false;
    //             break;
    //         }
    //     }
    //     if( this._operatorConsoleAsParent.state.isSaveEditingScreenButtonDisabled !== !isInputOk ) { //!for stop infinity loop.
    //         this._operatorConsoleAsParent.setState({isSaveEditingScreenButtonDisabled: !isInputOk});
    //     }
    // }


    componentDidUpdate(prevProps) {
        console.log("componentDidUpdate.");

//        const values = this.formRef.current.getFieldsValue() );

        // this.formRef.current.validateFields()
        //     .then((values) => {
        //         /*
        //       values:
        //         {
        //           line0: 'a',
        //           line1: 'b',
        //           line2: undefined,
        //         }
        //       */
        //     })
        //     .catch((errorInfo) => {
        //         /*
        //         errorInfo:
        //           {
        //             values: {
        //               username: 'username',
        //               password: 'password',
        //             },
        //             errorFields: [
        //               { name: ['password'], errors: ['Please input your Password!'] },
        //             ],
        //             outOfDate: false,
        //           }
        //         */
        //     });

        if (this.props.widgetIndex != prevProps.widgetIndex) {
            const widget = window.structuredClone(this.props.widget);

            this.setState({widget}, () => {
                this.formRef.current.resetFields();
            })
        }
        if (this.props.onChange != prevProps.onChange) {
            this.onChangeDebounced = debounce(this.props.onChange, 250);
        }

        //this._checkInput( this.formRef.current.getFieldsValue() );

    }

    render() {

        const lineInfos = [];
        for( let i = 0; i < this.props.widget.lineCount; i++ ){
            lineInfos.push(i);
        }

        let key = 0;
        let divKey = -1;
        return (
            <Form ref={this.formRef} layout="vertical" initialValues={this.props.widget} onValuesChange={this.onChangeDebounced}>
                <Form.Item key="-1" label={i18n.t("lineCount")} name="lineCount" rules={[
                    {
                        required: true,
                        message: i18n.t("lineCount_is_required"),
                    },
                ]}>
                    <InputNumber min="1" max={ LineTableSettings.MAX_LINE_NO } />
                </Form.Item>
                {lineInfos.map((lineInfo, i) => {
                    return ( <div key={divKey++}>
                        <h3>{i18n.t("line") + " " + (i+1)}</h3>
                        <Form.Item key={key++} label={i18n.t("resourceName")} name={"line" + i} maxLength={300}
                               rules={[
                                   {
                                       required: true,
                                       message: i18n.t("is_input_required"),
                                   }
                               ]}>
                        <Input allowClear/>
                        </Form.Item>
                        <Form.Item key={key++} label={i18n.t("lineLabel")} name={"lineLabel" + i} maxLength={300} >
                            <Input allowClear/>
                        </Form.Item>
                    </div> );
                })}
                <Form.Item label={i18n.t("bgColor")} name={`linetableBgColor`} rules={[
                    {
                        required: false,
                    }
                ]}>
                    <Colorpicker format="rgb" />
                </Form.Item>

                <Form.Item label={i18n.t("outerBorderThickness")} name="linetableOuterBorderThickness" rules={[
                    {
                        required: false,
                    },
                ]}>
                    <InputNumber min="0" />
                </Form.Item>
                <Form.Item label={i18n.t("outerBorderColor")} name={`linetableOuterBorderColor`} rules={[
                    {
                        required: false,
                    }
                ]}>
                    <Colorpicker format="rgb" />
                </Form.Item>
                <Form.Item label={i18n.t("outerBorderRadius")} name="linetableOuterBorderRadius" rules={[
                    {
                        required: false,
                    },
                ]}>
                    <InputNumber min="0" />
                </Form.Item>
                <Divider>{i18n.t("header_settings")}</Divider>
                <Form.Item label={i18n.t("fgColor")} name={`linetableHeaderFgColor`} rules={[
                    {
                        required: false,
                    }
                ]}>
                    <Colorpicker format="rgb" />
                </Form.Item>

                <Form.Item label={i18n.t("rowUnderlineThickness")} name="linetableHeaderRowUnderlineThickness" rules={[
                    {
                        required: false,
                    },
                ]}>
                    <InputNumber min="0" />
                </Form.Item>
                <Form.Item label={i18n.t("rowUnderlineColor")} name={`linetableHeaderRowUnderlineColor`} rules={[
                    {
                        required: false,
                    }
                ]}>
                    <Colorpicker format="rgb" />
                </Form.Item>

                {/*<Form.Item label={i18n.t("bgColor")} name={`linetableHeaderBgColor`} rules={[*/}
                {/*    {*/}
                {/*        required: false,*/}
                {/*    }*/}
                {/*]}>*/}
                {/*    <Colorpicker format="rgb" />*/}
                {/*</Form.Item>*/}
                <Divider>{i18n.t("body_settings")}</Divider>
                <Form.Item label={i18n.t("fgColor")} name={`linetableBodyFgColor`} rules={[
                    {
                        required: false,
                    }
                ]}>
                    <Colorpicker format="rgb" />
                </Form.Item>

                <Form.Item label={i18n.t("rowUnderlineThickness")} name="linetableBodyRowUnderlineThickness" rules={[
                    {
                        required: false,
                    },
                ]}>
                    <InputNumber min="0" />
                </Form.Item>
                <Form.Item label={i18n.t("rowUnderlineColor")} name={`linetableBodyRowUnderlineColor`} rules={[
                    {
                        required: false,
                    }
                ]}>
                    <Colorpicker format="rgb" />
                </Form.Item>

                {/*<Form.Item label={i18n.t("bgColor")} name={`linetableBodyBgColor`} rules={[*/}
                {/*    {*/}
                {/*        required: false,*/}
                {/*    }*/}
                {/*]}>*/}
                {/*    <Colorpicker format="rgb" />*/}
                {/*</Form.Item>*/}
                {/*<Form.Item label={i18n.t("activeRowBgColor")} name={`linetableBodyActiveRowBgColor`} rules={[*/}
                {/*    {*/}
                {/*        required: false,*/}
                {/*    }*/}
                {/*]}>*/}
                {/*    <Colorpicker format="rgb" />*/}
                {/*</Form.Item>*/}

                <divider>{i18n.t("lineButtonSettings")}</divider>
                <Form.Item label={i18n.t("width")} name="lineButtonWidth" rules={[
                    {
                        required: false,
                    },
                ]}>
                    <InputNumber min="1"  />
                </Form.Item>
                <Form.Item label={i18n.t("height")} name="lineButtonHeight" rules={[
                    {
                        required: false,
                    },
                ]}>
                    <InputNumber min="1"  />
                </Form.Item>
                <Form.Item label={i18n.t("fgColor")} name={"lineButtonFgColor" } rules={[
                    {
                        required: false,
                    }
                ]}>
                    <Colorpicker format="rgb" />
                </Form.Item>
                <Form.Item label={i18n.t("bgColor")} name={"lineButtonBgColor" } rules={[
                    {
                        required: false,
                    }
                ]}>
                    <Colorpicker format="rgb" />
                </Form.Item>
                <Form.Item label={i18n.t("outerBorderColor")} name={"lineButtonOuterBorderColor" } rules={[
                    {
                        required: false,
                    }
                ]}>
                    <Colorpicker format="rgb" />
                </Form.Item>
                <Form.Item  label={i18n.t("outerBorderRadius")} name={"lineButtonOuterBorderRadius"}  rules={[
                    {
                        required: false,
                    },
                ]}>
                    <InputNumber min="0" />
                </Form.Item>
                <Form.Item  label={i18n.t("outerBorderThickness")} name={"lineButtonOuterBorderThickness"  } rules={[
                    {
                        required: false,
                    },
                ]}>
                    <InputNumber min="1" />
                </Form.Item>


                <divider>{i18n.t("transferButtonSettings")}</divider>

                <Form.Item label={i18n.t("width")} name="transferButtonWidth" rules={[
                    {
                        required: false,
                    },
                ]}>
                    <InputNumber min="1"  />
                </Form.Item>
                <Form.Item label={i18n.t("height")} name="transferButtonHeight" rules={[
                    {
                        required: false,
                    },
                ]}>
                    <InputNumber min="1"  />
                </Form.Item>
                <Form.Item label={i18n.t("fgColor")} name={"transferButtonFgColor" } rules={[
                    {
                        required: false,
                    }
                ]}>
                    <Colorpicker format="rgb" />
                </Form.Item>
                <Form.Item label={i18n.t("bgColor")} name={"transferButtonBgColor" } rules={[
                    {
                        required: false,
                    }
                ]}>
                    <Colorpicker format="rgb" />
                </Form.Item>
                <Form.Item label={i18n.t("outerBorderColor")} name={"transferButtonOuterBorderColor" } rules={[
                    {
                        required: false,
                    }
                ]}>
                    <Colorpicker format="rgb" />
                </Form.Item>
                <Form.Item  label={i18n.t("outerBorderRadius")} name={"transferButtonOuterBorderRadius"}  rules={[
                    {
                        required: false,
                    },
                ]}>
                    <InputNumber min="0" />
                </Form.Item>
                <Form.Item  label={i18n.t("outerBorderThickness")} name={"transferButtonOuterBorderThickness"  } rules={[
                    {
                        required: false,
                    },
                ]}>
                    <InputNumber min="1" />
                </Form.Item>


                <divider>{i18n.t("transferCancelButtonSettings")}</divider>
                <Form.Item label={i18n.t("width")} name="transferCancelButtonWidth" rules={[
                    {
                        required: false,
                    },
                ]}>
                    <InputNumber min="1"  />
                </Form.Item>
                <Form.Item label={i18n.t("height")} name="transferCancelButtonHeight" rules={[
                    {
                        required: false,
                    },
                ]}>
                    <InputNumber min="1"  />
                </Form.Item>
                <Form.Item label={i18n.t("fgColor")} name={"transferCancelButtonFgColor" } rules={[
                    {
                        required: false,
                    }
                ]}>
                    <Colorpicker format="rgb" />
                </Form.Item>
                <Form.Item label={i18n.t("bgColor")} name={"transferCancelButtonBgColor" } rules={[
                    {
                        required: false,
                    }
                ]}>
                    <Colorpicker format="rgb" />
                </Form.Item>
                <Form.Item label={i18n.t("outerBorderColor")} name={"transferCancelButtonOuterBorderColor" } rules={[
                    {
                        required: false,
                    }
                ]}>
                    <Colorpicker format="rgb" />
                </Form.Item>
                <Form.Item  label={i18n.t("outerBorderRadius")} name={"transferCancelButtonOuterBorderRadius"}  rules={[
                    {
                        required: false,
                    },
                ]}>
                    <InputNumber min="0" />
                </Form.Item>
                <Form.Item  label={i18n.t("outerBorderThickness")} name={"transferCancelButtonOuterBorderThickness"  } rules={[
                    {
                        required: false,
                    },
                ]}>
                    <InputNumber min="1" />
                </Form.Item>

            </Form>
        )
    }
}