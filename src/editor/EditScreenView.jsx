import React from "react";
import logo from '../logo.png'
import DropDownMenu from "../DropDownMenu";
import Space from "antd/lib/space";
import Popconfirm from "antd/lib/popconfirm";
import i18n from "../i18n";
import Button from "antd/lib/button";
import BrekekeOperatorConsole, {brOcDisplayStates} from "../index";
import EditorRootPane from "./EditorRootPane";
import EditorPane from "./EditorPane";
import EditorDivider from "./EditorDivider";
import BaseDividerData from "../data/BaseDividerData";
import {Divider, Input, Select} from "antd";
import PaneData from "../data/PaneData";
import Notification from "antd/lib/notification";
import EditorWidgetTemplateFactory from "./widget/template/EditorWidgetTemplateFactory";
import EditorWidgetSettingsFactory from "./widget/settings/EditorWidgetSettingsFactory";
import InputNumber from "antd/lib/input-number";
import Dropdown from "antd/lib/dropdown";
import {SketchPicker} from "react-color";
import SelectIconModal from "./SelectIconModal";
import EditorWidget from "./widget/editor/EditorWidget";
import OCUtil from "../OCUtil";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import CallHistory2CallInfo from "../CallHistory2CallInfo";
import WidgetSettingsTemplates from "./widget/settings/template/WidgetSettingsTemplates";

const _TABS_SELECT_OPTIONS   = Object.freeze({
  disable : false,
  enable :true
});

const _PROPERTIES_MODE = Object.freeze({
  none : -1,
  pane : 0,
  divider : 1,
  tab : 2,
  widget:3
});

const BACKGROUND_IMAGE_FILE_SIZE_LIMIT_MEGABYTES = 10;  //10MB
const BACKGROUND_IMAGE_FILE_SIZE_LIMIT_BYTES = 1024 * 1024 * BACKGROUND_IMAGE_FILE_SIZE_LIMIT_MEGABYTES;

let _EDIT_SCREEN_VIEW_INSTANCE = null;
export default class EditScreenView extends React.Component {
  constructor( props ) {
    super( props );
    _EDIT_SCREEN_VIEW_INSTANCE = this;
    this._OperatorConsoleAsParent = props["operatorConsoleAsParent"];
    this.state = {
      settingsContainerOrDivider:null,
      propertiesMode : _PROPERTIES_MODE.none,
      selectingEditorWidgetData:null
    };
    this._ScreenData = props["screenData"];
    const rootPaneData = this._ScreenData.getScreenPaneDatas().getOrAddRootPaneData();
    this._RootPaneData = rootPaneData;
    //const rootPaneData = this._OperatorConsoleAsParent.getOperatorConsoleData().getScreenData().addPaneData();
    //this._RootPaneData = rootPaneData;
  }

  // _setOutlineNoneToTabPanes(){
  //   const eRoot = document.getElementById("root_EditScreenView_OperatorConsole_Brekeke");
  //   const eTabpanes = eRoot.querySelectorAll(".ant-tabs-tabpane");
  //   for( let i = 0; i < eTabpanes.length; i++ ){
  //     const eTabpane =  eTabpanes[i];
  //     eTabpane.style
  //   }
  // }


  componentDidUpdate(){
	//this._setOutlineNoneToTabPanes();
		
	//const ePaneFile = document.getElementById("paneBackgroundImage_File_EditScreenView_OperatorConsole_Brekeke");
	//if( ePaneFile && this._latestPaneFileElement && this._latestPaneFileElement !== ePaneFile ){
		//ePaneFile.value = null;
	//}
	//this._latestPaneFileElement = ePaneFile;

	//Always clear file value
	const eScreenFile = document.getElementById("backgroundImage_File_EditScreenView_OperatorConsole_Brekeke");
	if( eScreenFile ){
		eScreenFile.value = null;
	}
	const ePaneFile = document.getElementById("paneBackgroundImage_File_EditScreenView_OperatorConsole_Brekeke");
	if( ePaneFile ){
		ePaneFile.value = null;
	}
	const eTabsFile = document.getElementById("tabsBackgroundImage_File_EditScreenView_OperatorConsole_Brekeke");
	if( eTabsFile ){
		eTabsFile.value = null;
	}
    const eTabFile = document.getElementById("tabBackgroundImage_File_EditScreenView_OperatorConsole_Brekeke");
    if( eTabFile ){
      eTabFile.value = null;
    }
  }

  componentDidMount() {

    //const eRoot = document.getElementById("root_EditScreenView_OperatorConsole_Brekeke");

    this._KeydownFunction = (ev) =>{
      this._onKeyDown(ev);
    } ;

    //eRoot.addEventListener("keydown", this._KeydownFunction );  //Dit not work
    document.body.addEventListener("keydown", this._KeydownFunction );

    //this._setOutlineNoneToTabPanes();


  }

  componentWillUnmount() {
    //const eRoot = document.getElementById("root_EditScreenView_OperatorConsole_Brekeke");
    //eRoot.removeEventListener("keydown", this._KeydownFunction );
    document.body.removeEventListener("keydown", this._KeydownFunction );
  }

  static getEditScreenViewInstance(){
    return _EDIT_SCREEN_VIEW_INSTANCE;
  }

  getOperatorConsoleAsParent(){
    return this._OperatorConsoleAsParent;
  }

