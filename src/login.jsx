import React, {createRef} from "react";
import Form from "antd/lib/form";
import i18n from "./i18n";
import Input from "antd/lib/input";
import Button from "antd/lib/button";
import "./login.scss"
import WebphonePhoneClient from "./WebphonePhoneClient";
import BrekekeOperatorConsole from "./index";
import Select from "antd/lib/select";
import MfaUtil from "./MfaUtil";

export default class Login extends React.Component {
    constructor( props ) {
        super( props );
        this._OperatorConsoleAsParent = props.operatorConsoleAsParent;
        this.state = { isSigningin : false, isBlockResendMfa : false, isBlockVerifyMfa : false };
        //this._pal = null;
        this._LoginMessageElementRef = createRef();

        const sLastPhoneIndex = localStorage.getItem("lastPhoneIndex");
        let lastPhoneIndex;
        if( sLastPhoneIndex !== undefined && sLastPhoneIndex !== null ) {
            const iLastPhoneIndex = Number(sLastPhoneIndex);
            if( isNaN( iLastPhoneIndex ) ) {
                lastPhoneIndex = null;
            }
            else{
                lastPhoneIndex = iLastPhoneIndex;
            }
        }
        else{
            lastPhoneIndex = null;
        }
        this._phoneIndex = lastPhoneIndex;

    }
	
	componentDidMount() {
		const mfaUtil = MfaUtil.getStaticInstance();
		//const mfaBlockResendTimelimit = mfaUtil.getBlockResendTimelimit();
		//const bBlockResendMfa = mfaBlockResendTimelimit && !isNaN( mfaBlockResendTimelimit );		
		//if( bBlockResendMfa ){
		if( mfaUtil.canResendMfaCode() !== true ){
			this._setMessage(i18n.t("Functions are restricted for a certain period~"));
			mfaUtil.stopWatchBlockResend();
			this.setState({isBlockResendMfa:true}, () =>{
				mfaUtil.startWatchBlockResend( () => this._onFinishBlockResend() );
			});
		}
		//const mfaBlockVerifyTimelimit = mfaUtil.getBlockVerifyTimelimit();
		//if( mfaBlockVerifyTimelimit && !isNaN( mfaBlockVerifyTimelimit ) ){
		if( mfaUtil.canVerifyMfaCode() !== true ){
			this._setMessage(i18n.t("Functions are restricted for a certain period~"));
			mfaUtil.stopWatchBlockVerify();
			this.setState({isBlockVerifyMfa:true}, () =>{
				mfaUtil.startWatchBlockVerify( () => this._onFinishBlockVerify() );
			});
		}
	}

	_onFinishBlockResend(){
		this.setState({isBlockResendMfa:false}, () => {
			if( this.state.isBlockResendMfa === false && this.state.isBlockVerifyMfa === false ){ //!modify flags
				//this._setMessage("");
				this._hideMessage();
			}
		});
	}
	
	_onFinishBlockVerify(){
		this.setState({isBlockVerifyMfa:false}, () => {
			if( this.state.isBlockResendMfa === false && this.state.isBlockVerifyMfa === false ){ //!modify flags
				//this._setMessage("");
				this._hideMessage();
			}
		});
	}

    _setMessage( message ){
        const eLoginMessage = this._LoginMessageElementRef.current;
        eLoginMessage.style.display = "";
        eLoginMessage.innerHTML = message;
    }

    _hideMessage(){
        const eLoginMessage = this._LoginMessageElementRef.current;
        eLoginMessage.style.display = "none";
    }


    // componentWillUnmount(){
    //     // if( this._pal ){
    //     //     this._pal.close();
    //     //     this._pal = null;
    //     // }
    //
    //     //this._OperatorConsoleAsParent.getLoginPalWrapper().deinitPalWrapper();
    // }

