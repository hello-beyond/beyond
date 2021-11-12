import {LayoutLoader} from "./loader";
import {CancellationToken} from "beyond_libraries/beyond/core/ts";
import {config as routingConfig} from "../config/config";
import type {URI} from "../uri/uri";
import type {LayoutConfig} from "../config/layouts";

export class LayoutManager {
    readonly #name: string;
    get name() {
        return this.#name;
    }

    readonly #config: LayoutConfig;
    get config() {
        return this.#config;
    }

    readonly #loader = new LayoutLoader(this);

    get loaded() {
        return this.#loader.loaded;
    }

    get error() {
        return this.#loader.error;
    }

    constructor(name: string) {
        this.#name = name;
        this.#config = routingConfig.layouts.has(name) ? routingConfig.layouts.get(name) : undefined;
    }

    #cancellationToken = new CancellationToken;

    async show(uri: URI) {
        const cancellationTokenId = this.#cancellationToken.reset();

        await this.#loader.load();
        if (!this.#cancellationToken.check(cancellationTokenId)) return;
        if (this.error) return;

        await this.#loader.container.show(uri);
    }

    async hide() {
        const cancellationTokenId = this.#cancellationToken.reset();

        await this.#loader.load();
        if (!this.#cancellationToken.check(cancellationTokenId)) return;
        if (this.error) return;

        await this.#loader.container.hide();
    }
}
