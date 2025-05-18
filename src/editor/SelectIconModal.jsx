import React from "react";
import {Input, Modal, Select} from "antd";
import i18n from "../i18n";
import "./SelectIconModal.css"
import {fas} from "@fortawesome/free-solid-svg-icons";
import {far} from "@fortawesome/free-regular-svg-icons";
import {fab} from "@fortawesome/free-brands-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import BrekekeOperatorConsole from "../index";

let _SELECT_ICON_MODAL_INSTANCE = null;
export  default class SelectIconModal extends React.Component{

    constructor( props ) {
        super( props );
        _SELECT_ICON_MODAL_INSTANCE = this;
        this._EditScreenViewAsParent = props.editScreenViewAsParent;
        this.state ={
            isVisible : false,
            filterText : "",
            filterTextUpperCase : "",
            selectedIconValue : null,
            onOkFunction : null,
            onCancelFunction : null
        };
        this._FontAwesomeIconArray = new Array(); //Value is Object({fontAwesomeIcon,iconName,iconNameUpperCase,iconValue})

        const arIconNames = new Array();
        const arFas = Object.values(fas);
        for( let i = 0; i < arFas.length; i++){
            const fontAwesomeIcon = arFas[i];
            if( arIconNames.includes( fontAwesomeIcon.iconName ) !== true ) {
                const oFontAwesomeIcon = SelectIconModal._createFontAwesomeIconObject( fontAwesomeIcon );
                this._FontAwesomeIconArray.push(oFontAwesomeIcon);
                arIconNames.push(fontAwesomeIcon.iconName);
            }
        }

        arIconNames.length = 0;
        const arFar = Object.values(far);
        const arFarIconNames = new Array();
        for( let i = 0; i < arFar.length; i++){
            const fontAwesomeIcon = arFar[i];
            if( arIconNames.includes( fontAwesomeIcon.iconName ) !== true ) {
                const oFontAwesomeIcon = SelectIconModal._createFontAwesomeIconObject( fontAwesomeIcon );
                this._FontAwesomeIconArray.push(oFontAwesomeIcon);
                arIconNames.push(fontAwesomeIcon.iconName);
            }
        }

        arIconNames.length = 0;
        const arFab = Object.values(fab);
        for( let i = 0; i < arFab.length; i++){
            const fontAwesomeIcon = arFab[i];
            if( arIconNames.includes( fontAwesomeIcon.iconName ) !== true ) {
                const oFontAwesomeIcon = SelectIconModal._createFontAwesomeIconObject(fontAwesomeIcon);
                this._FontAwesomeIconArray.push(oFontAwesomeIcon);
                arIconNames.push(fontAwesomeIcon.iconName);
            }
        }

        this._DefaultButtonFileIcons = new Array(); //Value is Object({fileInfo,iconName,iconNameUpperCase,iconValue})
    }

    static _createFontAwesomeIconObject( fontAwesomeIcon  ){
        const iconName = fontAwesomeIcon.iconName;
        const iconValue = fontAwesomeIcon.prefix + ' fa-' + iconName;
        const iconNameUpperCase = iconName.toUpperCase();
        const o = { fontAwesomeIcon : fontAwesomeIcon, iconName : iconName, iconNameUpperCase: iconNameUpperCase, iconValue: iconValue};
        return o;
    }

    static _isFilterStringMatch( sUpperCase, sFindUpperCase ){
        let bMatch;
        if( !sUpperCase ){
            bMatch = true;
        }
        else {
            bMatch = sUpperCase.includes(sFindUpperCase);
        }
        return bMatch;
    };


    static _createIconNameFromFilename( filename ){
        let iconName;
        const iLastDir = filename.lastIndexOf("/");
        if( iLastDir === -1 ){
            iconName = filename;
        }
        else{
            iconName = filename.substring( iLastDir + 1 );
        }

        //Remove file extension
        const iLastDot = iconName.lastIndexOf(".");
        if( iLastDot !== -1 ){
            iconName = iconName.substring( 0, iLastDot );
        }

        return iconName;
    }

