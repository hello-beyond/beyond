import type {Package} from "../package";
import type {InternalModule} from "../ims/im";
import {Trace} from "./trace";
import {resolve} from "../base";
import externals from "../externals";
import instances from "../package/instances";

export class Require {
    readonly #pkg: Package;
    get pkg() {
        return this.#pkg;
    }

    constructor(pkg: Package) {
        this.#pkg = pkg;
    }

    /**
     * Solve a cjs require function
     *
     * @param {string} id The id of the internal module being required
     * @param {Trace} trace {object} The internal trace to find cyclical dependencies of internal modules
     * @param {InternalModule=} im The internal module that is making the call
     * @return {*}
     */
    solve(id: string, trace: Trace, im?: InternalModule): any {
        if (id.startsWith('.')) {
            // Relative require (internal module)
            id = im ? resolve(im.id, id) : id;
            return this.#pkg.ims.require(id, trace, im);
        }

        // It is a non-relative require
        if (externals.has(id)) return externals.get(id);
        if (instances.has(id)) {
            const pkg = instances.get(id);
            !pkg.initialised && pkg.initialise();
            return pkg.exports.values;
        }

        if (id === 'beyond_context') {
            const {bundle} = this.#pkg;
            return {module: bundle.module, bundle, pkg: this.#pkg};
        }

        // @beyond-js/kernel/transversals requires the Bundle object
        if (id === '@beyond-js/kernel/bundle') {
            const {Bundle} = require('../bundle');
            const {instances} = require('../instances');
            return {Bundle, instances};
        }

        throw new Error(`Bundle "${id}" not found`);
    }
}
