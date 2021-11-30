import {PagesConfig} from "./pages";
import {LayoutsConfig} from "./layouts";

class CRoutingConfig {
    readonly #layouts = new LayoutsConfig;
    get layouts() {
        return this.#layouts;
    }

    readonly #pages = new PagesConfig;
    get pages() {
        return this.#pages;
    }
}

export type RoutingConfig = CRoutingConfig;

export const config = new CRoutingConfig;
