import {Collection, CollectionSpecs} from "@beyond-js/plm/core/ts";
import {ModuleStatic} from "./item";

export /*bundle*/
class ModuleStatics extends Collection {

    constructor(specs: CollectionSpecs) {
        super('modules-static', ModuleStatic, specs);
    }

}
