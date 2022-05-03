/**
 * Custom collection
 */

export /*bundle*/
class Collection<V> {
    #map: Map<string, V>;
    get map() {
        return this.#map;
    }

    get entries() {
        return this.#map.entries();
    }

    get keys() {
        return this.#map.keys();
    }

    get values() {
        return this.#map.values();
    }

    get size() {
        return this.#map.size;
    }

    has = (key: string) => this.#map.has(key);
    get = (key: string) => this.#map.get(key);
    forEach = (callback: (value: V, key: string, map: Map<string, V>) => void) => this.#map.forEach(callback);

    bind = (child: any) => {
        child[Symbol.iterator] = () => this.#map[Symbol.iterator]();
        Object.defineProperty(child, 'entries', {'get': () => this.#map.entries()});
        Object.defineProperty(child, 'keys', {'get': () => this.#map.keys()});
        Object.defineProperty(child, 'values', {'get': () => this.#map.values()});
        Object.defineProperty(child, 'size', {'get': () => this.#map.size});

        child.has = (key: string) => this.#map.has(key);
        child.get = (key: string) => this.#map.get(key);
        child.forEach = (callback: (value: V, key: string, map: Map<string, V>) => void) =>
            this.#map.forEach(callback);
    };

    /**
     * Constructor
     * @param {any} child The child instance
     * @param {any[]} entries The initial entries of the collection
     */
    constructor(child: any, entries?: [string, V][]) {
        entries = entries && !(entries instanceof Array) ? Object.entries(entries) : entries;
        this.#map = new Map(entries);

        child && this.bind(child);
    }

    set = (key: string, value: V): Map<string, V> => this.#map.set(key, value);
    delete = (key: string): boolean => this.#map.delete(key);
    replace = (map: Map<string, V>) => this.#map = map;
    clean = (): Map<string, V> => this.#map = new Map;
}

(<any>globalThis).Collection = Collection;
