import {Events} from "@beyond-js/kernel/core/ts";

export /*bundle*/
const DSBoards = new (class extends Events {
    #items: Map<string, object> = new Map();
    get items() {
        return this.#items;
    }

    add(identifier: string, specs: object) {
        this.items.set(identifier, specs);
        this.trigger('board.added');
    }
})();
