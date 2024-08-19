import React from 'react';
import LegacyButtonEditorSubWidgetSettings from "./LegacyButtonEditorSubWidgetSettings";
import i18n from "../../../../i18n";
import Input from "antd/lib/input";

export default class LegacyButtonEditorSubWidgetSettings_quickCallButton extends LegacyButtonEditorSubWidgetSettings  {

    constructor( legacyButtonEditorWidgetSettingsAsParent, legacyButtonEditorSubWidgetData  ) {
        super(  legacyButtonEditorWidgetSettingsAsParent, legacyButtonEditorSubWidgetData  );
    }

    _onChangeLabel(e){
        const label = e.currentTarget.value;
        this._LegacyButtonEditorSubWidgetData.setLabel( label  );
        this._LegacyButtonEditorWidgetSettingsAsParent.getEditScreenViewAsParent().setState({rerender:true});
    }

    _onChangeKeypadZero(e){
        const sKey = e.currentTarget.value;
        this._LegacyButtonEditorSubWidgetData.setKeypadZero( sKey  );
        this._LegacyButtonEditorWidgetSettingsAsParent.getEditScreenViewAsParent().setState({rerender:true});
    }

    _onChangeKeypadOne(e){
        const sKey = e.currentTarget.value;
        this._LegacyButtonEditorSubWidgetData.setKeypadOne( sKey  );
        this._LegacyButtonEditorWidgetSettingsAsParent.getEditScreenViewAsParent().setState({rerender:true});
    }

    _onChangeKeypadTwo(e){
        const sKey = e.currentTarget.value;
        this._LegacyButtonEditorSubWidgetData.setKeypadTwo( sKey  );
        this._LegacyButtonEditorWidgetSettingsAsParent.getEditScreenViewAsParent().setState({rerender:true});
    }

    _onChangeKeypadThree(e){
        const sKey = e.currentTarget.value;
        this._LegacyButtonEditorSubWidgetData.setKeypadThree( sKey  );
        this._LegacyButtonEditorWidgetSettingsAsParent.getEditScreenViewAsParent().setState({rerender:true});
    }

    _onChangeKeypadFour(e){
        const sKey = e.currentTarget.value;
        this._LegacyButtonEditorSubWidgetData.setKeypadFour( sKey  );
        this._LegacyButtonEditorWidgetSettingsAsParent.getEditScreenViewAsParent().setState({rerender:true});
    }

    _onChangeKeypadFive(e){
        const sKey = e.currentTarget.value;
        this._LegacyButtonEditorSubWidgetData.setKeypadFive( sKey  );
        this._LegacyButtonEditorWidgetSettingsAsParent.getEditScreenViewAsParent().setState({rerender:true});
    }

    _onChangeKeypadSix(e){
        const sKey = e.currentTarget.value;
        this._LegacyButtonEditorSubWidgetData.setKeypadSix( sKey  );
        this._LegacyButtonEditorWidgetSettingsAsParent.getEditScreenViewAsParent().setState({rerender:true});
    }

    _onChangeKeypadSeven(e){
        const sKey = e.currentTarget.value;
        this._LegacyButtonEditorSubWidgetData.setKeypadSeven( sKey  );
        this._LegacyButtonEditorWidgetSettingsAsParent.getEditScreenViewAsParent().setState({rerender:true});
    }

    _onChangeKeypadEight(e){
        const sKey = e.currentTarget.value;
        this._LegacyButtonEditorSubWidgetData.setKeypadEight( sKey  );
        this._LegacyButtonEditorWidgetSettingsAsParent.getEditScreenViewAsParent().setState({rerender:true});
    }

    _onChangeKeypadNine(e){
        const sKey = e.currentTarget.value;
        this._LegacyButtonEditorSubWidgetData.setKeypadNine( sKey  );
        this._LegacyButtonEditorWidgetSettingsAsParent.getEditScreenViewAsParent().setState({rerender:true});
    }

    _onChangeKeypadAsterisk(e){
        const sKey = e.currentTarget.value;
        this._LegacyButtonEditorSubWidgetData.setKeypadAsterisk( sKey  );
        this._LegacyButtonEditorWidgetSettingsAsParent.getEditScreenViewAsParent().setState({rerender:true});
    }

    _onChangeKeypadSharp(e){
        const sKey = e.currentTarget.value;
        this._LegacyButtonEditorSubWidgetData.setKeypadSharp( sKey  );
        this._LegacyButtonEditorWidgetSettingsAsParent.getEditScreenViewAsParent().setState({rerender:true});
    }

