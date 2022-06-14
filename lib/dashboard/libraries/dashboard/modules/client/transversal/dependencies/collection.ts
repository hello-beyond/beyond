import {Collection, CollectionSpecs} from "@beyond-js/plm/core/ts";
import {TransversalDependency} from "./item";

export /*bundle*/
class TransversalDependencies extends Collection {
    constructor(specs: CollectionSpecs) {
        super('transversal-dependencies', TransversalDependency, specs);
    }
}
