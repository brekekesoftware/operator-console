import React from "react";
import Util from "./Util";
import i18n from "./i18n";
import debounce from "debounce";
import Form from "antd/lib/form";
import {Colorpicker} from "antd-colorpicker";
import InputNumber from "antd/lib/input-number";
import {Divider} from "antd";

export default class ExtensionTableSettings extends React.Component {
    constructor(props) {
        super(props);
        this.formRef = React.createRef();
        this._operatorConsoleAsParent = props.operatorConsoleAsParent;
        this.onChangeDebounced = () => {
            const values = this.formRef.current.getFieldsValue();
            ExtensionTableSettings._copyFromValuesFrom( values, this.props.widget  );    //!bad
            this._operatorConsoleAsParent.updateSelectingWidgetSettings( this.props.widget );
        };
        const added = this._operatorConsoleAsParent.addOnBeginSaveEditingScreenFunctionIfNotExists( ExtensionTableSettings._OnBeginSaveEditingScreenFunction );
    }

    static _copyFromValuesFrom( src, dst ){
        dst.extensiontableBgColor = src.extensiontableBgColor;
        dst.extensiontableHeaderRowUnderlineThickness = src.extensiontableHeaderRowUnderlineThickness;
        dst.extensiontableHeaderRowUnderlineColor = src.extensiontableHeaderRowUnderlineColor;
        dst.extensiontableBodyRowUnderlineThickness = src.extensiontableBodyRowUnderlineThickness;
        dst.extensiontableBodyRowUnderlineColor = src.extensiontableBodyRowUnderlineColor;
        dst.extensiontableOuterBorderThickness = src.extensiontableOuterBorderThickness;
        dst.extensiontableOuterBorderColor = src.extensiontableOuterBorderColor;
        dst.extensiontableOuterBorderRadius = src.extensiontableOuterBorderRadius;

        dst.extensiontableHeaderFgColor = src.extensiontableHeaderFgColor;
        dst.extensiontableHeaderBgColor = src.extensiontableHeaderBgColor;
        dst.extensiontableBodyFgColor = src.extensiontableBodyFgColor;
        dst.extensiontableBodyBgColor = src.extensiontableBodyBgColor;
        //dst.extensiontableBodyActiveRowBgColor = src.extensiontableBodyActiveRowBgColor;
        //!modify
    }

    static validateAndFormatWidget( extensiontableWidget ) {

        if( extensiontableWidget.extensiontableBgColor && Util.isAntdRgbaProperty( extensiontableWidget.extensiontableBgColor ) !== true  ){
            return i18n.t("bgColor_is_not_valid");
        }

        if ( extensiontableWidget.extensiontableOuterBorderThickness && Util.isNumber( extensiontableWidget.extensiontableOuterBorderThickness ) !== true  ) {
            return i18n.t("outerBorderThickness_is_not_valid");
        }

        if( extensiontableWidget.extensiontableOuterBorderColor && Util.isAntdRgbaProperty( extensiontableWidget.extensiontableOuterBorderColor ) !== true ) {
            return i18n.t("outerBorderColor_is_not_valid");
        }

        if ( extensiontableWidget.extensiontableOuterBorderRadius && Util.isNumber( extensiontableWidget.extensiontableOuterBorderRadius ) !== true  ) {
            return i18n.t("outerBorderRadius_is_not_valid");
        }

        if( extensiontableWidget.extensiontableHeaderFgColor && Util.isAntdRgbaProperty( extensiontableWidget.extensiontableHeaderFgColor ) !== true ) {
            return i18n.t("header_fgColor_is_not_valid");
        }

        if ( extensiontableWidget.extensiontableHeaderRowUnderlineThickness && Util.isNumber( extensiontableWidget.extensiontableHeaderRowUnderlineThickness ) !== true  ) {
            return i18n.t("header_rowUnderlineThickness_is_not_valid");
        }

        if( extensiontableWidget.extensiontableHeaderRowUnderlineColor && Util.isAntdRgbaProperty( extensiontableWidget.extensiontableHeaderRowUnderlineColor ) !== true ) {
            return i18n.t("header_rowUnderlineColor_is_not_valid");
        }


        // if( extensiontableWidget.extensiontableHeaderBgColor && Util.isAntdRgbaProperty( extensiontableWidget.extensiontableHeaderBgColor ) !== true  ){
        //         return i18n.t("header_bgColor_is_not_valid");
        // }

        if( extensiontableWidget.extensiontableBodyFgColor && Util.isAntdRgbaProperty( extensiontableWidget.extensiontableHeaderFgColor ) !== true ) {
            return i18n.t("body_fgColor_is_not_valid");
        }

        if ( extensiontableWidget.extensiontableBodyRowUnderlineThickness && Util.isNumber( extensiontableWidget.extensiontableBodyRowUnderlineThickness ) !== true  ) {
            return i18n.t("body_rowUnderlineThickness_is_not_valid");
        }

        if( extensiontableWidget.extensiontableBodyRowUnderlineColor && Util.isAntdRgbaProperty( extensiontableWidget.extensiontableBodyRowUnderlineColor ) !== true ) {
            return i18n.t("body_rowUnderlineColor_is_not_valid");
        }

        // if( extensiontableWidget.extensiontableBodyBgColor && Util.isAntdRgbaProperty( extensiontableWidget.extensiontableBodyBgColor ) !== true  ){
        //     return i18n.t("body_bgColor_is_not_valid");
        // }

        // if( extensiontableWidget.extensiontableBodyActiveRowBgColor && Util.isAntdRgbaProperty( extensiontableWidget.extensiontableBodyActiveRowBgColor ) !== true  ){
        //     return i18n.t("body_activeRowBgColor_is_not_valid");
        // }

        return null;
    }

