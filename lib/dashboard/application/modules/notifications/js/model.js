export const DSNotifications = new (class extends ReactiveModel {
    /**
     * Map con las notificaciones agrupadas para mostrar
     * los  keys son los ids de las notificaciones
     * @type {Map<any, any>}
     * @private
     */
    #notifications = new Map();
    get notifications() {
        return this.#notifications;
    }

    get ready() {
        return module?.texts?.ready;
    }

    get texts() {
        return module?.texts?.value;
    }

    #projects = new Map();
    get projects() {
        return this.#projects;
    }

    #modules = new Map();
    get modules() {
        return this.#modules;
    }

    #unread;
    get unread() {
        return this.#unread;
    }

    get items() {
        let items = [];
        this.#projects.forEach(app => {
            items = items.concat(app.items)
        });

        return items;
    }

    constructor() {
        super();
        module.texts.current.bind('change', this.triggerEvent);
        window.ns = this;
    }

    start(projects) {
        projects.forEach(app => {
            if (this.#projects.has(app.id)) return;
            const listener = new ApplicationListener(app);
            this.#projects.set(app.id, listener);
            listener.bind('change', this.triggerEvent);
        });
    }

    triggerError = () => {
        this.triggerEvent('new.notification');
    }
})();
