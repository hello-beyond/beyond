import type {BeyondWidget} from "./widget";
import type {WidgetSpecs} from "./widgets";
import type {NodeWidget} from "./instances/node";
import type {Bundle} from "../bundles/bundle";
import {beyond} from "../beyond";

export /*bundle*/
abstract class BeyondWidgetController {
    #specs: WidgetSpecs;

    readonly #bundle: Bundle;
    get bundle() {
        return this.#bundle;
    }

    get name(): string {
        return this.#specs.name;
    }

    get is(): string {
        return this.#specs.is;
    }

    get route(): string {
        return this.#specs.route;
    }

    get layout(): string {
        return this.#specs.layout;
    }

    readonly #component: BeyondWidget;
    get component() {
        return this.#component;
    }

    get node(): NodeWidget {
        return this.#component.node;
    }

    abstract mount(): void;

    render() {
    }

    #render = () => this.render();

    initialise() {
        this.mount();
        this.render && this.#bundle.package().hmr.on('change:ts', this.#render);
    }

    protected constructor(specs: WidgetSpecs, component: BeyondWidget) {
        this.#specs = specs;
        this.#component = component;

        if (!beyond.bundles.has(specs.id)) {
            throw new Error(`Bundle "${specs.id}" not found on "${specs.name}" widget`);
        }
        this.#bundle = beyond.bundles.get(specs.id);
    }
}
