class ApplicationModel extends ReactiveModel {
    #bundles = ['layout', 'page', 'code', 'all', 'widget'];
    get bundles() {
        return this.#bundles;
    }

    /**
     * Returns the compound id of the application
     *
     * This id is used to destructure the module id
     * @returns {string}
     */
    get id() {
        return `application//${this.application.id}//`;
    }

    get name() {
        return this.application.name;
    }

    get containers() {
        const items = ['all', 'application'];
        this.application.libraries?.items?.forEach(item => items.push(item.library.name));
        return items;
    }

    #filterContainer = 'application';
    get filterContainer() {
        return this.#filterContainer;
    }

    set filterContainer(value) {
        if (value === this.#filterContainer) return;
        this.#filterContainer = value;
        this.triggerEvent();
    }

    _filterBundle = 'all';
    get filterBundle() {
        return this._filterBundle;
    }

    set filterBundle(value) {
        if (value === this._filterBundle) return;
        this._filterBundle = value;
        this.triggerEvent();
    }

    _filterText = '';
    get filterText() {
        return this._filterText;
    }

    set filterText(value) {
        if (value === this._filterText) return;
        this._filterText = value;
        this.triggerEvent();
    }

    /**
     * Return the items of the application checking if it's necessary apply a filter.
     * @returns {*}
     */
    get items() {
        if (this.filterBundle || this.filterText || this.filterContainer) {
            return this._filterItems()
        }

        return this.modules.elements;
    }

    get modules() {
        return this.application.am;
    }

    get am() {
        return this.application.am;
    }

    get deployment() {
        return this.application.deployment;
    }

    _backend = {};
    get backend() {
        return this._backend;
    }

    _libraries = [];
    get libraries() {
        if (!this.application?.libraries?.fetched) return this._libraries;
        return this.application.libraries.items;
    }

    get static() {
        return this._static;
    }

    #template = {};
    get template() {
        return this.#template;
    }

    get errors() {
        return this.application.errors;
    }

    get warnings() {
        return this.application.warnings;
    }

    #modulesTree;
    get modulesTree() {
        return this.#modulesTree;
    }

    /**
     *
     */
    #moduleManager;
    get moduleManager() {
        return this.#moduleManager;
    }

    #favorites;
    get favorites() {
        return this.#favorites;
    }

    /**
     *
     * @private
     */
    #element;
    get element() {
        return this.#element;
    }

    get found() {
        return this.application.found;
    }

    #ready = undefined;
    get ready() {

        if (!this.application.found && !this.application.fetching) {
            console.warn(`The application ${this.application.id} was not found`);
            return true;
        }
        return this.application.landed;
    }

    /**
     *
     * @param {String} id Id of the application
     * @param {String} moduleId Id of the module to open into workspace.
     * @param {string} element Represents the element of the application to wait to be ready
     * could by one of the next values
     *  - template
     *  - module
     *  - favorites
     *  - statics
     *  - config
     */
    constructor(id, moduleId, element) {
        super();

        this.#element = element;

        this.application = new Application({identifier: {id: parseInt(id)}, tree: SPECS.tree});
        this.application.bind('change', this.checkLoaded);
        this.application.bind('change', this.validateErrors);
        this.application.bind('change', this.triggerEvent);
        this.application.fetch();

        this.#moduleManager = new ModuleManager(this, moduleId);

        this.#favorites = FavoritesFactory.get(this.application.id, this);
        this.#favorites.bind('change', this.triggerEvent);
    }

    checkLoaded = () => {
        if (!this.application.tree.landed) return;
        this.application.unbind('change', this.checkLoaded);

        this.#processModules();
        this.#processStatic();
        this.#processTemplate();
        this.triggerEvent();
    }

    #processModules() {
        const items = this.itemsByContainer('application').map(module => module);

        this.#modulesTree = TreeFactory.get('project', {
            id: this.application.id,
            project: this,
            object: this.application.am,
            listener: () => {
                const items = this.itemsByContainer('application').map(module => module);
                // console.log(0.1, this.am.tree.landed, this.items.length, items.length, this.#modulesTree.elements.length)
                if (!this.items || !this.am.tree.landed) return;
                if (this.items.length === this.#modulesTree.elements.length) return;
                // console.log(0.2, items);
                // items.forEach(item => console.log(0.21, item.name, item.module?.pathname, item.id, item.module?.name));
                this.#modulesTree.setElements(items);
            },
            items: items
        });

    }

    #processStatic() {
        this._static = TreeFactory.get('static', {
            project: this,
            object: this.application.static,
            items: this.application.static.items
        });

    }

    #processTemplate() {
        //TODO: @julio TREE
        const {template: {application, processors, global}} = this.application;
        this.#template.application = TreeFactory.get('template', {
            project: this,
            object: application,
            items: application.sources.items
        });
        this.#template.global = TreeFactory.get('template', {
            project: this,
            object: global,
            items: global.sources.items
        });
        this.#template.processors = new Map();

        processors.forEach(processor => {

            if (!processor.path) return;
            const tree = TreeFactory.get('template', {
                project: this,
                object: processor,
                id: this.application.id,
                items: processor.sources.items,
                module: this.#template,
                bundle: this.#template
            });
            this.#template.processors.set(processor.processor, tree);
        });
    }

    clean() {
        this.application?.am.clean();
    }

    _filterItems() {
        const specs = {};
        if (!this.am) return [];
        specs.container = this.filterContainer ? this.#getContainerId(this.filterContainer) : 'application';
        if (this.filterText) specs.text = this.filterText;
        if (this.filterBundle) specs.bundle = this.filterBundle;
        return this.am.getItems(specs);
    }

    itemsByContainer(container) {
        return this.application.am.getItems({container: this.#getContainerId(container)});
    }

    #getContainerId(container) {
        if (['application', 'all'].includes(container)) return container;
        const library = this.application.libraries.items.find(library => library.library?.name === container);
        if (!library) return container;

        return `${library.id}/`;
    }

    getItems(filter) {
        this.#filterContainer = filter;
        return this._filterItems();
    }

    validateErrors = () => {
        if (!this.application.errors) return;
        const specs = {id: this.application.id, application: this.application};
        // DSNotifications.register(this.application.errors, specs);
    }

}
