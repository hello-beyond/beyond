import type {Package} from "../package";
import type {Require} from "../require/require";
import {Trace} from "../require/trace";

export type Exports = Record<string, any>;

export type IMWrapperFunction = (rq: (id: string) => any, exports: Exports, trace?: Trace) => void;
export type IMSpecs = { hash: number, creator: IMWrapperFunction };

// Bundle internal module
export class InternalModule {
    readonly #pkg: Package;

    get package() {
        return this.#pkg;
    }

    readonly #id: string;
    get id() {
        return this.#id;
    }

    #hash: number;
    get hash() {
        return this.#hash;
    }

    readonly #require: Require;

    #exports: Exports = {};

    #creator: IMWrapperFunction;
    #created = false;
    get created() {
        return this.#created;
    }

    #create = (trace: Trace) => {
        if (this.#created) throw new Error(`Internal module "${this.#id}" already created`);

        const require = (id: string) => this.#require.solve(id, trace, this);

        Object.keys(this.#exports).forEach(key => delete this.#exports[key]);
        this.#creator(require, this.#exports);
        this.#created = true;
    }

    require(trace: Trace, source: InternalModule): Exports {
        if (!this.#created) {
            source && trace.register(source.id, this.#id);
            this.#create(trace);
            trace.pop();
        }
        return this.#exports;
    }

    initialise() {
        if (this.#created) return;

        const trace = new Trace();
        trace.register('initialisation', this.#id);
        this.#create(trace);
    }

    update(creator: IMWrapperFunction, hash: number) {
        this.#created = false;
        this.#creator = creator;
        this.#hash = hash;
    }

    constructor(pkg: Package, id: string, hash: number, creator: IMWrapperFunction, require: Require) {
        this.#pkg = pkg;
        this.#id = id;
        this.#hash = hash;
        this.#creator = creator;
        this.#require = require;
    }
}
