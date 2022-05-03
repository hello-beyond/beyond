import {Events} from "@beyond-js/kernel/core/ts";
import {module} from "beyond_context";
import type {Bee} from "../item";
import {ServiceBuilds} from "./builds";

/**
 * Service builder manager
 *
 * @param bee {object} The Bee
 * @constructor
 */

interface DistributionSpecs {
    environment: string
}

export class ServiceBuilder extends Events {
    #bee: Bee;

    readonly #builds;
    get builds() {
        return this.#builds;
    }

    #messages: string[] = [];
    get messages() {
        return this.#messages;
    }

    constructor(bee: Bee) {
        super();
        this.#bee = bee;
        this.#builds = new ServiceBuilds(bee);
    }

    onMessage(message: string) {
        this.#messages.push(message);
        this.trigger('change');
    };

    private id() {
        return this.#bee.fields.get('id').value;
    }

    private async prepare() {
        try {
            //TODO validar con @box la para importar beyond
            // await beyond.rpc.prepare();

            const socket = await module.socket;
            const event = `server:build-service-${this.id()}`;
            socket.on(event, this.onMessage);
        } catch (exc) {
            console.error(exc.stack)
        }
    }

    async build(distribution: DistributionSpecs) {

        if (typeof distribution !== 'object') {
            throw new Error('Invalid distribution parameter');
        }
        if (!['development', 'production'].includes(distribution.environment)) {
            throw new Error('Parameter "environment" is invalid');
        }

        try {
            await this.prepare();
        } catch (exc) {
            console.error(exc.stack);
        }

        const specs = {
            name: distribution.environment,
            service: this.id(),
            environment: distribution.environment,
        };

        return await module.execute('/build/service', specs);

    }
}