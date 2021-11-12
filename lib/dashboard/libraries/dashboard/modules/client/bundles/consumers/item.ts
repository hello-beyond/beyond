import {Item, ItemProperty, ItemSpecs} from "@beyond-js/plm/core/ts";
import type {Bundle} from "../item";

export /*bundle*/
class Consumer extends Item {
    get id() {
        return this.fields.get('id').value;
    }

    get bundle(): Bundle {
        const bundle = <ItemProperty>this.properties.get('bundle');
        return bundle && <Bundle>bundle.value;
    }

    constructor(specs: ItemSpecs) {
        super('bundles-consumers', specs);
    }

}
