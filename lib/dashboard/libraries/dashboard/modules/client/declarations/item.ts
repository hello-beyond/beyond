import {Item, ItemSpecs} from "@beyond-js/plm/core/ts";

export /*bundle*/
class Declaration extends Item {
    get id(): string {
        return this.fields.get('id').value;
    }

    get code(): string {
        return this.fields.get('code').value;
    }

    get processed(): boolean {
        return this.fields.get('processed').value;
    }

    get errors(): string[] {
        return this.fields.get('errors').value ?? [];
    }

    get warnings(): string[] {
        return this.fields.get('warnings').value ?? [];
    }

    constructor(specs: ItemSpecs) {
        super('declarations', specs);
    }
}
