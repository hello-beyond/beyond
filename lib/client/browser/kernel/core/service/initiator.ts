import {Events} from "../utils/events/events";
import type {Service} from "./service";
import {PendingPromise} from "../utils/pending-promise/pending-promise";

declare class ManagedService extends Events {
    get status(): Promise<string>;

    start(): Promise<void>;

    stop(): Promise<void>;
}

declare class BeyondLocal {
    on(event: string, listener: any, priority?: number): this;

    get services(): {
        get(key: string): ManagedService;
    };
}

/**
 * Service launcher required only in local development environment
 */
export class Initiator {
    readonly #service: Service;
    #local: BeyondLocal;

    constructor(service: Service) {
        this.#service = service;
    }

    #promise: PendingPromise<void>;
    #initialise = async () => {
        if (this.#promise) {
            await this.#promise;
            return;
        }
        this.#promise = new PendingPromise();

        const beyond = require('../beyond').beyond;
        if (!beyond.local || this.#local) return;

        this.#local = <BeyondLocal>(await beyond.import('@beyond-js/local/main/ts')).local;
        this.#promise.resolve();
    }

    async check() {
        await this.#initialise();
        if (!this.#local) return;

        const service = this.#local.services.get(this.#service.host);
        const status = await service.status;
        status !== 'running' && await service.start();

        await new Promise(resolve => setTimeout(resolve, 2000));
    }
}
