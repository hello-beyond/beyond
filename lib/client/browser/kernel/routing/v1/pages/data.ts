import type {URI} from "../uri/uri";
import type {IParents} from "../config/pages/page";

declare function require(module: string): any;

let id = 0;

export class PageInstanceData {
    get is(): string {
        return 'page';
    }

    readonly #element: string;
    get element() {
        return this.#element;
    }

    readonly #id: number;
    get id(): string {
        return `${this.#element}:${this.#id}`;
    }

    #config() {
        const {routing} = require('../routing');
        return routing.config.pages.get(this.#element);
    }

    get parents(): IParents {
        return this.#config().parents;
    }

    // The uri property is updated on navigation as the query string of the page can change
    uri: URI;

    constructor(element: string) {
        this.#element = element;
        this.#id = ++id;
    }
}
