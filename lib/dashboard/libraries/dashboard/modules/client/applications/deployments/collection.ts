import {Collection, CollectionSpecs} from "@beyond-js/plm/core/ts";
import {ApplicationDeployment} from "./item";

export /*bundle*/
class ApplicationDeployments extends Collection {

    constructor(specs: CollectionSpecs) {
        super('applications-deployments', ApplicationDeployment, specs);
    }

}
