import {Item, ItemSpecs} from "@beyond-js/plm/core/ts";

export /*bundle*/
class GlobalBundle extends Item {

    get id() {
        return this.fields.get('id').value;
    }

    constructor(specs: ItemSpecs) {
        super('global-bundles', specs);
    }

}
