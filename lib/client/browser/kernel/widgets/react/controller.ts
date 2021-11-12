import * as React from "react";
import * as ReactDOM from "react-dom";
import {BeyondWidgetController} from "@beyond-js/kernel/core/ts";
import {retargetEvents} from "./retarget-events";

export /*bundle*/
class ReactWidgetController extends BeyondWidgetController {
    #styles;
    #css: HTMLStyleElement;
    #hmrStylesChanged = () => {
        this.component.shadowRoot.removeChild(this.#css);
        this.#css = this.#styles.css;
        this.component.shadowRoot.appendChild(this.#css);
    };

    #body: HTMLDivElement;

    render() {
        this.#body && ReactDOM.unmountComponentAtNode(this.#body);
        this.#body?.remove();

        this.#body = document.createElement('div');
        this.component.shadowRoot.appendChild(this.#body);

        const {Widget} = this.bundle.package().exports.values;
        if (!Widget) {
            const message = `Widget "${this.component.localName}" does not export a Widget class`;
            console.error(message);
            return;
        }

        // Render the widget
        ReactDOM.render(React.createElement(Widget), this.#body);
    }

    mount() {
        this.render();
        retargetEvents(this.component.shadowRoot);

        // Append styles and setup styles HMR
        this.#styles = this.bundle.styles;
        this.#css = this.#styles.css;
        this.#css && this.component.shadowRoot.appendChild(this.#css);
        this.#styles.on('change', this.#hmrStylesChanged);
    }
}
