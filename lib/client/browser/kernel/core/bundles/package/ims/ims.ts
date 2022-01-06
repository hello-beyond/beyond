// Internal modules of the packager
import type {Package} from "../package";
import type {Require} from "../require/require";
import type {Trace} from "../require/trace";
import {InternalModule, IMWrapperFunction, Exports} from "./im";

export type Creators = Map<string, { hash: number, creator: IMWrapperFunction }>;

export class InternalModules {
    #pkg: Package;
    readonly #ims: Map<string, InternalModule> = new Map();
    #require: Require;

    constructor(pkg: Package) {
        this.#pkg = pkg;
    }

    set _require(value: Require) {
        this.#require = value;
    }

    #register = (id: string, hash: number, creator: IMWrapperFunction) => {
        if (this.#ims.has(id)) throw new Error(`IM "${id}" already registered`);

        const im = new InternalModule(this.#pkg, id, hash, creator, this.#require);
        this.#ims.set(im.id, im);
    }

    register(ims: Creators) {
        ims.forEach(({creator, hash}, id) => this.#register(id, hash, creator));
    }

    require(id: string, trace: Trace, source: InternalModule): Exports {
        if (!this.#ims.has(id)) throw new Error(`Module "${id}" not found`);

        const im = this.#ims.get(id);
        return im.require(trace, source);
    }

    initialise() {
        this.#ims.forEach(im => im.initialise());
    }

    update(ims: Creators) {
        ims.forEach(({creator, hash}, id) => {
            if (!this.#ims.has(id)) {
                this.#register(id, hash, creator);
                return;
            }

            const im = this.#ims.get(id);
            if (im.hash === hash) return;
            im.update(creator);
        });
    }
}
