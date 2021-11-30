import {Bundle} from "./bundle";
import {Events} from "../utils/events/events";

export /*bundle*/
class BundleStyles extends Events {
    processor: string;

    readonly #bundle: Bundle;
    get bundle() {
        return this.#bundle;
    }

    get id(): string {
        return this.#bundle.id;
    }

    // Is the stylesheet appended to the DOM of the page (not a shadow dom of a widget)
    #dom = false;
    get dom() {
        return this.#dom;
    }

    #css: HTMLStyleElement;
    get css() {
        return this.#css;
    }

    constructor(bundle: Bundle) {
        super();
        this.#bundle = bundle;
    }

    #appended = false;

    set value(value: string) {
        if (this.#appended) {
            document.getElementsByTagName('head')[0].removeChild(this.#css);
            this.#appended = false;
        }

        // Find and replace #host...
        const regexp = /#host\.(.*?)#(.*?)[)\s]/g;
        const processed = value.replace(regexp, (match, host, resource) => `packages/${resource}`);

        // Create style element
        const changed = this.#css;
        this.#css = document.createElement('style');
        this.#css.type = 'text/css';
        this.#css.setAttribute('bundle', this.id);

        // Append styles into the DOM
        this.#css.appendChild(document.createTextNode(processed));
        changed && this.trigger('change', this);
    }

    appendToDOM(is: string) {
        this.#dom = true;

        if (this.#appended) throw new Error(`CSS of bundle "${this.id} was already appended to DOM`);
        if (!this.#css) throw new Error(`CSS values are not set on bundle "${this.id}"`);

        is && this.#css.setAttribute('is', is);
        document.getElementsByTagName('head')[0].appendChild(this.#css);
        this.#appended = true;
    };
}
