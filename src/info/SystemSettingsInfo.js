export default class SystemSettingsInfo{

    constructor( options ) {
        this._OCNoteInfoAsParent = options["oNNoteInfoAsParent"];
        this._Object = options["object"];
   }

   getObject(){
        const object = this._Object;
        return object;
   }


}