const DynamicProcessor = global.utils.DynamicProcessor();
const Diagnostics = require('./diagnostics');

/**
 * The sass compiler
 */
module.exports = class extends DynamicProcessor {
    get dp() {
        return 'css-processor.compiler';
    }

    #specs;
    #transpiler;

    #code;
    get code() {
        return this.#code;
    }

    #hash;
    get hash() {
        return this.#hash;
    }

    #diagnostics;
    get diagnostics() {
        return this.#diagnostics;
    }

    get valid() {
        return this.#diagnostics.valid;
    }

    constructor(specs, sources, transpiler) {
        super();
        this.#specs = specs;
        this.#transpiler = transpiler;
        const {files, functions, overwrites} = sources;

        const children = new Map();
        const subscriptions = ['item.initialised', 'item.change'];
        children.set('files', {child: files, events: subscriptions});
        functions && children.set('functions', {child: functions});
        overwrites && children.set('overwrites', {child: overwrites, events: subscriptions});
        super.setup(children);
    }

    _prepared(check) {
        const files = this.children.get('files').child;
        const overwrites = this.children.has('overwrites') ? this.children.get('overwrites').child : undefined;

        files.forEach(source => check(source));
        overwrites && overwrites.forEach(source => check(source));
    }

    async _process(request) {
        const files = this.children.get('files').child;
        const overwrites = this.children.has('overwrites') ? this.children.get('overwrites').child : undefined;
        const functions = this.children.has('functions') ? this.children.get('functions').child : undefined;

        this.#hash = require('./hash')(files, overwrites, functions);

        const done = (result) => {
            result = result ? result : {};
            if (!result || !result.diagnostics) throw new Error('Invalid parameters');
            this.#diagnostics = result.diagnostics;
            this.#code = result.code;
        }

        // Verify that the functions do not contain css code, because in that case they would
        // be injecting code in each file of each processor
        if (functions && !functions.valid) {
            const error = 'Errors found compiling the template functions';
            const diagnostics = new Diagnostics({general: [error]});
            return done({diagnostics: diagnostics});
        }
        if (functions && functions.code) {
            const error = `The template functions must contain only functions and not css code.<br/><br/>${functions.code}`;
            const diagnostics = new Diagnostics({general: [error]});
            return done({diagnostics: diagnostics});
        }

        let input = {sources: [], code: ''};
        const addSources = collection => collection.forEach(source => {
            input.sources.push(source);
            input.code += source.content + '\n';
        });
        addSources(files);
        overwrites && addSources(overwrites);

        const data = (functions && functions.source ? functions.source.code : '') + input.code;
        const {code, errors} = await this.#transpiler(data);
        if (request !== this._request) return;

        // Create the diagnostics object
        const diagnostics = {general: [], files: new Map(), overwrites: new Map()};
        errors && errors.forEach(error => {
            let {line, character, text} = error;
            if (!line) {
                diagnostics.general.push(text);
                return;
            }

            // Find the file where the error belongs to
            let counter = functions && functions.source ? (functions.source.lines - 1) : 0;

            const found = input.sources.find(source => {
                if (line > counter + source.lines) {
                    counter += source.lines;
                    return;
                }

                line = line - counter;
                return true;
            });

            let e;
            if (found.is === 'source') {
                e = diagnostics.files.has(found.file) ? diagnostics.files.get(found.file) : [];
                diagnostics.files.set(found.file, e);
            }
            else {
                e = diagnostics.overwrites.has(found.file) ? diagnostics.overwrites.get(found.file) : [];
                diagnostics.overwrites.set(found.file, e);
            }
            e.push({line: line, character: character, message: text});
        });

        return done({diagnostics: new Diagnostics(diagnostics), code: code});
    }
}
