import type {BeyondLayoutChildrenRenderer} from '@beyond-js/kernel/routing/ts';
import type {IWidgetControllerLoader} from './widget';
import './layout-children';
import {config} from '../config';
import {Widget} from "./widget";

export const widgets = new class {
    #hydrated = false;

    #initialise = () => {
        // Register the widgets required by the initial navigated page
        const {widgets} = config;
        const elements = [...widgets.values()].map(({element}) => element);

        elements.forEach(element => {
            if (customElements.get(element)) return; // Element is already registered

            const WidgetElement = class extends Widget {
                static #props: string[];

                static get observedAttributes(): string[] {
                    if (this.#props) return this.#props;
                    const {attributes} = [...widgets.values()].find(({element: e}) => e === element);
                    return this.#props = [...new Map(attributes).keys()];
                }

                constructor() {
                    super(WidgetElement.observedAttributes);
                }
            }

            customElements.define(element, WidgetElement);
        });
    }

    constructor() {
        config.ready.then(this.#initialise);
    }

    hydrate(WidgetControllerLoader: IWidgetControllerLoader, BeyondLayoutChildrenRenderer: BeyondLayoutChildrenRenderer) {
        if (this.#hydrated) throw new Error('Widgets already hydrated');
        this.#hydrated = true;

        require('./widget').hydrate(WidgetControllerLoader);
        require('./layout-children').hydrate(BeyondLayoutChildrenRenderer);
    }
}
