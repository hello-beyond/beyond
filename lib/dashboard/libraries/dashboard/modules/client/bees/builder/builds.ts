import type {Bee} from "../item";

export class ServiceBuilds {
    #bee: Bee;

    get value() {
        const builds = this.#bee.fields.get('builds');
        return !builds.assigned ? {} : {...builds.value};
    }

    constructor(bee: Bee) {
        this.#bee = bee;
    }
}