import {ItemSpecs, CollectionProperty, ItemProperty} from "@beyond-js/plm/core/ts";
import {module} from "beyond_context";
import {File} from "../file/file";
import type {ProcessorCompiler} from "./compilers/item";
import type {ProcessorSources} from "./sources/collection";
import type {ProcessorOverwrites} from "./overwrites/collection";
import type {ProcessorDependencies} from "./dependencies/collection";

interface CreateSpecs {
    filename: string,
    bundle?: string,
    processor?: string,
    type?: 'processor' | 'overwrite' | 'backend'
}

export /*bundle*/
class Processor extends File {
    get id(): string {
        return this.fields.get('id').value;
    }

    get name(): string {
        return this.fields.get('name').value;
    }

    get path(): string {
        return this.fields.get('path').value;
    }

    get updated(): boolean {
        return this.fields.get('updated').value;
    }

    get destroyed(): boolean {
        return this.fields.get('destroyed').value;
    }

    get multilanguage(): string {
        return this.fields.get('multilanguage').value;
    }

    get warnings(): string[] {
        return this.fields.get('warnings').value ?? [];
    }

    get sources(): ProcessorSources {
        const sources = <CollectionProperty>this.properties.get('sources');
        return sources && sources.value;
    }

    get overwrites(): ProcessorOverwrites {
        const overwrites = <CollectionProperty>this.properties.get('overwrites');
        return overwrites && overwrites.value;
    }

    get compiler(): ProcessorCompiler {
        const compiler = <ItemProperty>this.properties.get('compiler');
        return compiler && <ProcessorCompiler>compiler.value;
    }

    get dependencies(): ProcessorDependencies {
        const dependencies = <CollectionProperty>this.properties.get('dependencies');
        return dependencies && dependencies.value;
    }

    #alerts: Map<string, any> = new Map();
    get alerts(): Map<string, any> {
        return this.#alerts;
    }

    constructor(specs: ItemSpecs) {
        super('processors', specs);
    }

    async createFile(specs: CreateSpecs) {
        //TODO: @julio @felix, check overwrites logic
        const params = {
            id: this.id,
            type: 'processor',
            filename: specs.filename
        };

        return module.execute('/sources/create', params);
    }
}
