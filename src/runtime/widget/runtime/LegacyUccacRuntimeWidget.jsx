import React, {createRef} from 'react';
import RuntimeWidget from "./RuntimeWidget";
import LegacyButtonRuntimeSubWidgetFactory from "./legacyButtonRuntimeSubWidget/LegacyButtonRuntimeSubWidgetFactory";
import i18n from "../../../i18n";
import BrekekeOperatorConsole from "../../../index";
import Util from "../../../Util";

export default class LegacyUccacRuntimeWidget extends RuntimeWidget{

    constructor( props ) {
        super( props );
        const oc = BrekekeOperatorConsole.getStaticInstance();
        this._UccacWrapper = oc.getUccacWrapper();

        this.state = {isRestartButtonDisabled:false};
        this._uccacAc = null;

        this._uccacRootElementRef = createRef();
        const this_ = this;
        this._onUccacInitSuccessFunction = function (uccacWrapperAsCaller) {
            this_._onInitUccacWrapperSuccessByUccacWrapper(uccacWrapperAsCaller);
        };
        this._UccacWrapper.addOnUccacInitSuccessFunction(this._onUccacInitSuccessFunction);

        this._onUccacDeinitFunction = function (uccacWrapperAsCaller) {
            this_._onDeinitUccacWrapperByUccacWrapper(uccacWrapperAsCaller);
        };
        this._UccacWrapper.addOnUccacDeinitFunction(this._onUccacDeinitFunction);

    }

    _refreshUccacAc(){
        if( this._UccacWrapper.isInitialized() === true ){
            this._initUccacAc();
        }
        else{
            this._destroyUccacAc();
        }
    }

    componentDidMount(){
        super.componentDidMount();
        this._refreshUccacAc();
    }

    componentWillUnmount() {
        this._destroyUccacAc();
        this._UccacWrapper.removeOnUccacInitSuccessFunction( this._onUccacInitSuccessFunction );
        this._UccacWrapper.removeOnUccacDeinitFunction( this._onUccacDeinitFunction );
        super.componentWillUnmount();
    }

    _onInitUccacWrapperSuccessByUccacWrapper(  uccacWrapperAsCaller  ){
        this._initUccacAc();
    }

    _onDeinitUccacWrapperByUccacWrapper(uccacWrapperAsCaller  ){
        this._destroyUccacAc();
    }

    _destroyUccacAc(){
        if( !this._uccacAc ) {
            return false;
        }
        this._uccacAc.destroy();
        this._uccacAc = null;
        return true;
    }

    _initUccacAc(){

        if( this._uccacAc ){
            this._uccacAc.destroy();
            this._uccacAc = null;
        }

        const eUccacRoot = this._uccacRootElementRef.current;
        const eWebchatqueue = eUccacRoot.querySelector('span[name="webchatqueue"]');
        const eWebchatpickup = eUccacRoot.querySelector('span[name="webchatpickup"]');
        const eSearch  = eUccacRoot.querySelector('span[name="search"]');
        const eUcclientPanelRoot  = eUccacRoot.querySelector('div[name="ucclientPanelRoot"]');

        this._uccacAc = this._UccacWrapper.addUccacAc();
        const initUccacAcOptions ={
            acIconParentsWebchatqueue : eWebchatqueue,
            acIconParentsWebchatpickup : eWebchatpickup,
            acIconParentsSearch : eSearch
        };
        this._uccacAc.init( initUccacAcOptions  );

        const oc = BrekekeOperatorConsole.getStaticInstance();
        const startUCClientOptions = {
            ucclientWidgetParent : eUcclientPanelRoot,
            ucclientUcurl: this._UccacWrapper.getUcurl(),
            ucclientTenant: oc.getLoginTenantname(),
            ucclientUser:oc.getLoginUsername(),
            ucclientPass:oc.getLoginPassword()
        }
        this.setState({isRestartButtonDisabled:true}, ()=> {
            this._uccacAc.startUCClient(startUCClientOptions);
            setTimeout( ()=>{ this.setState({isRestartButtonDisabled:false})},8000);
        });
    }

    _onClickRestart(){

        const bConfirm = confirm( i18n.t("confirmRestartUccac") );
        if( !bConfirm ){
            return;
        }

        this.setState({isRestartButtonDisabled:true}, ()=>
        {
            this._uccacAc.stopUCClient();
            const eUccacRoot = this._uccacRootElementRef.current;
            const eUcclientPanelRoot = eUccacRoot.querySelector('div[name="ucclientPanelRoot"]');
            const oc = BrekekeOperatorConsole.getStaticInstance();
            const startUCClientOptions = {
                ucclientWidgetParent: eUcclientPanelRoot,
                ucclientUcurl: this._UccacWrapper.getUcurl(),
                ucclientTenant: oc.getLoginTenantname(),
                ucclientUser: oc.getLoginUsername(),
                ucclientPass: oc.getLoginPassword()
            }
            this._uccacAc.startUCClient(startUCClientOptions);
            setTimeout( ()=>{ this.setState({isRestartButtonDisabled:false})},8000);
        });
    }


