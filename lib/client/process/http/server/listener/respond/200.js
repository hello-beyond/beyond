module.exports = function (response, resource) {
    'use strict';

    try {
        response.writeHead(200, {
            'Content-Type': resource.contentType,
            'Content_Length': resource.content.length
        });
        response.write(resource.content);
        response.end();
    }
    catch (exc) {
        console.log(exc.stack);
    }
}
