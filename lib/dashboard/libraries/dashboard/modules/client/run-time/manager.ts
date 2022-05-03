import {bundle} from "beyond_context";
import {ReactiveModel} from "../reactive-model";
import {RunTimeError} from "./item";

interface BeeSpecs {
    application: string,
    message: { type: string, exc: string }
}

export /*bundle*/
class RunTimeManager extends ReactiveModel {
    #LIMIT = 20;
    #items: RunTimeError[] = [];
    get items() {
        return this.#items;
    }

    clean(all = false) {
        if (all) {
            this.#items.length = 0;
            return;
        }
        this.#items.shift();
    }

    process(message: BeeSpecs) {
        if (this.#items.length === this.#LIMIT) this.#items.shift();
        this.#items.push(new RunTimeError(message));
    }

    async initialise() {
        const socket = await bundle.container.socket;
        socket.on('bees.log', this.process);
    }

    constructor() {
        super();

        this.process = this.process.bind(this);
        this.initialise().catch(exc => console.error(exc.stack));
    }
}