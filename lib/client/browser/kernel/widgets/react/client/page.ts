import {routing, URI} from '@beyond-js/kernel/routing/ts';
import {ReactWidgetController} from "./controller";
import * as ReactDOM from "react-dom";
import * as React from "react";

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
        ReactDOM.render(React.createElement(Widget, {
            uri: this.uri,
            component: this.component
        }), this.body);
    }

    unmount() {
        ReactDOM.unmountComponentAtNode(this.body);
    }

    initialise() {
        const child = this.component.getAttribute('data-child-id');
        this.#uri = routing.manager.pages.find(child).uri;
        super.initialise();
    }
}
