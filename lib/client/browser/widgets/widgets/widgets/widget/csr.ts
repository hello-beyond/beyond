import type {beyond as b} from '@beyond-js/kernel/core/ts';
import type {BeyondWidget} from './';
import {Events} from "../events";

declare const amd_require: any;

export /*bundle*/
interface IBeyondWidgetController {
    initialise: () => Promise<void>;
    attributeChanged: (name: string, old: string, value: string) => void;
    disconnect: () => void;
}

export /*bundle*/
class WidgetCSR extends Events {
    readonly #widget: BeyondWidget;

    #bundle: any;
    get bundle() {
        return this.#bundle;
    }

    #controller: IBeyondWidgetController;
    get controller() {
        return this.#controller;
    }

    #error: string;
    get error() {
        return this.#error;
    }

    #loading: boolean = false;
    get loading() {
        return this.#loading;
    }

    #loaded: boolean = false;
    get loaded() {
        return this.#loaded;
    }

    #holders = new Set(['initialised', 'loaded']);

    initialise() {
        // Check if CSR is enabled (default) for this widget
        if (!this.#widget.specs.render.csr) return;

        if (!this.#holders.has('initialised')) throw new Error('Widget CSR already initialised');
        this.#holders.delete('initialised');
        this.#render();
    }

    constructor(widget: BeyondWidget) {
        super();
        this.#widget = widget;

        // Check if CSR is enabled (default) for this widget
        if (!this.#widget.specs.render.csr) return;

        const url = this.#widget.specs.id;
        amd_require(['@beyond-js/kernel/core/ts'], (mod: any) => {
            const beyond: typeof b = mod.beyond;

            beyond.import(url).then((bundle: any) => {
                this.#bundle = bundle;
                this.#loading = false;
                this.#loaded = true;
                this.#holders.delete('loaded');
                this.#render();
            }).catch((exc: Error) => {
                console.error(`Error loading widget "${url}"`, exc.stack);
                this.#error = exc.message;
                this.#loading = false;
            });
        });
    }

    #render = () => {
        // Render the widget once the connectedCallback is called and the bundle was imported
        if (this.#holders.size) return;

        const {Controller} = this.#bundle;
        if (!Controller || typeof Controller !== 'function') {
            const message = `Widget "${this.#widget.localName}" does not export its Controller`;
            console.error(message);
            this.#error = message;
            return;
        }

        this.#controller = new Controller(this.#widget);
        this.#controller.initialise()
            .then(() => this.trigger('controller.initialised'))
            .catch((exc: Error) => console.log(exc instanceof Error ? exc.stack : exc));
    };

    disconnect() {
        this.#controller?.disconnect?.();
    }

    attributeChanged(name: string, old: string, value: string) {
        this.#controller?.attributeChanged(name, old, value);
    }
}
