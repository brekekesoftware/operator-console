import WidgetData from "./WidgetData";

export default class LegacyUccacWidgetData extends WidgetData {
    constructor(options) {
        super(options);
        this._uccacwidgetFgColor = options["uccacwidgetFgColor"];
        this._uccacwidgetBgColor = options["uccacwidgetBgColor"];
        this._borderRadius = options["borderRadius"];
        this._insideShadow_horizontalOffset = options["insideShadow_horizontalOffset"];
        this._insideShadow_verticalOffset = options["insideShadow_verticalOffset"];
        this._insideShadow_blur = options["insideShadow_blur"];
        this._insideShadow_spread = options["insideShadow_spread"];
        this._insideShadow_color = options["insideShadow_color"];
        this._outsideShadow_horizontalOffset = options["outsideShadow_horizontalOffset"];
        this._outsideShadow_verticalOffset = options["outsideShadow_verticalOffset"];
        this._outsideShadow_blur = options["outsideShadow_blur"];
        this._outsideShadow_spread = options["outsideShadow_spread"];
        this._outsideShadow_color = options["outsideShadow_color"];
    }

    //!override
    setWidgetDataToObjectMain(o) {
        if (this._uccacwidgetFgColor) {
            o["uccacwidgetFgColor"] = this._uccacwidgetFgColor;
        } else {
            delete o["uccacwidgetFgColor"];
        }

        if (this._uccacwidgetBgColor) {
            o["uccacwidgetBgColor"] = this._uccacwidgetBgColor;
        } else {
            delete o["uccacwidgetBgColor"];
        }

        if (this._borderRadius || this._borderRadius === 0) {
            o["borderRadius"] = this._borderRadius;
        } else {
            delete o["borderRadius"];
        }

        if (this._insideShadow_horizontalOffset || this._insideShadow_horizontalOffset === 0) {
            o["insideShadow_horizontalOffset"] = this._insideShadow_horizontalOffset;
        } else {
            delete o["insideShadow_horizontalOffset"];
        }

        if (this._insideShadow_verticalOffset || this._insideShadow_verticalOffset === 0) {
            o["insideShadow_verticalOffset"] = this._insideShadow_verticalOffset;
        } else {
            delete o["insideShadow_verticalOffset"];
        }

        if (this._insideShadow_blur || this._insideShadow_blur === 0) {
            o["insideShadow_blur"] = this._insideShadow_blur;
        } else {
            delete o["insideShadow_blur"];
        }

        if (this._insideShadow_spread || this._insideShadow_spread === 0) {
            o["insideShadow_spread"] = this._insideShadow_spread;
        } else {
            delete o["insideShadow_spread"];
        }

        if (this._insideShadow_color) {
            o["insideShadow_color"] = this._insideShadow_color;
        } else {
            delete o["insideShadow_color"];
        }

        if (this._outsideShadow_horizontalOffset || this._outsideShadow_horizontalOffset === 0) {
            o["outsideShadow_horizontalOffset"] = this._outsideShadow_horizontalOffset;
        } else {
            delete o["outsideShadow_horizontalOffset"];
        }

        if (this._outsideShadow_verticalOffset || this._outsideShadow_verticalOffset === 0) {
            o["outsideShadow_verticalOffset"] = this._outsideShadow_verticalOffset;
        } else {
            delete o["outsideShadow_verticalOffset"];
        }

        if (this._outsideShadow_blur || this._outsideShadow_blur === 0) {
            o["outsideShadow_blur"] = this._outsideShadow_blur;
        } else {
            delete o["outsideShadow_blur"];
        }

        if (this._outsideShadow_spread || this._outsideShadow_spread === 0) {
            o["outsideShadow_spread"] = this._outsideShadow_spread;
        } else {
            delete o["outsideShadow_spread"];
        }

        if (this._outsideShadow_color) {
            o["outsideShadow_color"] = this._outsideShadow_color;
        } else {
            delete o["outsideShadow_color"];
        }

    }

