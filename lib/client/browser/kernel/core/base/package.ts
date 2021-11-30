/**
 * Resolve the id of a module considering relatives paths to the source that is requiring it
 *
 * @param source {string} The module from where the require is being requested
 * @param id {string} The module being requested
 * @returns {string} The module processed with relative paths
 */
import type {IMSpecs} from "../bundles/package/ims/im";

export function resolve(source: string, id: string) {
    if (!id.startsWith('.')) throw new Error(`Module id must be a relative resource "${id}"`);

    interface Split {
        source?: string[],
        target?: string[]
    }

    const split: Split = {};
    split.source = source.split('/');
    split.source.pop();

    split.target = (id.startsWith('./') ? id.substr(2) : id).split('../');
    while (split.target[0] === '') {
        split.target.shift();
        split.source.pop();
    }

    return split.source.join('/') + '/' + split.target.join('/');
}

/**
 * This class is used only by beyond/core
 */
export class BeyondPackage {
    readonly #ims: Map<string, IMSpecs>;
    readonly #cached: Map<string, Record<string, any>> = new Map();

    constructor(ims?: Map<string, IMSpecs>) {
        this.#ims = ims;
    }

    /**
     * Solve the require function
     *
     * @param source {string} The module from where the require is being triggered
     * @param id {string} The module id being requested
     * @returns {*}
     */
    require(id: string, source?: string): any {
        id = source ? resolve(source, id) : id;

        if (this.#cached.has(id)) return this.#cached.get(id);
        if (!this.#ims.has(id)) throw new Error(`Internal module "${id}" not found`);

        const fn = this.#ims.get(id).creator;
        const require = (required: string) => this.require(required, id); // Here the id is the source of the require
        const exports = {};
        fn(require, exports);

        this.#cached.set(id, exports);
        return exports;
    }
}
