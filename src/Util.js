export default class Util{

    static isNumber(val){
        const b = /^\d+$/.test(val);
        return b;
    }


    static isNumeric(value) {
        return /^-?\d+(\.\d+)?$/.test(value);   //0.5
    }

    static isHex6( val ) {
        return /^#[0-9A-F]{6}$/i.test( val );    //#AABBCC
    }

    static isHex8( val ){
        return /^#[0-9A-F]{6}[0-9a-f]{0,2}$/i.test(val )  //#AABBCC80
    }

    static getRgbaCSSStringFromHex6(hex){
        let c;
        if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
            c= hex.substring(1).split('');
            if(c.length== 3){
                c= [c[0], c[0], c[1], c[1], c[2], c[2]];
            }
            c= '0x'+c.join('');
            return 'rgba('+[(c>>16)&255, (c>>8)&255, c&255].join(',')+',1)';
        }
        else{
            return null;
        }
    }

    static getAntdRgbColorFromHex6(hex){
        let c;
        if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
            c= hex.substring(1).split('');
            if(c.length== 3){
                c= [c[0], c[0], c[1], c[1], c[2], c[2]];
            }
            c= '0x'+c.join('');

            const r = (c>>16)&255;
            const g = (c>>8)&255;
            const b = c&255;
            const antdRgbColor = { rgb:{ r: r, g : g, b: b, a: 1  } };
            return antdRgbColor;
        }
        else{
            return null;
        }
    }

    static isAntdRgbaProperty( color ){
        if( !color ){
            return false;
        }
        if( !color.rgb ){
            return false;
        }
        const b =  Util.isAntdRgbaColor(color.rgb  );
        return b;
    }

     static isAntdRgbaColor( rgba ){
        if( !rgba ){
            return false;
        }
        if( Util.isNumber( rgba.r ) !== true || rgba.r <  0 || rgba.r > 255 ){ //0~255
            return false;
        }
         if( Util.isNumber( rgba.g ) !== true || rgba.g <  0 || rgba.g > 255 ){ //0~255
             return false;
         }
         if( Util.isNumber( rgba.b ) !== true || rgba.b <  0 || rgba.b > 255 ){ //0~255
             return false;
         }
         if( Util.isNumeric( rgba.a ) !== true || rgba.a <  0.0 || rgba.a > 1.0  ){ //0.0~1.0
             return false;
         }

         return true;
    }

    static getRgbaCSSStringFromAntdColor( antdColor, defaultRgbaCSSString  ){
        if( !antdColor ){
            return defaultRgbaCSSString;
        }
        const rgba = antdColor.rgb;
        if( Util.isAntdRgbaColor( rgba ) !== true ){
            return defaultRgbaCSSString;
        }
        return "rgba(" + rgba.r + "," + rgba.g + "," + rgba.b + "," + rgba.a + ")";
    }

}

