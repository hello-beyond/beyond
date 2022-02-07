import type {BeyondLayoutChildrenRenderer} from '@beyond-js/kernel/core/ts';
import {config} from '../config';

export const instances = new class {
    #BeyondLayoutChildrenRenderer: BeyondLayoutChildrenRenderer;

    #instances: Set<BeyondLayoutChildren> = new Set();

    register(instance: BeyondLayoutChildren) {
        this.#instances.add(instance);

        if (!this.#BeyondLayoutChildrenRenderer) return;
        instance.hydrate(this.#BeyondLayoutChildrenRenderer);
    }

    hydrate(BeyondLayoutChildrenRenderer: BeyondLayoutChildrenRenderer) {
        this.#BeyondLayoutChildrenRenderer = BeyondLayoutChildrenRenderer;
        this.#instances.forEach(instance => instance.hydrate(this.#BeyondLayoutChildrenRenderer));
    }
}

class BeyondLayoutChildren extends HTMLElement {
    #renderer: BeyondLayoutChildrenRenderer;

    constructor() {
        super();
        this.attachShadow({mode: 'open'});
    }

    connectedCallback() {
        if (this.#renderer) return;

        const {roots} = require('./widgets').widgets;
        const {hierarchy} = config;

        // Create the child element
        const parent = roots.get(this.getRootNode());
        const child = hierarchy[hierarchy.indexOf(parent.localName) + 1];

        const el = document.createElement(child);
        this.shadowRoot.appendChild(el);
    }

    hydrate(Renderer: BeyondLayoutChildrenRenderer) {
        this.#renderer = new Renderer(this);
    }
}

customElements.define('beyond-layout-children', BeyondLayoutChildren);
