import {ItemSpecs, ItemProperty, CollectionProperty} from "@beyond-js/plm/core/ts";
import {module} from "beyond_context";
import {File} from "../file/file";
import {ApplicationBuilder} from "./builder/builder";
import {ApplicationDeclarations} from "./declarations";
import type {Bee} from "../bees/item";
import type {Bundle} from "../bundles/item";
import type {Template} from "../templates/item";
import type {ApplicationModule} from "./modules/item";
import type {Libraries} from "../libraries/collection";
import type {ApplicationModules} from "./modules/collection";
import type {ApplicationStatics} from "./static/collection";
import type {ApplicationDeployment} from "./deployments/item";

export /*bundle*/
class Application extends File {
    get id(): string {
        return this.fields.get('id').value;
    }

    get path(): string {
        return this.fields.get('path').value;
    }

    get name(): string {
        return this.fields.get('name').value;
    }

    get title(): string {
        return this.fields.get('title').value;
    }

    get description(): string {
        return this.fields.get('description').value;
    }

    get developer(): string {
        return this.fields.get('developer').value;
    }

    get version(): number {
        return this.fields.get('version').value;
    }

    get connect(): string {
        return this.fields.get('connect').value;
    }

    get hosts(): string {
        return this.fields.get('hosts').value;
    }

    get port(): string {
        return this.fields.get('port').value;
    }

    get modulesPath(): string {
        return this.fields.get('modulesPath').value;
    }

    get errors(): string[] {
        return this.fields.get('errors').value ?? [];
    }

    get warnings(): string[] {
        return this.fields.get('warnings').value ?? [];
    }

    get am(): ApplicationModules {
        const am = <CollectionProperty>this.properties.get('am');
        return am && <ApplicationModules>am.value;
    }

    get libraries(): Libraries {
        const libraries = <CollectionProperty>this.properties.get('libraries');
        return libraries && libraries.value;
    }

    get bee(): Bee {
        const bee = <ItemProperty>this.properties.get('bee');
        return bee && <Bee>bee.value;
    }

    get template(): Template {
        const template = <ItemProperty>this.properties.get('template');
        return template && <Template>template.value;
    }

    get deployment(): ApplicationDeployment {
        const deployment = <ItemProperty>this.properties.get('deployment');
        return deployment && <ApplicationDeployment>deployment.value;
    }

    get static(): ApplicationStatics {
        const statics = <CollectionProperty>this.properties.get('static');
        return statics && statics.value;
    }

    readonly #builder;
    get builder(): ApplicationBuilder {
        return this.#builder;
    }

    get servers() {
        const servers = this.fields.get('servers');
        return !servers.assigned ? [] : [...servers.value];
    }

    get defaultServer() {
        return this.servers.find(server => !!server.default);
    }

    readonly #declarations;
    get declarations(): ApplicationDeclarations {
        return this.#declarations;
    }

    get url() {
        return this.port ? `http://localhost:${this.port}` : undefined;
    }

    triggerEvent = (event: string = 'change') => this.node.trigger(event);

    constructor(specs: ItemSpecs) {
        super('applications', specs);

        this.#builder = new ApplicationBuilder(this);
        this.#builder.bind('change', this.triggerEvent);

        this.#declarations = new ApplicationDeclarations(this);
        this.#declarations.bind('change', this.triggerEvent);
    }

    async checkStatic() {
        try {
            const specs = {applicationId: this.id, static: {"path": "./static"}};
            await module.execute('/builder/project/checkStatic', specs);
            this.triggerEvent();
        } catch (e) {
            console.error('Error:', e);
        }
    }

    createBackend() {
        return module.execute('/builder/project/backend', {applicationId: this.id});
    }

    async edit(specs: object) {
        try {
            specs = {...specs, applicationId: this.id};
            await module.execute('/builder/project/edit', specs);
            this.triggerEvent();
        } catch (e) {
            console.error('Error:', e);
        }
    }

    routes() {
        const routes: string[] = [];

        this.am && this.am.items.forEach((am: ApplicationModule) => {
            am.bundles.forEach((bundle: Bundle) =>
                bundle.additional?.is === 'page' && (routes.push(bundle.additional.route))
            )
        });

        return routes;
    }
}
