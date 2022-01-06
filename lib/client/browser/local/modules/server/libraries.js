module.exports = function () {
    const {ipc} = global.utils;

    const id = ({id, kind}) => {
        const instance = global.dashboard ? 'dashboard' : 'main';
        return [`${id}/${kind}`, instance];
    }

    this.status = async function (params) {
        const data = await ipc.exec('main', 'bees/data', ...id(params));
        return data?.status;
    }

    this.start = async function (params) {
        await ipc.exec('main', 'bees/start', ...id(params));
    }

    this.stop = async function (params) {
        await ipc.exec('main', 'bees/stop', ...id(params));
    }
}
