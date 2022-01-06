import {Collection, CollectionSpecs} from "@beyond-js/plm/core/ts";
import {TemplateApplicationsSource} from "./item";

export /*bundle*/
class TemplateApplicationsSources extends Collection {
    constructor(specs: CollectionSpecs) {
        super('template-application-sources', TemplateApplicationsSource, specs);
    }
}
