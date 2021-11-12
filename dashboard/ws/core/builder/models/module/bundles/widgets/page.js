module.exports = class Page extends require('./widget') {
    _identifier = 'page';
    _name;
    _route;
    _vdir;
    _layout;

    skeleton = ['hmr', 'element', 'ts'];

    /**
     *
     * @param module Parent module object.
     * @param path Dirname where is the module.json located.
     * @param specs parameters of the module with the configuration of the file.
     */
    constructor(module, path, specs = {}) {
        super(module, path, specs);

        this._checkProperties(specs);
        this._module = module;

        if (!this._route) {
            throw Error(`Property route is necessary, for page bundle`);
        }
    }

    set layout(layout) {
        this._layout = layout;
    }

    getProperties() {
        const props = super.getProperties();
        props.element.is = 'page';
        props.element.route = this._route;

        if (this._vdir) props.element.vdir = this._vdir;
        if (this._layout) props.element.vdir = this._layout;

        return props;
    }
}