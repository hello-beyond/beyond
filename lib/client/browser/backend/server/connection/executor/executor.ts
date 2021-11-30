import {beyond} from '@beyond-js/kernel/core/ts';
import {Action, IActionRequest} from "./action";
import {bridges} from "../../bridges";

export class Executor {
    /**
     * Execute an action
     *
     * @param rq
     * @return {Promise<{response: (*)}|{error: module.exports.error}>}
     */
    async execute(rq: IActionRequest) {
        const action = new Action(rq);
        if (action.error) return {error: action.error};

        const {module, className, method} = action;
        const {error, classes} = await bridges.get(module);
        if (error) {
            throw error;
        }
        if (!classes) {
            throw `Module "${module}" does not expose an actions bridge`;
        }

        if (!classes.has(className)) {
            throw new Error(`Module "${module}" does not expose a class "${className}"`);
        }
        const methods = new Map(classes.get(className));

        if (!methods.has(method)) {
            throw new Error(`Module "${module}" does not expose a class ` +
                `"${className}" with a "${method}" method`);
        }

        // Import the bundle
        let bundle;
        const bridge = `${module}/bridge`;
        try {
            bundle = await beyond.import(bridge);
        } catch (exc) {
            throw `Error loading bundle "${bridge}": ${exc.message}`;
        }

        const Class = bundle[className];
        if (typeof Class !== 'function') {
            throw `Bridge "${bridge}" does not expose a valid class "${className}", it is not a function`;
        }
        if (!Class.prototype.hasOwnProperty(method)) {
            throw `Class "${className}" of bridge "${bridge}" does not expose a method "${method}"`;
        }

        const object = new Class();
        if (typeof object[method] !== 'function') {
            throw `Class "${className}" of bridge "${bridge}" does not expose a method "${method}", it is not a function`;
        }

        return await object[method](...rq.params);
    }
}
