import {PageVueWidgetController} from '@beyond-js/vue-widgets/controllers';
import Page from "./page.vue";

export /*bundle*/
class Controller extends PageVueWidgetController {
    get Widget() {
        return Page;
    }
}
