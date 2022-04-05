import {beyond, ns_service_service} from '@beyond-js/kernel/core/ts';
import Service = ns_service_service.Service;
import {ManagedService} from "./service";

export /*bundle*/
const services = new class extends Map<string, ManagedService> {
    constructor() {
        super();

        const add = (service: Service) =>
            service.connect && this.set(service.host, new ManagedService(service));

        add(beyond.application);
        beyond.libraries.forEach((library: Service) => add(library));
    }
}