    //!overload
    _getRenderMainJsx() {
        const widgetData = this.getWidgetData();

        const uccacwidgetFgColor = Util.getRgbaCSSStringFromAntdColor( widgetData.getUccacwidgetFgColor(), "");
        const uccacwidgetBgColor = Util.getRgbaCSSStringFromAntdColor( widgetData.getUccacwidgetBgColor(), "rgba(255,255,255,255)");

        const borderRadius = ( widgetData.getBorderRadius() || widgetData.getBorderRadius() === 0 ) ? widgetData.getBorderRadius() : "";

        const outsideShadow_horizontalOffset = ( widgetData.getOutsideShadow_horizontalOffset() || widgetData.getOutsideShadow_horizontalOffset() === 0 )  ? widgetData.getOutsideShadow_horizontalOffset() : "";
        const outsideShadow_verticalOffset = ( widgetData.getOutsideShadow_verticalOffset() || widgetData.getOutsideShadow_verticalOffset() === 0 )  ? widgetData.getOutsideShadow_verticalOffset() : "";
        const outsideShadow_blur = ( widgetData.getOutsideShadow_blur() || widgetData.getOutsideShadow_blur() === 0 ) ? widgetData.getOutsideShadow_blur() : "";
        const outsideShadow_spread = ( widgetData.getOutsideShadow_spread() || widgetData.getOutsideShadow_spread() === 0 ) ? widgetData.getOutsideShadow_spread() : "";
        const outsideShadowColorRgb = Util.getRgbaCSSStringFromAntdColor( widgetData.getOutsideShadow_color(), "rgba(0,0,0,0)"); // "rgba(0,0,0,0.2)"  //!default

        const insideShadow_horizontalOffset = ( widgetData.getInsideShadow_horizontalOffset() || widgetData.getInsideShadow_horizontalOffset() === 0 )  ? widgetData.getInsideShadow_horizontalOffset() : "";
        const insideShadow_verticalOffset = ( widgetData.getInsideShadow_verticalOffset() || widgetData.getInsideShadow_verticalOffset() === 0 )  ? widgetData.getInsideShadow_verticalOffset() : "";
        const insideShadow_blur = ( widgetData.getInsideShadow_blur() || widgetData.getInsideShadow_blur() === 0 ) ? widgetData.getInsideShadow_blur() : "";
        const insideShadow_spread = ( widgetData.getInsideShadow_spread() || widgetData.getInsideShadow_spread() === 0 ) ? widgetData.getInsideShadow_spread() : "";
        const insideShadowColorRgb = Util.getRgbaCSSStringFromAntdColor( widgetData.getInsideShadow_color(), "rgba(0,0,0,0)"); // "rgba(48,71,1,1)"  //!default


        const sBoxshadowOutside = outsideShadowColorRgb && outsideShadow_horizontalOffset && outsideShadow_verticalOffset && outsideShadow_blur && outsideShadow_spread ? outsideShadowColorRgb + " " + outsideShadow_horizontalOffset + "px " + outsideShadow_verticalOffset + "px " + outsideShadow_blur + "px " + outsideShadow_spread + "px" : "";
        const sBoxshadowInside = insideShadowColorRgb && insideShadow_horizontalOffset && insideShadow_verticalOffset && insideShadow_blur && insideShadow_spread ? "inset " + insideShadowColorRgb + " " + insideShadow_horizontalOffset + "px " + insideShadow_verticalOffset + "px " + insideShadow_blur + "px " + insideShadow_spread + "px" : "";
        const sBoxShadow = sBoxshadowOutside + (sBoxshadowOutside && sBoxshadowInside ? "," : "") + sBoxshadowInside;

        if( !this._UccacWrapper.isInitialized() ){
            return (<div style={{
                display:"flex",
                flexWrap:"wrap",
                height:"100%",
                borderRadius: borderRadius,
                backgroundColor: uccacwidgetBgColor,
                boxShadow: sBoxShadow,
                color: uccacwidgetFgColor,
                padding:6
            }}>{i18n.t("ucChatAgentComponentIsDisabled")}</div> );
        }
        else {
            return (
                <div style={{
                    height: "100%",
                    borderRadius: borderRadius,
                    backgroundColor: uccacwidgetBgColor,
                    boxShadow: sBoxShadow,
                    color: uccacwidgetFgColor
                }}>
                    <div ref={this._uccacRootElementRef} style={{ display: "flex",  flexWrap: "wrap",  height:"calc(100% - 30px)"}}>
                        <div style={{position: "relative", width: "50%", height: "100%"}}>
                            <span name={"webchatqueue"}></span>
                            <span name={"webchatpickup"}></span>
                            <span name={"search"}></span>
                        </div>
                        <div name={"ucclientPanelRoot"}
                             style={{position: "relative", width: "50%", height: "100%"}}>
                        </div>
                    </div>
                    <div style={{height:30,padding:4}}>
                        <button disabled={this.state.isRestartButtonDisabled} onClick={this._onClickRestart.bind(this)}>{i18n.t("restart")}</button>
                    </div>
                </div>
                // <div className="brOCCallPanel" style={{
                //     borderRadius: borderRadius,
                //     backgroundColor: uccacWidgetBgColor,
                //     boxShadow: sBoxShadow,
                //     color: uccacWidgetFgColor
                // }}>
                //     <div className="brOCCallPanelRow">
                //         <div className="brOCCallPanelLeft">
                //             {!!call && (call.incoming ? IconPhoneIncoming : IconPhoneOutgoing)}
                //         </div>
                //         <div className="brOCCallPanelMain">
                //             <div className="brOCCallPanelPartyNumber">{call?.partyNumber}</div>
                //             <div className="brOCCallPanelDuration">{this.state.duration}</div>
                //         </div>
                //     </div>
                //     <div className="brOCCallPanelRow">
                //         {!!this.props.dialing && (
                //             <div className="brOCCallPanelLeft">{IconKeyboard}</div>
                //         )}
                //         <div className="brOCCallPanelMain">
                //             <div className="brOCCallPanelDialing">{this.props.dialing}</div>
                //         </div>
                //     </div>
                // </div>
            )
        }
    }


}