import {VueWidgetController} from '@beyond-js/kernel/vue-widget/ts';

export /*bundle*/
class Controller extends VueWidgetController {
    get Widget() {
        return require('./page').default;
    }
}