  getEditingScreenGrid(){
    return this._ScreenData.getEditingScreenGrid();
  }

  setEditingScreenGrid( editingScreenGrid ){
    this._ScreenData.setEditingScreenGrid( editingScreenGrid );
    this.setState({rerender:true});
  }

  setScreenBackgroundColor = (color) => {
    this._ScreenData.setScreenBackgroundColor( color.hex );
    this.setState({rerender:true});
  }

  setScreenForegroundColor = (color) => {
    this._ScreenData.setScreenForegroundColor( color.hex );
    this.setState({rerender:true});
  }

  _setPaneBackgroundColor = (color) => {
    const currentEditingPane = this.state.settingsContainerOrDivider;
    const paneData = currentEditingPane.getEditingPaneData();
    paneData.setPaneBackgroundColor( color.hex );
    this.setState({rerender:true});
  }

  _setPaneForegroundColor = (color) => {
    const currentEditingPane = this.state.settingsContainerOrDivider;
    const paneData = currentEditingPane.getEditingPaneData();
    paneData.setPaneForegroundColor( color.hex );
    this.setState({rerender:true});
  }

  _setTabForegroundColor = (color) => {
	const currentEditingPane = this.state.settingsContainerOrDivider;
	const tabsData = currentEditingPane.getEditingPaneData().getTabsData();
	const selectedTabData = tabsData.getSelectedTabData();
    selectedTabData.setTabForegroundColor( color.hex );
    this.setState({rerender:true});
  }
  
  _setTabBackgroundColor = (color) => {
	const currentEditingPane = this.state.settingsContainerOrDivider;
	const tabsData = currentEditingPane.getEditingPaneData().getTabsData();
	const selectedTabData = tabsData.getSelectedTabData();
    selectedTabData.setTabBackgroundColor( color.hex );
    this.setState({rerender:true});
  }

  _setTabsBackgroundColor = (color) => {
    const currentEditingPane = this.state.settingsContainerOrDivider;
    const tabsData = currentEditingPane.getEditingPaneData().getTabsData();
    tabsData.setTabsBackgroundColor( color.hex );
    this.setState({rerender:true});
  }

  _setTabsItemColor = (color) => {
    const currentEditingPane = this.state.settingsContainerOrDivider;
    const tabsData = currentEditingPane.getEditingPaneData().getTabsData();
    tabsData.setTabsItemColor( color.hex );
    this.setState({rerender:true});
  }
  
  _setTabsItemHoverColor = (color) => {
    const currentEditingPane = this.state.settingsContainerOrDivider;
    const tabsData = currentEditingPane.getEditingPaneData().getTabsData();
    tabsData.setTabsItemHoverColor( color.hex );
    this.setState({rerender:true});
  }

  _setTabsItemSelectedColor = (color) => {
    const currentEditingPane = this.state.settingsContainerOrDivider;
    const tabsData = currentEditingPane.getEditingPaneData().getTabsData();
    tabsData.setTabsItemSelectedColor( color.hex );
    this.setState({rerender:true});
  }

  _setTabsInkBarColor = (color) => {
    const currentEditingPane = this.state.settingsContainerOrDivider;
    const tabsData = currentEditingPane.getEditingPaneData().getTabsData();
    tabsData.setTabsInkBarColor( color.hex );
    this.setState({rerender:true});
  }

  getScreenData(){
    return this._ScreenData;
  }

  // setSelectingEditorWidgetDataToState( selectingEditorWidgetData, onSetStateFunc ){
  //   this.setState({selectingEditorWidgetData:selectingEditorWidgetData,propertiesMode: _PROPERTIES_MODE.widget}, onSetStateFunc );
  // }

  setSelectingEditorWidgetDataToState( selectingEditorWidgetData ){
    this.setState({selectingEditorWidgetData:selectingEditorWidgetData,propertiesMode: _PROPERTIES_MODE.widget} );
  }

  getSelectingEditorWidgetDataFromState(){
    const widgetData = this.state.selectingEditorWidgetData;
    return widgetData;
  }

  //!bad. The onKeyDown event will not occur unless you activate the widget by clicking it twice, so we provide a callback here.
  _onKeyDown( ev ){
    const oc = BrekekeOperatorConsole.getStaticInstance();
    if( oc.state.displayState !== brOcDisplayStates.editingScreen_ver2 ){
        return;
    }

    const widgetData = this.getSelectingEditorWidgetDataFromState();
    if( !widgetData ){
      return;
    }

    EditorWidget.onSelectingEditorWidgetKeyDownByEditScreenView_static( this, ev, widgetData );
  }

  _abortEditingScreen(){
    this._OperatorConsoleAsParent.setDisplayState(brOcDisplayStates.showScreen_ver2);
  }

  _saveEditingScreen(){
    this._OperatorConsoleAsParent.saveEditingScreen_ver2();
  }

  onMouseDownEditorPaneInSettingsMode( ev ){
    const eContainerDiv = ev.currentTarget;
    const containerId = eContainerDiv.getAttribute("data-br-container-id");
    if( !containerId ){ //drag editor widget
      return;
    }
    const container = EditorPane.getEditorPaneByContainerId( containerId );
    this.setCurrentEditorPaneToState( container );
  }

