import {config} from '../../config';
import type {
    WidgetControllerLoader,
    BeyondWidgetController,
    BeyondWidget,
    NodeWidget,
    WidgetSpecs
} from '@beyond-js/kernel/core/ts';
import {pending} from "./pending";

declare const beyond: typeof import('@beyond-js/kernel/core/ts').beyond;

export interface IWidgetControllerLoader {
    new(component: HTMLElement): WidgetControllerLoader;
}

let Loader: IWidgetControllerLoader;

export function hydrate(_Loader: IWidgetControllerLoader) {
    Loader = _Loader;
    pending.hydrate();
}

export class Widget extends HTMLElement {
    #ssrId: number;

    get ssrId(): number {
        return this.#ssrId;
    }

    #loader: WidgetControllerLoader;
    get loader() {
        return this.#loader;
    }

    get controller(): BeyondWidgetController {
        return this.#loader.controller;
    }

    // To identify where the widget is in the widgets tree
    #wnode: NodeWidget;
    get wnode() {
        return this.#wnode;
    }

    get wparent(): BeyondWidget {
        return this.#wnode.parent.widget;
    }

    get wchildren(): BeyondWidget[] {
        return [...this.#wnode.children].map(({widget}) => widget);
    }

    #specs: WidgetSpecs;
    get specs(): WidgetSpecs {
        return this.#specs;
    }

    get is() {
        return this.#specs.is;
    }

    get route(): string {
        return this.#specs.route;
    }

    get layout(): string {
        return this.#specs.layout;
    }

    #oncontroller = () => {
        const event = new CustomEvent('controller.initialised', {bubbles: false, composed: false});
        this.dispatchEvent(event);
    }

    readonly #attrs: string[];
    #render = {
        csr: () => {
            if (!beyond.widgets.has(this.localName)) throw new Error(`Widget "${this.localName}" is not registered`);

            this.#specs = beyond.widgets.get(this.localName);

            // Register the widget in the instances registry after connectedCallback is done
            const This: unknown = this;
            this.#wnode = beyond.widgets.instances.register(<BeyondWidget>This);

            this.#loader = new Loader(this);
            this.#loader.connectedCallback();
            this.#loader.on('controller.initialised', this.#oncontroller);
        }
    }

    constructor(attrs: string[]) {
        super();
        this.#attrs = attrs;
        this.attachShadow({mode: 'open'});
    }

    hydrate() {
        this.#render.csr();
    }

    connectedCallback() {
        if (Loader) {
            this.#render.csr();
            return;
        }

        pending.register(this);
        this.#render.ssr();
    }
}
