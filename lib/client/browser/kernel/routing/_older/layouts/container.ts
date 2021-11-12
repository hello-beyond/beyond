import {LayoutManager} from "./manager";
import {Pages} from "./pages/pages";
import {CancellationToken} from "beyond_libraries/beyond/core/ts";

export /*bundle*/
class LayoutContainer {
    readonly #manager: LayoutManager;
    get manager() {
        return this.#manager;
    }

    get name() {
        return this.#manager.name;
    }

    readonly #element: HTMLElement;
    get element(): HTMLElement {
        return this.#element;
    }

    readonly #pages: Pages;
    get pages() {
        return this.#pages;
    }

    constructor(manager: LayoutManager) {
        this.#manager = manager;
        this.#pages = new Pages(this);

        const parent = 'body > #layouts-container';
        const element = document.createElement(`layout-${manager.name}`);
        this.#element = document.querySelector(parent).appendChild(element);
    }

    #transition = {
        timing: 300,
        css: {
            hiding: 'hiding-layout-container',
            hide: 'hide-layout-container',
            showing: 'showing-layout-container',
            show: 'showed-layout-container'
        }
    };

    // This method can be overridden
    render(): void {
    };

    // This method can be overridden
    enters() {
    }

    // This method can be overridden
    leaves() {
    }

    #cancellationToken = new CancellationToken();

    async show(uri): Promise<void> {
        const cancellationTokenId = this.#cancellationToken.reset();
        this.enters();

        const transition = this.#transition;
        const element = this.#element;
        element.classList.add(transition.css.show);

        await new Promise(resolve => setTimeout(resolve, transition.timing));
        if (!this.#cancellationToken.check(cancellationTokenId)) return;

        //element.classList.contains(config.css.show) && element.classList.remove(config.css.show);
        element.classList.contains(transition.css.hide) && element.classList.remove(transition.css.hide);
        element.classList.add(transition.css.show);

        await this.#pages.show(uri);
    };

    async hide(): Promise<void> {
        this.#cancellationToken.reset();
        this.leaves();

        const transition = this.#transition;
        const element = this.#element;
        element.classList.contains(transition.css.show) && element.classList.remove(transition.css.show);
        element.classList.add(transition.css.hide);
    };
}
