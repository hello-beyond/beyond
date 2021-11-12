import type {Beyond} from "../../../beyond";
import type {Package} from "../package";
import {Events} from "../../../utils/events/events";

declare class BeyondLocal {
    on(event: string, listener: any, priority?: number): this;
}

declare function require(module: string): any;

export class HMR extends Events {
    #pkg: Package;

    #change = 0;
    #beyond: Beyond;
    #local: BeyondLocal;

    constructor(pkg: Package) {
        super();
        this.#pkg = pkg;
        this.#beyond = <Beyond>(require('../../../beyond')).beyond;

        // HMR is only available in local environment
        this.#beyond.local && this.#activate().catch(exc => console.error(exc.stack));
    }

    async #onchange(processor: string) {
        const url = `${this.#pkg.bundle.id}[${processor}]`;

        this.#change++;
        await this.#beyond.reload(url, this.#change);
        this.trigger(`change:${processor}`);
    }

    #activate = async () => {
        const local = <BeyondLocal>(await this.#beyond.import('@beyond-js/local/main/ts')).local;

        const onchange = (processor: string) => this.#onchange(processor).catch(exc => console.error(exc.stack));

        let event = `change:${this.#pkg.bundle.id}`;
        event += this.#pkg.multilanguage ? `.${this.#pkg.language}` : '';

        local.on(event, onchange);
        this.#local = local;
    }
}
