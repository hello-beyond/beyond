module.exports = class {
    #module;
    #file;
    #value;
    #errors;
    #ready;

    get value() {
        return this.#value;
    }

    get valid() {
        return this.#errors && !this.#errors.length;
    }

    constructor(module, file) {
        this.#module = module;
        this.#file = file;
    }

    async initialise() {
        if (this.#ready) return await this.#ready.value;
        this.#ready = Promise.pending();

        const done = () => this.#ready.resolve();

        this.#errors = [];
        const reader = new (require('./reader.js'))(this.#file.file);
        await reader.initialise();
        if (reader.error) {
            this.#errors.push(error);
            return done();
        }

        this.#value = reader.value;

        const ajv = new (require('ajv'))();
        const schema = require('./schema.json');
        const validate = ajv.compile(schema);
        validate(this.#value);
        validate.errors && validate.errors.forEach(error =>
            this.#errors.push(`Configuration error: ${error.dataPath} - ${error.message}`));

        done();
    }
}
