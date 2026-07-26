import React, {createRef} from "react";
import Form from "antd/lib/form";
import i18n from "./i18n";
import Input from "antd/lib/input";
import Button from "antd/lib/button";
import "./mfa.scss"
import BrekekeOperatorConsole from "./index";
import OCUtil from "./OCUtil";
import MfaUtil from "./MfaUtil";

export default class Mfa extends React.Component {
    constructor( props ) {
        super( props );
        this._OperatorConsoleAsParent = props.operatorConsoleAsParent;
        this.state = { isVerify : false, isResendCode : false, inputMfaCode : "" };
        //this._pal = null;
        this._MfaMessageElementRef = createRef();
        this._StartMfaFirstResult = props.startMfaFirstResult;
		this._mfaStartResult = this._StartMfaFirstResult;
		this._CodeRegex = /^[0-9]{6}$/;
		this._Tenant = props.tenant;
		this._User = props.user;
		this._Password = props.password;
		this._Hostname = props.hostname;
		this._Port = props.port;
		this._PbxDirectoryName = props.pbxDirectoryName;
    }
	
	componentDidMount() {
		this._setMessage(i18n.t("We_sent_a_6-digit_code~"));
		const mfaUtil = MfaUtil.getStaticInstance();

		//const mfaBlockResendTimelimit = mfaUtil.getBlockResendTimelimit();
		//if( mfaBlockResendTimelimit && !isNaN( mfaBlockResendTimelimit ) ){
		if( mfaUtil.canResendMfaCode() !== true ){
			mfaUtil.stopWatchBlockResend();
			this.setState({isResendCode:true}, () =>{
				mfaUtil.startWatchBlockResend( () => this._onFinishBlockResend() );
			});
		}

		//const mfaBlockVerifyTimelimit = mfaUtil.getBlockVerifyTimelimit();
		//if( mfaBlockVerifyTimelimit && !isNaN( mfaBlockVerifyTimelimit ) ){
		if( mfaUtil.canVerifyMfaCode() !== true ){
			mfaUtil.stopWatchBlockVerify();
			this.setState({isVerify:true}, () =>{
				mfaUtil.startWatchBlockVerify( () => this._onFinishBlockVerify() );
			});
		}

	}
	
	_onFinishBlockResend(){
		this.setState({isResendCode:false});
	}
	
	_onFinishBlockVerify(){
		this.setState({isVerify:false});
	}

    _setMessage( message ){
        const eMfaMessage = this._MfaMessageElementRef.current;
        eMfaMessage.style.display = "";
        eMfaMessage.innerHTML = message;
    }

    _hideMessage(){
        const eMfaMessage = this._MfaMessageElementRef.current;
        eMfaMessage.style.display = "none";
    }

