import type {BeyondLayoutChildrenRenderer} from '@beyond-js/kernel/routing/ts';
import type {IWidgetControllerLoader} from './widget';
import './layout-children';
import {config} from '../config';
import {Widget} from "./widget";

export const widgets = new class {
    #WidgetControllerLoader: IWidgetControllerLoader;
    #instances: Set<Widget> = new Set();
    #initialised = false;

    #roots: Map<Node, Widget> = new Map();
    get roots() {
        return this.#roots;
    }

    constructor() {
        // Register the widgets required by the initial navigated page
        const {hierarchy} = config;
        hierarchy.forEach((element, index) => {
            if (customElements.get(element)) return; // Element is already registered
            customElements.define(element, class extends Widget {
                constructor() {
                    super(index);
                }
            });
        });
    }

    registerInstance(instance: Widget) {
        this.#instances.add(instance);
        this.#roots.set(instance.shadowRoot, instance);

        if (!this.#WidgetControllerLoader) return;
        instance.hydrate(this.#WidgetControllerLoader);
    }

    hydrate(WidgetControllerLoader: IWidgetControllerLoader, BeyondLayoutChildrenRenderer: BeyondLayoutChildrenRenderer) {
        if (this.#initialised) throw new Error('Widgets already initialised');

        this.#WidgetControllerLoader = WidgetControllerLoader;
        this.#initialised = true;
        this.#instances.forEach(instance => instance.hydrate(WidgetControllerLoader));

        require('./layout-children').instances.hydrate(BeyondLayoutChildrenRenderer);
    }
}
