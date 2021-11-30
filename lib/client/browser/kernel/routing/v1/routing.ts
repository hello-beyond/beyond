import {URI} from "./uri/uri";
import {config, RoutingConfig} from "./config/config";
import type {ILayoutConfig} from "./config/layouts";
import type {IPageConfig} from "./config/pages";
import {Manager} from "./manager";
import {widgets, CancellationToken} from "@beyond-js/kernel/core/ts";
import {BeyondHistory} from "./history/history";
import type {PageConfig} from "./config/pages";

export enum RoutingMode {Hash, Pathname}

const ssr = typeof window !== 'object';

export class Routing {
    #mode: RoutingMode;
    get mode() {
        return this.#mode;
    }

    readonly #config = config;
    get config(): RoutingConfig {
        return this.#config
    };

    readonly #manager = new Manager();
    get manager() {
        return this.#manager;
    }

    #uri: URI;
    get uri(): URI {
        return this.#uri;
    }

    missing: (uri: URI) => string;
    redirect: (uri: URI) => string;

    #history;
    get history() {
        return this.#history;
    }

    #initialised = false;
    get initialised() {
        return this.#initialised;
    }

    /**
     * Returns page configuration from an href address
     *
     * @param {string} _uri The uri in string format previous to be parsed
     * @return {Promise<{error?: string, redirected?: string, page?: PageConfig}>}
     */
    async page(_uri: string): Promise<{ error?: string, redirected?: string, page?: PageConfig }> {
        const uri = new URI(_uri);

        // Check if uri has to be redirected
        const redirected = typeof this.redirect === 'function' && await this.redirect(uri);
        if (redirected) return {redirected};

        await uri.initialise(); // Parse the uri and check the missing function if the route is not found

        const {route} = uri.route;
        if (!route) {
            const error = `Pathname "${uri.pathname}" does not have a page associated to it`;
            return {error};
        }

        if (!config.pages.has(route)) {
            const error = `Route "${route}" not found`;
            return {error};
        }

        const page = config.pages.get(route);
        return {page};
    }

    setUp(routingMode: RoutingMode) {
        if (this.#initialised) throw new Error('Routing setUp method can only be called once');

        if (!ssr && location.protocol === 'file:' && routingMode === RoutingMode.Pathname) {
            routingMode = RoutingMode.Hash;
            console.warn('Routing mode was set as "pathname" but it was changed to ' +
                '"hash" because the protocol used is "file:"');
        }

        if (!ssr && ![0, 1].includes(routingMode)) {
            console.warn(`Routing mode ${routingMode} is invalid`);
            routingMode = location.protocol === 'file:' ? RoutingMode.Hash : RoutingMode.Pathname;
        }

        this.#mode = routingMode;
        this.#initialised = true;

        this.#history = !ssr && new BeyondHistory(this, RoutingMode);

        let layouts: ILayoutConfig[] = [], pages: IPageConfig[] = [];
        widgets.forEach(specs => {
            specs.is === 'layout' && layouts.push(specs);
            specs.is === 'page' && pages.push(specs);
        });
        this.#config.layouts.register(layouts);
        this.#config.pages.register(pages);

        !ssr && this.update().catch(exc => console.error(exc.stack));
    }

    #redirect = async (uri: URI): Promise<boolean> => {
        if (typeof this.redirect !== 'function') return;

        const redirected = await this.redirect(uri);
        if (!redirected) return;
        if (typeof redirected !== 'string') {
            console.error(`Invalid route value set by custom routing function`, redirected);
            return;
        }

        if (uri.pathname === redirected) return; // Routing function returned the actual route

        this.pushState(redirected);
        return true;
    };

    pushState(uri: string, state?: object): void {
        this.#history.pushState(uri, state);
        this.update().catch((exc) => console.error(exc.stack));
    };

    replaceState(state: object, title: string, uri?: string): void {
        this.#history.replaceState(state, title, uri);
        this.update().catch((exc) => console.error(exc.stack));
    };

    // Avoid to continue the execution on asynchronous calls, when a newest call's been made
    #cancellationToken = new CancellationToken;
    update = async () => {
        if (!this.#initialised) return;

        const cancellationTokenId = this.#cancellationToken.reset();

        const _uri = this.#mode === RoutingMode.Hash ? location.hash.substr(1) :
            location.pathname + location.search;
        if (this.#uri?.uri === _uri) return;

        const uri = new URI(_uri);
        this.#uri = uri;

        const redirected = await this.#redirect(uri);
        if (!this.#cancellationToken.check(cancellationTokenId)) return;
        if (redirected) return; // The page was redirected to another uri

        await uri.initialise(); // Parse the uri and check the missing function if the route is not found
        if (!this.#cancellationToken.check(cancellationTokenId)) return;

        // Verify the state of the history registry to check for possible errors
        if (this.#history && uri.uri !== this.#history.current) {
            console.error(`History current ${this.#history.current} is not equal to actual uri "${uri.uri}"`);
            return;
        }

        this.#manager.set(uri);
    };

    back = () => window.history.length ? window.history.back() : this.pushState('/');
}

export /*bundle*/ const routing = new Routing;

globalThis.routing = routing;

// Just for backward compatibility
declare const beyond: any;
!ssr && ((<any>beyond).navigate = (uri: string, state?: object) => routing.pushState(uri, state));
!ssr && ((<any>beyond).pushState = (uri: string, state?: object) => routing.pushState(uri, state));
!ssr && ((<any>beyond).back = () => routing.back());

// Only on client side
!ssr && window.addEventListener('popstate', () =>
    routing.update().catch(exc => console.error(exc.stack)));
