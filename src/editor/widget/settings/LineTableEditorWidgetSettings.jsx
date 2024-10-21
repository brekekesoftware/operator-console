import React from 'react';
import EditorWidgetSettings from "./EditorWidgetSettings";
import i18n from "../../../i18n";
import {Divider, Input} from "antd";
import InputNumber from "antd/lib/input-number";
import Form from "antd/lib/form";
import {Colorpicker} from "antd-colorpicker";

const MAX_LINE_COUNT = 300;

export default class LineTableEditorWidgetSettings extends EditorWidgetSettings {
    constructor( props ) {
        super( props );
    }

    // componentDidUpdate(){
    //     super.componentDidUpdate();
    //     const widgetData = this._getWidgetData();
    //     if( this._latestWidgetData !== widgetData  ){
    //
    //     }
    //     this._latestWidgetData = widgetData;
    // }

    _onChangeResourceName( e, lineDataIndex ){
        const widgetData = this._getWidgetData();
        const lineDataArray = widgetData.getLineDataArray();
        const lineData = lineDataArray[ lineDataIndex ];
        const resourceName  = e.currentTarget.value;
        lineData.setResourceName( resourceName  );
        this.getEditScreenViewAsParent().setState({rerender:true});
    }

    _onChangeLineLabel( e, lineDataIndex ){
        const widgetData = this._getWidgetData();
        const lineDataArray = widgetData.getLineDataArray();
        const lineData = lineDataArray[ lineDataIndex ];
        const lineLabel = e.currentTarget.value;
        lineData.setLineLabel( lineLabel  );
        this.getEditScreenViewAsParent().setState({rerender:true});
    }

    _onChangeLineCount( lineCount ){
        const widgetData = this._getWidgetData();
        //const lineCount = e.currentTarget.value;
        widgetData.setLineDataArrayCount( lineCount );
        this.getEditScreenViewAsParent().setState({rerender:true});
    }

    _onChangeLinetableBgColor( color ){
        const widgetData = this._getWidgetData();
        widgetData.setLinetableBgColor(color);
        this._EditScreenViewAsParent.setState({rerender:true});
    }

    _onChangeLinetableOuterBorderThickness( n ){
        const widgetData = this._getWidgetData();
        widgetData.setLinetableOuterBorderThickness(n);
        this._EditScreenViewAsParent.setState({rerender:true});
    }

    _onChangeLinetableOuterBorderColor( color ){
        const widgetData = this._getWidgetData();
        widgetData.setLinetableOuterBorderColor(color);
        this._EditScreenViewAsParent.setState({rerender:true});
    }

    _onChangeLinetableOuterBorderRadius( n ){
        const widgetData = this._getWidgetData();
        widgetData.setLinetableOuterBorderRadius(n);
        this._EditScreenViewAsParent.setState({rerender:true});
    }

    _onChangeLinetableHeaderFgColor( color ){
        const widgetData = this._getWidgetData();
        widgetData.setLinetableHeaderFgColor(color);
        this._EditScreenViewAsParent.setState({rerender:true});
    }

    _onChangeLinetableHeaderRowUnderlineThickness( n ){
        const widgetData = this._getWidgetData();
        widgetData.setLinetableHeaderRowUnderlineThickness(n);
        this._EditScreenViewAsParent.setState({rerender:true});
    }

    _onChangeLinetableHeaderRowUnderlineColor( color ){
        const widgetData = this._getWidgetData();
        widgetData.setLinetableHeaderRowUnderlineColor(color);
        this._EditScreenViewAsParent.setState({rerender:true});
    }

    _onChangeLinetableBodyFgColor( color ){
        const widgetData = this._getWidgetData();
        widgetData.setLinetableBodyFgColor(color);
        this._EditScreenViewAsParent.setState({rerender:true});
    }

    _onChangeLinetableBodyRowUnderlineThickness( n ){
        const widgetData = this._getWidgetData();
        widgetData.setLinetableBodyRowUnderlineThickness(n);
        this._EditScreenViewAsParent.setState({rerender:true});
    }

