import {Collection, CollectionSpecs} from "@beyond-js/plm/core/ts";
import {ProcessorDependency} from "./item";

export /*bundle*/
class ProcessorDependencies extends Collection {
    constructor(specs: CollectionSpecs) {
        super('processors-dependencies', ProcessorDependency, specs);
    }

    externalsWithErrors() {
        const output: string[] = [];
        this.items.forEach((i: ProcessorDependency) => {
            (i.kind === 'external' || i.kind === undefined) && !i.valid && output.push(i.resource);
        });
        return output;

    }
}
