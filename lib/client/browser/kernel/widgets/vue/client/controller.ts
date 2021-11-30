import {beyond, BeyondWidgetController} from "@beyond-js/kernel/core/ts";

export /*bundle*/
class VueWidgetController extends BeyondWidgetController {
    #styles;
    #hmrStylesChanged = styles => {
        const {shadowRoot} = this.component;
        const previous: Node = shadowRoot.querySelectorAll(`:scope > [bundle="${styles.id}"]`)[0];

        previous && shadowRoot.removeChild(previous);
        styles.css && shadowRoot.appendChild(styles.css);
    };

    render() {

    }

    mount() {
        this.render();

        this.bundle.dependencies.forEach(resource => {
            if (!beyond.bundles.has(resource)) return;

            const dependency = beyond.bundles.get(resource);
            const {styles} = dependency;
            if (styles.dom || !styles.css) return;

            this.component.shadowRoot.appendChild(styles.css);
            styles.on('change', this.#hmrStylesChanged);
        });

        // Append styles and setup styles HMR
        this.#styles = this.bundle.styles;
        const {css} = this.#styles;
        css && this.component.shadowRoot.appendChild(css);
        this.#styles.on('change', this.#hmrStylesChanged);
    }
}