    _onChangeLinetableBodyRowUnderlineColor( color ){
        const widgetData = this._getWidgetData();
        widgetData.setLinetableBodyRowUnderlineColor(color);
        this._EditScreenViewAsParent.setState({rerender:true});
    }

    _onChangeLineButtonWidth( n ){
        const widgetData = this._getWidgetData();
        widgetData.setLineButtonWidth(n);
        this._EditScreenViewAsParent.setState({rerender:true});
    }

    _onChangeLineButtonHeight( n ){
        const widgetData = this._getWidgetData();
        widgetData.setLineButtonHeight(n);
        this._EditScreenViewAsParent.setState({rerender:true});
    }

    _onChangeLineButtonFgColor( color ){
        const widgetData = this._getWidgetData();
        widgetData.setLineButtonFgColor(color);
        this._EditScreenViewAsParent.setState({rerender:true});
    }

    _onChangeLineButtonBgColor( color ){
        const widgetData = this._getWidgetData();
        widgetData.setLineButtonBgColor(color);
        this._EditScreenViewAsParent.setState({rerender:true});
    }

    _onChangeLineButtonOuterBorderColor( color ){
        const widgetData = this._getWidgetData();
        widgetData.setLineButtonOuterBorderColor(color);
        this._EditScreenViewAsParent.setState({rerender:true});
    }

    _onChangeLineButtonOuterBorderRadius( n ){
        const widgetData = this._getWidgetData();
        widgetData.setLineButtonOuterBorderRadius(n);
        this._EditScreenViewAsParent.setState({rerender:true});
    }

    _onChangeLineButtonOuterBorderThickness( n ){
        const widgetData = this._getWidgetData();
        widgetData.setLineButtonOuterBorderThickness(n);
        this._EditScreenViewAsParent.setState({rerender:true});
    }

    _onChangeTransferButtonWidth( n ){
        const widgetData = this._getWidgetData();
        widgetData.setTransferButtonWidth(n);
        this._EditScreenViewAsParent.setState({rerender:true});
    }

    _onChangeTransferButtonHeight( n ){
        const widgetData = this._getWidgetData();
        widgetData.setTransferButtonHeight(n);
        this._EditScreenViewAsParent.setState({rerender:true});
    }

    _onChangeTransferButtonFgColor( color ){
        const widgetData = this._getWidgetData();
        widgetData.setTransferButtonFgColor(color);
        this._EditScreenViewAsParent.setState({rerender:true});
    }

    _onChangeTransferButtonBgColor( color ){
        const widgetData = this._getWidgetData();
        widgetData.setTransferButtonBgColor(color);
        this._EditScreenViewAsParent.setState({rerender:true});
    }

    _onChangeTransferButtonOuterBorderColor( color ){
        const widgetData = this._getWidgetData();
        widgetData.setTransferButtonOuterBorderColor(color);
        this._EditScreenViewAsParent.setState({rerender:true});
    }

    _onChangeTransferButtonOuterBorderRadius( n ){
        const widgetData = this._getWidgetData();
        widgetData.setTransferButtonOuterBorderRadius(n);
        this._EditScreenViewAsParent.setState({rerender:true});
    }

    _onChangeTransferButtonOuterBorderThickness( n ){
        const widgetData = this._getWidgetData();
        widgetData.setTransferButtonOuterBorderThickness(n);
        this._EditScreenViewAsParent.setState({rerender:true});
    }

    _onChangeTransferCancelButtonWidth( n ){
        const widgetData = this._getWidgetData();
        widgetData.setTransferCancelButtonWidth(n);
        this._EditScreenViewAsParent.setState({rerender:true});
    }

    _onChangeTransferCancelButtonHeight( n ){
        const widgetData = this._getWidgetData();
        widgetData.setTransferCancelButtonHeight(n);
        this._EditScreenViewAsParent.setState({rerender:true});
    }

    _onChangeTransferCancelButtonFgColor( color ){
        const widgetData = this._getWidgetData();
        widgetData.setTransferCancelButtonFgColor(color);
        this._EditScreenViewAsParent.setState({rerender:true});
    }

