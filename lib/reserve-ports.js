const {ipc} = global.utils;
require('colors');

/**
 * Reserve the first two available ports to the Beyond Dashboard (main & dashboard)
 *
 * @param first {number} The port used to the main instance, the port +1 will be
 * the port for the dashboard of the dashboard
 * @return {Promise<{main: *, dashboard: *}>}
 */
module.exports = async function (first) {
    let main = await ipc.exec('main', 'ports.reserve', 'dashboard/main', false, first);
    main !== first && console.log(`Port ${first} is not available`.red);

    let dashboard = await ipc.exec('main', 'ports.reserve', 'dashboard/dashboard', true, first + 1);
    dashboard !== first + 1 && console.log(`Port ${first + 1} is not available`.red);

    return {main: main, dashboard: dashboard};
}
