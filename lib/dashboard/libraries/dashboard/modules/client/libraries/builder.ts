import {module} from "beyond_context";
import {Events} from "@beyond-js/kernel/core/ts";

export class LibraryBuilder extends Events {
    readonly #library: string;

    #messages: string[] = ([]);
    get messages(): string[] {
        return this.#messages;
    }

    /**
     * @param library {string} The library name
     * @constructor
     */
    constructor(library: string) {
        super();
        this.#library = library;
    }

    private onMessage(message: string) {
        this.#messages.push(message);
        this.trigger('change');
    };

    private prepare = async () => {
        try {
            //TODO validar con @box la para importar beyond
            // await beyond.rpc.prepare();

            const socket = await module.socket;
            const event = `server:build-library-${this.#library}-server`;
            socket.on(event, this.onMessage);
        } catch (exc) {
            console.error(exc.stack);
        }
    }

    async build(specs: object) {
        specs = specs ? specs : {};
        if (typeof specs !== 'object') {
            throw new Error('Invalid parameters');
        }

        await this.prepare();

        return await module.execute('/build/library', {name: this.#library});
    };
}
