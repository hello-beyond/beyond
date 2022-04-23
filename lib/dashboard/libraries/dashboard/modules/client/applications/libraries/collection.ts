import {Collection, CollectionSpecs} from "@beyond-js/plm/core/ts";
import {ApplicationLibrary} from "./item";

export /*bundle*/
class ApplicationLibraries extends Collection {

    constructor(specs: CollectionSpecs) {
        super('applications-libraries', ApplicationLibrary, specs);
        this.counters.register('all');
    }

}
