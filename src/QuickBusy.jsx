import React from "react";
import {brOcDisplayStates} from "./index";
import "./reset.css"
import "./QuickBusy.css"
import OCUtil from "./OCUtil";


const QUICK_BUSY_CLICK_TO_CALL = true;
export default class QuickBusy extends React.Component {

    constructor(props) {
        super(props);
        this._operatorConsoleAsParent = props.operatorConsoleAsParent;
        this._operatorConsoleAsParent.setQuickBusy(this);

        this.state = {
            candidateCallNos: null
        };

        this._operatorConsoleAsParent.addOnAppendKeypadValueCallback( this._onAppendKeypadValue.bind(this) );
        this._operatorConsoleAsParent.addOnbackspaceKeypadValueCallback( this._onBackspaceKeypadValue.bind(this) );
        this._operatorConsoleAsParent.addOnClearDialingCallbacks( this._onClearDialing.bind(this) );
        //this._operatorConsoleAsParent.addOnSetCurrentScreenIndexCallback( this._onSetCurrentScreenIndex.bind(this) );
    }

    _onClearDialing( operatorConsoleAsCaller ){
        this._resetCandidateCallNos();
    }

    static getDefaultQuickBusyClickToCall(){
        return QUICK_BUSY_CLICK_TO_CALL;
    }

    _onAppendKeypadValue( operatorConsoleAsSender, key ){
        const displayState = this._operatorConsoleAsParent.getDisplayState();
        if( displayState !== brOcDisplayStates.showScreen ) {
            return;
        }

        const ocState = this._operatorConsoleAsParent.getState();
        const dialing = ocState.dialing;
        this._resetCandidateCallNos( dialing );
    }

    _onBackspaceKeypadValue( operatorConsoleAsSender ){

        const ocState = operatorConsoleAsSender.getState();
        const dialing = ocState.dialing;
        this._resetCandidateCallNos( dialing );
    }


    static _compare(x, y)
    {
        if (x < y) {
            return -1;
        }

        if( x === y ){
            return 0;
        }

        //x > y
        return 1;
    }

    /**
     *
     * @param ary
     * @param target
     * @return -1 if found item
     */
    static _getInsertIndex( ary, target ){
        for( let i = 0; i < ary.length; i++ ) {
            const itm = ary[i];
            const iCompare = QuickBusy._compare(target, itm);
            if (iCompare === 0) {
                return -1;
            }
            if( iCompare === -1 ){
                return i;
            }
        }
        return ary.length;
    }
    _collectCandidateCallNos( dialing ){
        //history
        const historyCallNos = this._operatorConsoleAsParent.getCallHistory().getSortedCallNos();
        //const callNos = Array.from(historyCallNos);
        const callNos = [];
        if( historyCallNos ){
            for( let i = 0; i < historyCallNos.length; i++ ){
                const historyCallNo = historyCallNos[i];
                if( historyCallNo.startsWith( dialing ) ) {
                    callNos.push( historyCallNo );
                }
            }
        }

        //callNos.sort();

        //extensions
        const extensions = this._operatorConsoleAsParent.state.extensions;
        if( extensions ) {
            for (let i = 0; i < extensions.length; i++) {
                const ext = extensions[i];
                if( ext.id.startsWith( dialing ) ){
                    const iInsertIndex = QuickBusy._getInsertIndex( callNos, ext.id );
                    if( iInsertIndex === -1 ){  //already exists
                        continue;
                    }
                    callNos.splice( iInsertIndex,0,ext.id );
                }
            }
        }

        return callNos;
    }

    _resetCandidateCallNos( dialing ){
        if(!dialing || dialing.length === 0 ){
            this.setState({candidateCallNos:null});
            return;
        }

        const candidateCallNos = this._collectCandidateCallNos( dialing );
        //const visible = candidateCallNos.length !== 0;
        //const bBecomeVisible = this.state.visible === false && visible;
        // if( bBecomeVisible ){
        //     this._operatorConsoleAsParent.onVisibleQuickBusy(this);
        // }
        this.setState({candidateCallNos:candidateCallNos});
    }

    // _onSetCurrentScreenIndex( operatorConsoleAsSender, currentScreenIndex, previousScreenIndex ){
    // }

    onBeforeCurrentScreenIndexChange( operatorConsoleAsSender, index ){
        this.setState( { candidateCallNos: null } );
    }

    _onClickCallNo( callNo ){
        const isClickToCall = this._operatorConsoleAsParent.getSystemSettingsData().getQuickBusyClickToCall();
        if( isClickToCall === false ){
            this._operatorConsoleAsParent.setDialing( callNo );
        }
        else{
            this._operatorConsoleAsParent.setDialingAndMakeCall2( callNo );
        }
    }

    render(){

        if( !this.state.candidateCallNos || this.state.candidateCallNos.length == 0 ){
            return (null);
        }

        const ocState = this._operatorConsoleAsParent.getState();

        const dialing = ocState.dialing;
        const extensions = ocState.extensions;
        const extensionsStatus = ocState.extensionsStatus;



        return (
            <div className="brOCReset quickBusy">
                <table className={"defaultBorderWithRadius outsidePaddingWithoutBorderRadius"}>
                    <tbody><tr><td>
                        <table className="defaultContentTable noBorderTopForFirstRowzCell"><tbody>
                            { this.state.candidateCallNos.map( ( callNo, i ) => {
                                const isExtension = OCUtil.indexOfArrayFromExtensions( this._operatorConsoleAsParent.state.extensions, callNo ) !== -1;
                                const extensionsStatus = this._operatorConsoleAsParent.state.extensionsStatus;
                                const statusClassName = isExtension ? OCUtil.getExtensionStatusClassName( callNo, extensionsStatus ) : "";

                                return (<tr key={i} onClick={this._onClickCallNo.bind(this,callNo)} className="linkDeco">
                                    <td>{callNo}</td>
                                    <td><div className={statusClassName}></div></td>
                                </tr>)
                            })
                            }
                        </tbody>
                        </table>
                    </td></tr></tbody>
                </table>
            </div>
        );
    }
}