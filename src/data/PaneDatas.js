import PaneData from "./PaneData";

//!abstract
export default class PaneDatas{

    constructor( cloneSrcPaneDatas ) {
        this._PaneDatas = new Object(); //without tabs ( paneNumber,paneData )
        this._latestPaneNumber = -1;
        if( !cloneSrcPaneDatas ) {
        }
        else{
            const srcPaneDatas = cloneSrcPaneDatas._PaneDatas;
            const enSrcPaneData = Object.entries( srcPaneDatas );
            enSrcPaneData.forEach(([sSrcPaneNumber, srcPaneData ]) => {
                const srcParentPaneNumber = srcPaneData.getParentPaneNumber();
                let  dstParentPaneData;
                if( srcParentPaneNumber === -1 ){
                    dstParentPaneData = null;
                }
                else {
                    dstParentPaneData = this._PaneDatas[srcParentPaneNumber];
                }
                const srcPaneNumber = parseInt( sSrcPaneNumber );
                const dstPaneData = this._newPaneData( this, srcPaneNumber, srcPaneData.getPaneType(), dstParentPaneData, srcPaneData );
                const dstPaneNumber = dstPaneData.getPaneNumber();
                this._PaneDatas[ dstPaneNumber ] = dstPaneData;
                if( dstPaneNumber > this._latestPaneNumber ){
                    this._latestPaneNumber = dstPaneNumber;
                }
            });
        }
    }



    addPaneData( paneType, parentPaneData = null ){
        if( parentPaneData && paneType === PaneData.PANE_TYPES.rootPane ){
            throw new Error("Invalid operation.");
        }

        this._latestPaneNumber++;
        const paneData = this._newPaneData( this, this._latestPaneNumber, paneType, parentPaneData  );
        this._PaneDatas[ paneData.getPaneNumber()  ] = paneData;
        return paneData;
    }

    //!abstract
    _newPaneData( paneDatasAsParent, paneNumber, paneType, parentPaneData, cloneSrcPaneData ){
        throw new Error("Not implemented.");
        return null;
    }


    getPaneDataByPaneNumber( paneNumber ){
        const paneData = this._PaneDatas[ paneNumber ];
        return paneData;
    }

    removePaneDataByPaneNumberForce( paneNumber ){
        const b = delete this._PaneDatas[ paneNumber ];
        return b;
    }

    //!hint nullable
    getRootPaneData(){
        const rootPaneData = this.getPaneDataByPaneNumber( PaneData.ROOT_PANE_NUMBER );
        return rootPaneData;
    }

    getOrAddRootPaneData(){
        let rootPaneData = this.getRootPaneData();
        if( rootPaneData ){
            return rootPaneData;
        }
        rootPaneData = this.addPaneData(  PaneData.PANE_TYPES.rootPane, null  );
        return rootPaneData;
    }

    //!internal method
    __clonePaneDataToByPaneNumber( dstScreenData, paneNumber ){
        const srcPaneData = this._PaneDatas[ paneNumber ];

        if( dstScreenData._latestPaneNumber < paneNumber ){
            dstScreenData._latestPaneNumber = paneNumber;
        }
        const srcPaneType =  srcPaneData.getPaneType();
        let  dstParentPaneData;
        const srcParentPaneNumber =  srcPaneType.getParentPaneNumber();
        if( srcParentPaneNumber === -1 ) {
            dstParentPaneData = null;
        }
        else{
            dstParentPaneData = dstScreenData.getPaneDataByPaneNumber( srcParentPaneNumber );
        }

        const dstPaneData = this._newPaneData( dstScreenData, dstScreenData._latestPaneNumber, srcPaneType, dstParentPaneData, srcPaneData  );
        dstScreenData._PaneDatas[ dstPaneData.getPaneNumber()  ] = dstPaneData;
        return dstPaneData;
    }
}