    _onInitPalWrapperSuccess( loginParams ){
        const palWrapper = this._OperatorConsoleAsParent.getLoginPalWrapper();
        const getPalOptions ={
            tenant : loginParams.tenant,
            login_user : loginParams.username,
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
		
		const tenant = loginParams.tenant;
		const user = loginParams.username;
		
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
            this_.setState({isSigningin:false});
        };
        pal.onError = function( err ){
            console.warn("Pal error occurred." ,  err );
            pal.close();
            this_._setMessage( i18n.t("failedToLogin"));
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
                        this_.setState({isSigningin: false});
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
                    }
                );
            },
            function(ev){
                console.warn("Faild to login. eventArg=",ev);
                pal.close();
                this_._setMessage( i18n.t("failedToLogin"));
            }
        );
    }

    _onSelectPhoneIndex( o ){
        this._phoneIndex = o;
    }

    _login = (params) => {
		
		const mfaUtil = MfaUtil.getStaticInstance();
		//const mfaBlockResendTimelimit = mfaUtil.getBlockResendTimelimit();
		//const bBlockResendMfa = mfaBlockResendTimelimit && !isNaN( mfaBlockResendTimelimit );
		//if( bBlockResendMfa ){
		const bCanResendMfaCode = mfaUtil.canResendMfaCode();
		if( bCanResendMfaCode !== true ){
			this._setMessage(i18n.t("Functions are restricted for a certain period~"));
			mfaUtil.stopWatchBlockResend();
			this.setState({isBlockResendMfa:true}, () =>{
				mfaUtil.startWatchBlockResend( () => this._onFinishBlockResend() );
			});
		}

		//const mfaBlockVerifyTimelimit = mfaUtil.getBlockVerifyTimelimit();
		//const bBlockVerifyMfa = mfaBlockVerifyTimelimit && !isNaN( mfaBlockVerifyTimelimit );
		//if( bBlockVerifyMfa ){
		const bCanVerifyMfaCode = mfaUtil.canVerifyMfaCode();
		if( bCanVerifyMfaCode !== true ){
			this._setMessage(i18n.t("Functions are restricted for a certain period~"));
			mfaUtil.stopWatchBlockVerify();
			this.setState({isBlockVerifyMfa:true}, () =>{
				mfaUtil.startWatchBlockVerify( () => this._onFinishBlockVerify() );
			});
		}
		
		if( !bCanResendMfaCode || !bCanVerifyMfaCode ){
			return false;
		}
		
        console.log('login:', params);
        // this._deinitAphone();
        this.setState({ isSigningin : true }, () =>{

            const lastLoginAccount = {
                hostname: params.hostname,
                port: params.port,
                tenant: params.tenant,
                username: params.username,
                password: params.password,
                pbxDirectoryName : params.pbxDirectoryName
            };
            this._OperatorConsoleAsParent.setLastLoginAccount( lastLoginAccount );
            window.localStorage.setItem('lastLoginAccount', JSON.stringify( lastLoginAccount));

            const onInitPalRestApiSuccessFunction = ( result ) =>{
				if( result && result["startMfa"] === true ){
					return;
				}
				
                const palWrapper = this._OperatorConsoleAsParent.getLoginPalWrapper();
                palWrapper.deinitPalWrapper();
                const this_ = this;
                const initPalWrapperOptions ={
                    pbxHost : params.hostname,
                    pbxPort : params.port,
                    secure_login_password : false,  //!important skip loading md5.js
                    onInitFailFunction : function( ev ){
                        console.error("Failed to init PalWrapper eventArg=" + ev );
                        this_.setState({isSigningin:false});
                        this_._setMessage( i18n.t("failedToInitPalWrapper"));
                    },
                    onInitSuccessFunction : function(){
                        this_._onInitPalWrapperSuccess( params );
                    },
                    pbxDirectoryName : params.pbxDirectoryName
                };
                palWrapper.initPalWrapper( initPalWrapperOptions );
                //this_._OperatorConsoleAsParent.onInitPalRestApiSuccessByLogin(this_);
            }
            const onInitPalRestApiFailFunction = ( err ) =>{
                console.error("Failed to init pal rest api. err=",err);
                this.setState({isSigningin:false});
                this._setMessage( i18n.t("Failed_to_init_pal_rest_api"));
            }

            //PAL rest api
            const initPalRestApiOptions = {
                //hostname: params.hostname,
                //port: params.port,
                tenant: params.tenant,
                username: params.username,
                password: params.password,
                port:params.port,
                hostname:params.hostname,
                pbxDirectoryName:params.pbxDirectoryName,
                onInitSuccessFunction: onInitPalRestApiSuccessFunction,
                onInitFailFunction: onInitPalRestApiFailFunction,
            }
            this._OperatorConsoleAsParent.getPalRestApi().initPalRestApi( initPalRestApiOptions );


            // params["operatorConsoleAsParent"] = this;
            // const webphonePhoneClient = new WebphonePhoneClient(params);
            // const phoneClientInitOptions = {} ;
            // this._initAphone( webphonePhoneClient, phoneClientInitOptions );



        });

		return true;

    } //~login
	
    render(){
        return (
            <div>
                <div className="brOCLoginHeaderLogo">
                    <div className="brOCLoginHeaderLogoImage"></div>
                    <div className="brOCLoginHeaderLogoProduct">Operator Console</div>
                </div>
                <div className={"brOCLoginBody"}>
                    <div className="brOCLoginTitle">{i18n.t("signin")}</div>
                    <div ref={this._LoginMessageElementRef} className="brOCLoginMessageDiv" style={{display: "none"}}>
                    </div>
                    <Form
                        name="login"
                        initialValues={this.props.initialValues}
                        onFinish={ (params) => {
                            params["phoneIndex"] = this._phoneIndex;
                            this._login( params );
                        }}
                    >
                        <Form.Item
                            name="hostname"
                            rules={[
                                {
                                    required: true,
                                    message: i18n.t("hostname_is_required"),
                                },
                            ]}
                        >
                            <Input className="ant-input-forBrOCLogin" placeholder={i18n.t("hostname")}/>
                        </Form.Item>
                        <Form.Item
                            name="port"
                            rules={[
                                {
                                    required: true,
                                    message: i18n.t("port_is_required"),
                                },
                            ]}
                        >
                            <Input className="ant-input-forBrOCLogin" placeholder={i18n.t("port")}/>
                        </Form.Item>
                        <Form.Item
                            name="tenant"
                            rules={[
                                {
                                    required: true,
                                    message: i18n.t("tenant_is_required"),
                                },
                            ]}
                        >
                            <Input className="ant-input-forBrOCLogin" placeholder={i18n.t("tenant")}/>
                        </Form.Item>
                        <Form.Item
                            name="username"
                            rules={[
                                {
                                    required: true,
                                    message: i18n.t("username_is_required"),
                                },
                            ]}
                        >
                            <Input className="ant-input-forBrOCLogin" placeholder={i18n.t("username")}/>
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: i18n.t("password_is_required"),
                                },
                            ]}
                        >
                            <Input className="ant-input-forBrOCLogin" type="password" placeholder={i18n.t("password")}/>
                        </Form.Item>
                        <Form.Item
                            name="pbxDirectoryName"
                            rules={[
                                {
                                    required: true,
                                    message: i18n.t("username_is_required"),
                                },
                            ]}
                            style={{display: "none"}}
                        >
                            <Input className="ant-input-forBrOCLogin" placeholder={i18n.t("username")} type="hidden"/>
                        </Form.Item>
                        <Form.Item
                            name="phoneIndex"
                            rules={[
                                {
                                    required: false,
                                },
                            ]}
                            >
                            <Select
                                // onChange={(value) => {
                                // }}
                                placeholder={i18n.t("phoneIndex")}
                                value={this._phoneIndex}
                                defaultValue={this._phoneIndex}
                                onSelect={(i) => this._onSelectPhoneIndex(i)}
                                className="ant-input-forBrOCLogin"
                                //dropdownStyle={{ backgroundColor: 'green' }}  //Does not work
                            >
                                <Select.Option
                                    value={null}>
                                    <span>{i18n.t("phoneIndex")}:({i18n.t("User_settings")})</span>
                                </Select.Option>
                                <Select.Option
                                    value={-1}>
                                    <span>{i18n.t("phoneIndex")}:({i18n.t("Not_specified")})</span>
                                </Select.Option>
                                {[...Array(4)].map((_, index) => {
                                    const phoneIndex = index + 1;
                                    return <Select.Option
                                        value={phoneIndex}>
                                        <span>{i18n.t("phoneIndex")}:{phoneIndex}</span>
                                    </Select.Option>
                                })}
                            </Select>
                        </Form.Item>
                        <Form.Item>
                            <Button type="success" htmlType="submit" className="brOCLoginButton"
                                    disabled={this.state.isSigningin || this.state.isBlockResendMfa || this.state.isBlockVerifyMfa }>
                                {i18n.t("signin")}
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