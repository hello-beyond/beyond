/**
 * Actions commander of a single connection
 */
module.exports = class {
    #config;
    #executor;
    #session;
    #counter;
    #active;
    #cache;
    #MAX_ACTIVE_REQUESTS = 60;
    #STATE = Object.freeze({
        'EXECUTING': 0,
        'EXECUTED': 1
    });

    constructor(config, bundles, session) {
        this.#config = config;
        this.#executor = new (require('./executor'))(config.id, bundles, session);
        this.#session = session;

        this.#cache = new (require('./cache'))(session.socket.id);
        session.socket.on('rpc-v2', this.#_onmessage);
    }

    disconnect = () => this.#session.socket.on('rpc-v2', this.#_onmessage);

    #onmessage = async (rq) => {
        const {socket} = this.#session;

        if (typeof rq !== 'object') {
            console.warn('Invalid rpc, request must be an object');
            return;
        }
        if (!rq.id) {
            console.warn('Action id not set');
            return;
        }

        if (this.#cache.has(rq.id)) {
            const cached = this.#cache.get(rq.id);
            if (cached.state === this.#STATE.EXECUTED) {
                socket.emit(`response-v2-${rq.id}`, {
                    'message': cached.response,
                    'processingTime': cached.processingTime,
                    'source': 'cache'
                });
                return;
            }
            else {
                return; // Continue waiting the response to be ready
            }
        }

        this.#cache.insert(rq.id, {
            'state': this.#STATE.EXECUTING,
            'requestedTime': Date.now()
        });

        this.#counter++;

        if (this.#active > this.#MAX_ACTIVE_REQUESTS) {
            socket.emit(`response-v2-${rq.id}`, {
                'error': 'Max number of active connections achieved'
            });
            return;
        }

        this.#active++;

        try {
            const response = await this.#executor.execute(rq);
            const cached = this.#cache.get(rq.id);
            const processingTime = Date.now() - cached.requestedTime;

            this.#cache.update(rq.id, {
                'state': this.#STATE.EXECUTED,
                'requestedTime': cached.requestedTime,
                'processingTime': processingTime,
                'response': response
            });

            this.#active--;
            socket.emit(`response-v2-${rq.id}`, {
                'message': response,
                'source': 'server',
                'processingTime': processingTime
            });
        }
        catch (exc) {
            this.#active--;
            const error = exc instanceof Error ? exc.message : exc;
            socket.emit(`response-v2-${rq.id}`, {'error': error});

            if (exc instanceof Error && !(exc instanceof global.errors.StandardError)) {
                console.log(exc.stack);
            }
        }
    }

    #_onmessage = message => this.#onmessage(message).catch(exc => console.error(exc.stack));
}
