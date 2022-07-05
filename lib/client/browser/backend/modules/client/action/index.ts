import type {Socket} from 'socket.io-client';
import type {Backend} from '../backend';
import {PendingPromise, Events} from '@beyond-js/kernel/core';
import {ExecutionError} from './execution-error';
import {backends} from '../backends';

let autoincrement = 0;

interface ActionRequest {
    id: number,
    pkg: string,
    module: string,
    action: string,
    params: any[]
}

export default class extends Events {
    readonly #backend: Backend;
    readonly #request: ActionRequest;

    readonly #module: string;
    get module() {
        return this.#module;
    }

    readonly #action: string;
    get action() {
        return this.#action;
    }

    readonly #params: any[];
    get params() {
        return this.#params;
    }

    constructor(backend: string, module: string, action: string, ...params: any[]) {
        super();
        if (!backends.has(backend)) throw new Error(`Backend "${backend}" not found`);
        this.#backend = backends.get(backend);

        const id = this.#id;
        const {pkg} = this.#backend;
        this.#module = module;
        this.#action = action;
        this.#params = params;
        this.#request = {id, pkg, module, action, params};
    }

    #id = ++autoincrement;
    get id() {
        return this.#id;
    }

    #channel = `response-v2-${this.#id}`;
    get channel() {
        return this.#channel;
    }

    #executed = false;
    get executed() {
        return this.#executed;
    }

    #executing = false;
    get executing() {
        return this.#executing;
    }

    #error = false;
    get error() {
        return this.#error;
    }

    #timer: number;
    #attempts = 0;

    #promise: PendingPromise<any> = new PendingPromise();

    #send = (socket: Socket) => {
        this.#attempts && this.trigger('retrying', this.#attempts);
        this.#attempts++;

        try {
            socket.emit('rpc-v2', this.#request);
        } catch (exc) {
            this.#executing = false;
            this.#executed = true;
            this.#error = true;
            this.#promise.reject(exc);
        }
    }

    async execute() {
        if (this.#executing || this.#executed) return this.#promise;
        this.#executing = true;

        try {
            const socket = await this.#backend.socket;
            if (!socket) {
                const message = `Error getting socket on "${this.#backend.id}" backend. `;
                this.#promise.reject(new Error(message));
                return;
            }

            const onresponse = (response: any) => {
                this.#executed = true;
                this.#executing = false;

                clearTimeout(this.#timer);
                socket.off(this.#channel, onresponse);

                const {error, message, source, processingTime} = response;
                void (source); // source can be 'server' or 'cache'
                void (processingTime);

                error ?
                    this.#promise.reject(new ExecutionError(error.message, error.stack)) :
                    this.#promise.resolve(message);
            };

            socket.on(this.#channel, onresponse);
            this.#send(socket);
        } catch (exc) {
            this.#promise.reject(exc);
            return;
        }

        return this.#promise;
    }
}
