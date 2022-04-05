import * as React from "react";
import * as ReactDOM from "react-dom";
import {retargetEvents} from "./retarget-events";
import {BeyondWidgetController} from '@beyond-js/kernel/core/ts';

export /*bundle*/
abstract class ReactWidgetController extends BeyondWidgetController {
    _mount(props: any) {
        const method = this.hydratable ? 'hydrate' : 'render';

        // Render the widget
        ReactDOM[method](React.createElement(this.Widget, props), this.body);
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

    initialise() {
        this.component.localName === 'main-layout' && retargetEvents(this.component.shadowRoot);
        super.initialise();
    }
}
