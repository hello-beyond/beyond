import {routing, URI} from '@beyond-js/kernel/routing/ts';
import {ReactWidgetController} from "./controller";
import * as ReactDOM from "react-dom";
import * as React from "react";

export /*bundle*/
abstract class PageReactWidgetController extends ReactWidgetController {
    #uri: URI;
    get uri() {
        return this.#uri;
    }

    show() {
    }

    hide() {
    }

    mount(Widget: any) {
        const method = this.hydratable ? 'hydrate' : 'render';

        // Render the widget
        ReactDOM[method](React.createElement(Widget, {
            uri: this.uri,
            component: this.component,
            store: this.store
        }), this.body);
    }

    unmount() {
        ReactDOM.unmountComponentAtNode(this.body);
    }

    initialise() {
        const child = this.component.getAttribute('data-child-id');
        this.#uri = child ? routing.manager.pages.find(child).uri : void 0;
        super.initialise();
    }
}
