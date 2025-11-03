export default class RingtoneAudioPlayer{

    constructor( ringtoneAudioPlayersAsParent,  options   ) {
        this._PlayElement = options["playElement"];
        this._StopElement = options["stopElement"];
        this._RingtoneAudioPlayersAsParent = ringtoneAudioPlayersAsParent;
        this._Audio = new Audio();

        this._EndedFunc = (ev) =>{
            this._PlayElement.style.display = "unset";
            this._StopElement.style.display = "none";
        }
        this._Audio.addEventListener("ended", this._EndedFunc );
        this._PlayElement.style.display = "unset";
        this._StopElement.style.display = "none";
    }

    async playRingtoneAudio( src ){
        this._Audio.src = src;
        let promiseError = null;
        try{
            await this._Audio.play();
            this._PlayElement.style.display = "none";
            this._StopElement.style.display = "unset";
        }
        catch(ex){
            console.warn( ex + ",src=" + src  );
            promiseError = ex;
        }
        return promiseError;
    }

    stopRingtoneAudio(){
        this._Audio.pause();
        this._Audio.currentTime = 0;

        this._PlayElement.style.display = "unset";
        this._StopElement.style.display = "none";
    }

    destroyRingtoneAudioPlayer( ){
        this._Audio.removeEventListener("ended", this._EndedFunc );
        this.stopRingtoneAudio();
    }

}