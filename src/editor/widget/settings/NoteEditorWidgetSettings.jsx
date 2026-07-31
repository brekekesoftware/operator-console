import React from 'react';
import EditorWidgetSettings from "./EditorWidgetSettings";
import i18n from "../../../i18n";
import BrekekeOperatorConsole from "../../../index";
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
            <div className="brOCWidgetSettingsPanel">
                <p className="brOCSettingsSectionHeading">{i18n.t("Settings")}</p>
                {this._renderNumberField("borderRadius", widgetData.getNoteBorderRadius(), (n) => this._onChangeNoteBorderRadius(n), {min: 0})}

                <p className="brOCSettingsSectionHeading">{i18n.t("Note_name_settings")}</p>
                {this._renderAutoCompleteField("Name", noteName, (noteName) => this._onChangeNoteName(noteName), {options: this.state.nameOptions})}
                {this._renderTextField("Label", sNoteLabel, (e) => this._onChangeNoteLabel(e), {placeholder: i18n.t("Label"), allowClear: true, defaultValue: sNoteLabel})}
                {this._renderNumberField("Text_size", widgetData.getNoteTitleFontSize(), (n) => this._onChangeNoteTitleFontSize(n), {min: 0})}
                {this._renderColorField("fgColor", widgetData.getNoteNameFgColor(), (color) => this._onChangeNoteNameFgColor(color))}
                {this._renderColorField("bgColor", widgetData.getNoteNameBgColor(), (color) => this._onChangeNoteNameBgColor(color))}

                <p className="brOCSettingsSectionHeading">{i18n.t("noteText_settings")}</p>
                {this._renderNumberField("Text_size", widgetData.getNoteBodyFontSize(), (n) => this._onChangeNoteBodyFontSize(n), {min: 0})}
                {this._renderColorField("fgColor", widgetData.getNoteTextFgColor(), (color) => this._onChangeNoteTextFgColor(color))}
                {this._renderColorField("startBgColor", widgetData.getNoteBgStartColor(), (color) => this._onChangeNoteBgStartColor(color))}
                {this._renderColorField("endBgColor", widgetData.getNoteBgEndColor(), (color) => this._onChangeNoteBgEndColor(color))}
            </div>
        );
        return jsx;
    }
}