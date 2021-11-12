const DynamicProcessor = global.utils.DynamicProcessor();

/**
 * Item based on a configuration object
 */
module.exports = class extends DynamicProcessor {
    _config;

    get errors() {
        return this._config.errors;
    }

    get warnings() {
        return this._config.warnings;
    }

    get valid() {
        return this._config.valid;
    }

    /**
     * Configuration item constructor
     *
     * @param config {object} The configuration property object
     */
    constructor(config) {
        if (!config) throw new Error('Invalid config parameter');
        super();
        this._config = config;

        const children = new Map();
        children.set('config', {child: config});
        super.setup(children);
    }
}
