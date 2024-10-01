import React, {createRef} from "react";
import Form from "antd/lib/form";
import i18n from "./i18n";
import Input from "antd/lib/input";
import Button from "antd/lib/button";
import "./login.scss"
import WebphonePhoneClient from "./WebphonePhoneClient";

export default class Login extends React.Component {
    constructor( props ) {
        super( props );
        this._OperatorConsoleAsParent = props.operatorConsoleAsParent;
        this.state = { isSigningin : false };
        //this._pal = null;
        this._LoginMessageElementRef = createRef();

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
        const pal = palWrapper.getPal( getPalOptions );
        pal.debugLevel = 2;

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
                const tenant = loginParams.tenant;
                const user = loginParams.username;
                const getExtensionsPropertiesOptions = {
                    tenant: tenant,
                    extension: user,
                    property_names : ["admin","language"]
                };
                pal.getExtensionProperties( getExtensionsPropertiesOptions,
                    function( res, obj ) {
                        const isAdmin = res[0].toLowerCase() === "true";
                        const language = res[1];
                        this_.setState({isSigningin: false});
                        this_._OperatorConsoleAsParent.onLoggedinByLogin(
                            pal, palWrapper.getPbxHost(), palWrapper.getPbxPort(), tenant, user, loginParams.password, isAdmin, language
                        );
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

    _login = (params) => {
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

            const onInitPalRestApiSuccessFunction = () =>{
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
            }
            const onInitPalRestApiFailFunction = ( err ) =>{
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



    } //~login

    render(){
        return (
            <div>
                <div className="brOCLoginHeaderLogo">
                    <div className="brOCLoginHeaderLogoImage"></div>
                    <div className="brOCLoginHeaderLogoProduct">Operator Console</div>
                </div>
                <div className={"brOCLoginBody"}>
                    <div className="brOCLoginTitle">Sign In</div>
                    <div ref={this._LoginMessageElementRef} className="brOCLoginMessageDiv" style={{display:"none"}}>
                    </div>
                    <Form
                        name="login"
                        initialValues={ this.props.initialValues}
                        onFinish={  this._login }
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
                            <Input className="ant-input-forBrOCLogin" placeholder={i18n.t("hostname")} />
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
                            <Input className="ant-input-forBrOCLogin" placeholder={i18n.t("port")} />
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
                            <Input className="ant-input-forBrOCLogin" placeholder={i18n.t("tenant")} />
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
                            <Input className="ant-input-forBrOCLogin" placeholder={i18n.t("username")} />
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
                            <Input className="ant-input-forBrOCLogin" type="password" placeholder={i18n.t("password")} />
                        </Form.Item>
                        <Form.Item
                            name="pbxDirectoryName"
                            rules={[
                                {
                                    required: true,
                                    message: i18n.t("username_is_required"),
                                },
                            ]}
                            style={{display:"none"}}
                        >
                            <Input className="ant-input-forBrOCLogin" placeholder={i18n.t("username")}  type="hidden"  />
                        </Form.Item>
                        <Form.Item>
                            <Button type="success" htmlType="submit" className="brOCLoginButton" disabled={this.state.isSigningin}>
                                {i18n.t("signin")}
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        )
    }
}