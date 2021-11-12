module.exports = class {
    #diagnostics = new (require('./diagnostics'))();
    get diagnostics() {
        return this.#diagnostics;
    }

    #output = new (require('./output'))();
    get output() {
        return this.#output;
    }

    constructor(files, compilation) {
        this.#diagnostics.process(compilation.diagnostics);
        this.#output.process(files, compilation.output);
    }

    toJSON() {
        return {
            output: this.#output,
            diagnostics: this.#diagnostics
        };
    }
}
