/**
 * The helper to share data that is used by client and server:
 * take available ports and get the id of the path where the applications and libraries are located
 *
 * @param initialPort {number} The first port to use if available,
 * the following ports will be the numbers immediately above this one
 */
module.exports = function (initialPort) {
    require('./ports')(initialPort);
    require('./ids');
    require('./templates');
    require('./cwd');
};
