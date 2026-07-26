import Notification from "antd/lib/notification";
import i18n, {DEFAULT_LOCALE, isValidLocale} from "./i18n";
import debounce from "debounce";
import {deleteProperty, setProperty} from "dot-prop";
import APhoneClient from "./APhoneClient";
import OCUtil, {BROC_BROCCALLOBJECT_CALL_STATUSES} from "./OCUtil";
import WebphoneCallInfos from "./WebphoneCallInfos";
import {reaction} from "mobx";
import BrekekeOperatorConsole from "./index";
import Util from "./Util";
import ObjectUrlCaches from "./ObjectUrlCaches";

class WebphoneInvalidDeviceTokenError extends Error {
  constructor(message) {
    super(message);
    this.name = "WebphoneInvalidDeviceTokenError";
  }
}

const RINGTONE_OBJECT_URL_CACHE_TIMELIMIT_MILLIS = 6 * 60 * 60 * 1000;
export default class WebphonePhoneClient  extends APhoneClient {
    constructor( options  ) {
        super( options );
        this._isPalReady = false;
        this._ObjectUrlCachesForRingtone = new ObjectUrlCaches();

        const options_ = {...options}
        options_["phoneClient"] = this;
        this._RootURLString = Util.getRootUrlString();
        this._webphoneCallInfos = new WebphoneCallInfos( options_ );
		
		this._WebrtcclientSessionStatusChangedFunction = ( session ) =>{
			this._onWebrtcclientSessionStatusChanged(session);
		};
		this._RingtoneUrls = {};	//{sessionId, {ringtoneUrl:ringtoneUrl, timeoutId:timeoutId }
		this._RingtoneUrlRemoveTimeoutIds = new Array();
    }
	
	_deinitRingtoneUrlFromSessionId( sessionId ){
		const obj = this._RingtoneUrls[ sessionId ];
		if( !obj ){
			return false;
		}
		const timeoutId = obj["timeoutId"];
		clearTimeout(timeoutId);

		delete this._RingtoneUrls[ sessionId ];
		const timeoutIdIndex = this._RingtoneUrlRemoveTimeoutIds.indexOf( timeoutId );
		if( timeoutIdIndex !== -1 ){
			this._RingtoneUrlRemoveTimeoutIds.splice( timeoutIdIndex, 1 );
		}
		return true;
	}

    /**
     *  override method
     */
    onBeginSetSystemSettingsDataByOperatorConsoleAsParentForPhoneClient( operatorConsoleAsCaller , newCoreData ){
        const desktopNotificationInterval = newCoreData.desktopNotificationInterval;
        this._webphone._notificationOptions.notificationInterval = desktopNotificationInterval;
    }

    /**
     *  overload method
     * @returns {boolean}
     */
    getIsToggleVideoSupport(){
        return true;
    }

    /**
     *  overload method
     */
    getCallInfos(){
        return this._webphoneCallInfos;
    }

    /**
     *  overload method
     * @returns {boolean}
     */
    isPalReady(){
        return this._isPalReady;
    }

    hangup( webphoneCallInfo  ){
        const callId = webphoneCallInfo.getCallId();
        const session = this._webrtcclient.getSession(callId);
        session.rtcSession.terminate();
    }

    /**
     *  overload method
     * @param tenant
     * @param user
     * @param talker_id
     * @returns {Promise<*>}
     */
    async bargeAsync( tenant, user, talker_id  ){
        const bargeOptions = {
            tenant: tenant,
            user: user,
            talker_id,
            listen: 'true',
            speak: 'false',
        };
        return this.pal.call_pal('barge', bargeOptions);
    }
	
	_getCallObjectFromSessionId(sessionId) {
		  const ctx = this._webphone.getCurrentAccountCtx();	//!cost //!overhead
		  const callObject = ctx.call.calls.find(c => c.id === sessionId);
		  return callObject;
	}
	
	//!ex. my_tenant_111_222_phone4_webphone
	static _isUserFromWebphoneUser( sWebphoneUser , tenant, user ){
		const iTenantWithUnderscore = tenant.length + 1;	//+1 is _
		if( sWebphoneUser.length <= iTenantWithUnderscore ){
			return null;
		}

		const iPhone = sWebphoneUser.lastIndexOf("_phone");
		if( iPhone === -1 ){
			return null;
		}
		
		const sUser = sWebphoneUser.substring( iTenantWithUnderscore, iPhone );
		const bSame = sUser === user;
		return bSame;
	}
	
