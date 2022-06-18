import {ReactWidgetController} from './controller';
import {PageURI} from '@beyond-js/widgets/controller/ts';

export /*bundle*/
abstract class PageReactWidgetController extends ReactWidgetController {
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
