import ScreenPaneData from "./ScreenPaneData";
import ScreenPaneDatas from "./ScreenPaneDatas";
import PaneDatas from "./PaneDatas";

export default class ScreenData{

    constructor( cloneSrcScreenData  ){
        if( !cloneSrcScreenData ) {
            this._ScreenPaneDatas = new ScreenPaneDatas( this );
            this._editingScreenGrid = 10;   //!default
            this._screenBackgroundColor = "#FFFFFF";    //!default
            this._screenForegroundColor = "#000000";    //!default
        }
        else{
            const cloneSrcScreenPaneDatas = cloneSrcScreenData.getScreenPaneDatas();
            this._ScreenPaneDatas = new ScreenPaneDatas( this,  cloneSrcScreenPaneDatas );
            this._editingScreenGrid = cloneSrcScreenData.getEditingScreenGrid();
            this._screenBackgroundColor = cloneSrcScreenData.getScreenBackgroundColor();
            this._screenForegroundColor = cloneSrcScreenData.getScreenForegroundColor();
        }

    }

    getScreenPaneDatas(){
        return this._ScreenPaneDatas;
    }

    getEditingScreenGrid(){
        return this._editingScreenGrid;
    }

    getScreenBackgroundColor(){
        return this._screenBackgroundColor;
    }

    getScreenForegroundColor(){
        return this._screenForegroundColor;
    }

    setScreenForegroundColor( hex ){
        this._screenForegroundColor = hex;
    }

    setScreenBackgroundColor( hex ){
        this._screenBackgroundColor = hex;
    }

    setEditingScreenGrid( editingScreenGrid ){
        this._editingScreenGrid = editingScreenGrid;
    }

    cloneScreenData(){
        const  screenData = new ScreenData(this);
        return screenData;
    }

    getDataAsObject(){
        const o = new Object();
        const oPaneDatas = new Object();
        this._ScreenPaneDatas.setScreenPaneDatasToObject( oPaneDatas );
        o["screenPaneDatas"] = oPaneDatas;
        o["editingScreenGrid"] = this._editingScreenGrid;
        o["screenBackgroundColor"] = this._screenBackgroundColor;
        o["screenForegroundColor"] = this._screenForegroundColor;
        return o;
    }

    static createScreenDataFromObject( oScreenData ){
        const oScreenPaneDatas = oScreenData["screenPaneDatas"];
        const screenData = new ScreenData();
        //!modify
        const screenPaneDatas = ScreenPaneDatas.createScreenPaneDatasFromObject( screenData, oScreenPaneDatas );
        screenData._ScreenPaneDatas = screenPaneDatas;
        screenData._editingScreenGrid = oScreenData["editingScreenGrid"];
        screenData._screenBackgroundColor = oScreenData["screenBackgroundColor"];
        screenData._screenForegroundColor = oScreenData["screenForegroundColor"];

        return screenData;
    }

}