interface IWidgetRendered {
    html?: string,
    errors?: string[],
    css?: string
}

interface IPageRendered {
    hierarchy?: string[],
    widgets?: [string, IWidgetRendered][]
}

declare const __beyond_ssr: IPageRendered;

export const config = new class {
    #hierarchy: string[];
    get hierarchy() {
        return this.#hierarchy;
    }

    #widgets: Map<string, IWidgetRendered>;
    get widgets() {
        return this.#widgets;
    }

    constructor() {
        this.#hierarchy = __beyond_ssr.hierarchy;
        this.#widgets = new Map(__beyond_ssr.widgets);
    }
}