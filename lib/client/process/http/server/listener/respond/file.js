const {fs} = global.utils;

module.exports = async function (response, resource) {
    'use strict';

    const plain = ['text/html', 'text/plain', 'application/javascript', 'text/css', 'text/cache-manifest'];

    try {
        if (!(await fs.exists(resource.file))) {
            return require('./404.js')(response, {content: `File "${resource.file}" not found`});
        }

        if (plain.includes(resource.contentType)) {
            const content = await fs.readFile(resource.file, 'utf8');
            response.writeHead(200, {
                'Content-Type': resource.contentType,
                'Content_Length': content.length
            });
            response.write(content);
            response.end();
        }
        else {
            const content = await fs.readFile(resource.file);
            response.writeHead(200, {
                'Content-Type': resource.contentType,
                'Content_Length': content.length
            });
            response.write(content, 'binary');
            response.end();
        }
    }
    catch (exc) {
        require('./500.js')(response, exc);
        console.log(exc.stack);
    }
}
