import type {Beyond} from "../beyond";
import type {Socket} from "socket.io";
import {Module} from "../modules/module";
import {PendingPromise} from "../utils/pending-promise/pending-promise";
import {ExecutionError} from "./execution-error";

declare function require(module: string): any;

let autoincrement = 0;

interface ActionRequest {
    id: number
    container: {
        id: string
        version: string
    }
    module: string
    action: string
    params: any
}

export class Action<Params, Response> {
    readonly #module: Module;
    readonly #request: ActionRequest;

    readonly #path: string;
    get path() {
        return this.#path;
    }

    readonly #params: Params;
    get params() {
        return this.#params;
    }

    constructor(module: Module, path: string, params?: Params) {
        this.#module = module;
        this.#path = path;
        this.#params = params;

        this.#request = {
            id: this.#id,
            container: {
                id: module.container.id,
                version: module.container.version
            },
            module: module.id,
            action: path,
            params: params
        };
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

    #promise = new PendingPromise;

    #send = (socket: Socket) => {
        this.#attempts ? console.log(`Retrying [${this.#attempts}] to execute action "${this.#path}"`) : null;
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

    execute() {
        if (this.#executing || this.#executed) return this.#promise;

        this.#module.socket
            .then((socket: Socket) => {
                const beyond = <Beyond>(require('../beyond')).beyond;
                if (!socket) {
                    const container = this.#module.container;
                    const message = `Socket not found on module "${this.#module.id}". ` +
                        `Check the backend configuration on ${container.is} "${container.package.id}"`;

                    this.#promise.reject(new Error(message));
                    return;
                }

                const onresponse = (response: any) => {
                    this.#executed = true;
                    this.#executing = false;

                    clearTimeout(this.#timer);
                    beyond.removeMessage('rpc-retrying-connection');

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
            })
            .catch(exc => this.#promise.reject(exc));

        return this.#promise;
    }
}
