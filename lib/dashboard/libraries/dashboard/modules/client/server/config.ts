import {module} from "beyond_context";
import {Events} from "@beyond-js/kernel/core/ts";

export class ServerConfig {

    readonly #events = new Events;

    #value: any;
    get value() {
        return this.#value;
    }

    private async _fetch() {
        this.#value = module.execute('server/config');
        this.#events.trigger('change');
        return this.value;
    };

    #promise: any;
    async fetch() {
        if (this.#promise) return this.#promise;
        this.#promise = await this._fetch();
    }

}
