import React from "react";
import Util from "./Util";
import i18n from "./i18n";
import debounce from "debounce";
import Form from "antd/lib/form";
import {Colorpicker} from "antd-colorpicker";
import InputNumber from "antd/lib/input-number";
import {Divider} from "antd";

export default class CallTableSettings extends React.Component {
    constructor(props) {
        super(props);
        this.formRef = React.createRef();
        this._operatorConsoleAsParent = props.operatorConsoleAsParent;
        this.onChangeDebounced = () => {
            const values = this.formRef.current.getFieldsValue();
            CallTableSettings._copyFromValuesFrom( values, this.props.widget  );    //!bad
            this._operatorConsoleAsParent.updateSelectingWidgetSettings( this.props.widget );
        };
        const added = this._operatorConsoleAsParent.addOnBeginSaveEditingScreenFunctionIfNotExists( CallTableSettings._OnBeginSaveEditingScreenFunction );
    }

    static _copyFromValuesFrom( src, dst ){
        dst.calltableBgColor = src.calltableBgColor;
        dst.calltableHeaderRowUnderlineThickness = src.calltableHeaderRowUnderlineThickness;
        dst.calltableHeaderRowUnderlineColor = src.calltableHeaderRowUnderlineColor;
        dst.calltableBodyRowUnderlineThickness = src.calltableBodyRowUnderlineThickness;
        dst.calltableBodyRowUnderlineColor = src.calltableBodyRowUnderlineColor;
        dst.calltableOuterBorderThickness = src.calltableOuterBorderThickness;
        dst.calltableOuterBorderColor = src.calltableOuterBorderColor;
        dst.calltableOuterBorderRadius = src.calltableOuterBorderRadius;

        dst.calltableHeaderFgColor = src.calltableHeaderFgColor;
        dst.calltableHeaderBgColor = src.calltableHeaderBgColor;
        dst.calltableBodyFgColor = src.calltableBodyFgColor;
        dst.calltableBodyBgColor = src.calltableBodyBgColor;
        dst.calltableBodyActiveRowBgColor = src.calltableBodyActiveRowBgColor;
        //!modify
    }

    static validateAndFormatWidget( calltableWidget ) {

        if( calltableWidget.calltableBgColor && Util.isAntdRgbaProperty( calltableWidget.calltableBgColor ) !== true  ){
                return i18n.t("bgColor_is_not_valid");
        }

        if ( calltableWidget.calltableOuterBorderThickness && Util.isNumber( calltableWidget.calltableOuterBorderThickness ) !== true  ) {
            return i18n.t("outerBorderThickness_is_not_valid");
        }

        if( calltableWidget.calltableOuterBorderColor && Util.isAntdRgbaProperty( calltableWidget.calltableOuterBorderColor ) !== true ) {
            return i18n.t("outerBorderColor_is_not_valid");
        }

        if ( calltableWidget.calltableOuterBorderRadius && Util.isNumber( calltableWidget.calltableOuterBorderRadius ) !== true  ) {
            return i18n.t("outerBorderRadius_is_not_valid");
        }

        if( calltableWidget.calltableHeaderFgColor && Util.isAntdRgbaProperty( calltableWidget.calltableHeaderFgColor ) !== true ) {
                return i18n.t("header_fgColor_is_not_valid");
        }

        if ( calltableWidget.calltableHeaderRowUnderlineThickness && Util.isNumber( calltableWidget.calltableHeaderRowUnderlineThickness ) !== true  ) {
            return i18n.t("header_rowUnderlineThickness_is_not_valid");
        }

        if( calltableWidget.calltableHeaderRowUnderlineColor && Util.isAntdRgbaProperty( calltableWidget.calltableHeaderRowUnderlineColor ) !== true ) {
            return i18n.t("header_rowUnderlineColor_is_not_valid");
        }


        // if( calltableWidget.calltableHeaderBgColor && Util.isAntdRgbaProperty( calltableWidget.calltableHeaderBgColor ) !== true  ){
        //         return i18n.t("header_bgColor_is_not_valid");
        // }

        if( calltableWidget.calltableBodyFgColor && Util.isAntdRgbaProperty( calltableWidget.calltableHeaderFgColor ) !== true ) {
            return i18n.t("body_fgColor_is_not_valid");
        }

        if ( calltableWidget.calltableBodyRowUnderlineThickness && Util.isNumber( calltableWidget.calltableBodyRowUnderlineThickness ) !== true  ) {
            return i18n.t("body_rowUnderlineThickness_is_not_valid");
        }

        if( calltableWidget.calltableBodyRowUnderlineColor && Util.isAntdRgbaProperty( calltableWidget.calltableBodyRowUnderlineColor ) !== true ) {
            return i18n.t("body_rowUnderlineColor_is_not_valid");
        }

        // if( calltableWidget.calltableBodyBgColor && Util.isAntdRgbaProperty( calltableWidget.calltableBodyBgColor ) !== true  ){
        //     return i18n.t("body_bgColor_is_not_valid");
        // }

        if( calltableWidget.calltableBodyActiveRowBgColor && Util.isAntdRgbaProperty( calltableWidget.calltableBodyActiveRowBgColor ) !== true  ){
            return i18n.t("body_activeRowBgColor_is_not_valid");
        }

        return null;
    }

