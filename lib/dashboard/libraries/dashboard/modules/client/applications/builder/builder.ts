import {Events} from "@beyond-js/kernel/core/ts";
import {module} from "beyond_context";
import type {Application} from "../item";
import {ApplicationBuilds} from "./builds";

interface BuildSpecs {
    name: string,
    platform: string,
    ssr: boolean,
    environment: string,
    compress: boolean,
    icons: string,
    npm?: boolean
    platforms?: object
}

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
        if (!['development', 'production'].includes(distribution.environment))
            throw new Error('Parameter "environment" is invalid');

        await this.prepare();

        const specs: BuildSpecs = {
            name: distribution.name ?? 'unnamed',
            platform: distribution.platform,
            ssr: distribution.ssr,
            environment: distribution.environment,
            compress: !!distribution.compress,
            icons: distribution.icons
        };

        if (distribution.name === 'npm') {
            specs.npm = true;
            specs.platforms = {node: true, web: true};
        }

        await module.execute('/build', {application: this.#application.path, distribution: specs});

        this.#completed = true;
        this.#processing = false;
    };

    clean() {
        this.#completed = false;
        this.#messages = [];
        this.trigger('change');
    }
}