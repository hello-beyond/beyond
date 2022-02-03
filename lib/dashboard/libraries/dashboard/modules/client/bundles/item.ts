import {CollectionProperty, Item, ItemProperty, ItemSpecs, ItemsProperty} from "@beyond-js/plm/core/ts";
import {module} from "beyond_context";
import type {Module} from "../modules/item";
import type {Processor} from "../processors/item";
import type {Consumers} from "./consumers/collection";

interface DeleteSpecs {
    target: string
}

interface SourceSpecs {
    applicationId: string,
    moduleId: string,
    file: string,
    source: string
}

interface ElementSpecs {
    name: string
}

export /*bundle*/
class Bundle extends Item {
    get id(): string {
        return this.fields.get('id').value;
    }

    get name(): string {
        return this.fields.get('name').value;
    }

    get extname(): string {
        return this.fields.get('extname').value;
    }

    get pathname(): string {
        return this.fields.get('pathname').value;
    }

    get route(): string {
        return this.fields.get('route').value;
    }

    get layout(): string {
        return this.fields.get('layout').value;
    }

    get type(): string {
        return this.fields.get('is').value ?? this.name;
    }

    get updated(): boolean {
        return this.fields.get('updated').value;
    }

    get destroyed(): boolean {
        return this.fields.get('destroyed').value;
    }

    get errors(): string[] {
        return this.fields.get('errors').value ?? [];
    }

    get warnings(): string[] {
        return this.fields.get('warnings').value ?? [];
    }

    get element(): ElementSpecs {
        return this.fields.get('element').value;
    }

    get processors(): Map<string, Processor> {
        const output: Map<string, Processor> = new Map();
        const processors = <ItemsProperty>this.properties.get('processors');

        processors && processors.forEach((processor: Processor) => {
            if (!processor.landed) return;
            const name = <string>processor.fields.get('name').value
            output.set(name, processor);
        });

        return output;
    }

    get consumers(): Consumers {
        const consumers = <CollectionProperty>this.properties.get('consumers');
        return consumers && consumers.value;
    }

    get container(): Module {
        const container = <ItemProperty>this.properties.get('container');
        return container && <Module>container.value;
    }

    get compilerProcessorActivate(): boolean {
        return this.fields.get('compilerProcessorActivate').value;
    }

    constructor(specs: ItemSpecs) {
        super('bundles', specs);
    }

    hasProcessor(name: string): boolean {
        let find = false;
        const processors = <ItemsProperty>this.properties.get('processors');

        processors.forEach((processor: Processor) => {
            if (!processor.landed) return;
            const processorName = <string>processor.fields.get('name').value;
            if (name === processorName) find = true;
        });

        return find;
    }

    async createFile(specs: SourceSpecs) {
        return module.execute('/sources/create', specs);
    }

    async delete(specs: DeleteSpecs) {
        return module.execute('/sources/delete', specs);
    }
}
