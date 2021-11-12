const DynamicProcessor = global.utils.DynamicProcessor(Map);

module.exports = class extends DynamicProcessor {
    get dp() {
        return 'utils.config.collection';
    }

    get errors() {
        return this.children.get('config').child.errors;
    }

    get warnings() {
        return this.children.get('config').child.warnings;
    }

    get valid() {
        return this.children.get('config').child.valid;
    }

    constructor(config) {
        super();

        const children = new Map();
        children.set('config', {child: config});
        super.setup(children);
    }

    #clear = () => {
        this.forEach(item => item.destroy());
        super.clear();
    };

    // This method should be overridden to process the configuration, and also can be used
    // to alter the configuration of the items (modify, add or remove) before creating the instances
    async _processConfig(config, request) {
        void (request);
        return [...config.items.values()];
    }

    // This method should be overridden
    _createItem(config) {
        void (config);
        throw new Error('This method should be overridden');
    }

    _deleteItem(item) {
        item.destroy();
    }

    async _process(request) {
        const config = this.children.get('config').child;
        if (!config.valid) {
            this.#clear();
            return;
        }

        let items = await this._processConfig(config, request);
        if (this._request !== request) return;
        items = items ? items : []

        const updated = new Map();
        for (let config of items) {
            const {path} = config;

            const item = this.has(path) ? this.get(path) : this._createItem(config);
            if (item.dp && typeof item.on === 'function') {
                item.on('initialised', () => this._events.emit('item.initialised'));
                item.on('change', () => this._events.emit('item.change'));
            }

            updated.set(path, item);
        }

        // Destroy unused items
        this.forEach(item => !updated.has(item.path) && this._deleteItem(item));

        // Set the updated data into the collection
        super.clear(); // Do not use this.clear(), as it would destroy libraries still being used
        updated.forEach((value, key) => this.set(key, value));
    }

    destroy() {
        super.destroy();
        this.#clear();
    }
}
