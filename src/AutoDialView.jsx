import React from "react";
import DropDownMenu from "./DropDownMenu";
import i18n from "./i18n";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import Button from "antd/lib/button";
import Popconfirm from "antd/lib/popconfirm";
import Notification from "antd/lib/notification";
import "./reset.css"
import "./AutoDialView.css"
import OCUtil from "./OCUtil"
export default class AutoDialView extends React.Component {

    constructor( props ){
        super(props);
        this._operatorConsoleAsParent = props.operatorConsoleAsParent;
        this.state = {
            //sortedCallNos : props.sortedCallNos
        };

    }

    //!commentout Did not work
    // componentDidMount() {
    //     //!ref https://blog-and-destroy.com/24218
    //     function tabSwitch(){
    //         document.getElementsByClassName('is-active')[0].classList.remove('is-active');
    //         this.classList.add('is-active');
    //
    //         document.getElementsByClassName('is-show')[0].classList.remove('is-show');
    //         const arrayTabs = Array.prototype.slice.call(tabs);
    //         const index = arrayTabs.indexOf(this);
    //         document.getElementsByClassName('panel')[index].classList.add('is-show');
    //     }
    //
    //
    //     const tabs = document.getElementsByClassName('tab');
    //     for(let i = 0; i < tabs.length; i++) {
    //         tabs[i].addEventListener('click', tabSwitch, false);
    //     }
    // }



    getSortedCallNos(){
        return this.state.sortedCallNos;
    }

    _clearCallNoHistory( this_){
        this_._operatorConsoleAsParent.getCallHistory().clearAndSave();
        this_._operatorConsoleAsParent.setState({rerender:true},
            () => {
                Notification.success({ key: 'sync', message: i18n.t("saved_data_to_pbx_successfully") });
            }
        );  //!bad for rerender

    }

    tabSwitch(e){
        document.getElementsByClassName('is-active')[0].classList.remove('is-active');
        const tgt = e.target;
        tgt.classList.add('is-active');

        document.getElementsByClassName('is-show')[0].classList.remove('is-show');
        const tabs = document.getElementsByClassName('tab');
        const arrayTabs = Array.prototype.slice.call(tabs);
        const index = arrayTabs.indexOf(tgt);
        document.getElementsByClassName('panel')[index].classList.add('is-show');
    }

    _onClickClose(){
        this._operatorConsoleAsParent.abortAutoDialView();
    }

