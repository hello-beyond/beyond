import type {ItemSpecs} from "@beyond-js/plm/core/ts";
import {Source} from "../../sources/source";

interface RelativeSpecs {
    file: string,
    dirname: string
}

export /*bundle*/
class ProcessorOverwrite extends Source {
    get id(): string {
        return this.fields.get('id').value;
    }

    get version(): number {
        return this.fields.get('version').value;
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

    constructor(specs: ItemSpecs) {
        super('processors-overwrites', specs);
    }
}
