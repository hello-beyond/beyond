import {ReactWidgetController} from '@beyond-js/react-widgets/controllers/ts';
import {Layout} from './views/layout';

export /*bundle*/
class Controller extends ReactWidgetController {
    get Widget() {
        return Layout;
    }
}