    //!override
    getRenderJsx() {
        const subtypeName = this._LegacyButtonEditorSubWidgetData.getLegacyButtonWidgetSubTypeName();
        let  sLabel;
        if( this._LegacyButtonEditorSubWidgetData.getLabel() ){
            sLabel = this._LegacyButtonEditorSubWidgetData.getLabel();
        }
        else{
            sLabel = "";
        }
        const  sKeypadZero = this._LegacyButtonEditorSubWidgetData.getKeypadZero() ? this._LegacyButtonEditorSubWidgetData.getKeypadZero() : "";
        const  sKeypadOne = this._LegacyButtonEditorSubWidgetData.getKeypadOne() ? this._LegacyButtonEditorSubWidgetData.getKeypadOne() : "";
        const  sKeypadTwo = this._LegacyButtonEditorSubWidgetData.getKeypadTwo() ? this._LegacyButtonEditorSubWidgetData.getKeypadTwo() : "";
        const  sKeypadThree = this._LegacyButtonEditorSubWidgetData.getKeypadThree() ? this._LegacyButtonEditorSubWidgetData.getKeypadThree() : "";
        const  sKeypadFour = this._LegacyButtonEditorSubWidgetData.getKeypadFour() ? this._LegacyButtonEditorSubWidgetData.getKeypadFour() : "";
        const  sKeypadFive = this._LegacyButtonEditorSubWidgetData.getKeypadFive() ? this._LegacyButtonEditorSubWidgetData.getKeypadFive() : "";
        const  sKeypadSix = this._LegacyButtonEditorSubWidgetData.getKeypadSix() ? this._LegacyButtonEditorSubWidgetData.getKeypadSix() : "";
        const  sKeypadSeven = this._LegacyButtonEditorSubWidgetData.getKeypadSeven() ? this._LegacyButtonEditorSubWidgetData.getKeypadSeven() : "";
        const  sKeypadEight = this._LegacyButtonEditorSubWidgetData.getKeypadEight() ? this._LegacyButtonEditorSubWidgetData.getKeypadEight() : "";
        const  sKeypadNine = this._LegacyButtonEditorSubWidgetData.getKeypadNine() ? this._LegacyButtonEditorSubWidgetData.getKeypadNine() : "";
        const  sKeypadAsterisk = this._LegacyButtonEditorSubWidgetData.getKeypadAsterisk() ? this._LegacyButtonEditorSubWidgetData.getKeypadAsterisk() : "";
        const  sKeypadSharp = this._LegacyButtonEditorSubWidgetData.getKeypadSharp() ? this._LegacyButtonEditorSubWidgetData.getKeypadSharp() : "";

        return  (
            <>
                <p>{i18n.t("label")}</p>
                <Input placeholder={i18n.t(`legacy_button_label.${subtypeName}`)} allowClear value={sLabel}
                       defaultValue={sLabel} onChange={(e) => this._onChangeLabel(e)}/>
                <p>0</p>
                <Input allowClear value={sKeypadZero} defaultValue={sKeypadZero}
                       onChange={(e) => this._onChangeKeypadZero(e)}/>
                <p>1</p>
                <Input allowClear value={sKeypadOne} defaultValue={sKeypadOne}
                       onChange={(e) => this._onChangeKeypadOne(e)}/>
                <p>2</p>
                <Input allowClear value={sKeypadTwo} defaultValue={sKeypadTwo}
                       onChange={(e) => this._onChangeKeypadTwo(e)}/>
                <p>3</p>
                <Input allowClear value={sKeypadThree} defaultValue={sKeypadThree}
                       onChange={(e) => this._onChangeKeypadThree(e)}/>
                <p>4</p>
                <Input allowClear value={sKeypadFour} defaultValue={sKeypadFour}
                       onChange={(e) => this._onChangeKeypadFour(e)}/>
                <p>5</p>
                <Input allowClear value={sKeypadFive} defaultValue={sKeypadFive}
                       onChange={(e) => this._onChangeKeypadFive(e)}/>
                <p>6</p>
                <Input allowClear value={sKeypadSix} defaultValue={sKeypadSix}
                       onChange={(e) => this._onChangeKeypadSix(e)}/>
                <p>7</p>
                <Input allowClear value={sKeypadSeven} defaultValue={sKeypadSeven}
                       onChange={(e) => this._onChangeKeypadSeven(e)}/>
                <p>8</p>
                <Input allowClear value={sKeypadEight} defaultValue={sKeypadEight}
                       onChange={(e) => this._onChangeKeypadEight(e)}/>
                <p>9</p>
                <Input allowClear value={sKeypadNine} defaultValue={sKeypadNine}
                       onChange={(e) => this._onChangeKeypadNine(e)}/>
                <p>*</p>
                <Input allowClear value={sKeypadAsterisk} defaultValue={sKeypadAsterisk}
                       onChange={(e) => this._onChangeKeypadAsterisk(e)}/>
                <p>#</p>
                <Input allowClear value={sKeypadSharp} defaultValue={sKeypadSharp}
                       onChange={(e) => this._onChangeKeypadSharp(e)}/>
            </>
        );
    }

}