	_onWebrtcclientSessionStatusChanged( session ){
	    //const headers = session.rtcSession._request.headers;
		if( session.incomingMessage?.method === "INVITE" ){
			//const callObject = this._getCallObjectFromSessionId( session.sessionId );	//!commentOut currently return undefined
			const sData = session.incomingMessage.data;
			if( sData ){
				
				//const sToUser = session.incomingMessage.to?._uri?._user;	//!ex. t1_888_phone4_webphone
				//if( sToUser ){
					//const oc = BrekekeOperatorConsole.getStaticInstance();
					//const loggedinTenant = oc.getLoggedinTenant();
					//const loggedinUser = oc.getLoggedinUsername();
					//const bUser = WebphonePhoneClient._isUserFromWebphoneUser( sToUser, loggedinTenant, loggedinUser );
					//if( bUser ){
						const iFrom = sData.indexOf("\r\nX-Ringtone:");
						if( iFrom !== -1 ){
							const iFromStart = iFrom + 13;
							let iEnd = sData.indexOf("\r\n", iFromStart );
							if( iEnd === -1 ){
								iEnd = sData.length - 1;
							}
							const sRingtoneUrl = sData.substring(iFromStart,iEnd).trim();
							if( sRingtoneUrl ){
								//callObject["RingtoneUrl_OperatorConsole_brekeke"] = sRingtoneUrl;
								const sessionId = session.sessionId;
								
								//const timeoutIdIndex = this._RingtoneUrlRemoveTimeoutIds.length;
								const timeoutId = setTimeout( () => {
									const timeoutIdIndex = this._RingtoneUrlRemoveTimeoutIds.indexOf( timeoutId );
									if( timeoutIdIndex !== -1 ){
										this._RingtoneUrlRemoveTimeoutIds.splice( timeoutIdIndex, 1 );
									}
									delete this._RingtoneUrls[sessionId];
								}, 60000 );
								this._RingtoneUrls[ sessionId ] = {ringtoneUrl:sRingtoneUrl,timeoutId:timeoutId};
								this._RingtoneUrlRemoveTimeoutIds.push( timeoutId );							
							}
						}
					//}
				//}
			}
		}
		else{
			const bCancel = session.incomingMessage?.method === "CANCEL" && session.sessionStatus === "terminated";
			if( bCancel ){
				const callObject = this._getCallObjectFromSessionId( session.sessionId );
				const displayName = callObject.getDisplayName();
				let callInfo;
				if( callObject ){
					callInfo = this._webphoneCallInfos.getCallInfoFromCallObject( callObject );
				}
				if( callInfo ){
					//const imdp = new IncomingMessageDataParser();	//!cost new //!overhead new
					//imdp.parse( session, callObject);
					//imdp.getFrom()
					
					//parse to(=Responder)
					//
					
					const sData = session.incomingMessage?.data;	//ex. "CANCEL sip:qephopju@e300rl0ggplo.invalid;transport=ws SIP/2.0\r\nVia: SIP/2.0/WSS 127.0.0.1:10081;branch=z9hG4bK3b851718b3b4c-30-18a5cd\r\nFrom: \"666\" <sip:666@127.0.0.1:10081>;tag=b97d9f585p\r\nTo: <sip:t1_888_phone4_webphone@127.0.0.1:10081>\r\nMax-Forwards: 70\r\nCall-ID: 893144fe-daaa8d0f-98b01187-51a98418\r\nUser-Agent: Brekeke SIP Server\r\nCSeq: 1 CANCEL\r\nReason: SIP ;cause=200 ;text=\"Call completed by 777\"\r\nContent-Length: 0\r\n\r\n"
					if( sData ){
						const iReason = sData.indexOf("\r\nReason:");
						if( iReason !== -1 ){
							const iCallFrom = sData.indexOf( "\"Call completed by ", iReason + 9 );
							if( iCallFrom !== -1 ){
								const iCallToWithEncloserTo = sData.indexOf(")\"\r\n", iCallFrom + 19 );
								if( iCallToWithEncloserTo !== -1 ){
									const sResponderBase = sData.substring( iCallFrom + 19, iCallToWithEncloserTo );

									let sResponder;
									if( sResponderBase ){
										const iCallToWithEncloserFrom = sResponderBase.lastIndexOf("(");
										
										if( iCallToWithEncloserFrom === -1 ){
											sResponder = sData.substring(iCallFrom + 19, iCallToWithEncloserTo + 1 );
										}
										else{
											sResponder = sResponderBase.substring( 0, iCallToWithEncloserFrom );
										}
									}
									else{
										sResponder = sResponderBase;
									}
									callInfo.setResponder(sResponder);
								}
								else{
									const iCallTo = sData.indexOf("\"\r\n", iCallFrom + 19 );
									if( iCallTo !== -1 ){
										const sResponder = sData.substring(iCallFrom + 19, iCallTo );
										callInfo.setResponder(sResponder);
									}
								}
							}
						}
					}
			
				}
				else{
					console.warn("The call info could not be obtained from the call object, so the answerer of the group call will not be recorded.");
				}
				
			}
		}

		
	}

    //getObjectUrlCachesForRingtone(){
		//return this._objectUrlCachesForRingtone;
    //}

	_deinitRingtoneUrls(){
		for( let i = 0; i < this._RingtoneUrlRemoveTimeoutIds.length; i++ ){
			const timeoutId = this._RingtoneUrlRemoveTimeoutIds[i];
			clearTimeout(timeoutId);
		}
		this._RingtoneUrlRemoveTimeoutIds.splice(0);
		Object.keys(this._RingtoneUrls).forEach(key => delete this._RingtoneUrls[key]);
	}

