import i18n from "./i18n";
import {fail} from "mobx/lib/utils/utils";
import BrekekeOperatorConsole from "./index";
import MfaUtil from "./MfaUtil";

//!ref https://docs.brekeke.com/pbx/pbx-rest-api
//!ref https://docs.brekeke.com/pbx/pal-rest-api-sample-1
const RELOGIN_RETRY_COUNT = 2;
export default class PalRestApi{

    constructor() {
    }

    clonePalRestApi(){
        const p = new PalRestApi();
        //!modify //!sync(require)
        p._palRestApiToken = this._palRestApiToken;
        p._palRestApiBaseUrlPrefix = this._palRestApiBaseUrlPrefix;
        p._initPalRestApiFetchOptions = this._initPalRestApiFetchOptions;
        return p;
    }

    async initPalRestApi( options ){
        this._palRestApiToken = null;
        const hostname = options.hostname;
        let sPort;
        if( options.port === undefined || options.port === null ){
            sPort = "";
        }
        else if (typeof options.port === 'string' || options.port instanceof String){
            sPort = options.port;
        }
        else{
            sPort = options.port + "";
        }
        const pbxDirectoryName = options.pbxDirectoryName;
        const initPalRestApiOptions = {
            //hostname: params.hostname,
            //port: params.port,
            tenant: options.tenant,
            login_user: options.username,
            login_password: options.password
        }

        let sDeviceToken;
        if( options["useDeviceToken"] !== false ){
            const sDeviceTokenKey = "br+dtoken+" + options.tenant + "+" + options.username;
            sDeviceToken = window.localStorage.getItem( sDeviceTokenKey );
            if( sDeviceToken ){
                initPalRestApiOptions["device_token"] = sDeviceToken;
            }
        }

        const failFunc = options.onInitFailFunction;
        const successFunc = options.onInitSuccessFunction;

        const initPalRestApiBaseUrlPrefix = "https://" + hostname + ( sPort && sPort.length !== 0 ? ':' + sPort : ""  )  + "/" + pbxDirectoryName + "/api/pal/";

        const initPalRestApiFetchOptions = {
            mode: 'cors',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify( initPalRestApiOptions )
        };

        this._palRestApiBaseUrlPrefix = initPalRestApiBaseUrlPrefix;
        this._initPalRestApiFetchOptions = initPalRestApiFetchOptions;

        const fetchPromise = fetch( initPalRestApiBaseUrlPrefix + "login", initPalRestApiFetchOptions );
        fetchPromise.then(  async (response) =>  {
			if (!response.ok) {
                const message = await response.text();
                if( sDeviceToken && response.status === 401 ){  //MFA(Device token) failed
                    const sDeviceTokenKey = "br+dtoken+" + options.tenant + "+" + options.username;
                    window.localStorage.removeItem( sDeviceTokenKey );
                    
                    const options2 = window.structuredClone(options);
                    options2["useDeviceToken"] = false;
                    await this.initPalRestApi( options2 );
                    return null;
                }
                else{
                    //const message = await response.text();
                    const error = new Error( message );
                    error.status = response.status;
                    throw error;
                }
			}
			else{
				const json = response.json();
				return json;
			}
        }).then( async (json) =>{
            if( json === null ){    //start mfa
                return;
            }
            const token = json.token;
            if( !token || token.length === 0  ){
                const err = new Error("Failed to get PAL REST API token. token=" + token );
                if( failFunc ) {
                    failFunc(err);
                }
            }
            else{
                this._palRestApiToken = token;
				
				//MFA
				const mfaRequired = json["mfa_required"];
				BrekekeOperatorConsole.getStaticInstance().setMfaRequired(mfaRequired);
				if( mfaRequired === true ){
                    try{
                        const doMfaResult = await this._doMfa( options.tenant, options.username, options.password, hostname, options.port, pbxDirectoryName, sDeviceToken );
                        switch( doMfaResult ){
                            case 1:
                                if( successFunc ){
                                    successFunc();
                                }
                            break;
                            case 2:
                                if( successFunc ){
                                    successFunc( {startMfa:true} );
                                }
                            break;
                            default:
                                if( failFunc ){
                                    failFunc();
                                }
                            break;
                        }
                    }
                    catch( err ){
                        if( failFunc ){
                            failFunc(err);
                        }
                    }
				}
				else{
					if( successFunc ){
						successFunc();
					}
				}
            }
        })
            .catch( (err) =>{
                console.error("Failed to login(Failed to init PAL REST API). error=" , err  );
                if( failFunc ) {
                    failFunc(err);
                }
                return;
            });

    }
	
