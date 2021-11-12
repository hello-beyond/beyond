import type {URI} from "../uri/uri";
import type {LayoutManager} from "./manager";
import {LayoutContainer} from "./container";
import {config as routingConfig} from "../config/config";
import {CancellationToken} from "beyond_libraries/beyond/core/ts";

export class Layouts extends Map<string, LayoutManager> {
    #parent: LayoutContainer;
    get parent() {
        return this.#parent;
    }

    #active: LayoutManager;
    get active() {
        return this.#active;
    }

    // Avoid to continue the execution on asynchronous calls, when a newest call's been made
    #cancellationToken = new CancellationToken;

    // Navigate the uri once the active layout is set
    #navigate = (uri: URI) => {
        this.#active.show(uri).catch(
            exc => console.error(`Error showing layout "${this.#active.config.name}"`, exc.stack));
    }

    // Navigates a uri setting the active layout first
    async navigate(uri: URI) {
        const currentCancellationToken = this.#cancellationToken.current;

        const route = uri.route.route;
        if (!route) {
            throw new Error(`Pathname "${uri.pathname}" does not has a page associated to it`);
        }

        if (!routingConfig.pages.has(route)) {
            throw Error(`Route "${route}" not found`);
        }

        const pageConfig = routingConfig.pages.get(route);
        const layoutName = pageConfig.layout ? pageConfig.layout : 'default';

        if (layoutName !== 'default' && !routingConfig.layouts.has(layoutName)) {
            console.error(`The layout "${layoutName}" required by route "${route}" ` +
                `in the bundle "${pageConfig.bundle}" was not found`);
            return;
        }

        if (this.#active && layoutName === this.#active.config.name) {
            this.#navigate(uri);
            return;
        }

        let layout: LayoutManager;
        layout = this.has(layoutName) ? this.get(layoutName) : new LayoutManager(layoutName);
        this.set(layoutName, layout);

        if (this.#active) {
            const previous = this.#active;
            await previous.hide().catch(exc => console.error(`Error hiding layout "${layoutName}"`, exc.stack));
            if (!this.#cancellationToken.checkpoint(currentCancellationToken)) return;
        }

        this.#active = layout;
        this.#navigate(uri);
    }
}
