import {Events} from "@beyond-js/kernel/core/ts";

export /*bundle*/
class ReactiveModel extends Events {
    #processing: boolean;
    get processing(): boolean {
        return this.#processing;
    }

    set processing(value: boolean) {
        if (value === this.#processing) return;
        this.#processing = value;
        this.triggerEvent();
    }

    #processed: boolean;
    get processed(): boolean {
        return this.#processed;
    }

    set processed(value: boolean) {
        if (value === this.#processed) return;
        this.#processed = value;
        this.triggerEvent();
    }

    #fetching: boolean;
    get fetching(): boolean {
        return this.#fetching;
    }

    set fetching(value: boolean) {
        if (value === this.#fetching) return;
        this.#fetching = value;
        this.triggerEvent();
    }

    #fetched: boolean;
    get fetched(): boolean {
        return this.#fetched;
    }

    set fetched(value: boolean) {
        if (value === this.#fetched) return;
        this.#fetched = value;
        this.triggerEvent();
    }

    triggerEvent = (event = 'change'): void => this.trigger(event);
}