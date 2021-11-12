import {Item, ItemSpecs} from "@beyond-js/plm/core/ts";
import {module} from "beyond_context";

export abstract class File extends Item {
    protected constructor(table: string, specs: ItemSpecs) {
        super(table, specs);
    }

    abstract get path(): string;

    deleteFolder(folder: string) {
        if (!this.path) {
            console.error('The module not have dirname associate it')
            return;
        }
        return module.execute('/sources/delete', {target: `${this.path}\\${folder}`});
    }
}