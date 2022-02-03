import {Item, ItemProperty, ItemSpecs} from "@beyond-js/plm/core/ts";
import type {Bundle} from "../../bundles/item";
import type {Declaration} from "../../declarations/item";

export /*bundle*/
class ProcessorDependency extends Item {
    get id(): string {
        return this.fields.get('id').value;
    }

    get is(): string {
        return this.fields.get('is').value;
    }

    get version(): number {
        return this.fields.get('version').value;
    }

    get external(): boolean {
        return this.fields.get('external').value;
    }

    get resource(): string {
        return this.fields.get('resource').value;
    }

    get errors(): string[] {
        return this.fields.get('errors').value ?? [];
    }

    get warnings(): string[] {
        return this.fields.get('warnings').value ?? [];
    }

    get bundle(): Bundle {
        const bundle = <ItemProperty>this.properties.get('bundle');
        return bundle && <Bundle>bundle.value;
    }

    get declaration(): Declaration {
        const declaration = <ItemProperty>this.properties.get('declaration');
        return declaration && <Declaration>declaration.value;
    }

    get moduleId(): string {
        return this.fields.get('module_id').value;
    }

    get bundleId(): string {
        return this.fields.get('bundle_id').value;
    }

    constructor(specs: ItemSpecs) {
        super('processors-dependencies', specs);
    }
}
