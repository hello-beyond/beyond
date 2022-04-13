import {Collection, CollectionSpecs} from "@beyond-js/plm/core/ts";
import {Declaration} from "./item";

export /*bundle*/
class Declarations extends Collection {
    constructor(specs: CollectionSpecs) {
        super('declarations', Declaration, specs);
    }
}