  setCurrentEditorPaneToState( editorPane ){
    this.setState({settingsContainerOrDivider: editorPane, propertiesMode : _PROPERTIES_MODE.pane } );
  }

  getCurrentPropertiesModeFromState(){
    return this.state.propertiesMode;
  }

  static getEditScreenViewzPropertiesModes(){
    return _PROPERTIES_MODE;
  }


  onClickByEditorDivider(ev){
    const eEditorDividerDiv = ev.target;
    const dividerId = eEditorDividerDiv.getAttribute("data-br-editor-divider-id");
    const editorDivider = EditorDivider.getEditorDividerByContainerId( dividerId );
    this.setState({settingsContainerOrDivider: editorDivider, propertiesMode : _PROPERTIES_MODE.divider } );
  }


  _splitVertically() {
    const parentContainer = this.state.settingsContainerOrDivider;
    parentContainer.setDivider( BaseDividerData.DIVIDER_DIRECTIONS.vertical );
    this.setState({settingsContainerOrDivider:null, propertiesMode: _PROPERTIES_MODE.none } );
  }

  _splitHorizontally() {
    const parentContainer = this.state.settingsContainerOrDivider;
    parentContainer.setDivider( BaseDividerData.DIVIDER_DIRECTIONS.horizontal );
    this.setState({settingsContainerOrDivider:null, propertiesMode: _PROPERTIES_MODE.none } );
  }

  _removeSplitter(){
    const editorDivider = this.state.settingsContainerOrDivider;
    editorDivider.removeEditorDivider( () =>{
      this.setState({settingsContainerOrDivider:null, propertiesMode: _PROPERTIES_MODE.none } );
    });
  }

  onTabClickByEditorPanel( editorPanelAsCaller, tabKey, mouseEvent ){
    editorPanelAsCaller.setEditorPanezSelectedTabKeyAsString( tabKey );
    //this.setState({menuMode:_MENU_MODES.tab});
    this.setState({ settingsContainerOrDivider:editorPanelAsCaller, propertiesMode: _PROPERTIES_MODE.tab  } );
  }

  _onChangeTabsEnable( value ){
    // const b = confirm("Are you sure want to change enable/disable tabs?");
    // if( !b ){
    //     ev.target.value = this._lastTabsEnableValue;
    //     return;
    // }
    const currentEditingPane = this.state.settingsContainerOrDivider;
    //const b = ev.target.value === "true";
    const b = value === "true";
    currentEditingPane.setEditorPanezEnableTabs(b);
    this.setState({rerender:true});
  }

  // componentDidMount() {
  //     if( this.state.settingsContainerOrDivider instanceof EditorPane ){
  //         const currentEditingPane = this.state.settingsContainerOrDivider;
  //
  //         const enableTabs = currentEditingPane.getEditorPanezEnableTabs();
  //
  //         const e = document.querySelector('select[name="enableTabs"]');
  //         e.value = enableTabs.toString();
  //     }
  // }

  _onClickAddTab( ev ){
    const eTabLabel = document.querySelector('input[name="tabLabel"]');
    const tabLabel = eTabLabel.value.trim();
    if( tabLabel.length === 0 ){
      Notification.warning({message: i18n.t('tabLabelIsEmpty')});
      return;
    }
    const currentEditingPane = this.state.settingsContainerOrDivider;
    const tabsData = currentEditingPane.getEditingPaneData().getTabsData();
    const insertedTabData = tabsData.insertTab( tabLabel );
    const tabKeyAsInt = insertedTabData.getTabKeyAsInt();
    tabsData.setSelectedTabKeyAsInt( tabKeyAsInt );

    this.setState({rerender:true});
  }

  onDragEditorWidgetTemplateStart(ev){
    // ev.target.style.cursor = 'grabbing';
    //ev.dataTransfer.effectAllowed = "copyMove";
    // ev.preventDefault();
    ev.dataTransfer.clearData();

    const  widgetTypeId = ev.target.getAttribute("data-br-widget-type-id");
    //const e = ev.target.querySelector("[data-br-widget-type-id]");
    //const widgetTypeId = e.getAttribute("data-br-widget-type-id");
    ev.dataTransfer.setData('editorWidgetTypeId', widgetTypeId );
    const itemRect = ev.target.getBoundingClientRect();
    const offsetX = ev.clientX - itemRect.left;
    const offsetY = ev.clientY - itemRect.top;
    ev.dataTransfer.setData('offsetX', offsetX.toString() );
    ev.dataTransfer.setData('offsetY', offsetY.toString() );

  }

  _onClickRenameTab( ev ){
    const eTabLabel = document.querySelector('input[name="tabLabel"]');
    const tabLabel = eTabLabel.value.trim();
    if( tabLabel.length === 0 ){
      Notification.warning({message: i18n.t('tabLabelIsEmpty')});
      return;
    }
    const currentEditingPane = this.state.settingsContainerOrDivider;
    const tabsData = currentEditingPane.getEditingPaneData().getTabsData();
    const tabData = tabsData.getSelectedTabData();
    tabData.setTabLabel( tabLabel );
    this.setState({rerender:true});
  }

