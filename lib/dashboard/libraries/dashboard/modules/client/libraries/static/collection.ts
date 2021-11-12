import {Collection, CollectionSpecs} from "@beyond-js/plm/core/ts";
import {LibrariesStatic} from "./item";

export /*bundle*/
class LibrariesStatics extends Collection {

    constructor(specs: CollectionSpecs) {
        super('libraries-static', LibrariesStatic, specs);
    }

}
