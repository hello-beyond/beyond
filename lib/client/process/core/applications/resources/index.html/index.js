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

        this.#promise.resolve();
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
            let {code, errors} = await this.#ssr.content(url.pathname);
            if (errors?.length) return {errors};

            code = `<script>\n${code}\n</script>\n`;
            code = code.replace(/\n/g, '\n    ');

            html = html.replace(/(<!--(\s*)#beyond\.ssr(\s*)-->)/i, code);
            return {html};
        }

        const $ = require('cheerio').load(html);
        const layout = application.layout ? application.layout : 'beyond-layout-children';
        application.engine !== 'legacy' && $('body').append(`<${layout}/>`);

        return {html: $.html()};
    }
}
