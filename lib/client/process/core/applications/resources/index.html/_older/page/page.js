const DynamicProcessor = global.utils.DynamicProcessor();
const {fs} = global.utils;

module.exports = class extends DynamicProcessor {
    get dp() {
        return 'application.resources.index.skeleton';
    }

    #application;
    #distribution;

    constructor(application, distribution) {
        super();
        this.#application = application;
        this.#distribution = distribution;

        super.setup(new Map([['application', {child: application}]]));
    }

    #source;
    #$;
    #content;

    async $() {
        await this.#process();
        return this.#$;
    }

    async content() {
        if (this.#content !== undefined) return this.#content;
        await this.#process();
        return (this.#content = this.#$.html());
    }

    #processed;
    #process = async () => {
        if (this.#processed) return await this.#processed.value; // Already processed or processing
        this.#processed = Promise.pending();

        await this.ready;
        const application = this.#application;
        const distribution = this.#distribution;
        const content = await require('./process')(application, this.#source, distribution);
        this.#$ = require('cheerio').load(content);

        const layout = application.layout ? application.layout : 'beyond-layout-children';
        application.engine !== 'legacy' && this.#$('body').append(`<${layout}/>`);

        this.#processed.resolve();
    }

    async _process(request) {
        const application = this.#application;
        this.#content = undefined;

    }
}
