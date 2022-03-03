import {HistoryPosition} from "./position";
import {HistoryRecords} from "./records";
import type {Routing, RoutingMode} from "../routing";

declare function require(module: string): any;


/**
 * Beyond keeps its own history list
 * @constructor
 */
export class BeyondHistory {
    readonly #position: HistoryPosition;
    readonly #records: HistoryRecords;

    #initial: number = history.length;
    get initial(): number {
        return this.#initial;
    }

    get records(): string[] {
        return this.#records.data;
    }

    get length(): number {
        return this.#records.length;
    }

    get position(): number {
        return this.#position.value;
    }

    get current(): string {
        return this.#records.current;
    }

    get previous(): string {
        return this.#records.previous;
    }

    get following(): string {
        return this.#records.following;
    }

    #push = (uri: string, state: any) => {
        if (!uri || !state) throw new Error('Invalid parameters');

        this.#records.resetFromPosition();
        this.#records.push(uri);
        this.#position.updateState(state, this.#records.length);
    }

    /**
     * Process the internal URI, always starting with '/' no matter the routing mode (hash or pathname)
     *
     * @param {string} uri
     * @return {string}
     */
    #processURI(uri: string): string {
        void (this);
        if (uri === undefined) return;
        return uri.startsWith('/') ? uri : `/${uri}`;
    }

    /**
     * Process the browser URI that takes into consideration the routing mode
     *
     * @param {string} uri The internal URI (always starts with '/')
     * @return {string} The URI to be pushed or replaced in the browser considering the routing mode
     * @private
     */
    #processBrowserURI(uri: string): string {
        void (this);
        if (uri === undefined) return;

        const routing = <Routing>(require('../routing')).routing;
        const RoutingModeEnum = <typeof RoutingMode>(require('../routing')).RoutingMode;

        return routing.mode === RoutingModeEnum.Hash ? `#${uri.substr(1)}` : uri;
    }

    replaceState(state: any, title: string, uri: string) {
        state = state ? state : {};
        if (typeof state !== 'object') throw new Error('Invalid state parameter');

        if (!this.#position.checkStateIsSet) return;

        uri = this.#processURI(uri);
        this.#position.updateState(state);
        this.#records.updateCurrentURI(uri);

        // The uri in the browser considering the routing mode
        history.replaceState(state, title, this.#processBrowserURI(uri));
    }

    pushState(uri: string, state: any) {
        state = state ? state : {};
        if (typeof state !== 'object') throw new Error('Invalid state parameter');

        uri = this.#processURI(uri);
        this.#push(uri, state);
        history.pushState(state, null, this.#processBrowserURI(uri));
    }

    constructor(routing: Routing, Mode: typeof RoutingMode) {
        this.#position = new HistoryPosition();
        this.#records = new HistoryRecords(this.#position);

        window.addEventListener('popstate', () => this.#position.updateSessionStorageFromState());

        // When the position in the sessionStorage is not set, it is the first navigation on the tab
        // When the history.state position is not set, it is when the user refreshes the page
        if (!this.#position.getFromSessionStorage() || !this.#position.getFromState()) {
            let uri = routing.mode === Mode.Hash ? location.hash.substr(1) :
                location.pathname + location.search;
            uri = this.#processURI(uri);

            // First page navigation on start up
            const state = history.state ? history.state : {};

            this.#push(uri, state);
            history.replaceState(state, null);
        }
        this.#position.updateSessionStorageFromState();
    }
}
