export const DSNotifications = new (class extends ReactiveModel {
    get count() {
        return this._notifications.size;
    }

    /**
     * Map con las notificaciones agrupadas para mostrar
     * los  keys son los ids de las notificaciones
     * @type {Map<any, any>}
     * @private
     */
    _notifications = new Map();
    get notifications() {
        return this._notifications;
    }

    /**
     * Map con todas las notificaciones en detalle
     * los  keys son los ids de las notificaciones
     * @type {Map<any, any>}
     * @private
     */
    _items = new Map();
    get items() {
        return this._items;
    }

    /**
     * Mapa donde cada entrada es un Set con los ids de las notificaciones
     * Los keys van por ID de Aplicacion, Modulo, Bundle, Processor, o Diagnostic de un Procesador
     * @type {Map<any, any>}
     * @private
     */
    _recent = new Map();
    get recent() {
        return this._recent;
    }

    /**
     * Set con los ids de cada notificador activo
     * notificador = Aplicacion o Modulo
     * @type {Set<any>}
     * @private
     */
    _identifiers = new Set();
    get identifiers() {
        return this._identifiers;
    }

    get ready() {
        return module?.texts?.ready;
    }

    get texts() {
        return module?.texts?.value;
    }

    #unread;
    get unread() {
        return this.#unread;
    }

    constructor() {
        super();
        module.texts.bind('change', this.triggerEvent);
    }

    _add(notification, specs) {
        if (this._items.has(notification.id)) return;

        const item = new NotificationModel(notification, specs);
        this.items.set(item.id, item);
    }

    _delete(id) {
        if (!this._items.has(id)) return;
        this.items.delete(id);
    }

    _register(notifications, specs) {
        if (!notifications.length) return;

        const recent = new Set();
        notifications.forEach(notification => {
            this._add(notification, specs);//add to items
            recent.add(notification.id);// prepare to add on recent
        });
        this.recent.set(specs.id, recent);//add Id on recent

        const id = specs.module?.id ?? specs.application.id;
        this._identifiers.add(id);//add on identifiers
        this.setNotifications();
    }

    _update(notifications, specs) {
        const recent = this.recent.get(specs.id);
        const ids = notifications.map(item => item.id);

        //Removemos los recientes que no vengan en las notificaciones nuevas
        [...recent.keys()].forEach(item => {
            !ids.includes(item) && recent.delete(item) && this._delete(item);
        });

        /**
         * Agregamos a los recientes las notificaciones nuevas
         * Agregamos a las notificaciones las que vienen nuevas
         */
        notifications.forEach(item =>
            !recent.has(item.id) && recent.add(item.id) && this._add(item, specs)
        );

        this.recent.set(specs.id, recent);//Actualizamos el mapa de recientes

        const id = specs.module?.id ?? specs.application.id;
        this._identifiers.add(id);//add on identifiers
        this.setNotifications();
    }

    notify() {
        this.#unread = true;
        this.triggerEvent();
    }

    setNotifications() {
        this.notifications.clear();

        this.recent.forEach((recent, key) => {
            const iterator = recent.values().next().value;
            if (!iterator) {
                return;
            }

            const moduleId = key.split('//').slice(0, 3).join('//');
            if (this.notifications.has(moduleId)) {
                const get = this.notifications.get(moduleId);
                const params = {count: get.count + recent.size}
                this.notifications.set(moduleId, new NotificationModel({...get.getters(), ...params}))
                this.notify()
                return;
            }

            const item = this.items.get(iterator);
            if (recent.size === 1) {
                this.notifications.set(moduleId, item);
                this.notify()
                return;
            }

            const params = {
                id: item.module.id,
                count: recent.size,
                type: `group-${item.module.name}`,
                message: `Errors on module ${item.module.name}`
            };
            this.notifications.set(moduleId, new NotificationModel({...item.getters(), ...params}));
            this.notify()
        });
    }

    register(notifications, specs) {
        window.notifications = this;

        //No hay notificaciones, limpiamos los mapas
        if (!notifications || (notifications instanceof Array && !notifications.length)) {
            if (!this.recent.has(specs.id)) return;
            const toDelete = this.recent.get(specs.id);
            toDelete.forEach(item => this._delete(item));
            this.recent.delete(specs.id);

            const id = specs.module?.id ?? specs.application.id;
            this._identifiers.delete(id);//remove on identifiers
            this.setNotifications();
            this.triggerEvent();
            return;
        }

        //Notificaciones Generales
        if (notifications instanceof Array) {
            const method = !this.recent.has(specs.id) ? '_register' : '_update';
            this[method](notifications, specs);
            this.triggerEvent();
            return;
        }

        /**
         * Notificaciones de tipo Diagnostics
         * general: []
         * files, overwrites, dependencies: Map()
         */
        const {general, files, overwrites, dependencies} = notifications;
        const method = !this.recent.has(specs.id) ? '_register' : '_update';
        this[method](general, specs);

        files.forEach((entries, key) => this[method](entries, specs));
        overwrites.forEach((entries, key) => this[method](entries, specs));
        dependencies.forEach((entries, key) => this[method](entries, specs));

        this.triggerEvent();
    }
})();
