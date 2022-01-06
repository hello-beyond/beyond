import {Item, ItemSpecs} from "@beyond-js/plm/core/ts";

export /*bundle*/
class ApplicationDistribution extends Item {
    get id() {
        return this.fields.get('id').value;
    }

    get name() {
        return this.fields.get('name').value;
    }

    get local() {
        return this.fields.get('local').value;
    }

    get ssr() {
        return this.fields.get('ssr').value;
    }

    get port() {
        return this.fields.get('port').value;
    }

    get amd() {
        return this.fields.get('amd').value;
    }

    get ts() {
        return this.fields.get('ts').value;
    }

    get platform() {
        return this.fields.get('platform').value;
    }

    get compress() {
        return this.fields.get('compress').value;
    }

    get environment() {
        return this.fields.get('environment').value;
    }

    get default() {
        return this.fields.get('default').value;
    }

    constructor(specs: ItemSpecs) {
        super('applications-distributions', specs);
    }
}
