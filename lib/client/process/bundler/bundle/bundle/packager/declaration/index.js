const {ipc} = global.utils;
const DynamicProcessor = global.utils.DynamicProcessor();

module.exports = class extends DynamicProcessor {
    get dp() {
        return 'bundler.bundle.declaration';
    }

    get id() {
        return this.#packager.bundle.id;
    }

    _notify() {
        ipc.notify('data-notification', {
            type: 'record/update',
            table: 'declarations',
            id: this.id
        });
    }

    #packager;
    get packager() {
        return this.#packager;
    }

    #hash;
    #cache;

    #processed = false;
    #errors;
    get errors() {
        this.#process();
        return this.#errors ? this.#errors : [];
    }

    get valid() {
        return this.processed && !this.errors.length;
    }

    #code;
    get code() {
        this.#process();
        return this.#code;
    }

    constructor(packager) {
        super();
        this.setMaxListeners(500);
        this.#packager = packager;
        this.#cache = new (require('./cache'))(packager);
        super.setup(new Map([['hash', {child: packager.hash}]]));
    }

    #initialising = false;
    get initialising() {
        return this.#initialising || super.initialising;
    }

    async save() {
        await this.ready;
        const {bundle} = this.#packager;
        this.valid && await require('./save')(bundle, this.#code);
    }

    async initialise() {
        if (this.initialised || this.#initialising) return;
        this.#initialising = true;

        const cached = await this.#cache.load();
        if (cached) {
            this.#code = cached.code;
            this.#errors = cached.errors;
            this.#hash = cached.hash;
            this.#processed = true;
        }
        await this.#packager.initialise();
        await super.initialise();
        this.#initialising = false;
    }

    _prepared(check) {
        const hash = this.children.get('hash').child;
        if (!check(hash)) return; // Wait to know the packager hash
        if (hash.value === this.#hash) return; // No further processing required

        // When the code was returned from cache, and the processors were not registered as a child
        const packager = this.#packager;
        if (!this.children.has('processors')) {
            const children = new Map();
            const subscriptions = ['declaration.initialised', 'declaration.change'];
            children.set('processors', {child: packager.processors, events: subscriptions})
            this.children.register(children, false);
        }

        const processors = this.children.get('processors').child;
        if (!check(processors)) return false;
        processors.forEach(({declaration}) => declaration && check(declaration));
    }

    #process() {
        if (!this.processed) throw new Error('Processor is not ready. Wait for the .ready property before accessing its state.');
        if (this.#processed) return; // Already processed

        const hash = this.children.get('hash').child.value;

        const done = ({code, errors}) => {
            this.#code = code;
            this.#errors = errors ? errors : [];
            this.#hash = hash;
            this.#processed = true;
            this.#cache.save(this.#code, this.#errors, hash);

            this.save().catch(exc => console.log(exc.stack));
        };

        let code = '';
        const processors = this.children.get('processors').child;
        if (!processors.size) return done({code: ''});

        // Check if any of the processors have errors
        const errors = [];
        for (const [name, {declaration}] of processors) {
            if (!declaration || declaration.valid) continue;
            errors.push(`Processor ${name} has been compiled with errors.`);
        }
        if (errors.length) return done({errors});

        // Process the declaration
        for (const [name, {declaration}] of processors) {
            if (!declaration || !declaration.code) continue;
            code += global.utils.code.header(`Processor: ${name}`) + '\n';
            code += declaration.code + '\n\n';
        }

        code += require('./hmr-activation')(this.#packager.bundle);

        done({code});
    }

    _process() {
        const hash = this.children.get('hash').child.value;
        if (hash === this.#hash) return;

        this.#hash = undefined;
        this.#code = undefined;
        this.#errors = undefined;
        this.#processed = false;
    }
}
