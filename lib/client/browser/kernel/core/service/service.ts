import type {Beyond} from "../beyond";
import type {PackageData} from "../package/data";
import type {Socket} from "socket.io";
import {SingleCall} from "../utils/execution-control/single-call/single-call";
import {ServiceIOConfiguration} from "./io";
import {Initiator} from "./initiator";

interface ILocalConfig {
    id: string
}

export interface IServiceConfig {
    connect?: boolean;
    local?: ILocalConfig;
    host?: string;
}

export interface Service {
    is: string,
    package: PackageData
}

export abstract class Service {
    #initiator = new Initiator(this);
    #io = new ServiceIOConfiguration();
    get io() {
        return this.#io;
    }

    #connect: boolean;
    get connect() {
        return this.#connect;
    }

    #host: string;
    get host() {
        return this.#host;
    }

    // Property local is only available in a local environment and it is required by the beyond-local library
    #local: ILocalConfig;
    get local() {
        return this.#local;
    }

    #socket: Socket;

    @SingleCall
    async getSocket(): Promise<Socket | undefined> {
        const beyond = <Beyond>(require('../beyond')).beyond;

        if (!this.#connect) return;
        if (this.#socket) return this.#socket;

        // Check that the service is running, and initiate it if it is not
        this.package.id !== '@beyond-js/local' && await this.#initiator.check();

        const sio = beyond.mode === 'cjs' ? 'socket.io-client' : 'socket.io';
        const io = await beyond.require(sio);
        let query = this.#io.querystring && await this.#io.querystring();

        const host = this.#host;
        this.#socket = io(host, {transports: ['websocket'], 'query': query});
        this.#socket.on('error', (error: Error) =>
            console.error('Socket error:', this.package.id, host, error));
        this.#socket.on('connect_error', (error: Error) =>
            console.error('Socket connection error:', this.package.id, host, error));
        this.#socket.on('connect_timeout', (error: Error) =>
            console.error('Socket connection timeout:', this.package.id, host, error));

        return this.#socket;
    }

    get socket(): Promise<Socket | undefined> {
        return this.getSocket();
    }

    setup(config: IServiceConfig) {
        this.#connect = !!config.connect;
        this.#host = config.host;
        this.#local = config.local;
    }
}
