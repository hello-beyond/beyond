import {Item, ItemsProperty, ItemSelectorProperty, ItemSpecs, CollectionProperty} from "@beyond-js/plm/core/ts";
import {module} from "beyond_context";
import {ModuleTexts} from "./texts";
import {ModuleDeclarations} from "./declarations";
import type {Bundle} from "../bundles/item";
import type {Library} from "../libraries/item";
import type {Application} from "../applications/item";
import type {ModuleStatics} from "./static/collection";

export /*bundle*/
class Module extends Item {
    readonly #declarations;
    get declarations(): ModuleDeclarations {
        return this.#declarations;
    }

    get id(): string {
        return this.fields.get('id').value;
    }

    get name(): string {
        return this.fields.get('name').value;
    }

    get tu(): string {
        return this.fields.get('tu').value;
    }

    get path(): string {
        return this.fields.get('path').value;
    }

    get pathname(): string {
        return this.fields.get('pathname').value;
    }

    #title: string;
    get title(): string {
        return this.#title ?? this.fields.get('title').value;
    }

    set title(value: string) {
        this.#title = value;
    }

    #description: string;
    get description(): string {
        return this.#description ?? this.fields.get('description').value;
    }

    set description(value: string) {
        this.#description = value;
    }

    get hmr(): boolean {
        return this.fields.get('hmr').value;
    }

    get errors(): string[] {
        return this.fields.get('errors').value ?? [];
    }

    get warnings(): string[] {
        return this.fields.get('warnings').value ?? [];
    }

    get bundles(): Map<string, Bundle> {
        return <ItemsProperty>this.properties.get('bundles');
    }

    get static(): ModuleStatics {
        const statics = <CollectionProperty>this.properties.get('static');
        return statics && statics.value;
    }

    get container(): Application | Library {
        const container = <ItemSelectorProperty>this.properties.get('container');
        return container && <Application | Library>container.value;
    }

    readonly #texts;
    get texts(): ModuleTexts {
        return this.#texts;
    }

    constructor(specs: ItemSpecs) {
        super('modules', specs);

        this.#texts = new ModuleTexts(this);
        this.#declarations = new ModuleDeclarations(this);
        this.#declarations.on('change', () => this.node.trigger('change'));
    }

    /**
     *  Checks if the folder where files going to be located exist.
     */
    checkStatic() {
        const specs = {moduleId: this.id, static: {"path": "./static"}};
        return module.execute('/builder/module/edit', specs);
    }
}
