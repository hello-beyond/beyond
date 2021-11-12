import {config} from "./config/config";
import {Layout} from "./layouts/layout";
import {Pages} from "./pages/pages";
import type {URI} from "./uri/uri";
import type {PageConfig} from "./config/pages";
import type {LayoutConfig} from "./config/layouts";

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
        const route = uri.route.route;
        if (!route) {
            console.error(`Pathname "${uri.pathname}" does not have a page associated to it`);
            return;
        }

        if (!config.pages.has(route)) {
            console.error(`Route "${route}" not found`);
            return;
        }

        const page: PageConfig = config.pages.get(route);

        // Ascending list of container layouts of the page being navigated
        let layouts: LayoutConfig[];
        let layoutName: string = page.layout;
        while (layoutName && layoutName !== 'main') {
            if (layoutName !== 'main' && !config.layouts.has(layoutName)) {
                console.error(`The layout "${layoutName}" required by route "${route}" ` +
                    `in the page "${page.name}" was not found`);
                return;
            }

            const layout = config.layouts.get(layoutName);
            layouts = layouts ? layouts : [];
            layouts.unshift(layout);
            layoutName = layout.layout;
        }

        this.#main.select(this.#pages.register(uri, page, layouts));
    }
}
