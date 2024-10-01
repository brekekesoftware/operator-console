import React from 'react';
import EditorWidget from "./EditorWidget";
import BrekekeOperatorConsole from "../../../index";
import i18n from "../../../i18n";
import debounce from "debounce";
import Util from "../../../Util";
import Empty from "antd/lib/empty";
import Spin from "antd/lib/spin";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import TextArea from "antd/es/input/TextArea";

export default class NoteEditorWidget extends EditorWidget{

    constructor( props ) {
        super( props );
        this._readonly = false;
        this.state = {loading:false, content: ""};
    }

    componentDidMount(){
        super.componentDidMount();
        const oc = BrekekeOperatorConsole.getStaticInstance();
        const widgetData = this.getWidgetData();
        const noteName = widgetData.getNoteName();
        if( noteName ) {
            const getNoteOptions = {
                methodName : "getNote",
                methodParams : JSON.stringify({
                    tenant : oc.getLoggedinTenant(),
                    name : noteName
                }),
                onSuccessFunction : (res) =>{
                    if( res ) {
                        const note = res["note"];
                        const useraccess = res["useraccess"];
                        this._readonly = useraccess != 2;
                        this._lastNoteName = noteName;
                        this.setState({loading: false, content: note});
                    }
                    else{
                        //Note not found.
                        this._lastNoteName = noteName;
                        this.setState({loading: false});
                    }
                },
                onFailFunction : ( errorOrResponse ) =>{
                    console.log('Failed  to getNote.', errorOrResponse );
                    this._lastNoteName = noteName;
                    //this._readonly = true;
                    //throw err;
                    this.setState({loading:false,content:"",error:true});
                }
            }
            oc.getPalRestApi().callPalRestApiMethod( getNoteOptions  );
            this.setState({loading:true,saving:false,error:false});
        }
    }

    componentDidUpdate() {
        super.componentDidUpdate();

        const oc = BrekekeOperatorConsole.getStaticInstance();

        const widgetData = this.getWidgetData();
        const noteName = widgetData.getNoteName();
        if( this.state.loading === false && noteName  && this._lastNoteName !== noteName ) {
            const getNoteOptions = {
                methodName : "getNote",
                methodParams : JSON.stringify({
                    tenant:oc.getLoggedinTenant(),
                    name:noteName
                }),
                onSuccessFunction: (res) =>{
                    if( res ){
                        const note = res["note"];
                        const useraccess = res["useraccess"];
                        this._readonly = useraccess != 2;
                        this._lastNoteName = noteName;
                        this.setState({loading: false, content: note});
                    }
                    else {
                        //Note not found.
                        this._lastNoteName = noteName;
                        this.setState({loading: false});
                    }
                },
                onFailFunction : ( errorOrResponse ) => {
                    console.log('Failed  to getNote.', errorOrResponse);
                    this._lastNoteName = noteName;
                    this._readonly = false;
                    //throw err;
                    this.setState({loading:false,content:"",error:true});
                }
            }
            oc.getPalRestApi().callPalRestApiMethod( getNoteOptions );
            this.setState({loading:true});
        }
    }

    _setNoteDebounced = debounce(() => {
        const oc = BrekekeOperatorConsole.getStaticInstance();
        const widgetData = this.getWidgetData();
        const noteName = widgetData.getNoteName();

        if( noteName ){
            const setNoteOptions ={
                methodName : "setNote",
                methodParams : JSON.stringify({
                    tenant : oc.getLoggedinTenant(),
                    name:noteName,
                    description : "",
                    useraccess : BrekekeOperatorConsole.PAL_NOTE_USERACCESSES.ReadWrite,
                    note : this.state.content
                }),
                onSuccessFunction : ( res ) =>{
                    this.setState({saving:false} );
                },
                onFailFunction : ( errOrResponse ) =>{
                    this.setState({error: true});
                }
            }
            oc.getPalRestApi().callPalRestApiMethod( setNoteOptions );
        }
    }, 500);

    _onContentChanged = (e) => {
        const content = e.target.value;
        this.setState({content: content,saving:true,error:false }, () =>   this._setNoteDebounced() );
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