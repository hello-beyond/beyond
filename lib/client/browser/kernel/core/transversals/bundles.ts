import type {BundleWrapperFnc} from "./bundle";
import {TransversalBundle} from "./bundle";
import type {Transversal} from "./transversal";
import type {IProcessorsSpecs} from "../modules/module";

export type Creators = Map<string, { hash: number, specs: IProcessorsSpecs, creator: BundleWrapperFnc }>;

export class Bundles extends Map<string, TransversalBundle> {
    readonly #transversal: Transversal;

    constructor(transversal: Transversal) {
        super();
        this.#transversal = transversal;
    }

    #register = (id: string, hash: number, specs: IProcessorsSpecs, creator: BundleWrapperFnc) => {
        const bundle = new TransversalBundle(this.#transversal, id, hash, specs, creator);
        this.set(bundle.id, bundle);
    }

    initialise(bundles: Creators) {
        bundles.forEach(({creator, specs, hash}, id) =>
            this.#register(id, hash, specs, creator));
        this.forEach(bundle => bundle.initialise());
    }
}
