import type {WidgetSpecs} from "../widgets";
import type {Bundle} from "../../bundles/bundle";
import {beyond} from "../../beyond";
import {PendingPromise} from "../../utils/pending-promise/pending-promise";

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

    #ready = new PendingPromise<void>();
    get ready(): Promise<void> {
        return this.#ready;
    }

    abstract fetch(): Promise<void>;

    protected constructor(specs: WidgetSpecs) {
        this.#specs = specs;

        if (!beyond.bundles.has(specs.id)) {
            throw new Error(`Bundle "${specs.id}" not found on "${specs.name}" widget`);
        }
        this.#bundle = beyond.bundles.get(specs.id);

        this.fetch?.().catch(exc => console.log(exc instanceof Error ? exc.stack : exc));
    }
}
