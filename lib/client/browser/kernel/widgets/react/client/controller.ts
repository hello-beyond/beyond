import * as React from "react";
import * as ReactDOM from "react-dom";
import {retargetEvents} from "./retarget-events";
import {BeyondWidgetController} from '@beyond-js/kernel/core/ts';

export /*bundle*/
abstract class ReactWidgetController extends BeyondWidgetController {
    _mount(props: any) {
        const method = this.hydratable ? 'hydrate' : 'render';

        // Render the widget
        try {
            ReactDOM[method](React.createElement(this.Widget, props), this.body);
        } catch (exc) {
            console.log(`Error rendering widget "${this.bundle.id}":`);
            console.log(exc.stack);
        }
    }

    mount() {
        this._mount({
            component: this.component,
            store: this.store
        });
    }

    unmount() {
        ReactDOM.unmountComponentAtNode(this.body);
    }

    async initialise() {
        this.component.localName === 'main-layout' && retargetEvents(this.component.shadowRoot);
        await super.initialise();
    }
}
