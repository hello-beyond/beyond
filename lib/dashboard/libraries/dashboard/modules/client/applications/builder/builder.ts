import {Events} from "@beyond-js/kernel/core/ts";
import {module} from "beyond_context";
import type {Application} from "../item";
import {ApplicationBuilds} from "./builds";

interface BuilderSpecs {
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

    #error: string | undefined;
    get error() {
        return this.#error;
    }

    #processing: boolean;
    get processing() {
        return this.#processing;
    }

    #finished: boolean;
    get finished() {
        return this.#finished;
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
        if (message.type === 'build/application/error') {
            this.#error = message.text;
            this.#processing = false;
            this.trigger('change');
            return;
        }

        if (message.type === 'build/application/finished') {
            this.#finished = true;
            this.#processing = false;
        }

        this.#messages.push(message);
        this.trigger('change');
    };

    private async prepare() {
        try {
            //TODO validar con @box la para importar beyond
            // await beyond.rpc.prepare();

            const socket = await module.socket;
            const appId = this.#application.id;
            const event = `client:build-application-${appId}-client`;
            socket.on(event, this.onMessage);
        } catch (exc) {
            console.error(exc.stack);
        }
    }

    async build(distribution: BuilderSpecs) {
        if (typeof distribution !== 'object')
            throw new Error('Invalid distribution parameter');
        if (!['web', 'android', 'ios'].includes(distribution.platform))
            throw new Error(`Invalid parameters, platform "${distribution.platform}" is invalid`);
        if (!['development', 'production'].includes(distribution.environment))
            throw new Error('Parameter "environment" is invalid');

        try {
            await this.prepare();
        } catch (exc) {
            console.error(exc.stack);
        }

        const specs = {
            name: `${distribution.platform}-${distribution.environment}`,
            platform: distribution.platform,
            ssr: distribution.ssr,
            environment: distribution.environment,
            compress: !!distribution.compress,
            icons: distribution.icons
        };
        await module.execute('/build/application', {path: this.#application.path, distribution: specs});
    };

    async delete(params: BuilderSpecs) {
        if (!params.platform) throw new Error('Parameter "platform" is not defined');
        if (!params.environment) throw new Error('Parameter "environment" is not defined');

        const specs = {...params, applicationId: this.#application.id};
        await module.execute('/build/deleteApplication', specs);
    }

    clean() {
        this.#error = undefined;
        this.#messages = [];
        this.trigger('change');
    }

    cleanError = () => {
        this.#error = undefined;
        this.trigger('change');
    }
}