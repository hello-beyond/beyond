import {Collection, CollectionSpecs} from "@beyond-js/plm/core/ts";
import {ApplicationStatic} from "./item";

export /*bundle*/
class ApplicationStatics extends Collection {

    constructor(specs: CollectionSpecs) {
        super('applications-static', ApplicationStatic, specs);
    }

}
