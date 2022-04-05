/**
 * Application builder
 */
module.exports = class {
    #application;
    get application() {
        return this.#application;
    }

    #builds;
    get builds() {
        return this.#builds;
    }

    #processing = false;
    get processing() {
        return this.#processing;
    }

    emit(...params) {
        this.#application.builder.emit(...params);
    }

    constructor(application) {
        this.#application = application;
        this.#builds = new (require('./builds'))(this);
    }

    async build(distribution) {
        distribution = require('./distribution')(distribution);
        const {platform} = distribution;
        const {platforms} = global;

        if (typeof distribution !== 'object')
            throw new Error('Invalid distribution specifications');
        if (!platforms.all.includes(platform))
            throw new Error(`Platform is not specified or is invalid: "${platform}"`);
        if (!['development', 'production'].includes(distribution.environment))
            throw new Error(`Environment "${distribution.environment}" is invalid`);

        const application = this.#application;
        await application.ready;
        const name = application.name ? `"${application.name}": ` : '';
        this.emit('message', `Building application ${name}"${application.path}"`);

        this.#processing = true;

        const processor = new (require('./processor.js'))(this, distribution);
        try {
            await processor.process();
            this.#processing = false;
        }
        catch (exc) {
            console.error(exc.stack);
            this.#processing = false;
            const error = `Exception caught building application: ${exc.message}`;
            this.emit('error', error);
            return {processed: false};
        }
    }

    destroy() {
        this.removeAllListeners();
    }
}
