import {PageComponent} from "beyond_dependencies/beyond/routing/ts";
import {Dog} from "beyond_dependencies/@javier/animals/ts";
import {bundle} from "beyond_context";
import {Control} from "./control";

export /*bundle*/
class Page extends PageComponent {

    constructor(props: any) {
        super(props, bundle, Control);
    }

}
