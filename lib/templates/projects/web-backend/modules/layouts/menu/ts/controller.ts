import {ReactWidgetController} from '@beyond-js/kernel/react-widget/ts';
import {Menu} from "./views/menu";

export /*bundle*/
class Controller extends ReactWidgetController {
    get Widget() {
        return Menu;
    }
}
