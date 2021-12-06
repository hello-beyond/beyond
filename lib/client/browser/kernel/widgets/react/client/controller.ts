import * as React from "react";
import * as ReactDOM from "react-dom";
import {retargetEvents} from "./retarget-events";
import {BeyondWidgetController} from '@beyond-js/kernel/core/ts';

export /*bundle*/
class ReactWidgetController extends BeyondWidgetController {
    mount(Widget: any) {
        // Render the widget
        ReactDOM.render(React.createElement(Widget), this.body);
    }

    unmount() {
        ReactDOM.unmountComponentAtNode(this.body);
    }

    initialise() {
        retargetEvents(this.component.shadowRoot);
        super.initialise();
    }
}