    getUccacwidgetFgColor() {
        return this._uccacwidgetFgColor;
    }

    setUccacwidgetFgColor(color) {
        this._uccacwidgetFgColor = color;
    }

    getUccacwidgetBgColor() {
        return this._uccacwidgetBgColor;
    }

    setUccacwidgetBgColor(color) {
        this._uccacwidgetBgColor = color;
    }

    getBorderRadius() {
        return this._borderRadius;
    }

    setBorderRadius(n) {
        this._borderRadius = n;
    }

    getInsideShadow_horizontalOffset() {
        return this._insideShadow_horizontalOffset;
    }

    setInsideShadow_horizontalOffset(n) {
        this._insideShadow_horizontalOffset = n;
    }

    getInsideShadow_verticalOffset() {
        return this._insideShadow_verticalOffset;
    }

    setInsideShadow_verticalOffset(n) {
        this._insideShadow_verticalOffset = n;
    }

    getInsideShadow_blur() {
        return this._insideShadow_blur;
    }

    setInsideShadow_blur(n) {
        this._insideShadow_blur = n;
    }

    getInsideShadow_spread() {
        return this._insideShadow_spread;
    }

    setInsideShadow_spread(n) {
        this._insideShadow_spread = n;
    }

    getInsideShadow_color() {
        return this._insideShadow_color;
    }

    setInsideShadow_color(color) {
        this._insideShadow_color = color;
    }

    getOutsideShadow_horizontalOffset() {
        return this._outsideShadow_horizontalOffset;
    }

    setOutsideShadow_horizontalOffset(n) {
        this._outsideShadow_horizontalOffset = n;
    }

    getOutsideShadow_verticalOffset() {
        return this._outsideShadow_verticalOffset;
    }

    setOutsideShadow_verticalOffset(n) {
        this._outsideShadow_verticalOffset = n;
    }

    getOutsideShadow_blur() {
        return this._outsideShadow_blur;
    }

    setOutsideShadow_blur(n) {
        this._outsideShadow_blur = n;
    }

    getOutsideShadow_spread() {
        return this._outsideShadow_spread;
    }

    setOutsideShadow_spread(n) {
        this._outsideShadow_spread = n;
    }

    getOutsideShadow_color() {
        return this._outsideShadow_color;
    }

    setOutsideShadow_color(color) {
        this._outsideShadow_color = color;
    }

    //!override
    importFromWidget_ver0_1(widget_ver0_1) {
        if( widget_ver0_1.borderRadius ){
            this._borderRadius = widget_ver0_1.borderRadius;
        }
        if( widget_ver0_1.insideShadow_blur ){
            this._insideShadow_blur = widget_ver0_1.insideShadow_blur;
        }
        if( widget_ver0_1.insideShadow_color ){
            this._insideShadow_color = widget_ver0_1.insideShadow_color;
        }
        if( widget_ver0_1.insideShadow_horizontalOffset ){
            this._insideShadow_horizontalOffset = widget_ver0_1.insideShadow_horizontalOffset;
        }
        if( widget_ver0_1.insideShadow_spread ){
            this._insideShadow_spread = widget_ver0_1.insideShadow_spread;
        }
        if( widget_ver0_1.insideShadow_verticalOffset ){
            this._insideShadow_verticalOffset  = widget_ver0_1.insideShadow_verticalOffset;
        }
        if( widget_ver0_1.outsideShadow_blur ){
            this._outsideShadow_blur = widget_ver0_1.outsideShadow_blur;
        }
        if( widget_ver0_1.outsideShadow_color ){
            this._outsideShadow_color = widget_ver0_1.outsideShadow_color;
        }
        if( widget_ver0_1.outsideShadow_horizontalOffset ){
            this._outsideShadow_horizontalOffset = widget_ver0_1.outsideShadow_horizontalOffset;
        }
        if( widget_ver0_1.outsideShadow_spread ){
            this._outsideShadow_spread = widget_ver0_1.outsideShadow_spread;
        }
        if( widget_ver0_1.outsideShadow_verticalOffset ){
            this._outsideShadow_verticalOffset = widget_ver0_1.outsideShadow_verticalOffset;
        }
        if( widget_ver0_1.uccacwidgetBgColor ){
            this._uccacwidgetBgColor = widget_ver0_1.uccacwidgetBgColor;
        }
        if( widget_ver0_1.uccacwidgetFgColor ){
            this._uccacwidgetFgColor = widget_ver0_1.uccacwidgetFgColor;
        }
    }

