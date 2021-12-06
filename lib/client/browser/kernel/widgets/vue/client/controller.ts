import {BeyondWidgetController} from '@beyond-js/kernel/core/ts';

export /*bundle*/
class VueWidgetController extends BeyondWidgetController {
    mount(Widget: any) {
        // Render the widget
        Widget.$mount(this.body);
    }
}
