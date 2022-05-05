import {URI} from "./uri/uri";
import {config} from "./config/config";
import type {ILayoutConfig} from "./config/layouts/layout";
import type {PageConfig, IPageConfig} from "./config/pages/page";
import {Manager} from "./manager";
import {widgets, CancellationToken} from "@beyond-js/kernel/core/ts";
import {BeyondHistory} from "./history/history";
import './beyond-layout-children/beyond-layout-children';
import {BeyondLayoutChildrenRenderer} from './beyond-layout-children/renderer';
import {WidgetControllerLoader} from '@beyond-js/kernel/core/ts';

export enum RoutingMode {Hash, Pathname}

const ssr = typeof window !== 'object';
declare const __beyond_hydrator: any;

export class Routing {
    #mode: RoutingMode;
    get mode() {
        return this.#mode;
    }

    get config(): typeof config {
        return config
    };

    readonly #manager = new Manager();
    get manager() {
        return this.#manager;
    }

    #uri: URI;
    get uri(): URI {
        return this.#uri;
    }

    missing: (uri: URI) => Promise<string>;
    redirect: (uri: URI) => Promise<string>;

    #history: BeyondHistory;
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
     * @return {Promise<{error?: string, redirected?: string, page?: PageConfig, uri?: URI}>}
     */
    async page(_uri: string): Promise<{ error?: string, redirected?: string, page?: PageConfig, uri?: URI }> {
        const uri = new URI(_uri);

        // Check if uri has to be redirected
        const redirected = typeof this.redirect === 'function' && await this.redirect(uri);
        if (redirected && redirected !== _uri) return {redirected};

        await uri.initialise(); // Parse the uri and check the missing function if the route is not found

        const {element} = uri.route;
        if (!config.pages.has(element)) {
            const error = `Pathname "${uri.pathname}" does not have a page associated to it`;
            return {error};
        }

        const page = config.pages.get(element);
        return {page, uri};
    }

    #hydrate() {
        void (this);
        if (typeof __beyond_hydrator === 'object') {
            __beyond_hydrator.hydrate(WidgetControllerLoader, BeyondLayoutChildrenRenderer);
        }
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
        config.layouts.register(layouts);
        config.pages.register(pages);

        !ssr && this.update()
            .then(() => this.#hydrate())
            .catch(exc => console.error(exc.stack));
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

        const {hash, pathname, search} = location;
        const _uri = this.#mode === RoutingMode.Hash ? `/${hash.slice(1)}` : pathname + search + hash;
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
            console.error(`History current "${this.#history.current}" is not equal to actual uri "${uri.uri}"`);
            return;
        }

        this.#manager.set(uri);
    };

    back() {
        this.#history.back();
    }

    forward() {
        this.#history.forward();
    }
}

export /*bundle*/ const routing = new Routing;

(globalThis as any).routing = routing;

// Just for backward compatibility
declare const beyond: any;
!ssr && ((<any>beyond).navigate = (uri: string, state?: object) => routing.pushState(uri, state));
!ssr && ((<any>beyond).pushState = (uri: string, state?: object) => routing.pushState(uri, state));
!ssr && ((<any>beyond).back = () => routing.back());
!ssr && ((<any>beyond).forward = () => routing.forward());

// Only on client side
!ssr && window.addEventListener('popstate', () =>
    routing.update().catch(exc => console.error(exc.stack)));
