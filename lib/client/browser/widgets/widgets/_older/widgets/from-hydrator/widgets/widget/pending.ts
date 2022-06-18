import type {Widget} from "./index";

/**
 * Pending instances waiting for the core/routing and beyond-layout-children renderer objects be loaded
 */
export const pending = class {
    static #hydrated = false;
    static #instances: Set<Widget> = new Set();

    /**
     * Required by beyond-layout-children to get its container
     *
     * @type {Map<Node, Widget>}
     * @private
     */
    static #roots: Map<Node, Widget> = new Map();
    static get roots() {
        return this.#roots;
    }

    static register(instance: Widget) {
        if (!instance.shadowRoot) throw new Error(`shadowRoot on instance was expected`);
        if (this.#hydrated) throw new Error('Application is hydrated, no pending elements should be registered');

        this.#instances.add(instance);
        this.#roots.set(instance.shadowRoot, instance);
    }

    static hydrate() {
        this.#hydrated = true;
        this.#instances.forEach(instance => instance.hydrate());
    }
}
