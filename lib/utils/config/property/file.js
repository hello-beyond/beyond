const DynamicProcessor = global.utils.DynamicProcessor();
const fs = (require('../../fs'));
const chokidar = require('chokidar');

module.exports = class extends DynamicProcessor {
    get dp() {
        return 'utils.config.property.file';
    }

    #file;
    get file() {
        return this.#file;
    }

    #watcher;
    #errors = [];
    get errors() {
        return this.#errors;
    }

    get valid() {
        return !this.errors.length;
    }

    #value;
    get value() {
        return this.#value;
    }

    constructor(file) {
        super();
        this.#file = file;
    }

    #initialising = false;
    get initialising() {
        return this.#initialising || super.initialising;
    }

    async initialise() {
        if (this.initialised || this.#initialising) return;
        this.#initialising = true;

        await this.#load();

        // Watch for file changes
        this.#watcher = chokidar.watch(this.#file, {'ignoreInitial': true});
        this.#watcher.on('all', this.#changed);

        await super.initialise();
        this.#initialising = false;
    }

    #request;
    #changed = () => {
        this.#request = Date.now();
        this.#load().catch(exc => console.error(exc.stack));
        this._invalidate();
    }

    #loaded = false;

    _prepared() {
        return this.#loaded;
    }

    async #load() {
        if (this.destroyed) {
            console.log(`Property is destroyed. It could be that watcher "${this.#file}" is still active`);
            return;
        }
        const request = this.#request;

        this.#loaded = false;
        this.#value = undefined;

        const done = ({value, errors}) => {
            if (this.destroyed || request !== this.#request) return;

            errors = typeof errors === 'string' ? [errors] : errors;
            this.#errors = errors ? errors : [];
            this.#value = value;
            this.#loaded = true;
            this._invalidate();
        }

        const exists = (await fs.exists(this.#file)) && (await fs.stat(this.#file)).isFile();
        if (!exists) return done({errors: `Configuration file "${this.#file}" not found`});

        const content = await fs.readFile(this.#file, {'encoding': 'UTF8'});
        if (this.destroyed || request !== this.#request) return;

        let value;
        try {
            value = JSON.parse(content);
            return done({value});
        }
        catch (exc) {
            return done({errors: `Configuration file "${this.#file}" cannot be parsed - ${exc.message}`});
        }
    }

    destroy() {
        super.destroy();
        this.#watcher?.close().catch(exc => console.error(exc.stack));
        this.#watcher?.removeAllListeners();
    }
}
