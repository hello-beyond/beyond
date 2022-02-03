import {Bundle} from "../bundle";
import {Events} from "../../utils/events/events";
import type {Beyond} from "../../beyond";

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

    #mode: string;
    set mode(value: string) {
        if (value !== 'external') throw new Error(`Invalid mode "${value}"`);
        this.#mode = value;
    }

    #beyond: Beyond;
    get beyond(): Beyond {
        if (this.#beyond) return this.#beyond;
        return this.#beyond = require('../../beyond').beyond;
    }

    // Is the stylesheet appended to the DOM of the page (not a shadow dom of a widget)
    #appended = false;
    get appended() {
        return this.#appended;
    }

    #value: string;
    set value(value: string) {
        // Find and replace #host...
        const regexp = /#host\.([\w\d]*)#([^.]*\.[\w\d]*)/g;
        this.#value = value.replace(regexp, (match, host, resource) => {
            if (host === 'module' || host === 'library') {
                return `${this.#bundle.container.pathname}/static/${resource}`;
            } else if (host === 'application') {
                return `${this.beyond.baseUrl}${resource}`;
            }
            console.warn(`Invalid css host specification on bundle "${this.#bundle.id}"`, match);
        });

        this.#version++;
        this.#version > 1 && this.trigger('change', this);
    }

    css(): HTMLStyleElement {
        if (this.#mode !== 'external' && !this.#value) return;

        let css;
        if (this.#mode === 'external') {
            css = document.createElement('link');
            css.rel = 'stylesheet';
            css.type = 'text/css';
            css.href = `${this.beyond.baseUrl}${this.#bundle.pathname}.css`;
        } else {
            css = document.createElement('style');
            css.appendChild(document.createTextNode(this.#value));
        }
        css.setAttribute('bundle', this.id);

        return css;
    }

    constructor(bundle: Bundle) {
        super();
        this.#bundle = bundle;

        const change = (processor: string) => this.trigger('change', this, processor);

        const language = '.';
        bundle.hmr.on(`.css//${language}`, change);
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
    }
}
