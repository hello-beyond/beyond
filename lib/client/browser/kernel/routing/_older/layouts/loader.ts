import {SingleCall, beyond} from "beyond_libraries/beyond/core/ts";
import {LayoutManager} from "./manager";
import {LayoutContainer} from "./container";

export class LayoutLoader {
    readonly #manager: LayoutManager;

    #container: LayoutContainer;
    get container() {
        return this.#container;
    }

    #loading = false;
    get loading() {
        return this.#loading;
    }

    #loaded = false;
    get loaded() {
        return this.#loaded;
    }

    #rendered = false;
    get rendered() {
        return this.#rendered;
    }

    get ready() {
        return this.#loaded && this.#rendered;
    }

    #error = '';
    get error() {
        return this.#error;
    }

    constructor(manager: LayoutManager) {
        this.#manager = manager;
    }

    @SingleCall
    async load() {
        if (this.#loaded || this.#loading || this.#error) return;
        this.#loading = true;

        const failed = (message: string, exc?: Error) => {
            this.#error = message;
            this.#loading = false;
            console.error(this.#error);
            exc && console.error(exc.stack);
        };

        const done = async () => {
            this.#loaded = true;
            this.#loading = false;
            typeof this.#container.render === 'function' && await this.#container.render();
            this.#rendered = true;
        };

        if (this.#manager.name === 'default') {
            this.#container = new LayoutContainer(this.#manager);
            return await done();
        }

        const resource = this.#manager.config.bundle;

        let Container: typeof LayoutContainer;
        try {
            const bundle = await beyond.import(resource);
            Container = bundle.Container || bundle.Layout;
        } catch (exc) {
            return failed(`Error importing layout from bundle "${resource}"`, exc);
        }

        try {
            // Create the layout container
            Container = Container && typeof Container === 'function' ? Container : LayoutContainer;
            this.#container = new Container(this.#manager);
        } catch (exc) {
            return failed(`Error instantiating layout on bundle "${resource}"`, exc);
        }

        return await done();
    }
}