    async _doMfa( tenant, username, password, hostname, port, pbxDirectoryName, sDeviceToken ){
        // const sDeviceTokenKey = "br+dtoken+" + options.tenant + "+" + options.username;
        // const sDeviceToken = window.localStorage.getItem( sDeviceTokenKey );
        if( sDeviceToken ){
            //check deviceToken
            //
            const methodName = "device_token/check";
            const userAgent = navigator.userAgent;
            const checkDeviceTokenMethodParams = {
                token : sDeviceToken,
                tenant : tenant,
                user : username,
                //sa : false,
                //ip_address : window.location.hostname,
                user_agent : userAgent	//!testit //!forBug
            };
            const checkDeviceTokenOptions = {
                methodName : methodName,
                methodParams : checkDeviceTokenMethodParams,	//!testit	//!check //!forBug
                enableRelogin : false,
            };
            try{
                const result = await this.callPalRestApiMethodAsync( checkDeviceTokenOptions );
                const sStatus = result["status"];
                //if( false && sStatus === "OK"){	//!temp //!test //!dev
                console.log("**************sStatus=" + sStatus );  //!temp
                if( sStatus === "OK"){
                    this._deviceToken = sDeviceToken;
                    return 1;
                }
                else{
                    try{
                        const startMfaResult = await this._startMfa( tenant, username );
                        if( startMfaResult["status"] === "OK"){
                            //!forBug //!testit //!check startMfaResult["type"] === "url"
                            //const expiry_time = result["expiry_time"];
                            if( startMfaResult["type"] === "code" ){
                                BrekekeOperatorConsole.getStaticInstance().onStartMfaOK( startMfaResult, tenant, username, password, hostname, port, pbxDirectoryName );
                                return 2;
                            }
                            else if( startMfaResult["type"] === "none"){
                                return 1;
                            }
                        }
                        else{
                            console.error("Failed to start MFA.");
                            return 0;
                        }
                    }
                    catch(err){
                        console.error("Failed to start MFA. error=" , err  );
                        if( failFunc ) {
                            throw err;
                        }
                        return 0;
                    }
                }
            }
            catch( error ){
                console.error("Failed to PAL rest API(device_token/check). error=" , error  );
                if( failFunc ) {
                    throw err;
                }
                return 0;
            }
            
        }
        else{
            try{
                const startMfaResult = await this._startMfa( tenant, username );
                if( startMfaResult["status"] === "OK"){
                    //!forBug //!testit //!check startMfaResult["type"] === "url"
                    //const expiry_time = result["expiry_time"];
                    if( startMfaResult["type"] === "code" ){
                        BrekekeOperatorConsole.getStaticInstance().onStartMfaOK( startMfaResult, tenant, username, password, hostname, port, pbxDirectoryName );
                        return 2;
                    }
                    else if( startMfaResult["type"] === "none"){
                        return 1;
                    }
                }
                else{
                    console.error("Failed to start MFA.");
                    return 0;
                }
            }
            catch(err){
                console.error("Failed to start MFA. error=" , err  );
                throw err;
            }
        }
        return 0;
    }

	async _startMfa( tenant, user ){
		const methodName = "mfa/start";
		const methodParams = {
			tenant : tenant,
			user : user,
			//sa : false,
			//email : "***@***.***",
			//url : ***,
			//options : ***,
		};
		const options = {
			methodName : methodName,
			methodParams : methodParams,
            enableRelogin : false,
		};
		const result = await this.callPalRestApiMethodAsync( options );
		//if( result["status"] === "OK" && result["type"] === "code" ){	//!forBug //!testit //!check result["type"] === "url"
		//	//const expiry_time = result["expiry_time"];
		//	BrekekeOperatorConsole.getStaticInstance().onStartMfaOK( result, tenant, user );
		//}
		if( result["status"] === "OK" && result["type"] === "code" ){
			MfaUtil.getStaticInstance().resetBlockResendTimelimit();
		}
		return result;
	}

