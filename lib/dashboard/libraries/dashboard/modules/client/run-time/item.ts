import {bundle} from "beyond_context";
import {ReactiveModel} from "../reactive-model";

interface BeeSpecs {
    application: string,
    message: { type: string, exc: string }
}

interface Trace {
    type: string,
    method: string,
    bundle: string,
    line: string,
    column: string
}

export /*bundle*/
class RunTimeError extends ReactiveModel {
    #application: string;
    get application() {
        return this.#application;
    }

    #type: string;
    get type() {
        return this.#type;
    }

    #error: string;
    get error() {
        return this.#error;
    }

    #trace: Trace[] = [];
    get trace() {
        return this.#trace;
    }

    process(message: BeeSpecs) {
        this.#application = message.application;
        this.#type = message.message.type;

        if (!message.message.exc) return;
        const trace = message.message.exc.split(`\n`);

        this.#error = trace.shift();
        const process = (item: string) => {
            let trace: string | string[];
            trace = item.replace(/\s*at /, '');
            trace = trace.split(/[\s]/);

            let method;
            let detail = trace[1];
            if (trace.length === 3) {
                method = trace[1];
                detail = trace[2];
            }

            const type = trace[0].replace(/\[|]/g, '');
            detail = detail.replace(/\(|\)/g, '');
            const split = detail.split(':');
            let [bundle, line, column] = split;

            this.#trace.push({type: type, method: method, bundle: bundle, line: line, column: column});
        };
        trace.forEach(process);
    }

    constructor(message: BeeSpecs) {
        super();

        this.process = this.process.bind(this);
        this.process(message);
    }
}