    _verifyCode = (params) => {
		const mfaUtil = MfaUtil.getStaticInstance();
		//const currentBlockVerifyTimelimit = mfaUtil.getBlockVerifyTimelimit();
		//if( currentBlockVerifyTimelimit && !isNaN( currentBlockVerifyTimelimit ) ){
			
		if( mfaUtil.canVerifyMfaCode() !== true ){
			mfaUtil.stopWatchBlockVerify();
			this.setState({isVerify:true}, () =>{
				this._setMessage( i18n.t("Functions are restricted for a certain period~") );
				mfaUtil.startWatchBlockVerify( () => {
					this._onFinishBlockVerify();
					this._hideMessage();
				} );
			});
			return false;
		}
		
		this.setState({isVerify:true}, async () => {
			const pal = this._OperatorConsoleAsParent.getPalRestApi();
			const sessKey = this._mfaStartResult["sess_key"];
			const code = params["mfaCode"];
			if( !this._CodeRegex.test( code ) ){
				this.setState({isVerify:false}, () =>{
					this._setMessage( i18n.t("The_verification_code_is_incorrect~"));
				});
				return;
			}
				
			const mfaCheckMethodName = "mfa/check";
			const mfaCheckMethodParams = {
				tenant : this._Tenant,
				user : this._User,
				//sa : false,
				code : code,
				sess_key : sessKey,
			};
			const mfaCheckOptions = {
				methodName : mfaCheckMethodName,
				methodParams : mfaCheckMethodParams
			};
			mfaUtil.stopWatchBlockVerify();
			mfaUtil.resetBlockVerifyTimelimit();
			mfaUtil.startWatchBlockVerify( () => this._onFinishBlockVerify() );
			
			try{
				const result = await pal.callPalRestApiMethodAsync( mfaCheckOptions );
				const sStatus = result["status"];
				if( sStatus === "OK"){
					//Delete device token.
					//
					const sDeviceTokenKey = "br+dtoken+" + this._Tenant + "+" + this._User;
					const sDeviceToken = window.localStorage.getItem(sDeviceTokenKey);
					if( sDeviceToken ){
						const deviceTokenDeleteMethodName = "device_token/delete";
						const deviceTokenDeleteMethodParams = {
							tenant : this._Tenant,
							user : this._User,
							//sa : false,
						};
						const deviceTokenDeleteOptions = {
							methodName : deviceTokenDeleteMethodName,
							methodParams : deviceTokenDeleteMethodParams
						};
						const result = await pal.callPalRestApiMethodAsync( deviceTokenDeleteOptions );
						const sStatus = result["status"];
						if( sStatus === "OK" || sStatus === "NO_ENTRIES" || sStatus === "NO_ENTRY"){
							window.localStorage.removeItem(sDeviceTokenKey);
							window.localStorage.removeItem("brekeke_operator-console_mfa_expiration_time");
						}
						else{
							OCUtil.logErrorWithNotification("Failed to PAL rest API(device_token/delete)", i18n.t("An_error_occurred_during_processing"));
							return;
						}
					}

					//Create device token
					//
					const deviceTokenCreateMethodName = "device_token/create";
					const userAgent = navigator.userAgent;
					const deviceTokenCreateMethodParams = {
						tenant : this._Tenant,
						user : this._User,
						//sa : false,
						//ip_address,
						user_agent : userAgent,
						//options : null,
					};
					const deviceTokenCreateOptions = {
						methodName : deviceTokenCreateMethodName,
						methodParams : deviceTokenCreateMethodParams
					};
					const result = await pal.callPalRestApiMethodAsync( deviceTokenCreateOptions );
					const sStatus = result["status"];
					if( sStatus === "OK"){
						window.localStorage.setItem("brekeke_operator-console_mfa_expiration_time", result["expiration_time"] );
						window.localStorage.setItem( sDeviceTokenKey, result["token"] );
						this._onMfaOk();
					}
					else{
						OCUtil.logErrorWithNotification("Failed to PAL rest API(device_token/create)", i18n.t("An_error_occurred_during_processing"));
						return;
					}
						
				}
				else{
					this._setMessage( i18n.t("Invalid_verification_code~"));
				}
			}
			catch( error ){
				OCUtil.logErrorWithNotification("Failed to PAL rest API(mfa/check)", i18n.t("An_error_occurred_during_processing"), error );
				return;
			}
		});
    }
	
	_onMfaOk(){
		const loginParams = {tenant:this._Tenant, username:this._User, password:this._Password, hostname:this._Hostname, port:this._Port, pbxDirectoryName:this._PbxDirectoryName };
		const palWrapper = this._OperatorConsoleAsParent.getLoginPalWrapper();
		palWrapper.deinitPalWrapper();
		const this_ = this;
		const initPalWrapperOptions ={
			pbxHost : loginParams.hostname,
			pbxPort : loginParams.port,
			secure_login_password : false,  //!important skip loading md5.js
			onInitFailFunction : function( ev ){
				console.error("Failed to init PalWrapper eventArg=" + ev );
				this_.setState({isSigningin:false});
				this_._setMessage( i18n.t("failedToInitPalWrapper"));
				this_.setState({isVerify:false});
			},
			onInitSuccessFunction : function(){
				this_._onInitPalWrapperSuccess( loginParams );
			},
			pbxDirectoryName : loginParams.pbxDirectoryName
		};
		palWrapper.initPalWrapper( initPalWrapperOptions );

	}
	
				
	
