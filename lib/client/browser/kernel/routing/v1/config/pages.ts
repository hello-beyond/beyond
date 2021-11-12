export interface IPageConfig {
    name: string,
    route?: string,
    layout?: string
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
}

export class PagesConfig extends Map<string, PageConfig> {
    register(pages: IPageConfig[]) {
        for (const page of pages) {
            this.set(page.route, new PageConfig(page));
        }
    }
}
