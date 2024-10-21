import i18n from "./i18n";
import {fail} from "mobx/lib/utils/utils";

//!ref https://docs.brekeke.com/pbx/pbx-rest-api
//!ref https://docs.brekeke.com/pbx/pal-rest-api-sample-1
const RELOGIN_RETRY_COUNT = 2;
export default class PalRestApi{

    constructor() {
    }

    initPalRestApi( options ){
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
        const fetchPromise = fetch( initPalRestApiBaseUrlPrefix + "login", initPalRestApiFetchOptions );
        fetchPromise.then( (response) =>{
            const json = response.json();
            return json;
        }).then( (json) =>{
            const token = json.token;
            if( !token || token.length === 0  ){
                const err = new Error("Failed to get PAL REST API token. token=" + token );
                if( failFunc ) {
                    failFunc(err);
                }
            }
            else{
                this._palRestApiToken = token;
                this._palRestApiBaseUrlPrefix = initPalRestApiBaseUrlPrefix;
                this._initPalRestApiFetchOptions = initPalRestApiFetchOptions;
                if( successFunc ){
                    successFunc();
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
                        this._relogin(newOptions);
                    }
                    return;
                });
        });
        return promise;
    }

    deinitPalRestApi(){
        this._palRestApiToken = null;
        this._palRestApiBaseUrlPrefix = null;
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
            methodParams = "{}";
        }


        const fetchOptions = {
            mode: 'cors',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization' : "basic " + this._palRestApiToken
            },
            body: methodParams
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
            methodParams = "{}";
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
            body: methodParams
        }
        const this_ = this;
        const promise = new Promise( (resolve, reject ) => {

            fetch(this._palRestApiBaseUrlPrefix + methodName, fetchOptions).then(function (response) {
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
                        console.error("Failed to call PAL REST API method(Response status is not 200). response=", response);
                        reject(response);
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