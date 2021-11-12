class DashboardDocs extends ReactiveModel {

    _showing;
    _current;

    constructor() {
        super();
        this.clean = this.clean.bind(this);
        this.open = this.open.bind(this);
    }

    get showing() {
        return this._showing;
    }

    get current() {
        return this._current;
    }

    open(doc) {
        this._showing = true;
        this._current = doc;
        this.triggerEvent();
    }

    clean() {
        this._showing = false;
        this._current = undefined;
        this.triggerEvent();
    }

}

export const DsDocs = new DashboardDocs();