import {CollectionProperty, Item, ItemSpecs} from "@beyond-js/plm/core/ts";
import {TemplateGlobalSources} from "./sources/collection";

export /*bundle*/
class TemplateGlobal extends Item {
    get id() {
        return this.fields.get('id').value;
    }

    get path(): string {
        return this.fields.get('path').value;
    }

    get processor(): string {
        return this.fields.get('processor').value;
    }

    get files(): string[] {
        return this.fields.get('files').value ?? [];
    }

    get errors(): string[] {
        return this.fields.get('errors').value ?? [];
    }

    get warnings(): string[] {
        return this.fields.get('warnings').value ?? [];
    }

    get sources(): TemplateGlobalSources {
        const sources = <CollectionProperty>this.properties.get('sources');
        return sources && sources.value;
    }

    constructor(specs: ItemSpecs) {
        super('template-global', specs);
    }
}