    static _OnBeginSaveEditingScreenFunction( operatorConsoleAsCaller ){
        const widgets = operatorConsoleAsCaller.getEditingWidgets();
        for( let i = 0; i < widgets.length; i++ ) {
            const w = widgets[i];
            if (w.type !== "CallTable") {
                continue;
            }
            const msg = CallTableSettings.validateAndFormatWidget( w );
            if( msg ){
                operatorConsoleAsCaller.selectWidget(i);
                return msg;
            }
        }
        return null;
    }

    componentDidUpdate(prevProps) {
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

        return (
            <Form ref={this.formRef} layout="vertical" initialValues={this.props.widget} onValuesChange={this.onChangeDebounced}>
                <Form.Item label={i18n.t("bgColor")} name={`calltableBgColor`} rules={[
                    {
                        required: false,
                    }
                ]}>
                    <Colorpicker format="rgb" />
                </Form.Item>

                <Form.Item label={i18n.t("outerBorderThickness")} name="calltableOuterBorderThickness" rules={[
                    {
                        required: false,
                    },
                ]}>
                    <InputNumber min="0" />
                </Form.Item>
                <Form.Item label={i18n.t("outerBorderColor")} name={`calltableOuterBorderColor`} rules={[
                    {
                        required: false,
                    }
                ]}>
                    <Colorpicker format="rgb" />
                </Form.Item>
                <Form.Item label={i18n.t("outerBorderRadius")} name="calltableOuterBorderRadius" rules={[
                    {
                        required: false,
                    },
                ]}>
                    <InputNumber min="0" />
                </Form.Item>
                <Divider>{i18n.t("header_settings")}</Divider>
                <Form.Item label={i18n.t("fgColor")} name={`calltableHeaderFgColor`} rules={[
                    {
                        required: false,
                    }
                ]}>
                    <Colorpicker format="rgb" />
                </Form.Item>

                <Form.Item label={i18n.t("rowUnderlineThickness")} name="calltableHeaderRowUnderlineThickness" rules={[
                    {
                        required: false,
                    },
                ]}>
                    <InputNumber min="0" />
                </Form.Item>
                <Form.Item label={i18n.t("rowUnderlineColor")} name={`calltableHeaderRowUnderlineColor`} rules={[
                    {
                        required: false,
                    }
                ]}>
                    <Colorpicker format="rgb" />
                </Form.Item>

                {/*<Form.Item label={i18n.t("bgColor")} name={`calltableHeaderBgColor`} rules={[*/}
                {/*    {*/}
                {/*        required: false,*/}
                {/*    }*/}
                {/*]}>*/}
                {/*    <Colorpicker format="rgb" />*/}
                {/*</Form.Item>*/}
                <Divider>{i18n.t("body_settings")}</Divider>
                <Form.Item label={i18n.t("fgColor")} name={`calltableBodyFgColor`} rules={[
                    {
                        required: false,
                    }
                ]}>
                    <Colorpicker format="rgb" />
                </Form.Item>

                <Form.Item label={i18n.t("rowUnderlineThickness")} name="calltableBodyRowUnderlineThickness" rules={[
                    {
                        required: false,
                    },
                ]}>
                    <InputNumber min="0" />
                </Form.Item>
                <Form.Item label={i18n.t("rowUnderlineColor")} name={`calltableBodyRowUnderlineColor`} rules={[
                    {
                        required: false,
                    }
                ]}>
                    <Colorpicker format="rgb" />
                </Form.Item>

                {/*<Form.Item label={i18n.t("bgColor")} name={`calltableBodyBgColor`} rules={[*/}
                {/*    {*/}
                {/*        required: false,*/}
                {/*    }*/}
                {/*]}>*/}
                {/*    <Colorpicker format="rgb" />*/}
                {/*</Form.Item>*/}
                <Form.Item label={i18n.t("activeRowBgColor")} name={`calltableBodyActiveRowBgColor`} rules={[
                    {
                        required: false,
                    }
                ]}>
                    <Colorpicker format="rgb" />
                </Form.Item>
            </Form>
        )
    }
}