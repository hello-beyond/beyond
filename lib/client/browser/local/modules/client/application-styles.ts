import {module} from 'beyond_context';

new class ApplicationStyles {
    /**
     * The application styles has changed, therefore it must be updated
     */
    #update = () => {
        document
            .getElementById('beyond-application-styles')
            .setAttribute('href', `/styles.css?updated=${Date.now()}`);
    }

    #subscribe = async () => {
        const socket: SocketIOClient.Socket = await module.socket;
        socket.on('application-styles', this.#update);
    }

    constructor() {
        this.#subscribe().catch(exc => console.error(exc.stack));
    }
}
