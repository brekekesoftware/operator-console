import React from 'react';
import Button from "antd/lib/button";
import i18n from "../../../i18n";
import Popconfirm from "antd/lib/popconfirm";
import {Modal} from "antd";

//!abstract
export default class EditorWidgetSettings extends React.Component {
    constructor( props ) {
        super( props );
        this._EditScreenViewAsParent = props["editScreenViewAsParent"];
    }

    _getWidgetData(){
        return this.props["widgetData"];
    }

    _getRenderMainJsx(){
        throw new Error("Not implemented.");
        return null;
    }

    componentDidUpdate(){
        //empty( for subclass )
    }

    componentDidMount(){
        //empty( for subclass )
    }

    getEditScreenViewAsParent(){
        return this._EditScreenViewAsParent;
    }

    render() {
        const widgetData = this._getWidgetData();
        const widgetNameForII18n = widgetData.getWidgetNameForI18n();
        const jsx = (
            <>
                <div style={{padding: "12px 12px 0px 12px"}}>{i18n.t(`widget_description.${widgetNameForII18n}`)}</div>
                <div style={{
                    overflowY: 'auto',
                    flexGrow: "1",
                    height: "0px", /* height:0 is for show scrollbar */
                    paddingLeft: 12,
                    paddingRight: 12
                }}>
                    {this._getRenderMainJsx()}
                </div>
                <div style={{padding: "0px 12px 12px 12px"}}>
                    {/*<Button type="secondary"*/}
                    {/*        onClick={() => this.duplicateWidget(this.state.selectingWidgetIndex)}>*/}
                    {/*    {i18n.t("duplicate")}*/}
                    {/*</Button>*/}
                    <Popconfirm title={i18n.t("are_you_sure")}
                                onConfirm={() => this._EditScreenViewAsParent.onConfirmOkRemoveEditorWidget( widgetData ) }
                                okText={i18n.t("yes")}
                                cancelText={i18n.t("no")}
                    >
                        <Button type="danger">{i18n.t("remove")}</Button>
                    </Popconfirm>
                </div>
            </>
        );
        return jsx;
    }
}