import React from "react";
import "./reset.css"
import "./phonebookContactInfozTelsView.css"
import i18n from "../i18n";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import BrekekeOperatorConsole from "../index";
import OCUtil from "../OCUtil";

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

    _makeCall( tel ){
        const oc = BrekekeOperatorConsole.getStaticInstance();
        oc.setDialingAndMakeCall( tel );
        oc.abortAutoDialView_ver2();
    }

    render(){
        if( !this.state.pbContactInfo ){
            return (null);
        }
        const oc = BrekekeOperatorConsole.getStaticInstance();
        const extensionsStatus = oc.state.extensionsStatus;
        const extensions = oc.state.extensions;

        const telInfoArray = this.state.pbContactInfo.getFreezedPhonebookContactInfozTelInfoArray();
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
                                        <th colSpan="4" className="displayNameTitleTh" style={{textTransform:"unset"}}>
                                            {this.state.pbContactInfo.getDisplayName()}
                                        </th>
                                    </tr>
                                    <tr>
                                        <th>{i18n.t("Type")}</th>
                                        <th>{i18n.t("Tel")}</th>
                                        <th>{i18n.t("Status")}</th>
                                        <th>{i18n.t("Call")}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                { telInfoArray.map( ( telInfo, i ) => {
                                    const tel = telInfo.getValue();
                                    const isExtension = OCUtil.indexOfArrayFromExtensions(extensions, tel) !== -1;
                                    const statusClassName = isExtension ? OCUtil.getExtensionStatusClassName(tel, extensionsStatus) : "";
                                    return (
                                        <tr key={i}>
                                            <td>{telInfo.getTitle()}</td>
                                            <td>{telInfo.getValue()}</td>
                                            <td>
                                                <div className={statusClassName}></div>
                                            </td>
                                            <td>{
                                                <button
                                                    title={i18n.t(`Call`)}
                                                    className="kbc-button kbc-button-fill-parent legacyButtonPadding"
                                                    onClick={(e) => this._makeCall(telInfo.getValue()) }
                                                >
                                                    <FontAwesomeIcon size="lg" icon="fas fa-phone"/>
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
