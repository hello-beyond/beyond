module.exports = class extends global.Bundle {
    // "id" is reserved by the global.Bundle class
    #layoutId;
    get layoutId() {
        return this.#layoutId;
    }

    processConfig(config) {
        if (!['object', 'string'].includes(typeof config)) {
            return {errors: ['Invalid configuration']};
        }

        this.#layoutId = config.id;
        delete config.layoutId;

        return {value: config};
    }
}
