import {Item, ItemProperty, ItemSpecs} from "@beyond-js/plm/core/ts";
import {Library} from "../item";
import {Module} from "../../modules/item";

export /*bundle*/
class LibraryModule extends Item {
    get id(): string {
        return this.fields.get('id').value;
    }

    get library(): Library {
        const library = <ItemProperty>this.properties.get('library');
        return library && <Library>library.value;
    }

    get module(): Module {
        const module = <ItemProperty>this.properties.get('module');
        return module && <Module>module.value;
    }

    constructor(specs: ItemSpecs) {
        super('libraries-modules', specs);
    }
}
