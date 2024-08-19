import WidgetDataFactory from "./widgetData/WidgetDataFactory";
import { v4 as uuidv4 } from 'uuid';
import i18n from "../i18n";
import WidgetData from "./widgetData/WidgetData";

//!abstract class
export default class WidgetDatas{
  constructor( cloneSrcWidgetDatas, oWidgetDatas  ) {
    this._WidgetDataArray = new Array();    //WidgetData
    this._latestWidgetDataNo = -1;
    if( cloneSrcWidgetDatas ) {    //clone
      const srcWidgetDataArray = cloneSrcWidgetDatas._WidgetDataArray;
      for( let i = 0; i < srcWidgetDataArray.length; i++ ){
        const srcWidgetData = srcWidgetDataArray[i];
        const options = new Object();
        srcWidgetData.setWidgetDataToObject( options, this  );

        // const options = {
        //     widgetDatasAsParent: this,
        //     widgetNumber:srcWidgetData.getWidgetNumber(),
        //     widgetTypeId:srcWidgetData.getWidgetTypeId(),
        //     widgetRelativePositionX: srcWidgetData.getWidgetRelativePositionX(),
        //     widgetRelativePositionY:srcWidgetData.getWidgetRelativePositionY(),
        //     widgetWidth:srcWidgetData.getWidgetWidth(),
        //     widgetHeight:srcWidgetData.getWidgetHeight()
        // }

        const dstWidgetData = WidgetDataFactory.getStaticWidgetDataFactoryInstance().newWidgetDataInstance( options );

        const widgetNumber = dstWidgetData.getWidgetNumber();
        if(  widgetNumber > this._latestWidgetDataNo ){
          this._latestWidgetDataNo = widgetNumber;
          this._WidgetDataArray.length = this._latestWidgetDataNo + 1;
        }

        this._WidgetDataArray[ widgetNumber ] = dstWidgetData;
      }
    }
    else if( oWidgetDatas ) {
      const oWidgetDataArray = oWidgetDatas["widgetDataArray"];
      for (let i = 0; i < oWidgetDataArray.length; i++) {
        const oWidgetData = oWidgetDataArray[i];
        // const options = {
        //     widgetDatasAsParent:this,
        //     oWidgetData:oWidgetData
        // }
        const options = {...oWidgetData };
        options["widgetDatasAsParent"] = this;

        const widgetData = WidgetDataFactory.getStaticWidgetDataFactoryInstance().newWidgetDataInstance( options );
        const widgetNumber = widgetData.getWidgetNumber();
        this._WidgetDataArray.push( widgetData );
        if(  widgetNumber > this._latestWidgetDataNo ){
          this._latestWidgetDataNo = widgetNumber;
        }
      }
    }
  }

  getWidgetDataArray(){
    return this._WidgetDataArray;
  }

  getWidgetDataAt( index ){
    const widgetData = this._WidgetDataArray[ index ];
    return widgetData;
  }

  removeWidgetDataByWidgetData( widgetData ){
    const index = this.getWidgetIndex( widgetData );
    if( index === -1 ){
      return false;
    }
    const widgetNumber = widgetData.getWidgetNumber();
    if(  widgetNumber ==  this._latestWidgetDataNo ){
      this._latestWidgetDataNo = widgetNumber - 1;
    }
    this._WidgetDataArray.splice( index, 1 );
    return true;
  }

  getWidgetIndex( widgetData ){
    const index = this._WidgetDataArray.findIndex( (item) => item == widgetData );
    return index;
  }

  _addWidgetData( widgetDatasAsParent, widgetTypeId, widgetRelativePositionX, widgetRelativePositionY, widgetWidth, widgetHeight  ){
    this._latestWidgetDataNo++;

    const options = {
      widgetDatasAsParent:widgetDatasAsParent,
      widgetUuid : uuidv4(),
      widgetTypeId:widgetTypeId,
      widgetNumber:this._latestWidgetDataNo,
      widgetRelativePositionX:widgetRelativePositionX,
      widgetRelativePositionY:widgetRelativePositionY,
      widgetWidth:widgetWidth,
      widgetHeight:widgetHeight
    };

    //Set default value
    switch( widgetTypeId ){
      case WidgetData.WIDGET_TYPE_IDS.text:
        options["text"] = i18n.t("text");
        break;
    }


    const widgetData = WidgetDataFactory.getStaticWidgetDataFactoryInstance().newWidgetDataInstance( options );
    if( !widgetData ){  //failed
      return widgetData;
    }
    this._WidgetDataArray.push( widgetData );
    return widgetData;
  }

  removeWidgetDataAt( index ){
    //update latestWidgetDataNo
    const widgetData =this._WidgetDataArray[ index ];
    const widgetNumber = widgetData.getWidgetNumber();
    this._WidgetDataArray.splice( index, 1 );
    if( widgetNumber === this._latestWidgetDataNo ){
      this._latestWidgetDataNo = widgetNumber;
    }
  }

  getWidgetDataCount(){
    return this._WidgetDataArray.length;
  }

  addWidgetData( widgetTypeId, widgetRelativePositionX, widgetRelativePositionY, widgetWidth, widgetHeight  ){
    const data = this._addWidgetData( this, widgetTypeId, widgetRelativePositionX, widgetRelativePositionY, widgetWidth, widgetHeight );
    return data;
  }

  // setIndexToLastByWidgetIndex( widgetIndex ){
  //     const widgetData = this._WidgetDataArray[ widgetIndex ];
  //     this._WidgetDataArray.splice( widgetIndex, 1 );
  //     this._WidgetDataArray.push( widgetData );
  // }

  setIndexToLastByWidgetData( widgetData ){
    const widgetIndex = this._WidgetDataArray.findIndex( (item) => item === widgetData );
    this._WidgetDataArray.splice( widgetIndex, 1 );
    this._WidgetDataArray.push( widgetData );
  }


  _setWidgetDatasToObject(o){
    o["latestWidgetDataNo"] = this._latestWidgetDataNo;
    const dstWidgetDataArray = new Array( this._WidgetDataArray.length );
    o["widgetDataArray"] = dstWidgetDataArray;
    for( let i = 0; i < this._WidgetDataArray.length; i++ ){
      const srcWidgetData = this._WidgetDataArray[i];
      const oWidgetData = new Object();
      srcWidgetData.setWidgetDataToObject( oWidgetData );
      dstWidgetDataArray[i] = oWidgetData;
    }
  }

}