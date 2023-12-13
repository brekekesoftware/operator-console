class UccacUtil {
    static findElementByAttributeNameToParent( eChild, attrName ){
        let e;
        while( ( e = eChild.parentElement ) != null ) {
            const b = e.hasAttribute( attrName );
            if( b ){
                return e;
            }
            eChild = e;
        }
    }
}