    static _OnBeginSaveEditingScreenFunction( operatorConsoleAsCaller ){
        const widgets = operatorConsoleAsCaller.getEditingWidgets();
        for( let i = 0; i < widgets.length; i++ ) {
            const w = widgets[i];
            if (w.type !== "ExtensionTable") {
                continue;
            }
            const msg = ExtensionTableSettings.validateAndFormatWidget( w );
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
                <Form.Item label={i18n.t("bgColor")} name={`extensiontableBgColor`} rules={[
                    {
                        required: false,
                    }
                ]}>
                    <Colorpicker format="rgb" />
                </Form.Item>

                <Form.Item label={i18n.t("outerBorderThickness")} name="extensiontableOuterBorderThickness" rules={[
                    {
                        required: false,
                    },
                ]}>
                    <InputNumber min="0" />
                </Form.Item>
                <Form.Item label={i18n.t("outerBorderColor")} name={`extensiontableOuterBorderColor`} rules={[
                    {
                        required: false,
                    }
                ]}>
                    <Colorpicker format="rgb" />
                </Form.Item>
                <Form.Item label={i18n.t("outerBorderRadius")} name="extensiontableOuterBorderRadius" rules={[
                    {
                        required: false,
                    },
                ]}>
                    <InputNumber min="0" />
                </Form.Item>
                <Divider>{i18n.t("header_settings")}</Divider>
                <Form.Item label={i18n.t("fgColor")} name={`extensiontableHeaderFgColor`} rules={[
                    {
                        required: false,
                    }
                ]}>
                    <Colorpicker format="rgb" />
                </Form.Item>

                <Form.Item label={i18n.t("rowUnderlineThickness")} name="extensiontableHeaderRowUnderlineThickness" rules={[
                    {
                        required: false,
                    },
                ]}>
                    <InputNumber min="0" />
                </Form.Item>
                <Form.Item label={i18n.t("rowUnderlineColor")} name={`extensiontableHeaderRowUnderlineColor`} rules={[
                    {
                        required: false,
                    }
                ]}>
                    <Colorpicker format="rgb" />
                </Form.Item>

                {/*<Form.Item label={i18n.t("bgColor")} name={`extensiontableHeaderBgColor`} rules={[*/}
                {/*    {*/}
                {/*        required: false,*/}
                {/*    }*/}
                {/*]}>*/}
                {/*    <Colorpicker format="rgb" />*/}
                {/*</Form.Item>*/}
                <Divider>{i18n.t("body_settings")}</Divider>
                <Form.Item label={i18n.t("fgColor")} name={`extensiontableBodyFgColor`} rules={[
                    {
                        required: false,
                    }
                ]}>
                    <Colorpicker format="rgb" />
                </Form.Item>

                <Form.Item label={i18n.t("rowUnderlineThickness")} name="extensiontableBodyRowUnderlineThickness" rules={[
                    {
                        required: false,
                    },
                ]}>
                    <InputNumber min="0" />
                </Form.Item>
                <Form.Item label={i18n.t("rowUnderlineColor")} name={`extensiontableBodyRowUnderlineColor`} rules={[
                    {
                        required: false,
                    }
                ]}>
                    <Colorpicker format="rgb" />
                </Form.Item>

                {/*<Form.Item label={i18n.t("bgColor")} name={`extensiontableBodyBgColor`} rules={[*/}
                {/*    {*/}
                {/*        required: false,*/}
                {/*    }*/}
                {/*]}>*/}
                {/*    <Colorpicker format="rgb" />*/}
                {/*</Form.Item>*/}

                {/*<Form.Item label={i18n.t("activeRowBgColor")} name={`extensiontableBodyActiveRowBgColor`} rules={[*/}
                {/*    {*/}
                {/*        required: false,*/}
                {/*    }*/}
                {/*]}>*/}
                {/*    <Colorpicker format="rgb" />*/}
                {/*</Form.Item>*/}
            </Form>
        )
    }
}