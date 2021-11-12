import type {LayoutContainer} from "../container";
import {URI} from "../../uri/uri";
import {PageManager} from "./manager";
import {config as routingConfig} from "../../config/config";
import {CancellationToken} from "beyond_libraries/beyond/core/ts";

export class Pages extends Map<string, PageManager> {
    readonly #parent;
    get parent() {
        return this.#parent;
    }

    #active: PageManager;
    get active() {
        return this.#active;
    }

    constructor(layout: LayoutContainer) {
        super();
        this.#layout = layout;
    }

    show(uri: URI) {
    }
}
