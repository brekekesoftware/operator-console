import Util from "./Util";
import Notification from "antd/lib/notification";
import i18n from "./i18n";

export default class OCUtil{

    // static removeElementFromArray( array, element ){
    //     const index = OCUtil.indexOfElementFromArray( array, element );
    //     if( index !== -1 ){
    //         array.splice( index, 1 );
    //     }
    //     return index;
    // }
    //
    // static indexOfElementFromArray( array, element ){
    //     for( let i = 0; i < array.length; i++ ){
    //         const itm = array[i];
    //         if( itm === element ){
    //             return i;
    //         }
    //     }
    //     return -1;
    // }

    static removeChar( s , c ){
        let bContinue = true;
        let sRemoved = s;
        while( bContinue) {
            const index = sRemoved.indexOf(c);
            bContinue = index !== -1;
            if( bContinue ){
                sRemoved = sRemoved.substring(0, index) + sRemoved.substring(index + 1);
            }
        }
        return sRemoved;
    }

    static isExtensionBusy( extensionId, extensionsStatus ){
        const status = Object.values(extensionsStatus?.[extensionId]?.callStatus || {});
        const b = (status.find(s => s === 'talking') && true) ||
            (status.find(s => ['holding', 'calling', 'ringing'].includes(s)) && true) ||
            (extensionsStatus?.[extensionId]?.registered ? true : false);
        return b;
    }

    static getExtensionStatusClassName( extensionId, extensionsStatus ) {
        const status = Object.values(extensionsStatus?.[extensionId]?.callStatus || {});
        const statusClassName = (status.find(s => s === 'talking') && 'led-red') ||
            (status.find(s => ['holding', 'calling', 'ringing'].includes(s)) && 'led-yellow') ||
            (extensionsStatus?.[extensionId]?.registered ? 'led-green' : 'led-grey');
        return statusClassName;
    }

    static isString( o ){
        const b = typeof o === 'string';
        return b;
    }

    static logErrorWithNotification( consoleErrorMessage, notificationErrorMessage = null,  oErr = null, duration=0){
        if( oErr ){
            if( consoleErrorMessage ) {
                console.error(consoleErrorMessage, oErr);
            }
            else{
                console.error( oErr );
            }
        }
        else{
            console.error( consoleErrorMessage );
        }

        if( notificationErrorMessage ) {
            if( !oErr ){
                Notification.error({message: notificationErrorMessage, duration: duration});
            }
            else {
                let obj;
                if (oErr instanceof Error) { // true
                    obj = oErr.toString();
                } else {
                    try {
                        obj = JSON.stringify(oErr);
                    } catch (errJsonStringify) {
                        obj = oErr;
                    }
                }
                Notification.error({message: notificationErrorMessage + "\r\n" + obj, duration: duration});
            }
        }

    }

    static indexOfArrayFromExtensions( extensions, extId ){
        if( !extensions ) {
            return -1;
        }
        for( let i = 0 ; i < extensions.length; i++ ){
            const ext = extensions[i];
            if( !ext ){
                continue;
            }
            const id = ext.id;
            if( id === extId ){
                return i;
            }
        }
        return -1;
    }

    static getCallStatusFromWebphoneCallObject( webphoneCallObject  ){
        let status = null;
        if( webphoneCallObject .holding === true ){
            status = BROC_BROCCALLOBJECT_CALL_STATUSES.holding;
        }
        else if( webphoneCallObject .answered === true ){
            status = BROC_BROCCALLOBJECT_CALL_STATUSES.talking;
        }
        else if( webphoneCallObject .incoming === true ){
            status = BROC_BROCCALLOBJECT_CALL_STATUSES.incoming;
        }
        else{
            status = BROC_BROCCALLOBJECT_CALL_STATUSES.calling;
        }
        return status;
    }

    static getUrlStringFromPathOrUrl( pathOrUrl, rootUrl ){
        let sUrl = null;
        try {
            new URL(pathOrUrl);
            sUrl = pathOrUrl;
        }
        catch(err) {
        }
        if( sUrl === null  ){
            //Generate url from path.
            if( rootUrl[ rootUrl.length - 1] !== '/' && pathOrUrl[0] !== '/' ){
                rootUrl += '/';
            }
            sUrl =  rootUrl + pathOrUrl;
        }
        return sUrl;
    }

}
export const NOTIFY_STATUS_CODES = Object.freeze({
    CALLING: 0,
    INCOMING: 1,
    CALL_SUCCESS: 2,
    ENDTALKING: 12,
    ANSWER_SUCCESS: 14,
    PARK_CANCEL: 21,
    PARK_START: 30,
    STARTRINGING: 65,
    HOLD: 35,
    UNHOLD: 36,
    DISCONNECT: -1
});
export const BROC_BROCCALLOBJECT_CALL_STATUSES = {
    //unknown : 0,
    talking: 1,
    holding: 2,
    calling: 3,
    incoming : 4
}
