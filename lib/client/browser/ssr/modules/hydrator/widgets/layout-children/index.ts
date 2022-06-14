import {config} from '../../config';
import {pending} from "./pending";
import type {BeyondLayoutChildrenRenderer} from '@beyond-js/kernel/routing/ts';

interface IBeyondLayoutChildrenRenderer {
    new(component: HTMLElement): BeyondLayoutChildrenRenderer;
}

let Renderer: IBeyondLayoutChildrenRenderer;

export function hydrate(_Renderer: IBeyondLayoutChildrenRenderer) {
    Renderer = _Renderer;
    pending.hydrate();
}

export class BeyondLayoutChildren extends HTMLElement {
    #renderer: BeyondLayoutChildrenRenderer;

    #render = {
        ssr: () => {
            // Create the child element
            const child = (() => {
                const {roots} = require('../widget/pending').pending;
                const container = roots.get(this.getRootNode());

                if (!container) {
                    throw new Error(`Container of "${this.localName}" not found`);
                }

                if (container === document) {
                    // If config.main is defined, the container for beyond-layout-children should never be
                    // the page document, but should be contained in a layout
                    return config.main ? void 0 : config.page.element;
                }

                if (container.localName === config.main) {
                    return config.page.parents?.length ? config.page.parents[0] : config.page.element;
                }

                const index = config.page.parents?.indexOf(container.localName);
                if (index === -1) return;

                if (index === config.page.parents.length - 1) {
                    // It is the last layout of the parents of the page, so the child is the page
                    return config.page.element;
                } else {
                    // The child that needs to be added is the following layout in the list of parents of the page
                    return config.page.parents[index + 1];
                }
            })();

            if (!child) {
                console.error('Child element not found on beyond-layout-children', parent);
                return;
            }

            const el = document.createElement(child);
            this.shadowRoot.appendChild(el);
        },
        csr: () => {
            // If the app was already hydrated, just give control to the renderer
            this.#renderer = new Renderer(this);
        }
    }

    connectedCallback() {
        if (Renderer) {
            this.#render.csr();
            return;
        }

        this.attachShadow({mode: 'open'});
        pending.register(this);
        this.#render.ssr();
    }

    hydrate() {
        this.#render.csr();
    }
}

customElements.define('beyond-layout-children', BeyondLayoutChildren);