    _onChangeTransferCancelButtonBgColor( color ){
        const widgetData = this._getWidgetData();
        widgetData.setTransferCancelButtonBgColor(color);
        this._EditScreenViewAsParent.setState({rerender:true});
    }

    _onChangeTransferCancelButtonOuterBorderColor( color ){
        const widgetData = this._getWidgetData();
        widgetData.setTransferCancelButtonOuterBorderColor(color);
        this._EditScreenViewAsParent.setState({rerender:true});
    }

    _onChangeTransferCancelButtonOuterBorderRadius( n ){
        const widgetData = this._getWidgetData();
        widgetData.setTransferCancelButtonOuterBorderRadius(n);
        this._EditScreenViewAsParent.setState({rerender:true});
    }

    _onChangeTransferCancelButtonOuterBorderThickness( n ){
        const widgetData = this._getWidgetData();
        widgetData.setTransferCancelButtonOuterBorderThickness(n);
        this._EditScreenViewAsParent.setState({rerender:true});
    }

    _onChangeLinetableHeaderFontSize( n ){
        const widgetData = this._getWidgetData();
        widgetData.setLinetableHeaderFontSize(n);
        this._EditScreenViewAsParent.setState({rerender:true});
    }

    _onChangeLinetableBodyFontSize( n ){
        const widgetData = this._getWidgetData();
        widgetData.setLinetableBodyFontSize(n);
        this._EditScreenViewAsParent.setState({rerender:true});
    }

    _onChangeLineButtonFontSize( n ){
        const widgetData = this._getWidgetData();
        widgetData.setLineButtonFontSize(n);
        this._EditScreenViewAsParent.setState({rerender:true});
    }

    _onChangeTransferButtonFontSize( n ){
        const widgetData = this._getWidgetData();
        widgetData.setTransferButtonFontSize(n);
        this._EditScreenViewAsParent.setState({rerender:true});
    }

    _onChangeTransferCancelButtonFontSize( n ){
        const widgetData = this._getWidgetData();
        widgetData.setTransferCancelButtonFontSize(n);
        this._EditScreenViewAsParent.setState({rerender:true});
    }