    //!override
    loadFromWidgetSettingsTemplateMain( wst, bIncludeButtonFunction = undefined ){
        if( wst.isWidgetSettingsTemplateFieldExists( WidgetData.WIDGET_FIELD_NAME_FG_COLOR ) === true ) {
            this._uccacwidgetFgColor = wst.getWidgetSettingsTemplateFieldValue(WidgetData.WIDGET_FIELD_NAME_FG_COLOR);
        }
        if( wst.isWidgetSettingsTemplateFieldExists( WidgetData.WIDGET_FIELD_NAME_BG_COLOR ) === true ) {
            this._uccacwidgetBgColor = wst.getWidgetSettingsTemplateFieldValue(WidgetData.WIDGET_FIELD_NAME_BG_COLOR);
        }
        if( wst.isWidgetSettingsTemplateFieldExists( WidgetData.WIDGET_FIELD_NAME_BORDER_RADIUS ) === true ) {
            this._borderRadius = wst.getWidgetSettingsTemplateFieldValue(WidgetData.WIDGET_FIELD_NAME_BORDER_RADIUS);
        }

        if( wst.isWidgetSettingsTemplateFieldExists( WidgetData.WIDGET_FIELD_NAME_INSIDE_SHADOW_HORIZONTAL_OFFSET ) === true ) {
            this._insideShadow_horizontalOffset = wst.getWidgetSettingsTemplateFieldValue(WidgetData.WIDGET_FIELD_NAME_INSIDE_SHADOW_HORIZONTAL_OFFSET);
        }
        if( wst.isWidgetSettingsTemplateFieldExists( WidgetData.WIDGET_FIELD_NAME_INSIDE_SHADOW_VERTICAL_OFFSET ) === true ) {
            this._insideShadow_verticalOffset = wst.getWidgetSettingsTemplateFieldValue(WidgetData.WIDGET_FIELD_NAME_INSIDE_SHADOW_VERTICAL_OFFSET);
        }
        if( wst.isWidgetSettingsTemplateFieldExists( WidgetData.WIDGET_FIELD_NAME_INSIDE_SHADOW_BLUR ) === true ) {
            this._insideShadow_blur = wst.getWidgetSettingsTemplateFieldValue(WidgetData.WIDGET_FIELD_NAME_INSIDE_SHADOW_BLUR);
        }
        if( wst.isWidgetSettingsTemplateFieldExists( WidgetData.WIDGET_FIELD_NAME_INSIDE_SHADOW_SPREAD ) === true ) {
            this._insideShadow_spread = wst.getWidgetSettingsTemplateFieldValue(WidgetData.WIDGET_FIELD_NAME_INSIDE_SHADOW_SPREAD);
        }
        if( wst.isWidgetSettingsTemplateFieldExists( WidgetData.WIDGET_FIELD_NAME_INSIDE_SHADOW_COLOR ) === true ) {
            this._insideShadow_color = wst.getWidgetSettingsTemplateFieldValue(WidgetData.WIDGET_FIELD_NAME_INSIDE_SHADOW_COLOR);
        }

        if( wst.isWidgetSettingsTemplateFieldExists( WidgetData.WIDGET_FIELD_NAME_OUTSIDE_SHADOW_HORIZONTAL_OFFSET ) === true ) {
            this._outsideShadow_horizontalOffset = wst.getWidgetSettingsTemplateFieldValue(WidgetData.WIDGET_FIELD_NAME_OUTSIDE_SHADOW_HORIZONTAL_OFFSET);
        }
        if( wst.isWidgetSettingsTemplateFieldExists( WidgetData.WIDGET_FIELD_NAME_OUTSIDE_SHADOW_VERTICAL_OFFSET ) === true ) {
            this._outsideShadow_verticalOffset = wst.getWidgetSettingsTemplateFieldValue(WidgetData.WIDGET_FIELD_NAME_OUTSIDE_SHADOW_VERTICAL_OFFSET);
        }
        if( wst.isWidgetSettingsTemplateFieldExists( WidgetData.WIDGET_FIELD_NAME_OUTSIDE_SHADOW_BLUR ) === true ) {
            this._outsideShadow_blur = wst.getWidgetSettingsTemplateFieldValue(WidgetData.WIDGET_FIELD_NAME_OUTSIDE_SHADOW_BLUR);
        }
        if( wst.isWidgetSettingsTemplateFieldExists( WidgetData.WIDGET_FIELD_NAME_OUTSIDE_SHADOW_SPREAD ) === true ) {
            this._outsideShadow_spread = wst.getWidgetSettingsTemplateFieldValue(WidgetData.WIDGET_FIELD_NAME_OUTSIDE_SHADOW_SPREAD);
        }
        if( wst.isWidgetSettingsTemplateFieldExists( WidgetData.WIDGET_FIELD_NAME_OUTSIDE_SHADOW_COLOR ) === true ) {
            this._outsideShadow_color = wst.getWidgetSettingsTemplateFieldValue(WidgetData.WIDGET_FIELD_NAME_OUTSIDE_SHADOW_COLOR);
        }
    }

