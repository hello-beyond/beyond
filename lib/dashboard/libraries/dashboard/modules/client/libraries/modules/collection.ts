import {Collection, CollectionSpecs} from "@beyond-js/plm/core/ts";
import {LibraryModule} from "./item";

export /*bundle*/
class LibraryModules extends Collection {

    constructor(specs: CollectionSpecs) {
        super('libraries-modules', LibraryModule, specs);

        this.counters.register('all');
    }

}
