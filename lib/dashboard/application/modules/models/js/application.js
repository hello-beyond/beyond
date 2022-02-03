class ApplicationModel extends ReactiveModel {
    _bundles = ['layout', 'page', 'code', 'all', 'widget'];
    get bundles() {
        return this._bundles;
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

    get containers() {
        const items = ['all', 'application'];
        this.application.libraries?.items?.forEach(item => items.push(item.library.name));
        return items;
    }

    /**
     * Array with the
     * @private
     */
    _containersIds;
    get containersIds() {

    }

    _container = undefined;
    get container() {
        return this._container;
    }

    _filterContainer = 'application';
    get filterContainer() {
        return this._filterContainer;
    }

    set filterContainer(value) {
        if (value === this._filterContainer) return;
        this._filterContainer = value;
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

    _modulesTree;
    get modulesTree() {
        return this._modulesTree;
    }

    _moduleManager;
    get moduleManager() {
        return this._moduleManager;
    }

    _favorites;
    get favorites() {
        return this._favorites;
    }

    _element;
    get element() {
        return this._element;
    }

    get found() {
        return this.application.found;
    }

    _ready = undefined;
    get ready() {

        if (!this.application.found && !this.application.fetching) {
            console.warn(`The application ${this.application.id} was not found`);
            return true;
        }
        if (this.element === 'template') {
            return this.application?.template?.landed;
        }
        if (this.element === 'module') {
            return this.moduleManager?.active?.ready;
        }
        if (this.element === 'favorites') {
            return this.application?.am?.tree.landed && this.favorites?.ready;
        }

        if ([undefined, 'favorites', '', 'application'].includes(this.element)) {
            return this.application?.am?.tree.landed;
        }

        if (['statics'].includes(this.element)) {
            return this.application.static?.tree.landed;
        }
        // TODO: @julio no se esta validando este tab en el ready del modelo
        return this.application.tree.landed;
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

        this._element = element;

        this.application = new Application({identifier: {id: parseInt(id)}, tree: SPECS.tree});
        this.application.bind('change', this.checkLoaded);
        this.application.bind('change', this.validateErrors);
        this.application.bind('change', this.triggerEvent);
        this.application.fetch();

        this._moduleManager = new ModuleManager(this, moduleId);
        this._favorites = FavoritesFactory.get(this.application.id, this);
        this._favorites.bind('change', this.triggerEvent);
    }

    checkLoaded = () => {
        if (!this.application.tree.landed) return;

        this._processModules();
        this._processStatic();
        this._processTemplate();
        this.triggerEvent();
        this.application.unbind('change', this.checkLoaded);

    }

    _processModules() {
        const items = this.itemsByContainer('application').map(module => module);
        this._modulesTree = TreeFactory.get('application', [this, this.application, items]);
    }

    _processStatic() {
        this._static = TreeFactory.get('static', [
            this.application,
            this.application.static,
            this.application.static.items
        ]);

    }

    _processTemplate() {
        //TODO: @julio TREE
        const {template: {application, processors, global}} = this.application;
        this.#template.application = TreeFactory.get('template', [this.application, application, application.sources.items]);
        this.#template.global = TreeFactory.get('template', [this.application, global, global.sources.items]);
        this.#template.processors = new Map();

        processors.forEach(processor => {

            if (!processor.path) return;
            const tree = TreeFactory.get('template', [
                this.application,
                processor,
                processor.sources.items,
                this.#template,
                this.#template
            ]);
            this.#template.processors.set(processor.processor, tree);
        });
    }

    clean() {
        this.application?.am.clean();
    }

    _filterItems() {
        const specs = {};
        if (!this.am) return [];
        specs.container = this.filterContainer ? this._getContainerId(this.filterContainer) : 'application';
        if (this.filterText) specs.text = this.filterText;
        if (this.filterBundle) specs.bundle = this.filterBundle;
        return this.am.getItems(specs);
    }

    itemsByContainer(container) {
        return this.application.am.getItems({container: this._getContainerId(container)});
    }

    _getContainerId(container) {
        if (['application', 'all'].includes(container)) return container;
        const library = this.application.libraries.items.find(library => library.library.name === container);
        if (!library) return container;

        return `${library.id}/`;
    }

    getItems(filter) {
        this._filterContainer = filter;
        return this._filterItems();
    }

    validateErrors = () => {
        if (!this.application.errors) return;
        const specs = {id: this.application.id, application: this.application};
        // DSNotifications.register(this.application.errors, specs);
    }

}
