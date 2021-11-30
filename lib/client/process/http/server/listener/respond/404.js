module.exports = function (response, resource) {
    'use strict';

    try {
        const content = resource.content ? resource.content : '404 - not found';

        response.writeHead(404, {
            'Content-Type': resource.contentType,
            'Content_Length': content.length
        });
        response.write(content);
        response.end();
    }
    catch (exc) {
        console.log(exc.stack);
    }
}
