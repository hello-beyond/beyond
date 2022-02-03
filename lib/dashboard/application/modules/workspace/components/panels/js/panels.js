/**
 * Manage the panels opened in the view
 *
 * A panel is a tab that can contains info content and editors tabs opened.
 */
export class PanelsManager extends ReactiveModel {
    _boards;
    get boards() {
        return this._boards;
    }

    _total = 1;
    get total() {
        return this._total;
    }

    #items = new Map();
    get items() {
        return this.#items;
    }

    _active;
    get active() {
        return this._active;
    }

    _workspace;
    get workspace() {
        return this._workspace;
    }

    set active(panel) {
        if (this._active?.id === panel?.id) return;
        this._active = panel;
        this.triggerEvent();
    }

    #ready;
    get ready() {
        return this.#ready;
    }

    /**
     *
     * @param boards
     * @param workspace
     * @param data
     */
    constructor(boards, workspace, data) {
        super();

        this.bind('editor', this.triggerEvent);
        this._boards = boards;
        this._workspace = workspace;
        this.#load(data);
    }

    async #load(data) {
        if (!data.items.size) {
            const panel = new Panel(this, 1);
            panel.add('applications');
            panel.bind('panel.updated', this.#triggerUpdate);
            this._active = panel;
            this.#items.set(1, panel);
            this.#triggerUpdate();
            this.triggerEvent();
            return;
        }
        data.items.forEach(item => {
            const panel = new Panel(this, item.id, item.tabs ?? []);

            const activeItem = item.tabs.find(item => item.id === item.active);
            if (activeItem) {
                panel.changeTab(activeItem);
            }
            this.#items.set(item.id, panel);
            this._active = !data.active || data.active === panel.id ? panel : undefined;
        });

        this.triggerEvent();
        this.#items.forEach(item => item.bind('panel.updated', this.#triggerUpdate));
    }

    #triggerUpdate = () => this.triggerEvent('panels.updated');
    getData = () => {
        const items = new Map();
        this.items.forEach(item => items.set(item.id, item.getData()));
        return {
            active: this._active.id,
            items: items
        }
    }

    add(name, specs = {}) {
        const id = this.items.size + 1;
        const active = this.active;
        const newPanel = new Panel(this, id);
        this._active = newPanel;

        newPanel.bind('change', this.triggerEvent);
        newPanel.bind('panel.updated', this.#triggerUpdate);

        this.#items.set(id, newPanel);
        if (name) {
            newPanel.add(name, specs);
            this.triggerEvent();
            return;
        }
        //if the method is called without params then the new
        //editor must be have opened the current active tab

        const tab = active.tabs.get(active.activeItem);

        tab.type === 'editor'
        ? newPanel.openFile(tab)
        : newPanel.add(tab.path, tab.specs);

        this.triggerEvent();
        this.#triggerUpdate();

    }

    /**
     * Remove an opened panel
     * @param id
     */
    closePanel(id) {

        if (this.items.size === 1) return;

        const keys = [...this.items.keys()];
        const pos = keys.indexOf(id);
        const active = pos === 0 ? keys[pos + 1] : keys[pos - 1];
        this._active = this.items.get(active);

        const newOrder = new Map();
        this.items.delete(id);
        [...this.items.values()].forEach((item, index) => {
            item.id = index;
            newOrder.set(index, item)
        });
        this.#items = newOrder;

        this.triggerEvent();
    }
}