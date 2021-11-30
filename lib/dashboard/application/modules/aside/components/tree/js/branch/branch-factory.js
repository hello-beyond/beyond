export const branchFactory = new (class {

    _elements = new Map();
    get elements() {
        return this._elements;
    }

    get types() {
        return {
            bundle: BranchBundle,
            module: ModuleBranch,
            source: SourceBranch,
            subtree: Subtree,
            processor: ProcessorBranch,
            favorites: FavoritesBranch,
            static: StaticBranch,
            templateSource: TemplateSourceBranch,
            backendSource: BackendSourceBranch,
            dependency: DependencyBranch,
            consumer: ConsumerBranch,
            resources: ResourcesBranch,
            default: Branch,
        }
    }

    create(item) {
        return new Branch(item);
    }

    get = (type, item, application, specs = {}) => {
        type = this.types.hasOwnProperty(type) ? type : 'default';
        const id = type === 'favorites' ? `${item.id}.favorites` : item.id;
        const instance = this.elements.get(id);
        const isFavoriteInstance = !!(type === 'favorites' && instance?.favoriteProxy);

        if (isFavoriteInstance || instance?.type === type) return instance;

        const element = new this.types[type](item, application, specs);
        this.elements.set(element.id, element)
        return element;
    }

})();