    /**
     *  override mothod
     * @param options
     */
    async initPhoneClient( options, newSystemSettingsCoreData, newUserSettingsCoreData = null ){
        //const options = structuredClone( optionsOrg );
        await super.initPhoneClient( options );

        this._ObjectUrlCachesForRingtone.clearObjectUrlCaches();
		this._deinitRingtoneUrls();

		const oc = BrekekeOperatorConsole.getStaticInstance();
		const userSettingsCoreData = newUserSettingsCoreData ? newUserSettingsCoreData : oc.getUserSettingsData();
		const phoneIndex = userSettingsCoreData["phoneIndex"];
        //const phoneIndex = newSystemSettingsCoreData.phoneIndex;
        if( Number.isInteger( phoneIndex ) && phoneIndex !== -1 ) {
            options["phoneIndex"] = phoneIndex;
        }

        const ocVersion = BrekekeOperatorConsole.BREKEKE_OPERATOR_CONSOLE_VERSION;
        const currentVersion = window.Brekeke.Phone.getCurrentVersion();
        const webphoneVersion = currentVersion.webphone;
        const jssipVersion = currentVersion.jssip;

        const useragent = "Brekeke Operator Console " + ocVersion + ",Brekeke Phone for Web " + webphoneVersion + ",JsSIP " + jssipVersion;
        const useragentProduct = "Brekeke Phone for Web " + webphoneVersion + ",Brekeke Operator Console " + ocVersion + ",JsSIP " + jssipVersion;

        const eBrOcPhone = document.getElementById('brOCPhone');
        const desktopNotificationInterval = newSystemSettingsCoreData.desktopNotificationInterval;

        const args = {
            autoLogin: true,
            clearExistingAccount: true,
            palEvents: [
                'notify_serverstatus',
                'onClose',
                'onError',
                'notify_status',
                'notify_line',
                'notify_park'
                // ...
            ],
            accounts: [ options ],
            'webphone.pal.param.user': '*',
            'webphone.pal.param.line': '*',
            'webphone.pal.param.park': '*',
            notificationInterval : desktopNotificationInterval,
            //dontShowNotificationIfFocusing : true,
            'webphone.useragent': useragent,
            'webphone.http.useragent.product': useragentProduct,
			//notificationCallCompletedElseWhere: false,
        };

        this._webphone = window.Brekeke.Phone.render(eBrOcPhone, args);

		const onInitSuccessFunction = options["onInitSuccessFunction"];
		this.notify_serverstatus = async (e) => {
			console.log('pal.notify_serverstatus', e);
			if (e?.status === 'active') {
				await this._initialize( onInitSuccessFunction, newUserSettingsCoreData );
			}
			this._OperatorConsoleAsParent.onPalNotifyServerstatusByWebphonePhoneClient(e);
		}
		this._webphone.on("pal.notify_serverstatus", this.notify_serverstatus );

        const ctx = this._webphone.getCurrentAccountCtx();
        let language = BrekekeOperatorConsole.getStaticInstance().getLoggedinLanguage();
        if( language !== "ja"){
            language = "en";
        }
        ctx.intl.setLocale( language ); //!modify Only English(en) or Japanese(ja) is supported

        this._onWebphoneError = e => {
            console.log("Webphone event:error", e);
        };
        this._onWebphoneOnError = e => {
            console.log("Webphone event:onError", e);
        };
        this._onWebphoneOnerror = e => {
            console.log("Webphone event:onerror", e);
        };

        this._onWebphoneClose = e => {
            console.log("Webphone event:close", e);
        };
        this._onWebphoneOnClose = e => {
            console.log("Webphone event:onClose", e);
        };
        this._onWebphoneOnclose = e => {
            console.log("Webphone event:onclose", e);
        };

        this._webphone.on("error", this._onWebphoneError );
        this._webphone.on("onError", this._onWebphoneOnError );
        this._webphone.on("onerror", this._onWebphoneOnerror );
        this._webphone.on("close", this._onWebphoneClose );
        this._webphone.on("onClose", this._onWebphoneOnClose );
        this._webphone.on("onclose", this._onWebphoneOnclose  );

        const this_ = this;
        this._webphone.on("webrtcclient", async ( webrcclient ) => {
            this_._webphone.removeAllListeners("webrtcclient");
			if( this_._webrtcclient ){
				this_._webrtcclient.removeEventListener("sessionStatusChanged", this_._WebrtcclientSessionStatusChangedFunction );
			}
            this_._webrtcclient = webrcclient;
			this_._webrtcclient.addEventListener("sessionStatusChanged", this_._WebrtcclientSessionStatusChangedFunction );

        });

        this._webphone.on('call', c => {
            console.log('call', c);
            // const remoteVideoEnabled =  c.getRemoteVideoEnabled();	//!temp
            // const localVideoEnabled =  c.getLocalVideoEnabled(); //!temp
            // const localStreamObject = c.localStreamObject; //!temp
            // const remoteStreamObject = c.remoteStreamObject; //!temp
            // const vcst = c.videoClientSessionTable; //!temp

            this_._onCall( c );
        });
        this._webphone.on('call_update', callObject => {
            console.log('call_update', callObject);
            // const remoteVideoEnabled =  callObject.getRemoteVideoEnabled();	//!temp
            // const localVideoEnabled =  callObject.getLocalVideoEnabled(); //!temp
			// const localStreamObject = callObject.localStreamObject; //!temp
			// const remoteStreamObject = callObject.remoteStreamObject; //!temp
            // const vcst = callObject.videoClientSessionTable; //!temp

            this._webphoneCallInfos.onUpdateCallObjectByWebphoneClient( callObject );
        })
        this._webphone.on('call_end', c => {
            console.log('call_end', c);
            this._webphoneCallInfos.onEndCallByPhoneClient( c.id );
        })

        this._webphone.on('pal', ( pal) => {

            //this. account = this._webphone.getCurrentAccount();
            //console.log('account', this._webphone.getCurrentAccount());
            console.log('pal', pal)

            //Notification.close('reconnecting'); //!commentout close not found.

            if (this.pal !== pal) {
                this.pal = pal;
                this._isPalReady = true;
                this.notify_status = e => {
                    console.log('pal.notify_status', e);
                    if (e) {
                        this.statusEvents.push(e);
                        this.flushStatusEvents();

                    }
                }

                //this.old_notify_status = pal.notify_status
                //pal.notify_status = this.notify_status;
                this._webphone.on('pal.notify_status', this.notify_status);
				
				//Not support
				//this.notify_voicemail = (e) =>{
                    //console.log('pal.notify_voicemail', e);					
				//}
                //this._webphone.on('pal.notify_voicemail', this.notify_voicemail);
				
                // NOTE: currently unused, Shin said registered events are not ready yet
                // var old_notify_registered = pal.notify_registered
                // pal.notify_registered = e => {
                //   old_notify_registered && old_notify_registered(e)
                //   if (e) {
                //     this.setState({
                //       extensionsStatus: {
                //         ...(this.state.extensionsStatus || {}),
                //         [e.user]: {
                //           ...(this.state.extensionsStatus?.[e.user] || {}),
                //           registered: e.registered == 'true',
                //         }
                //       }
                //     })
                //   }
                // }

                this.notify_line = e => {
                    console.log('pal.notify_line', e)
                    if (e) {
                        this.lineEvents.push(e);
                        this.flushLineEvents();
                    }
                }
                //pal.notify_line = this.notify_line;
                this._webphone.on("pal.notify_line", this.notify_line );

                this.notify_park = e => {
                    console.log('pal.notify_park', e)
                    if (e) {
                        this.parkEvents.push(e);
                        this.flushParkEvents();
                    }
                }
                //pal.notify_park = this.notify_park;
                this._webphone.on("pal.notify_park", this.notify_park );

                const old_onError = pal.onError;
                pal.onError = e => {
                    console.log('pal.onError', e)
                    old_onError && old_onError(e) // call old listener
                }

                // const old_notify_serverstatus = pal.notify_serverstatus
                // pal.notify_serverstatus = e => {
                //     console.log('pal.notify_serverstatus', e);
                //     old_notify_serverstatus && old_notify_serverstatus(e) // call old listener
                //
                //     if (e?.status === 'active' ) {
                //         this._initialize( account, pal );   //initialize
                //     }
                //     this._Campon.onPalNotifyServerstatus( this, e );
                // }

                let old_onClose = pal.onClose;
                pal.onClose = e => {
                    console.log('pal.onClose', e)
                    old_onClose && old_onClose(e) // call old listener
                    if (!e.wasClean) {
                        Notification.warning({ key: 'reconnecting', message: i18n.t('reconnecting_pbx'), duration: 20 });
                    }
                }
            }

            //this._initialize( account, pal );   //initialize  for new webphone 2023/04/10~
        } /* ~this._webphone.on( */ )  //~this._webphone.on

        const tenant = oc.getLoginTenantname();
        const user = oc.getLoginUsername();
        const sDeviceTokenKey = "br+dtoken+" + tenant + "+" + user;
        const sDeviceToken = window.localStorage.getItem(sDeviceTokenKey);
		if( sDeviceToken ){
			const onInitFailFunction = options["onInitFailFunction"];
			//if( sDeviceToken ){
            const params = {
                tenant : tenant,
                user : user,
                hostname : oc.getLoginHostname(),
                port : oc.getLoginPort(),
                token : sDeviceToken
            };
            const sResult = await this._webphone.setDeviceToken(params);
            if( !sResult.ok ){
                const err = new WebphoneInvalidDeviceTokenError( i18n.t("The_device_token_required_for_MFA_is_invalid~") );
                onInitFailFunction(err);
                return;
            }
			// }
			// else{
			// 	const err = new WebphoneInvalidDeviceTokenError( i18n.t("The_device_token_required_for_MFA_is_missing~") );
			// 	onInitFailFunction(err);
			// 	return;
			// }
		}

        // if( oc.getMfaRequired() === true ){
		// 	const onInitFailFunction = options["onInitFailFunction"];
		// 	const tenant = oc.getLoginTenantname();
		// 	const user = oc.getLoginUsername();
		// 	const sDeviceTokenKey = "br+dtoken+" + tenant + "+" + user;
		// 	const sDeviceToken = window.localStorage.getItem(sDeviceTokenKey);
		// 	if( sDeviceToken ){
		// 		const params = {
		// 			tenant : tenant,
		// 			user : user,
		// 			hostname : oc.getLoginHostname(),
		// 			port : oc.getLoginPort(),
		// 			token : sDeviceToken
		// 		};
		// 		const sResult = await this._webphone.setDeviceToken(params);
		// 		if( !sResult.ok ){
		// 			const err = new WebphoneInvalidDeviceTokenError( i18n.t("The_device_token_required_for_MFA_is_invalid~") );
		// 			onInitFailFunction(err);
		// 			return;
		// 		}
		// 	}
		// 	else{
		// 		const err = new WebphoneInvalidDeviceTokenError( i18n.t("The_device_token_required_for_MFA_is_missing~") );
		// 		onInitFailFunction(err);
		// 		return;
		// 	}
		// }
    }

