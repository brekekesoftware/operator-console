import PaneDatas from "./PaneDatas";
import ScreenPaneData from "./ScreenPaneData";
import PaneData from "./PaneData";

export default class ScreenPaneDatas extends PaneDatas {

    constructor( screenDataAsParent, cloneSrcScreenPaneDatas ) {
        super( cloneSrcScreenPaneDatas );
        this._ScreenDataAsParent = screenDataAsParent;
    }

    //!override
    _newPaneData( paneDatasAsParent, paneNumber, paneType, parentPaneData, cloneSrcPaneData ){

        if( this._latestPaneNumber < paneNumber ){
            this._latestPaneNumber = paneNumber;
        }

        const options ={
            paneDatasAsParent:paneDatasAsParent,
            paneNumber:paneNumber,
            paneType:paneType,
            parentPaneData:parentPaneData,
            cloneSrcPaneData:cloneSrcPaneData
        };

        const screenPaneData = new ScreenPaneData( options );
        return screenPaneData;
    }

    getScreenDataAsParent(){
        return this._ScreenDataAsParent;
    }

    static createScreenPaneDatasFromObject( screenDataAsParent, o )
    {
        const screenPaneDatas = new ScreenPaneDatas( screenDataAsParent );
        screenPaneDatas._setScreenPaneDatasFromObject( o );
        return screenPaneDatas;
    }

    _setScreenPaneDatasFromObject( o ){
        const oPaneDataArray = o["paneDataArray"];

        //clear object
        for (const prop of Object.getOwnPropertyNames(this._PaneDatas)) {
            delete this._PaneDatas[prop];
        }

        for( let i = 0; i < oPaneDataArray.length; i++ ){
            const srcScreenPaneDataObject = oPaneDataArray[i];
            const options ={
                paneDatasAsParent:this,
                paneDataObject: srcScreenPaneDataObject
            }
            const screenPaneData = new ScreenPaneData( options );
            const paneNumber = screenPaneData.getPaneNumber();
            this._PaneDatas[ paneNumber ] =  screenPaneData;
            if( paneNumber > this._latestPaneNumber ){
                this._latestPaneNumber = paneNumber;
            }
        }

        //this._latestPaneNumber = o["latestPaneNumber"];
    }

    setScreenPaneDatasToObject( o ){
        //o["latestPaneNumber"] = this._latestPaneNumber;
        const srcPaneDataArray = Object.values( this._PaneDatas );
        const dstPaneDataArray = new Array( srcPaneDataArray.length );
        o["paneDataArray"] = dstPaneDataArray;
        for( let i = 0; i < srcPaneDataArray.length; i++ ){
            const srcPaneData = srcPaneDataArray[i];
            const oPaneData = new Object();
            srcPaneData.setPaneDataToObject( oPaneData  );
            dstPaneDataArray[i] =  oPaneData;
        }
    }


}