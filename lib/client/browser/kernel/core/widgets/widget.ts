import type {widgets, WidgetSpecs} from './widgets';
import type {beyond} from "../beyond";
import type {BeyondWidgetController} from "./controller/controller";
import {instances} from "./instances/instances";
import type {NodeWidget} from "./instances/node";

type Beyond = typeof beyond;
type Widgets = typeof widgets;

declare function require(module: string): any;

const Element = typeof HTMLElement === 'undefined' ? null : HTMLElement;

export class BeyondWidget extends Element {
    readonly #specs: WidgetSpecs;

    get is() {
        return this.#specs.is;
    }

    get route(): string {
        return this.#specs.route;
    }

    get layout(): string {
        return this.#specs.layout;
    }

    #bundle: any;
    get bundle() {
        return this.#bundle;
    }

    // To identify where the widget is in the widgets tree
    #node: NodeWidget;
    get node() {
        return this.#node;
    }

    #controller: BeyondWidgetController;
    get controller() {
        return this.#controller;
    }

    #error: string;
    get error() {
        return this.#error;
    }

    readonly #id: string;
    get id() {
        return this.#id;
    }

    #loading: boolean = false;
    get loading() {
        return this.#loading;
    }

    #loaded: boolean = false;
    get loaded() {
        return this.#loaded;
    }

    #holders = new Set(['connected', 'loaded']);

    #initialise = () => {
        const beyond: Beyond = require('../beyond').beyond;
        beyond.import(this.#id).then(bundle => {
            this.#bundle = bundle;
            this.#loading = false;
            this.#loaded = true;
            this.#holders.delete('loaded');
            this.#render();
        }).catch(exc => {
            console.log(`Error loading widget "${this.#id}"`, exc.stack);
            this.#error = exc.message;
            this.#loading = false;
        });
    }

    constructor(specs: WidgetSpecs) {
        super();
        this.#specs = specs;

        this.attachShadow({mode: 'open'});

        const widgets: Widgets = <Widgets>require('./widgets').widgets;
        if (!widgets.has(this.localName)) throw new Error(`Widget name "${this.localName}" is not registered`);

        this.#id = widgets.get(this.localName).id;
        this.#initialise();
    }

    #render = () => {
        // Render the widget once the connectedCallback is called and the bundle was imported
        if (this.#holders.size) return;

        const {Controller} = this.#bundle;
        if (!Controller || typeof Controller !== 'function') {
            const message = `Widget "${this.localName}" does not export its Controller`;
            console.error(message);
            this.#error = message;
            return;
        }

        this.#controller = new Controller(this.#specs, this, this.#bundle);
        this.#controller.initialise();
    };

    connectedCallback() {
        this.#holders.delete('connected');

        // Register the widget in the instances registry after connectedCallback is done
        this.#node = instances.register(this);
        this.#render();
    }
}
