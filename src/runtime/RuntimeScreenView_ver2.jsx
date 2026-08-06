import React from "react";
import logo from "../logo.png";
import EditorRootPane from "../editor/EditorRootPane";
import DropDownMenu from "../DropDownMenu";
import RuntimeRootPane from "./RuntimeRootPane";
import AutoDialView_ver2 from "./AutoDialView_ver2";
import QuickBusy_ver2 from "./QuickBusy_ver2";
import {Modal} from "antd";
import i18n from "../i18n";
import BrekekeOperatorConsole from "../index";
import RuntimeUccacUcClients from "./RuntimeUccacUcClients";
import RuntimeHiddenUccacUcClient from "./RuntimeHiddenUccacUcClient";

export default class RuntimeScreenView_ver2 extends React.Component{

  constructor( props ) {
    super( props );
    this._OperatorConsoleAsParent = props["operatorConsoleAsParent"];
	this._RuntimeUccacUcClients = new RuntimeUccacUcClients(this);
    this.state = {showSelectCallingMethodModal:false,showCallSelectionModal:false};
  }

  onTabClickByRuntimePane( runtimePanelAsCaller, tabKey, mouseEvent ){
    runtimePanelAsCaller.setRuntimePanezSelectedTabKeyAsString( tabKey );
  }

  _handleShowSelectCallingMethodModalOk(){
    //this.setState({showSelectCallingMethodModal: false});

    let dialing;
    if( this.state.dialingForSelectCallingMethodModal ){
      dialing = this.state.dialingForSelectCallingMethodModal;
    }
    else{
      dialing = this._OperatorConsoleAsParent.getDialing();
    }
    //Search short dial
    let shortDialing = null;
	if( dialing ){
		const userShortDials = this._OperatorConsoleAsParent.getUserSettingsData().getShortDials();
		if( Array.isArray(userShortDials) ){
		  for (let i = 0; i < userShortDials.length; i++) {
			const shortDialObject = userShortDials[i];
			const shortDial = shortDialObject.shortDial;
			if (shortDial === dialing) {
			  shortDialing = shortDialObject.dial;
			  //this.setDialingAndMakeCall(shortDialing, context);
			  //return;
			  break;
			}
		  }
		}

		if( !shortDialing ){
			const shortDials = this._OperatorConsoleAsParent.getSystemSettingsData().getShortDials();
			if ( Array.isArray(shortDials) ) {
			  for (let i = 0; i < shortDials.length; i++) {
				const shortDialObject = shortDials[i];
				const shortDial = shortDialObject.shortDial;
				if (shortDial === dialing) {
				  shortDialing = shortDialObject.dial;
				  //this.setDialingAndMakeCall(shortDialing, context);
				  //return;
				  break;
				}
			  }
			}
		}
	}

    const eAttendedTransferCall = document.getElementById("attendedTransferCall_selectCallingMethod_RuntimeScreenView_ver2_brOC");
    const bAttendedTransfer =  eAttendedTransferCall.checked;

    const eBlindTransferCall = document.getElementById("blindTransferCall_selectCallingMethod_RuntimeScreenView_ver2_brOC");
    const bBlindTransfer =  eBlindTransferCall.checked;

    const eNewCall = document.getElementById("newCall_selectCallingMethod_RuntimeScreenView_ver2_brOC");
    const bNewCall =  eNewCall.checked;

    const bTransfer = bAttendedTransfer === true || bBlindTransfer === true;

    const callDialing = shortDialing ? shortDialing : dialing;
    if( this._OperatorConsoleAsParent.getDialing() !== callDialing ) {
      if( bTransfer === true || ( bTransfer === false && bNewCall === true ) ) {
        const transferMode = bBlindTransfer === true ? "blind" : "attended";
        this._OperatorConsoleAsParent.setDialingAndCallWithShowCallSelectionModal(callDialing, bTransfer, transferMode, false, dialing );
      }
    }
    else{
      if( bTransfer === true ){
        const transferMode = bBlindTransfer === true ? "blind" : "attended";
        this._OperatorConsoleAsParent.transferDialingCall( null, transferMode );
      }
      else if( bNewCall ){ //new call
        //this._OperatorConsoleAsParent.makeCall2();
		const transferMode = null;
        this._OperatorConsoleAsParent.setDialingAndCallWithShowCallSelectionModal(callDialing, bTransfer, transferMode, false, dialing );
      }
    }
    //Set radio to default and close modal
    this.setIsShowSelectCallingMethodModal(false);
	
	if( this.state.onShowSelectCallingMethodOkFunction ){
		this.state.onShowSelectCallingMethodOkFunction(this);
	}
  }

