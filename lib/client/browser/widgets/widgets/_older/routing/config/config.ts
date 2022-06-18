import {PagesConfig} from "./pages/pages";
import {LayoutsConfig} from "./layouts/layouts";

export const config = new class RoutingConfig {
    readonly #layouts = new LayoutsConfig;
    get layouts() {
        return this.#layouts;
    }

    readonly #pages = new PagesConfig;
    get pages() {
        return this.#pages;
    }
}
