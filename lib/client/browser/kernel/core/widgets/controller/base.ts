import type {WidgetSpecs} from "../widgets";
import type {Bundle} from "../../bundles/bundle";
import {beyond} from "../../beyond";

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

    protected constructor(specs: WidgetSpecs) {
        this.#specs = specs;

        if (!beyond.bundles.has(specs.id)) {
            throw new Error(`Bundle "${specs.id}" not found on "${specs.name}" widget`);
        }
        this.#bundle = beyond.bundles.get(specs.id);
    }
}
