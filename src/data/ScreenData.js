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
            this._screenBackgroundImageBase64DataUrl = cloneSrcScreenData.getScreenBackgroundImageBase64DataUrl();
        }

    }

    getScreenBackgroundImageBase64DataUrl(){
        return this._screenBackgroundImageBase64DataUrl;
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

    setBackgroundImageBase64DataUrl(base64 ){
        this._screenBackgroundImageBase64DataUrl = base64;
    }

    deleteBackgroundImageBase64DataUrl(){
        this._screenBackgroundImageBase64DataUrl = null;
    }

    cloneScreenData(){
        const  screenData = new ScreenData(this);
        return screenData;
    }

    //Overwrites this instance's fields from cloneSrcScreenData while keeping this instance's identity
    //(needed so holders of a reference to this ScreenData, e.g. for save, see the restored content).
    copyFrom( cloneSrcScreenData ){
        const cloneSrcScreenPaneDatas = cloneSrcScreenData.getScreenPaneDatas();
        this._ScreenPaneDatas = new ScreenPaneDatas( this,  cloneSrcScreenPaneDatas );
        this._editingScreenGrid = cloneSrcScreenData.getEditingScreenGrid();
        this._screenBackgroundColor = cloneSrcScreenData.getScreenBackgroundColor();
        this._screenForegroundColor = cloneSrcScreenData.getScreenForegroundColor();
        this._screenBackgroundImageBase64DataUrl = cloneSrcScreenData.getScreenBackgroundImageBase64DataUrl();
    }

    getDataAsObject(){
        const o = new Object();
        const oPaneDatas = new Object();
        this._ScreenPaneDatas.setScreenPaneDatasToObject( oPaneDatas );
        o["screenPaneDatas"] = oPaneDatas;
        o["editingScreenGrid"] = this._editingScreenGrid;
        o["screenBackgroundColor"] = this._screenBackgroundColor;
        o["screenForegroundColor"] = this._screenForegroundColor;
        o["screenBackgroundImageBase64"] = this._screenBackgroundImageBase64DataUrl;
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
        screenData._screenBackgroundImageBase64DataUrl = oScreenData["screenBackgroundImageBase64"];
        return screenData;
    }

    static createScreenDataFromObject_dataVersion_2_0_0( oScreenData ){
        const screenData = new ScreenData();
        //!modify
        const oScreenPaneDatas = oScreenData["screenPaneDatas"];
        const screenPaneDatas = ScreenPaneDatas.createScreenPaneDatasFromObject_dataVersion_2_0_0( screenData, oScreenPaneDatas );
        screenData._ScreenPaneDatas = screenPaneDatas;
        screenData._editingScreenGrid = oScreenData["editingScreenGrid"];
        screenData._screenBackgroundColor = oScreenData["screenBackgroundColor"];
        screenData._screenForegroundColor = oScreenData["screenForegroundColor"];
        screenData._screenBackgroundImageBase64DataUrl = oScreenData["screenBackgroundImageBase64"];

        return screenData;
    }
}