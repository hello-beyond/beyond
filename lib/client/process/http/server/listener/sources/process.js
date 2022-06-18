const fs = require('fs').promises;
const {join} = require('path');

module.exports = async (module, resource) => {
    'use strict';

    const file = join(module.path, resource.path, resource.filename);
    // Check if file exists and access is allowed
    let exists;
    try {
        exists = await fs.access(file);
    }
    catch (exc) {
        return new global.Resource({'404': 'Source not found'});
    }

    return new global.Resource({file});
}