    statusEvents = [];
    flushStatusEvents = debounce(() => {
        console.log('pal.notify_status', this.statusEvents);
        this._flushStatusEvents();
        this._flushExtensionStatusEvents();
        //this._flushLineStatusEvents();
        this._flushAfterStatusEvents();
        this.statusEvents = [];
    }, 250)
    // statusEvents = [];
    // flushStatusEvents = () => {
    //     console.log('pal.notify_status', this.statusEvents);
    //     this._flushExtensionStatusEvents();
    //     //this._flushLineStatusEvents();
    //     this.statusEvents = [];
    // };

    _flushAfterStatusEvents(){
        for (const e of this.statusEvents) {
            const options = {
                event : e
            }
            this._OperatorConsoleAsParent.onPalNotifyStatus(options);
        }
    }

    _flushStatusEvents(){
        for (const e of this.statusEvents) {
            this._webphoneCallInfos.onFlushPalNofityStatusEventByWebphonePhoneClient(e);
        }
    }

    _flushExtensionStatusEvents(){
        let extensionsStatus = {...this._OperatorConsoleAsParent.getExtensionsStatus()};
        let monitoringExtension = this._OperatorConsoleAsParent.getMonitoringExtension();

        for (const e of this.statusEvents) {
            //this.old_notify_status && this.old_notify_status(e)

            let status = 'hanging';
            switch (e.status) {
                case '14':
                case '2':
                case '36':
                    status = 'talking';
                    break;
                case '35':
                    status = 'holding';
                    break;
                case '-1':
                    status = 'hanging';
                    break;
                case '1':
                    status = 'calling';
                    break;
                case '65':
                    status = 'ringing';
                    break;
                default:
                    continue;
            }

            // //!temp
            // const callById = this.state.callById;
            // const call = Object.values(this.state.callById).find(
            //     (call) => {
            //         //const b = call.pbxRoomId === e.room_id && call.pbxTalkerId === e.talker_id;
            //         const b = call.pbxRoomId === e.room_id;
            //         if( call.pbxRoomId ){
            //             console.log( "//!temp call.pbxRoomId=" + call.pbxRoomId );
            //         }
            //         return b;
            //     }
            // );
            // if( call ) {
            //     const callIndex = this.state.callIds.indexOf(call.id);
            //     const temp = 0; //!temp
            // }

            const path = `${e.user}.callStatus.${e.talker_id}`;
            if (status === 'hanging') {
                deleteProperty(extensionsStatus, path  );
                if (e.user === monitoringExtension) {
                    monitoringExtension = '';
                }
                this._OperatorConsoleAsParent.getExtensionsStatusInstance().onDeleteExtensionStatusProperty( this, extensionsStatus, path, status, e ); //!bad //!fixit
            } else {
                setProperty(extensionsStatus, path, status);
                this._OperatorConsoleAsParent.getExtensionsStatusInstance().onSetExtensionStatusProperty( this, extensionsStatus, path, status, e );    //!bad //!fixit
            }
        }

        this._OperatorConsoleAsParent.setExtensionsStatusAndMonitoringExtension( extensionsStatus, monitoringExtension );

    }

