import React from "react";
import "./reset.css"
import "./phonebookContactInfozInfoView.css"
import i18n from "../i18n";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import BrekekeOperatorConsole from "../index";
import OCUtil from "../OCUtil";
import {Button, Input} from "antd";
import Popconfirm from "antd/lib/popconfirm";

let _INSTANCE;
export default class PhonebookContactInfozInfoView extends React.Component {

    constructor(props) {
        super(props);
        this.state ={
            pbContactInfo : null
        }
        _INSTANCE = this;
    }

    static getStaticPhonebookContactInfozInfoViewInstance(){
        return _INSTANCE;
    }

    getPhonebookContactInfoFromState(){
        return this.state.pbContactInfo;
    }

    openPhonebookContactInfozInfoView( pbContactInfo ){
        this.setState({pbContactInfo:pbContactInfo});
    }

    closePhonebookContactInfozInfoView( thenFunc ){
        this.setState({pbContactInfo:null}, () =>{
            if( thenFunc ){
                thenFunc();
            }
        });
    }

    _makeCall( tel ){
        const oc = BrekekeOperatorConsole.getStaticInstance();
        oc.setDialingAndMakeCall( tel );
        oc.abortAutoDialView_ver2();
    }

    _save(){
        //!kokokara //!tocyuu
    }

    render(){
        if( !this.state.pbContactInfo ){
            return (null);
        }
        const oc = BrekekeOperatorConsole.getStaticInstance();
        const extensionsStatus = oc.state.extensionsStatus;
        const extensions = oc.state.extensions;
        const isSaveable = this.state.pbContactInfo.getIsShared() === false;

        const telInfoArray = this.state.pbContactInfo.getFreezedPhonebookContactInfozTelInfoArray();
        return (<>
            <div className="brOCReset phonebookContactInfozInfoView ">
                <table className={"defaultBorderWithRadius outsidePaddingWithoutBorderRadius"}>
                    <tbody>
                    <tr>
                        <td style={{textAlign: "right", verticalAlign: "top"}}>
                            <Popconfirm title={i18n.t("are_you_sure")} onConfirm={ () => this.closePhonebookContactInfozInfoView() }
                                        okText={i18n.t("yes")}
                                        cancelText={i18n.t("no")}
                            >
                                <span className="linkDeco">[X]</span>
                            </Popconfirm>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div className={"autoDialView_ver2_tableParent"}>
                                <table className="defaultContentTable">
                                    <thead>
                                    <tr>
                                        <th colSpan="2" className="displayNameTitleTh" style={{textTransform: "unset"}}>
                                            {this.state.pbContactInfo.getDisplayName()}
                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        this.state.pbContactInfo.getFreezedPhonebookContactInfozInfoArray().map(
                                            (info, i) => {
                                                if (info.isTelKey()) {
                                                    return (null);
                                                }
                                                if (info.getInfoKeyName() === "$lang") { //!comment Not editable
                                                    return (null);
                                                }
                                                return (
                                                    <tr key={i}>
                                                        <th>{info.getTitle()}</th>
                                                        <td><Input data-br-name={"PhonebookContactInfozInfoView_infoItem_" + info.getInfoKeyName()}
                                                                   defaultValue={info.getValue()}
                                                                   style={{width: "300px"}} disabled={!isSaveable}/>
                                                        </td>
                                                    </tr>
                                                );
                                            }
                                        )
                                    }
                                        <tr>
                                            <th style={{verticalAlign: "middle"}}>
                                                {i18n.t("Tels")}
                                            </th>
                                            <td>
                                                <table className="defaultContentTable PhonebookContactInfozInfoTelsTable">
                                                    <thead>
                                                    <tr>
                                                        <th className="defaultItemPaddingTopImportant">{i18n.t("Type")}</th>
                                                        <th className="defaultItemPaddingTopImportant">{i18n.t("Tel")}</th>
                                                        <th className="defaultItemPaddingTopImportant"
                                                            style={{textAlign: "center"}}>{i18n.t("Status")}</th>
                                                        <th className="defaultItemPaddingTopImportant"
                                                            style={{textAlign: "center"}}>{i18n.t("Call")}</th>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    {telInfoArray.map((telInfo, i) => {
                                                        //!tocyuu //!kokokara すべて(入力されていないものも)の電話番号の編集を可能にするようにコードを変える
                                                        const tel = telInfo.getValue();
                                                        const isExtension = OCUtil.indexOfArrayFromExtensions(extensions, tel) !== -1;
                                                        const statusClassName = isExtension ? OCUtil.getExtensionStatusClassName(tel, extensionsStatus) : "";
                                                        return (
                                                            <tr key={i}>
                                                                <td>{telInfo.getTitle()}</td>
                                                                <td>
                                                                    <Input
                                                                        data-br-name={"PhonebookContactInfozInfoView_infoItem_" + telInfo.getInfoKeyName()}
                                                                        defaultValue={telInfo.getValue()}
                                                                        style={{width: "160px"}} disabled={!isSaveable}/>
                                                                </td>
                                                                <td>
                                                                    <div style={{
                                                                        display: "flex",
                                                                        alignItems: "center",
                                                                        justifyContent: "center"
                                                                    }}>
                                                                        <div className={statusClassName}></div>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <div style={{
                                                                        display: "flex",
                                                                        alignItems: "center",
                                                                        justifyContent: "center"
                                                                    }}>
                                                                        <button
                                                                            title={i18n.t(`Call`)}
                                                                            className="kbc-button kbc-button-fill-parent legacyButtonPadding"
                                                                            onClick={(e) => this._makeCall(telInfo.getValue())}
                                                                        >
                                                                            <FontAwesomeIcon size="lg" icon="fas fa-phone"/>
                                                                        </button>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        )
                                                    })}
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={2} style={{paddingTop:"4px",paddingRight:"4px"}}>
                            <div style={{display: "flex", alignItems: "center", justifyContent: "end"}}>
                                <Button type="success" onClick={this._save} disabled={!isSaveable}>
                                    {i18n.t("save")}
                                </Button>
                            </div>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </>)


    }


}
