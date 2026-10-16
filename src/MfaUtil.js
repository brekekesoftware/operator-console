export default class MfaUtil {

    static _INSTANCE = null;

    constructor() {
        if (MfaUtil._INSTANCE) {
            return MfaUtil._INSTANCE;
        }
        MfaUtil._INSTANCE = this;
    }

    static getStaticInstance() {
        if (!MfaUtil._INSTANCE) {
            MfaUtil._INSTANCE = new MfaUtil();
        }
        return MfaUtil._INSTANCE;
    }

	static getBlockVerifyKey(){
		return "brekeke_operator-console_mfa_block_verify_timelimit";
	}
	
	static getBlockResendKey(){
		return "brekeke_operator-console_mfa_block_resend_timelimit";
	}

	resetBlockVerifyTimelimit(){
		const key = MfaUtil.getBlockVerifyKey();
		const timelimit = Date.now() + ( 10 * 1000 );
		window.localStorage.setItem( key, timelimit.toString() );
	}
	
	resetBlockResendTimelimit(){
		const key = MfaUtil.getBlockResendKey();
		const timelimit = Date.now() + ( 30 * 1000 );
		window.localStorage.setItem( key, timelimit.toString() );
	}
	
	getBlockVerifyTimelimit(){
		const key = MfaUtil.getBlockVerifyKey();
		const sTimelimit = window.localStorage.getItem( key );
		if( !sTimelimit ){
			return null;
		}
		const timelimit = parseInt(sTimelimit);
		return timelimit;
	}
	
	canVerifyMfaCode(){
		const timelimit = this.getBlockVerifyTimelimit();
		if( !timelimit || isNaN( timelimit ) ){
			return true;
		}
		
		const bFinished = timelimit < Date.now();
		return bFinished;
	}


	getBlockResendTimelimit(){
		const key = MfaUtil.getBlockResendKey();
		const sTimelimit = window.localStorage.getItem( key );
		if( !sTimelimit ){
			return null;
		}
		const timelimit = parseInt(sTimelimit);
		return timelimit;
	}
	
	canResendMfaCode(){
		const mfaBlockResendTimelimit = this.getBlockResendTimelimit();
		if( !mfaBlockResendTimelimit || isNaN( mfaBlockResendTimelimit ) ){
			return true;
		}
		
		const bFinished = mfaBlockResendTimelimit < Date.now();
		return bFinished;
	}

	stopWatchBlockVerify(){
		if( this._blockVerifyIntervalId ){
			window.clearInterval( this._blockVerifyIntervalId );
			this._blockVerifyIntervalId = null;
			return true;
		}
		else{
			return false;
		}
	}
	
	stopWatchBlockResend(){
		if( this._blockResendIntervalId ){
			window.clearInterval( this._blockResendIntervalId );
			this._blockResendIntervalId = null;
			return true;
		}
		else{
			return false;
		}
	}
	
	startWatchBlockVerify( onFinishFunc ){
		if( this._blockVerifyIntervalId ){
			return false;
		}
		
		const key = MfaUtil.getBlockVerifyKey();
		const sFirstTimelimit = window.localStorage.getItem( key );
		if( !sFirstTimelimit ){
			onFinishFunc();
			return false;
		}
		
		this._blockVerifyIntervalId = window.setInterval(() => {
			const sTimelimit = window.localStorage.getItem( key );
			if( sTimelimit ){
				const timelimit = parseInt(sTimelimit);
				if( !isNaN( timelimit ) ){
					const bFinish = timelimit < Date.now();
					if( bFinish ){
						window.localStorage.removeItem(key);
						this.stopWatchBlockVerify();
						onFinishFunc();
					}
				}
				else{
					window.localStorage.removeItem(key);
					this.stopWatchBlockVerify();
					onFinishFunc();
				}
			}
			// else if( sTimelimit === 0 ){
			// 	window.localStorage.removeItem(key);
			// 	this.stopWatchBlockVerify();
			// 	onFinishFunc();
			// }
			else{
				this.stopWatchBlockVerify();
				onFinishFunc();
			}
		}, 1000);		
		return true;
	}
	
	startWatchBlockResend( onFinishFunc ){
		if( this._blockResendIntervalId ){
			return false;
		}
		
		const key = MfaUtil.getBlockResendKey();
		const sFirstTimelimit = window.localStorage.getItem( key );
		if( !sFirstTimelimit ){
			onFinishFunc();
			return false;
		}
		
		this._blockResendIntervalId = window.setInterval(() => {
			const sTimelimit = window.localStorage.getItem( key );
			if( sTimelimit ){
				const timelimit = parseInt(sTimelimit);
				if( !isNaN( timelimit ) ){
					const bFinish = timelimit < Date.now();
					if( bFinish ){
						window.localStorage.removeItem(key);
						this.stopWatchBlockResend();
						onFinishFunc();
					}
				}
				else{
					window.localStorage.removeItem(key);
					this.stopWatchBlockResend();
					onFinishFunc();
				}
			}
			// else if( sTimelimit === 0 ){
			// 	window.localStorage.removeItem(key);
			// 	this.stopWatchBlockResend();
			// 	onFinishFunc();
			// }
			else{
				this.stopWatchBlockResend();
				onFinishFunc();
			}
		}, 1000);		
		return true;
	}


}