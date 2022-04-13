import {ItemSpecs} from "@beyond-js/plm/core/ts";
import {Source} from "../../sources/source";

interface RelativeSpecs {
    file: string,
    dirname: string
}

export /*bundle*/
class ApplicationStatic extends Source {
    get id(): string {
        return this.fields.get('id').value;
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

    get relative(): RelativeSpecs {
        return this.fields.get('relative').value;
    }

    get extname(): string {
        return this.fields.get('extname').value;
    }

    get pathname(): string {
        return this.fields.get('pathname').value;
    }

    constructor(specs: ItemSpecs) {
        super('applications-static', specs);
    }
}
