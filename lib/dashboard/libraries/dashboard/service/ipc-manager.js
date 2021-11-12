module.exports = new (class IpcManager {
    _ready;
    _server;
    _application;

    constructor() {
        this._ipc = global.utils.ipc;
        this._monitor = `main-client`;
    }

    exec(action, specs = {}) {
        return this._ipc.exec(this._monitor, action, specs);
    }

    async getServer() {
        const WD = await this._ipc.exec(this._monitor, 'server/wd');
        this._wd = WD;
        const {Server} = (require('./builder/models'));
        this._server = new Server(WD);
        return this._server;
    }

    main(action, specs) {
        return this._ipc.exec('main', action, specs);
    }

    async initialise() {
        await this.getServer();
        this._ready = true;
    }

    get wd() {
        return this._wd;
    }

})();