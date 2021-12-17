import {routing, URI} from '@beyond-js/kernel/routing/ts';
import {ReactWidgetController} from "./controller";
import * as ReactDOM from "react-dom";
import * as React from "react";
import {retargetEvents} from "./retarget-events";

export /*bundle*/
class PageReactWidgetController extends ReactWidgetController {
    #uri: URI;
    get uri() {
        return this.#uri;
    }

    show() {
    }

    hide() {
    }

    mount(Widget: any) {
        // Render the widget
        ReactDOM.render(React.createElement(Widget, {uri: this.uri}), this.body);
    }

    unmount() {
        ReactDOM.unmountComponentAtNode(this.body);
    }

    initialise() {
        retargetEvents(this.component.shadowRoot);

        const child = this.component.getAttribute('data-child-id');
        this.#uri = routing.manager.pages.find(child).uri;

        super.initialise();
    }
}
