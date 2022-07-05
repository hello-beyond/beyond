import {Bundle, Package, IMCreators, IExportsDescriptor} from '@beyond-js/kernel/bundle';

interface BundleCreator {
    (ims: IMCreators, exports: { descriptor?: IExportsDescriptor[] }): { dependencies: Set<string> }
}

interface BundleDefinition {
    module: string,
    multibundle?: boolean,
    bundle: string
}

export /*bundle*/
class Transversal {
    readonly #name: string;
    get name() {
        return this.#name;
    }

    readonly #language: string;
    get language() {
        return this.#language;
    }

    constructor(name: string, language?: string) {
        this.#name = name;
        this.#language = language;
    }

    #initialised = false;

    initialise(bundles: Map<BundleDefinition, BundleCreator>) {
        if (this.#initialised) throw new Error(`Transversal "${this.#name}" already initialised`);
        this.#initialised = true;

        const created: Set<{ pkg: Package }> = new Set();

        // First create the bundles and then initialize them,
        // to allow dependencies among bundles of the same traversal
        bundles.forEach((bcreator, definition) => {
            const pkg = new Bundle(definition).package(this.#language);

            const ims: IMCreators = new Map();  // The internal modules map
            const exports: { descriptor?: IExportsDescriptor[] } = {}; // The exports.managed function
            const response = bcreator(ims, exports);

            pkg.exports.descriptor = exports.descriptor;

            // Set the dependencies of the package
            const {dependencies} = response ? response : {dependencies: void 0};
            dependencies && pkg.dependencies.update(dependencies);

            // Register the ims, but do not initialise them until all bundles of the transversal are set
            // To allow dependencies among bundles
            pkg.ims.register(ims);

            created.add({pkg});
        });

        created.forEach(({pkg}) => !pkg.initialised && pkg.initialise());
    }
}