    render() {
        if (!this.props.isVisible) {
            return (null);
        }

        return (<>
            <div className="brOCReset autoDialView">
                <table className={"defaultBorderWithRadius outsidePaddingWithoutBorderRadius"}>
                    <tbody><tr><td>
                        <table className="defaultTranparentTable defaultSpaceBottom" style={{width:"100%"}}><tbody><tr>
                            <td>
                                <Popconfirm title={i18n.t("are_you_sure")} onConfirm={ () => this._clearCallNoHistory(this) }
                                            okText={i18n.t("yes")}
                                            cancelText={i18n.t("no")}
                                >
                                    <Button type="secondary">Clear recent</Button>
                                </Popconfirm>
                            </td>
                            <td style={{textAlign:"right",verticalAlign:"top"}} onClick={this._onClickClose.bind(this)} className="linkDeco" >[X]</td>
                        </tr></tbody></table>
                    </td></tr>
                    <tr><td>
                    <table className="defaultItemMarginTop"><tbody>
                        <tr style={{border:0}} ><td>
                            <div className="tab-panel">
                                <ul className="tab-group">
                                    <li className="tab tab-A is-active" onClick={this.tabSwitch}>Recent</li>
                                    <li className="tab tab-B" onClick={this.tabSwitch}>Extension</li>
                                    <li className="tab tab-C" onClick={this.tabSwitch}>Phonebook</li>
                                </ul>

                                <div className="panel-group defaultBorderRadiusBottom">
                                    <div className="panel tab-A is-show">
                                        <table style={{width:"100%",height:"100%",border:"0"}} className={"defaultContentTable"}>
                                            <thead>
                                            <tr className="defaultItemPaddingForTr">
                                                <th style={{width:"1%"}}>Call No</th>
                                                <th style={{width:20}}>Status</th>
                                                <th></th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            { this.props.sortedCallNos.map( ( callNo, i ) =>{
                                                const isExtension = OCUtil.indexOfArrayFromExtensions( this._operatorConsoleAsParent.state.extensions, callNo ) !== -1;
                                                const extensionsStatus = this._operatorConsoleAsParent.state.extensionsStatus;
                                                const statusClassName = isExtension ? OCUtil.getExtensionStatusClassName( callNo, extensionsStatus ) : "";
                                                return (
                                                    <tr key={i} >
                                                        <td style={{width:"1%"}}>{callNo}</td>
                                                        <td><div className={statusClassName}></div></td>
                                                        <td>
                                                            <button title={i18n.t(`legacy_button_description.LegacyMakeCallButton`)} className="kbc-button kbc-button-fill-parent legacyButtonPadding"
                                                                    onClick={ () => {
                                                                        this.props.operatorConsoleAsParent.abortAutoDialView();
                                                                        //this.props.operatorConsoleAsParent.setDialingAndMakeCall2( callNo, this.props.currentCallIndex, this.props.callIds, this.props.callById );
                                                                        this.props.operatorConsoleAsParent.setDialingAndMakeCall2( callNo  );
                                                                    }
                                                                    }>
                                                                { <FontAwesomeIcon size="lg" icon="fas fa-phone"/> }
                                                            </button>
                                                        </td>
                                                    </tr>
                                                )
                                            })}
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="panel tab-B">
                                        <table className={"defaultContentTable"} style={{border:"0"}}>
                                            <thead>
                                            <tr className="defaultItemPaddingForTr">
                                                <th>ID</th>
                                                <th>Name</th>
                                                <th>Status</th>
                                                <th></th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            { this._operatorConsoleAsParent.state.extensions.map( ( ext, i ) =>{
                                                const extensionsStatus = this._operatorConsoleAsParent.state.extensionsStatus;
                                                const statusClassName = OCUtil.getExtensionStatusClassName( ext.id, extensionsStatus );

                                                return (
                                                    <tr key={i}>
                                                        <td style={{width:100}}>{ext.id}</td>
                                                        <td style={{width:100}}>{ext.name}</td>
                                                        <td style={{width:20}}><div className={statusClassName}></div></td>
                                                        <td style={{width:50}}>
                                                            <button title={i18n.t(`legacy_button_description.LegacyMakeCallButton`)} className="kbc-button kbc-button-fill-parent legacyButtonPadding"
                                                                    onClick={ () => {
                                                                        //this.props.operatorConsoleAsParent.setDialingAndMakeCall2( ext.id, this.props.currentCallIndex, this.props.callIds, this.props.callById );
                                                                        this.props.operatorConsoleAsParent.setDialingAndMakeCall2( ext.id  );
                                                                        this.props.operatorConsoleAsParent.abortAutoDialView();
                                                                    }
                                                                    }>
                                                                { <FontAwesomeIcon size="lg" icon="fas fa-phone"/> }
                                                            </button>
                                                        </td>
                                                    </tr>
                                                )
                                            })}
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="panel tab-C">
                                        <table className={"defaultContentTable"} style={{border:"0"}}><tbody><tr className="defaultItemPaddingForTr">
                                            <td>(Not implemented.)</td>
                                        </tr></tbody></table>
                                    </div>
                                </div>
                            </div>
                        </td></tr>
                    </tbody></table>
                </td></tr></tbody></table>
            </div>
            <DropDownMenu operatorConsole={this.props.operatorConsoleAsParent} ></DropDownMenu>
        </>)
    }
}