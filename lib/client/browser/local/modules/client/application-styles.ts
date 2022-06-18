import {backends} from '@beyond-js/backend/client/ts';
import {Events} from '@beyond-js/kernel/core/ts';
import type {Socket} from "socket.io-client";

typeof window === 'object' &&
new class ApplicationStyles extends Events {
    /**
     * The application styles has changed, therefore it must be updated
     */
    #update = (is: string) => {
        const resource = is === 'application' ? 'styles' : 'global';
        document
            .getElementById(`beyond-${is}-styles`)
            .setAttribute('href', `/${resource}.css?updated=${Date.now()}`);

        this.trigger(`${is}:change`);
    }

    #subscribe = async () => {
        const backend = backends.get('@beyond-js/local/legacy');
        const socket: Socket = await backend.socket;
        socket.on('application-styles', () => this.#update('application'));
        socket.on('global-styles', () => this.#update('global'));
    }

    constructor() {
        super();
        if (typeof window === 'undefined') return;
        this.#subscribe().catch(exc => console.error(exc.stack));
    }
}
