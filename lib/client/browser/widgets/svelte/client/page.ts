import {SvelteWidgetController} from "./controller";
import {PageURI} from '@beyond-js/widgets/controller';

export /*bundle*/
abstract class PageSvelteWidgetController extends SvelteWidgetController {
    #uri: PageURI;
    get uri() {
        return this.#uri;
    }

    mount() {
        return super.mount({uri: this.#uri});
    }

    async initialise() {
        this.#uri = new PageURI({widget: <any>this.widget});
        await super.initialise();
    }
}
