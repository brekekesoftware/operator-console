import React from 'react';
import EditorWidgetSettings from "./EditorWidgetSettings";
import i18n from "../../../i18n";
import {Divider, Input} from "antd";
import AutoComplete from "antd/lib/auto-complete";
import BrekekeOperatorConsole from "../../../index";
import {Colorpicker} from "antd-colorpicker";
import InputNumber from "antd/lib/input-number";

export default class NoteEditorWidgetSettings extends EditorWidgetSettings {
    constructor( props ) {
        super( props );
        this.state = {
            nameOptions: [],
        };
    }

    componentDidMount(){
        super.componentDidMount();
        const oc = BrekekeOperatorConsole.getStaticInstance();
        oc.getNoteNames().then((names) => {
            this.setState({ nameOptions: names.map((value) => ({ value })) });
        })
    }

    // componentDidUpdate(){
    //     super.componentDidUpdate();
    //     const widgetData = this._getWidgetData();
    //     if( this._latestWidgetData !== widgetData  ){
    //
    //     }
    //     this._latestWidgetData = widgetData;
    // }

    // componentDidUpdate() {
    //     super.componentDidUpdate();
    //     const oc = BrekekeOperatorConsole.getStaticInstance();
    //     oc.getNoteNames().then((names) => {
    //         this.setState({ nameOptions: names.map((value) => ({ value })) });
    //     })
    // }

    _onChangeNoteName( noteName ){
        //const noteName = e.currentTarget.value;
        this._getWidgetData().setNoteName( noteName  );
        this.getEditScreenViewAsParent().setState({rerender:true});
        const oc = BrekekeOperatorConsole.getStaticInstance();
        oc.getNoteNames().then((names) => {
            this.setState({ nameOptions: names.map((value) => ({ value })) });
        })
    }

    getEditScreenViewAsParent(){
        return this._EditScreenViewAsParent;
    }

    _onChangeNoteNameFgColor( color ){
        const widgetData = this._getWidgetData();
        widgetData.setNoteNameFgColor(color);
        this._EditScreenViewAsParent.setState({rerender:true});
    }

    _onChangeNoteNameBgColor( color ){
        const widgetData = this._getWidgetData();
        widgetData.setNoteNameBgColor(color);
        this._EditScreenViewAsParent.setState({rerender:true});
    }

    _onChangeNoteTextFgColor( color ){
        const widgetData = this._getWidgetData();
        widgetData.setNoteTextFgColor(color);
        this._EditScreenViewAsParent.setState({rerender:true});
    }

    _onChangeNoteBgStartColor( color ){
        const widgetData = this._getWidgetData();
        widgetData.setNoteBgStartColor(color);
        this._EditScreenViewAsParent.setState({rerender:true});
    }

    _onChangeNoteBgEndColor( color ){
        const widgetData = this._getWidgetData();
        widgetData.setNoteBgEndColor(color);
        this._EditScreenViewAsParent.setState({rerender:true});
    }

    _onChangeNoteBorderRadius( n ){
        const widgetData = this._getWidgetData();
        widgetData.setNoteBorderRadius(n);
        this._EditScreenViewAsParent.setState({rerender:true});
    }

    //!override
    _getRenderMainJsx(){
        const widgetData = this._getWidgetData();
        const noteName = widgetData.getNoteName();
        const jsx =   (
            <>
                <p>{i18n.t("borderRadius")}</p>
                <InputNumber min="0" value={widgetData.getNoteBorderRadius()}
                             onChange={(n) => this._onChangeNoteBorderRadius(n)}/>
                <Divider>{i18n.t("noteName_settings")}</Divider>
                <p>{i18n.t("name")}</p>
                <AutoComplete value={noteName} options={this.state.nameOptions}
                              onChange={(noteName) => this._onChangeNoteName(noteName)}/>
                <p>{i18n.t("fgColor")}</p>
                <Colorpicker format="rgb" value={widgetData.getNoteNameFgColor()}
                             onChange={(color) => this._onChangeNoteNameFgColor(color)}/>
                <p>{i18n.t("bgColor")}</p>
                <Colorpicker format="rgb" value={widgetData.getNoteNameBgColor()}
                             onChange={(color) => this._onChangeNoteNameBgColor(color)}/>
                <Divider>{i18n.t("noteText_settings")}</Divider>
                <p>{i18n.t("fgColor")}</p>
                <Colorpicker format="rgb" value={widgetData.getNoteTextFgColor()}
                             onChange={(color) => this._onChangeNoteTextFgColor(color)}/>
                <p>{i18n.t("startBgColor")}</p>
                <Colorpicker format="rgb" value={widgetData.getNoteBgStartColor()}
                             onChange={(color) => this._onChangeNoteBgStartColor(color)}/>
                <p>{i18n.t("endBgColor")}</p>
                <Colorpicker format="rgb" value={widgetData.getNoteBgEndColor()}
                             onChange={(color) => this._onChangeNoteBgEndColor(color)}/>
            </>
        );
        return jsx;
    }
}