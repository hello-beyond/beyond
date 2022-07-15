module.exports = function () {
    const {ipc} = global.utils;

    const id = params => {
        if (!params.id) throw new global.StandardError('Parameter "id" not specified');

        const instance = global.dashboard ? 'dashboard' : 'main';
        return [params.id, instance];
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
