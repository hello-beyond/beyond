export interface ILayoutConfig {
    name: string,
    layout?: string
}

export class LayoutConfig {
    get is() {
        return 'layout';
    }

    readonly #element: string;
    get element() {
        return this.#element;
    }

    // Since there cannot be more than the same layout in the same container,
    // the identifier can simply be the name
    get id(): string {
        return this.#element;
    }

    readonly #layout: string;
    get layout() {
        return this.#layout;
    }

    constructor(config: ILayoutConfig) {
        this.#element = config.name;
        this.#layout = config.layout;
    }
}
