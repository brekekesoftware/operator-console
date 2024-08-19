import React from 'react';
import BrekekeOperatorConsole from "../../../index";
import i18n from "../../../i18n";
import debounce from "debounce";
import Util from "../../../Util";
import Empty from "antd/lib/empty";
import Spin from "antd/lib/spin";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import RuntimeWidget from "./RuntimeWidget";
import TextArea from "antd/es/input/TextArea";

export default class NoteRuntimeWidget extends RuntimeWidget{

    constructor( props ) {
        super( props );
        this._readonly = true;
        let loading = false;

        const oc = BrekekeOperatorConsole.getStaticInstance();
        const widgetData = this.getWidgetData();
        const noteName = widgetData.getNoteName();

        if( noteName ) {
            oc.getNote(noteName)
                .then(({note, useraccess}) => {
                    this._readonly = useraccess != 2;
                    this._lastNoteName = noteName;
                    this.setState({loading:false, content:note});
                })
                .catch((err) => {
                    console.log('Failed  to getNote.', err);
                    this._lastNoteName = noteName;
                    this._readonly = true;
                    //throw err;
                    this.setState({loading:false,content:"",error:true});
                });
            loading = true;
        }
        this.state = {content: "", loading:loading, saving:false, error:false};
    }

    componentDidUpdate() {
        super.componentDidUpdate();

        const oc = BrekekeOperatorConsole.getStaticInstance();


    }

    componentDidMount() {
        super.componentDidMount();
        const widgetData = this.getWidgetData();
        const noteName = widgetData.getNoteName();
        if( this.state.loading === false && noteName  && this._lastNoteName !== noteName ) {
            oc.getNote(noteName)
                .then(({note, useraccess}) => {
                    this._readonly = useraccess != 2;
                    this._lastNoteName = noteName;
                    this.setState({loading:false, content:note});
                })
                .catch((err) => {
                    console.log('Failed  to getNote.', err);
                    this._lastNoteName = noteName;
                    this._readonly = false;
                    //throw err;
                    this.setState({loading:false,content:"",error:true});
                });
            this.setState({loading:true});
        }
    }

    _setNoteDebounced = debounce(() => {
        const oc = BrekekeOperatorConsole.getStaticInstance();
        const widgetData = this.getWidgetData();
        const noteName = widgetData.getNoteName();

        if( noteName ){
            oc.setNote(noteName, this.state.content )
                .then(() => this.setState({saving:false}) )
                .catch(() => this.setState({error:true}))
        }
    }, 500);

    _onContentChanged = (e) => {
        const content = e.target.value;
        this.setState({content: content, saving:true, error:false }, () =>   this._setNoteDebounced() );
    }


    //!overload
    _getRenderMainJsx() {
        const widgetData = this.getWidgetData();
        const noteName = widgetData.getNoteName();

        const noteNameFgColor = Util.getRgbaCSSStringFromAntdColor(  widgetData.getNoteNameFgColor() , "" );
        const noteNameBackground = Util.getRgbaCSSStringFromAntdColor(  widgetData.getNoteNameBgColor(), "" );

        const borderRadius = ( widgetData.getNoteBorderRadius() || widgetData.getNoteBorderRadius() === 0 ) ? widgetData.getNoteBorderRadius() : 3; //!default
        const noteTextForegroundColor = Util.getRgbaCSSStringFromAntdColor( widgetData.getNoteTextFgColor(), "" );
        const  background = widgetData.getNoteBgStartColor() && widgetData.getNoteBgEndColor() ? "linear-gradient(" +
            Util.getRgbaCSSStringFromAntdColor( widgetData.getNoteBgStartColor(), "" )+ "," +
            Util.getRgbaCSSStringFromAntdColor( widgetData.getNoteBgEndColor(), "" ) +  ")" : "";

        return (
            <div className="brOCStickyNote" style={{
                borderRadius:borderRadius,
                background:background
            }}>
                <div className="brOCStickyNoteName" style={{
                    color:noteNameFgColor,
                    backgroundColor:noteNameBackground
                }}>{noteName}</div>
                {this.state.loading ? (
                    <Empty image={null} description={<Spin/>}/>
                ) : (
                    <TextArea
                        value={this.state.content}
                        onChange={this._onContentChanged}
                        onFocus={ () => {
                            const oc = BrekekeOperatorConsole.getStaticInstance();
                            oc.setEnableKeydownToDialing(false);
                            oc.setEnablePasteToDialing(false);
                        } }
                        onBlur={ () =>{
                            const oc = BrekekeOperatorConsole.getStaticInstance();
                            oc.setEnableKeydownToDialing(true);
                            oc.setEnablePasteToDialing(true);
                        }}
                        readOnly={this._readonly}
                        maxLength={10000000}
                        style={{
                            color:noteTextForegroundColor
                        }}
                    />
                )}
                {(this.state.error || this.state.saving) && (
                    <FontAwesomeIcon icon="fa-solid fa-cloud-arrow-up"
                                     color={this.state.error ? '#FF4526' : 'black'}
                                     style={{position: 'absolute', top: 10, right: 12 }}
                    />
                )}
            </div>
        )
    }

}