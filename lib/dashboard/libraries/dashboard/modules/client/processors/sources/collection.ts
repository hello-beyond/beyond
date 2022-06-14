import {Collection, CollectionSpecs} from "@beyond-js/plm/core/ts";
import {ProcessorSource} from "./item";

export /*bundle*/
class ProcessorSources extends Collection {
    constructor(specs: CollectionSpecs) {
        super('processors-sources', ProcessorSource, specs);
    }
}
