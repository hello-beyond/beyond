import {Collection, CollectionSpecs} from "@beyond-js/plm/core/ts";
import {BundleDependency} from "./item";

export /*bundle*/
class BundleDependencies extends Collection {
    constructor(specs: CollectionSpecs) {
        super('bundle-dependencies', BundleDependency, specs);
    }
}
