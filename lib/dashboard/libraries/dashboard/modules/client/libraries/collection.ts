import {Collection, CollectionSpecs} from "@beyond-js/plm/core/ts";
import {Library} from "./item";

export /*bundle*/
class Libraries extends Collection {
    constructor(specs: CollectionSpecs) {
        super('libraries', Library, specs);
    }
}