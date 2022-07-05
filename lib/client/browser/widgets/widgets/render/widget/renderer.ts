import type {BeyondWidget} from "./index";

export interface IWidgetRendered {
    element: string,
    html?: string,
    css?: string,
    errors?: string[],
    warnings?: string[],
    store?: object,
    attributes?: [string, string][]
}

export class Renderer {
    readonly #widget: BeyondWidget;

    constructor(widget: BeyondWidget) {
        this.#widget = widget;
    }

    // Cancellation token
    #ct = 0;

    async render(sr: IWidgetRendered) {
        const ct = ++this.#ct;

        const widget = this.#widget;
        const {specs} = widget;
        if (sr.errors?.length) {
            console.error(`Error fetching static rendered widget "${specs.name}":`, sr.errors);
            return;
        }

        // Append css code
        const {holder, styles} = widget;

        // Check if already rendered by CSR
        if (holder.children.length) return;

        if (!sr.html) return '';
        holder.innerHTML = sr.html.replace(/##_!baseUrl!_##/g, (<any>window).baseUrl);

        // Set the widget styles to be able to know when they are loaded to avoid FOUC (flash of unstyled content)
        const links: string[] = [];
        const resources = holder.querySelectorAll('link');
        resources.forEach(node => links.push(node.href));
        links.length && styles.initialise(links);

        resources.forEach((node: HTMLLinkElement) =>
            node.localName === 'link' && node.addEventListener('load', styles.onloaded));

        // Wait for style sheets be ready
        await styles?.ready;
        if (this.#ct !== ct) return;

        // Once the styles are loaded, show the content of the widget
        holder.style.display = '';
    }
}
