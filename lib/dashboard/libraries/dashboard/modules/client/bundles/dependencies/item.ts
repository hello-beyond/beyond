import {Item, ItemSpecs} from "@beyond-js/plm/core/ts";

export /*bundle*/
class BundleDependency extends Item {
    get id(): string {
        return this.fields.get('id').value;
    }

    constructor(specs: ItemSpecs) {
        super('bundle-dependencies', specs);
    }
}
