class WorkspaceAside extends ReactiveModel {

    #preaside;
    get preaside() {
        return this.#preaside;
    }

    #panel;
    get panel() {
        return this.#panel;
    }

    #workspace;
    get workspace() {
        return this.#workspace;
    }

    constructor(parent) {
        super();
        this.#workspace = parent;
        this.#workspace.bind('change', this.#binder)
    }

    #binder = () => {
        this.workspace.active ? this.addApplicationItems() : this.removeApplicationItems();
    }

    removeApplicationItems() {
        DSPreAside.remove(['application', 'module', 'favorites', 'add', 'template', 'statics', 'settings']);
    };

    addApplicationItems() {
        DSPreAside.addItems('top', {
            application: {
                action: (name) => {
                    this.setActive(name);
                    // this.workspace.openBoard(name);
                }, icon: 'project', title: 'Aplicación', tippy: {placement: 'right'}
            },
            module: {
                action: this.setActive,
                icon: 'folder',
                title: 'Modulo',
                tippy: {placement: 'right'}
            },
            favorites: {
                action: this.setActive,
                icon: 'favorite',
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
                    // const querystring = new URLSearchParams({...params, panel: name}).toString();
                    // const uri = `/application/${application.id}?${querystring}`;
                    // window.routing.replaceState({}, '', uri);
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
