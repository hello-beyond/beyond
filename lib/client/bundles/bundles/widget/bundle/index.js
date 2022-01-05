module.exports = class extends global.Bundle {
    #properties;
    get properties() {
        return this.#properties;
    }

    processConfig(config) {
        this.#properties = undefined;

        if (!['object', 'string'].includes(typeof config)) return {errors: ['Invalid configuration']};
        if (typeof config.element !== 'object') return {errors: ['Element configuration is invalid or not set']};

        const {element} = config;
        if (typeof element.name !== 'string') return {errors: ['Element name must be set']};
        const validation = require('./validate-name')(element.name);
        if (validation.error) return {errors: [validation.error]};

        if (config.is && !['layout', 'page'].includes(config.is)) return {errors: ['Property "is" is invalid']};

        this.#properties = {element: {name: config.element.name}};
        config.is && (this.#properties.is = config.is);

        config.is === 'page' && typeof config.route === 'string' && (this.#properties.route = config.route);
        ['page', 'layout'].includes(config.is) && typeof config.layout === 'string' && (this.#properties.layout = config.layout);

        delete config.is;
        delete config.layout;
        delete config.route;
        delete config.element;

        const output = {value: config};
        output.warnings = output.warnings ? output.warnings : [];
        validation.warning && output.warnings.push(validation.warning);
        return output;
    }
}
