import type {Package} from "./package";
import type {Beyond} from "../../beyond";
import {Events} from "../../utils/events/events";

export class PackageHMR extends Events {
    #beyond: Beyond;
    #pkg: Package;
    #change = 0;

    async #onchange() {
        const beyond = this.#beyond;

        this.#change++;

        // Note: in AMD mode, the querystring is not allowed (it is used require.undef by the beyond.reload method)
        const url = beyond.mode === 'amd' ? `${this.#pkg.bundle.id}.hmr` : `?hmr`;

        try {
            await beyond.reload(url, this.#change);
        } catch (exc) {
            console.log(`Error loading hmr of bundle "${this.#pkg.bundle.id}"`, exc.stack);
        }
        this.trigger('change');
    }

    constructor(pkg: Package) {
        super();
        this.#pkg = pkg;
        this.#beyond = (require('../../beyond')).beyond;

        const onchange = () => this.#onchange().catch(exc => console.log(exc.stack));
        const {language} = pkg;
        pkg.bundle.hmr.on(`.js//${language}`, onchange);
    }
}
