import {Collection, CollectionSpecs} from "@beyond-js/plm/core/ts";
import {GlobalBundle} from "./item";

export /*bundle*/
class GlobalBundles extends Collection {

    constructor(specs: CollectionSpecs) {
        super('global-bundles', GlobalBundle, specs);
    }

}
