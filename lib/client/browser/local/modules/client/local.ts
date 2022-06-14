import {module} from 'beyond_context';
import {Events} from "@beyond-js/kernel/core/ts";
import {services} from './services/services';
import type {Socket} from 'socket.io-client';

class BeyondLocal extends Events {
    #onchange = (message: any) => {
        const {bundle, extname, distribution, language} = message;
        this.trigger(`bundle.change:${bundle}//${distribution}`, extname, language);
    }

    get services() {
        return services;
    }

    #subscribe = async () => {
        const socket: Socket = await module.socket;
        socket.on('bundle/change', this.#onchange);
    }

    constructor() {
        super();
        this.#subscribe().catch(exc => console.error(exc.stack));
    }
}

export /*bundle*/
const local = new BeyondLocal;
