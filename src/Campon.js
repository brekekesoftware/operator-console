import OCUtil from "./OCUtil";
import i18n from "./i18n";
import Notification from "antd/lib/notification";

const DEFAULT_CAMPON_TIMEOUT_MILLI_SECONDS = 1000 * 60 * 60;
export default class Campon{

    constructor( operatorConsoleAsParent ) {
        this._OperatorConsoleAsParent = operatorConsoleAsParent;
        this._WaitCamponObjects = {};   //key = campon target extensionId, value = [   value=waitCamponObject{} ]
    }

    static getDefaultCamponTimeoutMilliSeconds(){
        return DEFAULT_CAMPON_TIMEOUT_MILLI_SECONDS;
    }

    tryStartCamponOrTransfer( call,  isBlindTransfer, timeoutMillis, title ){
        const transferExtensionId = call.camponDstExtensionId;
        const transferTalkerId = call.pbxTalkerId;
        const transferTenant = call.pbxTenant;

        const extensionsStatus = this._OperatorConsoleAsParent.state.extensionsStatus;

        //this.tryCancelCampOn( transferExtensionId );  //!later
        const isBusy = OCUtil.isExtensionBusy( transferExtensionId,  extensionsStatus  );
        if( !isBusy ){
            //transfer
            const transferMode = "attended";
            this._OperatorConsoleAsParent.transferCallCore(  transferExtensionId, transferMode , transferTalkerId, transferTenant  ,
                ( operatorConsoleAsCaller, message) => {
                    if( message.startsWith("fail")){
                        Notification.error({ message:i18n.t("failed_to_transfer_call")});
                    }
                    else {
                        const call = operatorConsoleAsCaller.findCallByTalkerId(transferTalkerId);
                        if (!call) {
                            Notification.error({ message:i18n.t("failed_to_transfer_call")});
                        } else {
                            call.hangupWithUnhold();
                        }
                    }
                }
            );
            return false;
        }
        else{   //campon
            const waitCamponObject = { call, transferTenant, transferExtensionId, transferTalkerId, isBlindTransfer, timeoutMillis, title  };
            const timeoutId = setTimeout(  () => this._onCamponTimeout( waitCamponObject  ), timeoutMillis );
            waitCamponObject.setTimeoutTimeoutId = timeoutId;

            let objs = this._WaitCamponObjects[ transferExtensionId ];
            if( !objs ) {
                objs = [];
                this._WaitCamponObjects[ transferExtensionId] = objs;
            }
            objs.push( waitCamponObject );
            return true;
        }
    }

    _onCamponTimeout( waitCamponObject ){
        this._removeCampon( waitCamponObject  );
        const title = waitCamponObject.title;
        Notification.info({  message: i18n.t("CamponTimedOutPrefix") + title + i18n.t("CamponTimedOutSuffix")  });
    }

    _removeCampon( waitCamponObject ){
        const extensionId = waitCamponObject.transferExtensionId;
        const objs = this._WaitCamponObjects[ extensionId ];

        const index = objs.indexOf( waitCamponObject );
        objs.splice( index, 1 );
        if( objs.length === 0 ) {
            delete this._WaitCamponObjects[ extensionId ];
        }
        const call = waitCamponObject.call;
        delete call["camponDstExtensionId"];

        this._OperatorConsoleAsParent.setState({"rerender":true});     //!for rerender
    }

    onDeleteExtensionStatusFromExtensionsStatus( extensionsStatusAsCaller, extensionId, talkerId ){
        //disconnected.
        //execute transfer.
        //
        const objs = this._WaitCamponObjects[ extensionId ];
        if( !objs  ){
            //No need to transfer
            return;
        }
        const waitCamponObject = objs[ 0 ]; //execute old
        const timeoutId = waitCamponObject.setTimeoutTimeoutId;
        clearTimeout( timeoutId );

        //const waitCamponObject = { transferTenant, transferExtensionId, transferTalkerId, transferMode, timeoutMillis };
         const oc2 = extensionsStatusAsCaller.getOperatorConsoleAsParent();
         const call = oc2.findCallByTalkerId(waitCamponObject.transferTalkerId);

        const transferMode = "attended";
        this._OperatorConsoleAsParent.transferCallCore( waitCamponObject.transferExtensionId, transferMode, waitCamponObject.transferTalkerId, waitCamponObject.transferTenant,
            ( operatorConsoleAsCaller, message) => {
                if( message.startsWith("fail")){
                    Notification.error({ message:i18n.t("failed_to_transfer_call")});
                }
                else {
                    if (!call) {
                        Notification.error({ message:i18n.t("failed_to_transfer_call")});
                    } else {

                        if( waitCamponObject.isBlindTransfer ){
                            call.hangupWithUnhold();
                        }
                    }
                }
            }
        );

        this._removeCampon( waitCamponObject );

        call.camponDstExtensionId = null;
        oc2.setState({latestCamponCall:call});    //for redraw
    }

    _cancelCampOn( waitCamponObject  ){
        const timeoutId = waitCamponObject.setTimeoutTimeoutId;
        clearTimeout( timeoutId );

        this._removeCampon( waitCamponObject );
    }

    tryCancelCampOn( call ){
        const camponDstExtensionId = call.camponDstExtensionId;
        const objs = this._WaitCamponObjects[ camponDstExtensionId ];
        if( !objs ){
            return false;
        }

        const obj = objs.find( (itm) =>{
            return itm.call === call;
        });
        if( !obj ) {
            return false;
        }

        this._cancelCampOn( obj );
        return true;
    }

    _clearCampon(){
        const extensionzObjs = Object.values( this._WaitCamponObjects );
        for( let i = 0; i < extensionzObjs.length; i++ ){
            const waitCamponObjects = extensionzObjs[i];
            for( let k = 0; k < waitCamponObjects.length; k++ ) {
                const waitCamponObject = waitCamponObjects[k];
                this._cancelCampOn(waitCamponObject);
            }
        }
    }

    onBeginLogout( operatorConsoleAsCaller ){
        this._clearCampon();
    }

    onPalNotifyServerstatus( operatorConsoleAsCaller, e ){
        if( e.status === "inactive" ){
            this._clearCampon();
        }
    }



}