module.exports = (response) => function (resource) {
    'use strict';

    if (!resource) return false;

    if (resource.type === 'content') {
        require('./200')(response, resource);
    }
    else if (!resource || resource.type === '404') {
        require('./404')(response, resource);
    }
    else if (resource.type === 'file') {
        require('./file')(response, resource);
    }
    else if (resource.type === '500') {
        require('./500')(response, resource);
    }
    else {
        require('./500')(response, {content: `Resource type "${resource.type}" is invalid`});
    }

    return true;
};