  _handleShowSelectCallingMethodModalCancel(){
	const oc = BrekekeOperatorConsole.getStaticInstance();
	const sOrgDialing = this.state.originalDialing;
	if( sOrgDialing !== undefined ){
		this.setState({originalDialing:undefined}, 
		()=>{
			oc.setDialingToState( sOrgDialing, null,
				() => { 
					//Set radio to default and close modal
					this.setIsShowSelectCallingMethodModal(false);
				} 
			);
		}
		);
	}
	else{
		//Set radio to default and close modal
		this.setIsShowSelectCallingMethodModal(false);
	}

  }
  
  _handleShowCallSelectionModalOk(){
    //this.setState({showSelectCallingMethodModal: false});

    //let dialing;
    //if( this.state.dialingForCallSelectionMethodModal ){
      //dialing = this.state.dialingForCallSelectionMethodModal;
    //}
    //else{
      //dialing = this._OperatorConsoleAsParent.getDialing();
    //}
	const dialing = this._OperatorConsoleAsParent.getDialing();

    //Short dial is already set up.
    // //Search short dial
    // let shortDialing = null;
	// if( dialing ){
	// 	const userShortDials = this._OperatorConsoleAsParent.getUserSettingsData().getShortDials();
	// 	if( Array.isArray(userShortDials) ){
	// 	  for (let i = 0; i < userShortDials.length; i++) {
	// 		const shortDialObject = userShortDials[i];
	// 		const shortDial = shortDialObject.shortDial;
	// 		if (shortDial === dialing) {
	// 		  shortDialing = shortDialObject.dial;
	// 		  //this.setDialingAndMakeCall(shortDialing, context);
	// 		  //return;
	// 		  break;
	// 		}
	// 	  }
	// 	}
	// 	if( !shortDialing ){
	// 		const shortDials = this._OperatorConsoleAsParent.getSystemSettingsData().getShortDials();
	// 		if ( Array.isArray(shortDials) ) {
	// 		  for (let i = 0; i < shortDials.length; i++) {
	// 			const shortDialObject = shortDials[i];
	// 			const shortDial = shortDialObject.shortDial;
	// 			if (shortDial === dialing) {
	// 			  shortDialing = shortDialObject.dial;
	// 			  //this.setDialingAndMakeCall(shortDialing, context);
	// 			  //return;
	// 			  break;
	// 			}
	// 		  }
	// 		}
	// 	}
	// }


    const eVoiceCall = document.getElementById("voiceCall_callSelection_RuntimeScreenView_ver2_brOC");
    const bVoiceCall =  eVoiceCall.checked;

    const eVideoCall = document.getElementById("videoCall_callSelection_RuntimeScreenView_ver2_brOC");
    const bVideoCall =  eVideoCall.checked;

    //const callDialing = shortDialing ? shortDialing : dialing;
      const callDialing = dialing;
    if( this._OperatorConsoleAsParent.getDialing() !== callDialing ) {
		this._OperatorConsoleAsParent.makeCall2(callDialing, bVideoCall );
    }
    else{
        this._OperatorConsoleAsParent.makeCall2( null, bVideoCall );
    }
    //Set radio to default and close modal
    this.setIsShowCallSelectionModal(false);
	if( this.state.onOkCallSelectionFunction ){
		this.state.onOkCallSelectionFunction(this);
	}
  }

  _handleShowCallSelectionModalCancel(){
    //Set radio to default and close modal
	const oc = BrekekeOperatorConsole.getStaticInstance();
	const sOrgDialing = oc.getOriginalDialing();
	if( sOrgDialing !== undefined ){
		oc.setDialingAndOriginalDialingToState( sOrgDialing, null,
            () => { this.setIsShowCallSelectionModal(false) } );
	}
	else{
		this.setIsShowCallSelectionModal(false);
	}
  }

