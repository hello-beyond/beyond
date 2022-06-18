import {LayoutConfig} from "../layouts/layout";
import type {config as tconfig} from "../config";

declare function require(module: string): any;

export interface IPageConfig {
    name: string,
    route?: string,
    layout?: string
}

export interface IParents {
    error?: string,
    value?: LayoutConfig[]
}

export class PageConfig {
    get is() {
        return 'page';
    }

    readonly #element: string;
    get element() {
        return this.#element;
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
        this.#element = page.name;
        this.#route = page.route;
        this.#layout = page.layout;
    }

    /**
     * Returns the ascending layouts
     *
     * @return {{error?: string, parents?: LayoutConfig[]}}
     */
    get parents(): IParents {
        const config = <typeof tconfig>require('../config').config;

        // Ascending list of containers layouts of the current page
        const value: LayoutConfig[] = [];
        let layoutName: string = this.layout;
        while (layoutName) {
            if (!config.layouts.has(layoutName)) {
                const error = `Layout "${layoutName}" not found`;
                return {error};
            }

            const layout = config.layouts.get(layoutName);
            value.unshift(layout);
            layoutName = layout.layout;
        }

        return {value};
    }
}
