import {CollectionProperty, ItemSpecs} from "@beyond-js/plm/core/ts";
import {module} from "beyond_context";
import {File} from "../../file/file";
import type {TemplateApplicationsSources} from "./sources/collection";

interface CreateSpecs {
    filename: string
}

export /*bundle*/
class TemplateApplication extends File {
    get id(): string {
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

    get sources(): TemplateApplicationsSources {
        const sources = <CollectionProperty>this.properties.get('sources');
        return sources && sources.value;
    }

    constructor(specs: ItemSpecs) {
        super('template-application', specs);
    }

    async createFile(specs: CreateSpecs) {
        const params = {
            id: this.id,
            type: 'template-application',
            filename: specs.filename
        };

        return module.execute('/sources/create', params);
    }
}
