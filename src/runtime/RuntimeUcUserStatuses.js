//!singleton
import AutoDialView_ver2 from "./AutoDialView_ver2";
import BrekekeOperatorConsole from "../index";

let RUNTIME_UC_USER_STATUSES_INSTANCE;
export default class RuntimeUcUserStatuses {
    constructor(runtimeUccacUcClientsAsParent) {
        RUNTIME_UC_USER_STATUSES_INSTANCE = this;
        this._Parent = runtimeUccacUcClientsAsParent;
        this._UcUserStatuses = {};  //extension:ucUserStatus
        this._UcBuddyStatusChangedHandlerObject = {
            buddyStatusChanged: (ev) => {
                const extension = ev.user_id;
                this._UcUserStatuses[extension] = ev.status;
                AutoDialView_ver2.getStaticInstance().onUcBuddyStatusChangedByRuntimeUcUserStatuses(this, extension, ev.status);
            }
        };
        this._ucSignedInHandlerObject = undefined;

        this._UcSignedOutHandlerObject = {
            signedOut: () => {
                //clear UcUserStatuses
                const props = Object.getOwnPropertyNames(this._UcUserStatuses);
                for (const p of props) {
                    delete this._UcUserStatuses[p];
                }
                AutoDialView_ver2.getStaticInstance().onUcSignedOutByRuntimeUcUserStatuses(this);
            }
        };
    }

    getUcUserStatus(extension) {
        const status = this._UcUserStatuses[extension];
        return status;
    }

    onBeforeUnuseRuntimeUccacUcClientByRuntimeUccacUcClients(runtimeUccacUcClientsAsCaller, runtimeUccacUcClient) {
        //clear UcUserStatuses
        const props = Object.getOwnPropertyNames(this._UcUserStatuses);
        for (const p of props) {
            delete this._UcUserStatuses[p];
        }

        const uccacAc = runtimeUccacUcClient.getUccacAc();
        if (!uccacAc) {
            return;
        }
        const ac = uccacAc.getAgentComponent();
        if (!ac.ucUiStore || !ac.ucUiStore.chatClient) {
            return;
        }
        ac.ucUiStore.chatClient.removeHandler(this._UcBuddyStatusChangedHandlerObject);
        if (this._ucSignedInHandlerObject) {
            ac.ucUiStore.chatClient.removeHandler(this._ucSignedInHandlerObject);
            this._ucSignedInHandlerObject = null;
        }
        ac.ucUiStore.chatClient.removeHandler(this._UcSignedOutHandlerObject);

        AutoDialView_ver2.getStaticInstance().onBeforeUnuseRuntimeUccacUcClientByRuntimeUcUserStatuses(this);
    }

    onStartUcClientByRuntimeUccacUcClients(runtimeUccacUcClientsAsCaller, runtimeUccacUcClient) {
        const uccacAc = runtimeUccacUcClient.getUccacAc();
        const ac = uccacAc.getAgentComponent();
        const signedInStatus = ac.ucUiStore.getSignInStatus();  //number (0: signed-out, 1: sign-in-failed, 2: signing-in, 3: signed-in)
        if (signedInStatus === 3) {
            this._getAndSetUcUserStatusesDelay(ac);
        }
        this._ucSignedInHandlerObject = {
            signedIn: () => {
                this._getAndSetUcUserStatusesDelay(ac);
            }
        };
        ac.ucUiStore.addHandler(this._ucSignedInHandlerObject);
        ac.ucUiStore.addHandler(this._UcSignedOutHandlerObject);
        ac.ucUiStore.chatClient.addHandler(this._UcBuddyStatusChangedHandlerObject);

    }

    static getRuntimeUcUserStatusesStaticInstance() {
        return RUNTIME_UC_USER_STATUSES_INSTANCE;
    }

    _getAndSetUcUserStatusesDelay( ac ){
        setTimeout( () => {
            const oc = BrekekeOperatorConsole.getStaticInstance();
            const exts = oc.getExtensions();
            const tenant = oc.getLoggedinTenant();
            for (let i = 0; i < exts.length; i++) {
                const ext = exts[i];
                const userid = ext.id;
                const getBuddyArg = {
                    tenant: tenant,
                    user_id: userid
                };
                const oStatusInfo = ac.ucUiStore.chatClient.getBuddyStatus(getBuddyArg);
                const status = oStatusInfo.status;
                this._UcUserStatuses[userid] = status;
            }
            AutoDialView_ver2.getStaticInstance().onGetAndSetUcUserStatusesByRuntimeUcUserStatuses(this);
        },1);
    }

    onRestartUcClientByRuntimeUccacUcClients( runtimeUccacUcClientsAsCaller, runtimeUccacUcClient ){
        this.onStartUcClientByRuntimeUccacUcClients( runtimeUccacUcClientsAsCaller, runtimeUccacUcClient);
    }
}