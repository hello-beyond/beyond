import {BeyondWidgetController} from "@beyond-js/kernel/core/ts";
import {createApp} from "vue";

export /*bundle*/
abstract class VueWidgetController extends BeyondWidgetController {
    _mount(props: any) {
        // const hydrate = this.hydratable;

        createApp(this.Widget).mount(this.body);
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
