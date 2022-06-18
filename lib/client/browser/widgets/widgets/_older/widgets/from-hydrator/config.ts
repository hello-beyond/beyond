interface IWidgetRendered {
    element: string,
    html?: string,
    errors?: string[],
    css?: string,
    store?: object,
    attributes?: Map<string, string>
}

interface IPageRendered {
    errors?: string[],
    warnings?: string [],
    redirected?: string,
    main?: string,
    page?: {
        element: string,
        parents: string[]
    },
    widgets?: [number, IWidgetRendered][]
}

declare const __beyond_ssr: IPageRendered;

export const config = new class {
    #errors: string[];
    get errors() {
        return this.#errors;
    }

    #warnings: string[];
    get warnings() {
        return this.#warnings;
    }

    #redirected: string;
    get redirected() {
        return this.#redirected;
    }

    /**
     * The main layout defined in the project.json
     *
     * @type {string}
     * @private
     */
    #main: string;
    get main() {
        return this.#main;
    }

    /**
     * The page element, and its parents layouts
     *
     * @type {{element: string, parents: string[]}}
     * @private
     */
    #page: { element: string, parents: string[] };
    get page() {
        return this.#page;
    }

    #widgets: Map<number, IWidgetRendered>;
    get widgets() {
        return this.#widgets;
    }

    #resolve: () => void;
    #promise: Promise<void> = new Promise(resolve => this.#resolve = resolve);

    get ready() {
        return this.#promise;
    }

    #initialise() {
        this.#errors = __beyond_ssr.errors;
        this.#warnings = __beyond_ssr.warnings;
        this.#redirected = __beyond_ssr.redirected;
        this.#main = __beyond_ssr.main;
        this.#page = __beyond_ssr.page;
        this.#widgets = new Map(__beyond_ssr.widgets);

        this.#widgets.forEach(widget => widget.attributes = new Map(widget.attributes));
        this.#resolve();
    }

    constructor() {
        setTimeout(() => {
            this.#initialise();
        }, 5000);
    }
}
