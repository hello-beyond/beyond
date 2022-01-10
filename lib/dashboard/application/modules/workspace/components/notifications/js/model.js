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

    /**
     * Map con todas las notificaciones en detalle
     * los  keys son los ids de las notificaciones
     * @type {Map<any, any>}
     * @private
     */
    #items = new Map();
    get items() {
        return this.#items;
    }

    get ready() {
        return module?.texts?.ready;
    }

    get texts() {
        return module?.texts?.value;
    }

    #applications = new Map();
    get applications() {
        return this.#applications;
    }

    #unread;
    get unread() {
        return this.#unread;
    }

    get items() {
        let items = [];
        this.#applications.forEach(app => {
            items = items.concat(app.items)
        });
        return items;
    }

    constructor() {
        super();
        module.texts.bind('change', this.triggerEvent);
    }

    start(applications) {

        applications.forEach(app => {
            if (this.#applications.has(app.id)) return;
            const listener = new ApplicationListener(app);
            this.#applications.set(app.id, listener);
            listener.bind('change', this.triggerEvent);
        })
    }

})();