  onConfirmOkRemoveEditorWidget(  editorWidgetData ){
    const widgetDatas = editorWidgetData.getWidgetDatasAsParent();
    const b = widgetDatas.removeWidgetDataByWidgetData(editorWidgetData);
    if( b !== true ){
      throw new Error("Remove EditorWidget failed.");
    }
    EditorWidget.onRemoveWidgetByEditScreenView_static( this, editorWidgetData );

    this.setState({settingsContainerOrDivider:null, propertiesMode: _PROPERTIES_MODE.none } );
  }

  _onClickRemoveTab(){
    const currentEditingPane = this.state.settingsContainerOrDivider;
    const tabsData = currentEditingPane.getEditingPaneData().getTabsData();
    if( tabsData.getTabDataCount() === 1 ){
      Notification.warning({message: i18n.t('youCanNotRemoveLastTab')});
      return;
    }

    tabsData.removeSelectedTabData();
    this.setState({rerender:true});
  }
  
	_onChangeTabsTitleFontSize( n ){
		const currentEditingPane = this.state.settingsContainerOrDivider;
		const tabsData = currentEditingPane.getEditingPaneData().getTabsData();
		tabsData.setTabsTitleFontSize(n);
		this.setState({rerender:true});
	}

  _getWidgetTemplatesAreaJsx(){
    const widgetTemplateArray = EditorWidgetTemplateFactory.getStaticEditorWidgetSettingsFactoryInstance().getEditorWidgetTemplateArray();

    return (
        <div style={{display:"flex",justifyContent:"center",flexFlow:"column",alignItems:"center"}} >
          {widgetTemplateArray.map( ( widgetTemplate, index ) =>{
            return widgetTemplate.getRenderJsx( index, this );
          })}
        </div>
    )

  }

  _onChangeBackgroundImageFile( ev ){
    const file = ev.target.files[0];
    if( !file){
      return;
    }

    if( !file.type || !file.type.toLowerCase().startsWith("image/") ){
      Notification.warning({message:i18n.t("It_is_not_an_image_file") });
      return;
    }

    if( !file.size || file.size === 0 ){
      Notification.warning({message:i18n.t("File_size_is_missing") });
      return;
    }

    if( file.size > BACKGROUND_IMAGE_FILE_SIZE_LIMIT_BYTES  ){
      Notification.warning({message:i18n.t("Image_file_size_is_too_large_Maximum_MB_Under") + BACKGROUND_IMAGE_FILE_SIZE_LIMIT_MEGABYTES + "MB"});
      return;
    }

    const blob = new Blob([file], { type: file.type });

    const fr = new FileReader();
    fr.onload = () => {
      const dataUrl = fr.result; // base64 data url
      this._ScreenData.setBackgroundImageBase64DataUrl( dataUrl );
      this.setState({rerender:true});
    };
    fr.onerror = (pe) => {
      OCUtil.logErrorWithNotification("Failed to read background image blob.", i18n.t("Failed_to_read_file"), pe );
      return;
    }
    fr.readAsDataURL(blob);

  }

  _onChangePaneBackgroundImageFile( ev ){
    const file = ev.target.files[0];
    if( !file){
      return;
    }

    if( !file.type || !file.type.toLowerCase().startsWith("image/") ){
      Notification.warning({message:i18n.t("It_is_not_an_image_file") });
      return;
    }

    if( !file.size || file.size === 0 ){
      Notification.warning({message:i18n.t("File_size_is_missing") });
      return;
    }

    if( file.size > BACKGROUND_IMAGE_FILE_SIZE_LIMIT_BYTES  ){
      Notification.warning({message:i18n.t("Image_file_size_is_too_large_Maximum_MB_Under") + BACKGROUND_IMAGE_FILE_SIZE_LIMIT_MEGABYTES + "MB"});
      return;
    }

    const blob = new Blob([file], { type: file.type });

    const fr = new FileReader();
    fr.onload = () => {
      const dataUrl = fr.result; // base64 data url
      const currentEditingPane = this.state.settingsContainerOrDivider;
      const paneData = currentEditingPane.getEditingPaneData();
      paneData.setPaneBackgroundImageBase64DataUrl( dataUrl );
      this.setState({rerender:true});
    };
    fr.onerror = (pe) => {
      OCUtil.logErrorWithNotification("Failed to read background image blob.", i18n.t("Failed_to_read_file"), pe );
      return;
    }
    fr.readAsDataURL(blob);

  }
  
