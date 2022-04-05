import type {Package} from "./package";
import type {Beyond} from "../../beyond";
import {Events} from "../../utils/events/events";

export class PackageHMR extends Events {
    #beyond: Beyond;
    #pkg: Package;
    #change = 0;

    async #onchange(processor: string) {
        if (['js', 'jsx'].includes(processor)) return; // Legacy processors does not support HMR

        const beyond = this.#beyond;

        this.#change++;
        // In AMD mode, the querystring is not allowed (it is used require.undef by the beyond.reload method)
        const qs = beyond.mode !== 'amd' ? `?change=${this.#change}` : '';

        const url = `${this.#pkg.bundle.id}[${processor}]${qs}`;
        await beyond.reload(url, this.#change);
        this.trigger('change');
    }

    constructor(pkg: Package) {
        super();
        this.#pkg = pkg;
        this.#beyond = (require('../../beyond')).beyond;

        const onchange = (processor: string) => this.#onchange(processor).catch(exc => console.log(exc.stack));
        const {language} = pkg;
        pkg.bundle.hmr.on(`.js//${language}`, onchange);
    }
}
