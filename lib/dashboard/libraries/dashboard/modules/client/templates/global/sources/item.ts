import type {ItemSpecs} from "@beyond-js/plm/core/ts";
import {Source} from "../../../sources/source";

interface RelativeSpecs {
    file: string,
    dirname: string
}

export /*bundle*/
class TemplateGlobalSource extends Source {
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

    get type() {
        return 'template';
    }

    constructor(specs: ItemSpecs) {
        super('template-global-sources', specs);
    }
}
