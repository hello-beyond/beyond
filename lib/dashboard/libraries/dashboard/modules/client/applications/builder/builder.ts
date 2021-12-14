import {Events} from "@beyond-js/kernel/core/ts";
import {module} from "beyond_context";
import type {Application} from "../item";
import {ApplicationBuilds} from "./builds";

interface DistributionSpecs {
    name: string
    platform: string
    ssr: boolean
    environment: string
    compress: boolean
    icons?: string
}

interface MessageSpecs {
    type: string
    text: string
}

export class ApplicationBuilder extends Events {
    readonly #application: Application;
    readonly #builds: ApplicationBuilds;
    get builds() {
        return this.#builds;
    }

    #messages: Array<MessageSpecs> = [];
    get messages() {
        return this.#messages;
    }

    #processing: boolean;
    get processing() {
        return this.#processing;
    }

    #completed: boolean;
    get completed() {
        return this.#completed;
    }

    /**
     * @param application {object} The application
     */
    constructor(application: Application) {
        super();
        this.#application = application;
        this.#builds = new ApplicationBuilds(application);
    }

    private onMessage = (message: MessageSpecs) => {
        if (message.type !== 'build/application/message') return;

        console.log(message.text);

        this.#processing = false;
        this.#messages.push(message);
        this.trigger('change');
        return;
    };

    #prepared = false;

    private async prepare() {
        if (this.#prepared) return;
        this.#prepared = true;

        try {
            const socket = await module.socket;
            socket.on(`builder:${this.#application.id}`, this.onMessage);
        } catch (exc) {
            console.error(exc.stack);
        }
    }

    async build(distribution: DistributionSpecs) {
        if (typeof distribution !== 'object')
            throw new Error('Invalid distribution parameter');
        if (!['web', 'android', 'ios'].includes(distribution.platform))
            throw new Error(`Invalid parameters, platform "${distribution.platform}" is invalid`);
        if (!['development', 'production'].includes(distribution.environment))
            throw new Error('Parameter "environment" is invalid');

        await this.prepare();

        const specs = {
            name: distribution.name ? distribution.name : 'unnamed',
            platform: distribution.platform,
            ssr: distribution.ssr,
            environment: distribution.environment,
            compress: !!distribution.compress,
            icons: distribution.icons
        };
        await module.execute('/build', {application: this.#application.path, distribution: specs});
        console.log('Application build is done');

        this.#completed = true;
        this.#processing = false;
    };

    clean() {
        this.#completed = false;
        this.#messages = [];
        this.trigger('change');
    }
}