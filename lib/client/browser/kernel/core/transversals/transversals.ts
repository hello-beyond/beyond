import {Transversal} from "./transversal";
import type {IDependencies} from "../bundles/instances/dependencies";
import {dependencies} from "../bundles/instances/dependencies";

export const transversals = new class {
    #transversals: Map<string, Transversal> = new Map();

    has(name: string, language: string) {
        const key = `${name}/${language}`;
        return this.#transversals.has(key);
    }

    obtain(name: string, language: string, deps?: IDependencies): Transversal {
        const key = `${name}/${language}`;
        if (this.#transversals.has(key)) return this.#transversals.get(key);

        deps && dependencies.register(deps);

        const transversal = new Transversal(name, language, deps);
        this.#transversals.set(key, transversal);
        return transversal;
    }
}
