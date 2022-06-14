export /*bundle*/
const DSPreAside = new (class extends Events {

    #bottom: Map<string, object> = new Map();
    get bottom() {
        return this.#bottom;
    }

    #top: Map<string, object> = new Map();
    get top() {
        return this.#top;
    }

    addToTop(identifier: string, specs: object) {

        this.#top.set(identifier, specs);
        this.trigger('item.added');
    }

    addItemsToTop(items: object) {

    }

    addToBottom(identifier: string, specs: object) {
        this.#bottom.set(identifier, specs);
        this.trigger('item.added');
    }

    addItems(position: string, items: object) {
        const nameFunction = position === 'bottom' ? 'addToBottom' : 'addToTop';

        Object.keys(items).forEach(name => {
            const data = items[name];
            this[nameFunction](name, data);
        });
        this.trigger('item.added');
    }
    remove = items => {

        items.forEach(item => {
            if (this.#bottom.has(item)) this.#bottom.delete(item);
            if (this.#top.has(item)) this.#top.delete(item);
        })
    }
});

