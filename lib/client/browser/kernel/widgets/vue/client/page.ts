import {routing, URI} from '@beyond-js/kernel/routing/ts';
import {VueWidgetController} from "./controller";

export /*bundle*/
abstract class PageVueWidgetController extends VueWidgetController {
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
    }

    async initialise() {
        const child = this.component.getAttribute('data-child-id');
        this.#uri = child ? routing.manager.pages.find(child).uri : void 0;
        await super.initialise();
    }
}
