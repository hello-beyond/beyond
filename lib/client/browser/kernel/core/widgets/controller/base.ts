import type {WidgetSpecs} from "../widgets";
import type {Bundle} from "../../bundles/bundle";
import {beyond} from "../../beyond";
import {widgets} from "../widgets";

export /*bundle*/
interface IWidgetStore {
    toJSON(): object;

    hydrate(cached: object): void;

    fetch(): Promise<void>;
}

export /*bundle*/
abstract class BeyondWidgetControllerBase {
    #specs: WidgetSpecs;

    readonly #bundle: Bundle;
    get bundle() {
        return this.#bundle;
    }

    get element(): string {
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

    // The widget component to be mounted should be specified by the module
    // (can be a React, Svelte, Vue, ... component)
    get Widget(): any {
        return;
    }

    createStore(): IWidgetStore {
        return void 0;
    }

    protected constructor({specs, component}: Partial<{ specs: WidgetSpecs, component: HTMLElement }>) {
        if (!specs) {
            const {localName} = component;
            if (!widgets.has(localName)) throw new Error(`Widget name "${localName}" is not registered`);
            specs = widgets.get(localName);
        }

        this.#specs = specs;

        if (!beyond.bundles.has(specs.id)) {
            throw new Error(`Bundle "${specs.id}" not found on "${specs.name}" widget`);
        }
        this.#bundle = beyond.bundles.get(specs.id);
    }
}
