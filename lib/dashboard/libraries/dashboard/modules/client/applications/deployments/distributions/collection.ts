import {Collection, CollectionSpecs} from "@beyond-js/plm/core/ts";
import {ApplicationDistribution} from "./item";

export /*bundle*/
class ApplicationDistributions extends Collection {

    constructor(specs: CollectionSpecs) {
        super('applications-distributions', ApplicationDistribution, specs);
    }

}
