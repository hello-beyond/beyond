module.exports = function (instances) {
    'use strict';

    this.info = require('./info.js')(instances);
    this.start = require('./start.js')(instances);
};
