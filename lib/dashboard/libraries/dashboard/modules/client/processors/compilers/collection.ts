import {Collection, CollectionSpecs} from "@beyond-js/plm/core/ts";
import {ProcessorCompiler} from "./item";

export /*bundle*/
class ProcessorCompilers extends Collection {
    constructor(specs: CollectionSpecs) {
        super('processors-compilers', ProcessorCompiler, specs);
    }
}
