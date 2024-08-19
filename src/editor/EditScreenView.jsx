import React from "react";
import logo from '../logo.png'
import DropDownMenu from "../DropDownMenu";
import Space from "antd/lib/space";
import Popconfirm from "antd/lib/popconfirm";
import i18n from "../i18n";
import Button from "antd/lib/button";
import {brOcDisplayStates} from "../index";
import EditorRootPane from "./EditorRootPane";
import EditorPane from "./EditorPane";
import EditorDivider from "./EditorDivider";
import BaseDividerData from "../data/BaseDividerData";
import {Input, Select} from "antd";
import PaneData from "../data/PaneData";
import Notification from "antd/lib/notification";
import EditorWidgetTemplateFactory from "./widget/template/EditorWidgetTemplateFactory";
import EditorWidgetSettingsFactory from "./widget/settings/EditorWidgetSettingsFactory";
import InputNumber from "antd/lib/input-number";
import Dropdown from "antd/lib/dropdown";
import {SketchPicker} from "react-color";

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

export default class EditScreenView extends React.Component {
  constructor( props ) {
    super( props );
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

  getScreenData(){
    return this._ScreenData;
  }

  setSelectingEditorWidgetDataToState( selectingEditorWidgetData, onSetStateFunc ){
    this.setState({selectingEditorWidgetData:selectingEditorWidgetData,propertiesMode: _PROPERTIES_MODE.widget}, onSetStateFunc );
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

  _getSettingsAreaJsx() {
    let jsx;

    switch( this.state.propertiesMode ){
      case _PROPERTIES_MODE.pane:
      {
        const currentEditingPane = this.state.settingsContainerOrDivider;
        const enableTabs = currentEditingPane.getEditorPanezEnableTabs();
        jsx = (
            <>
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
                <div>
                  {i18n.t("Area")}:
                </div>
                <div>
                  <Button style={{width:"100%"}} onClick={() => {
                    this._splitVertically();
                  }}>{i18n.t("splitVertically")}
                  </Button>
                </div>
                <div>
                  <Button style={{width:"100%"}} onClick={() => {
                    this._splitHorizontally();
                  }}>{i18n.t("splitHorizontally")}
                  </Button>
                </div>
              </div>
            </>
        );
        break;
      }
      case _PROPERTIES_MODE.divider:
      {
        jsx = (
            <Popconfirm title={i18n.t("confirmRemoveSplitter")} onConfirm={() => this._removeSplitter()}
                        okText={i18n.t("yes")}
                        cancelText={i18n.t("no")}
            >
              <Button>{i18n.t("removeSplitter")}</Button>
            </Popconfirm>
        );
        break;
      }
      case _PROPERTIES_MODE.tab:
      {
        jsx = (
            <>
              <div>
                <Input type="text" name="tabLabel" defaultValue={i18n.t("UntitledTab")} />
                <Button onClick={ (ev) => this._onClickAddTab(ev)}>{i18n.t("Add_tab")}</Button>
                <Button onClick={ (ev) => this._onClickRenameTab(ev)}>{i18n.t("Rename_tab")}</Button>
              </div>
              <div>
                <Popconfirm title={i18n.t("Are_you_sure_you_want_to_remove_the_tab")} onConfirm={() => this._onClickRemoveTab()}
                            okText={i18n.t("yes")}
                            cancelText={i18n.t("no")}
                >
                  <Button>{i18n.t("Remove_tab")}</Button>
                </Popconfirm>

              </div>
            </>
        );
        break;
      }
      case _PROPERTIES_MODE.widget: {
        const widgetData = this.state.selectingEditorWidgetData;
        jsx = EditorWidgetSettingsFactory.getStaticEditorWidgetSettingsFactoryInstance().getRenderJsx( this, widgetData );
        break;
      }
      default:
      {
        jsx = i18n.t("Click_on_any_area_or_splitter_or_widget_or_tab_on_the_left");
        break;
      }
    }
    return jsx;
  }

  render() {
    const settingsAreaJsx = this._getSettingsAreaJsx();
    return (
        <div style={{display: "flex", flexFlow: "column", alignItems: "stretch", height: "100%"}}>
          <div style={{display: "flex", alignItems: "center",height:"47ox"}}>
            <div style={{width:"240px"}}>
              <img style={{marginTop: "4px", marginLeft: "4px"}} src={logo}/>
            </div>
            {/*<DropDownMenu operatorConsole={this._OperatorConsoleAsParent}></DropDownMenu>*/}
            <Space>
              <label>{i18n.t("grid")}{": "}
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
            <div style={{width: "calc(100% - 500px)", overflow: "auto"}}>
              <EditorRootPane paneData={this._RootPaneData} editScreenViewAsParent={this} foregroundColor={this._ScreenData.getScreenForegroundColor()} backgroundColor={this._ScreenData.getScreenBackgroundColor()}
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
    )
  }

}