  setIsShowSelectCallingMethodModal( b, dialing = null, onShowSelectCallingMethodOkFunction = undefined, originalDialing = undefined ){
    //no need
    // if( b === true ){
    //   //Did not work
    // //   //Set default radio and close modal
    // //   const eAttendedTransferCall = document.getElementById("attendedTransferCall_selectCallingMethod_RuntimeScreenView_ver2_brOC");
    // //   eAttendedTransferCall.checked = true;
    // }
    // else{
    //   if( this.state["showSelectCallingMethodModal"] === true ){
    //     //Set radio to default.
    //     const eAttendedTransferCall = document.getElementById("attendedTransferCall_selectCallingMethod_RuntimeScreenView_ver2_brOC");
    //     eAttendedTransferCall.checked = true;
    //   }
    // }
	if( b ){
		this.setState({dialingForSelectCallingMethodModal : dialing});
	}
    this.setState({ originalDialing : originalDialing, showSelectCallingMethodModal: b, onShowSelectCallingMethodOkFunction: onShowSelectCallingMethodOkFunction });
    const oc = BrekekeOperatorConsole.getStaticInstance();
    if( b ){
      oc.addDisableKeydownToDialingCounter();
      oc.addDisablePasteToDialingCounter();
    }
    else{
      oc.subtractDisableKeydownToDialingCounter();
      oc.subtractDisablePasteToDialingCounter();
    }
  }

  setIsShowCallSelectionModal( b, onOkCallSelectionFunction = undefined ){
    //no need
    // if( b === true ){
    //   //Did not work
    // //   //Set default radio and close modal
    // //   const eAttendedTransferCall = document.getElementById("attendedTransferCall_selectCallingMethod_RuntimeScreenView_ver2_brOC");
    // //   eAttendedTransferCall.checked = true;
    // }
    // else{
    //   if( this.state["showSelectCallingMethodModal"] === true ){
    //     //Set radio to default.
    //     const eAttendedTransferCall = document.getElementById("attendedTransferCall_selectCallingMethod_RuntimeScreenView_ver2_brOC");
    //     eAttendedTransferCall.checked = true;
    //   }
    // }
    this.setState({showCallSelectionModal: b, onOkCallSelectionFunction : onOkCallSelectionFunction });
    const oc = BrekekeOperatorConsole.getStaticInstance();
    if( b ){
      oc.addDisableKeydownToDialingCounter();
      oc.addDisablePasteToDialingCounter();
    }
    else{
      oc.subtractDisableKeydownToDialingCounter();
      oc.subtractDisablePasteToDialingCounter();
    }
  }
  
	componentWillUnmount(){
		this._RuntimeUccacUcClients.clearRuntimeUccacUcClients();
	}

