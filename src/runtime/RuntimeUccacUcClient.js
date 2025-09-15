import React, {createRef} from "react";
import Util from "../Util";
import i18n from "../i18n";
import BrekekeOperatorConsole from "../index";
import AutoDialView_ver2 from "./AutoDialView_ver2";
import UcUserStatuses from "../UcUserStatuses";

export default class RuntimeUccacUcClient {
    constructor( runtimeUccacUcClientsAsParent ) {
        this._Parent = runtimeUccacUcClientsAsParent;
        this._isRestartButtonDisabled = false;
        const oc = BrekekeOperatorConsole.getStaticInstance();
        this._UccacWrapper = oc.getUccacWrapper();
        this._uccacRootElementRef = createRef();

        //this._onUccacInitSuccessFunction = (uccacWrapperAsCaller) => {
            //this._onInitUccacWrapperSuccessByUccacWrapper(uccacWrapperAsCaller);
        //};
        //this._UccacWrapper.addOnUccacInitSuccessFunction(this._onUccacInitSuccessFunction);

        this._onUccacBeforeDeinitFunction = (uccacWrapperAsCaller) => {
            this._onBeforeDeinitUccacWrapperByUccacWrapper(uccacWrapperAsCaller);
        };
        this._UccacWrapper.addOnUccacBeforeDeinitFunction(this._onUccacBeforeDeinitFunction);
		this._reactComponentAsUser = undefined;
    }

    // _onInitUccacWrapperSuccessByUccacWrapper(  uccacWrapperAsCaller  ){
    //     if( this._reactComponentAsUser) {
    //         this._reactComponentAsUser.setState({rerender: true}, () => {
    //             this._initUccacAc();
    //         });
    //     }
    // }

    _onBeforeDeinitUccacWrapperByUccacWrapper(uccacWrapperAsCaller  ){
        this._destroyUccacAc();
    }


    unuseRuntimeUccacUcClient(){
        this._Parent.onBeforeUnuseRuntimeUccacUcClientByRuntimeUccacUcClient(this);

		this._reactComponentAsUser = null;
        if( !this._uccacAc ) {
            return false;
        }
        //AutoDialView_ver2.getStaticInstance().onBeforeDestroyUccacAc(this);
        //UcUserStatuses.getUcUserStatusesStaticInstance().onBeforeDestroyUccacAcByLegacyUccacRuntimeWidget(this);
        this._uccacAc.stopUCClient();
		//this._Parent.onUnuseRuntimeUccacUcClientByRuntimeUccacUcClient(this);
		return true;
    }
	
	getReactComponentAsUser(){
		return this._reactComponentAsUser;
	}
	
    onUseRuntimeUccacUcClientWithoutInitByRuntimeUccacUcClients( runtimeUccacUcClientsAsCaller, reactComponentAsUser ){
        //this._initUccacAc();
		this._reactComponentAsUser = reactComponentAsUser;
	}

    initRuntimeUccacUcClientzUccacAc( ucclientSigninOptionzStatus ){
        if( !this._UccacWrapper.isInitialized() === true ) {
            return false;
        }
        if( this._uccacAc ) {
            return false;
        }
        this._initUccacAc( ucclientSigninOptionzStatus );
        return true;
    }

    getUccacAc(){
        return this._uccacAc;
    }

    onComponentDidMountByLegacyUccacRuntimeWidget( legacyUCcacRuntimeWidget ){
        //super.componentDidMount();
        this._refreshUccacAc();
    }

    _refreshUccacAc(){
        if( this._UccacWrapper.isInitialized() === true ){
            this._initUccacAc();
        }
        else{
            this._destroyUccacAc();
        }
    }

    onComponentWillUnmount() {
        this._destroyUccacAc();
        this._UccacWrapper.removeOnUccacInitSuccessFunction( this._onUccacInitSuccessFunction );
        this._UccacWrapper.removeOnUccacBeforeDeinitFunction( this._onUccacBeforeDeinitFunction );
        //super.componentWillUnmount();
    }

    _destroyUccacAc(){
        if( !this._uccacAc ) {
            return false;
        }
        //AutoDialView_ver2.getStaticInstance().onBeforeDestroyUccacAc(this);
        //UcUserStatuses.getUcUserStatusesStaticInstance().onBeforeDestroyUccacAcByLegacyUccacRuntimeWidget(this);
        this._uccacAc.destroy();
        this._uccacAc = null;
        //AutoDialView_ver2.getStaticInstance().onDestroyUccacAc(this);
        return true;
    }
	
	destructRuntimeUccacUcClient(){
		this._destroyUccacAc();
	}

