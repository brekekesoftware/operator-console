import React from "react";
import "./reset.css"
import "./phonebookContactInfozTelsView.css"
import i18n from "../i18n";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import BrekekeOperatorConsole from "../index";
import OCUtil from "../OCUtil";
import AutoDialView_ver2 from "./AutoDialView_ver2";
import RuntimeUccacUcClients from "./RuntimeUccacUcClients";
import RuntimeUcUserStatuses from "./RuntimeUcUserStatuses";

let _INSTANCE;
export default class PhonebookContactInfozTelsView extends React.Component {

    constructor(props) {
        super(props);
        this.state ={
            pbContactInfo : null
        }
       _INSTANCE = this;
    }

    static getStaticPhonebookContactInfozTelsViewInstance(){
        return _INSTANCE;
    }

    openPhonebookContactInfozTelsView( pbContactInfo ){
        this.setState({pbContactInfo:pbContactInfo});
    }

    closePhonebookContactInfozTelsView( thenFunc ){
        this.setState({pbContactInfo:null},
            () => {
                if( thenFunc ){
                    thenFunc();
                }
            });
    }

    _makeCall( evMouseClick, tel ){
        AutoDialView_ver2.onClickCallButtonForAutoDialView( evMouseClick, tel );
        // const oc = BrekekeOperatorConsole.getStaticInstance();
        // oc.setDialingAndMakeCall( tel );
        // oc.abortAutoDialView_ver2();
    }

    render(){
        if( !this.state.pbContactInfo ){
            return (null);
        }
        const oc = BrekekeOperatorConsole.getStaticInstance();
        const extensionsStatus = oc.state.extensionsStatus;
        const extensions = oc.state.extensions;

        const telInfoArray = this.state.pbContactInfo.getFreezedPhonebookContactInfozTelInfoArray();
        const lang = oc.getLoggedinLanguage();
        const phonebook = Brekeke.Phonebook.getManager(lang);
        const systemSettingsData = oc.getSystemSettingsData();
        const tableHeaderFontSize = systemSettingsData.getAutoDialTableHeaderFontSize();
        const tableBodyFontSize = systemSettingsData.getAutoDialTableBodyFontSize();

        const ucClients = RuntimeUccacUcClients.getRuntimeUccacUcClientsStaticInstance();
        const ucClientCount = ucClients.getRuntimeUccacUcClientCount();
        let isUsingUc = false;
        for( let i = 0; i < ucClientCount; i++ ){
            const ucClient = ucClients.getRuntimeUccacUcClientAt(i);
            const uccacAc = ucClient.getUccacAc();
            isUsingUc = !!uccacAc;
            if( isUsingUc ){
                break;
            }
        }
        const lampSize = systemSettingsData.getAutoDialLampSize();
        const buttonSize = systemSettingsData.getAutoDialButtonSize();
        const colSpan = isUsingUc ? 5 : 4;

        return (<>
            <div className="brOCReset phonebookContactInfozTelsView">
                <table className={"defaultBorderWithRadius outsidePaddingWithoutBorderRadius"}>
                    <tbody>
                    <tr>
                        <td style={{textAlign: "right", verticalAlign: "top"}}>
                            <FontAwesomeIcon icon="far fa-window-close" onClick={(e) => this.closePhonebookContactInfozTelsView()} className="closeFontAwesomeIcon" />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <table className="defaultContentTable">
                                <thead>
                                    <tr>
                                        <th colSpan={colSpan} className="displayNameTitleTh" style={{textTransform:"unset"}}>
                                            <span style={{fontSize:systemSettingsData.getAutoDialOtherFontSize()}}>{this.state.pbContactInfo.getDisplayName()}</span>
                                        </th>
                                    </tr>
                                    <tr>
                                        <th style={{fontSize: tableHeaderFontSize}}>{i18n.t("Type")}</th>
                                        <th style={{fontSize: tableHeaderFontSize}}>{i18n.t("Tel")}</th>
                                        <th style={{fontSize: tableHeaderFontSize}}>{i18n.t("Status")}</th>
                                        { isUsingUc && <th style={{fontSize: tableHeaderFontSize}}>{i18n.t("UcStatus")}</th> }
                                        <th style={{fontSize: tableHeaderFontSize}}>{i18n.t("Call")}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                { phonebook.item.map( ( phonebookItem, i ) => {
                                    if( phonebookItem.type !== "phone" ){
                                        return (null);
                                    }
                                    const telInfo = telInfoArray.find( (telInfo) => telInfo.getInfoKeyName() === phonebookItem.id );
                                    if( !telInfo ){
                                        return (null);
                                    }
                                    const tel = telInfo.getValue();
                                    if( !tel || tel.length === 0 ){
                                        return (null);
                                    }
                                    const isExtension = OCUtil.indexOfArrayFromExtensions(extensions, tel) !== -1;
                                    const statusClassName = isExtension ? OCUtil.getExtensionStatusClassName(tel, extensionsStatus) : "";

                                    let ucUserStatusJsx;
                                    if( isUsingUc ){
                                        if( isExtension ){
                                            const ucUserStatus = RuntimeUcUserStatuses.getRuntimeUcUserStatusesStaticInstance().getUcUserStatus( tel );
                                            if( ucUserStatus || ucUserStatus === 0 ){
                                                const ucUserStatusClassName = AutoDialView_ver2._getUcUserStatusClassName( tel, ucUserStatus );
                                                ucUserStatusJsx = <div style={{width:lampSize,height:lampSize}} className={ucUserStatusClassName}></div>;
                                            }
                                            else{
                                                ucUserStatusJsx = <></>;
                                            }
                                        }
                                        else{
                                            ucUserStatusJsx = <></>;
                                        }
                                    }
                                    return (
                                        <tr key={i}>
                                            <td style={{fontSize:tableBodyFontSize}}>{telInfo.getTitle()}</td>
                                            <td style={{fontSize:tableBodyFontSize}}>{tel}</td>
                                            <td style={{fontSize:tableBodyFontSize}}>
                                                <div style={{width:lampSize,height:lampSize}} className={statusClassName}></div>
                                            </td>
                                            { isUsingUc && (
                                                <td style={{fontSize:tableBodyFontSize,textAlign: "center",width:10}}>
                                                    {ucUserStatusJsx}
                                                </td>
                                            )}
                                            <td style={{fontSize:tableBodyFontSize}}>{
                                                <button
                                                    title={i18n.t(`Call`)}
                                                    className="kbc-button kbc-button-fill-parent legacyButtonPadding"
                                                    onClick={(e) => this._makeCall(e,tel) }
                                                >
                                                    <FontAwesomeIcon style={{width:buttonSize,height:buttonSize}} size="lg" icon="fas fa-phone"/>
                                                </button>
                                            }</td>
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
        </>)


    }


}