    //!override
    _getRenderMainJsx(){
        const widgetData = this._getWidgetData();
        const lineDataArray = widgetData.getLineDataArray();
        const lineCount = lineDataArray.length;
        const jsx =   (
            <>
                <p>{i18n.t("lineCount")}</p>
                <InputNumber min="0" max={MAX_LINE_COUNT} value={lineCount}
                             onChange={(count) => this._onChangeLineCount(count)}/>
                {lineDataArray.map((lineData, i) => {
                    return (<div key={i}>
                        <h3>{i18n.t("line") + " " + (i + 1)}</h3>
                        <p>{i18n.t("resourceName")}</p>
                        <Input maxLength={300} allowClear value={lineData.getResourceName()}
                               onChange={(e) => this._onChangeResourceName(e, i)}/>
                        <p>{i18n.t("lineLabel")}</p>
                        <Input allowClear maxLength={300} value={lineData.getLineLabel()}
                               onChange={(e) => this._onChangeLineLabel(e, i)}/>
                    </div>);
                })}
                <p>{i18n.t("bgColor")}</p>
                <Colorpicker format="rgb" value={widgetData.getLinetableBgColor()}
                             onChange={(color) => this._onChangeLinetableBgColor(color)}/>
                <p>{i18n.t("outerBorderThickness")}</p>
                <InputNumber min="0" value={widgetData.getLinetableOuterBorderThickness()}
                             onChange={(n) => this._onChangeLinetableOuterBorderThickness(n)}/>
                <p>{i18n.t("outerBorderColor")}</p>
                <Colorpicker format="rgb" value={widgetData.getLinetableOuterBorderColor()}
                             onChange={(color) => this._onChangeLinetableOuterBorderColor(color)}/>
                <p>{i18n.t("outerBorderRadius")}</p>
                <InputNumber min="0" value={widgetData.getLinetableOuterBorderRadius()}
                             onChange={(n) => this._onChangeLinetableOuterBorderRadius(n)}/>
                <Divider>{i18n.t("header_settings")}</Divider>
                <p>{i18n.t("Text_size")}</p>
                <InputNumber min="0" value={widgetData.getLinetableHeaderFontSize()}
                             onChange={(n) => this._onChangeLinetableHeaderFontSize(n)}/>
                <p>{i18n.t("fgColor")}</p>
                <Colorpicker format="rgb" value={widgetData.getLinetableHeaderFgColor()}
                             onChange={(color) => this._onChangeLinetableHeaderFgColor(color)}/>
                <p>{i18n.t("rowUnderlineThickness")}</p>
                <InputNumber min="0" value={widgetData.getLinetableHeaderRowUnderlineThickness()}
                             onChange={(n) => this._onChangeLinetableHeaderRowUnderlineThickness(n)}/>
                <p>{i18n.t("rowUnderlineColor")}</p>
                <Colorpicker format="rgb" value={widgetData.getLinetableHeaderRowUnderlineColor()}
                             onChange={(color) => this._onChangeLinetableHeaderRowUnderlineColor(color)}/>
                <Divider>{i18n.t("body_settings")}</Divider>
                <p>{i18n.t("Text_size")}</p>
                <InputNumber min="0" value={widgetData.getLinetableBodyFontSize()}
                             onChange={(n) => this._onChangeLinetableBodyFontSize(n)}/>
                <p>{i18n.t("fgColor")}</p>
                <Colorpicker format="rgb" value={widgetData.getLinetableBodyFgColor()}
                             onChange={(color) => this._onChangeLinetableBodyFgColor(color)}/>
                <p>{i18n.t("rowUnderlineThickness")}</p>
                <InputNumber min="0" value={widgetData.getLinetableBodyRowUnderlineThickness()}
                             onChange={(n) => this._onChangeLinetableBodyRowUnderlineThickness(n)}/>
                <p>{i18n.t("rowUnderlineColor")}</p>
                <Colorpicker format="rgb" value={widgetData.getLinetableBodyRowUnderlineColor()}
                             onChange={(color) => this._onChangeLinetableBodyRowUnderlineColor(color)}/>
                <Divider>{i18n.t("lineButtonSettings")}</Divider>
                <p>{i18n.t("Text_size")}</p>
                <InputNumber min="0" value={widgetData.getLineButtonFontSize()}
                             onChange={(n) => this._onChangeLineButtonFontSize(n)}/>
                <p>{i18n.t("width")}</p>
                <InputNumber min="1" value={widgetData.getLineButtonWidth()}
                             onChange={(n) => this._onChangeLineButtonWidth(n)}/>
                <p>{i18n.t("height")}</p>
                <InputNumber min="1" value={widgetData.getLineButtonHeight()}
                             onChange={(n) => this._onChangeLineButtonHeight(n)}/>
                <p>{i18n.t("fgColor")}</p>
                <Colorpicker format="rgb" value={widgetData.getLineButtonFgColor()}
                             onChange={(color) => this._onChangeLineButtonFgColor(color)}/>
                <p>{i18n.t("bgColor")}</p>
                <Colorpicker format="rgb" value={widgetData.getLineButtonBgColor()}
                             onChange={(color) => this._onChangeLineButtonBgColor(color)}/>
                <p>{i18n.t("outerBorderColor")}</p>
                <Colorpicker format="rgb" value={widgetData.getLineButtonOuterBorderColor()}
                             onChange={(color) => this._onChangeLineButtonOuterBorderColor(color)}/>
                <p>{i18n.t("outerBorderRadius")}</p>
                <InputNumber min="0" value={widgetData.getLineButtonOuterBorderRadius()}
                             onChange={(n) => this._onChangeLineButtonOuterBorderRadius(n)}/>
                <p>{i18n.t("outerBorderThickness")}</p>
                <InputNumber min="1" value={widgetData.getLineButtonOuterBorderThickness()}
                             onChange={(n) => this._onChangeLineButtonOuterBorderThickness(n)}/>
                <Divider>{i18n.t("transferButtonSettings")}</Divider>
                <p>{i18n.t("Text_size")}</p>
                <InputNumber min="0" value={widgetData.getTransferButtonFontSize()}
                             onChange={(n) => this._onChangeTransferButtonFontSize(n)}/>
                <p>{i18n.t("width")}</p>
                <InputNumber min="1" value={widgetData.getTransferButtonWidth()}
                             onChange={(n) => this._onChangeTransferButtonWidth(n)}/>
                <p>{i18n.t("height")}</p>
                <InputNumber min="1" value={widgetData.getTransferButtonHeight()}
                             onChange={(n) => this._onChangeTransferButtonHeight(n)}/>
                <p>{i18n.t("fgColor")}</p>
                <Colorpicker format="rgb" value={widgetData.getTransferButtonFgColor()}
                             onChange={(color) => this._onChangeTransferButtonFgColor(color)}/>
                <p>{i18n.t("bgColor")}</p>
                <Colorpicker format="rgb" value={widgetData.getTransferButtonBgColor()}
                             onChange={(color) => this._onChangeTransferButtonBgColor(color)}/>
                <p>{i18n.t("outerBorderColor")}</p>
                <Colorpicker format="rgb" value={widgetData.getTransferButtonOuterBorderColor()}
                             onChange={(color) => this._onChangeTransferButtonOuterBorderColor(color)}/>
                <p>{i18n.t("outerBorderRadius")}</p>
                <InputNumber min="0" value={widgetData.getTransferButtonOuterBorderRadius()}
                             onChange={(n) => this._onChangeTransferButtonOuterBorderRadius(n)}/>
                <p>{i18n.t("outerBorderThickness")}</p>
                <InputNumber min="1" value={widgetData.getTransferButtonOuterBorderThickness()}
                             onChange={(n) => this._onChangeTransferButtonOuterBorderThickness(n)}/>
                <Divider>{i18n.t("transferCancelButtonSettings")}</Divider>
                <p>{i18n.t("Text_size")}</p>
                <InputNumber min="0" value={widgetData.getTransferCancelButtonFontSize()}
                             onChange={(n) => this._onChangeTransferCancelButtonFontSize(n)}/>
                <p>{i18n.t("width")}</p>
                <InputNumber min="1" value={widgetData.getTransferCancelButtonWidth()}
                             onChange={(n) => this._onChangeTransferCancelButtonWidth(n)}/>
                <p>{i18n.t("height")}</p>
                <InputNumber min="1" value={widgetData.getTransferCancelButtonHeight()}
                             onChange={(n) => this._onChangeTransferCancelButtonHeight(n)}/>
                <p>{i18n.t("fgColor")}</p>
                <Colorpicker format="rgb" value={widgetData.getTransferCancelButtonFgColor()}
                             onChange={(color) => this._onChangeTransferCancelButtonFgColor(color)}/>
                <p>{i18n.t("bgColor")}</p>
                <Colorpicker format="rgb" value={widgetData.getTransferCancelButtonBgColor()}
                             onChange={(color) => this._onChangeTransferCancelButtonBgColor(color)}/>
                <p>{i18n.t("outerBorderColor")}</p>
                <Colorpicker format="rgb" value={widgetData.getTransferCancelButtonOuterBorderColor()}
                             onChange={(color) => this._onChangeTransferCancelButtonOuterBorderColor(color)}/>
                <p>{i18n.t("outerBorderRadius")}</p>
                <InputNumber min="0" value={widgetData.getTransferCancelButtonOuterBorderRadius()}
                             onChange={(n) => this._onChangeTransferCancelButtonOuterBorderRadius(n)}/>
                <p>{i18n.t("outerBorderThickness")}</p>
                <InputNumber min="1" value={widgetData.getTransferCancelButtonOuterBorderThickness()}
                             onChange={(n) => this._onChangeTransferCancelButtonOuterBorderThickness(n)}/>
            </>
        );
        return jsx;
    }
}