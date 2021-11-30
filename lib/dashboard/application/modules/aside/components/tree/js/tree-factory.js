export const TreeFactory = new (class {

    get types() {
        return {
            application: ApplicationTree,
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

        const tree = new this.types[type](type, ...specs);
        tree.__setType(type);
        return tree;
    }

})();
