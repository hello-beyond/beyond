import {URI} from "./uri/uri";

export enum RoutingMode {Hash, Pathname}

export class Routing {
    #valid = true;
    get valid() {
        return this.#valid;
    }

    #mode: RoutingMode;
    get mode() {
        return this.#mode;
    }

    #uri: URI;
    get uri(): URI {
        return this.#uri;
    }

    #initialised = false;
    get initialised() {
        return this.#initialised;
    }

    async update() {
    }

    setUp(routingMode: RoutingMode) {
        if (this.#initialised) {
            throw new Error('Routing setUp method can only be called once');
        }

        if (location.protocol === 'file:' && routingMode === RoutingMode.Pathname) {
            routingMode = RoutingMode.Hash;
            console.warn('Routing mode was set as "pathname" but it was changed to ' +
                '"hash" because the protocol used is "file:"');
        }

        if (![0, 1].includes(routingMode)) {
            console.warn(`Routing mode ${routingMode} is invalid`);
            routingMode = location.protocol === 'file:' ? RoutingMode.Hash : RoutingMode.Pathname;
        }

        this.#mode = routingMode;
        this.#initialised = true;

        this.update().catch(exc => console.error(exc.stack));
    }
}

export /*bundle*/ const routing = new Routing;
(<any>window).routing = routing;
