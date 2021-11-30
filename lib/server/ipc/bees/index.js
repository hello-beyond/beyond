module.exports = function (instances) {
    'use strict';

    this.data = require('./data.js')(instances);
    this.start = require('./start.js')(instances);
    this.stop = require('./stop.js')(instances);
    this.build = require('./build')(instances);
};
