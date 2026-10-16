//!singleton
import RuntimeUccacUcClient from "./RuntimeUccacUcClient";
import RuntimeUcUserStatuses from "./RuntimeUcUserStatuses";

let RUNTIME_UCCAC_UC_CLIENTS_STATIC_INSTANCE = undefined;
export default class RuntimeUccacUcClients {

	constructor(runtimeScreenView_ver2AsParent) {
		RUNTIME_UCCAC_UC_CLIENTS_STATIC_INSTANCE = this;
		this._Parent = runtimeScreenView_ver2AsParent;
		this._UccacUcClientArray = new Array();
		this._RuntimeUcUserStatuses = new RuntimeUcUserStatuses(this);
	}

	static getRuntimeUccacUcClientsStaticInstance() {
		return RUNTIME_UCCAC_UC_CLIENTS_STATIC_INSTANCE;
	}





	//onUnuseRuntimeUccacUcClientByRuntimeUccacUcClient( runtimeUccacUcClientAsCaller ){
	//const index = this._UccacUcClientArray.findIndex( (itm) => itm === runtimeUccacUcClient );
	//this._UccacUcClientArray.splice( index, 1 );
	//}

	useRuntimeUccacUcClientWithoutInit(rectComponentAsUser) {
		let runtimeUccacUcClient = this._UccacUcClientArray.find((itm) => !itm.getReactComponentAsUser());
		//let isNew;
		if (!runtimeUccacUcClient) {
			runtimeUccacUcClient = new RuntimeUccacUcClient(this);
			this._UccacUcClientArray.push(runtimeUccacUcClient);
			//isNew = true;
		} else {
			//isNew = false;
		}
		runtimeUccacUcClient.onUseRuntimeUccacUcClientWithoutInitByRuntimeUccacUcClients(this, rectComponentAsUser);
		return runtimeUccacUcClient;
	}

	onBeforeUnuseRuntimeUccacUcClientByRuntimeUccacUcClient( runtimeUccacUcClientAsCaller ){
		this._RuntimeUcUserStatuses.onBeforeUnuseRuntimeUccacUcClientByRuntimeUccacUcClients( this, runtimeUccacUcClientAsCaller );
	}

	onStartUcClientByRuntimeUccacUcClient( runtimeUccacUCClientAsCaller ){
		this._RuntimeUcUserStatuses.onStartUcClientByRuntimeUccacUcClients( this, runtimeUccacUCClientAsCaller );
	}

	onRestartUcClientByRuntimeUccacUcClient( runtimeUccacUCClientAsCaller ){
		this._RuntimeUcUserStatuses.onRestartUcClientByRuntimeUccacUcClients( this, runtimeUccacUCClientAsCaller );
	}

	getRuntimeUccacUcClientCount(){
		const length = this._UccacUcClientArray.length;
		return length;
	}

	getRuntimeUccacUcClientAt( index ){
		const o = this._UccacUcClientArray[index];
		return o;
	}

	clearRuntimeUccacUcClients() {
		for (let i = 0; i < this._UccacUcClientArray.length; i++) {
			const ucclient = this._UccacUcClientArray[i];
			//if( ucclient.getUsingUser() ){
			//this.unuseRuntimeUccacUcClient( ucclient );
			//}
			ucclient.destructRuntimeUccacUcClient();
		}
		this._UccacUcClientArray.length = 0;
	}

}