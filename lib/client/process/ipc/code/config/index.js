module.exports = class {
    #model;

    constructor(model) {
        this.#model = model;
    }

    async get(applicationId, distribution) {
        if (!distribution.local) throw new Error('Distribution is invalid, .local property should be true');

        const application = await require('../application')(this.#model.core, applicationId);
        const config = application.config.get(distribution);
        await config.ready;

        const {errors, code} = config;
        return {errors, code};
    }
}
