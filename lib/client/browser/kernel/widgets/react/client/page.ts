import {routing, URI} from '@beyond-js/kernel/routing/ts';
import {ReactWidgetController} from "./controller";
import * as ReactDOM from "react-dom";

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

    mount() {
        this._mount({
            uri: this.uri,
            component: this.component,
            store: this.store
        });
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