    _onCall( call  ){
        //this._OperatorConsoleAsParent._onPhoneCallByWebphonePhoneClient( this, call ); //!old
        // const bDocumentHasFocus = document.hasFocus();
        // const isWindowFocus = this._isWindowFocus;
        // if( bDocumentHasFocus || isWindowFocus  ){  //!optimize No need for focus and blur
        //     this._webphone.closeNotification({ type: 'call', id: call.id })
        // }

        this._webphoneCallInfos.addCallInfoByWebphoneCallObject(call);


        //!old
        // //set custom incoming sound.
        // const ringtoneInfos = this._OperatorConsoleAsParent.getSystemSettingsData().getRingtoneInfos();
        //
        // const brOCCallObjectStatus = OCUtil.getCallStatusFromWebphoneCallObject( call  );
        // if(  brOCCallObjectStatus === BROC_BROCCALLOBJECT_CALL_STATUSES.incoming  ) {
        //     let incomingRingtone = "";
        //     //set custom incoming sound.
        //     if (ringtoneInfos && Array.isArray(ringtoneInfos)) {
        //         for (let i = 0; i < ringtoneInfos.length; i++) {
        //             const ringtoneInfo = ringtoneInfos[i];
        //             const caller = ringtoneInfo.ringtoneCaller;
        //             const matches = call.partyNumber.match(caller);
        //             if (matches) {
        //                 const ringtoneFilepathOrFileurl = ringtoneInfo.ringtoneFilepathOrFileurl;
        //                 incomingRingtone = OCUtil.getUrlStringFromPathOrUrl(ringtoneFilepathOrFileurl, this._RootURLString);
        //                 break;
        //             }
        //
        //         }
        //     }
        //     this._setIncomingRingtone(incomingRingtone);
        //}

        //set custom incoming sound.
        const brOCCallObjectStatus = OCUtil.getCallStatusFromWebphoneCallObject( call  );
        if(  brOCCallObjectStatus === BROC_BROCCALLOBJECT_CALL_STATUSES.incoming  ) {
			//const sessionId = call["id"];
			const sessionId = call.rawSession.sessionId;
			
			const oRingtoneUrl = this._RingtoneUrls[ sessionId ];
			if( oRingtoneUrl ){
				//Set incoming sound from INVITE X-Ringtone header.
				const sRingtoneUrl = oRingtoneUrl["ringtoneUrl"];
				this._webphone.setIncomingRingtone( sRingtoneUrl );
				const bRemoved = this._deinitRingtoneUrlFromSessionId( sessionId );
			}
			else{
				
				const incomingRingtoneFromUserSettings = this._getCustomRingtoneFromUserSettings( call.partyNumber );
				let incomingRingtone;
				if( incomingRingtoneFromUserSettings ) {
					incomingRingtone = incomingRingtoneFromUserSettings;
				}
				else{
					incomingRingtone = this.getCustomRingtoneFromSystemSettings(call.partyNumber);
				}

				//Set custom incoming sound.
				this._webphone.setIncomingRingtone( incomingRingtone );
			}
        }

    }

    _getCustomRingtoneFromUserSettings( partyNumber ){
        const userSettings = BrekekeOperatorConsole.getStaticInstance().getUserSettingsData();
		const ringtoneInfos2 = userSettings.getRingtoneInfos2Array();
		
		let incomingRingtone;
		if( !ringtoneInfos2 || !Array.isArray( ringtoneInfos2 ) ){
			incomingRingtone = "";
		}
		else{
            for (let i = 0; i < ringtoneInfos2.length; i++) {
                const ringtoneInfo = ringtoneInfos2[i];
                const caller = ringtoneInfo["ringtoneCaller"];
                const matches = partyNumber.match(caller);
                if (matches) {
                    const resType = ringtoneInfo["ringtoneResourceType"];

                    if( resType === "preset"){
                        const presetFilename = ringtoneInfo["preset"];
                        const fileInfos = BrekekeOperatorConsole.getStaticInstance().getPresetRingtoneSoundFilesInfos();
                        const fileInfo = fileInfos.getFileInfoByFilename( presetFilename );
                        if( fileInfo ) {
                            const fileUrlOrPath = fileInfo["urlOrPath"];
                            //incomingRingtone = fileUrlOrPath;
                            incomingRingtone = OCUtil.getUrlStringFromPathOrUrl( fileUrlOrPath, this._RootURLString );
                        }
                    }
                    else if( resType === "urlOrRelativePath" ){
                        const ringtoneFilepathOrFileurl = ringtoneInfo["urlOrRelativePath"];
                        incomingRingtone = OCUtil.getUrlStringFromPathOrUrl(ringtoneFilepathOrFileurl, this._RootURLString);
                    }
                    else if( resType === "uploadedFile" ){
						const fileId = ringtoneInfo["uploadedFileId"];
						if( fileId ){
							const files = BrekekeOperatorConsole.getStaticInstance().getUserSettingsRingtoneFiles();
							const fileDataArray = files.getRingtoneFileDataArray();
							if( Array.isArray( fileDataArray ) ){
								for( let k = 0; k < fileDataArray.length; k++ ){
									const fileData = fileDataArray[k];
									const fileDatazFileId = fileData["id"];
									if( fileDatazFileId === fileId ){
										const file = fileData["file"];
										let cache = this._ObjectUrlCachesForRingtone.getObjectUrlCache( fileDatazFileId );
										if( cache ){
											const timelimitMillis = cache.getTimelimitMillis();
											cache.setTimelimitMillis( timelimitMillis );	//reset timelimit
										}
										else{
											cache = this._ObjectUrlCachesForRingtone.createObjectUrlCache( file, fileDatazFileId, RINGTONE_OBJECT_URL_CACHE_TIMELIMIT_MILLIS );
										}
										const objectUrl = cache.getObjectUrl();
										incomingRingtone = objectUrl;
										
										break;
									}
								}
								if( !!incomingRingtone ){
									break;
								}
							}
						}
                    }
                    break;
				}	
				
			}
		}
		return incomingRingtone;
    }

