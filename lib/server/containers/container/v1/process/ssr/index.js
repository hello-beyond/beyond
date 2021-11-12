const {ipc} = global.utils;

module.exports = class {
    #bee;

    constructor(bee) {
        this.#bee = bee;
        ipc.handle('page/get', this.#get);
    }

    async #get(pathname) {
        void (this);
        console.log('the pathname being requested', pathname);
        return 'the returned content';
    }
}
