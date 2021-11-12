const {fs} = global.utils;

module.exports = class {
    #application;
    #ssr;

    constructor(application) {
        this.#application = application;
        this.#ssr = new (require('./ssr'))(application);
    }

    #promise;
    #source;
    #processed = new Map();

    async source() {
        if (this.#source) return this.#source;
        if (this.#promise) return await this.#promise.value;
        this.#promise = Promise.pending();

        const application = this.#application;
        await application.ready;

        // If index.html file exists in the application path, then return it
        const index = require('path').join(application.path, 'index.html');

        const {engine} = application;
        const file = await fs.exists(index) ? index : require('path').join(__dirname, 'sources', `${engine}.html`);

        // If index.html does not exist in the application path, then return the index default
        this.#source = await fs.readFile(file, 'UTF8');

        this.#promise.resolve();
        return this.#source;
    }

    async content(url, distribution) {
        const application = this.#application;

        let html, $;
        const key = distribution.ssr ? `${distribution.key}/${url.pathname}` : distribution.key;
        if (this.#processed.has(key)) {
            ({html, $} = this.#processed.get(key));
        }
        else {
            const source = await this.source();
            const content = await require('./process')(application, source, distribution);

            $ = require('cheerio').load(content);
            const layout = application.layout ? application.layout : 'beyond-layout-children';
            application.engine !== 'legacy' && $('body').append(`<${layout}/>`);

            html = $.html();
            this.#processed.set(key, {html, $});
        }

        if (distribution.ssr) {
            const ssr = await this.#ssr.content(url.pathname);
            console.log('SSR received code', ssr);
        }

        return html;
    }
}
