import {CollectionProperty, Item, ItemProperty, ItemSpecs, ItemsProperty} from "@beyond-js/plm/core/ts";
import {LibraryBuilder} from "./builder";
import type {Bee} from "../bees/item";
import type {Modules} from "../modules/collection";
import type {LibrariesStatic} from "./static/item";

export /*bundle*/
class Library extends Item {
    get id(): string {
        return this.fields.get('id').value;
    }

    get path(): string {
        return this.fields.get('path').value;
    }

    get name(): string {
        return this.fields.get('name').value;
    }

    get title(): string {
        return this.fields.get('title').value;
    }

    get description(): string {
        return this.fields.get('description').value;
    }

    get developer(): string {
        return this.fields.get('developer').value;
    }

    get version(): number {
        return this.fields.get('version').value;
    }

    get connect(): boolean {
        return this.fields.get('connect').value;
    }

    get hosts(): string {
        return this.fields.get('hosts').value;
    }

    get static(): string {
        return this.fields.get('static').value;
    }

    get errors(): string[] {
        return this.fields.get('errors').value ?? [];
    }

    get warnings(): string[] {
        return this.fields.get('warnings').value ?? [];
    }

    get bee(): Bee {
        const bee = <ItemProperty>this.properties.get('bee');
        return bee && <Bee>bee.value;
    }

    get modules(): Modules {
        const modules = <CollectionProperty>this.properties.get('modules');
        return modules && modules.value;
    }

    get statics(): Map<string, LibrariesStatic> {
        return <ItemsProperty>this.properties.get('static');
    }

    #builder: LibraryBuilder;
    get builder(): LibraryBuilder {
        return this.#builder;
    }

    constructor(specs: ItemSpecs) {
        super('libraries', specs);
        this.onReady = this.onReady.bind(this);
        this.bind('change', this.onReady);
    }

    private onChange = () => this.node.trigger('change');

    private onReady() {
        if (!this.landed || !!this.#builder) return;

        this.#builder = new LibraryBuilder(this.name);
        this.#builder.on('change', this.onChange);
        this.off('change', this.onReady);
    };
}
