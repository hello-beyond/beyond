import type {Bundle} from "../../bundles/item";
import type {Module} from "../../modules/item";

export class ApplicationModuleBundle {
    readonly #module: Module;
    readonly #bundle: Bundle;

    /**
     * TODO: @julio check, the bundles are not being treat as a modules now.
     */
    get id(): string {
        return `${this.#module.id}`;
    }

    get type(): string {
        return this.#bundle.name;
    }

    get moduleId(): string {
        return this.#module.id;
    }

    get module(): Module {
        return this.#module;
    }

    get hasTxt(): boolean {
        return this.#module.bundles.has(`${this.#module.id}//txt`);
    }

    get name(): string {
        return this.#module.name;
    }

    get description(): string {
        return this.#module.description;
    }

    constructor(module: Module, bundle: Bundle) {
        this.#module = module;
        this.#bundle = bundle;
    }
}