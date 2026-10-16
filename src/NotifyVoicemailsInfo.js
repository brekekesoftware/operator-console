import BrekekeOperatorConsole from "./index";
import OCUtil from "./OCUtil";


export default class NotifyVoicemailsInfo{
    constructor( operatorConsoleAsParent ) {
        this._Parent = operatorConsoleAsParent;
        this._hasVoicemail = undefined;
    }
	
	async _getVoicemailForLoggedin(){
        const options = {};

        options["offset"] = 0;
        options["limit"] = 1;
		//options["order"] = "desc"

        const getVoicemailsOptions ={
            methodName : "getVoicemails",
            methodParams : options,
        }

        const oc = BrekekeOperatorConsole.getStaticInstance();
        const voicemails = await oc.getPalRestApi().callPalRestApiMethodAsync( getVoicemailsOptions ).catch( (resOrError) =>{
            OCUtil.logErrorWithNotification("Failed to get voice mails.", i18n.t("Failed_to_get_voice_mails"), resOrError );
            return null;
        });
		return voicemails;
    }

    async onLoggedinForNotifyVoicemailsInfo( operatorConsoleAsCaller ){
		const voicemails = await this._getVoicemailForLoggedin();
		this._hasVoicemail =  voicemails && voicemails.length !== 0;
		if( this._hasVoicemail ){
			const oc = BrekekeOperatorConsole.getStaticInstance();
			oc.setState({rerender:true});
		}
    }

    hasVoicemail(){
        return this._hasVoicemail;
    }

    onLogoutForNotifyVoicemailsInfo( operatorConsoleAsCaller ) {
        this._hasVoicemail = undefined;
    }

    onPalNotifyVoiceMailDebounceByOperatorConsole( operatorConsoleAsCaller, notifyVoicemailEvents ){
        const lastEvent = notifyVoicemailEvents[ notifyVoicemailEvents.length - 1 ];
        let updated = false;
        for( let i = notifyVoicemailEvents.length - 1 ; i >= 0 ; i-- ){
            const e = notifyVoicemailEvents[i];
            const bOk = this._parseNotifyVoicemailEvent(e);
            if( bOk ){
                updated = true;
                break;
            }
        }
        return updated;
        //this._parseNotifyVoicemailEvent( lastEvent );
    }

    _parseNotifyVoicemailEvent( e ){
        const user = e["user"];
        if( user !== this._Parent.getLoggedinUsername() ){
            return false;
        }

        const saved = e["saved"];
        if( Number.isInteger( saved ) && saved > 0 ){
            this._hasVoicemail = true;
            return true;
        }

        const new_ = e["new"];
        if( Number.isInteger( new_ ) && new_ > 0 ){
            this._hasVoicemail = true;
            return true;
        }

        const read = e["read"];
        if( Number.isInteger( read ) && read > 0 ){
            this._hasVoicemail = true;
            return true;
        }

        this._hasVoicemail = false;
        return true;

    }

}