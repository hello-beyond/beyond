import {ReactWidgetController} from '@beyond-js/react-widgets/controllers/ts';
import {Widget} from "./views/code";

export /*bundle*/
class Controller extends ReactWidgetController {
    get Widget() {
        return Widget;
    }
}