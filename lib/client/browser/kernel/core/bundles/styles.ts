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

    #version = 0;
    get version() {
        return this.#version;
    }

    // Is the stylesheet appended to the DOM of the page (not a shadow dom of a widget)
    #appended = false;
    get appended() {
        return this.#appended;
    }

    #value: string;
    set value(value: string) {
        // Find and replace #host...
        const regexp = /#host\.(.*?)#(.*?)[)\s]/g;
        this.#value = value.replace(regexp, (match, host, resource) => `packages/${resource}`);

        this.#version++;
        this.#version > 1 && this.trigger('change', this);
    }

    css(): HTMLStyleElement {
        if (!this.#value) return;

        const css = document.createElement('style');
        css.type = 'text/css';
        css.setAttribute('bundle', this.id);
        css.appendChild(document.createTextNode(this.#value));
        return css;
    }

    constructor(bundle: Bundle) {
        super();
        this.#bundle = bundle;
    }

    appendToDOM(is: string) {
        if (!this.#value) throw new Error(`CSS values are not set on bundle "${this.id}"`);
        if (this.#appended) {
            const previous = document.querySelectorAll(`:scope > [bundle="${this.id}"]`)[0];
            previous && document.removeChild(previous);
        }

        const css = this.css();
        is && css.setAttribute('is', is);
        document.getElementsByTagName('head')[0].appendChild(css);

        this.#appended = true;
    };
}
