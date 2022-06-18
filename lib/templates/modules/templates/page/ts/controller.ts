import {PageReactWidgetController} from '@beyond-js/react-widgets/controllers/ts';
import {View} from "./views/view";

export /*bundle*/
class Controller extends PageReactWidgetController {
    get Widget() {
        return View;
    }
}