    _relogin( options ){
        const retryCount = options["retryCount"];
        const failFunc = options["failFunc"];
        const successFunc = options["successFunc"];

        const fetchPromise = fetch( this._palRestApiBaseUrlPrefix + "login", this._initPalRestApiFetchOptions );
        fetchPromise.then( (response) =>{
            const json = response.json();
            return json;
        }).then( (json) =>{
            const token = json.token;
            if( !token || token.length === 0  ){
                if( retryCount ===  0 ) {
                    const err = new Error("Failed to get PAL REST API token. token=" + token);
                    if (failFunc) {
                        failFunc(err);
                    }
                }
                else{
                    //const newOptions = structuredClone( options );    //!error DataCloneError
                    const newOptions = {...options};    //!modify
                    newOptions["retryCount"] = retryCount - 1;
                    this._relogin( newOptions );
                }
            }
            else{
                this._palRestApiToken = token;
                if( successFunc ){
                    successFunc();
                }
            }
        })
            .catch( (err) =>{
                if( retryCount === 0 ) {
                    console.error("Failed to login(Failed to init PAL REST API). error=", err);

                    if (failFunc) {
                        failFunc(err);
                    }
                }
                else{
                    //const newOptions = structuredClone( options );    //!error DataCloneError
                    const newOptions = {...options};    //!modify
                    newOptions["retryCount"] = retryCount - 1;
                    this._relogin( newOptions );
                }
                return;
            });
    }

    async _reloginAsync( options ){
        const retryCount = options["retryCount"];

        const promise = new Promise( (resolve, reject ) => {
            const fetchPromise = fetch(this._palRestApiBaseUrlPrefix + "login", this._initPalRestApiFetchOptions);
            fetchPromise.then((response) => {
                const json = response.json();
                return json;
            }).then((json) => {
                const token = json.token;
                if (!token || token.length === 0) {
                    if (retryCount === 0) {
                        const err = new Error("Failed to get PAL REST API token. token=" + token);
                        reject(err);
                    } else {
                        //const newOptions = structuredClone(options);  //!error DataCloneError
                        const newOptions = {...options};    //!modify
                        newOptions["retryCount"] = retryCount - 1;
                        this._reloginAsync(newOptions).then( () => {
                            resolve();
                        }).catch( (err) =>{
                            reject(err);
                        });
                    }
                } else {
                    this._palRestApiToken = token;
                    resolve();
                }
            })
                .catch((err) => {
                    if (retryCount === 0) {
                        console.error("Failed to login(Failed to init PAL REST API). error=", err);
                        reject(err);
                    } else {
                        //const newOptions = structuredClone(options);  //!error DataCloneError
                        const newOptions = {...options};    //!modify
                        newOptions["retryCount"] = retryCount - 1;
                        //this._relogin(newOptions);
						//!testit
						this._reloginAsync( newOptions )
							.then(resolve)
							.catch(reject);
						
                    }
                    return;
                });
        });
        return promise;
    }

    deinitPalRestApi(){
        this._palRestApiToken = null;
        this._palRestApiBaseUrlPrefix = null;
		this._deviceToken = null;
    }

    isPalRestApiInitialized(){
        const bNotInitialized = !this._palRestApiToken || this._palRestApiToken === null || !this._palRestApiBaseUrlPrefix || this._palRestApiBaseUrlPrefix === null; //!depend deinitPalRestApi()
        return !bNotInitialized;
    }