  _onChangeTabBackgroundImageFile( ev ){
    const file = ev.target.files[0];
    if( !file){
      return;
    }

    if( !file.type || !file.type.toLowerCase().startsWith("image/") ){
      Notification.warning({message:i18n.t("It_is_not_an_image_file") });
      return;
    }

    if( !file.size || file.size === 0 ){
      Notification.warning({message:i18n.t("File_size_is_missing") });
      return;
    }

    if( file.size > BACKGROUND_IMAGE_FILE_SIZE_LIMIT_BYTES  ){
      Notification.warning({message:i18n.t("Image_file_size_is_too_large_Maximum_MB_Under") + BACKGROUND_IMAGE_FILE_SIZE_LIMIT_MEGABYTES + "MB"});
      return;
    }

    const blob = new Blob([file], { type: file.type });

    const fr = new FileReader();
    fr.onload = () => {
      const dataUrl = fr.result; // base64 data url
		const currentEditingPane = this.state.settingsContainerOrDivider;
		const tabsData = currentEditingPane.getEditingPaneData().getTabsData();
		const selectedTabData = tabsData.getSelectedTabData();
      selectedTabData.setTabBackgroundImageBase64DataUrl( dataUrl );
      this.setState({rerender:true});
    };
    fr.onerror = (pe) => {
      OCUtil.logErrorWithNotification("Failed to read background image blob.", i18n.t("Failed_to_read_file"), pe );
      return;
    }
    fr.readAsDataURL(blob);

  }
  
  
  _onChangeTabsBackgroundImageFile( ev ){
    const file = ev.target.files[0];
    if( !file){
      return;
    }

    if( !file.type || !file.type.toLowerCase().startsWith("image/") ){
      Notification.warning({message:i18n.t("It_is_not_an_image_file") });
      return;
    }

    if( !file.size || file.size === 0 ){
      Notification.warning({message:i18n.t("File_size_is_missing") });
      return;
    }

    if( file.size > BACKGROUND_IMAGE_FILE_SIZE_LIMIT_BYTES  ){
      Notification.warning({message:i18n.t("Image_file_size_is_too_large_Maximum_MB_Under") + BACKGROUND_IMAGE_FILE_SIZE_LIMIT_MEGABYTES + "MB"});
      return;
    }

    const blob = new Blob([file], { type: file.type });

    const fr = new FileReader();
    fr.onload = () => {
      const dataUrl = fr.result; // base64 data url
		const currentEditingPane = this.state.settingsContainerOrDivider;
		const tabsData = currentEditingPane.getEditingPaneData().getTabsData();

      tabsData.setTabsBackgroundImageBase64DataUrl( dataUrl );
      this.setState({rerender:true});
    };
    fr.onerror = (pe) => {
      OCUtil.logErrorWithNotification("Failed to read background image blob.", i18n.t("Failed_to_read_file"), pe );
      return;
    }
    fr.readAsDataURL(blob);

  }

  _deleteTabBackgroundImage(){
	const currentEditingPane = this.state.settingsContainerOrDivider;
	const tabsData = currentEditingPane.getEditingPaneData().getTabsData();
	const selectedTabData = tabsData.getSelectedTabData();
    selectedTabData.deleteTabBackgroundImageBase64DataUrl();
    const eInputFile = document.getElementById("tabBackgroundImage_File_EditScreenView_OperatorConsole_Brekeke");
    eInputFile.value = null;
    this.setState({rerender:true});
  }
  
  _deletePaneBackgroundImage(){
    const currentEditingPane = this.state.settingsContainerOrDivider;
    const paneData = currentEditingPane.getEditingPaneData();
    paneData.deletePaneBackgroundImageBase64DataUrl();
    const eInputFile = document.getElementById("paneBackgroundImage_File_EditScreenView_OperatorConsole_Brekeke");
    eInputFile.value = null;
    this.setState({rerender:true});
  }
  
  _deleteTabsBackgroundImage(){
	const currentEditingPane = this.state.settingsContainerOrDivider;
	const tabsData = currentEditingPane.getEditingPaneData().getTabsData();
	tabsData.deleteTabsBackgroundImageBase64DataUrl();
    const eInputFile = document.getElementById("tabsBackgroundImage_File_EditScreenView_OperatorConsole_Brekeke");
    eInputFile.value = null;
    this.setState({rerender:true});
  }

  _deleteBackgroundImage(){
    this._ScreenData.deleteBackgroundImageBase64DataUrl();
    const eInputFile = document.getElementById("backgroundImage_File_EditScreenView_OperatorConsole_Brekeke");
    eInputFile.value = null;
    this.setState({rerender:true});
  }

