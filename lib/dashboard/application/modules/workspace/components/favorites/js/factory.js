/**
 * Beyond manages favorites by application
 *
 * The Factory objects generates a new Factory Model for each application instanced
 */
class Factory extends ReactiveModel {
    _items = new Map();
    get items() {
        return this._items;
    }

    get(id, application) {
        if (this.items.has(id)) return this.items.get(id);
        const item = new FavoritesModel(application);
        this.items.set(id, item);
        return item;
    }
};

export const FavoritesFactory = new Factory();
