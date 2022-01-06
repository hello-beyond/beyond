import {Collection, CollectionSpecs} from "@beyond-js/plm/core/ts";
import {TemplateGlobalSource} from "./item";

export /*bundle*/
class TemplateGlobalSources extends Collection {
    constructor(specs: CollectionSpecs) {
        super('template-global-sources', TemplateGlobalSource, specs);
    }
}