    _initUccacAc( ucclientSigninOptionzStatus = undefined ){

        if( this._uccacAc ){
            //AutoDialView_ver2.getStaticInstance().onBeforeDestroyUccacAc(this);
            //UcUserStatuses.getUcUserStatusesStaticInstance().onBeforeDestroyUccacAcByLegacyUccacRuntimeWidget(this);
            this._uccacAc.destroy(); 		//!optimize //!bad  stopucclient is better if possible.
            this._uccacAc = null;
        }

        const eUccacRoot = this._uccacRootElementRef.current;
        const eWebchatqueue = eUccacRoot.querySelector('span[name="webchatqueue"]');
        const eWebchatpickup = eUccacRoot.querySelector('span[name="webchatpickup"]');
        const eSearch  = eUccacRoot.querySelector('span[name="search"]');
        const eUcclientPanelRoot  = eUccacRoot.querySelector('div[name="ucclientPanelRoot"]');

        this._uccacAc = this._UccacWrapper.addUccacAc();
        const initUccacAcOptions ={
            acIconParentsWebchatqueue : eWebchatqueue,
            acIconParentsWebchatpickup : eWebchatpickup,
            acIconParentsSearch : eSearch
        };
        this._uccacAc.init( initUccacAcOptions  );
        //UcUserStatuses.getUcUserStatusesStaticInstance().onInitUccacAcByLegacyUccacRuntimeWidget(this);

        const oc = BrekekeOperatorConsole.getStaticInstance();
        const startUCClientOptions = {
            ucclientWidgetParent : eUcclientPanelRoot,
            ucclientUcurl: this._UccacWrapper.getUcurl(),
            ucclientTenant: oc.getLoginTenantname(),
            ucclientUser:oc.getLoginUsername(),
            ucclientPass:oc.getLoginPassword(),
            ucclientStatus:ucclientSigninOptionzStatus
        }
		this._isRestartButtonDisabled = true;
		const reactComponentAsUser = this._reactComponentAsUser;
		reactComponentAsUser.setState({rerender:true});
		//this._runtimeUccacUcClientUser.onIsRestartButtonDisabledByRuntimeUccacUcClient(this);
		this._uccacAc.startUCClient(startUCClientOptions);
		//UcUserStatuses.getUcUserStatusesStaticInstance().onStartUccacAcByLegacyUccacRuntimeWidget(this);
		setTimeout( ()=>{
			this._isRestartButtonDisabled = false;
			reactComponentAsUser.setState({rerender:true});
			//this._runtimeUccacUcClientUser.onIsRestartButtonEnabledByRuntimeUccacUcClient(this);
		},8000);
        this._Parent.onStartUcClientByRuntimeUccacUcClient(this);

    //AutoDialView_ver2.getStaticInstance().onStartUCClient( this );
    }

    _onClickRestart(){

        const bConfirm = confirm( i18n.t("confirmRestartUccac") );
        if( !bConfirm ){
            return;
        }


		this._isRestartButtonDisabled = true;
		const reactComponentAsUser = this._reactComponentAsUser;
		reactComponentAsUser.setState({rerender:true}, ()=>
        {
            this._uccacAc.stopUCClient();
            const eUccacRoot = this._uccacRootElementRef.current;
            const eUcclientPanelRoot = eUccacRoot.querySelector('div[name="ucclientPanelRoot"]');
            const oc = BrekekeOperatorConsole.getStaticInstance();
            const startUCClientOptions = {
                ucclientWidgetParent: eUcclientPanelRoot,
                ucclientUcurl: this._UccacWrapper.getUcurl(),
                ucclientTenant: oc.getLoginTenantname(),
                ucclientUser: oc.getLoginUsername(),
                ucclientPass: oc.getLoginPassword()
            }
            this._uccacAc.startUCClient(startUCClientOptions);
            setTimeout( ()=>{
				this._isRestartButtonDisabled = false;
				reactComponentAsUser.setState({rerender:true});
			},8000);
            this._Parent.onRestartUcClientByRuntimeUccacUcClient(this);
        });
    }
	
    getRenderJsx( props ){
        if( !this._UccacWrapper.isInitialized() ){
            return (<div style={{
                display:"flex",
                flexWrap:"wrap",
                height:"100%",
                borderRadius: props["borderRadius"],
                backgroundColor: props["backgroundColor"],
                boxShadow: props["boxShadow"],
                color: props["backgroundColor"],
                padding:6
            }}>{i18n.t("ucChatAgentComponentHasNotBeenInitialized")}</div> );
        }
        else {
            return (
                <div style={{
                    height: "100%",
                    borderRadius: props["borderRadius"],
                    backgroundColor: props["backgroundColor"],
                    boxShadow: props["boxShadow"],
                    color: props["backgroundColor"]
                }}>
                    <div ref={this._uccacRootElementRef} style={{ display: "flex",  flexWrap: "wrap",  height:"calc(100% - 30px)"}}>
                        <div style={{position: "relative", width: "50%", height: "100%"}}>
                            <span name={"webchatqueue"}></span>
                            <span name={"webchatpickup"}></span>
                            <span name={"search"}></span>
                        </div>
                        <div name={"ucclientPanelRoot"}
                             style={{position: "relative", width: "50%", height: "100%"}}>
                        </div>
                    </div>
                    <div style={{height:30,padding:4}}>
                        <button disabled={this._isRestartButtonDisabled} onClick={this._onClickRestart.bind(this)}>{i18n.t("restart")}</button>
                    </div>
                </div>
                // <div className="brOCCallPanel" style={{
                //     borderRadius: borderRadius,
                //     backgroundColor: uccacWidgetBgColor,
                //     boxShadow: sBoxShadow,
                //     color: uccacWidgetFgColor
                // }}>
                //     <div className="brOCCallPanelRow">
                //         <div className="brOCCallPanelLeft">
                //             {!!call && (call.incoming ? IconPhoneIncoming : IconPhoneOutgoing)}
                //         </div>
                //         <div className="brOCCallPanelMain">
                //             <div className="brOCCallPanelPartyNumber">{call?.partyNumber}</div>
                //             <div className="brOCCallPanelDuration">{this.state.duration}</div>
                //         </div>
                //     </div>
                //     <div className="brOCCallPanelRow">
                //         {!!this.props.dialing && (
                //             <div className="brOCCallPanelLeft">{IconKeyboard}</div>
                //         )}
                //         <div className="brOCCallPanelMain">
                //             <div className="brOCCallPanelDialing">{this.props.dialing}</div>
                //         </div>
                //     </div>
                // </div>
            )
        }
    }

}