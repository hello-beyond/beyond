export const TreeFactory = new (class {

    #items = new Map();

    get types() {
        return {
            project: ProjectTree,
            bundle: BundleTree,
            favorites: FavoritesTree,
            module: ModuleTree,
            processor: ProcessorTree,
            static: StaticTree,
            template: TemplateTree,
            dependencies: DependenciesTree,
            consumers: ConsumersTree,
        }
    }

    /**
     * @param {string} type Type of tree to create
     * @param {array }specs 0 application, 1object, 2, elements, 3 module
     */
    get(type, specs) {
        if (!this.types.hasOwnProperty(type)) {
            throw new Error(`The tree for ${type} is not defined`);
        }
        const id = specs.id ? `${type}.${specs.id}` : type;
        // console.log(10, "piden", id, this.#items.get(id));
        if (this.#items.has(id)) {
            return this.#items.get(id);
        }

        const tree = new this.types[type](type, specs);
        this.#items.set(id, tree);
        tree.__setType(type);
        return tree;
    }

})();
