const DynamicProcessor = global.utils.DynamicProcessor(Map);
const AnalyzedSource = require('./analyzed-source');

module.exports = class extends DynamicProcessor {
    get dp() {
        return 'ts-processor.analyzer';
    }

    #specs;
    #cache;

    get path() {
        const {children} = this;
        const source = children.has('files') ? 'files' : 'bridges';
        return children.get(source).child.path;
    }

    get watcher() {
        return this.children.get('files').child.watcher;
    }

    get bridges() {
        const children = this.children;
        return children.has('bridges') ? children.get('bridges').child : undefined;
    }

    constructor(specs, files) {
        super();
        this.#specs = specs;

        const subscriptions = ['item.initialised', 'item.change'];

        const children = new Map();

        const bundle = specs.bundle.name;
        const {distribution} = specs;
        const {platform} = distribution;

        // The only case in which the files are not required is when the bundle name is "bridge"
        // and the platform is client side (web, android, ios, etc instead of backend),
        // since in that case the processed bridges are compiled, and not the original files
        (distribution.dashboard || bundle !== 'bridge' || platform === 'backend') && children.set('files', {
            child: files,
            events: subscriptions
        });

        // When the bundle is "bridge", the bridges are required by both the client and the server
        // The client requires them to process the code,
        // and the server to obtain the information of the classes exposed as actions and their corresponding methods.
        if (bundle === 'bridge') {
            const bridges = new (require('./bridges'))(specs, files);
            children.set('bridges', {child: bridges, events: subscriptions});
        }
        super.setup(children);

        this.#cache = new (require('./cache'))(this, specs);
    }

    #initialising = false;
    get initialising() {
        return this.#initialising || super.initialising;
    }

    async initialise() {
        if (this.initialised || this.#initialising) return;
        this.#initialising = true;

        const cached = await this.#cache.load();
        cached?.forEach(source => this.set(source.relative.file, source));

        await super.initialise();
        this.#initialising = false;
    }

    _prepared(check) {
        const files = this.children.get('files')?.child;
        files?.forEach(source => check(source));
    }

    _process() {
        const bundle = this.#specs.bundle.name;
        const {distribution} = this.#specs;
        const {platform} = distribution;
        const sources = (!distribution.dashboard && bundle === 'bridge' && platform !== 'backend') ?
            this.children.get('bridges').child : this.children.get('files').child;

        const updated = new Map();
        sources.forEach(source => {
            // The files of the bridges that doesn't expose any actions are undefined and must be discarded
            if (source.content === undefined) return;

            const {file} = source.relative;
            if (this.has(file) && this.get(file).hash === source.hash) {
                updated.set(file, this.get(file));
                return;
            }

            const i = new (require('./source-interface'))(source);
            updated.set(file, new AnalyzedSource(this.#specs, source, i));
        });

        this.clear();
        updated.forEach((value, key) => this.set(key, value));

        // Save the interfaces into cache
        this.#cache.save().catch(exc => console.log(exc.stack));
    }
}
