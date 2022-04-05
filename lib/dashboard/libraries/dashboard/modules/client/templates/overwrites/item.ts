import {Item, ItemSpecs} from "@beyond-js/plm/core/ts";

export /*bundle*/
class TemplateOverwrite extends Item {
    get id(): string {
        return this.fields.get('id').value;
    }

    get path(): string {
        return this.fields.get('path').value;
    }

    get module(): string {
        return this.fields.get('module').value;
    }

    get bundle(): string {
        return this.fields.get('bundle').value;
    }

    get processor(): string {
        return this.fields.get('processor').value;
    }

    get errors(): string[] {
        return this.fields.get('errors').value ?? [];
    }

    get warnings(): string[] {
        return this.fields.get('warnings').value ?? [];
    }

    constructor(specs: ItemSpecs) {
        super('template-overwrites', specs);
    }
}
