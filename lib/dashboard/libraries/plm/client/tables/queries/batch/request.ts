import {PendingPromise} from "@beyond-js/kernel/core/ts";

let id = 0;

export class BatchRequest<RESPONSE> {
    readonly #id = id++
    get id() {
        return `${this.#id}`
    }

    readonly #value: any
    get value() {
        return this.#value
    }

    #promise: PendingPromise<RESPONSE | undefined> = new PendingPromise()
    get promise() {
        return this.#promise
    }

    constructor(value: any) {
        this.#value = value
    }
}
