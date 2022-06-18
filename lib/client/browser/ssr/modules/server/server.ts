import {createServer} from 'http';
import listener from './listener';

export /*bundle*/
class SSRServer {
    constructor(port: number) {
        const server = createServer(listener);
        server.listen(port);

        process.send({type: 'ready'});
    }
}
