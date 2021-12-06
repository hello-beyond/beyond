import type {Beyond} from "../../beyond";
import type {BeyondWidget} from "../widget";
import type {WidgetSpecs} from "../widgets";
import type {NodeWidget} from "../instances/node";
import type {BundleStyles} from "../../bundles/styles";
import {instances} from "../../bundles/instances/instances";
import {BeyondWidgetControllerBase} from "./base";
import {Bundle} from "../../bundles/bundle";

declare function require(module: string): any;

/**
 * The client widget react controller
 */
export /*bundle*/
abstract class BeyondWidgetController extends BeyondWidgetControllerBase {
    readonly #component: BeyondWidget;
    get component() {
        return this.#component;
    }

    get node(): NodeWidget {
        return this.#component.node;
    }

    #body: HTMLSpanElement;
    get body() {
        return this.#body;
    }

    protected constructor(specs: WidgetSpecs, component: BeyondWidget) {
        super(specs);
        this.#component = component;
    }

    #hmrStylesChanged = (styles: BundleStyles) => {
        const {shadowRoot} = this.component;
        const previous: Node = shadowRoot.querySelectorAll(`:scope > [bundle="${styles.id}"]`)[0];

        previous && shadowRoot.removeChild(previous);
        const css = styles.css();
        css && shadowRoot.appendChild(css);
    };

    #setStyles() {
        // Append styles and setup styles HMR
        const append = (styles: BundleStyles) => {
            const css = styles.css();
            if (!css) return;

            this.component.shadowRoot.appendChild(css);
            styles.on('change', this.#hmrStylesChanged);
        }

        const recursive = (bundle: Bundle): void => bundle.dependencies.forEach(resource => {
            if (!instances.has(resource)) return;

            const dependency = instances.get(resource);
            append(dependency.styles);
            recursive(dependency);
        });

        append(this.bundle.styles);
        recursive(this.bundle);

        // Append the global styles
        const global: HTMLLinkElement = document.createElement('link');

        const beyond = <Beyond>(require('../../beyond')).beyond;
        const {baseUrl} = beyond;
        global.type = 'text/css';
        global.href = `${baseUrl}global.css`;
        global.rel = 'stylesheet';
        this.component.shadowRoot.appendChild(global);
    }

    mount(Widget: typeof BeyondWidget) {
        void (Widget);
    }

    unmount() {
    }

    render() {
        this.#body = document.createElement('span');
        this.component.shadowRoot.appendChild(this.#body);

        const {Widget} = this.bundle.package().exports.values;
        if (!Widget) {
            const message = `Widget "${this.element}" does not export a Widget class`;
            console.error(message);
            return;
        }

        this.mount(Widget);
    }

    refresh() {
        this.unmount();
        this.#body?.remove();
        this.render();
    }

    #refresh = () => this.refresh();

    initialise() {
        this.#setStyles();
        this.render();
        this.bundle.package().hmr.on('change:ts', this.#refresh);
    }
}
