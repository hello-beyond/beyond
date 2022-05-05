import {SSRServer} from '@beyond-js/ssr/server/ts';

export /*bundle*/ function listen(): void {
    new SSRServer(5000);
}
