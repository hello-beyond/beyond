import type {Package} from "../package";
import type {InternalModule} from "../ims/im";
import {Trace} from "./trace";
import {resolve} from "../../../base/package";
import {dependencies} from "../../instances/dependencies";
import {instances} from "../../instances/instances";
import {transversals} from "../../../transversals/transversals";

export class Require {
    readonly #pkg: Package;

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
        if (id === 'beyond_context') {
            const {container} = this.#pkg.bundle;
            return {
                bundle: this.#pkg.bundle,
                module: container.is === 'module' ? container : void 0,
                library: container.is === 'library' ? container : void 0
            };
        }

        // Check for non-relative require
        if (!id.startsWith('.')) {
            if (dependencies.has(id)) return dependencies.get(id);
            if (instances.has(id)) return instances.get(id).package().exports.values;

            // Check if the bundle that is being required is a transversal,
            // and it is in the same transversal of the bundle that is requiring it,
            // and it has not been initialised yet
            const name = id.split('/').pop();
            if (!transversals.has(name, '') || this.#pkg.bundle.name !== name) {
                throw new Error(`Dependency "${id}" not found`);
            }

            const transversal = transversals.obtain(name, '');
            transversal.bundles.get(id).initialise();
            return instances.get(id).package().exports.values;
        }

        // Relative require (internal module)
        id = im ? resolve(im.id, id) : id;
        return this.#pkg.ims.require(id, trace, im);
    }
}
