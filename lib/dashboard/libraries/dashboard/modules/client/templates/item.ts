import {CollectionProperty, Item, ItemProperty, ItemSpecs, ItemsProperty} from "@beyond-js/plm/core/ts";
import type {Processor} from "../processors/item";
import type {TemplateGlobal} from "./global/item";
import type {TemplateApplication} from "./applications/item";
import type {TemplateOverwrites} from "./overwrites/collection";

export /*bundle*/
class Template extends Item {
    get id(): string {
        return this.fields.get('id').value;
    }

    get path(): string {
        return this.fields.get('path').value;
    }

    get errors(): string[] {
        return this.fields.get('errors').value ?? [];
    }

    get warnings(): string[] {
        return this.fields.get('warnings').value ?? [];
    }

    get application(): TemplateApplication {
        const application = <ItemProperty>this.properties.get('application');
        return application && <TemplateApplication>application.value;
    }

    get global(): TemplateGlobal {
        const global = <ItemProperty>this.properties.get('global');
        return global && <TemplateGlobal>global.value;
    }

    get processors(): Map<string, Processor> {
        return <ItemsProperty>this.properties.get('processors');
    }

    get overwrites(): TemplateOverwrites {
        const overwrites = <CollectionProperty>this.properties.get('overwrites');
        return overwrites && overwrites.value;
    }

    constructor(specs: ItemSpecs) {
        super('templates', specs);
    }
}
