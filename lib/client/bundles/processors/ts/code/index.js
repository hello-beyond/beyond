const {ipc} = global.utils;
const DynamicProcessor = global.utils.DynamicProcessor();

module.exports = class extends DynamicProcessor {
    get dp() {
        return 'ts-processor.code';
    }

    #specs;

    _notify() {
        const message = {
            type: 'change',
            bundle: this.#specs.bundle.resource,
            processor: 'ts'
        };
        ipc.notify('processors', message);
    }

    get diagnostics() {
        const compiler = this.children.get('compiler').child;
        return compiler.diagnostics;
    }

    get valid() {
        return this.diagnostics.valid;
    }

    /**
     * Code packager constructor
     *
     * @param specs {{bundle: {id: string, resource: string, name: string, container: {is: string}, path: string, pathname: string}, distribution: object, application: object, watcher: object}}
     * @param compiler {object} The tsc compiler
     */
    constructor(specs, compiler) {
        super();

        this.#specs = specs;
        super.setup(new Map([['compiler', {child: compiler}]]));
    }

    #process = (hmr) => {
        if (!this.valid) return;
        const compiler = this.children.get('compiler').child;
        return require('./process')(this.#specs, compiler, hmr);
    }

    #code;
    get code() {
        return this.#code !== undefined ? this.#code : (this.#code = this.#process(false));
    }

    #hmr;
    get hmr() {
        return this.#hmr !== undefined ? this.#hmr : (this.#hmr = this.#process(true));
    }

    _process() {
        this.#code = this.#hmr = undefined;
    }
}
