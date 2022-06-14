import {Module} from "@beyond-js/kernel/core/ts";
import {BatchRequest} from "./request";

interface BatchSpecs {
    module: Module
    action: string
    max?: number
}

export class Batch<REQUEST, RESPONSE> {
    readonly #specs;
    readonly #queue: BatchRequest<RESPONSE>[] = []
    readonly #requests: Map<string, BatchRequest<RESPONSE>> = new Map

    get queueLength(): number {
        return this.#queue.length
    }

    /**
     * Batch constructor
     * @param {BatchSpecs} specs
     */
    constructor(specs: BatchSpecs) {
        specs.max = specs.max ? specs.max : 30;
        this.#specs = specs;
    }

    #timer: number;

    /**
     * Push a new request
     *
     * @param {REQUEST} value
     * @returns {Promise<RESPONSE>}
     */
    exec(value: REQUEST): Promise<RESPONSE> {
        if (!value) throw new Error('Invalid parameters, value must be set');

        const rq = new BatchRequest<RESPONSE>(value);
        this.#queue.push(rq);
        this.#requests.set(rq.id, rq);
        clearTimeout(this.#timer);

        setTimeout(() => this.#execute(), 0);
        return rq.promise;
    }

    /**
     * Processes the pending requests
     */
    #execute = () => {
        // Nothing more to be processed
        if (!this.#queue.length) return;

        const requests = this.#queue.splice(0, this.#specs.max);

        const params = requests.map(rq => [rq.id, rq.value]);
        const {module, action} = this.#specs;
        /**
         * TODO 1:
         * Definir que la respuesta pueda ser una matriz o un mapa
         * para que en el servicio sea mas simple manejar el armado de la respuesta
         * pero que pueda recibir las 2 estructuras
         *
         * TODO 2: finally esta incluido a partir de ES2018 validar lo que implica ese cambio
         */
        module.execute(action, params)
            .then((response: [string, RESPONSE][] | Map<string, RESPONSE>) => {

                const responses: Map<string, RESPONSE> = new Map(response);
                // const responses = Array.isArray(response) ? new Map(response) : response;

                for (const rq of requests) {
                    this.#requests.delete(rq.id);
                    rq.promise.resolve(responses.get(rq.id));
                }
            })
            .catch(error => {
                for (const rq of requests) {
                    this.#requests.delete(rq.id);
                    rq.promise.reject(error);
                }
            })
            .finally(() => {
                this.#execute();
            })
    }
}
