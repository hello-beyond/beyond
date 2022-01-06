import {Item, ItemSpecs, ItemsProperty} from "@beyond-js/plm/core/ts";
import {module} from "beyond_context";
import {ApplicationDistribution} from "./distributions/item";

interface DistributionSpecs {
    name: string,
    platform: string,
    environment: string,
    port: number,
    ssr: boolean,
    compress: boolean,
    default: boolean,
    ts: object
}

export /*bundle*/
class ApplicationDeployment extends Item {
    get id() {
        return this.fields.get('id').value;
    }

    get valid() {
        return this.fields.get('valid').value;
    }

    get errors(): string[] {
        return this.fields.get('errors').value ?? [];
    }

    get distributions(): Map<string, ApplicationDistribution> {
        return <ItemsProperty>this.properties.get('distributions');
    }

    constructor(specs: ItemSpecs) {
        super('applications-deployments', specs);
    }

    async addDistribution(params: DistributionSpecs) {
        const specs = {
            applicationId: this.id,
            distribution: {...params}
        };

        try {
            const response = await module.execute('builder/application/setDistribution', specs)
            console.log(1, "response", response)
            return response;
        } catch (e) {
            console.error(e)
        }

    }
}
