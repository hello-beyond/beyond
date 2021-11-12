const DynamicProcessor = global.utils.DynamicProcessor();
const workers = require('./workers');
const Router = require('./router');
const Dependencies = require('./dependencies');

module.exports = class extends DynamicProcessor {
    get dp() {
        return 'application.resources.index.ssr';
    }

    #distribution;
    #content;

    async content() {
        await this.ready;
        if (!this.processed) throw new Error('Processor still working. Wait for the .ready property');
        if (this.#content !== undefined) return this.#content;

        let content;
        const page = this.children.get('page').child;
        if (page.valid) {
            const dependencies = this.children.get('dependencies').child;
            if (!page) return (this.#content = '');

            try {
                content = await workers.process(page, dependencies);
            }
            catch (exc) {
                console.log(exc.stack);
                content = 'Error processing page';
            }
        }
        else {
            content = 'Error processing page';
        }

        return (this.#content = content);
    }

    constructor(application, distribution, url) {
        super();
        this.#distribution = distribution;
        super.setup(new Map([
            ['application', {child: application}],
            ['router', {child: new Router(application, url, distribution, workers)}]
        ]));
    }

    _prepared(check) {
        const router = this.children.get('router').child;
        if (!router.valid) return;

        const page = router.bundle.code.get(this.#distribution);

        const previous = this.children.has('page') ? this.children.get('page').child : undefined;
        if (previous && previous !== page) {
            this.children.unregister(['page', 'dependencies'], false);
        }

        if (!this.children.has('page')) {
            const dependencies = new Dependencies(router.bundle, this.#distribution);
            this.children.register(new Map([
                ['page', {child: page}],
                ['dependencies', {child: dependencies}]
            ]), false);
        }

        const dependencies = this.children.get('dependencies').child;
        if (!check(page) || !check(dependencies)) return false;
    }

    _process() {
        this.#content = undefined;
    }
}
