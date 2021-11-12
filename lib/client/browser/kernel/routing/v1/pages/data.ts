import type {URI} from "../uri/uri";
import type {PageConfig} from "../config/pages";
import type {LayoutConfig} from "../config/layouts";

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

    readonly #parents: LayoutConfig[];
    get parents() {
        return this.#parents;
    }

    uri: URI;

    /**
     * Page instance data constructor
     *
     * @param {PageConfig} config
     * @param {LayoutConfig[]} parents The list of ascending layouts of the page
     */
    constructor(config: PageConfig, parents: LayoutConfig[]) {
        this.#id = ++id;
        this.#config = config;
        this.#parents = parents;
    }
}
