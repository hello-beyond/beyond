import {instances as bundles} from '@beyond-js/kernel/bundle/ts';
import {Events} from '@beyond-js/kernel/core/ts';
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
            if (id !== this.#bundle && id.split('/').pop() === 'widget') return;
            const bundle = bundles.get(id);

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
