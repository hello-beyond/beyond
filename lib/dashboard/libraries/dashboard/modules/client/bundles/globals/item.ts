import {Item, ItemSpecs} from "@beyond-js/plm/core/ts";

export /*bundle*/
class GlobalBundle extends Item {
    get id() {
        return this.fields.get('id').value;
    }

    get name(): string {
        return this.fields.get('name').value;
    }

    get processors(): [string] {
        return this.fields.get('processors').value;
    }

    get multilanguage(): boolean {
        return !!this.fields.get('multilanguage').value;
    }

    constructor(specs: ItemSpecs) {
        super('global-bundles', specs);
    }
}