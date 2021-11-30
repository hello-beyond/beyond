import {module} from "beyond_context";

export /*bundle*/
class Dashboard {

    validate(hash: string) {
        return module.execute('/dashboard/validate', {hash: hash});
    }
}