const {fs, ipc} = global.utils;
const plain = ['text/html', 'text/plain', 'application/javascript', 'text/css', 'text/cache-manifest'];

module.exports = config => function (req, resp) {
    'use strict';

    let started;
    const start = async () => {
        if (started) return;
        await ipc.exec('main', 'dashboard/start');
        started = true;
    }

    const process = async function (url) {
        let resource = url.pathname === '/' ? '/js/index.html' : `/js${url.pathname}`;
        resource = require('path').join(__dirname, resource);
        const exists = await fs.exists(resource);
        resource = exists ? resource : require('path').join(__dirname, '/js/index.html');

        const extname = require('path').extname(resource);

        try {
            if (!started) await start();

            const contentType = require('./content-types')(extname);
            if (plain.includes(contentType)) {
                let content = await fs.readFile(resource, 'utf8');

                if (url.pathname === '/config.js') {
                    const port = config.service.port;
                    content = content.replace(
                        '##beyond-host-namespace-[beyond-js/dashboard-lib]##',
                        `http://localhost:${port}/beyond-js/dashboard-lib`);
                }

                resp.writeHead(200, {
                    'Content-Type': contentType,
                    'Content_Length': content.length
                });

                resp.end(content);
            }
            else {
                const content = await fs.readFile(resource);
                resp.writeHead(200, {
                    'Content-Type': contentType,
                    'Content_Length': content.length
                });

                resp.write(content, 'binary');
                resp.end();
            }
        }
        catch (exc) {
            console.log(exc.stack);
            resp.writeHead(404);
            resp.end(JSON.stringify(exc));
        }
    }

    const url = require('url').parse(req.url);
    return process(url).catch(exc => console.log(exc.stack));
}
