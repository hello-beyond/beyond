import {BeyondLayoutChildrenRenderer} from "./renderer";

typeof window === 'object' && !customElements.get('beyond-layout-children') &&
customElements.define('beyond-layout-children', class extends HTMLElement {
    #renderer: BeyondLayoutChildrenRenderer;

    connectedCallback() {
        // Wait for routing to be created, otherwise a cyclical import occurs
        setTimeout(() => this.#renderer = new BeyondLayoutChildrenRenderer(this), 0);
    }
});
