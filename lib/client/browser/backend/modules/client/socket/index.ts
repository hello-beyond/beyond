import {beyond, SingleCall} from '@beyond-js/kernel/core/ts';
import type {Socket} from 'socket.io-client';
import type {Backend} from '../backend';
import Initiator from './initiator';

export default class {
    readonly #backend: Backend;
    readonly #initiator: Initiator;
    #socket: Socket;

    constructor(backend: Backend) {
        this.#backend = backend;
        this.#initiator = new Initiator(backend);
    }

    @SingleCall
    async get(): Promise<Socket> {
        if (this.#socket) return this.#socket;

        const backend = this.#backend;
        const {id} = backend;

        // Check that the service is running, and initiate it if it is not
        id !== '@beyond-js/local/legacy' && await this.#initiator.check();

        const {io} = await beyond.require('socket.io-client');
        let query = backend.io.querystring && await backend.io.querystring();

        const {host} = this.#backend;
        return this.#socket = io(host, {transports: ['websocket'], 'query': query});
    }
}
