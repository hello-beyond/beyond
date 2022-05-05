import {Collection, CollectionSpecs} from "@beyond-js/plm/core/ts";
import {ProcessorOverwrite} from "./item";

export /*bundle*/
class ProcessorOverwrites extends Collection {
    constructor(specs: CollectionSpecs) {
        super('processors-overwrites', ProcessorOverwrite, specs);
    }
}
