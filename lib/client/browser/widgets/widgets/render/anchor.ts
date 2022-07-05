import type {routing as r} from '@beyond-js/kernel/routing';

declare const amd_require: any;

typeof window === 'object' && customElements.define('beyond-link', class extends HTMLElement {
    #routing: typeof r;

    constructor() {
        super();
        amd_require(['@beyond-js/kernel/routing'], (mod: any) => this.#routing = mod.routing);
    }

    connectedCallback() {
        this.addEventListener('click', () => {
            if (!this.hasAttribute('data-url')) return;

            const url = this.getAttribute('data-url');
            this.#routing?.pushState(url);
        });
    }
});
