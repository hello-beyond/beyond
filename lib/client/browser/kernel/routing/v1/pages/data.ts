import type {URI} from "../uri/uri";
import type {IParents, PageConfig} from "../config/pages";

let id = 0;

export class PageInstanceData {
    get is(): string {
        return 'page';
    }

    readonly #id: number;
    get id(): string {
        return `${this.#config.name}:${this.#id}`;
    }

    readonly #config: PageConfig;

    get name(): string {
        return this.#config.name;
    }

    get route(): string {
        return this.#config.route;
    }

    get parents(): IParents {
        return this.#config.parents;
    }

    // The uri property is updated on navigation as the same page can have different addresses
    uri: URI;

    /**
     * Page instance data constructor
     *
     * @param {PageConfig} config
     */
    constructor(config: PageConfig) {
        this.#id = ++id;
        this.#config = config;
    }
}
