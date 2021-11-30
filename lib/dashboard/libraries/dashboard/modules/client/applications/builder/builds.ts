import type {Application} from "../item";

export class ApplicationBuilds {

    readonly #application: Application;

    get value() {
        const builds = this.#application.fields.get('builds');
        return !builds.assigned ? {} : {...builds.value};
    }

    constructor(application: Application) {
        this.#application = application;
    }

}
