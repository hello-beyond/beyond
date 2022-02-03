import {module} from 'beyond_context';
import {Events} from "@beyond-js/kernel/core/ts";
import {services} from './services/services';
import type {Socket} from 'socket.io';

class BeyondLocal extends Events {
    #onchange = (message: any) => {
        const {bundle, processor, extname, distribution, language} = message;
        this.trigger(`change:${bundle}//${distribution}`, processor, extname, language);
    }

    get services() {
        return services;
    }

    #subscribe = async () => {
        const socket: Socket = await module.socket;
        socket.on('processor/change', this.#onchange);
    }

    constructor() {
        super();
        this.#subscribe().catch(exc => console.error(exc.stack));
    }
}

export /*bundle*/
const local = new BeyondLocal;
