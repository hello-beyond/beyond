import type {Library} from "../libraries/library";
import type {Module} from "../modules/module";
import type {IDependencies} from "./instances/dependencies";
import {Bundle} from './bundle';
import {dependencies} from "./instances/dependencies";

export type Container = Module | Library;

export class Bundles extends Map<string, Bundle> {
    readonly #container: Container;
    get container() {
        return this.#container;
    }

    constructor(container: Container) {
        super();
        this.#container = container;
    }

    obtain(name: string, multilanguage: boolean, deps?: IDependencies): Bundle {
        if (this.has(name)) {
            deps && dependencies.register(deps);
            return this.get(name);
        }

        const bundle = new Bundle(this.#container, name, multilanguage, deps);
        this.set(bundle.name, bundle);
        return bundle;
    }
}
