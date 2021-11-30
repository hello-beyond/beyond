export interface ILayoutConfig {
    name: string,
    layout?: string
}

export class LayoutConfig implements ILayoutConfig {
    get is() {
        return 'layout';
    }

    readonly #name: string;
    get name() {
        return this.#name;
    }

    // Since there cannot be more than the same layout in the same container,
    // the identifier can simply be the name
    get id(): string {
        return this.#name;
    }

    readonly #layout: string;
    get layout() {
        return this.#layout;
    }

    constructor(config: ILayoutConfig) {
        this.#name = config.name;
        this.#layout = config.layout;
    }
}

export class LayoutsConfig extends Map<string, LayoutConfig> {
    register(layouts: ILayoutConfig[]) {
        for (const layout of layouts) {
            this.set(layout.name, new LayoutConfig(layout));
        }
    }
}
