import WidgetDatasForTabs from "./WidgetDatasForTabs";

export default class TabData{

    constructor( tabDatasAsParent, tabKeyAsInt, tabTitle, srcTabData, oTab, dataVersion = null   ) {
        if( srcTabData ){
            this._tabLabel = srcTabData.getTabLabel();
            this._TabKeyAsInt = srcTabData.getTabKeyAsInt();
            this._TabKeyAsString = srcTabData.getTabKeyAsString();
			this._tabForegroundColor = srcTabData._tabForegroundColor;
			this._tabBackgroundColor = srcTabData._tabBackgroundColor;
			this._tabBackgroundImageBase64DataUrl = srcTabData._tabBackgroundImageBase64DataUrl;			
            this._WidgetDatas = new WidgetDatasForTabs(this, srcTabData._WidgetDatas );
        }
        else if( oTab ){
            this._tabLabel = oTab["tabLabel"];
            this._TabKeyAsInt = oTab["tabKeyAsInt"];
            this._TabKeyAsString = this._TabKeyAsInt.toString();
			this._tabForegroundColor = oTab["tabForegroundColor"];
			this._tabBackgroundColor = oTab["tabBackgroundColor"];
			this._tabBackgroundImageBase64DataUrl = oTab["tabBackgroundImageBase64DataUrl"];
            this._WidgetDatas = new WidgetDatasForTabs(this, null, oTab["widgetDatas"], dataVersion );
        }
        else {
            this._tabLabel = tabTitle;
            this._TabKeyAsString = tabKeyAsInt.toString();
            this._TabKeyAsInt = tabKeyAsInt;
			//this._tabForegroundColor = null;
			//this._tabBackgroundColor = null;
			//this._tabBackgroundImageBase64DataUrl = null;
            this._WidgetDatas = new WidgetDatasForTabs(this);
        }
    }

    setTabDataToObject(o){
        o["tabLabel"] = this._tabLabel;
        o["tabKeyAsInt"] = this._TabKeyAsInt;
		o["tabForegroundColor"] = this._tabForegroundColor;
		o["tabBackgroundColor"] = this._tabBackgroundColor;
		o["tabBackgroundImageBase64DataUrl"] = this._tabBackgroundImageBase64DataUrl;
        const oWidgetDatas = new Object();
        this._WidgetDatas.setWidgetDatasForTabsToObject( oWidgetDatas );
        o["widgetDatas"] = oWidgetDatas;
    }

    getTabKeyAsInt(){
        return this._TabKeyAsInt;
    }

    getTabKeyAsString(){
        return this._TabKeyAsString;
    }

    getTabLabel(){
        return this._tabLabel;
    }

    setTabLabel( s ){
        this._tabLabel = s;
    }

    getWidgetDatas(){
        return this._WidgetDatas;
    }
	
	setTabForegroundColor( s ){
		this._tabForegroundColor = s;
	}
	
	getTabForegroundColor(){
		return this._tabForegroundColor;
	}
	
	setTabBackgroundColor( s ){
		this._tabBackgroundColor = s;
	}
	
	getTabBackgroundColor(){
		return this._tabBackgroundColor;
	}
			
	setTabBackgroundImageBase64DataUrl( base64DataUrl ){
		this._tabBackgroundImageBase64DataUrl = base64DataUrl;
	}
	
	getTabBackgroundImageBase64DataUrl(){
		return this._tabBackgroundImageBase64DataUrl;
	}
	
	deleteTabBackgroundImageBase64DataUrl(){
		this._tabBackgroundImageBase64DataUrl = null;
	}
	
}