	_onInitPalWrapperSuccess( loginParams ){
        const palWrapper = this._OperatorConsoleAsParent.getLoginPalWrapper();
		const tenant = loginParams.tenant;
		const user = loginParams.username;
        const getPalOptions ={
            tenant : tenant,
            login_user : user,
            login_password : loginParams.password,
            user : "*",
            line: "*",
            callrecording : "self",
            voicemail : "self",
            park : "*",
            status : true,
            registered : "self",
            secure_login_password : false,
            ctype : 2
        };
		
		
		const sDeviceTokenKey = "br+dtoken+" + tenant + "+" + user;
		const sDeviceToken = window.localStorage.getItem(sDeviceTokenKey);
		if( sDeviceToken ){
			getPalOptions["device_token"] = sDeviceToken;
		}

		
		
        const pal = palWrapper.getPal( getPalOptions );
        pal.debugLevel = 2; //!debug    //!dev

        const this_ = this;
        pal.onClose = function(){
            console.log("Pal closed.");
            palWrapper.deinitPalWrapper();
            this_.setState({isVerify:false});
        };
        pal.onError = function( err ){
            console.warn("Pal error occurred." ,  err );
            pal.close();
            this_._setMessage( i18n.t("failedToLogin"));
            this_.setState({isVerify:false});
        };
        //!fixit pal bug
        pal.login(
            function( res, obj ){
                const getExtensionsPropertiesOptions = {
                    tenant: tenant,
                    extension: user,
                    property_names : ["admin","language"]
                };
				
				////No effect
				//const sDeviceTokenKey = "br+dtoken+" + tenant + "+" + user;
				//const sDeviceToken = window.localStorage.getItem(sDeviceTokenKey);
				//if( sDeviceToken ){
				//	getExtensionsPropertiesOptions["device_token"] = sDeviceToken;
				//}

                pal.getExtensionProperties( getExtensionsPropertiesOptions,
                    function( res, obj ) {
                        const isAdmin = res[0].toLowerCase() === "true";
                        const language = res[1];
                        this_.setState({isVerify: false});
                        window.localStorage.setItem('lastLoginLanguage', language);
                        const phoneIndex = loginParams.phoneIndex;
                        this_._OperatorConsoleAsParent.onLoggedinByLogin(
                            pal, palWrapper.getPbxHost(), palWrapper.getPbxPort(), tenant, user, loginParams.password, isAdmin, language, phoneIndex, () =>{
                                if( Number.isInteger( phoneIndex ) || phoneIndex === null ){
                                    window.localStorage.setItem("lastPhoneIndex", phoneIndex );
                                }
                            } );
                    },
                    function( error ) {
                        console.warn("Faild to getExtensionProperties. error=",error);
                        pal.close();
                        this_._setMessage( i18n.t("failedToLogin"));
						this_.setState({isVerify:false});
                    }
                );
            },
            function(ev){
                console.warn("Faild to login. eventArg=",ev);
                pal.close();
                this_._setMessage( i18n.t("failedToLogin"));
				this_.setState({isVerify:false});
            }
        );
    }

	
	async _resendCode(){
		const mfaUtil = MfaUtil.getStaticInstance();
		//const currentBlockResendTimelimit = mfaUtil.getBlockResendTimelimit();
		//if( currentBlockResendTimelimit && !isNaN( currentBlockResendTimelimit ) ){
		if( mfaUtil.canResendMfaCode() !== true ){
			mfaUtil.stopWatchBlockResend();
			this.setState({isResendCode:true}, () =>{
				this._setMessage( i18n.t("Functions are restricted for a certain period~") );
				mfaUtil.startWatchBlockResend( () => {
					this._onFinishBlockResend();
					this._hideMessage();
				} );
			});
			return false;
		}
		
		this.setState({isResendCode:true}, async () => {
			const pal = this._OperatorConsoleAsParent.getPalRestApi();
			const sessKey = this._mfaStartResult["sess_key"];
			const mfaDeleteMethodName = "mfa/delete";
			const mfaDeleteMethodParams = {
				tenant : this._Tenant,
				user : this._User,
				//sa : false,
				sess_key : sessKey,
			};
			const mfaDeleteOptions = {
				methodName : mfaDeleteMethodName,
				methodParams : mfaDeleteMethodParams
			};
			try{
				const result = await pal.callPalRestApiMethodAsync( mfaDeleteOptions );
				const sStatus = result["status"];
				if( sStatus === "OK" || sStatus === "NO_SESSION"){
					const mfaStartMethodName = "mfa/start";
					const mfaStartMethodParams = {
						tenant : this._Tenant,
						user : this._User,
						//sa : false,
						//ip_address : ,
						//email : ,
						//url : ,
						//options : ,
					};
					const mfaStartOptions = {
						methodName : mfaStartMethodName,
						methodParams : mfaStartMethodParams
					};
					try{
						const result = await pal.callPalRestApiMethodAsync( mfaStartOptions );
						const sStatus = result["status"];
						if( sStatus === "OK" ){
							const sType = result["type"];
							if( sType === "code" ){
								this._mfaStartResult = result;
								//const expiry_time = result["expiry_time"];
								this._setMessage(i18n.t("We_sent_a_6-digit_code~"));
								mfaUtil.stopWatchBlockResend();
								mfaUtil.resetBlockResendTimelimit();
								mfaUtil.startWatchBlockResend( () => this._onFinishBlockResend() );
								return;
							}
							else if( sType === "none" ){
								this._onMfaOk();
								return;
							}
							//!forBug //!testit //!check result["type"] === "url"
						}
						
						
						else{
							this.setState({isResendCode:false}, () =>{
								OCUtil.logErrorWithNotification("Failed to PAL rest API(mfa/start)", i18n.t("An_error_occurred_during_processing"));
							});
							return;
						}
					}
					catch(err){
						this.setState({isResendCode:false}, () =>{
							OCUtil.logErrorWithNotification("Failed to PAL rest API(mfa/start)", i18n.t("An_error_occurred_during_processing"), err );
						});
						return;
					}
					
				}
				else{
					this.setState({isResendCode:false}, () =>{
						OCUtil.logErrorWithNotification("Failed to PAL rest API(mfa/delete)", i18n.t("An_error_occurred_during_processing"));
					});
					return;
				}
			}
			catch( error ){
				this.setState({isResendCode:false}, () =>{
					OCUtil.logErrorWithNotification("Failed to PAL rest API(mfa/delete)", i18n.t("An_error_occurred_during_processing"), error );
				});	
				return;
			}				
		});
		return true;
	}
	
