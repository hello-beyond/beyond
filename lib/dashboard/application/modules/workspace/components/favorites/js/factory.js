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

    get(id, project) {
        if (this.items.has(id)) return this.items.get(id);
        if (typeof id !== 'number') {
            console.trace(`The id specified is not valid:${id}`);
            return;
        }

        const item = new FavoritesModel(project);
        this.items.set(id, item);
        return item;
    }
};

export const FavoritesFactory = new Factory();
