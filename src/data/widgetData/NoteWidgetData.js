import WidgetData from "./WidgetData";

export default class NoteWidgetData extends WidgetData {
    constructor( options ) {
        super(options);
        this._noteName = options["noteName"];
        this._noteTitleFontSize = options["noteTitleFontSize"];
        this._noteBodyFontSize = options["noteBodyFontSize"];
        this._noteBorderRadius = options["noteBorderRadius"];
        this._noteNameFgColor = options["noteNameFgColor"];
        this._noteNameBgColor = options["noteNameBgColor"];
        this._noteTextFgColor = options["noteTextFgColor"];
        this._noteBgStartColor = options["noteBgStartColor"];
        this._noteBgEndColor = options["noteBgEndColor"];
        this._noteLabel = options["noteLabel"];
    }

    //!override
    setWidgetDataToObjectMain( o ){

        if( this._noteName  ){
            o["noteName"] = this._noteName;
        }
        else{
            delete o["noteName"];
        }

        if( this._noteTitleFontSize ){
            o["noteTitleFontSize"] = this._noteTitleFontSize;
        }
        else{
            delete o["noteTitleFontSize"];
        }

        if( this._noteBodyFontSize ){
            o["noteBodyFontSize"] = this._noteBodyFontSize;
        }
        else{
            delete o["noteBodyFontSize"];
        }

        if( this._noteBorderRadius || this._noteBorderRadius === 0 ){
            o["noteBorderRadius"] = this._noteBorderRadius;
        }
        else{
            delete o["noteBorderRadius"];
        }

        if( this._noteNameFgColor ){
            o["noteNameFgColor"] = this._noteNameFgColor;
        }
        else{
            delete o["noteNameFgColor"];
        }

        if( this._noteNameBgColor ){
            o["noteNameBgColor"] = this._noteNameBgColor;
        }
        else{
            delete o["noteNameBgColor"];
        }

        if( this._noteTextFgColor ){
            o["noteTextFgColor"] = this._noteTextFgColor;
        }
        else{
            delete o["noteTextFgColor"];
        }

        if( this._noteBgStartColor ){
            o["noteBgStartColor"] = this._noteBgStartColor;
        }
        else{
            delete o["noteBgStartColor"];
        }

        if( this._noteBgEndColor ){
            o["noteBgEndColor"] = this._noteBgEndColor;
        }
        else{
            delete o["noteBgEndColor"];
        }

        if( this._noteLabel  ){
            o["noteLabel"] = this._noteLabel;
        }
        else{
            delete o["noteLabel"];
        }
    }

    setNoteName( noteName ){
        this._noteName = noteName;
    }

    getNoteName(){
        return this._noteName;
    }

    setNoteTitleFontSize( n ){
        this._noteTitleFontSize = n;
    }

    getNoteTitleFontSize(){
        return this._noteTitleFontSize;
    }

    setNoteBodyFontSize( n ){
        this._noteBodyFontSize = n;
    }

    getNoteBodyFontSize(){
        return this._noteBodyFontSize;
    }

    getNoteBorderRadius(){
        return this._noteBorderRadius;
    }

    setNoteBorderRadius( n ){
        this._noteBorderRadius = n;
    }

    getNoteNameFgColor(){
        return this._noteNameFgColor;
    }

    setNoteNameFgColor( color ){
        this._noteNameFgColor = color;
    }

    getNoteNameBgColor(){
        return this._noteNameBgColor;
    }

    setNoteNameBgColor( color ){
        this._noteNameBgColor = color;
    }

    getNoteTextFgColor(){
        return this._noteTextFgColor;
    }

    setNoteTextFgColor( color ){
        this._noteTextFgColor = color;
    }

    getNoteBgStartColor(){
        return this._noteBgStartColor;
    }

    setNoteBgStartColor( color ){
        this._noteBgStartColor = color;
    }

    getNoteBgEndColor(){
        return this._noteBgEndColor;
    }

    setNoteBgEndColor( color ){
        this._noteBgEndColor = color;
    }

    setNoteLabel( noteLabel  ){
        this._noteLabel = noteLabel;
    }

    getNoteLabel(){
        return this._noteLabel;
    }

    //!override
    importFromWidget_ver0_1(widget_ver0_1) {
        if( widget_ver0_1.noteBgEndColor ){
            this._noteBgEndColor = widget_ver0_1.noteBgEndColor;
        }
        if( widget_ver0_1.noteBgStartColor ){
            this._noteBgStartColor = widget_ver0_1.noteBgStartColor;
        }
        if( widget_ver0_1.noteBorderRadius ){
            this._noteBorderRadius = widget_ver0_1.noteBorderRadius;
        }
        if( widget_ver0_1.noteName ){
            this._noteName = widget_ver0_1.noteName;
        }
        if( widget_ver0_1.noteNameBgColor ){
            this._noteNameBgColor = widget_ver0_1.noteNameBgColor;
        }
        if( widget_ver0_1.noteNameFgColor ){
            this._noteNameFgColor = widget_ver0_1.noteNameFgColor;
        }
        if( widget_ver0_1.noteTextFgColor ){
            this._noteTextFgColor = widget_ver0_1.noteTextFgColor;
        }
    }

