import type {BeyondWidget} from "../widget";
import type {WidgetSpecs} from "../widgets";
import type {NodeWidget} from "../instances/node";
import {BeyondWidgetControllerBase} from "./base";

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

    protected constructor(specs: WidgetSpecs, component: BeyondWidget) {
        super(specs);
        this.#component = component;
    }

    abstract mount(): void;

    render() {
    }

    #render = () => this.render();

    initialise() {
        this.mount();
        this.bundle.package().hmr.on('change:ts', this.#render);
    }
}
