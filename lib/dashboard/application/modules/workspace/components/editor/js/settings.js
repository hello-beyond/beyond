class Settings extends ReactiveModel {

    /**
     * Name of how it's saved in localstorage
     * @type {string}
     * @private
     */
    __NAME = 'beyond.dashboard.editorconfig';
    _fontSize = '';

    get configurable() {
        return ['fontSize', 'theme'];
    }

    get fontSize() {
        return this._fontSize;
    }

    set fontSize(value) {
        if (value === this._fontSize) return;
        this._fontSize = value;
        this.setChange();
    }

    get defaults() {
        return {
            theme: 'vs-dark',
            language: 'typescript',
            fontSize: 12,
        }
    }

    _theme = '';
    get theme() {
        return this._theme;
    }

    _wordWrap;
    get wordWrap() {
        return this._wordWrap;
    }

    set wordWrap(value) {
        value = value === true ? 'on' : 'off';
        if (value === this.wordWrap) return;
        this._wordWrap = value;
        this.setChange();
    }

    set theme(value) {
        if (value === this._theme) return;
        this._theme = value;
        this.setChange();
    }

    _unpublished;
    get unpublished() {
        return this._unpublished;
    }

    get properties() {
        return {
            wordWrap: this.wordWrap,
            fontSize: this.fontSize,
            formatOnPaste: true,
            formatOnType: true,
            theme: this.theme,
            scrollbar: {
                alwaysConsumeMouseWheel: false
            },
            ...this.required
        }
    }

    get required() {
        return {
            automaticLayout: true,
            fixedOverflowWidgets: true,
            mouseWheelZoom: true
        }
    }

    constructor() {
        super();
        this.restore();
    }

    setChange() {
        this._unpublished = true;
        this.triggerEvent();
    }

    restore() {
        try {
            const settings = JSON.parse(localStorage.getItem(this.__NAME)) ?? this.defaults;
            Object.keys(settings).forEach(property => {
                if (!this.configurable.includes(property)) return;
                this[property] = settings[property];
                this._unpublished = false;
                this.triggerEvent('settings.loaded');
                this.triggerEvent();
            })
        }
        catch (e) {
            console.error(e);
        }
    }

    save() {
        try {
            localStorage.setItem(this.__NAME, JSON.stringify(this.properties));
            this.triggerEvent('settings.changed');
            this._unpublished = false;
        }
        catch (e) {
            console.error(e);
        }
    }
}
