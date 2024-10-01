import React from "react";
import logo from "../logo.png";
import EditorRootPane from "../editor/EditorRootPane";
import DropDownMenu from "../DropDownMenu";
import RuntimeRootPane from "./RuntimeRootPane";
import AutoDialView_ver2 from "./AutoDialView_ver2";
import QuickBusy_ver2 from "./QuickBusy_ver2";

export default class RuntimeScreenView_ver2 extends React.Component{

  constructor( props ) {
    super( props );
    this._OperatorConsoleAsParent = props["operatorConsoleAsParent"];
  }

  onTabClickByRuntimePane( runtimePanelAsCaller, tabKey, mouseEvent ){
    runtimePanelAsCaller.setRuntimePanezSelectedTabKeyAsString( tabKey );
  }

  render() {
    const screenData_ver2 = this._OperatorConsoleAsParent.getScreenData_ver2();
    const rootPaneData = screenData_ver2.getScreenPaneDatas().getOrAddRootPaneData();
    const isVisibleAutoDialView_Ver2 =  this._OperatorConsoleAsParent.state.showAutoDialWidgetSubDatas_ver2 && this._OperatorConsoleAsParent.state.showAutoDialWidgetSubDatas_ver2.length !== 0;
    return (
        <div style={{display: "flex", flexFlow: "column", alignItems: "stretch", height: "100%"}}>
          <div style={{display: "flex", alignItems: "center",height:"47ox",color:screenData_ver2.getScreenForegroundColor(),backgroundColor:screenData_ver2.getScreenBackgroundColor()}}>
            <div>
              <img style={{marginTop: "4px", marginLeft: "4px"}} src={logo}/>
            </div>
            <DropDownMenu operatorConsole={this._OperatorConsoleAsParent}></DropDownMenu>
            <AutoDialView_ver2
                isVisible={isVisibleAutoDialView_Ver2}
            />
            <QuickBusy_ver2 />
            {/*<div style={{marginLeft: "auto", marginRight: "4px"}}>*/}
            {/*    <Space>*/}
            {/*        <Popconfirm title={i18n.t("are_you_sure")} onConfirm={() => this._abortEditingScreen()}*/}
            {/*                    okText={i18n.t("yes")}*/}
            {/*                    cancelText={i18n.t("no")}*/}
            {/*        >*/}
            {/*            <Button type="secondary">{i18n.t("discard")}</Button>*/}
            {/*        </Popconfirm>*/}
            {/*        <Space/>*/}
            {/*        <Button type="success" htmlType="cancel" onClick={() => this._saveEditingScreen()}>*/}
            {/*            {i18n.t("save")}*/}
            {/*        </Button>*/}
            {/*    </Space>*/}
            {/*</div>*/}
          </div>
          <div style={{display: "flex", height: "calc(100% - 47px)"}}>
            <div style={{width: "100%",overflow:"auto",marginLeft:"10px",marginBottom:"10px"}}>
              <RuntimeRootPane paneData={ rootPaneData } runtimeScreenViewAsParent={this}  className="width100percentAndHeight100percent" />
            </div>
          </div>
        </div>
    )
  }

}