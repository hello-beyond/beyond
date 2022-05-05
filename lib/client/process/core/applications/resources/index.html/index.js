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
    #preprocessed = new Map();

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

        this.#promise.resolve(this.#source);
        return this.#source;
    }

    async content(url, distribution) {
        const application = this.#application;
        const {platform} = distribution;

        let html;
        const key = platform === 'web.ssr' ? `${distribution.key}/${url.pathname}` : distribution.key;
        if (this.#preprocessed.has(key)) {
            html = this.#preprocessed.get(key);
        }
        else {
            const source = await this.source();
            html = await require('./process')(application, source, distribution);
            this.#preprocessed.set(key, html);
        }

        if (platform === 'web.ssr') {
            await this.#ssr.ready();

            const host = 'http://localhost:5000';
            const head = `<script src="${host}${url.pathname}"></script>`;
            html = html.replace(/(<!--(\s*)#beyond\.ssr(\s*)-->)/i, head);
            return {html};
        }
        else if (application.engine === 'legacy') {
            return {html};
        }
        else {
            const $ = require('cheerio').load(html);
            const layout = application.layout ?
                `<${application.layout} data-main="1" />` : '<beyond-layout-children />';

            $('body').append(layout);
            return {html: $.html()};
        }
    }
}
