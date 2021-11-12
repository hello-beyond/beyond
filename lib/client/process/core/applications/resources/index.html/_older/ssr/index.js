const DynamicProcessor = global.utils.DynamicProcessor();
const workers = require('./workers');
const Router = require('./router');

module.exports = class extends DynamicProcessor {
    get dp() {
        return 'application.resources.index.ssr';
    }

    #distribution;
    #content;

    async content() {
        const router = this.children.get('router').child;
        const layouts = await router.layouts();

        return '';
    }

    constructor(application, distribution, url) {
        super();
        this.#distribution = distribution;
        super.setup(new Map([
            ['router', {child: new Router(application, url, distribution, workers)}]
        ]));
    }

    _process() {
        this.#content = undefined;
    }
}