  _getSettingsAreaJsx() {
    let jsx;

    switch( this.state.propertiesMode ){
      case _PROPERTIES_MODE.pane:
      {
        const currentEditingPane = this.state.settingsContainerOrDivider;
        const paneData = currentEditingPane.getEditingPaneData();
        const enableTabs = paneData.getEnableTabs();

        const tabsData = paneData.getTabsData();
        const selectedTabData = tabsData.getSelectedTabData();
        jsx = (
            <div className="editorRightFrameRoot">
              <div>
                <div>
                  {i18n.t("Tabs")}:
                </div>
                <div>
                  <Select name="enableTabs"
                      //defaultValue={enableTabs.toString()}
                          onChange={(value) => this._onChangeTabsEnable(value)} value={enableTabs.toString()}>
                    <Select.Option value={_TABS_SELECT_OPTIONS.disable.toString()}>{i18n.t("Disable")}</Select.Option>
                    <Select.Option value={_TABS_SELECT_OPTIONS.enable.toString()}>{i18n.t("Enable")}</Select.Option>
                  </Select>
                </div>
              </div>
              <div>
                <div className="defaultSectionMarginTop">
                  {i18n.t("Area")}:
                </div>
                <div>
                  <Button style={{width: "100%"}} onClick={() => {
                    this._splitVertically();
                  }}>{i18n.t("splitVertically")}
                  </Button>
                </div>
                <div className="defaultButtonMarginTop">
                  <Button style={{width: "100%"}} onClick={() => {
                    this._splitHorizontally();
                  }}>{i18n.t("splitHorizontally")}
                  </Button>
                </div>
              </div>
              { !enableTabs ? (
                  <>
                <div>
                  <div className="defaultSectionMarginTop">
                    {i18n.t("foreground")}:
                  </div>
                  <div>
                    <Dropdown overlay={<SketchPicker
                        color={paneData.getPaneForegroundColor()}
                        onChangeComplete={this._setPaneForegroundColor}
                    />}>
                      <div style={{
                        width: 48,
                        height: 30,
                        display: 'inline-block',
                        border: 'solid 1px #e0e0e0',
                        background: paneData.getPaneForegroundColor()
                      }}></div>
                    </Dropdown>
                  </div>
                </div>
                <div>
                  <div className="defaultSectionMarginTop">
                    {i18n.t("background")}:
                  </div>
                  <div>
                    <Dropdown overlay={<SketchPicker
                        color={paneData.getPaneBackgroundColor()}
                        onChangeComplete={this._setPaneBackgroundColor}
                    />}>
                      <div style={{
                        width: 48,
                        height: 30,
                        display: 'inline-block',
                        border: 'solid 1px #e0e0e0',
                        background: paneData.getPaneBackgroundColor()
                      }}></div>
                    </Dropdown>
                  </div>
                </div>
              <div>
                <div className="defaultSectionMarginTop">
                  {i18n.t("BackgroundImage")}:
                </div>
                <div>
                  <input type="file" id="paneBackgroundImage_File_EditScreenView_OperatorConsole_Brekeke"
                         onChange={(ev) => this._onChangePaneBackgroundImageFile(ev)}/>
					{ paneData.getPaneBackgroundImageBase64DataUrl() ? ( <Popconfirm title={i18n.t("are_you_sure")} onConfirm={ () => this._deletePaneBackgroundImage() }
                              okText={i18n.t("yes")}
                              cancelText={i18n.t("no")}
                  >
                    <a style={{marginLeft: "0px"}} className="icon_general">
                      {<FontAwesomeIcon
                          size="lg"
                          icon="fa fa-trash"/>}
                    </a>
					</Popconfirm> ) : null }
                </div>
              </div>
              </>
			  ) : null }
            </div>
      )
        ;
        break;
      }
      case _PROPERTIES_MODE.divider: {
        jsx = (
            <div className="editorRightFrameRoot">
              <Popconfirm title={i18n.t("confirmRemoveSplitter")} onConfirm={() => this._removeSplitter()}
                          okText={i18n.t("yes")}
                          cancelText={i18n.t("no")}
              >
                <Button>{i18n.t("removeSplitter")}</Button>
              </Popconfirm>
            </div>
        );
        break;
      }
      case _PROPERTIES_MODE.tab: {
        const currentEditingPane = this.state.settingsContainerOrDivider;
        const tabsData = currentEditingPane.getEditingPaneData().getTabsData();
        const selectedTabData = tabsData.getSelectedTabData();
        const tabLabel = selectedTabData.getTabLabel();

        jsx = (
            <div className="editorRightFrameRoot">
              <div>
                <Input type="text" name="tabLabel" defaultValue={tabLabel}/>
              </div>
              <div style={{whiteSpace: "nowrap"}}>
                {/*<Input type="text" name="tabLabel" defaultValue={i18n.t("UntitledTab")} />*/}
                <Button className="defaultElementMarginTop"
                        onClick={(ev) => this._onClickAddTab(ev)}>{i18n.t("Add_tab")}</Button>
                <Button className="defaultButtonMarginLeft"
                        onClick={(ev) => this._onClickRenameTab(ev)}>{i18n.t("Rename_tab")}</Button>
              </div>
              <div className="defaultButtonMarginTop">
                <Popconfirm title={i18n.t("Are_you_sure_you_want_to_remove_the_tab")}
                            onConfirm={() => this._onClickRemoveTab()}
                            okText={i18n.t("yes")}
                            cancelText={i18n.t("no")}
                >
                  <Button>{i18n.t("Remove_tab")}</Button>
                </Popconfirm>
              </div>
              <Divider>{i18n.t("Header")}</Divider>
              <div>
                <div className="defaultSectionMarginTop">
                  {i18n.t("Item_font_size")}:
                </div>
                <div>
                  <InputNumber min="0" value={tabsData.getTabsTitleFontSize()}
                               onChange={(n) => this._onChangeTabsTitleFontSize(n)}/>
                </div>
              </div>
              <div>
                <div className="defaultSectionMarginTop">
                  {i18n.t("Item_color")}:
                </div>
                <div>
                  <Dropdown overlay={<SketchPicker
                      color={tabsData.getTabsItemColor()}
                      onChangeComplete={this._setTabsItemColor}
                  />}>
                    <div style={{
                      width: 48,
                      height: 30,
                      display: 'inline-block',
                      border: 'solid 1px #e0e0e0',
                      background: tabsData.getTabsItemColor()
                    }}></div>
                  </Dropdown>
                </div>
              </div>
              <div>
                <div className="defaultSectionMarginTop">
                  {i18n.t("Item_color_on_hover")}:
                </div>
                <div>
                  <Dropdown overlay={<SketchPicker
                      color={tabsData.getTabsItemHoverColor()}
                      onChangeComplete={this._setTabsItemHoverColor}
                  />}>
                    <div style={{
                      width: 48,
                      height: 30,
                      display: 'inline-block',
                      border: 'solid 1px #e0e0e0',
                      background: tabsData.getTabsItemHoverColor()
                    }}></div>
                  </Dropdown>
                </div>
              </div>
              <div>
                <div className="defaultSectionMarginTop">
                  {i18n.t("Item_color_on_selected")}:
                </div>
                <div>
                  <Dropdown overlay={<SketchPicker
                      color={tabsData.getTabsItemSelectedColor()}
                      onChangeComplete={this._setTabsItemSelectedColor}
                  />}>
                    <div style={{
                      width: 48,
                      height: 30,
                      display: 'inline-block',
                      border: 'solid 1px #e0e0e0',
                      background: tabsData.getTabsItemSelectedColor()
                    }}></div>
                  </Dropdown>
                </div>
              </div>
              <div>
                <div className="defaultSectionMarginTop">
                  {i18n.t("Item_bar_color")}:
                </div>
                <div>
                  <Dropdown overlay={<SketchPicker
                      color={tabsData.getTabsInkBarColor()}
                      onChangeComplete={this._setTabsInkBarColor}
                  />}>
                    <div style={{
                      width: 48,
                      height: 30,
                      display: 'inline-block',
                      border: 'solid 1px #e0e0e0',
                      background: tabsData.getTabsInkBarColor()
                    }}></div>
                  </Dropdown>
                </div>
              </div>
              <div>
                <div className="defaultSectionMarginTop">
                  {i18n.t("background")}:
                </div>
                <div>
                  <Dropdown overlay={<SketchPicker
                      color={tabsData.getTabsBackgroundColor()}
                      onChangeComplete={this._setTabsBackgroundColor}
                  />}>
                    <div style={{
                      width: 48,
                      height: 30,
                      display: 'inline-block',
                      border: 'solid 1px #e0e0e0',
                      background: tabsData.getTabsBackgroundColor()
                    }}></div>
                  </Dropdown>
                </div>
              </div>
              <div>
                <div className="defaultSectionMarginTop">
                  {i18n.t("BackgroundImage")}:
                </div>
                <div>
                  <input type="file" id="tabsBackgroundImage_File_EditScreenView_OperatorConsole_Brekeke"
                         onChange={(ev) => this._onChangeTabsBackgroundImageFile(ev)}/>
                  {tabsData.getTabsBackgroundImageBase64DataUrl() ? (
                      <Popconfirm title={i18n.t("are_you_sure")} onConfirm={() => this._deleteTabsBackgroundImage()}
                                  okText={i18n.t("yes")}
                                  cancelText={i18n.t("no")}
                      >
                        <a style={{marginLeft: "0px"}} className="icon_general">
                          {<FontAwesomeIcon
                              size="lg"
                              icon="fa fa-trash"/>}
                        </a>
                      </Popconfirm>) : null}
                </div>
              </div>
              <Divider>{i18n.t("Body")}</Divider>
              <div>
                <div className="defaultSectionMarginTop">
                  {i18n.t("foreground")}:
                </div>
                <div>
                  <Dropdown overlay={<SketchPicker
                      color={selectedTabData.getTabForegroundColor()}
                      onChangeComplete={this._setTabForegroundColor}
                  />}>
                    <div style={{
                      width: 48,
                      height: 30,
                      display: 'inline-block',
                      border: 'solid 1px #e0e0e0',
                      background: selectedTabData.getTabForegroundColor()
                    }}></div>
                  </Dropdown>
                </div>
              </div>
              <div>
                <div className="defaultSectionMarginTop">
                  {i18n.t("background")}:
                </div>
                <div>
                  <Dropdown overlay={<SketchPicker
                      color={selectedTabData.getTabBackgroundColor()}
                      onChangeComplete={this._setTabBackgroundColor}
                  />}>
                    <div style={{
                      width: 48,
                      height: 30,
                      display: 'inline-block',
                      border: 'solid 1px #e0e0e0',
                      background: selectedTabData.getTabBackgroundColor()
                    }}></div>
                  </Dropdown>
                </div>
              </div>
              <div>
                <div className="defaultSectionMarginTop">
                  {i18n.t("BackgroundImage")}:
                </div>
                <div>
                  <input type="file" id="tabBackgroundImage_File_EditScreenView_OperatorConsole_Brekeke"
                         onChange={(ev) => this._onChangeTabBackgroundImageFile(ev)}/>
                  {selectedTabData.getTabBackgroundImageBase64DataUrl() ? (
                      <Popconfirm title={i18n.t("are_you_sure")} onConfirm={() => this._deleteTabBackgroundImage()}
                                  okText={i18n.t("yes")}
                                  cancelText={i18n.t("no")}
                      >
                        <a style={{marginLeft: "0px"}} className="icon_general">
                          {<FontAwesomeIcon
                              size="lg"
                              icon="fa fa-trash"/>}
                        </a>
                      </Popconfirm>) : null}
                </div>
              </div>
            </div>
        );
        break;
      }
      case _PROPERTIES_MODE.widget: {
        const widgetData = this.state.selectingEditorWidgetData;
        // const mainJsx = EditorWidgetSettingsFactory.getStaticEditorWidgetSettingsFactoryInstance().getRenderJsx( this, widgetData );
        //
        // jsx = (
        //     <div className="editorRightFrameRoot">
        //       {mainJsx}
        //     </div>
        // );
        jsx = EditorWidgetSettingsFactory.getStaticEditorWidgetSettingsFactoryInstance().getRenderJsx(this, widgetData);
        break;
      }
      default: {
        jsx = (
            <div className="editorRightFrameRoot">
              {i18n.t("Click_on_any_area_or_splitter_or_widget_or_tab_on_the_left")}
            </div>
        );
        break;
      }
    }
    return jsx;
  }

