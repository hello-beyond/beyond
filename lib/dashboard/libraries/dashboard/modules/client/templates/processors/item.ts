import {CollectionProperty, ItemSpecs} from "@beyond-js/plm/core/ts";
import {module} from "beyond_context";
import {File} from "../../file/file";
import type {TemplateProcessorsSources} from "./sources/collection";

interface CreateSpecs {
    filename: string
}

export /*bundle*/
class TemplateProcessor extends File {
    get id(): string {
        return this.fields.get('id').value;
    }

    get processor(): string {
        return this.fields.get('processor').value;
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

    get sources(): TemplateProcessorsSources {
        const sources = <CollectionProperty>this.properties.get('sources');
        return sources && sources.value;
    }

    constructor(specs: ItemSpecs) {
        super('template-processors', specs);
    }

    async createFile(specs: CreateSpecs) {
        const params = {
            id: this.id,
            type: 'template-processors',
            filename: specs.filename
        };

        return module.execute('/sources/create', params);
    }
}
