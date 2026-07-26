import React from 'react';
import EditorWidgetSettings from "./EditorWidgetSettings";
import i18n from "../../../i18n";
import {Divider, Input} from "antd";
import AutoComplete from "antd/lib/auto-complete";
import BrekekeOperatorConsole from "../../../index";
import {Colorpicker} from "antd-colorpicker";
import InputNumber from "antd/lib/input-number";
import OCUtil from "../../../OCUtil";

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
        const getNoteNamesOptions = {
          methodName : "getNoteNames",
          methodParams : {tenant:oc.getLoggedinTenant()},
            onSuccessFunction : ( names ) => {
                this.setState({ nameOptions: names.map((value) => ({ value })) });
            },
            onFailFunction : (errOrResponse) =>{
              //!testit
              OCUtil.logErrorWithNotification("Failed to get note names.", i18n.t("Failed_to_get_note_names"), errOrResponse );
            }
        };
        oc.getPalRestApi().callPalRestApiMethod( getNoteNamesOptions );

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
        this.getEditScreenViewAsParent().commitEdit();
        const oc = BrekekeOperatorConsole.getStaticInstance()
        const getNoteNamesOptions = {
            methodName : "getNoteNames",
            methodParams : {tenant:oc.getLoggedinTenant()},
            onSuccessFunction : ( names ) => {
                this.setState({ nameOptions: names.map((value) => ({ value })) });
            },
            onFailFunction : (errOrResponse) =>{
                //!testit
                OCUtil.logErrorWithNotification("Failed to get note names.", i18n.t("Failed_to_get_note_names"), errOrResponse );
            }
        };
        oc.getPalRestApi().callPalRestApiMethod( getNoteNamesOptions );
    }

    _onChangeNoteTitleFontSize( n ){
        const widgetData = this._getWidgetData();
        widgetData.setNoteTitleFontSize(n);
        this._EditScreenViewAsParent.commitEdit();
    }

    _onChangeNoteBodyFontSize( n ){
        const widgetData = this._getWidgetData();
        widgetData.setNoteBodyFontSize(n);
        this._EditScreenViewAsParent.commitEdit();
    }

    getEditScreenViewAsParent(){
        return this._EditScreenViewAsParent;
    }

    _onChangeNoteNameFgColor( color ){
        const widgetData = this._getWidgetData();
        widgetData.setNoteNameFgColor(color);
        this._EditScreenViewAsParent.commitEdit();
    }

    _onChangeNoteNameBgColor( color ){
        const widgetData = this._getWidgetData();
        widgetData.setNoteNameBgColor(color);
        this._EditScreenViewAsParent.commitEdit();
    }

    _onChangeNoteTextFgColor( color ){
        const widgetData = this._getWidgetData();
        widgetData.setNoteTextFgColor(color);
        this._EditScreenViewAsParent.commitEdit();
    }

    _onChangeNoteBgStartColor( color ){
        const widgetData = this._getWidgetData();
        widgetData.setNoteBgStartColor(color);
        this._EditScreenViewAsParent.commitEdit();
    }

    _onChangeNoteBgEndColor( color ){
        const widgetData = this._getWidgetData();
        widgetData.setNoteBgEndColor(color);
        this._EditScreenViewAsParent.commitEdit();
    }

    _onChangeNoteBorderRadius( n ){
        const widgetData = this._getWidgetData();
        widgetData.setNoteBorderRadius(n);
        this._EditScreenViewAsParent.commitEdit();
    }

    _onChangeNoteLabel(e){
        const noteLabel = e.currentTarget.value;
        const widgetData = this._getWidgetData();
        widgetData.setNoteLabel( noteLabel  );
        this._EditScreenViewAsParent.commitEdit();
    }

    //!override
    _getRenderMainJsx(){
        const widgetData = this._getWidgetData();
        const noteName = widgetData.getNoteName();
        let  sNoteLabel;
        if( widgetData.getNoteLabel() ){
            sNoteLabel = widgetData.getNoteLabel();
        }
        else{
            sNoteLabel = "";
        }

        const jsx =   (
            <>
                <p>{i18n.t("borderRadius")}</p>
                <InputNumber min="0" value={widgetData.getNoteBorderRadius()}
                             onChange={(n) => this._onChangeNoteBorderRadius(n)}/>
                <Divider>{i18n.t("Note_name_settings")}</Divider>
                <p>{i18n.t("Name")}</p>
                <AutoComplete value={noteName} options={this.state.nameOptions}
                              onChange={(noteName) => this._onChangeNoteName(noteName)} style={{width: "100%"}}/>
                <p>{i18n.t("Label")}</p>
                <Input placeholder={i18n.t("Label")} allowClear value={sNoteLabel}
                       defaultValue={sNoteLabel} onChange={(e) => this._onChangeNoteLabel(e)} />
                <p>{i18n.t("Text_size")}</p>
                <InputNumber min="0" value={widgetData.getNoteTitleFontSize()}
                             onChange={(n) => this._onChangeNoteTitleFontSize(n)}/>
                <p>{i18n.t("fgColor")}</p>
                <Colorpicker format="rgb" value={widgetData.getNoteNameFgColor()}
                             onChange={(color) => this._onChangeNoteNameFgColor(color)}/>
                <p>{i18n.t("bgColor")}</p>
                <Colorpicker format="rgb" value={widgetData.getNoteNameBgColor()}
                             onChange={(color) => this._onChangeNoteNameBgColor(color)}/>
                <Divider>{i18n.t("noteText_settings")}</Divider>
                <p>{i18n.t("Text_size")}</p>
                <InputNumber min="0" value={widgetData.getNoteBodyFontSize()}
                             onChange={(n) => this._onChangeNoteBodyFontSize(n)}/>
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