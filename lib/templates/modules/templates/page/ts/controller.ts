import {PageReactWidgetController} from '@beyond-js/react-widgets/controllers';
import {View} from "./views/view";

export /*bundle*/
class Controller extends PageReactWidgetController {
    get Widget() {
        return View;
    }
}