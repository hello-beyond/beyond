import {Layout} from "./layouts/layout";
import {Pages} from "./pages/pages";
import type {URI} from "./uri/uri";
import {PageInstanceData} from "./pages/data";
import {Layouts} from "./layouts/layouts";

export class Manager {
    // The registry of all layouts instances registered in the session, except the main layout
    #layouts = new Layouts();
    get layouts() {
        return this.#layouts;
    }

    // The main layout can be the layout set in the project.json, or the beyond-layout-children
    // set when the project does not have set a layout
    #main = new Layout(this.#layouts);
    get main() {
        return this.#main;
    }

    // The registry of all the pages that were navigated in the application
    #pages = new Pages();
    get pages() {
        return this.#pages;
    }

    set(uri: URI) {
        const {element} = uri.route;
        if (!element) {
            console.error(`Pathname "${uri.pathname}" does not have a page associated to it`);
            return;
        }

        const page: PageInstanceData = this.#pages.register(uri, element);

        // Property page.parents is an array that contains the descending list of layouts where the page is contained
        const {error, value: descending} = page.parents;
        if (error) {
            console.error(`Page on "${uri.uri}" cannot be shown: ${error}`);
            return;
        }

        this.#main.select(page, descending);
    }
}