  render() {
    this._OperatorConsoleAsParent.setCurrentRuntimeScreenView_Ver2(this); //!bad. This is a render method.

    const screenData_ver2 = this._OperatorConsoleAsParent.getScreenData_ver2();
    const rootPaneData = screenData_ver2.getScreenPaneDatas().getOrAddRootPaneData();
    const isVisibleAutoDialView_Ver2 =  this._OperatorConsoleAsParent.state.showAutoDialWidgetSubDatas_ver2 && this._OperatorConsoleAsParent.state.showAutoDialWidgetSubDatas_ver2.length !== 0;
	
	const oc = this._OperatorConsoleAsParent;

	let loggedInUserInfo_header_jsx;
	
	const loggedinUserExtension =  oc.getLoggedinUsername();
	if( loggedinUserExtension ) {
        const extInfos =  oc.getExtensions();
		let loggedinUserName;
		if( extInfos ){
			const extInfo = extInfos.find( info => info.id === loggedinUserExtension );
			if( extInfo ){
				loggedinUserName = extInfo["name"];
			}
		}
		let loggedinUserString;
		if( loggedinUserName && loggedinUserName.length !== 0 ){
			loggedinUserString = loggedinUserName + " / " + loggedinUserExtension;
		}
		else{
			loggedinUserString = loggedinUserExtension;
		}

		loggedInUserInfo_header_jsx = (
			<div className="loggedinUserInfo_header_RuntimeScreenView_ver2">
				<span>{loggedinUserString}</span>
			</div>
		);
	} else {
		loggedInUserInfo_header_jsx = <></>;
	}
	
    return (
        <>
        <RuntimeHiddenUccacUcClient runtimeScreenView_ver2AsParent={this}  />
        <div style={{height: "100%"}}>
			<div className="header_RuntimeScreenView_ver2">
				<img className="logo_header_RuntimeScreenView_ver2" src={logo}/>
				{loggedInUserInfo_header_jsx}
				<a className="headerLink_OcBr newLayoutHeaderLink_OcBr"
				   onClick={() => this._OperatorConsoleAsParent.setState({newLayoutModalOpen: true})}>
					{i18n.t("newLayout")}
				</a>
			</div>
			<div>
            <DropDownMenu operatorConsole={this._OperatorConsoleAsParent}></DropDownMenu>
            <AutoDialView_ver2
                isVisible={isVisibleAutoDialView_Ver2}
            />
            <QuickBusy_ver2 />
            <Modal title={i18n.t("Select_a_calling_method_TITLE")} open={this.state.showSelectCallingMethodModal}
                   onOk={() => this._handleShowSelectCallingMethodModalOk()}
                   onCancel={() => this._handleShowSelectCallingMethodModalCancel()}
                   maskClosable={false}
            >
              <p><input type="radio" name="selectCallingMethod_RuntimeScreenView_ver2_brOC"
                        id="attendedTransferCall_selectCallingMethod_RuntimeScreenView_ver2_brOC"
                        value="attendedTransferCall"
                        checked={true}/><label
                  htmlFor="attendedTransferCall_selectCallingMethod_RuntimeScreenView_ver2_brOC">{i18n.t("Attended_transfer_a_call_to_a_destination")}</label>
              </p>
              <p><input type="radio" name="selectCallingMethod_RuntimeScreenView_ver2_brOC"
                        id="blindTransferCall_selectCallingMethod_RuntimeScreenView_ver2_brOC"
                        value="blindTransferCall"
                        /><label
                  htmlFor="blindTransferCall_selectCallingMethod_RuntimeScreenView_ver2_brOC">{i18n.t("Blind_transfer_a_call_to_a_destination")}</label>
              </p>
              <p><input type="radio" name="selectCallingMethod_RuntimeScreenView_ver2_brOC"
                        id="newCall_selectCallingMethod_RuntimeScreenView_ver2_brOC" value="newCall"
              /><label
                  htmlFor="newCall_selectCallingMethod_RuntimeScreenView_ver2_brOC">{i18n.t("Make_a_new_call_without_transferring")}</label>
              </p>
            </Modal>
			<Modal title={i18n.t("Call_selection_TITLE")} open={this.state.showCallSelectionModal}
                   onOk={() => this._handleShowCallSelectionModalOk()}
                   onCancel={() => this._handleShowCallSelectionModalCancel()}
                   maskClosable={false}
            >
              <p><input type="radio" name="callSelection_RuntimeScreenView_ver2_brOC"
                        id="voiceCall_callSelection_RuntimeScreenView_ver2_brOC"
                        value="voiceCall"
                        checked={true}/><label
                  htmlFor="voiceCall_callSelection_RuntimeScreenView_ver2_brOC">{i18n.t("Voice_call")}</label>
              </p>
              <p><input type="radio" name="callSelection_RuntimeScreenView_ver2_brOC"
                        id="videoCall_callSelection_RuntimeScreenView_ver2_brOC"
                        value="videoCall"
                        /><label
                  htmlFor="videoCall_callSelection_RuntimeScreenView_ver2_brOC">{i18n.t("Video_call")}</label>
              </p>
            </Modal>
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
            <div className="RutimeRootPane_parent">
              <RuntimeRootPane paneData={ rootPaneData } runtimeScreenViewAsParent={this}  className="width100percentAndHeight100percent" />
            </div>
          </div>
        </div>
        </>
    )
  }

}