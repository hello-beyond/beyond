import type {Beyond} from "../beyond";
import type {Bundle} from "./bundle";
import {Events} from "../utils/events/events";

declare class BeyondLocal {
    on(event: string, listener: any, priority?: number): this;
}

export class HMR extends Events {
    readonly #bundle: Bundle;
    readonly #beyond: Beyond;
    #local: BeyondLocal;

    constructor(bundle: Bundle) {
        super();
        this.#bundle = bundle;
        this.#beyond = require('../beyond').beyond;

        this.#activate().catch(exc => console.error(exc.stack));
    }

    #activate = async () => {
        // HMR is only available in local environment
        const beyond = this.#beyond;
        if (!beyond.local) return;

        const local = <BeyondLocal>(await beyond.import('@beyond-js/local/main/ts')).local;

        const onchange = (processor: string, extname: string, language: string) => {
            this.trigger(`${extname}//${language}`, processor);
        }

        const event = `change:${this.#bundle.id}//${beyond.distribution}`;
        local.on(event, onchange);
        this.#local = local;
    }
}
