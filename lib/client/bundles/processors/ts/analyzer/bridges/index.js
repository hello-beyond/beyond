const DynamicProcessor = global.utils.DynamicProcessor(Map);

module.exports = class extends DynamicProcessor {
    get dp() {
        return 'ts-processor.analyzer.bridges';
    }

    #info = new Map();
    get info() {
        return this.#info;
    }

    get path() {
        return this.children.get('files').child.path;
    }

    #cache;

    constructor(specs, files) {
        super();
        const subscriptions = ['item.initialised', 'item.change'];
        super.setup(new Map([['files', {child: files, events: subscriptions}]]));

        this.#cache = new (require('./cache'))(this, specs.bundle, files);
    }

    _prepared(check) {
        const files = this.children.get('files').child;
        files.forEach(source => check(source));
    }

    #initialising = false;
    get initialising() {
        return this.#initialising || super.initialising;
    }

    async initialise() {
        if (this.initialised || this.#initialising) return;
        this.#initialising = true;

        const cached = await this.#cache.load();
        cached && cached.forEach(source => this.set(source.relative.file, source));

        await super.initialise();
        this.#initialising = false;
    }

    _process() {
        const files = this.children.get('files').child;

        let changed = false;
        const updated = new Map();

        // Process the backend files to find actions bridges
        files.forEach(source => {
            const {file} = source.relative;
            if (this.has(file) && this.get(file).hash === source.hash) {
                updated.set(file, this.get(file));
                return;
            }

            changed = true;
            const parsed = require('./parser')(file, source.content);
            updated.set(file, new (require('./bridge-source'))(source, parsed));
        });

        this.forEach(source => !updated.has(source.relative.file) && (changed = true));

        this.clear();
        this.#info.clear();
        updated.forEach((source, file) => {
            this.set(file, source);
            source.info?.forEach((methods, className) => this.#info.set(className, methods));
        });

        changed && this.#cache.save().catch(exc => console.log(exc.stack));
        return changed;
    }
}
