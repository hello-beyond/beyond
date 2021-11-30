const fs = global.utils.fs;

module.exports = class {
    #file;
    #value;
    get value() {
        return this.#value;
    }

    #error;
    get error() {
        return this.#error;
    }

    constructor(file) {
        this.#file = file;
    }

    async initialise() {
        let content;
        try {
            if (!await fs.exists(this.#file) || !(await fs.stat(this.#file)).isFile()) {
                this.#error = `Configuration file "${this.#file}" not found`;
                return;
            }
            content = await fs.readFile(this.#file, {'encoding': 'UTF8'});
        }
        catch (exc) {
            this.#error = `Error reading configuration file "${this.#file}"`;
            return;
        }

        try {
            this.#value = JSON.parse(content);
        }
        catch (exc) {
            this.#error = `Configuration file "${this.#file}" is invalid - ${exc.message}`;
            this.#value = undefined;
            return;
        }

        if (typeof this.#value !== 'object') {
            this.#value = undefined;
            this.#error = `Configuration file "${this.#file}" is invalid`;
        }
    }
}
