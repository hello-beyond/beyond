import * as http from 'http';
import {Server, ServerOptions, Socket} from 'socket.io';
import {Connection} from './connection/connection';
import {instrument} from '@socket.io/admin-ui';

interface IBeeSpecs {
    is: string;
    container: {
        id: number,
        is: string,
        dashboard: boolean,
        path: string,
        package: string
    };
    port: number
}

const BackendServer = class BackendServer {
    #ns;
    #specs: IBeeSpecs;
    #connections: Map<string, Connection> = new Map();

    #connection = async (socket: Socket) => {
        const connection = new Connection(socket);

        const connections = this.#connections;
        connections.set(socket.id, connection);

        const disconnect = () => {
            connections.delete(socket.id);
            connection.disconnect();
            socket.off('disconnect', disconnect);
        }

        socket.on('disconnect', disconnect);
    }

    constructor(specs: IBeeSpecs) {
        this.#specs = specs;
        const {port, container} = specs;
        const id = container.package;

        const options: Partial<ServerOptions> = {
            serveClient: false,
            maxHttpBufferSize: 100000,
            cors: {
                origin: ["https://admin.socket.io"],
                credentials: true
            }
        };

        const server = http.createServer();
        const io = new Server(server, options);

        instrument(io, {auth: false});

        const namespace = '/' + id.startsWith('@') ? id.substr(1) : id;
        this.#ns = io.of(namespace);
        this.#ns.on('connection', this.#connection);

        server.listen(port);
    }
}

const specs = <IBeeSpecs>(globalThis as any).__beeSpecs;
new BackendServer(specs);
