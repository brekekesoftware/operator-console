
class ObjectUrlCache{
    constructor( cachesAsParent, obj, id, timelimitMillis ) {
		this._Parent = cachesAsParent;
		this._Obj = obj;
		this._Id = id;
        const objectUrl = URL.createObjectURL( obj );
        this._ObjectUrl = objectUrl;
        this.setTimelimitMillis( timelimitMillis );
    }
	
	getId(){
		return this._Id;
	}

    getObjectUrl(){
        const objectUrl = this._ObjectUrl;
        return objectUrl;
    }
	
	getObj(){
		return this._Obj;
	}

    getTimelimitMillis(){
        return this._timelimitMillis;
    }

    setTimelimitMillis( timelimitMillis ){
		if( !!this._timeoutId ){
			clearTimeout( this._timeoutId );
		}       
		this._timeoutId = setTimeout( () =>{
			//URL.revokeObjectURL( this._ObjectUrl );
			//this._Parent.onObjectUrlCacheTimelimited(this);
			this._timeoutId = undefined;
			this._release();
		}, timelimitMillis );
		this._timelimitMillis = timelimitMillis;
    }
	
    _release(){
        URL.revokeObjectURL( this._ObjectUrl );
        if( !!this._timeoutId ){
			clearTimeout( this._timeoutId );
            this._timeoutId = undefined;
			//this._Parent.onObjectUrlCacheReleased(this);
        }
		const bSuccess = this._Parent.onObjectUrlCacheReleased(this);
        return bRelease;
    }


}

export default class ObjectUrlCaches{

    constructor() {
        this._Caches = {};  //{objId(string):ObjectUrlCache}
    }

    createObjectUrlCache( obj, objId, timelimit ){
		const bDelete = this.deleteObjectUrlCache( objId );
        const cacheCreate = new ObjectUrlCache( this, obj, objId, timelimit );
		this._Caches[objId] = cacheCreate;
		return cacheCreate;
    }

    getObjectUrlCacheArray() {
        const ar =  Object.freeze( Object.values(this._Caches));
        return ar;
    }

    getObjectUrlCache( objId ){
		const cache = this._Caches[objId];
		return cache;
    }
	
	deleteObjectUrlCache( objId ){
		const cacheExist = this._Caches[objId];
		const bExist = !!cacheExist;
		if( !bExist ){
			return false;
		}
		cacheExist._release();
		const bSuccess = delete this._Caches[objId];
		return bSuccess;
	}

    clearObjectUrlCaches(){
        for (const keyObjId in this._Caches) {
            const cache = this._Caches[keyObjId];
            cache._release();
            //delete this._Caches[keyObj];
        }
    }
	
	//nObjectUrlCacheTimelimited( objectUrlCacheAsCaller ){
	//	objectUrlCacheAsCaller._release();
	//}
	
	onObjectUrlCacheReleased( objectUrlCacheAsCaller ){
		const objId = objectUrlCacheAsCaller.getId();
		const bSuccess = delete this._Caches[objId];
		return bSuccess;
	}
}