  render() {
    const settingsAreaJsx = this._getSettingsAreaJsx();
    let backgroundImage;
    const bgImageBase64DataUrl = this._ScreenData.getScreenBackgroundImageBase64DataUrl();
    if (bgImageBase64DataUrl) {
      backgroundImage = "url(" + bgImageBase64DataUrl + ")";
    } else {
      backgroundImage = null;
    }
    return (
        <>
          <SelectIconModal editScreenViewAsParent={this}/>
          <div style={{display: "flex", flexFlow: "column", alignItems: "stretch", height: "100%"}}>
            <div style={{display: "flex", alignItems: "center", height: "47ox"}}>
              <div style={{width: "240px"}}>
                <img style={{marginTop: "4px", marginLeft: "4px"}} src={logo}/>
              </div>
              {/*<DropDownMenu operatorConsole={this._OperatorConsoleAsParent}></DropDownMenu>*/}
              <Space>
                <label style={{whiteSpace: "nowrap"}}>{i18n.t("grid")}{": "}
                  <InputNumber value={this.getEditingScreenGrid()}
                               onPressEnter={(e) => this.setEditingScreenGrid(parseInt(e.target.value))}
                               onStep={(v) => this.setEditingScreenGrid(v)}
                  />
                </label>
                <label style={{display: 'flex', alignItems: 'center', whiteSpace: 'pre'}}>
                  {i18n.t("foreground")}{": "}
                  <Dropdown overlay={<SketchPicker
                      color={this._ScreenData.getScreenForegroundColor()}
                      onChangeComplete={this.setScreenForegroundColor}
                  />}>
                    <div style={{
                      width: 48,
                      height: 30,
                      display: 'inline-block',
                      border: 'solid 1px #e0e0e0',
                      background: this._ScreenData.getScreenForegroundColor()
                    }}></div>
                  </Dropdown>
                </label>
                <label style={{display: 'flex', alignItems: 'center', whiteSpace: 'pre'}}>
                  {i18n.t("background")}{": "}
                  <Dropdown overlay={<SketchPicker
                      color={this._ScreenData.getScreenBackgroundColor()}
                    onChangeComplete={this.setScreenBackgroundColor}
                />}>
                  <div style={{
                    width: 48,
                    height: 30,
                    display: 'inline-block',
                    border: 'solid 1px #e0e0e0',
                    background: this._ScreenData.getScreenBackgroundColor()
                  }}></div>
                </Dropdown>
              </label>
              <label style={{display: 'flex', alignItems: 'center', whiteSpace: 'pre'}}>
                {i18n.t("BackgroundImage")}{": "}
                <input type="file" id="backgroundImage_File_EditScreenView_OperatorConsole_Brekeke" onChange={ (ev) => this._onChangeBackgroundImageFile(ev)} />
              </label>
              { bgImageBase64DataUrl ? (<Popconfirm title={i18n.t("are_you_sure")} onConfirm={ () => this._deleteBackgroundImage() }
                          okText={i18n.t("yes")}
                          cancelText={i18n.t("no")}
              >
                <a style={{marginLeft: "0px", marginRight:"4px"}} className="icon_general">
                  {<FontAwesomeIcon
                      size="lg"
                      icon="fa fa-trash"/>}
                </a>
              </Popconfirm>) : null }
            </Space>
            <div style={{marginLeft: "auto", marginRight: "4px"}}>
              <Space>
                <Popconfirm title={i18n.t("are_you_sure")} onConfirm={() => this._abortEditingScreen()}
                            okText={i18n.t("yes")}
                            cancelText={i18n.t("no")}
                >
                  <Button type="secondary">{i18n.t("discard")}</Button>
                </Popconfirm>
                <Space/>
                <Button type="success" htmlType="cancel" onClick={() => this._saveEditingScreen()}>
                  {i18n.t("save")}
                </Button>
              </Space>
            </div>
          </div>
          <div style={{display: "flex", height: "calc(100% - 47px)"}}>
            <div style={{width: "240px", overflowY: "auto"}}>
              {/* left -  widget templates area*/}
              {this._getWidgetTemplatesAreaJsx()}
            </div>
            <div style={{width: "calc(100% - 500px)", overflow: "auto",
                foregroundColor:this._ScreenData.getScreenForegroundColor(),
                backgroundColor:this._ScreenData.getScreenBackgroundColor(),
                backgroundImage:backgroundImage
              }}
                 className="ScreenView_general"
            >
              <EditorRootPane
                  paneData={this._RootPaneData}
                  editScreenViewAsParent={this}
                  className="width100percentAndHeight100percent"/>
            </div>
            <div style={{
              width: "260px",
              borderLeft: "rgb(224,224,224)",
              display: "flex",
              flexDirection: "column",
              gap: "12px",
              overflow: "hidden",
              margin:"4px"
            }}>
              {settingsAreaJsx}
            </div>
          </div>
        </div>
        </>
    )
  }

}