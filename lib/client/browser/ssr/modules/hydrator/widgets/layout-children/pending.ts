import type {BeyondLayoutChildren} from "./index";

/**
 * Pending instances waiting for the core/routing and beyond-layout-children renderer objects be loaded
 */
export const pending = class {
    static #hydrated = false;
    static #instances: Set<BeyondLayoutChildren> = new Set();

    static register(instance: BeyondLayoutChildren) {
        if (!instance.shadowRoot) throw new Error(`shadowRoot on instance was expected`);
        if (this.#hydrated) throw new Error('Application is hydrated, no pending elements should be registered');

        this.#instances.add(instance);
    }

    static hydrate() {
        this.#hydrated = true;
        this.#instances.forEach(instance => instance.hydrate());
    }
}
