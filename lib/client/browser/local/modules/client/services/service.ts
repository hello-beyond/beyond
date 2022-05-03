import {module} from 'beyond_context';
import {Events, ns_service_service} from '@beyond-js/kernel/core/ts';
import Service = ns_service_service.Service;

export class ManagedService extends Events {
    readonly #service: Service;
    readonly #id: string;

    constructor(service: Service) {
        super();
        this.#service = service;
        this.#id = (service.is === 'library' ? 'library' : 'application') + `/${service.local.id}`;
    }

    #params() {
        const legacies = ['@beyond-js/local', '@beyond-js/dashboard-lib'];
        const kind = legacies.includes(this.#service.package.id) ? 'legacy' : 'backend';
        return {id: this.#id, kind};
    }

    #status = async (): Promise<string> => {
        if (this.#service.package.id === '@beyond-js/local') {
            throw new Error('Cannot check the status of beyond-local, ' +
                'as beyond-local is the service used to check the status of the services');
        }

        return <string>await module.execute('libraries/status', this.#params());
    }

    get status() {
        return this.#status();
    }

    async start() {
        await module.execute('libraries/start', this.#params());
    }

    async stop() {
        await module.execute('libraries/stop', this.#params());
    }
}
