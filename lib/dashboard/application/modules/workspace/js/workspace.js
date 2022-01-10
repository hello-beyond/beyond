export const Workspace = class extends ReactiveModel {
    _contextMenu;
    get contextMenu() {
        return this._contextMenu;
    }

    get types() {
        return [
            {}
        ]
    }

    _panels;
    get panels() {
        return this._panels;
    }

    _uploader;
    get uploader() {
        return this._uploader;
    }

    #username;
    get username() {
        return this.#username;
    }

    _active;
    get active() {
        return this._active;
    }

    set active(value) {
        if (value === this.active) return;
        this._active = value;
        this.triggerEvent();
    }

    get application() {
        return this._active;
    }

    #validated;
    get validated() {
        return this.#validated;
    }

    #hasPermission;
    get hasPermission() {
        return this.#hasPermission;
    }

    _applications;
    get applications() {
        return this._applications;
    }

    #firstTime = true;

    get ready() {
        if (this.#dsmodel?.ready
            && this.#firstTime && this.applications.tree.landed) this.#firstTime = false;
        const isReady = this.#validated && (!this.#firstTime || this.applications.tree.landed);
        return isReady && module.texts.ready;
    }

    get texts() {
        return module.texts?.value;
    }

    #state = {};
    get state() {
        return this.#state;
    }

    #dashboard;
    get dashboard() {
        return this.#dashboard;
    }

    #dsmodel;
    get dsmodel() {
        return this.#dsmodel;
    }

    #aside;
    get aside() {
        return this.#aside;
    }

    constructor(board, specs = {}) {
        super();
        this._applications = new Applications(TREE.APPS);
        this.#dashboard = new Dashboard();
        this.applications.bind('change', this.triggerEvent);

        module.texts.bind('change', this.triggerEvent);
        this._applications.fetch();
        console.log(0.1, this.applications)
        this.#dsmodel = DSModel;
        this.#load(board, specs);

    }

    async #load(board, specs) {

        await this.#dsmodel.initialise();
        this._contextMenu = new ContextMenu();
        this._panels = new PanelsManager(DSBoards, this);
        this._uploader = new UploaderController(this);
        this._panels.add(board, specs);
        this.#aside = new WorkspaceAside(this);

        this.openBoard = this.openBoard.bind(this);
        //we validate the userCode
        this.#validate(localStorage.getItem('ds.user.code'));

    }

    setState = state => {
        this.#state = Object.assign(this.#state, state);
        this.triggerEvent();
    }

    /**
     * Opens a board into the active panel
     * @param name
     * @param specs
     */
    openBoard(name, specs) {

        this._panels.active.add(name, specs);

    }

    openApp = async id => {
        this.active = await this.getApplication(id);
        const specs = {id, name: `app.${id}`}
        this.openBoard('application', specs);
    }

    openNavigator(id, url) {
        this.openBoard('navigator', {applicationId: id, url});
    }

    getApplication(id, moduleId, element) {
        if ([undefined, NaN].includes(id)) return;
        return applicationsFactory.get(parseInt(id), moduleId, element);
    }

    /**
     *
     * @param specs
     */
    openFile = specs => {
        /**
         * Must be the PLM application object.
         */
        specs.application = this.application.application;
        this.panels.active.openFile(specs)
    }

    register = async (name, code) => {
        const response = await this.#validate(code);
        if (response) {
            this.#username = name;
            localStorage.setItem('ds.user.name', name);
            localStorage.setItem('ds.user.code', code);
        }
        window.setTimeout(() => this.triggerEvent(), 1000);

        return response;

    }

    async #validate(code) {

        const response = await this.#dashboard.validate(code);
        this.#validated = true;
        this.#hasPermission = response;
        return response;
    }
}


