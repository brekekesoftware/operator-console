import RingtoneAudioPlayer from "./RingtoneAudioPlayer";
import RingtoneSettings2 from "./RingtoneSettings2";

export default class RingtoneAudioPlayers{
    constructor( systemSettingsViewAsParent ) {
        this._SystemSettingsViewAsParent = systemSettingsViewAsParent;
        this._RingtoneAudioPlayerArray = new Array();
    }

    addRingtoneAudioPlayer( options ) {
           const ringtoneAudioPlayer = new RingtoneAudioPlayer( this, options );
           this._RingtoneAudioPlayerArray.push( ringtoneAudioPlayer );
           return ringtoneAudioPlayer;
    }

    getRingtoneAudioPlayer( index ){
        const ringtoneAudioPlayer = this._RingtoneAudioPlayerArray[index];
        return ringtoneAudioPlayer;
    }

    removeRingtoneAudioPlayerAt( index ){
        if( this._RingtoneAudioPlayerArray.length <= index ){
            return null;
        }
        const ringtoneAudioPlayer = this._RingtoneAudioPlayerArray[ index ];
        ringtoneAudioPlayer.destroyRingtoneAudioPlayer();
        this._RingtoneAudioPlayerArray.splice(index,1);
        return ringtoneAudioPlayer;
    }

    clearRingtoneAudioPlayers(){
        for( let i = 0;i < this._RingtoneAudioPlayerArray.length; i++ ){
            this.removeRingtoneAudioPlayerAt(0);
        }
    }


}