import {module} from "beyond_context";
import {Item, ItemSpecs} from "@beyond-js/plm/core/ts";

interface SourceSpecs {
    applicationId: string,
    moduleId: string,
    file: string,
    source: string
}

interface RenameSpecs {
    path: string,
    current: string,
    newName: string
}

export abstract class Source extends Item {
    abstract get file(): string;

    #isFavorite: boolean;
    get isFavorite() {
        return this.#isFavorite;
    }

    set isFavorite(value: boolean) {
        if (value === this.#isFavorite) return;
        this.#isFavorite = value;
        this.node.trigger('favorite.changed');
    }

    protected constructor(table: string, specs: ItemSpecs) {
        super(table, specs);
    }

    async save(specs: SourceSpecs) {
        return module.execute('/sources/save', specs);
    }

    async rename(specs: RenameSpecs) {
        return module.execute('/sources/rename', specs);
    }

    async delete() {
        return module.execute('/sources/delete', {target: this.file});
    }


    async format(params: any) {
        return module.execute('/sources/format', params);
    }
}