    getCustomRingtoneFromSystemSettings( partyNumber ){
        let incomingRingtone = "";
        const ringtoneInfos2 = this._OperatorConsoleAsParent.getSystemSettingsData().getRingtoneInfos2();
        if (ringtoneInfos2 && Array.isArray(ringtoneInfos2)) {
            for (let i = 0; i < ringtoneInfos2.length; i++) {
                const ringtoneInfo = ringtoneInfos2[i];
                const caller = ringtoneInfo["ringtoneCaller"];
                const matches = partyNumber.match(caller);
                if (matches) {
                    const resType = ringtoneInfo["ringtoneResourceType"];

                    if( resType === "preset"){
                        const presetFilename = ringtoneInfo["preset"];
                        const fileInfos = BrekekeOperatorConsole.getStaticInstance().getPresetRingtoneSoundFilesInfos();
                        const fileInfo = fileInfos.getFileInfoByFilename( presetFilename );
                        if( fileInfo ) {
                            const fileUrlOrPath = fileInfo["urlOrPath"];
	                        //incomingRingtone = fileUrlOrPath;
                            incomingRingtone = OCUtil.getUrlStringFromPathOrUrl( fileUrlOrPath, this._RootURLString );
                        }
                    }
                    else if( resType === "urlOrRelativePath" ){
                        const ringtoneFilepathOrFileurl = ringtoneInfo["urlOrRelativePath"];
                        incomingRingtone = OCUtil.getUrlStringFromPathOrUrl(ringtoneFilepathOrFileurl, this._RootURLString);
                    }
                    else if( resType === "uploadedFile" ){
                        //This cannot be configured in the system settings, so do nothing
                        const temp = 0;
                    }
                    break;
                }

            }
            return incomingRingtone;
        }
    }

    // /**
    //  *  overload method
    //  * @param appData
    //  * @returns {Promise<*>}
    //  */
    // async setAppDataAsync( dataId, data ){
    //     //if (!this.pal) return;
    //
    //     const appData = {
    //         data_id: dataId,
    //         data: {...data}
    //     };
    //
    //     const [err] = await this.pal.call_pal('setAppData', appData).then((data) => ([null, data]))
    //         .catch((err) => ([err, null]));
    //     return err;
    // }


    // /**
    //  *  Overload method
    //  * @param dataId
    //  * @returns {Promise<*>}
    //  */
    // async getAppDataAsync( dataId ){
    //      const data = await this.pal.call_pal('getAppData', { data_id: dataId });
    //      return data;
    // }

    // async getContactListAsync( options ) {
    //     const res = await this.pal.call_pal("getContactList", options );
    //     return res;
    // }

    // async getContactAsync( options ) {
    //     const res = await this.pal.call_pal("getContact", options );
    //     return res;
    // }

    //     /**
    //  *  overload method
    //  * @param tenant
    //  */
    // getNoteNamesPromise(tenant, filter) {
    //     const options ={
    //         tenant:tenant
    //     };
    //     if( filter !== undefined ){
    //         options["filter"] = filter;
    //     }
    //
    //     return this.pal.call_pal('getNoteNames', options  );
    // }

    // /**
    //  *  overload method
    //  * @param tenant
    //  * @param name
    //  * @returns {*}
    //  */
    // getNote( tenant, name ){
    //     return this.pal.call_pal('getNote', {
    //         tenant: tenant,
    //         name,
    //     })
    // }

    // /**
    //  *  overload method
    //  * @param name
    //  * @param content
    //  */
    // async setNoteByPhoneClient( tenant, name, content ){
    //     const p = this.pal.call_pal('setNote', {
    //         tenant: tenant,
    //         name,
    //         note: content,
    //     });
    //     return p;
    // }

    lineEvents = [];
    flushLineEvents = debounce(() => {
        console.log('pal.notify_line', this.lineEvents);

        let linesStatus = {...this._OperatorConsoleAsParent.getLinesStatus() };
        let usingLine = this._OperatorConsoleAsParent.getUsingLine();

        for (const e of this.lineEvents) {

            if (e.status == 'on') {
                linesStatus[e.line] = e;
            } else if (e.status == 'off') {
                deleteProperty(linesStatus, e.line);
                usingLine = usingLine === e.line ? '' : usingLine;
            }
        }

        this._OperatorConsoleAsParent.setLinesStatusAndUsingLine( linesStatus, usingLine );
        this.lineEvents = [];

    }, 250)

    parkEvents = [];
    flushParkEvents = debounce(() => {
        console.log('pal.notify_park', this.parkEvents);

        const parksStatus = {...this._OperatorConsoleAsParent.getParksStatus()};
        const myParksStatus = {...this._OperatorConsoleAsParent.getMyParksStatus()};

        for (const e of this.parkEvents) {
            if (e.status == 'on') {
                parksStatus[e.park] = e;
            } else if (e.status == 'off') {
                deleteProperty(parksStatus, e.park);
                deleteProperty(myParksStatus, e.park);
            }

            this._OperatorConsoleAsParent.setParksStatusAndMyParksStatus( parksStatus, myParksStatus );
            this.parkEvents = [];
        }

    }, 250)


