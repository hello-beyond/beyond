import {IncomingMessage, ServerResponse, createServer} from 'http';
import {renderer} from '@beyond-js/ssr/renderer/ts';

export /*bundle*/
class SSRServer {
    constructor(port: number) {
        const listener = (rq: IncomingMessage, response: ServerResponse) => {
            try {
                let language = rq.headers['accept-language'];
                language = language ? language.slice(0, 2) : 'en';

                renderer.render(rq.url, language).then((rendered: any) => {
                    const code = `const __beyond_ssr = ${JSON.stringify(rendered)};`;
                    try {
                        response.writeHead(200, {
                            'Content-Type': 'application/javascript',
                            'Content_Length': code.length
                        });
                        response.write(code);
                        response.end();
                    } catch (exc) {
                        console.log(exc.stack);
                    }
                });
            } catch (exc) {
                console.error(exc.stack);
                return {exception: exc.stack};
            }
        }

        const server = createServer(listener);
        server.listen(port);
    }
}
