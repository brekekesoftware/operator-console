import React from 'react'
import debounce from "debounce";
import Form from "antd/lib/form";
import i18n from "./i18n";
import Input from "antd/lib/input";
import InputNumber from "antd/lib/input-number";
import { Colorpicker  } from 'antd-colorpicker';
import {Divider} from "antd";
import Util from "./Util";

export default class LegacyCallInfoSettings extends React.Component {
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
            LegacyCallInfoSettings._copyFromValuesFrom( values, this.props.widget  );    //!bad
            this._operatorConsoleAsParent.updateSelectingWidgetSettings( this.props.widget );
            //this._checkInput( this.formRef.current.getFieldsValue() );
        };
        //this._operatorConsoleAsParent.setState( {isSaveEditingScreenButtonDisabled : true } );
        const added = this._operatorConsoleAsParent.addOnBeginSaveEditingScreenFunctionIfNotExists( LegacyCallInfoSettings._OnBeginSaveEditingScreenFunction );
        //const thisEditingWidget = this._operatorConsoleAsParent.getEditingWidget();
        //thisEditingWidget.OnDeselectEditingWidget = this.OnDeselectEditingWidget.bind(this);
        //thisEditingWidget.OnRemovingWidget = this.OnRemovingWidget.bind(this);
    }

    static _copyFromValuesFrom( src, dst ){
        dst.callpanelFgColor = src.callpanelFgColor;
        dst.callpanelBgColor = src.callpanelBgColor;
        dst.borderRadius = src.borderRadius;
        dst.outsideShadow_horizontalOffset = src.outsideShadow_horizontalOffset;
        dst.outsideShadow_verticalOffset = src.outsideShadow_verticalOffset;
        dst.outsideShadow_blur = src.outsideShadow_blur;
        dst.outsideShadow_spread = src.outsideShadow_spread;
        dst.outsideShadow_color = src.outsideShadow_color;
        dst.insideShadow_horizontalOffset = src.insideShadow_horizontalOffset;
        dst.insideShadow_verticalOffset = src.insideShadow_verticalOffset;
        dst.insideShadow_blur = src.insideShadow_blur;
        dst.insideShadow_spread = src.insideShadow_spread;
        dst.insideShadow_color = src.insideShadow_color;

        //!modify
    }

    static validateAndFormatWidget( callpanelWidget ) {

        if( callpanelWidget.callpanelFgColor && Util.isAntdRgbaProperty( callpanelWidget.callpanelFgColor ) !== true ) {
            //!for old version
            if (Util.isHex6(callpanelWidget.callpanelFgColor)) {
                callpanelWidget.callpanelFgColor = Util.getAntdRgbColorFromHex6( callpanelWidget.callpanelFgColor );
            } else {
                return i18n.t("fgColor_is_not_valid");
            }
        }

        if( callpanelWidget.callpanelBgColor && Util.isAntdRgbaProperty( callpanelWidget.callpanelBgColor ) !== true  ){
            //!for old version
            if (Util.isHex6(callpanelWidget.callpanelBgColor)) {
                callpanelWidget.callpanelBgColor = Util.getAntdRgbColorFromHex6( callpanelWidget.callpanelBgColor );
            } else {
                return i18n.t("bgColor_is_not_valid");
            }
        }

        if ( callpanelWidget.borderRadius && Util.isNumber( callpanelWidget.borderRadius ) !== true  ) {
            return i18n.t("borderRadius_is_not_valid");
        }

        if( callpanelWidget.insideShadow_horizontalOffset && Util.isNumber( callpanelWidget.insideShadow_horizontalOffset) !== true ){
            return i18n.t("insideShadow_horizontalOffset_is_not_valid");
        }

        if( callpanelWidget.insideShadow_verticalOffset && Util.isNumber( callpanelWidget.insideShadow_verticalOffset) !== true ){
            return i18n.t("insideShadow_verticalOffset_is_not_valid");
        }

        if( callpanelWidget.insideShadow_blur && Util.isNumber( callpanelWidget.insideShadow_blur) !== true ){
            return i18n.t("insideShadow_blur_is_not_valid");
        }

        if( callpanelWidget.insideShadow_spread && Util.isNumber( callpanelWidget.insideShadow_spread ) !== true ){
            return i18n.t("insideShadow_spread_is_not_valid");
        }

        if( callpanelWidget.insideShadow_color && Util.isAntdRgbaProperty( callpanelWidget.insideShadow_color ) !== true  ) {
            return i18n.t("insideShadow_color_is_not_valid");
        }

        if( callpanelWidget.outsideShadow_horizontalOffset && Util.isNumber( callpanelWidget.outsideShadow_horizontalOffset) !== true ){
            return i18n.t("outsideShadow_horizontalOffset_is_not_valid");
        }

        if( callpanelWidget.outsideShadow_verticalOffset && Util.isNumber( callpanelWidget.outsideShadow_verticalOffset) !== true ){
            return i18n.t("outsideShadow_verticalOffset_is_not_valid");
        }

        if( callpanelWidget.outsideShadow_blur && Util.isNumber( callpanelWidget.outsideShadow_blur) !== true ){
            return i18n.t("outsideShadow_blur_is_not_valid");
        }

        if( callpanelWidget.outsideShadow_spread && Util.isNumber( callpanelWidget.outsideShadow_spread ) !== true ){
            return i18n.t("outsideShadow_spread_is_not_valid");
        }

        if( callpanelWidget.outsideShadow_color && Util.isAntdRgbaProperty( callpanelWidget.outsideShadow_color ) !== true  ){
            return i18n.t("outsideShadow_color_is_not_valid");
        }

        return null;
    }

    static _OnBeginSaveEditingScreenFunction( operatorConsoleAsCaller ){
        const widgets = operatorConsoleAsCaller.getEditingWidgets();
        for( let i = 0; i < widgets.length; i++ ) {
            const w = widgets[i];
            if (w.type !== "LegacyCallInfo") {
                continue;
            }
            const msg = LegacyCallInfoSettings.validateAndFormatWidget( w );
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
        let key = -1;

        return (
            <Form ref={this.formRef} layout="vertical" initialValues={this.props.widget} onValuesChange={this.onChangeDebounced}>
                <Form.Item label={i18n.t("fgColor")} name={`callpanelFgColor`} rules={[
                    {
                        required: false,
                    }
                ]}>
                    <Colorpicker format="rgb" />
                </Form.Item>
                <Form.Item label={i18n.t("bgColor")} name={`callpanelBgColor`} rules={[
                    {
                        required: false,
                    }
                ]}>
                    <Colorpicker format="rgb" />
                </Form.Item>
                <Form.Item key={key++}  label={i18n.t("borderRadius")} name="borderRadius" rules={[
                    {
                        required: false,
                    },
                ]}>
                    <InputNumber min="0" />
                </Form.Item>
                <Divider>{i18n.t("insideShadow_settings")}</Divider>
                <Form.Item key={key++} label={i18n.t("horizontalOffset")} name="insideShadow_horizontalOffset" rules={[
                    {
                        required: false,
                    },
                ]}>
                    <InputNumber  step={1} />
                </Form.Item>
                <Form.Item key={key++}  label={i18n.t("verticalOffset")} name="insideShadow_verticalOffset" rules={[
                    {
                        required: false,
                    },
                ]}>
                    <InputNumber  step={1} />
                </Form.Item>
                <Form.Item key={key++} label={i18n.t("blur")} name="insideShadow_blur" rules={[
                    {
                        required: false,
                    },
                ]}>
                    <InputNumber  step={1} />
                </Form.Item>
                <Form.Item key={key++} label={i18n.t("spread")} name="insideShadow_spread" rules={[
                    {
                        required: false
                    },
                ]}>
                    <InputNumber  step={1} />
                </Form.Item>
                <Form.Item key={key++} label={i18n.t("color")} name="insideShadow_color" rules={[
                    {
                        required: false,
                    },
                ]}>
                    <Colorpicker format="rgb" />
                </Form.Item>
                <Divider>{i18n.t("outsideShadow_settings")}</Divider>
                <Form.Item key={key++} label={i18n.t("horizontalOffset")} name="outsideShadow_horizontalOffset" rules={[
                    {
                        required: false,
                    },
                ]}>
                    <InputNumber  step={1} />
                </Form.Item>
                <Form.Item key={key++}  label={i18n.t("verticalOffset")} name="outsideShadow_verticalOffset" rules={[
                    {
                        required: false,
                    },
                ]}>
                    <InputNumber  step={1} />
                </Form.Item>
                <Form.Item key={key++} label={i18n.t("blur")} name="outsideShadow_blur" rules={[
                    {
                        required: false,
                    },
                ]}>
                    <InputNumber  step={1} />
                </Form.Item>
                <Form.Item key={key++} label={i18n.t("spread")} name="outsideShadow_spread" rules={[
                    {
                        required: false,
                    },
                ]}>
                    <InputNumber  step={1} />
                </Form.Item>
                <Form.Item key={key++} label={i18n.t("color")} name="outsideShadow_color" rules={[
                    {
                        required: false,
                    },
                ]}>
                    <Colorpicker format="rgb" />
                </Form.Item>
            </Form>
        )
    }
}