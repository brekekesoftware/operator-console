import Notification from "antd/lib/notification";
import i18n, {DEFAULT_LOCALE, isValidLocale} from "./i18n";
import debounce from "debounce";
import {deleteProperty, setProperty} from "dot-prop";
import APhoneClient from "./APhoneClient";
import OCUtil, {BROC_BROCCALLOBJECT_CALL_STATUSES} from "./OCUtil";
import WebphoneCallInfos from "./WebphoneCallInfos";
import {reaction} from "mobx";

export default class WebphonePhoneClient  extends APhoneClient {
    constructor( options  ) {
        super( options );
        this._isPalReady = false;

        const options_ = {...options}
        options_["phoneClient"] = this;
        this._WebphoneCallInfos = new WebphoneCallInfos( options_ );
    }

    /**
     *  overload method
     */
    getCallInfos(){
        return this._WebphoneCallInfos;
    }

    /**
     *  overload method
     * @returns {boolean}
     */
    isPalReady(){
        return this._isPalReady;
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


    /**
     *  override mothod
     * @param options
     */
    initPhoneClient( options ){
        super.initPhoneClient( options );

        const eBrOcPhone = document.getElementById('brOCPhone');
        const args = {
            autoLogin: true,
            clearExistingAccounts: true,
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
        };

        this._Webphone = window.Brekeke.Phone.render(eBrOcPhone, args);

        const onInitSuccessFunction = options["onInitSuccessFunction"];

        this._onWebphoneError = e => {
            console.log("Webphone event:error", e);
            const temp = 0;
        };
        this._onWebphoneOnError = e => {
            console.log("Webphone event:onError", e);
            const temp = 0;
        };
        this._onWebphoneOnerror = e => {
            console.log("Webphone event:onerror", e);
            const temp = 0;
        };

        this._onWebphoneClose = e => {
            console.log("Webphone event:close", e);
            const temp = 0;
        };
        this._onWebphoneOnClose = e => {
            console.log("Webphone event:onClose", e);
            const temp = 0;
        };
        this._onWebphoneOnclose = e => {
            console.log("Webphone event:onclose", e);
            const temp = 0;
        };

        this._Webphone.on("error", this._onWebphoneError );
        this._Webphone.on("onError", this._onWebphoneOnError );
        this._Webphone.on("onerror", this._onWebphoneOnerror );
        this._Webphone.on("close", this._onWebphoneClose );
        this._Webphone.on("onClose", this._onWebphoneOnClose );
        this._Webphone.on("onclose", this._onWebphoneOnclose  );


        const this_  = this;
        this._Webphone.on('call', c => {
            console.log('call', c);
            this_._onCall( c );
        });
        this._Webphone.on('call_update', c => {
            console.log('call_update', c);
            this._WebphoneCallInfos.onUpdateCallObjectByWebphoneClient( c );
        })
        this._Webphone.on('call_end', c => {
            console.log('call_end', c);
            this._WebphoneCallInfos.onEndCallByPhoneClient( c.id );
        })
        this.notify_serverstatus = e => {
            console.log('pal.notify_serverstatus', e);

            if (e?.status === 'active' ) {
                //const staccount = this._Webphone.getCurrentAccount();
                this._initialize( onInitSuccessFunction );   //initialize
            }
            this._OperatorConsoleAsParent.onPalNotifyServerstatusByWebphonePhoneClient(e);
        }
        this._Webphone.on("pal.notify_serverstatus", this.notify_serverstatus );


        this._Webphone.on('pal', ( pal) => {

            //this. account = this._Webphone.getCurrentAccount();
            //console.log('account', this._Webphone.getCurrentAccount());
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
                this._Webphone.on('pal.notify_status', this.notify_status);

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
                this._Webphone.on("pal.notify_line", this.notify_line );

                this.notify_park = e => {
                    console.log('pal.notify_park', e)
                    if (e) {
                        this.parkEvents.push(e);
                        this.flushParkEvents();
                    }
                }
                //pal.notify_park = this.notify_park;
                this._Webphone.on("pal.notify_park", this.notify_park );

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

                let old_onClose = pal.onClose
                pal.onClose = e => {
                    console.log('pal.onClose', e)
                    old_onClose && old_onClose(e) // call old listener
                    if (!e.wasClean) {
                        Notification.warning({ key: 'reconnecting', message: i18n.t('reconnecting_pbx'), duration: 20 });
                    }
                }
            }

            //this._initialize( account, pal );   //initialize  for new webphone 2023/04/10~
        } /* ~this._Webphone.on( */ )  //~this._Webphone.on
    }

    statusEvents = [];
    flushStatusEvents = debounce(() => {
        console.log('pal.notify_status', this.statusEvents);
        this._flushExtensionStatusEvents();
        //this._flushLineStatusEvents();
        this.statusEvents = [];
    }, 250)
    // statusEvents = [];
    // flushStatusEvents = () => {
    //     console.log('pal.notify_status', this.statusEvents);
    //     this._flushExtensionStatusEvents();
    //     //this._flushLineStatusEvents();
    //     this.statusEvents = [];
    // };

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
                    break;
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

