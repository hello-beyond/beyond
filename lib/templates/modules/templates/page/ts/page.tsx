import {PageComponent} from "beyond_dependencies/beyond/routing/ts";
import {bundle} from "beyond_context";
import {Control} from "./control";

export /*bundle*/
class Widget extends PageComponent {

    constructor(props: any) {
        super(props, bundle, Control);
    }

}
