import {instances as bundles} from '@beyond-js/kernel/bundle';
import {Events} from '@beyond-js/kernel/core';
import {styles as registry} from './registry';
import {V1Styles} from './v1';

export /*bundle*/
class DependenciesStyles extends Events {
    readonly #bundle: string;
    readonly #elements: Set<V1Styles>;
    get elements() {
        return this.#elements;
    }

    constructor(bundle: string) {
        super();
        this.#bundle = bundle;

        const change = () => this.trigger('change');

        this.#elements = new Set();
        const recursive = (id: string) => {
            if (!bundles.has(id)) {
                console.log(`Bundle id "${id}" not found. Try refreshing the page.\n` +
                    `If the problem still persist, delete the BeyondJS cache and try again.`);
                return;
            }
            const bundle = bundles.get(id);
            if (id !== this.#bundle && bundle.name === 'widget') return;

            // Check if the bundle has styles
            const styles = <V1Styles>registry.get(id);
            if (styles && styles.engine !== 'legacy') {
                this.#elements.add(styles);
                styles.on('change', change);
            }

            const {dependencies} = bundle.package();
            dependencies.forEach((dependency: string) => recursive(dependency));
        }
        recursive(this.#bundle);
    }
}
