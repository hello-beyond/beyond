class Panel extends ReactiveModel {

    _activeItem;
    get activeItem() {
        return this._activeItem;
    }

    _boards;
    get boards() {
        return this._boards;
    }

    _editor;
    get editor() {
        return this._editor;
    }

    _id;
    get id() {
        return this._id;
    }

    set id(value) {
        if (this.id === value) return;
        this._id = value;
    }

    _name;
    get name() {
        return this._name;
    }

    /**
     * The panels manager
     * @private
     */
    _parent;
    get parent() {
        return this._parent;
    }

    _source;
    get source() {
        return this._source;
    }

    /**
     * Contains all the tabs opening in the panel
     * @type {Map<any, any>}
     * @private
     */
    _tabs = new Map();
    get tabs() {
        return this._tabs;
    }

    _type;
    get type() {
        return this._type;
    }

    constructor(parent, id) {
        super();
        this._id = id;
        this._parent = parent;
        this._boards = parent.boards;
    }

    /**
     *
     * @param type
     * @param processor
     * @param source
     * @param position
     * @param application
     * @param module
     */
    createEditor(type, processor, source, position, application, module) {

        if (!application) console.trace(10, application);
        const manager = getEditorManager(application);
        this._editor = manager.create({
            source,
            position,
            processor,
            type,
            application, // the PLM object of application, not the manager
            id: `editor-panel-${this.id}`,
            path: application.path,// TODO: @julio check origin of element
            module,

        })
        this.triggerEvent();
    }

    /**
     * Open a source in a new tab into a monaco editor instance
     *
     * @param path
     * @param source
     * @param processor
     * @param module
     * @param application
     * @param position
     * @param type
     */
    openFile({source, path, processor, application, module, position = {}, type}) {

        this._activeItem = path;

        !this.editor
            ? this.createEditor(type, processor, source, position, application, module)
            : this.editor.addFile(type, processor, source, true);

        if (type === 'dependency') {

            this.tabs.set(path, {sourceType: type, label: source.label, source: source, id: path, type: 'editor', path})
            this.triggerEvent();
            return;
        }

        /**
         * Label is used to show the user, id is used to identify de tab selected
         */
        this.tabs.set(path, {label: source.filename, id: source.filename, type: 'editor', source, path});
        this.triggerEvent();
    }

    /**
     * Adds tabs that doesn't needs the editor instance
     *
     * The tab must exists in the boards object.
     * @param name
     * @param specs
     */
    async add(name, specs = {}) {

        const control = this.boards.items.get(name);
        if (!control) {
            throw Error(`The board required does not exists: ${name}`);
        }
        const label = specs.label ? specs.label : control.label;
        const labelName = specs.label ? `${name}.${label.toLowerCase().replace(/ /g, '-')}` : undefined;
        const tabName = specs.name ? specs.name : (specs.moduleId ? specs.moduleId : (specs.label ? labelName : name));
        this.tabs.set(tabName, {
            label: label,
            type: 'content',
            id: tabName,
            path: name,
            control: control.control, specs
        });
        this._activeItem = tabName;
        this.triggerEvent();
    }

    setActive() {
        this.parent.active = this;
    }

    setTabName(id, name) {
        const data = this.tabs.get(id);
        if (!data) return;
        data.label = name;
        this.tabs.set(id, data);
        this.triggerEvent(`tab.change.${id}`);
    }

    changeTab(tab) {
        if (!this.tabs.has(tab.id)) return;

        if (tab.type === 'editor') {
            this.editor.setSource(tab.sourceType ?? 'source', tab.source)
        }
        this._source = tab._source;
        this._activeItem = tab.id;
        this.triggerEvent();
    }

    closeTab(tab) {
        if (!this.tabs.has(tab.id)) return;
        const keys = [...this.tabs.keys()];
        if (keys.length === 1) {
            if (this.editor) this.editor.instance.dispose();
            this.parent.closePanel(this.id);
            return;
        }
        const pos = keys.indexOf(tab.id);
        // if the tab to be closed is the first tab, then the next tab
        // may be the active tab, if the tab to be closed is another tab, then
        // the active tab will be the previous tab.
        this._activeItem = pos === 0 ? keys[pos + 1] : keys[pos - 1];
        this.tabs.delete(tab.id);
        this.triggerEvent();
    }

}