    /**
     *  override method
     */
    deinitPhoneClient(){
        this._isPalReady = false;

		this._deinitRingtoneUrls();

		if( this._webrtcclient ){
			this._webrtcclient.removeEventListener("sessionStatusChanged", this._WebrtcclientSessionStatusChangedFunction );
		}
		this._webrtcclient = null;
		
		if( this._webphone ){
			this._webphone.removeAllListeners("call");
			this._webphone.removeAllListeners("call_update");
			this._webphone.removeAllListeners("call_end");
			this._webphone.removeAllListeners("pal.notify_serverstatus");
			this._webphone.removeAllListeners("pal");
			this._webphone.removeAllListeners("pal.notify_status");
			this._webphone.removeAllListeners("pal.notify_line");
			this._webphone.removeAllListeners("pal.notify_park");

			//this._webphone.removeListener('pal.notify_status', this.notify_status )
			//this._webphone.removeListener('pal.notify_serverstatus', this.notify_serverstatus);
			// this._webphone.removeListener('close', this._onWebphoneClose  );
			// this._webphone.removeListener('onclose', this._onWebphoneOnclose  );
			// this._webphone.removeListener('onClose', this._onWebphoneOnClose  );
			// this._webphone.removeListener('error', this._onWebphoneError  );
			// this._webphone.removeListener('onerror', this._onWebphoneOnerror  );
			// this._webphone.removeListener('onError', this._onWebphoneOnError  );

			this._webphone.cleanup();

			this._webphone.removeAllListeners('close');
			this._webphone.removeAllListeners('onclose');
			this._webphone.removeAllListeners('onClose');
			this._webphone.removeAllListeners('error');
			this._webphone.removeAllListeners('onerror');
			this._webphone.removeAllListeners('onError');
			this._webphone.removeAllListeners("webrtcclient");
			this._webphone = null;
		}

        // if( this._windowFocusEventListener ){
        //     window.removeEventListener("focus", this._windowFocusEventListener );
        //     this._windowFocusEventListener = null;
        // }
        // if( this._windowBlurEventListener ){
        //     window.removeEventListener("blur", this._windowBlurEventListener);
        //     this._windowBlurEventListener = null;
        // }

        this._ObjectUrlCachesForRingtone.clearObjectUrlCaches();

        super.deinitPhoneClient();
    }

	getObjectUrlCachesForRingtone(){
		return this._ObjectUrlCachesForRingtone;
	}

    /**
     *  overload method
     * @param tenant
     * @param dialing
     * @param talkerId
     * @param mode
     * @returns {Promise<*>}
     */
    async transferAsync( tenant, dialing, talkerId, mode ){
        const transferOptions =  {
            //user: dialing,  //to : dialing, //!check //!forBug https://docs.brekeke.com/pbx/transfer
            to: dialing,
            tid: talkerId,
            mode:mode
        };
        if( tenant !== undefined && tenant !== null ){
            transferOptions["tenant"] = tenant;
        }
        return  this.pal.call_pal("transfer", transferOptions );
    }

    /**
     *  overload method
     * @param tenant
     * @param talkerId
     * @returns {Promise<*>}
     */
    async cancelTransferAsync( tenant, talkerId ){
        const options =  {
            tid: talkerId
        };
        if( tenant !== undefined && tenant !== null ){
            options["tenant"] = tenant;
        }
        return  this.pal.call_pal("cancelTransfer", options );
    }

    /**
     *  overload method
     * @param tenant
     * @param signal
     * @param callInfo
     */
    sendDTMF( tenant, signal, callInfo ){
		const oc = BrekekeOperatorConsole.getStaticInstance();

		const userSettingsData = oc.getUserSettingsData();
		let dtmfSendMode = userSettingsData.getDtmfSendMode();
		if( !dtmfSendMode && dtmfSendMode !== 0 ){
			dtmfSendMode = -100000000;	//-100000000 = Use layout settings
		}
		
		if( dtmfSendMode === -100000000 ){
			const systemSettingsData = oc.getSystemSettingsData();
			dtmfSendMode = systemSettingsData.getDtmfSendMode();
			if( !dtmfSendMode && dtmfSendMode !== 0 ){
				dtmfSendMode = 0;	//0 = SIP INFO
			}
		}
		
		if( dtmfSendMode === 2 ){
			const bCanInsertDTMF = callInfo.canInsertDTMF();
			if( !bCanInsertDTMF ){
                Notification.warning({ key: 'canNotInsetDTMF', message: i18n.t('The_DTMF_send_mode_is_set_to_2_but~'), duration: 10 });
				dtmfSendMode = 0;
			}
		}
		
		const sessionId = callInfo.getSessionId();

		this._webrtcclient.dtmfSendMode = dtmfSendMode;
		this._webrtcclient.sendDTMF( signal, sessionId );

        //const sendDTMFOptions =  {
        //    signal: signal,
        //    tenant: tenant,
        //    talker_id: talker_id
        //};
        //const promise = this.pal.call_pal('sendDTMF', sendDTMFOptions );
        //promise.then( res =>{
		//
        //}).catch( err =>{
        //    console.error("Failed to send DTMF err=" , err );
        //    Notification.error({message: i18n.t("failedToSendDTMF") + "\r\n" +  err, duration:0 });
        //});
    }

    /**
     *  overload method
     * @param tenant
     * @param talkerId
     * @param number
     * @returns {Promise<*>}
     */
    async parkAsync( tenant, talkerId, number ){
        const parkOptions = {
            tenant: tenant,
            tid: talkerId,
            number: number,
        };

        return  this.pal.call_pal('park', parkOptions );
    }

    /**
     *  overload method
     * @param line
     * @param status
     * @returns {Promise<*>}
     */
    async lineAsync( line, status ){
        const lineOptions = {
            line, status: status
        }
        return this.pal.call_pal('line', lineOptions );
    }

    getWebphone(){
        return this._webphone;
    }

    // getAdminExtensionPropertiesPromise( tenant, extension ){
    //     const promise = this.pal.call_pal("getExtensionProperties", {
    //         tenant: tenant,
    //         extension: [ extension ],
    //         property_names: ["admin"]
    //     });
    //     return promise;
    // }

