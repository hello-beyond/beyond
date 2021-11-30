module.exports = class Layout extends require('./widget') {
    _identifier = 'layout';
    _ids = undefined;

    skeleton = ['hmr', 'element', 'ts'];

    constructor(module, path, specs = {}) {
        super(module, path, specs);

        if (!this._id) {
            throw Error(`Property id is necessary, for layout bundle`);
        }
    }

    get id() {
        return this._id;
    }

    set id(value) {
        this._id = value;
    }

    getProperties() {
        const props = super.getProperties();
        props.element.is = 'layout';
        props.element.name = this.id;

        return props;
    }
}