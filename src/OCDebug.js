//Debug log of the communication with PBX and the initialization steps.
//Enabled by default. Disable with "?debug=0" in the URL or localStorage "brOcDebug" = "0".
let enabled = true;
try {
    const param = new URLSearchParams( window.location.search ).get( "debug" );
    if( param === "0" || window.localStorage.getItem( "brOcDebug" ) === "0" ){
        enabled = false;
    }
}
catch( err ){
    //keep enabled
}

export default class OCDebug {
    static isEnabled(){
        return enabled;
    }

    //Never pass passwords, tokens or response bodies.
    static log( ...args ){
        if( enabled ){
            console.log( "[OC]", ...args );
        }
    }
}