    async _initialize(  onInitSuccessFunction, newUserSettingsCoreData = null ){
        window.focus();  //for document.hasFocus() should true.

        // prompt for permission if needed
        //this._webphone.promptBrowserPermission();

        // or if we manually show the prompt, we can accept the permission on user click
        this._webphone.acceptBrowserPermission();

        // //const customizedPromptBrowserPermission1 = () => {
        //     const div = document.createElement('div')
        //     div.style =
        //         'position: fixed; inset: 0; padding-top: 50px; background: rgba(0,0,0,0.8); color: white; text-align: center; font-weight: bold; cursor: pointer;'
        //     div.innerHTML = 'Customized prompt for permission 1'
        //     div.addEventListener('click', () => {
        //         document.body.removeChild(div);
        //         this._webphone.acceptBrowserPermission();
        //     })
        //     document.body.appendChild(div);
        // //}


        this.pal.call_pal('getExtensions', {
            tenant: this._OperatorConsoleAsParent.getLoggedinTenant(),
            pattern: '..*',
            limit: -1,
            type: 'user',
            property_names: ['name'],
        }).then(extensions => {
            const oExtensions = extensions.map(([id,name]) => ({id,name}));
            const intervalId = setInterval( ()=>{
                if( this._webrtcclient ){
                    clearInterval( intervalId );
                    if( onInitSuccessFunction ){
						onInitSuccessFunction( oExtensions );
					}
                }
            }, 1000);
        })


        // this._windowFocusEventListener = (ev) =>{
        //     this._onWindowFocus(ev);
        // };
        // window.addEventListener("focus", this._windowFocusEventListener);
        //
        // this._windowBlurEventListener = ( ev ) =>{
        //     this._onWindowBlur(ev);
        // };
        // window.addEventListener("blur", this._windowBlurEventListener );

				
		const oc = BrekekeOperatorConsole.getStaticInstance();
		const userSettingsCoreData = newUserSettingsCoreData ? newUserSettingsCoreData : oc.getUserSettingsData().getData();
		const webphone = this._webphone;
		
		const [camerasData, microphonesData, speakersData] = await Promise.all([
		  webphone.getAvailableCameras(),
		  webphone.getAvailableMicrophones(),
		  webphone.getAvailableSpeakers(),
		]);
		
		const camera = userSettingsCoreData["webphone_camera"];
		let pCamera;
		if( camera && camerasData && camerasData.findIndex( (cameraData) => cameraData.deviceId === camera ) !== -1 ){
			pCamera = webphone.setVideoInputDevice( camera );
		}
		
		const mic = userSettingsCoreData["webphone_microphone"];
		let pMic;
		if( mic && microphonesData && microphonesData.findIndex( (micData) => micData.deviceId === mic ) !== -1 ){
			pMic = webphone.setAudioInputDevice( mic );
		}
		
		const speaker = userSettingsCoreData["webphone_speaker"];
		let pSpeaker;
		if( speaker && speakersData && speakersData.findIndex( (speakerData) => speakerData.deviceId === speaker ) !== -1 ){
			pSpeaker = webphone.setAudioOutputDevice( speaker );
		}
		
		await Promise.all([pCamera,pMic,pSpeaker]);				


    }

    // _onWindowFocus(ev){
    //     this._isWindowFocus  = true;
    // }
    //
    // _onWindowBlur(ev){
    //     this._isWindowFocus  = false;
    // }

    /**
     *  overload method
     * @param sDialing
     * @param bUsingLine
     * @returns {boolean}
     */
    callByPhoneClient( sDialing, usingLine, videoEnabled = false ){
        // if (!this._webphone) {
        //     return false;
        // }

        if ( usingLine ) {
            this._webphone.call(sDialing, {
                extraHeaders: [`X-PBX-RPI: ${usingLine}`]
            });
        } else {

            const options = null;
            const videoOptions = null;
            const exInfo = null;

            this._webphone.call(sDialing, options, videoEnabled, videoOptions, exInfo  );
        }
        //return true;
    }

    // unhold( aCallInfo, onOkFunc, onErrorFunc ){
    //     const tenant = this._OperatorConsoleAsParent.getLoggedinTenant();
    //     const talkerId = aCallInfo.getPbxTalkerId();
    //     this.pal.unhold({tenant:tenant,tid:talkerId}, onOkFunc, onErrorFunc );
    // }
    //
    // hold( aCallInfo, onOkFunc, onErrorFunc ){
    //     const tenant = this._OperatorConsoleAsParent.getLoggedinTenant();
    //     const talkerId = aCallInfo.getPbxTalkerId();
    //     this.pal.hold({tenant:tenant,tid:talkerId}, onOkFunc, onErrorFunc );
    // }

    onDisconnectByWebphoneCallInfo( callInfoAsCaller, notifyStatusEvent ){
        const callId = callInfoAsCaller.getCallId();
        this.getCallInfos().onEndCallByPhoneClient( callId, notifyStatusEvent );
    }

}

class IncomingMessageDataParser{
	
	constructor(){
		this._sFrom = undefined;
	}
	
	//data ex "CANCEL sip:ncst3gu8@163mipt7mg7s.invalid;transport=ws SIP/2.0\r\nVia: SIP/2.0/WSS 127.0.0.1:10081;branch=z9hG4bK56b11e5ae646e-30-18ee71\r\nFrom: \"666name\" <sip:666@127.0.0.1:10081>;tag=b868203bfp\r\nTo: <sip:t1_888_phone4_webphone@127.0.0.1:10081>\r\nMax-Forwards: 70\r\nCall-ID: 77d95338-ae1fe86c-f8be599-c3427946\r\nUser-Agent: Brekeke SIP Server\r\nCSeq: 1 CANCEL\r\nReason: SIP ;cause=200 ;text=\"Call completed by 777\"\r\nContent-Length: 0\r\n\r\n"
	parse( session, callObject ){
	}
	
	//!Do not use //!Not tested
	_parseFrom( session ){
		//parse from	
		let sFrom = session.rtcSession?._request?.from?._display_name;
		//let sFrom = null;
		if( !sFrom ){
			const sData = session?.incomingMessage?.data;
			if( sData ){
				const iFromFrom = sData.indexOf("\r\nFrom: \"");
				if( iFromFrom !== -1 ){
					const iFromEnd = sData.indexOf("\"", iFromFrom + 1 ); //!limitation User names containing double quotes are not supported.
					if( iFromEnd !== -1 ){
						sFrom = sData.substring( iFromFrom + 1, ( iFromEnd + 1 ) - iFromFrom );
					}
				}
			}
		}
		this._sFrom = sFrom;
		
	}
	
	//getFrom(){
		//return this._sFrom;
	//}
	
}