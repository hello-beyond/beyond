import type {BeyondWidgetController} from '../controller/controller';
import type {WidgetSpecs} from '../widgets';
import {WidgetControllerLoader} from './loader';
import {instances} from '../instances/instances';
import {NodeWidget} from '../instances/node';

// In SSR environment HTMLElement is not defined
const Element = typeof HTMLElement === 'undefined' ? null : HTMLElement;

export class BeyondWidget extends Element {
    readonly #loader: WidgetControllerLoader;
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

    readonly #specs: WidgetSpecs;
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
        const event = new CustomEvent('controller.loaded', {bubbles: true, composed: true});
        this.dispatchEvent(event);
    }

    constructor() {
        super();

        this.attachShadow({mode: 'open'});

        const {widgets} = require('../widgets');
        this.#specs = widgets.get(this.localName);

        this.#loader = new WidgetControllerLoader(this);
        this.#loader.on('controller.loaded', this.#oncontroller);
    }

    connectedCallback() {
        // Register the widget in the instances registry after connectedCallback is done
        this.#wnode = instances.register(this);

        this.#loader.connectedCallback();
    }
}
