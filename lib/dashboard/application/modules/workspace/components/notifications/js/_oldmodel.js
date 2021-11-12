export const OLDDSNotifications = new (class extends ReactiveModel {
    get total() {
        return this._items.size;
    }

    /**
     * mapa con todas las notificaciones
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
     * notificador = Aplicacion, Modulo, Bundle, Processor, o Diagnostic de un Procesador
     * @type {Set<any>}
     * @private
     */
    _identifiers = new Set();
    get identifiers() {
        return this._identifiers;
    }

    _add(notification, specs) {
        if (this._items.has(notification.id)) return;

        const item = new NotificationModel(notification, specs);
        this._items.set(item.id, item);
    }

    _delete(id) {
        if (!this._items.has(id)) return;
        this._items.delete(id);
    }

    _group(items) {

    }

    _update(notifications, specs) {
        console.trace('_update', notifications.length, specs, specs.module?.id)

        const id = specs.module?.id ?? specs.application.id;

        if (!this._recent.has(id)) {
            const recent = new Set();
            console.log('update not exist on recent', notifications.length)

            if (!notifications.length) {
                console.error('no hay notificaciones por agregar', notifications, specs, id)
                return;
            }

            if (notifications.length > 1) {
                const params = {
                    id: id,
                    type: `group-${id}`,
                    total: notifications.length,
                    message: `Errors on module ${specs.module.name}`
                }
                console.log(1, 'add group', id, params.id)
                recent.add(params.id) && this._add(params, specs)
            }
            else {
                console.log(1, 'add single', id, notifications[0].id)
                recent.add(notifications[0].id) && this._add(notifications[0], specs);
            }
            // notifications.forEach(item => {
            //     console.log('add', id, item.id)
            //     recent.add(item.id) && this._add(item, appId)
            // });

            recent.size && this._recent.set(id, recent);
            return;
        }

        const recent = this._recent.get(id);
        const ids = notifications.map(item => item.id);
        console.warn('recent before', recent, ids)

        //Removemos los recientes que no vengan en las notificaciones nuevas
        recent.forEach(item => {
            if (ids.includes(item)) return;
            recent.delete(item) && this._delete(item);
        });

        //Agregamos a los recientes las notificaciones nuevas
        ids.forEach(item => !recent.has(item) && recent.add(item));

        console.warn('recent after', recent, ids)
        if (!notifications.length) {
            console.error('no hay notificaciones por actualizar', notifications, specs, id)
            return;
        }

        if (ids.length > 1) {
            const item = this.items.get(id);
            item.total = recent.size;
            this.items.set(id, item);
            console.log(2, 'add group', id, notifications[0].id)
            return;
        }
        else {
            console.log(2, 'add single', id, notifications[0])
            this._add(notifications[0], specs)
        }

        //Actualizamos el mapa de recientes
        this._recent.set(id, recent);
        return;

        //Actualizamos los items de notificaciones que esten en recientes
        const keys = [...recent.keys()];
        const items = notifications.filter(item => keys.includes(item.id));
        console.log('items', items, specs)


        // if (!items.length) {
        //     console.warn('items.length', items.length);
        //     return;
        // }
        //
        // if (this.items.has(id)) {
        //     const item = this.items.get(id);
        //     item.set(item.total + items.length);
        //     return;
        // }
        // if (items.length > 1) {
        //     const specs = {
        //         id: id,
        //         type: `group-${id}`,
        //         total: items.length,
        //         message: `Errors on module ${specs.module.name}`
        //     }
        //     console.log(2, 'add group', id, specs.id)
        //     recent.add(id) && this._add(specs, specs.module)
        // }
        // else {
        //     console.log(2, 'add single', id, items[0].id)
        //     recent.add(items[0].id) && this._add(items[0], specs.module)
        // }
        // notifications.forEach(item => keys.includes(item.id) && this._add(item, specs.module));
    }

    register(notifications, specs) {
        window.notifications = this;
        const id = specs.module?.id ?? specs.applicationId;

        //No hay notificaciones, limpiamos los mapas
        if (!notifications || (notifications instanceof Array && !notifications.length)) {
            if (!this._recent.has(id)) return;

            const toDelete = this._recent.get(id);

            console.error('Clean', id, toDelete)

            toDelete.forEach(item => this._delete(item));
            this._recent.delete(id);
            this.triggerEvent();
            return;
        }

        //Notificaciones Generales
        if (notifications instanceof Array) {
            this._update(notifications, specs);
            this.triggerEvent();
            return;
        }

        /**
         * Notificaciones de tipo Diagnostics
         * general: []
         * files, overwrites, dependencies: Map()
         */
        const {general, files, overwrites, dependencies} = notifications;
        this._update(general, specs);
        files.forEach((entries, key) => this._update(entries, specs));
        overwrites.forEach((entries, key) => this._update(entries, specs));
        dependencies.forEach((entries, key) => this._update(entries, specs));
        this.triggerEvent();
    }
})();