            // const options = {
            //     event : e
            // }
            // this._OperatorConsoleAsParent.onPalNotifyStatus(options);   //!bad //!fixit
        }

        this._OperatorConsoleAsParent.setExtensionsStatusAndMonitoringExtension( extensionsStatus, monitoringExtension );

    }

    _onCall( call  ){
        //this._OperatorConsoleAsParent._onPhoneCallByWebphonePhoneClient( this, call ); //!old
        this._WebphoneCallInfos.addCallInfoByWebphoneCallObject(call);


        //set custom incoming sound.
        const ringtoneInfos = this._OperatorConsoleAsParent.getSystemSettingsData().getRingtoneInfos();

        const brOCCallObjectStatus = OCUtil.getCallStatusFromWebphoneCallObject( call  );
        if(  brOCCallObjectStatus === BROC_BROCCALLOBJECT_CALL_STATUSES.incoming  ) {
            let incomingRingtone = "";
            //set custom incoming sound.
            if (ringtoneInfos && Array.isArray(ringtoneInfos)) {
                for (let i = 0; i < ringtoneInfos.length; i++) {
                    const ringtoneInfo = ringtoneInfos[i];
                    const caller = ringtoneInfo.ringtoneCaller;
                    const matches = call.partyNumber.match(caller);
                    if (matches) {
                        const ringtoneFilepathOrFileurl = ringtoneInfo.ringtoneFilepathOrFileurl;
                        incomingRingtone = OCUtil.getUrlStringFromPathOrUrl(ringtoneFilepathOrFileurl, this._RootURLString);
                        break;
                    }

                }
            }
            this._setIncomingRingtone(incomingRingtone);
        }



    }

    /**
     *  overload method
     * @param appData
     * @returns {Promise<*>}
     */
    async setAppDataAsync( dataId, data ){
        //if (!this.pal) return;

        const appData = {
            data_id: dataId,
            data: {...data}
        };

        const [err] = await this.pal.call_pal('setAppData', appData).then((data) => ([null, data]))
            .catch((err) => ([err, null]));
        return err;
    }

    /**
     *  overload method
     * @param tenant
     */
    getNoteNamesPromise(tenant, filter) {
        const options ={
            tenant:tenant
        };
        if( filter !== undefined ){
            options["filter"] = filter;
        }

        return this.pal.call_pal('getNoteNames', options  );
    }

    /**
     *  overload method
     * @param tenant
     * @param name
     * @returns {*}
     */
    getNote( tenant, name ){
        return this.pal.call_pal('getNote', {
            tenant: tenant,
            name,
        })
    }

    /**
     *  overload method
     * @param name
     * @param content
     */
    setNoteByPhoneClient( tenant, name, content ){
        this.pal.call_pal('setNote', {
            tenant: tenant,
            name,
            note: content,
        });
    }

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
        this._Webphone.removeAllListeners("call");
        this._Webphone.removeAllListeners("call_update");
        this._Webphone.removeAllListeners("call_end");
        this._Webphone.removeAllListeners("pal.notify_serverstatus");
        this._Webphone.removeAllListeners("pal");
        this._Webphone.removeAllListeners("pal.notify_status");
        this._Webphone.removeAllListeners("pal.notify_line");
        this._Webphone.removeAllListeners("pal.notify_park");

        //this._Webphone.removeListener('pal.notify_status', this.notify_status )
        //this._Webphone.removeListener('pal.notify_serverstatus', this.notify_serverstatus);
        // this._Webphone.removeListener('close', this._onWebphoneClose  );
        // this._Webphone.removeListener('onclose', this._onWebphoneOnclose  );
        // this._Webphone.removeListener('onClose', this._onWebphoneOnClose  );
        // this._Webphone.removeListener('error', this._onWebphoneError  );
        // this._Webphone.removeListener('onerror', this._onWebphoneOnerror  );
        // this._Webphone.removeListener('onError', this._onWebphoneOnError  );

        this._Webphone.cleanup();

        this._Webphone.removeAllListeners('close');
        this._Webphone.removeAllListeners('onclose');
        this._Webphone.removeAllListeners('onClose');
        this._Webphone.removeAllListeners('error');
        this._Webphone.removeAllListeners('onerror');
        this._Webphone.removeAllListeners('onError');

        super.deinitPhoneClient();
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
            user: dialing,
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
     * @param talker_id
     * @param signal
     */
    sendDTMF( tenant, talker_id, signal ){
        const sendDTMFOptions =  {
            signal: signal,
            tenant: tenant,
            talker_id: talker_id
        };
        const promise = this.pal.call_pal('sendDTMF', sendDTMFOptions );
        promise.then( res =>{

        }).catch( err =>{
            console.error("Failed to send DTMF err=" , err );
            Notification.error({message: i18n.t("failedToSendDTMF") + "\r\n" +  err, duration:0 });
        });
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

    // getAdminExtensionPropertiesPromise( tenant, extension ){
    //     const promise = this.pal.call_pal("getExtensionProperties", {
    //         tenant: tenant,
    //         extension: [ extension ],
    //         property_names: ["admin"]
    //     });
    //     return promise;
    // }

    _initialize(  onInitSuccessFunction ){

        // prompt for permission if needed
        //this._Webphone.promptBrowserPermission();

        // or if we manually show the prompt, we can accept the permission on user click
        this._Webphone.acceptBrowserPermission();



        this.pal.call_pal('getExtensions', {
            tenant: this._OperatorConsoleAsParent.getLoggedinTenant(),
            pattern: '..*',
            limit: -1,
            type: 'user',
            property_names: ['name'],
        }).then(extensions => {
            const oExtensions = extensions.map(([id,name]) => ({id,name}));
            onInitSuccessFunction( oExtensions );
        })

    }


    _setIncomingRingtone( soundFileUrl ){
        this._Webphone.setIncomingRingtone( soundFileUrl );
    }

    /**
     *  overload method
     * @param sDialing
     * @param bUsingLine
     * @returns {boolean}
     */
    callByPhoneClient( sDialing, usingLine ){
        // if (!this._Webphone) {
        //     return false;
        // }

        if ( usingLine ) {
            this.phone.call(sDialing, {
                extraHeaders: [`X-PBX-RPI: ${usingLine}`]
            });
        } else {
            this._Webphone.call(sDialing);
        }
        //return true;
    }
    
}