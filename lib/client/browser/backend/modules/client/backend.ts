import {ServiceIOConfiguration} from './io';
import Socket from './socket';

export interface IBackendConfig {
    id: string,
    host?: string;
}

export /*bundle*/
class Backend {
    readonly #id: string;
    get id() {
        return this.#id;
    }

    readonly #pkg: string;
    get pkg() {
        return this.#pkg;
    }

    readonly #host: string;
    get host() {
        return this.#host;
    }

    #socket: Socket;

    #io = new ServiceIOConfiguration();
    get io() {
        return this.#io;
    }

    constructor(config: IBackendConfig) {
        this.#id = config.id;
        this.#pkg = config.id.split('/')[0];
        this.#host = config.host;
        this.#socket = new Socket(this);
    }

    get socket() {
        return this.#socket.get();
    }
}
