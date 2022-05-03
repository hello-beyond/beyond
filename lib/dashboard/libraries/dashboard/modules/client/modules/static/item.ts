import {Item, ItemSpecs} from "@beyond-js/plm/core/ts";
import {module} from "beyond_context";

interface OverwriteEntry {
    module: string,
    bundle: string,
    static: { [key: string]: string }
}

interface UploadSpecs {
    origin: string,
    overwrite: string
}

interface RelativeSpecs {
    file: string,
    dirname: string
}

interface OverwriteSpecs {
    id: string,
    path: string,
    file: string,
    filename: string,
    basename: string,
    extname: string,
    relative: string
}

export /*bundle*/
class ModuleStatic extends Item {
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

    get extname(): string {
        return this.fields.get('extname').value;
    }

    get relative(): RelativeSpecs {
        return this.fields.get('relative').value;
    }

    get pathname(): string {
        return this.fields.get('pathname').value;
    }

    get overwrite(): OverwriteSpecs {
        return this.fields.get('overwrite').value;
    }

    constructor(specs: ItemSpecs) {
        super('modules-static', specs);
    }

    upload(specs: UploadSpecs) {
        const [, applicationId, moduleName,] = this.id.split('//');

        const overwrites: OverwriteEntry[] = [];
        const overwrite: OverwriteEntry = {
            module: moduleName,
            bundle: 'static',
            static: {}
        };
        overwrite.static[specs.origin] = specs.overwrite;
        overwrites.push(overwrite);
        return module.execute('builder/template/update', {
            applicationId: parseInt(applicationId),
            overwrites: overwrites
        });
    }

    async delete(overwrite: boolean) {
        if (!overwrite) {
            await module.execute('sources/delete', {target: this.file});
        }

        if (!this.overwrite) return;

        const [, applicationId, moduleName,] = this.id.split('//');
        const params = {
            applicationId: parseInt(applicationId),
            overwrites: [{module: moduleName, bundle: 'static'}]
        }
        await module.execute('builder/template/delete', params);
        await module.execute('sources/delete', {target: this.overwrite.file});
    }
}
