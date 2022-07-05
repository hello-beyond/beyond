import {PageVueWidgetController} from '@beyond-js/vue-widgets/controllers';
import Widget from "./widget.vue";

export /*bundle*/
class Controller extends PageVueWidgetController {
    get Widget() {
        return Widget;
    }
}
