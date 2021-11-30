import {Item, ItemSpecs} from "@beyond-js/plm/core/ts";
import {module} from "beyond_context";
import {ServiceBuilder} from "./builder/builder";

interface CreateSpecs {
    filename: string,
    type?: 'core' | 'sessions'
}

export /*bundle*/
class Bee extends Item {
    get id() {
        return this.fields.get('id').value;
    }

    get path() {
        return this.fields.get('path').value;
    }

    get version() {
        return this.fields.get('version').value;
    }

    get name() {
        return this.fields.get('name').value;
    }

    get enabled() {
        return this.fields.get('enabled').value;
    }

    get status() {
        return this.fields.get('status').value;
    }

    get builds() {
        return this.fields.get('builds').value;
    }

    get exception() {
        return this.fields.get('exception').value;
    }

    get port() {
        return this.fields.get('port').value;
    }

    get pid() {
        return this.fields.get('pid').value;
    }

    get errors(): string[] {
        return this.fields.get('errors').value ?? [];
    }

    readonly #builder;
    get builder() {
        return this.#builder;
    }

    constructor(specs: ItemSpecs) {
        super('bees', specs);
        this.#builder = new ServiceBuilder(this);
    }

    start() {
        return module.execute('bees/start', {id: this.id});
    }

    stop() {
        return module.execute('bees/stop', {id: this.id});
    }

    restart() {
        return module.execute('bees/restart', {id: this.id});
    }

    createFile(specs: CreateSpecs) {
        const params = {
            id: this.id,
            type: 'bees',
            identifier: specs.type ?? 'core',
            filename: specs.filename,
        };

        return module.execute('/sources/create', params);
    }
}
