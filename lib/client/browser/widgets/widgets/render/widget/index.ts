import {instances} from '../instances';
import {NodeWidget} from '../instances/node';
import {WidgetSR} from "./sr";
import {IBeyondWidgetController, WidgetCSR} from './csr';
import {WidgetSSR} from "./ssr";
import {WidgetIdentifier} from "./identifier";
import {WidgetGlobalAttributes} from './attributes';
import {StylesManager} from "./styles";

export /*bundle*/
interface IWidgetSpecs {
    name: string
    id: string,
    attrs?: string[],
    is?: string,
    layout?: string,
    route?: string,
    render: {
        multilanguage?: boolean,
        ssr: boolean,
        csr: boolean,
        sr: boolean
    }
}

// In SSR environment HTMLElement is not defined
const Element = typeof HTMLElement === 'undefined' ? null : HTMLElement;

export /*bundle*/
class BeyondWidget extends Element {
    readonly #specs: IWidgetSpecs;
    get specs(): IWidgetSpecs {
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

    readonly #identifier: WidgetIdentifier;
    get identifier() {
        return this.#identifier;
    }

    #holder: HTMLSpanElement;
    get holder() {
        return this.#holder;
    }

    readonly #sr: WidgetSR;
    get sr() {
        return this.#sr;
    }

    readonly #csr: WidgetCSR;
    get csr() {
        return this.#csr;
    }

    get controller(): IBeyondWidgetController {
        return this.#csr.controller;
    }

    readonly #ssr: WidgetSSR;
    get ssr() {
        return this.#ssr;
    }

    readonly #attributes: WidgetGlobalAttributes;

    readonly #styles: StylesManager;
    get styles() {
        return this.#styles;
    }

    // To identify where the widget is in the widgets tree
    #wnode: NodeWidget;
    get wnode() {
        return this.#wnode;
    }

    get wparent(): BeyondWidget {
        return this.#wnode.parent;
    }

    get wchildren(): BeyondWidget[] {
        return [...this.#wnode.children];
    }

    /**
     * Actually required by routing to call the .show & .hide methods once the controller is initialised
     */
    #oncontroller = () => {
        const event = new CustomEvent('controller.initialised', {bubbles: false, composed: false});
        this.dispatchEvent(event);
    }

    constructor(specs: IWidgetSpecs) {
        super();
        this.#specs = specs;

        this.attachShadow({mode: 'open'});

        this.#attributes = new WidgetGlobalAttributes();
        this.#identifier = new WidgetIdentifier(this);
        this.#sr = new WidgetSR(this);
        this.#ssr = new WidgetSSR(this);
        this.#csr = new WidgetCSR(this);
        this.#csr?.on('controller.initialised', this.#oncontroller);
        this.#styles = new StylesManager();
    }

    connectedCallback() {
        // Register the widget in the instances registry after connectedCallback is done
        this.#wnode = instances.register(this);

        this.#holder = document.createElement('span');
        this.#holder.style.display = 'none';
        this.shadowRoot.append(this.#holder);

        this.#attributes.initialise(this.#holder);

        this.#ssr.initialise().catch((exc: Error) => console.error(exc.stack));
        this.#sr.initialise().catch((exc: Error) => console.error(exc.stack));
        this.#csr.initialise();
    }

    disconnectedCallback() {
        this.#csr.disconnect();
    }

    attributeChangedCallback(name: string, old: string, value: string) {
        this.#csr.attributeChanged(name, old, value);
    }
}
