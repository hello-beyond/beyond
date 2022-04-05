import {Layout} from "./layouts/layout";
import {Pages} from "./pages/pages";
import type {URI} from "./uri/uri";

export class Manager {
    #main = new Layout(); // A collection of layouts and pages
    get main() {
        return this.#main;
    }

    #pages = new Pages();    // The registry of all the pages that were navigated in the application
    get pages() {
        return this.#pages;
    }

    set(uri: URI) {
        const {element} = uri.route;
        if (!element) {
            console.error(`Pathname "${uri.pathname}" does not have a page associated to it`);
            return;
        }
        this.#main.select(this.#pages.register(uri, element));
    }
}
