import React, {useRef, useEffect} from "react";

export const VideoCallDivPlayer = ({stream, ...props}) =>{
    const ref = useRef();

    useEffect( () => {
        if( !ref.current || !stream ){
            return;
        }
        ref.current.srcObject = stream;
        ref.current.play();
    }, [stream] );

    const jsx = <video ref={ref} {...props} />
    return jsx;
}