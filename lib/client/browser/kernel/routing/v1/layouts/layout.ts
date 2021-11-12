import type {PageInstanceData} from "../pages/data";
import type {LayoutConfig} from "../config/layouts";
import {Child} from "./child";
import {Events} from "@beyond-js/kernel/core/ts";

export /*bundle*/
class Layout extends Events {
    // The active child in the layout
    #active: Child;

    // Property #parent is undefined only if it is the main layout
    #parent: Layout;

    #children: Map<string, Child> = new Map();
    get children() {
        return this.#children;
    }

    constructor(parent?: Layout) {
        super();
        this.#parent = parent;
    }

    /**
     * Selects a page
     *
     * @param {PageInstanceData} page The page being selected (navigated)
     */
    select(page: PageInstanceData) {
        let changed = false;
        const getChild = (parent: LayoutConfig | PageInstanceData): Child => {
            if (this.#children.has(parent.id)) return this.#children.get(parent.id);

            const child = new Child(parent);
            this.#children.set(parent.id, child);
            changed = true;
            return child;
        }

        let child: Child;
        if (page.parents && page.parents.length) {
            const parent = page.parents.shift();
            child = getChild(parent);
            child.layout.select(page, page.parents);
        } else {
            child = getChild(page);
            this.children.set(page.id, child);
        }

        if (this.#active !== child) {
            this.#active?.hide();
            child.show();
            this.#active = child;
            changed = true;
        }

        changed && this.trigger('change');
    }
}
