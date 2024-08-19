//Abstract class
export default class WidgetInfo {

    constructor( options ) {
        this._Object = options.object;
    }

    getWidgetObject(){
        const object = this._Object;
        return object;
    }


}