    //!override
    loadFromWidgetSettingsTemplateMain( wst, bIncludeButtonFunction = undefined ){
        if( wst.isWidgetSettingsTemplateFieldExists( WidgetData.WIDGET_FIELD_NAME_BORDER_RADIUS ) === true ) {
            this._noteBorderRadius = wst.getWidgetSettingsTemplateFieldValue(WidgetData.WIDGET_FIELD_NAME_BORDER_RADIUS);
        }

        if( wst.isWidgetSettingsTemplateFieldExists( WidgetData.WIDGET_FIELD_NAME_NAME_NAME ) === true ) {
            this._noteName = wst.getWidgetSettingsTemplateFieldValue(WidgetData.WIDGET_FIELD_NAME_NAME_NAME);
        }
        if( wst.isWidgetSettingsTemplateFieldExists( WidgetData.WIDGET_FIELD_NAME_NAME_LABEL ) === true ) {
            this._noteLabel = wst.getWidgetSettingsTemplateFieldValue(WidgetData.WIDGET_FIELD_NAME_NAME_LABEL);
        }
        if( wst.isWidgetSettingsTemplateFieldExists( WidgetData.WIDGET_FIELD_NAME_NAME_FONT_SIZE ) === true ) {
            this._noteTitleFontSize = wst.getWidgetSettingsTemplateFieldValue(WidgetData.WIDGET_FIELD_NAME_NAME_FONT_SIZE);
        }
        if( wst.isWidgetSettingsTemplateFieldExists( WidgetData.WIDGET_FIELD_NAME_NAME_FG_COLOR ) === true ) {
            this._noteNameFgColor = wst.getWidgetSettingsTemplateFieldValue(WidgetData.WIDGET_FIELD_NAME_NAME_FG_COLOR);
        }
        if( wst.isWidgetSettingsTemplateFieldExists( WidgetData.WIDGET_FIELD_NAME_NAME_BG_COLOR ) === true ) {
            this._noteNameBgColor = wst.getWidgetSettingsTemplateFieldValue(WidgetData.WIDGET_FIELD_NAME_NAME_BG_COLOR);
        }

        if( wst.isWidgetSettingsTemplateFieldExists( WidgetData.WIDGET_FIELD_NAME_TEXT_FONT_SIZE ) === true ) {
            this._noteBodyFontSize = wst.getWidgetSettingsTemplateFieldValue(WidgetData.WIDGET_FIELD_NAME_TEXT_FONT_SIZE);
        }
        if( wst.isWidgetSettingsTemplateFieldExists( WidgetData.WIDGET_FIELD_NAME_TEXT_FG_COLOR ) === true ) {
            this._noteTextFgColor = wst.getWidgetSettingsTemplateFieldValue(WidgetData.WIDGET_FIELD_NAME_TEXT_FG_COLOR);
        }
        if( wst.isWidgetSettingsTemplateFieldExists( WidgetData.WIDGET_FIELD_NAME_TEXT_BG_START_COLOR ) === true ) {
            this._noteBgStartColor = wst.getWidgetSettingsTemplateFieldValue(WidgetData.WIDGET_FIELD_NAME_TEXT_BG_START_COLOR);
        }
        if( wst.isWidgetSettingsTemplateFieldExists( WidgetData.WIDGET_FIELD_NAME_TEXT_BG_END_COLOR ) === true ) {
            this._noteBgEndColor = wst.getWidgetSettingsTemplateFieldValue(WidgetData.WIDGET_FIELD_NAME_TEXT_BG_END_COLOR);
        }
    }

    //!override
    saveToWidgetSettingsTemplateMain( wst ){
        wst.setWidgetSettingsTemplateField( WidgetData.WIDGET_FIELD_NAME_BORDER_RADIUS, this._noteBorderRadius );

        wst.setWidgetSettingsTemplateField( WidgetData.WIDGET_FIELD_NAME_NAME_NAME, this._noteName );
        wst.setWidgetSettingsTemplateField( WidgetData.WIDGET_FIELD_NAME_NAME_LABEL, this._noteLabel );
        wst.setWidgetSettingsTemplateField( WidgetData.WIDGET_FIELD_NAME_NAME_FONT_SIZE, this._noteTitleFontSize );
        wst.setWidgetSettingsTemplateField( WidgetData.WIDGET_FIELD_NAME_NAME_FG_COLOR, this._noteNameFgColor );
        wst.setWidgetSettingsTemplateField( WidgetData.WIDGET_FIELD_NAME_NAME_BG_COLOR, this._noteNameBgColor );

        wst.setWidgetSettingsTemplateField( WidgetData.WIDGET_FIELD_NAME_TEXT_FONT_SIZE, this._noteBodyFontSize );
        wst.setWidgetSettingsTemplateField( WidgetData.WIDGET_FIELD_NAME_TEXT_FG_COLOR, this._noteTextFgColor );
        wst.setWidgetSettingsTemplateField( WidgetData.WIDGET_FIELD_NAME_TEXT_BG_START_COLOR, this._noteBgStartColor );
        wst.setWidgetSettingsTemplateField( WidgetData.WIDGET_FIELD_NAME_TEXT_BG_END_COLOR, this._noteBgEndColor );

    }
}