    componentDidMount() {
        this._DefaultButtonFileIcons.length = 0;
        const oc = BrekekeOperatorConsole.getStaticInstance();
        const defaultButtonFileInfos = oc.getDefaultButtonImageFileInfos();
        let fileInfos = defaultButtonFileInfos.getFileInfos();
        if( Array.isArray( fileInfos ) !== true ) {
            return;
        }
        for (let i = 0; i < fileInfos.length; i++) {
            const fileInfo = fileInfos[i];
            const fileName = fileInfo["name"];
            const fileUrl = fileInfo["url"];
            const iconValue = "PATH:" + fileUrl;
            const iconName = SelectIconModal._createIconNameFromFilename( fileName );
            const iconNameUpperCase = iconName.toUpperCase();
            const oDefaultButtonFileIcon = {fileInfo:fileInfo,iconName:iconName, iconNameUpperCase:iconNameUpperCase, iconValue:iconValue};
            this._DefaultButtonFileIcons.push(oDefaultButtonFileIcon);
        }
		//this.setState({rerender:true});
    }

    setSelectIconModalVisibleToState( args ){
        const selectedIconValue = args["selectedIconValue"];
        const onOkFunction = args["onOkFunction"];
        const onCancelFunction = args["onCancelFunction"];
        this.setState({isVisible:true,selectedIconValue:selectedIconValue,filterText:"",filterTextUpperCase:"",onOkFunction:onOkFunction,onCancelFunction:onCancelFunction},
            ()=>{
                const eInput = document.getElementById("SelectIconModal_filterTextInput-brekeke_operatorConsole_editor_SelectIconModal");
                eInput.focus();
            });
        if( this.state.isVisible !== true ) {
            const oc = BrekekeOperatorConsole.getStaticInstance();
            oc.addDisableKeydownToDialingCounter();
            oc.addDisablePasteToDialingCounter();
        }
    }

    getSelectedIconValueFromState(){
        return this.state.selectedIconValue;
    }

    getSelectIconModalVisibleFromState() {
        return this.state.isVisible;
    }

    _onChangeFilterText( e ){
        const s = e.target.value;
        this.setState({filterText: s,filterTextUpperCase: s.toUpperCase() });
    }

    static getSelectIconModalInstance(){
        return _SELECT_ICON_MODAL_INSTANCE;
    }

    _onClickFileIcon( ev, oFileIcon ){
        const iconValue = oFileIcon["iconValue"];
        this.setState({selectedIconValue:iconValue});
    }

    _onClickFontAwesomeIcon( ev, oFontAwesomeIcon ){
        const iconValue = oFontAwesomeIcon["iconValue"];
        this.setState({selectedIconValue:iconValue});
    }

    _onCancelModal(){
        const onCancelFunction = this.state.onCancelFunction;
        const eInput = document.getElementById("SelectIconModal_filterTextInput-brekeke_operatorConsole_editor_SelectIconModal");
        eInput.blur();
        this.setState({isVisible:false,selectedIconValue:null,filterText:"", filterTextUpperCase:"",onOkFunction: null, onCancelFunction : null}, () =>{
            if( onCancelFunction ){
                onCancelFunction( this );
            }
        });
        const oc = BrekekeOperatorConsole.getStaticInstance();
        oc.subtractDisableKeydownToDialingCounter();
        oc.subtractDisablePasteToDialingCounter();
    }

    _onOkModal(){
        const onOkFunction = this.state.onOkFunction;
        const selectedIconValue = this.state.selectedIconValue;
        this.setState({isVisible:false,selectedIconValue:null,filterText:"", filterTextUpperCase:"", onOkFunction: null, onCancelFunction : null}, () =>{
            if( onOkFunction ){
                onOkFunction( this, selectedIconValue);
            }
        });
        const oc = BrekekeOperatorConsole.getStaticInstance();
        oc.subtractDisableKeydownToDialingCounter();
        oc.subtractDisablePasteToDialingCounter();
    }

