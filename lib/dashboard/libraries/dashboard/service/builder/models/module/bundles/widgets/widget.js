module.exports = class Widget extends require('../bundle') {
    _identifier = 'widget';
    _element;

    skeleton = [
        'hmr', 'element', 'ts'
    ];

    _processors = new Map();
    _module;

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
    }

    getProperties() {
        const props = super.getProperties();
        this._name && (props.element = {name: this._name});

        return props;
    }
}