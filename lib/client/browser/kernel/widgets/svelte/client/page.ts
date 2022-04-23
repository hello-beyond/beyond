import {routing, URI} from '@beyond-js/kernel/routing/ts';
import {SvelteWidgetController} from "./controller";

export /*bundle*/
abstract class PageSvelteWidgetController extends SvelteWidgetController {
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

    initialise() {
        const child = this.component.getAttribute('data-child-id');
        this.#uri = child ? routing.manager.pages.find(child).uri : void 0;
        super.initialise();
    }
}
