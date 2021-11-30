import {config} from "./config/config";
import {Layout} from "./layouts/layout";
import {Pages} from "./pages/pages";
import type {URI} from "./uri/uri";
import type {PageConfig} from "./config/pages";

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
        const {route} = uri.route;
        if (!route) {
            console.error(`Pathname "${uri.pathname}" does not have a page associated to it`);
            return;
        }

        if (!config.pages.has(route)) {
            console.error(`Route "${route}" not found`);
            return;
        }

        const page: PageConfig = config.pages.get(route);
        this.#main.select(this.#pages.register(uri, page));
    }
}
