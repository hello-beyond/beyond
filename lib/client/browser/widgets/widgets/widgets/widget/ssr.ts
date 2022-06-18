import {BeyondWidget} from "./index";
import {prerender} from "../prerendered";
import {IWidgetRendered, Renderer} from "./renderer";
import hosts from '../hosts';

export class WidgetSSR {
    readonly #widget: BeyondWidget;
    readonly #renderer: Renderer;

    #prerender: IWidgetRendered;
    get prerender() {
        return this.#prerender;
    }

    constructor(widget: BeyondWidget) {
        this.#widget = widget;
        this.#renderer = new Renderer(widget);
    }

    #initialised = false;

    /**
     * Check if widget is already pre-rendered (index.html makes a page ssr fetch)
     */
    async initialise() {
        // Check if SSR is enabled for this widget
        if (!this.#widget.specs.render.ssr) return;

        if (this.#initialised) throw new Error('Widget SSR already initialised');
        this.#initialised = true;

        const widget = this.#widget;
        const {specs} = widget;
        const attrs = new Map(specs.attrs ? specs.attrs.map(attr => [attr, widget.getAttribute(attr)]) : void 0);
        const found = prerender.find(specs.name, attrs);

        // If the widget has not been loaded by routing SSR, then load the widget alone
        if (!found) {
            return await this.#load();
        }
        this.#prerender = found;

        // Finally render the widget
        await this.#renderer.render(found);
    }

    async #load(): Promise<void> {
        const {specs} = this.#widget;
        const {id, name} = specs;
        const split = id.split('/');
        const pkg = split[0].startsWith('@') ? `${split.shift()}/${split.shift()}` : split.shift();
        if (!hosts.has(pkg)) {
            console.error(`SSR host of widget "${name}" not found`, pkg, hosts);
            return;
        }

        const host = hosts.get(pkg);
        const language = (() => {
            const {multilanguage} = specs.render;
            if (!multilanguage) return '';

            let language = localStorage.__beyond_language;
            language = language ? language : navigator.language;
            language = language.slice(0, 2);
            return `&language=${language}`;
        })();

        let attrs = (() => {
            if (!specs.attrs?.length) return '';

            let attrs = '&attrs=' + specs.attrs.join(',');
            specs.attrs.forEach(attr => {
                const value = this.#widget.getAttribute(attr);
                if (!value) return;
                attrs += `&attr.${attr}=${value}`
            });
        })();

        const url = `${host}/widget?name=${name}${language}${attrs}`

        try {
            const response = await fetch(url);
            if (response.status !== 200) {
                console.error(`Error fetching SSR of widget "${specs.name}". Status code: ${response.status}`);
                return;
            }
            const sr = await response.json();

            // Finally render the widget
            await this.#renderer.render(sr);
        } catch (exc) {
            console.error(exc.stack);
        }
    }
}
