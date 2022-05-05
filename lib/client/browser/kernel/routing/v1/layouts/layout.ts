import type {Layouts} from "./layouts";
import type {PageInstanceData} from "../pages/data";
import type {LayoutConfig} from "../config/layouts/layout";
import {Events} from "@beyond-js/kernel/core/ts";

let id = 0;

type LayoutChild = Layout | PageInstanceData;

export /*bundle*/
class Layout extends Events {
    get is() {
        return 'layout';
    }

    readonly #layouts: Layouts;

    readonly #element: string;
    get element() {
        return this.#element;
    }

    readonly #id: number;
    get id(): string {
        return `${this.#element}:${this.#id}`;
    }

    // The active child in the layout
    #active: LayoutChild;
    get active() {
        return this.#active;
    }

    // Property #parent is undefined only if it is the main layout
    #parent: Layout;

    // The layouts and pages that are contained in the current layout
    readonly #children: Map<string, LayoutChild> = new Map();
    get children() {
        return this.#children;
    }

    /**
     * Layout constructor
     *
     * @param {Layouts} layouts The layouts registry
     * @param {string} element The element name of the widget. Undefined if the project does not set a layout
     * and the index.html has a <beyond-layout-children/> as its main layout container
     * @param {Layout} parent The parent layout. Undefined if it is the main layout
     */
    constructor(layouts: Layouts, element?: string, parent?: Layout) {
        super();

        this.#layouts = layouts;
        this.#element = element ? element : 'main';
        this.#id = ++id;
        this.#parent = parent;
    }

    /**
     * Selects a page
     *
     * @param {PageInstanceData} page The page being selected (navigated)
     * @param {LayoutConfig[]} descending The descending layouts
     */
    select(page: PageInstanceData, descending: LayoutConfig[]) {
        if (descending.length && descending[0].element === this.#element) {
            console.log(`Invalid layout configuration. Layout element "${this.#element}" is already created`);
            return;
        }

        const child: LayoutChild = (() => {
            if (!descending.length) return page;

            const {element} = descending[0];
            let layout: Layout = <Layout>[...this.#children.values()].find(child => child.element === element);
            if (!layout) {
                layout = new Layout(this.#layouts, element, this);
                this.#layouts.register(layout);
            }
            return layout;
        })();

        this.#children.set(child.id, child);

        const changed = this.#active !== child;
        this.#active = child;

        descending.shift();
        child.is === 'layout' && (child as Layout).select(page, descending);
        changed && this.trigger('change');
    }
}
