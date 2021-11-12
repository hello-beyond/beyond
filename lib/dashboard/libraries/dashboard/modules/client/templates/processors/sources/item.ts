import type {ItemSpecs} from "@beyond-js/plm/core/ts";
import {Source} from "../../../sources/source";

interface RelativeSpecs {
    file: string,
    dirname: string
}

export /*bundle*/
class TemplateProcessorsSource extends Source {
    get id(): string {
        return this.fields.get('id').value;
    }

    get version(): number {
        return this.fields.get('version').value;
    }

    get processor(): string {
        return this.fields.get('processor').value;
    }

    get code(): string {
        return this.fields.get('code').value;
    }

    get file(): string {
        return this.fields.get('file').value;
    }

    get filename(): string {
        return this.fields.get('filename').value;
    }

    get dirname(): string {
        return this.fields.get('dirname').value;
    }

    get basename(): string {
        return this.fields.get('basename').value;
    }

    get extname(): string {
        return this.fields.get('extname').value;
    }

    get relative(): RelativeSpecs {
        return this.fields.get('relative').value;
    }

    get errors(): string[] {
        return this.fields.get('errors').value ?? [];
    }

    get warnings(): string[] {
        return this.fields.get('warnings').value ?? [];
    }

    get type() {
        return 'processor'
    }

    constructor(specs: ItemSpecs) {
        super('template-processors-sources', specs);
    }
}
