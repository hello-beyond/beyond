/**
 * Finds the route of a uri. Also supports calling the missing function
 * when the route is not found.
 *
 * @param uri
 * @constructor
 */
import {URI} from "./uri";
import type {IPageFound} from "../config/pages/pages";

declare function require(module: string): any;

export class Route {
    readonly #uri: URI;

    #element: string;
    get element() {
        return this.#element;
    }

    #vars: Map<string, string>;
    get vars() {
        return this.#vars;
    }

    #initialised = false;
    get initialised(): boolean {
        return this.#initialised;
    };

    constructor(uri: URI) {
        this.#uri = uri;
    }

    async initialise() {
        if (this.#initialised) return;
        this.#initialised = true;

        const {pathname} = this.#uri;

        const {routing} = require('../routing');
        let found: IPageFound = routing.config.pages.find(pathname);
        if (!found.element && typeof routing.missing === 'function') {
            found = await routing.missing(this.#uri);
        }

        this.#element = found.element;
        this.#vars = found.vars;
    }
}
