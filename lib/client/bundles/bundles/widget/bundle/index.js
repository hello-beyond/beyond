module.exports = class extends global.Bundle {
    #element;
    get element() {
        return this.#element;
    }

    processConfig(config) {
        this.#element = undefined;

        if (!['object', 'string'].includes(typeof config)) return {errors: ['Invalid configuration']};
        if (typeof config.element !== 'object') return {errors: ['Element configuration is invalid or not set']};

        const {element} = config;
        if (typeof element.name !== 'string') return {errors: ['Element name must be set']};
        const validation = require('./validate-name')(element.name);
        if (validation.error) return {errors: [validation.error]};

        if (element.is && !['layout', 'page'].includes(element.is)) return {errors: ['Property element.is is invalid']};

        this.#element = {name: config.element.name};
        element.is && (this.#element.is = element.is);

        element.is === 'page' && typeof element.route === 'string' && (this.#element.route = element.route);
        ['page', 'layout'].includes(element.is) && typeof element.layout === 'string' && (this.#element.layout = element.layout);

        delete config.element;
        const output = {value: config};
        output.warnings = output.warnings ? output.warnings : [];
        validation.warning && output.warnings.push(validation.warning);
        return output;
    }
}