    //!override
    saveToWidgetSettingsTemplateMain( wst ){
        wst.setWidgetSettingsTemplateField( WidgetData.WIDGET_FIELD_NAME_FG_COLOR, this._uccacwidgetFgColor );
        wst.setWidgetSettingsTemplateField( WidgetData.WIDGET_FIELD_NAME_BG_COLOR, this._uccacwidgetBgColor );
        wst.setWidgetSettingsTemplateField( WidgetData.WIDGET_FIELD_NAME_BORDER_RADIUS, this._borderRadius );

        wst.setWidgetSettingsTemplateField( WidgetData.WIDGET_FIELD_NAME_INSIDE_SHADOW_HORIZONTAL_OFFSET, this._insideShadow_horizontalOffset );
        wst.setWidgetSettingsTemplateField( WidgetData.WIDGET_FIELD_NAME_INSIDE_SHADOW_VERTICAL_OFFSET, this._insideShadow_verticalOffset );
        wst.setWidgetSettingsTemplateField( WidgetData.WIDGET_FIELD_NAME_INSIDE_SHADOW_BLUR, this._insideShadow_blur );
        wst.setWidgetSettingsTemplateField( WidgetData.WIDGET_FIELD_NAME_INSIDE_SHADOW_SPREAD, this._insideShadow_spread );
        wst.setWidgetSettingsTemplateField( WidgetData.WIDGET_FIELD_NAME_INSIDE_SHADOW_COLOR, this._insideShadow_color );

        wst.setWidgetSettingsTemplateField( WidgetData.WIDGET_FIELD_NAME_OUTSIDE_SHADOW_HORIZONTAL_OFFSET, this._outsideShadow_horizontalOffset );
        wst.setWidgetSettingsTemplateField( WidgetData.WIDGET_FIELD_NAME_OUTSIDE_SHADOW_VERTICAL_OFFSET, this._outsideShadow_verticalOffset );
        wst.setWidgetSettingsTemplateField( WidgetData.WIDGET_FIELD_NAME_OUTSIDE_SHADOW_BLUR, this._outsideShadow_blur );
        wst.setWidgetSettingsTemplateField( WidgetData.WIDGET_FIELD_NAME_OUTSIDE_SHADOW_SPREAD, this._outsideShadow_spread );
        wst.setWidgetSettingsTemplateField( WidgetData.WIDGET_FIELD_NAME_OUTSIDE_SHADOW_COLOR, this._outsideShadow_color );

    }

}