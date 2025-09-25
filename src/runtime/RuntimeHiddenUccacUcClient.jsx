import React from "react";
import RuntimeUccacUcClients from "./RuntimeUccacUcClients";
import BrekekeOperatorConsole from "../index";

let RUNTIME_HIDDEN_UCCAC_UC_CLIENT;
export default class RuntimeHiddenUccacUcClient extends React.Component{
    constructor( props ) {
        super( props );
        RUNTIME_HIDDEN_UCCAC_UC_CLIENT = this;
        this._RuntimeScreenView_ver2AsParent = props["runtimeScreenView_ver2AsParent"];
        this._currentRuntimeUccacUcClient = undefined;
    }

    static getRuntimeHiddenUccacUcClientStaticInstance(){
        return RUNTIME_HIDDEN_UCCAC_UC_CLIENT;
    }

    onSetOCNoteByOpenLayoutModalForDropDownMenu(  openLayoutModalForDropDownMenuAsCaller ){

        const bEnable = this._canEnableUcClient();
        if( bEnable ) {
            if (this._currentRuntimeUccacUcClient) {
                this.setState({rerender: true}, () => {
                    this._currentRuntimeUccacUcClient.initRuntimeUccacUcClientzUccacAc(Brekeke.UCClient.Constants.STATUS_OFFLINE);
                });
            } else {
                this._useUcClient();
            }
        }
        else{
            this._unuseUcClient();
        }
    }

    onSetSystemSettingsDataSuccessBySystemSettingsView(){
        const bEnable = this._canEnableUcClient();
        if( bEnable ) {
            this._useUcClient();
        }
    }
	
	componentDidMount() {
        const bEnable = this._canEnableUcClient();
        if( bEnable ) {
            this._useUcClient();
        }
    }

    _useUcClient(){
        const ucclient = RuntimeUccacUcClients.getRuntimeUccacUcClientsStaticInstance().useRuntimeUccacUcClientWithoutInit(this);
        this._currentRuntimeUccacUcClient = ucclient;
        this.setState({rerender:true},() => {
            if( this._currentRuntimeUccacUcClient ) {   //!for Critical case
                ucclient.initRuntimeUccacUcClientzUccacAc(Brekeke.UCClient.Constants.STATUS_OFFLINE);
            }
        });

    }

    _canEnableUcClient(){
        const bEnable = BrekekeOperatorConsole.getStaticInstance().getSystemSettingsData().getUcChatAgentComponentEnabled();
		if( !bEnable ){
			return false;
		}

        const ucclients = RuntimeUccacUcClients.getRuntimeUccacUcClientsStaticInstance();
        const ct = ucclients.getRuntimeUccacUcClientCount();
        let enableThis = true;
        for( let i = 0; i < ct; i++ ){
            const ucclient = ucclients.getRuntimeUccacUcClientAt(i);
            const user = ucclient.getReactComponentAsUser();
            if( user && user !== this ){
                enableThis = false;
                break;
            }
        }
        return enableThis;
    }

    onComponentWillUnmountByLegacyUccacRuntimeWidget( legacyUccacRuntimeWidgetAsCaller ){
        const enableThis = this._canEnableUcClient();
        if( enableThis ){
            if( this._currentRuntimeUccacUcClient ){
                console.error("Already used the RuntimeUcClient! (1)");
                return;
            }
            this._useUcClient();
        }
        else{
            if( this._currentRuntimeUccacUcClient ){
                console.error("Already used the RuntimeUcClient! (2)");
                this._unuseUcClient();
                return;
            }
        }
    }

    _unuseUcClient(){
        if( this._currentRuntimeUccacUcClient ) {
            this._currentRuntimeUccacUcClient.unuseRuntimeUccacUcClient();
            this._currentRuntimeUccacUcClient = null;
            return true;
        }
        return false;
    }

    onComponentDidMountByLegacyUccacRuntimeWidget( legacyUccacRuntimeWidgetAsCaller ){
        const bEnable = BrekekeOperatorConsole.getStaticInstance().getSystemSettingsData().getUcChatAgentComponentEnabled();
        if( bEnable ) {
            this._unuseUcClient();
        }
    }
	
	componentWillUnmount(){
        this._unuseUcClient();
	}


    render(){
		if( this._currentRuntimeUccacUcClient ){
			const jsx = this._currentRuntimeUccacUcClient.getRenderJsx({});
			return <div style={{ display:"none",position:"absolute",width:"600px",height:"400px"}}>{jsx}</div>;
		}
		else{
			return (null);
		}
    }
}