import {beyond, Events, PendingPromise} from '@beyond-js/kernel/core/ts';
import type {Backend} from '../backend';

declare class LocalBEE extends Events {
    get status(): Promise<string>;

    start(): Promise<void>;

    stop(): Promise<void>;
}

declare class BeyondLocal {
    on(event: string, listener: any, priority?: number): this;

    get bees(): {
        get(id: string): LocalBEE;
    };
}

/**
 * Service launcher required only in local development environment
 */
export default class {
    readonly #backend: Backend;
    #local: BeyondLocal;

    constructor(backend: Backend) {
        this.#backend = backend;
    }

    #promise: PendingPromise<void>;
    #initialise = async () => {
        if (this.#promise) {
            await this.#promise;
            return;
        }
        this.#promise = new PendingPromise();

        if (!beyond.local || this.#local) return;
        this.#local = <BeyondLocal>(await beyond.import('@beyond-js/local/main/ts')).local;
        this.#promise.resolve();
    }

    async check() {
        await this.#initialise();
        if (!this.#local) return;

        const {id} = this.#backend;
        const service = this.#local.bees.get(id);
        const status = await service.status;
        if (status === 'running') return;

        await service.start();
        await new Promise(resolve => setTimeout(resolve, 2000));
    }
}
