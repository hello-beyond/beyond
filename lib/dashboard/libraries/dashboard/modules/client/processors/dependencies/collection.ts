import {Collection, CollectionSpecs} from "@beyond-js/plm/core/ts";
import {ProcessorDependency} from "./item";

export /*bundle*/
class ProcessorDependencies extends Collection {
    constructor(specs: CollectionSpecs) {
        super('processors-dependencies', ProcessorDependency, specs);
    }
}
