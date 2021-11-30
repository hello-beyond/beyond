import {LayoutConfig} from "./layouts";
import type {RoutingConfig} from "./config";

declare function require(module: string): any;

export interface IPageConfig {
    name: string,
    route?: string,
    layout?: string
}

export interface IParents {
    error?: string,
    parents?: LayoutConfig[]
}

export class PageConfig implements IPageConfig {
    get is() {
        return 'page';
    }

    readonly #name: string;
    get name() {
        return this.#name;
    }

    readonly #route: string;
    get route() {
        return this.#route;
    }

    readonly #layout: string;
    get layout() {
        return this.#layout;
    }

    constructor(page: IPageConfig) {
        this.#name = page.name;
        this.#route = page.route;
        this.#layout = page.layout;
    }

    /**
     * Returns the ascending layouts
     *
     * @return {{error?: string, parents?: LayoutConfig[]}}
     */
    get parents(): IParents {
        const config = <RoutingConfig>require('./config');

        // Ascending list of containers layouts of the page being navigated
        const parents: LayoutConfig[] = [];
        let layoutName: string = this.layout;
        while (layoutName && layoutName !== 'main') {
            if (!config.layouts.has(layoutName) && layoutName !== 'main') {
                const error = `Layout "${layoutName}" not found`;
                return {error};
            }

            const layout = config.layouts.get(layoutName);
            parents.unshift(layout);
            layoutName = layout.layout;
        }

        return {parents};
    }
}

export class PagesConfig extends Map<string, PageConfig> {
    register(pages: IPageConfig[]) {
        for (const page of pages) {
            this.set(page.route, new PageConfig(page));
        }
    }
}
