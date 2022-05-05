import {Collection, CollectionSpecs} from "@beyond-js/plm/core/ts";
import {Consumer} from "./item";

export /*bundle*/
class Consumers extends Collection {

    constructor(specs: CollectionSpecs) {
        super('bundles-consumers', Consumer, specs);
    }

}