	_onChangeInputMfaCode( e ){
		this.setState({ inputMfaCode : e.target.value });
	}
	
    render(){
        return (
            <div>
                <div className="brOCMfaHeaderLogo">
                    <div className="brOCMfaHeaderLogoImage"></div>
                    <div className="brOCMfaHeaderLogoProduct">Operator Console</div>
                </div>
                <div className={"brOCMfaBody"}>
                    <div className="brOCMfaTitle">{i18n.t("2-Step_Verification")}</div>
                    <div ref={this._MfaMessageElementRef} className="brOCMfaMessageDiv" style={{display: "none"}}>
                    </div>
                    <Form
                        name="mfa"
                        // initialValues={this.props.initialValues}
                        onFinish={ (params) => {
                            this._verifyCode( params );
                        }}
                    >
                        <Form.Item
                            name="mfaCode"
                            rules={[
                                {
                                    required: true,
                                    message: i18n.t("Verification_Code_is_required"),
                                },
                            ]}
                        >
                            <Input className="ant-input-forBrOCMfa" value={this.state.inputMfaCode} onChange={ (e) => this._onChangeInputMfaCode(e) } placeholder={i18n.t("Verification_Code")} maxLength={6} autoComplete="off" />
                        </Form.Item>
                        <Form.Item>
                            <Button type="success" htmlType="submit" className="brOCMfaVerifyButton"
                                    disabled={this.state.isVerify}>
                                {i18n.t("Verify")}
                            </Button>
                        </Form.Item>
                        <Form.Item>
                            <Button type="secondary" onClick={ () => this._resendCode() } className="brOCMfaSecondaryButton"
                                    disabled={this.state.isResendCode}>
                                {i18n.t("Resend_code")}
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
                <div
                    style={{textAlign: "right"}}>{i18n.t("Version")} {BrekekeOperatorConsole.BREKEKE_OPERATOR_CONSOLE_VERSION}</div>
            </div>
        )
    }
}