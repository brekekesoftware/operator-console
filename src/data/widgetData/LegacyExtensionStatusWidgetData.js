import WidgetData from "./WidgetData";

export default class LegacyExtensionStatusWidgetData extends WidgetData {
    constructor(options) {
        super(options);
        this._extension = options["extension"];
        this._extensionStatusFgColor = options["extensionStatusFgColor"];
    }

    //!override
    setWidgetDataToObjectMain(o) {

        if (!!this._extension) {
            o["extension"] = this._extension;
        } else {
            delete o["extension"];
        }

        if (!!this._extensionStatusFgColor) {
            o["extensionStatusFgColor"] = this._extensionStatusFgColor;
        } else {
            delete o["extensionStatusFgColor"];
        }

    }

    setExtension(extension) {
        this._extension = extension;
    }

    getExtension() {
        return this._extension;
    }

    setExtensionStatusFgColor(color) {
        this._extensionStatusFgColor = color;
    }

    getExtensionStatusFgColor() {
        return this._extensionStatusFgColor;
    }

    //!override
    importFromWidget_ver0_1(widget_ver0_1) {
        if( widget_ver0_1.extension ){
            this.setExtension( widget_ver0_1.extension );
        }
        if (widget_ver0_1.exStatusFgColor ) {
            this.setExtensionStatusFgColor( widget_ver0_1.exStatusFgColor );
        }
    }
}