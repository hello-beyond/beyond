module.exports = function (instances) {
    'use strict';

    const server = instances.get('main');

    this.config = () => ({
        'errors': server.errors,
        'warnings': server.warnings
    });
}
