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

    //!antd's ColorPicker onChange gives an AggregationColor instance (rgb values via .toRgb()),
    //!while imported/legacy data uses a plain {rgb:{r,g,b,a}} object. Support both shapes.
    static _getRgbaFromAntdColor( color ){
        if( !color ){
            return null;
        }
        if( typeof color.toRgb === "function" ){
            return color.toRgb();
        }
        return color.rgb;
    }

    static isAntdRgbaProperty( color ){
        if( !color ){
            return false;
        }
        const rgba = Util._getRgbaFromAntdColor( color );
        if( !rgba ){
            return false;
        }
        const b =  Util.isAntdRgbaColor( rgba );
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

    //!antd's ColorPicker `value` prop only accepts a color string (hex/rgb/hsl) or an
    //!AggregationColor instance, but templates/imported data may still hold the legacy
    //!{rgb,hex,hsl,hsv,source,oldHue} object saved by the old antd-colorpicker component.
    //!Passing that legacy object straight through crashes antd's internal FastColor parser,
    //!so convert it to an rgba() string first; strings and AggregationColor instances pass through untouched.
    static toAntdColorPickerValue( colorValue ){
        if( !colorValue ){
            return colorValue;
        }
        if( typeof colorValue === "string" ){
            return colorValue;
        }
        if( typeof colorValue.toHexString === "function" ){
            return colorValue;
        }
        return Util.getRgbaCSSStringFromAntdColor( colorValue, undefined );
    }

    //!antd's ColorPicker onChange fires with a live AggregationColor instance, which has no
    //!own enumerable rgb/hex fields (its data lives behind methods backed by a private
    //!metaColor). Storing that instance as-is means it round-trips through JSON as an
    //!object with no usable color data. Convert it to the plain {rgb:{r,g,b,a}} shape
    //!(the same shape the legacy antd-colorpicker component used to store) before saving.
    static fromAntdColorPickerOnChange( color ){
        if( !color ){
            return null;
        }
        const rgba = Util._getRgbaFromAntdColor( color );
        if( Util.isAntdRgbaColor( rgba ) !== true ){
            return null;
        }
        return { rgb: rgba };
    }

    static getRgbaCSSStringFromAntdColor( antdColor, defaultRgbaCSSString  ){
        if( !antdColor ){
            return defaultRgbaCSSString;
        }
        const rgba = Util._getRgbaFromAntdColor( antdColor );
        if( Util.isAntdRgbaColor( rgba ) !== true ){
            return defaultRgbaCSSString;
        }
        return "rgba(" + rgba.r + "," + rgba.g + "," + rgba.b + "," + rgba.a + ")";
    }

    static removeItemFromArray( array, item ){
        const index = array.indexOf(item );
        // let index = -1;
        // for( let i = 0; i < array.length; i++ ){
        //     const currentItem = array[i];
        //     if( currentItem === item ){
        //         index = i;
        //         break;
        //     }
        // }

        if( index !== -1 ){
            array.splice(index, 1);
        }
        return index;
    }

    static removeString( s , tgt ){
        if( !tgt ){
            return s;
        }
        const index = s.indexOf( tgt );
        if( index === -1 ){
            return s;
        }
        const str = s.substring(0,index) +  s.substring( index + tgt.length );
        return str;
    }

    //Does not end with a slash
    static getRootUrlString(){
        let  sRootUrl = location.href;
        sRootUrl = Util.removeString( sRootUrl,  location.search );
        const indexOfSlash = sRootUrl.lastIndexOf('/');
        if( indexOfSlash !== -1 ) {
            const indexOfDot = sRootUrl.lastIndexOf(".", indexOfSlash);
            if (indexOfDot !== -1) {
                sRootUrl = sRootUrl.substring(0, indexOfSlash  );
            }
        }
        return sRootUrl;
    }

    static getHeadResposneCodeByUrl(url, xhr ) {
        if( !xhr ) {
            xhr = new XMLHttpRequest();
        }
        xhr.open('HEAD', url, false);
        xhr.send();
        return xhr.status;
    }
}
