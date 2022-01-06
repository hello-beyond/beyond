import {Item, ItemProperty, ItemSpecs} from "@beyond-js/plm/core/ts";
import type {Application} from "../item";
import type {Library} from "../../libraries/item";
import {LibraryBuilder} from "../../libraries/builder";

export /*bundle*/
class ApplicationLibrary extends Item {
    get id(): string {
        return this.fields.get('id').value;
    }

    get application(): Application {
        const application = <ItemProperty>this.properties.get('application');
        return application && <Application>application.value;
    }

    get library(): Library {
        const library = <ItemProperty>this.properties.get('library');
        return library && <Library>library.value;
    }

    #builder: LibraryBuilder;
    get builder() {
        return this.#builder;
    }

    constructor(specs: ItemSpecs) {
        super('applications-libraries', specs);
        this.onChange = this.onChange.bind(this);
        this.on('change', this.onChange);
    }

    private onChange() {
        if (!this.landed || !this.library) return;
        const library = this.library;
        this.#builder = new LibraryBuilder(library.name);
        this.off('change', this.onChange);
    };
}
