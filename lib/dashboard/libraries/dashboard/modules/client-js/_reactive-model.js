export class ReactiveModel {
    #ready;
    get ready() {
        return this.#ready;
    }

    #fetching;
    get fetching() {
        return this.#fetching;
    }

    set fetching(value) {
        if (value === this.#fetching) return;
        this._fetching = value;
        this.triggerEvent();
    }

    _fetched;
    get fetched() {
        return this._fetched;
    }

    #processing;
    get processing() {
        return this.#processing;
    }

    set processing(value) {
        if (value === this.#processing) return;
        this.#processing = value;
        this.triggerEvent();
    }

    #processed;
    get processed() {
        return this._processed;
    }

    set processed(value) {
        if (value === this.#processed) return;
        this.#processed = value;
        this.triggerEvent();
    }

    #loaded;
    get loaded() {
        return this.#loaded;
    }

    #error;
    get error() {
        return this.#error;
    }

    set error(value) {
        if (value === this.#error || typeof value !== 'string') return;
        this.#error = value;
        this.triggerEvent();
    }

    constructor() {
        this._events = new Events({bind: this});
        this.triggerEvent = this.triggerEvent.bind(this);
        this._set = this._set.bind(this);
    }

    triggerEvent = (event = 'change') => this._events.trigger(event);

    /**
     * set value in a private property
     * @param property
     * @param value
     */
    _set(property, value) {
        let props = {};
        if (property && value !== 'undefined') props[property] = value;
        else props = property;

        let updated = false;
        for (const prop in props) {
            const key = `_${prop}`;
            if (!this.hasOwnProperty(key)) continue;

            //same value on store
            if (this[key] === props[prop]) continue;

            this[key] = props[prop];
            updated = true;
        }

        if (updated) this.triggerEvent();
    }

    getProperties() {
        const props = {}
        Object.keys(this).forEach(property => props[property.replace('_', '')] = this[property]);
        return props;
    }
}
