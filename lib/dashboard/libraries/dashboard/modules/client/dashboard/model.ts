import {module} from "beyond_context";

import {ReactiveModel} from "../reactive-model";

interface IPortResponse {
    valid: boolean,
    id: string
}

export /*bundle*/
class Dashboard extends ReactiveModel {


    get ready(): boolean {
        return true;
    }

    #validPort: boolean;
    get validPort(): boolean {
        return this.#validPort;
    }

    validate(hash: string) {
        return module.execute('/dashboard/validate', {hash: hash});
    }

    cleanCache = () => module.execute('/dashboard/cleanCache');

    async checkPort(port: number) {
        if (!port) throw new Error('port to check is required');
        this.processing = true;
        try {
            const path = 'builder/application/checkPort';
            const response = <IPortResponse>(await module.execute(path, {port: port}));
            this.processing = false;
            return response.valid;

        } catch (error) {
            this.processing = false;
            this.#validPort = false;
            this.processed = true;

        }
    }


    async availablePort(intents = 5): Promise<number> {
        let cont = 0;
        let port = 8080;
        while (cont < intents) {
            const available = await this.checkPort(port)
            if (available) break;
            port = port - 100;
        }
        return port;
    }


}
