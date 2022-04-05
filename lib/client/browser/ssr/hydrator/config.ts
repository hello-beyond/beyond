interface IWidgetRendered {
    html?: string,
    errors?: string[],
    css?: string,
    store: object
}

interface IPageRendered {
    hierarchy?: string[],
    widgets?: [number, IWidgetRendered][]
}

declare const __beyond_ssr: IPageRendered;

export const config = new class {
    readonly #hierarchy: string[];
    get hierarchy() {
        return this.#hierarchy;
    }

    readonly #widgets: Map<number, IWidgetRendered>;
    get widgets() {
        return this.#widgets;
    }

    constructor() {
        this.#hierarchy = __beyond_ssr.hierarchy;
        this.#widgets = new Map(__beyond_ssr.widgets);
    }
}