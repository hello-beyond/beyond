import * as React from "react";
import * as ReactDOM from "react-dom";
import {beyond, BeyondWidgetController, Bundle} from "@beyond-js/kernel/core/ts";
import {retargetEvents} from "./retarget-events";

export /*bundle*/
class ReactWidgetController extends BeyondWidgetController {
    #styles;
    #hmrStylesChanged = styles => {
        const {shadowRoot} = this.component;
        const previous: Node = shadowRoot.querySelectorAll(`:scope > [bundle="${styles.id}"]`)[0];

        previous && shadowRoot.removeChild(previous);
        styles.css && shadowRoot.appendChild(styles.css);
    };

    #body: HTMLSpanElement;

    render() {
        this.#body && ReactDOM.unmountComponentAtNode(this.#body);
        this.#body?.remove();

        this.#body = document.createElement('span');
        this.component.shadowRoot.appendChild(this.#body);

        const {Widget} = this.bundle.package().exports.values;
        if (!Widget) {
            const message = `Widget "${this.name}" does not export a Widget class`;
            console.error(message);
            return;
        }

        // Render the widget
        ReactDOM.render(React.createElement(Widget), this.#body);
    }

    mount() {
        this.render();
        retargetEvents(this.component.shadowRoot);

        const recursive = (bundle: Bundle) => bundle.dependencies.forEach(resource => {
            if (!beyond.bundles.has(resource)) return;

            const dependency = beyond.bundles.get(resource);
            const {styles} = dependency;
            if (styles.dom || !styles.css) return recursive(dependency);

            this.component.shadowRoot.appendChild(styles.css);
            styles.on('change', this.#hmrStylesChanged);
            recursive(dependency);
        });

        recursive(this.bundle);

        // Append the global styles
        const global: HTMLLinkElement = document.createElement('link');
        const {baseUrl} = beyond;
        global.type = 'text/css';
        global.href = `${baseUrl}global.css`;
        global.rel = 'stylesheet';
        this.component.shadowRoot.appendChild(global);

        // Append styles and setup styles HMR
        this.#styles = this.bundle.styles;
        const {css} = this.#styles;
        css && this.component.shadowRoot.appendChild(css);
        this.#styles.on('change', this.#hmrStylesChanged);
    }
}