    render( props ){
        if( this.state.isVisible !== true ){
            return (null);
        }

        const iconsJsx = new Array();
        for( let i = 0; i < this._DefaultButtonFileIcons.length; i++ ){
            const oFileIcon = this._DefaultButtonFileIcons[i];
            const iconNameUpperCase = oFileIcon["iconNameUpperCase"];
            const bMatch = SelectIconModal._isFilterStringMatch(  iconNameUpperCase, this.state.filterTextUpperCase );
            if( bMatch === false ){
                continue;
            }
            const fileInfo = oFileIcon["fileInfo"];
            const iconName = oFileIcon["iconName"];
            const iconValue = oFileIcon["iconValue"];
            const sSelectIconModal_fileIcon_selected = this.state.selectedIconValue === iconValue ? " selectIconModal_fileIcon_selected-brekeke_operatorConsole_editor_SelectIconModal" : "";
            const fileIconJsx = (<div className={"selectIconModal_fileIcon-brekeke_operatorConsole_editor_SelectIconModal" + sSelectIconModal_fileIcon_selected } onClick={ (ev) => this._onClickFileIcon( ev, oFileIcon )}>
                <img src={fileInfo.url} alt={iconName} className="selectIconModal_fileIconImage-brekeke_operatorConsole_editor_SelectIconModal"/>
                <p className="selectIconModal_fileIconName-brekeke_operatorConsole_editor_SelectIconModal">
                    {iconName}
                </p>
            </div>);
            iconsJsx.push( fileIconJsx);
        }
        for( let i = 0; i < this._FontAwesomeIconArray.length; i++ ){
            const oFontAwesomeIcon = this._FontAwesomeIconArray[i];
            const iconNameUpperCase = oFontAwesomeIcon["iconNameUpperCase"];
            const bMatch = SelectIconModal._isFilterStringMatch( iconNameUpperCase, this.state.filterTextUpperCase );
            if( bMatch === false ){
                continue;
            }
            const iconValue = oFontAwesomeIcon["iconValue"];
            const sSelectIconModal_fontAwesomeIcon_selected = this.state.selectedIconValue === iconValue ? " selectIconModal_fontAwesomeIcon_selected-brekeke_operatorConsole_editor_SelectIconModal" : "";
            const fontAwesomeIconJsx = (<div className={"selectIconModal_fontAwesomeIcon-brekeke_operatorConsole_editor_SelectIconModal" + sSelectIconModal_fontAwesomeIcon_selected} onClick={ (ev) => this._onClickFontAwesomeIcon( ev, oFontAwesomeIcon )}>
                <FontAwesomeIcon fixedWidth icon={oFontAwesomeIcon.fontAwesomeIcon} className="selectIconModal_fontAwesomeIconImage-brekeke_operatorConsole_editor_SelectIconModal"/>
                <p className="selectIconModal_fontAwesomeIconName-brekeke_operatorConsole_editor_SelectIconModal">
                    {oFontAwesomeIcon.iconName}
                </p>
            </div>);
            iconsJsx.push( fontAwesomeIconJsx );
        }

        return (
            <Modal
                title={i18n.t("SelectAnIcon")}
                open={true}
                onCancel={() => this._onCancelModal() }
                onOk={ () => this._onOkModal() }
                // okButtonProps={{ style: { display: 'none' } }}
				className="SelectIconModal_modal-brekeke_operatorConsole_editor_SelectIconModal"
                wrapClassName="SelectIconModal-brekeke_operatorConsole"
                width="calc(100vw - 40px)"
                maskClosable={false}
            >
                <div>
                    {i18n.t("Filter")}:
                    <Input
                        defaultValue={this.state.filterText}
                        value={this.state.filterText}
                        onChange={ (e) => this._onChangeFilterText(e) }
                        id="SelectIconModal_filterTextInput-brekeke_operatorConsole_editor_SelectIconModal"
                        className="SelectIconModal_filterTextInput-brekeke_operatorConsole_editor_SelectIconModal"
                    />
                </div>
                <div className="selectIconModal_container-brekeke_operatorConsole_editor_SelectIconModal">
                    {iconsJsx}
                </div>
            </Modal>
        );

    }


}