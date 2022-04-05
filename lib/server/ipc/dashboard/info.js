module.exports = instances => async function () {
    'use strict';

    const {port} = await require('./bee')(instances);
    return {port};
}
