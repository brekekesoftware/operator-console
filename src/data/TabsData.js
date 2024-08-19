import TabData from "./TabData";
import i18n from "../i18n";

export default class TabsData{

    constructor( paneDataAsParent, cloneSrcTabsData, oTabsData  ) {
        this._PaneDataAsParent = paneDataAsParent;
        this._TabDataArray = new Array();

        if( cloneSrcTabsData ){
            const tabCount = cloneSrcTabsData._TabDataArray.length;
            for( let i = 0; i < tabCount; i++ ){
                const srcTabData = cloneSrcTabsData._TabDataArray[i];
                this._addTabForClone( srcTabData );
            }
            this._selectedTabKeyAsInt = cloneSrcTabsData._selectedTabKeyAsInt;
            this._selectedTabKeyAsString = cloneSrcTabsData._selectedTabKeyAsString;
        }
        else if( oTabsData ){
            const tabDataArray = oTabsData["tabDataArray"];
            for( let i = 0; i < tabDataArray.length; i++ ){
                const tabData = tabDataArray[i];
                this._addTabForObject( tabData );
            }
            this.setSelectedTabKeyAsInt( oTabsData["selectedTabKeyAsInt"] );
        }
        else {
            this._selectedTabKeyAsInt = 0;
            this._selectedTabKeyAsString = this._selectedTabKeyAsInt.toString();
            this.addTab(i18n.t("UntitledTab"));
        }
    }

    setTabsDataToObject( o ){
        o["selectedTabKeyAsInt"] = this._selectedTabKeyAsInt;
        const dstTabDataArray = new Array( this._TabDataArray.length );
        o["tabDataArray"] = dstTabDataArray;
        for( let i = 0; i < this._TabDataArray.length; i++ ){
            const srcTabData = this._TabDataArray[i];
            const oDstTabData = new Object();
            srcTabData.setTabDataToObject( oDstTabData );
            dstTabDataArray[i] = oDstTabData;
        }
    }

    getSelectedTabKeyAsString(){
        return this._selectedTabKeyAsString;
    }

    getSelectedTabKeyAsInt(){
        return this._selectedTabKeyAsInt;
    }

    setSelectedTabKeyAsString(key ){
        this._selectedTabKeyAsString = key;
        this._selectedTabKeyAsInt = parseInt( key );
    }

    setSelectedTabKeyAsInt( key  ){
        this._selectedTabKeyAsInt = key;
        this._selectedTabKeyAsString = key.toString();
    }

    getSelectedTabData(){
        const tabData = this._TabDataArray.find( (item) => item.getTabKeyAsInt() === this._selectedTabKeyAsInt );
        return tabData;
    }

    getTabDataCount(){
        const count = this._TabDataArray.length;
        return count;
    }

    removeSelectedTabData(){
        const iTabKey = this.getSelectedTabKeyAsInt();
        const tabIndex = this.getTabDataIndexByTabKeyAsInt( iTabKey );

        const deletedArray = this._TabDataArray.splice( tabIndex ,1 );

        //Change selected tab key
        const bDeleted = deletedArray.length !== 0;
        if( bDeleted ){
            let  newSelectedTabDataIndex;
            if( this._TabDataArray.length <= tabIndex ){
                newSelectedTabDataIndex = this._TabDataArray.length - 1;
            }
            else{
                newSelectedTabDataIndex = tabIndex;
            }
            const newSelectedTabKeyAsInt = this._TabDataArray[ newSelectedTabDataIndex ].getTabKeyAsInt();
            this.setSelectedTabKeyAsInt( newSelectedTabKeyAsInt );
        }
        return bDeleted;
    }

    getTabDataAt( index ){
        const tabData = this._TabDataArray[index];
        return tabData;
    }

    replaceTabData( index1, index2 ){
        const tabData1 = this._TabDataArray[ index1];
        const tabData2 = this._TabDataArray[ index2];
        this._TabDataArray[ index1] = tabData2;
        this._TabDataArray[ index2 ] = tabData1;
    }

    getTabDataIndexByTabKeyAsInt( tabKeyAsInt ){
        //!overhead
        let foundIndex = -1;
        for( let i = 0; i < this._TabDataArray.length; i++ ){
            const currentTabData = this._TabDataArray[i];
            const currentTabKeyAsInt = currentTabData.getTabKeyAsInt();
            if( tabKeyAsInt === currentTabKeyAsInt ){
                foundIndex = i;
                break;
            }
        }
        return foundIndex;
    }

    getTabDataByTabKeyAsInt( tabKeyAsInt  ){
        //!overhead
        let foundTabData = null;
        for( let i = 0; i < this._TabDataArray.length; i++ ){
            const currentTabData = this._TabDataArray[i];
            const currentTabKeyAsInt = currentTabData.getTabKeyAsInt();
            if( tabKeyAsInt === currentTabKeyAsInt ){
                foundTabData = currentTabData;
                break;
            }
        }
        return foundTabData;
    }

    addTab( tabTitle ){
        const tabKeyAsInt = this._createTabKeyAsInt();
        const tabData = new TabData( this, tabKeyAsInt, tabTitle );
        this._TabDataArray.push( tabData );
        return tabData;
    }

    _addTabForClone( srcTabData ){
        const tabData = new TabData( this, null, null, srcTabData );
        this._TabDataArray.push( tabData );
        return tabData;
    }

    _addTabForObject( oTab ){
        const tabData = new TabData( this, null, null, null, oTab );
        this._TabDataArray.push( tabData );
        return tabData;
    }

    insertTab( tabTitle ){
        const tabKeyAsInt = this._createTabKeyAsInt();
        const tabData = new TabData( this, tabKeyAsInt, tabTitle );
        const selectedIndex = this.getTabDataIndexByTabKeyAsInt( this.getSelectedTabKeyAsInt() );
        this._TabDataArray.splice( selectedIndex, 0,  tabData );
        return tabData;
    }

    _createTabKeyAsInt(){
        //!overhead
        const  tabKeyIndexes = new Array( this._TabDataArray.length );
        for( let i = 0; i < this._TabDataArray.length; i++ ){
            const tabData = this._TabDataArray[i];
            tabKeyIndexes[i] = tabData.getTabKeyAsInt();
        }
        let newTabKeyAsInt = -1;
        for( let i = 0; i < Number.MAX_SAFE_INTEGER ; i++ ){
            const b = tabKeyIndexes.includes(i);
            if( b === false ){
                newTabKeyAsInt = i;
                break;
            }
        }
        if( newTabKeyAsInt === -1 ){    //!warnBug overflow
            throw new Error("Tab key index overflow.");
        }
        return newTabKeyAsInt;
    }

    // getItemsForAntdTabs(){
    //     const items = new Array( this._TabDataArray.length );
    //     for( let i = 0; i < items.length; i++ ){
    //         const tabData = this._TabDataArray[i];
    //
    //     }
    // }




}