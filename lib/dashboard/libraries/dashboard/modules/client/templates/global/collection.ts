import {Collection, CollectionSpecs} from "@beyond-js/plm/core/ts";
import {TemplateGlobal} from "./item";

export /*bundle*/
class TemplateGlobals extends Collection {
    constructor(specs: CollectionSpecs) {
        super('template-global', TemplateGlobal, specs);
    }
}