class WorkspaceAside extends ReactiveModel {

    #preaside;
    get preaside() {
        return this.#preaside;
    }

    #panel;
    get panel() {
        return this.#panel;
    }

    #projectItems;
    get projectItems() {
        return this.#projectItems;
    }

    #workspace;
    get workspace() {
        return this.#workspace;
    }

    constructor(parent) {
        super();
        this.#workspace = parent;
        this.#workspace.bind('change', this.#binder);

        this.#binder();
    }

    #binder = () => {
        if (!this.workspace.ready) return;
        if (!!this.workspace.active === this.#projectItems) return;
        this.workspace.active ? this.addProjectItems() : this.removeProjectItems();
    }

    removeProjectItems() {
        this.#projectItems = false;
        DSPreAside.remove(['application', 'module', 'favorites', 'add', 'template', 'statics',]);
    };

    addProjectItems() {
        this.#projectItems = true;
        DSPreAside.addItems('top', {
            application: {
                action: (name) => {
                    this.setActive(name);
                    // this.workspace.openBoard(name);
                }, icon: 'project', title: 'Aplicación', tippy: {placement: 'right'}
            },
            module: {
                action: this.setActive,
                icon: 'pinup',
                title: 'Modulo',
                tippy: {placement: 'right'}
            },
            favorites: {
                action: this.setActive,
                icon: 'bookmark',
                title: 'Favoritos',
                tippy: {placement: 'right'}
            }
        });
        DSPreAside.addItems('bottom', {
            add: {
                action: () => this.workspace.setState({addModule: true}),
                icon: 'add',
                title: 'Crear modulo',
                tippy: {placement: 'right'}
            },
            template: {action: this.setActive, icon: 'folder', title: 'Template', tippy: {placement: 'right'}},
            statics: {
                action: this.setActive,
                icon: 'photoSize',
                title: 'Archivos estaticos',
                tippy: {placement: 'right'}
            },
            settings: {
                action: (name, params) => {

                    this.workspace.openBoard(name, params);
                }, icon: 'setting', title: 'Configuración', tippy: {placement: 'right'}
            }
        });

        this.triggerEvent();
    }

    setActive = (item, params = {}) => {
        if (!this.workspace.active) {
            console.error('there is any application selected');
            return;
        }
        this.#panel = this.panel !== item ? item : undefined;
        this.triggerEvent();
    };

}
