import {BeyondLayoutChildrenRenderer} from "./renderer";

typeof window === 'object' && !customElements.get('beyond-layout-children') &&
customElements.define('beyond-layout-children', class extends HTMLElement {
    #renderer: BeyondLayoutChildrenRenderer;

    constructor() {
        super();
        this.#renderer = new BeyondLayoutChildrenRenderer(this);
    }
});
