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

    _editor;
    get editor() {
        return this._editor;
    }

    _total = 1;
    get total() {
        return this._total;
    }

    _items = new Map();
    get items() {
        return this._items;
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

    /**
     *
     * @param boards
     * @param workspace
     */
    constructor(boards, workspace) {
        super();

        this.bind('editor', this.triggerEvent);
        this._boards = boards;
        this._workspace = workspace;
        window._p = this;

    }

    add(name, specs = {}) {
        const id = this.items.size + 1;
        const active = this.active;
        const newPanel = new Panel(this, id);
        this._active = newPanel;
        newPanel.bind('change', this.triggerEvent);
        this._items.set(id, newPanel);
        if (name) {
            newPanel.add(name, specs);
            this.triggerEvent();
            return;
        }
        //if the method is called without params then the new
        //editor must be have opened the current active tab

        const tab = active.tabs.get(active.activeItem);

        const {source, path, processor} = tab;
        const {application} = this.workspace;
        tab.type === 'editor'
            ? newPanel.openFile({
                source, path, processor, application
            })
            : newPanel.add(tab.path, tab.specs);

        this.triggerEvent();
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
        this._items = newOrder;

        this.triggerEvent();
    }

}
