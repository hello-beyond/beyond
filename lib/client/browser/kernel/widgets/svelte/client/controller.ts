import {BeyondWidgetController} from "@beyond-js/kernel/core/ts";

export /*bundle*/
abstract class SvelteWidgetController extends BeyondWidgetController {
    _mount(props: any) {
        const hydrate = this.hydratable;
        new this.Widget({target: this.body, hydrate, props});
    }

    mount() {
        this._mount({
            component: this.component,
            store: this.store
        });
    }

    unmount() {
    }
}
