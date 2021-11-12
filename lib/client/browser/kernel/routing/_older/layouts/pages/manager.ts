import {PageLoader} from "./loader";
import {CancellationToken} from "beyond_libraries/beyond/core/ts";
import {config as routingConfig} from "../config/config";
import type {URI} from "../../../../uri/uri";
import type {PageConfig} from "../../config/pages";
import type {LayoutManager} from "../../../layout-manager";

export class PageManager {
    readonly #layout: LayoutManager
    get layout() {
        return this.#layout;
    }

    readonly #config: PageConfig;
    get config() {
        return this.#config;
    }

    readonly #loader = new PageLoader(this);

    get loaded() {
        return this.#loader.loaded;
    }

    get error() {
        return this.#loader.error;
    }

    constructor(layout: LayoutManager, uri: URI, config: PageConfig) {
        this.#config = config;
        this.#layout = layout;
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
        const cancellationTokenId = this.#cancellationToken.current;

        await this.#loader.load();
        if (!this.#cancellationToken.checkpoint(cancellationTokenId)) return;
        if (this.error) return;

        await this.#loader.container.hide();
    }
}
