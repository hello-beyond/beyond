import {ServerConfig} from "./config";

class Server {

    #config = new ServerConfig();
    get config() {
        return this.#config;
    }

}

export const BeyondServer = new Server();