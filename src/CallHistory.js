const _CallHistory_LOCAL_STORAGE_KEY_PREFIX = "com.brekeke.operatorconsole.callhistory.";

const DEFAULT_MAX_DISPLAY_COUNT = 500;
const DEFAULT_MAX_SAVE_COUNT = 3000;
export class CallHistory {

    constructor(operatorConsoleAsParent ) {
        this._Parent = operatorConsoleAsParent;
        this._LocalstorageKey = this._getLocalStorageKey();
        this._clear();
        //window.localStorage.removeItem( _LOCAL_STORAGE_KEY ); //!temp //!dev
    }

    _getLocalStorageKey(){
        let tenant = this._Parent.getLoggedinTenant();
        if( !tenant ){
            tenant = "";
        }
        const user = this._Parent.getLoggedinUsername();
        const key = _CallHistory_LOCAL_STORAGE_KEY_PREFIX + tenant + "." + user;
        return key;
    }

    _clear() {
        this._callNos = [];
        this._sortedCallNos = [];
    }

    clearAndSave(){
        window.localStorage.removeItem( this._LocalstorageKey  );
        this._clear();
    }

    onSavingSystemSettings( operatorConsoleAsCaller ){
        const newSettings = operatorConsoleAsCaller.getSystemSettingsData();
        const callNoCount = newSettings.getAutoDialMaxSaveCount();
        this._sortedCallNos = CallHistory._createSortedScoreCallNos( this._callNos, callNoCount, newSettings.getAutoDialMaxDisplayCount() );
    }

    load(){
        const sCallNos = window.localStorage.getItem( this._LocalstorageKey  );
        if( !sCallNos ){
            this._clear();
            console.log("CallHistory loaded. Call history is empty.");
            return;
        }

        const callNos = sCallNos.split(',');

        this._callNos = callNos;
        const settings = this._Parent.getSystemSettingsData();
        this._sortedCallNos = CallHistory._createSortedScoreCallNos( this._callNos, settings.getAutoDialMaxSaveCount(), settings.getAutoDialMaxDisplayCount() );
        console.log("CallHistory loaded. Call no count=" + this._sortedCallNos.length );

    }


    static getDefaultMaxDisplayCount(){
        return DEFAULT_MAX_DISPLAY_COUNT;
    }

    static getDefaultMaxSaveCount(){
        return DEFAULT_MAX_SAVE_COUNT;
    }

    //
    // static _createSortedScoreAndAscCallNos( callNos, maxSaveCount, maxDisplayCount ){
    //     //const scoreCallNos = CallHistory._createSortedScoreCallNos( callNos, maxSaveCount, maxDisplayCount );
    //     const countCallNosMap = {};    //{score(number):callnos[] }
    //
    //     const ascCallNos = [];
    //     let prevScore = -1;
    //     for( let i = 0; i < scoreCallNos.length; i++ ){
    //         const scoreCallNo = scoreCallNos[i];
    //
    //     }
    //
    // }

    static _createScoreDescDictAscCallNos( callNos, maxSaveCount, maxDisplayCount ){
        //Create <callNo,currentScore>
        const callNoScoreMap = CallHistory._createCallNoScoreMap( callNos, maxSaveCount );
        //Create <callNo,currentScore> Desc ordered by score
        const callNoDescScoreMap = new Map([...callNoScoreMap.entries()].sort((a, b) => b[1] - a[1] ));

        const scoreDescDictAscCallNos = [];
        let latestScore = -1;
        const latestDictAscCallNos = [];
        callNoDescScoreMap.forEach((currentScore, callNo) => {
            if( currentScore !== latestScore ){
                //sort
                latestDictAscCallNos.sort();
                scoreDescDictAscCallNos.push( ...latestDictAscCallNos );

                latestDictAscCallNos.splice(0); //clear
                latestScore = currentScore;
            }
            latestDictAscCallNos.push( callNo );
        });

        return scoreDescDictAscCallNos;
    }

    static _createCallNoScoreMap( callNos, maxSaveCount ){
        const callNoCount = callNos.length;
        const callNoScoreMap = {};  //<callNo,currentScore>
        //adds score
        for( let i = 0; i < callNoCount; i++ ){
            const callNo = callNos[i];
            const scorePoint = maxSaveCount - i;

            let score = callNoScoreMap[ callNo ];
            if( !score ){
                score = 0;
            }
            score += scorePoint;
            callNoScoreMap[ callNo ] = score;
        }
        return callNoScoreMap;
    }

    static _createSortedScoreCallNos(callNos, maxSaveCount, maxDisplayCount ){
        const callNoCount = callNos.length;
        const callNoScoreMap = {};  //<callNo,currentScore>
        //adds score
        for( let i = 0; i < callNoCount; i++ ){
            const callNo = callNos[i];
            const scorePoint = maxSaveCount - i;

            let score = callNoScoreMap[ callNo ];
            if( !score ){
                score = 0;
            }
            score += scorePoint;
            callNoScoreMap[ callNo ] = score;
        }

        //sort

        const entries = Object.entries(callNoScoreMap);
        const sortedArray = entries.sort(([,a],[,b]) => b-a);
        let sortedSingleArray = sortedArray.map( itm => itm[0] );

        //slice
        if( sortedSingleArray.length > maxDisplayCount ){
            sortedSingleArray = sortedSingleArray.slice( 0, maxDisplayCount );
        }


        return sortedSingleArray;
    }



    _save(){
        // const sCallNos = this._callNos.reduce( ( lastValue, currentValue ) => {
        //     if( !lastValue ){
        //         return currentValue;
        //     }
        //     return currentValue + ',' + lastValue;
        // },"");

        let sCallNos = "";
        for( let i = 0; i < this._callNos.length; i++ ){
            sCallNos += this._callNos[i] + ",";
        }
        if( sCallNos ){
            sCallNos = sCallNos.substring( 0, sCallNos.length - 1 );
        }

        window.localStorage.setItem( this._LocalstorageKey , sCallNos );
    }

    addCallNoAndSave( callNo ){
        const saveCount = this._Parent.getSystemSettingsData().getAutoDialMaxSaveCount();
        while( this._callNos.length >= saveCount ){
            this._callNos.pop();
        }
        this._callNos.unshift( callNo );
        this._sortedCallNos = CallHistory._createSortedScoreCallNos( this._callNos, saveCount, this._Parent.getSystemSettingsData().getAutoDialMaxDisplayCount()  );

        this._save();
    }

    getSortedCallNos(){
        return this._sortedCallNos;
    }

    // _getMaxDisplayCount(){
    //     const systemSettingsData = this._Parent.getSystemSettingsData();
    //     const count =systemSettingsData.getAutoDialMaxDisplayCount();
    //     if( count ){
    //         return count;
    //     }
    //     return DEFAULT_MAX_DISPLAY_COUNT;
    // }
    //
    // _getMaxSaveCount(){
    //     const count = this._Parent.state.systemSettingsAppData?.autoDialMaxSaveCount;
    //     if( count ){
    //         return count;
    //     }
    //     return DEFAULT_MAX_SAVE_COUNT;
    // }

}