    callPalRestApiMethod( options ){
        const methodName = options.methodName;
        let methodParams = options.methodParams;
        const onSuccessFunction = options.onSuccessFunction;
        const onFailFunction = options.onFailFunction;
        let  enableRelogin= options["enableRelogin"];
        if( enableRelogin === undefined || enableRelogin === null ){
            enableRelogin = true;
        }

        if( !methodParams ){
            methodParams = {};
        }

        if( this._deviceToken ){
            methodParams["device_token"] = this._deviceToken;
        }


        const fetchOptions = {
            mode: 'cors',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization' : "basic " + this._palRestApiToken
            },
            body: JSON.stringify(methodParams)
        }
        const this_ = this;
        let successError;
        fetch(this._palRestApiBaseUrlPrefix + methodName, fetchOptions ).then( function( response ){
            if( response.status !== 200 ){
                if( response.status === 401 &&  enableRelogin === true   ){
                    const reloginOptions = {
                        retryCount : RELOGIN_RETRY_COUNT,
                        failFunc : ( err ) =>{
                          if( onFailFunction ){
                              console.error("Failed to call PAL REST API method(Response status is 401). response=", response, ",error=", err );
                              onFailFunction(err);
                          }
                        },
                        successFunc : ()=>{
                            //const newOptions = structuredClone(options);  //!error DataCloneError
                            const newOptions = {...options};    //!modify
                            newOptions["enableRelogin"] = false;
                            this_.callPalRestApiMethod( newOptions  );
                        }
                    };
                    this_._relogin( reloginOptions );
                    return;
                }
                else {
                    console.error("Failed to call PAL REST API method(Response status is not 200). response=", response);
                    if (onFailFunction) {
                        onFailFunction(response);
                    }
                }
            }
            else {
                const pJson =  response.json();
                pJson.then( (json) =>{
                    if( onSuccessFunction ) {
                        try {
                            onSuccessFunction(json);
                        }
                        catch(err){
                            successError = err;
                            throw successError;
                        }
                    }
                } ).catch( (e) =>{
                    if( successError ){
                        throw successError;
                    }
                    else {
                        const json = null;
                        onSuccessFunction(json);
                    }
                });
            }
        }).catch( function( err ){
            if( successError ){
                throw successError;
            }
            else {
                console.error("Failed to call PAL REST API method.", err);
                if (onFailFunction) {
                    onFailFunction(err);
                }
            }
        });

    }

    async callPalRestApiMethodAsync( options ){
        const methodName = options.methodName;
        let methodParams = options.methodParams;

        if( !methodParams ){
            methodParams = {};
        }

        if( this._deviceToken ){
            methodParams["device_token"] = this._deviceToken;
        }


        let enableRelogin  = options["enableRelogin"];
        if( enableRelogin === undefined || enableRelogin === null ){
            enableRelogin = true;
        }

        const fetchOptions = {
            mode: 'cors',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization' : "basic " + this._palRestApiToken
            },
            body: JSON.stringify(methodParams)
        }
        const this_ = this;
        const promise = new Promise( (resolve, reject ) => {

            fetch(this._palRestApiBaseUrlPrefix + methodName, fetchOptions).then( async (response) => {
                if (response.status !== 200 ) {
                    if( response.status === 401 && enableRelogin === true ) {
                        const p = this_._reloginAsync({retryCount:RELOGIN_RETRY_COUNT});
                        p.then( () =>{
                            //const newOptions = structuredClone(options);  //!error DataCloneError
                            const newOptions = {...options}; //!modify
                            newOptions["enableRelogin"] = false;
                            const pApi = this_.callPalRestApiMethodAsync( newOptions );
                            pApi.then( (res)=>{
                                resolve(res);
                            }).catch( (err) =>{
                               reject(err);
                            });
                        }).catch( (err) =>{
                            reject(err);
                        } );
                    }
                    else {
                        console.error("Failed to call PAL REST API method(Response status is not 200). response=", response );
                        const message =  await response.text();
                        const err = new Error(message);
                        err.status = response.status;
                        reject(err);
                        //reject(response);
                    }
                } else {
                    const pJson = response.json();
                    pJson.then((json) => {
                            resolve(json);
                        })
                    .catch((e) => {
                        const json = null;
                        reject(json);
                    });
                }
            }).catch(function (err) {
                console.error("Failed to call PAL REST API method.", err);
                reject(err);
            });
        });
        return promise;
    }
}